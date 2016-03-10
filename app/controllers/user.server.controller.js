var config = require('../../config/configuration'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Vote = mongoose.model('Vote'),
    Result = mongoose.model('Result'),
    Yelp = require('yelp');

exports.saveOAuthUserProfile = function(req,profile,done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function(err,user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                
                user = new User(profile);
                
                user.save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                    return done(err,user);
                });
            } else {
                return done(err,user);
            }
        }
    });
};