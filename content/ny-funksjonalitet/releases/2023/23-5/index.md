---
title: 23.5
description: Mindre forbedringer og feilrettinger
weight: 160
type: releasenote
releasenote_info: Release 23.5. Produksjonssettes 22. mai
---
**Dette er en kommende endring. Gjeldende endring ligger [her](../23-4).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i SBL

### Saner implementasjon mot gammel SDP / DPI løsning

Gammel ordning for SDP / DPI implementasjon saneres og er ikke lenger tilgjengelig. I tillegg er ny implementasjon nå oppe og kjører. 
Sanering medførte endringer i Unit-tester og krevde også endringer i enkelte base klasser for å forbedre mocking mot eksterne Rest tjenester.

## Feilrettinger

### Variabelt språk på tjenesteeier under enkeltdelegering av tjenester

Det er utbedret en feil i visningen av tjenesteeier navn under enkeltdelegering av tjeneste tilgang. Dersom en tjeneste ikke har definert tekster på brukerens valgte visningsspråk i Altinn, ville navnet på tjenesteeier variere mellom tjenester. 
Navn på tjenesteeier finnes alltid spesifisert på alle tilgjengelige språk og vil nå alltid bli vist på brukerens valgte visningsspråk uavhengig av hvilke språk hver enkelt tjeneste tilbyr.

