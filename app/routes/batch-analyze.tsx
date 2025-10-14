import { Link } from "react-router";
import type { Route } from "./+types/batch-analyze";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk - Smart Screening" },
    {
      name: "description",
      content:
        "Batch analyze multiple resumes with AI-powered screening - coming soon to HireDesk.",
    },
  ];
}

const BatchAnalyze = () => {
  const { user } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleSignOut = async () => {
    try {
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4s"></div>
          </div>
          <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:20px_20px]"></div>
        </div>

        <nav className="relative z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center">
                <Link
                  to="/dashboard"
                  className="group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-sm group-hover:bg-indigo-300/30 transition-all"></div>
                  </div>
                  <span className="text-sm sm:text-base text-slate-200 font-semibold group-hover:text-white transition-colors">
                    Back to Dashboard
                  </span>
                </Link>
              </div>

              <div className="md:hidden flex-1 text-center">
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  HireDesk
                </h1>
              </div>

              <div className="hidden md:block">
                <div className="text-center">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    HireDesk AI
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Smart Screening</p>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="group flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm sm:text-base">
                        {user?.name?.[0] || "U"}
                      </span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-400">HR Specialist</p>
                  </div>
                  <svg
                    className={`h-3 w-3 sm:h-4 sm:w-4 text-slate-400 group-hover:text-slate-300 transition-all duration-300 ${
                      showProfileDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showProfileDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-3 w-72 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200"
                  >
                    <div className="px-6 py-4 border-b border-slate-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {user?.name?.[0] || "U"}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user?.email}
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            <span className="text-xs text-green-400">
                              Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="group flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/20 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-600/20 rounded-full border border-green-500/30 mb-8">
              <span className="text-green-400 text-sm font-medium">
                Coming Soon
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Smart
              <span className="text-green-400 block">Screening</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Process multiple resumes at once with our advanced AI-powered
              batch analysis. Quickly identify top candidates and filter out
              unqualified applicants with intelligent automation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>

              <div className="relative p-8 sm:p-12 md:p-16">
                <div className="text-center mb-8 sm:mb-12">
                  <div className="relative inline-block mb-6 sm:mb-8">
                    <div className="p-6 sm:p-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl sm:rounded-3xl shadow-lg">
                      <svg
                        className="h-16 w-16 sm:h-20 sm:w-20 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-green-500/20 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl"></div>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                    <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                      Batch Processing
                    </span>
                    <br />
                    <span className="text-white">Coming Soon</span>
                  </h2>

                  <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                    We're working hard to bring you the most advanced batch
                    resume analysis tool. Upload multiple resumes and let our AI
                    do the heavy lifting for you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative p-4 sm:p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg mr-4">
                          <svg
                            className="h-6 w-6 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          Bulk Upload
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm sm:text-base">
                        Upload dozens of resumes at once with drag-and-drop
                        simplicity.
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative p-4 sm:p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg mr-4">
                          <svg
                            className="h-6 w-6 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          AI Analysis
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm sm:text-base">
                        Advanced AI algorithms analyze each resume for skills,
                        experience, and fit.
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative p-4 sm:p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg mr-4">
                          <svg
                            className="h-6 w-6 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          Smart Ranking
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm sm:text-base">
                        Automatically rank candidates based on your job
                        requirements and criteria.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg">
                    <svg
                      className="h-5 w-5 mr-2 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    In Development
                  </div>

                  <p className="text-slate-400 text-sm mt-4">
                    Expected launch: Q1 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-slate-500/25 transform hover:scale-105"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default BatchAnalyze;
