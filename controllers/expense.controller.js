const Expense = require("../models/Expense");
const Category = require('../models/Category');
const sendNotification = require('../services/notificationService').sendNotification;
const checkBudgetThreshold = require('../services/notificationService').checkBudgetThreshold;

exports.createExpense = async (req, res) => {
    const { title, amount, date, category, description } = req.body;
    const userId = req.user.id;
    try {
        if (!title || !amount || !date || !category) {
            return res.status(400).json({ message: "Champs requis manquants" });
        }
        const categoryExists = await Category.findOne({
            _id: category,
            user: userId, status: "active"
        });
        if (!categoryExists) {
            return res.status(400).json({ message: "Catégorie invalide ou inactive" });
        }
        const expense = new Expense({
            title,
            amount,
            date,
            category: categoryExists._id,
            description: description || "",
            user: userId,
            status: 'active'
        });
        await expense.save();

        const io = req.app.get('io');
        await sendNotification(io, req.user.id, `Nouvelle dépense ajoutée : ${expense.title}`, 'info');
        await checkBudgetThreshold(io, req.user.id, expense);

        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ message: "Erreur création", error: err.message });
    }
};

exports.getAllExpenses = async (req, res) => {
    const userId = req.user.id;
    const { startDate, endDate, category } = req.query;
    try {
        let query = { user: userId, status: 'active' };

        if (category) {
            query.category = category;
        }

        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const expenses = await Expense.find(query)
            .populate('category', 'name')
            .sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération", error: err.message });
    }
};

exports.getOneExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id,
            status: 'active'
        }).populate('category', 'name');

        if (!expense) return res.status(404).json({ message: "Dépense introuvable" });
        res.status(200).json(expense);
    } catch (err) {
        res.status(500).json({ message: "Erreur", error: err.message });
    }
};

exports.searchExpenses = async (req, res) => {
    const userId = req.user.id;
    const { query } = req.query;

    try {
        const expenses = await Expense.find({
            user: userId,
            status: 'active',
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        })
            .populate('category', 'name')
            .sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Erreur de recherche", error: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, date, category, description } = req.body;
    const userId = req.user.id;
    try {
        const expense = await Expense.findOne({ _id: id, user: userId, status: 'active' });
        if (!expense) {
            return res.status(404).json({ message: "Dépense introuvable" });
        }

        if (category) {
            const categoryExists = await Category.findOne({ _id: category, user: userId, status: 'active' });
            if (!categoryExists) {
                return res.status(400).json({ message: "Catégorie invalide ou inactive" });
            }
        }

        expense.title = title || expense.title;
        expense.amount = amount !== undefined ? amount : expense.amount;
        expense.date = date || expense.date;
        expense.category = category || expense.category;
        expense.description = description || expense.description;

        await expense.save();
        const io = req.app.get('io');
        await sendNotification(io, req.user.id, `Dépense modifiée : ${expense.title}`, 'info');
        await checkBudgetThreshold(io, req.user.id, expense);
        res.status(200).json(expense);
    } catch (err) {
        res.status(500).json({ message: "Erreur modification", error: err.message });
    }
};

exports.blockExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const expense = await Expense.findOneAndUpdate(
            { _id: id, user: userId },
            { status: 'blocked' },
            { new: true }
        );
        if (!expense) return res.status(404).json({ message: "Dépense non trouvée" });

        const io = req.app.get('io');
        await sendNotification(io, req.user.id, `Dépense supprimée : ${expense.title}`, 'info');
        res.status(200).json({ message: "Dépense bloquée", expense });
    } catch (err) {
        res.status(500).json({ message: "Erreur suppression", error: err.message });
    }
};
