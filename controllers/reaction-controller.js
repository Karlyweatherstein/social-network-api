const { Reaction, User } = require('../models');

const reactionController = {
  // add reation to Thought
  addReaction({ params, body }, res) {
    console.log(body);
    Reaction.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { reaction: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
      .then(deletedReaction => {
        if (!deletedReaction) {
          return res.status(404).json({ message: 'No reaction with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.UserId },
          { $pull: { Reactions: params.reactionId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = reactionController;