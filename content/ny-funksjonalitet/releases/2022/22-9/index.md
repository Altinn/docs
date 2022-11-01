---
title: 22.9
description: Mindre forbedringer og feilrettinger
weight: 120
type: releasenote
releasenote_info: Release 22.9. Produksjonssatt 19. september
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Ny backend løsning for henting av “Andre med rettigheter” i profilsiden

I Release 22.6 ble det laget ny logikk og database kall for uthenting av mottakere av roller og rettigheter for en avgiver, som brukes av REST APIet for endepunktet:
/api/{who}/authorization/delegations/

For å slippe vedlikehold av flere implementasjoner og dra nytte av ytelsesforbedringene gjort for REST APIet, samkjøres nå “Andre med rettigheter” fra profilsiden til å bruke samme uthentingen.

### Revisor eller regnskapsfører vises ikke under “Andre med rettigheter” for innehaver av enkeltpersonforetak

En revisor eller regnskapsfører for enkeltpersonforetak får også tilsvarende rettigheter for innehaver av enkeltpersonforetaket. Dette har før ikke vært synlig under “Andre med rettigheter” panelet på innehavers profilside, men er nå utbedret.

## Endringer i Autorisasjon

### Delegering av enkelttilganger til Altinn Apps tilgjengeliggjøres i produksjonsmiljøet

I Release 22.6 ble løsning for delegering av Altinn Apps levert.
Over sommeren har løsningen vært tilgjengelig for test i TT02-miljøet til Altinn og blir nå også aktivert for produksjonsmiljøet.

## Endringer i REST

### Manglende virksomhetsbrukere i Delegations API

I Release 22.6 ble det laget ny logikk og database kall for uthenting av mottakere av roller og rettigheter for en avgiver, som brukes av REST APIet for endepunktet:
/api/{who}/authorization/delegations/

Det er blitt identifisert og utbedret en feil i database logikken som gjør at virksomheter med flere virksomhetsbrukere bare fikk en av brukerne returnert.

## Endringer i SBL Bridge API

### Åpne opp for Get DelegationRequests i SBL-bridge api

Utvidet SBL-bridge API med GET-operasjon på nytt endepunkt /sblbridge/authorization/api/delegationrequests.

### Åpne opp for Delete DelegationRequests i SBL-bridge api

Utvidet SBL-bridte API med DELETE-operasjon på endepunktet /sblbridge/authorization/api/delegationrequests.

### Tilby data endepunkter for klientdelegering i SBL Bridge API

Brukergrensesnitt for klientdelegering skal flyttes til Altinn 3 infrastruktur I den sammenheng vil backend API for klientdelegering i Altinn 3 i en overgangsfase ha behov for å hente data for klientdelegeringer fra Altinn 2 via SBL Bridge API, før dette også kan tilbys i ny infrastruktur.

I første omgang leveres API operasjoner for å kunne hente ansatte og klienter for en gitt revisor eller regnskapsfører. Disse vil kreve bruker autentisering via ett Altinn 3 token og vil autorisere at brukeren har tilgang til klientdelegering på vegne av avgiver.

## Feilrettinger

### EC bruker uten tilgangsstyring får ikke slettet egen BoT forespørsel

Rettet feil som gjorde at en EC-bruker uten tilgangsstyring ikke kunne slette «be om tilgang» forespørsel brukeren selv hadde opprettet.



