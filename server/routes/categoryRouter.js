const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

// router.param('id', checkID);

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.checkBody, categoryController.createCategory);
router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.checkBody, categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
