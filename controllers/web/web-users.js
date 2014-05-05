'use strict';

exports.init = function(noderplate) {
  var users = {};

  users.register = function(req, res) {
    var method = req.route.method;

    if (method === 'get') {
      return res.render('register', {});
    }

    if (method === 'post') {
      if (req.body.pass !== req.body.confirmPass) {
        return res.render('register', {
          status: 'error',
          message: 'Pass doesnt match'
        });
      }

      if (req.body.pass.length < 6) {
        return res.render('register', {
          status: 'error',
          message: 'Pass must have a minimum of 6 character'
        });
      }

      var options = {
        username : req.body.username,
        pass     : req.body.pass,
        email    : req.body.email
      };

      var query = {
        username : req.body.username
      };

      req.core.data.query('User', 'findOne', query)

      .then(function(user) {
        if (user) {
          return res.render('register', {
            status: 'error',
            message: 'Message'
          });
        }

        req.core.utils.generateSalt(options.pass)

        .then(function(resp) {
          options.pass = resp.hash;
          options.salt = resp.salt;
          return req.core.data.save('User', options);
        })
        .then(function() {
          var mailsettings = {
            from: 'shareme.io',
            to: options.email,
            bcc: noderplate.config.sendmail.bcc,
            subject: 'Confirm registration',
            html: '<h1>Hello World!</h1>'
          };
          return req.core.sendmail.send(mailsettings);
        })
        .then(function() {
          return res.redirect('/');
        })
        .fail(function(err) {
          return res.render('register', {
            status: 'error',
            message: err
          });
        });
      })
      .fail(function(err) {

      });
    }
  };

  users.login = function(req, res) {
    var user;

    var method = req.route.method;

    if (method === 'get') {
      return res.render('login', {});
    }

    if (method === 'post') {
      var options = {
        username : req.body.username,
        pass     : req.body.pass
      };

      var query = {
        username : req.body.username
      };

      req.core.data.query('User', 'findOne', query)

      .then(function(data) {
        user = data;

        return req.core.utils.compareHash(options.pass, user.pass);
      })
      .then(function() {
        req.session.authenticated = true;
        req.session.user = {
          username: user.username,
          email: user.email,
          registerDate: user.registerDate
        };
        return res.redirect('/profile/' + req.session.user.username);
      })
      .fail(function(err) {
        return res.render('login', {
          status: 'error',
          message: err
        });
      });
    }
  };

  users.profile = function(req, res) {
    var method = req.route.method;

    if (method === 'get') {
      if (req.params.username === req.session.user.username) {
        req.core.data.query('UserFile', 'find', {username: req.session.user.username})

        .then(function(files) {
          var data = {
            session: req.session,
            files: files
          };
          return res.render('profile', data);
        });
      } else {
        return res.redirect('/');
      }
    }
  };

  users.logout = function(req, res) {
    req.session.destroy();
    return res.redirect('/');
  };

  return users;
};