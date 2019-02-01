---
title: 19.2
description: Mindre forbedringer, feilrettinger m.m.
weight: 110
type: releasenote
releasenote_info: Release 19.2, produksjonssettes 04. februar 2019
---
{{% notice info %}}
Dette er en fremtidig versjon av Altinn. Se [19.1](../19-1) for siste versjon i produksjon.
{{% /notice %}}
***

## Endringer i Portal

### Hovedenheten er ikke lenger klikkbar i lite aktørvalg hvis man bare har tilgang til underenhet

Tidligere var det mulig å klikke på hovedenheten som man ikke hadde tilgang til, noe som medførte at man kom til en side med en 403 feilmelding.
Denne endringen fjernet muligheten for å klikke på en hovedenhet som man ikke har tilgang til via den lille avgiverlisten (i header). Dette gjør at aktørlisten i header har lik oppførsel som i den store aktørlisten.
{{<figure src="underenhet.png?width=600" title="Klikk på bildet for større utgave">}}

## Endringer i REST API

## Individuelle skjema i PDF

Tidligere lagret Altinn hele skjemasett i PDF formatet. Nå er de separert ut slik at man eksempelvis kan hente ned kun ett underskjema.

## Andre endringer

## Utsending av varsel til organisasjoner vil kreve tjenesteinformasjon for å sende varsel til personer rundt organisasjonen

Dette er en endring i logikken som identifiserer de som skal ha varsel når tjenesteeier ønsker å sende varsel til en organisasjon. Endringen innebærer at de som har registrert personlig kontaktinformasjon for virksomheten ikke vil bli sendt varsel hvis tjenesteeier ikke oppgir tjenesteinformasjon: ServiceCode og ServiceEdition.
Tjenesteinformasjonen brukes til å autorisere hver enkelt person slik at det kun er de med leserettigheter på tjenesten som får varsel. Hvis det ikke blir oppgitt noe tjenesteinformasjon kan ikke Altinn autorisere tilgang og derfor heller ikke sende varsel. I praksis gjelder denne endringen kun tjenesten for å sende uavhengig varsel SendStandAloneNotification. De andre tjenestene med varsel mekanismer har tjenesteinformasjon som obligatorisk input. I tidligere versjoner ville alle bli varslet.

## Maskering av fødselsnummer i kvitteringer og varsler sendt pr e-post og SMS

Samtlige meldinger som blir sendt fra løsningen blir nå scannet for fødselsnummer og de siste fem sifrene sladdes før SMS eller e-post sendes ut.

## Diverse bugfix

### IncludeInactiveReporetees-flagget fungerte ikke for underenheter via REST

Feilen gikk ut på at dersom man ønsket å hente ut avgiverlisten via REST, men ikke ønsket å se inaktive enheter. Filtreringen av inaktive hovedenheter fungerte som tiltenkt, men ved inaktive underenheter ble ikke filtreringen gjort slik som man ønsket. Denne feilen ble løst i sammenheng med  story 27794 hvor en tar i bruk den nye metoden i RegisterER for å hente informasjon om ParentOrganizationNumber istedenfor å bruke en hierarkisk liste som henter ut dette.