import express from "express";
import Employee from "../models/Employee.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all employees
router.get("/", authMiddleware, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Add employee (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});
export default router;