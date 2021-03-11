const User = require('../models/user.model');

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;

      const user = await User.create(body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: 'user could not be created', error})
    }
  }
}