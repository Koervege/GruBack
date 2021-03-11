const User = require('../models/user.model');

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;

      const user = await User.create(body);
      res.status(200).json({message:'user created successfully', user});
    } catch (error) {
      res.status(400).json({ message: 'user could not be created', error})
    }
  },
  async show(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);
      res.status(200).json({message:'user found', user});
    } catch (error) {
      res.status(400).json({ message: 'user could not be found', error});
    }
  },
  async list(req, res) {
    try {
      const { query } = req;
      
      const users = await User.find(query);
      res.status(200).json({message:`${users.length} users found`, users});
    } catch (error) {
      res.status(400).json({ message: 'users could not be found', error});
    }
  },
  async update(req, res) {
    try {
      const { body, params: { userId } } = req;

      const userUpdate = await User.findByIdAndUpdate(userId, body, {new: true});
      res.status(200).json({message: 'user updated', userUpdate});
    } catch (error) {
      res.status(400).json({ message: 'user could not be updated', error});
    }
  },
  async destroy(req, res) {
    try {
      const { userId } = req.params;

      const userDelete = await User.findByIdAndDelete(userId);
      res.status(200).json({message: 'user deleted', userDelete});
    } catch (error) {
      res.status(400).json({ message: 'user could not be deleted', error});
    }
  } 
}