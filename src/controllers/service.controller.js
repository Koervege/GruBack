const Service = require('../models/service.model');
const User = require('../models/user.model');
const Motorcycle = require('../models/motorcycle.model');
const Tow = require('../models/tow.model')

module.exports = {
  async create(req, res) {
    try {
      const { body, user } = req;

      const isUser = await User.findById(user);

      if (!isUser) {
        throw Error('Debes ser cliente para crear un servicio');
      }

      const motorcycle = await Motorcycle.findById(body.bikeID)

      if (!motorcycle) {
        throw Error('No está registrada la motocicleta');
      }

      const tow = await Tow.findById(body.towID);

      if (!tow) {
        throw Error('No está registrada la grúa');
      }

      if (motorcycle.userId.toString() === user.toString()) {
        const service = await Service.create(body);
        motorcycle.serviceIds.push(service._id);
        await motorcycle.save({ validateBeforeSave: false });
        
        tow.serviceIds.push(service._id);
        await tow.save({ validateBeforeSave: false });
        
        res.status(200).json({ message: 'service created successfully', service });
      
      } else {
        throw Error ('El usuario no tiene registrado la motocicleta')
      }

    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  async list(req, res) {
    try {
      const {query} = req;

      const services = await Service.find(query);
      res.status(200).json({ message: `${services.length} services found`, services });
    } catch (error) {
      res.status(400).json({ message:'services could not be found', error })
    }
  },
  async update(req, res) {
    try {
      const {body, params: {serviceId} } = req;

      const service = await Service.findByIdAndUpdate(serviceId, body, {new: true});
      res.status(200).json({ message:'service updated', service });
    } catch (error) {
      res.status(400).json({ message:'services could not be updated', error });
    }
  }
}