const { Schema, model } = require('mongoose');


//user schema
const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});


// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;