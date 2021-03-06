const router = require('express').Router();
const { create, list, update } = require('../controllers/service.controller');
const { auth } = require('../utils/auth');

router.route('/').post(auth, create);
router.route('/').get(auth, list);
router.route('/:serviceID').put(auth, update);

module.exports = router;