---
title: Hente filer
description: Operasjoner for å sjekke formidlingstjeneste inbox og laste ned filer
toc: true
weight: 2

---

{{% expiring-notice 2021-12-21 %}}
Formidlingstjenesten på REST kommer i [21.12-releasen](/docs/ny-funksjonalitet/prodsetting/) av Altinn
{{% /expiring-notice %}}


## Generell beskrivelse
Det finnes 6 operasjoner for formidlingstjeneste inbox. 
Disse består av å sjekke om filer er tilgjengelige, hente informasjon om tilgjengelige filer, hente metadata og receipt for spesifikk fil, laste ned fil og å manuellt confirme at fil er blitt mottatt.


## GET for å sjekke om spesifikke mottakere har filer tilgjengelige
Denne operasjonen er en enkel operasjon for mottakere som ofter poller på om filer er tilgjengelige. Den har ingen autentisering eller autorisering utenom ApiKey sjekk.
Den gir en enkel response; true dersom en eller flere angitte mottakere har filer tilgjengelige, false dersom ingen har filer tilgjengelige.
"Recipients" feltet er enten en enkel mottaker eller flere mottakere i en komma-separert liste.

Header
```HTTP
GET https://tt02.altinn.no/api/brokerservice/inbox/hasavailablefiles?serviceCode=myservicecode&serviceEditionCode=myserviceedition&recipients=mottaker1,mottaker2,mottaker3 HTTP/1.1 
accept: application/json
ApiKey: myKey
```

## GET for å hente inbox for en bruker
Denne operasjonen henter metadata for alle filer i brukerens inbox for angitte filtre.
FileStatus for operasjonen kan være Uploaded eller Downloaded. Default verdi er Uploaded.

Header
```HTTP
GET https://tt02.altinn.no/api/{who}/brokerservice/inbox/?fileStatus=Uploaded&serviceCode=myservicecode&serviceEditionCode=myserviceedition&minSentDateTime=2021-01-01&maxSentDateTime=2021-12-01  HTTP/1.1 
accept: application/json
ApiKey: myKey
```
Response body
```JSON
[
{
  "ServiceCode": "5123",
  "ServiceEdtionCode": 1,
  "FileName": "somefile.zip",
  "FileReference": "35abb71c-7243-46aa-9e6b-f1c986b9efaa",
  "FileSize": 7232,
  "FileStatus": "Uploaded",
  "ReceiptID": 12345,
  "Sender": "15036202391",
  "SendersReference": "somereference",
  "SentDate": "2021-02-10T09:30Z"
},
  {
    "ServiceCode": "5123",
    "ServiceEdtionCode": 1,
    "FileName": "someotherfile.zip",
    "FileReference": "b71c7243-35ab-aa32-16ab-9eff1c986baa",
    "FileSize": 45678,
    "FileStatus": "Uploaded",
    "ReceiptID": 12346,
    "Sender": "15036202392",
    "SendersReference": "someotherreference",
    "SentDate": "2022-02-10T09:30Z"
  }
]
```

## GET for å hente metadata for en spesifikk fil
Denne operasjonen henter ut metadata for en angitt fil-referanse.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/35abb71c-7243-46aa-9e6b-f1c986b9efaa HTTP/1.1 
accept: application/json
ApiKey: myKey
```

Response body
```JSON
{
  "ServiceCode": "5123",
  "ServiceEdtionCode": 1,
  "FileName": "somefile.zip",
  "FileReference": "35abb71c-7243-46aa-9e6b-f1c986b9efaa",
  "FileSize": 7232,
  "FileStatus": "Uploaded",
  "ReceiptID": 12345,
  "Sender": "15036202391",
  "SendersReference": "somereference",
  "SentDate": "2021-02-10T09:30Z"
}
```

## GET for uthenting av fil receipt
Henter ut mottakers receipt. Vil kun vise receipt som tilhører mottaker.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/35abb71c-7243-46aa-9e6b-f1c986b9efaa/receipt HTTP/1.1 
accept: application/json
ApiKey: myKey
```

Response body
```JSON
{
    "ReceiptID": 2345,
    "ParentReceiptID": 1234,
    "LastChanged": "2021-02-01T14:05:03.342",
    "Status": "OK",
    "Text": "File has been downloaded by the recipient.",
    "SendersReference": "somesendersreference",
    "PartyReference": "15036202391",
    "ReceiptHistory": "Feb  1 2021 12:03AM - OK - A file has been made available for download."
}
```

## GET for å laste ned fil
Laster ned en angitt fil.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/35abb71c-7243-46aa-9e6b-f1c986b9efaa/download HTTP/1.1 
accept: application/json
ApiKey: myKey
```

## POST for å manuelt confirme at en fil er lastet ned og mottatt
Setter status for mottaker til "Downloaded", og oppdaterer receipt. Response for dette kallet er mottakers Receipt.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/inbox/35abb71c-7243-46aa-9e6b-f1c986b9efaa/confirmdownloaded HTTP/1.1 
accept: application/json
ApiKey: myKey
```

Response body
```JSON
{
    "ReceiptID": 2345,
    "ParentReceiptID": 1234,
    "LastChanged": "2021-02-01T14:05:03.342",
    "Status": "OK",
    "Text": "File has been downloaded by the recipient.",
    "SendersReference": "somesendersreference",
    "PartyReference": "15036202391",
    "ReceiptHistory": "Feb  1 2021 12:03AM - OK - A file has been made available for download."
}
```
