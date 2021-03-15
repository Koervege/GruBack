const Service = require('../models/service.model');

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;

      const service =  await Service.create(body);
      res.status(200).json({ message:'service created successfully', service });
    } catch (error) {
      res.status(400).json({ message:'service could not be created', error })
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