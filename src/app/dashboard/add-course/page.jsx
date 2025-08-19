// src/app/courses/new/page.tsx
"use client";
import { useState } from "react";
import CourseForm from "./CourseForm";
import { auth } from "@/lib/auth";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default async function NewCoursePage() {
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

  const session = await auth();

  if (!session?.user?.email) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
        <p className="text-red-600">Please log in to create a course.</p>
      </main>
    );
  }

  // Fetch teacher ID based on user email
  const teacher = await prisma.teacher.findFirst({
    where: { user: { email: session.user.email } },
  });

  if (!teacher) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
        <p className="text-red-600">
          No teacher profile found. Please create a teacher profile first.
        </p>
      </main>
    );
  }

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
          <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
          <CourseForm teacherId={teacher.id} mode="create" />
        </main>
      </div>
    </div>
  );
}
