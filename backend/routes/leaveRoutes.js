import express from "express";

import {
  getLeaves,
  createLeave,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

const leaveRoutes = express.Router();

leaveRoutes.get("/", getLeaves);
leaveRoutes.post("/", createLeave);
leaveRoutes.put("/:id", updateLeaveStatus);

export default leaveRoutes;