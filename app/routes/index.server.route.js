module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    var yelp = require('../controllers/yelp-api.controller');
    app.route('/')
    .get(index.render)
    .post(yelp.search);
    

};