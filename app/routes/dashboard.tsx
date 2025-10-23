import { Link } from "react-router";
import type { Route } from "./+types/dashboard";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useAuth } from "@contexts/AuthContext";
import { useState, useEffect, useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk - Dashboard" },
    {
      name: "description",
      content:
        "Your HireDesk dashboard - choose from Smart Review, Smart Screening, or Find Best Fit for your hiring needs.",
    },
  ];
}

const Dashboard = () => {
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
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4s"></div>
          </div>
          <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:20px_20px]"></div>
        </div>

        <nav className="relative z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center">
                <button
                  onClick={() => (window.location.href = "/")}
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
                    Back to Home
                  </span>
                </button>
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
                  <p className="text-xs text-slate-400 mt-1">
                    Intelligent Hiring Solutions
                  </p>
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
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full border border-blue-500/30 mb-8">
              <span className="text-blue-400 text-sm font-medium">
                AI-Powered Hiring Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Choose Your
              <span className="text-blue-400 block">Hiring Solution</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Select the perfect tool for your hiring needs. Whether you want to
              analyze individual candidates, screen multiple resumes, or find
              the best fit from a pool of applicants.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <Link
              to="/hiredesk-analyze"
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-6 sm:p-8 md:p-10">
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl sm:rounded-3xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
                      <svg
                        className="h-8 w-8 sm:h-10 sm:w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6-4h6m-6 8h6m-7-4h.01M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-blue-500/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl group-hover:bg-blue-500/40 transition-all duration-300"></div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                    Smart Review
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
                    Analyze individual candidate resumes with AI-powered
                    insights. Get detailed skill assessments, fit analysis, and
                    personalized interview questions.
                  </p>

                  <div className="flex items-center justify-center space-x-4 mb-6 sm:mb-8">
                    <div className="flex items-center px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-blue-400 text-xs font-medium">
                        AI Analysis
                      </span>
                    </div>
                    <div className="flex items-center px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">
                        Questions
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform group-hover:scale-105">
                    Start Analysis
                    <svg
                      className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </Link>

            <Link
              to="/batch-analyze"
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-green-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-6 sm:p-8 md:p-10">
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl sm:rounded-3xl shadow-lg group-hover:shadow-green-500/25 transition-all duration-300 group-hover:scale-110">
                      <svg
                        className="h-8 w-8 sm:h-10 sm:w-10 text-white"
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
                    <div className="absolute inset-0 bg-green-500/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl group-hover:bg-green-500/40 transition-all duration-300"></div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-green-200 transition-colors duration-300">
                    Smart Screening
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
                    Process multiple resumes at once with batch analysis.
                    Quickly identify top candidates and filter out unqualified
                    applicants.
                  </p>

                  <div className="flex items-center justify-center space-x-4 mb-6 sm:mb-8">
                    <div className="flex items-center px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">
                        Batch Processing
                      </span>
                    </div>
                    <div className="flex items-center px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-purple-400 text-xs font-medium">
                        Quick Filter
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform group-hover:scale-105">
                    Start Screening
                    <svg
                      className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </Link>

            <Link
              to="/compare-resumes"
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-6 sm:p-8 md:p-10">
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
                      <svg
                        className="h-8 w-8 sm:h-10 sm:w-10 text-white"
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
                    <div className="absolute inset-0 bg-purple-500/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl group-hover:bg-purple-500/40 transition-all duration-300"></div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                    Find Best Fit
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
                    Compare multiple candidates side-by-side to find the perfect
                    match. Advanced ranking algorithms help you identify the
                    strongest applicants.
                  </p>

                  <div className="flex items-center justify-center space-x-4 mb-6 sm:mb-8">
                    <div className="flex items-center px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-purple-400 text-xs font-medium">
                        Side-by-Side
                      </span>
                    </div>
                    <div className="flex items-center px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-orange-400 text-xs font-medium">
                        Smart Ranking
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform group-hover:scale-105">
                    Start Comparison
                    <svg
                      className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <p className="text-slate-400 text-sm sm:text-base">
              Need help choosing? All tools are powered by the same AI
              technology for consistent, reliable results.
            </p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
