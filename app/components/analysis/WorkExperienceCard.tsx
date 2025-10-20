import React from "react";

interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

interface WorkExperienceProps {
  workExperience: WorkExperience[];
}

export const WorkExperienceCard: React.FC<WorkExperienceProps> = ({
  workExperience,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-75"></div>
            <div className="relative bg-slate-900 p-2.5 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4m0 2a2 2 0 100-4 2 2 0 000 4zm0 0h.01M6 6V4m0 2a2 2 0 100-4 2 2 0 000 4zm0 0h.01M9 20h6m-3-4v4m-8-8h.01M5 20h.01"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Work Experience
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {workExperience.length} Position
              {workExperience.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent opacity-50"></div>

        {/* Experience items */}
        <div className="space-y-6 sm:space-y-8">
          {workExperience.map((exp, index) => (
            <div key={index} className="group relative pl-16 sm:pl-20">
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-12 sm:w-12 h-12 sm:h-12 flex items-center justify-center">
                <div className="absolute inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur"></div>
                <div className="relative w-8 sm:w-8 h-8 sm:h-8 bg-slate-900 rounded-full border-2 border-blue-500 group-hover:border-cyan-400 flex items-center justify-center transition-all duration-300">
                  <div className="w-3 sm:w-3 h-3 sm:h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                </div>
              </div>

              {/* Experience card */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-900/50 border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300 p-4 sm:p-6">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Title and company */}
                  <div className="mb-3 sm:mb-4">
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {exp.title}
                    </h4>
                    <p className="text-sm sm:text-base text-blue-400 font-semibold mt-1">
                      {exp.company}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center space-x-2 mb-4 sm:mb-5">
                    <svg
                      className="w-4 h-4 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-slate-400">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 sm:space-y-3">
                    {exp.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex space-x-3">
                        <div className="mt-1">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-1.5"></div>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
