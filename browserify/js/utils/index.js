exports.init = function(app) {
  var utils = {};

  utils.prepend = function(options) {
    var el     = options.el,
        render = options.render;
    return el.insertBefore(render, el.firstChild);
  };

  utils.TimeRemaining = function(creationDate, remainingMinutes) {
    var self = {};
    var originalDate, newDate, datesDiff, minutes, seconds, toTwoDigits;

    toTwoDigits = function(digit) {
      if (digit < 10) {
        digit = '0' + digit;
      }
      return digit;
    };

    self.remainingInterval = setInterval(function() {
      originalDate = new Date(creationDate);
      newDate      = new Date();

      originalDate.setMinutes(originalDate.getMinutes() + remainingMinutes);

      if ((originalDate - newDate) < 0) {
        self.timeElapsed = true;
      }

      datesDiff = Math.abs(originalDate - newDate);
      minutes   = (datesDiff / 1000 / 60) << 0;
      seconds   = (datesDiff / 1000) % 60;

      minutes = Math.round(minutes);
      seconds = Math.round(seconds);

      minutes = toTwoDigits(minutes);
      seconds = toTwoDigits(seconds);

      if (seconds === 60) {
        minutes = parseInt(minutes, null) + 1;
        minutes = toTwoDigits(minutes);
        seconds = '00';
      }

      self.timeRemaining = minutes + ':' + seconds;
    }, 1000);

    return self;
  };

  utils.cleanModels = function(models) {
    for (var idx in models) {
      var model = models[idx];
      model.destroy();
    }
    models = [];
    return models;
  };

  return utils;
};