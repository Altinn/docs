---
title: SERES-klienter
description: Metadata lagres i SERES Repository som er et internutviklet repository basert på det åpne kildekodeproduktet Elasticsearch. Metadataene blir lagret som en XMI og et modell-API serialiserer og deserialiserer filen slik at den har en SERES-spesifikk struktur (SERES Metamodell). 
weight: 20
---

Brukere produserer og forvalter metadata ved hjelp av tre klienter med forskjellige bruksområder:

- [Administrasjonsklient](../brukerveiledninger/administrasjonsklient/#innledning) er en webklient for administrasjon av brukere, kataloger og miljøer i SERES Repository. Opplysningene brukes av Domeneklienten for autentisering og autorisasjon av brukere, og for visning av oversikten over tilgjengelige kataloger.
- [Domeneklient](../brukerveiledninger/domeneklient/#innledning) er en innsyns- og modelleringsklient for SERES Repository som kan jobbe med alle metadataelementene i et domene. Den lokalt utviklede klienten er basert på Standard Widget Toolkit (SWT) for GUI-utforming og bruker et Modell-API for kommunikasjon med repository. Det er så langt bare generert versjoner for kjøring i Windows.
Brukere av klienten har lesetilgang til alle domener og mulighet for redigering i domener der vedkommende er gitt skrivetilgang. Denne klienten kan kjøre [lokalt på brukerens PC](../brukerveiledninger/domeneklient-installasjon/) eller via [SERES Desktop](../brukerveiledninger/domeneklient-via-vmware/) som er en virtuell datamaskin på løsningen VMware Horizon Client.
- [Produktforvaltning](../brukerveiledninger/produktforvaltning/#innledning) er en webklient for nedlasting av XSD-er som er generert og opplastet fra Domeneklienten.

## Lenker til SERES-klienter
### Produksjonsmiljøet

- [SERES Administrasjonsklient](https://brukeradmin.seres.no/) (Administrasjon av brukere, kataloger m.m)
- [SERES Produktforvaltning](https://app.seres.no/forvaltning) (Forvaltning av XSD-er)

### Kursmiljøet

- [SERES Produktforvaltning](https://app-kurs.seres.no/forvaltning) (XSD-er)

### Dokumentasjon

- [SERES Brukerveiledninger](https://altinn.github.io/docs/seres/brukerveiledninger/)

{{% children description="true" %}}
