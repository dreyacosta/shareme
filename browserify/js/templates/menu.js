var jade = require('./runtime');

(function (jade) {
	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<span class="createRoom text bold cursor pointer"><span class="fa fa-plus padding_right_small"></span><span>Create room</span></span><span class="disconnectRoom text bold cursor pointer hidden"><span class="fa fa-sign-out padding_right_small"></span><span>Leave room</span></span>');
}
return buf.join("");
};
})(jade);