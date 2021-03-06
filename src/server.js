require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connect } = require('./db');
const userRouter = require('./routes/user');
const clientRouter = require('./routes/client');
const motorcycleRouter = require('./routes/motorcycle');
const serviceRouter = require('./routes/service');
const towRouter = require('./routes/tow');
const supplierRouter = require('./routes/supplier');

const port = process.env.PORT;
const app = express();
connect();

app.use(express.json());
app.use(cors({origin: '*'}));
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/clients', clientRouter);
app.use('/motorcycles', motorcycleRouter);
app.use('/services', serviceRouter);
app.use('/tows', towRouter);
app.use('/suppliers', supplierRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
