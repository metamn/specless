var select = require('./../../framework/helpers/js/select.js');
var klass = require('./../../framework/helpers/js/klass.js');
var elementSize = require('./../../framework/helpers/js/elementSize.js');
var elementPosition = require('./../../framework/helpers/js/elementPosition.js');
var setElementPosition = require('./../../framework/helpers/js/setElementPosition.js');
var transform = require('./../../framework/helpers/js/transform.js');
var getElementTransform = require('./../../framework/helpers/js/getElementTransform.js');
var scrollSnap = require('./../../framework/helpers/js/scrollSnap.js');
var vhToPx = require('./../../framework/helpers/js/vhToPx.js');
var getScrollTop = require('./../../framework/helpers/js/getScrollTop.js');


// Set up the Hero animation
//
// - see docs at Rich Media Hero
function Hero() {
  this.publishers = select('.publishers')[0];
  this.hero = select('.hero')[0];
  this.heroDevices = select('.hero-devices')[0];
  this.laptop = select('.hero-devices__mockup--laptop')[0];
  this.tablet = select('.hero-devices__mockup--tablet')[0];
  this.phone = select('.hero-devices__mockup--phone')[0];

  // How much we will animate?
  this.phoneTransformY = getElementTransform(this.phone, 'Y');
  this.tabletTransformY = getElementTransform(this.tablet, 'Y');
  this.publishersTransformY = getElementTransform(this.publishers, 'Y');

  // Set initial state
  this.setInitialState();

  // Set the scrolling window
  // - startPoint: the section
  // - endPoint: startPoint + the length of the larger translateY value
  // - startPointOffset: start the animation earlier than the top of the page
  this.startPoint = this.heroDevices.offsetTop;
  this.endPoint = parseInt(this.startPoint) + parseInt(this.phoneTransformY);
  this.startPointOffset = 0;
}


// Manage the scroll
//
Hero.prototype.scroll = function(event) {
  var distance = getScrollTop();
  //console.log('d:' + distance);

  // How much to translateY
  var phoneY = this.phoneTransformY - distance;
  var tabletY = this.tabletTransformY - distance;
  var publishersY = this.publishersY - distance;

  // Translate Y
  this.transform(this.phone, 0, phoneY);
  this.transform(this.tablet, 0, tabletY);
  this.transform(this.publishers, 0, publishersY);

  // Jump to publishers
  /*
  if (phoneY < 0) {
    this.setAfterState();

    var newPosition = elementPosition(this.hero);
    window.scrollTo(0, newPosition.y + vhToPx(80));
  }
  */
}


// Set initial state
//
Hero.prototype.setInitialState = function() {
  klass(this.hero, 'hero--fixed', 'add');
  klass(this.publishers, 'publishers--hero-fixed', 'add');
}


// Set after state
//
Hero.prototype.setAfterState = function() {
  this.transform(this.phone, 0, 0);
  this.transform(this.tablet, 0, 0);
  this.transform(this.publishers, 0, 0);

  klass(this.hero, 'hero--fixed', 'remove');
  klass(this.publishers, 'publishers--hero-fixed', 'remove');
}


// Transform and element
//
Hero.prototype.transform = function(element, x, y) {
  if (y >= 0) {
    var t = 'translateY(' + y + 'px) translateX(' + x + 'px)';
    transform(element, t, t);
  } else {
    transform(element, 0, 0);
  }
}




// The main function
function HeroAnimation() {
  h = new Hero;
  scrollSnap(h.startPoint, h.endPoint, h.startPointOffset, h.scroll.bind(h), h.setInitialState.bind(h), h.setAfterState.bind(h));
}


var hero = select('.hero-devices');
//if (hero[0]) { HeroAnimation(); }
