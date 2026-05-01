import React, { useState } from "react";

const initialLeaves = [
  {
    id: 1,
    name: "Priya Sharma",
    type: "Annual",
    from: "2026-04-22",
    to: "2026-04-24",
    days: 3,
    status: "Pending",
  },
];

const statusStyle = {
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Approved: "bg-green-500/10 text-green-400 border border-green-500/20",
  Rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "Annual",
    from: "",
    to: "",
  });

  const calculateDays = (from, to) => {
    if (!from || !to) return 0;
    const start = new Date(from);
    const end = new Date(to);
    return (end - start) / (1000 * 60 * 60 * 24) + 1;
  };

  const handleSubmit = () => {
    if (!form.name || !form.from || !form.to) return;

    const newLeave = {
      id: Date.now(),
      name: form.name,
      type: form.type,
      from: form.from,
      to: form.to,
      days: calculateDays(form.from, form.to),
      status: "Pending",
    };

    setLeaves([newLeave, ...leaves]);
    setShowForm(false);

    setForm({
      name: "",
      type: "Annual",
      from: "",
      to: "",
    });
  };

  const filteredLeaves =
    filter === "All" ? leaves : leaves.filter((l) => l.status === filter);

  const updateStatus = (id, status) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-4 md:p-8 md:ml-64 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <p className="text-gray-400 text-sm">
            {leaves.filter(l => l.status === "Pending").length} pending requests
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-lg text-sm hover:opacity-90"
        >
          {showForm ? "Close" : "+ Apply Leave"}
        </button>
      </div>

      {/* ✅ FORM (Perfect UI like screenshot) */}
      {showForm && (
        <div className="bg-[#111827] border border-gray-700 rounded-xl p-6 space-y-6 transition-all">

          <h2 className="text-lg font-semibold">Apply for Leave</h2>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Employee Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#020617] border border-gray-700 p-3 rounded-lg outline-none"
            />

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="bg-[#020617] border border-gray-700 p-3 rounded-lg"
            >
              <option>Annual</option>
              <option>Sick</option>
              <option>Comp Off</option>
            </select>

            <input
              type="date"
              value={form.from}
              onChange={(e) => setForm({ ...form, from: e.target.value })}
              className="bg-[#020617] border border-gray-700 p-3 rounded-lg [color-scheme:dark]"
            />

            <input
              type="date"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              className="bg-[#020617] border border-gray-700 p-3 rounded-lg [color-scheme:dark]"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 px-5 py-2 rounded-lg text-sm hover:bg-indigo-700"
            >
              Submit
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="border border-gray-600 px-5 py-2 rounded-lg text-sm hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FILTER */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Pending", "Approved", "Rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1 rounded-full text-sm ${
              filter === tab
                ? "bg-indigo-600"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#020617] text-gray-400">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Days</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.map((l) => (
              <tr key={l.id} className="border-t border-gray-800">
                <td className="p-3">{l.name}</td>
                <td className="p-3">{l.type}</td>
                <td className="p-3">{l.from}</td>
                <td className="p-3">{l.to}</td>
                <td className="p-3">{l.days}</td>

                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded ${statusStyle[l.status]}`}>
                    {l.status}
                  </span>
                </td>

                <td className="p-3">
                  {l.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(l.id, "Approved")}
                        className="bg-green-600 px-2 py-1 mr-2 text-xs rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(l.id, "Rejected")}
                        className="bg-red-600 px-2 py-1 text-xs rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default LeaveManagement;