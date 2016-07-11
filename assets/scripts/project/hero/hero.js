var _ = require('lodash');
var select = require('./../../framework/helpers/js/select.js');
var klass = require('./../../framework/helpers/js/klass.js');
var scrolledIntoView = require('./../../framework/helpers/js/scrolledIntoView.js');
var elementCenter = require('./../../framework/helpers/js/elementCenter.js');
var setElementPosition = require('./../../framework/helpers/js/setElementPosition.js');
var windowSize = require('./../../framework/helpers/js/windowSize.js');
var isPortrait = require('./../../framework/helpers/js/isPortrait.js');


var scrollSnap = function(containerID) {
  window.addEventListener('scroll',
    _.throttle(_.bind(scrollSnapHero, this), 100)
  );
};


var scrollSnapHero = function() {
  var hero = select('.hero')[0];

  var slide1Mockup = select('.hero-slide-1 .mockup')[0];
  var slide2Mockup = select('.hero-slide-2 .mockup')[0];
  var slide3Mockup = select('.hero-slide-3 .mockup')[0];

  var slide1 = select('.hero-slide-1')[0];
  var slide2 = select('.hero-slide-2')[0];
  var slide3 = select('.hero-slide-3')[0];

  var slide2MockupTop = 15;
  var slide3MockupTop = 20;

  var slide2MockupCenter = elementCenter(slide2Mockup, slide2MockupTop, 0);
  setElementPosition(slide2Mockup, slide2MockupCenter.top, slide2MockupCenter.left);

  var slide3MockupCenter = elementCenter(slide3Mockup, slide3MockupTop, 0);
  setElementPosition(slide3Mockup, slide3MockupCenter.top, slide3MockupCenter.left);

  var w = windowSize();

  if (scrolledIntoView(hero, 0, 1000)) {
    klass(hero, 'hero--active', 'add');
  } else {
    klass(hero, 'hero--active', 'remove');
  }

  if (scrolledIntoView(slide1Mockup, w.height / 2, 0)) {
    klass(slide1, 'hero-slide-1--fixed', 'add');
  } else {
    klass(slide1, 'hero-slide-1--fixed', 'remove');
  }

  if (scrolledIntoView(slide2Mockup, w.height / 2, 0)) {
    klass(slide2, 'hero-slide-2--fixed', 'add');
  } else {
    klass(slide1, 'hero-slide-2--fixed', 'remove');
  }

  if (scrolledIntoView(slide3Mockup, w.height / 2, 0)) {
    klass(slide3, 'hero-slide-3--fixed', 'add');
  } else {
    klass(slide1, 'hero-slide-3--fixed', 'remove');
  }
}

scrollSnap();
