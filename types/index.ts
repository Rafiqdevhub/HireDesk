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
  upload_limit_info?: {
    reached_limit: boolean;
    files_rejected: number;
    message: string;
    upgrade_prompt?: UpgradePrompt;
  };
  upgrade_prompt: UpgradePrompt;
}

export interface HireDeskAnalyzeResponse {
  success: boolean;
  fit_status: "fit" | "unfit" | "partial";
  reasoning: string;
  best_fit_role: string;
  resumeData: ResumeData;
  roleRecommendations: RoleRecommendation[];
  questions: Array<{
    type: "technical" | "behavioral" | "scenario-based" | "role-specific";
    question: string;
    context: string;
  }>;
  resumeScore: ResumeScore;
  personalityInsights: PersonalityInsights;
  careerPath: CareerPath;
}

export interface ComparisonCandidate {
  filename: string;
  resumeData: ResumeData;
  score: number;
  strengths: string[];
  weaknesses: string[];
  status: "success" | "error";
  error?: string;
}

export interface ComparisonSummary {
  total_submitted: number;
  successful: number;
  failed: number;
  highest_score: number;
  average_score: number;
}

export interface CompareResumesResponse {
  success: boolean;
  message: string;
  comparison_summary: ComparisonSummary;
  usage_stats: UsageStats;
  ranked_candidates: ComparisonCandidate[];
  recommendations: string[];
  failed_files_details?: Array<{ filename: string; error: string }>;
  upgrade_prompt?: UpgradePrompt;
}

// File Service Types
export interface FileUploadResponse {
  success: boolean;
  message: string;
  data: {
    originalName: string;
    size: number;
    totalFilesUploaded: number;
  };
  error?: string;
}

export interface FileStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalFilesUploaded: number;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  error?: string;
}

// Auth Service Types
export interface User {
  id: string;
  name: string;
  email: string;
  company_name: string;
  filesUploaded: number;
  selected_candidate?: number;
  emailVerified?: boolean;
  createdAt?: string;
}

export interface ProfileResponse extends User {
  createdAt: string;
}

export interface TokenResponse {
  accessToken: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: TokenResponse | ProfileResponse;
  error?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  company_name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordWithTokenRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileRequest {
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

// Form Hook Types
export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isLoading: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (
    onSubmit: (values: T) => Promise<void>
  ) => (e: React.FormEvent) => Promise<void>;
  setError: (field: keyof T, message: string) => void;
  clearErrors: () => void;
  reset: () => void;
}

// Toast Context Types
export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastContextType {
  toasts: Toast[];
  showToast: (
    message: string,
    type?: ToastType,
    options?: {
      title?: string;
      duration?: number;
      action?: Toast["action"];
    }
  ) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPasswordWithToken: (
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;
  requiresVerification: boolean;
  unverifiedEmail: string | null;
  isAuthenticated: boolean;
}

// Component Props Types
export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  company_name: string;
  agreeToTerms?: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ExtendedAxiosRequestConfig {
  _retry?: boolean;
}

// Component types export
export * from "./components";
