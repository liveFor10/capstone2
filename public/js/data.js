function sortStringArrayAscending(a, b) {
    return getAscOrder(a, b);
}

function getAscOrder(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
}

function sortStringArrayDescending(a, b) {
    return getDescOrder(a, b);
}

function getDescOrder(a, b) {
    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    } else {
        return 0;
    }
}

function sortJsonObjArrayAscending(arrayToBeSorted, fieldNameToSortBy) {

    return arrayToBeSorted.sort(function(a, b) {
            var compareA = a[fieldNameToSortBy];
            var compareB = b[fieldNameToSortBy];
            return getAscOrder(compareA, compareB);
        }
    );
}

function sortJsonObjArrayDescending(arrayToBeSorted, fieldNameToSortBy) {

    return arrayToBeSorted.sort(function(a, b) {
            var compareA = a[fieldNameToSortBy];
            var compareB = b[fieldNameToSortBy];
            return getDescOrder(compareA, compareB);
        }
    );
}


async function loadParkDropdowns() {
    let parkTypes = [];
    let parkLocations = [];

    (async function loadStringArraysFromFileAndSort() {
        parkTypes = await loadData("/data/parktypes.json");
        await parkTypes.sort(sortStringArrayAscending);
        loadDropdown(parkTypes, "pt");
        parkLocations = await loadData("/data/locations.json");
        await parkLocations.sort(sortStringArrayAscending);
        loadDropdown(parkLocations, "pl");
    }())
}

function loadMountainDropdown() {
    let mountains = [];
    
    (async function loadStringArraysFromFileAndSort() {

        mountains = await loadData("/data/mountains.json");
        mountains = sortJsonObjArrayAscending(mountains, "name");
        loadDropdown(mountains, "mtn");
    }())
}

async function loadData(dataFile) {
    let jsonArray = [];
    let response = await fetch(dataFile);
    jsonArray = await response.json();
    return jsonArray;
}

function loadDropdown(data, elementID) {

    let dropdown = document.getElementById(elementID);

    for (let i=0; i < data.length; i++ ) {
        let currentItem = data[i];
        let el = document.createElement("option");
        el.textContent = currentItem.name || currentItem; // or el.text
        //optional? el.value = 
        dropdown.appendChild(el); // or select.add(el);
    }
}

exports.sortStringArrayAscending = sortStringArrayAscending;
exports.getAscOrder = getAscOrder;
exports.sortStringArrayDescending = sortStringArrayDescending;
exports.getDescOrder = getDescOrder;
exports.sortJsonObjArrayAscending = sortJsonObjArrayAscending;
exports.sortJsonObjArrayDescending = sortJsonObjArrayDescending;
exports.loadParkDropdowns = loadParkDropdowns;
exports.loadMountainDropdown = loadMountainDropdown;
exports.loadData = loadData;
exports.loadDropdown = loadDropdown;
