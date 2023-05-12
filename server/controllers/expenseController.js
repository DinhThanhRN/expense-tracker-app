const Expense = require('../models/expenseModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.paidFor || !req.body.category)
    return res.status(400).json({
      status: 'fail',
      message: 'Missing purpose or category',
    });
  next();
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.status(200).json({
      status: 'success',
      result: expenses.length,
      data: {expense: expenses},
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.getExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findById(id);

    res.status(200).json({
      status: 'success',
      data: {expense},
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.createExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {expense: newExpense},
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        expense,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
