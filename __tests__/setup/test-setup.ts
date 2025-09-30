import { vi } from "vitest";
import "@testing-library/jest-dom";

// Handle unhandled promise rejections in tests
process.on("unhandledRejection", (reason, promise) => {
  console.warn("Unhandled Promise Rejection at:", promise, "reason:", reason);
});

// Suppress jsdom errors for CI compatibility
const originalError = console.error;
console.error = (...args) => {
  // Suppress specific webidl-conversions errors that occur in CI
  if (typeof args[0] === "string" && args[0].includes("webidl-conversions")) {
    return;
  }
  originalError.apply(console, args);
};

// Mock browser APIs for jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock localStorage with actual storage behavior
const createStorageMock = () => {
  const storage = new Map<string, string>();
  return {
    getItem: vi.fn((key: string) => storage.get(key) || null),
    setItem: vi.fn((key: string, value: string) => storage.set(key, value)),
    removeItem: vi.fn((key: string) => storage.delete(key)),
    clear: vi.fn(() => storage.clear()),
    get length() {
      return storage.size;
    },
    key: vi.fn((index: number) => {
      const keys = Array.from(storage.keys());
      return keys[index] || null;
    }),
  };
};

global.localStorage = createStorageMock() as any;
global.sessionStorage = createStorageMock() as any;
