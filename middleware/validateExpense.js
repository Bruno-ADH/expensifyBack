
const { createExpenseSchema, updateExpenseSchema, searchExpensesSchema } = require('../validators/expense.validator');
const validate = require('../utils/helper').validate;


module.exports = {
  validateCreateExpense: validate(createExpenseSchema),
  validateUpdateExpense: validate(updateExpenseSchema),
  validateSearchExpenses: validate(searchExpensesSchema),
};