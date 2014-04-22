exports.init = function(noderplate) {
  var sockets = {};

  var getSocketRooms = function(socket) {
    var sockRooms      = noderplate.io.sockets.manager.roomClients[socket.id],
        roomsName      = Object.keys(sockRooms),
        formattedNames = [];

    for (var idx in roomsName) {
      var slashOf = roomsName[idx].replace('\/', '');
      formattedNames.push(slashOf);
    }

    return formattedNames;
  };

  var getRoomClients = function(room) {
    var clients = noderplate.io.sockets.clients(room);
    return clients.length;
  };

  var leaveRooms = function(socket) {
    var rooms, roomData, roomName, clients;

    rooms = getSocketRooms(socket);

    for (var idx in rooms) {
      roomName = rooms[idx];

      socket.leave(roomName);

      clients = getRoomClients(roomName);

      roomData = {
        room: roomName,
        connections: clients - 1
      };

      if (roomData.room !== '') {
        socket.in(rooms[1]).broadcast.emit('room', roomData);
      }
    }
  };

  sockets['disconnect'] = function(req) {
    leaveRooms(req.socket);
  };

  sockets['room'] = function(req) {
    var roomId, roomData, roomFiles, roomConnection;

    leaveRooms(req.socket);

    roomId = req.data.room;
    roomConnection = getRoomClients(roomId);

    req.socket.join(roomId);

    req.core.data.query('Room', 'findOne', {room: roomId})

    .then(function(data) {
      if (!data) { return; }

      data.connections = roomConnection;

      req.io.sockets.in(data.room).emit('room', data);
    })
    .fail(function(err) {
      console.log(err);
    });
  };

  sockets['files'] = function(req) {
    var roomId, roomData, roomFiles;

    roomId = req.data.room;

    req.socket.join(roomId);

    req.core.data.query('File', 'find', {room: roomId})

    .then(function(files) {
      if (!files) { return; }

      req.io.sockets.in(roomId).emit('files', files);
    })
    .fail(function(err) {
      console.log(err);
    });
  };

  return sockets;
};