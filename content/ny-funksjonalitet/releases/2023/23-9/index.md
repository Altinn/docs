---
title: 23.9
description: Mindre forbedringer og feilrettinger
weight: 140
type: releasenote
releasenote_info: Release 23.9. Produksjonssettes 18. september
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Requesten som sendes til Buypass endres fra SHA-1 til SHA-2 256 bit hash
Buypass støtter ikke lenger SHA-1 i signerings requester og derfor har Altinn endret sine requester slik at dette fortsatt skal virke. Detaljer fra Buypass: [SHA-256 change information](https://buypassdev.atlassian.net/wiki/spaces/DEVSPACE/pages/2908291564/SHA-256+som+hashalgoritme+ved+signering) og [implementation example](https://buypassdev.atlassian.net/wiki/spaces/DEVSPACE/pages/2908291528/IPS-PKI+signering+med+IPS-Bx#SignaturFormat-BPESIG0301---SEID-SDO-Basic)

Hash algoritme er endret fra SHA-1 til SHA-2 256 samt at en av elementene er endret til å spesifisere hash algoritme.

## Endringer i SBL

### Bugfiks av logging av feil i EndUser system Autentisering
Tidligere har feil under Autentisering av EndUser system (for eksempel ved Låst bruker eller feil passord) har feilen blitt logget i Altinn Logg som en AgencySystemAuthenticationException som kan medføre forvirring når man analyserer logger.
Vi har endret dette til å logge feilen som en EndUserSystemAuthenticationException.
