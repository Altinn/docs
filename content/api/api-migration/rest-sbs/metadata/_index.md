---
title: Endringer i REST API for Metadata for sluttbrukersystem
linktitle: Metadata
description: Her finner du foreløpig plan for hva som skjer med Metadata API for Sluttbrukersystem i overgangen mellom Altinn 2 og Altinn 3. Planen vil bli endret underveis. 
toc: false
weight: 400
tags: [plan, migration]

---

## Metadata
[MetadataAPI](https://altinn.github.io/docs/api/rest/metadata/)
### Migreringsstrategi
Metadata apiet i Altinn 2 viser hvilke tjenester som er tilgjengelig i løsnignen og metadata om disse. 
I Altinn 3 vil teneste-begrepet byttes ut med begrepet "ressurser" og ressursene vil finnes i et [ressursregister](https://docs.altinn.studio/authorization/modules/resourceregistry/)

I tilegg finnes en egen oversikt over apper (skjema) som i dag allerede kjører på Altinn 3 plattformen. Informasjon om disse finnes i dag ikke i det nye ressursregisteret. 
På sikt vil informasjon om apper i Altinn 3 også registreres som ressurser i Altinn 3 sitt ressursregister. 

#### Hvilke konsekvenser har dette for konsumenter
Dette API vil være tilgjenelig hele tiden, men etterhvert som tjenester flytter fra Altinn 2 til Altinn 3 så må man ta i bruk tilsvarende men nye API i Altinn 3 
### Tidsplan
Nytt API for Ressurs er etablert og under fortsatt utvikling. Det vil fortløpende legges til rette for migrering av nye ressurstyper. 
I løpet av 2024 vil man ha lagt til rette for migrering av alle tjenestetyper fra A2 til A3. 

### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste
Følgene API finnes i Altinn 3 for å slå opp metadata om tjenester som er migrert
- Test: https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/search
- Prod: https://platform.altinn.no/resourceregistry/api/v1/resource/search 
- Metadata om apps utviklet i Altinn 3 (Prod):  https://docs.altinn.studio/api/apps/metadata/