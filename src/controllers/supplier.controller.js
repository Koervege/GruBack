const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Supplier = require('../models/supplier.model');

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const supplier = await Supplier.create(body);

      const token = jwt.sign(
        { userId: supplier._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(201).json({ message: 'supplier created successfully', token });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const supplier = await Supplier.findOne({ email });

      if(!supplier) {
        throw Error('Usuario o contraseña inválida');
      };

      const isValid = await bcrypt.compare(password, supplier.password);

      if(!isValid) {
        throw Error('Usuario o contraseña inválida');
      };

      const token = jwt.sign(
        { userId: supplier._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(201).json({ message: 'singin successful', token});
    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const suppliers = await Supplier.find(query).populate('tows');
      res.status(200).json({ message: `${suppliers.length} suppliers found`, suppliers });
    } catch (error) {
      res.status(400).json({ message: 'suppliers could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const {
        body,
        user,
      } = req;
      
      const supplierUpdate = await Supplier.findByIdAndUpdate(user, body, {
        new: true,
      }).select('-password');
      res.status(200).json({ message: 'supplier updated', supplierUpdate });
    } catch (error) {
      res.status(400).json({ message: 'supplier could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { 
        user, 
      } = req;
      
      const supplierDelete = await Supplier.findByIdAndDelete(user).select('-password');
      res.status(200).json({ message: 'supplier deleted', supplierDelete });
    } catch (error) {
      res.status(400).json({ message: 'supplier could not be deleted', error });
    }
  },
};
