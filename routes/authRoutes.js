import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

router.put("/update-profile", authMiddleware, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(user);
});

router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect old password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;