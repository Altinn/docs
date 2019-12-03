---
title: 18.9
description: Støtte for eIDAS autentisering, mindre forbedringer, feilrettinger m.m.
weight: 40
type: releasenote
releasenote_info: Release 18.9, produksjonssatt 17. september 2018.
---

## Endringer i portal

### Som bruker av stort aktørvalg ønsker jeg at filtreringsmulighetene er lettere tilgjengelig

Checkbokser, for å vise underenheter og slettede enheter, er nå flyttet opp over listen over tilgjengelige aktører i stort aktørvalg.

![Bilde av filtreringsvalg](Aktorvalg2.png "Filtreringsvalg er nå øverst")

## Endringer i TUL (tjenesteutvikling)

### Stoppe migrering av tjenester med ALLEA-basisrolle

ALLEA rollen fases ut. Dette vil skje gradvis gjennom flere releaser. I denne omgang implementeres det en ny metode som kalles: "under validering av tjenesten ved migrering". Dersom tjenesten har definert rollen ALLEA som rettighet, stoppes migreringen og en feilmelding vises. Feilmeldingen ber tjenesteutvikler om å fjerne denne rollen.

### Oppdatert hjelpetekst for samtykketekst-felt i TUL

Informasjonstekst i TUL er oppdatert slik at man bedre forstår at man ikke kan endre “betingelser” i samtykketekst uten å opprette en ny utgave.

## Endringer i eksterne grensesnitt

### Endring i dateFrom / dateTo-parametre i REST-API

Som bruker av REST-API ønsker jeg å kunne begrense resultatsett av Messages, etter dato for siste endret. Kall til Messages i REST-API med query-parametrene dateFrom og dateTo filtrerer nå på dato for siste endring på elementet. Dette i stedet for filtrering for dato for opprettelse.

## Diverse bugfix

### Blindeprogrammet Jaws 18 greier ikke å lese aktørvalg i Internet Explorer etter oppdateringen i mai

I Internet Explorer ble oppdatering av søk utløst ved tab-navigering i listen, noe som gjorde at det elementet man navigerte til i listen mistet fokus. Det er nå lagt til en sjekk som gjør at tab-navigering ikke trigger oppdatering av listen.

### Hjelpetekst mangler på “tillat bare engangssamtykker” i tjenesteutviklings løsningen (TUL)

Koden oppdatert slik at hjelpeteksten nå er synlig.

### Får meldingen "non-functional error" (attachmenttypename) (webservice)

Ved innsending av skjema (SubmitFormTask) med 2 eller flere vedleggstyper feilet innsendinger hvor man ikke oppgav regelnavn på vedlegg (AttachmentTypeName). Dette er nå løst ved å legge til null-sjekk.

### Søk på tvers - funksjonalitet som forsvant etter 18.8 release

Rettet en feil som gjorde det vanskelig å bruke søk på tittel som måte å avgrense resultatene av et søk på tvers.

### Forbedret ytelse for samtykke

Optimalisering av lagrede prosedyrer og nye/endrede indekser for å forbedre skalering og svartider rundt samtykke.

## Infoportal

### eGuide-funksjonalitet

Løsningen består av spørsmål og svar i en stegvis prosess for brukeren, som resulterer i en huskeliste ("har du husket") basert på svar/valg i denne prosessen. Er nå lagt ut på "Starte og drive bedrift"-delen av Informasjonsportalen.

### Lagt til favorittikon i infoportal

Favorittikon er nå lagt til i infoportal, slik at det kommer opp i nettleserfanen.
