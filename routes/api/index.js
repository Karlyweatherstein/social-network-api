const router = require('express').Router();
const userRoutes = require('./user-routes');
const reactionRoutes = require('./reaction-routes');

router.use('/reaction', reactionRoutes);
router.use('/user', userRoutes);

module.exports = router;