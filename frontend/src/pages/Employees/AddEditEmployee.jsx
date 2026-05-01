import React, { useState, useEffect } from "react";
import API from "../../api.js";
import { useNavigate, useParams } from "react-router-dom";

const AddEditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    role: "",
    salary: "",
    joiningDate: "",
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH FOR EDIT
  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const res = await API.get(`/employees/${id}`);
          setForm({
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            department: res.data.department || "",
            designation: res.data.designation || "",
            role: res.data.role || "",
            salary: res.data.salary || "",
            joiningDate: res.data.joiningDate
              ? res.data.joiningDate.split("T")[0]
              : "",
          });
        } catch (err) {
          console.log(err);
        }
      };

      fetchEmployee();
    }
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // FILE CHANGE
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // VALIDATION
  const validate = () => {
    let err = {};

    if (!form.firstName) err.firstName = "First name required";
    if (!form.email) err.email = "Email required";
    if (!form.department) err.department = "Department required";
    if (!form.designation) err.designation = "Designation required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      files.forEach((file) => {
        formData.append("documents", file);
      });

      if (id) {
        await API.put(`/employees/${id}`, formData);
      } else {
        await API.post("/employees", formData);
      }

      navigate("/dashboard/employees");
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="md:ml-64 min-h-screen bg-[#0b1220] text-white p-4 mt-8 md:p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-2xl font-bold">
            {id ? "Edit Employee" : "Add Employee"}
          </h1>
          <p className="text-gray-400 text-sm">
            Fill in employee details
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="border border-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
        >
          ← Back
        </button>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] border border-gray-700 rounded-xl p-6 space-y-6"
      >

        {/* PERSONAL */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="bg-[#1f2937] p-2 rounded"
            />
            {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="bg-[#1f2937] p-2 rounded"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-[#1f2937] p-2 rounded"
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="bg-[#1f2937] p-2 rounded"
            />

          </div>
        </div>

        {/* JOB */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Job Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Department"
              className="bg-[#1f2937] p-2 rounded"
            />
            {errors.department && <p className="text-red-400 text-xs">{errors.department}</p>}

            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="bg-[#1f2937] p-2 rounded"
            />
            {errors.designation && <p className="text-red-400 text-xs">{errors.designation}</p>}

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="bg-[#1f2937] p-2 rounded"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>

            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="bg-[#1f2937] p-2 rounded"
            />

            <input
              name="joiningDate"
              type="date"
              value={form.joiningDate}
              onChange={handleChange}
              className="bg-[#1f2937] p-2 rounded"
            />

          </div>
        </div>

        {/* FILES */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Documents</h2>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 justify-end">

          <button
            type="button"
            onClick={() => navigate("/dashboard/employees")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 px-6 py-2 rounded"
          >
            {loading ? "Saving..." : id ? "Update" : "Add"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddEditEmployee;