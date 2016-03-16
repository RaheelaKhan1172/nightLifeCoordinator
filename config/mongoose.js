var config = require('./configuration'),
    mongoose = require('mongoose');

module.exports = function() {
    
  var db = (process.env.NODE_ENV === 'developement')? mongoose.connect(config.db):mongoose.connect(config.PROD_DB);
    
  require('../app/models/user.server.model');
  require ('../app/models/result.server.model');
  require('../app/models/vote.server.model');
    
  return db;
};