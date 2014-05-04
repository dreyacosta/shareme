var app = require('../js/app');
var Backbone = app.imports.Backbone;

describe("Connect room view", function() {
  var roomData = {
    room: 'sD8xY',
    connections: 2,
    timeRemaining: '23:43'
  };
  app.room = new app.models.Room(roomData);
  var connectRoom = new app.views.ConnectRoom({
    model: app.room
  });
  connectRoom.render();

  it("should render connect room view", function() {
    var placeholder = connectRoom.el.querySelector('input').getAttribute('placeholder');
    expect(placeholder).toEqual('Room code');
  });
});