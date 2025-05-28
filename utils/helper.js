
exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body || req.query, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => err.message).join('\n');
    return res.status(400).json({ message: 'Erreur de validation', errors });
  }
  next();
};