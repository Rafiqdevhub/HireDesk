import { useState } from "react";
import type { BatchResultCardProps } from "../../../types/components";
import type { RoleRecommendation } from "../../../types/index";
import "./batch-result.css";

export const BatchResultCard = ({ result, index }: BatchResultCardProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (result.status === "error") {
    return (
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-white">
                {result.file_name || `File ${index + 1}`}
              </h5>
              <p className="text-slate-400 text-sm">Analysis Failed</p>
            </div>
          </div>
        </div>
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-200">{result.error}</p>
        </div>
      </div>
    );
  }

  if (!result.data) {
    return null;
  }

  const {
    resumeData,
    resumeScore,
    roleRecommendations,
    personalityInsights,
    careerPath,
  } = result.data;
  const { personalInfo, workExperience, education, skills, highlights } =
    resumeData;

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50">
      <div className="relative p-4 sm:p-6 border-b border-slate-700/30">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-lg font-semibold text-white truncate">
                {personalInfo?.name || `Candidate ${index + 1}`}
              </h5>
              <div className="flex flex-wrap gap-2 mt-1 text-xs">
                {personalInfo?.email && (
                  <span className="text-slate-400 truncate">
                    {personalInfo.email}
                  </span>
                )}
                {personalInfo?.phone && (
                  <span className="text-slate-400">{personalInfo.phone}</span>
                )}
              </div>
              {personalInfo?.location && (
                <p className="text-xs text-slate-400 mt-1">
                  {personalInfo.location}
                </p>
              )}
            </div>
          </div>

          <div className="text-right ml-4 flex-shrink-0">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {resumeScore?.overall_score || "N/A"}
            </div>
            <div className="text-xs text-slate-400 mt-1">Overall Score</div>
          </div>
        </div>

        {resumeScore && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <div className="bg-slate-700/30 rounded-lg p-2">
              <p className="text-xs text-slate-400">Technical</p>
              <p className="text-sm font-semibold text-blue-400">
                {resumeScore.technical_score}
              </p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-2">
              <p className="text-xs text-slate-400">Experience</p>
              <p className="text-sm font-semibold text-yellow-400">
                {resumeScore.experience_score}
              </p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-2">
              <p className="text-xs text-slate-400">Education</p>
              <p className="text-sm font-semibold text-purple-400">
                {resumeScore.education_score}
              </p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-2">
              <p className="text-xs text-slate-400">Communication</p>
              <p className="text-sm font-semibold text-pink-400">
                {resumeScore.communication_score}
              </p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-2">
              <p className="text-xs text-slate-400">Overall</p>
              <p className="text-sm font-semibold text-green-400">
                {resumeScore.overall_score}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 space-y-3">
        {highlights && highlights.length > 0 && (
          <div className="bg-slate-700/20 rounded-lg p-4">
            <h6 className="text-sm font-semibold text-slate-200 mb-3">
              Key Highlights
            </h6>
            <div className="space-y-2">
              {highlights.slice(0, 3).map((highlight: string, idx: number) => (
                <div key={idx} className="flex gap-2 text-sm">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <p className="text-slate-300">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education && education.length > 0 && (
          <button
            onClick={() => toggleSection("education")}
            className="w-full text-left bg-slate-700/20 hover:bg-slate-700/30 rounded-lg p-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-semibold text-slate-200">
                Education
              </h6>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "education" ? "rotate-180" : ""
                }`}
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
            {expandedSection === "education" && (
              <div className="mt-3 space-y-2">
                {education.map((edu: any, idx: number) => (
                  <div
                    key={idx}
                    className="text-sm text-slate-300 border-l-2 border-blue-500/50 pl-3"
                  >
                    <p className="font-medium text-blue-300">{edu.degree}</p>
                    {edu.institution && (
                      <p className="text-xs text-slate-400">
                        {edu.institution}
                      </p>
                    )}
                    {edu.year && (
                      <p className="text-xs text-slate-500">
                        Graduated: {edu.year}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </button>
        )}

        {workExperience && workExperience.length > 0 && (
          <button
            onClick={() => toggleSection("experience")}
            className="w-full text-left bg-slate-700/20 hover:bg-slate-700/30 rounded-lg p-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-semibold text-slate-200">
                Work Experience ({workExperience.length})
              </h6>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "experience" ? "rotate-180" : ""
                }`}
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
            {expandedSection === "experience" && (
              <div className="mt-3 space-y-3">
                {workExperience.map((exp: any, idx: number) => (
                  <div
                    key={idx}
                    className="text-sm text-slate-300 border-l-2 border-emerald-500/50 pl-3"
                  >
                    <p className="font-medium text-emerald-300">{exp.title}</p>
                    <p className="text-xs text-slate-400">{exp.company}</p>
                    {exp.duration && (
                      <p className="text-xs text-slate-500 mt-1">
                        {exp.duration}
                      </p>
                    )}
                    {exp.description && exp.description.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-slate-300">
                        {exp.description.map(
                          (desc: string, descIdx: number) => (
                            <li key={descIdx} className="flex gap-2">
                              <span className="text-emerald-400 flex-shrink-0">
                                •
                              </span>
                              <span>{desc}</span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </button>
        )}

        {skills && skills.length > 0 && (
          <button
            onClick={() => toggleSection("skills")}
            className="w-full text-left bg-slate-700/20 hover:bg-slate-700/30 rounded-lg p-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-semibold text-slate-200">
                Skills ({skills.length})
              </h6>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "skills" ? "rotate-180" : ""
                }`}
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
            {expandedSection === "skills" && (
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30 hover:border-cyan-500/50 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </button>
        )}

        {roleRecommendations && roleRecommendations.length > 0 && (
          <button
            onClick={() => toggleSection("roles")}
            className="w-full text-left bg-slate-700/20 hover:bg-slate-700/30 rounded-lg p-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-semibold text-slate-200">
                Role Recommendations ({roleRecommendations.length})
              </h6>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "roles" ? "rotate-180" : ""
                }`}
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
            {expandedSection === "roles" && (
              <div className="mt-3 space-y-3">
                {roleRecommendations.map(
                  (role: RoleRecommendation, idx: number) => (
                    <div
                      key={idx}
                      className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-3"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-amber-300">
                            {role.roleName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {role.careerLevel} • {role.industryFit}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-400">
                            {role.matchPercentage}%
                          </p>
                          <p className="text-xs text-slate-500">Match</p>
                        </div>
                      </div>

                      <div className="w-full bg-slate-700/50 rounded-full h-2 mb-3 overflow-hidden">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 match-progress-${role.matchPercentage}`}
                        ></div>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 mb-2">
                        {role.reasoning}
                      </p>

                      {role.requiredSkills &&
                        role.requiredSkills.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-green-300 mb-1">
                              ✓ Required Skills: {role.requiredSkills.length}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {role.requiredSkills
                                .slice(0, 5)
                                .map((skill: string, skIdx: number) => (
                                  <span
                                    key={skIdx}
                                    className="px-1.5 py-0.5 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              {role.requiredSkills.length > 5 && (
                                <span className="text-xs text-slate-400">
                                  +{role.requiredSkills.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                      {role.missingSkills && role.missingSkills.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-amber-300 mb-1">
                            Missing Skills: {role.missingSkills.length}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {role.missingSkills
                              .slice(0, 5)
                              .map((skill: string, skIdx: number) => (
                                <span
                                  key={skIdx}
                                  className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded border border-amber-500/30"
                                >
                                  {skill}
                                </span>
                              ))}
                            {role.missingSkills.length > 5 && (
                              <span className="text-xs text-slate-400">
                                +{role.missingSkills.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </button>
        )}

        {resumeScore && (
          <button
            onClick={() => toggleSection("scoring")}
            className="w-full text-left bg-slate-700/20 hover:bg-slate-700/30 rounded-lg p-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-semibold text-slate-200">
                Score Analysis
              </h6>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "scoring" ? "rotate-180" : ""
                }`}
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
            {expandedSection === "scoring" && (
              <div className="mt-3 space-y-3">
                {resumeScore.reasoning && (
                  <div className="text-sm text-slate-300">
                    <p className="font-medium text-slate-200 mb-2">
                      Reasoning:
                    </p>
                    <p className="text-xs leading-relaxed">
                      {resumeScore.reasoning}
                    </p>
                  </div>
                )}

                {resumeScore.strengths && resumeScore.strengths.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-green-300 mb-2">
                      ✓ Strengths:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {resumeScore.strengths.map(
                        (strength: string, idx: number) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-green-400 flex-shrink-0">
                              •
                            </span>
                            <span>{strength}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {resumeScore.weaknesses &&
                  resumeScore.weaknesses.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-amber-300 mb-2">
                        Weaknesses:
                      </p>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {resumeScore.weaknesses.map(
                          (weakness: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-amber-400 flex-shrink-0">
                                •
                              </span>
                              <span>{weakness}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {resumeScore.improvement_suggestions &&
                  resumeScore.improvement_suggestions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-blue-300 mb-2">
                        💡 Improvement Suggestions:
                      </p>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {resumeScore.improvement_suggestions.map(
                          (suggestion: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-blue-400 flex-shrink-0">
                                •
                              </span>
                              <span>{suggestion}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </button>
        )}

        {personalityInsights && (
          <button
            onClick={() => toggleSection("personality")}
            className="w-full text-left bg-slate-700/20 hover:bg-slate-700/30 rounded-lg p-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-semibold text-slate-200">
                Personality Insights
              </h6>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "personality" ? "rotate-180" : ""
                }`}
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
            {expandedSection === "personality" && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(personalityInsights.traits || {}).map(
                    ([trait, score]) => (
                      <div key={trait} className="bg-slate-600/30 rounded p-2">
                        <p className="text-xs text-slate-400 capitalize">
                          {trait.replace(/_/g, " ")}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 score-${score}`}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-purple-300">
                            {String(score)}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-indigo-500/10 border border-indigo-500/30 rounded p-2">
                    <p className="text-xs text-slate-400">Work Style</p>
                    <p className="text-sm font-semibold text-indigo-300 mt-1">
                      {personalityInsights.work_style}
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                    <p className="text-xs text-slate-400">Leadership</p>
                    <p className="text-sm font-semibold text-blue-300 mt-1">
                      {personalityInsights.leadership_potential}/100
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <p className="text-xs text-slate-400">Team Player</p>
                    <p className="text-sm font-semibold text-green-300 mt-1">
                      {personalityInsights.team_player_score}/100
                    </p>
                  </div>
                </div>

                {personalityInsights.analysis && (
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {personalityInsights.analysis}
                  </div>
                )}
              </div>
            )}
          </button>
        )}

        {careerPath && (
          <button
            onClick={() => toggleSection("career")}
            className="w-full text-left bg-slate-700/20 hover:bg-slate-700/30 rounded-lg p-4 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-semibold text-slate-200">
                Career Path
              </h6>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "career" ? "rotate-180" : ""
                }`}
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
            {expandedSection === "career" && (
              <div className="mt-3 space-y-3">
                <div className="bg-teal-500/10 border border-teal-500/30 rounded p-3">
                  <p className="text-xs text-slate-400">Current Level</p>
                  <p className="text-sm font-semibold text-teal-300 mt-1">
                    {careerPath.current_level}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-300 mb-2">
                    Next Possible Roles:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {careerPath.next_roles &&
                      careerPath.next_roles.map((role: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30"
                        >
                          {role}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="bg-slate-600/30 rounded p-3">
                  <p className="text-xs font-semibold text-slate-300 mb-2">
                    Timeline for Advancement
                  </p>
                  <p className="text-xs text-slate-300">
                    {careerPath.timeline}
                  </p>
                </div>

                {careerPath.required_development &&
                  careerPath.required_development.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-slate-300 mb-2">
                        Required Development Areas:
                      </p>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {careerPath.required_development.map(
                          (dev: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-cyan-400 flex-shrink-0">
                                →
                              </span>
                              <span>{dev}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default BatchResultCard;
