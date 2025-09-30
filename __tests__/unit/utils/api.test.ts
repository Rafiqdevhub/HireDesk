import { describe, test, expect } from "vitest";
import { API_ENDPOINTS } from "@/utils/api";

describe("API Endpoints", () => {
  test("should have HIREDESK_ANALYZE endpoint", () => {
    expect(API_ENDPOINTS.HIREDESK_ANALYZE).toBeDefined();
    expect(typeof API_ENDPOINTS.HIREDESK_ANALYZE).toBe("string");
    expect(API_ENDPOINTS.HIREDESK_ANALYZE).toContain("hiredesk-analyze");
  });

  test("should have GENERATE_QUESTIONS endpoint", () => {
    expect(API_ENDPOINTS.GENERATE_QUESTIONS).toBeDefined();
    expect(typeof API_ENDPOINTS.GENERATE_QUESTIONS).toBe("string");
    expect(API_ENDPOINTS.GENERATE_QUESTIONS).toContain("generate-questions");
  });
});
