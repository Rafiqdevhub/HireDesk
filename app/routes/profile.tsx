import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/authService";
import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk - Profile" },
    {
      name: "description",
      content: "View and manage your HireDesk profile information.",
    },
  ];
}

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<
    Partial<typeof passwordData>
  >({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profileData = await authService.getProfile();
        setProfile(profileData);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const validatePasswordChange = () => {
    const errors: Partial<typeof passwordData> = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)
    ) {
      errors.newPassword =
        "New password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "New passwords do not match";
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword =
        "New password must be different from current password";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = async () => {
    if (!validatePasswordChange()) return;

    try {
      setIsChangingPassword(true);
      await authService.updateProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});
      setShowPasswordChange(false);
    } catch (error) {
      throw error;
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!newName.trim()) {
      setNameError("Name cannot be empty");
      return;
    }

    if (newName.trim() === (profile?.name || user?.name)) {
      setNameError("New name must be different from current name");
      return;
    }

    try {
      setIsChangingPassword(true); // Reusing this state for loading
      setNameError(null);

      const updatedUser = await authService.updateProfile({
        name: newName.trim(),
      });

      // Update local state
      setProfile((prev: any) =>
        prev ? { ...prev, name: updatedUser.name } : null
      );

      setShowNameEdit(false);
      setNewName("");
    } catch (error: any) {
      setNameError(error.message || "Failed to update name");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handlePasswordInputChange = (
    field: keyof typeof passwordData,
    value: string
  ) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    if (passwordErrors[field]) {
      setPasswordErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
              <div className="text-center">
                <div className="text-red-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Error Loading Profile
                </h2>
                <p className="text-gray-300 mb-6">{error}</p>
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                  <Link
                    to="/dashboard"
                    className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors text-center"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
              <div className="p-8 md:p-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div className="relative flex-shrink-0">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                      <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-slate-800">
                        <span className="text-5xl font-bold text-white">
                          {(profile?.name || user?.name || "")
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1.5 border-2 border-green-500 shadow-lg">
                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-green-400">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-4">
                      {showNameEdit ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => {
                              setNewName(e.target.value);
                              setNameError(null);
                            }}
                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 ${
                              nameError
                                ? "border-red-500/50 bg-red-500/10 text-red-300"
                                : "border-white/20 text-white focus:ring-blue-500/50 focus:border-blue-500/50"
                            }`}
                            placeholder="Enter your full name"
                          />
                          {nameError && (
                            <p className="text-sm text-red-400">{nameError}</p>
                          )}
                          <div className="flex gap-3">
                            <button
                              onClick={handleNameUpdate}
                              disabled={isChangingPassword}
                              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 cursor-pointer"
                            >
                              {isChangingPassword
                                ? "Updating..."
                                : "Update Name"}
                            </button>
                            <button
                              onClick={() => {
                                setShowNameEdit(false);
                                setNewName("");
                                setNameError(null);
                              }}
                              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-200 border border-white/20 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                            {profile?.name || user?.name}
                          </span>
                        </h1>
                      )}
                      <p className="text-xl text-slate-300 font-medium flex items-center justify-center lg:justify-start gap-2">
                        <svg
                          className="w-5 h-5 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {profile?.company_name || user?.company_name}
                      </p>
                    </div>
                    <div className="mb-6 flex items-center justify-center lg:justify-start gap-2 text-slate-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">
                        {profile?.email || user?.email}
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                      <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                        <div className="relative flex flex-col gap-2 bg-slate-800 rounded-xl px-4 py-2.5 border border-blue-500/30 min-w-[180px]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                              <span className="text-sm font-semibold text-white">
                                {profile?.filesUploaded || 0}/10 Files
                              </span>
                            </div>
                            <span
                              className={`text-xs font-bold ${
                                (profile?.filesUploaded || 0) >= 10
                                  ? "text-red-400"
                                  : (profile?.filesUploaded || 0) >= 8
                                    ? "text-orange-400"
                                    : (profile?.filesUploaded || 0) >= 5
                                      ? "text-yellow-400"
                                      : "text-green-400"
                              }`}
                            >
                              {Math.round(
                                ((profile?.filesUploaded || 0) / 10) * 100
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                (profile?.filesUploaded || 0) >= 10
                                  ? "bg-red-500"
                                  : (profile?.filesUploaded || 0) >= 8
                                    ? "bg-orange-500"
                                    : (profile?.filesUploaded || 0) >= 5
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                              }`}
                              style={{
                                width: `${Math.min(100, ((profile?.filesUploaded || 0) / 10) * 100)}%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400 font-medium">
                              {Math.max(0, 10 - (profile?.filesUploaded || 0))}{" "}
                              remaining
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              {(profile?.filesUploaded || 0) >= 10
                                ? "Limit reached"
                                : "Upload limit"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                        <div className="relative flex flex-col gap-1 bg-slate-800 rounded-xl px-4 py-2 border border-purple-500/30">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-purple-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-xs font-medium text-purple-300">
                              Member Since
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-white">
                            {profile?.createdAt
                              ? new Date(profile.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 w-full lg:w-auto">
                    <button
                      onClick={() => {
                        setShowNameEdit(!showNameEdit);
                        if (!showNameEdit) {
                          setNewName(profile?.name || user?.name || "");
                        }
                      }}
                      className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50 cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        {showNameEdit ? "Cancel" : "Change Name"}
                      </span>
                    </button>

                    <button
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                          />
                        </svg>
                        {showPasswordChange ? "Cancel" : "Change Password"}
                      </span>
                    </button>

                    <Link
                      to="/dashboard"
                      className="group relative overflow-hidden bg-slate-700/50 hover:bg-slate-600/50 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-slate-600 hover:border-slate-500 text-center"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Dashboard
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {showPasswordChange && (
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700/50">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-75"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Change Password
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                          Update your account security credentials
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={
                              passwordVisibility.currentPassword
                                ? "text"
                                : "password"
                            }
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              handlePasswordInputChange(
                                "currentPassword",
                                e.target.value
                              )
                            }
                            className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 ${
                              passwordErrors.currentPassword
                                ? "border-red-500/50 bg-red-500/10 text-red-300"
                                : "border-white/20 text-white focus:ring-blue-500/50 focus:border-blue-500/50"
                            }`}
                            placeholder="Enter your current password"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              togglePasswordVisibility("currentPassword")
                            }
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            {passwordVisibility.currentPassword ? (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                        {passwordErrors.currentPassword && (
                          <p className="mt-2 text-sm text-red-400">
                            {passwordErrors.currentPassword}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={
                                passwordVisibility.newPassword
                                  ? "text"
                                  : "password"
                              }
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                handlePasswordInputChange(
                                  "newPassword",
                                  e.target.value
                                )
                              }
                              className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 ${
                                passwordErrors.newPassword
                                  ? "border-red-500/50 bg-red-500/10 text-red-300"
                                  : "border-white/20 text-white focus:ring-blue-500/50 focus:border-blue-500/50"
                              }`}
                              placeholder="Enter your new password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("newPassword")
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                            >
                              {passwordVisibility.newPassword ? (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                          {passwordErrors.newPassword && (
                            <p className="mt-2 text-sm text-red-400">
                              {passwordErrors.newPassword}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <input
                              type={
                                passwordVisibility.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                handlePasswordInputChange(
                                  "confirmPassword",
                                  e.target.value
                                )
                              }
                              className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 ${
                                passwordErrors.confirmPassword
                                  ? "border-red-500/50 bg-red-500/10 text-red-300"
                                  : "border-white/20 text-white focus:ring-blue-500/50 focus:border-blue-500/50"
                              }`}
                              placeholder="Confirm your new password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("confirmPassword")
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                            >
                              {passwordVisibility.confirmPassword ? (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                          {passwordErrors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-400">
                              {passwordErrors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-4 pt-4">
                        <button
                          onClick={handlePasswordChange}
                          disabled={isChangingPassword}
                          className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
                        >
                          {isChangingPassword ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Updating Password...
                            </div>
                          ) : (
                            "Update Password"
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setShowPasswordChange(false);
                            setPasswordData({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            });
                            setPasswordErrors({});
                          }}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-200 border border-white/20 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Account Actions
                  </h2>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
