
//db connectivity
exports.mongoURL = 'mongodb://127.0.0.1:27017';
//exports.mongoURL = 'mongodb+srv://admin:fumdbW2Lk0tPPh@mdbcluster00.ezr4k.mongodb.net?retryWrites=true&w=majority';
//exports.mongoDB = 'catalystHub';
//exports.mongoDB = 'catalystDB';
exports.mongoDB = 'capstone2';


//query customization
exports.ITEMS_PER_PAGE = 3;
exports.MAX_RESULTS = 200;
exports.REQUESTED_PAGE_NUMBER = 0;

exports.RESULTS_ORDER_ASC = 1;
exports.RESULTS_ORDER_DESC = -1;

exports.SEARCH_CRITERIA_ANY = "any";
exports.SEARCH_CRITERIA_ALL = "all";

exports.EXCLUDE_QUERY_PARAMS =
['itemsPerPage', 'maxResults', 'resultsOrder', 'sortBy', 'searchCriteria', 'requestedPageNumber'];


//query filter operators
exports.QO_REGEX = '$regex';
exports.QO_OPTIONS = '$options';
exports.QO_EQUAL_TO = '$eq';
exports.QO_GREATER_THAN = '$gt';
exports.QO_GREATER_THAN_OR_EQUAL_TO = '$gte';
exports.QO_IN_ARRAY = '$in';
exports.QO_LESS_THAN = '$lt';
exports.QO_LESS_THAN_OR_EQUAL_TO = '$lte';
exports.QO_NOT_EQUAL_TO = '$ne';
exports.QO_NOT_IN_ARRAY = '$nin';
