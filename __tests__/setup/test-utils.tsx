import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

// Custom render function that includes all providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library
export * from "@testing-library/react";

// Override render method
export { customRender as render };

// Custom utilities
export const createMockAuthUser = () => ({
  id: "1",
  email: "test@example.com",
  name: "Test User",
});

export const createMockResumeData = () => ({
  personalInfo: {
    name: "Muhammad Rafiq",
    email: "rafkhan9323@email.com",
    phone: "+923129185825",
    location: "KPK Peshawar Pakistan",
  },
  workExperience: [
    {
      title: "full stack developer",
      company: "Clouditecture",
      duration: "2024 - Present",
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
      institution: "Iqra University",
      year: "2022",
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
    "3+ years of experience in software development",
    "Led teams of 1+ developers",
    "Strong background in cloud technologies",
  ],
});

export const createMockRoleRecommendations = () => [
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
  {
    roleName: "Technical Lead",
    matchPercentage: 88,
    reasoning:
      "Your leadership experience and technical expertise align well with technical leadership positions.",
    requiredSkills: ["Leadership", "Architecture", "Mentoring"],
    missingSkills: ["Advanced Project Management"],
    careerLevel: "Senior",
    industryFit: "Excellent",
  },
];
