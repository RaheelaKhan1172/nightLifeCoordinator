var config = require('../../config/configuration'),
    Yelp = require('yelp'),
    Vote = require('../models/vote.server.model'),
    Result = require('../models/result.server.model');

exports.search = function(req,res) {
var client = new Yelp({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    token: config.token,
    token_secret: config.tokenSecret
});

client.search({term:'bars', location:req.body.search})
.then(function(data) {
    res.json(data);
})
.catch(function(err) {
    console.log(err);
});
};