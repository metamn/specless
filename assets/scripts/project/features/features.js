var select = require('./../../framework/helpers/js/select.js');
var filter = require('./__filters/features__filters.js');

var f = select('.features__filters');
if (f[0]) { filter('category', '.features__filters .li', '.features__articles .article'); }
