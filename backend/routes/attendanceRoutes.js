import express from "express";
import {
  getAttendance,
  markAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";

const attendanceRoutes = express.Router();

attendanceRoutes.get("/", getAttendance);
attendanceRoutes.post("/", markAttendance);
attendanceRoutes.put("/:id", updateAttendance);
attendanceRoutes.delete("/:id", deleteAttendance);

export default attendanceRoutes;