import { Link } from "react-router";
import Navbar from "@layout/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8 relative">
              <div className="absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.674-2.64m10.1 3.64c1.381-1.896 2.227-4.249 2.227-6.835 0-6.627-5.373-12-12-12s-12 5.373-12 12c0 2.586.846 4.939 2.227 6.835a4.959 4.959 0 001.908-5.835A7.962 7.962 0 0112 15"
                  />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4 leading-tight">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Oops! Page Not Found
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have taken a different career
              path. Let's get you back on track to find your perfect match!
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              What were you looking for?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                to="/"
                className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Home Page</div>
                  <div className="text-sm text-gray-300">
                    Start your journey
                  </div>
                </div>
              </Link>

              <Link
                to="/about"
                className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">About Us</div>
                  <div className="text-sm text-gray-300">Learn our story</div>
                </div>
              </Link>

              <Link
                to="/signup"
                className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-600/20 to-green-800/20 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Sign Up</div>
                  <div className="text-sm text-gray-300">Join HireDesk</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <div className="inline-flex items-center space-x-4 text-gray-400">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="text-sm">
                Don't worry, even the best recruiters get lost sometimes!
              </span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Take Me Home
            </Link>
          </div>
          <div className="mt-16 p-6 bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-2xl border border-gray-600/30">
            <h3 className="text-xl font-bold text-white mb-2">
              Still can't find what you're looking for?
            </h3>
            <p className="text-gray-300 mb-4">
              Our support team is here to help you navigate your recruitment
              journey.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              Contact Support
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
