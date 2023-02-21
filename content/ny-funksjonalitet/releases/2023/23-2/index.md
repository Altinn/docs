---
title: 23.2
description: Mindre forbedringer og feilrettinger
weight: 190
type: releasenote
releasenote_info: Release 23.2. Produksjonssatt 20. februar
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i SBL

### Overføre etatsnavn med språkstøtte til ResourceRegistry

Batch-jobb som overfører delegation schemes fra Altinn II til Altinn Platform er utvidet med å ta med tjenesteeierens navn med språkstøtte basert på hva som er lagret i Resursfilene (db).
Dette medfører at etatsnavnet lagres pr delegation schemes fordi Altinn lagrer kun ett navn pr enhet i Enhetsregisteret. 

## Endringer i Maskinporten

### Proxy for å hente ut delegeringer av Maskinporten tilganger

Maskinporten delegation schemes vil fremover håndteres i Altinn Platform. 
I en overgangsfase vil det være behov for å kunne hente ut delegeringer fra gammelt grensesnitt. 
Det opprettes en proxy som sender kallet videre til Altinn Platform, for så å sende tilbake resultatet gjennom den gamle tjenesten.
Det er opprettet en feature toggle slik at man kan skifte dette når det er ønskelig. I tillegg er alle api kall for å vedlikeholde slike delegation schemes skrudd av.
Alle API kall på DelegationScheme kontrolleren vil nå returnere Http kode 410 Gone.

## Feilrettinger

### Feilrettinger og forbedringer av UU-feil

 - Kontaktskjema har fått autocomplete-attributt på inputfeltene navn, epost og
telefonnummer.
 - Fikset en feil i kontaktskjema som gjorde at labels ikke lenger ble forbundet med inputfelt.
 - Fjernet en rolle-attributt på lister i skjemaoversikten.
 - Fjernet <meta>-tag i header som gjorde at nettsiden automatisk oppdateres hvert 30. minutt.
 - Fikset dupliserte ID-attributter i kontaktskjema.
 - Fikset en feil hvor elementer markert med attributten role=»tab» var nøstet feil i listen med
kontaktskjema.

### Andre feilrettinger og forbedringer

 - Kontaktskjema er bedre sikret mot automatisk innsending av skjema.
 - Justerte posisjon på «til toppen»-knapp, slik at den ikke overlapper annen tekst i footer.
