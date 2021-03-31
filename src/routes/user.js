const router = require('express').Router();
const { signin, getLoggedUserInfo } = require('../controllers/user.controller')
const { auth } = require('../utils/auth')

router.route('/signin').post(signin);
router.route('/').get(auth, getLoggedUserInfo)

module.exports = router;
