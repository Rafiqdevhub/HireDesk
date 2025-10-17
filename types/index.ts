export interface PersonalInfo {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export interface WorkExperience {
  title?: string;
  company?: string;
  duration?: string;
  description?: string[];
}

export interface Education {
  degree?: string;
  institution?: string;
  year?: string;
  details?: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  highlights: string[];
}

export interface ResumeScore {
  overall_score: number;
  technical_score: number;
  experience_score: number;
  education_score: number;
  communication_score: number;
  reasoning: string;
  strengths: string[];
  weaknesses: string[];
  improvement_suggestions: string[];
}

export interface RoleRecommendation {
  roleName: string;
  matchPercentage: number;
  reasoning: string;
  requiredSkills: string[];
  missingSkills: string[];
  careerLevel: string;
  industryFit: string;
}

export interface PersonalityInsights {
  traits: { [key: string]: number };
  work_style: string;
  leadership_potential: number;
  team_player_score: number;
  analysis: string;
}

export interface CareerPath {
  current_level: string;
  next_roles: string[];
  timeline: string;
  required_development: string[];
}

export interface UsageStats {
  files_uploaded: number;
  batches_processed: number;
  files_remaining: number;
  files_limit: number;
  approaching_limit: boolean;
  approaching_limit_threshold: number;
}

export interface UpgradePrompt {
  show: boolean;
  message: string;
  cta: string;
  files_remaining: number;
}

export interface BatchAnalysisResult {
  file_name: string;
  status: "success" | "error";
  data: {
    resumeData: ResumeData;
    questions: any[];
    roleRecommendations: RoleRecommendation[];
    resumeScore: ResumeScore;
    personalityInsights: PersonalityInsights;
    careerPath: CareerPath;
  } | null;
  error: string | null;
}

export interface BatchAnalysisResponse {
  success: boolean;
  message: string;
  batch_summary: {
    total_submitted: number;
    successful: number;
    failed: number;
    success_rate: string;
  };
  usage_stats: UsageStats;
  results: BatchAnalysisResult[];
  failed_files_details?: Array<{ filename: string; error: string }>;
  upgrade_prompt: UpgradePrompt;
}
