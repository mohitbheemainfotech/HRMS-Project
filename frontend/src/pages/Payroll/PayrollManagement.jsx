import React, { useState } from "react";

const stats = [
  {
    title: "Total Salary Disbursed",
    value: "₹2.4 Cr",
    sub: "April 2026",
  },
  {
    title: "Employees Processed",
    value: "231",
    sub: "of 248",
  },
  {
    title: "Pending Payslips",
    value: "17",
    sub: "Requires action",
  },
];

const initialEmployees = [
  {
    id: 1,
    name: "Priya Sharma",
    basic: 80000,
    hra: 20000,
    transport: 10000,
    special: 10000,
    pf: 9600,
    tds: 2400,
  },
  {
    id: 2,
    name: "Rahul Kumar",
    basic: 65000,
    hra: 15000,
    transport: 5000,
    special: 5000,
    pf: 7000,
    tds: 2000,
  },
  {
    id: 3,
    name: "Neha Singh",
    basic: 55000,
    hra: 12000,
    transport: 4000,
    special: 4000,
    pf: 6000,
    tds: 2000,
  },
];

const PayrollManagement = () => {
  const [employees] = useState(initialEmployees);
  const [selected, setSelected] = useState(initialEmployees[0]);

  const calculateNet = (emp) => {
    return (
      emp.basic +
      emp.hra +
      emp.transport +
      emp.special -
      emp.pf -
      emp.tds
    );
  };

  const handleDownload = () => {
    alert(`Salary slip for ${selected.name} downloaded`);
  };

  const handleGenerate=()=>{
    alert(`Payroll Generated for April 2026!`);
  }

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-4 md:p-8 md:ml-64 space-y-6 mt-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Payroll Management
          </h1>
          <p className="text-gray-400 text-sm">
            April 2026 — Processing
          </p>
        </div>

        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-lg cursor-pointer" 
        onClick={handleGenerate}>
          Generate Payroll
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-[#111827] border border-gray-700 p-5 rounded-xl"
          >
            <p className="text-gray-400 text-sm">{s.title}</p>
            <h2 className="text-2xl font-bold mt-2">{s.value}</h2>
            <p className="text-green-400 text-sm mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TABLE */}
        <div className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden">

          <div className="flex justify-between items-center p-4">
            <h2 className="font-semibold text-lg">Salary Table</h2>

            <select className="bg-[#020617] border border-gray-700 px-3 py-2 rounded-lg text-sm cursor-pointer">
              <option>March 2026</option>
              <option>April 2026</option>
              <option>May 2026</option>
            </select>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-[#020617] text-gray-400">
              <tr>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3">Basic</th>
                <th className="p-3">Allow.</th>
                <th className="p-3">Deduct.</th>
                <th className="p-3">Net</th>
                <th className="p-3"></th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => {
                const allow =
                  emp.hra + emp.transport + emp.special;
                const deduct = emp.pf + emp.tds;
                const net = calculateNet(emp);

                return (
                  <tr
                    key={emp.id}
                    onClick={() => setSelected(emp)}
                    className="border-t border-gray-800 cursor-pointer hover:bg-[#1f2937]"
                  >
                    <td className="p-3">{emp.name}</td>
                    <td className="p-3">₹{emp.basic}</td>
                    <td className="p-3">₹{allow}</td>
                    <td className="p-3">₹{deduct}</td>
                    <td className="p-3 text-green-400 font-semibold">
                      ₹{net}
                    </td>
                    <td className="p-3">
                      <button className="bg-[#1f2937] px-3 py-1 rounded text-xs cursor-pointer">
                        Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SLIP PREVIEW */}
        {selected && (
          <div className="bg-[#111827] border border-gray-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">
              Salary Slip Preview — {selected.name}
            </h2>

            <div className="bg-[#020617] border border-gray-700 rounded-lg p-4 space-y-2 text-sm">
              <Row label="Basic Salary" value={selected.basic} />
              <Row label="HRA" value={selected.hra} />
              <Row label="Transport Allowance" value={selected.transport} />
              <Row label="Special Allowance" value={selected.special} />
              <Row label="PF Deduction" value={-selected.pf} red />
              <Row label="TDS" value={-selected.tds} red />

              <hr className="border-gray-700 my-2" />

              <Row
                label="Net Salary"
                value={calculateNet(selected)}
                green
              />
            </div>

            <button
              onClick={handleDownload}
              className="w-full mt-5 bg-gradient-to-r from-indigo-500 to-purple-600 py-2 rounded-lg"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function Row({ label, value, red, green }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span
        className={`${
          red
            ? "text-red-400"
            : green
            ? "text-green-400 font-semibold"
            : ""
        }`}
      >
        {value < 0
          ? `-₹${Math.abs(value)}`
          : `₹${value}`}
      </span>
    </div>
  );
}

export default PayrollManagement;