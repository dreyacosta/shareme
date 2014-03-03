exports.init = function(app) {
  var views = {};

  views.Upload      = require('./views-upload').init(app);
  views.File        = require('./views-file').init(app);
  views.Menu        = require('./views-menu').init(app);

  return views;
};