import React, { useEffect, useState } from "react";
import API from "../../api.js";

const ApplicantTracking = () => {
  const [applicants, setApplicants] = useState([]);
  const [activeTab, setActiveTab] = useState("All Applicants");
  const [search, setSearch] = useState("");

  const tabs = [
    "All Applicants",
    "Senior React Developer",
    "HR Business Partner",
    "Product Manager",
  ];

  // GET APPLICANTS
  const fetchApplicants = async () => {
    try {
      const res = await API.get("/applicant");
      setApplicants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/applicant/${id}`, { status });

      setApplicants(
        applicants.map((app) =>
          app._id === id ? res.data : app
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // FILTER
  const filteredData = applicants.filter((app) => {
    const matchTab =
      activeTab === "All Applicants" || app.role === activeTab;

    const matchSearch =
      app.name?.toLowerCase().includes(search.toLowerCase()) ||
      app.email?.toLowerCase().includes(search.toLowerCase());

    return matchTab && matchSearch;
  });

  return (
    <div className="p-4 md:p-8 text-white space-y-6 md:ml-64">

      {/* HEADER */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold">
          Applicant Tracking
        </h1>
        <p className="text-gray-400 text-sm">
          {applicants.length} total applicants
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm border ${
              activeTab === tab
                ? "border-blue-500 text-blue-400"
                : "border-gray-700 text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTAINER */}
      <div className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden">

        {/* SEARCH */}
        <div className="flex justify-between p-4 border-b border-gray-700">
          <h2 className="font-semibold">Candidates</h2>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-[#020617] border border-gray-700 px-3 py-2 rounded-lg text-sm"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="text-gray-400 border-b border-gray-700 text-xs uppercase">
              <tr>
                <th className="p-4 text-left">Candidate</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((app) => (
                <tr key={app._id} className="border-b border-gray-800">

                  <td className="p-4">
                    <p>{app.name}</p>
                    <p className="text-xs text-gray-400">{app.email}</p>
                  </td>

                  <td className="p-4">{app.role}</td>
                  <td className="p-4">{app.date}</td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400">
                      {app.status}
                    </span>
                  </td>

                  <td className="p-4 space-x-2">

                    <button
                      onClick={() => updateStatus(app._id, "Shortlisted")}
                      className="bg-blue-500 px-3 py-1 rounded text-xs text-black"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() => updateStatus(app._id, "Hired")}
                      className="bg-green-500 px-3 py-1 rounded text-xs text-black"
                    >
                      Hire
                    </button>

                    <button
                      onClick={() => updateStatus(app._id, "Rejected")}
                      className="bg-red-500 px-3 py-1 rounded text-xs"
                    >
                      Reject
                    </button>

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

export default ApplicantTracking;