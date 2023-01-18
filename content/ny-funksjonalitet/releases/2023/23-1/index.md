---
title: 23.1
description: Mindre forbedringer og feilrettinger
weight: 200
type: releasenote
releasenote_info: Release 23.1. Produksjonssettes 23. januar
---
**Dette er en kommende endring. Gjeldende endring ligger [her](https://altinn.github.io/docs/ny-funksjonalitet/releases/2022/22-12/).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Infoportal

### Lenke til tilgjengelighetserklæring

Lenke til tilgjengelighetserklæring kan nå legges til i footer gjennom Episerver-grensesnittet. Feltet
for lenken ligger på startsiden, under fanen ‘Meny’.

### Script for Siteimprove

Det er lagt inn en script-tag for SiteImprove Analytics på infoportalen.

## Feilrettinger

### Feilrettinger og forbedringer av UU-feil

- Iframe-tags som benyttes på infoportalen har fått title-attributt, slik at de er mer beskrivende for brukere med skjermleser
- Rettet opp en feil i hurtighjelpsmenyen hvor det manglet en <label>-tag
- Rettet opp en feil i hurtighjelpsmenyen hvor en <label>-tag hadde feil nøkkelord når den hentet tekst fra server.
- Rettet opp en feil i hurtighjelpsmenyen hvor det forekom tastaturfeller i form av fokus på html-elementer som ikke er synlig
- Rettet opp en feil i hurtighjelpsmenyen hvor innhold forsvant fra visningen når man forstørret siden til 400%.
- Rettet opp en feil i skjemaoversikten hvor bruker ikke kunne navigere mellom radioknapper ved bruk av piltastene. 
- Rettet opp en feil i skjemaoversikten hvor fokus flyttes vekk fra radioknapper etter at bruker velger et av alternativene
- Rettet opp flere feil hvor -tags ikke hadde alt-attributter
- Rettet opp flere feil på skjemainnsendingen «kontakt oss»:
  - Alle inputfelt har nå riktig type-attributt slik at autoutfylling blir lettere og brukere med skjermleser lettere kan forstå formålet.
  - Alle inputfelt har fått name-attributt.
  - Alle inputfelt som behøver det har fått placeholder-tekst på de tilgjengelige språkene.
  - Alle inputfelt som behøver det har fått forbedret inputvalidering på klientsiden. Dersom valideringen feiler, er det lagt inn en forklarende tekst på hvordan brukeren kan fikse feilen.
- Rettet opp diverse språkfeil på infoportalen:
  - Dersom tekstlig innhold er på et annet språk enn brukerens valgte språk, vil htmlelementet markeres med en lang-attributt. Dette er lagt til for nyhetsartikler på
startsiden og i skjemaoversikten.
- Rettet opp en feil hvor fokus på noen lenker i toppmenyen og knappen for
hurtighjelpsmenyen ikke er synlig nok.

### Høyt cpu forbruk i prod DB på prosedyre REG_Party_GetParentsForUnitList_SELECT

Følgende er utbedret:
- Unngå kall til REG_Party_GetParentsForUnitList_SELECT ved at orgnr for parent unit påføres når man populerer avgiverliste, slik at man slipper å hente parent unit orgnummer i etterkant.
- Endret indeks for å optimalisere REG_Party_GetParentsForUnitList_SELECT



