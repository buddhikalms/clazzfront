import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaMoon,
  FaSun,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaChartLine,
  FaChartBar,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
};

const initialNotifications = [
  {
    id: "1",
    message: 'New course "Intro to Python" added',
    time: "1 hour ago",
    icon: FaChartBar,
  },
  {
    id: "2",
    message: "Appointment booked with Teacher Jane",
    time: "3 hours ago",
    icon: FaCalendarAlt,
  },
  {
    id: "3",
    message: "Student John enrolled in Calculus",
    time: "Yesterday",
    icon: FaUsers,
  },
];

const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "STUDENT",
};

export default function Header({ isDarkMode, toggleTheme }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications([]);
    }
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <header
      className={`sticky top-0 z-30 ${
        isDarkMode
          ? "bg-gray-800/90 backdrop-blur-sm"
          : "bg-white/90 backdrop-blur-sm"
      } shadow-md p-6 flex justify-between items-center`}
    >
      <h2
        className={`text-2xl font-bold tracking-tight ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        LMS Dashboard
      </h2>
      <div className="flex items-center space-x-4">
        <motion.div className="relative" whileHover={{ scale: 1.05 }}>
          <input
            type="text"
            placeholder="Search courses or teachers..."
            className={`pl-10 pr-4 py-2.5 rounded-full border ${
              isDarkMode
                ? "border-gray-600 bg-gray-700/80 text-gray-100"
                : "border-gray-200 bg-white/80 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 w-64 shadow-sm`}
          />
          <FaChartLine
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
            size={18}
          />
        </motion.div>
        <div className="relative">
          <motion.button
            className="relative p-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md hover:from-teal-700 hover:to-teal-800 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNotificationClick}
          >
            <FaBell size={18} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                {notifications.length}
              </span>
            )}
          </motion.button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`absolute right-0 mt-2 w-80 ${
                  isDarkMode
                    ? "bg-gray-800/90 border-gray-700"
                    : "bg-white/90 border-gray-200"
                } rounded-lg shadow-xl border border-opacity-50 backdrop-blur-md z-50`}
              >
                <div className="p-4">
                  <h4
                    className={`text-lg font-semibold ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Notifications
                  </h4>
                  {notifications.length === 0 ? (
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      } mt-2`}
                    >
                      No new notifications
                    </p>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {notifications.map((notification) => (
                        <motion.li
                          key={notification.id}
                          className={`flex items-center space-x-3 p-2 rounded-md ${
                            isDarkMode
                              ? "hover:bg-teal-900/50"
                              : "hover:bg-teal-100/50"
                          } transition-all duration-200`}
                        >
                          <notification.icon
                            className={`${
                              isDarkMode ? "text-teal-400" : "text-teal-600"
                            }`}
                            size={18}
                          />
                          <div>
                            <p
                              className={`text-sm font-medium ${
                                isDarkMode ? "text-gray-200" : "text-gray-600"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {notification.time}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          className={`p-2 rounded-full ${
            isDarkMode
              ? "bg-gray-700/80 text-gray-200"
              : "bg-teal-100/80 text-teal-600"
          } hover:bg-teal-200/80 transition-all duration-300 shadow-sm`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
        >
          {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </motion.button>
        <div className="relative">
          <motion.button
            className={`w-12 h-12 rounded-full ${
              isDarkMode
                ? "bg-teal-500"
                : "bg-gradient-to-r from-teal-600 to-teal-700"
            } flex items-center justify-center text-white font-semibold text-lg shadow-md`}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProfileClick}
          >
            U
          </motion.button>
          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`absolute right-0 mt-2 w-64 ${
                  isDarkMode
                    ? "bg-gray-800/90 border-gray-700"
                    : "bg-white/90 border-gray-200"
                } rounded-lg shadow-xl border border-opacity-50 backdrop-blur-md z-50`}
              >
                <div className="p-4">
                  <div className="flex items-center space-x-3 border-b border-gray-200/50 dark:border-gray-700/50 pb-3">
                    <FaUser
                      className={`${
                        isDarkMode ? "text-teal-400" : "text-teal-600"
                      }`}
                      size={24}
                    />
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          isDarkMode ? "text-gray-100" : "text-gray-800"
                        }`}
                      >
                        {userData.name}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {userData.email}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          isDarkMode ? "text-teal-400" : "text-teal-600"
                        }`}
                      >
                        {userData.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <Link
                      href="/settings"
                      className={`flex items-center p-2 text-sm ${
                        isDarkMode
                          ? "text-gray-200 hover:bg-teal-900/50"
                          : "text-gray-600 hover:bg-teal-100/50"
                      } rounded-md transition-all duration-200`}
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <FaCog className="mr-2" size={16} />
                      Settings
                    </Link>
                    <Link
                      href="/help"
                      className={`flex items-center p-2 text-sm ${
                        isDarkMode
                          ? "text-gray-200 hover:bg-teal-900/50"
                          : "text-gray-600 hover:bg-teal-100/50"
                      } rounded-md transition-all duration-200`}
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <FaQuestionCircle className="mr-2" size={16} />
                      Help
                    </Link>
                    <button
                      className={`flex items-center p-2 text-sm ${
                        isDarkMode
                          ? "text-gray-200 hover:bg-teal-900/50"
                          : "text-gray-600 hover:bg-teal-100/50"
                      } rounded-md w-full text-left transition-all duration-200`}
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <FaSignOutAlt className="mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
