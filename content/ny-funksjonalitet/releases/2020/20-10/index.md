---
title: "20.10"
description: Flytting av filvedlegg fra databasen og ut på fileshare
weight: 40
type: releasenote
releasenote_info: Versjon 20.10, produksjonssettes 19. oktober 2020
---
**Dette er en kommende endring. Gjeldende endring ligger [her](../20-9).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

### Endringer i arkitektur for håndtering av filvedlegg

Det utføres en endring i forhold til hvordan Altinn oppbevarer filvedlegg. For alle tjenester vil filvedlegg flyttes ut av databasen og lagres på eget fileshare. På filesharet organiseres filene i egne mapper pr. tjenesteeier.  

Denne endringen vil gi følgende resultat:

- Mer effektive vedlikehldsjobber 

- Forenkling av migrering av tjenester fra Altinn 2 til Altinn 3

- Reduksjon av de totale kostnader

- Det vil bli enklere å beregne og fordele kostnader for lagring

Endringen i denne releasen skal ikke ha funksjonelle konsekvenser.
