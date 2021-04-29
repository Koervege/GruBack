const jwt = require('jsonwebtoken');
const Supplier = require('../models/supplier.model');
const Tow = require('../models/tow.model');

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const supplier = await Supplier.create(body);

      const token = jwt.sign(
        { userId: supplier._id, userType: 'supplier' },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(201).json({
        message: 'supplier created successfully',
        token,
        userFront: {
          _id: supplier._id,
          name: supplier.name,
          email: supplier.email,
          phoneNum: supplier.phoneNum,
          emailIsConfirmed: supplier.emailIsConfirmed,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const suppliers = await Supplier.find(query).populate('towIDs');
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
      const { user } = req;
      
      const supplierDelete = await Supplier.findByIdAndDelete(user).select('-password');
      if (supplierDelete.towIDs.length > 0) {
        towId = supplierDelete.towIDs[0];
        await Tow.findByIdAndDelete(towId);
      } 
      res.status(200).json({ message: 'supplier deleted', supplierDelete });
    } catch (error) {
      res.status(400).json({ message: 'supplier could not be deleted', error });
    }
  },
};
