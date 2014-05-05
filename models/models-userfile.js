'use strict';

exports.init = function(noderplate) {
  var mongoose = noderplate.imports.mongoose;

  var userFileSchema = mongoose.Schema({
    clicks: {
      type: Number,
      default: 0
    },
    filename: String,
    name: String,
    public: {
      type: Boolean,
      default: false
    },
    username: String,
    size: String,
    room: String,
    type: String,
    registerDate: {
      type: Date,
      default: Date.now
    }
  });

  var UserFile = mongoose.model('userfile', userFileSchema);

  return UserFile;
};