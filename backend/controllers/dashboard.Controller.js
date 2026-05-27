// controllers/dashboard.controller.js

import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import Job from "../models/Job.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Employees
    const totalEmployees = await Employee.countDocuments();

    const activeEmployees = await Employee.countDocuments({
      status: "Active",
    });

    // Pending Leaves
    const pendingLeaves = await Leave.countDocuments({
      status: "Pending",
    });

    // Open Jobs
    const openJobs = await Job.countDocuments({
      status: "Open",
    });

    res.status(200).json({
      stats: {
        totalEmployees,
        activeEmployees,
        pendingLeaves,
        openJobs,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};