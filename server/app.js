const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRouter');
const expenseRouter = require('./routes/expenseRouter');
const categoryRouter = require('./routes/categoryRouter');
const testRouter = require('./routes/testRouter');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/expenses', expenseRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/test', testRouter);
// app.use('/api/v1/expenses/:name');
// SERVER

module.exports = app;
