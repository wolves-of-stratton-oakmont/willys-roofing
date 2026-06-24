/**
 * POST /api/contact — estimate-request intake for Willy's Roofing.
 *
 * Behaviour, in order:
 *   1. Parse the JSON body and validate it with the SAME zod schema the browser
 *      uses (components/contact/schema.ts), so client and server never drift.
 *   2. Silently drop spam: if the honeypot `company` field is filled, we return
 *      a generic success WITHOUT recording anything (bots get no signal).
 *   3. Hand the lead to a delivery provider IF one is configured (see
 *      `deliverLead` below); otherwise fall back to a server-side log.
 *   4. Return a TRUTHFUL JSON result. The `delivered` flag tells the UI whether
 *      the message was actually sent to an inbox or only logged — so the page
 *      can show honest copy and never claim an email went out when none did.
 *
 * HONESTY CONTRACT: with no provider configured (the default for this build),
 * this endpoint validates + logs the request and returns { ok: true,
 * delivered: false }. The contact page copy for that case must NOT say "we've
 * emailed you" — it says the request was received and the team will follow up
 * by phone, and that calling 416-414-8452 is the fastest path.
 *
 * Runs on the Node.js runtime so a real SMTP/SDK provider can be added later.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { estimateSchema, type EstimateInput } from "@/components/contact/schema";
import { site } from "@/lib/site";

export const runtime = "nodejs";
// This is a mutating action that must never be cached or statically rendered.
export const dynamic = "force-dynamic";

/** Shape returned to the client. Mirrored by the form's fetch handler. */
type ContactSuccess = {
  ok: true;
  /** True only if the lead reached a real inbox/CRM; false if only logged. */
  delivered: boolean;
};
type ContactFailure = {
  ok: false;
  /** Human-readable summary for the form's top-level error region. */
  error: string;
  /** Per-field messages keyed by field name, for inline display. */
  fieldErrors?: Record<string, string[]>;
};

export async function POST(request: NextRequest) {
  // --- 1. Read the body defensively (malformed JSON must not 500) ----------
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json<ContactFailure>(
      { ok: false, error: "We couldn't read that request. Please try again." },
      { status: 400 },
    );
  }

  // --- 2. Validate against the shared schema -------------------------------
  const parsed = estimateSchema.safeParse(raw);
  if (!parsed.success) {
    const { fieldErrors, formErrors } = z.flattenError(parsed.error);
    return NextResponse.json<ContactFailure>(
      {
        ok: false,
        error:
          formErrors[0] ??
          "Some details need a second look. Please check the highlighted fields.",
        fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // --- 3. Honeypot: a filled `company` field means a bot. -------------------
  // Return a normal-looking success but record nothing. We don't tip off bots.
  if (data.company && data.company.trim() !== "") {
    return NextResponse.json<ContactSuccess>({ ok: true, delivered: false });
  }

  // --- 4. Deliver (or log) the lead ----------------------------------------
  let delivered = false;
  try {
    delivered = await deliverLead(data);
  } catch (err) {
    // A provider outage must not lose the lead or hard-fail the homeowner.
    // We log it and fall through to the honest "received, we'll call" path.
    console.error("[contact] lead delivery failed:", err);
    delivered = false;
  }

  return NextResponse.json<ContactSuccess>({ ok: true, delivered });
}

/**
 * Deliver a validated lead.
 *
 * ───────────────────────────────────────────────────────────────────────────
 *  INTEGRATION POINT — wire up a real provider here (no code elsewhere changes)
 * ───────────────────────────────────────────────────────────────────────────
 *  This build intentionally ships with NO secret and NO outbound email, so it
 *  works out of the box: it logs the lead server-side and reports delivered=false.
 *
 *  To send real notifications, set CONTACT_INBOX (where leads should go) and add
 *  ONE provider below. Example with Resend (https://resend.com):
 *
 *    // .env.local
 *    //   CONTACT_INBOX=leads@willysroofing.ca
 *    //   RESEND_API_KEY=re_xxx
 *    //   CONTACT_FROM="Willy's Roofing <noreply@willysroofing.ca>"
 *
 *    if (process.env.RESEND_API_KEY && process.env.CONTACT_INBOX) {
 *      const { Resend } = await import("resend");
 *      const resend = new Resend(process.env.RESEND_API_KEY);
 *      const { error } = await resend.emails.send({
 *        from: process.env.CONTACT_FROM ?? "noreply@willysroofing.ca",
 *        to: process.env.CONTACT_INBOX,
 *        replyTo: lead.email,                       // reply lands with the homeowner
 *        subject: `Estimate request — ${lead.name} (${lead.city})`,
 *        text: formatLead(lead),
 *      });
 *      if (error) throw error;
 *      return true;                                 // actually delivered
 *    }
 *
 *  The same pattern fits SMTP (nodemailer), a CRM webhook, Slack, etc. As long
 *  as the function returns `true` only on a genuine send, the UI stays honest.
 *
 * @returns true if the lead reached a real inbox/CRM; false if only logged.
 */
async function deliverLead(lead: EstimateInput): Promise<boolean> {
  // No provider configured: record the lead so it isn't lost, report not-sent.
  // (Visible in server logs / hosting platform logs until a provider is added.)
  console.info(
    `[contact] New estimate request for ${site.name}:\n${formatLead(lead)}`,
  );
  return false;
}

/** Plain-text rendering of a lead for logs or an email body. */
function formatLead(lead: EstimateInput): string {
  const lines = [
    `Name:    ${lead.name}`,
    `Phone:   ${lead.phone ?? "—"}`,
    `Email:   ${lead.email ?? "—"}`,
    `City:    ${lead.city}`,
    `Service: ${lead.service}`,
    "",
    "Message:",
    lead.message,
    "",
    `Received: ${new Date().toISOString()}`,
  ];
  return lines.join("\n");
}

/**
 * Reject non-POST verbs with a clear 405 instead of Next's default. Keeps the
 * endpoint's intent obvious and avoids leaking handler internals.
 */
export function GET() {
  return NextResponse.json(
    { ok: false, error: "Use POST to submit an estimate request." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
