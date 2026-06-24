"use client";

/**
 * Global error boundary — the last line of defence. It activates only when
 * the ROOT layout itself throws, which means it REPLACES the root layout and
 * cannot rely on it: no Header/Footer, and globals.css / next-font may not be
 * available. So this file is deliberately self-contained and styled inline
 * with the brand's literal hex values, so it always renders correctly.
 *
 * Next.js 16: error boundaries must be Client Components and cannot export
 * `metadata` — we set the document title with React's <title>. The recovery
 * action uses `unstable_retry` (Next 16); we accept `reset` too for safety.
 *
 * Brand: slate #16222E ground, copper #C26B2C accent, chalk #F4F7F8 text.
 */
export default function GlobalError({
  error,
  unstable_retry,
  reset,
}: {
  error: Error & { digest?: string };
  unstable_retry?: () => void;
  reset?: () => void;
}) {
  const retry = unstable_retry ?? reset;

  return (
    <html lang="en-CA">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.25rem",
          backgroundColor: "#16222E",
          color: "#F4F7F8",
          fontFamily:
            "'Public Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          lineHeight: 1.6,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <title>Something went wrong | Willy's Roofing</title>

        <main style={{ maxWidth: "34rem", width: "100%", textAlign: "center" }}>
          {/* Roof-pitch mark — the Ridgeline signature, inline so it never
              depends on the stylesheet. */}
          <svg
            width="72"
            height="34"
            viewBox="0 0 72 34"
            fill="none"
            aria-hidden="true"
            style={{ marginBottom: "1.75rem" }}
          >
            <path
              d="M4 28 L36 5 L68 28"
              stroke="#C26B2C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 31 L36 16 L56 31"
              stroke="#7D92A6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p
            style={{
              margin: 0,
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#E6A86F",
            }}
          >
            Unexpected error
          </p>

          <h1
            style={{
              margin: "1rem 0 0",
              fontFamily: "'Archivo', system-ui, sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.015em",
              lineHeight: 1.08,
              fontSize: "clamp(2rem, 1.5rem + 2vw, 2.75rem)",
              color: "#FBFCFD",
            }}
          >
            Something went wrong on our end
          </h1>

          <p
            style={{
              margin: "1.25rem auto 0",
              maxWidth: "30rem",
              fontSize: "1.0625rem",
              color: "#D4DDE4",
            }}
          >
            Sorry about that — an unexpected error stopped this page from
            loading. Please try again, or reach us directly and we&rsquo;ll be
            glad to help.
          </p>

          <div
            style={{
              marginTop: "2.25rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            {retry ? (
              <button
                type="button"
                onClick={() => retry()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  height: "3.5rem",
                  padding: "0 1.75rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  backgroundColor: "#C26B2C",
                  boxShadow: "0 14px 34px -12px rgba(168, 90, 36, 0.42)",
                }}
              >
                Try again
              </button>
            ) : null}

            <a
              href="tel:+14164148452"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                height: "3.5rem",
                padding: "0 1.75rem",
                borderRadius: "4px",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#16222E",
                backgroundColor: "#FBFCFD",
              }}
            >
              Call 416-414-8452
            </a>

            {/* Plain <a> on purpose: this boundary replaces the root layout
                when it has itself failed, so we want a FULL document reload
                (not a client-side Link navigation through possibly-broken
                router/layout context) to recover cleanly. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                height: "3.5rem",
                padding: "0 1.75rem",
                borderRadius: "4px",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#F4F7F8",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              Back to home
            </a>
          </div>

          {/* Error digest aids support without leaking details. */}
          {error?.digest ? (
            <p
              style={{
                marginTop: "2rem",
                fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                fontSize: "0.75rem",
                color: "#7D92A6",
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
