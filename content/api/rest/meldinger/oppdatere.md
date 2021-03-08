---
title: Oppdatere
description: Operasjoner for å oppdatere elementer i meldingsboksen.
toc: true
weight: 10
---

## PUT på message element
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

### PUT for å endre et eksisterende underskjema 
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

## Vedleggstyper
Hva slags vedlegg man kan legge til en tjeneste kan være begrenset av regler definert på tjenesten i Altinn.
Disse finner man ved å bruke [metadata-ressursen i api-et](../../metadata/#hente-metadata-om-tillatte-vedlegg-på-en-innsendingstjeneste).

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
Vedleggs-id returneres i location header på responsen. Det er viktig å merke seg at filnavn er et query parameter (fileName) og man må derfor sørge for at dette er URL-enkodet. 

Header
```HTTP
POST https://www.altinn.no/api/{who}/messages/{messageId}/attachments/streamedattachment?fileName={fileName}&attachmentType={attachmentType}&language={language} HTTP/1.1 
Content-Type: application/octet-stream
ApiKey: myKey
```
