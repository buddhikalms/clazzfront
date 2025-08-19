import { motion } from "framer-motion";

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

export default function Timetable({ isDarkMode }) {
  const slots = [
    {
      day: "Monday",
      time: "10:00 - 11:00",
      status: "Scheduled",
      title: "Math 101",
    },
    { day: "Monday", time: "14:00 - 15:30", status: "Available" },
    {
      day: "Tuesday",
      time: "09:00 - 10:30",
      status: "Scheduled",
      title: "Physics 201",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
        Weekly Schedule
      </h3>
      <div className="space-y-3">
        {slots.map((slot, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`p-3 rounded-lg ${
              slot.status === "Scheduled"
                ? isDarkMode
                  ? "bg-teal-900/50"
                  : "bg-teal-100/50"
                : isDarkMode
                ? "bg-amber-900/50"
                : "bg-amber-100/50"
            } flex justify-between items-center shadow-sm`}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <p
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {slot.day} {slot.time}
              </p>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {slot.status === "Scheduled" ? slot.title : "Available"}
              </p>
            </div>
            <motion.button
              className="px-3 py-1 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg text-sm font-semibold hover:from-teal-600 hover:to-amber-600 transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              {slot.status === "Scheduled" ? "View" : "Book"}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
