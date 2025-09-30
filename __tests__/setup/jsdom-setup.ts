/**
 * Custom jsdom environment for better CI compatibility
 */

import { beforeAll, afterAll } from "vitest";

beforeAll(async () => {
  // Ensure proper jsdom setup
  if (typeof window !== "undefined") {
    // Set up global variables that might be missing
    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;

    // Handle URL API
    if (!global.URL) {
      global.URL = window.URL;
    }

    // Handle URLSearchParams
    if (!global.URLSearchParams) {
      global.URLSearchParams = window.URLSearchParams;
    }
  }
});

afterAll(() => {
  // Cleanup
});
