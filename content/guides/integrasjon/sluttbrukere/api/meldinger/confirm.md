---
title: Bekrefte 
description: Operasjoner for å bekrefte mottak av meldinger
weight: 10
---

## Bekreftelse utføres med CONFIRM på message
Følgende request bekrefter at den aktuelle meldingen er motatt. 
Når bekreftelsen er utført returneres `HTTP 204 - No Content`.

Bekreftelse er kun mulig for correspondence som krever brekreftelse.

```HTTP
PUT https://www.altinn.no/api/{who}/messages/{messageid}/confirm HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey
```


