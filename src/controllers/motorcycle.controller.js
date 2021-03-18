const jwt = require('jsonwebtoken');
const Motorcycle = require('../models/motorcycle.model');
const User = require ('../models/user.model')

module.exports = {
  async create(req,res) {
    try {
      const { body, user } = req;
      const newBike = await Motorcycle.create({ ...body, userId: user });
      const fullUser = await User.findById(user);
      fullUser.bikeIDs.push(newBike._id);
      await fullUser.save({ validateBeforeSave: false })

      res.status(201).json({ message: 'Motorcycle created succesfully' });
      } catch(error) {
        res.status(400).json({ error, message: 'Something went wrong' });
      }
  },

  async listUserBikes(req, res) {
    try {
      const { user } = req;
      const fullUser = await User.findById(user);
      const userBikes = fullUser.bikeIDs;

      res.status(200).json({message: 'Bikes owned by user:', userBikes});
    } catch(error) {
      res.status(400).json({ message: 'motorcycle could not be updated', error });
    }
  },

  async update(req, res) {
    try {
      const { body, user } = req;
      const bikeId = body.bikeId;
      const bike = await Motorcycle.findById(bikeId);

      if (bike.userId.toString() === user.toString()) {
        const motorcycleUpdate = await Motorcycle.findByIdAndUpdate(bikeId, body, {
          new: true,
        });

        res.status(200).json({ message: 'motorcycle updated', motorcycleUpdate });
      } else {
        throw 'Bike is not owned by current user'
      }
    } catch (error) {
      res.status(400).json({ message: 'motorcycle could not be updated', error });
    }
  },

  async destroy(req, res) {
    try {
      const { body, user } = req;
      const bikeId = body.bikeId;
      const fullUser = await User.findById(user);
      const bike = await Motorcycle.findById(bikeId);

      if (bike.userId.toString() === user.toString()) {

        fullUser.bikeIDs.pull(bikeId);
        fullUser.save({ validateBeforeSave: false });

        const deletedMotorcycle = await Motorcycle.findByIdAndDelete(bikeId);

        res.status(200).json({ message: 'Bike deleted', deletedMotorcycle });
      } else {
        throw 'Bike not owned'
      }
      
    } catch (error) {
      res.status(400).json({ message: 'Bike could not be deleted', error });
    }
  }
};
