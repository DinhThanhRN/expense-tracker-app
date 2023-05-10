const fs = require('fs');

const expenses = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/expenses.json`),
);

const checkID = (req, res, next, val) => {
  console.log(`Expense id is ${val}`);
  if (+val > expenses.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.purpose || !req.body.category)
    return res.status(400).json({
      status: 'faid',
      message: 'Missing purpose or category',
    });
  next();
};

const getAllExpenses = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {expense: expenses},
  });
};
const getExpense = (req, res) => {
  const id = req.params.id;
  const expense = expenses.find(item => item._id === id);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {expense},
  });
};
const createExpense = (req, res) => {
  const expense = req.body;
  const newId = expenses.length + 1 + '';
  const newExpense = Object.assign({id: newId}, expense);
  expenses.push(newExpense);

  fs.writeFile(
    `${__dirname}/data/expenses.json`,
    JSON.stringify(expenses),
    err => {
      res.status(201).json({
        status: 'success',
        data: {expense: newExpense},
      });
    },
  );
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {expense: newExpense},
  });
};
const updateExpense = (req, res) => {
  const id = req.params.id;
  if (+id > expenses.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      expense: 'updated from here',
    },
  });
};
const deleteExpense = (req, res) => {
  const id = req.params.id;
  if (+id > expenses.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  const newExpenses = expenses.filter(item => item._id !== id);

  res.status(200).json({
    status: 'success',
    results: expenses.length,
    requestedAt: req.requestTime,
    data: {
      expense: newExpenses,
    },
  });
};

module.exports = {
  getAllExpenses,
  getExpense,
  updateExpense,
  createExpense,
  deleteExpense,
  checkID,
  checkBody,
};
