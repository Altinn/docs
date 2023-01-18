---
title: "22.11"
description: Mindre forbedringer og feilrettinger
weight: 100
type: releasenote
releasenote_info: Release 22.11. Produksjonssatt  21. november
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i SBL

### Ny versjonering av SendStandaloneNotification og InsertCorrespondence til å takle ny TransportType PriorityEmailSMSReminder på varsler

Varsler skal nå kunne leveres med endepunkter med TransportType PriorityEmailSMSReminder. InsertCorrespondence og SendStandaloneNotification har fått nye versjonerte metoder som tar imot den nye TransportTypen. CorrespondenceBatch tar også imot ny TransportType.

## Feilrettinger

### UnitStatus for virksomheter eksponeres ikke fra SBL Bridge

UnitStatus for virksomheter blir ikke lenger eksponert i SBL Bridge Denne feilen har ført til at applikasjonsutvikelre ikke har hatt dette feltet tilgjengelig. Ved å på ny eksponere feltet i SBL Bridge vil propertyen videre eksponeres i Platform Register og være tilgjengelig for applikasjonsutviklere.

