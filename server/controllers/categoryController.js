const Category = require('../models/categoryModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: 'success',
    data: {category: categories},
  });
});
exports.getCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) return next(new AppError('No category found that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {category},
  });
});
exports.createCategory = catchAsync(async (req, res) => {
  const newCategory = await Category.create(req.body);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {category: newCategory},
  });
});
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!category) return next(new AppError('No category found that ID', 404));

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      category,
    },
  });
});
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id);
  if (!category) return next(new AppError('No category found that ID', 404));

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
