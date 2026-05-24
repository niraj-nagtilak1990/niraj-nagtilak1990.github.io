/**
 * Push a custom event to GTM's dataLayer.
 * Safe — silently does nothing if GTM hasn't loaded yet.
 */
export function track(event, params = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {
    // GTM not loaded — ignore
  }
}
