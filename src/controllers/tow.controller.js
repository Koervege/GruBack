const { update } = require('../models/tow.model');
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
      const { query } = req
      
      const tows = await Tow.find(query); 
      res.status(200).json({ message: `${tows.length} tows was found`, tows  });
    } catch(error) {
      res.status(400).json({ message: 'tows list error', error });
    }
 },
  async show(req, res) {
    try {
      const { towId } = req.params

      const tow = await Tow.findById(towId);
      res.status(200).json({ message: 'tow was found', tow});
    } catch(error) {
      res.status(400).json({ message: 'Tow was not found', error});
    }
  },
  async  update(req, res) {
    try {
      const { body, params: { towId }} = req;

      const tow = await Tow.findByIdAndUpdate( towId, body, { new:true });
      res.status(200).json({ message: 'tow was updated', tow });
    } catch(error) {
      res.status(404).json({ message: 'ow not updated', tow});  
    }
  },
}