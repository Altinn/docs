---
title: Kom i gang!
description: Denne guiden vil hjelpe deg med å komme igang med bruk av Altinns REST API.
weight: 1
---

Denne guiden vil hjelpe deg med å komme igang med bruk av Altinns REST API.

## Registrer din applikasjon

For at vi skal kunne stoppe misbruk og feilbruk må du registrere deg for å kunne bruke Altinn API-et.

Før du skal bruke APIet må du ta stilling til hvilke ressurser i APIet du skal benytte og på hvilken måte (Read=lesetilgang, Write=skrivetilgang).
API-nøkkelen du blir tildelt vil kun være gyldig for de ressursene du har bedt om tilgang til.

 - **Read på Message** gir tilgang til å hente meldinger og skjema. Write gir tilgang til å sende inn skjema, samt slette meldinger og skjema.
 - **Read på Profile** gir tilgang til å hente brukerens Navn, adresse og kontaktinformasjon, samt kontaktinformasjon for virksomheter brukeren kan representere
 - **Read på Organizations** gir tilgang til å hente ut virksomhetene pålogget bruker kan representere.
 - **Read på Reportee** gir tilgang til å hente ut alle avgivere (privatpersoner og virksomheter) pålogget bruker kan representere.
 - **Read på Lookup** gir tilgang til å aksessere eksponerte innsynstjenester i REST API.
 - **Read/Write på Authorization** gir tilgang til å se på eller endre delegerte roller og rettigheter på vegne av innlogget bruker eller virksomheter som brukere kan representere. 

Send følgende to skjemaer ferdig utfylt i en e-post til [api@altinn.no](mailto:api@altinn.no)

1. [Bestillingsskjema](https://altinnett.brreg.no/PageFiles/11047/Bestillingskjema_API_v2.doc)
2. [Egenerklæringsskjema](https://altinnett.brreg.no/Global/Altinn%20API/Egenerkl%c3%a6ring-API_v2.doc)

Når vi har registrert informasjonen vil vi sende en API-nøkkel som du må benytte i din applikasjon.

## Autentisering med ID-porten
Selv om tilgang til Altinn API er åpent, kreves det at brukeren autentiserer seg for at tilgangen til innholdet i brukerens meldingsboks skal gis.
Informasjon om hvordan autentisering av brukerne kan utføres i en applikasjon og informasjon om føderering av brukere
finner du [her](../autentisering/).
For å teste APIet i en nettleser kan du logge inn i Altinn på vanlig måte.

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
 
## Detaljert teknisk hjelpeside og testklient
Altinn API har egne selvdokumenterene hjelpesider (på engelsk) som du finner på https://www.altinn.no/api/help/.
Disse hjelpesidene inneholder detaljert teknisk informasjon om de ulike modellene som eksponeres og aksjonene som er mulig å utføre.
Hjelpesidene inneholder også en testklient som kan benyttes til å utføre spørringer direkte mot Altinn API fra din nettleser (krever at du er pålogget Altinn).

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
