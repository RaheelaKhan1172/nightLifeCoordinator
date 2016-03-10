var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:String,
    provider: {
        type: String,
        required: 'Provider is requred'
    },
    providerId: String,
    providerData: {}
});

mongoose.model('User',UserSchema);