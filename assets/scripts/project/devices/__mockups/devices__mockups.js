var transform = require('./../../../framework/helpers/js/transform.js');
var klass = require('./../../../framework/helpers/js/klass.js');
var select = require('./../../../framework/helpers/js/select.js');
var responsiveImageURL = require('./../../../framework/helpers/js/responsiveImageURL.js');

var deviceMockupOldValue = 1;
var deviceMockupImg = select('.devices__mockups .mockup .img')[0];

var deviceMockupChange = function(mockup, value) {
  console.log('v:' + deviceMockupOldValue + ', ' + value);

  function changeClass(from, to) {
    klass(mockup, from, 'remove');
    klass(mockup, to, 'add');
  }

  function changeImage(element, image, breakpoint, retina) {
    var mediaQuery = "only screen and " + breakpoint;

    if (retina) {
      // This might not be cross platform compatible ....
      mediaQuery += " and (-webkit-min-device-pixel-ratio: 2)";
    }

    if (matchMedia(mediaQuery).matches) {
      console.log('old:' + deviceMockupImg.src + ' ::: new:' + image);
      deviceMockupImg.src = image;
      picturefill({
        reevaluate: true,
        elements: [ deviceMockupImg ]
      })
    }
  }


  function mobileToTablet(from, to) {
    changeClass('mockup--mobile', 'mockup--tablet');
    responsiveImageURL('.devices__mockups .figure:nth-of-type(2)', changeImage);
  }

  mobileToTablet(0, 0);
  deviceMockupOldValue = value;
}

module.exports = deviceMockupChange;
