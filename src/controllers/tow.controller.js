const Tow = require('../models/tow.model');
const Supplier = require('../models/supplier.model')

module.exports = {
  async create(req, res) {
    try {
      const { body, user } = req;

      const tow = await Tow.create({...body, supplierID: user});
      const supplier = await Supplier.findById(user);
      supplier.towIDs.push(tow._id);
      await supplier.save({ validateBeforeSave: false });
      res.status(201).json(tow);
    } catch(error) {
      res.status(400).json({ message: 'Tow could not be created', error });
    }
  },
  async list(req, res) {
    try {
      const { user } = req;
      const tows = await Tow.find()
        .populate({
          path: 'supplierID',
          select: '-towIDs -password',
        })
        .populate({
          path: 'serviceIDs',
          select: '-_id',
        }); 
      res.status(200).json({ message: `${tows.length} Tows was found`, tows, userID: user });
    } catch(error) {
      res.status(400).json({ message: 'Tows list error', error });
    }
  },
  async show(req, res) {
    try {
      const { towID } = req.params

      const tow = await Tow.findById(towID);
      res.status(200).json({ message: 'Tow was found', tow});
    } catch(error) {
      res.status(400).json({ message: 'Tow was not found', error});
    }
  },
  async update(req, res) {
    try {
      const { body, user} = req;
      const { plateNum } = body;

      const tow = await Tow.findOne({plateNum});

      if (tow.supplierID == user) {
        const towUpdate = await Tow.findByIdAndUpdate(tow._id, body, {
          new: true,
        });
        res.status(200).json({ message: 'Tow was updated', towUpdate });
      } else {
        throw 'Tow is not owned by current supplier'
      }
    } catch(error) {
      res.status(404).json({ message: 'Tow not updated', error});  
    }
  },
  async destroy(req, res) {
    try {
      const { body, user} = req;
      const { plateNum } = body;

      const supplier = await Supplier.findById(user)
      const tow = await Tow.findOne({plateNum});

      if (tow.supplierID.toString() == user.toString()) {

        supplier.towIDs.pull(tow._id);
        supplier.save({ validateBeforeSave: false });
        
        const towDeleted = await Tow.findByIdAndDelete(tow._id);
        res.status(200).json({ message: 'Tow was deleted', towDeleted });
      } else {
        throw 'Tow is not owned by current supplier'
      }
    } catch(error) {
      res.status(404).json({ message: 'Tow not deleted', error});  
    }
  },
}