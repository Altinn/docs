---
title: Signere
description: Signering utføres med PUT operasjoner på Message elementet i Altinn API. Skjema med vedlegg kan signeres samlet og det er mulig å signere enkelte skjema/vedlegg enkeltvis.
toc: true
weight: 10
---

## PUT for signering av skjema med status signering

Følgende request signerer det aktuelle skjemaet og skjemaet blir lagret i Arkivet i brukerens meldingsboks.
Adressen til det signerte og arkiverte skjemaet vil returneres i Location respons header.
 
Header
```HTTP
PUT https://www.altinn.no/api/{who}/messages/{messageid}?complete=true&sign=true HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
```

Body
```JSON
{
    "Type": "FormTask",
    "ServiceCode": "1029",
    "ServiceEdition": 64
}
```

## PUT for signering av skjema i skjemasett og enkelte vedlegg
Det er også mulig å kun signere enkelte skjema i et skjemasett og kun enkelte av vedleggene.
Parameteren signinglocked angir om skjemaet/vedlegget må signeres.

Dersom `signinglocked=true` må det aktuelle skjemaet/vedlegget signeres, `signinglocked=false` angir at signering er valgfritt.
Hvilke skjema og vedlegg som skal signeres angis i `SignatureSpec`. Id for aktuelt skjema og Attachments må hentes fra message-ressursen
før signering og angis i PUT operasjonen.

Header
```HTTP
PUT https://www.altinn.no/api/{who}/messages/{messageid}?complete=true&sign=true HTTP/1.1
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
       "SignatureSpec": {
         "FormIds": [12121,1232],
         "AttachmentIds": [1123,1123]
       }
    }
}
```

## GET for å hente signeringstekst
Signeringsteksten spesifisert for signerinssteget skal presenters for brukeren før signering.
Teksten kan lastes ned ved å følge lenken `signingtest` 

Header
```HTTP
GET https://www.altinn.no/api/{who}/messages/{messageid}/signingtext HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```
