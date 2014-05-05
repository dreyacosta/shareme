'use strict';

exports.init = function(noderplate) {
  var config = {};

  config.express = require('./config-express').init(noderplate);
  config.middlewares = require('./config-middlewares').init(config);

  return config;
};