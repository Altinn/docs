---
title: "20.10"
description: Flytting av filvedlegg fra databasen og ut på fileshare
weight: 40
type: releasenote
releasenote_info: Versjon 20.10, produksjonssettes 10. november 2020
---
**Dette er en kommende endring. Gjeldende endring ligger [her](../20-9).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

### Endringer i arkitektur for håndtering av filvedlegg

Det skal gjennomføres en endring i Altinn slik at filvedlegg til tjenester kan flyttes ut av databasen og lagres på eget fileshare. Filene skal flyttes ut av databasen på et senere tidspunkt, tentativt januar 2021. Når filene flyttes ut på fileshare vil de bli organisert i egne mapper pr. tjenesteeier.  

Denne endringen vil legge til rette for:

- Mer effektive drifts- og vedlikeholdsjobber 

- Reduserte kostnader

- Forenkling av migrering av tjenester fra Altinn 2 til Altinn 3

- Det vil bli enklere å beregne og fordele kostnader for lagring

Endringen i denne releasen skal ikke ha funksjonelle konsekvenser.
