---
draft: false
title: Sende inn
description:
menu:
  main:
    identifier: api-send-in
    name: Sende inn
    parent: api-messages

weight: 10
---

## Sende

### Gjøre POST operasjoner på Message elementet i Altinn API
Man kan sende inn skjema med vedlegg. Skjema er i API-et Message av type `FormTask`. 


#### Generelt om Skjema Innsendingstjenester i Altinn
I Altinn er bygget inn mye funksjonalitet får å tilby brukere skjema med ulike behov og krav.
Det meste av denne funksjonaliteten er foreløpig ikke bygget inn i REST API-et, men det tilbys en enkel og synkron prosess for innsending,
inkludert alle type valideringer som gjelder pr skjema. Den synkrone prosessen avsluttes med en respons at skjema er lagret i arkiv,
og med en lenke til denne nye ressursen.

I Altinn kan tjenesteeier selv angi hvilke innsendingskanaler som er gyldige.
REST API må derfor angis av tjenesteeier som en gyldig kanal.Metadata ressursen som lister alle produksjonsatte tjenester i Altinn
vil indikere om aktuell tjeneste er tilgjengelig for innsending fra REST API.

Skjema i Altinn er bygget på en XSD datamodell (http://en.wikipedia.org/wiki/XSD), som igjen er knyttet til en overordnet semantisk modell.
Denne XSD angir de tekniske valideringene for et skjema. Andre typer valideringsregler (kalkyler, forretningsregler) kan angis som en del
av utviklingen av skjema. XSD for aktuell tjeneste kan lastes ned fra [metadata ressursen](/docs/api/metadata).

Skjema må sees på som en payload "Blob" representert i XML, og må representeres som XML også i JSON, se eksempel under.


#### POST operasjon for innsending av skjema til arkiv
Følgende request sender inn skjema med vedlegg til Arkivet i brukerens meldingsboks.
Adressen til det arkiverte skjemaet vil returneres i Location respons header.

Header
```HTTP
POST https://www.altinn.no/api/my/messages HTTP/1.1
Host: www.altinn.no
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
POST https://www.altinn.no/api/my/messages?complete=false HTTP/1.1
Host: www.altinn.no
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
eller fullføres med ny PUT operasjon. 

Header
```HTTP
POST https://www.altinn.no/api/my/messages?complete=false HTTP/1.1
Host: www.altinn.no
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

#### POST operasjon for innsending av skjema til signering
Det er også mulig å sende inn skjema til signering i Altinn.
Da vil skjema få status "Signering". Skjema kan så signeres i Altinn portal eller fullføres med ny PUT operasjon på meldingen.
At skjemaet skal få status 'Signering' angis ved å inkludere URL-parameter Sign=false. Adressen til skjemaet i arbeidslisten
returneres i Location respons header.

Header
```HTTP
POST https://www.altinn.no/api/my/messages?sign=false HTTP/1.1
Host: www.altinn.no
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
PUT https://www.altinn.no/api/my/messages/a1234 HTTP/1.1
Host: www.altinn.no
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
