exports.init = function(noderplate) {
  var api = {};

  api.users = require('./api-users').init(noderplate);
  api.files = require('./api-files').init(noderplate);
  api.rooms = require('./api-rooms').init(noderplate);

  return api;
};