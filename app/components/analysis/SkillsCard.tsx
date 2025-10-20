import React, { useState } from "react";

interface SkillsProps {
  skills: string[];
}

export const SkillsCard: React.FC<SkillsProps> = ({ skills }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Categorize skills
  const skillCategories = {
    "Core Languages": ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
    "Frontend Frameworks": ["React.js", "Next.js", "React Native", "Expo"],
    "Backend Frameworks": [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Django",
      "Flask",
    ],
    Databases: ["MongoDB", "PostgreSQL", "MySQL"],
    "AI/ML": [
      "Machine Learning (basic)",
      "OpenAI",
      "Gemini API",
      "Hugging Face",
      "VAPI",
      "Retrieval-Augmented Generation (RAG)",
      "LLM integration",
    ],
    "Cloud & DevOps": [
      "Docker",
      "Kubernetes",
      "Supabase",
      "Firebase",
      "NeonDB",
      "Vercel",
      "Netlify",
      "CI/CD",
    ],
    APIs: ["RESTful APIs", "Third-party APIs"],
    Tools: ["Git", "GitHub", "Postman", "Test Automation"],
    Soft: [
      "Problem Solving",
      "Excellent interpersonal and communication skills",
      "Passionate",
    ],
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, { from: string; to: string; icon: string }> = {
      "Core Languages": {
        from: "from-yellow-500",
        to: "to-orange-500",
        icon: "🔤",
      },
      "Frontend Frameworks": {
        from: "from-blue-500",
        to: "to-cyan-500",
        icon: "🎨",
      },
      "Backend Frameworks": {
        from: "from-green-500",
        to: "to-emerald-500",
        icon: "⚙️",
      },
      Databases: {
        from: "from-red-500",
        to: "to-pink-500",
        icon: "🗄️",
      },
      "AI/ML": {
        from: "from-purple-500",
        to: "to-indigo-500",
        icon: "🤖",
      },
      "Cloud & DevOps": {
        from: "from-violet-500",
        to: "to-purple-500",
        icon: "☁️",
      },
      APIs: {
        from: "from-pink-500",
        to: "to-rose-500",
        icon: "🔗",
      },
      Tools: {
        from: "from-gray-500",
        to: "to-slate-500",
        icon: "🛠️",
      },
      Soft: {
        from: "from-amber-500",
        to: "to-yellow-500",
        icon: "⭐",
      },
    };
    return (
      colors[category] || {
        from: "from-slate-500",
        to: "to-slate-600",
        icon: "•",
      }
    );
  };

  const skillsByCategory = Object.entries(skillCategories).map(
    ([category, categorySkills]) => {
      const found = categorySkills.filter((skill) =>
        skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
      );
      return {
        category,
        skills: found.length > 0 ? found : categorySkills,
        count: found.length,
      };
    }
  );

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg blur opacity-75"></div>
            <div className="relative bg-slate-900 p-2.5 rounded-lg">
              <svg
                className="w-6 h-6 text-violet-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
              Technical Skills
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {skills.length} Skills Proficiency
            </p>
          </div>
        </div>
      </div>

      {/* Skills by category */}
      <div className="space-y-6 sm:space-y-8">
        {skillsByCategory.map((categoryData, categoryIndex) => {
          const colors = getCategoryColor(categoryData.category);
          return (
            <div key={categoryIndex} className="group">
              {/* Category header */}
              <div
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r ${colors.from} ${colors.to} bg-opacity-10 border border-current border-opacity-20 mb-4 group-hover:border-opacity-50 transition-all duration-300`}
              >
                <span className="text-lg">{colors.icon}</span>
                <h4 className="font-semibold text-slate-300">
                  {categoryData.category}
                </h4>
                <span className="ml-2 px-2 py-1 text-xs font-bold bg-slate-900/50 rounded-md text-slate-300">
                  {categoryData.count}
                </span>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {categoryData.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    onMouseEnter={() =>
                      setHoveredIndex(categoryIndex * 100 + skillIndex)
                    }
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative group/skill overflow-hidden rounded-lg p-3 sm:p-4 bg-slate-900/30 border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 cursor-default"
                  >
                    {/* Animated background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${colors.from} ${colors.to} opacity-0 group-hover/skill:opacity-5 transition-opacity duration-300`}
                    ></div>

                    {/* Glow effect */}
                    {hoveredIndex === categoryIndex * 100 + skillIndex && (
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${colors.from} ${colors.to} rounded-lg blur opacity-20`}
                      ></div>
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-slate-200 group-hover/skill:text-slate-100 transition-colors line-clamp-2">
                        {skill}
                      </p>
                      <div
                        className={`h-0.5 w-0 bg-gradient-to-r ${colors.from} ${colors.to} mt-2 group-hover/skill:w-full transition-all duration-300`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Total count */}
      <div className="mt-8 pt-8 border-t border-slate-700/50">
        <div className="flex items-center justify-between">
          <p className="text-slate-400">Total Technical Skills</p>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg blur opacity-50"></div>
            <div className="relative bg-slate-900 px-6 py-3 rounded-lg border border-violet-500/50">
              <span className="font-bold text-2xl bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                {skills.length}+
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
