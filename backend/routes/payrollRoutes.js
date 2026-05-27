import express from "express";

import {
  getPayrolls,
  createPayroll,
  deletePayroll,
} from "../controllers/payrollController.js";

const payrollRouter = express.Router();

payrollRouter.get("/", getPayrolls);
payrollRouter.post("/", createPayroll);
payrollRouter.delete("/:id", deletePayroll);

export default payrollRouter;