import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    department: String,
    designation: String,
    role: String,
    salary: Number,
    joiningDate: Date,
    status: {
      type: String,
      default: "Active",
    },
    documents: [
      {
        name: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);