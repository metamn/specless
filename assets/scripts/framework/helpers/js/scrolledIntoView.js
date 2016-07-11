// Scrolled into view
//
// Check if an element is in the viewport
//
// $el - the element
// $marginBottom -
// $marginTop -

function scrolledIntoView(el, marginTop, marginBottom) {
  var elemBottom = el.getBoundingClientRect().bottom;
  var elemTop = el.getBoundingClientRect().top;
  var isVisible = ((elemTop < marginTop) && (elemBottom > marginBottom));

  //console.log(elemTop + ', ' + marginTop + ', ' + isVisible);

  return isVisible;
}

module.exports = scrolledIntoView;
