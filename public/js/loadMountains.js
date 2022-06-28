"use strict"

let mountainsArray = []

window.onload = function(){

    loadJsonData("public/data/mountains.json").then((mountains) => {
        mountainsArray = mountains.mountains;
    })

}

//function that can "fetch" the sunset/sunrise times
let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}