const router = require('express').Router();
const { create, list, show, update, destroy } = require('../controllers/tow.controller');
const { auth } = require('../utils/auth');
const { formData } = require('../utils/formData');

router.route('/').post(auth, create);
router.route('/').get(auth, list);
router.route('/:towID').get(show);
router.route('/').put(auth, update);
router.route('/').delete(auth, destroy);
router.route('/image').post(auth, formData, update);

module.exports = router;