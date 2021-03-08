---
title: Sende inn
description: Operasjoner for å sende inn meldinger
toc: true
weight: 10
---

## Generelt om innsendingstjenester
I Altinn er bygget inn mye funksjonalitet får å tilby brukere skjema med ulike behov og krav. 
Ved bruk av REST-apiet kan man opprette en skjemainstans for å få en messageid, og deretter legge til, endre eller slette underskjema og vedlegg som man ønsker.


I Altinn kan tjenesteeier selv angi hvilke innsendingskanaler som er gyldige.
REST API må derfor angis av tjenesteeier som en gyldig kanal.Metadata ressursen som lister alle produksjonsatte tjenester i Altinn
vil indikere om aktuell tjeneste er tilgjengelig for innsending fra REST API.

Skjema i Altinn er bygget på en XSD datamodell (http://en.wikipedia.org/wiki/XSD), som igjen er knyttet til en overordnet semantisk modell.
Denne XSD angir de tekniske valideringene for et skjema. Andre typer valideringsregler (kalkyler, forretningsregler) kan angis som en del
av utviklingen av skjema. XSD for aktuell tjeneste kan lastes ned fra [metadata ressursen](../../metadata/#hente-metadata-for-enkelt-tjeneste).

Skjema må sees på som en payload "Blob" representert i XML, og må representeres som XML også i JSON, se eksempel under.

## POST på message elementet
Man kan sende inn skjema med vedlegg. Skjema er i API-et Message av type `FormTask`. 

### POST for innsending av skjema til arkiv
Følgende request sender inn skjema med vedlegg til Arkivet i brukerens meldingsboks. 
Merk at AttachmentType på vedlegget indikerer hvilken funksjonell vedleggstype som er lagt ved - ikke mimetype. Hvilke vedleggstyper som er tillatt på forskjellige innsendingstjenester finnes i AttachmentRules.AttachmentTypeName i metadata-tjenesten.
Adressen til det arkiverte skjemaet vil returneres i Location response header.

Header
```HTTP
POST https://www.altinn.no/api/{who}/messages HTTP/1.1 
Content-Type: application/hal+json
ApiKey: myKey
```

Body
```JSON
{
    "Type": "FormTask",
    "ServiceCode": "1029",
    "ServiceEdition": 64,
    "_embedded" : {
        "forms" : [
            {
                "Type": "MainForm",
                "DataFormatId": "1232",
                "DataFormatVersion": "10123",
                "FormData": "<Skjema>...</Skjema>"
            }
        ],
        "attachments" : [
            {
                "FileName": "string example 43",
                "AttachmentType": "FunksjonellVedleggsType",
                "Data": "base64 encoded"
            }
        ]
    }
}
```

### POST for innsending av skjema til arbeidslisten (mellomlagring)
Det er også mulig å sende inn skjema til arbeidslisten i Altinn.
Da vil skjema få status "Utfylling". Skjema kan så fylles ut ferdig i Altinn portal eller fullføres med ny PUT operasjon på meldingen.
At skjemaet skal få status 'Utfylling' angis ved å inkludere URL-parameter complete=false.
Adressen til skjemaet i arbeidslisten returneres i Location respons header.

Header
```HTTP
POST https://www.altinn.no/api/{who}/messages?complete=false HTTP/1.1 
Content-Type: application/hal+json
ApiKey: myKey
```

Body 
```JSON
{
    "Type": "FormTask",
    "ServiceCode": "123",
    "ServiceEdition": 64,
    "_embedded" : {
        "forms" : [{
            "Type": "MainForm",
            "DataFormatId": "1023",
            "DataFormatVersion": "1",
            "FormData": "<Skjema>...</Skjema>"
        }],
        "attachments" : [{
            "FileName": "string example 43",
            "AttachmentType": "Funksjonellvedleggstype",
            "Data": "base64 encoded"
        }]
    }
}
```

### POST for å opprette preutfylt skjema
Det er også mulig å sende tom payload for å opprette et tomt skjema med preutfylling.
Da vil skjema bli opprette med data satt av tjenesteeier. Skjemaet vil få status "Utfylling", og kan så fylles ut ferdig i Altinn portal
eller fullføres med ny PUT operasjon. Den samme operasjonen kan gjenbrukes på underskjema.

Header
```HTTP
POST https://www.altinn.no/api/{who}/messages?complete=false HTTP/1.1 
Content-Type: application/hal+json
ApiKey: myKey
```

Body 
```JSON
{
    "Type": "FormTask",
    "ServiceCode": "123",
    "ServiceEdition": 64,
        "_embedded" : {
    }
}
``` 

### POST for å legge til underskjema til en aktiv skjema-instans
For innsendingstjenester som har er definert med hovedskjema og underskjema kan man legge til underskjema etter at instansen er opprettet.
Id-en til skjemaet returneres i location response header.

Header
```HTTP
POST https://www.altinn.no/api/{who}/messages/{messageid}/forms HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
```

Body 
```JSON
{
    "Type": "SubForm",
    "DataFormatId": "string example 36",
    "DataFormatVersion": "string example 38",
    "FormData": "<Skjema xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"...>...</Skjema>"
}
        
```

### POST for innsending av skjema til signering
Det er også mulig å sende inn skjema til signering i Altinn.
Da vil skjema få status "Signering". Skjema kan så signeres i Altinn portal eller fullføres med ny PUT operasjon på meldingen.
At skjemaet skal få status 'Signering' angis ved å inkludere URL-parameter Sign=false. Adressen til skjemaet i arbeidslisten
returneres i Location respons header.

Header
```HTTP
POST https://www.altinn.no/api/{who}/messages?sign=false HTTP/1.1
 
Content-Type: application/hal+json
ApiKey: myKey
```

Body 
```JSON
{
    "Type": "FormTask",
    "ServiceCode": "123",
    "ServiceEdition": 64,
    "_embedded" : {
        "forms" : [{
            "Type": "MainForm",
            "DataFormatId": "1023",
            "DataFormatVersion": "1",
            "FormData": "<Skjema>...</Skjema>"
        }],
        "attachments" : [{
            "FileName": "string example 43",
            "AttachmentType": "FunksjonellVedleggsType",
            "Data": "base64 encoded"
        }]
    }
}
```
