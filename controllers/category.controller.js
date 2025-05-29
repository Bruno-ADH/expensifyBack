const Category = require("../models/Category");
const Expense = require('../models/Expense');
const sendNotification = require('../services/notificationService').sendNotification;

exports.createCategory = async (req, res) => {
  const userId = req.user.id;
  try {
    const { name, icon, color } = req.body;

    const category = new Category({
      user: userId,
      name,
      status: 'active',
      icon,
      color,
    });

    const savedCategory = await category.save();
    const io = req.app.get('io');
    await sendNotification(io, req.user.id, `Nouvelle catégorie ajoutée : ${category.name}`, 'info');
    res.status(201).json(savedCategory);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Cette catégorie existe déjà pour cet utilisateur." });
    }
    res.status(500).json({ message: "Erreur lors de la création", error: err?.message });
  }
};

exports.getCategories = async (req, res) => {
  const userId = req.user.id;

  try {
    const categories = await Category.find({ user: userId, status: 'active' }).sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err?.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, icon, color } = req.body;
  const userId = req.user.id;
  console.log('id  :>> ', id);
  try {
    const updated = await Category.findOneAndUpdate(
      { _id: id, user: userId, status: 'active' },
      { name, icon, color },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    const io = req.app.get('io');
    await sendNotification(io, req.user.id, `Catégorie modifiée : ${updated.name}`, 'info');

    res.status(200).json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Cette catégorie existe déjà pour cet utilisateur" });
    }
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const category = await Category.findOne({
      _id: id,
      user: userId,
      status: 'active'
    });

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    const expenseCount = await Expense.countDocuments({ category: id, user: userId, status: "active" });
    if (expenseCount > 0) {
      return res.status(400).json({ message: "Impossible de supprimer cette catégorie, elle est utilisée dans des dépenses." });
    }

    category.status = 'blocked';
    await category.save();
    const io = req.app.get('io');
    await sendNotification(io, req.user.id, `Catégorie supprimée : ${category.name}`, 'info');

    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
  }
};
