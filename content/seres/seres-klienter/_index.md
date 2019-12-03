---
title: SERES-klienter
description: Metadata lagres i SERES Repository som er basert på det kommersielle produktet Adaptive Metadata Manager (AMM). Metadataene blir lagret her med en SERES-spesifikk struktur (SERES Metamodell). 
weight: 20
---

Brukere produserer metadata samt utveksler metadata med repository ved hjelp av et antall klienter med individuelle bruksområder:

- Administrasjonsklient er en web-klient for administrasjon av brukere, kataloger og miljøer i SERES Repository. Opplysningene brukes av Domeneklienten for autentisering og autorisasjon av brukere, og for visning av oversikten over tilgjengelige kataloger.
- Domeneklient er en innsyns- og modelleringsklient for SERES Repository som kan jobbe med alle metadataelementene i et domene. Klienten som utvikles lokalt er basert på Standard Widget Toolkit (SWT) for GUI-utforming, og i likhet med andre SERES-klienter, et Modell-API for kommunikasjon med repository. Det er så langt bare generert versjoner for kjøring i Windows.
Brukere av klienten har lesetilgang til alle domener og mulighet for redigering i domener der vedkommende er gitt skrivetilgang. Denne klienten kan kjøre lokalt på brukerens PC eller via SERES Desktop som er en virtuell datamaskin på løsningen VMware Horizon Client.
- Produktforvaltning for nedlasting av XSD-er som er generert og opplastet fra Domeneklienten.

## Lenker til SERES-klienter
### Produksjonsmiljøet
- [SERES Desktop](https://altinnett.brreg.no/no/Emner/SERES/SERES-Klientlenker/SERES-Desktop/) (Domeneklient kjørt fra virtuelt PC-skrivebord)
- [SERES Administrasjonsklient](https://brukeradmin.seres.no/) (Administrasjon av brukere, kataloger m.m)
- [SERES Produktforvaltning](https://app.seres.no/forvaltning) (Forvaltning av XSD-er)

### Kursmiljøet
- [SERES Produktforvaltning](https://app-kurs.seres.no/forvaltning) (XSD-er)

### Dokumentasjon
- [SERES Dokumentsenter](https://samarbeid.brreg.no/seres)

{{% children description="true" %}}