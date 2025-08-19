"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DashboardCharts({ teacher }) {
  const enrollmentChartRef = useRef(null);
  const appointmentChartRef = useRef(null);

  useEffect(() => {
    // Enrollment Chart
    const enrollmentCtx = enrollmentChartRef.current.getContext("2d");
    const enrollmentChart = new Chart(enrollmentCtx, {
      type: "line",
      data: {
        labels: teacher.courses.map((course) => course.title),
        datasets: [
          {
            label: "Enrollments",
            data: teacher.courses.map(
              (course) => course.enrollments?.length || 0
            ),
            borderColor: "#059669",
            backgroundColor: "rgba(5, 150, 105, 0.2)",
            fill: true,
          },
        ],
      },
      options: { scales: { y: { beginAtZero: true } } },
    });

    // Appointment Chart
    const appointmentCtx = appointmentChartRef.current.getContext("2d");
    const appointmentChart = new Chart(appointmentCtx, {
      type: "bar",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
          {
            label: "Appointments",
            data: [2, 3, 1, 4, 2], // Mock data, replace with teacher.appointments
            backgroundColor: "#fbbf24",
          },
        ],
      },
      options: { scales: { y: { beginAtZero: true } } },
    });

    return () => {
      enrollmentChart.destroy();
      appointmentChart.destroy();
    };
  }, [teacher]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Course Enrollment Trends
        </h3>
        <canvas ref={enrollmentChartRef}></canvas>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Weekly Appointments
        </h3>
        <canvas ref={appointmentChartRef}></canvas>
      </div>
    </div>
  );
}
