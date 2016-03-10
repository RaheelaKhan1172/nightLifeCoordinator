var users = require('../../app/controllers/user.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    var yelp = require('../controllers/yelp-api.controller');
    app.route('/')
    .get(index.render)
    .post(yelp.search)
    .put(yelp.update);
    
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/'
    }));
    
    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/',
        successRedirect: '/'  //change later to previous search
    }));
};