import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: String, // job title
    resume: String,

    status: {
      type: String,
      default: "Under Review",
      enum: ["Under Review", "Shortlisted", "Hired", "Rejected"],
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Applicant", applicantSchema);