---
title: "A: Skjemautvikling i InfoPath"
linktitle: "A: Skjemautvikling"
description: Stegvis utvikling av et skjema i InfoPath.
toc: true
weight: 1
---

For informasjon om mer generell InfoPath funksjonalitet, henvises til standard dokumentasjon for Microsoft InfoPath. Denne kan bl.a. finnes ved hjelp av hjelp-funksjonen
(trykk F1) i InfoPath eller på http://office.microsoft.com/nb-no/infopath/default.aspx

Det forventes at den som skal bruke dette dokumentet har bakgrunn fra bruk av dataverktøy og helst også fra programmering. Kjennskap til hva
en XSD er, og hvor den kommer fra er en betingelse for å utvikle skjemaer. Som en tommelfingerregel, er det anbefalt at alle skjema bygges
på en XSD, og det er XSD’en som angir hvilke felter som skjemaet skal bestå av. Samme XSD vil også bli benyttet senere for validering av
skjema ved innsending av sluttbruker.

Videre for de som skal programmere, forlanges kompetanse i bruk av Visual Studio.

## Før oppstart av InfoPath

I eksemplet beskrevet i dette dokumentet, skal det lages utvalgte deler av skjema RF-1189 og RF-1113.

Først bør det lages en egen katalog for lagring av filer knyttet til utvikling av skjemaet. Det skal her benyttes TUL-share. P.t. er det
`\\alt-tul-db-c02\tulshare\Infopath\etater` og hvilken tjenesteeier man utvikler for. Det bør lages én katalog pr. utgave.

På denne katalogen bør også datakilde (XSD) lagres. XSD kan hentes fra SERES før et skjema kan utvikles i InfoPath (inneholder definisjon av
hvilke felt som skal være med i skjema). Det er også mulig å lage XSD selv, eller lage XSD på bakgrunn av InfoPato-skjemaet i InfoPath.

## Altinn-definerte inputfelt

Ut av boksen lar ikke InfoPath deg benytte egendefinerte inputfelter i en repeterende gruppe. Dette er ønsket løst uten at hjelpefeltene må
legges til i skjemaets opprinnelige datakilde, i tidligere løsning omtalt som OR-spesifikasjon.

For å løse dette problemet må man benytte et *Altinn-definert* input felt. Et altinn-definert felt er et felt som er definert i en egen
datakilde, hvor datakilden enten er importert til eller refererer til hoveddatakilden. Dette gjøres ved å først lage datakilden hvor
hjelpefeltene skal ligge. Disse vil da ligge i et eget navnerom (namespace). Dette navnerommet må begynne med altinn i alle tilfeller.

Videre følger et eksempel på bruk av Altinn-definerte inputfelt i RF-1037. RF-1037 inneholder en tabell for arbeidsgiveravgift hvor bruker
skal velge en komunne fra en nedtrekksliste, hvorpå arbeidsgiveravgiftsone og komunnenummer skal vises automatisk. For å få dette til, må
man velge å legge arbeidsgiveravgiftsone og en radindeks (som ikke vises i skjema) i altinn-navnerommet. Dermed må man definere disse to
feltene i en egen datakilde, *altinn\_namespace.xsd*:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:or="http://www.brreg.no/or" 
xmlns="http://www.brreg.no/seres" xmlns:altinn="www.altinn.no/infopath-extensions" targetNamespace="www.altinn.no/infopath-extensions" elementFormDefault="qualified" attributeFormDefault="unqualified">
  <xs:element name="AltinnField_kommunenavn_grp_4953" type="xs:string"/>
  <xs:element name="AltinnField_sone_grp_4953" type="xs:string"/>
  <xs:element name="AltinnField_rowindex_grp_4953" type="xs:string"/>
</xs:schema>
```

Som man ser over er det angitt tre felter i altinn-datakilden. Nå må man i hovedkilden angi at denne datakilden skal kunne benyttes. Dette
gjøres ved å inkludere en import-statement i toppen av datakilden:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:brreg="http://www.brreg.no/or" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:altinn="www.altinn.no/infopath-extensions">  

<xs:import namespace="www.altinn.no/infopath-extensions" schemaLocation="altinn_namespace.xsd"/>
```


Merk at begge datakildene må ligge i samme katalog slik at InfoPath finner de.

Videre må man så i hoveddatakilden legge til de feltene man vil benytte fra altinn-navnerommet:

```xml
<xs:element name="TabellArbeidsgiveravgift-grp-4953">
  <xs:complexType>
    <xs:sequence>
      <xs:element minOccurs="0" ref="AvgiftsbetalerOrganisasjonsnummer-datadef-27605"/>
      <xs:element minOccurs="0" ref="KommuneNummer-datadef-5950"/>
      <xs:element minOccurs="0" ref="ArbeidsgiveravgiftGrunnlagSpesifisert-datadef-27607"/>
      <xs:element minOccurs="0" ref="RefusjonGrunnlagSpesifisert-datadef-27608"/>
      <xs:element minOccurs="0" ref="PensjonPremieTilskuddSpesifisert-datadef-27611"/>
      <xs:element minOccurs="0" ref="altinn:AltinnField_kommunenavn_grp_4953"/>
      <xs:element minOccurs="0" ref="altinn:AltinnField_sone_grp_4953"/>
      <xs:element minOccurs="0" ref="altinn:AltinnField_rowindex_grp_4953"/>
    </xs:sequence>
    <xs:attribute fixed="4953" name="gruppeid" type="xs:positiveInteger" use="required"/>
  </xs:complexType>
</xs:element>
```

Som vist over er det lagt til tre altinn-definerte felter i gruppen `TabellArbeidsgiveravgift-grp-4953`. Merk at disse tre nye feltene er
prefixet med navnerommet `altinn`. Disse feltene vil da vises i InfoPath etter at datakilden (XSD) er importert.

Se også beskrivelse av [skjemasett](../../tjenestetyper/innsending/#skjemasett).

Dermed kan de ”nye” feltene fritt benyttes hvor som helst i skjema, og i motsetning til vanlig egendefinerte hjelpefelter som man oppretter
direkte i InfoPath (typisk my:felter), kan disse feltene også benyttes i repeterende grupper. Merk at altinn-definerte felter *ikke* sendes
med til tjenesteier.

I og med at dette er vanlig tekst, kan f.eks. Notepad++ benyttes som editeringsverktøy.

## Oppstart av InfoPath, Import av XSD-fil og generell oppsett av skjema og layout

Start InfoPath, og velg ”*Ny”* fra *Fil*-menyen. Følgende skjermbildet vil vises.

![Figur 143 – InfoPath, utform skjemamal](/docs/images/guides/tul/utform-skjemamal.png?width=700 "Figur 143 – InfoPath, utform skjemamal")

Dobbelklikk på ikonet ”*XML eller XML-skjema”*. I neste skjermbilde angis navnet på datakilden (XSD) som skal benyttes, og velg å ikke
benytte flere datakilder. *Fullfør*. Husk å benytte den rettede datakilden hvis den kommer fra brreg. Skjemaet er nå klart til utvikles
videre.

![Figur 144 – Oversikt over alle grupper/felter som finnes i datakilden](/docs/images/guides/tul/oversikt-datakilde.png?width=700 "Figur 144 – Oversikt over alle grupper/felter som finnes i datakilden")

Som vist i figuren over, er det på høyre side i InfoPath en oversikt over alle grupper/felter som finnes i datakilden. På venstre side er
det et tomt område, hvor skjema skal bygges. Hit skal sidemal fra tjenesteier kopieres til på følgende vis:

  - I Windows Utforsker, høyreklikk ”sidemal\_skd-pmh2009-05-18.xsn” (gjelder for SKD, for andre etater kan man bruke andre maler med andre
    navn) og velg ”Design” fra meny. Klikk "OK" på evt feilmelding som dukker opp.
  - Kopier hele sidemal over i i det nye skjema (skjermbilde ovenfor) vha standard kopier/lim inn (eksempel Ctrl-A, Ctrl-C og Ctrl-V (i nytt
    skjema)):

En sidemal lages som et normalt InfoPath-skjema *uten* datakilde og kan benyttes som grunnlag for nye skjemaer. En sidemal bør kun inneholde
et absolutt minimum av funksjonalitet, og heller fokusere på riktig bakgrunnsfarge, skrifttyper, størrelser, logoer osv. Det anbefales at
alle elementer som for eksempel uttrykksbokser, tekstbokser, ikon o.l bør legges inn i egne tabeller slik at elementene blir ”låst fast” i
skjemaet som vist på figur under. Elementene i skjemaet vil da bli riktig posisjonert uavhengig av nettlesere som blir bruk i portalen. På
denne måten sikrer man en konform layout innenfor en tjenesteeier.

Se også [oppdatering av datakilde](#oppdatering-av-hoved-datakilde) for å bytte ut datakilde i et ekstisterende skjema.  
Det anbefales forøvrig at sidemalen lagres på arbeidsflate for tjenesteeier.

For at skjemaet ikke skal få horisontal scroll i SBL, er det viktig at bredden ikke overstiger **630px.** Denne bredden tar da høyde for
bredden på en evt. vertikal scrollbar, og det anbefales at det tas høyde for dette uansett om siden forventer vertikal scroll eller ikke.

![Figur 145 – Sidemal](/docs/images/guides/tul/sidemal.png?width=700 "Figur 145 – Sidemal")

Tilpass bilde til mal for det aktuelle skjema ved å evt fjerne felter og ledetekster. Marker felter og ledetekst samt tekstene
”Skjematittel” og ”Framskutt ledetekst”, og trykk ”Slett”.

Legg inn ny tekst for skjemaet. Alle tekster skal defineres i *beregnet verdi kontroller*. Velges fra ” kontroller” under menylinjen *Hjem*.

![Figur 146 – InfoPath, uttrykksboks](/docs/images/guides/tul/uttrykksboks.png "Figur 146 – InfoPath, uttrykksboks")

Legg inn tittelen på utgaven i hermeteng (”RF-1189 Årsoppgjør for utleie mv. fast eiendom 2008”). Se også [fargekoder Altinn](#fargekoder-altinn).
(foreløpig utgave pr 2009-05-18) for definering av riktig fargekode, font og størrelse for teksten. Dermed har vi en sidemal for kopiering
til øvrige sider i skjemaet ved og opprette sider og bruker utklippstavlefunksjonalitet.

## Alternativer for skjema

Før man laster opp Infopath skjema i TUL er det noen viktige innstillinger som må settes ellers vil man få problemer når man skal migrere
skjema. Man må gå inn på «Fil» på menylinjen og velg «alternativer for skjema». Gå deretter inn på «Sikkerhet og klarering» og velg
*fullstendig klarering*

![Figur 147 –InfoPath, Alternativer for skjema, sikkerhet og klarering](/docs/images/guides/tul/alternativer-for-skjema.png?width=700 "Figur 147 –InfoPath, Alternativer for skjema, sikkerhet og klarering")

Deretter må man gå inn på kompatibilitet i kategorien under alternativ for skjema. Velg *webleserskjema* som skjematype.

Hvis man skal bruke C\# kode i skjemaet sitt så må man også huske på å angi programmeringsspråk og plassering av prosjektkoden. Da går man
inn på «programmering» under kategorien, velger C\# som kodespråk og angir stien til en egen mappe under TUL share (G:)

![Figur 148 – InfoPath, Alternativer for skjema: programmeringsspråk](/docs/images/guides/tul/programmeringsspråk.png?width=700 "Figur 148 – InfoPath, Alternativer for skjema: programmeringsspråk")

## Oppdatering av (hoved)datakilde

Det kan i enkelte tilfeller være ønskelig å bytte ut hoveddatakilden med en ny, hvis for

eksempel det har tilkommet nye felter osv. Dette gjøres ved å velge ”Oppdater felt” under ”Data” på menylinjen . Du velger da den nye XSD’en
og angir at du ikke skal benytte flere kilder. Deretter er det viktig at man kjører ”Regelinspeksjon” fra samme Data-menylinje. Grunnen til
dette er at felter som eksisterte i den gamle datakilden, men er fjernet fra den, nye kan være benyttet i xPath-uttrykk. Dette må rettes opp
før utgaven kan migreres.

## Definisjon av sider i InfoPath skjema (Views)

Under menylinjen Sideutforming. ”Visning 1” vises som default. Visning betegner side i skjema. Velg ”*Ny visning”* og skriv navn. Man bør
definere beskrivende sidenavn for hver visning/side i InfoPath. Dette er ikke nødvendig, ettersom sidensidenavn og rekkefølge må oppgis i
TUL. Men det anbefales å gi navn med løpenummeret slik at sidene kan sees i riktig rekkefølge i InfoPath under utvikling. VITKIG: Sidenavn
kan ikke inneholde spesialtegn eller nasjonale tegn.

Fra Visning 1 kopieres det oppsettet man lagde (Ctrl A, Ctrl C) og limes inn på alle sider som skal finnes i skjema.

## Innlegging av felt fra Datakilde (fra XSD)

Velg side 1 (Visning 1) og bytt til *Datakilde*. Legg til *Uttrykksbokser* for tekstene ”Innledning” og ”Avgiver” som vist under. Husk å
sjekke fonter, farger etc. i henhold til sidemal.

Velg gruppe som skal være på denne siden, ved å markere ”Avgiver-grp-231” under ”GenerellInformasjon-grp-959”, som vist i eksemplet under.
Dra den fra Datakilde til punktet under overskriftslinje i skjema og velg *Kontroller i oppsettstabell* fra popup meny (merk at man ikke kan
velge hele siden – dvs gruppe med undergrupper, man må velge gruppe som kun inneholder orid’er. Er det flere slike grupper på side, må alle
dras inn på siden enkeltvis).

Det er også mulig å dra inn enkeltfelter ved å ikke markere hele gruppen, men markere enkeltfelter i datakilden.

![Figur 149 – Innlegging av felt fra datakilde](/docs/images/guides/tul/innlegging-av-felt-fra-datakilde.png?width=700 "Figur 149 – Innlegging av felt fra datakilde")

Linje med ”Gruppeid” skal ikke vises, og fjernes ved å markere linjen, høyreklikke og velge ”*Slett rader”*. Erstatt alle ledetekster i
layouttabellen med *Uttrykksbokser* og tekster som vist i eksempel under, i henhold til standard font/farge. Vær nøye med riktig ledetekst
til riktig felt. For å skape ”litt luft” i venstre kant av layout tabellen, anbefales det å legge inn en smal kolonne til venstre. Dette kan
gjøres ved markere tabellen, høyreklikke, og velge *Sett inn -\> Kolonne til venstre* fra popup. Denne vil være del av tabellen og det er
tabellen som må få riktig avstand til venstre marg.

Sett bakgrunnsfarge på grupperammen (layout tabellen), ved å markere gruppen, høyreklikk og velge *Kantlinjer og skygger*. Velg flipp
*Skygger* og sett riktig farge (ref avsnitt *Fargekoder Altinn).*

Feltene for fødselsnummer og organisasjonsnummer skal være skrivebeskyttet og ha bakgrunnsfarge for skrivebeskyttet felt. Marker felt og
velg bakgrunnsfarge fra verktøylinja. For å skrivebeskytte felt, dobbeltklikk på feltet, og *Egenskaper for tekstboks* vises. Grunnen er at
disse feltene skal preutfylles i sluttbrukerløsningen, og vil derfor inneha korrekt data iht folkeregisteret eller enhetsregisteret, og skal
dermed ikke kunne endres av utfyller.

Velg flipp *Visning* og marker *Skrivebeskyttet:*

![Figur 150 – InfoPath, tekstboks](/docs/images/guides/tul/infopath-tekstboks.png "Figur 150 – InfoPath, tekstboks")

Sett riktig størrelse på feltet i forhold til antall tegn, ved å velge flipp *Størrelse*, velg riktig enhet og bredde:

![Figur 151 – InfoPath, tekstboks, størrelse](/docs/images/guides/tul/infopath-tekstboks-størrelse.png "Figur 151 – InfoPath, tekstboks, størrelse")

Hvis det ikke er et vanlig tekstfelt man ønsker, men en annen type kontroll (radioknapp, nedtrekksliste osv) skal man høyreklikke på feltet
*Endre til* -\> og velge ønsket kontroll type:

Ved å høyreklikke på feltet og velge egenskaper kan man velge forskjellige innstillinger som: *skrivebeskyttet*, max antall tegn i feltet,
justering på innholdet, formatet på numerisk felt osv.

For å kunne tabulere i riktig rekkefølge, må man velge avanserte egenskaper og sette ønsket tabulatorindeks. Om feltet ikke skal være
tabulerbart så skal tabulatorindeks settes til -1.

## Kalkyler, eksempel på repeterende gruppe og radioknapper

Siden som nå er laget inneholder ikke kalkyler. Det er derfor behov for å bygge en side til, for eksempel side 3 i RF-1189. Vha. ”Legg til
visning …”-funksjonen nevnt ovenfor, vil vi kalle siden for ”View 3”. Denne inneholder også en repeterende gruppe (enten tabell for
innlegging av flere rader eller seksjon som kan også legges inn flere ganger etter hverandre), knapp (ikon) for hjelpetekst, samt kontroller
for radioknapp, nedtrekksliste og datovalg.

![Figur 152 – Skjema RF-1189. Visning 3.](/docs/images/guides/tul/infopath-rf1189-visning3.png "Figur 152 – Skjema RF-1189. Visning 3.")

I utgangspunktet benyttes samme fremgangsmåte som for første side i skjemaet. Ledetekster skal settes i hver sin uttrykksboks og feltene som
skal benyttes finnes i datakilde under hovedgruppen ”InntekterUtleieverdi-grp-960”. Legg inn den repeterende gruppen for utleieinntekter ved
å markere ”Utleie-grp-4939” i datakilden, og dra den inn på skjema. Du får nå 3 valg fra popupmeny, velg ”Gjentatt tabell” og følgende
utgangspunkt for videre redigering vil vises:

![Figur 153 - Gjentatt tabell](/docs/images/guides/tul/infopath-gjentatt-tabell.png "Figur 153 - Gjentatt tabell")

Hvis repeterende gruppe er veldig stor med lange overskrifter kan det være lurt å velge ”Gjentatt inndeling”, da vil feltene med tilhørende
ledetekster bli plassert under hverandre.

Slett kolonne for ”Gruppeid”, erstatt hver enkelt standard ledetekst med uttryksboks og ledetekst som vist i det ferdige sideeksempel. Husk
også å tilpasse bredden slik at den passer med mal-bredden for skjema.

Fortsett med gruppe for kårbolig (Kar-grp-4942), som legges inn med valg ”kontroller i layouttabell”. For de tre siste feltene i denne
gruppen, må presentasjon endres til radioknapper. Høyreklikk på feltene, i popup-meny velges ”Endre til” og deretter ”Alternativknapp”. For
hver av radioknappene vil det vises en ledetekst på høyre side. Disse må erstattes av de vanlige uttrykksboksene, en for hver tekst. Legg
merke til at teksten som skal vises ikke alltid er helt identisk med den genererte fra datakilden (xsd).

Til sist legges feltene for post 1.3 til post 1.5 inn. Disse feltene ligger i datakilden rett under hovedgruppen
”InntekterUtleieverdi-grp-960”, derfor er det denne som skal markeres som vist under:

![Figur 154 – RF-1189 visning 3](/docs/images/guides/tul/infopath-rf1189-vining3-again.png "Figur 154 – RF-1189 visning 3")

Før kalkylearbeidet kan starte, må feltet for post 1.5 ”Samlet bruttoinntekt” settes til skrivebeskyttet, og layouttabellen tilpasses med
blanke kolonner for luft på venstre side, samt plass til å kunne sette inn hjelpeikon senere, som vist i det ferdige sideeksempelet, figur
152.

Det skal nå legges inn en **kalkyle** i post 1.5, som skal summere ”Beløp” fra tabellen i post 1.1, samt postene 1.2, 1.3 og 1.4.

Kalkylen skal dermed inneholde følgende elementer og orid’er:

*:22033 = sum(:22014) + :22032 + :22101 + :22026*

Eksempel skjermbildene for denne seansen vises samlet under teksten. Høyreklikke på orid :22033 (post 1.5 ”Samlet bruttoinntekt” ), velge
”Egenskaper for tekstboks” (1) og flipp ”Data”. Her vises ”Verdi”-feltet hvor kalkylen skal legges inn.

Klikk videre på knappen ”fx” til venstre for ”Verdi”-feltet for å komme inn ”Sett inn formel” vinduet (2). Her kan en skrive inn kalkylen.
Skriv inn funksjonsnavn og operatorer og velg felt som skal inngå vha. knappen ”Sett inn fellt eller gruppe …” (3). Funksjonsnavn med
syntaks kan også velges vha. knappen ”Sett inn funksjon …”.

Kalkylen skal se slik ut når den er ferdig, og inneholder en funksjon ”sum()” som summerer alle rader med angitt felt fra den repeterende
gruppen i post 1.1:

```
sum(UtleieInntektSpesifisertEiendom-datadef-22014) +
VedlikeholdskostnaderMvLeietakere-datadef-22032 +
InntekterAndre-datadef-22101 +
sum(UtleieInntektSpesifisertEiendom-datadef-22014) +
EgenleieKarInntekt-datadef-22026
```

Skjermbilder henvist til i beskrivelsen
over:

![Figur 155a – Egenskaper tekstboks](/docs/images/guides/tul/sett-inn-formel-1.png "Figur 155a – Egenskaper tekstboks")
![Figur 155b – Sett inn formel](/docs/images/guides/tul/sett-inn-formel-2.png "Figur 155b – Sett inn formel")
![Figur 155c – Velg et felt eller en gruppe](/docs/images/guides/tul/sett-inn-formel-3.png "Figur 155c – Velg et felt eller en gruppe")

Merk at summeringsfeltet får verdi 0 hvis alle feltene som inngår i kalkyle er tomme. Om dette ikke er ønskelig kan det løses på 2 måter.

En er med ”Regler …” funksjonen og en annen er ved å omskrive kalkylen.

Hvis man benytter seg av ”Regler …” funksjonen må man være klar over at et stort antall regler for å tømme summeringsfelter i skjema, kan
forårsake dårligere ytelse i skjema. Alternativet omskrivning av kalkyler er da aktuelt.

”Regler …” funksjonen:

  - Høyreklikk på feltet for post 1.5 ”Samlet bruttoinntekt” og velg ”Regler …”

![Figur 156 – Regler](/docs/images/guides/tul/regler.png?width=700 "Figur 156 – Regler")

  - Her kan det legges inn regler tilknyttet feltet ved å trykke på “Ny”-knappen

![Figur 157 – Regler, Legg til](/docs/images/guides/tul/regler-legg-til.png "Figur 157 – Regler, Legg til")

  - Velg så “Angi verdien …” for å sette opp kriteriene:

![Figur 158 – Angi betingelse](/docs/images/guides/tul/angi-betingelse.png "Figur 158 – Angi betingelse")

  - Det første kriteriet er at selve summeringsfeltet skal ha verdi 0. Dette må settes eksplisitt som standardverdi i feltet man sjekker på.
    Velg deretter de feltene som inngår i kalkylen. For disse velges ”Er tomt”. Alle felt i kalkylen må være med, ellers risikeres at
    summeringsfeltet blir blanket ut selv om deler av kalkylen har verdi.

  - Trykk OK for å returnere til forige vindu. Til sist må ”Legg til handlig …”-knappen benyttes fra ”Regler”-vinduet. Velg ”Angi verdien
    for et felt” som aksjon og så feltet som skal settes. ”Felt” vises som et punktum, siden der dette feltet det ble klikket på ved inngang
    til regeldefinisjonen.

![Figur 159 – Handling](/docs/images/guides/tul/handling.png "Figur 159 – Handling")


Merk at man ikke får skrevet mer enn fem if-setninger i betingelsene. Hvis man vil implementere det for kalkyler med flere felter så må man
bruke *uttrykksbokser*. Dette gjøres ved å ”mellomlagre” deler på den måten at man tar f.eks. to if-setninger og lagrer resultatet av denne
i en uttrykksboks og benytter da den aggregerte verdien inn i den betingelsen det ikke var plass.

Omskrivning av kalkyle:

Denne metoden kan sees på som et alternativ til ”Regler …” metoden.

Istedenfor å bruke regler til å tømme summeringsfeltene på hvert av feltene som inngår i kalkylen, vil vi nå kun bruke en formel i
summeringsfeltes standardverdi.

Vi bruker en string metode for å bestemme om kalkylen skal vises eller ikke:

```
substring(Kalkyle, 1, (Betingelse) * (1 div 0))
```

Hvor ”Kalkyle” byttes ut med kalkylen og ”Betingelse” byttes ut med en eller-sjekk på om alle feltene som ingår i kalkylen er tomme.

  - Høyre klikk på summeringsfeltet og velg ”Egenskaper”
  - Trykk deretter på ”fx” knappen til høyre for ”verdi” feltet
  - Med utgangspunkt i malen overfor, fyll ut formelen, erstatt ”Kalkyle” med:

```
sum(UtleieInntektSpesifisertEiendom-datadef-22014) + 
VedlikeholdskostnaderMvLeietakere-datadef-22032 + 
InntekterAndre-datadef-22101 + 
sum(UtleieInntektSpesifisertEiendom-datadef-22014) + 
EgenleieKarInntekt-datadef-22026
```

  - Erstatt ”Betingelse” med:

```
(count(UtleieInntektSpesifisertEiendom-datadef-22014[. != ""]) > 0 or VedlikeholdskostnaderMvLeietakere-datadef-22032 != "" or InntekterAndre-datadef-22101 != "" or count(UtleieInntektSpesifisertEiendom-datadef-22014[. != ""]) > 0 or EgenleieKarInntekt-datadef-22026 != "")
```
  - Dermed vil resulatet som vises i tekstboksen bli summen av kalkylen hvis en eller flere av feltene som inngår i kalkylen er ikke-tomme.

Kalkyler i repeterende gruppe legges inn på samme måte. Hvis noen repeterende felter skal summeres opp i feltet som er utenfor repeterende
gruppe så skal man bruke funksjon SUM og sette inn feltet som skal summeres.

Flere tips:

  - Man har tilgang til alle variabler fra alle sider
  - Man kan kopiere enkelte regler ved å velge "Kopier regel"-ikonet, eller man kan velge og kopiere alle regler for et felt
    ved å velge "Kopier alle"-ikonet.
  - For å skrive kompliserte kalkyler i C\#, kan man under Utvikler menylinjen velge Visning byttet-hendelse
  - For å telle antall ikke-tomme felt skal man bruke formel `count(felt_xxx[text() != ""])`
  - For å sette in formel med betingelse bruk (field1 | field2)\[condition\]. For eksempel se
    http://blogs.msdn.com/infopath/archive/2006/11/27/conditional-default-values.aspx
  - Hvis man skal summere det totale, f.eks pris\*antall som repeteres bruk:
    `sum(eval(grp-3455; " datadef-17677 * datadef-23949"))`
  - Ref. <http://blogs.msdn.com/infopath/archive/2006/12/04/xpath-powers-calculating-totals.aspx>
  - I noen tilfeller vil det ikke være mulig å sette inn feltnavn ved å peke på feltene, og man får gjerne en feilmelding når en prøver på
    det. I så fall kan man kopiere XPath (for å få tak i XPath så skal man finne feltet i datakilden, høyreklikke og velge kopier XPath) og
    fjerne stien slik at det kun feltenavn står igjen.
  - For å summere det totale som ovenfor (pris\*antall som repeteres bruk) men kun ved spesielle betingelser bruker man formel under.
    Eksempel gjelder summering kun de tilfellene der valget i en nedtrekksliste ikke er lik ”S”)

```
sum(eval(NyutstedteAksjerOmfordeling-grp-3455[AksjerNyutstedteFondsemisjonMvType-datadef-17679 != "S"]; "AksjerNyutstedteFondsemisjonMvAntall-datadef-17677 * AksjerNyutstedteFondsemisjonMvPalydende-datadef-23949"))
```

## Valideringer

Valideringen forhindrer bruker fra å levere feilaktige data eller f.eks data som ikke kan leveres sammen eller ikke stemmer med hverandre.
Valideringen kjøres uansett om feltet er tomt (forskjell fra Altinn I løsning).

Valideringer som gjør bruk av verdier i felles datakilde (skjemasett) må bruke disse verdiene direkte og ikke mellomlagre de i hjelpefelter.
Hvis hjelpefelter benyttes så vil ikke valideringene fungere ved innsending fra SBS.

I versjon 2 er det mulig å legge til valideringer som varsler bruker om potensielle feil, men som ikke forhindrer bruker fra å levere
tjenesten, dette kalles *myke kontroller*. Myke kontroller kan sees på som veiledning til sluttbruker og kan for eksempel gi brukeren
beskjed om at han eller hun har skrevet inn en verdi i et felt som virker usannsynlig for et felt eller en kombinasjon av felter.

For å legge inn valideringer i RF-1189, er det behov for å legge inn nok en side. Med bakgrunn i tidligere avsnitt, kan denne nå lages som
vist under, med unntak av hjelpeikonet. På denne siden inngår layout tabellene ”Nettoinntekt-grp-4945” og
"OmfatterKostnadeneNoeAvFolgende-grp-2330" som ligger under gruppe "Kontrollsporsmal-grp-239":

![Figur 160 – Skjema RF1189. Visning 6](/docs/images/guides/tul/infopath-rf1189-visning6.png?width=700 "Figur 160 – Skjema RF1189. Visning 6")

For å legge inn validering på et felt skal man høyreklikke på dette, velge Datavalidering-\>Legg til og legge inn betingelser og
feilmelding.

Legg inn følgende validering i RF-1189 for post 3.1 og radioknapp med orid :7911:

Tabell 7 – Validering i RF-1189


Skjema involvert | Kontroll                                | Formel                                 | Utslagstekst i Altinn
---------------- | --------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------
RF-1189          | Må svare på kontrollspørsmål om skatter | Utslag\_hvis ikke felt\_utfylt(:7911); | <ul><li>NOB:Vennligst svar på kontrollspørsmålet om skatter i post 3.1. <li>NON:Ver gild og svar på kontrollspørsmålet om skattar i post 3.1.</ul>


Dette betyr at det er obligatorisk å velge enten Ja eller Nei ved hjelp av radioknappene; feltet kan ikke være ubesvart.

Høyreklikk radioknappen i post 3.1 og velg kommando ”Regler”. Velg her ”Behandle regler…” Velg så å legge til en ny validering:

![Figur 161 – Datavalidering](/docs/images/guides/tul/datavalidering.png?width=700 "Figur 161 – Datavalidering")

Under ”Hvis betingelsen oppfylles:” velges UtgifterSkattFormueInntekt-datadef-7911 (radioknapp-feltet) og med operand ”er ikke lik” og verdi
”Ja”. Velg ”og” og legg til samme operand for samme felt, men denne gang med verdi ”Nei”. Med andre ord sjekker vi på om feltet har enten
verdi Ja eller Nei. I skjermtips kan for eksempel legges inn ”Post 3.1” mens feilmelding på bokmål skal være ” Vennligst svar på
kontrollspørsmålet om skatter i post 3.1.”. Trykk OK for å returnere til datavalideringsvinduet, og ”OK” for å returnere til skjermbildet.

![Figur 162 – Datavalidering, betingelse](/docs/images/guides/tul/datavalidering-betingelse.png?width=700 "Figur 162 – Datavalidering, betingelse")

Tilsvarende valideringer skal legges inn på de to øvrige radioknappfeltene for post 3.2 og 3.3. Sjekk detaljert design for nærmere
spesifikasjoner.

Flere tips:

  - Merk at man ikke får lagt inn mer enn 5 betingelser samt at det ikke er mulig å sette parentes mellom OG’er og ELLER’er
  - For å skrive kompliserte valideringer i C\#, kan man høyreklikke på et felt og velge Programming-\>Validating event. I så fall må Visual
    Studio være installert. I InfoPath må en huske på å velge aktuell mappe fra skjemaet i Verktøy-\>Alternativer for
    skjema-\>Programmering-\>Project location for Visual Basic and C\# code
  - Ved store valideringer, må en benytte uttrykksbokser.

InfoPath har ikke funksjonalitet for å støtte myke kontroller. Siden myke kontroller vil bli håndtert forskjellig fra feilvalideringer i SBL
er det nødvendit å skille mellom myke kontroller og feilvalideringer i InfoPath. Dette gjøres ved å benytte et prefiks før selve meldingen.
Alle myke kontroller som defineres i InfoPath-skjemaet skal ha prefikset `_MYK_`. Meldingen får dermed følgende format
`_MYK_[meldingstekst]`, som for eksempel `_MYK_Ugyldig postnummer`. Teksten `_MYK_` blir fjernet før meldingen vises til bruker i
SBL.

### Avansert eksempel på validering

For de mer viderekomne, gis her et litt mer avansert eksempel på store valideringer med bruk av expression. Det anbefales å sjekke eksemplet
i RF-1086.

Implementering av følgende betingete validering i
RF-1086:

<table>
<tbody>
  <tr>
    <td>BOH_10:1</td>
    <td>17677, 17678, 17679, 17680, 23949</td>
    <td>10</td>
    <td>HVIS (orid 17677 eller orid 17678 eller orid 17679 eller orid 17680 eller orid 23949 er blanke) SÅ utslag.</td>
    <td>
        I post 10 mangler ett eller flere av de følgende feltene utfylling:
        Antall nyutstedte aksjer, Antall aksjer etter, Hendelsestype, Tidspunkt eller Pålydende per utstedt aksje.
    </td>
  </tr>
</tbody>
</table>

Dvs. hvis noen av disse 5 felter av fylt ut skal alle være fylt ut.

Nedenfor følger en anbefaling på hvordan dette kan implementeres:

  - Opprette hjelpefelt BOH\_10\_1 med default value 1.
  - Kopiere Xpath til alle de 5 feltene (med å høyreklikke på feltene i Data source og velge ”Kopier Xpath”).
  - Opprette validering med 2 if-setninger, der det ene sjekker om noen av disse feltene er fylt ut og det andre skjekker om noen av feltene
    er blank – da skal man få feilmelding, fordi enten alle skal være tomme eller alle skal være utfylt.
  - For å skrive if-setningene, velger man uttrykk og skriver følgene to linjer:
  - Den første linjen/valideringen sjekker om noe er tomt:

```
/Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvAntall-datadef-17677 | /Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvAntallEtter-datadef-17678 | /Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvType-datadef-17679 | /Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvTidspunkt-datadef-17680 | /Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvPalydende-datadef-23949 = ""
```

  - Videre, følger her den andre som sjekker om noe er fylt ut:

```
/Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvAntall-datadef-17677 | /Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvAntallEtter-datadef-17678 | /Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvType-datadef-17679 | /Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvTidspunkt-datadef-17680 | /Skjema/UtstedelseAvAksjerIfmFondsemisjonSplittMv-grp-3454/NyutstedteAksjerOmfordeling-grp-3455/AksjerNyutstedteFondsemisjonMvPalydende-datadef-23949 != ""
```

På grunna av at InfoPath har relativt små vinduer som ikke gir god oversikt, anbefales det å skrive alt dette i et tekst-verktøy som for
eksempel Notepad og lime inn i InfoPath etterpå. Om alt legges inn korrekt vil Datavalideringsvinduet få ut noe sånt:

![Figur 163 – Datavalidering](/docs/images/guides/tul/datavalidering-2.png?width=700 "Figur 163 – Datavalidering")


### Pattern validering

For å legge på sjekk av gyldig verdi, for eksempel for og epost, kan man i InfoPath matche verdien mot et pattern. Et pattern er en generisk
måte å uttrykke en gitt seksvens og sammensetning av tegn. Dette er også kalt regulæruttrykk. Dette gjøres også vha
Datavalideringskommandoen. Eksempel på setting av mønster for epost i skjema RF-1086:

![Figur 164 – Eksempel på validering av gyldig verdi i et felt vha pattern](/docs/images/guides/tul/datavalidering-pattern.png?width=700 "Figur 164 – Eksempel på validering av gyldig verdi i et felt vha pattern")

I tillegg til de valideringene som legges inn av skjemautvikler så vil InfoPath/Forms Server utføre ”xsd valideringer”, dvs restriksjoner
som er lagt på feltene i xsd spesifikasjonen til skjemaet. Rekkefølgen på disse feilmeldingene styres av InfoPath/FormServer, og det er ikke
mulig å endre denne rekkefølgen. Microsoft har valgt å gi xsd-valideringer (f.eks sjekk på lengde, maks/min verdi og regulære uttrykk)
presidens foran valideringen som sier at feltet er påkrevd. Dette er årsaken til at meldinger som f.eks. ”Only spesific pattern allowed”
vises før ”Cannot be blank”.

Hvis man velger å benytte pattern validering, så vil man kunne se at regulæruttrykket vises i høyrekolonnen i SBL ved validering. For å
komme rundt dette, må man gjøre følgende:

1.  Legg inn et hjelpefelt istedenfor feltet som har pattern validering. Feltet som kommer fra datakilde skal da ikke dras inn i skjemaet.
2.  Legg inn en egen pattern validering på hjelpefeltet med en egen feilmelding slik at denne vises istedenfor pattern valideringsmeldingen
    fra xsd’en.
3.  Overfør verdien til det egentlige feltet fra hjelpefeltet.
4.  Hvis dette gjelder felter i en repeterende gruppe så må hjelpefeltet ligge i en altinn xsd, ellers samme prinsipp.

Hvis denne metodikken benyttes vil man unngå at regulæruttrykkene vises i SBL.

### Validering fra VSTA / C\#-kode

I enkelte tilfeller ønsker man også å kunne produsere valideringsmeldinger fra C\#-koden.

Dette gjøres ved at man i koden har følgende kode for hver valideringsmelding:

```csharp
public void InnsenderHvitvaskingAnsvarligFornavn_2D_datadef_2D_33869_Validating(object sender, XmlValidatingEventArgs e)
{
    if (e.Site.Value.Equals("123"))
    {
         e.ReportError(e.Site, true, "Feilmelding");
    }
}
```

Merk at man også her, hvis ønskelig, benytter ressurstekster (ref. kap 21.1.1) til å kunne vise feilmeldingen på språket som sluttbruker har
valgt i portalen (SBL). Man trenger ikke gjøre noe annet enn å hente inn teksten fra ressurstekstens datakilde. Bl.a. språk trenger man ikke
ta hensyn til da ressurstekstene er allerede knyttet til skjema på riktig språk.

Altinn portalen er utvidet med funksjonalitet for å trigge validering av hovedskjema (HS) når et underskjema (US) valideres.

Hvis man legger inn et hjelpefelt som heter ValidateMainForm, som ligger i my namespacet (my:ValidateMainForm), og som har verdien "true",
så vil Altinn portalen gjøre en validering av HS hvis HS allerede er validert OK.

## Dynamikk

Dynamikk går ut på at utseende/oppførsel til et felt i skjermbildet, er avhengig av en betingelse knyttet til informasjon i et annet felt.
Utfra de sidene som nå er laget i skjema RF-1189, kan det legges inn dynamikk for følgende spesifikasjon fra detaljert design:

Tabell 8 – Dynamikk

| Feltnavn (Datadef/orid) | Post i skjema | Beskrivelse av dynamikk                   |
| ----------------------- | ------------- | ----------------------------------------- |
| 7911/ 7912              | 3.1           | Beløpsfelt skal gråes ut hvis svar er nei |
| 7913/ 7914              | 3.2           | Beløpsfelt skal gråes ut hvis svar er nei |
| 7915/ 7916              | 3.3           | Beløpsfelt skal gråes ut hvis svar er nei |

Dette er en vanlig form for dynamikk, som altså går ut på å ”disable” et felt ved inntreff av en betingelse. Normalt ønskes det at både
feltet og ledeteksten blir ”grået ut”, og at det ikke er mulig å klikke inn i feltet. I tillegg skal feltet her blankes ut. Denne dynamikken
skal inn på samme skjemaside som også vist i ”Figur 1189 View 6” i forrige avsnitt (Valideringer):

![Figur 165 – RF-1189](/docs/images/guides/tul/infopath-rf1189-visning6.png?width=700 "Figur 165 – RF-1189")

Som spesifikasjonen viser, gjelder dynamikken alle de 3 siste postene. Her nøyer vi oss med å legge den inn for Post 3.1, vha følgende
framgangsmåte:

  - Høyreklikke på feltet 7912 (”Ev. beløp”) og velge ”Betinget formattering…”.
  - Først skal vi sette feltet vårt til *Skrivebeskyttet*. Trykk knappen ”Legg til…” for å legge inn betingelsen på samme vis som ved
    valideringer (opp til 5 linjer) som vist under:
![Figur 166 – Betinget formattering](/docs/images/guides/tul/betinget-formattering.png?width=700 "Figur 166 – Betinget formattering")
    Det er her kun behov for en linje i betingelsen. I første nedtrekkslisteboksen velges radioknappfeltet
    ”UtgifterSkattFormueInntekt-datadef-7911”, i neste ”er ikke lik” og verdien i det siste skal være ”Nei”. Til slutt klikkes det på
    ”skrivebeskyttet” og ”OK”. I dette tilfellet velger vi ikke at feltet skal skjules, noe som kan ellers kan være aktuelt. For de andre
    radioknappene i samme ”gruppe” vil det være vice versa.

  - Merk at feltet *ikke* blir tømt selv når det er skrivebeskyttet eller skjult. Derfor må verdien fjernes manuelt ved å opprette en regel
    (Rule) på det feltet som styrer dynamikken (radioknapp feltet 7911). Det er verdt å merke seg at reglene kjøres *kun* når feltene er
    blitt valgt og gitt en verdi. Regel opprettes ved å:
    - Høyreklikke radioknapp feltet 7911.
    - Velge ”Regler…”.
    - Klikk på ”Legg til…” knappen for å legge til en ny regel.
    - Klikk ”Angi betingelse …” for å sette opp betingelse for når regelen skal kjøres (”UtgifterSkattFormueInntekt-datadef-7911” ”is equal
      to” ”Nei”).
    - Trykk OK for å returnere.
    - Til sist settes selve aksjonen opp ved å trykke på ”Legg til handling …”.
    - Handling settes til ”Sett feltverdi”.
    - Felt skal være ” UtgifterSkattFormueInntektBelop-datadef-7912”.
    - Verdi skal være blank.

  - For å utføre dynamikken også på ledetekst ”Ev. beløp”, må denne være opprettet som uttrykksboks. Uttrykksbokser kan behandles som et
    vanlig felt og man kan legge på samme betinget formattering på den. Til forskjell fra formatet på feltet, kan det her settes en
    fargekode som for et felt som er skrivebeskyttet (ref avsnitt *Fargekoder Altinn*)

### Avansert eksempel på dynamikk

For de mer viderekomne, gis her et noe mer avansert eksempel på dynamikk som krever bruk av expressions. Eksemplet kan sjekkes i RF-1097.
Bruk av expressions er nødvendig dersom man må bruke flere enn 5 felt/betingelser. Formelen må da bygges opp ved å bruke XPath på feltene.

NB\! InfoPath bryter automatisk en stor expression i flere. Derfor bør man ikke blande or og and i samme expression

Nedenfor eksempel fra RF-1097:

```
/Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "1" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "3" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "5" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "11" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "12" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "14" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "20" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "67" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "68" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "69" or /Skjema/SoknadOmEndringAvEllerKravOmForskuddsskatt-grp-7675/Innsender-grp-7676/EnhetOrganisasjonsform-datadef-30638 = "86"
```

Slik blir eksempelet seende ut i InfoPath:

![Figur 167 – Betingelse](/docs/images/guides/tul/betingelse.png?width=700 "Figur 167 – Betingelse")

## Ressursfiler og tekstfiler

I skjemaet kan man komme borti situasjoner hvor man har behov for å oversette tekster som ikke kan puttes inn i uttrykksbokser eller av
andre grunner ikke kan oversettes i TUL. For å kunne benytte slike tekster velger man å bruke *ressursfiler.* En ressursfil kan være en
hvilken som helst fil, som InfoPath pakker sammen med skjemaene.

For å få ressursfiltekster til oversetting i TUL velger man å lage seg en XML-fil som man kaller *Ressurstekster.xml*. Denne må være på
følgende format og innholdet må være på utgavens hovedspråk:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ResourceTexts>
  <ResourceText name="orgnr_kan_ikke_brukes">
    <Message>Organisasjonsnummer kan ikke brukes</Message>
    <MessageDetail>Vennligst korrigèr org.nr.</MessageDetail>
  </ResourceText>  
  <ResourceText name="fnr_er_ikke_gyldig">
    <Message>Fødselsnummeret kan ikke brukes</Message>
    <MessageDetail>Vennligst korrigèr fødselsnummer</MessageDetail>
  </ResourceText>
</ResourceTexts>
```

Som man ser fra XML’en over så har man flere sett med tekster, hvor hver nøkkel ( har to korresponderende tekster. Dette blir på samme måte
som med valideringstekster.

Det er viktig at nøkkelen er unik innad i skjemaet. Man kan ha så mange tekstsett man vil.

Et sett med tekster er definert vha \<ResourceText\> -noden.

Når XML-filen er ferdig, velger man å legge den til i InfoPath. Dette gjøres ved gå til *Verktøy* på menylinjen og velge *Ressursfiler...*
Legg deretter til Ressurstekster.xml. Nå er det flere måter å ta i bruk tekstene på, men det letteste er å legge til en datakobling mot
denne ressursfilen. Dette gjøres på samme måte som man legger til en kodeliste, men istedenfor å hente data fra en web-service, velger man å
hente fra et XML-dokument. På neste side klikker man på *Ressursfiler...* og velger Ressurstekster.xml. Nå er disse tekstene klare for å
benyttes i skjema, på samme måte som felter fra hoveddatakilden.

Tekstene i filen Ressurstekster.xml vil være tilgjengelig for oversetting i TUL sin oversettingsmodul etter at skjemaet er sjekket inn. På
denne måte vil InfoPath-filene på de ulike språkene ha lokaliserte ressurstekster.

Under følger et eksempel på hvordan man tar i bruk en ressurstekst i en regel.

Når man legger til en hendelse på en regel, velger man å sette verdi i et felt. Dette er default-valget i en ny regel. Deretter velger man
feltet som skal få en verdi, og så verdien, enten *Message* eller *MessageDetail*. For å hente riktig verdi velger man å lage en xPath ved å
klikke på funksjonsknappen. Velg så å legg til felt eller gruppe og velg datakilden til
ressursfilen. Her velger man feltet Message og så *Filtrer Data.* Det som er viktig nå, er at man filtrerer på name; velg å legg til ny
filtrering og definer at name skal være lik, og så må man angi nøkkelen til tekstsettet man ønsker å benytte.

På denne måten vil man kunne bruke tekster fra annet enn uttrykksbokser/skjemaelementer, oversette de i TUL og fylle de inn i inputbokser
etc.

## Hjelpefelter, verdioverføringer

Man kan opprette hjelpefelter som ikke finnes opprinnelig i XSD og bruke dem f.eks for å vise delsummer på andre sider. For å opprette felt
eller gruppe skal man velge ”Datakilde”, høyreklikke på ”Skjema” og velge ”Legg til…”. Skriv her inn navn på felt og trykk OK. Feltet vises
nå under ”Datakilde” på skjemaets høyeste nivå. Deretter kan man dra feltet fra ”Datakilde” til visning (side) og plassere feltet der man
vil og velge ønsket felttype (kontrol).

![Figur 168 – Legg til felt/gruppe](/docs/images/guides/tul/legg-til-felt-gruppe.png?width=700 "Figur 168 – Legg til felt/gruppe")

Merk at i ”Datakilde” forblir feltet på øverste nivå, det er ikke mulig å få flyttet det til andre sider eller grupper som er definert i
XSD.

### Verdioverføringer

For å vise verdien fra et felt på en annen side (view) i skjema, trenger en ikke å opprette duplikate-felt. For dette kan man bare dra det
originale feltet fra ”Datakilde” til de stedene man vil ha det (husk at å la alle disse kopiene være skrivebeskyttet).

Eksempel på verdioverføring finnes allerede i skjemaeksemplet vårt. Se ”Figur 1189 visning 6” eller visning 6 i InfoPath. Der viser feltet
for samlet bruttoinntekt den overførte verdien fra post 1.5 i visning 3. Dette har skjedd automatisk ved at feltet
”BruttoinntektUtleieMv-datadef-22033” også er blitt opprettet i visning 6.

Man trenger dermed ikke å overføre verdier av delsummer fra side til side, fordi en i InfoPath har tilgang til alle variabler fra alle
steder i skjema.

Man får ikke opprettet egendefinerte grupper eller repeterende felter, men man kan legge kontrolluttryksboks inn i repeterende gruppe og
opprette kalkyler eller dynamikk der.

Når man oppretter lister, eksempelvis nedtrekkslister, vil verdien denne viser være kodeverdien. For at man skal få frem tekstverdien som
svarer til denne koden, må man benytte seg av et hjelpefelt. I hjelpefeltet henter man tekstverdien som svarer til koden ifra listen.
Hjelpefeltet defineres så som en presentasjonsfelt istedenfor listen. På denne måten vil tekstverdien og ikke kodeverdien vises i den
aktuelle listen.

## Web-, print- og kvitteringssider

For å lage printutgaver basert på skjermbildene på Web, skal man opprette så mange view’er som det er sider i skjema, kalle dem f.eks ”Print
view 1” osv. Deretter kopiere og lime innholdet fra hver side til tilhørende print view side.

Print view’ene kan settes til å være read-only ved å velge ”Egenskaper” under “Sideutforming” flipp ”Generelt” og krysse av for
skrivebeskyttet. I flipp ”utskriftsinnstillinger” kan man også sette formatet på side som skal skrives ut. Benytt gjerne
forhåndsvisfunksjonen for å verifisere utskriftversjon.

![Figur 169 – Egenskaper for visning](/docs/images/guides/tul/egenskaper-for-visning.png "Figur 169 – Egenskaper for visning")

Hvis man vil ha en annen layout på printutgavene, for eksempel slå sammen flere web sider på samme printside, så er det bare å opprette det
nødvendige antall visninger, definere ønsket layout, for eksempel ved å kopiere felter fra andre web sider (views) eller dra dem direkte fra
datakilden.

Kvittering opprettes på samme måte. Lag et ekstra view og kall den f.eks ”Receipt”. Definer deretter layout og legge på de feltene som man
ønsker å ha på kvitteringen.

Det er også mulig å definere hjelpefelter og legge dem på print utgaver og kvitteringen

## Hjelpetekster (knapper)

Svært mange skjermbilder i Altinn er definert med mulighet for å få opp hjelpeinformasjon på skjermen. Til dette benyttes det i InfoPath
hjelpeknapper som ser slik ut:

![Hjelpeknapp](/docs/images/guides/tul/hjelpeknapp.png "Hjelpeknapp")

Bildefilene vil du finne på `\\alt-tul-db-c02\tulshare\InfoPath\Etater` på TUL-Share.

For å plassere en bildeknapp i skjermbildet, klikk på «Picture button» under «Controls» på hjemmefanen. Klikk på knappen for å vise «Button
Properties». Her kan knappen tilpasses. Klikk «Picture» for å legge til hovedbildet. Klikk «Hover» for å legge til bilde som skal vises når
du holder musen over knappen.

Deretter kan knappen kopieres til alle stedene i skjema hvor det skal være hjelpeknapper, og det gjenstår bare å endre til respektive Id’er:

  - Høyreklipp på bildeknappen og velg egenskaper for bildeknapp.
  - Endre ID fra *CTRLXX* til *HelpText\_xxx*, hvor xxx er valgfri.

![Figur 170 – Egenskaper for knapp](/docs/images/guides/tul/egenskaper-knapp.png "Figur 170 – Egenskaper for knapp")


## Sporvalg

For at sporvalgsfelter skal fungere i InfoPath skjema, er det nødvendig med to handlinger. Først må sporvalgsfeltet settes til å alltid
poste tilbake til serveren. Dette gjøres ved å dobbeltklikke feltet, velge flipp *Webleserskjemaer* og velg radioknapp *Alltid,* som vist
under:

![Figur 171 – Innstillinger for tilbakesending](/docs/images/guides/tul/innstillinger-for-tilbakesending.png "Figur 171 – Innstillinger for tilbakesending")

Det andre er at det må legges inn C\# kode for feltets *Changed* hendelse. Sporvalg er ikke er en del av eksempel skjema RF-1189, men kan
enkelt legges til ved å benytte “Utvikler” og “Endret hendelse”:

![Figur 172 – InfoPath, kodeliste](/docs/images/guides/tul/infopath-kodeliste.png?width=700 "Figur 172 – InfoPath, kodeliste")

Følgende kode skal legges inn for dette feltet:

```csharp
NotifyHost("TrackFieldChanged_" + e.Site.Name);
```

Dette skal legges i metoden som automatisk ble lagt til av Visual Studio.

```csharp
public void OppgaveAr_2D_datadef_2D_11236_Changed(object sender, XmlEventArgs e)
{
    NotifyHost("TrackFieldChanged_" + e.Site.Name);
}
```

Hvis det benyttes avmerkingsbokser for sporvalg, må det håndteres at kombinasjonen av disse angir et spor. Ellers må samme kode legges på
*Changed* hendelsen for avmerkingsbokser.

## Innlegging av kode i et skjema

For å kunne legge inn kode i skjema må man gjøre følgende:

  - Velg ”Fil”, deretter “Alternativer for skjema” fra verktøymenyen.
  - Velg ”Programmering”.
  - Velge C\# som programmerings språk under *Kodespråk for skjemamal*. Merk at denne kan være grået ut og forhåndsvalgt.
  - I *Prosjektplassering*, bla til mappe hvor InfoPath skal legge koden, helst i samme mappe som XSN fila (skjemafilen) på TUL-Share.

Merk at når man har kodet ferdig, må man velge Build i Visual Studio for å sikre at koden blir med inn i skjema.

Se eksempel nedenfor:

![Figur 173 – Alternativer for skjema. Programmering](/docs/images/guides/tul/alternativer-for-skjema-2.png?width=700 "Figur 173 – Alternativer for skjema. Programmering")

## Forhåndsvisning og enhetstest i InfoPath

I InfoPath gis det mulighet til å foreta en enkel inspeksjon av hvordan skjema fungerer, ved å benytte ”Forhåndsvisnings”-valget. Denne
finnes i verktøylinja i InfoPath og kan benyttes til enhetstest av skjema. For eksempel kan det legges inn verdier, og en kan verifisere at
feltene oppfører seg som de skal. Det samme gjelder for kalkylene som er lagt inn. Eksempel fra RF-1189 View 3:

![Figur 174 – Forhåndsvisning i InfoPath](/docs/images/guides/tul/infopath-forhåndsvisning.png?width=700 "Figur 174 – Forhåndsvisning i InfoPath")

For å komme tilbake til Design modus, velges ”Lukk forhåndsvisning” fra verktøylinja.

Viktig tips dersom det vises følgende feilmelding når en skal åpne forhåndsvisning:

> "InfoPath cannot open the selected form"

I InfoPath må da kommando “Fil -\> Alternativer for skjema -\> Sikkerhet og klarering” velges, deretter:

  - Huk av "Bestem sikkerthetsnivå automatisk (anbefales)"
  - Velg radioknapp ”Fullstendig klarering” og trykk ”OK”

Dette tipset er for øvrig hentet fra http://social.msdn.microsoft.com/Forums/en-US/vsto/thread/4f497859-b1f7-4498-95cb-bb9903bfaf5c
(Gjelder for 2007 versjon, men kan fortsatt være til hjelp i 2010 versjon)

Merk at det ikke er mulig å teste preutfylling eller uthenting av andre data fra sluttbrukerløsningen. Man får dog testet alle
hjelpevariabler, kodeliste etc.

## Fargekoder Altinn

> Foreløpig utgave pr 2009-05-18...

Fargekode                       | RGB
------------------------------- | ------------
Bakgrunn side                   | 241,245,247
Bakgrunn grupperamme            | 226,234,240
Rammestrek rundt grupperamme    | 212,224,231
Overskrift - skjema (9pt bold)  | 22,55,68
Strek øverst på siden           | 223,237,239
Overskrift gruppe (8pt bold)    | 0,51,102
Ledetekst (8pt)                 | 0,51,102
Felttekst (8pt)                 | 0,51,102
Fremskutt hjelpetekst           | 112,150,175
Bakgrunn - Skrivebekyttet felt  | 226,234,240 (samme som bagrunn grupperamme)
Hjelpeikon - bakgrunn           | 231,226,161
Ramme rundt felt                | 212,208,200
Ramme rundt web-side            | 184,203,216 (vises på WEB-PRINT)

*I beskrivelsen over vil f.eks. 9ptbold bety skriftstørrelse 9 og fete typer.*

**Skrifttyper**

Det er for InfoPath-skjemaer , som for HTML generelt når det gjelder skrifttyper (fonts).

Det er derfor viktig å velge standardiserte skrifttyper som f.eks. Arial, Verdana, Times New Roman, Lucida etc. Det vil være opp til
sidemalen hvilken skrifttype som bør benyttes, samt hvordan denne vises i de ulike browserene/OS’ene.

**Sette fargekoder i InfoPath**

1. Ekspander nedtrekksgardin for farge.
2. Velg More Colors.  

**I vindu "Farge":**

3. Velg en hvit tom rute under seksjon egendefinerte farger.
4. Endre fargekoder for rød, Grønn og Blå (se koder over).
5. Legg til egendefinert farge.
6. Lagre som en egendefinert farge .
7. OK.
