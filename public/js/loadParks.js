function loadDropdowns() {
    loadDropdown("data/locations.json", "locations", "loc");
    //loadDropdown("public/data/nationalparks.json", nationalParks, "park");
    loadDropdown("data/parktypes.json", "parkTypes", "typ");
}

async function loadJsonArray(dataFile) {
    let response = await fetch(dataFile);
    let jsonArray = await response.json();
    return jsonArray;
}

function loadDropdown(dataFile, filter, elementID) {
    let jsonArray = [];
    // loadJsonArray(dataFile).then((filter) => {
    //     jsonArray = filter;
    // });
    // jsonArray = loadJsonArray(dataFile).then(filter);
    // jsonArray = loadJsonArray(dataFile).filter(filter);
    jsonArray = loadJsonArray(dataFile);
    jsonArray = jsonArray.filter(filter);

    let dropdown = document.getElementById(elementID);

    for(let i=0; i < jsonArray.length; i++) {
        let opt = jsonArray[i];
        let el = document.createElement("option");
        el.textContent = opt; // or el.text = opt;
        el.value = opt;
        dropdown.appendChild(el); // or select.add(el);
    }
  }

  function getFilteredCodes(array, key, value) {
    return array.filter(function(e) {
            return e[key] == value;
        }
    );
  }