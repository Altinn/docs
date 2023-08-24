---
title: 23.8
description: Mindre forbedringer og feilrettinger
weight: 150
type: releasenote
releasenote_info: Release 23.8. Produksjonssatt 21. august
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Endre fra stor bokstav til liten bokstav i programmeringsgrensesnitt

"Programmeringsgrensesnitt” ble endret til “programmeringsgrensesnitt” og “Application Programming Interface” endret til “application programming interface”

## Endringer i Autorisasjon

### Endre fra å bruke ver2 til test for Maskinporten token

Endre de forskjellige integrasjonene som bruker Maskinporten for å ustede tokens til å kunne benytte både test.maskinporten.no og ver2.maskinporten.no.
Disse er individuelt skiftbare med en feature toggle.

### Støtte for nytt id-porten claim for Sikkerhetsnivå

Det er blitt lagt inn støtte for autentiseringslevel idporten-loa-low (selvregistrert), idporten-loa-substantial (sensitivt) og idporten-loa-high (svært sensitivt).    

## Endringer i REST

### Manglende informasjon om hovedenhet for avgiver i tjenesteeier API for uthenting av rettigheter

Det er utbedret en mangel i modellen som returneres av tjenesteier API for uthenting av rettigheter mellom to parter (personer eller virksomheter).
For både subject og reportee-modellen er det nå utbedret så feltet “ParentOrganizationNumber” blir korrekt populert med organisasjonsnummer for hovedenhet dersom parten selv er en underenhet.

## Endringer i SBL Bridge API

### Utvide register/api/parties til å kunne hente ut underenheter

Det er lagt på en url parameter fetchSubUnits som har false verdi dersom den unlates og resultatet vil da bli som før. Dersom denne settes til true så vil den inkludere en liste over underenheter for alle enheter som etterspørres i input.
