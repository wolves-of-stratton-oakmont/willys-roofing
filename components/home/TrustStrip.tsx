import { Icon } from "@/components/Icon";
import { trustBadges } from "@/lib/trust";

/**
 * TrustStrip — a compact, quiet reassurance bar that bridges the hero and the
 * content below. Renders the four `trustBadges` as an evenly divided row on a
 * slate band (so it reads as a structural seam, not another loud section). No
 * new claims here — it only reinforces what the hero already said.
 */
export function TrustStrip() {
  return (
    <section className="border-y border-white/5 bg-[var(--color-slate-800)]">
      <div className="container-site">
        <ul className="grid grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {trustBadges.map((b) => (
            <li
              key={b.label}
              className="flex items-center justify-center gap-2.5 px-4 py-5 text-center"
            >
              <Icon
                name={b.icon}
                size={18}
                className="shrink-0 text-[var(--color-copper-300)]"
              />
              <span className="text-sm font-semibold text-[var(--color-chalk-100)]">
                {b.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
