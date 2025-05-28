
const Joi = require('joi');
const mongoose = require('mongoose');

exports.createExpenseSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Le titre de la dépense est requis',
      'string.min': 'Le titre de la dépense doit avoir au moins 1 caractère',
      'string.max': 'Le titre de la dépense ne peut pas dépasser 100 caractères',
      'any.required': 'Le titre de la dépense est requis',
    }),
  amount: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Le montant doit être un nombre',
      'number.min': 'Le montant ne peut pas être négatif',
      'any.required': 'Le montant est requis',
    }),
  date: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La date doit être au format ISO (ex. : 2025-05-28)',
      'any.required': 'La date est requise',
    }),
  category: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.isValidObjectId(value)) {
        return helpers.message('L\'identifiant de la catégorie doit être un ObjectId valide');
      }
      return value;
    })
    .required()
    .messages({
      'any.required': 'La catégorie est requise',
    }),
  description: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'La description ne peut pas dépasser 500 caractères',
      'string.base': 'La description doit être une chaîne de caractères',
    }),
});

exports.updateExpenseSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'string.empty': 'Le titre de la dépense ne peut pas être vide',
      'string.min': 'Le titre de la dépense doit avoir au moins 1 caractère',
      'string.max': 'Le titre de la dépense ne peut pas dépasser 100 caractères',
    }),
  amount: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Le montant doit être un nombre',
      'number.min': 'Le montant ne peut pas être négatif',
    }),
  date: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'La date doit être au format ISO (ex. : 2025-05-28)',
    }),
  category: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.isValidObjectId(value)) {
        return helpers.message("L'identifiant de la catégorie doit être un ObjectId valide");
      }
      return value;
    })
    .optional()
    .messages({
      'string.base': "L''identifiant de la catégorie doit être une chaîne",
    }),
  description: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'La description ne peut pas dépasser 500 caractères',
      'string.base': 'La description doit être une chaîne de caractères',
    }),
});

exports.searchExpensesSchema = Joi.object({
  query: Joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      'string.empty': 'Le mot-clé de recherche ne peut pas être vide',
      'string.min': 'Le mot-clé de recherche doit avoir au moins 1 caractère',
      'any.required': 'Le mot-clé de recherche est requis',
    }),
});