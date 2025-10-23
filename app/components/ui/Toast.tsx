import { useEffect, useState } from "react";
import type { ToastProps } from "@app-types/components";

const Toast = ({ toast, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose(toast.id), 300);
  };

  const getToastStyles = () => {
    const baseStyles = "border-l-4 shadow-lg backdrop-blur-sm";

    switch (toast.type) {
      case "success":
        return `${baseStyles} bg-green-900/90 border-green-500 text-green-100`;
      case "error":
        return `${baseStyles} bg-red-900/90 border-red-500 text-red-100`;
      case "warning":
        return `${baseStyles} bg-yellow-900/90 border-yellow-500 text-yellow-100`;
      case "info":
      default:
        return `${baseStyles} bg-blue-900/90 border-blue-500 text-blue-100`;
    }
  };

  const getIconStyles = () => {
    switch (toast.type) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "warning":
        return "text-yellow-400";
      case "info":
      default:
        return "text-blue-400";
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return (
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "error":
        return (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "warning":
        return (
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "info":
      default:
        return (
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        ${isLeaving ? "scale-95" : ""}
        max-w-sm w-full p-4 rounded-lg ${getToastStyles()}
      `}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${getIconStyles()}`}>{getIcon()}</div>

        <div className="ml-3 flex-1">
          {toast.title && (
            <h4 className="text-sm font-semibold mb-1">{toast.title}</h4>
          )}
          <p className="text-sm leading-relaxed">{toast.message}</p>

          {toast.action && (
            <div className="mt-3">
              <button
                onClick={toast.action.onClick}
                className="text-xs font-medium underline hover:no-underline transition-all duration-200"
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-4 text-white/60 hover:text-white transition-colors duration-200"
          title="Close notification"
          aria-label="Close notification"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
