var app = require('../js/app');
var Backbone = app.imports.Backbone;

describe("Info room view", function() {
  var infoRoom = new app.views.InfoRoom({
    model: app.room
  });
  infoRoom.render();

  it("should render room view", function() {
    var roomDiv = infoRoom.el.querySelector('.room');
    var roomCode = roomDiv.querySelector('a').innerHTML;

    expect(roomCode).toEqual('sD8xY');
  });
});