$(function() {
    $('#evidencecodes-container').length ? EvidenceCodesDisplay.init($('#evidencecodes-container')) : console.warn('Missing container!');
});

var EvidenceCodesDisplay = {
    metadataUrl: "https://test-api.data.altinn.no/v1/public/metadata/evidencecodes",
    $containerElement: null,
    template: '',
    metadata: {},
    filter: null,

    init: function(el) {
        this.$containerElement = el;
        this.template = $('[type="text/x-evidencecodes-template"]', this.$containerElement).text();
        this.enableSpinner();
        this.bindToggleEvents();
        this.load();
    },

    enableSpinner: function() {
        this.$containerElement.html('<div class="evidencecodes-loader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div><span>Laster datasett-beskrivelser ...</div>');
    },

    load: function() {
        var self = this;
        var filter = this.$containerElement.data('filter-servicecontext');
        if (filter != undefined)  {
            this.metadataUrl += "/" + filter;
            this.filter = filter;
        }
        $.getJSON(this.metadataUrl, function(res, status) { self.onload(res, status) });
    },

    onload: function(res, status) {

        res = this.normalize(res);

        this.metadata = res.sort(function(a, b) { 
            // Sort by service context, then evidenceCodeName
            if (a['serviceContext'] > b['serviceContext']) 
                return 1;

            if (a['serviceContext'] < b['serviceContext']) 
                return -1;

            if (a['evidenceCodeName'] > b['evidenceCodeName']) 
                return 1;

            if (a['evidenceCodeName'] < b['evidenceCodeName']) 
                return -1;

            return 0;
        });

        if (this.filter) {
            this.metadata = this.metadata.filter((el) => el['serviceContext'] == this.filter);
        }

        this.render();
    },

    bindToggleEvents: function() {
        this.$containerElement.on('click', 'a.toggle', this.toggle);
    },

    normalize: function(res) {

        // Make copies for each of servicecodes belonging to different service contexts, 
        // and filter authorization requirements
        var newres = [];
        res.forEach(r => {
            if (typeof r["belongsToServiceContexts"] != "undefined") {
                r['belongsToServiceContexts'].forEach(sc => {

                    let r2 = JSON.parse(JSON.stringify(r)); // deep clone
                    r2["serviceContext"] = sc;
                    r2["hasSoftRequirement"] = false;

                    if (typeof r2["authorizationRequirements"] != "undefined") {
                        let newrq = [];
                        r2["authorizationRequirements"].forEach(rq => {
                            if (typeof rq["appliesToServiceContext"] == "undefined" || rq["appliesToServiceContext"].indexOf(sc) != -1) {
                                if (rq["type"] == "ConsentRequirement") {
                                    r2["isAsynchronous"] = true;
                                }
                                if (rq["failureAction"] == 1) {
                                    r2["hasSoftRequirement"] = true;
                                }
                                newrq.push(rq);
                            }
                        });

                        r2["authorizationRequirements"] = newrq;
                    }

                    newres.push(r2);
                });
            }
            else {
                newres.push(r);
            }

        });

        return newres;
    },

    render: function() {
        this.$containerElement.html(this.templateEngine(this.template, { data: this.metadata } ));
    },

    friendlyAuthorizationRequirements: function(evidenceCode) {

        var am = "";

        if (typeof evidenceCode["authorizationRequirements"] == "object" && evidenceCode["authorizationRequirements"].length > 0) {
            for (var i=0; i<evidenceCode["authorizationRequirements"].length; i++) {
                am += this.friendyAuthorizationRequirement(evidenceCode["authorizationRequirements"][i]);
            }
        }

        return am.trim() == "" ? "(ingen)" : am;
    },

    friendyAuthorizationRequirement: function(req) {
        var result = "";
        var formatter = "friendly" + req["type"];
        if (typeof this[formatter] == "function") {
            result = this[formatter](req)
        }
        else {
            result = "<li>" + req["type"] + "</li>"; 
        }

        return '<ul class="authorization-requirement authorization-requirement-' + req["type"].toLowerCase() + ((req["failureAction"] == 1) ? ' soft-requirement' : '') + '">' + result + '</ul>';
    },

    friendlyPartyTypeRequirement: function(req) {
        let partyTypes = {
            1: "Subjektet",
            2: "Den juridiske konsumenten",
            3: "Den som foretar oppslaget"
        }
        let partyConstraints = {
            0: "en privatperson",
            1: "en offentlig virksomhet",
            2: "en privat virksomhet",
            9: "en utenlandsk virksomhet"
        }
        let ret = "";
        req["allowedPartyTypes"].forEach(apt => {
            if (typeof partyTypes[apt["Key"]] != "undefined" && typeof partyConstraints[apt["Value"]] != "undefined") {
                ret += "<li>" + partyTypes[apt["Key"]] + " må være " + partyConstraints[apt["Value"]] + "</li>";
            }
            else {
                ret += "<li>Aktørtype #" + apt["Key"] + " har begrensning av type " + apt["Value"] + "</li>";
            }            
        })

        return ret;
    },

    friendlyAccreditationPartyRequirement: function(req) {
        let accreditationConstraints = {
            "RequestorAndOwnerAreEqual": "Juridisk konsument må være den som foretar oppslaget",
            "SubjectAndOwnerAreEqual": "Subjektet må være den som foretar oppslaget",
            "RequestorAndSubjectAreEqual": "Juridisk konsument må være subjektet",
            "RequestorAndOwnerAreNotEqual": "Juridisk konsument kan ikke være den som foretar oppslaget",
            "RequestorAndSubjectAreNotEqual": "Juridisk konsument kan ikke være subjektet"
        };
        let ret = "";
        req.partyRequirements.forEach(pr => {
            ret += "<li>" + accreditationConstraints[pr] + "</li>";
        });
        return ret;
    },

    friendlyMaskinportenScopeRequirement: function(req) {
        return "<li>Krever at den juridiske konsumenten er blitt tildelt Maskinporten-scope(s): " + req.requiredScopes.join(", ") + "</li>";
    },

    friendlyLegalBasisRequirement: function(req) {
        return "<li>Krever annet hjemmelsgrunnlag</li>";
    },

    friendlyConsentRequirement: function(req) {
        return "<li>Krever <a href=\"https://tt02.altinn.no/api/metadata?$filter=ServiceCode%20eq%20%27 " + req["serviceCode"] + "%27%20and%20ServiceEditionCode%20eq%20" + req["serviceEdition"] + "\">samtykke</a> fra subjektet</li>";
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
            "validTo": new Date(new Date().setDate(new Date().getDate() + 30))
        };

        if (evidenceCode.accessMethod == "consent" || evidenceCode.accessMethod == "consentOrLegalBasis") {
            authorzationRequest["evidenceRequests"][0]["requestConsent"] = true;
            authorzationRequest["consentReference"] = "12345/2345";
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
        switch (paramType) {
            case "number": return 1234.56;
            case "boolean": return true;
            case "string": return "abcd 1234";
            case "dateTime": return new Date();
            case "uri": return "https//data.altinn.no";
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
