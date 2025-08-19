"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      href: "/teacher/dashboard",
      label: "Dashboard",
      icon: "/icons/dashboard.svg",
    },
    {
      href: `/teacher/${session?.user?.teacherId}/profile`,
      label: "Profile",
      icon: "/icons/profile.svg",
    },
    { href: "/teacher/courses", label: "Courses", icon: "/icons/courses.svg" },
    {
      href: "/teacher/appointments",
      label: "Appointments",
      icon: "/icons/appointments.svg",
    },
    {
      href: "/teacher/timetable",
      label: "Timetable",
      icon: "/icons/timetable.svg",
    },
    {
      href: "/teacher/messages",
      label: "Messages",
      icon: "/icons/messages.svg",
    },
    { href: "/teacher/reviews", label: "Reviews", icon: "/icons/reviews.svg" },
    {
      href: "/teacher/settings",
      label: "Settings",
      icon: "/icons/settings.svg",
    },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-slate-200 hover:text-amber-400 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar/Offcanvas */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 to-emerald-900 text-slate-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 shadow-lg`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-slate-200 hover:text-amber-400 mb-8"
          >
            Teacher's Hub
          </Link>

          {/* User Info */}
          {session && (
            <div className="flex items-center mb-6">
              <img
                src={session.user.image || "https://via.placeholder.com/40"}
                alt={session.user.name}
                className="w-10 h-10 rounded-full border-2 border-amber-400"
              />
              <span className="ml-3 text-sm font-medium">
                {session.user.name}
              </span>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-3 text-slate-200 hover:bg-emerald-800 hover:text-amber-400 rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className="mr-3"
                />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <button
            onClick={() => {
              signOut();
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-3 text-slate-200 hover:bg-emerald-800 hover:text-amber-400 rounded-lg transition-colors duration-200"
          >
            <Image
              src="/icons/logout.svg"
              alt="Logout"
              width={20}
              height={20}
              className="mr-3"
            />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}
