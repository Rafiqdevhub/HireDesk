import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <img
                    src="/logo/logo.png"
                    alt="HireDesk Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
              <span className="text-xl font-bold">
                Hire<span className="text-blue-400">Desk</span>
              </span>
            </div>
            <p className="text-gray-400">
              The AI-powered hiring platform that processes resumes in bulk,
              compares candidates side-by-side, and delivers insights that
              transform your recruitment process.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/batch-analyze"
                  className="hover:text-white transition-colors"
                >
                  Batch Resume Analysis
                </Link>
              </li>
              <li>
                <Link
                  to="/compare-resumes"
                  className="hover:text-white transition-colors"
                >
                  Side-by-Side Comparison
                </Link>
              </li>
              <li>
                <Link
                  to="/hiredesk-analyze"
                  className="hover:text-white transition-colors"
                >
                  AI-Powered Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-white transition-colors"
                >
                  Interview Questions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/status"
                  className="hover:text-white transition-colors"
                >
                  Status
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="hover:text-white transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 HireDesk. All rights reserved. Built for the future of
            hiring.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
