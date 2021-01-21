---
title: Request-eksempler
description: Eksempler på hvordan man henter data om en gitt virksomhet
weight: 10
---

{{% notice note %}}
Under arbeid!
{{% /notice %}}

### Generelt

Tilda er tilgjengelig i to miljøer - test.data.altinn.no og data.altinn.no - man må be om apinøkkel for produktet "Tilsynsdata" begge steder.

For å kunne bruke data.altinn.no med maskinporten må man få tildelt scope (VER2 for test) - det vil gjøres så snart det foreligger en endelig liste over hvem som deltar på konsumentsiden.

 [Se her for mer informasjon om maskinporten](https://docs.digdir.no/maskinporten_guide_apikonsument.html)

 For mer informasjon om api-ene i data.altinn.no, se [her.](/docs/utviklingsguider/data.altinn.no/bruke-rest-api)
### Tilsynsrapporter


#### Request

URL: https://test-api.data.altinn.no/v1/authorization

Header "Authorization" med token fra maskinporten

Header "Ocp-apim-subscription-key" med apinøkkel fra valgt miljø 

```json
{
  "requestor": "991825827", //Tilsynsmyndigheten som ønsker data, må være lik autentisert orgnr
  "subject": "998997801",  //Virksomheten man ønsker å hente data om, tilsynsobjektet  
  "evidenceRequests": [
    {
      "evidenceCodeName": "TildaTilsynsrapport", //Navn på datasett
      "parameters":
    [
        {
            "evidenceParamName": "tilsynskilder", 
            "value": "974761211" //organisasjonsnumre til aktuelle tilsyn, kommaseparert, valgfri
        },
        {
            "evidenceParamName": "startdato", 
            "value": "2021-01-20T00:00:00.0000000Z" //bare be om rapporter fra denne dato og fremover, valgfri
        },
        {
            "evidenceParamName": "sluttdato", 
            "value": "2021-01-20T00:00:00.0000000Z" //bare be om rapporter før denne datoen, valgfri
        }            
    ]
    }
  ],
  "externalReference": "tilsynsrapport_test", //ekstern systemreferanse
  "validTo": "2022-01-19T00:00:00.0000000Z" //Levetid på spørringsid, maks 1 år
}
```

#### Respons


```json
{
    "evidenceStatus": {
        "evidenceCodeName": "TildaTilsynsrapport",
        "status": {
            "code": 1,
            "description": "The information is available for harvest"
        },
        "validFrom": "2021-01-20T14:04:37.4988224+00:00",
        "validTo": "2021-04-19T00:00:00Z",
        "didSupplyLegalBasis": false
    },
    "evidenceValues": [
        {
            "evidenceValueName": "tilsynsrapporter",
            "source": "974761211",
            "timestamp": "2021-01-20T14:05:00.010979Z",
            "value": "{\r\n  \"status\": \"ok\",\r\n  \"statustekst\": \"\",\r\n  \"tilsynsmyndighet\": \"974761211\",\r\n  \"tilsynsrapporter\": [\r\n    {\r\n      \"tilsynsobjekt\": \"974720760\",\r\n      \"tilsynsmyndighet\": \"974761211\",\r\n      \"paaVegneAv\": \"223344556\",\r\n      \"tilsynsadresser\": [\r\n        {\r\n          \"lokalitetsreferanse\": null,\r\n          \"bygningsnummer\": \"x\",\r\n          \"bruksenhetsnummer\": \"Enhetsnummer\",\r\n          \"adressenavn\": \"Objektadresseveien 2\",\r\n          \"adressenummer\": \"2\",\r\n          \"postnummer\": \"Postnummer\",\r\n          \"poststedsnavn\": \"Poststedsnavn\",\r\n          \"kommunenummer\": \"0301\",\r\n          \"bydel\": \"Dal\",\r\n          \"fylkesnummer\": \"020\",\r\n          \"lengdegrad\": \"59.913868\",\r\n          \"breddegrad\": \"10.752245\",\r\n          \"stedstype\": \"Type lokasjon\",\r\n          \"stedbeskrivelse\": \"Enda ei rønne\"\r\n        }\r\n      ],\r\n      \"tilsynsstatus\": \"lukket\",\r\n      \"internTilsynsId\": \"TilsynArbeidstilsynet97476121112\",\r\n      \"samordnedeTilsynsmyndigheter\": [\r\n        {\r\n          \"tilsynsmyndighet\": \"111111111\",\r\n          \"tema\": \"Hendelse\"\r\n        },\r\n        {\r\n          \"tilsynsmyndighet\": \"222222222\",\r\n          \"tema\": \"Utslipp til vann\"\r\n        }\r\n      ],\r\n      \"tilsynsegenskaper\": {\r\n        \"kommunalt\": \"ja\",\r\n        \"storulykke\": \"nei\",\r\n        \"uanmeldt\": \"irrelevant\"\r\n      },\r\n      \"tilsynsaktiviteter\": [\r\n        {\r\n          \"dato\": \"2016-09-26T00:00:00\",\r\n          \"varighet\": 12,\r\n          \"form\": \"fysisk\",\r\n          \"type\": \"oppfoelging\",\r\n          \"funksjon\": \"aapentTilsyn\",\r\n          \"tema\": \"ProeveTaking\"\r\n        },\r\n        {\r\n          \"dato\": \"2011-09-26T00:00:00\",\r\n          \"varighet\": 112,\r\n          \"form\": \"virtuelt\",\r\n          \"type\": \"storulykketilsyn\",\r\n          \"funksjon\": \"inspeksjon\",\r\n          \"tema\": \"Hendelse\"\r\n        }\r\n      ],\r\n      \"kontakt\": [\r\n        {\r\n          \"navn\": \"Navn Navnesen\",\r\n          \"rolle\": \"Rolleansvarlig for roller og ansvar\",\r\n          \"avdeling\": \"Avdelinga te Tor\",\r\n          \"telefonnummer\": \"47419641\",\r\n          \"epost\": \"epost@domain.com\",\r\n          \"adresse\": \"Adresse adresseveien 3\"\r\n        },\r\n        {\r\n          \"navn\": \"Jan Janssen\",\r\n          \"rolle\": \"Senior ansvarsansvarlig\",\r\n          \"avdeling\": \"Avdelinga te Knut\",\r\n          \"telefonnummer\": \"47419641\",\r\n          \"epost\": \"epost@domain2.com\",\r\n          \"adresse\": \"Adresseveien 3\"\r\n        }\r\n      ],\r\n      \"tilsynsutvelgelse\": \"aarlig\",\r\n      \"bekymringsmeldinger\": [\r\n        {\r\n          \"tilsynsmyndighet\": \"2222222\",\r\n          \"tema\": \"Bekymringsmelding\"\r\n        }\r\n      ],\r\n      \"notater\": \"Notatblokka sier ingenting\",\r\n      \"bruddOgReaksjoner\": [\r\n        {\r\n          \"lovparagraf\": \"Første mosebok\",\r\n          \"paalegg\": \"Fortapelse\",\r\n          \"reaksjonsdato\": \"2021-01-15T14:04:59.9090702+00:00\",\r\n          \"etatreaksjon\": \"Lyst i bann\",\r\n          \"reaksjonsgrad\": \"roed\"\r\n        },\r\n        {\r\n          \"lovparagraf\": \"Lankeklaskeloven p1\",\r\n          \"paalegg\": \"Smerte\",\r\n          \"reaksjonsdato\": \"2021-01-05T14:04:59.9090725+00:00\",\r\n          \"etatreaksjon\": \"Klask på lanken\",\r\n          \"reaksjonsgrad\": \"gul\"\r\n        }\r\n      ],\r\n      \"tilsynsvurdering\": \"gul\"\r\n    },\r\n    {\r\n      \"tilsynsobjekt\": \"974720760\",\r\n      \"tilsynsmyndighet\": \"974761211\",\r\n      \"paaVegneAv\": \"223344556\",\r\n      \"tilsynsadresser\": [\r\n        {\r\n          \"lokalitetsreferanse\": null,\r\n          \"bygningsnummer\": \"x\",\r\n          \"bruksenhetsnummer\": \"Enhetsnummer\",\r\n          \"adressenavn\": \"Objektadresseveien 2\",\r\n          \"adressenummer\": \"2\",\r\n          \"postnummer\": \"Postnummer\",\r\n          \"poststedsnavn\": \"Poststedsnavn\",\r\n          \"kommunenummer\": \"0301\",\r\n          \"bydel\": \"Dal\",\r\n          \"fylkesnummer\": \"020\",\r\n          \"lengdegrad\": \"59.913868\",\r\n          \"breddegrad\": \"10.752245\",\r\n          \"stedstype\": \"Type lokasjon\",\r\n          \"stedbeskrivelse\": \"Enda ei rønne\"\r\n        }\r\n      ],\r\n      \"tilsynsstatus\": \"lukket\",\r\n      \"internTilsynsId\": \"TilsynArbeidstilsynet97476121112\",\r\n      \"samordnedeTilsynsmyndigheter\": [\r\n        {\r\n          \"tilsynsmyndighet\": \"111111111\",\r\n          \"tema\": \"Hendelse\"\r\n        },\r\n        {\r\n          \"tilsynsmyndighet\": \"222222222\",\r\n          \"tema\": \"Utslipp til vann\"\r\n        }\r\n      ],\r\n      \"tilsynsegenskaper\": {\r\n        \"kommunalt\": \"ja\",\r\n        \"storulykke\": \"nei\",\r\n        \"uanmeldt\": \"irrelevant\"\r\n      },\r\n      \"tilsynsaktiviteter\": [\r\n        {\r\n          \"dato\": \"2016-09-26T00:00:00\",\r\n          \"varighet\": 12,\r\n          \"form\": \"fysisk\",\r\n          \"type\": \"oppfoelging\",\r\n          \"funksjon\": \"aapentTilsyn\",\r\n          \"tema\": \"ProeveTaking\"\r\n        },\r\n        {\r\n          \"dato\": \"2011-09-26T00:00:00\",\r\n          \"varighet\": 112,\r\n          \"form\": \"virtuelt\",\r\n          \"type\": \"storulykketilsyn\",\r\n          \"funksjon\": \"inspeksjon\",\r\n          \"tema\": \"Hendelse\"\r\n        }\r\n      ],\r\n      \"kontakt\": [\r\n        {\r\n          \"navn\": \"Navn Navnesen\",\r\n          \"rolle\": \"Rolleansvarlig for roller og ansvar\",\r\n          \"avdeling\": \"Avdelinga te Tor\",\r\n          \"telefonnummer\": \"47419641\",\r\n          \"epost\": \"epost@domain.com\",\r\n          \"adresse\": \"Adresse adresseveien 3\"\r\n        },\r\n        {\r\n          \"navn\": \"Jan Janssen\",\r\n          \"rolle\": \"Senior ansvarsansvarlig\",\r\n          \"avdeling\": \"Avdelinga te Knut\",\r\n          \"telefonnummer\": \"47419641\",\r\n          \"epost\": \"epost@domain2.com\",\r\n          \"adresse\": \"Adresseveien 3\"\r\n        }\r\n      ],\r\n      \"tilsynsutvelgelse\": \"aarlig\",\r\n      \"bekymringsmeldinger\": [\r\n        {\r\n          \"tilsynsmyndighet\": \"2222222\",\r\n          \"tema\": \"Bekymringsmelding\"\r\n        }\r\n      ],\r\n      \"notater\": \"Notatblokka sier ingenting\",\r\n      \"bruddOgReaksjoner\": [\r\n        {\r\n          \"lovparagraf\": \"Første mosebok\",\r\n          \"paalegg\": \"Fortapelse\",\r\n          \"reaksjonsdato\": \"2021-01-15T14:04:59.9091844+00:00\",\r\n          \"etatreaksjon\": \"Lyst i bann\",\r\n          \"reaksjonsgrad\": \"roed\"\r\n        },\r\n        {\r\n          \"lovparagraf\": \"Lankeklaskeloven p1\",\r\n          \"paalegg\": \"Smerte\",\r\n          \"reaksjonsdato\": \"2021-01-05T14:04:59.9091852+00:00\",\r\n          \"etatreaksjon\": \"Klask på lanken\",\r\n          \"reaksjonsgrad\": \"gul\"\r\n        }\r\n      ],\r\n      \"tilsynsvurdering\": \"gul\"\r\n    }\r\n  ]\r\n}",
            "valueType": "jsonSchema"
        }
    ]
}
```

### Trendrapporter
```json
{
  "requestor": "991825827", //Tilsynsmyndigheten som ønsker data, må være lik autentisert orgnr
  "subject": "998997801",  //Virksomheten man ønsker å hente data om, tilsynsobjektet  
  "evidenceRequests": [
    {
      "evidenceCodeName": "TildaTilsynskoordinering", //Navn på datasett
      "parameters":
    [
        {
            "evidenceParamName": "tilsynskilder", 
            "value": "974761211" //organisasjonsnumre til aktuelle tilsyn, kommaseparert, valgfri
        },
        {
            "evidenceParamName": "startdato", 
            "value": "2021-01-20T00:00:00.0000000Z" //bare be om rapporter fra denne dato og fremover, valgfri
        },
        {
            "evidenceParamName": "sluttdato", 
            "value": "2021-01-20T00:00:00.0000000Z" //bare be om rapporter før denne datoen, valgfri
        }            
    ]
    }
  ],
  "externalReference": "tilsynsrapport_test", //referanse for bruk i det eksterne systemet
    "validTo": "2022-01-19T00:00:00.0000000Z" //Levetid på spørringsid, maks 1 år
}
```
### Koordineringsrapporter
```json
{
  "requestor": "991825827", //Tilsynsmyndigheten som ønsker data, må være lik autentisert orgnr
  "subject": "998997801",  //Virksomheten man ønsker å hente data om, tilsynsobjektet  
  "evidenceRequests": [
    {
      "evidenceCodeName": "TildaTilsynsrapport", //Navn på datasett
      "parameters":
    [
        {
            "evidenceParamName": "tilsynskilder", 
            "value": "974761211" //organisasjonsnumre til aktuelle tilsyn, kommaseparert, valgfri
        },
        {
            "evidenceParamName": "startdato", 
            "value": "2021-01-20T00:00:00.0000000Z" //bare be om rapporter fra denne dato og fremover, valgfri
        },
        {
            "evidenceParamName": "sluttdato", 
            "value": "2021-01-20T00:00:00.0000000Z" //bare be om rapporter før denne datoen, valgfri
        }            
    ]
    }
  ],
  "externalReference": "tilsynsrapport_test", //referanse for bruk i det eksterne systemet
   "validTo": "2022-01-19T00:00:00.0000000Z" //Levetid på spørringsid, maks 1 år
}
```
### NPDID
```json
{
  "requestor": "991825827", //Tilsynsmyndigheten som ønsker data, må være lik autentisert orgnr
  "subject": "998997801",  //Virksomheten man ønsker å hente data om, tilsynsobjektet  
  "evidenceRequests": [
    {
      "evidenceCodeName": "TildaNPDID", //Navn på datasett
      "parameters":
    [
        {
            "evidenceParamName": "tilsynskilder", 
            "value": "974761211" //organisasjonsnumre til aktuelle tilsyn, kommaseparert, valgfri
        },
        {
            "evidenceParamName": "startdato", 
            "value": "2021-01-20T00:00:00.0000000Z" //bare be om rapporter fra denne dato og fremover, valgfri
        },
        {
            "evidenceParamName": "sluttdato", 
            "value": "2021-01-20T00:00:00.0000000Z" //bare be om rapporter før denne datoen, valgfri
        },
        {
            "evidenceParamName": "npdid", 
            "value": "23432" //Npdid-filter, valgfri
        }                  
    ]
    }
  ],
  "externalReference": "tilsynsrapport_test", //referanse for bruk i det eksterne systemet
   "validTo": "2022-01-19T00:00:00.0000000Z" //Levetid på spørringsid, maks 1 år
}
```

#### Respons
```json
{
    "evidenceStatus": {
        "evidenceCodeName": "TildaNPDID",
        "status": {
            "code": 1,
            "description": "The information is available for harvest"
        },
        "validFrom": "2021-01-20T14:12:44.4971691+00:00",
        "validTo": "2021-04-19T00:00:00Z",
        "didSupplyLegalBasis": false
    },
    "evidenceValues": [
        {
            "evidenceValueName": "tilsynsrapporter",
            "source": "974761211",
            "timestamp": "2021-01-20T14:13:03.5325983Z",
            "value": "{\r\n  \"status\": \"ok\",\r\n  \"statustekst\": \"\",\r\n  \"tilsynsmyndighet\": \"974761211\",\r\n  \"tilsynsrapporter\": [\r\n    {\r\n      \"npdid\": \"2323\",\r\n      \"tilsynsobjekt\": \"974720760\",\r\n      \"tilsynsmyndighet\": \"974761211\",\r\n      \"paaVegneAv\": \"223344556\",\r\n      \"tilsynsadresser\": [\r\n        {\r\n          \"lokalitetsreferanse\": null,\r\n          \"bygningsnummer\": \"x\",\r\n          \"bruksenhetsnummer\": \"Enhetsnummer\",\r\n          \"adressenavn\": \"Objektadresseveien 2\",\r\n          \"adressenummer\": \"2\",\r\n          \"postnummer\": \"Postnummer\",\r\n          \"poststedsnavn\": \"Poststedsnavn\",\r\n          \"kommunenummer\": \"0301\",\r\n          \"bydel\": \"Dal\",\r\n          \"fylkesnummer\": \"020\",\r\n          \"lengdegrad\": \"59.913868\",\r\n          \"breddegrad\": \"10.752245\",\r\n          \"stedstype\": \"Type lokasjon\",\r\n          \"stedbeskrivelse\": \"Enda ei rønne\"\r\n        }\r\n      ],\r\n      \"tilsynsstatus\": \"lukket\",\r\n      \"internTilsynsId\": \"TilsynArbeidstilsynet97476121112\",\r\n      \"samordnedeTilsynsmyndigheter\": [\r\n        {\r\n          \"tilsynsmyndighet\": \"111111111\",\r\n          \"tema\": \"Hendelse\"\r\n        },\r\n        {\r\n          \"tilsynsmyndighet\": \"222222222\",\r\n          \"tema\": \"Utslipp til vann\"\r\n        }\r\n      ],\r\n      \"tilsynsegenskaper\": {\r\n        \"kommunalt\": \"ja\",\r\n        \"storulykke\": \"nei\",\r\n        \"uanmeldt\": \"irrelevant\"\r\n      },\r\n      \"tilsynsaktiviteter\": [\r\n        {\r\n          \"dato\": \"2016-09-26T00:00:00\",\r\n          \"varighet\": 12,\r\n          \"form\": \"fysisk\",\r\n          \"type\": \"oppfoelging\",\r\n          \"funksjon\": \"aapentTilsyn\",\r\n          \"tema\": \"ProeveTaking\"\r\n        },\r\n        {\r\n          \"dato\": \"2011-09-26T00:00:00\",\r\n          \"varighet\": 112,\r\n          \"form\": \"virtuelt\",\r\n          \"type\": \"storulykketilsyn\",\r\n          \"funksjon\": \"inspeksjon\",\r\n          \"tema\": \"Hendelse\"\r\n        }\r\n      ],\r\n      \"kontakt\": [\r\n        {\r\n          \"navn\": \"Navn Navnesen\",\r\n          \"rolle\": \"Rolleansvarlig for roller og ansvar\",\r\n          \"avdeling\": \"Avdelinga te Tor\",\r\n          \"telefonnummer\": \"47419641\",\r\n          \"epost\": \"epost@domain.com\",\r\n          \"adresse\": \"Adresse adresseveien 3\"\r\n        },\r\n        {\r\n          \"navn\": \"Jan Janssen\",\r\n          \"rolle\": \"Senior ansvarsansvarlig\",\r\n          \"avdeling\": \"Avdelinga te Knut\",\r\n          \"telefonnummer\": \"47419641\",\r\n          \"epost\": \"epost@domain2.com\",\r\n          \"adresse\": \"Adresseveien 3\"\r\n        }\r\n      ],\r\n      \"tilsynsutvelgelse\": \"aarlig\",\r\n      \"bekymringsmeldinger\": [\r\n        {\r\n          \"tilsynsmyndighet\": \"2222222\",\r\n          \"tema\": \"Bekymringsmelding\"\r\n        }\r\n      ],\r\n      \"notater\": \"Notatblokka sier ingenting\",\r\n      \"bruddOgReaksjoner\": [\r\n        {\r\n          \"lovparagraf\": \"Første mosebok\",\r\n          \"paalegg\": \"Fortapelse\",\r\n          \"reaksjonsdato\": \"2021-01-15T14:13:03.4622431+00:00\",\r\n          \"etatreaksjon\": \"Lyst i bann\",\r\n          \"reaksjonsgrad\": \"roed\"\r\n        },\r\n        {\r\n          \"lovparagraf\": \"Lankeklaskeloven p1\",\r\n          \"paalegg\": \"Smerte\",\r\n          \"reaksjonsdato\": \"2021-01-05T14:13:03.4622676+00:00\",\r\n          \"etatreaksjon\": \"Klask på lanken\",\r\n          \"reaksjonsgrad\": \"gul\"\r\n        }\r\n      ],\r\n      \"tilsynsvurdering\": \"gul\"\r\n    },\r\n    {\r\n      \"npdid\": \"2323\",\r\n      \"tilsynsobjekt\": \"974720760\",\r\n      \"tilsynsmyndighet\": \"974761211\",\r\n      \"paaVegneAv\": \"223344556\",\r\n      \"tilsynsadresser\": [\r\n        {\r\n          \"lokalitetsreferanse\": null,\r\n          \"bygningsnummer\": \"x\",\r\n          \"bruksenhetsnummer\": \"Enhetsnummer\",\r\n          \"adressenavn\": \"Objektadresseveien 2\",\r\n          \"adressenummer\": \"2\",\r\n          \"postnummer\": \"Postnummer\",\r\n          \"poststedsnavn\": \"Poststedsnavn\",\r\n          \"kommunenummer\": \"0301\",\r\n          \"bydel\": \"Dal\",\r\n          \"fylkesnummer\": \"020\",\r\n          \"lengdegrad\": \"59.913868\",\r\n          \"breddegrad\": \"10.752245\",\r\n          \"stedstype\": \"Type lokasjon\",\r\n          \"stedbeskrivelse\": \"Enda ei rønne\"\r\n        }\r\n      ],\r\n      \"tilsynsstatus\": \"lukket\",\r\n      \"internTilsynsId\": \"TilsynArbeidstilsynet97476121112\",\r\n      \"samordnedeTilsynsmyndigheter\": [\r\n        {\r\n          \"tilsynsmyndighet\": \"111111111\",\r\n          \"tema\": \"Hendelse\"\r\n        },\r\n        {\r\n          \"tilsynsmyndighet\": \"222222222\",\r\n          \"tema\": \"Utslipp til vann\"\r\n        }\r\n      ],\r\n      \"tilsynsegenskaper\": {\r\n        \"kommunalt\": \"ja\",\r\n        \"storulykke\": \"nei\",\r\n        \"uanmeldt\": \"irrelevant\"\r\n      },\r\n      \"tilsynsaktiviteter\": [\r\n        {\r\n          \"dato\": \"2016-09-26T00:00:00\",\r\n          \"varighet\": 12,\r\n          \"form\": \"fysisk\",\r\n          \"type\": \"oppfoelging\",\r\n          \"funksjon\": \"aapentTilsyn\",\r\n          \"tema\": \"ProeveTaking\"\r\n        },\r\n        {\r\n          \"dato\": \"2011-09-26T00:00:00\",\r\n          \"varighet\": 112,\r\n          \"form\": \"virtuelt\",\r\n          \"type\": \"storulykketilsyn\",\r\n          \"funksjon\": \"inspeksjon\",\r\n          \"tema\": \"Hendelse\"\r\n        }\r\n      ],\r\n      \"kontakt\": [\r\n        {\r\n          \"navn\": \"Navn Navnesen\",\r\n          \"rolle\": \"Rolleansvarlig for roller og ansvar\",\r\n          \"avdeling\": \"Avdelinga te Tor\",\r\n          \"telefonnummer\": \"47419641\",\r\n          \"epost\": \"epost@domain.com\",\r\n          \"adresse\": \"Adresse adresseveien 3\"\r\n        },\r\n        {\r\n          \"navn\": \"Jan Janssen\",\r\n          \"rolle\": \"Senior ansvarsansvarlig\",\r\n          \"avdeling\": \"Avdelinga te Knut\",\r\n          \"telefonnummer\": \"47419641\",\r\n          \"epost\": \"epost@domain2.com\",\r\n          \"adresse\": \"Adresseveien 3\"\r\n        }\r\n      ],\r\n      \"tilsynsutvelgelse\": \"aarlig\",\r\n      \"bekymringsmeldinger\": [\r\n        {\r\n          \"tilsynsmyndighet\": \"2222222\",\r\n          \"tema\": \"Bekymringsmelding\"\r\n        }\r\n      ],\r\n      \"notater\": \"Notatblokka sier ingenting\",\r\n      \"bruddOgReaksjoner\": [\r\n        {\r\n          \"lovparagraf\": \"Første mosebok\",\r\n          \"paalegg\": \"Fortapelse\",\r\n          \"reaksjonsdato\": \"2021-01-15T14:13:03.4625822+00:00\",\r\n          \"etatreaksjon\": \"Lyst i bann\",\r\n          \"reaksjonsgrad\": \"roed\"\r\n        },\r\n        {\r\n          \"lovparagraf\": \"Lankeklaskeloven p1\",\r\n          \"paalegg\": \"Smerte\",\r\n          \"reaksjonsdato\": \"2021-01-05T14:13:03.4625828+00:00\",\r\n          \"etatreaksjon\": \"Klask på lanken\",\r\n          \"reaksjonsgrad\": \"gul\"\r\n        }\r\n      ],\r\n      \"tilsynsvurdering\": \"gul\"\r\n    }\r\n  ]\r\n}",
            "valueType": "jsonSchema"
        }
    ]
}
```
