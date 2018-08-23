---
title: Arkivere 
description: Operasjoner for å arkivere meldinger
weight: 10
---

## Arkivering utføres med ARCHIVE på message
Følgende request arkiverer den aktuelle meldingen eller skjema. 
Når arkiveringen er utført returneres `HTTP 204 - No Content` med en Location-header som peker til den nye arkiv-addressen til meldingen.

Arkivering av meldinger av correspondence som krever brekreftelse er ikke mulig.

```HTTP
PUT https://www.altinn.no/api/{who}/messages/{messageid}/archive HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
```

Responsen indikerer at arkiveringen er utført og den nye arkiv-addressen til meldingen:

```HTTP/1.1 204 Message has been archived
Date: Mon, 04 Jun 2018 12:28:53 GMT
Location: https://www.altinn.no/api/{who}/messages/{archivedMessageid}
```
