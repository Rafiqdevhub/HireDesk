import React from "react";

interface Education {
  degree: string;
  institution: string;
  year: string;
  details?: string[];
}

interface EducationProps {
  education: Education[];
  highlights?: string[];
}

export const EducationCard: React.FC<EducationProps> = ({
  education,
  highlights = [],
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg blur opacity-75"></div>
            <div className="relative bg-slate-900 p-2.5 rounded-lg">
              <svg
                className="w-6 h-6 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              Education & Highlights
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {education.length} Qualification
              {education.length !== 1 ? "s" : ""}{" "}
              {highlights.length > 0 &&
                `+ ${highlights.length} Key Highlight${highlights.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Education Section */}
        {education.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 14l9-5-9-5-9 5m0 0l9 5m-9-5v10l9 5v-10M3 12l9 5m9-5l-9-5m0 0l-9 5m9-5v10m0-10l9 5v10l-9 5" />
              </svg>
              <span>Education</span>
            </h4>

            <div className="space-y-4 sm:space-y-5">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl p-4 sm:p-5 bg-slate-900/30 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {edu.degree}
                      </h5>
                      <span className="text-xs sm:text-sm font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights Section */}
        {highlights.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Key Highlights</span>
            </h4>

            <div className="space-y-3 sm:space-y-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl p-4 sm:p-5 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 group-hover:text-slate-200 transition-colors leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
