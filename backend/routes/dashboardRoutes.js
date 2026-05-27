// routes/dashboard.routes.js

import express from "express";
import { getDashboardStats } from "../controllers/dashboard.Controller.js";

const router = express.Router();

router.get("/", getDashboardStats);

export default router;