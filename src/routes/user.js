const router = require('express').Router();
const { create } = require('../controllers/user.controller');

router.route('/').post(create);

module.exports = router;