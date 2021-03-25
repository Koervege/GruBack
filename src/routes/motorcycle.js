const router = require('express').Router();
const { create, listUserBikes, update, destroy } = require('../controllers/motorcycle.controller');
const { auth } = require('../utils/auth')

router.route('/').get(auth, listUserBikes);
router.route('/').post(auth, create);
router.route('/').put(auth, update);
router.route('/').delete(auth, destroy);

module.exports = router;