import React from "react";

const Attendance = () => {
  return (
    <div className="md:ml-64 min-h-screen bg-[#0b1220] text-white p-4 sm:p-6 md:p-8 mt-8 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Attendance Management</h1>
          <p className="text-gray-400 text-xs sm:text-sm">April 2026</p>
        </div>

        <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-lg text-sm hover:opacity-90">
          Export Report
        </button>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Attendance Form */}
        <div className="bg-[#111827] border border-gray-700 p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Mark Attendance</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <select className="bg-[#0b1220] border border-gray-700 p-2 rounded-lg text-sm outline-none">
              <option>Priya Sharma</option>
              <option>Rahul Kumar</option>
              <option>Neha Singh</option>
            </select>

            <input
              type="date"
              className="bg-[#0b1220] border border-gray-700 p-2 rounded-lg text-sm outline-none"
            />

            <select className="bg-[#0b1220] border border-gray-700 p-2 rounded-lg text-sm">
              <option>Present</option>
              <option>Absent</option>
              <option>Half Day</option>
            </select>

            <input
              type="text"
              placeholder="Remarks"
              className="bg-[#0b1220] border border-gray-700 p-2 rounded-lg text-sm"
            />
          </div>

          <button className="mt-4 w-full sm:w-auto bg-indigo-500 px-4 py-2 rounded-lg text-sm hover:bg-indigo-600">
            Mark Attendance
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-[#111827] border border-gray-700 p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
          <h2 className="text-base sm:text-lg font-semibold mb-4">
            April 2026 — Priya Sharma
          </h2>

          <div className="min-w-[320px] grid grid-cols-7 gap-2 text-center text-xs sm:text-sm">
            {["S","M","T","W","T","F","S"].map((d) => (
              <div key={d} className="text-gray-400">{d}</div>
            ))}

            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`p-2 rounded-lg 
                ${
                  day % 5 === 0
                    ? "bg-red-500/10 text-red-400"
                    : "bg-green-500/10 text-green-400"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-xs sm:text-sm">
            <span className="text-green-400">● Present: 14</span>
            <span className="text-yellow-400">● Half Day: 1</span>
            <span className="text-red-400">● Absent: 5</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111827] border border-gray-700 rounded-xl shadow-lg overflow-hidden">

        {/* Top */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 border-b border-gray-700">
          <h2 className="font-semibold text-base sm:text-lg">Today's Attendance</h2>

          <button className="w-full sm:w-auto bg-indigo-500 px-4 py-1 rounded-md text-sm hover:bg-indigo-600">
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-xs sm:text-sm">
            <thead className="text-gray-400 uppercase text-xs border-b border-gray-700">
              <tr>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Check In</th>
                <th className="p-4 text-left">Check Out</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  name: "Priya Sharma",
                  dept: "Engineering",
                  in: "09:05 AM",
                  out: "06:10 PM",
                  status: "Present",
                },
                {
                  name: "Rahul Kumar",
                  dept: "Finance",
                  in: "09:32 AM",
                  out: "-",
                  status: "Present",
                },
                {
                  name: "Neha Singh",
                  dept: "HR",
                  in: "-",
                  out: "-",
                  status: "Absent",
                },
                {
                  name: "Amit Patel",
                  dept: "Marketing",
                  in: "10:15 AM",
                  out: "02:00 PM",
                  status: "Half Day",
                },
              ].map((emp, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-[#1f2937]">
                  <td className="p-4 font-medium">{emp.name}</td>
                  <td className="p-4">{emp.dept}</td>
                  <td className="p-4">{emp.in}</td>
                  <td className="p-4">{emp.out}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        emp.status === "Present"
                          ? "bg-green-500/10 text-green-400"
                          : emp.status === "Absent"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      ● {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Attendance;