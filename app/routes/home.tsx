import { Link } from "react-router";
import type { Route } from "./+types/home";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "HireDesk - AI-Powered Hiring Platform: Smart Review, Screening, Comparison & Selection",
    },
    {
      name: "description",
      content:
        "Transform your entire hiring workflow with HireDesk's four AI-powered tools. Deep individual analysis, batch screening (2-10 resumes), side-by-side candidate comparison, and instant binary screening. Join 500+ companies saving 70% hiring time.",
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
              Your AI Hiring
              <span className="text-blue-400 block">Co-Pilot</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Meet HireDesk where AI meets intelligent recruiting. Analyze
              candidates deeply, screen them instantly, compare intelligently,
              and make confident hiring decisions. From sourcing to selection,
              we've got your back.
              <span className="text-blue-400 font-semibold">
                {" "}
                Transform weeks of hiring into days.
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
              Four Tools Built for Every Hiring Stage
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From rapid screening to confident final decisions—pick the right
              tool for each moment in your hiring workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">
                Smart Review
              </h3>
              <p className="text-blue-300 text-sm mb-3">
                Deep individual analysis
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Unlock personality insights, leadership potential, and tailored
                interview questions for each candidate.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">
                Smart Screening
              </h3>
              <p className="text-purple-300 text-sm mb-3">
                Batch analysis (2-10)
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Process multiple resumes instantly with automated ranking and
                intelligent scoring.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">
                Find Best Fit
              </h3>
              <p className="text-amber-300 text-sm mb-3">
                Compare top candidates (2-5)
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Visual side-by-side comparison with objective ranking to make
                confident final decisions.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">
                Quick Screen
              </h3>
              <p className="text-emerald-300 text-sm mb-3">
                Binary decisions (1-5)
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Instant FIT/REJECT screening with keyword matching and job
                alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How Top Companies Use HireDesk
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A complete hiring workflow for every stage of your recruitment
              process
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-gradient-to-r from-blue-600/10 to-blue-600/0 backdrop-blur-sm p-8 rounded-3xl border border-blue-500/20">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">1️⃣</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Initial Screening: Quick Screen Tool
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Receive 100+ applications? Use Quick Screen to instantly
                    evaluate candidates against your job requirements. In
                    minutes, identify who's FIT and who's not. 10 resumes per
                    day quota keeps you focused on quality.
                  </p>
                  <p className="text-sm text-blue-300">
                    <span className="font-semibold">Time Saved:</span> Replace 8
                    hours of manual screening with 30 minutes of AI evaluation
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/10 to-purple-600/0 backdrop-blur-sm p-8 rounded-3xl border border-purple-500/20">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">2️⃣</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Batch Evaluation: Smart Screening Tool
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Got 5-10 promising candidates after screening? Upload them
                    all at once. Smart Screening evaluates, ranks, and scores
                    them, saving you from comparing resumes manually. Get
                    automated insights on each candidate's strengths.
                  </p>
                  <p className="text-sm text-purple-300">
                    <span className="font-semibold">Time Saved:</span> Process a
                    whole batch in under 2 minutes instead of 2 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-600/10 to-amber-600/0 backdrop-blur-sm p-8 rounded-3xl border border-amber-500/20">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">3️⃣</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Deep Dive: Smart Review Tool
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Before the interview, really understand your top 2-3
                    candidates. Smart Review reveals personality traits,
                    leadership style, technical depth, and generates
                    role-specific interview questions. Go beyond resume keywords
                    to understand who they really are.
                  </p>
                  <p className="text-sm text-amber-300">
                    <span className="font-semibold">Advantage:</span> Ask
                    questions that reveal true potential, not just scripted
                    answers
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600/10 to-emerald-600/0 backdrop-blur-sm p-8 rounded-3xl border border-emerald-500/20">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">4️⃣</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Final Decision: Find Best Fit Tool
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Down to your final 2-5 candidates? Compare them side-by-side
                    with Find Best Fit. See scoring differences, strengths vs
                    weaknesses, fit alignment—all on one screen. Make confident,
                    defensible hiring decisions backed by data.
                  </p>
                  <p className="text-sm text-emerald-300">
                    <span className="font-semibold">Confidence:</span> Eliminate
                    gut-feeling decisions with objective scoring
                  </p>
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
              Why HireDesk Wins
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete AI-powered hiring toolkit built for modern recruiters
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
                AI-Powered Insights
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced ML algorithms analyze resumes beyond
                keywords—uncovering personality traits, leadership potential,
                skill depth, and cultural fit that traditional screening misses.
              </p>
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Analyze one resume in seconds or process 10 candidates
                simultaneously. Get results instantly instead of spending days
                on manual evaluation.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-emerald-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Data-Driven Decisions
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Make hiring calls backed by objective AI scoring and
                comprehensive analysis. Reduce bias, defend your decisions, and
                improve hiring outcomes consistently.
              </p>
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
                Smart Questions
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get AI-generated interview questions tailored to each
                candidate's background, experience level, and your specific role
                requirements. No more generic interviews.
              </p>
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
                70% Time Savings
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Reclaim your time for strategic work. Let AI handle the
                repetitive screening while you build relationships with top
                candidates.
              </p>
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
              <p className="text-gray-300 leading-relaxed">
                Your analysis results are automatically saved. Return anytime to
                review previous evaluations. Never lose track of candidate
                assessments.
              </p>
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
                "Smart Review is incredible. I get detailed personality
                insights, leadership assessments, and tailored interview
                questions for each candidate. It's like having a psychologist
                and technical expert in one tool."
              </p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
              <div className="text-xs text-blue-400 mt-2 font-semibold">
                Uses: Smart Review
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
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
                "Quick Screen and Smart Screening changed everything. We process
                50+ resumes in an afternoon instead of a week. Results are saved
                automatically so we never lose our evaluations. Time-to-fill
                dropped 60%."
              </p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
              <div className="text-xs text-purple-400 mt-2 font-semibold">
                Uses: Quick Screen & Smart Screening
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center mr-4">
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
                "Find Best Fit is a game-changer for final decisions. When we
                have multiple strong candidates, we compare them visually with
                intelligent scoring. Makes objective decisions we can
                confidently defend to stakeholders."
              </p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
              <div className="text-xs text-emerald-400 mt-2 font-semibold">
                Uses: Find Best Fit
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
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                  50K+
                </div>
                <div className="text-gray-300">Candidates Screened</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
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
            Use four powerful tools for every hiring stage—from rapid screening
            to confident final decisions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
