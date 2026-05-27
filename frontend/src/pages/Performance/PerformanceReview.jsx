import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api.js";

const PerformanceReview = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employee: "",
    reviewer: "",
    period: "Q1 2026",
    rating: "",
    comments: "",
  });

  // ✅ FETCH REVIEWS
  const fetchReviews = async () => {
    try {
      const res = await API.get("/performance-review");
      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ✅ SUBMIT
  const handleSubmit = async () => {
    if (!form.employee || !form.reviewer || !form.rating) return;

    try {
      if (editId) {
        const res = await API.put(
          `/performance-review/${editId}`,
          {
            ...form,
            rating: Number(form.rating),
          }
        );

        setReviews((prev) =>
          prev.map((r) =>
            r._id === editId ? res.data : r
          )
        );

      } else {
        const res = await API.post(
          "/performance-review",
          {
            ...form,
            rating: Number(form.rating),
          }
        );

        setReviews([res.data, ...reviews]);
      }

      resetForm();

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ RESET
  const resetForm = () => {
    setShowForm(false);
    setEditId(null);

    setForm({
      employee: "",
      reviewer: "",
      period: "Q1 2026",
      rating: "",
      comments: "",
    });
  };

  // ✅ EDIT
  const handleEdit = (review) => {
    setForm({
      employee: review.employee,
      reviewer: review.reviewer,
      period: review.period,
      rating: review.rating,
      comments: review.comments,
    });

    setEditId(review._id);
    setShowForm(true);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/performance-review/${id}`);

      setReviews(
        reviews.filter((r) => r._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  // ⭐ STARS
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    return (
      <span className="text-yellow-400">
        {"★".repeat(full)}
        {half ? "☆" : ""}
        {"☆".repeat(5 - full - (half ? 1 : 0))}
        <span className="text-gray-300 ml-1">
          {rating}
        </span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-4 md:p-8 md:ml-64 space-y-6 mt-8">

      <button
        onClick={() => navigate(-1)}
        className="md:hidden border border-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Performance Reviews
          </h1>

          <p className="text-gray-400 text-sm">
            Q1 2026 Appraisals
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
          }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-lg text-sm cursor-pointer"
        >
          {showForm ? "Close" : "+ Add Review"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-[#111827] border border-gray-700 rounded-xl p-6 space-y-4">

          <h2 className="text-lg font-semibold">
            {editId ? "Edit Review" : "Add Review"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              placeholder="Employee Name"
              value={form.employee}
              onChange={(e) =>
                setForm({
                  ...form,
                  employee: e.target.value,
                })
              }
              className="input"
            />

            <input
              placeholder="Reviewer Name"
              value={form.reviewer}
              onChange={(e) =>
                setForm({
                  ...form,
                  reviewer: e.target.value,
                })
              }
              className="input"
            />

            <select
              value={form.period}
              onChange={(e) =>
                setForm({
                  ...form,
                  period: e.target.value,
                })
              }
              className="input"
            >
              <option>Q1 2026</option>
              <option>Q2 2026</option>
              <option>Q3 2026</option>
              <option>Q4 2026</option>
            </select>

            <input
              type="number"
              step="0.1"
              max="5"
              placeholder="Rating"
              value={form.rating}
              onChange={(e) =>
                setForm({
                  ...form,
                  rating: e.target.value,
                })
              }
              className="input"
            />
          </div>

          <textarea
            placeholder="Comments"
            value={form.comments}
            onChange={(e) =>
              setForm({
                ...form,
                comments: e.target.value,
              })
            }
            className="input w-full"
          />

          <div className="flex gap-3">

            <button
              onClick={handleSubmit}
              className="bg-indigo-600 px-5 py-2 rounded-lg cursor-pointer"
            >
              {editId ? "Update" : "Submit"}
            </button>

            <button
              onClick={resetForm}
              className="border border-gray-600 px-5 py-2 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden">

        {/* DESKTOP */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-[#020617] text-gray-400">
              <tr>
                <th className="p-3 text-left">
                  Employee
                </th>

                <th className="p-3">
                  Reviewer
                </th>

                <th className="p-3">
                  Period
                </th>

                <th className="p-3">
                  Rating
                </th>

                <th className="p-3">
                  Comments
                </th>

                <th className="p-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((r) => (
                <tr
                  key={r._id}
                  className="border-t border-gray-800"
                >
                  <td className="p-3">
                    {r.employee}
                  </td>

                  <td className="p-3 text-blue-300">
                    {r.reviewer}
                  </td>

                  <td className="p-3">
                    {r.period}
                  </td>

                  <td className="p-3">
                    {renderStars(r.rating)}
                  </td>

                  <td className="p-3">
                    {r.comments}
                  </td>

                  <td className="p-3 space-x-2">

                    <button
                      onClick={() => setViewData(r)}
                      className="bg-[#1f2937] px-3 py-1 rounded text-xs cursor-pointer"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleEdit(r)}
                      className="bg-yellow-500 px-3 py-1 rounded text-xs cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(r._id)
                      }
                      className="bg-red-500 px-3 py-1 rounded text-xs cursor-pointer"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* MOBILE */}
        <div className="md:hidden divide-y divide-gray-800">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="p-4 space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  {r.employee}
                </span>

                <span className="text-xs text-gray-400">
                  {r.period}
                </span>
              </div>

              <div className="text-blue-300 text-sm">
                Reviewer: {r.reviewer}
              </div>

              <div>
                {renderStars(r.rating)}
              </div>

              <div className="text-gray-300 text-sm">
                {r.comments}
              </div>

              <div className="flex gap-2 pt-2">

                <button
                  onClick={() => setViewData(r)}
                  className="flex-1 bg-[#1f2937] py-1 rounded text-xs"
                >
                  View
                </button>

                <button
                  onClick={() => handleEdit(r)}
                  className="flex-1 bg-yellow-500 py-1 rounded text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(r._id)
                  }
                  className="flex-1 bg-red-500 py-1 rounded text-xs"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-[#111827] p-6 rounded-xl w-[90%] max-w-md space-y-3">

            <h2 className="text-lg font-semibold">
              Review Details
            </h2>

            <p>
              <b>Employee:</b> {viewData.employee}
            </p>

            <p>
              <b>Reviewer:</b> {viewData.reviewer}
            </p>

            <p>
              <b>Period:</b> {viewData.period}
            </p>

            <p>
              <b>Rating:</b> {viewData.rating}
            </p>

            <p>
              <b>Comments:</b> {viewData.comments}
            </p>

            <button
              onClick={() => setViewData(null)}
              className="mt-3 bg-indigo-600 px-4 py-2 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            background: #020617;
            border: 1px solid #374151;
            padding: 10px;
            border-radius: 8px;
          }
        `}
      </style>
    </div>
  );
};

export default PerformanceReview;