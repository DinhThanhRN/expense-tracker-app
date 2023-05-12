const {ObjectID, ObjectId} = require('mongodb');
const mongoose = require('mongoose');

const expenseScheme = new mongoose.Schema({
  userID: {
    type: String,
  },
  paidFor: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  paidAt: {
    type: Date,
    require: true,
  },
});

const Expense = mongoose.model('Expense', expenseScheme);

module.exports = Expense;
