/**
 * Send a custom event to Google Analytics GA4 via gtag().
 * Safe — silently does nothing if GA4 hasn't loaded yet.
 */
export function track(event, params = {}) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
  } catch {
    // GA4 not loaded yet — ignore
  }
}
