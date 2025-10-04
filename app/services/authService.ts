import axios from "axios";
import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { API_AUTH_URL } from "~/utils/api";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: API_AUTH_URL,
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: API_AUTH_URL,
  withCredentials: true,
});

// Helper function to extract error messages from various error formats
const extractErrorMessage = (error: any, defaultMessage: string): string => {
  if (error.response?.data) {
    const data = error.response.data;

    if (data.message) {
      return data.message;
    }

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

  if (error.message && error.message !== "Network Error") {
    return error.message;
  }

  if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
    return "Unable to connect to the server. Please check your internet connection.";
  }

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

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  company_name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const authService = {
  async register(
    userData: RegisterRequest
  ): Promise<{ accessToken: string; user: User }> {
    try {
      localStorage.removeItem("accessToken");

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

  async login(
    credentials: LoginRequest
  ): Promise<{ accessToken: string; user: User }> {
    try {
      localStorage.removeItem("accessToken");

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

  async logout(): Promise<void> {
    try {
      await api.post<AuthResponse>("/auth/logout");
    } catch (error) {
      console.warn("Logout request failed, but clearing local token");
    } finally {
      localStorage.removeItem("accessToken");
    }
  },

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

  async changePassword(changeData: ChangePasswordRequest): Promise<void> {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/change-password",
        changeData
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Password change failed");
      }
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Password change failed. Please try again."
      );
      throw new Error(errorMessage);
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
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
