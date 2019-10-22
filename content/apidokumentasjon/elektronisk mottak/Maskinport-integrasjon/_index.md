---
title: Integrasjon direkte mot BR
description: Beskrivelser av API innen BRs elektroniske mottak av meldinger
weight: 100
---

## Innledning
BRs elektroniske mottak har et REST-grensesnitt som kan benyttes av eksterne parter for innsending av meldinger til Brønnøysundregistrene. 

API'et er utviklet i java og spring boot, men dette skal ikke legge føringer for klienter som tar api'et i bruk.

## Sikkerhetsmekanismer

Siden dette er begrensede API-er så skal kallende parter autentiseres gjennom [Maskinporten](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_guide_maskinporten.html).

Maskinporten utsteder JWT tokens, dette skal følge med forespørselen. Tjenestens scope er "brreg:mottak". Access tokenet oppgis i Authorization headeren.

Husk 'Bearer ' før tokenet. 

|Header        | Verdi                                                                              |
|--------------|------------------------------------------------------------------------------------|
|Authorization | Bearer eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFpMS0pzdzhmQkFJdUZi... (forkortet) |

