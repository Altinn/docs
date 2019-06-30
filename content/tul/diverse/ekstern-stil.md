---
title: Ekstern stil
description: Funksjonalitet som gjør det mulig å presentere Altinn-tjenester uten at Altinns visuelle profil er synlig.
toc: true
---

## Portaluavhengighet

I Altinn-sammenheng er begrepet *portaluavhengighet* brukt for funksjonalitet som gjør det mulig å presentere Altinn-tjenester for en
sluttbruker uten at Altinns visuelle profil er synlig.

I TUL omfatter dette funksjonalitet for å laste opp en eller flere stiler for hver tjenesteeier. En stil består av stilark (CSS) og
tilhørende grafikkfiler. Den må migreres til SBL for å kunne påvirke ”look & feel” til tjenesteeiers tjenester.

Det defineres ingen fast kobling mellom stil og tjeneste. Om stilen skal benyttes, styres ved oppstart av hver enkelt tjeneste. Generelt
startes en Altinn-tjeneste fra en ekstern portal, for eksempel tjenesteeiers sider, ved hjelp av en såkalt *dyplenke*. Ved å legge på ekstra
parametre for hhv. stil og returside vil lenken kunne ta sluttbruker til en Altinn-tjeneste med tjenesteeiers visuelle stil, og returnere
til tjenesteeiers portal etterpå.

## Administrere stilark og grafikk

Stilarkene vil legges til i et SharePoint-dokumentbibliotek som er tilgjengelig fra arbeidsflaten for tjenesteeier. Dokumentbiblioteket har
versjonering, slik at det vil være mulig å rulle tilbake til tidligere versjoner av stilarkene.

Filer for grafikk håndteres tilsvarende i et SharePoint-dokumentbibliotek for bilder som også er tilgjengelig fra arbeidsflaten for
tjenesteeier. Flere stilark kan gjenbruke de samme grafikkfilene.

### Definere stilark

Stilark og grafikkfiler må defineres utenfor TUL i de verktøy tjenesteeier selv disponerer.

En stil vil ikke kunne endre funksjonalitet eller innhold; for eksempel vil det ikke være mulig å legge til en helt annen toppmeny ved hjelp
av et stilark.

Stilarket kan inneholde få stildefinisjoner og for eksempel bare endre toppbanner og footer, eller det kan endre større deler av løsningens
”look & feel”. Endring av stil i InfoPath-skjema støttes ikke, men alle andre deler av sidene en tjeneste presenteres på kan endres; for
eksempel navigasjonsområdet, knapperaden og informasjonsområdet i en innsendings­tjeneste.

Det gis her ingen innføring i hvordan stilarket bør bygges opp generelt, men en beskrivelse av hvordan særskilte elementer som er spesielle
for løsningen bør defineres for at det skal kunne påvirke SBL.

#### Logo

Bilder kan benyttes i stilark som bakgrunnsbilde. URL'en for bakgrunnsbilde må ha følgende format:

```
/Pages/Images/<tjenesteeier-kode>/Content/<filnavn>
```
For eksempel: `/Pages/Images/NAV/Content/navlogo.png`.

Ved å bruke følgende stil-mal vil du kunne skjule altinn-logoen og vise logo knyttet til alternativ stil:

```css
div.logo a img {
    display: none !important;
}
div.logo {
    background: url("/Pages/Images/<tjenesteeier-kode>/Content/<filnavn>") no-repeat 5% 50% !important;
    height: 60px !important;
}
```

### Laste opp stilark

Du laster opp et nytt stilark ved å klikke på *Last opp-*lenken i dokumentbibliotekets header og laster opp et stilark på vanlig måte.
Navnet på stilarket vil benyttes til å identifisere selve stilen; en stil-identifikator som består av stilarkets navn, tjenesteeierkode og
et løpenummer genereres automatisk ved opplasting. Denne stil-identifikatoren vil benyttes som parameter i dyplenken for å indikere hvilken
stil som skal benyttes i sluttbrukerløsningen.

For å lage en ny utgave av et eksisterende stilark, kan det samme stilarket lastes opp på nytt med et annet navn.

### Laste opp grafikk

Grafikk kan lastes opp direkte i grafikkbiblioteket, eller det kan lages mapper og laste opp grafikken i mappene. *OBS*: Kun ett nivå av
mapper støttes.

Det vil ikke være noen tekniske begrensninger på hvilke typer grafikkfiler som kan lastes opp, men det anbefales sterkt at
[PNG](http://no.wikipedia.org/wiki/Portable_Network_Graphics) benyttes istedenfor GIF.
Særlig GIF med gjennomsiktighet bør **ikke** benyttes da det kan skape problemer i generering av PDF.
Grafikkfilformater som ikke støttes av alle nettlesere som er relevante for sluttbrukerløsningen bør naturligvis ikke benyttes.

### Migrere stilark

En stil må migreres til SBL før den kan påvirke visningen til tjenester. For å migrere en stil må du klikke på lenken *Migrer* til høyre i
hver rad i stilarkbiblioteket. Dette tar deg til siden *Stilarkmigrering*. Her kan du velge miljø du vil migrere til. I tillegg kan du velge
å migrere bilder som ligger i bildebiblioteket. For å starte migrering trykker du på *OK*-knappen.

Du kommer nå til siden *Stilarkmigreringsstatus*. Denne siden viser status for migreringen og en liste over tidligere migreringer. Fra
stilarksmigreringsstatus-siden kan du også teste stilarket. Dette gjør du ved å velge en tjenesteutgave fra nedtrekkslisten knyttet til
stilarket du vil teste, klikk så på lenken *Dyplenke.* Et nytt nettleservindu vil åpnes med en dyplenke til en ny instans av tjenesteutgaven
du valgte å teste stilarket med.

## Dyplenke fra ekstern portal

For å bruke stilen som er definert i stilarkene må det benyttes en dyplenke som er bygd opp med en stil-identifikator (*StyleIdentificator*)
som knytter stilarket til tjenensteutgaven. For å starte en ny tjeneste, identifiseres tjenesteutgaven av ekstern tjenestekode og ekstern
tjeneste­utgave­kode.

Dyplenken kan gå fra for eksempel en etats egen webside (for eksempel https://www.nav.no) eller fra en epost. Når sluttbruker klikker på lenken
vil Altinn-portalen åpnes, men med den angitte stilen, slik at sluttbruker ikke nødvendigvis oppfatter at han/hun navigerer til et annet
nettsted. Stilark kan kun knyttes til tjenester i TUL, og altså ikke andre sider som for eksempel *Min meldingsboks* eller *Min profil*.
Alle tjenestetyper vises i SBL med liten toppbanner, og sluttbruker kan ikke navigere seg ut fra tjenesten annet enn ved en tilbake-lenke
(*Tilbake til Min meldingsboks*).

Vanligvis vil sluttbruker komme tilbake til Min meldingsboks når han/hun trykker på tilbake-lenken, men om det er ønskelig at sluttbruker
returnerer et annet sted kan dyplenken inneholde en returparameter (*ReturnPage*).

Eksempel på dyplenke med stil-identifikator:
```
https://www.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=983142&ServiceCode=2069&style=nav_12_helfo.css
```

Eksempel på dyplenke med stil-identifikator og returparameter:
```
https://www.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=983142&ServiceCode=2069&style=nav_12_helfo.css&returnPage=http://www.helfo.no
```

Hvis du i stedet for å starte en ny tjeneste skal dyplenke til et eksisterende tjenesteelement, vil selve lenken bygges opp annerledes, mens
prinsippet for ekstern stil er det samme. Dette er bare aktuelt hvis datainnholdet du skal lenke til er kjent, for eksempel hentet fra
Altinn via webservice.

Eksempel på dyplenke til arkivert element:
```
https://www.altinn.no/Pages/ServiceEngine/Dispatcher/Dispatcher.aspx?RAReporteeElementID=<RAReporteeElementID>
```

Eksempel på dyplenke til aktivt element:
```
https://www.altinn.no/Pages/ServiceEngine/Dispatcher/Dispatcher.aspx?ReporteeElementID=<ReporteeElementID>
```
