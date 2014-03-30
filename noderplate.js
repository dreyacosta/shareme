var noderplate = {
  imports : {},
  app     : {}
};

noderplate.imports = {
  express    : require('express'),
  http       : require('http'),
  path       : require('path'),
  fs         : require('fs'),
  bcrypt     : require('bcrypt'),
  mongoose   : require('mongoose'),
  MongoStore : require('connect-mongo'),
  RedisStore : require('socket.io/lib/stores/redis'),
  redis      : require('socket.io/node_modules/redis'),
  nodemailer : require('nodemailer'),
  io         : require('socket.io'),
  Q          : require('q')
};

var express = noderplate.imports.express,
    http    = noderplate.imports.http;

noderplate.app             = express();
noderplate.server          = http.createServer(noderplate.app);
noderplate.io              = noderplate.imports.io.listen(noderplate.server);
noderplate.app.MongoStore  = noderplate.imports.MongoStore(express);

// Set up for Unit Tests
if (process.argv[2] === 'simplemocha') {
  noderplate.app.set('env', 'simplemocha');
}

noderplate.config = require('./config/config-main')[noderplate.app.get('env')];

// Set up App modules
noderplate.app.config      = require('./config').init(noderplate);
noderplate.app.models      = require('./models').init(noderplate);
noderplate.app.core        = require('./core').init(noderplate);
noderplate.app.controllers = require('./controllers').init(noderplate);
noderplate.app.routes      = require('./routes').init(noderplate);
noderplate.app.sockets     = require('./sockets').init(noderplate);

module.exports = noderplate;