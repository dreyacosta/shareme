exports.init = function(noderplate) {
  var home = {};

  home.render = function(req, res) {
    var room, query;

    room  = req.params.room;
    query = req.core.data.query;

    if (!room) {
      return res.render('index', {
        title: 'Noderplate',
        sharefiles: 0,
        env: noderplate.app.env
      });
    }

    query('Room', 'findOne', {room: room}).then(function() {
      return res.render('index', {
        title: 'Noderplate',
        sharefiles: 0,
        env: noderplate.app.env
      });
    }).fail(function(err) {
      return res.render('roomnotfound', {});
    });
  };

  return home;
};