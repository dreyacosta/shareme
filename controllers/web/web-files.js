exports.init = function(noderplate) {
  var files    = {};

  files.getFile = function(req, res) {
    var roomFilesPath, file, filePath, query, exists, filter;

    roomFilesPath = noderplate.config.roomFilesPath;

    query  = req.core.data.query;
    exists = req.core.filesystem.exists;

    var collection;

    if (req.params.username) {
      collection = 'UserFile';
      filter = {
        username: req.params.username,
        filename: req.params.filename
      };
      filePath = './users/' + filter.username + '/' + filter.filename;
    }

    if (req.params.room) {
      collection = 'File';
      filter = {
        room: req.params.room,
        filename: req.params.filename
      };
      filePath = roomFilesPath + filter.room + '/' + filter.filename;
    }

    query(collection, 'findOne', filter).then(function(data) {
      file = data;

      return exists(filePath);
    }).then(function(exists) {
      if (exists) {
        var route, regex;

        query('Analytic', 'findOne', filter).then(function(analytic) {
          analytic.clicks = analytic.clicks + 1;
          analytic.save();
        });

        var pageRoute = '/:room/file/page/preview/:filename';

        if (req.params.username) {
          route = '/profile/:username/file/preview/:filename';
        }

        if (req.params.room) {
          route = '/:room/file/preview/:filename';
        }

        regex = new RegExp('image|pdf|audio|video|text\/plain','gi');

        if (req.route.path === pageRoute) {
          console.log('file', file);
          return res.render('filepreview', {data: file});
        }

        if (req.route.path === route && regex.test(file.type)) {
          return res.sendfile(filePath);
        }

        return res.download(filePath);
      }
    }).fail(function(err) {
      console.log(err);
      return res.render('filenotfound', {});
    });
  };

  return files;
};