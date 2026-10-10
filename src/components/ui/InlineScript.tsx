/**
 * Inline script that is emitted only in the server HTML (runs during parsing on hard
 * loads, or is read by crawlers for JSON-LD), without React's client-render warning.
 */
export function InlineScript({ html, type = "text/javascript" }: { html: string; type?: string }) {
  return (
    <script
      type={typeof window === "undefined" ? type : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
