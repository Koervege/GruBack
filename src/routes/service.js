const router = require('express').Router();
const { create, list, update } = require('../controllers/service.controller');
const { auth } = require('../utils/auth');

router.route('/').post(auth, create);
router.route('/').get(list);
router.route('/:serviceId').put(auth, update);

module.exports = router;