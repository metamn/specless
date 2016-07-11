// Scroll snap
//
// Mark container active when it is scrolled into the viewport
//
// $containerID - the ID or class of the container, with '.' or '#'
// $marginBottom -

var _ = require('lodash');
var select = require('./../../helpers/js/select.js');
var klass = require('./../../helpers/js/klass.js');
var scrolledIntoView = require('./../../helpers/js/scrolledIntoView.js');


var scrollSnap = function(containerID, marginBottom) {
  window.addEventListener('scroll',
    _.throttle(_.bind(scrollSnapHandler, this, containerID, marginBottom), 300)
  );
};


var scrollSnapHandler = function() {
  var containerID = arguments[0];
  var container = select(containerID)[0];

  var containerName = containerID.substring(1);
  var containerActive = containerName + '--active';

  var marginBottom = arguments[1];

  // Checking if the container is visible, so the slides has to be activated
  if (!scrolledIntoView(container, marginBottom)) {
    klass(container, containerActive, 'remove');
  } else {
    klass(container, containerActive, 'add');
  }
}

module.exports = scrollSnap;
