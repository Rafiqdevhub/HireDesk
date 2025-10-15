import { Link } from "react-router";
import type { Route } from "./+types/compare-resumes";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { getErrorCategory, formatErrorMessage } from "../utils/errorHandler";
import { HIREDESK_ANALYZE } from "~/utils/api";
import Toast from "@components/toast/Toast";
import ResumeUpload from "@components/resume/ResumeUpload";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk - Find Best Fit" },
    {
      name: "description",
      content:
        "Compare multiple candidates side-by-side with advanced ranking algorithms - coming soon to HireDesk.",
    },
  ];
}

const CompareResumes = () => {
  const { user } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<any>(null);
  const [error, setError] = useState<{
    show: boolean;
    message: string;
    type: "error" | "warning";
    category: string | null;
    originalError: any;
  }>({
    show: false,
    message: "",
    type: "error",
    category: null,
    originalError: null,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);
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

  const handleFileUpload = async (files: File[]) => {
    // Check comparison limits
    if (files.length < 2) {
      setError({
        show: true,
        message: "Please upload at least 2 resume files for comparison.",
        type: "warning",
        category: "file",
        originalError: "Minimum 2 files required",
      });
      return;
    }

    if (files.length > 5) {
      setError({
        show: true,
        message: "Maximum 5 files allowed for comparison.",
        type: "warning",
        category: "file",
        originalError: "Maximum 5 files exceeded",
      });
      return;
    }

    // Validate file types and sizes
    for (const file of files) {
      if (!file.type.match(/pdf|msword|officedocument/)) {
        setError({
          show: true,
          message: `File "${file.name}" is not supported. Please upload only PDF or Word documents.`,
          type: "warning",
          category: "file",
          originalError: "Unsupported file type",
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        setError({
          show: true,
          message: `File "${file.name}" exceeds 10MB limit.`,
          type: "warning",
          category: "file",
          originalError: "File too large",
        });
        return;
      }
    }

    setCurrentFiles(files);
    setComparisonResults(null);
    setIsLoading(true);
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });

    try {
      const formData = new FormData();

      // Add all files to form data
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(
        `${HIREDESK_ANALYZE.replace("/api/hiredesk-analyze", "/api/compare-resumes")}`,
        {
          method: "POST",
          body: formData,
          mode: "cors",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { message: errorText || "Unknown error occurred" };
        }
        throw new Error(error.message || "Comparison failed");
      }

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        throw new Error(
          "Failed to parse API response. The server may have returned invalid data.",
          { cause: jsonError }
        );
      }

      if (!responseData) {
        throw new Error("No data returned from API");
      }

      setComparisonResults(responseData);

      setToastMessage(
        `Successfully compared ${responseData.comparison_summary?.total_candidates || files.length} candidates!`
      );
      setToastType("success");
      setShowToast(true);

      setIsLoading(false);
    } catch (error: any) {
      const errorCategory = getErrorCategory(error);
      setError({
        show: true,
        message: formatErrorMessage(error),
        type: "error",
        category: errorCategory,
        originalError: error,
      });
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setComparisonResults(null);
    setCurrentFiles([]);
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4s"></div>
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
                  <p className="text-xs text-slate-400 mt-1">Find Best Fit</p>
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

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-8 sm:mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>
              <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/5 rounded-full blur-2xl sm:blur-3xl"></div>
            </div>

            <div className="relative z-10 px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mr-2"
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
                  <span className="text-sm sm:text-base text-white font-medium">
                    Candidate Comparison
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Find Best
                  <br />
                  <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">
                    Fit
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                  Compare multiple candidates side-by-side with advanced ranking
                  algorithms. Make confident hiring decisions with comprehensive
                  candidate comparisons.
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
                  <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <svg
                      className="h-4 w-4 text-purple-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                    <span className="text-sm text-white">2-5 Candidates</span>
                  </div>
                  <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <svg
                      className="h-4 w-4 text-purple-400 mr-2"
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
                    <span className="text-sm text-white">Smart Ranking</span>
                  </div>
                  <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <svg
                      className="h-4 w-4 text-purple-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-white">AI Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-12 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4 sm:px-0">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Upload & Compare
                </span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Upload 2-5 resumes and get comprehensive comparison with ranking
                and AI-powered insights
              </p>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-5xl">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-violet-500/20 rounded-[1.5rem] sm:rounded-[2rem] blur-xl sm:blur-2xl"></div>
                <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-violet-600/10 rounded-[1.25rem] sm:rounded-[1.75rem] blur-lg sm:blur-xl"></div>

                <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>

                  <div className="relative p-6 sm:p-8 md:p-12">
                    <div className="text-center mb-8 sm:mb-12">
                      <div className="relative inline-block mb-6 sm:mb-8">
                        <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl shadow-lg">
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
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <div className="absolute inset-0 bg-purple-500/20 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl"></div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                        <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">
                          Candidate Comparison
                        </span>
                      </h3>

                      <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                        Upload 2-5 resumes and get comprehensive comparison with
                        smart ranking algorithms and AI-powered insights
                      </p>
                    </div>

                    <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
                      <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <div className="relative bg-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300">
                          <div className="flex items-center mb-3 sm:mb-4">
                            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mr-3">
                              <svg
                                className="h-5 w-5 text-purple-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold text-white">
                              Resume Files
                            </h4>
                          </div>
                          <ResumeUpload
                            onFileUpload={(file) => {
                              if (file) {
                                setCurrentFiles((prev) => {
                                  // Check if file already exists
                                  if (
                                    prev.some(
                                      (f) =>
                                        f.name === file.name &&
                                        f.size === file.size
                                    )
                                  ) {
                                    return prev;
                                  }
                                  // Add new file, limit to 5
                                  const newFiles = [...prev, file];
                                  return newFiles.slice(0, 5);
                                });
                              }
                            }}
                            isLoading={isLoading}
                            onError={(errorData) => {
                              setError({
                                show: true,
                                message:
                                  errorData.message || "Error with file upload",
                                type: "warning",
                                category: errorData.category || "file",
                                originalError: errorData,
                              });
                            }}
                          />
                          {currentFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                              <p className="text-sm text-slate-400">
                                Selected files ({currentFiles.length}/5):
                              </p>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {currentFiles.map((file, index) => (
                                  <div
                                    key={`${file.name}-${file.size}`}
                                    className="flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <svg
                                        className="h-4 w-4 text-purple-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12h6m-6-4h6m-6 8h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                      <span className="text-sm text-white truncate">
                                        {file.name}
                                      </span>
                                      <span className="text-xs text-slate-400">
                                        ({(file.size / 1024 / 1024).toFixed(1)}
                                        MB)
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setCurrentFiles((prev) =>
                                          prev.filter((_, i) => i !== index)
                                        );
                                      }}
                                      className="text-red-400 hover:text-red-300 transition-colors"
                                      aria-label="Remove file"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          onClick={() => {
                            if (currentFiles.length > 0) {
                              handleFileUpload(currentFiles);
                            }
                          }}
                          disabled={isLoading || currentFiles.length === 0}
                          className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-500 hover:via-pink-500 hover:to-violet-500 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                        >
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
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
                              Comparing Candidates...
                            </>
                          ) : (
                            <>
                              <svg
                                className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform"
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
                              Compare Candidates
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {comparisonResults && (
                      <div className="mt-8 sm:mt-12">
                        <div className="text-center mb-6 sm:mb-8">
                          <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                            Comparison Results
                          </h4>
                          <p className="text-slate-400">
                            {comparisonResults.comparison_summary
                              ?.total_candidates || currentFiles.length}{" "}
                            candidates compared and ranked
                          </p>
                        </div>

                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                            <div className="text-2xl font-bold text-purple-400">
                              {comparisonResults.comparison_summary
                                ?.total_candidates || 0}
                            </div>
                            <div className="text-sm text-slate-400">
                              Total Candidates
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-pink-500/10 to-violet-500/10 rounded-xl p-4 border border-pink-500/20">
                            <div className="text-2xl font-bold text-pink-400">
                              {comparisonResults.comparison_summary
                                ?.highest_score || 0}
                            </div>
                            <div className="text-sm text-slate-400">
                              Highest Score
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl p-4 border border-violet-500/20">
                            <div className="text-2xl font-bold text-violet-400">
                              {comparisonResults.comparison_summary
                                ?.average_score || 0}
                            </div>
                            <div className="text-sm text-slate-400">
                              Average Score
                            </div>
                          </div>
                        </div>

                        {/* Ranked Candidates */}
                        <div className="space-y-6">
                          {comparisonResults.ranked_candidates?.map(
                            (candidate: any, index: number) => (
                              <div
                                key={index}
                                className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6"
                              >
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                      #{index + 1}
                                    </div>
                                    <div>
                                      <h5 className="text-lg font-semibold text-white">
                                        {candidate.resumeData?.personalInfo
                                          ?.name || `Candidate ${index + 1}`}
                                      </h5>
                                      <p className="text-slate-400 text-sm">
                                        {candidate.filename}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-3xl font-bold text-purple-400">
                                      {candidate.score}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                      Score
                                    </div>
                                  </div>
                                </div>

                                {candidate.strengths &&
                                  candidate.strengths.length > 0 && (
                                    <div className="mb-4">
                                      <h6 className="text-sm font-medium text-green-400 mb-2">
                                        Strengths:
                                      </h6>
                                      <div className="flex flex-wrap gap-2">
                                        {candidate.strengths
                                          .slice(0, 3)
                                          .map(
                                            (strength: string, idx: number) => (
                                              <span
                                                key={idx}
                                                className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30"
                                              >
                                                {strength}
                                              </span>
                                            )
                                          )}
                                      </div>
                                    </div>
                                  )}

                                {candidate.weaknesses &&
                                  candidate.weaknesses.length > 0 && (
                                    <div className="mb-4">
                                      <h6 className="text-sm font-medium text-red-400 mb-2">
                                        Areas for Improvement:
                                      </h6>
                                      <div className="flex flex-wrap gap-2">
                                        {candidate.weaknesses
                                          .slice(0, 2)
                                          .map(
                                            (weakness: string, idx: number) => (
                                              <span
                                                key={idx}
                                                className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full border border-red-500/30"
                                              >
                                                {weakness}
                                              </span>
                                            )
                                          )}
                                      </div>
                                    </div>
                                  )}

                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-slate-400">
                                    Ranked by AI analysis
                                  </span>
                                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                                    View Details →
                                  </button>
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        {/* Recommendations */}
                        {comparisonResults.recommendations &&
                          comparisonResults.recommendations.length > 0 && (
                            <div className="mt-8">
                              <h4 className="text-lg font-bold text-white mb-4">
                                AI Recommendations
                              </h4>
                              <div className="space-y-3">
                                {comparisonResults.recommendations.map(
                                  (rec: string, idx: number) => (
                                    <div
                                      key={idx}
                                      className="flex items-start space-x-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
                                    >
                                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                        {idx + 1}
                                      </div>
                                      <p className="text-slate-300 text-sm">
                                        {rec}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        <div className="text-center mt-6 sm:mt-8">
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
                    )}

                    {error.show && (
                      <Toast
                        type={error.type}
                        title={
                          error.category === "limit" ? "Upload Limit" : "Error"
                        }
                        message={error.message}
                        show={error.show}
                        onClose={() => setError({ ...error, show: false })}
                        duration={error.category === "limit" ? 4000 : 6000}
                        errorData={{
                          errorType: error.category,
                          errorCategory: error.category,
                          originalError: error.originalError,
                        }}
                        actions={
                          error.category === "file"
                            ? [
                                {
                                  label: "Try Again",
                                  onClick: () => {
                                    setError({ ...error, show: false });
                                    handleReset();
                                  },
                                  variant: "primary",
                                },
                              ]
                            : [
                                {
                                  label: "Retry",
                                  onClick: () => {
                                    setError({ ...error, show: false });
                                    if (currentFiles.length > 0) {
                                      handleFileUpload(currentFiles);
                                    }
                                  },
                                  variant: "primary",
                                },
                              ]
                        }
                      />
                    )}
                    {showToast && (
                      <Toast
                        message={toastMessage}
                        type={toastType}
                        show={showToast}
                        onClose={handleToastClose}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default CompareResumes;
