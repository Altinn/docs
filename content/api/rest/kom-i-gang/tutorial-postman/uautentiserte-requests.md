---
title: "REST forespørsler mot åpne API-endepunkter"
linktitle: "Første REST-forespørsel"
description: "Hvordan bruke Postman til å utføre REST-forespørsler mot de åpne Altinn API-endepunktene, som ikke krever autentisering eller API-nøkler."
toc: false
aliases:
weight: 16
categories: [Kom-i-gang veiledninger]
keywords: [Postman, API, REST]
tags: [REST, Postman]
---

## REST forespørsler som ikke krever API-nøkkel eller autentisering
De aller fleste API-endepunktene for Altinn krever både API-nøkkel og autentisering, men *Metadata* er åpne endepunkt som ikke krever noe.
For å vise hvordan man kan kalle disse fra Postman skal vi bruke `GET /api/metadata` som returnerer informasjon om tjenestene i Altinn.
For referanseinformasjon om endepunktet kan man se på [API Help for GET metadata](https://www.altinn.no/api/Help/Api/GET-metadata_language) eller [Swagger for GET metadata](/docs/referanse/openapi-swagger/metadata-api/metadata/#/Services/GetMetadata).

![Postman kall til Metadata](/docs/images/guides/postman/Postman-metadata-request.png "Postman GET metadata request")

Observer at URL er satt til `{{envUrl}}/api/metadata`. Hvis Environmentet er satt opp korrekt, dvs. til *TT02* for denne leksjonen, så vil `envUrl` variabelen bli erstattet med `https://tt02.altinn.no` når forepørselen sendes.

Følgende steg må følges for å sende forespørselen:
1. I *Params* fanen:
    * Slå av `language` parameteret, eller sett verdien til `1033`, `1044`, eller `2068`. Dette tilsvarer Engelsk (Default), Bokmål, eller Nynorsk. Dette parameteret styrer språket til tekstverdiene som blir returnert.
2. I *Headers* fanen:
    * Slå av `ApiKey`.
    * Sett `Accept` til `application/hal+json`. Denne headeren beskriver formatet vi forventer i svaret.
    * `Content-Type` har ingen effekt på denne forespørselen.
3. Trykk på *Send*.

Nå skal man få et svar som har statuskode `200 OK`. Dette betyr at forespørselen ble mottatt og besvart på en vellykket måte.
I *Body* på svaret kan man se all tjenestemetadata for alle tjenestene i TT02.
Siden det er ganske mange tjenester kan det ta noen sekunder før visningen får formatert *JSON*-formatet på en leselig måte.
