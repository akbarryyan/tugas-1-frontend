import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  employeesService,
  divisionsService,
} from "../../services/employeeService";
import { useLocalStorageListener } from "../../hooks/useLocalStorageListener";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [divisionCount, setDivisionCount] = useState(0);

  // Listen to localStorage changes
  const employeesData = useLocalStorageListener("employees_data");
  const divisionsData = useLocalStorageListener("divisions_data");

  // Update counts when data changes
  useEffect(() => {
    const updateCounts = () => {
      try {
        // Fetch employees
        const employeesResponse = employeesService.getAll();
        setEmployeeCount(employeesResponse.data?.length || 0);

        // Fetch divisions
        const divisionsResponse = divisionsService.getAll();
        setDivisionCount(divisionsResponse.length || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
        // Set default values if API fails
        setEmployeeCount(0);
        setDivisionCount(0);
      }
    };

    updateCounts();
  }, [employeesData, divisionsData]); // Re-run when localStorage data changes

  // Add touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Close sidebar on left swipe when open
    if (isLeftSwipe && isOpen) {
      onClose();
    }
  };

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Add custom styles for animations
  const customStyles = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    @keyframes slideInFromLeft {
      from { 
        opacity: 0; 
        transform: translateX(-20px); 
      }
      to { 
        opacity: 1; 
        transform: translateX(0); 
      }
    }

    .sidebar-glassmorphism {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
  `;

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z"
          />
        </svg>
      ),
      description: "Overview & Statistics",
    },
    {
      name: "Employees",
      href: "/employees",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
      description: "Manage Staff",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
      description: "Account Settings",
    },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <style>{customStyles}</style>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
          onClick={onClose}
          style={{
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-white/95 dark:bg-gray-900/95 sidebar-glassmorphism
        transform transition-all duration-500 ease-out z-50
        border-r border-gray-200/50 dark:border-gray-700/50
        lg:translate-x-0 lg:static lg:inset-0 lg:bg-white lg:dark:bg-gray-900
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full shadow-none"}
        lg:shadow-none lg:backdrop-blur-none
      `}
        style={{
          transitionProperty: "transform, box-shadow, backdrop-filter",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50"
            style={{
              animation: isOpen
                ? "slideInFromLeft 0.6s ease-out 0.2s both"
                : "none",
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                <svg
                  className="h-6 w-6 text-white"
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
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent">
                  EmpManage
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Management System
                </p>
              </div>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 active:scale-95"
            >
              <svg
                className="w-6 h-6 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* User Profile Section */}
          <div
            className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50"
            style={{
              animation: isOpen
                ? "slideInFromLeft 0.6s ease-out 0.3s both"
                : "none",
            }}
          >
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200/50 dark:border-indigo-800/50 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md transform transition-transform duration-300 hover:scale-110">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user?.name || "Administrator"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || "admin@company.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav
            className="flex-1 px-4 py-6 space-y-2 overflow-y-auto"
            style={{
              animation: isOpen
                ? "slideInFromLeft 0.6s ease-out 0.4s both"
                : "none",
            }}
          >
            {navigation.map((item, index) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02]
                    ${
                      active
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-[1.02]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 hover:text-indigo-700 dark:hover:text-indigo-300 hover:shadow-md"
                    }
                  `}
                  style={{
                    animation: isOpen
                      ? `slideInFromLeft 0.6s ease-out ${
                          0.5 + index * 0.1
                        }s both`
                      : "none",
                  }}
                >
                  <div
                    className={`
                    mr-3 p-1.5 rounded-lg transition-all duration-300
                    ${
                      active
                        ? "bg-white/20 shadow-sm"
                        : "group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/50 group-hover:shadow-sm"
                    }
                  `}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      {active && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-sm"></div>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-0.5 transition-colors duration-300 ${
                        active
                          ? "text-white/80"
                          : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div
            className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-3"
            style={{
              animation: isOpen
                ? "slideInFromLeft 0.6s ease-out 0.8s both"
                : "none",
            }}
          >
            {/* System Status */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-50/80 to-green-50/80 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-800/50">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  System Active
                </span>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-500 font-mono">
                v2.1.0
              </span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center space-x-1.5">
                  <svg
                    className="w-3 h-3 text-blue-600 dark:text-blue-400"
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
                  <div>
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-300">
                      Employees
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                      {employeeCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-800/50">
                <div className="flex items-center space-x-1.5">
                  <svg
                    className="w-3 h-3 text-purple-600 dark:text-purple-400"
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
                  <div>
                    <p className="text-xs font-bold text-purple-700 dark:text-purple-300">
                      Divisions
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-mono">
                      {divisionCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                © 2025 EmpManage
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
