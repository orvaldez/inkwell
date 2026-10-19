// client/src/test-setup.js
import "@testing-library/jest-dom";

// Polyfill localStorage to prevent Node's built-in stub conflict in jsdom
if (typeof window.localStorage?.getItem !== "function") {
  const store = new Map();
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => store.set(key, String(value)),
      removeItem: (key) => store.delete(key),
      clear: () => store.clear(),
    },
  });
}