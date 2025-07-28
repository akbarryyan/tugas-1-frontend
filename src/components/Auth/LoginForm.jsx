import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const { login } = useAuth();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = login(formData.username, formData.password);
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(`${type} copied!`);
      setTimeout(() => setCopyFeedback(""), 2000);
    } catch (err) {
      setCopyFeedback("Failed to copy");
      setTimeout(() => setCopyFeedback(""), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          {/* Enhanced Company Logo */}
          <div className="mx-auto h-20 w-20 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Employee Management
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="card p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="animate-scale-in bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm shadow-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-3 py-3 pl-12 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-3 py-3 pl-12 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l4.242 4.242M14.12 14.12L15.536 15.536M14.12 14.12L9.878 9.878"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
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
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg py-4"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign in
                </div>
              )}
            </button>

            <div className="mt-8 p-4 sm:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-blue-900/30 rounded-2xl border-2 border-indigo-200/50 dark:border-indigo-700/50 shadow-xl backdrop-blur-sm">
              {/* Copy Feedback */}
              {copyFeedback && (
                <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      {copyFeedback}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center mb-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Demo Credentials
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                    Use these credentials to test the application
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-indigo-50/80 dark:from-gray-800/80 dark:to-indigo-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-indigo-200/50 dark:border-indigo-700/50 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        Username:
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-2">
                      <code className="font-mono bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-shadow duration-200 flex-1 sm:flex-none text-center">
                        admin
                      </code>
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex-shrink-0"
                        onClick={() => handleCopy("admin", "Username")}
                        title="Copy username"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-purple-50/80 dark:from-gray-800/80 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-purple-200/50 dark:border-purple-700/50 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
                      <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        Password:
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-2">
                      <code className="font-mono bg-gradient-to-r from-purple-500 to-pink-600 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-shadow duration-200 flex-1 sm:flex-none text-center">
                        pastibisa
                      </code>
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex-shrink-0"
                        onClick={() => handleCopy("pastibisa", "Password")}
                        title="Copy password"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-200/50 dark:border-indigo-700/50">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Ready for testing</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span className="text-center">Click to copy credentials</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with ❤️ for Employee Management
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
