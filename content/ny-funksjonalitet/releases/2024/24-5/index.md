---
title: 24.5
description: Mindre forbedringer og feilrettinger
weight: 80
type: releasenote
releasenote_info: Release 24.5
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Autorisasjon
### Ressurser i ressursregisteret må vises i listen over tjenester som en rolle gir tilgang til

Listen over roller en bruker har (inkl listen over tjenester som er knyttet til rollen), blir foreløpig liggende i Altinn 2, men vi må hente informasjon om ressurser i ressursregisteret i tillegg til tjenestene på Altinn 2 og vise dette når brukeren klikker på ?-tegnet ved rollen.

Det er nå lagt til logikk for å hente frem ressurser fra ressursregisteret og inkludere disse i listen over tjenester i popup som vises ved å trykke på spørsmålstegnet ved siden av en rolle.

## Diverse bugfix
### Støtte for varsling for Altinn3 tjenester

Når man velger profil/"din kontaktinfo ..." etterfulgt av "varsling kun for enkelttjenster...", så bør Altinn 3 tjenester inkluderes i listen over tilgjengelige tjenester, og tjenestene må kunne velges og lagres. Dette er nå implementert.

### AltinnApi søk mot meldingsboks genererer kall mot Altinn3

Det ligger en sjekk i koden som skal sørge for at kall fra SBS mot meldingsboks ikke trigger kall til Altinn3, men denne sjekken i koden fungerer bare for Soap - ikke for AltinnApi. Dette må endres, slik at AltinnApi også blir tatt hensyn til. Dette er nå fikset slik at sjekk i koden også fungerer for AltinnApi.

### Mange logginnslag ved tom cookie

Det kommer mange innslag i eventloggene i prod med "System.ArgumentException: Invalid value for 'encryptedTicket' parameter." Dette skyldes at SBS sender en tom cookie. Input valideringen må endres til å sjekke at cookie ikke er tom. Dette er nå implementert.
