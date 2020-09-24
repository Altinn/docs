---
title: "20.10"
description: Vedlegg på eget filshare og tilhørende endringer
weight: 40
type: releasenote
releasenote_info: Versjon 20.10, produksjonssettes 19. oktober 2020
---
**Dette er en kommende endring. Gjeldende endring ligger [her](../20-9).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

### Endringer i arkitektur for håndtering av binære vedlegg

Det er utført en arkitekturmessig endring i forhold til hvordan Altinn oppbevarer og håndterer binære vedlegg knyttet til tjenester. Filer er flyttet ut av databasene og ut på eget fileshare. Filene er flyttet fra databasene ServiceEngine, Archive og tjenesteeieres arkiv. På filesharet er filene organisert under mapper med navnet til de respektive databaser. Alle filer tilhørende Serviceengine databasen ligger under tilhørende mappe på filesharet. Tilsvarende gjelder for Archive og tjenesteeieres arkiv. Under mappenavn tilhørende hver database er det opprettet egne mapper for hver tjenesteeier. Alle filer knyttet til en tjenesteeier er organisert under samme mappe. Denne mappen er ikke delt med andre tjenesteeiere.

Dette arbeidet er gjort for:

- å redusere størrelsen på databasene slik at vedlikeholds-jobber mot databasene kan gå raskere.

- å redusere kostnader for backup.

- at det forenkler migrering av tjenester fra Altinn 2 til Altinn 3.

- at det er enklere å beregne lagringskostnader for hver enkelt tjenesteier.

### Binære vedlegg legges på eget fileshare

Filer legges som nevnt over på eget fileshare. Det betyr at tjenester hentes fra den aktuelle databasen mens eventuelt tilhørende binært vedlegg hentes fra filesharet.
