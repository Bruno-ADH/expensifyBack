const Joi = require('joi');

exports.createCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Le nom de la catégorie est requis',
      'string.min': 'Le nom de la catégorie doit avoir au moins 1 caractère',
      'string.max': 'Le nom de la catégorie ne peut pas dépasser 50 caractères',
      'any.required': 'Le nom de la catégorie est requis',
    }),
  icon: Joi.string()
    .trim()
    .optional()
    .allow('')
    .messages({
      'string.base': 'L\'icône doit être une chaîne de caractères',
    }),
  color: Joi.string()
    .trim()
    .optional()
    .allow('')
    .pattern(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
    .messages({
      'string.base': 'La couleur doit être une chaîne de caractères',
      'string.pattern.base': 'La couleur doit être un code hexadécimal',
    }),
});

exports.updateCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .optional()
    .messages({
      'string.empty': 'Le nom de la catégorie ne peut pas être vide',
      'string.min': 'Le nom de la catégorie doit avoir au moins 1 caractère',
      'string.max': 'Le nom de la catégorie ne peut pas dépasser 50 caractères',
    }),
  icon: Joi.string()
    .trim()
    .optional()
    .allow('')
    .messages({
      'string.base': "L'icône doit être une chaîne de caractères",
    }),
  color: Joi.string()
    .trim()
    .optional()
    .allow('')
    .pattern(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
    .messages({
      'string.base': 'La couleur doit être une chaîne de caractères',
      'string.pattern.base': 'La couleur doit être un code hexadécimal',
    }),
});