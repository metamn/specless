var _ = require('lodash');
var select = require('./../../../helpers/js/select.js');

// Range Javascript handler
//
// It just passes the value to a callback

var range = function(elementID, callback) {
  var element = select(elementID)[0];

  element.addEventListener('change',
    _.throttle(_.bind(callback, this, element), 300)
  );
}

module.exports = range;
