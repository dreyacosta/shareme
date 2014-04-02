exports.init = function(noderplate) {
  var mongoose = noderplate.imports.mongoose;

  var fileSchema = mongoose.Schema({
    clicks: {
      type: Number,
      default: 0
    },
    filename: String,
    name: String,
    public: {
      type: Boolean,
      default: true
    },
    size: String,
    room: String,
    type: String,
    registerDate: {
      type: Date,
      default: Date.now
    }
  });

  var File = mongoose.model('file', fileSchema);

  return File;
};