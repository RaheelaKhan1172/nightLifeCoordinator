var config = require('./configuration'), 
  express = require('express'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  session = require('express-session'),
  morgan = require('morgan'),
  passport = require('passport');

module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'developement') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended:true
  }));
  app.use(bodyParser.json());
  
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));
  
  app.set('views','./app/views');
  app.set('view engine', 'ejs');
  
  app.use(passport.initialize());
  app.use(passport.session());
    
  require('../app/routes/index.server.route.js')(app);
    
  app.use(express.static('./public'));

  return app;
}
