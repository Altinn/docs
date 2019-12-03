---
title: Kom i gang
description: Installasjon og klargjøring, Citrix, sentral funksjonalitet, statuser og beskrivelse av de ulike arbeidsflatene i TUL.
toc: true
weight: 10
---

## Forutsetninger og konfigurasjon

Tjenesteutviklingsløsningen er basert på SharePoint Server 2013. Du vil kunne nå TUL fra din lokale PC via Citrix
fjernstyringsprogram. Citrix er en klient som installeres og lar deg åpne fjernprogrammer som om de skulle ligget på din egen maskin.
Dessuten er dette en sikker løsning for fjernarbeid. Citrix vil ha en Office-installasjon med programmer som blant annet InfoPath og
Microsoft Visual Studio Tools for Applications (Visual Studio 2008 med .NET 3.5).

For å ta i bruk TUL for første gang må du bestille brukertilgang til miljø. Du må også installere en Citrix-klient på din lokale PC.

Bruker bestilles hos <tjenesteeier@altinn.no>.

Tekniske utviklere med behov for å utvikle [mappere](../vedlegg/mappere/), XSLT for splitt/gjenbruk av data eller tilstandsmaskiner, kan få tilgang til
et utviklingsmiljø med Visual Studio og TFS via et [ikon på Citrix arbeidsflaten](#utviklingsimage-med-visual-studio-og-tfs).
Kun de som er delegert tilgang vil ha dette ikonet tilgjengelig. Tilgang kan bestilles hos <tjenesteeier@altinn.no>.

## Installasjon og klargjøring

For å ta i bruk TUL må man som nevnt ha installert en [Citrix klient](https://www.citrix.com/products/receiver/).

### Installasjon av Citrix

Dersom Citrix-klient er installert fra før kan dette kapittelet hoppes over. 
Hvis du har en gammel versjon av Citrix allerede installert, bør denne fjernes før du installerer ny versjon.

Gå til https://tul.altinn.no

I nettleseren vises bilde for pålogging til TUL. Tast inn brukernavn og passord og klikk på *Log on*.

![Figur 4 – Innlogging Citrix](/docs/images/guides/tul/citrix-login.jpeg?width=700 "Figur 4 – Innlogging Citrix")

Dersom Citrix-klienten ikke er installert på maskinen vil følgende skjermbilde vises:

![Figur 5 – Nedlasting og innstallering av Citrix-klient](/docs/images/guides/tul/citrix-download.png?width=700 "Figur 5 – Nedlasting og innstallering av Citrix-klient")


Klikk på *Install* for å starte nedlasting og innstallering av Citrix-klient. Får du denne siden og allerede har innstallert denne versjonen
av Citrix, klikk «Log on».

Velg *Kjør* (*Run*) i dialogboksen som kommer opp. Velg *Kjør* (*Run*) dersom ekstra sikkerhetsvarsel kommer opp. Klienten installeres
automatisk.

![Kjør Citrix](/docs/images/guides/tul/citrix-run.png?width=700 "Kjør Citrix")

![User Access Control](/docs/images/guides/tul/citrix-uac.png "User Access Control")

Dersom nedlastingen og installasjonen har tatt tid, kan sesjonen din ha gått ut på tid. Velg i så fall å logge på på nytt. Dersom du blir
spurt om å laste ned klienten på nytt, velg *Log on*. Du blir nå tatt til Citrix verktøylinje (antall ikoner varierer fra bruker til
bruker):

![Figur 6 - Første gang du kommer inn i Citrix vil skrivebordet være tomt](/docs/images/guides/tul/citrix-first-time.png?width=700 "Figur 6 - Første gang du kommer inn i Citrix vil skrivebordet være tomt")

Første gang du kommer inn i Citrix vil skrivebordet være tomt. Du må legge inn de programmene du ønsker ved å klikke på pluss-tegnet
til venstre.

![Figur 7 - Klikk på de programmene du ønsker å legge til skrivebordet.](/docs/images/guides/tul/citrix-add-progs.png?width=700 "Figur 7 - Klikk på de programmene du ønsker å legge til skrivebordet.")

![Figur 8 - De programmene som allerede ligger på skrivebordet vil være market med grønt avkryssing.](/docs/images/guides/tul/citrix-already-added.png?width=700 "Figur 8 - De programmene som allerede ligger på skrivebordet vil være market med grønt avkryssing.")

![Figur 9 – Citrix skriverbord](/docs/images/guides/tul/citrix-desktop.png?width=700 "Figur 9 – Citrix skriverbord")

![Start TUL SharePoint](/docs/images/guides/tul/citrix-start-tul.png?width=700 "Start TUL SharePoint")

Klikk *Internet Explorer* for å åpne TUL SharePoint. Dersom en lisensadvarsel viser seg, trykk *OK* (*Allow*).

Et vindu vil åpne seg med Internet Explorer. Dersom ikke nettleseren åpner http://tul.altinn.basefarm.net automatisk må du angi dette i
nettleseren.

Det skal være tilstrekkelig å logge seg på Citrix, men hvis innlogging er påkrevd, benytter du samme bruker som du benyttet tidligere. Husk
å benytte prefikset `altinntul\` slik at brukernavn blir f.eks. `altinntul\ola.nordmann`.
Dette er ikke pråkrevd, men en god vane er å bruke domeneprefiks, da dette er tiltenkt skrudd på etterhvert.

Kontroller at det står *Trusted sites* nederst i nettleservinduet:

![Figur 10 – Trusted sites](/docs/images/guides/tul/trusted-sites.png "Figur 10 – Trusted sites")

Hvis ikke dette er angitt vil det stå *Internet* i stedet og du må legge til TUL SharePoint som en sikker side: For å legge til TUL i
nettleserens *Trusted Sites*, velg *Tools* *Internet Options*. Et vindu åpnes med innstillinger. Velg skillearket *Security*. Trykk på
*Sites*-knappen, et nytt vindu åpnes. Fyll inn http://tul.altinn.basefarm.net under *Add this website to the zone* dersom det ikke er fylt
inn allerede, og trykk *Add*. Avslutt og kontroller at det nå står *Trusted sites* nederst i nettleservinduet.

Dersom installasjonen har gått smertefritt, vil TUL SharePoint kunne åpnes ved å klikke på *Internet Explorer* i Citrix arbeidsflaten.

Det er verdt å merke seg at første gangen man åpner en fildialog i en av applikasjonene i TUL, vil Citrix gi deg et spørsmål om du vil gi
tilgang til din lokale disk på datamaskinen du logger på fra. Her kan du velge enten nei, lese eller full tilgang. Hvis du ved et senere
tidspunkt vil endre dette, må du høyreklikke på ICA-client ikonet i høyre hjørnet på din lokale datamaskin og velge å endre
access-innstillinger.

## Citrix arbeidsflate

Etter innlogging i Citrix presenteres du med et antall ikoner. Antall tilgjengelige applikasjoner avhenger av hvilke rettigheter du har i
TUL, samt hvilke oppgaver du er tiltenkt å utføre.

### 7-zip filemanger

![](/docs/images/guides/tul/7-zip.png)

Dette er et alternativ til zip-funksjonaliteten i vanlig windows utforsker.

### Command prompt

![](/docs/images/guides/tul/command-prompt.png)

Dette er kommandolinjeverktøy, som bl.a. kan brukes for å kjøre applikasjonen *RequiredFields.exe.*

### Excel

![](/docs/images/guides/tul/excel.png)

Denne lar deg åpne Excel-filer i TUL, f.eks. migreringsrapporter etc

### Internet Explorer

![](/docs/images/guides/tul/internet-explorer.png)

Dette er inngangsporten til TUL SharePoint og vil åpne en nettleser hvor TUL er satt som startside.

### InfoPath 2010

![](/docs/images/guides/tul/infopath.png)

Dette er skjemaverktøyet i TUL og vil i dette dokumentet kun bli referert til som InfoPath.

### Notepad

![](/docs/images/guides/tul/notepad.png)

Lar deg åpne og editere tekstfiler.

### Notepad++

![](/docs/images/guides/tul/notepad-plus-plus.png)

Lar deg åpne og editere tekstfiler. Flere funksjoner enn Notepad.

### Utforsker delt område

![](/docs/images/guides/tul/explorer-share.png)

Dette er standard Windows utforsker som tar deg til det delte området, også referert til som *TUL-Share.*

### Utforsker lokal PC

![](/docs/images/guides/tul/explorer-local.png)

Dette er standard Windows utforsker som tar deg til din lokale maskin. Det er her viktig at du gir applikasjonen tilgang i vinduet som kan
dukke opp med advarsel om at noen prøver å få tilgang til dine lokale filer.

### Word

![](/docs/images/guides/tul/word.png)

Denne lar deg forhåndsvise Word-filer i TUL, feks. designdokumenter, kokebøker etc.

### Utviklingsimage med Visual Studio og TFS

![](/docs/images/guides/tul/dev-image.png)

Åpner et fullverdig utviklingsmiljø med Visual Studio 2015 og lesetilgang til mapper-kildekode via TFS. Avhengig av hvilken tjenesteeier
bruker tilhører, og hvilke deler av koden som skal endres, så vil områdene med skrivetilgang variere. ”Vanlige” tjenesteutviklere vil typisk
ikke ha behov for tilgang.

## Sentral funksjonalitet i TUL

For å bruke TUL er det en fordel å kjenne til funksjonaliteten i SharePoint, da TUL SharePoint bruker lignede funksjonalitet på en del
sentrale funksjoner. Disse gjengis i de følgende delkapitlene.

### Statuser

For alle parameterseksjoner på tjeneste- og utgavearbeidsflaten er det brukt symboler for å indikere status for seksjonen. Disse ikonene
skal gi bruker et kjapt overblikk over hva som er uferdig, endret eller migrert, samt komplett. Ikoner og status er vist i tabellen under.

| Ikon                                                              | Status                           |
| ----------------------------------------------------------------- | -------------------------------- |
| ![Ikon for ny/uendret](/docs/images/guides/tul/status-new.png)    | Ny, uendret                      |
| ![Ikon for endret](/docs/images/guides/tul/status-changed.png)    | Endret, ikke komplett            |
| ![Ikon for komplett](/docs/images/guides/tul/status-complete.png) | Komplett                         |
| ![Ikon for migrert](/docs/images/guides/tul/status-migrated.png)  | Migrert, uendret etter migrering |

### Veiledning

Alle sider i TUL SharePoint (med få unntak) har veiledningskomponenten tilgjengelig på høyre side.
Denne vil vise en lenke til den komplette brukerveiledningen for TUL.

### Inn- og utsjekking

Inn- og utsjekking brukes for å sikre at andre ikke kan gjøre endringer mens du jobber med en parameterseksjon eller et dokument. Mens
parameterseksjonen er sjekket ut, kan du redigere den uten at andre brukere kan gjøre endringer. Først når du sjekker inn igjen, vil andre
kunne gå inn og gjøre endringer.

Du vil ha tilgang til å sjekke ut innhold som ligger under din egen tjenesteeier, inkludert tjenester og utgaver. For andre tjenesteeiere,
tjenester og utgaver vil du kun ha lesetilgang. Inn- og utsjekking av parameterseksjoner gjøres via knappene som finnes øverst og nederst på
siden, som vist i figur 11, under. Ved innsjekk har man også mulighet for å angi en kommentar som blir lagret. Ved å benytte lenken *Vis
versjonslogg* kan man se historikk over ulike innsjekkinger og kommentarer.

Det er ikke mulig å hente fram tidligere versjoner av enkeltsider. Derfor er det hensiktsmessig å skrive konkrete kommentarer ved
innsjekking, i tilfelle du ønsker å fjerne utførte endringer. Versjonshåndtering skjer for
utgaven som helhet i forbindelse med [migrering](../funksjonalitet/migrering/).

Det er verdt å merke seg at hvis man har sjekket ut, og så trykker på avbryt, vil det være det samme som å angre utsjekking; endringer man
har gjort blir ikke lagret og parameterseksjonen vil ikke lengre være utsjekket. Man returneres til arbeidsflaten.

![Figur 11 – Knapper for å sjekke ut/inn og avbrytes](/docs/images/guides/tul/sjekk-ut-inn.png "Figur 11 – Knapper for å sjekke ut/inn og avbrytes")

### Sortering og filtrering

Som ellers i SharePoint, vil man også i TUL SharePoint ha filtrering og sortering på de viktige listene. Et utvalg av disse listene er:

  - Liste over tjenesteeiere.
  - Liste over tjenester.
  - Liste over utgaver.
  - Liste over kodelister.

Det fungerer på den måten at man for hver kolonneoverskrift har en meny som vist i figur 12.

![Figur 12 - Sortering og filtrering i lister](/docs/images/guides/tul/sortering-og-filter.png "Figur 12 - Sortering og filtrering i lister")

Merk at ikke alle kolonner kan filtreres da disse kun kan inneholde unike verdier.

### Påkrevde felter og røde stjerner

For mange av metadatasidene i TUL, vil det være felter som må fylles ut før seksjonen kan lagres og sjekkes inn. Disse er markert med røde
stjerner, som vist i figuren nedenfor.

![Figur 13 – Røde stjerner](/docs/images/guides/tul/røde-stjerner.png "Figur 13 – Røde stjerner")

Det er viktig at det skilles på hva som er påkrevd for at utgaven skal migreres, og hva som er påkrevd for å sjekke inn/lagre. Røde stjerner
angir kun sistnevnte.

### Felles kodebibliotek

I TUL vil man kunne oppleve at mange skjemaer krever mye av samme funksjonaliteten, som f.eks. å validere fødselsnummer, org.nr,
epostadresser etc. Dette er tiltenkt å legges i et felles (C\#) kodebibliotek i dokumentbiblioteket på forsiden. Dette er ment som et
levende sett av funksjonalitet og vedlikeholdes av tjenesteutviklerne. Det vil være opp til dem å utvikle de gjenbrukbare
valideringene/kodesnuttene. Dette kodebiblioteket vil være kildekode pluss et kompilert bibliotek som man kan ta i bruk i C\#-koden til
ethvert skjema.

### Tekstsøk

Tekstsøk er laget for å gjøre det enklere å standardisere språk og begreper i tjenestene som tilbys sluttbrukerne. Det er mulig å søke på
all tekst som er registrert i TUL på tvers av tjenesteeiere, tjenestetyper osv. Tekstsøk finnes i to varianter: En helsides søkefunksjon som
kan startes fra startsiden eller tjenesteeiers arbeidsflate, og et popup-vindu som kan startes fra alle parameterfelt som har språkstøtte,
dvs. som kan oversettes.

![Figur 14 – Tekstsøk](/docs/images/guides/tul/tekst-søk.png "Figur 14 – Tekstsøk")

Et parameterfelt du kan søke fra, har lenken *Søk tekst* til høyre for feltet. Hvis du først skriver inn en tekst i feltet og trykker på
denne lenken, vil det åpnes et popup-vindu med søkeresultatet. Da benyttes et sett med default søkekriterier. Kriteriene er plassert over
resulatlisten. Her kan du begrense eller utvide søket ved å velge tjenesteeier, tjenestetype, språk og teksttype. I tillegg kan du skive inn
ønsket søkestreng.

For å velge en bestemt tekst klikker du på lenken *Bruk* på den aktuelle linjen i resultatlisten. Du kan også holde musepekeren over en av
linjene for å få fram en tooltip med mer informasjon om hvor denne teksten er benyttet.

![Figur 15 – Valg av tekst](/docs/images/guides/tul/tekst-valg.png "Figur 15 – Valg av tekst")

I helsides-versjonen av søk er grunnfunksjonaliteten lik. For å velge en tekst må du imidlertid bruke klipp og lim. Du velger teksten med
musepekeren, kopierer teksten og limer den inn der den skal brukes, for eksempel i InfoPath. Ved å klikke *OK* kommer du tilbake til siden
du kom fra.

## Startsiden i TUL

Startsiden, som vist i figur 16, er det første skjermbildet du kommer til når du logger inn i TUL.

Her kan du utføre følgende aktiviteter:

  - Navigere til [tjenesteeiernes arbeidsflater](#tjenesteeiers-arbeidsflate).
    - I utgangspunktet vil du bare se de tjenesteeierne som du tilhører
    - Du vil kunne få listet opp alle tjenesteeierne som du har lesetilgang til ved å klikke på «Alle tjenesteeiere»
  - Navigere direkte til de sju siste tjenesteutgavene du har redigert
  - Navigere direkte til tjenesten til en av disse utgavene
  - Navigere til [kodelistene](../funksjonalitet/kodelister/) som gjelder på tvers av alle tjenesteeiere.
  - Navigere til aktuelle eksterne nettsider gjennom liste med lenker.
  - Navigere til [rolleadministrasjon](../funksjonalitet/rolleadministrasjon/)-sidene.

I tillegg vil en administrator kunne utføre følgende aktiviteter:

  - Hente frem og lagre [prosessflytmaler](../diverse/administrators-oppgaver/#prosessflytmaler) som gjelder på tvers av alle tjenesteeierne. Disse ligger i et dokumentbibliotek kalt
    *EmptyWorkflowTemplates*.

![Figur 16 – Startsiden](/docs/images/guides/tul/startsiden.png?width=700 "Figur 16 – Startsiden")

## Tjenesteeiers arbeidsflate

Når du har valgt en tjenesteeier på startsiden kommer du til tjenesteeierens arbeidsflate. Dette er en arbeidsflate som er spesifikk for den
enkelte tjenesteeier, og kan av tjenesteeier-administrator tilpasses den enkelte tjenesteeiers behov.

Her kan du:

  - Navigere til eksisterende tjenester.
  - Opprette [ny tjeneste](../tjenestetyper/ny#lage-tjeneste).
  - Opprette ny tjeneste og utgave [basert på mastertjeneste](../tjenestetyper/innsending/master/#opprette-tjeneste-basert-på-en-mastertjeneste).
  - Lese kunngjøringer som er rettet mot tjenesteeierens tjenesteutviklere i TUL.
  - Finne kontaktinformasjon om deltakere i tjenesteutvikling fra tjenesteeierne dersom denne delen er lagt til arbeidsflaten for
    tjenesteeier.
  - Navigere til [rolleadministrasjon](../funksjonalitet/rolleadministrasjon/)-siden.
  - Navigere til [stilark og bildebiblioteker](../diverse/ekstern-stil/) og videre til [migrering av stil](../diverse/ekstern-stil/#migrere-stilark).
  - Navigere til [tekstsøk](#tekstsøk).

Administrator kan i tillegg:

  - Hente frem og lagre [prosessflytmaler](../diverse/administrators-oppgaver/#prosessflytmaler) for den enkelte tjenesteeier. Disse ligger i dokumentbiblioteket *PreDefinedWorkflowTemplates.*
  - Definere [vedleggstyper](../tjenestetyper/innsending/vedleggstyper/).
  - Navigere til siden for [betalingsleverandøravtaler](../diverse/administrators-oppgaver/#betalingsadministrasjon) (gjelder bare betalingsadministrator).

![Figur 17 – Tjenesteeiers arbeidsflate](/docs/images/guides/tul/tjenesteeiers-arbeidsflate.png?width=700 "Figur 17 – Tjenesteeiers arbeidsflate")

Du kan nå velge en eksisterende tjeneste eller [opprette en ny](../tjenestetyper/ny#lage-tjeneste).
