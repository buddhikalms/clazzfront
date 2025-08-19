import { motion } from "framer-motion";
import { FaChartBar, FaCalendarAlt, FaUsers } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function RecentActivity({ isDarkMode }) {
  const activities = [
    {
      action: 'New course "Intro to Python" added',
      time: "1 hour ago",
      icon: FaChartBar,
    },
    {
      action: "Appointment booked with Teacher Jane",
      time: "3 hours ago",
      icon: FaCalendarAlt,
    },
    {
      action: "Student John enrolled in Calculus",
      time: "Yesterday",
      icon: FaUsers,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-6"
    >
      <motion.div
        variants={itemVariants}
        className={`p-6 rounded-2xl shadow-lg border border-opacity-50 ${
          isDarkMode
            ? "bg-gray-800/80 border-gray-700 backdrop-blur-md"
            : "bg-white/80 border-gray-100 backdrop-blur-md"
        }`}
      >
        <h3
          className={`text-xl font-semibold ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          } mb-4`}
        >
          Recent LMS Activity
        </h3>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex items-center justify-between border-b border-gray-200/50 dark:border-gray-700/50 pb-3 last:border-b-0"
              whileHover={{
                x: 5,
                backgroundColor: isDarkMode
                  ? "rgba(45, 212, 191, 0.1)"
                  : "rgba(56, 178, 172, 0.1)",
              }}
            >
              <div className="flex items-center space-x-3">
                <activity.icon
                  className={`${
                    isDarkMode ? "text-teal-400" : "text-teal-600"
                  }`}
                  size={20}
                />
                <span
                  className={`font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-600"
                  }`}
                >
                  {activity.action}
                </span>
              </div>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {activity.time}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
