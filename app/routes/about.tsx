import { Link } from "react-router";
import type { Route } from "../routes/+types/about";
import Navbar from "../components/layout/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - HireDesk" },
    {
      name: "description",
      content:
        "Learn more about HireDesk and our mission to revolutionize recruitment.",
    },
  ];
}

const About = () => {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-20 w-72 h-72 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full border border-blue-500/30 mb-8">
            <span className="text-blue-400 text-sm font-medium">
              Time-Saving Recruitment
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Hire Faster,
            <span className="text-blue-400 block">Save Hours Daily</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Stop wasting hours on manual resume screening and endless
            interviews. HireDesk automates the tedious parts so you can focus on
            what matters most - finding the perfect candidate for your team.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-3 py-1 bg-purple-600/20 rounded-full border border-purple-500/30">
                <span className="text-purple-400 text-sm font-medium">
                  Built for Busy Recruiters
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Cut Your Hiring Time
                <span className="text-blue-400"> by 70%</span>
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                We know you're drowning in resumes and struggling to find
                qualified candidates. Traditional recruitment methods are slow,
                inefficient, and frustrating. That's why we built HireDesk to
                eliminate the time wasting parts of hiring.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Our AI does the heavy lifting so you can spend less time
                screening and more time building great teams. No more late
                nights reviewing applications or endless interview loops.
              </p>
            </div>

            <div className="relative">
              <div className="bg-slate-800 rounded-3xl p-8 border border-gray-600 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">HD</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        Smart Screening Engine
                      </h3>
                      <p className="text-sm text-gray-300">
                        Instant candidate evaluation
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-400"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Time Saved</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div className="w-14 h-full bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-green-400 font-semibold">70%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Faster Hires</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div className="w-12 h-full bg-purple-400 rounded-full animate-pulse delay-300"></div>
                      </div>
                      <span className="text-purple-400 font-semibold">5x</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Better Matches</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div className="w-13 h-full bg-blue-400 rounded-full animate-pulse delay-600"></div>
                      </div>
                      <span className="text-blue-400 font-semibold">95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Streamlined Hiring Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From resume upload to final hire faster than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-blue-400/40 transition-all duration-300">
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
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Quick Upload
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Upload candidate resumes in seconds. No more manual data entry
                or tedious form filling. Drag, drop, and move on to your next
                task.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-green-400/40 transition-all duration-300">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Instant Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed">
                AI instantly extracts and analyzes candidate information. Get
                comprehensive profiles without spending hours reading resumes
                yourself.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-purple-400/40 transition-all duration-300">
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Smart Interviews
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get AI-generated interview questions tailored to each candidate.
                No more generic questions - focus on what really matters for
                your role.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Your Time-Saving Workflow
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Spend less time on administrative tasks and more time on
                strategic hiring decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Upload & Auto-Process
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Drop resumes and let AI handle the initial screening
                      instantly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Review Top Candidates
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Focus only on qualified candidates with comprehensive
                      profiles ready.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Guided Interviews
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Use AI-generated questions to conduct efficient, targeted
                      interviews.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Fast Hiring Decisions
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Make confident decisions quickly with all the information
                      you need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Recruiters Choose HireDesk
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of recruiters who have transformed their hiring
              process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-600/10 backdrop-blur-sm p-8 rounded-3xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Save Hours Daily
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Eliminate manual resume screening and repetitive administrative
                tasks. Our AI handles the routine work so you can focus on
                building relationships with candidates and making strategic
                hiring decisions.
              </p>
            </div>

            <div className="bg-purple-600/10 backdrop-blur-sm p-8 rounded-3xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Better Hires Faster
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Make data-driven hiring decisions with comprehensive candidate
                insights. Reduce time-to-hire while improving quality of hire.
                Find the right person for the job without the endless
                back-and-forth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Efficiency & Results
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that drive our time saving technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
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
              <h3 className="text-xl font-bold text-white mb-3">
                Automation First
              </h3>
              <p className="text-gray-300">
                We automate every repetitive task in your hiring process. From
                resume parsing to interview scheduling, focus on what humans do
                best.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Recruiter-Focused
              </h3>
              <p className="text-gray-300">
                Built specifically for recruiters who need to move fast and hire
                effectively. Every feature is designed to save you time and
                reduce stress.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-300">
                Enterprise-grade security with 99.9% uptime. Your data is
                protected and your hiring process never stops because of
                technical issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-600/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Time Saved, Results Delivered
              </h2>
              <p className="text-xl text-gray-300">
                Real impact for recruiters using HireDesk
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  70%
                </div>
                <div className="text-gray-300 font-medium">Time Saved</div>
              </div>
              <div className="group hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                  5x
                </div>
                <div className="text-gray-300 font-medium">Faster Hires</div>
              </div>
              <div className="group hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                  95%
                </div>
                <div className="text-gray-300 font-medium">Better Matches</div>
              </div>
              <div className="group hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                  10K+
                </div>
                <div className="text-gray-300 font-medium">
                  Happy Recruiters
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
