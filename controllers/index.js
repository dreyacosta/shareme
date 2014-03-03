exports.init = function(noderplate) {
  var controllers = {};

  controllers.web = require('./web').init(noderplate);
  controllers.api = require('./api').init(noderplate);

  return controllers;
};