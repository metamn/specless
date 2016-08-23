var select = require('./../../framework/helpers/js/select.js');

var slider2 = require('./../../framework/structure/slider2/slider2.js');
var popup = require('./../../framework/structure/popup/popup.js');

var a = select('.advertisers');
if (a[0]) { slider2('.advertisers__slider .slider2', 2, advertisersSlideClick); }

function advertisersSlideClick(slide) {
  var popupWindow = select('.popup')[0];
  popup(popupWindow, '.icon-hamburger');
}
