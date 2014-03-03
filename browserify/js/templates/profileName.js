var jade = require('./runtime');

(function (jade) {
	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="flex"><div class="anchor1 padding_medium width30 border rad_small margin_right_small"><span class="text bold center">username files</span></div></div>');
}
return buf.join("");
};
})(jade);