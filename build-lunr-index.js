// Script for pre-generating lunr index-file
// Run hugo first to generate public/index.json
// Then run this using node

var fs = require('fs');
var lunr = require('./themes/hugo-theme-docdock/static/js/lunr.min');

fs.readFile('./public/index.json', function (err, data) {
  var pages = JSON.parse(data);
  var store = [];

  var idx = lunr(function () {
    this.ref('uri');
    this.field('title', {boost: 10});
    this.field('tags', {boost: 5});
    this.field('content');
    
    pages.forEach(function (page) {
      this.add(page);
      store.push(page);
    }, this)
  });

  fs.writeFile('./static/lunr-index.json',
    JSON.stringify({
        index: idx,
        meta: store
    }),
    function (){});
});