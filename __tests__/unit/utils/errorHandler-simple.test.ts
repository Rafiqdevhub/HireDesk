import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getErrorCategory,
  formatErrorMessage,
} from "../../../app/utils/errorHandler";

// Simple unit tests for the error handler utility functions
describe("errorHandler utility functions", () => {
  describe("getErrorCategory", () => {
    it("should categorize network errors", () => {
      const networkError1 = { message: "Network error occurred" };
      const networkError2 = { message: "Failed to fetch data" };
      const networkError3 = new Error("network timeout");

      expect(getErrorCategory(networkError1)).toBe("network");
      expect(getErrorCategory(networkError2)).toBe("network");
      expect(getErrorCategory(networkError3)).toBe("network");
    });

    it("should categorize file errors", () => {
      const fileError1 = { message: "File upload failed" };
      const fileError2 = { message: "Invalid file format" };
      const uploadError = new Error("upload size exceeded");

      expect(getErrorCategory(fileError1)).toBe("file");
      expect(getErrorCategory(fileError2)).toBe("file");
      expect(getErrorCategory(uploadError)).toBe("file");
    });

    it("should categorize validation errors", () => {
      const validationError1 = { message: "Validation failed" };
      const validationError2 = { message: "Email is required" };
      const requiredError = new Error("required field missing");

      expect(getErrorCategory(validationError1)).toBe("validation");
      expect(getErrorCategory(validationError2)).toBe("validation");
      expect(getErrorCategory(requiredError)).toBe("validation");
    });

    it("should categorize limit errors", () => {
      const limitError1 = { message: "Rate limit exceeded" };
      const limitError2 = { message: "Quota reached" };
      const limitError3 = new Error("limit exceeded");

      expect(getErrorCategory(limitError1)).toBe("limit");
      expect(getErrorCategory(limitError2)).toBe("limit");
      expect(getErrorCategory(limitError3)).toBe("limit");
    });

    it("should be case insensitive", () => {
      const upperCaseError = { message: "NETWORK ERROR" };
      const mixedCaseError = { message: "File Upload Error" };

      expect(getErrorCategory(upperCaseError)).toBe("network");
      expect(getErrorCategory(mixedCaseError)).toBe("file");
    });
  });

  describe("formatErrorMessage", () => {
    it("should return string errors as-is", () => {
      const stringError = "This is a string error";
      expect(formatErrorMessage(stringError)).toBe(stringError);
    });

    it("should extract message from error objects", () => {
      const errorWithMessage = { message: "Error message from object" };
      expect(formatErrorMessage(errorWithMessage)).toBe(
        "Error message from object"
      );
    });

    it("should handle empty string messages correctly", () => {
      const errorWithEmptyMessage = { message: "" };
      expect(formatErrorMessage(errorWithEmptyMessage)).toBe(
        "An unexpected error occurred"
      );
    });

    it("should return default message for null/undefined errors", () => {
      expect(formatErrorMessage(null)).toBe("An unexpected error occurred");
      expect(formatErrorMessage(undefined)).toBe(
        "An unexpected error occurred"
      );
    });
  });
});
