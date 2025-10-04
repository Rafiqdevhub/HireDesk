import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";
import type { User, RegisterRequest } from "../services/authService";
import { useToast } from "./ToastContext";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isAuthenticated: boolean;
}

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
  const { showToast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    if (authService.isAuthenticated()) {
      try {
        const profileResponse = await authService.getProfile();
        // Convert ProfileResponse to User for context state
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
          // Try to refresh token and get profile again
          const { user: refreshedUser } = await authService.refreshToken();
          setUser(refreshedUser);
        } catch (refreshError) {
          // Both profile and refresh failed, clear auth state
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
      showToast(
        "Welcome back! You've been successfully logged in.",
        "success",
        {
          title: "Login Successful",
        }
      );
    } catch (error: any) {
      // Extract meaningful error message from backend
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
      showToast(
        "Account created successfully! Welcome to HireDesk.",
        "success",
        {
          title: "Registration Successful",
        }
      );
    } catch (error: any) {
      // Extract meaningful error message from backend
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

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      showToast("You've been successfully logged out.", "info", {
        title: "Logged Out",
      });
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("accessToken");
      setUser(null);
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
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
