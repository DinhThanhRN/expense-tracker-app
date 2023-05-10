const express = require('express');

const {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  checkBody,
  checkID,
} = require('../controllers/category');

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllCategories).post(checkBody, createCategory);
router
  .route('/:id')
  .get(getCategory)
  .patch(checkBody, updateCategory)
  .delete(deleteCategory);

module.exports = router;
