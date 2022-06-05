const router = require('express').Router();
const { addReaction, removeReaction } = require('../../controllers/reaction-controller');

// /api/reaction/<userId>
router.route('/:userId').post(addReaction);

// /api/reaction/<userId>/<reactionId>
router.route('/:userId/:reactionId').delete(removeReaction);


module.exports = router;