import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
} from "react-icons/fa";

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

const counterVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function Widgets({ isDarkMode }) {
  const widgets = [
    {
      title: "Teachers",
      count: 25,
      change: "+2 this month",
      progress: "20%",
      icon: FaChalkboardTeacher,
      color: "teal",
    },
    {
      title: "Students",
      count: 150,
      change: "+15 this month",
      progress: "60%",
      icon: FaUsers,
      color: "amber",
    },
    {
      title: "Courses",
      count: 40,
      change: "+5 this month",
      progress: "40%",
      icon: FaChartBar,
      color: "teal",
    },
    {
      title: "Schedules",
      count: 85,
      change: "+10 this month",
      progress: "50%",
      icon: FaCalendarAlt,
      color: "amber",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {widgets.map((widget, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-opacity-50 ${
            isDarkMode
              ? "bg-gray-800/80 border-gray-700 backdrop-blur-md"
              : "bg-white/80 border-gray-100 backdrop-blur-md"
          }`}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {widget.title}
              </h3>
              <motion.p
                variants={counterVariants}
                className={`text-3xl font-bold ${
                  isDarkMode
                    ? `text-${widget.color}-400`
                    : `text-${widget.color}-600`
                } mt-2`}
              >
                {widget.count}
              </motion.p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mt-1`}
              >
                {widget.change}
              </p>
              <div className="mt-3 w-full bg-gray-200/50 rounded-full h-2.5">
                <motion.div
                  className={`bg-gradient-to-r from-${widget.color}-500 to-${widget.color}-700 h-2.5 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: widget.progress }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>
            <div
              className={`${
                isDarkMode
                  ? `bg-${widget.color}-900/50`
                  : `bg-${widget.color}-50/50`
              } p-3 rounded-full shadow-sm`}
            >
              <widget.icon
                className={`${
                  isDarkMode
                    ? `text-${widget.color}-400`
                    : `text-${widget.color}-600`
                }`}
                size={28}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
