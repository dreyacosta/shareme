var jade = require('./runtime');

(function (jade) {
	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="flex y_center padding_medium border solid bottom_small"><div class="anchor5"><div><span class="text bold">' + escape((interp = model.name) == null ? '' : interp) + '</span></div><div class="text small desktop"><span class="middle">' + escape((interp = model.size) == null ? '' : interp) + '</span>');
if ( model.filename)
{
buf.push('<span class="middle padding_left_small">-</span><input');
buf.push(attrs({ 'value':('http://shareme.io/' + (model.room) + '/file/' + (model.filename) + ''), 'disabled':(true), "class": ('middle') + ' ' + ('bck') + ' ' + ('b_mysauce3') + ' ' + ('border') + ' ' + ('none') + ' ' + ('width40') + ' ' + ('text') + ' ' + ('book') }, {"value":true,"disabled":true}));
buf.push('/>');
}
buf.push('</div></div><div class="anchor1 text right bck b_mysauce4 text color c_white border rad_small">');
if ( model.filename)
{
buf.push('<a');
buf.push(attrs({ 'href':('/' + (model.room) + '/file/' + (model.filename) + ''), 'target':('_blank') }, {"href":true,"target":true}));
buf.push('><div class="downloadLink text center padding_small"><span class="fa fa-download"></span><span class="padding_left_small desktop">Download</span></div></a>');
}
else
{
buf.push('<div class="queueFile text center padding_small"><span class="desktop">Queue file</span></div>');
}
buf.push('<div style="background: rgb(0, 214, 255); width: 0%;" class="progressBar border rad_small hidden padding_small"></div></div></div>');
}
return buf.join("");
};
})(jade);