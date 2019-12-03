---
title: 19.4
description: Denne releasen inneholder tekniske feilrettinger og forbedringer som ikke vil påvirke løsningen funksjonelt. Forhold som kan påvirke brukere vises under.
weight: 90
type: releasenote
releasenote_info: Release 19.4, produksjonssatt 11. april 2019
---

## Feilrettinger

### Delegering av rettigheter med virksomhetsbruker
Det var mulig å delegere rettigheter for virksomhet A til en virksomhetsbruker i virksomhet B.
Dette var mulig siden det måtte eksistere  et forhold mellom virksomhetene A og B som inkluderte både klientadministrering og tilgangsstyring. Tilgangsstyring er fjernet fra sjekken.
Det er fortsatt mulig å delegere rettigheter til en annens virksomhetsbruker hvis det er delegert klientadministrering til virksomheten. 

### Lukk-knapp på eGuide oppsummeringsside var ikke oversatt

Lukke-knapp på eGuide oppsummeringssiden var ikke oversatt til engelsk. Nå rettet ved å legge til riktig oversettelse på engelsk språk.

### Hvit stolpe på toppen av hurtighjelp

Fjernet mellomrom mellom innhold og topp på hurtighjelp
