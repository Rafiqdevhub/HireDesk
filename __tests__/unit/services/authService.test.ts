import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";

// Mock axios before importing the service
vi.mock("axios", () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: {
        use: vi.fn(),
      },
      response: {
        use: vi.fn(),
      },
    },
  };

  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
      ...mockAxiosInstance,
    },
  };
});

// Import service after mocking
const { authService } = await import("../../../app/services/authService");

const mockAxios = vi.mocked(axios, true);

// Get existing localStorage mock from test-setup
const localStorageMock = global.localStorage as Storage & {
  clear: () => void;
};

// Mock window.location
const mockLocation = {
  pathname: "/",
  href: "/",
};

Object.defineProperty(global, "window", {
  value: {
    location: mockLocation,
  },
  writable: true,
});

describe("authService", () => {
  let mockAxiosInstance: any;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    mockLocation.pathname = "/";
    mockLocation.href = "/";

    // Get the mocked instance
    mockAxiosInstance = (mockAxios.create as any)();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("register", () => {
    test("should register user successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            accessToken: "mock-access-token",
            user: {
              id: "user-123",
              name: "Test User",
              email: "test@example.com",
              company_name: "Test Corp",
              filesUploaded: 0,
            },
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "Test123!",
        company_name: "Test Corp",
      };

      const result = await authService.register(userData);

      expect(result.accessToken).toBe("mock-access-token");
      expect(result.user.email).toBe("test@example.com");
      expect(localStorageMock.getItem("accessToken")).toBe("mock-access-token");
    });

    test("should handle duplicate email error", async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: "Email already exists",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      const userData = {
        name: "Test User",
        email: "existing@example.com",
        password: "Test123!",
        company_name: "Test Corp",
      };

      await expect(authService.register(userData)).rejects.toThrow(
        "Email already exists"
      );
    });

    test("should handle validation errors", async () => {
      const mockError = {
        response: {
          data: {
            errors: [{ message: "Password must be at least 8 characters" }],
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "weak",
        company_name: "Test Corp",
      };

      await expect(authService.register(userData)).rejects.toThrow(
        "Password must be at least 8 characters"
      );
    });

    test("should handle network errors", async () => {
      const mockError = {
        code: "NETWORK_ERROR",
        message: "Network Error",
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "Test123!",
        company_name: "Test Corp",
      };

      await expect(authService.register(userData)).rejects.toThrow(
        "Unable to connect to the server"
      );
    });

    test("should clear existing token before registration", async () => {
      localStorageMock.setItem("accessToken", "old-token");

      const mockResponse = {
        data: {
          success: true,
          data: {
            accessToken: "new-token",
            user: {
              id: "user-123",
              name: "Test User",
              email: "test@example.com",
              company_name: "Test Corp",
              filesUploaded: 0,
            },
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "Test123!",
        company_name: "Test Corp",
      };

      await authService.register(userData);

      expect(localStorageMock.getItem("accessToken")).toBe("new-token");
    });
  });

  describe("login", () => {
    test("should login user successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            accessToken: "mock-access-token",
            user: {
              id: "user-123",
              name: "Test User",
              email: "test@example.com",
              company_name: "Test Corp",
              filesUploaded: 5,
            },
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      const credentials = {
        email: "test@example.com",
        password: "Test123!",
      };

      const result = await authService.login(credentials);

      expect(result.accessToken).toBe("mock-access-token");
      expect(result.user.email).toBe("test@example.com");
      expect(localStorageMock.getItem("accessToken")).toBe("mock-access-token");
    });

    test("should handle invalid credentials", async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            success: false,
            message: "Invalid email or password",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      const credentials = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      await expect(authService.login(credentials)).rejects.toThrow(
        "Invalid email or password"
      );
    });

    test("should handle unverified email", async () => {
      const mockError = {
        response: {
          status: 403,
          data: {
            success: false,
            message: "Please verify your email first",
            requiresVerification: true,
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      const credentials = {
        email: "unverified@example.com",
        password: "Test123!",
      };

      try {
        await authService.login(credentials);
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("Please verify your email first");
        expect(error.requiresVerification).toBe(true);
        expect(error.email).toBe("unverified@example.com");
      }
    });

    test("should clear existing token before login", async () => {
      localStorageMock.setItem("accessToken", "old-token");

      const mockResponse = {
        data: {
          success: true,
          data: {
            accessToken: "new-token",
            user: {
              id: "user-123",
              name: "Test User",
              email: "test@example.com",
              company_name: "Test Corp",
              filesUploaded: 5,
            },
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      const credentials = {
        email: "test@example.com",
        password: "Test123!",
      };

      await authService.login(credentials);

      expect(localStorageMock.getItem("accessToken")).toBe("new-token");
    });
  });

  describe("verifyEmail", () => {
    test("should verify email successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            accessToken: "verified-token",
            user: {
              id: "user-123",
              name: "Test User",
              email: "test@example.com",
              company_name: "Test Corp",
              filesUploaded: 0,
            },
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      const result = await authService.verifyEmail("verification-token");

      expect(result.accessToken).toBe("verified-token");
      expect(localStorageMock.getItem("accessToken")).toBe("verified-token");
    });

    test("should handle invalid verification token", async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: "Invalid or expired verification token",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(authService.verifyEmail("invalid-token")).rejects.toThrow(
        "Invalid or expired verification token"
      );
    });

    test("should handle expired verification link", async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: "Verification link has expired",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(authService.verifyEmail("expired-token")).rejects.toThrow(
        "Verification link has expired"
      );
    });
  });

  describe("resendVerification", () => {
    test("should resend verification email successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Verification email sent",
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      await expect(
        authService.resendVerification("test@example.com")
      ).resolves.not.toThrow();
    });

    test("should handle non-existent email", async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: "Email not found",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(
        authService.resendVerification("nonexistent@example.com")
      ).rejects.toThrow("Email not found");
    });

    test("should handle rate limiting", async () => {
      const mockError = {
        response: {
          status: 429,
          data: {
            success: false,
            message: "Too many requests. Please try again later.",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(
        authService.resendVerification("test@example.com")
      ).rejects.toThrow("Too many requests");
    });
  });

  describe("forgotPassword", () => {
    test("should send password reset email successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Password reset email sent",
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      await expect(
        authService.forgotPassword("test@example.com")
      ).resolves.not.toThrow();
    });

    test("should handle non-existent email", async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: "Email not found",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(
        authService.forgotPassword("nonexistent@example.com")
      ).rejects.toThrow("Email not found");
    });

    test("should handle rate limiting", async () => {
      const mockError = {
        response: {
          status: 429,
          data: {
            success: false,
            message: "Too many password reset attempts",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(
        authService.forgotPassword("test@example.com")
      ).rejects.toThrow("Too many password reset attempts");
    });
  });

  describe("resetPasswordWithToken", () => {
    test("should reset password successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Password reset successful",
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      await expect(
        authService.resetPasswordWithToken(
          "reset-token",
          "NewPassword123!",
          "NewPassword123!"
        )
      ).resolves.not.toThrow();
    });

    test("should handle invalid reset token", async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: "Invalid or expired reset token",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(
        authService.resetPasswordWithToken(
          "invalid-token",
          "NewPassword123!",
          "NewPassword123!"
        )
      ).rejects.toThrow("Invalid or expired reset token");
    });

    test("should handle password mismatch", async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: "Passwords do not match",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(
        authService.resetPasswordWithToken(
          "reset-token",
          "NewPassword123!",
          "DifferentPassword123!"
        )
      ).rejects.toThrow("Passwords do not match");
    });

    test("should handle weak password", async () => {
      const mockError = {
        response: {
          data: {
            errors: [
              {
                message: "Password must contain at least one uppercase letter",
              },
            ],
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(
        authService.resetPasswordWithToken(
          "reset-token",
          "weakpassword",
          "weakpassword"
        )
      ).rejects.toThrow("Password must contain at least one uppercase letter");
    });
  });

  describe("logout", () => {
    test("should logout successfully", async () => {
      localStorageMock.setItem("accessToken", "test-token");

      const mockResponse = {
        data: {
          success: true,
          message: "Logged out successfully",
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      await authService.logout();

      expect(localStorageMock.getItem("accessToken")).toBeNull();
    });

    test("should clear token even if logout request fails", async () => {
      localStorageMock.setItem("accessToken", "test-token");

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(
        new Error("Network error")
      );

      await authService.logout();

      expect(localStorageMock.getItem("accessToken")).toBeNull();
    });
  });

  describe("getProfile", () => {
    test("should fetch user profile successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: "user-123",
            name: "Test User",
            email: "test@example.com",
            company_name: "Test Corp",
            filesUploaded: 10,
            batch_analysis: 5,
            compare_resumes: 3,
            selected_candidate: 7,
          },
        },
      };

      vi.mocked(mockAxiosInstance.get).mockResolvedValueOnce(mockResponse);

      const result = await authService.getProfile();

      expect(result.email).toBe("test@example.com");
      expect(result.filesUploaded).toBe(10);
    });

    test("should handle unauthorized access", async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            success: false,
            message: "Unauthorized",
          },
        },
      };

      vi.mocked(mockAxiosInstance.get).mockRejectedValueOnce(mockError);

      await expect(authService.getProfile()).rejects.toThrow("Unauthorized");
    });

    test("should handle network errors", async () => {
      const mockError = {
        code: "NETWORK_ERROR",
        message: "Network Error",
      };

      vi.mocked(mockAxiosInstance.get).mockRejectedValueOnce(mockError);

      await expect(authService.getProfile()).rejects.toThrow(
        "Unable to connect to the server"
      );
    });
  });

  describe("resetPassword", () => {
    test("should reset password successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Password reset successful",
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      const resetData = {
        email: "test@example.com",
        newPassword: "NewPassword123!",
      };

      await expect(authService.resetPassword(resetData)).resolves.not.toThrow();
    });

    test("should handle incorrect current password", async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: "Current password is incorrect",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      const resetData = {
        email: "test@example.com",
        newPassword: "NewPassword123!",
      };

      await expect(authService.resetPassword(resetData)).rejects.toThrow(
        "Current password is incorrect"
      );
    });
  });

  describe("updateProfile", () => {
    test("should update profile successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: "user-123",
            name: "Updated Name",
            email: "test@example.com",
            company_name: "Updated Corp",
            filesUploaded: 10,
          },
        },
      };

      vi.mocked(mockAxiosInstance.put).mockResolvedValueOnce(mockResponse);

      const updateData = {
        name: "Updated Name",
        company_name: "Updated Corp",
      };

      const result = await authService.updateProfile(updateData);

      expect(result.name).toBe("Updated Name");
      expect(result.company_name).toBe("Updated Corp");
    });

    test("should handle validation errors", async () => {
      const mockError = {
        response: {
          data: {
            errors: [{ message: "Name must be at least 2 characters" }],
          },
        },
      };

      vi.mocked(mockAxiosInstance.put).mockRejectedValueOnce(mockError);

      const updateData = {
        name: "A",
        company_name: "Test Corp",
      };

      await expect(authService.updateProfile(updateData)).rejects.toThrow(
        "Name must be at least 2 characters"
      );
    });
  });

  describe("isAuthenticated", () => {
    test("should return true when token exists", () => {
      localStorageMock.setItem("accessToken", "test-token");

      expect(authService.isAuthenticated()).toBe(true);
    });

    test("should return false when token does not exist", () => {
      localStorageMock.removeItem("accessToken");

      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe("getFeatureUsage", () => {
    test("should fetch feature usage successfully", async () => {
      const mockResponse = {
        data: {
          features: {
            filesUploaded: 10,
            batch_analysis: 5,
            compare_resumes: 3,
            selected_candidate: 7,
          },
        },
      };

      vi.mocked(mockAxiosInstance.get).mockResolvedValueOnce(mockResponse);

      const result = await authService.getFeatureUsage("test@example.com");

      expect(result.filesUploaded).toBe(10);
      expect(result.batch_analysis).toBe(5);
      expect(result.compare_resumes).toBe(3);
      expect(result.selected_candidate).toBe(7);
    });

    test("should return default values on error", async () => {
      vi.mocked(mockAxiosInstance.get).mockRejectedValueOnce(
        new Error("Network error")
      );

      const result = await authService.getFeatureUsage("test@example.com");

      expect(result.filesUploaded).toBe(0);
      expect(result.batch_analysis).toBe(0);
      expect(result.compare_resumes).toBe(0);
      expect(result.selected_candidate).toBe(0);
    });

    test("should handle different response formats", async () => {
      const mockResponse = {
        data: {
          stats: {
            filesUploaded: 15,
            batch_analysis: 8,
            compare_resumes: 4,
            selected_candidate: 9,
          },
        },
      };

      vi.mocked(mockAxiosInstance.get).mockResolvedValueOnce(mockResponse);

      const result = await authService.getFeatureUsage("test@example.com");

      expect(result.filesUploaded).toBe(15);
      expect(result.batch_analysis).toBe(8);
    });
  });

  describe("refreshToken", () => {
    test("should refresh token successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            accessToken: "new-token",
            user: {
              id: "user-123",
              name: "Test User",
              email: "test@example.com",
              company_name: "Test Corp",
              filesUploaded: 5,
            },
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      const result = await authService.refreshToken();

      expect(result.accessToken).toBe("new-token");
      expect(localStorageMock.getItem("accessToken")).toBe("new-token");
    });

    test("should handle expired refresh token", async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            success: false,
            message: "Refresh token expired",
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockRejectedValueOnce(mockError);

      await expect(authService.refreshToken()).rejects.toThrow(
        "Refresh token expired"
      );
    });

    test("should handle invalid refresh token format", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            // Missing accessToken - service doesn't validate, just extracts
            user: {
              id: "user-123",
              email: "test@example.com",
            },
          },
        },
      };

      vi.mocked(mockAxiosInstance.post).mockResolvedValueOnce(mockResponse);

      const result = await authService.refreshToken();

      // Service returns undefined accessToken if not present in response
      expect(result.accessToken).toBeUndefined();
      expect(result.user.id).toBe("user-123");
    });
  });
});
