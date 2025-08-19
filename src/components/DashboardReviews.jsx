"use client";
export default function DashboardReviews({ teacher }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Recent Reviews
      </h3>
      {teacher.reviews.length > 0 ? (
        <ul className="space-y-4">
          {teacher.reviews.map((review) => (
            <li
              key={review.id}
              className="bg-emerald-50 rounded-lg p-4 border border-slate-200"
            >
              <div className="flex items-center mb-2">
                <span className="text-sm text-slate-700 mr-2">
                  {review.user.name}
                </span>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(review.rating)
                        ? "text-amber-400"
                        : "text-slate-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-700">No reviews yet.</p>
      )}
    </div>
  );
}
