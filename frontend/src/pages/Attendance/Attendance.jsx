import React, { useEffect, useState } from "react";
import API from "../../api.js";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    employeeName: "",
    date: "",
    status: "Present",
    remarks: "",
  });

  // ✅ GET EMPLOYEES
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");

      if (res.data?.employees) {
        setEmployees(res.data.employees);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ GET ATTENDANCE
  const fetchAttendance = async () => {
    try {
      const res = await API.get("/attendance");
      setRecords(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  // ✅ MARK ATTENDANCE
  const handleSubmit = async () => {
    if (!form.employeeName || !form.date) {
      alert("Please select employee and date");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/attendance", form);

      // ✅ instantly update UI
      setRecords([res.data, ...records]);

      // ✅ reset form
      setForm({
        employeeName: "",
        date: "",
        status: "Present",
        remarks: "",
      });

      alert("Attendance Marked ✅");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ STATUS COLORS
  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-500/10 text-green-400";

      case "Absent":
        return "bg-red-500/10 text-red-400";

      case "Half Day":
        return "bg-yellow-500/10 text-yellow-400";

      default:
        return "bg-gray-500/10 text-gray-300";
    }
  };

  return (
    <div className="md:ml-64 min-h-screen bg-[#0b1220] text-white p-4 sm:p-6 md:p-8 mt-8 space-y-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="border border-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Attendance Management
          </h1>

          <p className="text-gray-400 text-xs sm:text-sm">
            Manage daily employee attendance
          </p>
        </div>

        <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-lg text-sm hover:opacity-90">
          Export Report
        </button>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="bg-[#111827] border border-gray-700 p-4 sm:p-6 rounded-xl shadow-lg">

          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Mark Attendance
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* EMPLOYEE */}
            <select
              value={form.employeeName}
              onChange={(e) =>
                setForm({ ...form, employeeName: e.target.value })
              }
              className="bg-[#0b1220] border border-gray-700 p-3 rounded-lg text-sm outline-none"
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option
                  key={emp._id}
                  value={`${emp.firstName} ${emp.lastName}`}
                >
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>

            {/* DATE */}
            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="bg-[#0b1220] border border-gray-700 p-3 rounded-lg text-sm outline-none"
            />

            {/* STATUS */}
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              className="bg-[#0b1220] border border-gray-700 p-3 rounded-lg text-sm"
            >
              <option>Present</option>
              <option>Absent</option>
              <option>Half Day</option>
            </select>

            {/* REMARKS */}
            <input
              type="text"
              placeholder="Remarks"
              value={form.remarks}
              onChange={(e) =>
                setForm({ ...form, remarks: e.target.value })
              }
              className="bg-[#0b1220] border border-gray-700 p-3 rounded-lg text-sm"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 w-full sm:w-auto bg-indigo-500 px-5 py-2 rounded-lg text-sm hover:bg-indigo-600 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Mark Attendance"}
          </button>
        </div>

        {/* SUMMARY CARD */}
        <div className="bg-[#111827] border border-gray-700 p-4 sm:p-6 rounded-xl shadow-lg">

          <h2 className="text-base sm:text-lg font-semibold mb-5">
            Attendance Summary
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold text-green-400">
                {
                  records.filter((r) => r.status === "Present").length
                }
              </h3>

              <p className="text-sm text-gray-300 mt-1">Present</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold text-red-400">
                {
                  records.filter((r) => r.status === "Absent").length
                }
              </h3>

              <p className="text-sm text-gray-300 mt-1">Absent</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold text-yellow-400">
                {
                  records.filter((r) => r.status === "Half Day").length
                }
              </h3>

              <p className="text-sm text-gray-300 mt-1">Half Day</p>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#111827] border border-gray-700 rounded-xl shadow-lg overflow-hidden">

        <div className="p-4 border-b border-gray-700">
          <h2 className="font-semibold text-base sm:text-lg">
            Attendance Records
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="min-w-[700px] w-full text-xs sm:text-sm">

            <thead className="text-gray-400 uppercase text-xs border-b border-gray-700">
              <tr>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Remarks</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((rec) => (
                  <tr
                    key={rec._id}
                    className="border-b border-gray-800 hover:bg-[#1f2937]"
                  >
                    <td className="p-4 font-medium">
                      {rec.employeeName}
                    </td>

                    <td className="p-4">
                      {new Date(rec.date).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                          rec.status
                        )}`}
                      >
                        {rec.status}
                      </span>
                    </td>

                    <td className="p-4 text-gray-300">
                      {rec.remarks || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-400"
                  >
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;