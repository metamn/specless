// Hamburger Menu JS
//
// On clicking the hamburger icon and/or text the items of a menu are displayed
var hamburgerMenu = function(triggerID, menuID) {
  var iconID = triggerID.concat('__icon');
  var textID = triggerID.concat('__text');

  var trigger = document.querySelector(triggerID);
  var icon = document.querySelector(iconID);
  var text = document.querySelector(textID);
  var menu = document.querySelector(menuID);

  trigger.addEventListener('click', clickTrigger, false);

  function clickTrigger(event) {
    toggleClass(icon, iconID);
    toggleClass(text, textID);
    toggleClass(menu, menuID);
  }

  function toggleClass(element, klassName) {
    var opened = klassName.concat('--opened').substr(1);
    var closed = klassName.concat('--closed').substr(1);

    var open = element.classList.contains(opened);

    if (open) {
      element.classList.remove(opened);
      element.classList.add(closed);
    } else {
      element.classList.remove(closed);
      element.classList.add(opened);
    }
  }
}

module.exports = hamburgerMenu;
