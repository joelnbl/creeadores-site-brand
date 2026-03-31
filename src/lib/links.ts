/**
 * Resolves a path to the main creeadores-app.
 * In production this points to the app domain; uses creeadores.com as default.
 */
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.creeadores.com").replace(/\/$/, "")

export function appLink(path: string) {
  return `${APP_URL}${path}`
}

/**
 * Resolves a path to the creator site.
 */
const CREATOR_URL = (process.env.NEXT_PUBLIC_CREATOR_URL ?? "https://creeadores-site-creator.vercel.app").replace(/\/$/, "")

export function creatorLink(path: string = "") {
  return `${CREATOR_URL}${path}`
}
