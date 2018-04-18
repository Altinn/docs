---
title: Arkivere 
description: Operasjoner for å arkivere meldinger
weight: 10
---

## Arkivering utføres med ARCHIVE på message
Følgende request arkiverer den aktuelle meldingen eller skjema. 
Når arkiveringen er utført returneres `HTTP 204 - No Content`.

Arkivering av meldinger av correspondence som krever brekreftelse er ikke mulig.

```HTTP
PUT https://www.altinn.no/api/{who}/messages/{messageid}/archive HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
```


