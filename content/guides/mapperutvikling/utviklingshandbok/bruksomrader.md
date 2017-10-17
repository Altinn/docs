---
title: Bruksområder
description: Beskrivelse av hva en mapper er og hvordan man går fram for å lage en
weight: 100
---

## Utvikling av mappere

### Om mappere

En mapper er en komponent som muliggjør integrasjon mellom Altinn og tjenesteeiersystemer.  Denne integrasjonen vil la en skjemautvikler kunne benytte seg av et rikt etatsspesifikt datasett. Dette muliggjør dermed en stor variasjon av tjenester som ellers ikke ville kunne utvikles på Altinn-plattformen.

### Bruksområder

Tilgjengeliggjøring av data fra tjenesteeier til Altinn gjør det mulig å utvikle mange ulike tjenester som gir brukere tilgang til etatsspesifikk informasjon. En mapper kan tilby sin informasjon til både innsyns-, innsendings-, og samhandlingstjenester.

Et vanlig bruksområde er å tilgjengliggjøre etats-registre som innsynstjenester. Dette lar brukeren se informasjon som er registrert om seg selv eller sin virksomhet

Alternativt kan en mapper benyttes til å hente informasjon som skal benyttes i en innsendingstjeneste slik at brukeren ikke trenger å fylle ut allerede registrert informasjon.

Både innsynstjeneste og innsendingstjeneste kan inngå som en del av en større samhandlingstjeneste.

En mapper tilbyr to-veis kommunikasjon slik at skjematjenesten kan overføre spørreparametere for å hente ut spesifikk informasjon som så returneres tilbake. Det er ikke hensikten at en mapper skal benyttes til å sende inn data. Til dette skal fortsatt innsendingstjenester benyttes slik at sporbarheten og ikke-benekt-funksjonaliteten i Altinn er ivaretatt.

### Utviklingsprosessen

Prosessen fra idé til produksjonssatt tjeneste i Altinn er ikke veldig komplisert. Den følger et vanlig utviklingsløp der Altinn til slutt kvalitetssikrer og produksjonssetter mappere og produksjonssetter tilhørende tjenester.

### Design

Første steg i enhver utviklingsprosess er å designe løsningen som skal lages. For en mapper vil det si å identifisere de tjenestene som skal benytte mapperen og hvilke datasett som disse trenger. Her bør både utviklere som skal lage tjenestene i Altinn, mappere og etatstjenestene komme med innspill på dataformat slik at mapperen, og dermed også utviklingsjobben, blir så enkel som mulig.

### Utvikling

Utviklingen av en mapper er godt beskrevet i dette dokumentet, med bakgrunnsinformasjon i kapittel 3 og selve utviklingsjobben i kapittel 4. En mapper er i all hovedsak en proxy-tjeneste som er skrevet ved bruk av .NET-rammeverket Windows Communication Foundation.

Som utviklingsmiljø benyttes Visual Studio-serveren i Tjenesteutviklingsløsningen (TUL) i Altinn. Her er de nødvendige verktøy og versjonskontrollsystem klargjort for utvikleren.  Alternativt kan man sette opp et eget utviklingsmiljø med Visual Studio installert slik at man får bedre ytelse og egne favoritt-verktøy. Lokalt utviklingsmiljø kan medføre noen vanskeligheter knyttet til tilganger dersom etaten begrenser tilgangen til sine tjenester slik at kun Altinn har tilgang. Utviklede mappere må også testes og verifiseres i TUL av tjenesteeier før de kan kvalitetssikres og installeres.

### Test

Testing av programvare er en svært viktig del i all utviklingsarbeid. Det er av betydning at man har satt seg ned og tenkt over hvilke kriterier man har over alle tjenestene man ønsker å tilby.

Testing kan innføres i et hvilket som helst tidspunkt under utviklingen av mapperen. Tradisjonelt har man startet med testing etter at kriteriene er satt og kodingen er ferdig. I mer smidige prosjekter er det vanlig å starte med tester parallelt med at man koder. På den måten kan man hele tiden sjekke at koden møter de kriteriene som er satt, og man kan dermed enkelt gjøre endringer og tilpasse seg.

Enhetstesting er en metode hvor man kan utføre tester på en spesifikk bit av programmeringskoden, og foregår som regel parallelt med at man utvikler koden. Man kan lett kjøre testene, og se om noe feiler i koden, man får også en fin oversikt over at alt er som forventet og kjører feilfritt.  Om det i senere tid blir gjort endringer på den utviklede koden, vil man kunne dra nytte av enhetstestene.  De vil enten passere eller feile om man ikke møter kriteriene.

Kriteriene kan for eksempel være:

- Data kommer i riktig format.
- At man får forventet resultat.
- Håndtering av feilmeldinger. Programmet bør returnere fornuftige meldinger.

Altinn krever at mapperenes tjenester er testet ved bruk av enhetstester, både positive og negative, før de kan gjennomgå kvalitetssikring og installasjon.

En mapper bør også testes ved kodegjennomgang. Det vil si å la en annen utvikler gå igjennom koden. På den måten kan logiske brister, sikkerhets og ytelsesproblemer fangens opp før de rekker å oppstå i et kjøretidsmiljø.

### Kvalitetssikring

Etter at en ny mapper har vært igjennom en grundig test av tjenesteeier, vil Altinn gå igjennom koden og forsikre seg om at mapperen møter de kravene som stilles til en mapper.

Om Altinn finner noen mangler blir den sendt i retur til tjenesteeier, med en beskrivelse om hva som må endres. Det er tjenesteeirs oppgave å ordne opp i manglene. Denne prosessen gjentas inntil mapperen møter kravene til Altinn.

### Installasjon

Når en mapper er kvalitetssikret kan man gå til neste steg som er installasjon. Når man skal installere en mapper i Altinn må man påse at det er åpnet for tilgang til tjenesteeier sitt system gjennom både Altinn1 og tjenesteeier sin brannmur i forkant av installasjonen. Altinn sin driftsleverandør vil verifisere dette under installasjon av mappere. Deretter vil de installere mapperen det spesifiserte miljøet på Altinn. Dersom mapperen skal installeres i produksjonsmiljøet vil den først installeres og verifiseres i et testmiljø.

Dersom det oppstår feil under installasjon vil det kunne måtte være nødvendig med kontakt mellom driftsleverandør og tjenesteeier sine utviklere og driftere. Det er derfor viktig å ha tilgjengelige ressurser på tjenesteeier sin side under installasjonen.

### Installasjonstest

Etter at en mapper er installert må installasjonen verifiseres av tjenesteier. Dette gjøres gjerne ved bruk av en eller flere tjenester som benytter den installerte mapperen. Dette sikrer både at tjenestene får kontakt med mapperen og at mapperen får kontakt med tjenesteeier sitt system.

