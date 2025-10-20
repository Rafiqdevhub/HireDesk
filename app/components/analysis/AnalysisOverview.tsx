import React from "react";

interface ResumeAnalysis {
  resumeData?: any;
  roleRecommendations?: any[];
  questions?: any[];
  resumeScore?: any;
  personalityInsights?: any;
  careerPath?: any;
}

interface AnalysisOverviewProps {
  analysis: ResumeAnalysis;
}

export const AnalysisOverview: React.FC<AnalysisOverviewProps> = ({
  analysis,
}) => {
  const overviewItems = [
    {
      label: "Resume Parsed",
      value: analysis.resumeData ? "✓" : "—",
      icon: "📄",
      color: analysis.resumeData
        ? "from-blue-500 to-cyan-500"
        : "from-slate-500 to-gray-500",
    },
    {
      label: "Role Matches",
      value: analysis.roleRecommendations?.length || 0,
      icon: "🎯",
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Interview Questions",
      value: analysis.questions?.length || 0,
      icon: "❓",
      color: "from-pink-500 to-rose-500",
    },
    {
      label: "Insights Generated",
      value:
        (analysis.personalityInsights ? 1 : 0) + (analysis.careerPath ? 1 : 0),
      icon: "🧠",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {overviewItems.map((item, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 p-4 sm:p-6"
        >
          {/* Animated background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          ></div>

          {/* Glow effect */}
          <div
            className={`absolute -inset-1 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur`}
          ></div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>

            {/* Value */}
            <div className="mb-2">
              <p className="text-2xl sm:text-3xl font-bold text-white group-hover:text-slate-50 transition-colors">
                {item.value}
              </p>
            </div>

            {/* Label */}
            <p className="text-xs sm:text-sm font-semibold text-slate-400 group-hover:text-slate-300 transition-colors uppercase tracking-wider">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
