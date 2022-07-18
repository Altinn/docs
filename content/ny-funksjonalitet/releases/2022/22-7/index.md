---
title: 22.7
description: Mindre forbedringer og feilrettinger
weight: 140
type: releasenote
releasenote_info: Release 22.7. Produksjonssatt 27. juni
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i SBL

### Endringer for å kunne flytte TUL til sky

Det er lagt til eksterne endepunkt for migrering direkte fra TUL til SBL slik at migrering kan utføres fra sky. 

### Endring transportinfrastruktur DPI

Kommunikasjon til Digital Post er oppdatert til å bruke "Hjørne 2 Rest API" for kommunikasjon i stedet for eksisterende .Net klient kode. 

## Endringer i Autorisasjon

### Opprydding i avgiverliste

•	Fjernet feature toggles for PartyListCaching og ReporteeList.

•	Flyttet relaterte endepunkter fra AuthorizationAdministration til InformationPointSI.

•	Fjernet død kode.

•	Lagt på SRR filter.

•	Beriket reportee objekter med party informasjon samtidig med caching nærmest databasen. Har dermed kunne fjerne beriking av party informasjon lenger ut i kanalene.

## Feilrettinger

### Egne konfigurerbare timeout-nøkler for lese og skrive operasjoner for Altinn Policy kall

Det er opprettet to nye nøkler for å kunne konfigurere hvor lang timeout tid det er på kall til Altinn 3.0. 
«Lese nøkkelen» er satt til 5s og «Skrive nøkkelen» er satt til 10s. 
Dette medfører noe lenger tid før det feiler ved problemer i Altinn 3.

### Kontroll av “Minste antall vedlegg” henger.

Kodeendring for å hindre at man blir «hengende igjen» ved skjemakontroll.

### Virksomhetens avgiverliste oppdateres ikke ved ny eller slettet avgiver

Release 22.6 introduserte komplett avgiverliste for virksomheter. 
Denne listen har en cache tid på en time, og manglet invalidering/oppdatering når en virksomhet mottar eller mister en ny avgiver i listen. 
Dette er nå utbedret så listen skal oppdateres ved endringer.

### Økt CPU-ressursbruk på APP-servere i PROD 

Det er gjort en optimalisering rundt datologikk ved filtrering basert på datoer når man henter opp meldingsboksen.
