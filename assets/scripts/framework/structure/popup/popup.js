var click = require('./../../helpers/js/click.js');
var klass = require('./../../helpers/js/klass.js');
var elementSize = require('./../../helpers/js/elementSize.js');

// Close a popup window
//
// $popupWindow = the popup element
// $closeID = the ID of the closing element
// $content = the ID of a container from the popup will be populated

var popup = function(popupWindow,  closeID, content) {
  var popupClose = popupWindow.querySelectorAll(closeID);

  klass(popupWindow, 'popup--active', 'add');

  click(popupClose, function() {
    klass(popupWindow, 'popup--active', 'remove');
  });

  var popupContent = popupWindow.querySelector('.popup__content');
  popupContent.innerHTML = '';

  if (content) {
    // display content
    popupContent.insertAdjacentHTML('beforeend', content);
  }
}


module.exports = popup;
