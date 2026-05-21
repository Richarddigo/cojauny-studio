/**
 * HTML escape utility for safely interpolating user-controlled values
 * into HTML email templates. Prevents XSS / HTML injection into inboxes.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Strip CR/LF characters from header-bound values (subject, replyTo, etc.)
 * to prevent SMTP header injection.
 */
export function sanitizeHeader(input: string): string {
  return input.replace(/[\r\n]+/g, " ").trim();
}
