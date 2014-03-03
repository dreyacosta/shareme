var app        = require('./app'),
    shareFiles = document.querySelector('.shareFiles');

app.socket.on('file:uploaded', function(data) {
  var filesNumber = shareFiles.innerHTML;

  if (filesNumber === '') {
    filesNumber = 0;
  }

  filesNumber = parseInt(filesNumber, null) + 1;
  shareFiles.innerHTML = filesNumber;
});

app.socket.on('file:removed', function(data) {
  var filesNumber = shareFiles.innerHTML;

  if (filesNumber === '') {
    filesNumber = 0;
  }

  filesNumber = parseInt(filesNumber, null) - data;
  shareFiles.innerHTML = filesNumber;
});

app.active.mainRouter = new app.routers.Main();

app.imports.Backbone.history.start({
  pushState: true,
  root: '/',
  silent : false
});