import { describe, test, expect, vi, beforeEach } from "vitest";

// Mock the authService - must be at top level for proper hoisting
vi.mock("../../../app/services/authService", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

import { fileService } from "../../../app/services/fileService";
import api from "../../../app/services/authService";

// Get the mocked functions after import
const mockPost = vi.mocked(api.post);
const mockGet = vi.mocked(api.get);

describe("FileService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPost.mockClear();
    mockGet.mockClear();
  });

  describe("countFile", () => {
    test("successfully processes a PDF file", async () => {
      const mockFile = new File(["test content"], "resume.pdf", {
        type: "application/pdf",
      });
      const mockResponse = {
        data: {
          success: true,
          data: {
            originalName: "resume.pdf",
            size: 1024,
            totalFilesUploaded: 5,
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
      expect(result.originalName).toBe("resume.pdf");
      expect(result.size).toBe(1024);
      expect(result.totalFilesUploaded).toBe(5);
    });

    test("handles file processing failure", async () => {
      const mockFile = new File(["test content"], "resume.pdf", {
        type: "application/pdf",
      });
      const mockError = {
        response: {
          status: 400,
          data: {
            success: false,
            message: "File size too large",
          },
        },
      };

      mockPost.mockRejectedValueOnce(mockError);

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "File size too large"
      );
    });

    test("handles network error", async () => {
      const mockFile = new File(["test content"], "resume.pdf", {
        type: "application/pdf",
      });

      mockPost.mockRejectedValueOnce(new Error("Network error"));

      await expect(fileService.countFile(mockFile)).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("getUploadStats", () => {
    test("successfully retrieves upload statistics", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            totalFilesUploaded: 10,
            user: {
              id: "123",
              name: "John Doe",
              email: "john@example.com",
            },
          },
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await fileService.getUploadStats();

      expect(mockGet).toHaveBeenCalledWith("/files/stats");
      expect(result.totalFilesUploaded).toBe(10);
      expect(result.user.name).toBe("John Doe");
    });

    test("handles stats retrieval failure", async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            success: false,
            message: "Unauthorized access",
          },
        },
      };

      mockGet.mockRejectedValueOnce(mockError);

      await expect(fileService.getUploadStats()).rejects.toThrow(
        "Unauthorized access"
      );
    });
  });
});
