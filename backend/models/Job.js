import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    dept: {
      type: String,
      required: true,
      default: "Engineering",
    },

    posted: {
      type: String,
      default: "Today",
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },

    desc: {
      type: String,
      default: "",
    },

    applicants: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Job =
  mongoose.models.Job ||
  mongoose.model("Job", jobSchema);

export default Job;