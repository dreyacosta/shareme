var app = {
  imports     : {},
  regions     : {},
  templates   : {},
  utils       : {},
  models      : {},
  collections : {},
  views       : {},
  routers     : {},
  socket      : {},
  active      : {}
};

app.imports = {
  $        : require('browserify-zepto'),
  _        : require('underscore'),
  Backbone : require('backbone'),
  io       : require('socket.io-client')
};

app.imports.Backbone.$ = app.imports.$;

app.regions = {
  upload : document.getElementById('upload'),
  files  : document.getElementById('files'),
  menu   : document.getElementById('menu')
};

app.templates = {
  file        : require('./templates/file'),
  connectRoom : require('./templates/connectRoom'),
  infoRoom    : require('./templates/infoRoom'),
  profileFile : require('./templates/profileFile'),
  profileName : require('./templates/profileName'),
  menu        : require('./templates/menu')
};

app.socket      = app.imports.io.connect();
app.config      = require('./config');
app.utils       = require('./utils').init(app);
app.sockets     = require('./sockets').init(app);
app.models      = require('./models').init(app);
app.collections = require('./collections').init(app);
app.views       = require('./views').init(app);
app.routers     = require('./routers').init(app);

module.exports = app;