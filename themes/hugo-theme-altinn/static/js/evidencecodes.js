$(function() {
    $('#evidencecodes-container').length ? EvidenceCodesDisplay.init($('#evidencecodes-container')) : console.warn('Missing container!');
});

var EvidenceCodesDisplay = {
    metadataUrl: "https://api.data.altinn.no/v1/public/metadata/evidencecodes",
    $containerElement: null,
    template: '',
    metadata: {},
    filter: null,
    isTest: false,

    init: function(el) {
        this.$containerElement = el;
        this.template = $('[type="text/x-evidencecodes-template"]', this.$containerElement).text();
        this.setEnvironment();
        this.enableSpinner();
        this.bindEvents();
        this.load();

        JSONSchemaFaker.option({
            alwaysFakeOptionals: true
        });
    },

    setEnvironment: function() {
        if (window.localStorage.getItem("danEvidenceCodesEnv") == "test") {
            this.metadataUrl = "https://test-api.data.altinn.no/v1/public/metadata/evidencecodes";
            this.isTest = true;          
        }
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
        this.lateBindEvents();
        this.handleDeepLink();
        this.setEnvironmentToggleState();
    },

    bindEvents: function() {
        this.$containerElement.on('click', 'a.toggle', this.toggleContainerVisible);
        this.$containerElement.on('click', '.example-json-regenerate-button', this.regenerateJsonExample);
        this.$containerElement.on('click', '.evidence-codes-env-toggler', this.toggleEnvironment);
        this.$containerElement.on('click', '.toggle-jsonschema-field-example', this.showFieldExample);
        this.$containerElement.on('click', '.hide-json-schema-field-example', this.hideFieldExamples);
        $(window).on('hashchange', this.handleDeepLink);
    },

    handleDeepLink: function() {
        var deeplink = $(".evidenceCode[data-name='" + location.hash.substring(1) + "']");
        if (deeplink.length != 1) return;
        var header = deeplink.find('.toggle');
        if (!header.parents('.evidenceCode').hasClass('isOpened')) header.click();
        header.get(0).scrollIntoView();
    },

    lateBindEvents: function() {
        var self = this;
        $('.div-toggle-buttons').each(function() {
            $(this).on('click', 'a', self.onDivTogglerClick);
            $(this).find('a').first().trigger('click');
        });
    },

    toggleEnvironment: function() {
        if ($(this).is(':checked')) {
            window.localStorage.setItem("danEvidenceCodesEnv", "test");
        }
        else {
            window.localStorage.setItem("danEvidenceCodesEnv", "prod");
        }
        location.reload();
    },

    showFieldExample: function(e) {
        var $el = $(e.target);
        var $example = $('.' + $el.data('field-name'));
        $example.parent().find('.json-schema-field-example').addClass('hidden');
        $example.removeClass('hidden');
    },

    hideFieldExamples: function(e) {
        $('.json-schema-field-example').addClass('hidden');
    },

    setEnvironmentToggleState: function() {
        if (this.isTest) {
            $('.evidence-codes-env-toggler').attr('checked', 'checked');
        }
    },

    toggleContainerVisible: function(e) {
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


    onDivTogglerClick: function(e) {
        var $btn = $(e.currentTarget);
        $btn.parent().find('a').each(function() {
            $(this).removeClass("active");
            $(this).parents('.div-toggle-container').find("." + $(this).attr('data-target')).addClass("hidden");
        });
        $btn.addClass("active");
        $btn.parents('.div-toggle-container').find("." + $btn.attr('data-target')).removeClass("hidden");
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
                am += this.friendyAuthorizationRequirement(evidenceCode["authorizationRequirements"][i], evidenceCode['belongsToServiceContexts'].length > 1);
            }
        }
        return am.trim() == "" ? "(ingen)" : am;
    },

    friendlyValueType: function(evidenceCodeName, value) {
        if (value['valueType'] == "jsonSchema") {
            return '<a href="javascript:" data-field-name="' + evidenceCodeName + "___" + value['evidenceValueName'] + '" class="toggle-jsonschema-field-example">Vis strukturert felt</a>';
        }
        return value['valueType'];
    },

    friendyAuthorizationRequirement: function(req, belongsToMoreThanOneServiceContext) {
        var result = "";
        var formatter = "friendly" + req["type"];
        
        if (typeof this[formatter] == "function") {
            result = this[formatter](req)
        }
        else {
            result = "<li>" + req["type"] + "</li>"; 
        }

        var footnote = "";

        if (belongsToMoreThanOneServiceContext && typeof req["appliesToServiceContext"] == "object" && req["appliesToServiceContext"].length > 0) {
            footnote = " <sup><a href=\"javascript:\" onclick=\"alert(this.title)\" title=\"Dette kravet gjelder tjenesten(e): " + req["appliesToServiceContext"].join(", ") + "\">?</a></sup>";
            result = result.replace("</li>", footnote + "</li>");
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
            "RequestorAndOwnerAreEqual": "Juridisk konsument kan ikke oppgi at oppslaget gjøres på vegne av andre",
            "SubjectAndOwnerAreEqual": "Subjektet må være den som foretar oppslaget",
            "RequestorAndSubjectAreEqual": "Juridisk konsument må være subjektet",
            "RequestorAndOwnerAreNotEqual": "Juridisk konsument må oppgi en annen juridisk person som oppslaget gjøres på vegne av andre",
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
        return "<li>Krever annet oppgitt behandlingsgrunnlag</li>";
    },

    friendlyConsentRequirement: function(req) {
        return "<li>Krever <a href=\"https://tt02.altinn.no/api/metadata?$filter=ServiceCode%20eq%20%27" + req["serviceCode"] + "%27%20and%20ServiceEditionCode%20eq%20" + req["serviceEdition"] + "\">samtykke</a> fra subjektet</li>";
    },

    friendlyLegalBasisTypeList: function(legalBasisBitmask) {
        let lbt = {
            1: "espd",
            2: "cpv"
        };

        let maskValues = [];
        Object.keys(lbt).forEach((x) => {
            if (legalBasisBitmask & x) {
                maskValues.push(lbt[x]);
            }
        });

        return maskValues;
    },

    friendyFirstLegalBasis: function(evidenceCode, cSharpMode = false) {
        let flbr = this.getFirstLegalBasisRequirement(evidenceCode);
        if (flbr == null || flbr.validLegalBasisTypes == null) return "sometype";
        let lbtl = this.friendlyLegalBasisTypeList(flbr.validLegalBasisTypes);
        let ret = lbtl.length == 0 ? "sometype" : lbtl[0];
        if (cSharpMode) {
            ret = ret.charAt(0).toUpperCase() + ret.slice(1);
        }
        return ret;
    },

    getFirstLegalBasisRequirement: function(evidenceCode) {
        if (evidenceCode.authorizationRequirements == null) return null;
        return evidenceCode.authorizationRequirements.find(function(x) { return x.type == "LegalBasisRequirement" });
    },

    hasLegalBasisRequirement: function(evidenceCode) {
        return !!this.getFirstLegalBasisRequirement(evidenceCode);
    },

    exampleRequestAsync: function(evidenceCode) {
        var authorizationRequest = {
            "requestor": "999888777",
            "subject": "988666555",
            "evidenceRequests": [
                {
                    "evidenceCodeName": evidenceCode.evidenceCodeName
                }
            ]
        };

        if (evidenceCode.isAsynchronous) {
            authorizationRequest["evidenceRequests"][0]["requestConsent"] = true;
            authorizationRequest["consentReference"] = "12345/2345";
        }

        if (this.hasLegalBasisRequirement(evidenceCode)) {
            authorizationRequest["legalBasisList"] = [ {
                id: "legalbasis01",
                content: this.exampleFirstLegalBasisContent(evidenceCode),
                type: this.friendyFirstLegalBasis(evidenceCode)
            } ];
            authorizationRequest["evidenceRequests"][0]["legalBasisId"] = "legalbasis01";
            // skip this, we do not use this in 'cpv' codes which is the most prevalent
            //authorizationRequest["evidenceRequests"][0]["legalBasisReference"] = "somereference";
        }

        if (typeof evidenceCode.parameters !== "undefined" && evidenceCode.parameters.length) {
            authorizationRequest.parameters = [];
            for (var i = 0; i<evidenceCode.parameters.length; i++) {
                authorizationRequest.parameters.push({
                    "evidenceParamName": evidenceCode.parameters[i]["evidenceParamName"],
                    "value": this.getRandomValue(evidenceCode.parameters[i]["paramType"])
                });
            }
        }

        var example = this.exampleCommonHttpHeaders("post", "authorization") + this.prettyPrintJson(authorizationRequest);

        example += "\n\n// Dette returnerer en Accreditation-modell. Bruk accreditationId fra denne i påfølge forespørsler for å sjekke status/høste data:\n\n";
        example += this.exampleCommonHttpHeaders("get", "evidence/{accreditationId}/" + evidenceCode.evidenceCodeName)

        return example;

    },

    exampleFirstLegalBasisContent: function(evidenceCode) {
        let legalBasisType = this.friendyFirstLegalBasis(evidenceCode);
        switch (legalBasisType) {
            case "espd": return "<?xml ...";
            case "cpv": return "4012345-1,4012345-2";
        }
        return "somecontent";
    },

    exampleRequestDirect: function(evidenceCode) {
        var op = "directhavest/" + evidenceCode.evidenceCodeName + "/?subject=988666555";
        if (typeof evidenceCode.parameters !== "undefined" && evidenceCode.parameters.length) {
            for (var i = 0; i<evidenceCode.parameters.length; i++) {
                op += "&" + evidenceCode.parameters[i]["evidenceParamName"] + "=" + encodeURIComponent(this.getRandomValue(evidenceCode.parameters[i]["paramType"]));
            }
        }

        op += "&envelope=false";

        return this.exampleCommonHttpHeaders("GET", op);
    },

    exampleRequestSdk: function(evidenceCode) {

        var example = "// Install-Package Altinn.ApiClients.Dan\n" +
                      "// See more examples at https://github.com/Altinn/altinn-apiclient-dan\n" +
                      "using Altinn.ApiClients.Dan.Interfaces;\n" + 
                      "using Altinn.ApiClients.Dan.Models;\n\n";

        if (evidenceCode.isAsynchronous) {
           example += this.exampleRequestSdkAsync(evidenceCode);
        }
        else {
            example += this.exampleRequestSdkDirect(evidenceCode);
        }

        return hljs.highlight("csharp", example).value;
    },

    exampleRequestSdkAsync: function(evidenceCode) {
        example = "var dataSetRequest = new DataSetRequest {\n" + 
                  "    DataSetName = \"" + evidenceCode.evidenceCodeName + "\",\n";
        if (typeof evidenceCode.parameters !== "undefined" && evidenceCode.parameters.length) {
            example += "    Parameters = new List<DataSetParameter> {\n";
            for (var i = 0; i<evidenceCode.parameters.length; i++) {
                example += "        new DataSetParameter { DataSetParamName = \"" + evidenceCode.parameters[i]["evidenceParamName"] + "\", Value = " + this.getRandomValueCSharp(evidenceCode.parameters[i]["paramType"]) + " },\n";
            }
            example += "    },\n";
        }
        example += "    requestConsent = true\n";
        example += "};\n\n";

        if (this.hasLegalBasisRequirement(evidenceCode)) {
            example += "var legalBasisList = new List<LegalBasis> {\n";
            example += "    Id = \"legalbasis01\",\n";
            example += "    Type = LegalBasisType." + this.friendyFirstLegalBasis(evidenceCode, true) + ",\n";
            example += "    Content = \"" + this.exampleFirstLegalBasisContent(evidenceCode, true) + "\"\n";
            example += "};\n\n";
        }

        example += "var accreditation = await _danClient.CreateDataSetRequest(\n" + 
                "    dataSetRequests: new List<DataSetRequest> { dataSetRequest },\n" + 
                "    subject: \"988666555\",\n" +
                (this.hasLegalBasisRequirement(evidenceCode) ? "    legalBasisList: legalBasisList,\n" : "") +
                "    consentReference: \"somereference\");\n\n";

        if (this.isJsonSchemaResponseOnly(evidenceCode.values)) {
            example += "// Assume '" + evidenceCode.evidenceCodeName + "Response' is defined as a POCO/record type to map to, see 'Returmodell' above\n"
            example += "var result = await _danClient.GetDataSetFromAccreditation<" + evidenceCode.evidenceCodeName + "Response>(accreditation.accreditationId, \"" + evidenceCode.evidenceCodeName + "\");\n";
        }
        else {
            example += "// Gets a generic dataset which can be iterated\n"
            example += "DataSet dataset = await _danClient.GetDataSetFromAccreditation(accreditation.accreditationId, \"" + evidenceCode.evidenceCodeName + "\");\n";
            example += "\nforeach (var dsv in dataset.Values)\n";
            example += "{\n";
            example += "    // Do something with dsv.Name and dsv.Value\n";
            example += "}\n";

            var jsonSchemaField = this.getFirstJsonSchemaField(evidenceCode.values);
            if (jsonSchemaField != null) {
                example += "\n";
                example += "// You can also target individual structured fields in the dataset and \n";
                example += "// deserialize them directly. Here we use 'dataSerializeField' to \n"
                example += "// indicated that we're interested in the field '" + jsonSchemaField.evidenceValueName + "',\n"
                example += "// and we assume that '" + jsonSchemaField.evidenceValueName + "Response' \n"
                example += "// is defined as a POCO/record type to map to (see field description above)\n";
                example += "var result = await _danClient.GetDataSetFromAccreditation<" + jsonSchemaField.evidenceValueName + "Response>(\n";
                example += "    dataSetName: \"" + evidenceCode.evidenceCodeName + "\",\n";
                example += "    deserializeField: \"" + jsonSchemaField.evidenceValueName + "\",\n";
                example += "    accreditationguid: accreditation.accreditationId,\n";
                if (typeof evidenceCode.parameters !== "undefined" && evidenceCode.parameters.length) {
                    example += ",\n    parameters: parameters);\n"
                }
                else {
                    example += ");\n"
                }
            }
        }

        return example;
    },

    exampleRequestSdkDirect: function(evidenceCode) {
        example = "";

        if (typeof evidenceCode.parameters !== "undefined" && evidenceCode.parameters.length) {
            example += "var parameters = new Dictionary<string, string> {\n";
            for (var i = 0; i<evidenceCode.parameters.length; i++) {
                example += "    { \"" + evidenceCode.parameters[i]["evidenceParamName"] + "\", " + this.getRandomValueCSharp(evidenceCode.parameters[i]["paramType"], true) + " },\n"
            }
            example += "}\n\n";
        }

        if (this.isJsonSchemaResponseOnly(evidenceCode.values)) {
            example += "// Assume '" + evidenceCode.evidenceCodeName + "Response' is defined as a POCO/record type to map to, see 'Returmodell' above\n"
            example += "var result = await _danClient.GetDataSet<" + evidenceCode.evidenceCodeName + "Response>(\n";
            example += "    dataSetName: \"" + evidenceCode.evidenceCodeName + "\",\n";
            example += "    subject: \"988666555\"";
            if (typeof evidenceCode.parameters !== "undefined" && evidenceCode.parameters.length) {
                example += ",\n    parameters: parameters);\n"
            }
            else {
                example += ");\n"
            }
        }
        else {
            example += "// Gets a generic dataset which can be iterated\n"
            example += "DataSet dataset = await _danClient.GetDataSet(\n";
            example += "    dataSetName: \"" + evidenceCode.evidenceCodeName + "\",\n";
            example += "    subject: \"988666555\"";
            if (typeof evidenceCode.parameters !== "undefined" && evidenceCode.parameters.length) {
                example += ",\n    parameters: parameters);\n"
            } else {
                example += ");\n"
            }
            example += "\nforeach (var dsv in dataset.Values)\n";
            example += "{\n";
            example += "    // Do something with dsv.Name and dsv.Value\n";
            example += "}\n";

            var jsonSchemaField = this.getFirstJsonSchemaField(evidenceCode.values);
            if (jsonSchemaField != null) {
                example += "\n";
                example += "// You can also target individual structured fields in the dataset and \n";
                example += "// deserialize them directly. Here we use 'dataSerializeField' to \n"
                example += "// indicated that we're interested in the field '" + jsonSchemaField.evidenceValueName + "',\n"
                example += "// and we assume that '" + jsonSchemaField.evidenceValueName + "Response' \n"
                example += "// is defined as a POCO/record type to map to (see field description above)\n";
                example += "var result = await _danClient.GetDataSet<" + jsonSchemaField.evidenceValueName + "Response>(\n";
                example += "    dataSetName: \"" + evidenceCode.evidenceCodeName + "\",\n";
                example += "    deserializeField: \"" + jsonSchemaField.evidenceValueName + "\",\n";
                example += "    subject: \"988666555\"";
                if (typeof evidenceCode.parameters !== "undefined" && evidenceCode.parameters.length) {
                    example += ",\n    parameters: parameters);\n"
                }
                else {
                    example += ");\n"
                }
            }
        }

        return example;
    },

    exampleCommonHttpHeaders: function(method, op) {
        return hljs.highlight("http", method.toUpperCase() + " https://api.data.altinn.no/v1/" + op + " HTTP/1.1\r\n" +
               "Authorization: Bearer {maskinporten-token}\n" + 
               "Ocp-apim-subscription-key: {subscription-key}\n").value;
    },

    isJsonSchemaResponseOnly: function(values) {
        if (values.length != 1) return false;
        if (values[0]['valueType'] != "jsonSchema") return false;
        return true;
    },

    isJsonSchemaField: function(value) {
        return value['valueType'] == "jsonSchema";
    },

    hasJsonSchemaField: function(values) {
        return this.getFirstJsonSchemaField(values) != null;
    },

    getFirstJsonSchemaField: function(values) {
        for (var i=0; i<values.length; i++) {
            if (this.isJsonSchemaField(values[i]))
                return values[i];
        }
        return null;
    },

    exampleJsonResponseSchema: function(code) {
        if (!code["jsonSchemaDefintion"]) {
            return "Beklager, JSON Schema er foreløpig ikke dokumentert på dette datasettet."
        }
        return this.prettyPrintJson(code["jsonSchemaDefintion"]);
    },

    exampleJsonResponseGenerated: function(code) {
        if (!code["jsonSchemaDefintion"]) {
            return "Beklager, JSON Schema er foreløpig ikke dokumentert på dette datasettet."
        }
        try {
            var jsonSchemaObj = JSON.parse(code["jsonSchemaDefintion"]);
            var exampleObj = JSONSchemaFaker.generate(jsonSchemaObj);
            return this.prettyPrintJson(exampleObj);
        }
        catch {
            return "Beklager, kunne ikke generere et eksempel basert på JSON Schema."
        }
    }, 

    regenerateJsonExample: function(e) {
        var $button = $(e.currentTarget);
        var $exampleContainer = $button.parent().find('code');
        var $schemaContainer = $button.parent().parent().find('.schema code');
        $exampleContainer.html(EvidenceCodesDisplay.exampleJsonResponseGenerated({ "jsonSchemaDefintion": $schemaContainer.get(0).innerText }))
    },

    getRandomValue: function(paramType) {
        switch (paramType) {
            case "number": return 1234.56;
            case "boolean": return true;
            case "string": return "abcd 1234";
            case "dateTime": return (new Date()).toISOString();
            case "uri": return "https//data.altinn.no";
            case "amount": return "10293 NOK";
            case "attachment": return "8fbn34==="
        }
        return "tf";
    },

    getRandomValueCSharp: function(paramType, asString = false) {
        switch (paramType) {
            case "number": return asString ? "\"1234.56\"" : 1234.56;
            case "boolean": return asString ? "\"true\"" : true;
            case "string": return "\"abcd 1234\"";
            case "dateTime": return "\"" + (new Date()).toISOString() + "\"";
            case "uri": return "\"https//data.altinn.no\"";
            case "amount": return "\"10293 NOK\"";
            case "attachment": return "\"8fbn34===\""
        }
        return "tf";
    },

    prettyPrintJson: function(json) {
        if (typeof json == 'string') {
            json = JSON.parse(json);
        }
        json = JSON.stringify(json, undefined, 2);
        return hljs.highlight("json", json).value;
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
