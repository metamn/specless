var select = require('./../../framework/helpers/js/select.js');
var klass = require('./../../framework/helpers/js/klass.js');
var click = require('./../../framework/helpers/js/click.js');
var popup = require('./../../framework/structure/popup/popup.js');

function getStartedPopup() {
  var button = select('.web-interface .description .button');
  var content = select('.web-interface-form')[0];
  content = content.outerHTML;

  click(button, function() {
    var popupWindow = select('.popup')[0];
    popup(popupWindow,'.icon-hamburger', content);
  });
}

var wi = select('.web-interface');
if (wi[0]) { getStartedPopup(); }
