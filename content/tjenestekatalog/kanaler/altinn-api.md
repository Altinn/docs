---
title: REST-API
description: "Altinn tilbyr et REST-API med autentisering ved hjelp av ID-Porten som gjør det mulig å bruke tjenestene i Altinn i en app eller ekstern nettside.
              Altinn API-et er enkelt og gratis å bruke."
weight: 100
---

Altinn tilbyr et REST-API med autentisering ved hjelp av ID-Porten som gjør det mulig å bruke tjenestene i Altinn i en app eller ekstern nettside.
Altinn API-et er enkelt og gratis å bruke.


### Fordeler og muligheter

Altinn API-et er et grensesnitt mellom brukerne og komponentene som allerede finnes i Altinn.
Dette grensesnittet muliggjør å bruke Altinn-innhold i for eksempel smartphone-apps og andre nettportaler enn altinn.no.

Altinn API benytter REST arkitekturstil, og baserer seg på en semantisk definisjon av innholdet.
Strukturen i responsen fra API-et kan endre seg, men betydningen av elementene er den samme.

Dette blir som når man navigerer seg inn på en vanlig nettside. Da kan en klient navigere seg inn i API-et ved å følge lenker med en definert betydning.
Det er ikke sikkert at URL-en man var på sist fortsatt eksisterer, men det vil være mulig å bla eller søke seg tilbake til det samme innholdet fra forsiden.

Fordelen med dette er at Altinn har mulighet til å bygge ut og omstrukturere innholdet i API-et
uten at dette hindrer en klient fra å finne fremtil innholdet den brukte fra før.

API-et baserer seg på de mekanismene som allerede finnes i HTTP-standarden og meldingshoder som brukes av vanlige nettlesere og webservere i dag.
Altinn API støtter følgende formater:

 - application/HAL+json
 - application/HAL+xml

[Les mer om Altinn-API her](/docs/api/)

### Produkter som tilbys

#### Ekstern tilgang til «Min Meldingsboks»
 - Hente ut meldinger  
 - Slette meldinger
 - Filtrere meldinger

#### Sende inn fra eksterne skjema
 - Signere skjema
 - Legge ved vedlegg eller benytte underskjema
 - Hente preutfyllingsdata

#### Tilgang til innsynstjenester
 - Hente ut informasjon fra tjenesteeiers fagsystemer

#### Ekstern rolle- og rettighetsadministrasjon
 - Hente ut avgiverliste
 - Administrere roller
 - Administrere rettigheter
 - Utføre delegeringer

#### Ekstern tilgang til profilinformasjon
 - Hente kontaktinformasjon for virksomheter
 - Hente kontaktinformasjon for privatpersoner


### Hvordan komme i gang
Informasjon om hvordan man kommer i gang med bruk av Altinn REST-Api

### Råd og tips
 - Ved bruk av REST-API via portal er man avhengig av en gyldig ID-port sesjon både på Altinn og tjenesteiers portal.
 - Nettlesere har i dag i større grad lagt inn sperre for cookies på tvers av domener. Legg derfor til rette for at bruker kan via sendt via Altinn under pålogging. (vises ikke for sluttbruker)
 - Skal dere utvikle egne mobil-App for tjenester kan Altinns referanseapp være til inspirasjon på hvordan integrasjon kan gjøres.


### Kanaler
API-et baserer seg på de mekanismene som allerede finnes i HTTP-standarden og meldingshoder som brukes av vanlige nettlesere og webservere i dag.
Altinn API støtter følgende formater:  

 - application/HAL+json
 - application/HAL+xml

### Avhengigheter
Grensesnittene kan benyttes for innendingstjenester, meldingstjenester, formidlingstjenester og innsynstjenester.

### Teknisk dokumentasjon
Dokumentasjon om bruk av Altinn-API finnes her:  

 - https://altinn.no/api/help/
 - https://altinn.github.io/docs/api/

Altinn har tilgjengeliggjort referansekode for å gjøre det enklere for ulike tilbydere å lage applikasjoner med Altinn-funksjonalitet.
Referansekoden ligger på Altinns repository på GitHub: https://github.com/Altinn/AltinnApp
