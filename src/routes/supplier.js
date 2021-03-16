const router = require('express').Router();
const { signup, signin, list, update, destroy } = require('../controllers/supplier.controller');

router.route('/').get(list);
router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/:supplierID').put(update);
router.route('/:supplierID').delete(destroy);

module.exports = router;