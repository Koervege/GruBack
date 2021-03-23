const router = require('express').Router();
const { signin } = require('../controllers/user.controller')

router.route('/signin/').post(signin);

module.exports = router;
