---
title: Testing mot data.altinn.no
linktitle: Testing
toc: true
weight: 40
---

## Testmiljø

data.altinn.no har et test-miljø kalt "staging" som har et fåtall beviskoder og leverer fiktive data. Miljøet kan brukes i forbindelse med testing av implementasjoner. Miljøet er også  et pre-prod miljø, og alle endringer blir først deployet til staging-miljøet før de produksjonssettes.

### REST-API

For REST-API er det et eget endepunkt som benyttes, og det må også oppgis et test-virksomhetssertifikat utstedt av en offentlig godkjent aktør.

* [Teknisk beskrivelse av staging-API](https://test.data.altinn.no/apis)
* [Les mer om bruk av REST-API](../bruke-rest-api)

## Test-organisasjon for forespørsler

Oversikt over testorganisasjoner som kan brukes i staging-miljøet samt tilhørende innloggingsinformasjon for nøkkerolleinnehavere for disse organisasjonene i Altinns testmiljø (TT02) vil bli tilsendt etter registrering av API-nøkkel.

## Tilgjengelige test-koder

Listen av tilgjengelige beviskoder i staging-miljøet er tilgjengelig i det åpne metadata-API-et.

* [Vis liste over beviskoder i staging (JSON)](https://api.ebevis.no/nadobe-staging/v1/public/metadata/evidencecodes)

## Bruke Postman for testing

Det er utarbeidet en collection med forespørsler i [Postman](https://www.getpostman.com/) som fritt kan lastes ned og benyttes for testing mot eBevis REST API. Se Github-lenken under for mer informasjon.

* [Postman-collection på Github - OBS: Vil bli oppdatert til å gå mot nye miljøer før slutten av 2020](https://github.com/Altinn/eBevis)
* [Last ned Postman](https://www.getpostman.com/)