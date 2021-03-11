const express = require('express');
const {connect} = require('./db');
const userRouter = require('./routes/user');

const port = 8000;
const app = express();
connect();

app.use(express.json());

app.use('/users', userRouter);

app.listen(port, () =>{
  console.log(`Server running on port: ${port}`);
});
