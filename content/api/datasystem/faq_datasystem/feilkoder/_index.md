---
title: Feilkoder og feilmeldinger
description: Spørsmål og svar som gjelder feilkoder og feilmeldinger
weight: 400
toc: true
---

***
## _Hva betyr 'ValidationFailed' som jeg får i asynkron kvittering?_

Eksempel på feilmelding:
«Error Merverdiavgift-datadef-10098 only integers allowed»
 
**Svar:** 
Skjemaet validerer ikke i henhold til spesifikasjonen. I dette eksempelet ser vi at det er feltet «Merverdiavgift-datadef-10098» som er galt. Se hva verdien i dette elementet er, og sjekk XSD-spesifikasjonen for hvilke restriksjoner som gjelder for dette elementet.
 
NB! Dette er den absolutt vanligste feilen og gjelder validering på payload.

***

## _Jeg får beskjed om at skjemaet ikke finnes?_

Feilmeldingskode: «Rejected». 

Tekst: «There exist no valid services with given service code/edition code»

**Svar:** Skjemaet/tjenesten er ikke tilgjengelig i dette miljøet. Kontakt tjenesteeier om du forventer noe annet. Du kan også sjekke om tjenesten er tilgjengelig i miljøet ved å bruke det åpne metadata REST-apiet som viser alle tjenester i hhv. produksjons- og testmiljø:  
PROD: https://altinn.no/api/metadata  
TT02: https://tt02.altinn.no/api/metadata
***