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

      if(!validUser) {
        validUser = await Supplier.findOne({ email });

        if(!validUser) {
          throw Error('email o contraseña inválida');

        } else {
          userType = 'supplier'
        }

      } else {
        userType = 'client'
      }

      const isValid = await bcrypt.compare(password, validUser.password);

      if(!isValid) {
        throw Error('email o contraseña inválida');
      };

      const token = jwt.sign(
        { userId: validUser._id, userType }, 
        process.env.SECRET, 
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(201).json({ token });
    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  }

};
