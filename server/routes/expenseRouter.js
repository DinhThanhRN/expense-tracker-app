const express = require('express');
const {
  getAllExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  checkID,
  checkBody,
} = require('../controllers/expense');

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllExpenses).post(checkBody, createExpense);
router
  .route('/:id')
  .get(getExpense)
  .patch(checkBody, updateExpense)
  .delete(deleteExpense);

module.exports = router;
