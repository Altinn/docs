---
title: "24.12"
description: Leveransenotater for leveransen i desember 2024
type: releasenote
weight: 10
---

## Endringer i Legacy

### Endringer formidlingstjeneste
Legg til Kartverkets test-tjeneste i Broker overgangsløsning i TT02
Kartverket skal sette opp en test-tjeneste for å teste overgangsløsning for Broker.
Ref issue hos Altnn-Broker på Github: https://github.com/Altinn/altinn-broker/issues/591

## Endringer i SBL

### Added new Service owners
Ny tjenesteeier ROMSDALSHALVØYA INTERKOMMUNALE RENOVASJONSSELSKAP IKS (RIR)

### Endret lagringstid til 2 uker for slettede elementer
Endret lagringstid til 2 uker for slettede elementer

### Added support for Altinn 3 messages to the Altinn 2 messagebox
Added support for Altinn 3 messages to the Altinn 2 messagebox.
It is still work in progress, but adding pull request to be able to start testing in test environment.

Det er besluttet at det ikke skal være mulig å arkivere en A3 melding. Koden for det er derfor fjernet.
Det er fortsatt uavklart om arkiverte A2 meldinger som migreres til A3 skal vises som arkiverte.

### Functionality for HasAltinn3Messages flag
Functionality for HasAltinn3Messages flag
Check if a given party has Altinn3 Messages

### Added support for logging IPv6 address
Added support for logging IPv6 address

## Endringer i Autorisasjon

### Endre grunnoppsett for SEID2 sertifikater
For å kunne validere Seid 2.0 sertifikat må det på plass endringer i infrastrukturen

## Diverse bugfix

### Changes needed for migration of reporting services to Altinn 3
- Avoid exceptions in Altinn1PdfGenerator
- Avoid null reference exceptions in AltinFormGenerator
- Avoid exception when invoice data is empty
- Avoid exception when municipal number can't be decoded
