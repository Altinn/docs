---
title: 17.2
description: Nytt design, ny innboks, ny infoportal, nytt søk, papirkurv, klientdelegering, tilpasset hjelp, designsystem, +++
type: releasenote
releasenote_info: Release 17.2, produksjonssatt 14. november 2017.
weight: 200
---


Dette er en **stor** release, som først og fremst handler om innføring av [nytt design].  
Noe funksjonalitet som var lite brukt er dessuten [fjernet](#funksjonalitet-som-forsvinner),
og det er fortsatt enkelte områder som ennå [ikke har fått nytt design.](#noe-har-fortsatt-gammelt-design)



## Enklere å velge hvem du representerer
Det er laget ny side for valg av hvem man representerer ved pålogging.
I tillegg er det laget en ny funksjonalitet fra toppmenyen for å kunne bytte hvem du representerer etter pålogging.

Dette er tilgjengelig uansett hvor du står etter å ha logget på. På den nye siden er det tydeligere hvilket foretak en underenhet hører til.

![Valg av hvem du representerer](velg-avgiver.png "Valg av hvem du representerer")



## Ny innboks

### Grunnleggende forbedringer

Den [nye innboksen] har en rekke forbedringer fra dagens løsning, blant annet:

- Responsivt design som støtter store og små skjermer.
- Skjema og meldinger grupperes slik at de mest relevante kommer øverst.
- Tydeligere informasjon om hva som er status/neste steg, som for eksempel "til signering" eller "til betaling".
- Utseende er tilpasset hvem man representerer - "enklere" utseende på innboks for privatpersoner.

![Bilde av innboks for privatpersoner](innboks.png "Ny innboks - for privatpersoner")

![Bilde av innboks for virksomheter](innboks-virksomhet.png "Ny innboks - for virksomheter")

### Ekspandert (inline) visning

Meldinger vil nå kunne åpnes direkte (ekspandert) i innboksen, som en utvidet visning av meldingen.
Det blir som tidligere mulig å videresende melding på epost, men Altinn inneholder nå informasjon om at dette er gjort.

![Bilde av ekspandert element i innboksen](innboks-inline.png "Ekspandert visning av element")

### Ny aktivitetslogg

Det er utviklet en ny og bedre aktivitetslogg for meldinger og skjema, som viser tydeligere hvem som har gjort hva.

![Bilde av aktivitetslogg](aktivitetslogg.png "Aktivitetslogg")

### Papirkurv for privatpersoner og virksomheter

Det har tidligere kun vært mulig å slette elementer i innboks for privatpersoner.
Nå har vi laget en papirkurv som gir både private og virksomheter mulighet til å slette tjenester i innboks eller arkiv.
Meldinger som kastes i papirkurven kan gjenopprettes (flyttes tilbake til innboks eller arkiv).

For privatpersoner er det også mulig å slette elementer permanent fra papirkurven.
For virksomheter vil elementer lagt i papirkurv automatisk fjernes etter en gitt periode.

![Bilde av side for papirkurv i Altinn](papirkurv.png "Tom papirkurv")

### Nytt søk i innboks
Grensesnitt for søk er forenklet. I første omgang er det kun mulig å søke på tittelen på meldingen eller skjemaet,
og å begrense treffene til en bestemt periode eller status. Det er mulig å lagre søkene man gjør, slik at de lett kan gjentas.

![Bilde av søk i innboks](innboks-søk.png "Søk i innboks")

### Separat arkiv
Det er opprettet en egen boks for arkiverte meldinger. Meldinger som er arkivert vil ikke synes i innboksen.

![Bilde av arkiv-siden](arkiv.png "Ny side for arkiverte elementer")



## Hjelp tilpasset det du holder på med
I hele Altinn ligger det nå et hjelpeikon nederst i høyre hjørne.  
Ved å trykke på ikonet, får man opp hjelpeinnhold som skal være tilpasset hvor man er og hva man har klikket på.

![Bilde av hjelp](hjelp-ekspandert.png "Hjelp ekspandert")


## Nye sider for klientdelegering
Det er nå enklere for regnskapsfører og revisor å delegere rettigheter til ansatte for klienter.
Det er innført [nye klientdelegeringssider] for å gi en ansatt tilganger for flere klienter, og for å gi flere ansatte tilganger for en klient.


## Synlige samtykker
Det er laget et eget panel under "Profil" i portalen som viser [hvilke samtykker man har gitt].
Det kommer også en logg som viser bruken av samtykket.



## Ny informasjonsportal
Alle sider i [Altinn](https://www.altinn.no) som man kan nå uten å logge inn har fått nytt design.

Det nye designet er responsivt, det vil si at utseendet på siden tilpasser seg størrelsen på skjermen man bruker.
Vi gjør også strengere prioriteringer i hvilket innhold alle skal se.
Det vil være lettere å finne det mange trenger, uten at det noen få trenger har forsvunnet.

![Bilde av forsiden til altinn.no](forsiden.png "Ny Altinn forside")

### Ny skjemaoversikt

For å finne fram til riktig skjema, har vi forenklet [oversikten over skjema og tjenester].
Det vil være tre veier til skjemainformasjonen, via nye kategorier, via etat og via søk.

![Bilde av side for ny skjemaoversikt](alle-skjema.png "Ny skjemaoversikt")

### Bedre innhold under "Starte og drive bedrift"

Informasjonssidene om [hvordan man starter og driver bedrift] har fått en enklere struktur, med færre klikk før man kommer til innholdet.
Vi har også gjort en rekke språklige forenklinger og forbedringer.

![Bilde av siden for starte og drive bedrift](starte-og-drive.png "Starte og drive bedrift")


### Ny søkeløsning i informasjonsportal
Å finne informasjon med den gamle søkeløsningen på altinn.no kunne være frustrerende.
Vi har derfor lagd en helt ny søkeløsning, basert på [ElasticSearch], som gir mer relevante treff [når man søker](https://altinn.no/sok/).
Det er også tydeligere i søkeresultatet hva slags informasjon man har funnet.

Løsningen for søk vil etter hvert [deles som åpen kildekode] på GitHub.

![Bilde av søkeresultat i Altinn](elastic-search.png?width=700 "Ny løsning for søk")



## Funksjonalitet som forsvinner
Ikke all funksjonalitet vi lanserer i Altinn slår dessverre like godt an hos brukerne... :disappointed:  
I forbindelse med overgangen til nytt design, har vi derfor valgt å kutte ut et par funksjoner som var **svært** lite brukt:

- Samlesider for å gruppere sammen elementer i innboks
- Mulighet å nekte brukere innsyn på instansnivå


## Noe har fortsatt gammelt design
Ikke alt får nytt design i 17.2.
Utfylling av skjema vil se ut og oppføre seg som før, og vil ikke kunne oppdateres før [tjenester 3.0] er realisert.

Det er også et par funksjonaliteter i innboksen som man inntil videre må bruke gammel meldingsboks for å få:

- Søk på tvers av mange aktører
- Delegering på instansnivå


[nytt design]: https://altinn.github.io/designsystem-styleguide/
[nye innboksen]: https://altinn.no/nyheter/hva-er-nytt-i-den-siste-versjonen-av-altinn/nytt-design-for-din-innboks/
[oversikten over skjema og tjenester]: https://www.altinn.no/skjemaoversikt/
[hvordan man starter og driver bedrift]: https://www.altinn.no/starte-og-drive/
[ElasticSearch]: https://www.elastic.co/products/elasticsearch
[deles som åpen kildekode]: https://www.digi.no/artikler/altinn-vil-dele-sokelosning-i-apen-kildekode-kommer-snart-pa-github/412083
[nye klientdelegeringssider]: https://altinn.no/nyheter/hva-er-nytt-i-den-siste-versjonen-av-altinn/nye-klientdelegeringssider/
[tjenester 3.0]: /docs/altinncore/
[hvilke samtykker man har gitt]: /docs/guides/samtykke/sluttbruker/aktivitetslogg/