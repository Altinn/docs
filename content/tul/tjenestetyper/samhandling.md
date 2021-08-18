---
title: Samhandling
description: En samhandlingstjeneste grupperer enkelttjenester og presentere dem for sluttbruker i en prosess.
toc: true
---

I Altinn II versjon 2 innførtes samhandlingstjeneste som ny tjenestetype i Altinn. En samhandlingstjeneste grupperer enkelttjenester og
presentere dem for sluttbruker på en arbeidsflate. Arbeidsflaten kan samtidig gi veiledning og støtte i prosess og regelverk.
Enkelttjenestene i en samhandlingstjeneste utføres på samme måte som om de var enkeltstående.

I sin enkleste form kan en samhandlingstjeneste samle tjenester som inngår i en enkel, sekvensiell prosess mellom én avgiver og én
tjenesteeier, for eksempel send søknad – motta svar – send klage – motta svar. I mer komplekse tilfeller kan samhandlingstjenesten involvere
flere tjenesteeiere og/eller tillate svært mange alternative løp, avhengig av sluttbrukers handlinger kombinert med utfallet av
enkelttjenestene som inngår.

![Arbeidsflaten til en nyopprettet utgave av en samhandlingstjeneste](/docs/images/guides/tul/arbeidsflate-samhandling.png "Figur 58 – Arbeidsflaten til en nyopprettet utgave av en samhandlingstjeneste")

## Spesifikasjon - samhandlingsstjeneste

For en samhandlingstjeneste må det som for øvrige tjenestetyper registreres utgave­parametre, og det er mulig å overstyre rettigheter. I
tillegg må du definere et tjenesteutvalg, dvs. hvilke enkelttjenester som skal brukes. Du må også laste opp en tilstandsmodell og sette
parametre for tilstandene tjenesten skal gjennomløpe. Videre kan du definere gjenbruk av data mellom tjenester, og du kan registrere en
liste med merknader som benyttes i kommunikasjon fra tjenesteeiers system til Altinn.

### Utgaveparametre

Enhver utgave må ha [utgaveparametre](..//felles-funksjonalitet/#utgaveparametere).

### Overstyr rettigheter

Rettigheter kan du [overstyre](../felles-funksjonalitet/#overstyr-rettigheter) hvis den utgaven du utvikler har andre rettighetskrav enn de som allerede er satt på tjenestenivå. Hver utgave
vil arve disse rettighetene fra tjenesten når den migreres til SBL, og få med seg overstyringene i tillegg. Du kan også overstyre de
dialogsidene som er angitt som rollestyrte dialogsider på "Tilstander siden" for slik å gi spesifikke roller tilgang til spesifikke
dialogsider.

### Tjenestevalg

Her velger du hvilke tjenesteutgaver som skal være tilgjengelig i samhandlingstjenesten. En samhandlingstjeneste kan omfatte utgaver fra
flere tjenesteeiere.

Bare de tjenesteutgavene du velger, vil være tilgjengelig når du konfigurerer dialogsider. Tilsvarende gjelder mulighet for gjenbruk av
data. I SBL vil brukeren selv kunne koble inn benyttede tjenester, men bare innenfor tjenestevalget du gjør her.

Øverst på siden er det radioknapper og nedtrekkslister som brukes for å hente fram aktuelle tjenester. Du velger en tjeneste ved å klikke på
«Legg til»-lenken til høyre på raden. Når du er ferdig med å velge tjenester, kan det være hensiktsmessig å trekke sammen utgavelisten du
valgte fra, for at samhandlingstjenestens utgaver skal være synlig. Valglisten kan utvides og trekkes sammen ved å klikke på
overskriftslinjen.

![Figur 59 – Tjenesteutvalg](/docs/images/guides/tul/tjenesteutvalg.png?width=700 "Figur 59 – Tjenesteutvalg")

Listen nederst på siden viser utgavene som inngår i samhandlingstjenesten. Du kan slette en utgave ved å klikke på *Slett* -lenken. Hvis du
vil slette en utgave som er benyttet i en dialogside eller i gjenbruk av data, vil den slettes derfra også, dersom disse sidene er sjekket
inn. I motsatt fall vil du få en feilmelding.

### Tilstander

![Figur 60 – Eksempel på arbeidsprosess for samhandlingstjeneste](/docs/images/guides/tul/prosess-samhandling.png?width=700 "Figur 60 – Eksempel på arbeidsprosess for samhandlingstjeneste")

Samhandlingstjenesten kan gjennomløpe en eller flere tilstander. Definerte tilstands­overganger tillater at tjenesten går fra en tilstand
til en annen. I eksempelet i Figur 60 er det flere tilstander som tilstandsmaskinen beveger seg gjennom. Hver tilstandsovergang vil skje når
en hendelse inntreffer. Det er de underliggende tjenester knyttet til hver tilstand som kan forårsake en tilstandsovergang når deres interne
status endres.

![Tilstandsovergang](/docs/images/guides/tul/tilstandsovergang.png?width=400 "Tilstandsovergang")


Hendelser som registreres automatisk i SBL er knyttet til sluttbrukers elementer i meldingsboksen, for eksempel om en tjenesteutgave er
instansiert eller arkivert. I tillegg er det mulig å sende eksterne hendelser fra tjenesteeiers systemer, for å trigge tilstandsovergang
basert på hendelser utenfor Altinn.

For hver tilstand kan et ulikt sett av informasjon og undertjenester kommuniseres til sluttbrukeren i SBL. Det gjøres ved å koble hver
tilstand til en eller flere dialogsider. [Dialogsider](#dialogsider) beskrives senere, sammen med andre
innholdselementer for samhandlingstjeneste.

Før du går i gang med å sette opp tilstander i TUL, kan det være en fordel å ha laget seg en oversikt over flyten i tjenesten. Du bør vite
hvilke tilstander som du skal ha i tjenesten, hvilke dialogsider som skal vises i hver tilstand og hvordan du går fra en tilstand til en
annen.

Du må først opprette en starttilstand for tjenesten din. Dette er tilstanden som tjenesten vil være i fra starten av.

![Figur 61 - Lag starttilstand](/docs/images/guides/tul/lag-starttilstand.png?width=700 "Figur 61 - Lag starttilstand")


Etter at du har laget starttilstanden må du gi den et navn og en beskrivelse. Du må velge hvilken dialogside som skal vises i SBL når
samhandlingstjenesten er i denne tilstanden. Nedtrekkslisten viser de dialogsidene som ligger i biblioteket på utgavearbeidsflaten. Valgene
«Arkiver» og «Slett» avgjør om bruker skal kunne arkivere eller slette samhandlingstjenesten når den er i denne tilstanden. Disse valgene
kan være ulik fra tilstand til tilstand, slik at du for eksempel kan si at det ikke er lov å arkivere i tilstand 1, men at det er lov i
tilstand 2.

![Figur 62 - Starttilstand](/docs/images/guides/tul/start-tilstand.png?width=700 "Figur 62 - Starttilstand")


For å kunne komme videre fra starttilstanden må du definere en overgang. Her forteller du hva som skal til for at tjenesten skal skifte
tilstand, og til hvilken tilstand den skal gå. Du kan lage flere overganger i en tilstand. Det betyr at du kan velge at tjenesten går til
ulike tilstander basert på hva som skjer. For eksempel kan en starttilstand «søknad» gå til «behandling» dersom søknaden blir sendt inn, men
gå til «avsluttet» dersom søknaden blir trukket/slettet.

En overgang må du gi et navn og en beskrivelse. I «til tilstand» skriver du inn navnet på tilstanden som tjensten skal havne i etter at
overgangen har funnet sted. Navnet du skriver her må være navnet på en annen tilstand. I «hendelse» forteller du hvilke kriterie som må
inntreffe for at overgangen skal tre i kraft. Det finnes to ulike typer hendelser du kan bruke her, forhåndsdefinerte eller egendefinerte.

Altinn har fem forhåndsdefinerte hendelser som du kan finne i Figur 63. Disse skal skrives inn på følgende måte \[Ekstern
tjenestekode\]:\[Ekstern utgavekode\]:\[hendelse\], for eksempel «3374:1:Submitted». Kodene du legger inn her refererer til de(n)
tjenesteutgaven(e) som skal utløse hendelsen.

I «hendelse» kan du bruke regulære uttrykk (regular expression/regex). Regulære uttrykk er en måte å finne ut om en tekst oppfyller
definerte kriterier. Hvordan du lager slike uttrykk vil ikke bli forklart i denne brukerguiden. Du vil finne mange guider om dette på
nettet. For hendelse kan du for eksempel bruke «3314:\[0-9\]:Instantiated» for å fange opp alle instantiated-hendelser for utgaver med
ekstern kode fra 0 til 9 for tjeneste med ekstern kode 3314.

**Forhåndsdefinerte hendelser:**

Hendelsekode | Hendelse                                     | Tjenestetype
------------ | -------------------------------------------- | --------------------
Instantiated | Utføres når tjenesteutgaven blir instansiert | Alle
Submitted    | Utføres når tjenesteutgaven sendes inn       | Innsendingstjeneste
Archived     | Utføres når tjenesteutgaven blir arkivert    | Innsendingstjeneste
Opened       | Utføres når tjenesteutgaven åpnes            | <ul><li>Meldingstjeneste <li>Innsynstjeneste (må kodes inn i bestilt proxy-tjeneste)</ul>
Confirmed    | Utføres når tjenesteutgaven bekreftes lest   | Meldingstjeneste


Egendefinerte hendelser er hendelser som tjenesteeier utløser og sender til Altinn. Disse må da bli implementert av sluttbrukersystemet. Det
er da opp til implementasjonen å avgjøre når dette skjer. Det er ingen bestemt syntaks for navngiving av egendefinerte hendelser,
eksem­pel­vis **«DeadlineExpired»**.

Dialogsider kan ha en webdel som viser hendelser. Du kan bestemme om en overgang skal vises i denne listen eller ikke ved å bruke
avkryssingsboksen «Vis i hendelsesliste».

![Figur 64 - Lage overgang](/docs/images/guides/tul/lage-overgang.png?width=700 "Figur 64 - Lage overgang")

For at overgangen skal fungere, må du også lage tilstanden som den skal føre til. Denne fyller du ut på samme måte som starttilstanden. Det
er viktig at du gir den samme navn som du brukte i «Til tilstand» i overgangen.

![Figur 65 - Ny tilstand](/docs/images/guides/tul/ny-tilstand.png?width=700 "Figur 65 - Ny tilstand")

Rolledefinerte dialogsider kan du bruke dersom du har dialogsider som bare skal vises til brukere med bestemte roller. De dialogsidene du
velger her vil bli vist i stedet for den som er valgt for tilstanden dersom en bruker har en bestemt rolle. For å sette opp hvilken rolle
dette skal være, må du [overstyre rettigheter](../felles-funksjonalitet/#overstyr-rettigheter) for dialogsiden. Bruk sekvensnummer for å avgjøre
hvilken rekkefølge SBL vil sjekke dialogsidene for rollekrav. Du bør sette den dialogsiden med mest spesifikke rollekrav først.

### Gjenbruk av data

Gjenbruk av data kan defineres innenfor en samhandlingstjeneste. En gjenbruksdefinisjon angir hvilke felter som skal kopieres fra en
tjenesteutgave til en annen. Det kan bare gjøres for innsendings- og meldingstjenester, og den tjenesten som skal avgi data må være lagret i
sluttbrukers meldingsboks. Når sluttbruker starter en tjenesteutgave som skal gjenbruke data fra en annen, vil data kunne hentes – enten
automatisk, eller etter at sluttbruker har bekreftet, eventuelt også valgt hvilken tjenesteinstans data skal hentes fra.

For å gjenbruke data må det lages en XSLT-fil som mapper datafelt mellom XML for avgivende tjeneste (produsent) og XML for tjenesten som
mottar data (konsument). Hver XSL-transformasjon må resultere i en «transformert XML» som er gyldig iht. skjema­format/XSD for konsumenten.
For meldingstjenester som inneholder flere Infopath-vedlegg, er det aktuelt å lage flere XSLT-filer, der hver fil mapper fra ett
produsentskjemas XML til konsument­skjemaets XML. Når gjenbruksdefinisjonen behandles i Sluttbrukerløsningen, vil XLS-transformasjonene
kjøres på hvert enkelt produsentskjema i vilkårlig rekkefølge. For hver påfølgende transformasjon vil de resulterende «transformerte
XMLene» slås sammen i en «felles, transformert (merged) XML», som importeres i konsument-skjema ved instansiering.

Hvis [preutfylling](../innsending/#preutfylling) benyttes for konsumenten, finner dette sted etter at eventuelle gjenbruks­definisjoner er behandlet. Preutfylling vil
dermed kunne overskrive gjenbruk av data.

I TUL lager du en gjenbruksdefinisjon ved å velge hvilke utgaver som avgir/mottar data, og bla deg fram til og laste opp XSLT-filen. For en
meldingstjeneste må du også velge hvilket skjema det gjelder, siden samme tjeneste kan ha flere skjema. Hvis du definerer gjenbruk av
datafelter fra flere skjema innenfor samme meldingstjeneste, må du sørge for at feltene ikke overskriver hverandre i konsument-tjenesten.
Hvis sluttbrukers tjenesteinstans i praksis kan inneholde flere vedleggsskjema, må felter fra disse skjemaene derfor ikke mappes til samme
felt i konsumenten.

![Figur 66 - Gjenbruk av data](/docs/images/guides/tul/gjenbruk-av-data.png?width=700 "Figur 66 - Gjenbruk av data")

Skal du endre en gjenbruksdefinisjon, sletter du den i listen ved å klikke på *Slett*-lenken, og laster opp på nytt.

### Merknadsliste

En merknad er en beskjed som kan sendes fra tjenesteeier og vises til sluttbruker i SBL. En merknad kan sendes fra tjenesteeiers systemer
til sluttbrukers samhandlingstjeneste i Altinn, eller til en underliggende tjeneste. Det kan defineres et sett med merknader som kan brukes
innenfor en samhandlingstjeneste. Hver merknad får tildelt en ID og kan oversettes, som andre parametre i TUL.

![Figur 67 – Merknadsliste](/docs/images/guides/tul/merknadsliste.png?width=700 "Figur 67 – Merknadsliste")

Du skriver inn en merknadstekst i tekstfeltet øverst på *Merknadsliste-*siden i TUL. Merknadsteksten kan inneholde variable på følgende
format: "merknadstekst $$variabelnavn$$ mer tekst". Trykk deretter på knappen *Legg til* for å legge den til i listen over merknader. I
listen ser du hvilken ID merknaden er tildelt. Merknadene kan endres eller slettes i etterkant ved å klikke på lenkene *Endre* eller *Slett*
knyttet til hvert innslag i listen.

Merknader kan vises i dialogkomponentene *Min meldingsboks* eller *Status* i en dialogside. Dialogkomponentene må være konfigurert til å
kunne vise merknad for at disse skal vises i SBL.

![Figur 68 – Dialogkomponenten “Status”](/docs/images/guides/tul/dialogkomponent-status.png?width=700 "Figur 68 – Dialogkomponenten “Status”")

![Figur 69 – Dialogkomponenten “Min meldingsboks”](/docs/images/guides/tul/dialogkomponent-min-meldingsboks.png?width=700 "Figur 69 – Dialogkomponenten “Min meldingsboks”")

## Innhold - samhandlingstjeneste

### Dialogsider

Ved å utvikle dialogsider bestemmer du hvordan samhandlingstjenesten skal presenteres i SBL for hver enkelt tilstand av tjenesten. For hver
[tilstand](#tilstander) kobler du til en dialogside. Tilstandene kan ikke ferdigdefineres før dialogsidene er opprettet.

![Figur 70 - Dialogsider](/docs/images/guides/tul/samhandling-dialogsider.png?width=700 "Figur 70 - Dialogsider")


Dialogsider defineres ved hvilke dialogkomponenter de skal inneholde. For hver dialogside og -komponent angis parametre som styrer innhold
og presentasjon for sluttbruker. Utvikling av dialogsider er også en designoppgave der kunnskap om brukerinteraksjon og visuell design er
nyttig.

Det vi i TUL/Altinn kaller *dialogkomponent* og *dialogside* vil i grensesnittet i TUL enkelte steder omtales som henholdsvis *webdel* og
*webdel-side*. Dette er fordi TUL er bygget på standard SharePoint-komponenter, og dialogsidene er bygget opp av SharePoints standard
webdel-komponenter*.*

En dialogside kan lages ny, eller ved å kopiere en eksisterende dialogside.

![Figur 71 - Kopi av dialogside](/docs/images/guides/tul/dialogside-kopi.png?width=700 "Figur 71 - Kopi av dialogside")

Hvis du velger å opprette en ny dialogside, vil en parameterside *Ny dialogside* åpnes. Her kan du skrive inn et navn på dialogsiden og
velge en oppsettsmal. Navnet er et filnavn som brukes i TUL.

TUL inneholder 6 oppsettsmaler som tjenesteutvikler kan velge mellom når dialogsiden lages. Du velger hvilken mal du vil bruke til
dialogsiden fra en liste med beskrivende navn for malen. Legg merke til figuren som illustrerer sideinndelingen.

![Figur 72 – Opprette dialogside](/docs/images/guides/tul/dialogside-opprette.png?width=700 "Figur 72 – Opprette dialogside")

Når template er valgt kan du legge til webdeler/dialogkomponenter ved å trykke på *Legg til en webdel.*

![Figur 73 – Dialogside i redigeringsmoduse](/docs/images/guides/tul/dialogside-i-redigeringsmodus.png?width=700 "Figur 73 – Dialogside i redigeringsmoduse")

### Dialogkomponenter

Det eksisterer 10 tilgjengelige webdeler/dialogkomponenter:

  - Aktiv innsynstjeneste
  - Aktører
  - Grafikk
  - Hendelser
  - Informasjon
  - Kommentarfelt
  - Lenker
  - Status
  - Utvalg fra Min meldingsboks
  - Utvalg fra Tjenestekatalogen

Når du har valgt å legge til en webdel på en dialogside vil ribbon endre seg til en liste over de 10 tilgjengelige dialogkomponentene.

![Figur 74 – Ribbon-meny for å velge dialogkomponent](/docs/images/guides/tul/velg-dialogkomponent.png?width=700 "Figur 74 – Ribbon-meny for å velge dialogkomponent")

#### Tilpass utseende og innhold

Du kan endre overskrift og tilpasse utseende til dialogkomponentene i SBL. I tillegg kan du tilpasse innholdet i de fleste
dialogkomponentene ved å sette parametre knyttet til innholdet.

For å endre en webdel må du åpne den i editeringsmodus. Dette gjør du ved å klikke på pillenken til høyre og deretter *Rediger webdel* i
webdelens header:

![Figur 75 – Endre dialogkomponent](/docs/images/guides/tul/endre-dialogkomponent.png?width=700 "Figur 75 – Endre dialogkomponent")

![Figur 76 – Dialogkomponent i redigeringsmodus](/docs/images/guides/tul/dialogkomponent-i-redigeringsmodus.png?width=700 "Figur 76 – Dialogkomponent i redigeringsmodus")

Tabellen under viser en oversikt over parametrene knyttet til dialogkomponentenes utseende. Disse parametrene er felles for alle
dialogkomponentene. Verdiene i **fet** skrift representerer standard-utseende (default-verdier).

<table>
<thead>
<tr>
    <th colspan="2">Overskriftsvisning</th>
    <th colspan="2">Ramme</th>
    <th colspan="2">Bakgrunn</th>
    <th colspan="2">Ekstra avstand</th>
    <th colspan="2">Skillelinje</th>
    <th>Høyde</th>
</tr>
</thead>
<tbody>
<tr>
    <td>Ingen</td>
    <td>Ingen tekst</td>
    <td><strong>Ingen</strong></td>
    <td><strong>Ingen ramme, kun strek under tittel</strong></td>
    <td><strong>Ingen</strong></td>
    <td><strong>Ingen bakgrunn</strong></td>
    <td><strong>Ingen</strong></td>
    <td><strong>25px</strong></td>
    <td><strong>Ingen</strong></td>
    <td><strong>Ingen skillelinje</strong></td>
    <td><strong>Dynamisk</strong></td>
</tr>
<tr>
    <td><strong>Diskret </strong></td>
    <td><strong>12px</strong></td>
    <td>Diskret</td>
    <td>1px blå ramme + skygge</td>
    <td>Diskret</td>
    <td>Lys blå, #f2f6f8</td>
    <td>Over</td>
    <td>45px</td>
    <td>Over</td>
    <td>3px blå-hvit-blå skillelinje</td>
    <td>Fast</td>
</tr>
<tr>
    <td>Markant</td>
    <td>12px med blå gradert bakgrunn</td>
    <td>Markant</td>
    <td>3px blå-hvit-blå ramme + skygge</td>
    <td>Markant</td>
    <td>Medium blå,<br />#d0e0e7</td>
    <td></td>
    <td></td>
    <td>Under</td>
    <td>3px blå-hvit-blå skillelinje</td>
    <td></td>
</tr>
</tbody>
</table>

Parametrene som gjelder innholdet i dialogkomponentene vil variere fra komponent til komponent.

#### Aktiv innsynstjeneste
For dialogkomponenten *Aktiv innsynstjeneste* kan du bare velge hvilken innsynstjeneste som skal vises i komponenten. Utover dette er det
ingen innholdsparametre du kan sette. Det er en forutsetning at innsynstjenesten er definert i samhandlingstjenestenes tjenesteutvalg for at
den skal listes i nedtrekkslisten hvor du velger tjenester.

![Figur 77 – Aktiv innsynstjeneste](/docs/images/guides/tul/dialogkomponent-aktiv-innsynstjeneste.png?width=700 "Figur 77 – Aktiv innsynstjeneste")

#### Aktører
Dialogkomponenten *Aktører* lister tjenesteeiere og sluttbrukere som er involvert i samhandlingstjenesten. Du kan tilpasse innholdet i
dialogkomponenten ved å sette eller ta bort haker i sjekkboksene *Vis sluttbrukere som har endret tjenesten, Vis sluttbrukere med
overstryrte rettigheter* og *Vis tjenesteeiere.*

![Figur 78 – Aktører](/docs/images/guides/tul/dialogkomponent-aktører.png?width=700 "Figur 78 – Aktører")

#### Grafikk
I dialogkomponenten *Grafikk* kan du velge et bilde fra grafikkbiblioteket på arbeidsflaten for samhandlingstjenesten. Det anbefales i
tillegg å legge inn en alternativ tekst og eventuelt en tooltip. Alternativ tekst vil vises i tilfeller der bildet ikke vises, for eksempel
hvis sluttbruker har valgt å ikke vise bilder i nettleseren. Om sluttbruker benytter Jaws (skjermoppleser som brukes av blinde) vil
alt-teksten leses opp. Tooltip er teksten som kommer opp i en gul liten boks når du holder musepekeren over bildet, den vil kunne gi
sluttbruker tilleggsinformasjon om bildet. Jaws vil lese både alt-teksten og tooltip-teksten.

![Figur 79 – Grafikk](/docs/images/guides/tul/dialogkomponent-grafikk.png?width=700 "Figur 79 – Grafikk")

#### Hendelser
Dialogkomponenten *Hendelser* brukes for å liste hendelser som kan føre til overgang til en ny tilstand innen samhandlingstjenesten. Ved å
sette eller ta bort haken i sjekkboksen *Vis tidligere hendelser* kan du velge hvorvidt hendelser fra tidligere dialogsider skal vises. På
parametersiden *Tilstander* kan du gi hendelsene som listes i denne dialogkomponenten gode, brukervennlige navn. På denne siden kan du også
velge hvorvidt en hendelse skal listes i denne dialogkomponenten eller ikke.

![Figur 80 – Hendelser](/docs/images/guides/tul/dialogkomponent-hendelser.png?width=700 "Figur 80 – Hendelser")

#### Informasjon
Dialogkomponenten *Informasjon* gir mulighet til å skrive inn en informasjonstekst i en WYSIWYG-editor. Utover dette er det ingen parametre
som kan settes for innholdet i komponenten.

![Figur 81 – Informasjon](/docs/images/guides/tul/dialogkomponent-informasjon.png?width=700 "Figur 81 – Informasjon")

#### Kommentarfelt
For dialogkomponenten *Kommentarfelt* er det ingen parameter som kan settes for innholdet. Denne dialogkomponenten gir sluttbruker mulighet
til å legge inn egne kommentarer på siden.

![Figur 82 – Kommentarfelt](/docs/images/guides/tul/dialogkomponent-kommentarfelt.png?width=700 "Figur 82 – Kommentarfelt")

#### Lenker
Dialogkomponenten *Lenker* gir deg mulighet til å legge til egendefinerte lenker på dialogsiden. Du kan velge å ha en overskrift som
grupperer en eller flere lenker, legge til en lenketekst, URL, tooltip og definere hvorvidt du vil at lenken skal åpnes i et nytt
nettleservindu. Hvis du legger til flere lenker kan du i etterkant endre rekkefølgen på lenkene.

![Figur 83 – Lenker](/docs/images/guides/tul/dialogkomponent-lenker.png?width=700 "Figur 83 – Lenker")

#### Status
I dialogkomponenten *Status* er det tenkt at du kan legge inn en statusmelding til sluttbruker. Du kan velge å vise tilstandsnavn og merknad
sammen med statusen ved å sette eller ta bort haker i sjekkboksene *Vis tilstandsnavn* og *Vis merknad.*

![Figur 84 – Status](/docs/images/guides/tul/dialogkomponent-status.png?width=700 "Figur 84 – Status")

#### Utvalg fra Min meldingsboks
Dialogkomponenten *Utvalg fra Min meldingsboks* lister alle instanser av tjenester som er definer i tjenesteutvalget for
samhandlingstjenesten. Dialogkomponenten vil liste alle instansene av tjenesten uavhengig av tilstand, men filtrert ut i fra parametrene du
kan sette for dialogkomponenten. Du setter filtrene ved å sette eller ta bort haker i sjekkboksene *Til min behandling, Venter på andre* og
*Arkivert.*

Du kan også tilpasse innholdet i dialogkomponenten ved å velge hvilke kolonner fra *Min meldingsboks* som skal vises. Dette gjør du også ved
å sette eller ta bort haker for disse kolonnene (*Tittel, Status, Dato* etc.).

![Figur 85 – Utvalg fra Min meldingsboks](/docs/images/guides/tul/dialogkomponent-min-meldingsboks.png?width=700 "Figur 85 – Utvalg fra Min meldingsboks")

#### Utvalg fra Tjenestekatalogen
Dialogkomponenten *Utvalg fra Tjenestekatalogen* kan liste tjenester som er definer i tjenesteutvalget for samhandlingstjenesten. Du må
aktivt legge til tjenestene fra nedtrekkslisten og legge de til dialogkomponenten. Du kan tilpasse innholdet ved å sette eller ta bort haker
i sjekkboksene *Vis tjenesteeier, Skjul kolonneoverskrifter* og *Vis bare tjenester som sluttbruker har rettighet til*.

![Figur 86 – Utvalg fra tjenestekatalogen](/docs/images/guides/tul/dialogkomponent-tjenestekatalog.png?width=700 "Figur 86 – Utvalg fra tjenestekatalogen")

### Egendefinerte dialogkomponenter

Dersom tjenesteutvikler ønsker andre dialogkomponenter, kan disse utvikles separat og
tilgjengeliggjøres i SBL og TUL slik at de kan velges som del av en dialogside.

Dette består da av flere prosesser, som ikke tjenesteutvikler kan gjøre helt på egenhånd,
siden dette inkluderer tilpassning av allerede eksisterende Altinn kildekode. For at
komponentene skal bli tilgjengelige, kreves det bistand både fra leverandør og
driftsleverandør. Noen av forutsetningene vil være tilgang til Altinn-kode for integrasjon/test –
herunder et fullt Altinn utviklingsmiljø med Sharepoint installert. "Andre dialogkomponenter"
vil kunne være komponenter som viser et helt annet innhold – typisk fra tjenesteeier selv.

Følgende må gjøres ifm utvikling og tilgjengeliggjøring av dialogkomponenter:

 - Tjenesteeier (IKT/tekniker) utvikler web parts (én for TUL og én for SBL) i sitt utviklingsmiljø/Visual Studio.
   For GUI bør User Controls benyttes.
 - Leverandør legger på arv fra korrekte baseklasser, før Leverandør og Driftsleverandør kvalitetssikrer i Altinn
   utviklings-/testmiljø og deployer til TUL og SBL. Hvis data skal hentes eksternt må infrastruktur tilrettelegges
   (f.eks. åpning av brannmurer) eksternt, samt i TUL og SBL.
 - Fagperson finner komponenten i TUL og jobber som vanlig.

### Grafikkbibliotek

Grafikkbiblioteket brukes til å laste opp bilder som skal brukes i dialogkomponenten *Grafikk*. Dette er bare relevant hvis du bruker denne
komponenten i en eller flere dialogsider.

