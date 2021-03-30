const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/client.model');
const Supplier = require('../models/supplier.model');

module.exports = {

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      let userType = '';
      let validUser = await Client.findOne({ email });

      userType = 'client';

      if (!validUser) {
        validUser = await Supplier.findOne({ email });
        userType = 'supplier';
      }

      if (!validUser) {
        throw Error('email o contraseña invalida');
      }
      const isValidPass = await bcrypt.compare(password, validUser.password);

      if (!isValidPass) {
        throw Error('Usuario o contraseña inválida');
      }

      const token = jwt.sign(
        { userId: validUser._id, userType },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(201).json({ token, userType });
    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  },

  async getLoggedUserInfo(req, res) {
    try {
      const { user, userType } = req;
      let userFront;

      if(userType === 'client') {
        userFront = await Client.findById(user).select('-password');
      } else if(userType === 'supplier') {
        userFront = await Supplier.findById(user).select('-password');
      } else {
        throw new Error('invalid token')
      }

      res.status(201).json({ userFront, userType })
    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  },
};
