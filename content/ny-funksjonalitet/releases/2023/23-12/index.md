---
title: 23.12
description: Mindre forbedringer og feilrettinger
weight: 30
type: releasenote
releasenote_info: Release 23.12. Produksjonssatt 18. desember
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal
###  QueueIT er uteglemt fra ID-Porten OIDC grensesnitt
Nå skal QueueIT integrasjonen være på plass igjen.

## Endringer i REST
###  Caching av sertifikat i Rest-API
Caching er endret fra å cache ConfigurationManager i stedet for resultatet av GetConfigurationAsync(). Sistnevnte er cachet internt i API'et i 24 timer, men cachingen ligger i ConfigurationManager objektet.

## Endringer i SBL Bridge API
### Diverse forbedringer og endringer
Introdusert ny uuid (universally unique identifier) til User og Party + diverse oppdateringer av prosedyrer.

## Feilrettinger
### Høy cpu bruk i DB prosedyre GetByExternalIdentity
Det er observert høy cpu bruk i DB prosedyre GetByExternalIdentity. Dette er utbedret med en ny indeks.
### A2 service delegation to PartyId gives 500 Internal Server error
Feil håndtering av partyid når man delegerer til en partyid medfører at man treffer en Guard siden userid ikke er fylt ut. Feilen medførte at heller ikke partyid var fylt ut så det var ingen mottaker av delegeringen. Det er nå rettet til å fylle ut riktig partyid når man delegerer til party.
### A2 service delegation duplicate right in response model when right previously delegated
Denne klarte vi ikke å reprodusere. Men vi fant en cache feil som ble rettet og som kan ha vært medvirkende årsak til feilen.

