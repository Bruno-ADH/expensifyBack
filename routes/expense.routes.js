const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller");
const { tokenCheck } = require("../middleware/authMiddleware");
const { validateCreateExpense, validateUpdateExpense, validateSearchExpenses } = require("../middleware/validateExpense");

router.use(tokenCheck);

router.post("/", validateCreateExpense, expenseController.createExpense);
router.get("/", expenseController.getAllExpenses);
router.get('/search', validateSearchExpenses, expenseController.searchExpenses);
router.get("/:id", expenseController.getOneExpense);
router.put("/:id", validateUpdateExpense, expenseController.updateExpense);
router.patch("/:id/block", expenseController.blockExpense);

module.exports = router;
