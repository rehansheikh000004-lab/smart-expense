import express from "express";
import Group from "../models/Group.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create group
router.post("/", auth, async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name || !members || members.length === 0)
      return res.status(400).json({ message: "Group name and members required" });

    const group = await Group.create({
      name,
      members,
      createdBy: req.userId
    });

    res.status(201).json(group);
  } catch (err) {
    console.error("Create group error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user groups
router.get("/", auth, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.userId })
      .populate("members", "name email");

    res.json(groups);
  } catch (err) {
    console.error("Get groups error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
