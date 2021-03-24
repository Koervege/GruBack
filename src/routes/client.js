const router = require('express').Router();
const { signup, list, update, destroy } = require('../controllers/client.controller');
const { auth } = require('../utils/auth')

router.route('/').get(list);
router.route('/signup').post(signup);
router.route('/').put(auth, update);
router.route('/').delete(auth, destroy);

module.exports = router;