var select = require('./../../framework/helpers/js/select.js');
var l = require('./../../framework/helpers/js/loop.js');

var slider2 = require('./../../framework/structure/slider2/slider2.js');
var p = select('.publishers');
if (p[0]) { slider2('.publishers__slider .slider2', 2, pubslishersSlideClick); }


function pubslishersSlideClick(slide) {
  var newIframeSrc = slide.dataset.iframe;

  var iframes = select('.publishers__mockups .iframe');
  iframes.loop(function(iframe) {
    iframe.src = newIframeSrc;
  });
}
