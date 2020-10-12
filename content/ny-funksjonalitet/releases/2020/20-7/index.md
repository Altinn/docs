---
title: 20.7
description: Mindre endringer og feilrettinger.
weight: 70
type: releasenote
releasenote_info: Release 20.7, produksjonssatt 02. juli 2020
--- 

## Endringer i Portal

### Tilgangssøker får mulighet til å tilpasse operasjoner ved opprettelse i "Be om tilgang"

Denne endringen gjør det mulig for "Tilgangssøker" å tilpasse hvilke operasjoner som skal være gjeldende i forespørselen. Denne endringen gjør det også mulig å "forhåndsvelge" hvilke operasjoner som skal være valgt i det man laster siden via URL-parameter.

### Ny visning under "Andre med rettigheter"

Under "Andre med rettigheter"-panelet er det lagt til en ny visning hvor det nå er mulig å se hvem som har tilganger til en gitt tjeneste. Den nye visningen er tilgjengelig ved å velge "Tilganger" i panelet. Deretter vil man få opp en liste over de mest populære tjenestene i Altinn. Dersom den ønskede tjenesten ikke er listet, er det mulig å søke etter denne. Det vil bli foretatt et søk både av tilgjengelige og utløpte tjenester. Man har så mulighet til å klikke på en tjeneste, og alle med tilgang til den aktuelle tjenesten vil bli listet ut i alfabetisk rekkefølge.

## Endringer i Autorisasjon

### Endring i regler for når man mottar tilgang til innehaver på bakgrunn av tilganger mottatt for enkeltmannsforetak (ENK)

Det har blitt identifisert at reglene for når man automatisk får tilgang til innehaver (INNH) av ett enkeltmannsforetak (ENK) i avgiverlisten ikke har vært optimal. Reglene strenges nå inn til følgende:

- Brukeren har selv direkte mottatt regnskapsfører eller revisor rolle for enkeltmannsforetaket
- Brukeren har tilgang til enkeltmannsforetaket gjennom nøkkelrolle for organisasjon som er revisor eller regnskapsfører for enkeltmannsforetaket
- Brukeren er ansatt i organisasjon som er revisor eller regnskapsfører for enkeltmannsforetaket og har mottatt klientdelegering fra sin organisasjon hvor klienten er ett enkeltmannsforetak
- Dersom enkeltmannsforetaket er slettet gis det bare tilgang til innehaver dersom det er mindre enn 2 år siden enkeltmannsforetaket ble slettet

Dette innføres i første omgang bare i portal men vil også rulles ut i REST grensesnitt i neste omgang.

## Endringer i API

Gamle EC endepunkter er nå fjernet permanent.

## Feilrettinger

### Antall samtykker er økt

Det var tidligere en begrensning på 50 samtykker på listen som /api/serviceowner/consents returnerte. Denne grensen er nå oppjustert til 10 000.

### Blå understreking fjernet fra listen over tjenester i Be Om Tilgang

I visningspanelet "be om tilgang" hadde noen av elementene i listen over tjenester en blå understreking som dukket opp på lenker og ble mørkeblå når musepekeren var over disse (mouseover). Dette var ikke ønsket og er nå fjernet.

### Altinn Apps instanser forble ulest i meldingsboksen etter å ha åpnet elementet

Dette er nå rettet slik at den fremkommer som lest i meldingsboksen etter at instansen er åpnet.
