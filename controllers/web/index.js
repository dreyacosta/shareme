'use strict';

exports.init = function(noderplate) {
  var web = {};

  web.home  = require('./web-home').init(noderplate);
  web.users = require('./web-users').init(noderplate);
  web.files = require('./web-files').init(noderplate);

  return web;
};