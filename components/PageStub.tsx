import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { site } from "@/lib/site";

/**
 * PageStub — shared scaffold for Wave 1 route stubs.
 *
 * Renders a slate page header + a placeholder body + the standard CTA, so
 * every route is valid, navigable and on-brand before Wave 2 builds it out.
 * Wave 2 owners REPLACE their page's contents entirely; this component and
 * its usages will naturally disappear as pages are implemented.
 */
export function PageStub({
  eyebrow,
  title,
  intro,
  owner,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  /** Wave 2 owner name, shown in a small build note. */
  owner: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Section tone="slate" spacing="md">
        <SectionHeader
          as="h1"
          tone="onDark"
          eyebrow={eyebrow}
          title={title}
          intro={intro}
        />
      </Section>

      <Section>
        <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-slate-200)] bg-[var(--color-chalk-50)] p-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-copper-600)]">
            Wave 1 stub
          </p>
          <p className="mt-3 text-[var(--color-slate-500)]">
            This page is a foundation placeholder. Full build owned by{" "}
            <span className="font-semibold text-[var(--color-slate-700)]">
              {owner}
            </span>{" "}
            in Wave 2.
          </p>
          {children}
        </div>
      </Section>

      <Section tone="muted" spacing="sm">
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <p className="text-lg font-semibold text-[var(--color-slate-700)]">
            Questions about your roof? We&rsquo;re happy to help.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={site.phone.href} size="lg">
              <Icon name="Phone" size={18} />
              {site.phone.display}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Free estimate
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
