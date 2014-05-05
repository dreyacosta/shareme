'use strict';

exports.init = function(app) {
  var models = {};

  models.File = require('./models-file').init(app);
  models.Room = require('./models-room').init(app);

  return models;
};