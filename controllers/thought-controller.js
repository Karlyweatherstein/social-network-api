const { Thought, User } = require('../models');

const thoughtController = {
  //get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then(dbThoughtData => {
        // If no User is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' })
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

   // add Thought
   addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  //update thought
  updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true})
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({message: 'No thought found with this id!'})
          return;
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.status(400).json(err));
  },

  //delete thought
  deleteThought({params}, res){
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(deleteThought => {
      if (!deleteThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      return User.findOneAndUpdate(
        { thoughts: params.thoughtId },
        { $pull: { thoughts: params.thoughtId } },
        { new: true }
      );
    })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },


  // add reation to Thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, 
      { $push: { reactions: body } }, 
      { new: true }
      )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;