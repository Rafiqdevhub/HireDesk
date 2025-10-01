import { describe, test, expect } from "vitest";
import { API_ENDPOINTS } from "@/utils/api";

describe("API Endpoints", () => {
  test("should have HIREDESK_ANALYZE endpoint", () => {
    expect(API_ENDPOINTS.HIREDESK_ANALYZE).toBeDefined();
    expect(typeof API_ENDPOINTS.HIREDESK_ANALYZE).toBe("string");
    expect(API_ENDPOINTS.HIREDESK_ANALYZE).toContain("hiredesk-analyze");
  });
});
