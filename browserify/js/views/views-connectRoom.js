exports.init = function(app) {
  var templates = app.templates,
      regions   = app.regions,
      models    = app.models,
      socket    = app.socket,
      utils     = app.utils,
      active    = app.active,
      Backbone  = app.imports.Backbone;

  return Backbone.View.extend({
    template: templates.connectRoom,

    className: 'anchor \
                bck b_stimulation \
                border solid bottom_small',

    events: {
      'click .connectRoom' : 'connectRoom',
      'keyup input'        : 'connectRoom',
      'click input'        : 'connectRoom',
      'click .uploadFiles' : 'clickFakeInput'
    },

    initialize: function() {
      this.listenTo(this.model, 'change:filename', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.el.innerHTML = this.template();

      return this;
    }

    // selectors: function() {
    //   this.__joinRoom = this.el.querySelector('.joinRoom');
    //   this.__connectRoom = this.el.querySelector('.connectRoom');
    //   this.__room = this.el.querySelector('.room');
    //   this.__connections = this.el.querySelector('.connections');
    //   this.__timer = this.el.querySelector('.timer');
    //   this.__uploadFiles = this.el.querySelector('.uploadFiles');
    // },

    // connectRoom: function(e) {
    //   var room = e.currentTarget.value || this.el.querySelector('input').value;

    //   socket.emit('room', room);
    // },

    // clickFakeInput: function() {
    //   this.fakeInputFile.files = '';
    //   this.fakeInputFile.click();
    // },

    // sockets: function() {
    //   socket.on('create:file', this.newFile.bind(this));
    //   socket.on('room:info', this.roomInfo.bind(this));
    // },

    // newFile: function(file) {
    //   var fileModel, fileView, filesRegion;

    //   fileModel = new app.models.File(file);
    //   fileView = new app.views.File({
    //     model: fileModel
    //   });

    //   filesRegion = app.regions.files;

    //   app.utils.prepend({
    //     el: filesRegion,
    //     render: fileView.render().el
    //   });

    //   return fileView;
    // },

    // roomInfo: function(roomData) {
    //   var modelRoom = this.model.get('room');

    //   if (modelRoom === roomData.room) {
    //     this.model.set({
    //       room         : roomData.room,
    //       creationDate : roomData.creationDate,
    //       connections  : roomData.clients
    //     });

    //     return;
    //   }

    //   this.model.set({
    //     room         : roomData.room,
    //     creationDate : roomData.creationDate,
    //     connections  : roomData.clients
    //   });

    //   app.active.mainRouter.navigate(this.model.get('room'));
    // },

    // _remove: function() {
    //   this.fakeInputFile.remove();
    //   this.remove();
    // },

    // _removeIntervals: function() {
    //   if (this.timerInterval !== undefined) {
    //     clearInterval(this.timerInterval);
    //     this.timerInterval = undefined;
    //   }
    //   if (this.timer) {
    //     clearInterval(this.timer.remainingInterval);
    //   }
    // },

    // uploadFiles: function() {
    //   var files, file, modelRoom, fileView;

    //   files     = this.fakeInputFile.files;
    //   modelRoom = this.model.get('room');

    //   if (this.model.get('room') !== '') {
    //     for (var i in files) {
    //       file = files[i];

    //       if (typeof file === 'object') {
    //         fileView = this.newFile({
    //           files    : file,
    //           name     : file.name,
    //           size     : file.size,
    //           room     : modelRoom
    //         });
    //         fileView.uploadFile();
    //       }
    //     }
    //   }
    // },

    // remaining: function() {
    //   var self          = this,
    //       creationDate  = this.model.get('creationDate');

    //   this.timer = new utils.TimeRemaining(creationDate, app.config.roomLifespan);

    //   this.timerInterval = setInterval(function() {
    //     var timer = self.timer,
    //         model = self.model;

    //     model.set('timeRemaining', timer.timeRemaining);

    //     if (timer.timeRemaining === '00:01' || timer.timeElapsed === true) {
    //       clearInterval(timer.remainingInterval);
    //       clearInterval(self.timerInterval);

    //       window.location.reload();
    //     }
    //   }, 1000);
    // },

    // render: function() {
    //   this.el.innerHTML = this.template({
    //     model: this.model.toJSON()
    //   });

    //   this.selectors();

    //   if (this.model.get('room') !== '') {
    //     if (this.timerInterval === undefined) {
    //       this.remaining();
    //     }

    //     this.__joinRoom.classList.add('hidden');
    //     this.__connectRoom.classList.add('hidden');
    //     this.__room.classList.remove('hidden');
    //     this.__connections.classList.remove('hidden');
    //     this.__timer.classList.remove('hidden');
    //     this.__uploadFiles.classList.remove('hidden');

    //     return this;
    //   }

    //   this._removeIntervals();

    //   return this;
    // }
  });
};