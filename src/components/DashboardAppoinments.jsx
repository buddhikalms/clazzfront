"use client";
export default function DashboardAppointments({ teacher }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fade-in">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Upcoming Appointments
      </h3>
      {teacher.appointments.length > 0 ? (
        <ul className="space-y-4">
          {teacher.appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="bg-emerald-50 rounded-lg p-4 border border-slate-200"
            >
              <p className="text-sm text-slate-700">
                {new Date(appointment.date).toLocaleDateString()} at{" "}
                {appointment.startTime}
              </p>
              <p className="text-sm text-emerald-600">
                Session: {appointment.sessionType.replace("_", " ")}
              </p>
              <button className="mt-2 text-emerald-600 hover:text-emerald-700 text-sm">
                Reschedule
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-700">No upcoming appointments.</p>
      )}
    </div>
  );
}
