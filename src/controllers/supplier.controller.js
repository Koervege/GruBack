const bcrypt = require('bcrypt');
const Supplier = require('../models/supplier.model');

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const supplier = await Supplier.create(body);

      res.status(201).json({ message: 'supplier created successfully' });
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

      res.status(201).json({ message: 'singin successful'});
    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const suppliers = await Supplier.find(query).select('-password');
      res.status(200).json({ message: `${suppliers.length} suppliers found`, suppliers });
    } catch (error) {
      res.status(400).json({ message: 'suppliers could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const {
        body,
        params: { supplierID },
      } = req;

      const supplierUpdate = await Supplier.findByIdAndUpdate(supplierID, body, {
        new: true,
      }).select('-password');
      res.status(200).json({ message: 'supplier updated', supplierUpdate });
    } catch (error) {
      res.status(400).json({ message: 'supplier could not be updated', error });
    }
    // res.json('estoy funcionando')
  },
  async destroy(req, res) {
    try {
      const { 
        body,
        params: { supplierID }, 
      } = req;

      const supplierDelete = await Supplier.findByIdAndDelete(supplierID, body).select('-password');
      res.status(200).json({ message: 'supplier deleted', supplierDelete });
    } catch (error) {
      res.status(400).json({ message: 'supplier could not be deleted', error });
    }
  },
};
