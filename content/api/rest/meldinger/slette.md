---
title: Slette 
description: Operasjoner for å slette meldinger, underskjema og vedlegg
toc: true
weight: 10
---

## Sletting utføres med DELETE på message
Følgende request sletter den aktuelle meldingen eller skjema. 
Når slettingen er utført returneres `HTTP 204 - No Content`.

Sletting av meldinger av typen correspondence sendt til organisasjoner er ikke mulig, verken i api-ene eller portal.

```HTTP
DELETE https://www.altinn.no/api/{who}/messages/{messageid} HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
```


## Slette vedlegg på en aktiv skjemainstans
Følgende request sletter det angitte vedlegget på en aktiv skjemainstans. 

```HTTP
DELETE https://www.altinn.no/api/{who}/messages/{messageid}/attachments/{attachmentid} HTTP/1.1 
Content-Type: application/hal+json
ApiKey: myKey
```

Når slettingen er utført returneres `HTTP 204 - No Content`.


## Slette et eksisterende underskjema 
Følgende request sletter det angitte underskjemaet på en aktiv skjemainstans. 

```HTTP
DELETE https://www.altinn.no/api/{who}/messages/{messageid}/forms/{formid} HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
```

Når slettingen er utført returneres `HTTP 204 - No Content`.


## Oversikt over slettede elementer
Meldingsboksen i Altinn har en søppelbøttefunksjon. De fleste elementer som slettes vil først legges i søppelbøtten. REST API har implementert en operasjon som gir oversikt over alle elementer i søppelbøtten. Det er derimot foreløpig ingen operasjon for å gjennopprette elementer.

```HTTP
GET https://www.altinn.no/api/{who}/messages/trashbin?language={language} HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
```

Ved korrekt autentisering vil du få følgende svar fra APIet:

```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/my/messages"
        },
        "find": {
            "href": "https://www.altinn.no/api/my/messages/{messageId}",
            "isTemplated": true
        }
    },
    "_embedded": {
        "messages": [
            {
                "MessageId": "a546789",
                "Subject": "Vedr. saksnr 201301840, journalnr 2013021622 ",
                "Status": "Slettet",
                "LastChangedDateTime": "2017-11-11T13:41:01.703",
                "LastChangedBy": "Kommunene",
                "ServiceOwner": "Kommunene",
                "Type": "Correspondence",
                "MessageSender": "Brønnøy Kommune",
                "ServiceCode": "2479",
                "ServiceEdition": 2,
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/my/messages/a385107"
                    },
                    "metadata": {
                        "href": "https://www.altinn.no/api/metadata/correspondence/2479/2"
                    }
                }
            }
        ]
    }
}
```

