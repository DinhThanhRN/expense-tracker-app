const Category = require('../models/categoryModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.icon)
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or icon',
    });
  next();
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      status: 'success',
      data: {category: categories},
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);

    res.status(200).json({
      status: 'success',
      data: {category},
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {category: newCategory},
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        category,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id);

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
