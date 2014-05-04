var app = require('../js/app');
var Backbone = app.imports.Backbone;

describe("File model", function() {
  var fileData = {
    _id: "5366219d854696067744fc64",
    clicks: 0,
    filename: "dreyacosta.png",
    files: {
      name: "dreyacosta.png",
      size: 34582,
      type: "image/png"
    },
    name: "dreyacosta.png",
    path: "",
    public: true,
    registerDate: "2014-05-04T11:16:45.195Z",
    room: "L9u6h",
    size: "34582",
    type: "image/png"
  };

  beforeEach(function() {
    spyOn(Backbone.$, 'ajax').and.callFake(function(options) {
      options.success(fileData);
    });
  });

  it("should create and upload a file model", function() {
    var file = new app.models.File({
      files: fileData.files,
      name: fileData.files.name,
      size: fileData.files.size,
      room: fileData.room,
    });

    file.save();

    expect(file.get('_id')).toEqual('5366219d854696067744fc64');
    expect(file.get('filename')).toEqual('dreyacosta.png');
  });
});