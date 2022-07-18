---
title: Testing mot data.altinn.no
linktitle: Testing
toc: true
weight: 40
---

## Testmiljø

data.altinn.no har et preproduksjons-miljø kalt "staging" som kan brukes i forbindelse med testing av implementasjoner. Alle endringer som skal i produksjon blir først deployet til staging-miljøet før de produksjonssettes. 

Testmiljøet er helt separert fra produksjon, og benytter sin egen utvikler-portal, hvor det kreves egne brukere og API-nøkler (subscription keys) som benyttes mot egne endepunkter.

Miljøet benytter Maskinportens VER2-mijø for autentisering og [Altinn TT02](https://tt02.altinn.no) for autorisasjon og samtykkeforespørsler. 

* [Gå til data.altinn.no Test API Portal](https://test.data.altinn.no/)
* [OpenAPI 3.0 (swagger) for v1 Test](https://api-test.data.altinn.no/v1/public/metadata/oas/json)

### REST-API

For REST-API er det et eget endepunkt som benyttes, og det må også oppgis et test-virksomhetssertifikat utstedt av en offentlig godkjent aktør.

* [Teknisk beskrivelse av staging-API](https://test.data.altinn.no/apis)
* [Les mer om bruk av REST-API](../bruke-rest-api)

## Test-organisasjoner for forespørsler

data.altinn.no støtter bruk av [Tenor](https://www.digdir.no/felleslosninger/tenor-testdatasok/1284) testdata for de fleste datasettene. Noen andre tjenester og datasett benytter andre testdata, som er nærmere beskrevet i onboarding-dokumentasjonen til den aktuelle tjenesteeieren. Altinn TT02 og Maskinporten VER2 støtter også bruk av Tenor.

* [Les mer om Tenor hos Skatteetaten](https://www.skatteetaten.no/skjema/testdata/)
* [Tenor testdatasøk (krever innlogging med ID-porten)](https://testdata.skatteetaten.no/web/testnorge/)

## Tilgjengelige test-koder

Listen av tilgjengelige beviskoder i staging-miljøet er tilgjengelig i det åpne metadata-API-et. Dette API-et benyttes også av den [autogenererte dokumentasjonen](/docs/utviklingsguider/data.altinn.no/beviskoder/), husk og sett kryss i boksen "Vis testmiljø".

* [Vis liste over alle datasett](/docs/utviklingsguider/data.altinn.no/beviskoder/)
* [Vis liste over beviskoder i staging (JSON)](https://test-api.data.altinn.no/v1/public/metadata/evidencecodes)

<!-- 

TODO! Oppdater denne 

## Bruke Postman for testing

Det er utarbeidet en collection med forespørsler i [Postman](https://www.getpostman.com/) som fritt kan lastes ned og benyttes for testing mot eBevis REST API. Se Github-lenken under for mer informasjon.

* [Postman-collection på Github - OBS: Vil bli oppdatert til å gå mot nye miljøer før slutten av 2020](https://github.com/Altinn/eBevis)
* [Last ned Postman](https://www.getpostman.com/)

-->