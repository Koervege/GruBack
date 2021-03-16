const Tow = require('../models/tow.model');

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;

      const tow = await  Tow.create(body);
      res.status(201).json(tow);
    } catch(error) {
      res.status(400).json({ message: 'Tow could not be created', error });
    }
  },
  async list(req, res) {
    try {
      const tows = await Tow.find(); 
      res.status(200).json({ message: `${tows.length} Tows was found`, tows  });
    } catch(error) {
      res.status(400).json({ message: 'Tows list error', error });
    }
  },
  async show(req, res) {
    try {
      const { towId } = req.params

      const tow = await Tow.findById(towId);
      res.status(200).json({ message: 'Tow was found', tow});
    } catch(error) {
      res.status(400).json({ message: 'Tow was not found', error});
    }
  },
  async  update(req, res) {
    try {
      const { body, params: { towId }} = req;

      const tow = await Tow.findByIdAndUpdate( towId, body, { new:true });
      res.status(200).json({ message: 'Tow was updated', tow });
    } catch(error) {
      res.status(404).json({ message: 'Tow not updated', tow});  
    }
  },
}