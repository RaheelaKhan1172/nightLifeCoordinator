var yelpController = require('./yelp-api.controller');

exports.render = function(req,res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }
  req.session.lastVisit = new Date();

    res.render('index', {
        user: JSON.stringify(req.user)
    });  
    
};
