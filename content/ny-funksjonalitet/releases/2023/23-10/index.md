---
title: "23.10"
description: Mindre forbedringer og feilrettinger
type: releasenote
weight: 130
releasenote_info: Release 23.10. Produksjonssettes 23. oktober
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Oppdatere til korrekt lenke for endring av KRR-informasjon

Lenken til Kontakt og reservasjonsregisteret er endret.

* I prod: https://minprofil.kontaktregisteret.no/?locale=<valgt språk>
* I test: https://minprofil.test.kontaktregisteret.no/?locale=<valgt språk>

## Endringer i Autorisasjon

### Sanering av Delegation schemes i Altinn II

Delegation Schemes er flyttet fra Altinn II til Altinn 3 men de eksisterende delegation scemene og delegeringer av disse har ligget igjen i ALtinn II dette har medført et enheter som kun har delegation schemes mellom seg har dukket opp i avgiver listen men når man går inn og ser på eksisterende delegeringer så finnes det ikke noen. Dette er fordi avgiver listen ser delegeringene men de er fjernet fra visningen av eksisterende delegeringer. MEd denne oppryddingen blir dette konsistent og brukeren må gå inn på den nye fanen for API delegeringer for å se eksisterende delegeringer av denne typen.

## Endringer i REST

### Feil endepunkt i respons på https://www.altinn.no/api/serviceowner/authorization/roles

I responsen på https://www.altinn.no/api/serviceowner/authorization/roles viser vi til api/serviceowner/roledefinitions, men dette endepunktet er slått av. Responsen må oppdateres til å vise til api/metadata/roledefinitions

## Endringer i SBL Bridge API

### SBL Bridge: Rettighets delegering  status sjekk for A2 tjenester

Nytt endepunkt i Altinn Bridge der man kan etterspørre en kombinasjon av bruker, avgiver og tjeneste og få tilbake alle opperasjoner som finnes på tjenesten med informasjon om brukeren har tilgang eller ikke samt en begrunnelse på hvorfor man har eller ikke har tilgang.
	
Definerte årsaker til tilgang/ikke tilgang
* Brukeren har en ER/Altinn rolle som gir tilgang eller brukeren mangler en rolle som gir tilgang med hvilke roller det er
* Brukeren har/mangler direkte delegert rettighet/ lokal rolle som gir tilgang
* Tjenesten benytter ServiceRightRegister og avgiveren ligger der / ligger ikke der for de aktuelle opperasjonene
	
Opperasjonene er flatet ut slik at de oppgis kun en gang selv om de er definert på flere steg så man vil ikke kunne se om man har signering på første eller andre signeringsteg bare at man har signeringstilgang.

### Export av Lenke tjenester på samme format som en ResourceRegister resource

For å enkelt kunne migrere lenke tjenester til resurs registeret er det laget en Eksport funksjon som lager en ResourceRegister resurs basert på de lagrede dataene om lenketjenesten i SBL. Siden Resursregisteret endret sin data modell er denne eksporten oppdatert med den nye modellen.
	
### sblbridge/.../userdelegationcheck respons mangler attributematch for "action"

Denne spørringen returnerer en liste med RightDelegationStatus, men "action" er ikke attributematch den har bare en string dette er endret for å matche Altinn 3 sin interne modell.
 
