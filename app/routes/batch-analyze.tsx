import { Link } from "react-router";
import type { Route } from "./+types/batch-analyze";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { getErrorCategory, formatErrorMessage } from "../utils/errorHandler";
import { HIREDESK_ANALYZE } from "~/utils/api";
import Toast from "../components/toast/Toast";

const batchFeatures = [
  {
    icon: () => (
      <svg
        className="h-6 w-6"
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
    ),
    title: "Batch Processing",
    description: "Process 2-10 resumes simultaneously with AI-powered analysis",
  },
  {
    icon: () => (
      <svg
        className="h-6 w-6"
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
    ),
    title: "Candidate Ranking",
    description: "Automatically rank and compare candidates based on job fit",
  },
  {
    icon: () => (
      <svg
        className="h-6 w-6"
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
    ),
    title: "Efficiency Boost",
    description: "Save hours of manual screening with automated AI analysis",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk - Smart Screening" },
    {
      name: "description",
      content:
        "Batch analyze multiple resumes with AI-powered screening - process up to 10 resumes simultaneously.",
    },
  ];
}

const BatchAnalyze = () => {
  const { user } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [batchResults, setBatchResults] = useState<any[]>([]);
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

  const handleFileUpload = async (files: File[]) => {
    // Check batch limits
    if (files.length < 2) {
      setError({
        show: true,
        message: "Please upload at least 2 resume files for batch analysis.",
        type: "warning",
        category: "file",
        originalError: "Minimum 2 files required",
      });
      return;
    }

    if (files.length > 10) {
      setError({
        show: true,
        message: "Maximum 10 files allowed for batch analysis.",
        type: "warning",
        category: "file",
        originalError: "Maximum 10 files exceeded",
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
    setBatchResults([]);
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

      if (targetRole) formData.append("target_role", targetRole);
      if (jobDescription) formData.append("job_description", jobDescription);

      const response = await fetch(
        `${HIREDESK_ANALYZE.replace("/api/hiredesk-analyze", "/api/batch-analyze")}`,
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
        throw new Error(error.message || "Batch analysis failed");
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

      if (!responseData || !Array.isArray(responseData)) {
        throw new Error("Invalid response format from API");
      }

      setBatchResults(responseData);

      setToastMessage(`Successfully analyzed ${responseData.length} resumes!`);
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
    setBatchResults([]);
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

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-8 sm:mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-800"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>
              <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/5 rounded-full blur-2xl sm:blur-3xl"></div>
            </div>

            <div className="relative z-10 px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2"
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
                  <span className="text-sm sm:text-base text-white font-medium">
                    Batch Analysis
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Smart
                  <br />
                  <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    Screening
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                  Process multiple resumes at once with our advanced AI-powered
                  batch analysis. Quickly identify top candidates and filter out
                  unqualified applicants with intelligent automation.
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
                  <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <svg
                      className="h-4 w-4 text-green-400 mr-2"
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
                    <span className="text-sm text-white">2-10 Resumes</span>
                  </div>
                  <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <svg
                      className="h-4 w-4 text-green-400 mr-2"
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
                    <span className="text-sm text-white">AI Analysis</span>
                  </div>
                  <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <svg
                      className="h-4 w-4 text-green-400 mr-2"
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
                    <span className="text-sm text-white">Ranking System</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-1 text-yellow-300 px-2 sm:px-0">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">
                    Process up to 10 resumes simultaneously
                  </span>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4 sm:px-0">
                <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                  Batch Analysis Features
                </span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Streamline your recruitment process with powerful batch analysis
                capabilities
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {batchFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-4 sm:p-6 md:p-8">
                    <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-green-400 group-hover:text-green-300 transition-colors">
                        {feature.icon()}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-green-300 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                      {feature.description}
                    </p>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4 sm:px-0">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Upload & Analyze
                </span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Upload multiple resumes and let our AI analyze them
                simultaneously for efficient candidate screening
              </p>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-5xl">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-[1.5rem] sm:rounded-[2rem] blur-xl sm:blur-2xl"></div>
                <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-teal-600/10 rounded-[1.25rem] sm:rounded-[1.75rem] blur-lg sm:blur-xl"></div>

                <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>

                  <div className="relative p-6 sm:p-8 md:p-12">
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

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                        <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                          Batch Resume Analysis
                        </span>
                      </h3>

                      <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                        Upload 2-10 resumes and get comprehensive AI analysis
                        for each candidate simultaneously
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                      <div className="space-y-4 sm:space-y-6">
                        <div className="group relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                          <div className="relative bg-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/50 hover:border-green-500/50 transition-all duration-300">
                            <div className="flex items-center mb-3 sm:mb-4">
                              <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg mr-3">
                                <svg
                                  className="h-5 w-5 text-green-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z"
                                  />
                                </svg>
                              </div>
                              <h4 className="text-base sm:text-lg font-semibold text-white">
                                Target Position
                              </h4>
                            </div>
                            <input
                              type="text"
                              className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-sm sm:text-base"
                              value={targetRole}
                              onChange={(e) => setTargetRole(e.target.value)}
                              placeholder="e.g. Senior Full Stack Developer (optional)"
                            />
                          </div>
                        </div>

                        <div className="group relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                          <div className="relative bg-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/50 hover:border-green-500/50 transition-all duration-300">
                            <div className="flex items-center mb-3 sm:mb-4">
                              <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg mr-3">
                                <svg
                                  className="h-5 w-5 text-green-400"
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
                              <h4 className="text-base sm:text-lg font-semibold text-white">
                                Job Requirements
                              </h4>
                            </div>
                            <textarea
                              className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 resize-none text-sm sm:text-base"
                              value={jobDescription}
                              onChange={(e) =>
                                setJobDescription(e.target.value)
                              }
                              placeholder="Paste the complete job description with requirements, responsibilities, and qualifications (optional)"
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        <div className="group relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                          <div className="relative bg-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/50 hover:border-green-500/50 transition-all duration-300">
                            <div className="flex items-center mb-3 sm:mb-4">
                              <div className="p-2 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg mr-3">
                                <svg
                                  className="h-5 w-5 text-green-400"
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
                            <div className="space-y-3">
                              <input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx"
                                aria-label="Upload resume files (2-10 PDF or Word documents, max 10MB each)"
                                onChange={(e) => {
                                  const files = Array.from(
                                    e.target.files || []
                                  );
                                  if (files.length > 0) {
                                    handleFileUpload(files);
                                  }
                                }}
                                className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 transition-all duration-300 text-sm sm:text-base"
                              />
                              <p className="text-xs text-slate-400">
                                Upload 2-10 PDF or Word documents (max 10MB
                                each)
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <button
                            onClick={() => {
                              const fileInput = document.querySelector(
                                'input[type="file"]'
                              ) as HTMLInputElement;
                              if (
                                fileInput &&
                                fileInput.files &&
                                fileInput.files.length > 0
                              ) {
                                handleFileUpload(Array.from(fileInput.files));
                              }
                            }}
                            disabled={isLoading}
                            className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
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
                                Analyzing Resumes...
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
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                                Analyze Batch
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {batchResults.length > 0 && (
                      <div className="mt-8 sm:mt-12">
                        <div className="text-center mb-6 sm:mb-8">
                          <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                            Analysis Results
                          </h4>
                          <p className="text-slate-400">
                            {batchResults.length} resumes analyzed successfully
                          </p>
                        </div>

                        <div className="space-y-6">
                          {batchResults.map((result, index) => (
                            <div
                              key={index}
                              className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div>
                                    <h5 className="text-lg font-semibold text-white">
                                      {result.resumeData?.personalInfo?.name ||
                                        `Candidate ${index + 1}`}
                                    </h5>
                                    <p className="text-slate-400 text-sm">
                                      Resume Analysis Complete
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-green-400">
                                    {result.resumeScore?.overall_score ||
                                      result.resumeScore ||
                                      "N/A"}
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    Score
                                  </div>
                                </div>
                              </div>

                              {result.roleRecommendations &&
                                result.roleRecommendations.length > 0 && (
                                  <div className="mb-4">
                                    <h6 className="text-sm font-medium text-slate-300 mb-2">
                                      Recommended Roles:
                                    </h6>
                                    <div className="flex flex-wrap gap-2">
                                      {result.roleRecommendations
                                        .slice(0, 2)
                                        .map((rec: any, recIndex: number) => (
                                          <span
                                            key={recIndex}
                                            className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30"
                                          >
                                            {rec.roleName} (
                                            {rec.matchPercentage}%)
                                          </span>
                                        ))}
                                    </div>
                                  </div>
                                )}

                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">
                                  Analysis completed with AI insights
                                </span>
                                <button className="text-green-400 hover:text-green-300 transition-colors">
                                  View Details →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

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

export default BatchAnalyze;
