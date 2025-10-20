import React from "react";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface PersonalInfoCardProps {
  personalInfo: PersonalInfo;
}

export const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  personalInfo,
}) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 p-6 sm:p-8">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-slate-400 text-sm">Professional Profile</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-slate-900 rounded-full p-3">
              <svg
                className="w-6 h-6 text-indigo-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Email */}
          <div className="group/item">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-slate-900/50 border border-slate-700/30 group-hover/item:border-indigo-500/50 transition-all duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded opacity-0 group-hover/item:opacity-20 transition-opacity blur"></div>
                <div className="relative bg-slate-800 p-2.5 rounded-lg">
                  <svg
                    className="w-5 h-5 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm font-medium text-slate-200 truncate hover:text-clip">
                  {personalInfo.email}
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="group/item">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-slate-900/50 border border-slate-700/30 group-hover/item:border-purple-500/50 transition-all duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded opacity-0 group-hover/item:opacity-20 transition-opacity blur"></div>
                <div className="relative bg-slate-800 p-2.5 rounded-lg">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 7.489a1 1 0 00.502.756l2.04 1.242a1 1 0 001.064-.256c.22-.265.49-.801.692-1.6.2-.799.533-2.034.533-4.359 0-.314.035-.624.105-.924m0 0a24.769 24.769 0 002.505-1.748m0 0a24.912 24.912 0 0110.317-1.1M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-sm font-medium text-slate-200 truncate">
                  {personalInfo.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="group/item">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-slate-900/50 border border-slate-700/30 group-hover/item:border-cyan-500/50 transition-all duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded opacity-0 group-hover/item:opacity-20 transition-opacity blur"></div>
                <div className="relative bg-slate-800 p-2.5 rounded-lg">
                  <svg
                    className="w-5 h-5 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Location
                </p>
                <p className="text-sm font-medium text-slate-200 truncate">
                  {personalInfo.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
