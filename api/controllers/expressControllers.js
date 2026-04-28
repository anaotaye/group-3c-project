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

// Update expense (PUT /expenses/:id)
export const updateExpense = (req, res) => {
  const { id } = req.params;
  const { amount, category, description } = req.body;

  const expense = expensesData.expenses.find(exp => exp.id === parseInt(id));

  if (!expense) {
    return res.status(404).json({ 
      success: false,
      error: "Expense not found" 
    });
  }

  // Validate the updated expense data
  const updatedExpense = {
    description: description !== undefined ? description : expense.description,
    amount: amount !== undefined ? amount : expense.amount,
    category: category !== undefined ? category : expense.category,
  };

  const errors = validateExpense(updatedExpense);
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // Apply updates
  if (amount !== undefined) expense.amount = amount;
  if (category !== undefined) expense.category = category;
  if (description !== undefined) expense.description = description;

  // Update timestamp
  expense.updatedAtDate = new Date().toISOString();

  res.status(200).json({ 
    success: true,
    message: "Expense updated successfully", 
    data: expense 
  });
};

// Delete expense (DELETE /expenses/:id)
export const deleteExpense = (req, res) => {
  const { id } = req.params;
  const index = expensesData.expenses.findIndex(exp => exp.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ 
      success: false,
      error: "Expense not found" 
    });
  }

  const deletedExpense = expensesData.expenses.splice(index, 1);
  res.status(200).json({ 
    success: true,
    message: "Expense deleted successfully", 
    data: deletedExpense[0]
  });
};

// GET expense summary
export const getSummary = (req, res) => {
  const expenses = expensesData.expenses;
  
  const summary = {
    totalExpenses: expenses.length,
    totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
    byCategory: {},
  };

  // Group by category
  expenses.forEach(exp => {
    if (!summary.byCategory[exp.category]) {
      summary.byCategory[exp.category] = 0;
    }
    summary.byCategory[exp.category] += exp.amount;
  });

  res.status(200).json({
    success: true,
    data: summary,
  });
};