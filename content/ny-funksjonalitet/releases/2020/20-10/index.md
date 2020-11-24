---
title: "20.10"
description: Flytting av filvedlegg fra databasen og ut på fileshare
weight: 40
type: releasenote
releasenote_info: Versjon 20.10, produksjonssatt 10. november 2020
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

### Endringer i arkitektur for håndtering av filvedlegg

Det er i denne releasen lagt til rette for at filvedlegg til tjenester skal kunne flyttes ut av databasen og lagres på eget fileshare. Filene skal flyttes ut av databasen på et senere tidspunkt, tentativt januar 2021. Når filene flyttes ut på fileshare vil de bli organisert i egne mapper pr. tjenesteeier.  

Med denne endringen vil en oppnå følgende:

- Mer effektive drifts- og vedlikeholdsjobber 

- Reduserte kostnader

- Forenkling av migrering av tjenester fra Altinn 2 til Altinn 3

- Det vil bli enklere å beregne og fordele kostnader for lagring

Endringen i denne releasen skal ikke ha funksjonelle konsekvenser.
