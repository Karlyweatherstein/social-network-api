const router = require('express').Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

// api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)

router  
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/:reactions')
    .post(addReaction)

router
    .route('/thoughtId/reations/reationId')
    .delete(removeReaction);

module.exports = router;



// router
//     .route('/')
//     .get(getAllThoughts)
//     .get(getThoughtById)


// // api/thought/userId
// router  
//     .route('/:userId')
//     .post(addThought)


// // /api/thoughts/userId/thoughtId
// router 
//     .route('/:userId/:thoughtId')
//     .put(addReaction)
//     .put(updateThought)
//     .delete(deleteThought)

// // /api/thoughts/userId/thoughtId/reactionId
// router
//     .route('/:userId/:thoughtId/:reactionId')
//     .delete(removeReaction);
