"use client";
export default function DashboardCourses({ teacher }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Your Courses</h3>
        <a
          href="/teacher/courses/new"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:scale-105 transition-transform duration-200"
        >
          Add Course
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teacher.courses.map((course) => (
          <div
            key={course.id}
            className="bg-emerald-50 rounded-lg border border-slate-200 p-4 hover:shadow-xl hover:scale-105 transition-transform duration-200"
          >
            <h4 className="text-md font-semibold text-slate-800">
              {course.title}
            </h4>
            <p className="text-sm text-slate-700">
              Enrollments: {course.enrollments?.length || 0}
            </p>
            <p className="text-sm text-emerald-600">
              Price: ${course.price.toFixed(2)}
            </p>
            <a
              href={`/teacher/courses/${course.id}/edit`}
              className="mt-2 inline-block text-emerald-600 hover:text-emerald-700"
            >
              Edit Course
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
