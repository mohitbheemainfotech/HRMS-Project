import React, { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await API.get("/employees", {
        params: {
          search,
          department,
          designation,
          status,
          page,
          limit: 5,
        },
      });

      setEmployees(res.data.employees);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, department, designation, status, page]);

  useEffect(() => {
    setPage(1);
  }, [search, department, designation, status]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;

    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white mt-8 p-4 sm:p-6 md:p-8 md:ml-64">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">

        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            Employee Directory
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Manage all employees in your organization
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
          >
            ← Back
          </button>

          <button
            onClick={() => navigate("/dashboard/employees/add")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-lg text-sm hover:opacity-90"
          >
            + Add Employee
          </button>
        </div>

      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

        <input
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#111827] border border-gray-700 p-2 rounded-lg text-sm outline-none"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="bg-[#111827] border border-gray-700 p-2 rounded-lg text-sm"
        >
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
        </select>

        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="bg-[#111827] border border-gray-700 p-2 rounded-lg text-sm"
        >
          <option value="">All Designations</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-[#111827] border border-gray-700 p-2 rounded-lg text-sm"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      {/* TABLE CARD */}
      <div className="bg-[#111827] border border-gray-700 rounded-xl shadow-lg overflow-hidden">

        {/* HEADER BAR */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="font-semibold">All Employees</h2>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="min-w-[700px] w-full text-sm">

            <thead className="text-gray-400 uppercase text-xs border-b border-gray-700">
              <tr>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Designation</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : employees.length > 0 ? (

                employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border-b border-gray-800 hover:bg-[#1f2937]"
                  >

                    {/* EMPLOYEE */}
                    <td className="p-4">
                      <p className="font-medium">
                        {emp.firstName} {emp.lastName}
                      </p>
                      <p className="text-xs text-gray-400">{emp.email}</p>
                    </td>

                    <td className="p-4">{emp.department}</td>
                    <td className="p-4">{emp.designation}</td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${emp.status === "Active"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                          }`}
                      >
                        ● {emp.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => navigate(`/dashboard/employees/${emp._id}`)}
                          className="bg-gray-700 px-3 py-1 rounded text-xs"
                        >
                          View
                        </button>

                        <button
                          onClick={() => navigate(`/dashboard/employees/edit/${emp._id}`)}
                          className="bg-yellow-500 px-3 py-1 rounded text-xs text-black"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="bg-red-500 px-3 py-1 rounded text-xs"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))

              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-400">
                    No employees found
                  </td>
                </tr>
              )}

            </tbody>
          </table>

        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center mt-6 gap-3">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-700 px-4 py-1 rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm text-gray-400">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-700 px-4 py-1 rounded disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default EmployeeList;