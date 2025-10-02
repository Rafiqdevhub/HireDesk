import { describe, test, expect, vi, beforeEach } from "vitest";
import { fileService } from "../../../app/services/fileService";
import api from "../../../app/services/authService";

// Mock the authService API
vi.mock("../../../app/services/authService", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

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
  });
});
