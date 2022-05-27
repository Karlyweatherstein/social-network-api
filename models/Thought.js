
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

const Thought = model('Thought', ThoughtSchema);


// export the User model

module.exports = Thought;