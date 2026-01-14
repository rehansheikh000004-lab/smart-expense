import express from "express";
import Expense from "../models/Expense.js";
import Group from "../models/Group.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add expense
router.post("/", auth, async (req, res) => {
  try {
    const { groupId, amount, description } = req.body;

    const group = await Group.findById(groupId);
    if (!group)
      return res.status(404).json({ message: "Group not found" });

    const expense = await Expense.create({
      groupId,
      paidBy: req.userId,
      amount,
      description,
      splitBetween: group.members
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("Add expense error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Calculate balances for a group
router.get("/balances/:groupId", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ groupId: req.params.groupId });

    const balances = {};

    expenses.forEach(exp => {
      const splitAmount = exp.amount / exp.splitBetween.length;

      exp.splitBetween.forEach(userId => {
        if (!balances[userId]) balances[userId] = 0;

        if (userId.toString() === exp.paidBy.toString()) {
          balances[userId] += exp.amount - splitAmount;
        } else {
          balances[userId] -= splitAmount;
        }
      });
    });

    res.json(balances);
  } catch (err) {
    console.error("Balance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
