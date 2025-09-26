import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img
                src="/logo/logo.png"
                alt="HireDesk Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-white">
              Hire<span className="text-blue-400">Desk</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8"></div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 bg-gray-800/50 px-3 py-2 rounded-lg cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{user?.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm text-gray-300">{user?.email}</p>
                      <p className="text-xs text-gray-500">
                        Files uploaded: {user?.filesUploaded || 0}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-400 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-400 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/90 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              <div className="border-t border-gray-600 pt-4">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user?.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block mx-3 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
