---
title: Innsynstjenester
description: Oppslag i datakilder som ligger utenfor Altinn
weight: 10
---

### Hente data ved hjelp av innsynstjeneste i Altinn
URI-en bygges opp ved hjelp av avgiver og tjenestekode/tjenesteutgavekode som unikt identifiserer en spesifikk tjeneste i Altinn.
Siden man i teorien kan få ut mange datatyper på mange formater, er responsen definert som streng.

I praksis er det mulig å angi om man ønsker xml eller json  i queryOptions, men det er opp til eier av tjenesten å definere mulighetsrommet 
siden responsen genereres av kode som tjenestens eier installerer i Altinn.

```HTTP
GET https://www.altinn.no/api/{who]/lookup/{servicecode}/{serviceeditioncode}?queryOptions={options}
ApiKey: myKey
```

Eksempelrespons:
```STRING
"<xml></xml>"
```
