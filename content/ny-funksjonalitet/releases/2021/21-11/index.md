---
title: "21.11"
description: Logging av samtykke bytter om dag og måned, mindre endringer og feilrettinger
weight: 100
type: releasenote
releasenote_info: Release 21.11. Produksjonssatt 22.11.2021 
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Inkludere DataValues fra Altinn Apps i ReporteeElementBE

DataValues fra Altinn Apps instanser er nå eksponert i ReporteeElementBE. Slik får man enklere sentral metadata om en instans uten å måtte laste ned skjema-data.

### Endringer i prioritert rekkefølge for utvandrede i postadresse fra Folkeregisteret

Den prioriterte rekkefølgen for hvilket adresse felt som skal benyttes som kontakt-adresse er endret for brukere som er utvandret 
Rekkefølgen er nå:

Postadresse,
Oppholdsadresse,
Postadresse utland,
Bostedsadresse

For alle andre en de som er utvandret er rekkefølgen som før.

### Endringer i Legacy

Det var noen scenario der det mulig å opprette skjema for "feil" avgivertype. Det er derfor nå i tillegg lagt inn en ny sjekk for avgiver type.

## Endringer i Autorisasjon

### Logging av Lookup fra REST og Lookup Link fra StartService

Autorisasjon logger ikke bruken av lenketjenester og Lookup services. Logging og en prosedyre er derfor blitt lagt til. Loggen benyttes nå for rapportering.

## Endringer i REST

### Logging av samtykke bytter om dag og måned (Del 2/2: fiks for content-type: json) - <span style="color:red"> *Breaking change*</span>

Logging av benyttet samtykke via /api/authorization/token/{authCode}/loguse byttet om måned og dag ved bruk av visse dato-formater. Denne ble rullet tilbake etter produksjons-setting av versjon 21.10. DateTime-modeller mangler tidspunkt ved bruk av Accept: application/json. Dette er nå løst ved at json sterilisering av datetime verdier i forespørsler med Accept: "application/json" eksplisitt benytter ISO-8601 format.

## Diverse bugfix

### Må bekrefte "Varslingsadresser for virksomheten" hver gang man velger virksomhet

På grunn av en feil i Altinn koden så ble man spurt om å bekrefte varslingsadresse på nytt selv om man allerede hadde bekreftet. Dette er nå rettet slik at man ikke blir spurt på nytt før etter 90 dager.

### IP adresse er null for subtype UsernameSSNMismatch

### Ved henting av Authentication challenge ble ikke IP-adressen logget. 
 
Dette er nå rettet slik at IP-adressen logges for alle subtypes

### Retting av WCAG-svakheter i Altinn II

For å forbedre WCAG støtten i Altinn 2 skjema (InfoPath) så er det laget en løsning som legger inn alt attributt på bilde i de "nye" hjelpeknappene og title attributt på de "gamle". Det er også lagt inn at navigasjons-knappene under skjema får en datafont som gjør at de blir mer synlige for svaksynte. Det er i tillegg lagt inn kode som setter tittel (html title) på hver side i skjema. Disse settes til "Sidenavn – Skjemanavn" slik at title endres etterhvert som man bytter side i skjemaet.

### Nedlasting av delegeringer til fil feilet når organisasjonen hadde aktive samtykker

Nedlasting av fil for oversikt over hvem som besitter roller og rettigheter for virksomheten under "Andre med rettigheter" panelet på profilsiden feilet dersom virksomheten samtidig hadde et eller flere aktive samtykker. Samtykker er i seg selv ikke en del av “Andre med rettigheter” panelet, og det er besluttet å utelate disse fra uttrekket. Dersom det skulle være behov for at samtykker skal inkluderes bør dette meldes inn som en ønsket endring eller utvidelse.

### Skjerm-visning ble flyttet til høyre når man klikket på blå bakgrunn

Når man var inne på siden for å bestille nytt kodebrev så beveget visningen seg litt til høyre hvis man klikket på den blå bakgrunnen. Dette er nå rettet.

### Søk på aktør med bindestrek i navnet virket ikke

Hvis man forsøkte å søke på en aktør med bindestrek i navnet så virker ikke søket. Dette er nå rettet.

### XsnUpgrade feilet for noen skjemaer

XsnUpgrade (og tilsvarende skjemaimport fra TUL) feilet hvis en xsn fil inneholdt dll med filnavn lengre enn 32 tegn. Dette er nå rettet.
