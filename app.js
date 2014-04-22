var noderplate = require('./noderplate');

noderplate.io.sockets.on('connection', function(socket) {
  noderplate.app.core.sockets.init(socket);
});

noderplate.server.listen(noderplate.app.get('port'), function(){
  console.log('Express server listening on port ' + noderplate.app.get('port'));
});