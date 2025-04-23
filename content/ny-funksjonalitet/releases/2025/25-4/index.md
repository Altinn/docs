---
title: 25.4
description: Mindre forbedringer og feilrettinger
weight: 120
type: releasenote
releasenote_info: Release 25.4. Produksjonssettes 22. April
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i SBL
### Nytt navn på autentiseringscookie
For å unngå sammenblanding av cookies i TT02 og Prod har cookie .ASPXAUTH endret navn.
- TT02: .AspxAuthTT02
- Prod: .AspxAuthProd
- AT2x: .AspxAuthCloud

De som evt. forholder seg til denne cookien programmatisk, må oppdatere koden sin i henhold til dette.

### Ny tjenesteeier Nordre Follo Kommune
Ny tjenesteeier Nordre Follo Kommune

### A3 messages forwarding event i history
Lagt til støtte for A3 messages forwarding event i history

## Diverse bugfix
- Unngå ID-Porten loop, det har i lang tid vært observert ID-Porten loops i loggene.
- Manglende tekstressurser for tilgangsstyring
- Unngå at SFS kommer inn i en tilstand der den permanent feiler