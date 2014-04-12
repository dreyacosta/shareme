exports.init = function(noderplate) {
  var mongoose = noderplate.imports.mongoose;

  var roomSchema = mongoose.Schema({
    connections: Number,
    creationDate: {
      type: Date,
      default: Date.now
    },
    room: String,
    timeRemaining: String
  });

  var Room = mongoose.model('room', roomSchema);

  return Room;
};