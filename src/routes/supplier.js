const router = require('express').Router();
const { signup, list, update, destroy } = require('../controllers/supplier.controller');
const { auth } = require('../utils/auth');
const { formData } = require('../utils/formData');

router.route('/').get(list);
router.route('/signup').post(signup);
router.route('/').delete(auth, destroy);
router.route('/').put(auth, formData, update);

module.exports = router;