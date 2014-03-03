exports.init = function(noderplate) {
  var rooms = {},
      model = noderplate.app.models,
      fs    = noderplate.imports.fs;

  var RoomRemaining = function(roomData, remainingMinutes) {
    var self = {};
    var originalDate, newDate, datesDiff, minutes, seconds, toTwoDigits;

    toTwoDigits = function(digit) {
      if (digit < 10) {
        digit = '0' + digit;
      }
      return digit;
    };

    self.remainingInterval = setInterval(function() {
      originalDate = new Date(roomData.creationDate);
      newDate      = new Date();

      originalDate.setMinutes(originalDate.getMinutes() + remainingMinutes);

      datesDiff = Math.abs(originalDate - newDate);
      minutes   = (datesDiff / 1000 / 60) << 0;
      seconds   = (datesDiff / 1000) % 60;

      minutes = Math.round(minutes);
      seconds = Math.round(seconds);

      minutes = toTwoDigits(minutes);
      seconds = toTwoDigits(seconds);

      self.timeRemaining = minutes + ':' + seconds;

      if (self.timeRemaining === '00:01') {
        clearInterval(self.remainingInterval);
        model.File.find({room: roomData.room}, function(err, files) {
          noderplate.io.sockets.emit('file:removed', files.length);
          if (files) {
            for (var idx in files) {
              var file = files[idx];
              noderplate.app.core.data.deleteFile(file.path);
              file.remove();
            }
          }
        });
        model.Room.remove({room: roomData.room}, function(err) {
          noderplate.app.core.data.removeDirectory('./files/' + roomData.room);
        });
      }
    }, 1000);
  };

  rooms.create = function(req, res) {
    var room = req.core.rooms.create();

    new RoomRemaining(room, 30);

    return res.jsonp(room);
  };

  return rooms;
};