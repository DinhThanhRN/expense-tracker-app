const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

const checkID = (req, res, next, val) => {
  console.log(`User id is ${req.params.id}`);
  if (+req.params.id > users.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  next();
};
const checkBody = (req, res, next) => {
  if (!req.body.email || !req.body.name || !req.body.role)
    return res.status(400).json({
      status: 'fail',
      message: 'Missing email, name or role!',
    });
  next();
};

const getAllUsers = (request, response) => {
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    length: users.length,
    data: {user: users},
  });
};
const getUser = (request, response) => {
  const id = request.params.id;

  const user = users.find(item => item._id === id);
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    data: {user},
  });
};
const createUser = (request, response) => {
  const user = request.body;
  const newId = users.length + 1 + '';
  const newUser = Object.assign({id: newId}, user);
  users.push(newUser);

  fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(users), err => {
    response.status(201).json({
      status: 'success',
      data: {user: newUser},
    });
  });
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    data: {user},
  });
};
const updateUser = (request, response) => {
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    data: {
      user: 'updated from here',
    },
  });
};
const deleteUser = (request, response) => {
  const id = request.params.id;

  const newUsers = users.filter(item => item._id !== id);
  response.status(200).json({
    status: 'success',
    results: users.length,
    requestedAt: request.requestTime,
    data: {
      user: newUsers,
    },
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkID,
  checkBody,
};
