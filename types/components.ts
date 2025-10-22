import type { ReactNode } from "react";
import type {
  BatchAnalysisResult,
  RoleRecommendation,
  CompareResumesResponse,
} from "./index";

// ============================================
// Analysis Components
// ============================================

export interface SkillsProps {
  skills: string[];
}

export interface InsightMetric {
  label: string;
  value: number;
  color?: string;
  description?: string;
}

export interface ResumeScoreData {
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

export interface PersonalityTraits {
  extraversion: number;
  conscientiousness: number;
  openness: number;
  agreeableness: number;
  emotional_stability: number;
}

export interface PersonalityData {
  traits: PersonalityTraits;
  work_style?: string;
  leadership_potential?: number;
  team_player_score?: number;
  analysis?: string;
}

export interface CareerPathData {
  current_level: string;
  next_roles?: string[];
  timeline?: string;
  required_development?: string[];
}

export interface AdvancedAnalyticsProps {
  resumeScore?: ResumeScoreData | null;
  personalityInsights?: PersonalityData | null;
  careerPath?: CareerPathData | null;
}

export interface AnalysisData {
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
  bestFitRole?: string;
  fitStatus?: string;
  reasoning?: string;
}

export interface ResumeAnalysisDisplayProps {
  analysisData: AnalysisData;
  isLoading?: boolean;
}

export interface ResumeAnalysis {
  resumeData?: any;
  roleRecommendations?: any[];
  questions?: any[];
  resumeScore?: any;
  personalityInsights?: any;
  careerPath?: any;
  fitStatus?: string;
  reasoning?: string;
  bestFitRole?: string;
}

export interface AnalysisOverviewProps {
  analysis: ResumeAnalysis;
}

export interface RoleRecommendationsProps {
  recommendations: RoleRecommendation[];
}

// ============================================
// Resume Components
// ============================================

export interface IconProps {
  className?: string;
  [key: string]: any;
}

export interface ErrorData {
  message: string;
  type: string;
  category: string;
}

export interface ResumeUploadProps {
  onFileUpload?: (file: File) => void;
  isLoading?: boolean;
  onError?: (error: ErrorData) => void;
  isPremium?: boolean;
  onResumeUploaded?: () => void;
}

export interface ResumeDataInterface {
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  workExperience?: Array<{
    title?: string;
    company?: string;
    duration?: string;
    description?: string[];
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    year?: string;
    details?: string[];
  }>;
  skills?: string[];
  highlights?: string[];
  name?: string;
  email?: string;
  phone?: string;
  experience?: string | any[] | any;
  summary?: string;
  [key: string]: any;
}

export interface ResumeDetailsWrapperProps {
  resumeData: ResumeDataInterface | null;
  onGenerateQuestions?: (jobDescription: string) => void;
  isLoading?: boolean;
}

// ============================================
// UI Components
// ============================================

export interface ToastProps {
  toast?: any;
  onClose: (id: string) => void;
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  message?: string;
  show?: boolean;
  duration?: number;
}

export interface RateLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  filesUploaded: number;
  uploadLimit: number;
}

export interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PasswordStrengthProps {
  strength: number; // 0-100
  newPassword: string;
}

// ============================================
// Toast Components
// ============================================

export interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export interface ToastComponentProps {
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
  action?: ToastAction;
  actions?: ToastAction[];
  errorData?: {
    errorType?: string | null;
    errorCategory?: string | null;
    originalError?: any;
  };
}

// ============================================
// Batch Components
// ============================================

export interface BatchResultCardProps {
  result: BatchAnalysisResult;
  index: number;
}

// ============================================
// Layout Components
// ============================================

export interface NavbarProps {
  onOpenTips: () => void;
}

// ============================================
// Auth Components
// ============================================

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export interface RedirectIfAuthenticatedProps {
  children: ReactNode;
  redirectTo?: string;
}

// ============================================
// Modal Components
// ============================================

export interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ============================================
// Comparison Components
// ============================================

export interface ComparisonResultsDisplayProps {
  results: CompareResumesResponse;
  isLoading?: boolean;
}
