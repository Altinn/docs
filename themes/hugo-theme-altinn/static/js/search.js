var lunrIndex, pagesIndex;

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// Initialize lunrjs using our generated index file
function initLunr() {
    if (!endsWith(baseurl,"/")){
        baseurl = baseurl+'/'
    };

    // First retrieve the index file
    $.getJSON(baseurl +"lunr-index.json")
        .done(function(data) {
            pagesIndex = data.meta;
            lunrIndex = lunr.Index.load(data.index); 
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting lunr-index.json: ", err);
        });
}

/**
 * Trigger a search in lunr and transform the result
 *
 * @param  {String} query
 * @return {Array}  results
 */
function search(query) {
    // Find the item in our index corresponding to the lunr one to have more info
    return lunrIndex.search(query).map(function(result) {
            return pagesIndex.filter(function(page) {
                return page.uri === result.ref;
            })[0];
        });
}

// Let's get started
initLunr();
$( document ).ready(function() {
    var horseyList = horsey($("#search-by").get(0), {
        suggestions: function (value, done) {
            var query = $("#search-by").val();
            var results = search(query);
            done(results);
        },
        filter: function (q, suggestion) {
            return true;
        },
        set: function (value) {
            location.href=value.uri;
        },
        render: function (li, suggestion) {
            var uri = suggestion.uri.substring(1,suggestion.uri.length);

            suggestion.href = baseurl + uri;

            var query = $("#search-by").val();
            var numWords = 2;
            var text = suggestion.content.match("(?:\\s?(?:[\\w]+)\\s?){0,"+numWords+"}"+query+"(?:\\s?(?:[\\w]+)\\s?){0,"+numWords+"}");
            suggestion.context = text;
            var image = '<div>' + '» ' + suggestion.title + '</div><div style="font-size:12px">' + (suggestion.context || '') +'</div>';
            li.innerHTML = image;
        },
        limit: 10
    });
    horseyList.refreshPosition();
});
