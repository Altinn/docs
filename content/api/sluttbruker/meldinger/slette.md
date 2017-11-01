---
title: Slette 
description: Operasjoner for å slette meldinger, underskjema og vedlegg
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



