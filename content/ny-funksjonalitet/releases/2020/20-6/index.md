---
title: 20.6
description: Altinn 3 innføres, mindre endringer og feilrettinger
weight: 80
type: releasenote
releasenote_info: Release 20.6, produksjonssettes 08. juni 2020
--- 
**Dette er en kommende endring. Gjeldende endring ligger [her](../20-5)**

## Altinn 3 innføres

### Altinn 3

Med denne releasen innføres Altinn 3 som er en større endring. Det står informasjon om endringen [her](../../../roadmap/2020/#altinn-3).

Se også:
- [informasjon om hva som er mulig i MVP](https://altinndigital.no/altinn-studio/#possibilities)
- [beksrivelse av hvordan man tar i bruk Altinn Studio som utviklingsverktøy](../../../../altinn-studio/first-time-setup) 
- [beksrivelse av hvordan man får tilgang til å produksjonssette en app](../../../../altinn-studio/deploy-maintain).

## Endringer i REST-API

### Opprinnelig referansen til elementet er nå tilgjengelig for arkiverte elementer i REST

Tidligere inneholdt ikke arkiverte elementer opprinnelig referanse. Dette gjorde at det ikke var noen
referansekobling mellom det arkiverte elementet og det aktive. Derfor er nå feltet "OriginalId" innført på arkiverte element slik at man nå har en kobling.

## Feilrettinger

### Ved avvisning av samtykkeforespørsler manglet URL informasjon om hvilket samtykke avvisningen gjaldt

Dette er nå rettet opp slik at man får URL informasjon.

