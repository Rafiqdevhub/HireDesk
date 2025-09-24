import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk - Coming Soon" },
    {
      name: "description",
      content:
        "HireDesk - The future of recruitment is coming soon. Get ready to revolutionize your hiring process.",
    },
  ];
}

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Logo/Brand */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            HireDesk
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Coming Soon Text */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
            Coming Soon
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            The future of recruitment is being crafted.
            <br />
            Get ready to revolutionize your hiring process.
          </p>
        </div>

        {/* Features preview */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
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
            <h3 className="text-lg font-semibold text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-400 text-sm">
              Streamlined hiring process that saves time and resources
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
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
            <h3 className="text-lg font-semibold text-white mb-2">
              Smart Matching
            </h3>
            <p className="text-gray-400 text-sm">
              AI-powered candidate matching for perfect fits
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
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
            <h3 className="text-lg font-semibold text-white mb-2">
              Team Collaboration
            </h3>
            <p className="text-gray-400 text-sm">
              Seamless collaboration tools for hiring teams
            </p>
          </div>
        </div>

        {/* Notify me section */}
        <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Get Notified When We Launch
          </h3>
          <p className="text-gray-300 mb-6">
            Be the first to experience the future of hiring
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Notify Me
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2025 HireDesk. Revolutionizing recruitment, one hire at a time.
          </p>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute animate-pulse top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute animate-pulse animate-delay-1 top-3/4 left-3/4 w-1 h-1 bg-purple-400 rounded-full opacity-40"></div>
        <div className="absolute animate-pulse animate-delay-2 top-1/2 right-1/4 w-2 h-2 bg-indigo-400 rounded-full opacity-50"></div>
        <div className="absolute animate-pulse animate-delay-3 bottom-1/4 left-1/2 w-1 h-1 bg-blue-300 rounded-full opacity-70"></div>
      </div>
    </div>
  );
};

export default Home;
