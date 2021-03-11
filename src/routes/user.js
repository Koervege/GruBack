const router = require('express').Router();
const { create, list, show, update, destroy } = require('../controllers/user.controller');

router.route('/').post(create);
router.route('/').get(list);
router.route('/:userId').get(show);
router.route('/:userId').put(update);
router.route('/:userId').delete(destroy);

module.exports = router;