const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/client.model');
const Supplier = require('../models/supplier.model');
const { mailer } = require('../utils/mailer')

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
        },
      });
      
    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  },

  async getLoggedUserInfo(req, res) {
    try {
      const { user, userType } = req;
      let loggedUser;

      if(userType === 'client') {
        loggedUser = await Client.findById(user);
      } else if(userType === 'supplier') {
        loggedUser = await Supplier.findById(user);
      } else {
        throw new Error('invalid token')
      }

      res.status(201).json({ 
        userType,
        userFront: {
          bikeIDs: loggedUser.bikeIDs,
          towIDs: loggedUser.towIDs, 
          _id: loggedUser._id,
          name: loggedUser.name,
          email: loggedUser.email,
          phoneNum: loggedUser.phoneNum,
          photo: loggedUser.photo,
        },
       })
    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  },

  async sendConfirmationEmail(req, res) {
    try{
      const { userType, email } = req.body;
      const { user } = req;
      let fullUser = {};
      const emailToken = Math.floor(Math.random() * 100000);

      if(userType === 'client') {
        fullUser = await Client.findByIdAndUpdate(user, {$set: { emailToken}}, {new: true, upsert: true})
      } else if(userType === 'supplier') {
        fullUser = await Supplier.findByIdAndUpdate(user, {$set: { emailToken}}, {new: true, upsert: true})
      } else {
        throw new Error('invalid user id');
      };

      const emailText = `Hola, ${fullUser.name}! \
        Recibimos una petición para validar este correo en GruApp \
        tu Token es ${emailToken}`;

      const emailStatus = mailer(email, 'Confirma tu Correo', emailText);
      if(emailStatus !== 'Success!') throw new Error(emailStatus);

      res.status(200).json({ emailToken, fullUser });
    } catch(err) {
      res.status(406).json({ message: err.message });
    };
  },
  async confirmEmail(req, res) {
    const { userType, emailToken } = req.body;
    const { user } = req;
    let fullUser = {};
    
    try {
      if(userType === 'client') {
        fullUser = await Client.findById(user)
      } else if(userType === 'supplier') {
        fullUser = await Supplier.findById(user)
      } else {
        throw new Error('Invalid user id');
      };
  
      if(fullUser.emailToken == emailToken) {
        fullUser.emailIsConfirmed = true;
        fullUser.save({ validateBeforeSave: false });
      } else {
        throw new Error('Invalid Email Token');
      };
  
      res.status(200).json( 'Email confirmed' );
    } catch(error) {
      res.status(406).json({ message: error.message });
    };
  },
};
