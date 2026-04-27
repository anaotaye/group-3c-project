// define logic for handling API requests related to expenses
import expensesData from "../data/expressData.json" with { type: "json" };

// Validation helper
const validateExpense = (expense) => {
  const errors = [];

  if (
    !expense.description ||
    typeof expense.description !== "string" ||
    expense.description.trim() === ""
  ) {
    errors.push("Description is required and must be a non-empty string");
  }

  if (
    expense.amount === undefined ||
    expense.amount === null ||
    typeof expense.amount !== "number" ||
    expense.amount <= 0
  ) {
    errors.push("Amount is required and must be a positive number");
  }

  if (
    !expense.category ||
    typeof expense.category !== "string" ||
    expense.category.trim() === ""
  ) {
    errors.push("Category is required and must be a non-empty string");
  }

  return errors;
};

// GET all expenses
export const getExpenses = (req, res) => {
  res.status(200).json({
    success: true,
    data: expensesData.expenses,
  });
};

// POST a new expense
export const createExpense = (req, res) => {
  const { description, amount, category } = req.body;

  // Generate createdAttDate on the backend
  const createdAtDate = new Date().toISOString().split("T")[0];

  const newExpense = {
    description,
    amount,
    category,
    createdAtDate,
  };

  // Validate the expense data
  const errors = validateExpense(newExpense);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // Generate new ID
  const newId =
    expensesData.expenses.length > 0
      ? Math.max(...expensesData.expenses.map((e) => e.id)) + 1
      : 1;

  const expenseWithId = {
    id: newId,
    ...newExpense,
  };

  res.status(201).json({
    success: true,
    message: "Expense created successfully",
    data: expenseWithId,
  });
};
