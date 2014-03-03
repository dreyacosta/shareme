exports.init = function(app) {
  var routers = {};

  routers.Main = require('./routers-main').init(app);

  return routers;
};