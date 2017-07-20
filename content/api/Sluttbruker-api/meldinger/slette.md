---
title: Slette meldinger
description: API'er for å slette meldinger.
weight: 10
---


### Sletting utføres med DELETE operasjoner på Message elementet i Altinn  
Følgende request sletter den aktuelle meldingen eller skjema. 
Når slettingen er utført returneres `HTTP 204 - No Content`.

Sletting av meldinger av typen Ccorrespondence sendt til organisasjoner er ikke mulig, verken i api-ene eller portal.

```HTTP
DELETE https://www.altinn.no/api/my/messages/a2312332 HTTP/1.1
Host: www.altinn.no
Content-Type: application/hal+json
ApiKey: myKey
```