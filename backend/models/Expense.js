import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  splitBetween: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
