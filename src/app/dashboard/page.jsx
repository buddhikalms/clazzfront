"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Widgets from "./Widgets";
import ChartSection from "./ChartSection";
import Timetable from "./TimeTable";
import RecentActivity from "./RecentActivity";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!isMounted) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gray-50 via-teal-50 to-teal-200"
      }`}
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isDarkMode={isDarkMode}
      />
      <div className="flex-1 md:ml-64">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="p-6 max-w-7xl mx-auto">
          <Widgets isDarkMode={isDarkMode} />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartSection isDarkMode={isDarkMode} />
            <Timetable isDarkMode={isDarkMode} />
          </div>
          <RecentActivity isDarkMode={isDarkMode} />
        </main>
      </div>
    </div>
  );
}
