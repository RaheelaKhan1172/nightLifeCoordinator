process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

var express = require('./config/express');

var app = express();
app.listen(3030);
module.exports = app;


