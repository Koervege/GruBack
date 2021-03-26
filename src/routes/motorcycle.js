const router = require('express').Router();
const { create, listUserBikes, update, destroy } = require('../controllers/motorcycle.controller');
const { auth } = require('../utils/auth');
const { formData } = require('../utils/formData');

router.route('/').get(auth, listUserBikes);
router.route('/').post(auth, create);
router.route('/').delete(auth, destroy);
router.route('/').put(auth, formData, update);

module.exports = router;