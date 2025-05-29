const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const Category = require('../models/Category');

const sendNotification = async (io, userId, message, type = 'info') => {
  io.to(userId).emit('notification', { message, type, timestamp: new Date() });
};

const checkBudgetThreshold = async (io, userId, expense) => {
  const BUDGET_THRESHOLD = 10000;
  const currentYear = expense.date.getFullYear();
  const currentMonth = expense.date.getMonth();

  const monthlyTotal = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        status: 'active',
        category: new mongoose.Types.ObjectId(expense.category),
        $expr: {
          $and: [
            { $eq: [{ $year: '$date' }, currentYear] },
            { $eq: [{ $month: '$date' }, currentMonth + 1] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' },
      },
    },
  ]);
  
  const total = monthlyTotal[0]?.total || 0;
   console.log('total :>> ', total);
   console.log('BUDGET_THRESHOLD :>> ', BUDGET_THRESHOLD);
  if (total > BUDGET_THRESHOLD) {
    const category = await Category.findById(expense.category);
    console.log('category :>> ', category);
     const message = `Oups, ton budget ${category.name} pour ce mois est dépassé ! Tu as dépensé ${total} FCFA sur ${BUDGET_THRESHOLD} FCFA prévu. Pense à jeter un œil à tes dépenses !`;
    await sendNotification(io, userId, message, 'warning');
  }
};

module.exports = { sendNotification, checkBudgetThreshold };