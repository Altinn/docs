---
title: Integrasjon direkte mot BR
description: Beskrivelser av API innen BRs elektroniske mottak av meldinger
weight: 100
---

## Innledning
Brønnøysundregistrenes elektroniske mottak har et REST-grensesnitt som kan benyttes av eksterne parter for innsending av meldinger til Brønnøysundregistrene.

APIet er utviklet i Java og Spring Boot, men dette skal ikke legge føringer for klienter som tar APIet i bruk.

## Sikkerhetsmekanismer

Siden dette er begrensede API så skal kallende parter autentiseres gjennom [Maskinporten](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_guide_maskinporten.html).

For å kunne få tilgang til våre begrensede API er det tre forutsetninger.

1. Virksomhetssertifikat
2. Registrert klient hos Maskinporten.
3. JWT-token fra Maskinporten mot scopet `brreg:mottak`

Tokenet som hentes fra Maskinporten må bli sendt som autorisasjonstoken (Bearer token) når et kall mot Løsøreregisteret blir utført.

Access-tokenet oppgis i headeren `Authorization`.
Husk `Bearer` før tokenet.

|Header        | Verdi                                                                              |
|--------------|------------------------------------------------------------------------------------|
|Authorization | Bearer eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFpMS0pzdzhmQkFJdUZi... (forkortet) |
