// Move children to bottom of page
$('.js-moveChildrenFrom').insertAfter('.js-moveChildrenTo');

// Hide expired notices
$('.js-expiring-notice').each(function() {
    var expires = Date.parse($(this).data('expires'));
    if (!isNaN(expires) && expires < new Date()) {
        $(this).hide();
    } 
});