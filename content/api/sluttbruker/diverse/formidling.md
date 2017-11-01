---
title: Formidling
description: Altinns REST-funksjonalitet for formidlingstjenester
weight: 30
tags: [TODO]
---

Per nå er det bare uthenting av filer lastet opp på formidlingstjenesten som er tilgjengelig via  API.

En mer utfyllende beskrivelse av formidlingstjenesten i Altinn kommer etter hvert under [Guider](/docs/guides/).

## Laste ned filer fra formidlingstjeneste

```HTTP
GET https://www.altinn.no/api/{who]/brokerservice/files/{filereference}
ApiKey: myKey
Accept: application/hal+json
```