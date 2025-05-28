const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { tokenCheck } = require("../middleware/authMiddleware");
const { validateCreateCategory, validateUpdateCategory } = require("../middleware/validateCategory");

router.post("/", tokenCheck, validateCreateCategory, categoryController.createCategory);
router.get("/", tokenCheck, categoryController.getCategories);
router.put("/:id", tokenCheck, validateUpdateCategory, categoryController.updateCategory);
router.delete("/:id", tokenCheck, categoryController.deleteCategory);

module.exports = router;
