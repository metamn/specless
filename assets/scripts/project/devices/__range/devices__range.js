var select = require('./../../../framework/helpers/js/select.js');

var range = require('./../../../framework/design/decorations/range/range.js');
range('.devices .range input', devicesRange);

var deviceMockupChange = require('./../__mockups/devices__mockups.js');
var mockup = select('.devices .mockup div')[0];

// The range callback
function devicesRange(element) {
  deviceMockupChange(mockup, element.value);
}
