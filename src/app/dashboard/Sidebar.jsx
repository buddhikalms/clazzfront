import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaCog,
  FaBook,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";

const sidebarVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: "-100%", opacity: 0 },
};

const navItems = [
  { name: "Dashboard", icon: FaHome, href: "/" },
  { name: "Add Course", icon: FaChartBar, href: "/dashboard/add-course" },
  { name: "Users", icon: FaUsers, href: "/users" },
  { name: "Settings", icon: FaCog, href: "/settings" },
  { name: "Courses", icon: FaBook, href: "/courses" },
];

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  isDarkMode,
}) {
  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <motion.button
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full shadow-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-64 bg-gradient-to-b from-teal-900 to-teal-800 shadow-2xl fixed h-screen z-40 md:hidden"
          >
            <div className="p-6 border-b border-teal-700/50">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                LMS Dashboard
              </h1>
            </div>
            <nav className="mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center p-4 text-teal-100 hover:bg-teal-700/50 hover:text-white transition-all duration-300 font-medium rounded-r-lg"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <item.icon className="mr-3" size={22} />
                    <span>{item.name}</span>
                  </motion.div>
                </Link>
              ))}
              <button className="flex items-center p-4 text-teal-100 hover:bg-teal-700/50 hover:text-white w-full text-left transition-all duration-300 font-medium rounded-r-lg">
                <motion.div whileHover={{ x: 5 }} className="flex items-center">
                  <FaSignOutAlt className="mr-3" size={22} />
                  <span>Logout</span>
                </motion.div>
              </button>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Permanent Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-gradient-to-b from-teal-900 to-teal-800 shadow-2xl fixed h-screen z-40">
        <div className="p-6 border-b border-teal-700/50">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            LMS Dashboard
          </h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center p-4 text-teal-100 hover:bg-teal-700/50 hover:text-white transition-all duration-300 font-medium rounded-r-lg"
            >
              <motion.div whileHover={{ x: 5 }} className="flex items-center">
                <item.icon className="mr-3" size={22} />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          ))}
          <button className="flex items-center p-4 text-teal-100 hover:bg-teal-700/50 hover:text-white w-full text-left transition-all duration-300 font-medium rounded-r-lg">
            <motion.div whileHover={{ x: 5 }} className="flex items-center">
              <FaSignOutAlt className="mr-3" size={22} />
              <span>Logout</span>
            </motion.div>
          </button>
        </nav>
      </aside>
    </>
  );
}
