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

  return config.middlewares;
};