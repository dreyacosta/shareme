exports.init = function (noderplate) {
  var users  = {},
      bcrypt = noderplate.imports.bcrypt,
      Q      = noderplate.imports.Q,
      model  = noderplate.app.model;

  var generateSalt = function(password) {
    var dfd = Q.defer();

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        var resp = {
          salt: salt,
          hash: hash
        };

        dfd.resolve(resp);
      });
    });

    return dfd.promise;
  };

  var compareHash = function(password, hash) {
    var dfd = Q.defer();

    bcrypt.compare(password, hash, function(err, response) {
      if (err) {
        return dfd.reject(err);
      }

      if (response === true) {
        return dfd.resolve(true);
      }

      return dfd.reject('check your password');
    });

    return dfd.promise;
  };

  users.register = function(options) {
    var username = options.username,
        email    = options.email,
        pass     = options.pass,
        dfd      = Q.defer();

    generateSalt(pass)
    .then(function(resp) {
      var user = new model.User();

      user.username = username;
      user.email = email;
      user.pass = resp.hash;
      user.salt = resp.salt;

      user.save();

      return dfd.resolve(user);
    });

    return dfd.promise;
  };

  users.login = function(options) {
    var username = options.username,
        pass     = options.pass,
        dfd      = Q.defer();

    model.User.findOne({username: username}, function(err, user) {
      if (err) {
        return dfd.reject(err);
      }

      if (!user) {
        return dfd.reject('not user found');
      }

      compareHash(pass, user.pass)
      .then(function(res) {
        return dfd.resolve(user);
      })
      .fail(function() {
        return dfd.reject();
      });
    });

    return dfd.promise;
  };

  users.all = function(options) {
    var dfd = Q.defer();

    model.User.find({}, function(err, users) {
      if (err) {
        return dfd.reject(err);
      }

      return dfd.resolve(users);
    });

    return dfd.promise;
  };

  return users;
};