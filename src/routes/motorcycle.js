const router = require('express').Router();
const { create, listUserBikes, update, destroy } = require('../controllers/motorcycle.controller');
const { auth } = require('../utils/auth')

router.route('/list').get(auth, listUserBikes);
router.route('/create').post(auth, create);
router.route('/update').put(auth, update);
router.route('/').delete(auth, destroy);

module.exports = router;