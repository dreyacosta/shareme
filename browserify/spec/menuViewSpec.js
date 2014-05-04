var app = require('../js/app');
var Backbone = app.imports.Backbone;

describe("Menu view", function() {
  var menu = new app.views.Menu({
    model: app.room
  });
  menu.render();

  it("should render menu view", function() {
    var createRoomDiv = menu.el.querySelector('.createRoom');
    var hasHiddenClass = createRoomDiv.classList.contains('hidden');
    expect(hasHiddenClass).toEqual(true);
  });
});