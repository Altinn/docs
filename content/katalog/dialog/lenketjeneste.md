---
draft: false
title: Lenketjeneste
description: En lenketjeneste utfører autorisasjon i Altinn før brukeren sendes til et annet nettsted der selve tjenesten kjører.
aliases:
menu:
  main:
    identifier: link-service
    name: Lenketjeneste
    parent: dialog

weight: 100
---

En lenketjeneste utfører autorisasjon i Altinn før brukeren sendes til et annet nettsted der selve tjenesten kjører.


### Fordeler og muligheter
Ved å utvikle en lenketjeneste vil tjenesteeier beholde sin egen tjenestemotor for utvikling av tjenesten.
Altinn blir kun benyttet til tilgjengeliggjøring av tjenesten, samt til autorisering av etatens egenutviklede tjenester.

Når en bruker benytter lenketjenester ved å starte tjenesten fra Altinn eller fra tjenesteeiers nettside vil man bli sendt til autentisering hos ID-porten.
Sluttbruker foretar valg av avgiver i Altinn og det det utføres en autorisasjonskontroll og en tjenestekontrollfør brukeren
blir sendt til lenketjenesten på ekstern løsning. Autorisasjonskrav til lenketjenester defineres i Altinn.
Det er bare sikkerhetsnivåene som er tilgjengelig i IdPorten som kan benyttes på tjenesten.

Lenketjenester blir ikke instansiert i Altinn og er derfor ikke å finne i «min meldingsboks» i Altinn.
For å kunne identifisere hvilken avgiver brukeren valgte å starte tjenesten med, sendes det med en nøkkel som
den eksterne tjenesteportalen kan benytte for å spørre Altinn om informasjon om valgt avgiver.

Tjenesteeier kan gi tilbakemelding til brukeren via Altinn sin meldingstjeneste.
Graden av integrasjon mellom Altinn og det eksterne nettstedet kan variere fra tjeneste til tjeneste.

Tjenesteeier må ha satt opp føderering mot IDPorten og lenken (tjenesten hos tjenesteeier) må være en beskyttet ressurs.

Det er 3 aktører i lenketjenesten:

 1. IDPorten, som er Identity Provider og foretar autentisering av sluttbruker
 2. Altinn foretar autorisasjonskontroll, tjenestekontroller og viderefører sluttbruker til tjeneste i ekstern portal.
 3. Tjenesteeier for ekstern tjeneste som tilbyr tjenesten til sluttbruker.   

#### Fordeler
 - Sikkert
 - Tjenesteeier har full kontroll på utvikling av tjenesten på sin side


### Produkter som tilbys
 - Meldingstjeneste
 - Autorisasjon

### Hvordan komme i gang
[Informasjon om hvordan man kommer i gang med å lage en lenketjeneste](https://altinnett.brreg.no/no/Tjenesteutvikling/Hvordan-utvikle-tjenester/Lenketjeneste/)

### Råd og tips
 - Husk ved bruk av lenketjeneste får ikke sluttbruker data i sitt felles arkiv. Det vil være opp til tjenesteeier å etablere eget arkiv for sluttbruker.

### Kanaler
 - Portal

### Avhengigheter
Lenketjenester forutsetter at man tar i bruk Autentisering og Autorisasjon i Altinn.

### Teknisk dokumentasjon
 - [Guide for lenketjeneste](/docs/guides/tjenesteeier/lenketjenester/)
 - [Implementasjonsguide for tjenesteeier](/docs/guides/tjenesteeier/implementasjonsguide/)