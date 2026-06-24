"use client";

/**
 * EstimateForm — the estimate-request form on /contact.
 *
 * Design: framed like a roofer's work-order / estimate slip. Mono field labels
 * (the system's spec-sheet voice), copper focus ring (inherited globally), and
 * a single copper course-tick header. Boldness is spent on the submit button
 * and the header rule; every field stays quiet and legible.
 *
 * Behaviour:
 *  • Validates on submit with the SHARED zod schema (also enforced server-side).
 *  • Posts JSON to /api/contact; maps any server field errors back inline.
 *  • Honest states: empty (ready), submitting (in-flight), success (truthful —
 *    received + we'll call; never claims an email was sent), error (what went
 *    wrong + the phone number as the guaranteed path).
 *  • Honeypot `company` field is visually hidden + aria-hidden; bots fill it,
 *    people don't.
 *
 * No client-only motion is added here — focus/hover transitions come from the
 * shared tokens and are already reduced-motion-safe.
 */

import { useId, useRef, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import {
  estimateSchema,
  cityOptions,
  serviceOptions,
  type EstimateField,
} from "./schema";

type FieldErrors = Partial<Record<EstimateField, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  city: "",
  service: "",
  message: "",
  company: "", // honeypot
};

// Shared input/select styling — quiet surface, copper ring on focus (global).
const fieldBase =
  "w-full rounded-[var(--radius-sm)] border bg-[var(--color-chalk-50)] px-3.5 py-2.5 " +
  "text-base text-[var(--color-ink)] placeholder:text-[var(--color-slate-400)] " +
  "transition-colors duration-[var(--dur-fast)] " +
  "focus:border-[var(--color-copper-500)] focus:bg-white";

export function EstimateForm() {
  const [values, setValues] = useState<typeof EMPTY_FORM>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [delivered, setDelivered] = useState(false);

  const baseId = useId();
  const fid = (name: string) => `${baseId}-${name}`;
  const errId = (name: string) => `${baseId}-${name}-error`;
  const formErrorRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  function update<K extends keyof typeof EMPTY_FORM>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear a field's error as soon as the user edits it — feels responsive.
    if (key in errors) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key as EstimateField];
        return next;
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setFormError(null);

    // --- Client-side validation against the shared contract ----------------
    const result = estimateSchema.safeParse(values);
    if (!result.success) {
      const { fieldErrors, formErrors } = z.flattenError(result.error);
      const mapped: FieldErrors = {};
      (Object.keys(fieldErrors) as EstimateField[]).forEach((k) => {
        const msg = fieldErrors[k]?.[0];
        if (msg) mapped[k] = msg;
      });
      setErrors(mapped);
      setFormError(
        formErrors[0] ?? "Please check the highlighted fields and try again.",
      );
      // Move focus to the summary so screen-reader + keyboard users hear it.
      requestAnimationFrame(() => formErrorRef.current?.focus());
      return;
    }

    // --- Submit to the API -------------------------------------------------
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the validated, normalized payload (incl. honeypot for the server).
        body: JSON.stringify({ ...result.data, company: values.company }),
      });

      const data: {
        ok: boolean;
        delivered?: boolean;
        error?: string;
        fieldErrors?: Record<string, string[]>;
      } = await res.json().catch(() => ({ ok: false }));

      if (res.ok && data.ok) {
        setDelivered(Boolean(data.delivered));
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      // Server rejected it — surface field errors inline if we got them.
      if (data.fieldErrors) {
        const mapped: FieldErrors = {};
        (Object.keys(data.fieldErrors) as EstimateField[]).forEach((k) => {
          const msg = data.fieldErrors?.[k]?.[0];
          if (msg) mapped[k] = msg;
        });
        setErrors(mapped);
      }
      setStatus("error");
      setFormError(
        data.error ??
          "Something went wrong sending your request. Please try again, or call us.",
      );
      requestAnimationFrame(() => formErrorRef.current?.focus());
    } catch {
      // Network failure — be honest and hand them the reliable path.
      setStatus("error");
      setFormError(
        "We couldn't reach our server just now. Please try again in a moment, or call us at " +
          site.phone.display +
          ".",
      );
      requestAnimationFrame(() => formErrorRef.current?.focus());
    }
  }

  function resetForm() {
    setValues(EMPTY_FORM);
    setErrors({});
    setFormError(null);
    setStatus("idle");
    setDelivered(false);
  }

  // ---- SUCCESS STATE: honest confirmation ---------------------------------
  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] p-7 shadow-[var(--shadow-sm)] outline-none sm:p-9"
      >
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-success)_14%,transparent)] text-[var(--color-success)]"
          aria-hidden="true"
        >
          <Icon name="CheckCircle2" size={26} />
        </span>

        <h3 className="mt-5 font-display text-2xl text-[var(--color-slate-800)]">
          Request received — thank you.
        </h3>

        {/* Truthful copy: we do NOT claim an email was sent unless it was. */}
        <p className="mt-3 text-[var(--color-slate-500)]">
          {delivered
            ? "We've sent your details to our team. We'll review what you've told us and follow up to book your free estimate — usually by phone, within one business day."
            : "We've logged your request. Our team will follow up to book your free estimate — usually by phone, within one business day."}
        </p>

        <p className="mt-4 text-[var(--color-slate-500)]">
          Need to talk to someone sooner? Calling is the fastest way to reach us
          — especially for an active leak or storm damage.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={site.phone.href} size="lg">
            <Icon name="Phone" size={18} aria-hidden />
            Call {site.phone.display}
          </Button>
          <button
            type="button"
            onClick={resetForm}
            className="text-sm font-semibold text-[var(--color-copper-600)] underline-offset-4 hover:underline"
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  // ---- FORM STATE (idle / submitting / error) -----------------------------
  const submitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-lg)] border border-[var(--color-slate-100)] bg-[var(--color-chalk-50)] p-6 shadow-[var(--shadow-sm)] sm:p-8"
    >
      {/* Spec-sheet header: the one bold flourish — copper course rule + label */}
      <div className="mb-7">
        <span className="eyebrow">Estimate request</span>
        <h3 className="mt-3 font-display text-xl text-[var(--color-slate-800)] sm:text-2xl">
          Tell us about your roof
        </h3>
        <p className="mt-2 text-sm text-[var(--color-slate-500)]">
          The more you can tell us, the better prepared we&rsquo;ll be. Fields
          marked with an asterisk are required.
        </p>
      </div>

      {/* Top-level error summary (focusable, announced) */}
      {formError && status !== "submitting" ? (
        <div
          ref={formErrorRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-[var(--radius-sm)] border border-[color-mix(in_srgb,var(--color-danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-danger)_8%,transparent)] px-4 py-3 text-sm text-[var(--color-danger)] outline-none"
        >
          <Icon name="ShieldAlert" size={18} className="mt-0.5 shrink-0" aria-hidden />
          <span>{formError}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name (full width) */}
        <Field
          className="sm:col-span-2"
          id={fid("name")}
          label="Your name"
          required
          error={errors.name}
          errorId={errId("name")}
        >
          <input
            id={fid("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="First and last name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errId("name") : undefined}
            className={cn(fieldBase, errors.name && errorRing)}
          />
        </Field>

        {/* Phone */}
        <Field
          id={fid("phone")}
          label="Phone"
          hint="Best for a fast callback"
          error={errors.phone}
          errorId={errId("phone")}
        >
          <input
            id={fid("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="905-555-0123"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errId("phone") : undefined}
            className={cn(fieldBase, errors.phone && errorRing)}
          />
        </Field>

        {/* Email */}
        <Field
          id={fid("email")}
          label="Email"
          hint="Optional"
          error={errors.email}
          errorId={errId("email")}
        >
          <input
            id={fid("email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errId("email") : undefined}
            className={cn(fieldBase, errors.email && errorRing)}
          />
        </Field>

        {/* City */}
        <Field
          id={fid("city")}
          label="Closest town"
          required
          error={errors.city}
          errorId={errId("city")}
        >
          <div className="relative">
            <select
              id={fid("city")}
              name="city"
              value={values.city}
              onChange={(e) => update("city", e.target.value)}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? errId("city") : undefined}
              className={cn(fieldBase, selectBase, errors.city && errorRing)}
            >
              <option value="" disabled>
                Select your area
              </option>
              {cityOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>

        {/* Service */}
        <Field
          id={fid("service")}
          label="What do you need?"
          required
          error={errors.service}
          errorId={errId("service")}
        >
          <div className="relative">
            <select
              id={fid("service")}
              name="service"
              value={values.service}
              onChange={(e) => update("service", e.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? errId("service") : undefined}
              className={cn(fieldBase, selectBase, errors.service && errorRing)}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>

        {/* Message (full width) */}
        <Field
          className="sm:col-span-2"
          id={fid("message")}
          label="About your roof"
          required
          error={errors.message}
          errorId={errId("message")}
        >
          <textarea
            id={fid("message")}
            name="message"
            rows={5}
            placeholder="What's going on? e.g. shingles missing after the last windstorm, a leak above the kitchen, or you'd like a quote to replace an aging roof."
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? errId("message") : undefined}
            className={cn(fieldBase, "resize-y leading-relaxed", errors.message && errorRing)}
          />
        </Field>

        {/* Honeypot — hidden from people + AT, catnip for bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={fid("company")}>Company (leave blank)</label>
          <input
            id={fid("company")}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={submitting} block className="sm:w-auto">
          {submitting ? (
            <>
              <Spinner /> Sending&hellip;
            </>
          ) : (
            <>
              Request my free estimate
              <Icon name="ArrowRight" size={18} aria-hidden />
            </>
          )}
        </Button>
        <p className="text-xs leading-relaxed text-[var(--color-slate-400)]">
          No cost, no obligation. We&rsquo;ll only use your details to follow up
          about your roof.
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------------- */
/* Local presentational helpers (kept here — they're specific to this form). */
/* ------------------------------------------------------------------------- */

const errorRing =
  "border-[var(--color-danger)] focus:border-[var(--color-danger)]";

const selectBase = "appearance-none pr-10 cursor-pointer";

function Field({
  id,
  label,
  required,
  hint,
  error,
  errorId,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  errorId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-slate-600)]"
        >
          {label}
          {required ? (
            <span className="ml-1 text-[var(--color-copper-600)]" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        {hint ? (
          <span className="text-xs text-[var(--color-slate-400)]">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-[var(--color-danger)]"
        >
          <Icon name="ShieldAlert" size={14} className="shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectChevron() {
  return (
    <Icon
      name="ChevronDown"
      size={18}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-slate-400)]"
    />
  );
}

function Spinner() {
  // Pure SVG spinner; the spin animation is suppressed under reduced-motion by
  // the global media query in globals.css (animation-duration → ~0).
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
