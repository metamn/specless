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
function Slider3(sliderID, step, callback) {
  this.step = step;
  this.callback = callback;

  this.slider = select(sliderID);
  this.slides = select(sliderID + '__slides .slide');
  this.buttons = select(sliderID + '__navigation .button');

  this.sliderWidth = elementSize(this.slider[0]).width;
  this.slideWidth = elementSize(this.slides[0]).width;

  this.firstSlide = this.slides[0];
  this.lastSlide = this.slides[this.slides.length - 1];
  this.canNavigate();

  klass(this.slides[2], 'slide--active', 'add');
}


// The main function
var slider3 = function(sliderID, step, callback) {
  s = new Slider3(sliderID, step, callback);

  // Slide on click on a button
  click(s.buttons, s.clickButton.bind(s));

  // Slide on swipe
  s.swipe();

  // Callback on click on a slide
  click(s.slides, s.clickSlide.bind(s));
}



// Click on a slide
Slider3.prototype.clickSlide = function(event) {
  var _this = this;

  var slide = event; // event.target
  _this.callback(slide);

  klass(_this.slides, 'slide--active', 'remove');
  klass(slide, 'slide--active', 'add');
}


// Button click
Slider3.prototype.clickButton = function(event) {
  _this = this;

  var button = event; // event.target
  var direction = (klass(button, 'button--left', 'has')) ? 1 : -1;

  if ((direction == 1 && _this.canNavigateLeft) || (direction == -1 && _this.canNavigateRight)) {
    this.slide(direction);
  }
}

// Swipe with Hammer.js
Slider3.prototype.swipe = function() {
  _this = this;

  _this.slides.loop(function(slide) {
    var hammer = new Hammer(slide);

    hammer.get('swipe').set({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 1,
      velocity: 0.1
    });

    hammer.on("swipeleft", function() {
      if (_this.canNavigateLeft) {
        _this.slide(-1);
      }
    });

    hammer.on("swiperight", function() {
      if (_this.canNavigateRight) {
        _this.slide(1);
      }
    });
  });
}


// Slide slides
Slider3.prototype.slide = function(direction) {
  _this = this;

  _this.slides.loop(function(slide) {
    var currentTransform = getElementTransform(slide, 'X');
    var newTransform = parseFloat(currentTransform) + (direction * _this.slideWidth * _this.step);
    var t = 'translateX(' + newTransform + 'px)';
    transform(slide, t, t);
  });

  _this.canNavigate();
}


// Check if there are more slides to navigate
Slider3.prototype.canNavigate = function() {
  _this = this;

  var lastSlideTransform = getElementTransform(_this.lastSlide, 'X');
  _this.canNavigateRight = (lastSlideTransform >= _this.sliderWidth);

  // for some reason getElementTransform gets updated too late ... and this is a workaround
  var firstSlideStyle = _this.firstSlide.style.transform;
  if (firstSlideStyle) {
    // translateX(-440px) => -440
    var firstSlideTransform = firstSlideStyle.match(/-[0-9]*\.?[0-9]/);
  } else {
    var firstSlideTransform = getElementTransform(_this.firstSlide, 'X');
  }
  _this.canNavigateLeft = (firstSlideTransform < 0);

  _this.setNavigationButtonStatus();
}


// Mark a navigation button active / inactive
Slider3.prototype.setNavigationButtonStatus = function() {
  _this = this;

  var action = _this.canNavigateLeft ? 'remove' : 'add'
  klass(_this.buttons[0], 'button--inactive', action);

  var action = _this.canNavigateRight ? 'remove' : 'add'
  klass(_this.buttons[1], 'button--inactive', action);
}




module.exports = slider3;
