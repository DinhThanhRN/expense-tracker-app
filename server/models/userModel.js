const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const {spendingScheme} = require('./spendingModel');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    unique: true,
    trim: true,
    // maxLength: [40, 'A user name must have less or equal than 40 characters'],
    // minLength: [
    //   10,
    //   'A user name must have greater or equal than 10 characters',
    // ],
  },
  slug: String,
  email: {
    type: String,
    required: [true, 'User must have a email'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    minLength: [8, 'Password must have greater or equal than 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    minLength: [
      8,
      'password comfirm must have greater or equa than 8 charaters',
    ],
    required: [true, 'Please confirm your password'],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  spending: {
    type: [spendingScheme],
    default: [],
  },
  avatar: {
    type: String,
    default: '',
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userScheme.pre('save', function (next) {
  this.slug = slugify(this.name, {lower: true, replacement: '-'});
  next();
});
userScheme.pre(/^update/, function (next) {
  this.slug = slugify(this.name, {lower: true, replacement: '-'});
  next();
});
userScheme.pre('save', async function (next) {
  // Only run this function if password is actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userScheme.pre(/^find/, function (next) {
  // This points to current querry
  this.find({active: {$ne: false}});
  next();
});
userScheme.methods.correctPassword = async function (
  candiatePassword,
  userPassword,
) {
  return await bcrypt.compare(candiatePassword, userPassword);
};
userScheme.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
userScheme.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userScheme.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({resetToken}, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userScheme);

module.exports = User;
