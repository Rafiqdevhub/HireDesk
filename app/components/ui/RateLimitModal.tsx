import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface RateLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  filesUploaded: number;
  uploadLimit: number;
}

const RateLimitModal: React.FC<RateLimitModalProps> = ({
  isOpen,
  onClose,
  filesUploaded,
  uploadLimit,
}) => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      title: "Unlock Unlimited Potential",
      content:
        "You've reached your 10-file limit. Upgrade to Premium for unlimited resume analysis and advanced AI insights.",
      benefits: [
        "Unlimited resume uploads",
        "Advanced AI matching algorithms",
        "Priority customer support",
        "Export detailed reports",
        "Team collaboration features",
      ],
    },
    {
      title: "Premium Features Await",
      content:
        "Join thousands of HR professionals who trust HireDesk Premium for their recruitment needs.",
      benefits: [
        "100+ uploads per month",
        "Real-time candidate scoring",
        "Custom interview templates",
        "Integration with ATS systems",
        "Advanced analytics dashboard",
      ],
    },
    {
      title: "Ready to Upgrade?",
      content:
        "Get started with Premium today and transform your hiring process with unlimited AI-powered insights.",
      benefits: [
        "Instant upgrade activation",
        "30-day money-back guarantee",
        "24/7 premium support",
        "Free onboarding session",
        "Exclusive beta features access",
      ],
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentTip(0);
    }
  }, [isOpen]);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleContactClick = () => {
    window.location.href = "/contact";
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 blur-xl"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-white/30 rounded-2xl blur-md"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Upload Limit Reached
                </h2>
                <p className="text-amber-100 text-sm">
                  {filesUploaded}/{uploadLimit} files uploaded
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              title="Close modal"
              aria-label="Close modal"
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200 group cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-white group-hover:scale-110 transition-transform"
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

          <div className="relative mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full transition-all duration-500 w-full"></div>
            </div>
            <div className="flex justify-between text-xs text-amber-100 mt-1">
              <span>Free Tier</span>
              <span>Limit Reached</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4">
              <svg
                className="w-4 h-4 text-amber-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-amber-300 font-medium">
                Premium Upgrade Required
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevTip}
              title="Previous tip"
              aria-label="Previous tip"
              className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-200 group cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex space-x-2">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentTip
                      ? "bg-gradient-to-r from-amber-400 to-orange-400"
                      : "bg-slate-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTip}
              title="Next tip"
              aria-label="Next tip"
              className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-200 group cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-3">
              {tips[currentTip].title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {tips[currentTip].content}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-4 mb-6">
            <h4 className="text-white font-semibold mb-3 text-center">
              Premium Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tips[currentTip].benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-slate-300"
                >
                  <svg
                    className="w-4 h-4 text-green-400 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-4 mb-6 border border-indigo-500/20">
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-3">Premium Plan</div>
              <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
                <span>✓ 100 uploads/month</span>
                <span>✓ Priority support</span>
                <span>✓ Advanced features</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleContactClick}
              title="Contact Sales Team"
              aria-label="Contact Sales Team"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Sales Team
              </div>
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer"
            >
              Maybe Later
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-slate-500">
              Need help? Visit our{" "}
              <a
                href="/contact"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                contact page
              </a>{" "}
              or email us at{" "}
              <a
                href="mailto:support@hiredesk.com"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                support@hiredesk.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RateLimitModal;
