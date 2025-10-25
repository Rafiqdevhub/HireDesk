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
      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-slate-800/15 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-slate-800/10 blur-3xl"></div>
        </div>
        <nav className="relative z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-300 hidden sm:inline">
                    Back
                  </span>
                </button>
              </div>
              <div className="flex-1 text-center">
                <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  HireDesk
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Intelligent Hiring Platform
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm sm:text-base font-medium text-white">
                      {user?.name?.[0] || "U"}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-100">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-400">HR Team</p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      showProfileDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>

                {showProfileDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-4 border-b border-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-medium text-white">
                            {user?.name?.[0] || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user?.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 flex items-center gap-2"
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
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="mb-16 sm:mb-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
                Select Your Tool
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                Choose the perfect hiring solution for your needs. Each tool is
                powered by advanced AI to help you make confident hiring
                decisions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Link
              to="/hiredesk-analyze"
              className="group relative px-6 py-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:bg-slate-900/80 cursor-pointer"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Smart Review
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Analyze individual resumes with AI-powered insights and
                    personalized interview questions.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 rounded-full">
                    Single Resume
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 rounded-full">
                    Analysis
                  </span>
                </div>

                <div className="flex items-center text-slate-400 group-hover:text-slate-200 transition-colors duration-300 pt-2">
                  <span className="text-sm font-medium">Explore</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              to="/batch-analyze"
              className="group relative px-6 py-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:bg-slate-900/80 cursor-pointer"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Smart Screening
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Process multiple resumes at once. Quickly filter and
                    identify top candidates efficiently.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 rounded-full">
                    Batch
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 rounded-full">
                    Filtering
                  </span>
                </div>

                <div className="flex items-center text-slate-400 group-hover:text-slate-200 transition-colors duration-300 pt-2">
                  <span className="text-sm font-medium">Explore</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              to="/compare-resumes"
              className="group relative px-6 py-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:bg-slate-900/80 cursor-pointer"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Find Best Fit
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Compare candidates side-by-side and rank them with advanced
                    algorithms for perfect matches.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 rounded-full">
                    Comparison
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 rounded-full">
                    Ranking
                  </span>
                </div>

                <div className="flex items-center text-slate-400 group-hover:text-slate-200 transition-colors duration-300 pt-2">
                  <span className="text-sm font-medium">Explore</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              to="/selection-candidates"
              className="group relative px-6 py-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:bg-slate-900/80 cursor-pointer"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Selection & Team
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Build balanced teams with skill mapping and team dynamics
                    analysis. Coming soon!
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="px-3 py-1 text-xs font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
                    Coming Soon
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 rounded-full">
                    Q4 2025
                  </span>
                </div>

                <div className="flex items-center text-slate-400 group-hover:text-slate-200 transition-colors duration-300 pt-2">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-16 sm:mt-20 pt-12 border-t border-slate-800">
            <p className="text-sm text-slate-400 text-center max-w-2xl mx-auto">
              All tools are powered by the same advanced AI technology, ensuring
              consistent and reliable analysis across your entire hiring
              pipeline.
            </p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
