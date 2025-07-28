import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const Navbar = ({ onMenuClick }) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, changeTheme, themes, isDark } = useTheme();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  const handleThemeChange = (newTheme) => {
    console.log("Changing theme to:", newTheme);
    changeTheme(newTheme);
    setThemeDropdownOpen(false);
  };

  const getThemeIcon = (themeValue) => {
    switch (themeValue) {
      case "light":
        return (
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
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "dark":
        return (
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
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        );
      default:
        return (
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
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button onClick={onMenuClick} className="lg:hidden btn-ghost p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Page Title */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Employee Management System
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="btn-ghost p-2 relative"
              aria-label="Theme Switcher"
            >
              {getThemeIcon(theme)}
            </button>

            {themeDropdownOpen && (
              <>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption.value}
                      onClick={() => handleThemeChange(themeOption.value)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 ${
                        theme === themeOption.value
                          ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {getThemeIcon(themeOption.value)}
                      <span>{themeOption.label}</span>
                      {theme === themeOption.value && (
                        <svg
                          className="w-4 h-4 ml-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center space-x-3 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 p-2 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2) || "A"}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-gray-900 dark:text-white font-medium">
                  {user?.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {user?.email}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>

                <div className="py-1">
                  <a
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-4 h-4 mr-3"
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
                    Profile Settings
                  </a>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {(userDropdownOpen || themeDropdownOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:bg-transparent"
          onClick={() => {
            setUserDropdownOpen(false);
            setThemeDropdownOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
