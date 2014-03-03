exports.init = function(noderplate) {
  var mongoose = noderplate.imports.mongoose;

  var roomSchema = mongoose.Schema({
    room: String,
    creationDate: {
      type: Date,
      default: Date.now
    }
  });

  var Room = mongoose.model('room', roomSchema);

  return Room;
};