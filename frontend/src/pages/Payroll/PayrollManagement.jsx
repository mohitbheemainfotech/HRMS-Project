import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api.js";

const PayrollManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);

  const [stats, setStats] = useState({
    totalSalary: 0,
    processed: 0,
    pending: 0,
  });

  const navigate = useNavigate();

  // ✅ FETCH EMPLOYEES
  const fetchPayroll = async () => {
    try {
      const res = await API.get("/employees");

      // console.log("EMPLOYEE DATA:", res.data);

      // ✅ HANDLE DIFFERENT RESPONSE STRUCTURES
      const employeeData = Array.isArray(res.data)
        ? res.data
        : res.data?.employees || [];

      // ✅ ADD PAYROLL FIELDS FROM SALARY
      const updatedEmployees = employeeData.map((emp) => {
        const basic = Number(emp.salary || 0);

        return {
          ...emp,

          // ✅ FULL NAME
          name:
            `${emp.firstName || ""} ${emp.lastName || ""}`.trim() ||
            emp.name,

          // ✅ PAYROLL BREAKDOWN
          basic,
          hra: Math.round(basic * 0.2),
          transport: 3000,
          special: Math.round(basic * 0.1),
          pf: Math.round(basic * 0.12),
          tds: Math.round(basic * 0.05),
        };
      });

      setEmployees(updatedEmployees);

      if (updatedEmployees.length > 0) {
        setSelected(updatedEmployees[0]);
      }

      // ✅ CALCULATE TOTAL SALARY
      const totalSalary = updatedEmployees.reduce((sum, emp) => {
        return (
          sum +
          (emp.basic +
            emp.hra +
            emp.transport +
            emp.special -
            emp.pf -
            emp.tds)
        );
      }, 0);

      setStats({
        totalSalary,
        processed: updatedEmployees.length,
        pending: Math.max(0, 250 - updatedEmployees.length),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  // ✅ NET SALARY
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

  // ✅ DOWNLOAD SLIP
  const handleDownload = (emp) => {
    alert(`Salary slip for ${emp.name} downloaded ✅`);
  };

  // ✅ GENERATE PAYROLL
  const handleGenerate = () => {
    alert("Payroll Generated Successfully ✅");
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-4 md:p-8 md:ml-64 space-y-6 mt-8">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="md:hidden border border-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
      >
        ← Back
      </button>

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

        <button
          className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-lg cursor-pointer hover:opacity-90"
          onClick={handleGenerate}
        >
          Generate Payroll
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-[#111827] border border-gray-700 p-5 rounded-xl">
          <p className="text-gray-400 text-sm">
            Total Salary Disbursed
          </p>

          <h2 className="text-2xl font-bold mt-2">
            ₹{stats.totalSalary.toLocaleString()}
          </h2>

          <p className="text-green-400 text-sm mt-1">
            April 2026
          </p>
        </div>

        <div className="bg-[#111827] border border-gray-700 p-5 rounded-xl">
          <p className="text-gray-400 text-sm">
            Employees Processed
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {stats.processed}
          </h2>

          <p className="text-green-400 text-sm mt-1">
            Payroll Completed
          </p>
        </div>

        <div className="bg-[#111827] border border-gray-700 p-5 rounded-xl">
          <p className="text-gray-400 text-sm">
            Pending Payslips
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {stats.pending}
          </h2>

          <p className="text-red-400 text-sm mt-1">
            Requires action
          </p>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TABLE */}
        <div className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden">

          <div className="flex justify-between items-center p-4">
            <h2 className="font-semibold text-lg">
              Salary Table
            </h2>

            <select className="bg-[#020617] border border-gray-700 px-3 py-2 rounded-lg text-sm cursor-pointer">
              <option>March 2026</option>
              <option>April 2026</option>
              <option>May 2026</option>
            </select>
          </div>

          <div className="overflow-x-auto">
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
                {employees.length > 0 ? (
                  employees.map((emp) => {
                    const allow =
                      emp.hra +
                      emp.transport +
                      emp.special;

                    const deduct =
                      emp.pf + emp.tds;

                    const net = calculateNet(emp);

                    return (
                      <tr
                        key={emp._id}
                        onClick={() => setSelected(emp)}
                        className="border-t border-gray-800 cursor-pointer hover:bg-[#1f2937]"
                      >
                        <td className="p-3">
                          {emp.name}
                        </td>

                        <td className="p-3">
                          ₹{emp.basic}
                        </td>

                        <td className="p-3">
                          ₹{allow}
                        </td>

                        <td className="p-3">
                          ₹{deduct}
                        </td>

                        <td className="p-3 text-green-400 font-semibold">
                          ₹{net}
                        </td>

                        <td className="p-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(emp);
                            }}
                            className="bg-[#1f2937] px-3 py-1 rounded text-xs cursor-pointer hover:bg-[#374151]"
                          >
                            Slip
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-6 text-center text-gray-400"
                    >
                      No Employee Data Found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* SLIP PREVIEW */}
        {selected && (
          <div className="bg-[#111827] border border-gray-700 rounded-xl p-5">

            <h2 className="text-lg font-semibold mb-4">
              Salary Slip Preview — {selected.name}
            </h2>

            <div className="bg-[#020617] border border-gray-700 rounded-lg p-4 space-y-2 text-sm">

              <Row
                label="Basic Salary"
                value={selected.basic}
              />

              <Row
                label="HRA"
                value={selected.hra}
              />

              <Row
                label="Transport Allowance"
                value={selected.transport}
              />

              <Row
                label="Special Allowance"
                value={selected.special}
              />

              <Row
                label="PF Deduction"
                value={-selected.pf}
                red
              />

              <Row
                label="TDS"
                value={-selected.tds}
                red
              />

              <hr className="border-gray-700 my-2" />

              <Row
                label="Net Salary"
                value={calculateNet(selected)}
                green
              />
            </div>

            <button
              onClick={() => handleDownload(selected)}
              className="w-full mt-5 bg-gradient-to-r from-indigo-500 to-purple-600 py-2 rounded-lg hover:opacity-90"
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
      <span className="text-gray-400">
        {label}
      </span>

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