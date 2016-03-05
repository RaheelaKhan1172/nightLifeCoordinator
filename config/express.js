var express = require('express'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  morgan = require('morgan');

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

  app.set('views','./app/views');
  app.set('view engine', 'ejs');
  
  require('../app/routes/index.server.route.js')(app);
  app.use(express.static('./public'));

  return app;
}
