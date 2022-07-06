
function resultsNavigate(requestedPageNumber) {

    let hiddenPRNtxtBox = document.getElementById("rpn");

    hiddenPRNtxtBox.innerHTML = requestedPageNumber;

}

exports.resultsNavigate = resultsNavigate;
