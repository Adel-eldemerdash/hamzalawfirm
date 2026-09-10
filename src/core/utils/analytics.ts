/**
 * Google Analytics 4 events.
 *
 * The Google tag itself is written into every page's head by the production
 * build (see GOOGLE_TAG in webpack.config.js), which also sends each page
 * view. This module only adds events for things a page view cannot see.
 *
 * Never pass personal data: no names, email addresses, phone numbers, company
 * names, or free-text answers. Google's terms prohibit it, and the privacy
 * notice does not cover it. Codes and counts only.
 *
 * In a development build there is no tag, `gtag` is undefined, and every call
 * is a no-op.
 */

type EventParams = { [key: string]: string | number | boolean };

export function track(eventName: string, params?: EventParams): void {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", eventName, params || {});
}
