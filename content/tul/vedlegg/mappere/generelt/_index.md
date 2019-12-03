---
title: Generelt om mappere
linktitle: Generelt
description: Beskrivelse av hva en mapper er og hvordan man går fram for å lage en.
toc: true
weight: 200
---

## Bruksområder

Tilgjengeliggjøring av data fra tjenesteeier til Altinn gjør det mulig å utvikle mange ulike tjenester som
gir brukere tilgang til etatsspesifikk informasjon.
En mapper kan tilby sin informasjon til både [innsyns](../../../tjenestetyper/innsyn/)-,
[innsendings](../../../tjenestetyper/innsending/)-, og [samhandlingstjenester](../../../tjenestetyper/samhandling/).
Et vanlig bruksområde er å tilgjengliggjøre etats-registre som innsynstjenester.
Dette lar brukeren se informasjon som er registrert om seg selv eller sin virksomhet

Alternativt kan en mapper benyttes til å hente informasjon som skal benyttes i en innsendingstjeneste slik at brukeren
ikke trenger å fylle ut allerede registrert informasjon.
Både innsynstjeneste og innsendingstjeneste kan inngå som en del av en større samhandlingstjeneste.
En mapper tilbyr to-veis kommunikasjon slik at skjematjenesten kan overføre spørreparametere for å hente ut
spesifikk informasjon som så returneres tilbake. 

Det er *ikke* hensikten at en mapper skal benyttes til å sende inn data.
Til dette skal fortsatt innsendingstjenester benyttes slik at sporbarheten og ikke-benekt-funksjonaliteten i Altinn er ivaretatt.

## Prosessen

Her oppsummeres prosessene rundt utvikling og forvaltning av mappere.

### Design

Første steg i enhver utviklingsprosess er å designe løsningen som skal lages.
For en mapper vil det si å identifisere de tjenestene som skal benytte mapperen og hvilke datasett som disse trenger.
Her bør både utviklere som skal lage tjenestene i Altinn, mappere og etatstjenestene komme med innspill på dataformat slik at mapperen,
og dermed også utviklingsjobben, blir så enkel som mulig.

### Utvikling

Når [nødvendige forutsetninger](#forutsetninger) er oppfylt logger man på utviklingsserver via [TUL](https://tul.altinn.no)
og starter [Visual Studio Server](../../../kom-i-gang/#utviklingsimage-med-visual-studio-og-tfs).
Du får da opp en RDP sesjon mot utviklingsserver.
På utviklingsserver startes så opp Visual Studio, og man kan så koble seg til TFS på adressen https://tfs.ai-dev.brreg.no.
Her er de nødvendige verktøy og versjonskontrollsystem klargjort for utvikleren.

Utviklingen av en mapper er godt beskrevet, med både [bakgrunnsinformasjon om teknologi](../teknologi/)
og beskrivelse av [selve utviklingsjobben](../utvikling/).
En mapper er i all hovedsak en proxy-tjeneste som er skrevet ved bruk av [WCF](../teknologi#windows-communication-foundation).

Alternativt kan man sette opp et eget utviklingsmiljø med Visual Studio installert slik at man får bedre ytelse og egne favoritt-verktøy.
Lokalt utviklingsmiljø kan medføre noen vanskeligheter knyttet til tilganger dersom etaten begrenser tilgangen til sine tjenester
slik at kun Altinn har tilgang.
Utviklede mappere må også testes og verifiseres i TUL av tjenesteeier før de kan kvalitetssikres og installeres.

Se også [Bruk av Visual Studio](../../f/).

### Test

Forutsatt at [nødvendige brannmuråpninger](#forutsetninger) er på plass hos altinn og tjenesteeier,
så skal man kunne kjøre mapper på utviklingsserver, og utføre eventuelle enhetstester.

[Testing](../testing/) av programvare er en svært viktig del i all utviklingsarbeid.
Det er av betydning at man har satt seg ned og tenkt over hvilke kriterier man har over alle tjenestene man ønsker å tilby.

Testing kan innføres i et hvilket som helst tidspunkt under utviklingen av mapperen.
Tradisjonelt har man startet med testing etter at kriteriene er satt og kodingen er ferdig.
I mer smidige prosjekter er det vanlig å starte med tester parallelt med at man koder.
På den måten kan man hele tiden sjekke at koden møter de kriteriene som er satt, og man kan dermed enkelt gjøre endringer og tilpasse seg.

Enhetstesting er en metode hvor man kan utføre tester på en spesifikk bit av programmeringskoden,
og foregår som regel parallelt med at man utvikler koden. Man kan lett kjøre testene, og se om noe feiler i koden,
man får også en fin oversikt over at alt er som forventet og kjører feilfritt.
Om det i senere tid blir gjort endringer på den utviklede koden, vil man kunne dra nytte av enhetstestene.
De vil enten passere eller feile om man ikke møter kriteriene.

Kriteriene kan for eksempel være:

- Data kommer i riktig format.
- At man får forventet resultat.
- Håndtering av feilmeldinger. Programmet bør returnere fornuftige meldinger.

### Produksjonssetting

Når mapper er ferdig testet bestilles produksjonssetting via selvbetjeningsportalen.

Her benyttes skjema **«Produksjonsetting av tjenester, kodelister og mappere».**

I bestilling er det viktig at man angir navn på mapper, hvilket miljø man vil ha mapperen installert i,
teknisk kontaktperson med telefonnummer og hvor det er sjekket inn master/ branch, vi henter fra master om ikke annet er angitt.

Mapper blir sjekket ut og bygget, og installasjonsprosjektet blir testkjørt av oss før det oversendes leverandør
for installasjon i respektive miljøer. Dette for å unngå åpenbare feilkilder i prodsettingen.

#### Installasjon

Når en mapper er kvalitetssikret kan man gå til neste steg som er [installasjon](../installasjon/).
Når man skal installere en mapper i Altinn må man påse at det er åpnet for tilgang til tjenesteeier
sitt system gjennom tjenesteeier sin brannmur i forkant av installasjonen.

Altinn sin driftsleverandør vil verifisere dette under installasjon av mappere.
Deretter vil de installere mapperen det spesifiserte miljøet på Altinn. Dersom mapperen skal installeres i produksjonsmiljøet
vil den først installeres og verifiseres i et testmiljø.

Dersom det oppstår feil under installasjon vil det kunne måtte være nødvendig med kontakt mellom driftsleverandør og
tjenesteeier sine utviklere og driftere. Det er derfor viktig å ha tilgjengelige ressurser på tjenesteeier sin side under installasjonen.

#### Installasjonstest

Etter at en mapper er installert må installasjonen verifiseres av tjenesteier. Dette gjøres gjerne ved bruk av en eller flere tjenester
som benytter den installerte mapperen. Dette sikrer både at tjenestene får kontakt med mapperen og at mapperen får kontakt med
tjenesteeier sitt system.


## Forutsetninger

For å kunne utvikle en mapper er det en del forutsetninger som ligger til grunn.

1. **Brukernavn og passord for tilgang til [selvbetjeningsportalen]** for
   bestilling av brannmuråpninger, produksjonssetting av mapper og andre tilganger.
   Dersom du ikke har brukernavn på selvbetjeningsportalen, så kan dette bestilles ved å sende
   e-post til <tjenesteeier@altinn.no>.
2. **Tilgang til utviklingsserver for mapper.**  
   Utviklere som har gjennomført tjenesteutviklings- eller mapperkurs kan bestille tilgang til utviklingsserver for mappere.
   - Bestilling gjøres i selvbetjeningsportal via bestillingsskjema **"Ny henvendelse"** -> **"Tilganger"** -> **«Tilgang til TUL og/eller SERES»**.  
   - I skjemaet må det avkrysses for "Ønskes det tilgang til avanserte tjenesteutviklingsverktøy (Visual studio og Team Foundation Server)?"
3. **Tilgang til TFS.**  
   All mapperkode skal sjekkes inn og vedlikeholdes i TFS. Dette betinger at utvikler også har en brukerkonto i Altinns utviklingsmiljø AI-DEV.
   Bestilling av brukerkonto gjøres i [selvbetjeningsportalen] via bestillingsskjema **"Tilgang til Altinns utviklingsmiljø AI-DEV"**.
   I feltet «beskrivelse spesielle behov» så må det angis hvilke tjenesteeier(e) man skal utføre utviklingsoppdrag for.
4. **Åpning i brannmur hos altinn og tjenesteeier.**  
   For å kunne teste og bruke mapper, så må tjenesteeier åpne for trafikk inn fra mapper- og utviklingsserver.
   Informasjon om hvilke IP-adresser som trafikken vil komme fra, er distribuert til de respektive tjenesteeiere.
   I tillegg må det bestilles åpning for utgående trafikk fra Altinn til tjenesteeier.
   Bestilling av åpninger gjøres i [selvbetjeningsportalen] via bestillingsskjema **«Åpning i brannmur»**.
   I feltet Miljø anbefaler vi at det velges annet, og at man legger inn «Produksjon, TT02 og TUL» i feltet Spesifisér miljø. Man sikrer da at man får alle nødvendige åpninger på plass i en bestilling. For Tjenesteeiere som skal teste mappere i AT-Miljø, så må man også legge til dette.
   I feltet «Hva gjelder brannmuråpningen?», velges Mapper/ekstern tjeneste.
   For å sikre at man også får åpnet fra utviklingsserver bør man spesifisere i Andre opplysninger, at det også skal åpnes for trafikk fra utviklingsserver «VDEV»

[selvbetjeningsportalen]: https://selvbetjening.brreg.no
