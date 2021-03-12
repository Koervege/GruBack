const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const user = await User.create(body);

      const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.status(201).json({ message: 'user created successfully', token });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if(!user) {
        throw Error('Usuario o contraseña inválida');
      };

      const isValid = await bcrypt.compare(password, user.password);

      if(!isValid) {
        throw Error('Usuario o contraseña inválida');
      };

      const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(201).json({token});
    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const users = await User.find(query).select('-password');
      res.status(200).json({ message: `${users.length} users found`, users });
    } catch (error) {
      res.status(400).json({ message: 'users could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const {
        body,
        user,
      } = req;

      const userUpdate = await User.findByIdAndUpdate(user, body, {
        new: true,
      }).select('-password');
      res.status(200).json({ message: 'user updated', userUpdate });
    } catch (error) {
      res.status(400).json({ message: 'user could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { user } = req;

      const userDelete = await User.findByIdAndDelete(user).select('-password');
      res.status(200).json({ message: 'user deleted', userDelete });
    } catch (error) {
      res.status(400).json({ message: 'user could not be deleted', error });
    }
  },
};
