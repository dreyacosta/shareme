'use strict';

exports.init = function(noderplate) {
  var core = {};

  core.utils      = require('./core-utils').init(noderplate);
  core.data       = require('./core-data').init(noderplate);
  core.filesystem = require('./core-filesystem').init(noderplate);
  core.sendmail   = require('./core-sendmail').init(noderplate);
  core.sockets    = require('./core-sockets').init(noderplate);

  return core;
};