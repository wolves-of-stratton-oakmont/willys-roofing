/**
 * JsonLd — render a schema.org JSON-LD payload as a <script type="application/ld+json">.
 *
 * One reusable injector so every structured-data block is serialized and escaped
 * identically. `<` is replaced with its unicode escape (<) per Next.js
 * guidance, so the serialized JSON can never break out of the <script> element
 * or inject markup. Pass a plain object (or array) of schema.org data.
 *
 * Server component — emits a static <script> at render time, no client JS.
 *
 * NOTE: /faq ships its own FAQPage JSON-LD inline (Dale) using this same
 * escaping convention; this component is used for the home LocalBusiness and the
 * per-service Service schema. Don't duplicate the FAQPage here.
 */

type JsonLdProps = {
  /** A schema.org object graph (or array of them). */
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inlined as a script; the payload is JSON-serialized and
      // its "<" escaped below, so it cannot break out of the element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
