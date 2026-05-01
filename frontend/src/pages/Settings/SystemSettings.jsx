import React, { useState } from "react";

const rolesData = [
  {
    role: "Super Admin",
    employees: "Full",
    payroll: "Full",
    settings: "Full",
  },
  {
    role: "HR Manager",
    employees: "Read/Write",
    payroll: "Full",
    settings: "None",
  },
  {
    role: "HR Executive",
    employees: "Read Only",
    payroll: "None",
    settings: "None",
  },
];

const badgeStyle = (val) => {
  switch (val) {
    case "Full":
      return "bg-green-500/10 text-green-400";
    case "Read/Write":
      return "bg-blue-500/10 text-blue-400";
    case "Read Only":
      return "bg-indigo-500/10 text-indigo-400";
    default:
      return "bg-gray-500/10 text-gray-400";
  }
};

const SystemSettings = () => {
  const [roles, setRoles] = useState(rolesData);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRole, setNewRole] = useState("");

  const [departments, setDepartments] = useState([
    "Engineering",
    "HR",
    "Finance",
    "Marketing",
    "Operations",
  ]);
  const [newDept, setNewDept] = useState("");

  const [toggles, setToggles] = useState({
    email: true,
    biometric: false,
    twofa: true,
    payroll: false,
    portal: true,
  });

  const [company, setCompany] = useState({
    name: "",
    email: "",
    industry: "Technology",
    year: "April (India)",
  });

  const toggleHandler = (key) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  const addDept = () => {
    if (!newDept.trim()) return;
    setDepartments([...departments, newDept]);
    setNewDept("");
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-4 md:p-8 md:ml-64 space-y-6 mt-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-gray-400 text-sm">
            Manage roles, departments and configuration
          </p>
        </div>

        <button
          onClick={() => alert("All Settings Saved ✅")}
          className="bg-indigo-600 px-4 py-2 rounded-lg text-sm cursor-pointer"
        >
          Save All Changes
        </button>
      </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ROLES */}
        <div className="bg-[#111827] border border-gray-700 rounded-xl p-4">
          <h2 className="font-semibold mb-4">Roles & Permissions</h2>

          <div className="space-y-3">
            {roles.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center text-sm border-b border-gray-800 pb-2"
              >
                {editingIndex === i ? (
                  <input
                    value={r.role}
                    onChange={(e) => {
                      const updated = [...roles];
                      updated[i].role = e.target.value;
                      setRoles(updated);
                    }}
                    className="bg-[#020617] border border-gray-700 px-2 py-1 rounded"
                  />
                ) : (
                  <p className="font-medium">{r.role}</p>
                )}

                <span className={`px-2 py-1 rounded text-xs ${badgeStyle(r.employees)}`}>
                  {r.employees}
                </span>

                <span className={`px-2 py-1 rounded text-xs ${badgeStyle(r.payroll)}`}>
                  {r.payroll}
                </span>

                <span className={`px-2 py-1 rounded text-xs ${badgeStyle(r.settings)}`}>
                  {r.settings}
                </span>

                {editingIndex === i ? (
                  <button
                    onClick={() => {
                      setEditingIndex(null);
                      alert("Role Updated ✅");
                    }}
                    className="bg-green-600 px-2 py-1 rounded text-xs cursor-pointer"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingIndex(i)}
                    className="bg-gray-700 px-2 py-1 rounded text-xs cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ADD ROLE */}
          <div className="flex gap-2 mt-4">
            <input
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="New Role"
              className="flex-1 bg-[#020617] border border-gray-700 px-3 py-2 rounded-lg text-sm"
            />

            <button
              onClick={() => {
                if (!newRole.trim()) return;
                setRoles([
                  ...roles,
                  {
                    role: newRole,
                    employees: "None",
                    payroll: "None",
                    settings: "None",
                  },
                ]);
                setNewRole("");
                alert("Role Added ✅");
              }}
              className="bg-indigo-600 px-4 py-2 rounded text-sm cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* DEPARTMENTS */}
        <div className="bg-[#111827] border border-gray-700 rounded-xl p-4">
          <h2 className="font-semibold mb-4">Departments</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {departments.map((d, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs border border-blue-500 text-blue-400 flex items-center gap-1"
              >
                {d}
                <span
                  onClick={() =>
                    setDepartments(departments.filter((dep) => dep !== d))
                  }
                  className="cursor-pointer text-red-400"
                >
                  ✕
                </span>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              placeholder="Department name"
              className="flex-1 bg-[#020617] border border-gray-700 px-3 py-2 rounded-lg text-sm"
            />
            <button
              onClick={addDept}
              className="bg-indigo-600 px-4 py-2 rounded text-sm cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* SYSTEM CONFIG */}
      <div className="bg-[#111827] border border-gray-700 rounded-xl p-4 space-y-4">
        <h2 className="font-semibold">System Configuration</h2>

        {[
          ["email", "Email Notifications"],
          ["biometric", "Biometric Auto-Attendance"],
          ["twofa", "Two-Factor Authentication"],
          ["payroll", "Auto-generate Payroll"],
          ["portal", "Recruitment Portal"],
        ].map(([key, label]) => (
          <div
            key={key}
            className="flex justify-between items-center border-b border-gray-800 pb-2"
          >
            <p className="text-sm">{label}</p>

            <button
              onClick={() => toggleHandler(key)}
              className={`w-10 h-5 flex items-center rounded-full p-1 ${
                toggles[key] ? "bg-indigo-600" : "bg-gray-600"
              } cursor-pointer`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform transition ${
                  toggles[key] ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* COMPANY INFO */}
      <div className="bg-[#111827] border border-gray-700 rounded-xl p-4 space-y-4">
        <h2 className="font-semibold">Company Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            placeholder="Company Name"
            value={company.name}
            onChange={(e) =>
              setCompany({ ...company, name: e.target.value })
            }
            className="bg-[#020617] border border-gray-700 p-3 rounded-lg"
          />

          <select
            value={company.industry}
            onChange={(e) =>
              setCompany({ ...company, industry: e.target.value })
            }
            className="bg-[#020617] border border-gray-700 p-3 rounded-lg"
          >
            <option>Technology</option>
            <option>Finance</option>
          </select>

          <input
            placeholder="HR Email"
            value={company.email}
            onChange={(e) =>
              setCompany({ ...company, email: e.target.value })
            }
            className="bg-[#020617] border border-gray-700 p-3 rounded-lg"
          />

          <select
            value={company.year}
            onChange={(e) =>
              setCompany({ ...company, year: e.target.value })
            }
            className="bg-[#020617] border border-gray-700 p-3 rounded-lg"
          >
            <option>April (India)</option>
          </select>
        </div>

        <button
          onClick={() => alert("Company Info Updated ✅")}
          className="bg-indigo-600 px-4 py-2 rounded text-sm cursor-pointer"
        >
          Update Info
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;