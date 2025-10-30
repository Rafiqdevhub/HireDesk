import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";

// Mock axios before importing the service
vi.mock("axios", () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: {
        use: vi.fn(),
      },
      response: {
        use: vi.fn(),
      },
    },
  };

  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
      ...mockAxiosInstance,
    },
  };
});

// Import service after mocking
const { aiService } = await import("../../../app/services/aiService");

const mockAxios = vi.mocked(axios, true);

// Get existing localStorage mock from test-setup
const localStorageMock = global.localStorage as Storage & {
  clear: () => void;
};

// Mock window.location
const mockLocation = {
  pathname: "/",
  href: "/",
};

Object.defineProperty(global, "window", {
  value: {
    location: mockLocation,
  },
  writable: true,
});

describe("aiService", () => {
  let mockAxiosInstance: any;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    mockLocation.pathname = "/";
    mockLocation.href = "/";

    // Get the mocked instance
    mockAxiosInstance = (mockAxios.create as any)();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("hireDeskAnalyze", () => {
    test("should analyze resume successfully", async () => {
      const mockFile = new File(["resume content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockResponse = {
        data: {
          success: true,
          fit_status: "fit" as const,
          reasoning: "Strong match for senior developer position",
          best_fit_role: "Senior Developer",
          resumeData: {
            personalInfo: {
              name: "John Doe",
              email: "john@example.com",
              phone: "+1234567890",
            },
            skills: ["JavaScript", "React", "Node.js"],
            workExperience: [
              {
                title: "Senior Developer",
                company: "Tech Corp",
                duration: "2020-Present",
              },
            ],
            education: [
              {
                degree: "Bachelor's in Computer Science",
                institution: "University",
                year: "2019",
              },
            ],
            highlights: [],
          },
          roleRecommendations: [],
          questions: [],
          resumeScore: {
            overall_score: 85,
            technical_score: 90,
            experience_score: 88,
            education_score: 80,
            communication_score: 85,
            reasoning: "Excellent candidate",
            strengths: ["Strong technical skills"],
            weaknesses: [],
            improvement_suggestions: [],
          },
          personalityInsights: {
            traits: {},
            work_style: "Collaborative",
            leadership_potential: 8,
            team_player_score: 9,
            analysis: "Good team fit",
          },
          careerPath: {
            current_level: "Senior",
            next_roles: ["Lead Developer"],
            timeline: "1-2 years",
            required_development: [],
          },
        },
      };

      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const result = await aiService.hireDeskAnalyze(
        mockFile,
        "Senior Developer",
        "Looking for experienced React developer"
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/hiredesk-analyze",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      expect(result.success).toBe(true);
      expect(result.resumeData.personalInfo.name).toBe("John Doe");
      expect(result.resumeScore.overall_score).toBe(85);
    });

    test("should handle invalid file format error", async () => {
      const mockFile = new File(["content"], "resume.txt", {
        type: "text/plain",
      });

      const mockError = {
        response: {
          status: 422,
          data: {
            detail: "Invalid file format. Only PDF and DOCX are supported.",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.hireDeskAnalyze(mockFile, "Developer", "Job description")
      ).rejects.toMatchObject({
        success: false,
        message: "Invalid file format. Only PDF and DOCX are supported.",
        status: 422,
      });
    });

    test("should handle file size limit error", async () => {
      const mockFile = new File(["x".repeat(11 * 1024 * 1024)], "large.pdf", {
        type: "application/pdf",
      });

      const mockError = {
        response: {
          status: 422,
          data: {
            detail: "File size exceeds 10MB limit",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.hireDeskAnalyze(mockFile, "Developer", "Job description")
      ).rejects.toMatchObject({
        success: false,
        message: "File size exceeds 10MB limit",
        status: 422,
      });
    });

    test("should handle rate limiting error (429)", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockError = {
        response: {
          status: 429,
          data: {
            detail: "Daily limit reached. You have analyzed 10/10 files today.",
            current_count: 10,
            limit: 10,
            remaining: 0,
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.hireDeskAnalyze(mockFile, "Developer", "Job description")
      ).rejects.toMatchObject({
        success: false,
        message: "Daily limit reached. You have analyzed 10/10 files today.",
        status: 429,
      });
    });

    test("should handle network errors", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockError = {
        code: "NETWORK_ERROR",
        message: "Network Error",
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.hireDeskAnalyze(mockFile, "Developer", "Job description")
      ).rejects.toMatchObject({
        success: false,
        message:
          "Unable to connect to the server. Please check your internet connection.",
      });
    });

    test("should handle server errors (500)", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockError = {
        response: {
          status: 500,
          data: {
            message: "Internal server error",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.hireDeskAnalyze(mockFile, "Developer", "Job description")
      ).rejects.toMatchObject({
        success: false,
        message: "Internal server error",
        status: 500,
      });
    });

    test("should handle authentication error (401)", async () => {
      const mockFile = new File(["content"], "resume.pdf", {
        type: "application/pdf",
      });

      const mockError = {
        response: {
          status: 401,
          data: {
            message: "Unauthorized. Please login.",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.hireDeskAnalyze(mockFile, "Developer", "Job description")
      ).rejects.toMatchObject({
        success: false,
        message: "Unauthorized. Please login.",
        status: 401,
      });
    });
  });

  describe("batchAnalyze", () => {
    test("should analyze multiple resumes successfully", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
        new File(["content3"], "resume3.pdf", { type: "application/pdf" }),
      ];

      const mockResponse = {
        data: {
          success: true,
          message: "Batch analysis complete",
          batch_summary: {
            total_submitted: 3,
            successful: 3,
            failed: 0,
            success_rate: "100%",
          },
          usage_stats: {
            files_uploaded: 3,
            batches_processed: 1,
            files_remaining: 7,
            files_limit: 10,
            approaching_limit: false,
            approaching_limit_threshold: 8,
          },
          results: [
            {
              file_name: "resume1.pdf",
              status: "success" as const,
              data: {
                resumeData: {
                  personalInfo: { name: "John Doe" },
                  workExperience: [],
                  education: [],
                  skills: [],
                  highlights: [],
                },
                questions: [],
                roleRecommendations: [],
                resumeScore: {
                  overall_score: 85,
                  technical_score: 90,
                  experience_score: 88,
                  education_score: 80,
                  communication_score: 85,
                  reasoning: "",
                  strengths: [],
                  weaknesses: [],
                  improvement_suggestions: [],
                },
                personalityInsights: {
                  traits: {},
                  work_style: "",
                  leadership_potential: 0,
                  team_player_score: 0,
                  analysis: "",
                },
                careerPath: {
                  current_level: "",
                  next_roles: [],
                  timeline: "",
                  required_development: [],
                },
              },
              error: null,
            },
            {
              file_name: "resume2.pdf",
              status: "success" as const,
              data: {
                resumeData: {
                  personalInfo: { name: "Jane Smith" },
                  workExperience: [],
                  education: [],
                  skills: [],
                  highlights: [],
                },
                questions: [],
                roleRecommendations: [],
                resumeScore: {
                  overall_score: 85,
                  technical_score: 90,
                  experience_score: 88,
                  education_score: 80,
                  communication_score: 85,
                  reasoning: "",
                  strengths: [],
                  weaknesses: [],
                  improvement_suggestions: [],
                },
                personalityInsights: {
                  traits: {},
                  work_style: "",
                  leadership_potential: 0,
                  team_player_score: 0,
                  analysis: "",
                },
                careerPath: {
                  current_level: "",
                  next_roles: [],
                  timeline: "",
                  required_development: [],
                },
              },
              error: null,
            },
            {
              file_name: "resume3.pdf",
              status: "success" as const,
              data: {
                resumeData: {
                  personalInfo: { name: "Bob Wilson" },
                  workExperience: [],
                  education: [],
                  skills: [],
                  highlights: [],
                },
                questions: [],
                roleRecommendations: [],
                resumeScore: {
                  overall_score: 85,
                  technical_score: 90,
                  experience_score: 88,
                  education_score: 80,
                  communication_score: 85,
                  reasoning: "",
                  strengths: [],
                  weaknesses: [],
                  improvement_suggestions: [],
                },
                personalityInsights: {
                  traits: {},
                  work_style: "",
                  leadership_potential: 0,
                  team_player_score: 0,
                  analysis: "",
                },
                careerPath: {
                  current_level: "",
                  next_roles: [],
                  timeline: "",
                  required_development: [],
                },
              },
              error: null,
            },
          ],
          upgrade_prompt: {
            show: false,
            message: "",
            cta: "",
            files_remaining: 7,
          },
        },
      };

      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const result = await aiService.batchAnalyze(mockFiles);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/batch-analyze",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      expect(result.success).toBe(true);
      expect(result.batch_summary.total_submitted).toBe(3);
      expect(result.batch_summary.successful).toBe(3);
      expect(result.results).toHaveLength(3);
    });

    test("should handle batch analysis with optional parameters", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
      ];

      const mockResponse = {
        data: {
          success: true,
          total_submitted: 2,
          successful: 2,
          failed: 0,
          results: [],
        },
      };

      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      await aiService.batchAnalyze(
        mockFiles,
        "Senior Developer",
        "Looking for experienced developers"
      );

      // Verify FormData was created with target_role and job_description
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/batch-analyze",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    });

    test("should handle file count validation error", async () => {
      const mockFiles = [
        new File(["content"], "resume.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        response: {
          status: 422,
          data: {
            detail: "Batch analysis requires 2-5 files",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(aiService.batchAnalyze(mockFiles)).rejects.toMatchObject({
        success: false,
        message: "Batch analysis requires 2-5 files",
        status: 422,
      });
    });

    test("should handle rate limiting for batch analysis", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        response: {
          status: 429,
          data: {
            detail:
              "Batch analysis limit reached. Current: 8, Trying: 2, Allowed: 0",
            current_count: 8,
            limit: 10,
            remaining: 2,
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(aiService.batchAnalyze(mockFiles)).rejects.toMatchObject({
        success: false,
        message:
          "Batch analysis limit reached. Current: 8, Trying: 2, Allowed: 0",
        status: 429,
      });
    });

    test("should handle partial failures in batch", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
        new File(["content3"], "resume3.pdf", { type: "application/pdf" }),
      ];

      const mockResponse = {
        data: {
          success: true,
          message: "Batch analysis complete",
          batch_summary: {
            total_submitted: 3,
            successful: 2,
            failed: 1,
            success_rate: "67%",
          },
          usage_stats: {
            files_uploaded: 3,
            batches_processed: 1,
            files_remaining: 7,
            files_limit: 10,
            approaching_limit: false,
            approaching_limit_threshold: 8,
          },
          results: [
            {
              file_name: "resume1.pdf",
              status: "success" as const,
              data: {
                resumeData: {
                  personalInfo: { name: "John Doe" },
                  workExperience: [],
                  education: [],
                  skills: [],
                  highlights: [],
                },
                questions: [],
                roleRecommendations: [],
                resumeScore: {
                  overall_score: 85,
                  technical_score: 90,
                  experience_score: 88,
                  education_score: 80,
                  communication_score: 85,
                  reasoning: "",
                  strengths: [],
                  weaknesses: [],
                  improvement_suggestions: [],
                },
                personalityInsights: {
                  traits: {},
                  work_style: "",
                  leadership_potential: 0,
                  team_player_score: 0,
                  analysis: "",
                },
                careerPath: {
                  current_level: "",
                  next_roles: [],
                  timeline: "",
                  required_development: [],
                },
              },
              error: null,
            },
            {
              file_name: "resume2.pdf",
              status: "success" as const,
              data: {
                resumeData: {
                  personalInfo: { name: "Jane Smith" },
                  workExperience: [],
                  education: [],
                  skills: [],
                  highlights: [],
                },
                questions: [],
                roleRecommendations: [],
                resumeScore: {
                  overall_score: 85,
                  technical_score: 90,
                  experience_score: 88,
                  education_score: 80,
                  communication_score: 85,
                  reasoning: "",
                  strengths: [],
                  weaknesses: [],
                  improvement_suggestions: [],
                },
                personalityInsights: {
                  traits: {},
                  work_style: "",
                  leadership_potential: 0,
                  team_player_score: 0,
                  analysis: "",
                },
                careerPath: {
                  current_level: "",
                  next_roles: [],
                  timeline: "",
                  required_development: [],
                },
              },
              error: null,
            },
            {
              file_name: "resume3.pdf",
              status: "error" as const,
              data: null,
              error: "Could not extract text from resume",
            },
          ],
          upgrade_prompt: {
            show: false,
            message: "",
            cta: "",
            files_remaining: 7,
          },
        },
      };

      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const result = await aiService.batchAnalyze(mockFiles);

      expect(result.batch_summary.successful).toBe(2);
      expect(result.batch_summary.failed).toBe(1);
    });

    test("should handle network errors during batch", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        code: "NETWORK_ERROR",
        message: "Network Error",
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(aiService.batchAnalyze(mockFiles)).rejects.toMatchObject({
        success: false,
        message:
          "Unable to connect to the server. Please check your internet connection.",
      });
    });
  });

  describe("compareResumes", () => {
    test("should compare resumes successfully", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
      ];

      const mockResponse = {
        data: {
          success: true,
          message: "Comparison complete",
          comparison_summary: {
            total_submitted: 2,
            successful: 2,
            failed: 0,
            highest_score: 92,
            average_score: 85,
          },
          ranked_candidates: [
            {
              filename: "resume1.pdf",
              resumeData: {
                personalInfo: { name: "John Doe" },
                workExperience: [],
                education: [],
                skills: [],
                highlights: [],
              },
              score: 92,
              strengths: ["Strong technical skills", "Leadership experience"],
              weaknesses: ["Limited cloud experience"],
              status: "success" as const,
            },
            {
              filename: "resume2.pdf",
              resumeData: {
                personalInfo: { name: "Jane Smith" },
                workExperience: [],
                education: [],
                skills: [],
                highlights: [],
              },
              score: 78,
              strengths: ["Good communication skills"],
              weaknesses: ["Less experience"],
              status: "success" as const,
            },
          ],
          recommendations: [
            "John Doe is the strongest candidate",
            "Consider Jane Smith for junior roles",
          ],
        },
      };

      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const result = await aiService.compareResumes(mockFiles);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/compare-resumes",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      expect(result.success).toBe(true);
      expect(result.ranked_candidates).toHaveLength(2);
      expect(result.ranked_candidates[0].score).toBe(92);
      expect(result.comparison_summary.highest_score).toBe(92);
    });

    test("should handle invalid file count for comparison", async () => {
      const mockFiles = [
        new File(["content"], "resume.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        response: {
          status: 422,
          data: {
            detail: "Comparison requires at least 2 resumes",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(aiService.compareResumes(mockFiles)).rejects.toMatchObject({
        success: false,
        message: "Comparison requires at least 2 resumes",
        status: 422,
      });
    });

    test("should handle rate limiting for comparison", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        response: {
          status: 429,
          data: {
            detail: "Comparison limit reached for today",
            current_count: 10,
            limit: 10,
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(aiService.compareResumes(mockFiles)).rejects.toMatchObject({
        success: false,
        message: "Comparison limit reached for today",
        status: 429,
      });
    });

    test("should handle comparison with invalid candidate data", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        response: {
          status: 422,
          data: {
            detail:
              "Could not extract sufficient data from one or more resumes",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(aiService.compareResumes(mockFiles)).rejects.toMatchObject({
        success: false,
        message: "Could not extract sufficient data from one or more resumes",
        status: 422,
      });
    });
  });

  describe("selectCandidates", () => {
    test("should evaluate candidates successfully", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
        new File(["content3"], "resume3.pdf", { type: "application/pdf" }),
      ];

      const mockResponse = {
        data: {
          job_title: "Senior Backend Developer",
          keywords: ["Python", "AWS", "Docker", "PostgreSQL"],
          total_candidates: 3,
          fit_count: 2,
          reject_count: 1,
          results: [
            {
              candidate: "resume1.pdf",
              status: "FIT",
              message:
                "Strong match - has 8+ years Python, AWS expertise, proven leadership",
            },
            {
              candidate: "resume2.pdf",
              status: "FIT",
              message:
                "Good fit - 5+ years Python/AWS, leadership skills demonstrated",
            },
            {
              candidate: "resume3.pdf",
              status: "REJECT",
              message:
                "Missing key skills: Docker, PostgreSQL. Only 2 years Python experience",
            },
          ],
        },
      };

      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const result = await aiService.selectCandidates(
        mockFiles,
        "Senior Backend Developer",
        "Python, AWS, Docker, PostgreSQL"
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/selection-candidate",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      expect(result.job_title).toBe("Senior Backend Developer");
      expect(result.total_candidates).toBe(3);
      expect(result.fit_count).toBe(2);
      expect(result.reject_count).toBe(1);
      expect(result.results).toHaveLength(3);
    });

    test("should handle file count validation (1-5 files)", async () => {
      const mockFiles = Array(6)
        .fill(null)
        .map(
          (_, i) =>
            new File(["content"], `resume${i}.pdf`, { type: "application/pdf" })
        );

      const mockError = {
        response: {
          status: 422,
          data: {
            detail: "Candidate selection requires 1-5 files",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.selectCandidates(mockFiles, "Developer", "Python, JavaScript")
      ).rejects.toMatchObject({
        success: false,
        message: "Candidate selection requires 1-5 files",
        status: 422,
      });
    });

    test("should handle missing job title", async () => {
      const mockFiles = [
        new File(["content"], "resume.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        response: {
          status: 422,
          data: {
            detail: "Job title is required",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.selectCandidates(mockFiles, "", "Python, JavaScript")
      ).rejects.toMatchObject({
        success: false,
        message: "Job title is required",
        status: 422,
      });
    });

    test("should handle missing keywords", async () => {
      const mockFiles = [
        new File(["content"], "resume.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        response: {
          status: 422,
          data: {
            detail: "Keywords are required",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.selectCandidates(mockFiles, "Developer", "")
      ).rejects.toMatchObject({
        success: false,
        message: "Keywords are required",
        status: 422,
      });
    });

    test("should handle rate limiting (10/day quota)", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        response: {
          status: 429,
          data: {
            detail:
              "User exceeded selected_candidate limit. Current: 9, Trying: 2, Allowed: 1",
            status_code: 429,
            current_count: 9,
            limit: 10,
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.selectCandidates(mockFiles, "Developer", "Python, JavaScript")
      ).rejects.toMatchObject({
        success: false,
        message:
          "User exceeded selected_candidate limit. Current: 9, Trying: 2, Allowed: 1",
        status: 429,
      });
    });

    test("should handle all REJECT results", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
      ];

      const mockResponse = {
        data: {
          job_title: "Senior Architect",
          keywords: ["AWS", "Kubernetes", "Microservices"],
          total_candidates: 2,
          fit_count: 0,
          reject_count: 2,
          results: [
            {
              candidate: "resume1.pdf",
              status: "REJECT",
              message: "Missing all required keywords",
            },
            {
              candidate: "resume2.pdf",
              status: "REJECT",
              message: "Insufficient experience level",
            },
          ],
        },
      };

      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const result = await aiService.selectCandidates(
        mockFiles,
        "Senior Architect",
        "AWS, Kubernetes, Microservices"
      );

      expect(result.fit_count).toBe(0);
      expect(result.reject_count).toBe(2);
      expect(result.results.every((r) => r.status === "REJECT")).toBe(true);
    });

    test("should handle all FIT results", async () => {
      const mockFiles = [
        new File(["content1"], "resume1.pdf", { type: "application/pdf" }),
        new File(["content2"], "resume2.pdf", { type: "application/pdf" }),
      ];

      const mockResponse = {
        data: {
          job_title: "Junior Developer",
          keywords: ["JavaScript", "HTML", "CSS"],
          total_candidates: 2,
          fit_count: 2,
          reject_count: 0,
          results: [
            {
              candidate: "resume1.pdf",
              status: "FIT",
              message: "All required skills present",
            },
            {
              candidate: "resume2.pdf",
              status: "FIT",
              message: "Strong foundation in required technologies",
            },
          ],
        },
      };

      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const result = await aiService.selectCandidates(
        mockFiles,
        "Junior Developer",
        "JavaScript, HTML, CSS"
      );

      expect(result.fit_count).toBe(2);
      expect(result.reject_count).toBe(0);
      expect(result.results.every((r) => r.status === "FIT")).toBe(true);
    });

    test("should handle network errors", async () => {
      const mockFiles = [
        new File(["content"], "resume.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        code: "NETWORK_ERROR",
        message: "Network Error",
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.selectCandidates(mockFiles, "Developer", "Python, JavaScript")
      ).rejects.toMatchObject({
        success: false,
        message:
          "Unable to connect to the server. Please check your internet connection.",
      });
    });

    test("should handle server errors during selection", async () => {
      const mockFiles = [
        new File(["content"], "resume.pdf", { type: "application/pdf" }),
      ];

      const mockError = {
        response: {
          status: 500,
          data: {
            message: "Failed to evaluate candidates",
          },
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(
        aiService.selectCandidates(mockFiles, "Developer", "Python, JavaScript")
      ).rejects.toMatchObject({
        success: false,
        message: "Failed to evaluate candidates",
        status: 500,
      });
    });
  });
});
