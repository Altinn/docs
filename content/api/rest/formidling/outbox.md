---
title: Sende filer
description: Operasjoner for å instansiere og sende filer via formidlingstjeneste, i tillegg til å sjekke status på filer
toc: true
weight: 1
---

{{% expiring-notice 2021-12-21 %}}
Formidlingstjenesten på REST kommer i [21.12-releasen](/docs/ny-funksjonalitet/prodsetting/) av Altinn
{{% /expiring-notice %}}

## Generell beskrivelse
Outbox består av tre operasjoner. 
En operasjon for instansiering av formidlingstjeneste og opplasting av fil.
I tilleg er det to for å hente ut fil-metadata for en fil-referanse, og å hente ut receipt for en fil-referanse.

## POST for å instansiere formidlingstjeneste og laste opp fil
Instansiering av formidlingstjeneste og opplasting av fil skjer i et POST kall, hvor body content er en binary stream og hvor instansierings metadata er gitt som en json string i parameter.

### BrokerServiceDescription
Første del av kall som instansierer formidlingstjeneste er BrokerServiceDescription, som beskriver formidlingstjenesten som instansieres, med innhold av fil som skal overføres og hvem som skal være mottakere.
Dette angis som en json string i parameter "BrokerServiceDescription".

### Fil
Andre del av kall er selve fila som skal overføres. Denne avgis som en binary stream. 
Filnavn angis is FileName parameter. Dersom filnavn ikke angis vil et filnavn automatisk genereres.

Header
```HTTP
POST https://www.altinn.no/api/{who}/brokerservice/outbox?fileName=input.zip&brokerServiceDescription={%22ServiceCode%22:%20%225678%22,%22ServiceEditionCode%22:%201,%22SendersReference%22:%20%22somereference%22,%22Recipients%22:%20[%2215036202391%22,%22974760673%22],%22Properties%22:%20{%22somethingservicespecific%22:%20%22somevalue%22,%22somethingelseservicespecific%22:%20%22someothervalue%22},%22FileList%22:%20[{%22FileName%22:%20%22somefile.doc%22,%22CheckSum%22:%20%2234fd23abc%22},{%22FileName%22:%20%22someotherfile.doc%22,%22CheckSum%22:%20%22somearbitrarychecksum%22}]} HTTP/1.1 
accept: application/json
ApiKey: myKey
Content-Type: application/zip
```

BrokerServiceDescription eksempel

```JSON
{
  "ServiceCode": "5678",
  "ServiceEditionCode": 1,
  "SendersReference": "somereference",
  "Recipients": [
    "15036202391",
    "974760673"
  ],
  "Properties": {
    "somethingservicespecific": "somevalue",
    "somethingelseservicespecific": "someothervalue"
  },
  "FileList": [
    {
      "FileName": "somefile.doc",
      "CheckSum": "34fd23abc"
    },
    {
      "FileName": "someotherfile.doc",
      "CheckSum": "somearbitrarychecksum"
    }
  ]
}
```

## GET for uthenting av fil metadata
Henter ut fil metadata.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/outbox/35abb71c-7243-46aa-9e6b-f1c986b9efaa HTTP/1.1 
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

## Get for uthenting av fil receipt
Henter ut avsenders receipt, med under-receipts for hver fil-mottaker som avgir status på om mottaker har lastet ned fil.

Header
```HTTP
GET https://www.altinn.no/api/{who}/brokerservice/outbox/35abb71c-7243-46aa-9e6b-f1c986b9efaa/receipt HTTP/1.1 
accept: application/json
ApiKey: myKey
```

Response body
```JSON
{
  "ReceiptID": 1234,
  "ParentReceiptID": 0,
  "LastChanged": "2021-02-01T12:03:07.977",
  "Status": "OK",
  "Text": "Upload of file somefile.docx was successful. Recipients can now download the file.",
  "SendersReference": "somesendersreference",
  "OwnerPartyReference": "15036202391",
  "PartyReference": "15036202391",
  "SubReceipts": [
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
  ]
}
```
