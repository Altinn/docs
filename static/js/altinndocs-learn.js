// Get Parameters from some url
var getUrlParameter = function getUrlParameter(sPageURL) {
    var url = sPageURL.split('?');
    var obj = {};
    if (url.length == 2) {
        var sURLVariables = url[1].split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            obj[sParameterName[0]] = sParameterName[1];
        }
        return obj;
    } else {
        return undefined;
    }
};

jQuery(document).ready(function () {
    // Add link button for every
    var text, clip = new Clipboard('.anchor');
    $("h1~h2,h1~h3,h1~h4,h1~h5,h1~h6").append(function (index, html) {
        var element = $(this);
        var url = document.location.origin + document.location.pathname;
        var link = url + "#" + element[0].id;
        return " <span class='anchor' data-clipboard-text='" + link + "'>" +
            "<i class='fa fa-link fa-lg'></i>" +
            "</span>"
            ;
    });

    $(".anchor").on('mouseleave', function (e) {
        $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
    });

    clip.on('success', function (e) {
        e.clearSelection();
        $(e.trigger).attr('aria-label', 'Link copied to clipboard!').addClass('tooltipped tooltipped-s');
    });

});

// clipboard
var clipInit = false;
$('code').each(function () {
    var code = $(this),
        text = code.text();

    if (text.length > 5) {
        if (!clipInit) {
            var text, clip = new Clipboard('.copy-to-clipboard', {
                text: function (trigger) {
                    text = $(trigger).prev('code').text();
                    return text.replace(/^\$\s/gm, '');
                }
            });

            var inPre;
            clip.on('success', function (e) {
                e.clearSelection();
                inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
                $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
            });

            clip.on('error', function (e) {
                inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
                $(e.trigger).attr('aria-label', fallbackMessage(e.action)).addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
                $(document).one('copy', function () {
                    $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
                });
            });

            clipInit = true;
        }

        code.after('<span class="copy-to-clipboard" title="Copy to clipboard" />');
        code.next('.copy-to-clipboard').on('mouseleave', function () {
            $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
        });
    }
});