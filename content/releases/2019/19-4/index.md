---
title: 19.4
description: Feilrettinger
weight: 90
type: releasenote
releasenote_info: Release 19.4, produksjonssettes 11. april 2019
---
{{% notice info %}}
Dette er en fremtidig versjon av Altinn. Se [19.3](../19-3) for siste versjon i produksjon.
{{% /notice %}}
***
Denne releasen inneholder tekniske feilrettinger og forbedringer som ikke vil påvirke løsningen funksjonelt. Forhold som kan påvirke brukere vises under

### ReporteeArchiveExternalStreamed external WS hadde feil operasjoner

Tjenesten implementerte feil grensesnitt og eksponerte ikke de riktige operasjonene. Feilen kom av at tjenestedefinisjonen refererte til feil tjenesteimplementasjon. Feilen er nå rettet.

### Konfigurasjon WCFSecurity for DownloadQueueEC var feil

DownloadQueueEC brukte ikke virksomhetsertifikat for autentisering av to av endepunktene. WCFSecurity config fil er oppdatert med riktig autentiserings policy for alle operasjoner i tjenesten.

### Lukk-knapp på eGuide oppsummeringsside var ikke oversatt

Lukke-knapp på eGuide oppsummeringssiden var ikke oversatt til engelsk. Nå rettet ved å legge til riktig oversettelse på engelsk språk.

### Hvit stolpe på toppen av hurtighjelp

Fjernet mellomrom mellom innhold og topp på hurtighjelp