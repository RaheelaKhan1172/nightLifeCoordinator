var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    votedOn: [{
        type:Schema.ObjectId,
        ref:'Vote'
    }],
    email:String,
    password: String
});

mongoose.model('User',UserSchema);