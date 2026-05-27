import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    resume: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      required: true,
    },

    date: {
      type: String,
    },

    status: {
      type: String,
      default: "Applied",
    },
  },
  {
    timestamps: true,
  }
);

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant; 