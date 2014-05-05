'use strict';

var app        = require('./app'),
    lastScroll = 0,
    shareFiles = document.querySelector('.shareFiles'),
    container  = document.querySelector('.container'),
    header     = document.querySelector('header');

container.addEventListener('scroll', function(e) {
  if (e.target.scrollTop < lastScroll) {
    lastScroll = e.target.scrollTop;
    return header.style.height = '50px';
  }

  if (e.target.scrollTop > 0 && e.target.scrollTop > lastScroll) {
    lastScroll = e.target.scrollTop;
    return header.style.height = '0px';
  }
});

app.active.mainRouter = new app.routers.Main();

app.imports.Backbone.history.start({
  pushState: true,
  root: '/',
  silent : false
});