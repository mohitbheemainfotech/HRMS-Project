import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    dept: String,
    posted: { type: String, default: "Today" },
    status: { type: String, default: "Open" },
    desc: String,

    applicants: [
      {
        name: String,
        email: String,
        resume: String,
        appliedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);