---
title: Delegere API-tilganger til en leverandør
linktitle: Delegere API-tilganger
description: Beskrivelse av hvordan tjenesteier kan delegere API-tilganger (scopes) til en underleverandør.
toc: true
---

Enkelte tjenesteeiere ønsker at en underleverandør skal kunne agere på vegne av dem, f.eks. leverandører av fagsystemer.
For å få til det, så må disse API-tilgangene delegeres til leverandøren ved bruk av Altinn.

Det er tjenesteeiers ansvar å selv fjerne delegeringene om behovet for tilgang hos leverandør forsvinner.

## Delegering av API-tilganger til leverandør

Som en bruker som er nøkkelrolleinnehaver for tjenesteeier (typisk daglig leder aka DAGL), åpne "Andre med rettigheter til virksomheten".

![Andre med rettigheter](andre-med-rettigheter.png "Andre med rettigheter til virksomheten")

![Legg til leverandør](legg-til-org.png "Legg til leverandørens organisasjon")

Så må de nødvendige rettighetene gis.

- **Altinn tjenesteeier-API: Appinstanser (full tilgang)** - gir tilgang til [scopes](#scopes) for både read og write.
- **Altinn tjenesteeier-API: Appinstanser (lesetilgang)** - gir kun tilgang til read.

![Gi rettigheter til leverandør](gi-rettigheter.png "Gi de nødvendige rettighetene til leverandør")

![Bekreft](bekreft-gi-rettigheter.png "Bekreft")

## Fjerning av delegering

Delegeringer som er gjort kan også fjernes.
Om en leverandør ikke lenger har behov for API-tilganger så er det tjenesteeier sitt ansvar å fjerne disse.

![Fjern rettigheter](fjern-en-eller-flere-rettigheter.png "Trykk på \"Fjern en eller flere rettigheter\"")

![Velg rettigheter å fjerne](fjern-rettigheter.png "Velg rettigheter å fjerne")

![Angre fjern rettigheter](angre-fjern-rettigheter.png "Det er mulig å angre fjerning av rettigheter")

![Fjerning av rettigheter bekreftet](fjerning-bekreftet.png "Bekreftelse på at rettigheter er fjernet")

## Scopes

Delegering gir tilgang til disse scopene for leverandør:

```js
altinn:serviceowner/instances.read
altinn:serviceowner/instances.write
```
