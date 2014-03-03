var jade = require('./runtime');

(function (jade) {
	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="flex"><div class="joinRoom anchor2 text center color c_white"><input type="text" placeholder="Room code" class="anchor border none padding_medium"/></div><div class="connectRoom anchor1 flex x_center y_center bck b_mysauce1_dark padding_medium text center color c_white cursor pointer"><span class="fa fa-sign-in padding_right_small"></span><span>Connect</span></div><div class="room anchor3 bck b_white padding_medium text bold center hidden"><span class="fa fa-lock padding_right_small"></span><span><a');
buf.push(attrs({ 'href':('http://shareme.io/' + (model.room) + '') }, {"href":true}));
buf.push('>' + escape((interp = model.room) == null ? '' : interp) + '</a></span></div><div class="connections anchor2 bck b_green padding_medium text center color c_white hidden"><span class="fa fa-user padding_right_small"></span><span>' + escape((interp = model.connections) == null ? '' : interp) + '</span></div><div class="timer anchor3 bck b_red padding_medium text center color c_white hidden"><span class="fa fa-clock-o padding_right_small"></span><span>' + escape((interp = model.timeRemaining) == null ? '' : interp) + '</span></div><div class="uploadFiles anchor1 bck b_mysauce1_dark padding_medium text center color c_white cursor pointer hidden"><span class="fa fa-cloud-upload"></span><span class="padding_left_small desktop">Upload</span></div></div>');
}
return buf.join("");
};
})(jade);