import express from "express";
import Leave from "../models/Leave.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply leave
router.post("/", authMiddleware, async (req, res) => {
  try {
    const leave = await Leave.create({
      ...req.body,
      employee: req.user.id,
    });

    res.json(leave);
  } catch {
    res.status(500).json({ error: "Failed to apply leave" });
  }
});

// Get leaves for employee
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.params.id });
    res.json(leaves);
  } catch {
    res.status(500).json({ error: "Failed to fetch leaves" });
  }
});

export default router;