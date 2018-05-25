---
title: Testing
weight: 40
---

{{% notice info %}}
Dette er dokumentasjon under arbeid for NADOBE-tjenesten som per i dag ikke er produksjonssatt
{{% /notice %}}

## Testmiljø

NADOBE har et test-miljø kalt "staging" som har et fåtall beviskoder og kun leverer fiktive data. Miljøet kan brukes i forbindelse med testing av implementasjoner. Miljøet er også NADOBEs pre-prod miljø, og alle endringer blir først deployet til staging-miljøet før de produksjonssettes.

### PEPPOL

_TODO:_ Avklare routing mellom OA og staging Core.

### REST-API

For REST-API er det et eget endepunkt som benyttes, og det må også oppgis et test-virksomhetssertifikat utstedt av en offentlig godkjent aktør.

* [Teknisk beskrivelse av staging-API](https://apim-nadobe.portal.azure-api.net/docs/services/5ad483f9e25f8d2a047c87bb/operations/5ad483ff16288336274ef2cf)
* [Les mer om bruk av REST-API](../bruke-rest-api)

## Test-organisasjon for forespørsler

Forespørsler må gjøres mot en av følgende fiktive organisasjonsnumre. Alle organisasjonene vil retunere samme fiktive data for de ulike beviskodene, men vil ha ulik oppførsel i forhold til beviskoder som krever samtykke. Disse er beskrevet i tabellen under.

| Organisasjonsnummer | Håndtering av samtykkeforespørsler                                                   |
| ------------------- |------------------------------------------------------------------------------------- |
| 999999956           | Vil innvilge samtykke innen 30 sekunder                                              |
| 999999964           | Vil nekte samtykke innen av 30 sekunder                                              |
| 999999972           | Vil ikke svare på samtykke                                                           |
| 999999980           | Vil innvilge samtykke innen 30 sekunder, og trekke det etter ytterligere 30 sekunder |

Alle andre organisasjonsnumre blir behandlet som om de ikke finnes.

## Tilgjengelige test-koder

Listen av tilgjengelige beviskoder i staging-miljøet er tilgjengelig i det åpne metadata-API-et.

* [Vis liste over beviskoder i staging (JSON)](https://apim-nadobe.azure-api.net/nadobe-staging/v1/metadata/evidencecodes)
