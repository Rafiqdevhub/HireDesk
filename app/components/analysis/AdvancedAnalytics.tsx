import React from "react";

interface InsightMetric {
  label: string;
  value: number;
  color?: string;
  description?: string;
}

interface ResumeScoreData {
  overall_score: number;
  technical_score: number;
  experience_score: number;
  education_score: number;
  communication_score: number;
  reasoning?: string;
  strengths?: string[];
  weaknesses?: string[];
  improvement_suggestions?: string[];
}

interface PersonalityTraits {
  extraversion: number;
  conscientiousness: number;
  openness: number;
  agreeableness: number;
  emotional_stability: number;
}

interface PersonalityData {
  traits: PersonalityTraits;
  work_style?: string;
  leadership_potential?: number;
  team_player_score?: number;
  analysis?: string;
}

interface CareerPathData {
  current_level: string;
  next_roles?: string[];
  timeline?: string;
  required_development?: string[];
}

interface AdvancedAnalyticsProps {
  resumeScore?: ResumeScoreData | null;
  personalityInsights?: PersonalityData | null;
  careerPath?: CareerPathData | null;
}

const ScoreGauge: React.FC<{ score: number; label: string }> = ({
  score,
  label,
}) => {
  const getColorClass = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-blue-500 to-cyan-500";
    if (score >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const colorClass = getColorClass(score);

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="8"
            strokeDasharray={`${(score / 100) * 339.3} 339.3`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
          <span className="text-xs text-slate-400">/100</span>
        </div>
      </div>

      <p className="text-center text-sm font-semibold text-slate-300">
        {label}
      </p>
    </div>
  );
};

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({
  resumeScore,
  personalityInsights,
  careerPath,
}) => {
  if (!resumeScore && !personalityInsights && !careerPath) {
    return null;
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Resume Score Section */}
      {resumeScore && (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-75"></div>
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
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Resume Quality Score
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Comprehensive evaluation of your resume
                </p>
              </div>
            </div>
          </div>

          {/* Overall score and breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 place-items-center">
            <ScoreGauge
              score={Math.round(resumeScore.overall_score)}
              label="Overall Score"
            />
            <ScoreGauge
              score={Math.round(resumeScore.technical_score)}
              label="Technical"
            />
            <ScoreGauge
              score={Math.round(resumeScore.experience_score)}
              label="Experience"
            />
            <ScoreGauge
              score={Math.round(resumeScore.education_score)}
              label="Education"
            />
            <ScoreGauge
              score={Math.round(resumeScore.communication_score)}
              label="Communication"
            />
          </div>

          {/* Analysis reasoning */}
          {resumeScore.reasoning && (
            <div className="mb-8 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {resumeScore.reasoning}
              </p>
            </div>
          )}

          {/* Strengths and Weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Strengths */}
            {resumeScore.strengths && resumeScore.strengths.length > 0 && (
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl p-4 sm:p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/50 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 hover:opacity-10 rounded-lg transition-opacity"></div>

                <div className="relative z-10">
                  <h4 className="text-lg font-bold text-green-300 mb-4 flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Strengths</span>
                  </h4>

                  <ul className="space-y-2">
                    {resumeScore.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-300">
                          {strength}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Weaknesses */}
            {resumeScore.weaknesses && resumeScore.weaknesses.length > 0 && (
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl p-4 sm:p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 hover:opacity-10 rounded-lg transition-opacity"></div>

                <div className="relative z-10">
                  <h4 className="text-lg font-bold text-orange-300 mb-4 flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Areas for Improvement</span>
                  </h4>

                  <ul className="space-y-2">
                    {resumeScore.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-300">
                          {weakness}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Improvement suggestions */}
          {resumeScore.improvement_suggestions &&
            resumeScore.improvement_suggestions.length > 0 && (
              <div className="mt-8 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <h4 className="text-lg font-bold text-indigo-300 mb-4 flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
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
                  <span>Recommended Actions</span>
                </h4>

                <ul className="space-y-3">
                  {resumeScore.improvement_suggestions.map(
                    (suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500/20 border border-indigo-500/50">
                            <span className="text-xs font-bold text-indigo-300">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm text-slate-300">
                          {suggestion}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </section>
      )}

      {/* Personality Insights Section */}
      {personalityInsights && (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                  Personality Insights
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Your professional work style and characteristics
                </p>
              </div>
            </div>
          </div>

          {/* Personality traits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {personalityInsights.traits &&
              Object.entries(personalityInsights.traits).map(([key, value]) => (
                <div
                  key={key}
                  className="relative overflow-hidden rounded-lg sm:rounded-xl p-4 sm:p-6 bg-slate-900/30 border border-slate-700/50 hover:border-pink-500/50 transition-all duration-300 group"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-slate-300 capitalize">
                        {key.replace(/_/g, " ")}
                      </h4>
                      <span className="text-lg font-bold text-pink-400">
                        {value}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-1000"
                        style={{ width: `${(value / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Work style and analysis */}
          {personalityInsights.work_style && (
            <div className="mb-6 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-pink-500/10 border border-pink-500/20">
              <h4 className="text-sm font-bold text-pink-300 mb-2 uppercase tracking-wide">
                Work Style
              </h4>
              <p className="text-sm sm:text-base text-slate-300">
                {personalityInsights.work_style}
              </p>
            </div>
          )}

          {personalityInsights.analysis && (
            <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-rose-500/10 border border-rose-500/20">
              <h4 className="text-sm font-bold text-rose-300 mb-3 uppercase tracking-wide">
                Analysis
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {personalityInsights.analysis}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Career Path Section */}
      {careerPath && (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75"></div>
                <div className="relative bg-slate-900 p-2.5 rounded-lg">
                  <svg
                    className="w-6 h-6 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4m0 0L3 5m0 0v8m0-8l4 4"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  Career Path Roadmap
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Your professional growth trajectory
                </p>
              </div>
            </div>
          </div>

          {/* Current level and next roles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Current Level */}
            <div className="relative overflow-hidden rounded-lg sm:rounded-xl p-4 sm:p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>

              <div className="relative z-10">
                <h4 className="text-lg font-bold text-cyan-300 mb-2">
                  Current Level
                </h4>
                <p className="text-2xl font-bold text-white capitalize">
                  {careerPath.current_level}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Entry point in your career journey
                </p>
              </div>
            </div>

            {/* Timeline */}
            {careerPath.timeline && (
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl p-4 sm:p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>

                <div className="relative z-10">
                  <h4 className="text-lg font-bold text-blue-300 mb-2">
                    Timeline
                  </h4>
                  <p className="text-2xl font-bold text-white">
                    {careerPath.timeline}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Expected progression time
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Next roles */}
          {careerPath.next_roles && careerPath.next_roles.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-300 mb-4 flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 17h8m0 0V9m0 8l-8-8-4 4m0 0L3 5m0 0v8m0-8l4 4" />
                </svg>
                <span>Recommended Next Roles</span>
              </h4>

              <div className="space-y-3">
                {careerPath.next_roles.map((role, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg sm:rounded-xl p-4 sm:p-5 bg-slate-900/30 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10 flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 bg-opacity-20 border border-cyan-500/30">
                          <svg
                            className="h-5 w-5 text-cyan-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-slate-100 transition-colors">
                        {role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required development */}
          {careerPath.required_development &&
            careerPath.required_development.length > 0 && (
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <h4 className="text-lg font-bold text-indigo-300 mb-4 flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  <span>Skills to Develop</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {careerPath.required_development.map((skill, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 rounded-lg bg-indigo-500/5 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300"
                    >
                      <p className="text-sm font-semibold text-indigo-300">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </section>
      )}
    </div>
  );
};
