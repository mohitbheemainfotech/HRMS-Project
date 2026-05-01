import express from "express";
import multer from "multer";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const employeeRoutes = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ FIX: use employeeRoutes instead of router
employeeRoutes.get("/", getEmployees);
employeeRoutes.get("/:id", getEmployeeById);
employeeRoutes.post("/", upload.array("documents"), createEmployee);
employeeRoutes.put("/:id", upload.array("documents"), updateEmployee);
employeeRoutes.delete("/:id", deleteEmployee);

export default employeeRoutes;