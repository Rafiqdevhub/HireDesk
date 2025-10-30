import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-slate-950 via-slate-900 to-black border-t border-slate-800/50 text-gray-300 mt-20 relative z-10">
      <div className="h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 mb-6 group hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300 transform group-hover:scale-110">
                <img
                  src="/logo/logo.png"
                  alt="HireDesk Logo"
                  className="w-6 h-6 object-contain filter brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">
                  Hire<span className="text-blue-400">Desk</span>
                </span>
                <span className="text-xs text-blue-300">AI Hiring</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Part of JobPsych Career Intelligence Suite. AI-powered hiring
              assistant that transforms recruitment with intelligent resume
              analysis and candidate insights.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50 font-semibold transform hover:scale-110 cursor-pointer"
                title="Twitter"
              >
                X
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50 font-semibold transform hover:scale-110 cursor-pointer"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50 font-semibold transform hover:scale-110 cursor-pointer"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://jobpsych.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                  <span>JobPsych</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@hiredesk.com"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                  <span>Support</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#help"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                  <span>Documentation</span>
                </a>
              </li>
              <li>
                <a
                  href="#status"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                  <span>Status</span>
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                  <span>Security</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            &copy; {currentYear} HireDesk. All rights reserved. Built for the
            future of hiring.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

