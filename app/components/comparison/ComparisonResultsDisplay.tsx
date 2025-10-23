import React from "react";
import type { ComparisonResultsDisplayProps } from "@app-types/components";

export const ComparisonResultsDisplay: React.FC<
  ComparisonResultsDisplayProps
> = ({ results, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (!results || !results.ranked_candidates) {
    return null;
  }

  const { ranked_candidates, comparison_summary, recommendations } = results;

  const getRankColor = (index: number): string => {
    switch (index) {
      case 0:
        return "from-yellow-500 to-amber-600";
      case 1:
        return "from-gray-400 to-slate-500";
      case 2:
        return "from-orange-600 to-red-700";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  const getMedalEmoji = (index: number): string => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "📌";
    }
  };

  return (
    <div className="space-y-12">
      <section className="relative">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
              Comparison Summary
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-4 sm:p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl mb-3">📋</div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {comparison_summary.total_submitted}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mt-1">
                Total Resumes
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-4 sm:p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl mb-3">✓</div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {comparison_summary.successful}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mt-1">
                Analyzed
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-4 sm:p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-0 hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl mb-3">⭐</div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {comparison_summary.highest_score.toFixed(1)}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mt-1">
                Highest Score
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-4 sm:p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-0 hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl mb-3">📊</div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {comparison_summary.average_score.toFixed(1)}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mt-1">
                Average Score
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
              Ranked Candidates
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {ranked_candidates.map((candidate, index) => (
            <div
              key={`${candidate.filename}-${index}`}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6 hover:border-slate-600/80 transition-all duration-300"
            >
              <div
                className={`absolute top-4 right-4 bg-gradient-to-br ${getRankColor(
                  index
                )} rounded-lg px-3 py-2 flex items-center space-x-2`}
              >
                <span className="text-xl">{getMedalEmoji(index)}</span>
                <span className="font-bold text-white text-sm">
                  Rank #{index + 1}
                </span>
              </div>

              <div className="mb-4 pr-24">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {candidate.resumeData?.personalInfo?.name ||
                    candidate.filename}
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  {candidate.filename}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-lg p-3 border border-purple-500/20">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    {candidate.score.toFixed(1)}/100
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Overall Score</p>
                </div>

                {candidate.resumeData?.personalInfo && (
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-3 border border-blue-500/20">
                    <div className="text-sm font-semibold text-slate-200">
                      {candidate.resumeData.personalInfo.email && (
                        <div className="truncate">
                          {candidate.resumeData.personalInfo.email}
                        </div>
                      )}
                      {candidate.resumeData.personalInfo.phone && (
                        <div className="text-xs text-slate-400 mt-1">
                          {candidate.resumeData.personalInfo.phone}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Contact</p>
                  </div>
                )}

                {candidate.resumeData?.personalInfo?.location && (
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-500/20">
                    <div className="text-sm font-semibold text-slate-200 truncate">
                      {candidate.resumeData.personalInfo.location}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Location</p>
                  </div>
                )}
              </div>

              {candidate.strengths && candidate.strengths.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-green-400 mb-2">
                    ✓ Strengths
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.strengths.map((strength, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-green-500/10 border border-green-500/30 text-green-300 text-xs px-3 py-1 rounded-full"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {candidate.weaknesses && candidate.weaknesses.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-red-400 mb-2">
                    ✗ Weaknesses
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.weaknesses.map((weakness, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-red-500/10 border border-red-500/30 text-red-300 text-xs px-3 py-1 rounded-full"
                      >
                        {weakness}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {candidate.status === "error" && candidate.error && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-200">{candidate.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {recommendations && recommendations.length > 0 && (
        <section className="relative">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
                Hiring Recommendations
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/30 p-4 sm:p-6">
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {results.failed_files_details &&
        results.failed_files_details.length > 0 && (
          <section className="relative">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-red-300 to-rose-300 bg-clip-text text-transparent">
                  Failed Files
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              {results.failed_files_details.map((failedFile, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500/10 to-rose-500/10 backdrop-blur-sm border border-red-500/30 p-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-xl">❌</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-red-300 truncate">
                        {failedFile.filename}
                      </p>
                      <p className="text-xs text-red-200 mt-1">
                        {failedFile.error}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
    </div>
  );
};
