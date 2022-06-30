const lodash = require('lodash');

function sortStringArrayAscending(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
}

function sortStringArrayDescending(a, b) {
    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    } else {
        return 0;
    }
}

function sortJsonObjArrayAscending(arrayToBeSorted, fieldNameToSortBy) {

    return lodash.sortBy(arrayToBeSorted, fieldNameToSortBy);
}

function sortJsonObjArrayDescending(arrayToBeSorted, fieldNameToSortBy) {

    return lodash.sortBy(arrayToBeSorted, fieldNameToSortBy).reverse();
}
  
exports.sortStringArrayAscending = sortStringArrayAscending;
exports.sortStringArrayDescending = sortStringArrayDescending;
exports.sortJsonObjArrayAscending = sortJsonObjArrayAscending;
exports.sortJsonObjArrayDescending = sortJsonObjArrayDescending;