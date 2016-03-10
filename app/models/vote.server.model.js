var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VoteSchema = new Schema({
    belongsTo:{
        type: Schema.ObjectId,
        ref: 'Result'
    },
    count:Number,
    votedOnBy: [{
      type: Schema.ObjectId,
        ref: 'User'
    }]
});

mongoose.model('Vote',VoteSchema)