import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  useErrorToast,
  useSuccessToast,
  useInfoToast,
} from "../../../app/hooks/useToastHelpers";
import { useToast } from "../../../app/contexts/ToastContext";

// Mock the ToastContext
vi.mock("../../../app/contexts/ToastContext");

const mockShowToast = vi.fn();
const mockUseToast = vi.mocked(useToast);

describe("useToastHelpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseToast.mockReturnValue({
      showToast: mockShowToast,
      toasts: [],
      hideToast: vi.fn(),
      clearAllToasts: vi.fn(),
    });
  });

  describe("useErrorToast", () => {
    it("should show network error with correct message and options", () => {
      const { result } = renderHook(() => useErrorToast());

      result.current.showNetworkError();

      expect(mockShowToast).toHaveBeenCalledWith(
        "Unable to connect to the server. Please check your internet connection and try again.",
        "error",
        { title: "Connection Error", duration: 8000 }
      );
    });

    it("should show validation error with custom message", () => {
      const { result } = renderHook(() => useErrorToast());
      const message = "Email is required";

      result.current.showValidationError(message);

      expect(mockShowToast).toHaveBeenCalledWith(message, "error", {
        title: "Validation Error",
      });
    });

    it("should show generic error with custom message", () => {
      const { result } = renderHook(() => useErrorToast());
      const message = "Something went wrong";

      result.current.showGenericError(message);

      expect(mockShowToast).toHaveBeenCalledWith(message, "error", {
        title: "Error",
      });
    });

    it("should show generic error with default message when no message provided", () => {
      const { result } = renderHook(() => useErrorToast());

      result.current.showGenericError();

      expect(mockShowToast).toHaveBeenCalledWith(
        "An unexpected error occurred. Please try again.",
        "error",
        { title: "Error" }
      );
    });

    it("should show auth error with custom message", () => {
      const { result } = renderHook(() => useErrorToast());
      const message = "Invalid credentials";

      result.current.showAuthError(message);

      expect(mockShowToast).toHaveBeenCalledWith(message, "error", {
        title: "Authentication Error",
      });
    });

    it("should show auth error with default message when no message provided", () => {
      const { result } = renderHook(() => useErrorToast());

      result.current.showAuthError();

      expect(mockShowToast).toHaveBeenCalledWith(
        "Authentication failed. Please check your credentials.",
        "error",
        { title: "Authentication Error" }
      );
    });

    it("should show server error with correct message and options", () => {
      const { result } = renderHook(() => useErrorToast());

      result.current.showServerError();

      expect(mockShowToast).toHaveBeenCalledWith(
        "Server is temporarily unavailable. Please try again later.",
        "error",
        { title: "Server Error", duration: 8000 }
      );
    });
  });

  describe("useSuccessToast", () => {
    it("should show file upload success message with file details", () => {
      const { result } = renderHook(() => useSuccessToast());
      const fileName = "resume.pdf";
      const totalFiles = 1;

      result.current.showFileUploadSuccess(fileName, totalFiles);

      expect(mockShowToast).toHaveBeenCalledWith(
        `File "${fileName}" processed successfully! Total files: ${totalFiles}`,
        "success",
        { title: "File Upload Complete" }
      );
    });

    it("should show login success message without username", () => {
      const { result } = renderHook(() => useSuccessToast());

      result.current.showLoginSuccess();

      expect(mockShowToast).toHaveBeenCalledWith(
        "Welcome back! You've been successfully logged in.",
        "success",
        { title: "Login Successful" }
      );
    });

    it("should show login success message with username", () => {
      const { result } = renderHook(() => useSuccessToast());
      const userName = "John Doe";

      result.current.showLoginSuccess(userName);

      expect(mockShowToast).toHaveBeenCalledWith(
        `Welcome back, ${userName}!`,
        "success",
        { title: "Login Successful" }
      );
    });

    it("should show registration success message", () => {
      const { result } = renderHook(() => useSuccessToast());

      result.current.showRegistrationSuccess();

      expect(mockShowToast).toHaveBeenCalledWith(
        "Account created successfully! Welcome to HireDesk.",
        "success",
        { title: "Registration Successful" }
      );
    });

    it("should show logout success message", () => {
      const { result } = renderHook(() => useSuccessToast());

      result.current.showLogoutSuccess();

      expect(mockShowToast).toHaveBeenCalledWith(
        "You've been successfully logged out.",
        "info",
        { title: "Logged Out" }
      );
    });

    it("should show profile update success message", () => {
      const { result } = renderHook(() => useSuccessToast());

      result.current.showProfileUpdateSuccess();

      expect(mockShowToast).toHaveBeenCalledWith(
        "Profile updated successfully!",
        "success",
        { title: "Profile Updated" }
      );
    });
  });

  describe("useInfoToast", () => {
    it("should show session expired message with action", () => {
      const { result } = renderHook(() => useInfoToast());

      result.current.showSessionExpired();

      expect(mockShowToast).toHaveBeenCalledWith(
        "Your session has expired. Please log in again.",
        "warning",
        {
          title: "Session Expired",
          duration: 8000,
          action: {
            label: "Login",
            onClick: expect.any(Function),
          },
        }
      );
    });

    it("should show maintenance mode message", () => {
      const { result } = renderHook(() => useInfoToast());

      result.current.showMaintenanceMode();

      expect(mockShowToast).toHaveBeenCalledWith(
        "The system is currently undergoing maintenance. Some features may be unavailable.",
        "info",
        { title: "Maintenance Mode", duration: 10000 }
      );
    });

    it("should show feature coming soon message", () => {
      const { result } = renderHook(() => useInfoToast());
      const featureName = "Advanced Analytics";

      result.current.showFeatureComingSoon(featureName);

      expect(mockShowToast).toHaveBeenCalledWith(
        `${featureName} is coming soon! Stay tuned for updates.`,
        "info",
        { title: "Coming Soon" }
      );
    });
  });

  describe("hook behavior", () => {
    it("should create new function instances on each render", () => {
      const { result, rerender } = renderHook(() => useErrorToast());

      const firstRender = result.current;
      rerender();
      const secondRender = result.current;

      // Functions are recreated on each render since they're not memoized
      expect(firstRender.showNetworkError).not.toBe(
        secondRender.showNetworkError
      );
      expect(typeof firstRender.showNetworkError).toBe("function");
      expect(typeof secondRender.showNetworkError).toBe("function");
    });
  });
});
