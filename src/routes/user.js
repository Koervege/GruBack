const router = require('express').Router();
const { signin, getLoggedUserInfo, sendConfirmationEmail, confirmEmail } = require('../controllers/user.controller');
const { auth } = require('../utils/auth');

router.route('/signin').post(signin);
router.route('/').get(auth, getLoggedUserInfo);
router.route('/').put(auth, sendConfirmationEmail);
router.route('/confirm').put(auth, confirmEmail);


module.exports = router;
