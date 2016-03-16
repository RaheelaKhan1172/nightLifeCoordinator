var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../configuration'),
    users = require('../../app/controllers/user.server.controller');

module.exports = function() {
    
    console.log(config);
    
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        passReqToCallback: true
    }, function(req,accessToken,refreshToken,profile,done) {
        
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        var providerUserProfile = {
            name: profile.displayName,
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData
        };
        
        users.saveOAuthUserProfile(req, providerUserProfile, done);
        
    }));
}