var noderplate = require('./noderplate');

noderplate.server.listen(noderplate.app.get('port'), function(){
  console.log('Express server listening on port ' + noderplate.app.get('port'));
});