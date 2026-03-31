import { cookies, headers } from "next/headers";
import { LANGUAGE_COOKIE_NAME, resolvePreferredLocale, type Locale } from "@/lib/i18n";

export async function getRequestLocale(): Promise<Locale> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);

  return resolvePreferredLocale({
    storedLocale: cookieStore.get(LANGUAGE_COOKIE_NAME)?.value,
    acceptLanguage: headerStore.get("accept-language"),
  });
}
