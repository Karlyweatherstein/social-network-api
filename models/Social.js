const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String
      //unique
      //required
      //trimmed
    },
    email: {
      type: String
      //required
      //unique
      //must match a valid email address(mongoose matching validation)
    },
    thoughts: [],
    //array of _id values referencing the 'thought' model
    friends: []
    //array of _id values referencing the 'User' model(self-reference)

});

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const ThoughtSchema = new Schema({
    thoughtText: {
      type: String
      //required
      //must be between 1 and 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now
        //use getter method to format timestamp on query
      },
    username: {
        //user that created this thought
        type: String
        //required
    },
    reactions: []
    //these are replies
    //array of nested documents created with the reactionSchema

});

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const ReactionSchema = new Schema({
    reactionId: {
        //use mongooses objectId dataype
        //default value is set to new objectId
    },
    reactionBody: {
        type: String
        //required
        //280 characters max
    },
    username: {
        type: String
        //required
    },
    createdAt: {
        type: Date,
        default: Date.now
        //use getter method to format timestamp on query
    }
});
//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.


// create the User model using the UserSchema
const User = model('User', UserSchema);
const Thought = model('Thought', ThoughtSchema);
const Reaction = model('Reaction', ReactionSchema);


// export the User model
module.exports = { 
    User,
    Thought,
    Reaction 
}