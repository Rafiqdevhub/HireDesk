import { describe, it, expect } from "vitest";
import {
  getErrorCategory,
  formatErrorMessage,
} from "../../../app/utils/errorHandler";

describe("errorHandler", () => {
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
      const fileError3 = new Error("upload size exceeded");

      expect(getErrorCategory(fileError1)).toBe("file");
      expect(getErrorCategory(fileError2)).toBe("file");
      expect(getErrorCategory(fileError3)).toBe("file");
    });

    it("should categorize validation errors", () => {
      const validationError1 = { message: "Validation failed" };
      const validationError2 = { message: "Email is required" };
      const validationError3 = new Error("required field missing");

      expect(getErrorCategory(validationError1)).toBe("validation");
      expect(getErrorCategory(validationError2)).toBe("validation");
      expect(getErrorCategory(validationError3)).toBe("validation");
    });

    it("should categorize limit errors", () => {
      const limitError1 = { message: "Rate limit exceeded" };
      const limitError2 = { message: "Quota reached" };
      const limitError3 = new Error("limit exceeded");

      expect(getErrorCategory(limitError1)).toBe("limit");
      expect(getErrorCategory(limitError2)).toBe("limit");
      expect(getErrorCategory(limitError3)).toBe("limit");
    });

    it("should categorize unknown errors as general", () => {
      const generalError1 = { message: "Something went wrong" };
      const generalError2 = { message: "Unexpected error" };
      const generalError3 = new Error("random error");
      const emptyError = {};
      const nullError = null;

      expect(getErrorCategory(generalError1)).toBe("general");
      expect(getErrorCategory(generalError2)).toBe("general");
      expect(getErrorCategory(generalError3)).toBe("general");
      expect(getErrorCategory(emptyError)).toBe("general");
      expect(getErrorCategory(nullError)).toBe("general");
    });

    it("should handle errors without message property", () => {
      const errorWithoutMessage = { code: 500 };
      const stringError = "some error";
      const undefinedError = undefined;

      expect(getErrorCategory(errorWithoutMessage)).toBe("general");
      expect(getErrorCategory(stringError)).toBe("general");
      expect(getErrorCategory(undefinedError)).toBe("general");
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

    it("should return default message for errors without message", () => {
      const errorWithoutMessage = { code: 500, status: "error" };
      expect(formatErrorMessage(errorWithoutMessage)).toBe(
        "An unexpected error occurred"
      );
    });

    it("should handle null and undefined errors", () => {
      expect(formatErrorMessage(null)).toBe("An unexpected error occurred");
      expect(formatErrorMessage(undefined)).toBe(
        "An unexpected error occurred"
      );
    });

    it("should handle Error instances", () => {
      const error = new Error("Native error message");
      expect(formatErrorMessage(error)).toBe("Native error message");
    });

    it("should handle empty objects", () => {
      const emptyError = {};
      expect(formatErrorMessage(emptyError)).toBe(
        "An unexpected error occurred"
      );
    });

    it("should handle complex nested objects", () => {
      const complexError = {
        response: {
          data: {
            message: "Nested error message",
          },
        },
        message: "Top level message",
      };
      expect(formatErrorMessage(complexError)).toBe("Top level message");
    });

    it("should prioritize message property over other fields", () => {
      const errorWithMultipleFields = {
        message: "Primary message",
        error: "Secondary error",
        description: "Error description",
      };
      expect(formatErrorMessage(errorWithMultipleFields)).toBe(
        "Primary message"
      );
    });

    it("should handle empty string messages", () => {
      const errorWithEmptyMessage = { message: "" };
      expect(formatErrorMessage(errorWithEmptyMessage)).toBe(
        "An unexpected error occurred"
      );
    });

    it("should handle boolean and number inputs", () => {
      expect(formatErrorMessage(true)).toBe("An unexpected error occurred");
      expect(formatErrorMessage(false)).toBe("An unexpected error occurred");
      expect(formatErrorMessage(123)).toBe("An unexpected error occurred");
      expect(formatErrorMessage(0)).toBe("An unexpected error occurred");
    });
  });
});
