const express = require('express');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkID,
  checkBody,
} = require('../controllers/user');

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllUsers).post(checkBody, createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(checkBody, updateUser)
  .delete(deleteUser);

module.exports = router;
