require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connect } = require('./db');
const clientRouter = require('./routes/client');
const motorcycleRouter = require('./routes/motorcycle');
const serviceRouter = require('./routes/service');
const towRouter = require('./routes/tow');
const supplierRouter = require('./routes/supplier');
const { formData } = require('./utils/formData')

const port = 8000;
const app = express();
connect();

app.use(express.json());
app.use(cors({origin: '*'}));
app.use(morgan('dev'));

app.use('/clients', clientRouter);
app.use('/motorcycles', motorcycleRouter);
app.use('/services', serviceRouter);
app.use('/tows', towRouter);
app.use('/suppliers', supplierRouter);

app.post('/profile', formData, (req, res) => {
  console.log(req.body.file.secure_url)
  res.send('hola mundo')
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
