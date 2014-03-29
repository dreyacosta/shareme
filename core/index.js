exports.init = function(noderplate) {
  var core = {};

  core.utils      = require('./core-utils').init(noderplate);
  core.data       = require('./core-data').init(noderplate);
  core.filesystem = require('./core-filesystem').init(noderplate);
  core.users      = require('./core-users').init(noderplate);
  core.sendmail   = require('./core-sendmail').init(noderplate);

  return core;
};