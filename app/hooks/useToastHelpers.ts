import { useToast } from "../contexts/ToastContext";

export const useErrorToast = () => {
  const { showToast } = useToast();

  const showNetworkError = () => {
    showToast(
      "Unable to connect to the server. Please check your internet connection and try again.",
      "error",
      { title: "Connection Error", duration: 8000 }
    );
  };

  const showValidationError = (message: string) => {
    showToast(message, "error", { title: "Validation Error" });
  };

  const showGenericError = (message?: string) => {
    showToast(
      message || "An unexpected error occurred. Please try again.",
      "error",
      { title: "Error" }
    );
  };

  const showAuthError = (message?: string) => {
    showToast(
      message || "Authentication failed. Please check your credentials.",
      "error",
      { title: "Authentication Error" }
    );
  };

  const showServerError = () => {
    showToast(
      "Server is temporarily unavailable. Please try again later.",
      "error",
      { title: "Server Error", duration: 8000 }
    );
  };

  return {
    showNetworkError,
    showValidationError,
    showGenericError,
    showAuthError,
    showServerError,
  };
};

export const useSuccessToast = () => {
  const { showToast } = useToast();

  const showLoginSuccess = (userName?: string) => {
    showToast(
      userName
        ? `Welcome back, ${userName}!`
        : "Welcome back! You've been successfully logged in.",
      "success",
      { title: "Login Successful" }
    );
  };

  const showRegistrationSuccess = () => {
    showToast("Account created successfully! Welcome to HireDesk.", "success", {
      title: "Registration Successful",
    });
  };

  const showLogoutSuccess = () => {
    showToast("You've been successfully logged out.", "info", {
      title: "Logged Out",
    });
  };

  const showFileUploadSuccess = (fileName: string, totalFiles: number) => {
    showToast(
      `File "${fileName}" processed successfully! Total files: ${totalFiles}`,
      "success",
      { title: "File Upload Complete" }
    );
  };

  const showProfileUpdateSuccess = () => {
    showToast("Profile updated successfully!", "success", {
      title: "Profile Updated",
    });
  };

  return {
    showLoginSuccess,
    showRegistrationSuccess,
    showLogoutSuccess,
    showFileUploadSuccess,
    showProfileUpdateSuccess,
  };
};

export const useInfoToast = () => {
  const { showToast } = useToast();

  const showSessionExpired = () => {
    showToast("Your session has expired. Please log in again.", "warning", {
      title: "Session Expired",
      duration: 8000,
      action: {
        label: "Login",
        onClick: () => (window.location.href = "/login"),
      },
    });
  };

  const showMaintenanceMode = () => {
    showToast(
      "The system is currently undergoing maintenance. Some features may be unavailable.",
      "info",
      { title: "Maintenance Mode", duration: 10000 }
    );
  };

  const showFeatureComingSoon = (featureName: string) => {
    showToast(
      `${featureName} is coming soon! Stay tuned for updates.`,
      "info",
      { title: "Coming Soon" }
    );
  };

  return {
    showSessionExpired,
    showMaintenanceMode,
    showFeatureComingSoon,
  };
};
