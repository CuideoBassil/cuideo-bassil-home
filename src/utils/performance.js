/**
 * Performance monitoring utilities for tracking web vitals
 * and optimizing user experience
 */

/**
 * Reports web vitals metrics to analytics
 * @param {Object} metric - Web vital metric object
 */
export function reportWebVitals(metric) {
  if (process.env.NODE_ENV === "production") {
    // You can send to analytics service like Google Analytics
    console.log(metric);

    // Example: Send to Google Analytics
    // if (window.gtag) {
    //   window.gtag('event', metric.name, {
    //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //     event_label: metric.id,
    //     non_interaction: true,
    //   });
    // }
  }
}

/**
 * Preload critical resources
 * @param {string} href - Resource URL
 * @param {string} as - Resource type (script, style, font, image)
 */
export function preloadResource(href, as = "script") {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;

    if (as === "font") {
      link.crossOrigin = "anonymous";
    }

    document.head.appendChild(link);
  }
}

/**
 * Prefetch resource for future navigation
 * @param {string} href - Resource URL
 */
export function prefetchResource(href) {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  }
}

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if device is mobile
 */
export function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get connection speed
 */
export function getConnectionSpeed() {
  if (typeof navigator !== "undefined" && "connection" in navigator) {
    return navigator.connection.effectiveType;
  }
  return "unknown";
}

/**
 * Lazy load images when they enter viewport
 * @param {string} selector - CSS selector for images
 */
export function lazyLoadImages(selector = "img[data-src]") {
  if (typeof window === "undefined") return;

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll(selector).forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Measure component render time
 * @param {string} componentName - Name of the component
 */
export function measureRenderTime(componentName) {
  if (typeof window !== "undefined" && window.performance) {
    const startMark = `${componentName}-start`;
    const endMark = `${componentName}-end`;
    const measureName = `${componentName}-render`;

    return {
      start: () => performance.mark(startMark),
      end: () => {
        performance.mark(endMark);
        performance.measure(measureName, startMark, endMark);
        const measure = performance.getEntriesByName(measureName)[0];
        console.log(
          `${componentName} rendered in ${measure.duration.toFixed(2)}ms`
        );
        performance.clearMarks(startMark);
        performance.clearMarks(endMark);
        performance.clearMeasures(measureName);
      },
    };
  }
  return { start: () => {}, end: () => {} };
}
