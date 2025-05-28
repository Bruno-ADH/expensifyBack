
const { createCategorySchema, updateCategorySchema } = require('../validators/category.validator');
const validate = require('../utils/helper').validate;

module.exports = {
  validateCreateCategory: validate(createCategorySchema),
  validateUpdateCategory: validate(updateCategorySchema),
};