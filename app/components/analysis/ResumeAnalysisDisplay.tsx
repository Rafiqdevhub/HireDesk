import React from "react";
import { PersonalInfoCard } from "./PersonalInfoCard";
import { WorkExperienceCard } from "./WorkExperienceCard";
import { SkillsCard } from "./SkillsCard";
import { RoleRecommendationsCard } from "./RoleRecommendationsCard";
import { InterviewQuestionsCard } from "./InterviewQuestionsCard";
import { AnalysisOverview } from "./AnalysisOverview";
import { EducationCard } from "./EducationCard";
import { AdvancedAnalytics } from "./AdvancedAnalytics";

interface AnalysisData {
  resumeData?: {
    personalInfo?: any;
    workExperience?: any[];
    education?: any[];
    skills?: string[];
    highlights?: string[];
  };
  roleRecommendations?: any[];
  questions?: any[];
  resumeScore?: any;
  personalityInsights?: any;
  careerPath?: any;
}

interface ResumeAnalysisDisplayProps {
  analysisData: AnalysisData;
  isLoading?: boolean;
}

export const ResumeAnalysisDisplay: React.FC<ResumeAnalysisDisplayProps> = ({
  analysisData,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-64 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Analysis Overview */}
      {(analysisData.resumeData ||
        analysisData.roleRecommendations ||
        analysisData.questions) && (
        <section className="relative">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
                Analysis Overview
              </span>
            </h2>
          </div>
          <AnalysisOverview analysis={analysisData} />
        </section>
      )}

      {/* Personal Information */}
      {analysisData.resumeData?.personalInfo && (
        <section className="relative">
          <PersonalInfoCard
            personalInfo={analysisData.resumeData.personalInfo}
          />
        </section>
      )}

      {/* Work Experience */}
      {analysisData.resumeData?.workExperience &&
        analysisData.resumeData.workExperience.length > 0 && (
          <section className="relative">
            <WorkExperienceCard
              workExperience={analysisData.resumeData.workExperience}
            />
          </section>
        )}

      {/* Education & Highlights */}
      {(analysisData.resumeData?.education || []).length > 0 ||
      (analysisData.resumeData?.highlights || []).length > 0 ? (
        <section className="relative">
          <EducationCard
            education={analysisData.resumeData?.education || []}
            highlights={analysisData.resumeData?.highlights || []}
          />
        </section>
      ) : null}

      {/* Skills */}
      {analysisData.resumeData?.skills &&
        analysisData.resumeData.skills.length > 0 && (
          <section className="relative">
            <SkillsCard skills={analysisData.resumeData.skills} />
          </section>
        )}

      {/* Role Recommendations */}
      {analysisData.roleRecommendations &&
        analysisData.roleRecommendations.length > 0 && (
          <section className="relative">
            <RoleRecommendationsCard
              recommendations={analysisData.roleRecommendations}
            />
          </section>
        )}

      {/* Interview Questions */}
      {analysisData.questions && analysisData.questions.length > 0 && (
        <section className="relative">
          <InterviewQuestionsCard questions={analysisData.questions} />
        </section>
      )}

      {/* Advanced Analytics */}
      {(analysisData.resumeScore ||
        analysisData.personalityInsights ||
        analysisData.careerPath) && (
        <section className="relative">
          <AdvancedAnalytics
            resumeScore={analysisData.resumeScore}
            personalityInsights={analysisData.personalityInsights}
            careerPath={analysisData.careerPath}
          />
        </section>
      )}
    </div>
  );
};
