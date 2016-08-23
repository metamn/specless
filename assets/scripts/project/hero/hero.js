var l = require('./../../framework/helpers/js/loop.js');
var select = require('./../../framework/helpers/js/select.js');
var klass = require('./../../framework/helpers/js/klass.js');
var elementSize = require('./../../framework/helpers/js/elementSize.js');
var elementPosition = require('./../../framework/helpers/js/elementPosition.js');
var transform = require('./../../framework/helpers/js/transform.js');
var getElementTransform = require('./../../framework/helpers/js/getElementTransform.js');
var scrollSnap = require('./../../framework/helpers/js/scrollSnap.js');
var vhToPx = require('./../../framework/helpers/js/vhToPx.js');
var getScrollTop = require('./../../framework/helpers/js/getScrollTop.js');


// Set up the Hero animation
//
function Hero() {
  this.header = select('.header')[0];
  this.publishers = select('.publishers')[0];
  this.hero = select('.hero')[0];

  this.laptop = select('.hero-mockup--laptop')[0];
  this.tablet = select('.hero-mockup--tablet')[0];
  this.phone = select('.hero-mockup--phone')[0];
  this.sliders = select('.hero .range');

  // How much we will animate?
  this.phoneTransformY = getElementTransform(this.phone, 'Y');

  // Set initial state
  this.setInitialState();

  // Set the scrolling window
  this.startPoint = this.header.offsetTop;
  this.endPoint = parseInt(this.startPoint) + vhToPx(50);
  this.startPointOffset = 0;
  //console.log('s:' + this.startPoint + ', e:' + this.endPoint);

  // Set the scrolling percentage for the phone
  this.phoneRelativeDistance = this.phoneTransformY / (this.endPoint - this.startPoint);

  // Set the scaling percentage for the slidesr
  this.slidersRelativeScale = 1 / (this.endPoint - this.startPoint);

  // Speed up the scrolling process
  this.phoneRelativeDistance *= 2;
  this.slidersRelativeScale *= 2;
}


// Manage the scroll
//
Hero.prototype.scroll = function(event) {
  var distance = getScrollTop();
  //console.log('d:' + distance);

  // How much to translateY
  var phoneY = distance - this.startPoint + this.startPointOffset;
  phoneY = this.phoneTransformY - phoneY * this.phoneRelativeDistance;
  //console.log('pY:' + phoneY);

  // Translate Y
  if (phoneY >= 0) {
    this.transform(this.phone, 0, phoneY);
  }

  // Set opacity
  var opacity = distance * this.slidersRelativeScale;
  if (opacity <= 1) {
    this.laptop.style.opacity = 1 - opacity;
    this.tablet.style.opacity = 1 - opacity;
    this.fadeSliders(opacity);
  }

  if ((phoneY < 0) || (opacity > 1)) {
    // phone position
    this.transform(this.phone, 0, 0);

    // hide mockups
    this.laptop.style.opacity = 0;
    this.tablet.style.opacity = 0;

    // show sliders
    this.fadeSliders(1);
  }
}


// Set initial state
//
Hero.prototype.setInitialState = function() {
  // fixed hero
  klass(this.hero, 'hero--fixed', 'add');
  klass(this.publishers, 'publishers--hero-fixed', 'add');

  // phone position
  this.transform(this.phone, 0, this.phoneTransformY);

  // show mockups
  this.laptop.style.opacity = 1;
  this.tablet.style.opacity = 1;

  // hide sliders
  this.fadeSliders(0);
}


// Set after state
//
Hero.prototype.setAfterState = function() {
  // fixed hero
  klass(this.hero, 'hero--fixed', 'remove');
  klass(this.publishers, 'publishers--hero-fixed', 'remove');

  // phone position
  this.transform(this.phone, 0, 0);

  // hide mockups
  this.laptop.style.opacity = 0;
  this.tablet.style.opacity = 0;

  // show sliders
  this.fadeSliders(1);
}


// Transform an element
//
Hero.prototype.transform = function(element, x, y) {
  var t = 'translateY(' + y + 'px) translateX(' + x + 'px)';
  transform(element, t, t);
}


// Scale an element
//
Hero.prototype.scale = function(element, scale) {
  var t = 'scale(' + scale + ')';
  transform(element, t, t);
}


// Fade in / out sliders
//
Hero.prototype.fadeSliders = function(opacity) {
  var _this = this;

  _this.sliders.loop(function(slider) {
    slider.style.opacity = opacity;
    _this.scale(slider, opacity);
  });
}


// The main function
function HeroAnimation() {
  h = new Hero;
  scrollSnap(h.startPoint, h.endPoint, h.startPointOffset, h.scroll.bind(h), h.setInitialState.bind(h), h.setAfterState.bind(h));
}


var h = select('.hero');
//if (h[0]) { HeroAnimation(); }
