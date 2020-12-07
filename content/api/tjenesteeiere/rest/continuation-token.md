---
title: Continuation token
description: Noen endepunkt i REST APIet til Altinn tilbyr bruk av continuation token. Denne siden beskriver hvordan man kan bruke continuation token i Altinn.
---

### Hvordan bruke continuation token i Altinn

Et continuation token er argumentet som brukes på `continuation` parameteret. 
Det peker på det siste elementet i listen som ble returnert. Ved oppgi 
dette ved neste kall ber man om at listen starter fra (og ikke 
inkluderer) det elementet som continuation tokenet representerer. 

Formatet på continuation tokenet er både menneskelig- og maskinlesbart. 
Det består av tidspunktet for _siste endring for et element_ `LastChanged`, og en 
intern index. Det nøyaktige formatet er `{LastChanged timestamp}_{id}`, hvor 
`{LastChanged timestamp}` har formatet `yyyy'-'MM'-'dd'T'HH':'mm':'ss.fff` 
Eksempel på continuation token: `2020-02-01T08:30:39:148_1054` 

Det er veldig mange som ønsker informasjon som ligger i Altinn og av ytelseshensyn er det derfor 
anbefalt å bruke `continuation` parameteret ved gjentatte kall til enkelte endepunkt. Vår anbefalte 
arbeidsflyt er: 

* Ved det første kallet til endepunktet trenger man ikke benytte continuation 
  parameteret. Da vil man få returnert en liste med elementer. Hvis 
  listen inneholder minst ett element så vil man også få et continuation token 
  returnert sammen med listen. 
* Ved senere kall til endepunktet hvor de andre parametrene er uforandret bør man benytte 
  continuation tokenet man fikk ved forrige kall som argument for 
  `continuation` parameteret. Da vil kun nye elementer og elementer som har 
  blitt endret siden sist kall, bli inkludert i listen. 

For å finne ut om et endepunkt tilbyr bruk av continuation token, se detaljert dokumentasjon for endepunktet på [altinn.no/api/serviceowner/Help](https://www.altinn.no/api/serviceowner/Help)

### Paginering med OData og continuation token

REST-endepunktene som tilbyr continuation token bør ikke pagineres med _OData_ parameteret `$skip`.
Hvis et element som allerede har blitt returnert blir oppdatert mens man paginering, 
så vil dette elementet bli flyttet til enden av listen.
Alle elementer som var plassert etter dette vil nå komme en plass tidligere i listen.
Dette fører til at det første elementet på den neste siden havner på den siste plassen i siden som allerede har blitt returnert, 
og man vil ikke få returnert dette elementet.

Man kan fortsatt bruke `$top` for begrense lengden på listen.
`$top` kan også brukes sammen med continuation token.
