exports.init = function(noderplate) {
  var sockets = {};

  var RedisStore = noderplate.imports.RedisStore,
      redis      = noderplate.imports.redis,
      pub        = redis.createClient(),
      sub        = redis.createClient(),
      client     = redis.createClient();

  noderplate.io.configure(function () {
    noderplate.io.set('store', new RedisStore({
      redisPub : pub,
      redisSub : sub,
      redisClient : client
    }));
  });

  var cookie = require('cookie');

  noderplate.io.configure(function (){
    noderplate.io.set('authorization', function (handshakeData, callback) {

      if (handshakeData.headers.cookie) {

        handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);

        handshakeData.sessionID = require('connect').utils.parseSignedCookie(handshakeData.cookie['connect.sid'], noderplate.config.session.secret);

        var sessionStore = noderplate.sessionStore;

        sessionStore.get(handshakeData.sessionID, function(err, data) {
          handshakeData.sessiondata = data;
          callback(null, true);
        });
      }
    });
  });

  sockets.init = function(socket) {
    var setRoute = function(key, callback) {
      socket.on(key, function(data) {
        var req = {};

        req.io = noderplate.io;
        req.core = noderplate.app.core;
        req.socket = socket;
        req.session = socket.handshake.sessiondata;
        req.data = data;

        callback(req);
      });
    };

    for (var key in noderplate.app.sockets) {
      var evt = noderplate.app.sockets[key];
      setRoute(key, evt);
    }
  };

  return sockets;
};