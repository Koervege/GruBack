require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { connect } = require('./db');
const userRouter = require('./routes/user');
const serviceRouter = require('./routes/service');
const towRouter = require('./routes/tow');
const supplierRouter = require('./routes/supplier');
const { auth } = require('./utils/auth');

const port = 8000;
const app = express();
connect();

app.use(express.json());
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/services', serviceRouter);
app.use('/tows', towRouter);
app.use('/suppliers', supplierRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
