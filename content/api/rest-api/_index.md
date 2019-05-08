---
title: REST API
description: Dokumentasjon for Altinns REST-api
weight: 10
aliases:
- /api/
- /api/rest-api/
- /guides/integrasjon/sluttbrukere/api/
---

Altinn tilbyr et REST-API med [autentisering via ID-porten](autentisering/id-porten/), brukernavn og passord eller virksomhetssertifikatsom som gjør det mulig å bruke tjenestene i Altinn i en app eller ekstern nettside.

{{% notice info %}}
Teknisk dokumentasjon av [API](https://www.altinn.no/api/help) (Swagger)
{{% /notice %}}

Altinn API benytter REST arkitekturstil, og baserer seg på en semantisk definisjon av innholdet. Strukturen i responsen fra API-et kan endre seg, men betydningen av elementene er den samme.

Dette blir som når man navigerer seg inn på en vanlig nettside. Da kan en klient navigere seg inn i API-et ved å følge lenker med en definert betydning. Det er ikke sikkert at URL-en man var på sist fortsatt eksisterer, men det vil være mulig å bla eller søke seg tilbake til det samme innholdet fra forsiden.

Fordelen med dette er at Altinn har mulighet til å bygge ut og omstrukturere innholdet i API-et uten at dette hindrer en klient fra å finne fremtil innholdet den brukte fra før.

API-et baserer seg på de mekanismene som allerede finnes i HTTP-standarden og meldingshoder som brukes av vanlige nettlesere og webservere i dag.
Altinn API støtter følgende formater

 - application/HAL+json
 - application/HAL+xml
 - application/xml
 - application/json

For å [komme i gang](kom-i-gang/) med å bruke API-et må du først [registrere](kom-i-gang/#registrer-din-applikasjon) løsningen din hos Altinn.

{{% children description="true" %}}
