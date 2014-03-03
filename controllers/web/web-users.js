exports.init = function(noderplate) {
  var users = {};

  users.register = function(req, res) {
    var method = req.route.method;

    if (method === 'get') {
      return res.render('register', {});
    }

    if (method === 'post') {
      var options = {
        username : req.body.username,
        pass     : req.body.pass,
        email    : req.body.email
      };

      req.core.users.register(options)
      .then(function(user) {
        var mailOptions = {
          from    : 'shareme.io',
          to      : user.email,
          subject : 'Hello ✔',
          html    : '<b>Hello world ✔</b>'
        };

        return req.core.sendmail.send(mailOptions);
      })
      .then(function(ress) {
        return res.redirect('/');
      })
      .fail(function(err) {
        return res.send('Fail sendmail');
      });
    }
  };

  users.login = function(req, res) {
    var method = req.route.method;

    if (method === 'get') {
      return res.render('login', {});
    }

    if (method === 'post') {
      var options = {
        username : req.body.username,
        pass     : req.body.pass
      };

      req.core.users.login(options)
      .then(function(user) {
        req.session.authenticated = true;

        req.session.user = {
          username     : user.username,
          email        : user.email,
          registerDate : user.registerDate
        };

        return res.redirect('/');
      })
      .fail(function() {
        return res.redirect('/');
      });
    }
  };

  users.profile = function(req, res) {
    var method = req.route.method;

    if (method === 'get') {
      return res.render('profile', {});
    }
  };

  users.logout = function(req, res) {
    req.session.destroy();
    return res.redirect('/');
  };

  return users;
};