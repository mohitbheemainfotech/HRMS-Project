import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
} from "../controllers/jobController.js";

const jobRoutes = express.Router();

// GET all jobs
jobRoutes.get("/", getJobs);

// GET single job (optional but useful)
jobRoutes.get("/:id", getJobById);

// CREATE job
jobRoutes.post("/", createJob);

// UPDATE job
jobRoutes.put("/:id", updateJob);

// DELETE job
jobRoutes.delete("/:id", deleteJob);

/**
 * APPLY JOB ROUTE
 * user applies for a job
 */
jobRoutes.post("/:id/apply", applyJob);

export default jobRoutes;