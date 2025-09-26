import React from "react";

interface ResumeData {
  name?: string;
  email?: string;
  phone?: string;
  experience?: string;
  skills?: string[];
  education?: string;
  summary?: string;
  [key: string]: any;
}

interface ResumeDetailsWrapperProps {
  resumeData: ResumeData | null;
  onGenerateQuestions?: (jobDescription: string) => void;
  isLoading?: boolean;
}

const ResumeDetailsWrapper: React.FC<ResumeDetailsWrapperProps> = ({
  resumeData,
  onGenerateQuestions,
  isLoading = false,
}) => {
  if (!resumeData) {
    return (
      <div className="bg-slate-800/70 rounded-xl shadow-lg p-6 mt-8 border border-slate-600">
        <p className="text-gray-300 text-center">
          Upload a resume to see the extracted details here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/70 rounded-xl shadow-lg p-6 mt-8 border border-slate-600">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">
        Extracted Resume Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumeData.name && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Name</h3>
            <p className="text-gray-300">{resumeData.name}</p>
          </div>
        )}

        {resumeData.email && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Email</h3>
            <p className="text-gray-300">{resumeData.email}</p>
          </div>
        )}

        {resumeData.phone && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Phone</h3>
            <p className="text-gray-300">{resumeData.phone}</p>
          </div>
        )}

        {resumeData.experience && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Experience</h3>
            <p className="text-gray-300">{resumeData.experience}</p>
          </div>
        )}

        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="bg-slate-700/50 rounded-lg p-4 md:col-span-2">
            <h3 className="font-medium text-gray-200 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {resumeData.education && (
          <div className="bg-slate-700/50 rounded-lg p-4 md:col-span-2">
            <h3 className="font-medium text-gray-200 mb-2">Education</h3>
            <p className="text-gray-300">{resumeData.education}</p>
          </div>
        )}

        {resumeData.summary && (
          <div className="bg-slate-700/50 rounded-lg p-4 md:col-span-2">
            <h3 className="font-medium text-gray-200 mb-2">Summary</h3>
            <p className="text-gray-300">{resumeData.summary}</p>
          </div>
        )}
      </div>

      {onGenerateQuestions && (
        <div className="mt-6">
          <button
            onClick={() => onGenerateQuestions("")}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Generating Questions..."
              : "Generate Interview Questions"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeDetailsWrapper;
