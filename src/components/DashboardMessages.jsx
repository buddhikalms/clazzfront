"use client";
export default function DashboardMessages({ teacher }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fade-in">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Recent Messages
      </h3>
      {teacher.messages.length > 0 ? (
        <ul className="space-y-4">
          {teacher.messages.map((message) => (
            <li
              key={message.id}
              className="bg-emerald-50 rounded-lg p-4 border border-slate-200"
            >
              <p className="text-sm text-slate-700">
                From: {message.user.name}
              </p>
              <p className="text-sm text-slate-700 truncate">
                {message.content}
              </p>
              <button className="mt-2 text-emerald-600 hover:text-emerald-700 text-sm">
                Reply
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-700">No new messages.</p>
      )}
    </div>
  );
}
