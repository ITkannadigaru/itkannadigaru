export const SITE_ROOT = "/itkannadigaru";
export const GUEST_KEY = "itkannadigaru-guest-session";
export const RETURN_KEY = "itkannadigaru-login-return";
export const OAUTH_KEY = "itkannadigaru-oauth-pending";

export function safeReturnPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return SITE_ROOT;
  const parsed = new URL(value, "https://example.invalid");
  if (parsed.origin !== "https://example.invalid" ||
      !(parsed.pathname === SITE_ROOT || parsed.pathname.startsWith(`${SITE_ROOT}/`)) ||
      parsed.pathname === `${SITE_ROOT}/login` || parsed.pathname === `${SITE_ROOT}/login/`) {
    return SITE_ROOT;
  }
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}
