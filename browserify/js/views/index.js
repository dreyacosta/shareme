'use strict';

exports.init = function(app) {
  var views = {};

  views.ConnectRoom = require('./views-connectRoom').init(app);
  views.InfoRoom    = require('./views-infoRoom').init(app);
  views.File        = require('./views-file').init(app);
  views.Files       = require('./views-files').init(app);
  views.ProfileFile = require('./views-profilefile').init(app);
  views.Menu        = require('./views-menu').init(app);

  return views;
};