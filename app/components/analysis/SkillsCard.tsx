import React, { useState } from "react";
import type { SkillsProps } from "../../../types/components";

export const SkillsCard: React.FC<SkillsProps> = ({ skills }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gradientColors = [
    "from-blue-500 to-cyan-500",
    "from-orange-500 to-red-500",
    "from-amber-500 to-yellow-500",
    "from-green-500 to-emerald-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-purple-500",
    "from-teal-500 to-cyan-500",
    "from-violet-500 to-fuchsia-500",
  ];

  const getGradientColor = (index: number): string => {
    return gradientColors[index % gradientColors.length];
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg blur opacity-75"></div>
            <div className="relative bg-slate-900 p-2.5 rounded-lg">
              <svg
                className="w-6 h-6 text-violet-400"
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
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
              Skills List
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-8">
        {skills.map((skill: string, skillIndex: number) => {
          const colorClass = getGradientColor(skillIndex);
          return (
            <div
              key={skillIndex}
              onMouseEnter={() => setHoveredIndex(skillIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group/skill overflow-hidden rounded-lg p-3 sm:p-4 bg-slate-900/30 border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 cursor-default"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-0 group-hover/skill:opacity-5 transition-opacity duration-300`}
              ></div>

              {hoveredIndex === skillIndex && (
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${colorClass} rounded-lg blur opacity-20`}
                ></div>
              )}

              <div className="relative z-10">
                <p className="text-sm font-semibold text-slate-200 group-hover/skill:text-slate-100 transition-colors line-clamp-2">
                  {skill}
                </p>
                <div
                  className={`h-0.5 w-0 bg-gradient-to-r ${colorClass} mt-2 group-hover/skill:w-full transition-all duration-300`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-8 border-t border-slate-700/50">
        <div className="flex items-center justify-between">
          <p className="text-slate-400">Total Skills</p>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg blur opacity-50"></div>
            <div className="relative bg-slate-900 px-6 py-3 rounded-lg border border-violet-500/50">
              <span className="font-bold text-2xl bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                {skills.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
