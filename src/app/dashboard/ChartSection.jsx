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

export default function ChartSection({ isDarkMode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`lg:col-span-2 p-6 rounded-2xl shadow-lg border border-opacity-50 ${
        isDarkMode
          ? "bg-gray-800/80 border-gray-700 backdrop-blur-md"
          : "bg-white/80 border-gray-100 backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-xl font-semibold ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Enrollment Trends
        </h3>
        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-amber-600 transition-all duration-300 shadow-sm"
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Data
        </motion.button>
      </div>
      <div className="h-96 relative overflow-hidden rounded-lg">
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-gradient-to-br from-teal-900/30 to-amber-900/30"
              : "bg-gradient-to-br from-teal-50/50 to-amber-50/50"
          } shadow-inner`}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,80 C20,60 40,40 60,60 C80,80 100,60 100,60 L100,100 L0,100 Z"
              fill={
                isDarkMode
                  ? "rgba(45, 212, 191, 0.4)"
                  : "rgba(56, 178, 172, 0.4)"
              }
              initial={{
                d: "M0,80 C20,80 40,80 60,80 C80,80 100,80 100,80 L100,100 L0,100 Z",
              }}
              animate={{
                d: "M0,80 C20,60 40,40 60,60 C80,80 100,60 100,60 L100,100 L0,100 Z",
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.path
              d="M0,90 C25,70 50,50 75,70 C90,85 100,70 100,70 L100,100 L0,100 Z"
              fill={
                isDarkMode
                  ? "rgba(236, 201, 75, 0.4)"
                  : "rgba(236, 201, 75, 0.4)"
              }
              initial={{
                d: "M0,90 C25,90 50,90 75,90 C90,90 100,90 100,90 L100,100 L0,100 Z",
              }}
              animate={{
                d: "M0,90 C25,70 50,50 75,70 C90,85 100,70 100,70 L100,100 L0,100 Z",
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </svg>
        </div>
        <p
          className={`text-center ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } font-medium relative z-10 mt-40`}
        >
          Course Enrollment Chart
        </p>
      </div>
    </motion.div>
  );
}
