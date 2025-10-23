import React, { useState } from "react";
import type { RoleRecommendationsProps } from "@app-types/components";

export const RoleRecommendationsCard: React.FC<RoleRecommendationsProps> = ({
  recommendations,
}) => {
  const [expandedRole, setExpandedRole] = useState<number | null>(0);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90)
      return {
        bg: "from-green-500 to-emerald-500",
        text: "text-green-400",
        label: "Excellent Match",
      };
    if (percentage >= 80)
      return {
        bg: "from-blue-500 to-cyan-500",
        text: "text-blue-400",
        label: "Strong Match",
      };
    if (percentage >= 70)
      return {
        bg: "from-yellow-500 to-orange-500",
        text: "text-yellow-400",
        label: "Good Match",
      };
    return {
      bg: "from-slate-500 to-gray-500",
      text: "text-slate-400",
      label: "Fair Match",
    };
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-75"></div>
            <div className="relative bg-slate-900 p-2.5 rounded-lg">
              <svg
                className="w-6 h-6 text-emerald-400"
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
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Role Recommendations
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {recommendations.length} Recommended Position
              {recommendations.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {recommendations.map((role, index) => {
          const isExpanded = expandedRole === index;
          const matchColor = getMatchColor(role.matchPercentage);

          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer ${
                isExpanded
                  ? "border-emerald-500/50 bg-slate-800/60"
                  : "border-slate-700/50 bg-slate-900/30 hover:border-emerald-500/30"
              }`}
              onClick={() => setExpandedRole(isExpanded ? null : index)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : ""
                }`}
              ></div>

              <div
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : ""
                }`}
              ></div>

              <div className="relative z-10 p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                      {role.roleName}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Career Level:{" "}
                      <span className="text-slate-300 font-semibold">
                        {role.careerLevel}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${matchColor.bg} rounded-full blur opacity-75`}
                      ></div>
                      <div className="relative bg-slate-900 px-4 py-2 rounded-full border border-current border-opacity-50">
                        <div className="flex items-center space-x-1">
                          <span className="text-lg font-bold text-white">
                            {role.matchPercentage}%
                          </span>
                          <svg
                            className="w-4 h-4 text-emerald-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold ${matchColor.text}`}
                    >
                      {matchColor.label}
                    </span>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-700/50">
                    <svg
                      className="w-4 h-4 text-teal-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs sm:text-sm font-semibold text-slate-300">
                      Industry Fit:{" "}
                      <span className="text-teal-300">{role.industryFit}</span>
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed">
                  {role.reasoning}
                </p>

                <div
                  className={`absolute top-4 sm:top-6 right-4 sm:right-6 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>

                {isExpanded && (
                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-700/50 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
                    <div>
                      <h5 className="text-sm font-bold text-emerald-300 mb-3 uppercase tracking-wider flex items-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Required Skills</span>
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {role.requiredSkills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
                          >
                            <p className="text-xs sm:text-sm font-medium text-emerald-300 line-clamp-2">
                              {skill}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {role.missingSkills.length > 0 && (
                      <div>
                        <h5 className="text-sm font-bold text-amber-300 mb-3 uppercase tracking-wider flex items-center space-x-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4v2m0 4v2M6.35 6.35a9 9 0 1112.73 12.73"
                            />
                          </svg>
                          <span>Areas to Develop</span>
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {role.missingSkills.map((skill, skillIndex) => (
                            <div
                              key={skillIndex}
                              className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300"
                            >
                              <p className="text-xs sm:text-sm font-medium text-amber-300 line-clamp-2">
                                {skill}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
