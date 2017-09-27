---
title: Sende inn
description: Operasjoner for å sende inn meldinger
weight: 10
---

## Sende skjema til Altinn

### Gjøre POST operasjoner på Message elementet i Altinn API
Man kan sende inn skjema med vedlegg. Skjema er i API-et Message av type `FormTask`. 


#### Generelt om innsendingstjenester i Altinn
I Altinn er bygget inn mye funksjonalitet får å tilby brukere skjema med ulike behov og krav. 
Ved bruk av REST-apiet kan man opprette en skjemainstans for å få en messageid, og deretter legge til, endre eller slette underskjema og vedlegg som man ønsker.


I Altinn kan tjenesteeier selv angi hvilke innsendingskanaler som er gyldige.
REST API må derfor angis av tjenesteeier som en gyldig kanal.Metadata ressursen som lister alle produksjonsatte tjenester i Altinn
vil indikere om aktuell tjeneste er tilgjengelig for innsending fra REST API.

Skjema i Altinn er bygget på en XSD datamodell (http://en.wikipedia.org/wiki/XSD), som igjen er knyttet til en overordnet semantisk modell.
Denne XSD angir de tekniske valideringene for et skjema. Andre typer valideringsregler (kalkyler, forretningsregler) kan angis som en del
av utviklingen av skjema. XSD for aktuell tjeneste kan lastes ned fra [metadata ressursen](../../diverse/metadata).

Skjema må sees på som en payload "Blob" representert i XML, og må representeres som XML også i JSON, se eksempel under.


#### POST operasjon for innsending av skjema til arkiv
Følgende request sender inn skjema med vedlegg til Arkivet i brukerens meldingsboks.
Adressen til det arkiverte skjemaet vil returneres i Location respons header.

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
                "AttachmentType": "string example 43",
                "Data": "base64 encoded"
            }
        ]
    }
}
```

#### POST operasjon for innsending av skjema til arbeidslisten (mellomlagring)
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
            "AttachmentType": "string example 43",
            "Data": "base64 encoded"
        }]
    }
}
```

#### POST operasjon for å opprette preutfylt skjema
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

#### POST-operasjon for å legge til underskjema til en aktiv skjema-instans
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

#### PUT-operasjon for å endre et eksisterende underskjema 
For innsendingstjenester som har er definert med hovedskjema og underskjema kan man legge til underskjema etter at instansen er opprettet.
Id-en til skjemaet returneres i location response header.

Header
```HTTP
PUT https://www.altinn.no/api/my/messages/{messageid}/forms/{formid} HTTP/1.1
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


#### POST operasjon for innsending av skjema til signering
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
            "AttachmentType": "string example 43",
            "Data": "base64 encoded"
        }]
    }
}
```
 

## Oppdatere

### Gjøre PUT operasjoner på Message element i Altinn API.
Det er mulig å oppdatere skjema med vedlegg som ligger i arbeidslisten til brukeren.  

Oppdatering utføres ved å gjøre PUT operasjoner på den enkelte message som skal oppdateres.
Alle skjema og vedlegg må inkluderes i hver oppdatering, da tidligere data på message vil overskrives.

Følgende URL parametere styrer hva som utføres på skjemaet etter oppdatering:

 - `complete = [true|false]`
 - `sign = [true|false]`

Defaultverdi for complete og sign er `true`, så om ingen av parameterne er satt til `false` vil skjemaet signeres og arkiveres etter oppdatering.
`complete=false` vil sette status "Utfylling"  etter oppdatering, mens `sign=false` sender skjema til signering etter oppdatering.

Header
```HTTP
PUT https://www.altinn.no/api/{who}/messages/{messageid} HTTP/1.1 
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
            "AttachmentType": "string example 43",
            "Data": "base64 encoded"
        }]
    }
}
```

### Vedleggstyper
Hva slags vedlegg man kan legge til en tjeneste kan være begrenset av regler definert på tjenesten i Altinn.
Disse finner man ved å bruke [metadata-ressursen i api-et](../../diverse/metadata/).

### Legge til vedlegg
For å legge til mindre vedlegg til en aktiv skjemainstans kan man poste base64-encodet data direkte mot attachments. 
Vedleggs-id returneres i location header på responsen.

Header
```HTTP
POST https://www.altinn.no/api/{who}/messages/{messageid}/attachments/?language={languageid} HTTP/1.1 
Content-Type: application/hal+json
ApiKey: myKey
```

Body 
```JSON
{
    "FileName": "string example 43",
    "AttachmentType": "string example 43",
    "Data": "base64 encoded payload"
}
```
### Legge til vedlegg med streaming
For å legge til større vedlegg til en aktiv skjemainstans kan man bruke en streamingvariant mot attachment der requestbody er en binær strøm.
Vedleggs-id returneres i location header på responsen.

Header
```HTTP
POST https://www.altinn.no/api/{who}/messages/{messageId}/attachments/streamedattachment?fileName={fileName}&attachmentType={attachmentType}&language={language} HTTP/1.1 
Content-Type: application/hal+json
ApiKey: myKey
```
