import { describe, test, expect, vi, beforeEach } from "vitest";
import api from "../../../app/services/authService";

// Mock the authService API
vi.mock("../../../app/services/authService", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

// Import after mock
const { fileService } = await import("../../../app/services/fileService");

const mockPost = vi.fn();
const mockGet = vi.fn();

vi.mocked(api).post = mockPost;
vi.mocked(api).get = mockGet;

describe("fileService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("countFile", () => {
    test("successfully counts and processes file", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockResponse = {
        data: {
          success: true,
          message: "File processed successfully",
          data: {
            originalName: "resume.pdf",
            size: 1024,
            totalFilesUploaded: 1,
          },
        },
      };

      mockPost.mockResolvedValueOnce(mockResponse);

      const result = await fileService.countFile(mockFile);

      expect(mockPost).toHaveBeenCalledWith(
        "/files/count",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      expect(result).toEqual({
        originalName: "resume.pdf",
        size: 1024,
        totalFilesUploaded: 1,
      });
    });

    test("handles API error responses", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockErrorResponse = {
        response: {
          data: {
            success: false,
            message: "File upload failed",
          },
        },
      };

      mockPost.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "File upload failed"
      );
    });

    test("handles network errors", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      mockPost.mockRejectedValueOnce({
        code: "NETWORK_ERROR",
        message: "Network Error",
      });

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "Unable to connect to the server. Please check your internet connection."
      );
    });

    test("handles file size validation error with message field", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockErrorResponse = {
        response: {
          data: {
            message: "File size exceeds 10MB limit",
          },
        },
      };

      mockPost.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "File size exceeds 10MB limit"
      );
    });

    test("handles invalid file format error with error field", async () => {
      const mockFile = new File(["content"], "resume.txt", {
        type: "text/plain",
      });

      const mockErrorResponse = {
        response: {
          data: {
            error: "Invalid file format. Only PDF and DOCX are supported.",
          },
        },
      };

      mockPost.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "Invalid file format. Only PDF and DOCX are supported."
      );
    });

    test("handles rate limiting error (429)", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockErrorResponse = {
        response: {
          status: 429,
          data: {
            message: "Daily upload limit reached",
            current_count: 10,
            limit: 10,
          },
        },
      };

      mockPost.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "Daily upload limit reached"
      );
    });

    test("handles unauthorized error (401)", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockErrorResponse = {
        response: {
          status: 401,
          data: {
            message: "Unauthorized. Please login.",
          },
        },
      };

      mockPost.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "Unauthorized. Please login."
      );
    });

    test("handles server error (500)", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockErrorResponse = {
        response: {
          status: 500,
          data: {
            message: "Internal server error",
          },
        },
      };

      mockPost.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "Internal server error"
      );
    });

    test("creates FormData with correct file field", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockResponse = {
        data: {
          success: true,
          message: "File processed successfully",
          data: {
            originalName: "resume.pdf",
            size: 1024,
            totalFilesUploaded: 1,
          },
        },
      };

      mockPost.mockResolvedValueOnce(mockResponse);

      await fileService.countFile(mockFile);

      // Verify FormData was created
      const callArgs = mockPost.mock.calls[0];
      expect(callArgs[0]).toBe("/files/count");
      expect(callArgs[1]).toBeInstanceOf(FormData);
      expect(callArgs[2]).toEqual({
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    });

    test("handles response with missing data field", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockResponse = {
        data: {
          success: true,
          message: "File processed successfully",
          // Missing data field
        },
      };

      mockPost.mockResolvedValueOnce(mockResponse);

      await expect(fileService.countFile(mockFile)).rejects.toThrow();
    });

    test("handles default error message when no specific error found", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockErrorResponse = {
        response: {
          data: {
            someOtherField: "Some value",
          },
        },
      };

      mockPost.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "Failed to process file. Please try again."
      );
    });

    test("handles error with array of validation errors", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockErrorResponse = {
        response: {
          data: {
            errors: [
              { message: "First validation error" },
              { message: "Second validation error" },
            ],
          },
        },
      };

      mockPost.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "First validation error"
      );
    });
  });

  describe("getUploadStats", () => {
    test("successfully retrieves upload statistics", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Stats retrieved successfully",
          data: {
            totalFilesUploaded: 5,
            user: {
              id: "user123",
              name: "John Doe",
              email: "john@example.com",
            },
          },
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await fileService.getUploadStats();

      expect(mockGet).toHaveBeenCalledWith("/files/stats");

      expect(result).toEqual({
        totalFilesUploaded: 5,
        user: {
          id: "user123",
          name: "John Doe",
          email: "john@example.com",
        },
      });
    });

    test("handles API error responses", async () => {
      const mockErrorResponse = {
        response: {
          data: {
            success: false,
            message: "Failed to load stats",
          },
        },
      };

      mockGet.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.getUploadStats()).rejects.toThrow(
        "Failed to load stats"
      );
    });

    test("handles validation errors", async () => {
      const mockErrorResponse = {
        response: {
          data: {
            errors: [{ message: "Authentication required" }],
          },
        },
      };

      mockGet.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.getUploadStats()).rejects.toThrow(
        "Authentication required"
      );
    });

    test("handles network errors", async () => {
      mockGet.mockRejectedValueOnce({
        code: "NETWORK_ERROR",
        message: "Network Error",
      });

      await expect(fileService.getUploadStats()).rejects.toThrow(
        "Unable to connect to the server. Please check your internet connection."
      );
    });

    test("handles unauthorized error (401)", async () => {
      const mockErrorResponse = {
        response: {
          status: 401,
          data: {
            message: "Session expired. Please login again.",
          },
        },
      };

      mockGet.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.getUploadStats()).rejects.toThrow(
        "Session expired. Please login again."
      );
    });

    test("handles server error (500)", async () => {
      const mockErrorResponse = {
        response: {
          status: 500,
          data: {
            message: "Failed to retrieve statistics",
          },
        },
      };

      mockGet.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.getUploadStats()).rejects.toThrow(
        "Failed to retrieve statistics"
      );
    });

    test("handles response with zero files uploaded", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Stats retrieved successfully",
          data: {
            totalFilesUploaded: 0,
            user: {
              id: "user123",
              name: "New User",
              email: "newuser@example.com",
            },
          },
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await fileService.getUploadStats();

      expect(result.totalFilesUploaded).toBe(0);
      expect(result.user.name).toBe("New User");
    });

    test("handles response with large file count", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Stats retrieved successfully",
          data: {
            totalFilesUploaded: 9999,
            user: {
              id: "user456",
              name: "Power User",
              email: "poweruser@example.com",
            },
          },
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await fileService.getUploadStats();

      expect(result.totalFilesUploaded).toBe(9999);
    });

    test("handles missing user data in response", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Stats retrieved successfully",
          data: {
            totalFilesUploaded: 5,
            // Missing user field - but service doesn't validate this
          },
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await fileService.getUploadStats();
      expect(result.totalFilesUploaded).toBe(5);
      // Service returns data as-is without strict validation
    });

    test("handles error with message field", async () => {
      const mockErrorResponse = {
        response: {
          data: {
            message: "Invalid authentication token",
          },
        },
      };

      mockGet.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.getUploadStats()).rejects.toThrow(
        "Invalid authentication token"
      );
    });

    test("handles error with error field", async () => {
      const mockErrorResponse = {
        response: {
          data: {
            error: "Database connection failed",
          },
        },
      };

      mockGet.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.getUploadStats()).rejects.toThrow(
        "Database connection failed"
      );
    });

    test("handles default error message", async () => {
      const mockErrorResponse = {
        response: {
          data: {
            someOtherField: "value",
          },
        },
      };

      mockGet.mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.getUploadStats()).rejects.toThrow(
        "Failed to load upload statistics."
      );
    });

    test("uses correct endpoint", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Stats retrieved successfully",
          data: {
            totalFilesUploaded: 5,
            user: {
              id: "user123",
              name: "John Doe",
              email: "john@example.com",
            },
          },
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      await fileService.getUploadStats();

      expect(mockGet).toHaveBeenCalledWith("/files/stats");
      expect(mockGet).toHaveBeenCalledTimes(1);
    });
  });
});
