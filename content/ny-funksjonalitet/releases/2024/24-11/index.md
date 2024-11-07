---
title: "24.11"
description: Leveransenotater for leveransen i September 2024
type: releasenote
weight: 20
---

## Endringer i Legacy
### Endringer formidlingstjeneste
Diverse oppgraderinger av standard programvare

## Endringer i SBL
### Added new Service owners
Ny tjenesteeier Hemit Helseforetak

## Endringer i Autorisasjon
### Legg til støtte for redirect etter logout dersom det finnes en altinn3 cookie
I systembruker leveranse 2 vil bruker ha mulighet til å logge på Altinn for å godkjenne en forespørsel om å lage en ny systembruker. Når bruker godkjenner denne, skal Altinn logge brukeren ut, og så redirecte til systemet (vendorsystem) som laget forespørsel om systembruker.

## Diverse bugfix

### A3 elementer er ikke tilgjengelige i A2 portal innboks
Det var en feil som gjorde at portal trafikk ble stoppet mot A3 og soap/rest slapp igjennom i stedet for omvendt. Dette gjorde at A3 elementer ikke var synlige i A2 meldingsboks. Altså antall elementer som returneres av søket er også økt fra 100 til 5000

### Fix for Infoportal søk
URL for søk i Infoportal er oppdatert til ny Infoportal info.altinn.no

### Fix for hente melding med referanse til slettet arkivert skjema
Fix for hent melding med referanse til slettet arkivert skjema. Dersom man skal hente en melding med referanse til slettet arkivert skjema vias REST api får man teknisk feil

### Changes needed for migration of reporting services to Altinn 3
Show instance delegations in activity log from migrated apps and bugfix in altinn1 pdf generator
- Added null-check in a1pdfgenerator
- Support for new properties from a3 instance events to show info about instance delegations
- Added logging of altinn.config changes

### SBLBridge uthenting av keyrole units henter ikke ut underenheter
Funnet under test av instans delegering fra Apps.

SBL Bridge API som vi bruker for å slå opp nøkkelrolle-enheter inkluderer ikke underenheter. Noe som har vært en antagelse i implementasjonen på 3.0 siden.
Dette gjelder også arv av delegeringer for Apps og Ressurser også, når disse er utført til en underenhet.

#### Steps To Reproduce
Perform delegation of App/Resource or Instance to a subunit
Authorize DAGL for subunit on behalf of the delegating party for the delegated access
  
