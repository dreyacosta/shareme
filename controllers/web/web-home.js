exports.init = function(noderplate) {
  var home = {};

  home.render = function(req, res) {
    if (req.params.room !== undefined) {
      req.core.rooms.get({room: req.params.room})
      .then(function(response) {
        req.core.files.getFiles()
        .then(function(files) {
          return res.render('index', {
            title      : 'Noderplate',
            sharefiles : files,
            env        : noderplate.app.env
          });
        });
      })
      .fail(function(err) {
        return res.render('roomnotfound', {});
      });
    } else {
      req.core.files.getFiles()
      .then(function(files) {
        return res.render('index', {
          title      : 'Noderplate',
          sharefiles : files,
          env        : noderplate.app.env
        });
      });
    }
  };

  return home;
};