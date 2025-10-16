import { Link } from "react-router";
import type { Route } from "./+types/home";
import Navbar from "@components/layout/Navbar";
import Footer from "@components/layout/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "HireDesk - AI-Powered Hiring: Individual Analysis, Batch Processing & Comparisons",
    },
    {
      name: "description",
      content:
        "Transform your hiring with AI-powered resume analysis. Deep individual reviews, batch processing (2-10 resumes), side-by-side comparisons, and smart interview questions. Join 500+ companies saving 70% time.",
    },
  ];
}

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full border border-blue-500/30 mb-8">
              <span className="text-blue-400 text-sm font-medium">
                AI-Powered Hiring Platform
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Hire Smarter,
              <span className="text-blue-400 block">Not Harder</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Transform your entire hiring workflow with AI that handles
              everything from deep individual analysis and batch processing
              dozens of resumes to side-by-side candidate comparisons.
              <span className="text-blue-400 font-semibold">
                {" "}
                Process 10 resumes in minutes, not days.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-10 py-5 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105"
              >
                Open HireDesk
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The Hiring Problem
                <span className="text-red-400 block">
                  Every Recruiter Faces
                </span>
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✗</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Hours Spent on Resume Screening
                    </h3>
                    <p className="text-gray-300">
                      Manually reading through 100+ resumes takes days of
                      valuable time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✗</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Generic Interview Questions
                    </h3>
                    <p className="text-gray-300">
                      Same tired questions that don't reveal real candidate
                      potential.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✗</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Missed Top Talent
                    </h3>
                    <p className="text-gray-300">
                      Great candidates slip through because you can't review
                      everyone thoroughly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Average Recruiter Time Waste
                  </h3>
                  <div className="text-6xl font-bold text-red-400 mb-2">
                    40hrs
                  </div>
                  <p className="text-gray-300">
                    per hiring cycle on manual tasks
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                    <span className="text-gray-300">Resume Screening</span>
                    <span className="text-red-400 font-semibold">25 hours</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                    <span className="text-gray-300">Question Preparation</span>
                    <span className="text-red-400 font-semibold">10 hours</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                    <span className="text-gray-300">Admin Tasks</span>
                    <span className="text-red-400 font-semibold">5 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Three Ways to Analyze, One Powerful Platform
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect analysis method for your hiring needs - from
              individual deep dives to batch processing entire applicant pools
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-blue-400/40 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Deep Analysis
                </h3>
                <p className="text-blue-400 font-semibold text-sm mb-4">
                  Individual Resume Review
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Comprehensive skill extraction
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Personality & leadership insights
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Tailored interview questions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Career path recommendations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Fit scoring & detailed reasoning
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-green-400/40 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">�</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Batch Processing
                </h3>
                <p className="text-green-400 font-semibold text-sm mb-4">
                  2-10 Resumes Simultaneously
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Process multiple resumes at once
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Automated candidate ranking
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Bulk efficiency for large pools
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Quick identification of top talent
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Persistent batch results
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-purple-400/40 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Side-by-Side Comparison
                </h3>
                <p className="text-purple-400 font-semibold text-sm mb-4">
                  2-5 Candidates Direct Comparison
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Visual candidate comparison
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Intelligent ranking algorithms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Strengths & weaknesses analysis
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Objective decision making
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">
                    Comparison result persistence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features for Modern Recruiters
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to hire better, faster
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                AI-Powered Deep Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Comprehensive resume parsing with personality insights,
                leadership style assessment, and career trajectory analysis. Get
                detailed fit scores and reasoning for each candidate.
              </p>
              <div className="text-sm text-blue-400 font-semibold">
                Used in: Individual Resume Review
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Batch Processing Power
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Screen 10 candidates simultaneously instead of one-by-one.
                Upload multiple resumes and get comprehensive analysis for your
                entire applicant pool in minutes with automated ranking.
              </p>
              <div className="text-sm text-green-400 font-semibold">
                Used in: Batch Analysis (2-10 resumes)
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Side-by-Side Comparison
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Compare candidates visually with intelligent ranking algorithms.
                See strengths, weaknesses, and fit scores at a glance to make
                confident hiring decisions between similar candidates.
              </p>
              <div className="text-sm text-purple-400 font-semibold">
                Used in: Resume Comparison (2-5 candidates)
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-pink-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Smart Interview Questions
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Generate behavioral, technical, and situational questions
                tailored to each candidate's background and your specific role
                requirements. No more generic interviews.
              </p>
              <div className="text-sm text-pink-400 font-semibold">
                Used in: Individual & Batch Analysis
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                80% Time Savings
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Reclaim your time for strategic work. Let AI handle the
                repetitive screening while you focus on building relationships
                with your best candidates.
              </p>
              <div className="text-sm text-orange-400 font-semibold">
                Used in: All Analysis Types
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Persistent Results
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Your analysis results are automatically saved. Return anytime to
                review previous candidate evaluations without losing your work.
                Never lose track of your hiring decisions.
              </p>
              <div className="text-sm text-cyan-400 font-semibold">
                Used in: All Analysis Types
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join 500+ companies revolutionizing their hiring process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">SJ</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-400 text-sm">
                    VP of Talent, TechFlow Inc.
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "The deep analysis feature is incredible. For each candidate, I
                get detailed personality insights, leadership style assessments,
                and tailored interview questions that actually reveal their true
                potential. It's like having a psychologist and technical expert
                in one tool."
              </p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
              <div className="text-xs text-blue-400 mt-2 font-semibold">
                Uses: Individual Deep Analysis
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">MR</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Marcus Rodriguez</h4>
                  <p className="text-gray-400 text-sm">
                    Head of Recruiting, InnovateLabs
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Batch processing changed everything. We process 50+ resumes in
                an afternoon instead of a week. The AI automatically ranks
                candidates and identifies top talent, and the persistent results
                mean we never lose our evaluation work. Our time-to-fill dropped
                by 60%."
              </p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
              <div className="text-xs text-green-400 mt-2 font-semibold">
                Uses: Batch Analysis (2-10 resumes)
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">LC</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Lisa Chen</h4>
                  <p className="text-gray-400 text-sm">
                    Talent Acquisition Lead, GrowthCo
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "The side-by-side comparison feature is a game-changer for final
                decisions. When we have multiple strong candidates, we can
                visually compare their strengths, weaknesses, and fit scores.
                The intelligent ranking helps us make objective choices we can
                defend to stakeholders."
              </p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
              <div className="text-xs text-purple-400 mt-2 font-semibold">
                Uses: Resume Comparison (2-5 candidates)
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-gray-600/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  500+
                </div>
                <div className="text-gray-300">Companies</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                  10K+
                </div>
                <div className="text-gray-300">Candidates Hired</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                  95%
                </div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                  70%
                </div>
                <div className="text-gray-300">Time Saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform
            <span className="text-blue-400 block">Your Hiring Process?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of recruiters who've discovered the future of hiring.
            Process resumes individually or in bulk, compare candidates
            side-by-side, and make confident decisions with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/about"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-semibold text-lg border border-gray-600 px-10 py-5 rounded-xl hover:border-blue-400"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
