'use strict';

exports.init = function(app) {
  app.socket.on('room', function(data) {
    app.room.set(data);
  });

  app.socket.on('files', function(data) {
    data.forEach(function(file) {
      var item = app.files.find(function(item){
        return item.get('_id') === file._id;
      });

      if (item) {
        return;
      }

      var fileModel = new app.models.File(file);
      app.files.add(fileModel);
    });
  });
};