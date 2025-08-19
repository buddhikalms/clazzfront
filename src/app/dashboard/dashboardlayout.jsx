"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendar,
  FaBook,
  FaUsers,
  FaSignOutAlt,
  FaStar,
} from "react-icons/fa";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("overview");

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Please sign in to access the dashboard.
      </div>
    );
  }

  const user = session.user;
  const isTeacher = user.role === "TEACHER";

  // Mock data (replace with API calls to fetch from Prisma)
  const teacherData = {
    name: user.name || "Teacher Name",
    subject: "Mathematics",
    profileImage: "/teachers/profile.jpg",
    coverImage: "/teachers/cover.jpg",
    courses: [
      {
        id: "1",
        title: "Algebra Basics",
        duration: "4 weeks",
        level: "Beginner",
        price: 99.99,
        enrollmentStatus: "OPEN",
        image: "/courses/algebra.jpg",
      },
      {
        id: "2",
        title: "Calculus I",
        duration: "6 weeks",
        level: "Intermediate",
        price: 149.99,
        enrollmentStatus: "OPEN",
        image: "/courses/calculus.jpg",
      },
    ],
    schedules: [
      {
        day: "Monday",
        startTime: "10:00",
        endTime: "11:00",
        type: "AVAILABLE",
      },
      {
        day: "Wednesday",
        startTime: "14:00",
        endTime: "15:30",
        type: "SCHEDULED",
        courseId: "1",
      },
    ],
    reviews: [
      { id: "1", user: "Student A", rating: 4.5, comment: "Great teacher!" },
    ],
  };

  const studentData = {
    name: user.name || "Student Name",
    enrolledCourses: [
      {
        id: "1",
        title: "Algebra Basics",
        teacher: "Teacher Name",
        progress: 75,
        image: "/courses/algebra.jpg",
      },
    ],
    appointments: [
      {
        id: "1",
        teacher: "Teacher Name",
        date: "2025-08-05",
        startTime: "10:00",
        sessionType: "HOUR",
      },
    ],
  };

  const data = isTeacher ? teacherData : studentData;

  // Tabs based on role
  const tabs = isTeacher
    ? [
        { id: "overview", label: "Overview" },
        { id: "courses", label: "My Courses" },
        { id: "schedules", label: "Schedules" },
        { id: "reviews", label: "Reviews" },
      ]
    : [
        { id: "overview", label: "Overview" },
        { id: "courses", label: "Enrolled Courses" },
        { id: "appointments", label: "Appointments" },
        { id: "teachers", label: "Find Teachers" },
      ];

  // Calculate average rating for teachers
  const averageRating = isTeacher
    ? data.reviews?.length > 0
      ? data.reviews.reduce((sum, review) => sum + review.rating, 0) /
        data.reviews.length
      : 0
    : 0;

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-50 to-teal-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="relative h-40 sm:h-56">
            <Image
              src={isTeacher ? data.coverImage : "/students/cover.jpg"}
              layout="fill"
              objectFit="cover"
              alt="Cover"
              className="rounded-t-2xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/50 to-amber-500/50" />
          </div>
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end p-6">
            <div className="absolute -top-12 sm:-top-16 left-1/2 sm:left-6 transform -translate-x-1/2 sm:translate-x-0">
              <Image
                src={isTeacher ? data.profileImage : "/students/profile.jpg"}
                width={120}
                height={120}
                alt={data.name}
                className="rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div className="mt-12 sm:mt-0 sm:ml-36 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {data.name}
              </h1>
              <p className="text-md text-teal-600 font-medium">
                {isTeacher ? `${data.subject} Teacher` : "Student"}
              </p>
              {isTeacher && (
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? "text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {averageRating.toFixed(1)} ({data.reviews?.length || 0}{" "}
                    reviews)
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="mt-4 sm:mt-0 sm:ml-auto bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b-2 border-gray-200 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm sm:text-base font-medium ${
                activeTab === tab.id
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600 hover:text-teal-500"
              }`}
              whileHover={{ y: -2 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Dashboard Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-teal-50 p-4 rounded-lg shadow">
                    <FaBook className="text-teal-600 w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {isTeacher ? "Courses Taught" : "Enrolled Courses"}
                    </h3>
                    <p className="text-gray-600">
                      {isTeacher
                        ? data.courses.length
                        : data.enrolledCourses.length}{" "}
                      {isTeacher ? "courses" : "enrolled"}
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg shadow">
                    <FaCalendar className="text-amber-600 w-8 h-8 mb-2" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {isTeacher
                        ? "Scheduled Sessions"
                        : "Upcoming Appointments"}
                    </h3>
                    <p className="text-gray-600">
                      {isTeacher
                        ? data.schedules.filter((s) => s.type === "SCHEDULED")
                            .length
                        : data.appointments.length}{" "}
                      {isTeacher ? "sessions" : "appointments"}
                    </p>
                  </div>
                  {isTeacher && (
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <FaStar className="text-amber-400 w-8 h-8 mb-2" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Reviews
                      </h3>
                      <p className="text-gray-600">
                        {data.reviews.length} reviews
                      </p>
                    </div>
                  )}
                  {!isTeacher && (
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <FaUsers className="text-teal-600 w-8 h-8 mb-2" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Teachers
                      </h3>
                      <p className="text-gray-600">
                        Explore available teachers
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {isTeacher ? "My Courses" : "Enrolled Courses"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(isTeacher ? data.courses : data.enrolledCourses).map(
                    (course) => (
                      <motion.div
                        key={course.id}
                        className="bg-teal-50 rounded-lg shadow hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={course.image}
                          width={400}
                          height={200}
                          alt={course.title}
                          className="rounded-t-lg object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {isTeacher
                              ? `Level: ${course.level}`
                              : `Teacher: ${course.teacher}`}
                          </p>
                          {isTeacher ? (
                            <p className="text-sm text-teal-600">
                              Price: ${course.price.toFixed(2)}
                            </p>
                          ) : (
                            <p className="text-sm text-teal-600">
                              Progress: {course.progress}%
                            </p>
                          )}
                          <Link
                            href={`/course/${course.id}`}
                            className="mt-2 inline-block text-teal-600 hover:text-teal-700 font-medium"
                          >
                            View Details
                          </Link>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "schedules" && isTeacher && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  My Schedules
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {schedule.day}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                      <p className="text-sm text-teal-600">
                        {schedule.type === "SCHEDULED"
                          ? `Course: ${
                              data.courses.find(
                                (c) => c.id === schedule.courseId
                              )?.title || "Unknown"
                            }`
                          : "Available"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appointments" && !isTeacher && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Upcoming Appointments
                </h2>
                <div className="space-y-4">
                  {data.appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-gray-100 p-4 rounded-lg shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {appointment.teacher}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Date: {appointment.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        Time: {appointment.startTime}
                      </p>
                      <p className="text-sm text-teal-600">
                        Session: {appointment.sessionType}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && isTeacher && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Reviews
                </h2>
                <div className="space-y-4">
                  {data.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-100 p-4 rounded-lg shadow"
                    >
                      <div className="flex items-center mb-2">
                        <span className="font-semibold text-gray-800">
                          {review.user}
                        </span>
                        <div className="flex ml-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(review.rating)
                                  ? "text-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "teachers" && !isTeacher && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Find Teachers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Mock teacher data (replace with API call) */}
                  {[
                    {
                      id: "1",
                      name: "Teacher A",
                      subject: "Math",
                      image: "/teachers/teacher1.jpg",
                    },
                  ].map((teacher) => (
                    <div
                      key={teacher.id}
                      className="bg-teal-50 rounded-lg shadow hover:shadow-lg transition-all"
                    >
                      <Image
                        src={teacher.image}
                        width={400}
                        height={200}
                        alt={teacher.name}
                        className="rounded-t-lg object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {teacher.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {teacher.subject}
                        </p>
                        <Link
                          href={`/teacher/${teacher.id}`}
                          className="mt-2 inline-block text-teal-600 hover:text-teal-700 font-medium"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
