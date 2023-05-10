const fs = require('fs');

const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/categories.json`),
);

const checkID = (req, res, next, val) => {
  if (+val > categories.length)
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.icon || !req.body.name)
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or icon!',
    });
  next();
};

const getAllCategories = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {category: categories},
  });
};
const getCategory = (req, res) => {
  const id = req.params.id;
  const category = categories.find(item => item._id === id);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {category},
  });
};
const createCategory = (req, res) => {
  const category = req.body;
  const newId = categories.length + 1 + '';
  const newCategory = Object.assign({id: newId}, category);
  categories.push(newCategory);

  fs.writeFile(
    `${__dirname}/data/categories.json`,
    JSON.stringify(categories),
    err => {
      res.status(201).json({
        status: 'success',
        data: {category: newCategory},
      });
    },
  );
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {category: newCategory},
  });
};
const updateCategory = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      category: 'updated from here',
    },
  });
};
const deleteCategory = (req, res) => {
  const id = req.params.id;

  const newCategories = categories.filter(item => item._id !== id);
  res.status(200).json({
    status: 'success',
    results: categories.length,
    requestedAt: req.requestTime,
    data: {
      category: newCategories,
    },
  });
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  checkID,
  checkBody,
};
