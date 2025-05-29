const Expense = require('../models/Expense');
const mongoose = require('mongoose');
const months = require('../utils/helper').months;
const generateColors = require('../utils/helper').generateColors;

exports.getMonthlyStats = async (req, res) => {
    const userId = req.user.id;
    const { year } = req.query;

    if (year && isNaN(Number(year))) {
        return res.status(400).json({ message: 'Année invalide' });
    }

    try {

        const matchStage = {
            user: new mongoose.Types.ObjectId(userId),
            status: 'active',
        };

        if (year) {
            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31`);
            matchStage.date = { $gte: startDate, $lte: endDate };
        }

        const expenses = await Expense.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: { $month: '$date' },
                    total: { $sum: '$amount' },
                },
            },
            { $sort: { '_id': 1 } },
        ]);

        const labels = year ? months.map((m, i) => `${m} ${year}`) : months;
        const data = new Array(12).fill(0);

        expenses.forEach((exp) => {
            data[exp._id - 1] = exp.total;
        });

        const chartData = {
            labels,
            datasets: [
                {
                    label: 'Dépenses (FCFA)',
                    data,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        res.json(chartData);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des statistiques mensuelles',
            error: error.message
        });
    }
};

exports.getByCategoryStats = async (req, res) => {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    if (startDate && isNaN(new Date(startDate).getTime())) {
        return res.status(400).json({ message: 'Date de début invalide' });
    }
    if (endDate && isNaN(new Date(endDate).getTime())) {
        return res.status(400).json({ message: 'Date de fin invalide' });
    }

    try {
        const matchStage = {
            user: new mongoose.Types.ObjectId(userId),
            status: 'active',
        };

        if (startDate && endDate) {
            matchStage.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const expenses = await Expense.aggregate([
            { $match: matchStage },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            { $unwind: '$category' },
            {
                $group: {
                    _id: '$category.name',
                    total: { $sum: '$amount' },
                },
            },
            { $sort: { total: -1 } },
        ]);

        const colors = generateColors(expenses.length);

        const chartData = {
            labels: expenses.map((exp) => exp._id),
            datasets: [
                {
                    label: 'Dépenses par catégorie (FCFA)',
                    data: expenses.map((exp) => exp.total),
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                },
            ],
        };

        res.json(chartData);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des statistiques par catégorie', error: error.message });
    }
};

exports.getTotalStats = async (req, res) => {
    const userId = req.user.id;
    const { year } = req.query;

    if (year && isNaN(Number(year))) {
        return res.status(400).json({ message: 'Année invalide' });
    }

    try {
        const matchStage = {
            user: new mongoose.Types.ObjectId(userId),
            status: 'active',
        };

        if (year) {
            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31`);
            matchStage.date = { $gte: startDate, $lte: endDate };
        }

        const expenses = await Expense.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: { $month: '$date' },
                    total: { $sum: '$amount' },
                },
            },
            { $sort: { '_id': 1 } },
        ]);


        const labels = year ? months.map((m, i) => `${m} ${year}`) : months;
        let cumulative = 0;
        const data = new Array(12).fill(0);

        expenses.forEach((exp) => {
            cumulative += exp.total;
            data[exp._id - 1] = cumulative;
        });

        const chartData = {
            labels,
            datasets: [
                {
                    label: 'Total des dépenses (FCFA)',
                    data,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: true,
                },
            ],
        };

        res.json(chartData);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des totaux mensuels', error: error.message });
    }
};

exports.getEvolutionStats = async (req, res) => {
    const userId = req.user.id;
    const { year } = req.query;

    if (year && isNaN(Number(year))) {
        return res.status(400).json({ message: 'Année invalide' });
    }

    try {
        const matchStage = {
            user: new mongoose.Types.ObjectId(userId),
            status: 'active',
        };

        if (year) {
            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31`);
            matchStage.date = { $gte: startDate, $lte: endDate };
        }

        const expenses = await Expense.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: { $month: '$date' },
                    total: { $sum: '$amount' },
                },
            },
            { $sort: { '_id': 1 } },
        ]);

        const data = new Array(12).fill(0);
        expenses.forEach((exp) => {
            data[exp._id - 1] = exp.total;
        });

        const evolution = [];
        const labels = [];
        for (let i = 1; i < 12; i++) {
            if (data[i - 1] > 0 && data[i] !== 0) {
                const percent = ((data[i] - data[i - 1]) / data[i - 1]) * 100 || 0;
                evolution.push(Number(percent.toFixed(2)));
                labels.push(`${months[i]} vs ${months[i - 1]}`);
            } else {
                evolution.push(0);
                labels.push(`${months[i]} vs ${months[i - 1]}`);
            }
        }

        const chartData = {
            labels,
            datasets: [
                {
                    label: 'Évolution (%)',
                    data: evolution,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                },
            ],
        };

        res.json(chartData);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'évolution', error: error.message });
    }
};