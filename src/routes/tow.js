const router = require('express').Router();
const { create, list, show, update } = require('../controllers/tow.controller');
const { auth } = require('../utils/auth')

router.route('/').post(auth, create);
router.route('/').get(list);
router.route('/:towId').get(show);
router.route('/').put(auth, update);

module.exports = router;