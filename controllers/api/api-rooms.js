'use strict';

exports.init = function(noderplate) {
  var rooms = {};

  rooms.create = function(req, res) {
    var roomId, data, room, roomLifespan;

    roomLifespan = noderplate.config.roomLifespan;
    roomId       = req.core.utils.makeRoomId();

    data = {
      room: roomId
    };

    room = req.core.data.save('Room', data);

    new req.core.utils.RoomRemaining(room, roomLifespan);

    return res.jsonp(room);
  };

  return rooms;
};