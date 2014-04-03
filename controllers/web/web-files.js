exports.init = function(noderplate) {
  var files    = {};

  files.getFile = function(req, res) {
    var roomFilesPath, file, filePath, query, exists, filter;

    roomFilesPath = noderplate.config.roomFilesPath;

    query  = req.core.data.query;
    exists = req.core.filesystem.exists;

    filter = {
      room: req.params.room,
      filename: req.params.filename
    };

    filePath = roomFilesPath + filter.room + '/' + filter.filename;

    query('File', 'findOne', filter).then(function(file) {
      file = file;

      return exists(filePath);
    }).then(function(exists) {
      if (exists) {
        var route, regex;

        query('Analytic', 'findOne', filter).then(function(analytic) {
          analytic.clicks = analytic.clicks + 1;
          analytic.save();
        });

        route = '/:room/file/preview/:filename';
        regex = new RegExp('image|pdf|audio|video|text\/plain','gi');

        if (req.route.path === route && regex.test(file.type)) {
          return res.sendfile(filePath);
        }

        return res.download(filePath);
      }
    }).fail(function(err) {
      return res.render('filenotfound', {});
    });
  };

  return files;
};