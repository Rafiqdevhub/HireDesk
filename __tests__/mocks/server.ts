import { vi } from "vitest";
import axios from "axios";

// Mock data for testing
export const mockResumeAnalysis = {
  resumeData: {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
    },
    workExperience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Corp",
        duration: "2020 - Present",
        description: [
          "Led development of microservices architecture",
          "Mentored junior developers",
          "Improved system performance by 40%",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California",
        year: "2018",
        details: [
          "GPA: 3.8/4.0",
          "Relevant Coursework: Data Structures, Algorithms, Software Engineering",
        ],
      },
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "Kubernetes",
      "PostgreSQL",
      "MongoDB",
    ],
    highlights: [
      "5+ years of experience in software development",
      "Led teams of 5+ developers",
      "Strong background in cloud technologies",
    ],
  },
  questions: [
    {
      type: "technical",
      question: "Can you explain the difference between REST and GraphQL?",
      context: "Based on your experience with APIs",
    },
    {
      type: "behavioral",
      question:
        "Tell me about a time when you had to learn a new technology quickly.",
      context: "Given your diverse tech stack",
    },
  ],
  roleRecommendations: [
    {
      roleName: "Senior Full Stack Developer",
      matchPercentage: 95,
      reasoning:
        "Your extensive experience with both frontend and backend technologies makes you an excellent fit for this role.",
      requiredSkills: ["JavaScript", "React", "Node.js", "PostgreSQL"],
      missingSkills: [],
      careerLevel: "Senior",
      industryFit: "Excellent",
    },
  ],
};

// Mock response data for different endpoints
export const mockApiResponses = {
  resumeAnalysis: mockResumeAnalysis,
  questionGeneration: {
    questions: mockResumeAnalysis.questions,
  },
  login: {
    token: "mock-jwt-token",
    user: {
      id: "1",
      email: "test@example.com",
      name: "Test User",
    },
  },
  register: {
    token: "mock-jwt-token",
    user: {
      id: "2",
      email: "newuser@example.com",
      name: "New User",
    },
  },
  upload: {
    success: true,
    fileId: "mock-file-id",
    message: "File uploaded successfully",
  },
};

// Axios mock utilities for testing
export const mockAxiosSuccess = (data: any) => {
  vi.mocked(axios.post).mockResolvedValueOnce({ data, status: 200 });
  vi.mocked(axios.get).mockResolvedValueOnce({ data, status: 200 });
};

export const mockAxiosError = (status: number, message: string) => {
  const error = {
    response: {
      status,
      data: { error: message },
    },
  };
  vi.mocked(axios.post).mockRejectedValueOnce(error);
  vi.mocked(axios.get).mockRejectedValueOnce(error);
};

// Reset all mocks
export const resetAxiosMocks = () => {
  vi.clearAllMocks();
};
