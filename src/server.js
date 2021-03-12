require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { connect } = require('./db');
const userRouter = require('./routes/user');
const { auth } = require('./utils/auth');

const port = 8000;
const app = express();
connect();

app.use(express.json());
app.use(morgan('dev'));

app.use('/users', userRouter);

app.get('/', auth, (req, res) => {
  const { user } = req;
  res.send(`authenticated ${user}`);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
