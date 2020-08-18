---
title: 20.8
description: Mindre endringer og feilrettinger
weight: 60
type: releasenote
releasenote_info: Release 20.8, produksjonsettes 24. august 2020
--- 
**Dette er en kommende endring. Gjeldende endring ligger [her](../20-7).**

## Endringer i portal

### Tilgangsstyrer kan tilpasse operasjoner før en tilgangsforespørsel blir godkjent

Endringen er en videreutvikling av funksjonaliteten på “Be om tilgang” som ble lansert i [forrige release](../20-7). Denne gangen er det tilgangsstyrer som kan endre på operasjoner i en tilgangsforespørsel. Ved å toggle av og på operasjoner, vil tilgangsstyrer nå kunne endre på en forespørsel som kommer inn dersom dette er hensiktsmessig. Dersom tilgangsstyrer velger å endre på forespørselen, vil det komme en gul advarsel om at noen av operasjonene på forespørselen er endret. Selve forespørselen som ligger i databasen vil ikke bli endret, men selve delegeringen vil bli en annen.

### Endring av tekst som sendes ut til valg tilgangsstyrer i “Be om tilgang”

Teksten som sendes per e-post til tilgangsstyrer ved en nyopprettet tilgangssforespørsel er nå utbedret. Den nye teksten presiserer hvor den nye forespørselen kan behandles fra.

### Navneendring på tjenesteeier

Navn for tjenesteeier "Statens havarikommisjon for transport" er endret til "Statens havarikommisjon"

## Feilrettinger

### Varslingslisten i “Be om tilgang”

Det ble oppdaget en bug på nedtrekkslisten for valg av tilgangsstyrer som varsel om ny tilgangsforespørsel skulle sendes til. Dersom en bruker hadde to topproller i ER hvor begge hadde tilgangsstyring som barnerolle, ble denne personen listet ut to ganger i listen. Dette er nå fikset, og hver person i listen vil nå bare bli listet ut en gang.


## Feil oppsto dersom det ikke fantes noen tilgangsstyrere for hovedenheten

Det ble var en feil på “Be om tilgang” som førte til at brukeren ble møtt med gal feilmelding. Feilen oppsto da man forsøkte å hente ut tilgangsstyrere for en hovedenhet som ikke hadde noen tilgangsstyrere. Man kommer nå til riktig side. I tillegg er selve feilen for å hente ut Tilgangsstyrere nå rettet.
