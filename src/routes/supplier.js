const router = require('express').Router();
const { signup, signin, list, show, update, destroy } = require('../controllers/supplier.controller');
const { auth } = require('../utils/auth')

router.route('/').get(list);
router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/').put(update);
router.route('/').delete(auth, destroy);

module.exports = router;