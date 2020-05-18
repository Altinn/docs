---
title: Domeneklient fra A til Å
linktitle: Domeneklient fra A til Å
description: Hvordan modellere en tjeneste i Domeneklienten fra A til Å basert på tjenesten RF-1241.
toc: true
weight: 150
---

&nbsp; 

## Utgangspunkt for A-Å løp RF-1241

Det benyttes RF-1241 - Oppgave over betaling for pass og stell av barn, skjema i Skattedirektoratet, som utgangspunkt for gjennomgangen nedenfor.

### Skjema RF-1241 i Altinn

![Figur 1](../../atilaadk-rf1241-altinn.png)

&nbsp; 
### Skjema RF-1241 papirutgave

![Figur 2](../../atilaadk-rf1241-papir.png)

&nbsp; 
## Starte Domeneklienten

Logg inn i Domeneklient. 

![Figur 4](../../atilaadk-innlogging.png)

&nbsp; 
### Åpningsbilde i Domeneklienten

For nærmere beskrivelse av åpningsbilde, se «Hjelp» i menylinjen.

![Figur 5](../../atilaadk-apningsbilde.png)

&nbsp; 
### Lag ny tjenestemodell

Høyreklikk på ønsket domene under valgt katalog (Kurs) og velg «Opprett ny tjenestemodell». I dette tilfellet ønsker vi å lage en tjenestemodell i «Kursdomene».

![Figur 6](../../atilaadk-nytjenestemodell.png)

Gi tjenestemodellen navn og klikk på «Opprett ny modell».

![Figur 7](../../atilaadk-nytjenestemodell-opprettnymodell.png)

► Tjenestemodellen opprettes og legger seg under valgt «Domene»:

![Figur 8](../../atilaadk-nytjenestemodell-nyarbeidsversjon.png)

► Nyopprettet tjenestemodell vises med navn, versjon og domene i Arbeidspanelet:

![Figur 9](../../atilaadk-arbeidspanel-tjenestemodell-arbeidsversjon.png)

&nbsp; 
## Lag grunnstruktur for skjema

### Ny tjenestemodell

Ved opprettelse av en tjenestemodell blir det automatisk opprettet en datamodell og en meldingsmodell under tjenestemodellen:

![Figur 10](../../atilaadk-meldingsmodell.png)

&nbsp; 
#### Opprett meldingsdeler (blir automatisk plassert i datamodell)

Høyreklikk på *Testmodell_RF-141_M* og velg «Ny meldingsdel».

![Figur 11](../../atilaadk-meldingsmodell-nymeldingsdel.png)

Legg inn Navn: «Innrapportør» i navnefeltet og velg «Opprett».

![Figur 12](../../atilaadk-meldingsmodell-opprettnymeldingsdel.png)

► Ny meldingsdel vises under datamodell:

![Figur 13](../../atilaadk-meldingsmodell-nymeldingsdelopprettet.png)

Vi ser at meldingsdelen er knyttet til korrekt meldingsmodell i egenskapsvinduet:

![Figur 14](../../atilaadk-meldingsmodell-knyttettilnymeldingsdel.png)

Vi må gjøre tilsvarende for meldingsdelen *InnrapporterteData*.

1. Høyreklikk på *Testmodell_RF-1241_M* og velg «Ny meldingsdel»
2. Legg inn Navn: *InnrapporterteData* i navnefeltet og velg "Opprett".

► Ny meldingsdel vises under datamodell. Nytt navn er lagt til:

![Figur 15](../../atilaadk-meldingsmodell-nymeldingsdelopprettet2.png)

I Egenskapspanelet for meldingsmodellen ser vi at det er knyttet til to meldingsdeler:

![Figur 16](../../atilaadk-meldingsmodell-knyttettilnymeldingsdel2.png)

Det kan om ønskelig legges til flere meldingsdeler (for eksempel hvis det er et stort skjema).

## Lag skjemainnhold

Datamodellen skal beskrive innholdet i skjemaet. Datamodellen består av modellelementer som tilsvarer metadata i skjemaet. Modellelementene kan opprettes fra bunnen av eller de kan være basert på gjenbrukbare strukturer.

### Lag dataobjekttype – *GenerellInformasjon*

Høyreklikk på *Testmodell_RF-1241_D* og velg «Nytt Barn» → *Dataobjekttype*.

![Figur 17](../../atilaadk-datamodell-nydataobjekttype.png)

Navngi dataobjekt *GenerellInformasjon* i egenskapsvinduet.

![Figur 18](../../atilaadk-datamodell-navnginydataobjekttype.png)

► Ny dataobjekttype vises under datamodell:

![Figur 19](../../atilaadk-datamodell-nydataobjekttypeopprettet.png)

&nbsp; 
#### Lag dataegenskap – *inntektsår* 

Høyreklikk på *GenerellInformasjon* og velg «Nytt Barn» → *Dataegenskap*.

![Figur 20](../../atilaadk-datamodell-nydataegenskap.png)

1. Navngi dataegenskap *inntektsår* i egenskapsvinduet.
2. Sett multiplisitet lik 1..1 (obligatorisk å fylle ut feltet).
3. Velg «Type» ved å klikke knappen med tre prikker til høyre, og velg dataenkeltype «År» i dialogvinduet som åpnes. Dataegenskapstypene blir hentet fra en felles datamodell, derfor blir den hetende «Delt.FellesDatamodell.År». Det samme gjelder for de andre dataegenskapstypene.

► Opprettet dataegenskap vises i egenskapsvinduet:

![Figur 21](../../atilaadk-datamodell-nydataegenskapiegenskapsvinduet.png)

&nbsp; 
#### Lag Datakodeliste - *Oppgavetype*

1. Se om det finnes en gjenbrukbar struktur (kodeliste).
2. Endre til Søk-fane i vinduet til venstre.
3. Bruk søkefeltet – skriv inn *Oppgavetype* og klikk på «Søk».

► Søkets resultat vises. Vi skal ha en kodeliste.

![Figur 22](../../atilaadk-sok-kodeliste.png)

1. Dra kodelisten *Oppgavetype* under Strukturnivå og slipp på datamodell *Testmodell_RF-1241_D*.
2. Åpne den nye Datakodelisten *Oppgavetype*.
3. Marker de uønskede datakodeelementene (alle unntatt *endringsoppgave* og *ordinæroppgave*). Hold nede CTRL-tasten for å merke flere.
4. Trykk på knappen «Delete» på tastaturet eller høyreklikk og velg «Slett».

![Figur 23](../../atilaadk-datamodell-kodelistefrastruktur.png)

► To datakodeelementer vises: *endringsoppgave* og *ordinæroppgave*. 

![Figur 24](../../atilaadk-datamodell-kodelistefrastrukturredigert.png)

Velg «Representasjon» ved å klikke knappen med tre prikker til høyre, og velg primitivtypen «string» i dialogvinduet som åpnes.

► Datakodeliste med representasjon «string» vises i egenskapsvinduet.

![Figur 25](../../atilaadk-datamodell-kodelisteiegenskapsvinduet.png)

&nbsp; 
#### Koble Datakodeliste *Oppgavetype* til dataobjektet *GenerellInformasjon*

Dra Datakodelisten *Oppgavetype* og slipp på dataobjektet *GenerellInformasjon* som vi opprettet tidligere.

► Det opprettes en ny dataegenskap. Sett multiplisiteten til 1..1 i Egenskapspanelet.

![Figur 26](../../atilaadk-datamodell-kodelistepadataobjekt.png)

&nbsp; 
### Lag dataobjekttype – *Oppgavegiver*

Dra inn Objekttypen *Enhet* fra strukturnivået til datamodellen.

![Figur 27](../../atilaadk-datamodell-objekttypefrastruktur.png)

Endre navn fra «Enhet» til «Oppgavegiver» og modellen skal nå se slik ut (typene vi har laget er markert i rød, da de ikke er transitivt (via meldingsdel og ev. flere elementer) knyttet til meldingsmodellen):

![Figur 28](../../atilaadk-datamodell-endreobjekttypefrastruktur.png)

&nbsp; 
#### Gjenbruk fra andre datamodeller

Gjenbruk fra andre datamodeller gjøres med «Dra-og-slipp». Da beholdes alle koblingene til dataenkelttyper og relasjoner til andre nivåene. Man har likevel bare en kopi av den opprinnelige slik at man kan endre den uten at originalen endres.

Dersom dataobjekttypen inneholder relasjonsegenskaper til andre dataobjekttyper, vil også disse følge med så fremt de ikke ligger i FellesDatamodell. 

### Lag dataobjekttype – *Betaler*

► [**Se Lag dataobjekttype** - *Generellinformasjon*](#lag-dataobjekttype-generellinformasjon)

### Lag dataegenskaper for dataobjekttype – *Betaler*

► [**Se Lag dataegenskap** - *inntektsår*](#lag-dataegenskap-inntektsår)

Fra en felles datamodell, i dette tilfellet *FellesDatamodell* som ligger rett under Implementasjonsnivået, kan man dra inn de ønskede dataenkelttyper. Det opprettes automatisk en dataegenskap med tilhørende dataenkelttype og multiplisitet 0..1.

![Figur 29](../../atilaadk-fellesdatamodell.png)

Dette gjøres enklest fra Søkvinduet. Fjern tidligere søk for å få opp hele domenet. Lukk begreps- og strukturnivå for å få en bedre oversikt.

Opprett følgende dataegenskaper, ved dra-og-slipp fra Søkvinduet, til dataobjekttypen *Betaler*:

![Figur 30](../../atilaadk-datamodell-dataegenskappadataobjekttype.png)

&nbsp; 
### Lag dataobjekttype – *Betalingsoversikt*

Se om det finnes en gjenbrukbar struktur (objekttyper på strukturnivå).

Søk opp objekttype *Betalingsoversikt* i Søkvinduet.

![Figur 31](../../atilaadk-sok-objekttypebetalingsoversikt.png)

Dra objekttypen *Betalingsoversikt* fra strukturnivå og slipp på datamodell *Testmodell_RF-1241_D*.

![Figur 32](../../atilaadk-datamodell-objekttypebetalingsoversiktfrastruktur.png)

Slett  dataegenskap *betaling*.

Endre navn på de andre dataegenskapene:

- *betalere* endres til *totaltAntallBetalere*
- *total* skal være *totaltPåløptBeløp*.

&nbsp; 
![Figur 33](../../atilaadk-datamodell-objekttypebetalingsoversiktendret.png)

&nbsp; 
### Lag relasjonsegenskap – *Betaler*

Dra dataobjektet *Betaler* (fra datamodellen) og slipp det på dataobjektet *Betalingsoversikt*. Det opprettes automatisk en relasjonsegenskap.

![Figur 34](../../atilaadk-datamodell-lagerelasjonsegenskap.png)

Endre multiplisitet til: 0..* (* = -1)

![Figur 35](../../atilaadk-datamodell-relasjonsegenskapiegenskapsvinduet.png)

&nbsp; 
## Koble datamodell til meldingsmodell

### Meldingsdel Innrapportør

Koble dataobjekttypen *GenerellInformasjon* til meldingsdelen *Innrapportør* med «Dra-og-slipp». Gjør det samme med *Oppgavegiver*. Sett multiplisitet til 1..1.

► Meldingsdel *Innrapportør* med relasjonsegenskaper *generellInformasjon* og *oppgavegiver*.

![Figur 36](../../atilaadk-meldingsdelinnrapportor.png)

&nbsp; 
### Meldingsdel InnrapporterteData

Koble dataobjektet *Betalingsoversikt* til meldingsdelen *InnrapporterteData* med «Dra-og-slipp». 

► Meldingsdel *InnrapporterteData* med relasjonsegenskap *betalingsoversikt*.

![Figur 37](../../atilaadk-meldingsdelinnrapportertedata.png)

Nå er datamodellen koblet til meldingsmodellen, og det er klart for å generere XSD.

## Valider tjenestemodell

Høyreklikk på tjenestemodell og velg «Valider» i menyen.

![Figur 38](../../atilaadk-tjenestemodell-valider.png)

Det kommer opp et visningsbilde som bekrefter om tjenestemodellen er gyldig. Det vil si at alle elementer som ligger under denne modellen validerer.

![Figur 38](../../atilaadk-tjenestemodell-valideringsinformasjon.png)

Dersom det er feil i en av modellene, vil det komme en beskjed om dette. Ved å dobbeltklikke på elementet i feilmeldingen flyttes visningen til der hvor feilen ligger. Rett opp og valider på nytt.

## Visualiser i nettleser

For å få en bedre oversikt over tjenesten du modellerer, kan du velge å visualisere tjenesten i en nettleser. Dette gjøres ved å høyreklikke meldingsmodellen og velge «Visualiser i nettleser»:

![Figur 39](../../atilaadk-visualiserinettleser.png)

Valgt modell åpnes i en nettleser:

![Figur 40](../../atilaadk-visualisertmodellinettleser.png)

Det er også mulig å få denne visualisering som en bildefil, da velger du «Visualiser som bildefil».

## Generer XSD

Høyreklikk Meldingsmodell og velg «Generer XSD»:

![Figur 41](../../atilaadk-genererxsd.png)

Vinduet «Hovedoppsett av generering» åpnes:

![Figur 42](../../atilaadk-xsdgenerering-s1.png)

Man trenger ikke gjøre noe annet her enn å trykke neste. Innstillingene for XSD-parametre er tilpasset tjenesteutvikling i Altinn. Dersom det er andre behov, er det mulig å justere XSD-parametre ved å huke av for dette. 

Det genereres automatisk inneværende år som Tjenesteversjon. Dette kan endres hvis det ønskes et annet årstall, for eksempel ved årsrevisjon av et gammelt skjema. 

**Neste** vil ta deg til «Lagring og publisering».

![Figur 43](../../atilaadk-xsdgenerering-s2.png)

I dette vinduet kan det velges hvilken status XSD-en skal ha når den publiseres på SERES Produktforvaltning og det kan oppgis en eller flere e-postadresser som XSD-en automatisk blir sendt til etter at den er generert. Hvis man bruker en lokal installasjon av Domeneklienten kan en i tillegg velge at den genererte xsd-en også skal lagres lokalt på egen PC.

Klikk på «Fullfør» for å generere XSD-en.

Melding fra systemet om at XSD er vellykket opplastet til SERES Produktforvaltning:

![Figur 44](../../atilaadk-xsdgenerering-status.png)

XSD-en bør nå hentes opp i Altova XMLSpy for å kontrollere at den er gyldig i henhold til XML-syntaks. XMLSpy finnes på SERES Desktop (VMware).

![Figur 45](../../atilaadk-xsdgenerering-xmlspy.png)

&nbsp; 
## Godkjenning av modeller

Når modeller i SERES endres må de godkjennes for at de skal bli publiserte versjoner. Mens modellen er under arbeid er den tilgjengelig for andre i din virksomhet. Det betyr for eksempel at ved sykdom kan en kollega ta over arbeidet. Først etter godkjenning vil modellen være tilgjengelig som en godkjent publisert versjon og den vil ikke lenger være mulig å endre.

### Tjenestemodell under arbeid

Når bruker oppretter en ny tjenestemodell får den status som arbeidsversjon. Så lenge tjenestemodellen er under arbeid vil den ikke være synlig for øvrige brukere av SERES. 

Før tjenestemodellen kan sendes til godkjenning bør den valideres og det bør sjekkes at XSD-en har riktig innhold. Etter at dette er gjort kan tjenestemodell sendes til godkjenning. Dette gjøres på følgende måte i Domeneklienten:

Høyreklikk på tjenestemodellen i Domenepanelet til venstre og velg «Godkjenn».

![Figur 46](../../atilaadk-tjenestemodell-godkjennarbeidsversjon.png)

Ved Godkjenn får man dette varselet:

![Figur 47](../../atilaadk-tjenestemodell-bekreftgodkjennarbeidsversjon.png)

&nbsp; 
### Publisert versjon

Etter at arbeidsversjonen er godkjent, blir den tilgjengelig som en publisert versjon.

![Figur 48](../../atilaadk-tjenestemodell-modellversjonpublisert.png)

&nbsp; 