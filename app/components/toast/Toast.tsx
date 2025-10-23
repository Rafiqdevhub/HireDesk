import React, { useEffect } from "react";
import type { ToastComponentProps } from "@app-types/components";

const Toast: React.FC<ToastComponentProps> = ({
  type,
  title,
  message,
  show,
  onClose,
  duration = 5000,
  action,
  actions,
}) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500/20",
          border: "border-green-500/30",
          text: "text-green-300",
          icon: "✅",
        };
      case "error":
        return {
          bg: "bg-red-500/20",
          border: "border-red-500/30",
          text: "text-red-300",
          icon: "❌",
        };
      case "warning":
        return {
          bg: "bg-yellow-500/20",
          border: "border-yellow-500/30",
          text: "text-yellow-300",
          icon: "⚠️",
        };
      case "info":
      default:
        return {
          bg: "bg-blue-500/20",
          border: "border-blue-500/30",
          text: "text-blue-300",
          icon: "ℹ️",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div
        className={`relative overflow-hidden rounded-2xl ${styles.bg} backdrop-blur-xl border ${styles.border} shadow-2xl animate-in slide-in-from-right duration-300`}
      >
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center">
                <span className="text-2xl">{styles.icon}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className={`text-lg font-semibold ${styles.text} mb-2`}>
                  {title}
                </h3>
              )}
              <p className="text-slate-200 leading-relaxed">{message}</p>
              {(action || actions) && (
                <div className="mt-4 flex space-x-3">
                  {actions ? (
                    actions.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={btn.onClick}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          btn.variant === "primary"
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={action!.onClick}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        action!.variant === "primary"
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                      }`}
                    >
                      {action!.label}
                    </button>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
              aria-label="Close notification"
            >
              <svg
                className="w-5 h-5 text-slate-400 hover:text-slate-200"
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
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700">
          <div
            className={`h-full ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : type === "warning" ? "bg-yellow-500" : "bg-blue-500"}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
