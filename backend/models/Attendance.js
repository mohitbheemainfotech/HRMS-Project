import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeName: String,
  department: String,
  date: String,
  checkIn: String,
  checkOut: String,
  status: {
    type: String,
    enum: ["Present", "Absent", "Half Day"],
    default: "Present",
  },
  remarks: String,
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);