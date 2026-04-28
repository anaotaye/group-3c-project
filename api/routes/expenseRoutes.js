// define API endpoints for expenses
import express from "express";
import {
  getExpenses,
  createExpense,
} from "../controllers/expressControllers.js";

const router = express.Router();

// GET all expenses
router.get("/", getExpenses);

// POST a new expense
router.post("/", createExpense);

export default router;
