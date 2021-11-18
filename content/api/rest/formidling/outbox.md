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
Instansiering av formidlingstjeneste og opplasting av fil skjer i et POST kall med 2 elementer i multipart/form-data

### BrokerServiceDescription
Første del av kall som instansierer formidlingstjeneste er BrokerServiceDescription, navngitt i kall som "Description". 
Dette er et objekt som beskriver formidlingstjenesten som instansieres, med innhold av fil som skal overføres og hvem som skal være mottakere.

### ZipArchive
Andre del av kall er selve fila som skal overføres. Denne navngis som "ZipArchive". Filnavn angis enten i Content-Disposition Filenamestar eller Filename.
Dersom filnavn ikke angis vil et filnavn automatisk genereres.

Header
```HTTP
POST https://www.altinn.no/api/{who}/brokerservice/outbox HTTP/1.1 
accept: application/json
ApiKey: myKey
Content-Type: multipart/form-data; boundary=--------------------------677448895403412669907084
```

Body

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
    "somethingservicespecific": "somevalue"
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

HTTP Body eksempel
```HTTP
----------------------------677448895403412669907084
Content-Disposition: form-data; name="Description"
{"ServiceCode":"6795","ServiceEditionCode":189764,"Recipients":["01025170020","01025180093", "01014922047"],"SendersReference":"test123","Properties":null,"FileList":null}
----------------------------677448895403412669907084
Content-Disposition: form-data; name="ZipArchive"; filename="zipfilename.zip"
<zipfilename.zip>
----------------------------677448895403412669907084--
```

<!-- cUrl eksempel: curl -X "POST" "http://localhost:85/api/910476882/brokerservice/outbox/" -H "accept: application/json" -H "Content-Type: multipart/form-data" -H "Cookie: .ASPXAUTH=5576628BCE9CCAEB93654B3A2E0C20D9BBD775044DBE3A06637C71D1B642D322D851E8EB2CE7DD9D839486E260E76C3A001B21C54AFB78C7D4ED0A1FED915EEC1DDACB5AEF3E140670E292AAD4DD9C71F8FD776F7D70677573AC3CFAE286C32A8D650495B145B5C468E2A145FA2EBB260096A847787129E4DD4A84A1F3FF92D7CFB49143BA5CA7F9DA8ACA9B3D267D3799CE1D7831A1F290B47B7E234EE8ED65DAF83356192931F67B936EB78A14A3E5E23795E83C45FC8943C05BAF2C5099D1CD56EF907FF02680FE7F5FDC3E1DA525ED891BCD55AE1AAA2569C1E476EF763B1918AA0D95A870C29906CB041E5A35609C1400F3" -H "ApiKey: 130AC941-063E-4005-A114-CB4C0371DB80" -F "Description={'ServiceCode':'6795','ServiceEditionCode':189764,'Recipients':['01025170020','01025180093', '01014922047'],'SendersReference':'test123','Properties':null,'FileList':null}" -F "ZipArchive=@C:\Temp\myzupfile.zip" -->

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