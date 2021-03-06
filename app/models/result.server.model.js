var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResultSchema = new Schema({
    votes: {
        type: Schema.ObjectId,
        ref: 'Vote'
    },
    title: String,
    description: String,
    image: String,
    url: String,
    zip: Number
});

mongoose.model('Result', ResultSchema);