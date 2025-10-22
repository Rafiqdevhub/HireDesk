import { useState } from "react";
import { createPortal } from "react-dom";
import type { TipsModalProps } from "../../../types/components";

const TipsModal = ({ isOpen, onClose }: TipsModalProps) => {
  const [currentTip, setCurrentTip] = useState(0);

  const hiringTips = [
    {
      title: "Define Clear Job Requirements",
      content:
        "Before starting the hiring process, clearly define the role's responsibilities, required skills, and cultural fit criteria. This helps attract the right candidates and makes evaluation more objective.",
      icon: "📋",
    },
    {
      title: "Use Behavioral Interview Questions",
      content:
        "Ask candidates to describe specific situations where they demonstrated key skills. Questions like 'Tell me about a time when...' reveal actual experience and problem-solving abilities.",
      icon: "💭",
    },
    {
      title: "Assess Cultural Fit",
      content:
        "Technical skills can be taught, but cultural fit is harder to change. Evaluate whether candidates align with your company values and will thrive in your work environment.",
      icon: "🤝",
    },
    {
      title: "Check References Thoroughly",
      content:
        "Don't skip reference checks. Previous employers can provide valuable insights into work ethic, reliability, and areas for improvement that interviews might not reveal.",
      icon: "🔍",
    },
    {
      title: "Consider Growth Potential",
      content:
        "Look beyond current skills to assess learning ability and growth mindset. Candidates who show curiosity and adaptability often outperform those with just technical expertise.",
      icon: "📈",
    },
    {
      title: "Provide Realistic Job Previews",
      content:
        "Be honest about challenges and expectations. This helps candidates make informed decisions and reduces turnover by ensuring they understand what they're signing up for.",
      icon: "🎯",
    },
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % hiringTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + hiringTips.length) % hiringTips.length);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full mx-4 animate-in fade-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            💡 HR Hiring Tips
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Close tips"
          >
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
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-3">{hiringTips[currentTip].icon}</div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {hiringTips[currentTip].title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {hiringTips[currentTip].content}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevTip}
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm cursor-pointer"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex gap-2">
              {hiringTips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTip(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTip ? "bg-blue-400" : "bg-gray-600"
                  }`}
                  aria-label={`Go to tip ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTip}
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm cursor-pointer"
            >
              Next
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-xs text-gray-500">
              Tip {currentTip + 1} of {hiringTips.length}
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium cursor-pointer"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TipsModal;
