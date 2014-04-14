exports.init = function(noderplate) {
  var utils   = {},
      bcrypt  = noderplate.imports.bcrypt,
      model   = noderplate.app.models,
      sockets = noderplate.io.sockets,
      Q       = noderplate.imports.Q;

  utils.makeRoomId = function(argument) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for ( var i=0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  utils.generateSalt = function(password) {
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

  utils.compareHash = function(password, hash) {
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

  utils.RoomRemaining = function(roomData, remainingMinutes) {
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

      roomData.timeRemaining = self.timeRemaining;

      sockets.in(roomData.room).emit('room', roomData);

      if (self.timeRemaining === '89:31') {
        clearInterval(self.remainingInterval);
        model.File.find({room: roomData.room}, function(err, files) {
          sockets.emit('file:removed', files.length);
          if (files) {
            for (var idx in files) {
              var file = files[idx];
              noderplate.app.core.filesystem.deletefile('./files/' + file.room + '/' + file.filename);
              file.remove();
            }
          }
        });
        model.Room.remove({room: roomData.room}, function(err) {
          noderplate.app.core.filesystem.rmdir('./files/' + roomData.room);
          delete self.remainingInterval;
        });
      }
    }, 1000);
  };

  return utils;
};