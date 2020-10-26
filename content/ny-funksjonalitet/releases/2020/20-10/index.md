---
title: "20.10"
description: Flytting av filvedlegg fra databasen og ut på fileshare
weight: 40
type: releasenote
releasenote_info: Versjon 20.10, produksjonssettes november 2020
---
**Dette er en kommende endring. Gjeldende endring ligger [her](../20-9).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

### Endringer i arkitektur for håndtering av filvedlegg

Det skal gjennomføres en endring i Altinn slik at filvedlegg til tjenester flyttes ut av databasen og lagres på eget fileshare. På fileshare organiseres filene i egne mapper pr. tjenesteeier.  

Denne endringen vil gi følgende resultat:

- Mer effektive vedlikeholdsjobber 

- Reduserte kostnader

- Forenkling av migrering av tjenester fra Altinn 2 til Altinn 3

- Det vil bli enklere å beregne og fordele kostnader for lagring

Endringen i denne releasen skal ikke ha funksjonelle konsekvenser med unntak av at selve produksjonssettingen må gjennomføres bak nedetidsplakat (at løsningen holdes stengt under deploy)
