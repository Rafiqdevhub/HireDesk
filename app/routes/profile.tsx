import { useState, useEffect } from "react";
import { Link } from "react-router";
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
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {profile?.name || user?.name}
                  </h1>
                  <p className="text-blue-100">
                    {profile?.company_name || user?.company_name}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <p className="text-white font-medium">
                      {profile?.name || user?.name}
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <p className="text-white font-medium">
                      {profile?.email || user?.email}
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Company
                    </label>
                    <p className="text-white font-medium">
                      {profile?.company_name || user?.company_name}
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Member Since
                    </label>
                    <p className="text-white font-medium">
                      {profile?.createdAt
                        ? formatDate(profile.createdAt)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Activity Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {profile?.filesUploaded || 0}
                    </div>
                    <div className="text-sm text-gray-300">Files Uploaded</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      Active
                    </div>
                    <div className="text-sm text-gray-300">Account Status</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      Premium
                    </div>
                    <div className="text-sm text-gray-300">Plan</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Account Actions
                </h2>
                <div className="space-y-3">
                  <Link
                    to="/dashboard"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors text-center font-medium"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                  >
                    Sign Out
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
