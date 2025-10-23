import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "@services/authService";
import type { User, RegisterRequest, AuthContextType } from "@app-types";
import { useToast } from "./ToastContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    if (authService.isAuthenticated()) {
      try {
        const profileResponse = await authService.getProfile();
        const user: User = {
          id: profileResponse.id,
          name: profileResponse.name,
          email: profileResponse.email,
          company_name: profileResponse.company_name,
          filesUploaded: profileResponse.filesUploaded,
        };
        setUser(user);
      } catch (error) {
        try {
          const { user: refreshedUser } = await authService.refreshToken();
          setUser(refreshedUser);
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await authService.login({ email, password });
      setUser(result.user);
      setRequiresVerification(false);
      setUnverifiedEmail(null);
      showToast(
        "Welcome back! You've been successfully logged in.",
        "success",
        {
          title: "Login Successful",
        }
      );
    } catch (error: any) {
      if (error.requiresVerification) {
        setRequiresVerification(true);
        setUnverifiedEmail(error.email || email);
        const errorMessage =
          error.message || "Please verify your email to continue.";
        showToast(errorMessage, "warning", {
          title: "Email Verification Required",
        });
        throw error;
      }

      let errorMessage = "Login failed. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      showToast(errorMessage, "error", {
        title: "Login Failed",
      });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      const result = await authService.register(userData);
      setUser(result.user);
      setRequiresVerification(true);
      setUnverifiedEmail(userData.email);
      showToast(
        "Account created! Please check your email to verify your account.",
        "info",
        {
          title: "Verification Email Sent",
        }
      );
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      showToast(errorMessage, "error", {
        title: "Registration Failed",
      });
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const result = await authService.verifyEmail(token);
      setUser(result.user);
      setRequiresVerification(false);
      setUnverifiedEmail(null);
      showToast(
        "Email verified successfully! Welcome to HireDesk.",
        "success",
        {
          title: "Email Verified",
        }
      );
    } catch (error: any) {
      let errorMessage = "Email verification failed. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      showToast(errorMessage, "error", {
        title: "Verification Failed",
      });
      throw error;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      await authService.resendVerification(email);
      setUnverifiedEmail(email);
      showToast(
        "Verification email sent successfully! Please check your email.",
        "success",
        {
          title: "Email Resent",
        }
      );
    } catch (error: any) {
      let errorMessage =
        "Failed to resend verification email. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      showToast(errorMessage, "error", {
        title: "Resend Failed",
      });
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await authService.forgotPassword(email);
      showToast(
        "If an account exists with this email, a password reset link has been sent. Please check your email.",
        "success",
        {
          title: "Reset Email Sent",
        }
      );
    } catch (error: any) {
      let errorMessage =
        "Failed to send password reset email. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      showToast(errorMessage, "error", {
        title: "Reset Request Failed",
      });
      throw error;
    }
  };

  const resetPasswordWithToken = async (
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      await authService.resetPasswordWithToken(
        token,
        newPassword,
        confirmPassword
      );
      showToast(
        "Your password has been reset successfully. Please log in with your new password.",
        "success",
        {
          title: "Password Reset Successful",
        }
      );
    } catch (error: any) {
      let errorMessage = "Password reset failed. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      showToast(errorMessage, "error", {
        title: "Password Reset Failed",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setRequiresVerification(false);
      setUnverifiedEmail(null);
      showToast("You've been successfully logged out.", "info", {
        title: "Logged Out",
      });
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("accessToken");
      setUser(null);
      setRequiresVerification(false);
      setUnverifiedEmail(null);
      showToast("Logged out successfully.", "info", {
        title: "Logged Out",
      });
    }
  };

  const refreshProfile = async () => {
    try {
      const profileResponse = await authService.getProfile();
      const updatedUser: User = {
        id: profileResponse.id,
        name: profileResponse.name,
        email: profileResponse.email,
        company_name: profileResponse.company_name,
        filesUploaded: profileResponse.filesUploaded,
      };
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to refresh profile:", error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    refreshProfile,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPasswordWithToken,
    requiresVerification,
    unverifiedEmail,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
