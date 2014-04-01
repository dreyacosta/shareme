exports.init = function(config) {
  config.middlewares = {};

  config.middlewares.requireLogin = function(req, res, next) {
    if (req.session.authenticated === true) {
      next();
    } else {
      req.session.message = {
        type: 'error',
        description: "You're not logged"
      };

      if (req.headers.accept === 'application/json') {
        return res.jsonp(403, req.session.message);
      }

      return res.redirect('/');
    }
  };

  config.middlewares.fileAnalytics = function(req, res, next) {
    var file, analytics;

    file = {
      filename : req.files.files.name.replace(/\s|%/g, '-'),
      name     : req.files.files.name,
      size     : req.files.files.size,
      room     : req.body.room,
      type     : req.files.files.type
    };

    analytics          = file;
    analytics.headers  = req.headers;
    analytics.clientIp = req.headers['x-forwarded-for'] ||
                         req.connection.remoteAddress ||
                         req.socket.remoteAddress ||
                         req.connection.socket.remoteAddress;

    req.core.data.save('Analytic', analytics);

    next();
  };

  return config.middlewares;
};