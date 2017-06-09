---
draft: false
title: Logging
description: "Altinnplattformen logger bruk av plattformen på en rekke måter.
              Logging av hendelser i løsningen skjer både i applikasjoner, databaser, i operativsystemet og i infrastrukturkomponenter."
aliases:
menu:
  main:
    identifier: logging
    name: Logging
    parent: security

weight: 100
---

Altinnplattformen logger bruk av plattformen på en rekke måter.
Logging av hendelser i løsningen skjer både i applikasjoner, databaser, i operativsystemet og i infrastrukturkomponenter.
Ulike komponenter har ulik rotasjonstid (sletting) basert på nødvendigheten for loggingen. Loggdata som ikke er relevant vil bli slettet.


### Fordeler og muligheter

Fordelen med å ta i bruk Altinn som plattform for tjenester er at man får med forskjellige type loggefunksjonalitet.

Alle innlogginger av brukere blir logget med informasjon om tidspunkt og IP-adresse.
Tilgang til data blir logget med tidspunkt og med informasjon om bruker og hvilke data som ble aksessert.

Hendelser som utfylling, signering, innsending blir logget i eventloggen og gir sluttbrukerne mulighet til selv se informasjon.

Ved behov kan Altinn teamet analysere logger for å hjelpe tjenesteeier.

Loggene i Altinn er benyttes også til rettslige tvister.


### Produkter som tilbys
 - Autentiseringslogg
 - Autorisasjonslogg
 - Hendelseslogg (event)

### Hvordan komme i gang?
Logging er automatisk en del av tjenester i plattformen.

### Kanaler
 - REST-API
 - Web Service
 - Portal

### Avhengigheter
Logging er ingen tjeneste man kan kjøre for seg selv, det er en del av andre tjenester man benytter i plattformen.

### Teknisk dokumentasjon
 - Funksjonell spesifikasjon – Sluttbrukerløsningen
