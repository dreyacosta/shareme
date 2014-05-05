'use strict';

exports.init = function(noderplate) {
  var mongoose = noderplate.imports.mongoose;

  var analyticSchema = mongoose.Schema({
    clicks: {
      type: Number,
      default: 0
    },
    clientData: {},
    filename: String,
    name: String,
    path: String,
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

  var Analytic = mongoose.model('analytic', analyticSchema);

  return Analytic;
};