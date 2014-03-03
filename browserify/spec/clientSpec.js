var app = require('../js/app');
var Backbone = app.imports.Backbone;

describe("Room model", function() {
  var roomData = {
    room: 'sD8xY',
    connections: 2,
    timeRemaining: '23:43'
  };

  it("should be able to create test objects", function() {
    var room = new app.models.Room();
    expect(room).toBeDefined();
    expect(roomData).toBeDefined();
  });

  it("should have correct URL", function() {
    var room = new app.models.Room();
    expect(room.url).toEqual('/api/create/room');
  });

  describe("When it save", function() {
    var room;

    beforeEach(function() {
      spyOn(Backbone.$, 'ajax').and.callFake(function(options) {
        options.success(roomData);
      });

      room = new app.models.Room();
      room.save();
    });

    it("should be able to parse mock data", function() {
      expect(room.get('room')).toEqual('sD8xY');
      expect(room.get('connections')).toEqual(2);
      expect(room.get('timeRemaining')).toEqual('23:43');
    });
  });
});