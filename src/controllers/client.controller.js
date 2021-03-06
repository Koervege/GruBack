const jwt = require('jsonwebtoken');
const Client = require('../models/client.model');
const Motorcycle = require('../models/motorcycle.model');

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const client = await Client.create(body);

      const token = jwt.sign(
        { userId: client._id, userType: 'client' },
        process.env.SECRET, 
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(201).json({
        message: 'client created successfully',
        token,
        userFront: {
          _id: client._id,
          name: client.name,
          email: client.email,
          phoneNum: client.phoneNum,
          emailIsConfirmed: client.emailIsConfirmed,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const clients = await Client.find(query).populate('bikeIDs', '-password');
      res.status(200).json({ message: `${clients.length} clients found`, clients });
    } catch (error) {
      res.status(400).json({ message: 'clients could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const {
        body,
        user,
      } = req;

      delete body.emailIsConfirmed;

      const clientUpdate = await Client.findByIdAndUpdate(user, body, {
        new: true,
      }).select('-password');
      res.status(200).json({ message: 'client updated', clientUpdate });
    } catch (error) {
      res.status(400).json({ message: 'client could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { user } = req;

      const clientDelete = await Client.findByIdAndDelete(user).select('-password');
      if (clientDelete.bikeIDs.length > 0) {
        bikeId = clientDelete.bikeIDs[0];
        await Motorcycle.findByIdAndDelete(bikeId);
      } 
      res.status(200).json({ message: 'client deleted', clientDelete });
    } catch (error) {
      res.status(400).json({ message: 'client could not be deleted', error });
    }
  },
};
