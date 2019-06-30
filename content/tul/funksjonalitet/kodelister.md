---
title: Kodelister
description: En kodeliste er en liste med faste verdier som for eksempel postnummer og poststed eller kommuner og landkoder.
toc: true
---

Kodelisten brukes typisk i nedtrekkslister i skjema i sluttbrukerløsningen.
En kodeliste kan brukes på tvers av tjenesteeiere og tjenester, eller den kan spesiallages
for enkelte tjenesteeiere eller tjenester. Kodelister vil vedlikeholdes utenfor den enkelte tjeneste og må migreres over til
sluttbrukerløsningen på linje med tjenestene.

Kodelistene nåes ved å klikke på kodeliste-lenken til høyre på startsiden. Du kommer da til *kodelistebiblioteket*.

## Administrere kodelister

Dette er en oversikt over alle kodelistene som finnes i TUL. Alle kodelister som er tilgjengelig vises med navn, hvilken person som har
opprettet kodelisten (eier), samt informasjon om status og endringstidspunkt. Listen kan sorteres og filtreres ved å trykke på
kolonneoverskriftene. Du henter fram en enkelt kodeliste ved å trykke på kodelistenavnet i listen. Klikk på *Ny* for å legge til en ny
kodeliste.

## Ny kodeliste

En kodeliste opprettes ved å klikke på *Ny* i toppen av kodelistebiblioteket. Det er viktig at navnet på kodelisten ikke inneholder
spesialtegn, samt norske bokstaver (æ,ø,å). Dvs, tegn som ikke kan brukes er typisk ”\!” ,”}” ,” (” ,”&” ,”%” ,”$” ,” ’ ” ,”\*” ,”é” ,”è”
,”á” ,”ä” ,”æ” ,”ø” ,”å” etc. Kodelistenavnet brukes kun for identifikasjon, og vil ikke vises noe sted for sluttbruker. Det er også
mulig å legge til en beskrivelse. Denne heller brukes ikke annet i TUL SharePoint. For å endre beskrivelse i ettertid, må man navigere til
kodelisten og navigere til innstillinger. Der kan beskrivelsen endres. Du kan migrere kodelisten ved å velge *Migrer* i *Handlinger*-menyen.
For å se hvilke versjoner av kodelisten som finnes i hvilke miljøer, velg *Migreringsstatus* i samme meny.

## Vedlikeholde kodelister

Ved å klikke på ønsket kodeliste i listen kan du lese og endre kodelisten. Sorter listen ved å trykke på kolonneoverskriften du ønsker å
sortere på, for eksempel *Språk*. Endre et enkelt element i listen ved å trykke på navnet til det elementet du ønsker å endre. Du kan også
vedlikeholde kodelisten i Excel-visning ved å velge *Rediger i dataark* *Handlinger*.

Hver rad i listen inneholder følgende kolonner som kan editeres:

  - **Tittel**: Denne verdien brukes kun i TUL i kodelistvisning, og er ikke brukt i skjema
  - **Kode**: Denne verdien må være unik og angir koden/nøkkelen til verdiene for den gitte raden.
    Merk at koden må være den samme for alle språkene av den samme raden.
  - **Språk**: Angir språket raden er på
  - **Verdi 1-3**: Angir verdier som kan kobles mot gitt kode

I en kodeliste må det finnes like mange rader for alle språk det finnes rader på. F.eks., hvis man har tre rader på engelsk, og kodelisten
skal defineres for bokmål også, så må det være tre rader med de samme kodene her også. Det må også være et likt antall verdier for alle
rader. Grunnen til at det er tre verdier som kan defineres, er for at man skal kunne lagre mer informasjon om en kode. F.eks. kan en rad i
kodelisten se slik ut:

| Kode | Verdi 1 | Verdi 2 | Verdi 3 | Språk          |
| ---- | ------- | ------- | ------- | -------------- |
| NO   | Norge   | Oslo    | NOK     | 1044 (bokmål)  |
| NO   | Noreg   | Oslo    | NOK     | 2068 (nynorsk) |
| NO   | Norway  | Oslo    | NOK     | 1033 (english) |

Eller slik:

| Kode | Verdi 1 | Verdi 2 | Verdi 3 | Språk         |
| ---- | ------- | ------- | ------- | ------------- |
| NOK  | Norge   | 100     |         | 1044 (bokmål) |
| SEK  | Sverige | 100     |         | 1044 (bokmål) |
| USD  | USA     | 1       |         | 1044 (bokmål) |

Kodelisten må deretter migreres etter den er ferdig definert. Statusen til kodelisten vil da endres fra *Endret* til *Migrert*.

## Rediger i dataark

![Figur 117 - Rediger-valg i kodeliste](/docs/images/guides/tul/kodeliste-rediger.png "Figur 117 - Rediger-valg i kodeliste")

Når du er inne på kodelisten du ønsker å redigere, så kan du velge "rediger denne listen".

![Figur 118 - Hurtigredigering av kodeliste](/docs/images/guides/tul/kodeliste-hurtigrediger.png "Figur 118 - Hurtigredigering av kodeliste")

Alternativt kan du velge "Hurtigredigering" fra ribbon.

Da vil du åpne en dataarkredigering på en lignende måte som Excel. Man kan fritt kopiere innhold mellom visningen i dataark og Excel, så
lenge man tar hensyn til noen felter. I kodelistene er det noen felter hvor innholdet fylles inn automatisk, eller er styrt av
forhåndsbestemte verdier. Disse verdiene er: ID, Språk, Endret av og Endret, disse vil det derfor ikke være mulig å kopiere fra Excel og
lime inn i kodelisten under dataarkvisningen. For å komme tilbake til vanlig visning kan du klikke på «Stopp redigering av denne listen»
eller «Vis» i ribbon.

## Migrere kodeliste

Før kodelisten kan tas i bruk i et skjema, må den migreres til SBL i samme miljø som utgave som benytter kodelisten migreres til. Kodelisten
kan migreres til både testmiljøer og til produksjonsmiljø. Dersom du velger å migrere til produksjonsmiljø, sendes det en bestilling om
produksjonssetting.

Du kan migrere en kodeliste til flere miljøer samtidig ved å huke av sjekkboksen foran miljøene du ønsker. Deretter velge versjon; tidligere
migrerte versjoner eller den nyeste. Den nyeste vil være den som er gjeldene i kodelistebiblioteket p.t. Ved å klikke *OK* startes
migreringen og migreringsstatussiden med migreringsoversikt vises.

Migreringsoversikten for kodelister inneholder en komplett oversikt over alle migreringer som er gjort av denne kodelisten. Du vil også få
beskjed om migreringen var vellykket eller ikke. Denne meldingen vil ikke vises hvis du navigerer direkte til migeringsstatussiden fra
kodelistebiblioteket.

I migreringsloggen vil du også kunne se XML-kildekoden for den enkelte migrerte kodeliste ved å klikke på ”Vis XML” til høyre for hvert
element i listen over migrerte versjoner av en kodeliste.

## Eksportere kodeliste

En kodeliste kan eksporteres fra TUL, både før og etter at denne er migrert. Du går da inn på kodelisten og velger “Handlinger” fra
nedtrekksmenyen. I denne menyen velger du deretter “Eksporter til regneark”. Det er viktig og merke seg at når du skal eksportere en
kodeliste, må du ha et program som er kompatibelt med SharePoint. Dette kan da være Microsoft Excel.

## Slette kodeliste

En kodeliste kan enkelt slettes ved å velge slett fra kodelistens kontekstmeny, uavhengig av om den er migrert eller ikke.

## Sortering av kodeliste

Fast for alle kodelister er at de sorteres alfabetisk på kolonnen *”Verdi1”*. Det betyr at når kodelisten migreres til SBL og hentes ut
igjen og inn i skjema, presenteres verdiene sortert på kolonnen innefor hvert språk. Merk at dette er en tekstsortering, slik at man behøver
ledende 0’ere for tall.

Denne funksjonaliteten kan utnyttes på to måter:

 1. Benytte "Verdi1" som sortert visningsnavn.  
    Alt som blir vist i nedtrekkslisten er da sortert alfabetisk.
 2. Benytte "Verdi2" eller "Verdi3" som visningsnavn og "Verdi1" for å angi sorteringsrekkefølge. Det vil si at man kan tvinge frem en
    annen sorteringsrekkefølge en rekkefølgen som er angitt i kodelisten i TUL.

## Kodeliste inn i InfoPath

For å benytte en kodeliste i et skjema, må som nevnt kodelisten først være migrert til det eller de miljøene man skal migrere utgaven med
skjemaet til.

En kodeliste vil for et skjema opptre som en ekstra datakilde, som kan kobles til en nedtrekksliste etc. i skjema, på omtrent samme måte som
felles datakilde for skjemasett.

Hvis kodelisten ikke er benyttet for valgt utgave før, starter man med å høyreklikke på feltet man vil kodelisten skal vises i. Dette må
være et flervalgsfelt, typisk en nedtrekksliste.

Man velger egenskaper for feltet, f.eks. *Egenskaper for Rullegardinliste* og angir at man vil *Slå opp verdier fra en ekstern datakilde*.
Se figuren nedenfor.

![Figur 119 – Kodeliste i InfoPath](/docs/images/guides/tul/kodeliste-i-infopath.png "Figur 119 – Kodeliste i InfoPath")

Trykk *Legg til...* for å opprette en ny tilkobling og velg *Motta data*. Man må benytte en webservice som datakilde. Adressen til
webservicen vil være gitt av sluttbrukerløsningen, og finnes på lenken under kodeliste-lenken på startsiden; *Kodeliste-WS.*
Kodeliste-webservicen trenger åtte parametere som inndata, som vist i figuren under.

![Figur 120 – Inndata for kodeliste i InfoPath](/docs/images/guides/tul/kodeliste-i-infopath-inndata.png "Figur 120 – Inndata for kodeliste i InfoPath")

Parameterene er som følger:

  - **tns:CodeListName**: Dette er navnet på kodelisten som den heter i kodelistebiblioteket.
  - **tns:CodeListVersion**: Dette er versjonen av kodelisten du vil knytte mot skjemaet. *Angis 0 vil siste versjon benyttes. For å benytte
    seg av en annen versjon må man åpne xml fila det er lenket til ved siden av hver versjon under migreringsloggen for en kodeliste, Man må
    altså bruke tallet som står etter «version» i XML. Det versjonsnummeret som vises i migreringsloggen er bare en teller som viser antall
    ganger du har migrert til et gitt miljø.*
  - **tns:LanguageID**: Dette er identifikatoren til språket. *Dette må være det samme som hovedspråket til utgaven.* Bokmål=1044,
    Nynorsk=2068, Samisk=1083 og Engelsk=1033.
  - **tns:code**: Hvis angitt, så skal kun denne koden med verdier returneres
  - **tns:value1Filter**: Hvis angitt så skal kun de koder der value 1 matcher returneres
  - **tns:value2Filter**: Hvis angitt så skal kun de koder der value 2 matcher returneres
  - **tns:value3Filter**: Hvis angitt så skal kun de koder der value 3 matcher returneres
  - **tns:filterMatchType**: Kan ha følgende verdier:
    - 1 (Exact)
    - 2 (StartsWith)
    - 3 (EndsWith)
    - 4 (Contains)  
      Alle sammenlikninger skal være case-insensitive

Det man nå må gjøre er å velge hva som skal vises, og hva som skal lagres fra kodelisten i skjemaet. Klikk på ikonet til høyre for feltet
*Oppføringer*. Da åpnes et vindu som vist under. Velg *CodeListRow* (dette er den repeterende raden som datakilden/webservicen returnerer).

![Figur 121 – Kodeliste i InfoPath](/docs/images/guides/tul/kodeliste-rad.png "Figur 121 – Kodeliste i InfoPath")


Deretter velges verdi og visningsnavn ved å klikke på de samme ikonene til høyre for de gitte tekstboksene. Visningsnavn er det som vises i
nedtrekkslisten, verdi er det som lagres.

![Figur 122](/docs/images/guides/tul/mystisk-figur.png "Figur 122")

Nå er kodelisten koblet til skjemaet og kan testes i forhåndsvisning. Hvis man ved forhåndsvisning for en advarsel om at man kobler til
ekstern server, velger man *ok*, *ja* eller tilsvarende. Det er verdt å merke seg at hvis man ønsker å benytte samme kodeliste for et annet
felt, behøver man ikke opprette en ny kobling, men bare benytte eksisterende ekstern datakilde.