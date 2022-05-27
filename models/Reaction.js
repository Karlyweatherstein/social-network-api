const { Schema, model } = require('mongoose');

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


const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;