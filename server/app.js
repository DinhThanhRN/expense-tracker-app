const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({app: 'expense-tracker', message: 'Hello from NodeJS server'});
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
