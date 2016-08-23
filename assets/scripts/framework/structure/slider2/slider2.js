var l = require('./../../helpers/js/loop.js');
var select = require('./../../helpers/js/select.js');
var transform = require('./../../helpers/js/transform.js');
var click = require('./../../helpers/js/click.js');
var klass = require('./../../helpers/js/klass.js');
var getElementTransform = require('./../../helpers/js/getElementTransform.js');
var elementSize = require('./../../helpers/js/elementSize.js');




// A continuous slider
//
// $sliderID - the id of the slider container
// $step - how many items slide at once
// $callback - the function to handle the click on a slide


// Set up the slider
function Slider2(sliderID, step, callback) {
  this.sliderID = sliderID;
  this.step = step;
  this.callback = callback;

  // for values which change after new items are inserted
  this.setupSlides();

  // for values which stay constant
  this.setupSlides2();

  this.buttons = select(sliderID + '__navigation .button');

  klass(this.slides[2], 'slide--active', 'add');
}


// Setup slides
// - for values which change after new items are inserted
Slider2.prototype.setupSlides = function() {
  this.slider = select(this.sliderID);
  this.slides = select(this.sliderID + '__slides .slide');

  this.sliderWidth = elementSize(this.slider[0]).width;
  this.slideWidth = elementSize(this.slides[0]).width;

  this.firstSlide = this.slides[1];
  this.lastSlide = this.slides[this.slides.length - 1];

  var slide2TransformX = getElementTransform(this.slides[2], 'X');
  var slide3TransformX = getElementTransform(this.slides[3], 'X');
  this.transformX = slide3TransformX - slide2TransformX;

  // Callback on click on a slide
  click(this.slides, this.clickSlide.bind(this));
}


// Setup slides
// - for values which stay constant
Slider2.prototype.setupSlides2 = function() {
  this.slides.loop(function(slide) {
    slide.style.visibility = 'hidden';
  });

  this.slidesContainer = select(this.sliderID + '__slides')[0];
  this.sliderInnerHTML = this.slidesContainer.innerHTML;
  this.slideCount = this.slides.length - 1;

  this.slides.loop(function(slide) {
    slide.style.visibility = 'visible';
  });
}


// The main function
var slider2 = function(sliderID, step, callback) {
  s = new Slider2(sliderID, step, callback);

  // Slide on click on a button
  click(s.buttons, s.clickButton.bind(s));

  // Slide on swipe
  s.swipe();
}



// Click on a slide
Slider2.prototype.clickSlide = function(event) {
  var _this = this;

  var slide = event; // event.target
  _this.callback(slide);

  klass(_this.slides, 'slide--active', 'remove');
  klass(slide, 'slide--active', 'add');
}


// Button click
Slider2.prototype.clickButton = function(event) {
  _this = this;

  var button = event; // event.target
  var direction = (klass(button, 'button--left', 'has')) ? 1 : -1;

  this.slide(direction);
}


// Swipe with Hammer.js
Slider2.prototype.swipe = function() {
  _this = this;

  _this.slides.loop(function(slide) {
    var hammer = new Hammer(slide);

    hammer.get('swipe').set({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 1,
      velocity: 0.1
    });

    hammer.on("swipeleft", function() {
      _this.slide(-1);
    });

    hammer.on("swiperight", function() {
      _this.slide(1);
    });
  });
}


// Slide slides
Slider2.prototype.slide = function(direction) {
  _this = this;

  _this.slides.loop(function(slide) {
    var currentTransform = getElementTransform(slide, 'X');
    var newTransform = parseFloat(currentTransform) + (direction * _this.slideWidth * _this.step);
    var t = 'translateX(' + newTransform + 'px)';
    transform(slide, t, t);
  });

  _this.checkInfinite(direction);
}


// Check if slides has to be cloned or not
Slider2.prototype.checkInfinite = function(direction) {
  _this = this;

  var offset = _this.transformX * 3;

  var lastSlideTransform = getElementTransform(_this.lastSlide, 'X');
  _this.canNavigateRight = (lastSlideTransform >= (_this.sliderWidth + offset));

  var firstSlideTransform = getElementTransform(_this.firstSlide, 'X');
  _this.canNavigateLeft = (firstSlideTransform < 0);

  _this.makeInfinite(direction);
}


// Clone slides to left or right
Slider2.prototype.makeInfinite = function(direction) {
  _this = this;

  var reArrange = false;

  if ((!_this.canNavigateLeft) && (direction == 1)) {
    _this.slidesContainer.innerHTML = _this.sliderInnerHTML + _this.slidesContainer.innerHTML;
    currentSlide = 0;
    currentTransform = parseFloat(getElementTransform(_this.slides[0], 'X')) - _this.transformX * (_this.slideCount + 2);
    reArrange = true;
  }

  if ((!_this.canNavigateRight) && (direction == -1)) {
    _this.slidesContainer.innerHTML += _this.sliderInnerHTML;
    currentSlide = _this.slides.length;
    currentTransform = getElementTransform(_this.slides[currentSlide - 1], 'X');
    reArrange = true;
  }

  if (reArrange) {
    _this.setupSlides();
    _this.arrangeSlides(currentSlide, currentTransform);

    setTimeout(function(){
      _this.showSlides(currentSlide);
    }, 500);
  }
}


// Arrange slides
Slider2.prototype.arrangeSlides = function(currentSlide, currentTransform) {
  _this = this;

  for (var i = currentSlide; i <= (currentSlide + _this.slideCount); i++) {
    var newTransform = parseFloat(currentTransform) +  _this.transformX;
    var t = 'translateX(' + newTransform + 'px)';

    transform(_this.slides[i], t, t);
    klass(_this.slides[i], 'slide--active', 'remove');

    currentTransform = newTransform;
  }
}


// Show newly added slides
Slider2.prototype.showSlides = function(currentSlide) {
  for (var i = currentSlide; i <= (currentSlide + _this.slideCount); i++) {
    _this.slides[i].style.visibility = 'visible';
  }
}


module.exports = slider2;
