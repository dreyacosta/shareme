exports.init = function(noderplate) {
  var core = {};

  core.data     = require('./core-data').init(noderplate);
  core.users    = require('./core-users').init(noderplate);
  core.files    = require('./core-files').init(noderplate);
  core.sendmail = require('./core-sendmail').init(noderplate);
  core.rooms    = require('./core-rooms').init(noderplate);

  return core;
};