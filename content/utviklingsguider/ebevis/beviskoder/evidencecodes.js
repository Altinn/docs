$(function() {
    $('#evidencecodes-container').length ? EvidenceCodesDisplay.init($('#evidencecodes-container')) : console.warn('Missing container!');
});

var EvidenceCodesDisplay = {
    metadataUrl: "https://api.ebevis.no/nadobe/v1/public/metadata/evidencecodes",
    $containerElement: null,
    template: '',
    metadata: {},

    init: function(el) {
        this.$containerElement = el;
        this.template = $('[type="text/x-evidencecodes-template"]', this.$containerElement).text();
        this.bindToggleEvents();
        this.load();
    },

    load: function() {
        var self = this;
        $.getJSON(this.metadataUrl, function(res, status) { self.onload(res, status) });
    },

    onload: function(res, status) {
        this.metadata = res.sort(function(a, b) { return a['evidenceCodeName'] > b['evidenceCodeName'] ? 1 : (a['evidenceCodeName'] < b['evidenceCodeName'] ? -1 : 0) });
        this.render();
    },

    bindToggleEvents: function() {
        this.$containerElement.on('click', 'a.toggle', this.toggle);
    },

    render: function() {
        this.$containerElement.html(this.templateEngine(this.template, { data: this.metadata } ));
    },

    friendlyAccessMethod: function(accessMethod) {
        switch (accessMethod) {
            case "open": return "Åpent tilgjengelig";
            case "consent": return "Krever samtykke";
            case "consentOrLegalBasis": return "Krever samtykke eller oppgitt verfiserbart hjemmelsgrunnlag";
            case "legalBasis": return "Krever oppgitt verfiserbart hjemmelsgrunnlag";
            case "srr": return "Krever tidelt tilgang via tjenesteeierstyrt rettighetsregister";
        }
        return accessMethod;
    },

    exampleRequest: function(evidenceCode) {
        var authorzationRequest = {
            "requestor": "999888777",
            "subject": "988666555",
            "evidenceRequests": [
                {
                    "evidenceCodeName": evidenceCode.evidenceCodeName
                }
            ],
            "validTo": new Date(new Date().setDate(new Date().getDate() + 30)),
            "tedReference": "12345/2345",
            "doffinReference": "2000-1234567",
            "externalReference": "MyOwnId1234"
        };

        if (evidenceCode.accessMethod == "consent" || evidenceCode.accessMethod == "consentOrLegalBasis") {
            authorzationRequest["evidenceRequests"][0]["requestConsent"] = true;
        }
        else if (evidenceCode.accessMethod == "legalbasis") {
            authorzationRequest["legalBasisList"] = [ { id: "legalbasis01", content: "<?xml ... "}]
            authorzationRequest["evidenceRequests"][0]["legalBasisId"] = "legalbasis01";
            authorzationRequest["evidenceRequests"][0]["legalBasisReference"] = "somereference";
        }

        if (typeof evidenceCode.parameters !== "undefined" && evidenceCode.parameters.length) {
            authorzationRequest.parameters = [];
            for (var i = 0; i<evidenceCode.parameters.length; i++) {
                authorzationRequest.parameters.push({
                    "evidenceParamName": evidenceCode.parameters[i]["evidenceParamName"],
                    "value": this.getRandomValue(evidenceCode.parameters[i]["paramType"])
                });
            }
        }

        return JSON.stringify(authorzationRequest, null, 2);
    },

    getRandomValue: function(paramType) {
        console.log(paramType);
        switch (paramType) {
            case "number": return 1234.56;
            case "boolean": return true;
            case "string": return "abcd 1234";
            case "dateTime": return new Date();
            case "uri": return "https//ebevis.no";
            case "amount": return "10293 NOK";
            case "attachment": return "8fbn34==="
        }
        return "tf";
    },

    toggle: function(e) {
        var container = $(e.currentTarget).parent().parent();
        var detailsContainer = container.find('.detailscontainer');
        if (detailsContainer.is(':visible')) {
            detailsContainer.hide();
            container.removeClass('isOpened');
        }
        else {
            detailsContainer.show();
            container.addClass('isOpened');
        }
    },

    // http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
    templateEngine: function(html, options) {
        var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
        var add = function(line, js) {
            js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while(match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    }
    
};
