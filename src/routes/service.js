const router = require('express').Router();
const { create, list, update } = require('../controllers/service.controller');

router.route('/').post(create);
router.route('/').get(list);
router.route('/:serviceId').put(update);

module.exports = router;