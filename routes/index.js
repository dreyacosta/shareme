exports.init = function(noderplate) {
  var routes = {};

  routes.api = require('./api').init(noderplate);
  routes.web = require('./web').init(noderplate);

  return routes;
};