import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

// Custom render function without providers - let individual tests handle their own mocking
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { ...options });

export * from "@testing-library/react";
export { customRender as render };

// Helper functions for common test scenarios
export const createMockUser = () => ({
  id: "1",
  name: "Test User",
  email: "test@example.com",
  company_name: "Test Company",
});

export const createMockFormData = () => ({
  name: "Test User",
  email: "test@example.com",
  password: "Password123",
  confirmPassword: "Password123",
  company_name: "Test Company",
  terms: true,
});

export const createMockFile = (name = "test.pdf", type = "application/pdf") => {
  const file = new File(["test content"], name, { type });
  return file;
};

export const createMockResumeData = () => ({
  personalInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    location: "Test City, TC",
  },
  workExperience: [
    {
      title: "Software Developer",
      company: "Test Company",
      duration: "2020-2023",
      description: ["Developed web applications", "Led team projects"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Test University",
      year: "2020",
      details: ["Graduated with honors"],
    },
  ],
  skills: ["JavaScript", "React", "Node.js"],
  highlights: ["3 years of experience", "Team leadership"],
});

export const createMockQuestions = () => [
  {
    type: "technical",
    question: "What is React?",
    context: "Frontend development",
  },
  {
    type: "behavioral",
    question: "Tell me about a challenging project",
    context: "Problem solving",
  },
];

export const createMockRoleRecommendations = () => [
  {
    roleName: "Frontend Developer",
    matchPercentage: 85,
    reasoning: "Strong React skills",
    requiredSkills: ["React", "JavaScript"],
    missingSkills: ["TypeScript"],
    careerLevel: "Mid-level" as const,
    industryFit: "Good" as const,
  },
];
