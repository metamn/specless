var visibleItems = [];

// Click on a filter with a certain type
// - type: the css class prefix, like 'year'
// - filtersID : all filters of the same type, like 'year-filters' etc
// - itemsID: the items to be filtered, like 'thumbs'
var filter = function(type, filtersID, itemsID) {
  var filters = document.querySelectorAll(filtersID);
  var items = document.querySelectorAll(itemsID);

  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', clickFilter, false);
  }


  // Click on a filter
  function clickFilter(event) {
    // get current filter information
    attr = this.dataset.filter;

    // mark all filters inactive
    markAllInactive(filters, 'filter--active');
    visibleItems = removeAllElements(visibleItems, type);

    // mark this filter active
    this.classList.add('filter--active');
    visibleItems.push(attr);

    // do the filtering
    doFilter();
  }


  // Show / hide items
  function doFilter() {
    for (var i = 0; i < items.length; i++) {
      // show all
      items[i].classList.remove('article--inactive');

      // combine filters
      // - only those items will be displayed who satisfy all filter criterias
      var visible = true;

      for (var j = 0; j < visibleItems.length; j++) {
        visible = visible && items[i].classList.contains(visibleItems[j]);
      }

      if (!visible) {
        items[i].classList.add('article--inactive');
      }
    }
  }


  // Remove certain elements from an array
  function removeAllElements(array, type) {
    return array.filter(function(item) {
      return (item.indexOf(type) === -1);
    });
  }

  // Remove the active class from a series of DOM elements
  function markAllInactive(items, klass) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove(klass);
    }
  }


}

module.exports = filter;
