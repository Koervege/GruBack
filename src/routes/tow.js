const router = require('express').Router();
const { create, list, show, update } = require('../controllers/tow.controller');

router.route('/:supplierID').post(create);
router.route('/').get(list);
router.route('/:towId').get(show);
router.route('/:towId').put(update);

module.exports = router;