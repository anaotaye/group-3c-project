// models/expense.js
class Expense {
  constructor(id, amount, category, date, description) {
    this.id = id;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
    this.createdAtDate = new Date().toISOString();
    this.updatedAtDate = new Date().toISOString();
  }
}

module.exports = Expense;
