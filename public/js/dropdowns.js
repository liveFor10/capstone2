
function loadParkDropdowns() {
    loadDropdown("data/parktypes.json", "typ");
    loadDropdown("data/locations.json", "loc");
}

function loadMountainDropdown() {
    loadDropdown("data/mountains.json", "mtn");
}

async function loadData(dataFile) {
    let jsonArray = [];
    let response = await fetch(dataFile);
    jsonArray = await response.json();
    return jsonArray;
}

function sortArray(a, b) {
    aCompare = a.name || a;
    bCompare = b.name || b;
    if (aCompare > bCompare) {
        return 1;
    } else if (aCompare <bCompare) {
        return -1;
    } else {
        return 0;
    }
}

function loadDropdown(dataFile, elementID) {

    let items = [];
    let sItems = [];

    (async function loadJsonArrayFromFile() {
        items = await loadData(dataFile);

        sItems = items.sort(sortArray);

        let dropdown = document.getElementById(elementID);

        for (let i=0; i < sItems.length; i++ ) {
            let currentItem = sItems[i];
            let el = document.createElement("option");
            el.textContent = currentItem.name || currentItem; // or el.text
            //el.value = 
            dropdown.appendChild(el); // or select.add(el);
        }
    }())
}
