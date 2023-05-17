const express = require('express');
const expenseController = require('../controllers/expenseController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', checkID);

router
  .route('/')
  .get(authController.protect, expenseController.getAllExpenses)
  .post(authController.protect, expenseController.createExpense);
router
  .route('/:id')
  .get(authController.protect, expenseController.getExpense)
  .patch(authController.protect, expenseController.updateExpense)
  .delete(authController.protect, expenseController.deleteExpense);

module.exports = router;