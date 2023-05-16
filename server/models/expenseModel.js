const {ObjectID, ObjectId} = require('mongodb');
const mongoose = require('mongoose');

const expenseScheme = new mongoose.Schema({
  userID: {
    type: String,
  },
  paidFor: {
    type: String,
    required: [true, 'An expense must have the purpose of paying'],
  },
  price: {
    type: Number,
    required: [true, 'Must have price'],
  },
  category: {
    type: String,
    required: [true, 'An expense must have category'],
  },
  paidAt: {
    type: Date,
    required: [true, 'An expense must have the time that is paid'],
  },
});

// expenseScheme.post(/^find/, function (next) {
//   next();
// });

const Expense = mongoose.model('Expense', expenseScheme);

module.exports = Expense;
