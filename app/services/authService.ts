import axios from "axios";
import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Helper function to extract error messages from various error formats
const extractErrorMessage = (error: any, defaultMessage: string): string => {
  // Check if it's an axios error with response
  if (error.response?.data) {
    const data = error.response.data;

    // Backend AuthResponse format
    if (data.message) {
      return data.message;
    }

    // Backend error field
    if (data.error) {
      return data.error;
    }

    // Validation errors (array format)
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors[0].message || data.errors[0];
    }

    // Single validation error
    if (typeof data === "string") {
      return data;
    }
  }

  // Direct error message
  if (error.message && error.message !== "Network Error") {
    return error.message;
  }

  // Network or connection errors
  if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  // Default fallback
  return defaultMessage;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Don't try to refresh token for login/register/refresh requests
    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register") ||
      originalRequest?.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await authApi.post("/auth/refresh");

        // Handle different response formats from refresh endpoint
        let accessToken;
        if (refreshResponse.data.success && refreshResponse.data.data) {
          accessToken = refreshResponse.data.data.accessToken;
        } else if (refreshResponse.data.accessToken) {
          accessToken = refreshResponse.data.accessToken;
        } else {
          throw new Error("Invalid refresh response format");
        }

        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        // Only redirect if we're not already on the login page
        localStorage.removeItem("accessToken");
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Backend API Response Types (matching copilot-instructions.md)
export interface User {
  id: string;
  name: string;
  email: string;
  company_name: string;
  filesUploaded: number;
  createdAt?: string;
}

export interface ProfileResponse extends User {
  createdAt: string;
}

export interface TokenResponse {
  accessToken: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: TokenResponse | ProfileResponse;
  error?: string;
}

// Request Types (matching backend validation)
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  company_name: string; // Required as per backend specification
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export const authService = {
  // Debug method to check current auth state
  debug(): void {
    console.log("=== Auth Debug Info ===");
    console.log("API Base URL:", API_BASE_URL);
    console.log("Access Token:", localStorage.getItem("accessToken"));
    console.log("With Credentials:", api.defaults.withCredentials);
    console.log("Current URL:", window.location.href);
    console.log("=====================");
  },

  // Register new user (company_name is required as per backend spec)
  async register(
    userData: RegisterRequest
  ): Promise<{ accessToken: string; user: User }> {
    try {
      // Clear any existing tokens before registration to prevent conflicts
      localStorage.removeItem("accessToken");

      // Use authApi to avoid request interceptors that add Authorization headers
      const response = await authApi.post<AuthResponse>(
        "/auth/register",
        userData
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Registration failed");
      }

      const tokenData = response.data.data as TokenResponse;
      const { accessToken, user } = tokenData;

      localStorage.setItem("accessToken", accessToken);
      return { accessToken, user };
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Registration failed. Please try again."
      );
      throw new Error(errorMessage);
    }
  },

  // Login user
  async login(
    credentials: LoginRequest
  ): Promise<{ accessToken: string; user: User }> {
    try {
      // Clear any existing tokens before login to prevent conflicts
      localStorage.removeItem("accessToken");

      // Debug info
      console.log("Attempting login to:", `${API_BASE_URL}/auth/login`);
      console.log("Credentials:", {
        email: credentials.email,
        password: "***",
      });

      // Use authApi to avoid request interceptors that add Authorization headers
      const response = await authApi.post<AuthResponse>(
        "/auth/login",
        credentials
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Login failed");
      }

      const tokenData = response.data.data as TokenResponse;
      const { accessToken, user } = tokenData;

      localStorage.setItem("accessToken", accessToken);
      return { accessToken, user };
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Login failed. Please check your credentials and try again."
      );
      throw new Error(errorMessage);
    }
  },

  // Logout user (clears HttpOnly cookie and removes token)
  async logout(): Promise<void> {
    try {
      await api.post<AuthResponse>("/auth/logout");
    } catch (error) {
      // Even if logout request fails, clear local token
      console.warn("Logout request failed, but clearing local token");
    } finally {
      localStorage.removeItem("accessToken");
    }
  },

  // Get current user profile
  async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await api.get<AuthResponse>("/auth/profile");

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Failed to get profile");
      }

      return response.data.data as ProfileResponse;
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Failed to load profile. Please try again."
      );
      throw new Error(errorMessage);
    }
  },

  // Reset user password
  async resetPassword(resetData: ResetPasswordRequest): Promise<void> {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/reset-password",
        resetData
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Password reset failed");
      }
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Password reset failed. Please try again."
      );
      throw new Error(errorMessage);
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  },

  // Get stored access token
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },

  // Refresh access token using HttpOnly cookie
  async refreshToken(): Promise<{ accessToken: string; user: User }> {
    try {
      const response = await api.post<AuthResponse>("/auth/refresh");

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Token refresh failed");
      }

      const tokenData = response.data.data as TokenResponse;
      const { accessToken, user } = tokenData;

      localStorage.setItem("accessToken", accessToken);
      return { accessToken, user };
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Session expired. Please log in again."
      );
      throw new Error(errorMessage);
    }
  },
};

export default api;
