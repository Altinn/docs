---
title: Drosjeløyve
description: Innehenting av data i søknadsprosess for drosjeløyver
weight: 70
---

Under arbeid: Søknad om drosjeløyve er en fylkeskommunal tjeneste i regi av Viken og FINT som ved bruk av samtykke automatisk henter inn deler av dokumentasjonskravet på vegne av søkende virksomhet.

## Beviskoder
<script type="text/javascript" src="/docs/utviklingsguider/data.altinn.no/beviskoder/evidencecodes.js"></script>
<link rel="stylesheet" type="text/css" href="/docs/utviklingsguider/data.altinn.no/beviskoder/evidencecodes.css" />
<div id="evidencecodes-container"  data-filter-servicecontext="Drosjeloyve">

<style type="text/x-evidencecodes-template">
<%for(var i=0; i<this.data.length; i++) { var code = this.data[i]; %>
<div class="evidenceCode">
    <div class="header">
        <i class="fa fa-chevron-right"></i>
        <a href="javascript:" class="toggle"><span class="name"><%code.evidenceCodeName%></span></a>
    </div>
    <div class="detailscontainer">
        <p><%code.description%></p>
        <dl>
            <dt>Tilgang</dt><dd><%EvidenceCodesDisplay.friendlyAccessMethod(code.accessMethod)%></dd>
            <dt>Asynkron</dt><dd><%code.isAsynchronous?'Ja':'Nei'%></dd>
            <dt>Maks tilgjengelighet</dt><dd><%code.maxValidDays ? code.maxValidDays + ' dager' : 'Ikke oppgitt'%></dd>
            <dt>Har parametre</dt><dd><%typeof code.parameters !== 'undefined' ? 'Ja' : 'Nei'%></dd>
        </dl>
        <%if (typeof code.parameters !== 'undefined'){%>
        <div class="params">
            <h3>Parametere</h3>
            <p>Dette er parametere som kan eller må oppgis i forespørselen</p>
            <table>
                <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Påkrevd</th>
                </tr>
                <%for(var j=0;j<code.parameters.length; j++) {%>
                <tr>
                    <td><%code.parameters[j]['evidenceParamName']%></td>
                    <td><%code.parameters[j]['paramType']%></td>
                    <td><%code.parameters[j]['required']?'Ja':'Nei'%></td>
                </tr> 
                <%}%>
            </table>
        </div>
        <%}%>
        <div class="values">
            <h3>Verdier i retur</h3>
            <p>Dette er feltene som ligger i svaret</p>
            <table>
                <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Kilde</th>
                </tr>
                <%for(var j=0;j<code.values.length; j++) {%>
                <tr>
                    <td><%code.values[j]['evidenceValueName']%></td>
                    <td><%code.values[j]['valueType']%></td>
                    <td><%code.values[j]['source']%></td>
                </tr> 
                <%}%>
            </table>
        </div>
        <div class="example">
            <h3>Eksempel på forespørsel</h3>
            <pre>
                <code>
                    <%EvidenceCodesDisplay.exampleRequest(code)%>
                </code>
            </pre>
<!-- DO NOT change indentation on the following lines, or Hugo will think it's code and wrap it in pre/code-tags and ruin your day -->
</div>
</div>
</div>
<br style="clear:both">
<%}%>
</style>

</div>