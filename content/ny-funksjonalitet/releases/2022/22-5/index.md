---
title: 22.5
description: Mindre forbedringer og feilrettinger
weight: 160
type: releasenote
releasenote_info: Release 22.5. Produksjonssatt 18. mai
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Autorisasjon

### Nytt/endret rollekrav på tjenesteutgave

Dersom en tjenesteeier gjør en endring på rollekrav til en tjenesteutgave, vil det være dagens rollekrav som vil være gjeldende og gamle rollekrav vil ikke gi tilgang til tjenesten.

Tidligere var det ikke mulig å endre rollekrav uten å lage ny tjenesteutgave.

## Endringer i REST

### Feilmelding om manglende brukerprofil i Altinn

I release 22.2 ble det i REST APIet ryddet bort gamle sjekker etter profesjonelle og private samtykker til bruk av Altinn, siden disse ikke lenger er i bruk og ikke er noe brukere hverken kan gi eller trekke.
Dette har ført til at man har fått feilmeldinger om ugyldig fødselsnummer dersom brukeren ikke har vært pålogget Altinn portalen og dermed ikke har en brukerprofil i Altinn.

Dette er nå utbedret i de endepunktene på tjenesteeiers API hvor man gjør oppslag basert på fødselsnummer, med feilmelding som spesifiserer at bruker mangler brukerprofil og må ha vært pålogget i portal.

Dette er også utbedret for autentisering gjennom ID-Porten token til sluttbruker APIet, hvor det er mulig å få generert ett token for en bruker i ID-Porten uten at denne først er pålogget Altinn.

## Feilrettinger

### POST av Delegations fra en org til en EC-Bruker som hører til en annen org fungerer for 3.0 apper og ikke for 2.0 tjenester

Rettet feil som gjorde at POST av delegations har ulik oppførsel for 3.0 apper og 2.0 tjenester. 2.0 tjenester hadde en ekstra validering som sjekket at EC-bruker tilhørte samme org som brukeren som utførte delegeringen. 

Den samme sjekken er blitt lagt til for 3.0 apper.