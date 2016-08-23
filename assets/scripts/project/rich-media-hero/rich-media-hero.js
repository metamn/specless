var select = require('./../../framework/helpers/js/select.js');
var elementSize = require('./../../framework/helpers/js/elementSize.js');
var elementPosition = require('./../../framework/helpers/js/elementPosition.js');
var transform = require('./../../framework/helpers/js/transform.js');
var getElementTransform = require('./../../framework/helpers/js/getElementTransform.js');
var scrollSnap = require('./../../framework/helpers/js/scrollSnap.js');
var vhToPx = require('./../../framework/helpers/js/vhToPx.js');
var getScrollTop = require('./../../framework/helpers/js/getScrollTop.js');


// Set up the Rich Media Hero animation
//
// 1. At initial state image and specs is translated down to ipad
// 2. We'll save the translateY values for image, specs, icon, so we know how much we'll have to scroll
// 3. We will reset translateY to 0 for image, specs, icon
// 4. Set up the scrolling window to watch
function RichMediaHero() {
  this.rmh = select('.rich-media-hero')[0];
  this.icon = select('.rich-media-hero__icon')[0];
  this.image = select('.rich-media-hero__image')[0];
  this.specs = select('.rich-media-hero__specs')[0];
  this.video = select('.rich-media-hero__video .video')[0];

  // How much we will animate?
  this.imageTransformY = getElementTransform(this.image, 'Y');
  this.imageTransformX = getElementTransform(this.image, 'X');
  this.specsTransformY = getElementTransform(this.specs, 'Y');
  this.specsTransformX = getElementTransform(this.specs, 'X');
  this.iconTransformY = getElementTransform(this.icon, 'Y');
  this.iconTransformX = getElementTransform(this.icon, 'X');

  // Set initial state
  this.setInitialState();

  // Set the scrolling window
  // - startPoint: the Rich Media section
  // - endPoint: startPoint + the length of the larger translateY value
  // - startPointOffset: start the animation earlier than the top of the page
  this.startPoint = this.rmh.offsetTop;
  this.endPoint = parseInt(this.startPoint) + parseInt(this.imageTransformY);
  this.startPointOffset = vhToPx(30);


  // Set up specs translateY relative to image translateY
  // - ex: imageTransformY = 263px, specsTransformY = 192px
  // - specsRelativeDistance = 192 * 100 / 264 = 72.72%
  // - ie specs needs to be scrolled only 72.72% comparing to image's 100%
  this.specsRelativeDistance = ((this.specsTransformY * 100) / this.imageTransformY) / 100;
  this.iconRelativeDistance = ((this.iconTransformY * 100) / this.imageTransformY) / 100;
}


// Manage the scroll
//
RichMediaHero.prototype.scroll = function(event) {
  /*
  var distance = getScrollTop();

  // How much to translateY
  var imageY = distance - this.startPoint + this.startPointOffset;
  var specsY = imageY * this.specsRelativeDistance;
  var iconY = imageY * this.iconRelativeDistance;

  // Translate Y
  this.transform(this.image, this.imageTransformX, imageY);
  this.transform(this.specs, this.specsTransformX, specsY);
  this.transform(this.icon, this.iconTransformX, iconY);

  // Set image, icon opacity
  var opacity = ((imageY * 100) / this.imageTransformY) / 100;
  this.image.style.opacity = opacity;
  this.icon.style.opacity = 1 - opacity;
  */
}


// Set initial state
// - image, specs lifted up
// - image opacity 0, icon opacity 1
// - video is invisible, not playing
RichMediaHero.prototype.setInitialState = function() {
  this.transform(this.image, this.imageTransformX, 0);
  this.transform(this.specs, this.specsTransformX, 0);
  this.transform(this.icon, this.iconTransformX, 0);

  this.image.style.opacity = 1;
  //this.image.style.opacity = 0;
  this.icon.style.opacity = 1;

  this.video.style.opacity = 0;
  this.video.pause();
}


// Set after state
// - image, specs glued to ipad
// - image opacity 1, icon opacity 0
RichMediaHero.prototype.setAfterState = function() {
  this.transform(this.image, this.imageTransformX, this.imageTransformY);
  this.transform(this.specs, this.specsTransformX, this.specsTransformY);
  this.transform(this.icon, this.iconTransformX, this.iconTransformY);

  this.image.style.opacity = 1;
  this.icon.style.opacity = 0;

  this.video.style.opacity = 1;
  //this.video.play();
}


// Transform and element
//
RichMediaHero.prototype.transform = function(element, x, y) {
  var t = 'translateY(' + y + 'px) translateX(' + x+ 'px)';
  transform(element, t, t);
}




// The main function
function richMediaHeroAnimation() {
  r = new RichMediaHero;
  scrollSnap(r.startPoint, r.endPoint, r.startPointOffset, r.scroll.bind(r), r.setInitialState.bind(r), r.setInitialState.bind(r));
  //scrollSnap(r.startPoint, r.endPoint, r.startPointOffset, r.scroll.bind(r), r.setInitialState.bind(r), r.setAfterState.bind(r));
}


var rm = select('.rich-media-hero');
if (rm[0]) { richMediaHeroAnimation(); }
