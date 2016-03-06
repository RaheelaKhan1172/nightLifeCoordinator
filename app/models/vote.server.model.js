var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VoteSchema = new Schema({
    belongsTo:{
        type: Schema.ObjectId,
        ref: 'Result'
    },
    count:Number
});

mongoose.model('Vote',VoteSchema)