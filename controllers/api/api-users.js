exports.init = function(noderplate) {
  var users = {};

  users.all = function(req, res) {
    req.core.data.query('Users', 'find', {})
    .then(function(users) {
      return res.jsonp(200, users);
    });
  };

  return users;
};