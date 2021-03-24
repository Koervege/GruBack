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

      let userType = 'client'

      if(!validUser) {
        validUser = await Supplier.findOne({ email })
        userType = 'supplier'
      }

      if(!validUser) {
        throw Error('email o contraseña invalida')
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
  }

};
