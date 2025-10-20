import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { useAuth } from "../contexts/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resend Verification - HireDesk" },
    {
      name: "description",
      content:
        "Resend your email verification link to complete your registration.",
    },
  ];
}

export default function ResendVerification() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const navigate = useNavigate();
  const { resendVerification } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await resendVerification(email);
      setMessageType("success");
      setMessage("Verification email sent! Please check your inbox.");
      // Clear form
      setEmail("");
    } catch (error: any) {
      setMessageType("error");
      setMessage(
        error.message || "Failed to send verification email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
        </div>
        <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 p-6 sm:p-8">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative">
              <div className="flex items-center justify-center mb-4">
                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white text-center mb-2">
                Resend Verification
              </h1>
              <p className="text-indigo-100 text-center text-sm">
                We'll send you a new verification link
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Message Display */}
              {message && (
                <div
                  className={`p-4 rounded-lg border ${
                    messageType === "success"
                      ? "bg-green-500/10 border-green-500/30 text-green-300"
                      : "bg-red-500/10 border-red-500/30 text-red-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {messageType === "success" ? (
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span className="text-sm font-medium">{message}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Verification Email"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800/80 text-slate-400">or</span>
              </div>
            </div>

            {/* Alternative Actions */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/login")}
                className="w-full px-6 py-3 bg-slate-700/50 border border-slate-600/50 text-slate-200 font-semibold rounded-lg hover:bg-slate-700/70 hover:border-slate-600 transition-all duration-300"
              >
                Back to Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full px-6 py-3 bg-slate-700/30 border border-slate-600/30 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
              >
                Create New Account
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 rounded-lg bg-slate-700/20 border border-slate-700/50">
              <p className="text-xs text-slate-400">
                <strong>Didn't receive the email?</strong> Check your spam
                folder or try again with a different email address.
              </p>
            </div>
          </div>
        </div>

        {/* Support Link */}
        <p className="text-center mt-6 text-sm text-slate-400">
          Need help?{" "}
          <a href="/contact" className="text-indigo-400 hover:text-indigo-300">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
