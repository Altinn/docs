// Move children to bottom of page
$('.js-moveChildrenFrom').insertAfter('.js-moveChildrenTo');
    
// Search inside altinndigital
var input = document.getElementById("search-by");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-submit").click();
    }
});

$("#search-submit").click( function() {
    var url = "https://www.altinndigital.no/sok/?query=" + $("#search-by").val();
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