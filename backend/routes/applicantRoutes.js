import express from "express";
import {
  getApplications,
  applyJob,
  updateApplicationStatus,
} from "../controllers/applicantsController.js";

const applicantRoutes = express.Router();

applicantRoutes.get("/", getApplications);
applicantRoutes.post("/", applyJob);
applicantRoutes.put("/:id", updateApplicationStatus);

export default applicantRoutes;