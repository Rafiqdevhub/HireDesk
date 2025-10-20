import React from "react";

interface InterviewQuestion {
  type: string;
  question: string;
  context: string;
}

interface InterviewQuestionsProps {
  questions: InterviewQuestion[];
}

export const InterviewQuestionsCard: React.FC<InterviewQuestionsProps> = ({
  questions,
}) => {
  const getQuestionTypeColor = (
    type: string
  ): { color: string; bg: string } => {
    const typeMap: Record<string, { color: string; bg: string }> = {
      technical: {
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20",
      },
      behavioral: {
        color: "text-purple-400",
        bg: "bg-purple-500/10 border-purple-500/20",
      },
      "problem-solving": {
        color: "text-orange-400",
        bg: "bg-orange-500/10 border-orange-500/20",
      },
      "scenario-based": {
        color: "text-pink-400",
        bg: "bg-pink-500/10 border-pink-500/20",
      },
      "role-specific": {
        color: "text-cyan-400",
        bg: "bg-cyan-500/10 border-cyan-500/20",
      },
    };
    return (
      typeMap[type] || {
        icon: "❓",
        color: "text-slate-400",
        bg: "bg-slate-500/10 border-slate-500/20",
      }
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg blur opacity-75"></div>
            <div className="relative bg-slate-900 p-2.5 rounded-lg">
              <svg
                className="w-6 h-6 text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
              Curated Interview Questions
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {questions.length} Question{questions.length !== 1 ? "s" : ""}{" "}
              Tailored for You
            </p>
          </div>
        </div>
      </div>

      {/* Questions grid */}
      <div className="space-y-4 sm:space-y-6">
        {questions.map((q, index) => {
          const typeInfo = getQuestionTypeColor(q.type);

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-900/30 border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 hover:-translate-y-1 p-4 sm:p-6"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/0 via-rose-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:via-rose-500/10 group-hover:to-pink-500/5 rounded-xl sm:rounded-2xl transition-all duration-300 blur"></div>

              <div className="relative z-10">
                {/* Type badge and index */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${typeInfo.bg}`}
                  >
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${typeInfo.color}`}
                    >
                      {q.type}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                    Q{index + 1}
                  </span>
                </div>

                {/* Question */}
                <h4 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed group-hover:text-slate-50 transition-colors duration-300">
                  {q.question}
                </h4>

                {/* Context / Reasoning */}
                <div className="relative">
                  {/* Collapsed indicator */}
                  <div className="flex items-start space-x-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700/30 group-hover:border-slate-600/50 transition-all duration-300">
                    <div className="mt-0.5">
                      <svg
                        className="w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {q.context}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
