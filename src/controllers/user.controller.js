const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/client.model');
const Supplier = require('../models/supplier.model');

module.exports = {

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      let userType = '';
      let validUser = await Client.findOne({ email }).populate('bikeIDs');
     
      userType = 'client';

      if (!validUser) {
        validUser = await Supplier.findOne({ email }).populate('towIDs');
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

      res.status(201).json({ 
        token, 
        userType, 
        userFront: {
          bikeIDs: validUser.bikeIDs,
          towIDs: validUser.towIDs, 
          _id: validUser._id,
          name: validUser.name,
          email: validUser.email,
          phoneNum: validUser.phoneNum,
          photo: validUser.photo,
        }
      });
      
    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  }

};
