exports.init = function(noderplate) {
  var sockets    = noderplate.io.sockets,
      RedisStore = noderplate.imports.RedisStore,
      redis      = noderplate.imports.redis,
      pub        = redis.createClient(),
      sub        = redis.createClient(),
      client     = redis.createClient();

  var getSocketRooms = function(socket) {
    var sockRooms      = sockets.manager.roomClients[socket.id],
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

  noderplate.io.configure(function () {
    noderplate.io.set('store', new RedisStore({
      redisPub : pub,
      redisSub : sub,
      redisClient : client
    }));
  });

  var leaveRooms = function(socket) {
    var rooms, roomData, roomName, clients;

    rooms = getSocketRooms(socket);

    for (var idx in rooms) {
      roomName = rooms[idx];

      socket.leave(roomName);

      clients = getRoomClients(roomName);

      roomData = {
        room: roomName,
        clients: clients - 1
      };

      if (roomData.room !== '') {
        socket.in(rooms[1]).broadcast.emit('room:info', roomData);
      }
    }
  };

  noderplate.io.configure(function (){
    noderplate.io.set('authorization', function (handshakeData, callback) {
      handshakeData.core = noderplate.app.core;
      callback(null, true);
    });
  });

  sockets.on('connection', function(socket) {

    socket.on('disconnect', function() {
      leaveRooms(socket);
    });

    socket.on('room', function(data) {
      leaveRooms(socket);

      noderplate.app.core.data.query('Room', 'findOne', {room: data})
      .then(function(response) {
        if (response) {
          socket.join(response.room);

          var clients = getRoomClients(response.room);

          var roomData = {
            room: response.room,
            creationDate: response.creationDate,
            clients: clients - 1
          };

          sockets.in(response.room).emit('room:info', roomData);

          noderplate.app.core.data.query('File', 'find', { room : data })
          .then(function(files) {
            for (var idx in files) {
              var file = files[idx];

              socket.in(roomData.room).emit('file:create', file);
            }
          })
          .fail(function(err) {
            console.log(err);
          });
        }
      });
    });

    socket.on('file:create', function(data) {
      var rooms = getSocketRooms(socket);

      sockets.emit('file:uploaded', 1);

      if (rooms[1]) {
        socket.in(rooms[1]).broadcast.emit('file:create', data);
      }
    });

  });

  return sockets;
};