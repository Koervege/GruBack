const jwt = require('jsonwebtoken');
const Motorcycle = require('../models/motorcycle.model');
const Client = require ('../models/client.model')

module.exports = {
  async create(req,res) {
    try {
      const { body, user } = req;
      const newBike = await Motorcycle.create({ ...body, userID: user });
      const fullClient = await Client.findById(user);
      fullClient.bikeIDs.push(newBike._id);
      await fullClient.save({ validateBeforeSave: false })

      res.status(201).json({ message: 'Motorcycle created succesfully' });
      } catch(error) {
        res.status(400).json({ error, message: 'Something went wrong' });
      }
  },

  async listUserBikes(req, res) {
    try {
      const { user } = req;
      const fullClient = await Client.findById(user);
      const clientBikes = fullClient.bikeIDs;

      res.status(200).json({message: 'Bikes owned by client:', clientBikes});
    } catch(error) {
      res.status(400).json({ message: 'motorcycle could not be updated', error });
    }
  },

  async update(req, res) {
    try {
      const { body, user } = req;
      const bikeID = body.bikeID;
      const bike = await Motorcycle.findById(bikeID);

      if (bike.userID.toString() === user.toString()) {
        const motorcycleUpdate = await Motorcycle.findByIdAndUpdate(bikeID, body, {
          new: true,
        });

        res.status(200).json({ message: 'motorcycle updated', motorcycleUpdate });
      } else {
        throw 'Bike is not owned by current client'
      }
    } catch (error) {
      res.status(400).json({ message: 'motorcycle could not be updated', error });
    }
  },

  async destroy(req, res) {
    try {
      const { body, user } = req;
      const bikeID = body.bikeID;
      const fullClient = await Client.findById(user);
      const bike = await Motorcycle.findById(bikeID);

      if (bike.userID.toString() === user.toString()) {

        fullClient.bikeIDs.pull(bikeID);
        fullClient.save({ validateBeforeSave: false });

        const deletedMotorcycle = await Motorcycle.findByIdAndDelete(bikeID);

        res.status(200).json({ message: 'Bike deleted', deletedMotorcycle });
      } else {
        throw 'Bike not owned'
      }
      
    } catch (error) {
      res.status(400).json({ message: 'Bike could not be deleted', error });
    }
  }
};
