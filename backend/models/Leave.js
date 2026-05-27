import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "Annual",
    },

    from: {
      type: Date,
      required: true,
    },

    to: {
      type: Date,
      required: true,
    },

    days: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Leave =
  mongoose.models.Leave ||
  mongoose.model("Leave", leaveSchema);

export default Leave;