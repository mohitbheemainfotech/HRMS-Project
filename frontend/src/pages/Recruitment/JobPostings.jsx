import React, { useEffect, useState } from "react";
import API from "../../api.js";

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    dept: "Engineering",
    date: "",
    status: "Open",
    desc: "",
  });

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async () => {
    if (!form.title) return;

    try {
      if (editId) {
        const res = await API.put(`/jobs/${editId}`, {
          ...form,
          posted: form.date || "Today",
        });

        setJobs(jobs.map(j => (j._id === editId ? res.data : j)));
      } else {
        const res = await API.post("/jobs", {
          ...form,
          posted: form.date || "Today",
        });

        setJobs([res.data, ...jobs]);
      }

      setForm({
        title: "",
        dept: "Engineering",
        date: "",
        status: "Open",
        desc: "",
      });

      setEditId(null);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (job) => {
    setForm({
      title: job.title,
      dept: job.dept,
      date: job.posted,
      status: job.status,
      desc: job.desc || "",
    });

    setEditId(job._id);
    setShowForm(true);
  };

  const handleApply = async (id) => {
    const name = prompt("Enter your name");
    const email = prompt("Enter your email");

    if (!name || !email) return;

    try {
      await API.post(`/jobs/${id}/apply`, {
        name,
        email,
        resume: "uploaded.pdf",
      });

      alert("Applied Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-3 sm:p-4 md:p-8 md:ml-64 space-y-6 mt-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Job Postings
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Manage your jobs
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-lg text-sm hover:opacity-90"
        >
          {showForm ? "Close" : "+ Post New Job"}
        </button>

      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-[#111827] border border-gray-700 rounded-xl p-4 sm:p-6 space-y-5 shadow-lg">

          <h2 className="text-base sm:text-lg font-semibold">
            {editId ? "Edit Job" : "Post New Job"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Job Title"
              className="bg-[#020617] border border-gray-700 p-3 rounded-lg outline-none w-full"
            />

            <select
              value={form.dept}
              onChange={(e) => setForm({ ...form, dept: e.target.value })}
              className="bg-[#020617] border border-gray-700 p-3 rounded-lg w-full"
            >
              <option>Engineering</option>
              <option>HR</option>
              <option>Product</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-[#020617] border border-gray-700 p-3 rounded-lg w-full"
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="bg-[#020617] border border-gray-700 p-3 rounded-lg w-full"
            >
              <option>Open</option>
              <option>Closed</option>
            </select>

          </div>

          <textarea
            placeholder="Job Description..."
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="w-full bg-[#020617] border border-gray-700 p-3 rounded-lg h-28"
          />

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-indigo-600 px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
            >
              {editId ? "Update Job" : "Post Job"}
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="w-full sm:w-auto border border-gray-600 px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden">

        {/* ✅ horizontal scroll for mobile */}
        <div className="overflow-x-auto">

          <table className="min-w-[600px] w-full text-sm">

            <thead className="text-gray-400 border-b border-gray-700 text-xs uppercase">
              <tr>
                <th className="p-3 sm:p-4 text-left">Job</th>
                <th className="p-3 sm:p-4 text-left">Dept</th>
                <th className="p-3 sm:p-4 text-left">Posted</th>
                <th className="p-3 sm:p-4 text-left">Status</th>
                <th className="p-3 sm:p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-b border-gray-800 hover:bg-[#1f2937]">

                  <td className="p-3 sm:p-4">{job.title}</td>
                  <td className="p-3 sm:p-4">{job.dept}</td>
                  <td className="p-3 sm:p-4">{job.posted}</td>

                  <td className="p-3 sm:p-4">
                    <span className="px-2 sm:px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400">
                      {job.status}
                    </span>
                  </td>

                  <td className="p-3 sm:p-4">
                    <div className="flex flex-wrap gap-2">

                      <button
                        onClick={() => handleApply(job._id)}
                        className="bg-blue-500 px-2 py-1 rounded text-xs"
                      >
                        Apply
                      </button>

                      <button
                        onClick={() => handleEdit(job)}
                        className="bg-yellow-500 px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-500 px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>

                    </div>
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

export default JobPostings;