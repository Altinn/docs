---
title: Administrators oppgaver
description: Oppgaver for administrator fra den enkelte tjenesteeier.
toc: true
---

I TUL er langt fra alle administratorer, og det anbefales kun at en eller to personer fra hver tjenesteeier har administratorrettigheter.
Disse er kalt *tjenesteeieradministrator*. I tillegg vil det være en eller to såkalte ASF-administrator. Disse er da administratorer for
hele TUL, og ikke bare den enkelte tjenesteeier. Felles for disse to administratorgruppene er at de skal og kan utføre oppgaver som ikke er
tiltenkt vanlige tjenesteutviklere. Dette være seg å legge inn nye prosessflytmaler, legge til betingelser, opprette brukere eller angi
rettigheter i TUL. Denne beskrivelsen vil ta for seg noen av scenarioene, men ikke hvor standardproduktene dekker hele funksjonaliteten som
ikke er spesifikk for TUL.

## Prosessflytmaler

Som nevnt ifbm. [prosessflyt i innsendingstjenesten](../../tjenestetyper/innsending/#prosessflyt), finnes to typer prosessflytmaler i TUL, en felles og en spesifikk for tjenesteeieren. ASF-administrator legger
til nye felles maler, mens de enkelte tjenesteeier-administratorene legger til for den enkelte tjenesteier. Begge typer maler er bygget på
samme måte, men tjenesteeierspesifikk mal har utfylte verdier.

Malene behøver kun å lastes opp i riktig dokumentbibliotek for å fungere. For felles maler legges de i dokumentbiblioteket *Tomme
prosessflytmaler* på startsiden. Dette biblioteket er ikke synlig direkte, men aksesseres via *Områdehandlinger.* For tjensteeierspesifikke
maler lastes de opp i dokumentbiblioteket *Pre-definerte prosessflytmaler* på den enkelte tjenesteeierarbeidsflaten. Ei heller dette
biblioteket er synlig for alle, men må aksesseres via *Områdehandlinger.* Ved opplasting i bibliotekene er det viktig at dokumenttype settes
til prosessflytmal og at prosessflytmal-id er unikt innad i dokumentbiblioteket.

Malene er XML-filer som har en proprietær struktur som prosessflytsiden i TUL kan tolke.

Kapitlene nedenfor forklarer de ulike seksjonene i XML filen.

### XML seksjon – Malinformasjon

Denne seksjonene inneholder generell informasjon om prosessflytmalen og vises i brukergrensesnittet på prosessflytsiden.

```xml
<WorkflowId>12</WorkflowId>
<Name>
  <Text lcid="1044">Navn …</Text>
  <Text lcid="1033">Namn …</Text>
  <Text lcid="2068">Name of process flow</Text>
</Name>
<Description>
  <Text lcid="1044">Beskrivelse …</Text>
  <Text lcid="1033">Beskrivnong …</Text>
  <Text lcid="2068">Description of workflow</Text>
</Description>
```

`<WorkflowId>` identifiserer hvilken arbeidsflyt som skal benyttes I SBL. P.t. skal den alltid være 1. ID’en er ikke vist i
brukergrensesnittet.

`<Name>` er navnet på malen og skal finnes på minimum språkene bokmål (1044) og engelsk (1033). Attributtet `lcid` angir dette.
Teksten i noden vises i brukergrensesnittet i nedtrekkslisten over tilgjengelige maler.

`<Description>` inneholder malens beskrivelse på flere språk. Denne teksten vises under nedtrekkslisten etter at bruker har byttet mal i
nedtrekkslisten.

All informasjonen i denne seksjonen i XML-filen er statisk i brukergrensesnittet, og må endres direkte i XML-filen.

### XML seksjon – Steg

Denne seksjonen inneholder informasjon om stegene, og det kan være mange steg-noder i denne seksjonen. Steg-noden beskriver steget mtp.
oppførsel i SBL. Det vil også være et navn og en beskrivelse for hvert steg som vist i XML nedenfor:

```xml
<Step activityId="1" activityType="Signing">
  <Name>
    <Text lcid="1044">Navn …</Text>
    <Text lcid="1033">Namn …</Text>
    <Text lcid="2068">Name of process flow</Text>
  </Name>
  <Description>
    <Text lcid="1044">Beskrivelse …</Text>
    <Text lcid="1033">Beskrivnong …</Text>
    <Text lcid="2068">Description of workflow</Text>
  </Description>
</Step>
```

I hovedsak er det to attributter:

  - **ActivityId:** Identifiserer ID’en til steget. Steg-ID’en skal være i sync mellom SBL og TUL, og to steg kan ikke ha same ID, og det må
    angis i stigende rekkefølge.
  - **ActivityType:** Beskriver type steg. Skal enten være *Formfilling*, *Signing* eller *SendIn*.

Hvert steg må også ha noder som omhandler sikkerhetsnivå og rettigheter. Disse deklarer at sikkerhetsnivå og rettighetsvelgeren skal vises
for steget, og det er viktig at *actionType* i *AuthorizationRequirements* er det samme *activityType* som i stegbeskrivelsen, som vist
under:

```xml
<AuthenticationLevel propertyType="AuthenticationLevel"/>
<AuthorizationRequirements propertyType="AuthorizationRule" actionType="Signing" />
```

### XML seksjon – Egenskaper

Denne seksjonen i XML-filen kan forekomme ingen eller flere ganger pr steg, og gir muligheten for å definere ekstra parameter utover
sikkerhetsparametere. Et typisk slikt parameter vil være signeringstekst. En egenskapseksjon består av flere deler, hvorav tre er påkrevd:

Tabell 2 – XML egenskaper

| Del         | Påkrevd | Beskrivelse                                                                                           |
| ----------- | ------- | ----------------------------------------------------------------------------------------------------- |
| Value       | Yes     | Kan brukes til å definere egenskapen defaultverdi, men er tom for felles maler                        |
| Label       | Yes     | Vil være ledeteksten som vist for egenskapen I TUL. Språkstøttet.                                     |
| Description | Yes     | Beskrivelsen som vist under ledeteksten for egenskapen. Språkstøttet.                                 |
| Validation  | No      | Valideringsregel for egenskapen. Vises hvis validering feiler. Språkstøttet. Benytter regulæruttrykk. |

Eksempel på XML’en er vist under:

```xml
<Property name="SomeIntegerProperty" propertyType="xs:int">
  <Value></Value>
  <Label>
    <Text lcid="1044">Antall</Text>
    <Text lcid="1033">Count</Text>
    <Text lcid="2068">Antal</Text>
  </Label>
  <Description>
    <Text lcid="1044">Viser antall</Text>
    <Text lcid="1033">Shows the count</Text>
    <Text lcid="2068">Visar antal</Text>
  </Description>
  <Validation regExp="\d\d\d\d">
    <Text lcid="1044">Må være fire tall</Text>
    <Text lcid="1033">Must be four digits</Text>
    <Text lcid="2068">Må vere fire tal</Text>
  </Validation>
</Property>
```

`<Property>`-noden er rotnode for parameteret og inneholder et navn som må være unik innad i malen og samsvare med SBL, og viktigst
`propertyType`-attributten. Mulige verdier i PropertyType følger i de neste delkapitlene. Undernodene til rotnoden er angitt i tabellen
over.

#### XML propertyType

Tabellen under viser hvilke typer som kan benyttes.

Tabell 3 – XML PropertyType

Type       | UI-element                    | Beskrivelse
---------- | ----------------------------- | ----------------------------------------
xs:choice  | RadioButton<br>Nedtrekksliste | Beskrives under denne tabellen
xs:string  | TekstBox                      | Fritekst iht evt validering
xs:date    | Datovelger                    | Dato
xs:integer | TekstBox                      | Kun numeriske verdier iht evt validering
xs:boolean | Sjekkboks                     | Checked, Unchecked, True, False, 1, 0 


`xs:choice` benyttes for ferdigdefinerte valg i prosessmalen, og krever derfor litt mer informasjon enn de andre typene. Da verdiene er
språkstøttet, må det være en tekst for hvert språk. Hvis antall valg overskrider *tre*, vil det bli presentert en nedtrekksliste istedenfor
radioknapper. Et eksempel er gjengitt under:

```xml
<Property name="ChooseFruit" propertyType="xs:choice">
  <Choice value="Apple">
    <Text lcid="1044">Eple</Text>
    <Text lcid="1033">Apple</Text>
    <Text lcid="2068">Eple</Text>
  </Choice>
  <Choice value="Orange">
    <Text lcid="1044">Appelsin</Text>
    <Text lcid="1033">Orange</Text>
    <Text lcid="2068">Appelsin</Text>
  </Choice>
  <Choice value ="Banana">
    <Text lcid="1044">Banan</Text>
    <Text lcid="1033">Banana</Text>
    <Text lcid="2068">Banan</Text>
  </Choice>
  <Value></Value>
  <Label>
    <Text lcid="1044">Velg frukt</Text>
    <Text lcid="1033">Choose fruit</Text>
    <Text lcid="2068">Velg frukt</Text>
  </Label>
  <Description>
    <Text lcid="1044">Du kan velge en av fruktene</Text>
    <Text lcid="1033">You can choose only one fruit</Text>
    <Text lcid="2068">Vel berre ein frukt</Text>
  </Description>
</Property>
```

### Tjenesteeiers maler

Tjenesteeiers maler har mulighet til å være helt eller delvis preutfylte. Dvs. at et sett med rettigheter autoimatisk kan settes pr. steg.
Det vil også si at sikkerhetsnivå og andre egenskaper kan preutfylles.

Sikkerhetsnivå og rettigheter angis ved å legge de i XML-nodene i malen:

```xml
<AuthenticationLevel propertyType="AuthenticationLevel">1<AuthenticationLevel/>
<AuthorizationRequirements propertyType="AuthorizationRule" actionType="Signing">ALLEA-SIGNE<AuthorizationRequirements/>
```

Signeringstekst og andre egenskaper.

```xml
<Property name="SigningText1" propertyType="xs:string"> 
  <Value>Dette er min signeringstekst</Value> 
</Property>

<Property name="ChooseFruit" propertyType="xs:choice">
  <Choice value="Apple">
    <Text lcid="1044">Eple</Text>
    <Text lcid="1033">Apple</Text>
    <Text lcid="2068">Eple</Text>
  </Choice>
  <Choice value="Orange">
    <Text lcid="1044">Appelsin</Text>
    <Text lcid="1033">Orange</Text>
    <Text lcid="2068">Appelsin</Text>
  </Choice>
  <Value>Orange</Value>
</Property>
```


## Administrasjon av brukere, grupper og rettigheter

Beskrivelse av hvordan man administrerer brukere, grupper og rettigheter finnes i dokumentet
[Veiledning for brukeradministrasjon i TUL.pdf](https://altinn.brreg.no/sites/dokument2/Dokumentasjon/06%20Brukerdokumentasjon/02%20-%20Brukerdokumentasjon%20for%20tjenesteutvikling/Veiledning%20for%20brukeradministrasjon%20i%20TUL.pdf).

## Lage ny tjenesteeier

En etat i TUL kalles også en *tjenesteeier*, og fungerer som en samling for alle etatens tjenester og utgaver.

### Forberedelser

For å opprette en ny tjenesteeier i TUL må først noen praktiske ting være ordnet av driftsleverandør:

  - Åpning av brannmur for å slippe inn nye tjenesteutviklere
  - Tilgang til Citrix for the den nye etatens brukere
  - Tjenesteeieren må være opprettet i Sluttbrukerløsningene som er knyttet til TUL. Tjenesteeierkodene må stemme overens.

Det normale vil være å gi etaten en tre/fire bokstavers forkortelse som identifikator. F.eks. vil Skatteetaten være SKD, Statistisk
Sentralbyrå være SSB etc. Denne identifikatoren benyttes i adressen (URL) til tjenesteeiers arbeidsflate.

### Active directory

Det første som må gjøres er å opprette kataloger (Organization unit) og grupper i Active Directory. Disse vil være tjenesteeierspesifikke og
skal følge samme hierarki som for BRG:

Tabell 4 – Active
directory

| Navn                                        | Medlem av gruppe                 | Medlemmer                                              | Plassering                                        |
| ------------------------------------------- | -------------------------------- | ------------------------------------------------------ | ------------------------------------------------- |
| Service Owner XXX Files and folders         |                                  |                                                        | Altinn/Service Owner XXX                          |
| Service Owner XXX SharePoint Administrators | All Service Owner Administrators | Brukere som skal være tj.eier administrator            | Altinn/Service Owner XXX                          |
| Service Owner XXX Users                     | All Service Owner Users          | Alle etatens tjenesteutviklere                         | Altinn/Service Owner XXX                          |
| Service Owner XXX Code List editors         | Service Owner Code List editors  | Alle som skal ha tilgang til å vedlikeholde kodelister | Operations/Administrative Users and global groups |
| Service Owner XXX Group administrators      | AD Snap-In Access                | Alle som skal vedlikeholde brukere for etaten          | Operations/Administrative Users and global groups |
| Service Owner XXX Password administrators   | AD Snap-In Access                | Alle som skal vedlikeholde brukere for etaten          | Operations/Administrative Users and global groups |
| Service Owner XXX User administrators       | AD Snap-In Access                | Alle som skal vedlikeholde brukere for etaten          | Operations/Administrative Users and global groups |

(XXX er den nye etatens kode)

### Tjenesteeierverktøy

Det er kun administratorer av TUL sin startside som kan opprette tjenesteeiere. For å opprette dette, må vedkommende navigere til følgende
plassering:
```
http://<miljø>/_layouts/altinn/ServiceOwner.aspx
```

Der må administrator fylle ut i følgende skjermbilde:

![Figur 135 – Tjenesteierverktøy](/docs/images/guides/tul/tjenesteeierverktøy.png "Figur 135 – Tjenesteierverktøy")

Legg inn relevant data og klikk på *Create/Opprett.*Tjenesteeieren opprettes og status vises:

![Figur 136 – Tjenesteeier opprettet](/docs/images/guides/tul/tjenesteeier-opprettet.png "Figur 136 – Tjenesteeier opprettet")

Som markert i rødt over, vil også en lenke til den nye arbeidsflaten vises. Klikker man på den, taes man til den nye tjenesteeieren.

Hvis opprettelse feiler, vil dette vises på samme sted.

Hvis arbeidsflaten ikke inneholder veiledningskomponent og tjenesteliste, må disse aktiveres.  
Dette gjøres ved å klikke på *Områdehandlinger*.

![Figur 137 – Områdehandlinger](/docs/images/guides/tul/områdehandlinger.png "Figur 137 – Områdehandlinger")

På siden som kommer opp velger man *Funksjoner for områdesamling*, som vist under:

![Figur 138 – Funksjoner i områdesamling](/docs/images/guides/tul/funksjoner-i-områdehandling.png "Figur 138 – Funksjoner i områdesamling")

Man får nå en liste hvor alle Altinnspesifikke elementer skal aktiveres.

![Figur 139 – Områdefunksjoner](/docs/images/guides/tul/områdefunksjoner.png?width=700 "Figur 139 – Områdefunksjoner")

Når disse er aktivert vil alle elementer på arbeidsflaten være tilgjengelig. Nå gjenstår det å gi de riktige grupper og brukere tilgang til
den nye arbeidsflaten. Alle nye tjenester og utgaver vil arve disse tilgangene.

Gå til den nylig opprette tjenesteierarbeidsflaten og velg *Områdehandlinger*.

Velg så *Administrator for områdesamling*. Legg til brukeren(e) hos etaten som er tjenesteieradministrator.

Gå så til *Personer og grupper*. Her må du opprette tre grupper:

Tabell 5 – Personer og grupper

| Gruppenavn        | Rettighet     |
| ----------------- | ------------- |
| XXX site members  | Bidra         |
| XXX site owners   | Full kontroll |
| XXX site visitors | Lese          |

Det er ikke påkrevd at gruppene skal ha navnene angitt i tabellen over, men det er å anbefale. Dette er SharePointgrupper som man knytter
til Active Directory gruppene som følger:

Tabell 6 – Personer og grupper

| Gruppenavn        | AD gruppe                                |
| ----------------- | ---------------------------------------- |
| XXX site members  | Altinntul\\Service owner XXX users       |
| XXX site owners   | Altinntul\\ASF SharePoint Administrators |
| XXX site visitors | Altinntul\\All service owner users       |

(XXX er tjenesteeierkode)

Nå er tjenesteeieren/etaten klar til bruk.

## Betingelser (conditions)

Betingelser er SBL-kode som utvikles og sjekkes in i TFS av en utvikler. Disse betingelsene kan kjøres når en hendelse inntreffer som kan
føre til endring av tilstand for en samhandlingstjeneste.

Når koden er sjekket inn og migrert til tilhørende SBL-miljø, så må AFS-admin gå inn på følgende URL for å legge til den nye betingelsen for
at den skal kunne benyttes av en samhandlingstjeneste:

![Figur 140 - Liste med betingelser](/docs/images/guides/tul/betingelser.png?width=700 "Figur 140 - Liste med betingelser")

Merk: Navn på betingelse (tittel) er case-sensitiv og må samsvare med metodenavn som utvikler har kodet.

![Figur 141 - Legge til ny betingelse](/docs/images/guides/tul/ny-betingelse.png?width=700 "Figur 141 - Legge til ny betingelse")

## Gjenbrukbar logikk

Gjenbrukbar logikk (“hooks”) er kode som kjøres i SBL ved gitte hendelser i en tjenesteutgaves livsløp. Hvilken logikk som kjøres for en
gitt utgave defineres av tjenesteutvikler i TUL.

Når en ny gjenbrukbar logikk er kodet og migrert i tilhørende SBL-miljø, så må administrator legge inn en rad i listen.

Det er typisk Driftsleverandør som oppdaterer dette, men ASF-admin kan også gjøre det hvis nødvendig informasjon om hva som skal legges inn
er gitt.

Følgende typer logikk kan defineres:

  - **Instantiation**: Logikk kjøres når en utgave opprettes i SBL, og hvilken logikk som skal kjølres defineres på utgaveparametersiden.
  - **Payment**: Kjøres ved arkivering i SBL og velges på parametersiden for SKD betalingsinformasjon.

![Figur 142 - Gjenbrukbar logikk](/docs/images/guides/tul/gjenbrukbar-logikk.png "Figur 142 - Gjenbrukbar logikk")

## Betalingsadministrasjon

### Adgang til betalingsleverandøravtalesiden

For å få adgang til betalingsleverandøravtalesiden hos en tjenesteeier må brukeren være medlem av betalingsadministratorgruppen for
tjenesteeieren. Hva som er gruppe for betalingsadministrator blir avgjort av konfigverdien «PaymentAdminGroupName» i Altinn.TUL.config.
Gruppen må inneholde navnet som er definert der. I utgangspunktet er denne verdien «Payment Admin Group». Anbefalt struktur er å styre
tilgang gjennom grupper i AD som er medlem i disse SharePoint-gruppene. For eksempel en AD-gruppe «SKD betalingsadministratorer» som er
medlem av SharePoint-gruppe «SKD Payment Admin Group». Adgang blir deretter styrt ved å legge til eller fjerne brukere i AD-gruppen.

Dersom konfigverdien blir endret vil den nye verdien brukes for å bestemme adgang til siden. Lenken til siden fra tjenesteeierarbeidsflaten
blir derimot låst til en bestemt SharePoint-gruppe ved aktivering av tjenesteeier-featuren i SharePoint. Skal lenken oppdateres til å godta
en ny verdi i konfig, må denne featuren aktiveres på nytt etter at konfig er endret.

Adgang til siden bør begrenses til de personene som har ansvar for å opprette og vedlikeholde betalingsavtaler.

### Betalingsmetoder

Betalingsmetodene som vil være mulig å velge i TUL blir styrt av en SharePoint-liste i Startside site collection.
Denne listen vil du finne under «Områdeinnhold» med navn «Tilgjengelige betalingsmetoder».

![Tilgjengelige betalingsmetoder](/docs/images/guides/tul/liste-med-betalingsmetoder.png?width=700 "Tilgjengelige betalingsmetoder")

Listen skal inneholde alle de betalingsmetoder som det er ønskelig å kunne velge gjennom TUL. Hver enkelt betalingsmetode må legges inn med
et visningsnavn som er navnet som vil bli vist i TUL. I tillegg må det legges inn en kode for betalingsmetoden for hver enkelt
betalingsleverandør. Disse kodene må stemme overens med den koden som betalings­leverandøren bruker for denne metoden. Dersom koden er feil
vil ikke betalingsmetoden fungere for den leverandøren den er feil for. Beskrivelse er valgfritt, og vil ikke bli vist andre steder enn i
denne listen.

![Betalingsmetoder](/docs/images/guides/tul/betalingsmetoder.png?width=700 "Betalingsmetoder")

Metodene som blir lagt inn i listen er felles for alle tjenesteeiere og skal være alle betalingsmetoder som det skal være lov å velge mellom
dersom du velger å tillate begrensing av betalingsmetoder på betalingsleverandøravtalesiden.

### Prosessflytmal

For at betaling skal fungere må det brukes en prosessflyt som inneholder et betalingssteg. Administrator må derfor gjøre tilgjengelig (se
23.1 Prosessflytmaler) minst en prosessflytmal med betalingssteg. Ved innføring av betalingsfunksjonaliteten ble det opprettet fire
prosessflytmaler for betaling. Disse er «Betaling», «Utfylling og betaling», «Utfylling, signering og betaling» og «Utfylling, betaling og
signering».