import express from "express";

import {
  getApplications,
  applyJob,
  updateApplicationStatus,
} from "../controllers/applicantController.js";

const applicantRouter = express.Router();

// GET ALL APPLICANTS
applicantRouter.get("/", getApplications);

// APPLY JOB
applicantRouter.post("/:id/apply", applyJob);

// UPDATE STATUS
applicantRouter.put("/:id", updateApplicationStatus);

export default applicantRouter;