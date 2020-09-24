---
title: "20.10"
description: Vedlegg på eget filshare og tilhørende endringer
weight: 40
type: releasenote
releasenote_info: Versjon 20.10, produksjonssettes 19. oktober 2020
---
**Dette er en kommende endring. Gjeldende endring ligger [her](../20-9).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

### Endringer i arkitektur for håndtering av filvedlegg

Det utføres en arkitekturmessig endring i forhold til hvordan Altinn oppbevarer og håndterer filvedlegg. For alle tjenester vil filvedlegg lagres på eget fileshare. På filesharet er filene organisert under mapper med navnet til de respektive tjenesteeier. 

Dette arbeidet er gjort for:

- å redusere størrelsen på databasene slik at vedlikeholds-jobber mot databasene kan gå raskere.

- å redusere kostnader

- at det forenkler migrering av tjenester fra til Altinn 3.

- at det er enklere å beregne lagringskostnader for hver enkelt tjenesteier.

Endringen i denne releasen skal ikke ha noen funksjonelle eller ytelsesmessige konsekvenser.

