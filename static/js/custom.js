// Search inside altinndigital
var input = document.getElementById("topbar-search-by");
input.addEventListener("keyup", function(event) {
    if ($(".adocs-collapseSearch.collapse.show")[0]){
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("topbar-search-submit").click();
        }
    }
});

$("#topbar-search-submit").click( function() {
    var url = "https://www.altinndigital.no/sok/?query=" + $("#topbar-search-by").val();
    window.open(url, "_self");
});

// Mobile: Search inside altinndigital
var input = document.getElementById("mobilesearch-by");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("mobilesearch-submit").click();
    }
});

$("#mobilesearch-submit").click( function() {
    var url = "https://www.altinndigital.no/sok/?query=" + $("#mobilesearch-by").val();
    window.open(url, "_self");
});

// Search inside altinndigital > documentation
var input = document.getElementById("searchdocumentation");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchdocumentation-submit").click();
    }
});

$("#searchdocumentation-submit").click( function() {
    var url = "https://www.altinndigital.no/sok/?query=" + $("#searchdocumentation").val() + "&filters=documentation_20&pageNumber=0";
    window.open(url, "_self");
});


// Search from footer

var input = document.getElementById("text-input-search-footer");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("footerserachbutton").click();
    }
});

$("#footerserachbutton").click( function() {
    var url = "https://www.altinndigital.no/sok/?query=" + $("#text-input-search-footer").val();
    window.open(url, "_self");
});