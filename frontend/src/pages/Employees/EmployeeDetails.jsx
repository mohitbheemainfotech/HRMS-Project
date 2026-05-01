import React, { useEffect, useState } from "react";
import API from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEmployee = async () => {
    try {
      const res = await API.get(`/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      console.log(err);
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-[#0b1220] text-red-400 flex items-center justify-center">
        Employee not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-4 sm:p-6 md:p-8 md:ml-64 mt-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Employee Details
          </h1>
          <p className="text-gray-400 text-sm">
            View full employee information
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-700"
          >
            Back
          </button>

          <button
            onClick={() =>
              navigate(`/dashboard/employees/edit/${employee._id}`)
            }
            className="bg-yellow-500 text-black px-4 py-2 rounded text-sm hover:opacity-90"
          >
            Edit
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PERSONAL INFO */}
        <div className="bg-[#111827] border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Personal Info</h2>

          <div className="space-y-3 text-sm text-gray-300">

            <p>
              <span className="text-gray-400">Name:</span>{" "}
              {employee.firstName} {employee.lastName}
            </p>

            <p>
              <span className="text-gray-400">Email:</span> {employee.email}
            </p>

            <p>
              <span className="text-gray-400">Phone:</span>{" "}
              {employee.phone || "N/A"}
            </p>

            <p>
              <span className="text-gray-400">Address:</span>{" "}
              {employee.address || "N/A"}
            </p>

          </div>
        </div>

        {/* JOB INFO */}
        <div className="bg-[#111827] border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Job Info</h2>

          <div className="space-y-3 text-sm text-gray-300">

            <p>
              <span className="text-gray-400">Department:</span>{" "}
              {employee.department}
            </p>

            <p>
              <span className="text-gray-400">Designation:</span>{" "}
              {employee.designation}
            </p>

            <p>
              <span className="text-gray-400">Role:</span>{" "}
              {employee.role || "N/A"}
            </p>

            <p>
              <span className="text-gray-400">Joining Date:</span>{" "}
              {employee.joiningDate
                ? employee.joiningDate.split("T")[0]
                : "N/A"}
            </p>

            <p>
              <span className="text-gray-400">Salary:</span> ₹
              {employee.salary || "N/A"}
            </p>

            <p>
              <span className="text-gray-400">Status:</span>{" "}
              <span
                className={`px-2 py-1 text-xs rounded ${
                  employee.status === "Active"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {employee.status}
              </span>
            </p>

          </div>
        </div>

      </div>

      {/* DOCUMENTS */}
      <div className="mt-6 bg-[#111827] border border-gray-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4">Documents</h2>

        {employee.documents && employee.documents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

            {employee.documents.map((doc, index) => (
              <a
                key={index}
                href={`http://localhost:5000${doc.url}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#1f2937] p-3 rounded hover:bg-gray-700 text-sm"
              >
                📄 {doc.name}
              </a>
            ))}

          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            No documents uploaded
          </p>
        )}
      </div>

    </div>
  );
};

export default EmployeeDetails;