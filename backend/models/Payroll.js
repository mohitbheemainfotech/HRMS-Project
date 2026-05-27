import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    basic: {
      type: Number,
      required: true,
    },

    hra: {
      type: Number,
      required: true,
    },

    transport: {
      type: Number,
      required: true,
    },

    special: {
      type: Number,
      required: true,
    },

    pf: {
      type: Number,
      required: true,
    },

    tds: {
      type: Number,
      required: true,
    },

    month: {
      type: String,
      default: "April 2026",
    },
  },
  { timestamps: true }
);

const Payroll =
  mongoose.models.Payroll ||
  mongoose.model("Payroll", payrollSchema);

export default Payroll;