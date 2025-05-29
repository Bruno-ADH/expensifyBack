
exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body || req.query, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => err.message).join('\n');
    return res.status(400).json({ message: 'Erreur de validation', errors });
  }
  next();
};


exports.months = [
  'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
  'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc',
];

exports.generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};