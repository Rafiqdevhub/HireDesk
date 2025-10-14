import { Link } from "react-router";
import type { Route } from "./+types/home";
import Navbar from "../components/layout/Navbar";
import Footer from "~/components/layout/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk - AI-Powered Hiring That Saves You 70% Time" },
    {
      name: "description",
      content:
        "Transform your hiring process with AI. Upload resumes, get instant analysis, and receive tailored interview questions. Join 500+ companies saving hours daily.",
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
              Hire 3x Faster
              <span className="text-blue-400 block">With AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Stop drowning in resumes. Upload candidate CVs, get instant AI
              analysis, and receive smart interview questions tailored to their
              background.
              <span className="text-blue-400 font-semibold">
                {" "}
                Save 70% of your hiring time.
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
              How HireDesk Saves You Time
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple 4-step process that transforms your hiring workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Upload Resumes
              </h3>
              <p className="text-gray-300">
                Drag & drop candidate resumes. Support for PDF, DOC, and DOCX
                formats.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Analysis</h3>
              <p className="text-gray-300">
                Instant extraction of skills, experience, and qualifications in
                seconds.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">💭</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Smart Questions
              </h3>
              <p className="text-gray-300">
                Get tailored interview questions based on candidate background
                and role.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Hire Confidently
              </h3>
              <p className="text-gray-300">
                Make data-driven decisions with comprehensive candidate
                insights.
              </p>
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Lightning Fast Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Process resumes in seconds, not hours. Our AI understands
                context, skills, and experience levels instantly.
              </p>
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Smart Question Generation
              </h3>
              <p className="text-gray-300 leading-relaxed">
                No more generic interviews. Get behavioral, technical, and
                situational questions tailored to each candidate.
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                70% Time Savings
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Reclaim your time for strategic work. Let AI handle the
                repetitive screening while you focus on building relationships.
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Team Collaboration
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Share insights with hiring managers. Multiple team members can
                review and collaborate on candidate evaluations.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-red-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Enterprise Security
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Bank-level encryption and compliance. Your candidate data is
                completely secure and GDPR compliant.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30 hover:border-indigo-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
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
                Detailed Analytics
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Track hiring metrics, candidate quality scores, and team
                performance. Make data-driven improvements to your process.
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
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">TC</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">TechCorp Inc.</h4>
                  <p className="text-gray-400 text-sm">
                    Sarah Johnson, Head of Talent
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "HireDesk cut our time-to-hire by 75%. We can now focus on
                building relationships instead of paperwork."
              </p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">FS</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    FinServe Solutions
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Mike Chen, HR Director
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "The AI-generated questions are incredible. They reveal insights
                we never would have discovered with our old process."
              </p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-600/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">IM</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">InnovateMedia</h4>
                  <p className="text-gray-400 text-sm">
                    Lisa Rodriguez, Recruitment Lead
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "We've hired 40% more top talent since switching to HireDesk.
                The quality of our hires has never been better."
              </p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
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
            Ready to Hire 3x Faster?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of recruiters who've transformed their hiring
            process. Start your free trial today and see the difference AI can
            make.
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
