const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const {spendingScheme} = require('./spendingModel');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'User must have a name'],
    unique: true,
    trim: true,
    maxLength: [40, 'A user name must have less or equal than 40 characters'],
    minLength: [
      10,
      'A user name must have greater or equal than 10 characters',
    ],
  },
  slug: String,
  email: {
    type: String,
    require: [true, 'User must have a email'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    minLength: [8, 'Password must have greater or equal than 8 characters'],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  spending: [spendingScheme],
  avatar: {
    type: String,
    require: [true, 'User must have a avatar'],
  },
});

userScheme.pre('save', function () {
  this.slug = slugify(this.name, {lower: true, replacement: '-'});
});
userScheme.pre('updateOne', function () {
  this.slug = slugify(this.name, {lower: true, replacement: '-'});
});

const User = mongoose.model('User', userScheme);

module.exports = User;
