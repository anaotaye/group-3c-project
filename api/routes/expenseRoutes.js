import express from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} from "../controllers/expressControllers.js";

const router = express.Router();

// GET all expenses
router.get("/", getExpenses);

// GET summary (put before /:id routes)
router.get("/summary", getSummary);

// POST a new expense
router.post("/", createExpense);

// PUT to update an expense
router.put("/:id", updateExpense);

// DELETE an expense
router.delete("/:id", deleteExpense);

export default router;