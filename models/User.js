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
    friends: [],
    //array of _id values referencing the 'User' model(self-reference)
    Thought: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
      }
    ],
    Reaction: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Reaction'
      }
  ]
});

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.



// create the User model using the UserSchema
const User = model('User', UserSchema);


// export the User model
module.exports = User;
