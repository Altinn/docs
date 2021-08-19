---
title: Aktørtyper
description: Hvordan sørge for at kun bestemte typer aktører kan bruke en app.
toc: true
weight: 150
---

## Avgrense tilgang i Altinn Studio designer

I Altinn Studio designer finner du mulighet for å styre hvilke aktørtyper som har tilgang til en app i kategorien "Lage" i toppmenyen, på siden "Tilgangsstyring" representert ved låshull-ikonet.
På denne siden krysser du av for de aktørtypene en app er tilgjengelig for. Hvis ingen (eller alle) aktørtyper er valgt, vil alle ha tilgang. Valget "Virksomhet" benyttes for tilfeller der det skal rapporteres på hovedenhet.

Skjermdumpen under viser innstillingene for at alle organisasjonsnummer (både hovedenheter og underenheter) skal kunne bruke appen.

![GUI for å styre tilgang på aktørtyper](partytypeselector.png "GUI for å styre tilgang på aktørtyper")

## Justere i applicationmetadata.json

Hvis du foretrekker å jobbe i kode, finner du muligheten til å justere hvilke aktørtyper som kan benytte en app i `applicationmetadata.json` som ligger i mappa `App/config` i app-repositoryet. 
Eksempelet under viser samme innstillinger som skjermdumpen.

```json
  "partyTypesAllowed": {
    "bankruptcyEstate": false,
    "organisation": true,
    "person": false,
    "subUnit": true
  },
```
