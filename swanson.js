// ---- variables ----
var xhrBtn = document.querySelector("#xhr");
var fetchBtn = document.querySelector("#fetch");
var axiosBtn = document.querySelector("#axios");
var qt = document.querySelector("#qt");

var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

// ---- click listeners ----
xhrBtn.addEventListener("click", xhrRequest)
fetchBtn.addEventListener("click", fetchRequest);
$("#jquery").click(jqueryRequest);
axiosBtn.addEventListener("click", axiosRequest);

// ---- request functions ----
// XHR
function xhrRequest() {
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function () {
        if(XHR.readyState == 4 && XHR.status == 200) {
            qt.textContent = JSON.parse(XHR.responseText)
        } else {
            console.log("Error: ", XHR.status);
        };
    };
    XHR.open("GET", url);
    XHR.send();
};

// fetch
function fetchRequest() {
    fetch(url, {method: "GET"})
    .then(function(res) {
        if(!res.ok) {
            throw Error(err);
        }
        return res.json();
    })
    .then(applyQuote)
    .catch(handleErrors)
}

// jQuery
function jqueryRequest() {
    $.get(url)
    .done(applyQuote)
    .fail(handleErrors)
}

// axios
function axiosRequest() {
    axios.get(url)
    .then(function(res) {
        return res.data
    })
    .then(applyQuote)
    .catch(handleErrors)
};

// ---- other functions ----
function applyQuote(data) {
    qt.textContent = data;
}

function handleErrors(err) {
    qt.textContent = err;
}