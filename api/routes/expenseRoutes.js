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


const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.put("/expenses/:id", expenseController.updateExpense);
router.delete("/expenses/:id", expenseController.deleteExpense);
router.get("/expenses", expenseController.getExpenses);
router.get("/expenses/summary", expenseController.getSummary);

module.exports = router;
