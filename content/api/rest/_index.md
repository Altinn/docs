---
title: REST
description: Med REST-APIet er det mulig å bruke tjenestene i Altinn i en app eller ekstern nettside. 
weight: 10
aliases:
- /api/rest-api/
- /guides/integrasjon/sluttbrukere/api/
---
{{% panel %}}
#### Modernisering av Altinn
Altinn skal moderniseres for å sikre brukervennlige, sikre og kostnadseffektive tjenester til innbyggere og næringsliv.

*Det betyr at mange av dagens API i Altinn 2 innen juni 2025 vil erstattes av nye tjenester.
Før du tar i bruk dagens Altinn 2 API bør du undersøke hvilke konsekvenser moderniseringsløpet har for deg.*

Les mer om dette på samarbeidsportalen under [Modernisering av Altinn](https://samarbeid.digdir.no/eformidling/modernisering-av-altinn/1799)
{{% /panel %}}

For å komme i gang med å bruke REST API-et må du først registrere løsningen din hos Altinn og autentisere deg via ID-porten, brukernavn/passord eller virksomhetssertifikat.

**[Kom i gang med REST API](kom-i-gang/)**

## Selvdokumenterende hjelpeside og testklient
Altinns REST API har egne selvdokumenterene hjelpesider som inneholder detaljert teknisk informasjon om de ulike modellene som eksponeres og aksjonene som er mulig å utføre. Hjelpesidene inneholder også en testklient som kan benyttes til å utføre spørringer direkte mot Altinn API fra din nettleser (krever at du er pålogget Altinn).

**[Teknisk dokumentasjon og testklient](https://www.altinn.no/api/help/)**

## REST API - generell oppbygging
Altinn API benytter REST arkitekturstil, og baserer seg på en semantisk definisjon av innholdet. Strukturen i responsen fra API-et kan endre seg, men betydningen av elementene er den samme. Dette blir som når man navigerer seg inn på en vanlig nettside. Da kan en klient navigere seg inn i API-et ved å følge lenker med en definert betydning. Det er ikke sikkert at URL-en man var på sist fortsatt eksisterer, men det vil være mulig å bla eller søke seg tilbake til det samme innholdet fra forsiden. Fordelen med dette er at Altinn har mulighet til å bygge ut og omstrukturere innholdet i API-et uten at dette hindrer en klient fra å finne fremtil innholdet den brukte fra før.

API-et baserer seg på de mekanismene som allerede finnes i HTTP-standarden og meldingshoder som brukes av vanlige nettlesere og webservere i dag.
Altinn API støtter følgende formater

 - application/HAL+json
 - application/HAL+xml
 - application/xml
 - application/json


## Respons formater
Alle kall som brukes for å hente ut informasjon fra Altinn API bruker GET-metoden i HTTP. Formatet som returneres bestemmes av HTTP-headeren `Accept`.

Følgende kall returnerer innhold fra brukerens meldingsboks i JSON-format.
```HTTP
GET https://www.altinn.no/api/my/messages HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
```

Mens følgende kall returnerer innhold på XML-format:
```HTTP
GET https://www.altinn.no/api/my/messages HTTP/1.1
Host: www.altinn.no
Accept: application/hal+xml
ApiKey: myKey
```

## Feilsøking

### Cross-Origin Resource Sharing (CORS)
For å kunne gjøre kall mot API'et fra en webapp i et annet domene enn altinn.no, så må [CORS] være satt opp i Altinn.  
Ønsket domene som skal benyttes spesifiseres i bestillingsskjema ved [registrering av din applikasjon](#registrer-din-applikasjon).

For å verifisere at [CORS] er satt opp korrekt i et Altinn-miljø, så kan du benytte f.eks. følgende [PowerShell]-script:

```powershell
$headers = @{}
# Sett origin-header med domene som vil gjøre kall mot Altinn API
$headers.Add("Origin", "https://www.eksempel.no")
# Gjør test-kall i ønsket Altinn-miljø mot metadata-ressursen (som ikke krever pålogging)
Invoke-Webrequest -Method Get -Uri https://www.altinn.no/api/metadata/ -Headers $headers
```

Eventuelt så kan f.eks. [curl] benyttes:

```bash
curl -X GET -H "Origin: https://www.eksempel.no" --verbose https://www.altinn.no/api/metadata/
```
Hvis HTTP-header `Access-Control-Allow-Origin` returneres med ønsket domene, så betyr det at CORS er satt opp korrekt for det aktuelle Altinn-miljøet.


[CORS]: https://developer.mozilla.org/docs/Web/HTTP/CORS
[PowerShell]: https://en.wikipedia.org/wiki/PowerShell
[curl]: https://en.wikipedia.org/wiki/CURL

{{% children description="true" %}}
