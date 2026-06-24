/**
 * Shared validation contract for the estimate-request form.
 *
 * Imported by BOTH the client form (components/contact/EstimateForm.tsx) and the
 * server route handler (app/api/contact/route.ts) so the two never drift: the
 * browser and the server enforce the exact same rules. zod v4 (installed).
 *
 * Honesty note: the "service" and "city" options are constrained to the real
 * services + service areas the business actually covers, so a submission can't
 * claim a service/area we don't list. "Not sure" / "Somewhere else" are valid
 * escape hatches so a homeowner is never blocked by a too-narrow dropdown.
 */

import { z } from "zod";
import { serviceAreaNames } from "@/lib/serviceAreas";
import { services } from "@/lib/services";

/** Select option whose value is submitted and whose label is shown. */
export type SelectOption = { value: string; label: string };

/** City options: the real service areas, plus an honest "somewhere else". */
export const OTHER_CITY = "Other / nearby";
export const cityOptions: SelectOption[] = [
  ...serviceAreaNames.map((name) => ({ value: name, label: name })),
  { value: OTHER_CITY, label: "Somewhere else nearby" },
];

/** Service options: the real services, plus "not sure yet". */
export const UNSURE_SERVICE = "Not sure yet";
export const serviceOptions: SelectOption[] = [
  ...services.map((s) => ({ value: s.title, label: s.title })),
  { value: UNSURE_SERVICE, label: "Not sure yet — help me figure it out" },
];

const cityValues = cityOptions.map((o) => o.value) as [string, ...string[]];
const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

/**
 * A roofer mostly needs a name, a way to reach you, and what's going on.
 * Email is optional because for an active leak people give a phone number and
 * want a call back — forcing an email address would lose those homeowners.
 * At least one of phone/email is required (refined below).
 */
export const estimateSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name.")
      .max(80, "That name looks too long — please shorten it."),

    email: z
      .union([
        z.literal(""),
        // z.email() is the v4-idiomatic email check (the chained .email() is
        // deprecated). trim() first so trailing spaces don't fail valid input.
        z.string().trim().pipe(z.email("That email address doesn't look right.")),
      ])
      .optional()
      .transform((v) => (v === "" ? undefined : v)),

    phone: z
      .union([
        z.literal(""),
        z
          .string()
          .trim()
          // Lenient on purpose: digits, spaces, (), -, + and a leading 1.
          // We just need a reachable number, not a canonical format.
          .regex(/^[+]?[\d\s().-]{7,20}$/, "Please enter a phone number we can call back.")
          .refine(
            (v) => (v.match(/\d/g)?.length ?? 0) >= 7,
            "That phone number looks too short.",
          ),
      ])
      .optional()
      .transform((v) => (v === "" ? undefined : v)),

    city: z.enum(cityValues, {
      message: "Please choose the closest town.",
    }),

    service: z.enum(serviceValues, {
      message: "Please choose what you need help with.",
    }),

    message: z
      .string()
      .trim()
      .min(10, "A sentence or two about your roof helps us prepare.")
      .max(2000, "That's a lot of detail — please trim it a little."),

    /**
     * Honeypot. Real users never see or fill this field; bots that auto-fill
     * every input will. A non-empty value means "spam" — the server rejects it.
     */
    company: z.string().optional(),
  })
  .refine((data) => Boolean(data.phone) || Boolean(data.email), {
    message: "Add a phone number or an email so we can reach you.",
    // Surface this combined rule on the phone field (the one we prefer).
    path: ["phone"],
  });

/** The validated, normalized shape. */
export type EstimateInput = z.infer<typeof estimateSchema>;

/** Field names the form renders + the client maps server errors back onto. */
export type EstimateField = "name" | "email" | "phone" | "city" | "service" | "message";
