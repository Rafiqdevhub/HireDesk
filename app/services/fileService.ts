import api from "./authService";
import type { FileUploadResponse, FileStatsResponse } from "../../types";

// Helper function to extract error messages from file service errors
const extractFileErrorMessage = (
  error: any,
  defaultMessage: string
): string => {
  // Check if it's an axios error with response
  if (error.response?.data) {
    const data = error.response.data;

    // Backend response format
    if (data.message) {
      return data.message;
    }

    // Backend error field
    if (data.error) {
      return data.error;
    }

    // Validation errors
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors[0].message || data.errors[0];
    }
  }

  // Direct error message
  if (error.message && error.message !== "Network Error") {
    return error.message;
  }

  // Network errors
  if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  return defaultMessage;
};

export const fileService = {
  async countFile(file: File): Promise<FileUploadResponse["data"]> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post<FileUploadResponse>(
        "/files/count",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "File upload failed");
      }

      return response.data.data;
    } catch (error: any) {
      const errorMessage = extractFileErrorMessage(
        error,
        "Failed to process file. Please try again."
      );
      throw new Error(errorMessage);
    }
  },

  async getUploadStats(): Promise<FileStatsResponse["data"]> {
    try {
      const response = await api.get<FileStatsResponse>("/files/stats");

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Failed to load stats");
      }

      return response.data.data;
    } catch (error: any) {
      const errorMessage = extractFileErrorMessage(
        error,
        "Failed to load upload statistics."
      );
      throw new Error(errorMessage);
    }
  },
};

export default fileService;
