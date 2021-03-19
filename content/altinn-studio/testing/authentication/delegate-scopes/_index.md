---
title: Delegere API-tilganger til en leverandør
linktitle: Delegere API-tilganger
description: Beskrivelse av hvordan tjenesteier kan delegere API-tilganger (scopes) til en underleverandør.
toc: true
---

Enkelte tjenesteeiere ønsker at en underleverandør skal kunne agere på vegne av dem, f.eks. leverandører av fagsystemer.
For å få til det, så må disse tilgangene delegeres til leverandøren ved bruk av Altinn.

MERK: Dette skal nå være mulig å teste i TT02, men er enda **ikke** åpnet for i prod.

## Delegering av API-tilganger til leverandør

Som en bruker som er nøkkelrolleinnehaver for tjenesteeier (typisk daglig leder aka DAGL), åpne "Andre med rettigheter til virksomheten".

![Andre med rettigheter](andre-med-rettigheter.png "Andre med rettigheter til virksomheten")

![Legg til leverandør](legg-til-org.png "Legg til leverandørens organisasjon")

Så må de nødvendige rettighetene gis.

- **Altinn tjenesteeier-API: Appinstanser (full tilgang)** - gir tilgang til [scopes](#scopes) for både read og write.
- **Altinn tjenesteeier-API: Appinstanser (lesetilgang)** - gir kun tilgang til read.

![Gi rettigheter til leverandør](gi-rettigheter.png "Gi de nødvendige rettighetene til leverandør")

![Bekreft](bekreft-gi-rettigheter.png "Bekreft")

## Scopes

Når oppskriften over er gjennomført, så vil leverandøren ha fått tilgang til disse scopene.

```js
altinn:serviceowner/instances.read
altinn:serviceowner/instances.write
```
