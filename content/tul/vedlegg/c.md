---
title: "C: Utforming av brukervennlige tjenester"
linktitle: "C: Brukervennlige tjenester"
description: Hvordan lage brukervennlige tjenester i TUL.
toc: true
weight: 3
---


Brukervennlige tjenester bidrar til at brukeren får en positiv opplevelse av tjenesten, og sikrer at alle brukere kan benytte tjenesten, samt at tjenesten kan benyttes på ulike skjermlesere.

Tjenesteutviklingsløsningen skal legge til rette for å utvikle tjenester som er konforme med WCAG 2.0-standarden på A og AA-nivå.

I WCAG 2.0 brukes fire prinsipper for tilgjengelig web-innhold:

 1. **Gjenkjennbart** – informasjon og brukergrensesnitt må presenteres på måter brukerne kan oppfatte.
 2. **Anvendelig** – brukergrensesnitt og navigasjon må fungere for alle brukere.
 3. **Forståelig** – tekstinnhold må være lesbart og forståelig.
 4. **Robust** – innhold må kunne presenteres på ulike agenter, inkludert hjelpemiddelteknologi.

Tjenesteutvikler bør etterstrebe å lage innhold som følger disse prinsippene. Det er viktig for tjenesteutvikler å sørge for at språket er
godt og forståelig. I tillegg bør eventuelle bilder ha beskrivende tekster.

Skal en tjenesteeier utvikle stilark for bruk ved portaluavhengighet, må det sørges for at stilarkene er konforme med WCAG-krav. Det er
viktig at stilark som lastes opp er gyldig CSS som validerer mot CSS 2.1-standarden. Dette valideres ikke av TUL men kan enkelt gjøres med
en ekstern CSS-validator av den som har laget stilarket.

Alle offentlige nettskjemaer for innsendingstjenester skal følge ELMER 2-retningslinjene. ELMER er vedtatt som retningslinjer for
brukergrensesnitt i offentlige skjemaer på Internett og skal sikre bedre skjemaer, bedre datakvalitet og raskere saksbehandling.

Ved å benytte InfoPath og påfølgende parametersetting i TUL kan tjenesteutvikler utvikle ELMER-skjema. Altinn II støtter ELMER
2-retningslinjene, med unntak av:

  - Utsatt visning av feil/mangler ved kryssvalidering og obligatoriske felt (alle meldinger knyttet til feltvalidering vises fortløpende i
    informasjonsområdet og deretter på kontrollside, som ved feil utfylling av enkeltfelt).
  - Separate tabellsider i full skjermbredde i skjema som for øvrig benytter ELMER-navigasjon.
  - Hjelpetekst med lenker som leder til andre steder i skjemaet.
  - Gruppering av sider i navigasjonsmenyen med kapitteloverskrifter.

Det vil være mindre unntak mht. nøyaktig hvordan informasjon blir presentert for sluttbruker. For eksempel sier ELMER at bruker kan fjerne
fremhentet hjelpetekst ved å klikke på Hjelp-knappen på nytt. I Altinn vil bruker i stedet kunne fjerne hjelpeteksten ved å klikke på et
x-symbol ved teksten i informasjonsområdet.

Siden ELMER 2-retningslinjene fokuserer på enkeltskjema, mens Altinn II også håndterer skjemasett, er det også gjort enkelte justeringer i
sideflyten rundt kontroll og innsending i forhold til retningslinjene.

For innsynstjenester er det utviklet tre eksempelskjema som er tenkt benyttet som utgangspunkt for utforming av brukergrensesnitt­et, basert
på tre ulike interaksjonsmønstre. Skjemaene er ikke ment å bli brukt som gjenbrukbare eksempler eller maler for utvikling av en
innsynstjeneste. De er utviklet med fokus på interaksjon og layout som sluttbruker vil se i SBL. Funksjonaliteten og arkitekturen bak, som
er nødvendig for at en innsynstjeneste skal virke, er ikke med i disse eksemplene.

Skjemaene er tilgjengeliggjort i dokumentbiblioteket på startsiden. De er kalt *Lookup single view*, *Lookup left menu* og *Lookup
accordion* for å gjenspeile layouten på skjemaene.

*Lookup single view* består av kun et view (en side), og har et område for header/tittel på toppen, et område for input av data (dette kan
sløyfes) og et område for selve resultate av innsynstjenesten (output).

![Figur 192 – Lookup single view](/docs/images/guides/tul/lookup-single-view.png "Figur 192 – Lookup single view")

*Lookup left menu* består av flere views(sider) og en venstremeny der brukeren kan navigere mellom de ulike sidene. Dette eksempelskjemaet
har også et et område for header/tittel på toppen. Området for selve resultatet av innsynstjenesten (output) er i midten av siden. Hva som
vises her avhenger av hvilken side som er valgt i venstremenyen.

![Figur 193 – Lookup left menu](/docs/images/guides/tul/lookup-left-view.png "Figur 193 – Lookup left menu")

*Lookup accordion* består av kun et view (en side), og har et område for header/tittel på toppen. Under header-området er området for selve
resultatet av innsynstjenesten (output), og det er bygd opp med en rekke områder som kan ekspanderes og trekkes sammen ved å klikke på
pluss- og miustegn.

![Figur 194 – Lookup accordion](/docs/images/guides/tul/lookup-accordion.png "Figur 194 – Lookup accordion")

## Retningslinjer for utforming av innsendingstjenester

TUL støtter ELMER for innsendingstjenester ved at tjenesteutvikler kan angi om skjemaet skal presenteres i sluttbrukerløsningen i henhold
til ELMER-retningslinjene. I følge ELMER skal skjemasiden være delt i tre områder ved siden av hverandre. Alle ordinære sider i skjemaet
består av et utfyllingsområde for selve skjemaet med et navigasjonsområde til venstre og et område for selvvalgt tilleggsinformasjon til
høyre. I tillegg skal det være en knapperad med navigasjonsknapper under skjemaet.

Selve skjemaet bygges i InfoPath og lastes opp på en tjenesteutgaves arbeidsflate i TUL. I skjemadelen presenteres svarfelter som skal
fylles ut av sluttbrukeren sammen med ledetekster og eventuelle hjelpeikoner.

Navigasjonsområdet vil ved bruk av ELMER bli plassert til venstre for selve utfyllingsområdet. Navigasjonsområdet er en meny bygget opp av
alle sidene i skjemaet. Skjemaet bør gis forståelige sidenavn som beskriver den enkelte sides temaer. Sidenavnet som skal vises i
menyteksten kan være et forenklet kortnavn. Kortnavn kan defineres i parameterseksjonen *Sideegenskaper* i TUL.

Tjenesteutvikler kan også angi om navigasjonen skal være fri eller styrt. Bruk av ELMER med fri navigasjon er satt som default valg i TUL,
og anbefales. Kun i spesielle tilfeller kan det være hensiktsmessig å velge styrt navigasjon, som for eksempel hvis det er nødvendig å lede
sluttbrukeren gjennom et bestemt resonnement.

Når skjemaet åpnes første gang, vil området for tilleggsinformasjon presentere en standardisert oppskrift på hvordan skjemaet skal brukes.
Området kan også inneholde meldinger fra systemet eller hjelpetekster. Disse dukker opp ved validering av skjema eller når bruker klikker på
et hjelpeikon. Hensikten er å kunne gi individuell støtte for utfyllingen uten å forstyrre selve utfyllingsområdet. Hjelpetekstene defineres
i parameterseksjonen *Hjelpetekster* i TUL. Meldinger til sluttbruker angis i InfoPath (se 6.1.3 Valideringer).

I følge ELMER skal nettskjemaer benytte svaravhengige spørsmål og sporvalg. Svaravhengige spørsmål defineres i InfoPath, mens sporvalg
defineres i TUL, under parameterseksjonen *Sporvalg*.

ELMER anbefaler at kjente opplysninger forhåndsutfylles hvis det vil være til hjelp for sluttbrukeren (utfylleren). Under parameterseksjonen
*Preutfylling* i TUL kan tjenesteutvikler forhåndsutfylle data fra *Det sentrale folkeregister, Enhetsregisteret* og *Register over
deltakerlignede selskap.*

I noen skjemaer kan det være nyttig for brukeren å få en oppsummering av tallstørrelser fra utfylte sider. Hvis det finnes et slikt
sammendrag, skal det i følge ELMER presenteres alene på siste side i skjema og hete *Sammendrag*. Når sluttbrukeren er ferdig med å fylle ut
et nettskjema, er det dessuten viktig at han får en klar og tydelig tilbakemelding om at skjemaet er sendt inn. Etter å ha fylt ut et skjema
vil sluttbruker bli sendt til en egen kvitteringsside med kvitteringstekst, en oversikt over innsendte skjema og et sammendrag av det
enkelte skjema, samt betalingsinformasjon der dette er aktuelt. Hvilke felter som skal med i sammendraget defineres i InfoPath, men i
parameterseksjonen *Sideegenskaper* i TUL må det defineres hvilkne sider i InfoPath-dokumentet som skal brukes til sammendraget.
