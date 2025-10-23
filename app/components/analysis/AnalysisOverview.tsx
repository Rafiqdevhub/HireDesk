import React from "react";
import type { AnalysisOverviewProps } from "@app-types/components";

export const AnalysisOverview: React.FC<AnalysisOverviewProps> = ({
  analysis,
}) => {
  const getFitStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "fit":
        return "from-green-500 to-emerald-500";
      case "partial":
        return "from-yellow-500 to-orange-500";
      case "unfit":
        return "from-red-500 to-rose-500";
      default:
        return "from-slate-500 to-gray-500";
    }
  };

  const overviewItems = [
    {
      label: "Fit Status",
      value: analysis.fitStatus ? analysis.fitStatus.toUpperCase() : "—",
      icon: "✓",
      color: getFitStatusColor(analysis.fitStatus),
      description: analysis.reasoning || "Analyzing resume fit...",
    },
    {
      label: "Best Fit Role",
      value: analysis.bestFitRole || "—",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500",
      description: analysis.bestFitRole
        ? `Recommended for: ${analysis.bestFitRole}`
        : "No role recommendation yet",
    },
    {
      label: "Role Matches",
      value: analysis.roleRecommendations?.length || 0,
      icon: "📋",
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Interview Questions",
      value: analysis.questions?.length || 0,
      icon: "❓",
      color: "from-pink-500 to-rose-500",
    },
    {
      label: "Resume Score",
      value: analysis.resumeScore
        ? `${analysis.resumeScore.overall_score}%`
        : "—",
      icon: "⭐",
      color: "from-purple-500 to-indigo-500",
    },
    {
      label: "Insights Generated",
      value:
        (analysis.personalityInsights ? 1 : 0) + (analysis.careerPath ? 1 : 0),
      icon: "🧠",
      color: "from-amber-500 to-orange-500",
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

            {/* Description (if available) */}
            {item.description && (
              <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors mt-2 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
