const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


//Reaction Schema
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
 },
 {
    toJSON: {
      getters: true
    }
  }
);


//Thought Schema
const ThoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String
        // ref: 'User'
    },
    reactions: [ReactionSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false  
    }

);


const Thought = model('Thought', ThoughtSchema);

// export the User model
module.exports = Thought;