import React from "react";

const RecentActivities = ({ activities }) => {
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 h-full">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-white font-semibold text-lg">
          Recent Activity
        </h2>
        <span className="text-blue-400 text-sm cursor-pointer hover:underline">
          View all →
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
        {activities?.length > 0 ? (
          activities.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b border-gray-800 pb-3"
            >
              {/* Left */}
              <div className="flex items-center gap-3 text-sm text-gray-300">
                {/* Status Dot */}
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.type === "success"
                      ? "bg-green-400"
                      : item.type === "info"
                      ? "bg-blue-400"
                      : item.type === "warning"
                      ? "bg-yellow-400"
                      : "bg-purple-400"
                  }`}
                ></span>

                {/* Message */}
                <span>
                  <b className="text-white">{item.user}</b> {item.message}
                </span>
              </div>

              {/* Time */}
              <span className="text-xs text-gray-500">
                {item.time}
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <p className="text-sm">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;