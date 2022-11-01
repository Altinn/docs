---
title: "22.10"
description: Mindre forbedringer og feilrettinger
weight: 110
type: releasenote
releasenote_info: Release 22.10. Produksjonssatt 24. oktober
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Ny slettejobb for sletting av utdaterte elementer

1.Skjema og meldinger som bruker har slettet vil ligge synlig i slettede elementer i 2 år før de slettes permanent. 

2.Mottatte meldinger som er slettet eller arkivert vil bli liggende i serviceengine inntil 2 år før de slettes permanent. Sluttbrukersystemer kan hente disse meldingene så lenge de er lagret i serviceengine.

Denne slettejobben som sletter permanent settes i gang i release 22.10.  

## Endringer i SBL Bridge API

### Utvide SBL Bridge med endepunkt for å hente liste av parties

Utvide SBL Bridge med endepunkt for å hente liste av parties. SBL bridge måtte utvides med nytt endepunkt for å kunne hente en liste av party entiteter i en samlet spørring for å slippe veldig mange turer over internett for listevisninger i 3.0 Authorization som trenger å hente disse for å vise navn, party type osv

Ved å oppgi en liste med partyId-er til parties-endepunktet vil man nå få ut en liste over parties for de oppgitte partyid-ene.

## Feilrettinger

### Mottakere av roller og rettigheter vises ikke alfabetisk under “Andre med rettigheter”

I Release 22.9 ble det levert ny backend løsning for henting av “Andre med rettigheter” i profilsiden.

Det er nå utbedret en feil denne introduserte, som uheldigvis gjorde at mottakere av roller og rettigheter under “Andre med rettigheter” ikke lenger ble listet ut i alfabetisk rekkefølge.

### Feil i kontaktskjema og blokken “Trenger du hjelp”

Lenker til hjelpeskjema går nå til den engelske versjonen av skjemaet når man kommer fra en engelsk side

### Feil i artikkelgenerator - starte og drive (rapport under EpiServer)

Artikkelgeneratoren under admingrensesnittet er forbedret for å unngå feilmelding ved enkelte artikkeleksporter

### Behov for å kunne endre på teksten under «Står du fast» som finnes på hjelpesidene i Altinn.no

Teksten “Står du fast” kan nå redigeres i EPiServer under en egen fane på startsiden.

