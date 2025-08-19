"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import {
  Bell,
  Book,
  Calendar,
  CheckCircle,
  MessageSquare,
  Plus,
  Star,
  Users,
  Menu,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Book },
  { name: "Classes", href: "/classes", icon: Users },
  { name: "Assignments", href: "/assignments", icon: Calendar },
  { name: "Announcements", href: "/announcements", icon: MessageSquare },
];

const sampleClasses = [
  { id: 1, name: "Mathematics 101", students: 25, progress: 85 },
  { id: 2, name: "English Literature", students: 20, progress: 70 },
  { id: 3, name: "Physics", students: 22, progress: 78 },
];

const studentSpotlight = {
  name: "Emma Watson",
  class: "Mathematics 101",
  achievement: "Top Scorer in Quiz",
};

const announcements = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    content: "Scheduled for June 27, 2025.",
    time: "Today",
  },
  {
    id: 2,
    title: "New Assignment Posted",
    content: "Math homework due June 30.",
    time: "Yesterday",
  },
];

const initialTasks = [
  { id: "task-1", content: "Grade Math Quiz", priority: "High" },
  { id: "task-2", content: "Prepare English Lesson", priority: "Medium" },
  { id: "task-3", content: "Update Physics Syllabus", priority: "Low" },
];

export default function FuturisticTeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarOpen") === "true";
    }
    return true;
  });
  const [tasks, setTasks] = useState(initialTasks);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", sidebarOpen.toString());
  }, [sidebarOpen]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);
  };

  return (
    <div className="flex h-screen bg-gradient-to-tr from-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/30 backdrop-blur-lg border-r border-white/10 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            EduFuturist
          </h2>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <Menu className="w-6 h-6 text-cyan-400" />
          </button>
        </div>
        <nav className="mt-6 space-y-2 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-cyan-300 hover:bg-white/10 hover:text-cyan-100 rounded-lg transition-all duration-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
          <button className="flex items-center w-full px-4 py-3 text-cyan-300 hover:bg-white/10 hover:text-cyan-100 rounded-lg transition-all duration-200">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-cyan-400" />
              </button>
              <h1 className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative" onClick={() => setNotifications(0)}>
                <Bell className="w-6 h-6 text-cyan-400 hover:text-cyan-300 transition" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-medium ring-2 ring-cyan-400/50">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:ring-2 hover:ring-cyan-400/50 transition-all duration-300">
              <h3 className="text-lg font-medium text-cyan-300">
                Total Classes
              </h3>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mt-2">
                3
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:ring-2 hover:ring-cyan-400/50 transition-all duration-300">
              <h3 className="text-lg font-medium text-cyan-300">
                Total Students
              </h3>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mt-2">
                67
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:ring-2 hover:ring-cyan-400/50 transition-all duration-300">
              <h3 className="text-lg font-medium text-cyan-300">
                Assignments Due
              </h3>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mt-2">
                5
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Classes Table */}
            <div className="lg:col-span-2 bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-cyan-300">
                  Your Classes
                </h3>
                <button className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition">
                  <Plus className="w-4 h-4 mr-2" /> Add Class
                </button>
              </div>
              <table className="w-full">
                <thead className="bg-black/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-cyan-300">
                      Class Name
                    </th>
                    <th className="px-6 py-3 text-left text-cyan-300">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-cyan-300">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-cyan-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleClasses.map((classItem) => (
                    <tr
                      key={classItem.id}
                      className="border-t border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4">{classItem.name}</td>
                      <td className="px-6 py-4">{classItem.students}</td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full"
                            style={{ width: `${classItem.progress}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/classes/${classItem.id}`}
                          className="text-cyan-400 hover:text-cyan-300 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Student Spotlight & Announcements */}
            <div className="space-y-6">
              {/* Student Spotlight */}
              <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" /> Student
                  Spotlight
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium">
                    EW
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {studentSpotlight.name}
                    </p>
                    <p className="text-sm text-cyan-400">
                      {studentSpotlight.class}
                    </p>
                    <p className="text-sm text-gray-300">
                      {studentSpotlight.achievement}
                    </p>
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-cyan-300 mb-4">
                  Announcements
                </h3>
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="mb-4">
                    <p className="font-medium text-white">
                      {announcement.title}
                    </p>
                    <p className="text-sm text-gray-300">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-cyan-400">{announcement.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Task Manager */}
          <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">
              Task Manager
            </h3>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex justify-between items-center p-4 mb-2 rounded-lg ${
                              task.priority === "High"
                                ? "bg-red-500/20 border-red-500/30"
                                : task.priority === "Medium"
                                ? "bg-yellow-500/20 border-yellow-500/30"
                                : "bg-green-500/20 border-green-500/30"
                            } border`}
                          >
                            <div className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-cyan-400" />
                              <span>{task.content}</span>
                            </div>
                            <span className="text-sm text-gray-300">
                              {task.priority}
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button className="flex items-center px-4 py-2 mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition">
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
