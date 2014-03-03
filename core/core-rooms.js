exports.init = function (noderplate) {
  var rooms  = {},
      bcrypt = noderplate.imports.bcrypt,
      Q      = noderplate.imports.Q,
      model  = noderplate.app.models;

  var makeid = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for ( var i=0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  rooms.create = function() {
    var id = makeid();

    var room = new model.Room();

    room.room = id;

    room.save();

    return room;
  };

  rooms.get = function(options) {
    var room = options.room,
        dfd  = Q.defer();

    model.Room.findOne({room: room}, function(err, room) {
      if (err) {
        return dfd.reject(err);
      }

      if (!room) {
        return dfd.reject('not room found');
      }

      room.save();

      return dfd.resolve(room);
    });

    return dfd.promise;
  };

  return rooms;
};