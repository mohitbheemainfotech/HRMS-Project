import React, { useState } from "react";

const leaveData = [
  {
    id: 1,
    name: "Rahul Sharma",
    type: "Casual Leave",
    from: "2026-04-10",
    to: "2026-04-12",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Verma",
    type: "Sick Leave",
    from: "2026-04-08",
    to: "2026-04-09",
    status: "Approved",
  },
  {
    id: 3,
    name: "Amit Singh",
    type: "Earned Leave",
    from: "2026-04-15",
    to: "2026-04-18",
    status: "Rejected",
  },
];

const LeaveWidget = () => {
  const [leaves, setLeaves] = useState(leaveData);

  const handleStatus = (id, newStatus) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: newStatus } : leave
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/20 text-green-400";
      case "Rejected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  };

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4 sm:p-5 md:p-6 w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5">
        <h2 className="text-white text-base sm:text-lg font-semibold">
          Leave Requests
        </h2>

        <span className="text-blue-400 text-sm cursor-pointer hover:underline w-fit">
          Manage →
        </span>
      </div>

      {/* ================= TABLE (Desktop) ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave.id}
                className="border-b border-gray-800 hover:bg-[#111827] transition"
              >
                <td className="p-3 text-white">{leave.name}</td>
                <td className="p-3">{leave.type}</td>
                <td className="p-3">{leave.from}</td>
                <td className="p-3">{leave.to}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleStatus(leave.id, "Approved")}
                      className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 text-xs"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatus(leave.id, "Rejected")}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-xs"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE / TABLET CARDS ================= */}
      <div className="md:hidden space-y-4">
        {leaves.map((leave) => (
          <div
            key={leave.id}
            className="bg-[#111827] border border-gray-800 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-medium">{leave.name}</h3>

              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                  leave.status
                )}`}
              >
                {leave.status}
              </span>
            </div>

            <p className="text-sm text-gray-400">{leave.type}</p>
            <p className="text-sm text-gray-400 mt-1">
              {leave.from} → {leave.to}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleStatus(leave.id, "Approved")}
                className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm"
              >
                Approve
              </button>

              <button
                onClick={() => handleStatus(leave.id, "Rejected")}
                className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveWidget;