const isBrowser = typeof window !== 'undefined';

export function trackEvent(eventName, params = {}) {
  if (!isBrowser || typeof window.gtag !== 'function' || !eventName) return;

  window.gtag('event', eventName, params);
}

