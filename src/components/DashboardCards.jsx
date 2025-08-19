"use client";
export default function DashboardCards({ teacher }) {
  const cards = [
    {
      title: "Total Students",
      value: teacher.courses.reduce(
        (sum, course) => sum + (course.enrollments?.length || 0),
        0
      ),
      icon: "👩‍🎓",
    },
    {
      title: "Upcoming Appointments",
      value: teacher.appointments.length,
      icon: "📅",
    },
    { title: "Courses Offered", value: teacher.courses.length, icon: "📚" },
    {
      title: "Total Earnings",
      value: `$${teacher.courses
        .reduce(
          (sum, course) =>
            sum + course.price * (course.enrollments?.length || 0),
          0
        )
        .toFixed(2)}`,
      icon: "💰",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow-md p-6 flex items-center hover:shadow-xl hover:scale-105 transition-transform duration-200 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <span className="text-3xl mr-4">{card.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-emerald-600">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
