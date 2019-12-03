---
title: "B: Utforming av brukergrensesnitt for skjema"
linktitle: "B: Brukergrensesnitt"
description: Retningslinjer/forslag for utforming av sider av skjema i InfoPath.
toc: true
weight: 2
---

Alle offentlige nettskjemaer for innsendingstjenester skal følge ELMER 2-retningslinjene, dette er nærmere beskrevet i [vedlegg C](../c).

## Sidestørrelse

Standard sidestørrelse for skjema er **630px bredde**. Høden til skjemaet vil variere, men skjemautvikler bør splitte sider med mye høyde
for å unngå unødvendig vertikal scrollbar. Om bredden er mer enn 630 px vil horisental scrollbar inntreffe. Hvis siden avviker fra standard
sidestørrelse må man justere høyde/bredde slik at man ikke får både vertikal og horisontal scrollbar. Det skal være minst mulig scrolling og
helst ikke horisontal scrolling. Skjema skal deles over flere sider, men der dataene henger tett sammen skal man heller bruke scrolling
vertikalt. Dette kan for eksempel være hvis det er en stor tabell eller utregninger som er avhengig av andre felt. I enkelte tilfeller kan
det være nødvendig med horisontal scrolling i forbindelse med store tabeller for ikke å gjøre skjemaet for komplekst for brukeren.

Hvis man må ha scrolling, forsøk å markere at det kommer noe mer på siden, feks ved å legge deler av en ledetekst eller et felt før
scrollingen begynner.

For å unngå horisontal scrolling, må ikke sidebredden overstige **630px** for skjema til innsendingstjenester eller **700px** for skjema til
innsynstjenester. Denne bredden tar hensyn til vertikal scrollbar.

## Sideoverskrift (skjemanavn)

Alle sider skal ha en sideoverskrift i form av skjemanavn. Under skjemanavnet skal det være en linje. Linjen skal gå tvers over hele siden
som vist i figuren under av etatslogo. Overskriftens posisjonering kan være som eksempelet under.

![Figur 175 – Plassering av overskrift](/docs/images/guides/tul/plassering-av-overskrift.png "Figur 175 – Plassering av overskrift")

## Etatslogo

![Figur 176 – Etatslogo](/docs/images/guides/tul/etatslogo.png "Figur 176 – Etatslogo")

I Altinn er det obligatorisk med etatslogo på skjemaets første side. Det er valgfritt hvorvidt man også legger inn logo øverst til høyre på
øvrige sider i skjemaet.

Logo for de ulike etatene skjemaene i Altinn skal plasseres øverst til høyre i skjemaene.

For å få riktig bakgrunnsfarge på etatens logo må man lage en gif-fil med transparent bakgrunn. Logoens størrelse bør settes som vist under.

![Figur 177 – Etatslogo størrelse](/docs/images/guides/tul/etatslogo-størrelse.png "Figur 177 – Etatslogo størrelse")

## Grupper

Grupper er felter som logisk hører sammen, og vil ofte være plassert inne i en ramme. Det kan være flere grupper på én side. En gruppe bør
ikke være delt over flere sider. Det anbefales å ha luft mellom ulike grupper på samme side. Disse bør adskilles med minumum en
linjeavstand.

Grupper inne i andre grupper skal ikke ha ramme rundt seg.

En gruppe skal ha gruppeoverskrift, hvis den ikke har overskrift skal den heller ikke ha ramme rundt seg.

## Knapper

Plassering av knapper i skjema:

For knapper som har direkte tilknytning til felter i skjemaet skal knappene plasseres i forhold til disse. Når knapp har tilknytning til ett
felt skal knappen som hovedregel plasseres til høyre for inputfeltet, slik:

![Figur 178 – Plassering av knapper i skjema](/docs/images/guides/tul/plassering-av-knapper-1.png "Figur 178 – Plassering av knapper i skjema")

I situasjoner der dette ikke er gunstig grunnet lengde på ledetekst og feltlengde, kan knapp plasseres under inputfelt:

![Figur 179 – Plassering av knapper i skjema](/docs/images/guides/tul/plassering-av-knapper-2.png "Figur 179 – Plassering av knapper i skjema")

For knapper med direkte tilknytning til flere felter bestemmes plassering av knapp ut fra plassering av felter. Dersom alle inputfelter
ligger på en linje bør også knappen ligge på denne linjen, slik:

![Figur 180 – Plassering av knapper i skjema](/docs/images/guides/tul/plassering-av-knapper-3.png "Figur 180 – Plassering av knapper i skjema")

I situasjoner der tilknyttede inputfelter er fordelt på flere linjer plasseres knappen under inputfeltene, slik:

![Figur 181 – Plassering av knapper i skjema](/docs/images/guides/tul/plassering-av-knapper-4.png "Figur 181 – Plassering av knapper i skjema")


## Tabeller

En tabell vil alltid starte som en rad og antall rader i en tabell kan enkelt genereres automatisk når utvikler trykker på TAB. En tabell
kan eventuelt splittes opp ved å trykke på høyre museknapp (split cells) når markøren er inne i tabellen. Utvikler kan da velge hvor mange
rader og kolonner tabellen skal inneholde.

  - Kolonneoverskrifter skal ”alignes” left med feltene i kolonnene.
  - Kolonneoverskrifter og ledetekstene på rader skal ikke være i fet skrift.
  - Kolonneoverskrifter med ulik antAlle rader i teksten, skal "alignes" i bunnen (se eksempel nedenfor, i **Error\! Reference source not
    found.**).

**Tabeller og matriser med sumfelt**

Tabeller og matriser med ledetekst foran radene skal ha ledeteksten for sum venstrejustert med ledetekstene.

![Figur 182 – Matrise med ledetekst foran rader](/docs/images/guides/tul/matrise-med-ledetekst.png "Figur 182 – Matrise med ledetekst foran rader")

Tabeller som ikke har ledetekst foran hver rad skal ha ledeteksten for sum venstrejustert lik tabellens første kolonne.

![Figur 183 – Tabell uten ledetekst foran rader](/docs/images/guides/tul/tabell-uten-ledetekst.png "Figur 183 – Tabell uten ledetekst foran rader")

**Vertikale overskrifter**

Vertikale overskrifter med flere ledetekster til høyre for seg (se eks. fra RF-1071 under):

![Figur 184 – Vertikale overskrifter](/docs/images/guides/tul/vertikale-overskrifter.png "Figur 184 – Vertikale overskrifter")

Her er teksten "A. Tilgang i året" overskrift for postene 101-103.

**Løsning**: Del opp i 3 grupper, flytt vertikal tekst opp som gruppetittel - da "A. Tilgang i året" gruppen seende slik ut:

![Figur 185 – Løsning for A. "Tilgang i året"](/docs/images/guides/tul/løsning-for-a.png "Figur 185 – Løsning for A. "Tilgang i året"")


## Tekstfelter, ledetekster og grafikk.

  - Redigerbare tekstbokser skal vises med hvit bakgrunn.
  - Ikke-redigerbare data skal vises med grå bakgrunn
  - Ledetekster starter med stor bokstav (må sikres ved registrering i OR)
  - Ledetekster avsluttes uten kolon (må sikres ved registrering i OR).  
    (Kolon kan i visse tilfeller føre til feil i skjema)
  - Ledetekster skal venstrejusteres og feltene skal igjen venstrejusteres slik at ledetekst og felt danner to kolonner.
  - Tallet i beløpsfeltet skal høyrejusteres. Alle andre typer tekster skal venstrejusteres i sine felt.
  - Hvis et felt har maks antall tegn, skal ikke feltet være større enn maks antall tegn.
  - Det skal være jevn avstand mellom ledetekstene selv om en ledetekst går over flere linjer.
  - Hvis det ikke er ramme rundt ledetekster, skal det være minst like mye luft mellom siste ledetekst og sideslutt som mellom ledetekstene.
  - Hvis papirskjemaet har spesialtegn som + eller - i feltet, skal dette plasseres på venstre side av feltet, sentrert (vertical center) i
    det elektroniske skjemaet og ha samme font og farge som ledeteksten.
  - Trekk ledeteksten lengst mulig ut slik at den blir på færrest mulig linjer. Dette begrenses naturligvis av feltenes lengde.
  - Kommentarfelt (som går over flere linjer) skal plasseres under tilhørende ledetekst og være en stor boks. Det skal være samme innrykk på
    ledeteksten og kommentarfeltet.
  - Ledetekster som er uthevet i papirskjemaet med feks fet skrift, kan også utheves i web-skjemaet hvis skjemaeier ønsker det.

Alle felt er i utgangspunktet redigerbare med unntak av preutfylte og kalkulerte felt.

## Plassering av overskrifter, ledetekster og rammer

Sidemalen under er hentet fra Skatteetaten. Denne viser eksempler på overskrifter, ledetekster, rammer, bruk av tabeller og elementer
plassert i tabeller.

![Figur 186 – Skatteetatenssidemal](/docs/images/guides/tul/sidemal-skd.png "Figur 186 – Skatteetatenssidemal")

Eksempler på skatteetatens sidemaloppsett:

  - Ledetekst med tilhørende felt plasseres likt fra toppen av siden.
  - Marger Innenfor Side er satt opp med:
    - Venstremarg - 9px
    - Høyremarg - 8px
  - Innenfor Gruppe:
    - Venstremarg - 9px
    - Høyremarg - 8px
  - Kolonnebredde for hjelpetekstikon - 19px
  - Kolonnebredde for fortegn - 13px

## Plassering av felt

Forsøk å danne kolonner på en side når det står flere felt horisontalt. Felt som står under hverandre skal være venstrejustert.

Hvis felt og ledetekst ikke er så lange at de vil dekke hele siden horisontalt, skal feltene plasseres mot venstre.

Rekkefølgen på felter skal som en hovedregel ha samme rekkefølge som i papirskjemaet. Ett unntak på dette er plassering av avgiver og
revisor/regnskapsfører på første side.

Postnummer og poststed skal som hovedregel plasseres under hverandre og rett etter adressefeltet.

Felt som inneholder postnummer, Organisasjonsnummer, fødselsnummer, dato o.l bør bli satt opp med bestmet bredde som passer til lengden av
data som feltet skal innholde.

Hvis man har noen generelle informasjonsfelt og deretter en del summeringsfelt, kan man unngå fra hovedregelen om at lengste ledetekst
bestemmer plassering av alle felter som vist her:

![Figur 187 – Unntak fra regel om lengste ledetekst](/docs/images/guides/tul/unntak-regel-lengste-ledetekst.png "Figur 187 – Unntak fra regel om lengste ledetekst")

Når flere sider i et skjema har samme oppsett, skal feltene på sidene ha samme feltlengde og plassering. Dette gjelder f.eks. årsregnskap
fra BR (RR0003).

## Plassering av hjelpe-ikon

Hjelp-ikon skal plasseres foran feltet det tilhører, justert midt på. Hjelp-ikon som tilhører hele grupper skal plasseres etter
gruppetittelen som vist i eksempletet til Skatteetatens sidemal.

## Radioknapper (radio buttons)

  - Radioknapper skal benyttes der brukeren må velge fra en gruppe av 6 eller mindre gjensidig utelukkende valg. Hvis det er mer enn 6 valg,
    bør en rullgardinliste brukes.
  - Hvis radioknapper benyttes i en tabell, skal alltid rullgardinliste brukes uansett antall valg.
  - Tekst tilhørende radioknappene skal stå på høyre side av knappen.
  - Ingen av radioknappene bør være valgt som standard.
  - Radioknapper skal ha spørsmål til venstre og knappene med alternativene ved siden av til høyre. Dette gjelder ikke sporvalg (se under
    Innledende dialog)
  - Margin på hver radioknapp skal stå til auto (kjent feil i InfoPath Form Services gjør at den må stå til auto)
  - Teksten på øverste alternativ skal stå på linje med ledeteksten.

## Avkryssingsbokser (check boxes)

  - Avkryssingsbokser skal benyttes for binære valg.
  - Avkryssingsboksene skal være uavhengige av hverandre.
  - Tekst tilhørende avkryssingsboksene skal stå på høyre side av avkryssingsboksen.
  - Flere avkryssingsboks skal arrangeres vertikalt. Hvis det er mange avkryssingsbokser, kan de også plasseres horisontalt for å utnytte
    plassen.
  - Avkryssningsboksen plasseres i en tabell for å låse posisjoneringen. Det er anbefalt å ha litt luft mellom avkryssningsboks og andre
    elementer.
  - Avkryssingsbokser skal ikke rammes inn.
  - Hvis det er 10 eller færre avkryssingsbokser kan de plasseres i kolonner for å utnytte plassen.
  - Rekkefølgen av alternativene skal følge rekkefølgen i skjemaet. Vi anbefaler skjemaeier å plassere alternativene logisk, feks
    alfabetisk.
  - Ulike avkryssningsbokser bør knyttes opp til ulike hendelser eller verdier.

Det kan være ønskelig å benytte flere avkrysningsbokser for valg, og dette kan gjøres ved å først sette inn en avkrysningboks og knytte
denne til et felt i skjema. Deretter høyreklikker man på feltet man har lagt til, og deretter limer det inn igjen så mange
avkrysningsbokser man vil ha. Merk at alle avkrysningsboksene må ha ulik verdi når avsjekket, ellers vil de ikke fungere uavhengig. Det
vil også være slik at kun èn avkrysningsboks kan være avsjekket pr. felt i datakilde. Dvs at hvis tre avkrysningsbokser er tilknyttet felt
A, vil kun en av de være avsjekket samtidig.

## Listebokser (List box)

  - Listebokser skal brukes for store datamengder.
  - Fra 3 til 9 elementer skal vises av gangen.
  - Bruker skal kunne taste en eller flere bokstaver for å flytte i listene.
  - Dersom brukeren kan velge flere forekomster fra en liste, skal det være en liste til som viser hva som er valgt.
  - Dersom det er aktuelt å velge alle, skal det være en avkryssingsrute eller knapp med *Velg alle*. Denne må da ha kode for å automatisk
    velge alle instanser i listen.

![Figur 188 – eksempel på listeboks hvor ulike kommuner kan velges.](/docs/images/guides/tul/listeboks-kommuner.png "Figur 188 – eksempel på listeboks hvor ulike kommuner kan velges.")

## Ferdig utfylte felt

Felt som er ferdig utfylt fra for eksempel SBS skal som hovedregel være utilgjengelige (skrivebeskyttet). Dette markeres med at feltet får
grå bakgrunnsfarge.

## Dynamiske felt

Alle felt som er dynamiske skal være synlige, men utilgjengelige (altså "grået ut"). Med dynamiske felt menes felt som brukeren skal svare
på basert på tidligere svar, f.eks. ved å svare Ja på et felt skal brukeren fylle ut en adresse, mens svarer brukeren nei skal adressen
ikke fylles ut.

Hvis du må lage spørsmålet for å få dynamiske felt, skal spørsmålet stilles med radioknapper med ja/nei svaralternativ.

Dynamiske felt vedlikeholdes i InfoPath ved hjelp av betinget formatering, hvor man setter en regel som sier at feltet skal være inaktivt
basert på en kondisjon. Denne kondisjonen kan f.eks. være at et annet felt i skjemaet ikke skal være tomt eller inneha en bestemt verdi.

## Fremskutt hjelpetekst

Generell fremskutt hjelpetekst skal settes i en egen gruppe uten overskrift. Fremskutt hjelpetekst som gjelder hele skjemaet og som brukeren
bør lese før hun starter å fylle ut skjemaet skal stå på toppen av første side i skjemaet.

![Figur 189 – Eksempel på fremskutt hjelpetekst fra Skatteetatens sidemal](/docs/images/guides/tul/fremskutt-hjelpetekst.png "Figur 189 – Eksempel på fremskutt hjelpetekst fra Skatteetatens sidemal")

Fremskutt hjelpetekst som tilhører et felt, skal plasseres tilsvarende som i papirskjemaet. Hvis fremskutt hjelpetekst skal plasseres på
linjen etter ledeteksten, men sammen med ledetekst skal de plasseres med rett venstrekant. Eksempel:

1\. Dette er en ledetekst  
Og her er den tilhørende hjelpeteksten

## Tab mellom felt

Brukeren skal kunne flytte seg mellom felter i et skjema ved bruk av TAB-tasten. TAB skal ikke gå innom hjelp-ikon og heller ikke felt som
brukeren ikke kan endre. Standard verdi for tabolatorindeks i tekstbokser er ”0”, og TAB tasten vil da gå inn i feltet. Om verdien blir satt
til ”-1” hopper TAB-tasten over dette feltet og går inn i neste felt med verdi ”0”. Figuren under viser en tekstboks med tabulatorindeks
”-1”.

![Figur 190 – Tabulatorindeks](/docs/images/guides/tul/tabulatorindeks.png "Figur 190 – Tabulatorindeks")

## Innledende dialog (sporvalg)

Innledende dialog er en egen side før selve skjemautfyllingen begynner for å velge spor. Siden avgjør hvilke deler av skjemaet som blir
tilgjengeliggjort for brukeren avhengig av alternativene brukeren velger.

Siden skal ha:

  - Fremskutt hjelpetekst før spørsmålet: ”Dette er spørsmål som vil avklare hvilke deler av skjemaet du skal fylle ut. Velg riktig
    alternativ for deg og klikk på Neste knappen.”
  - Hvis det er flere spørsmål plasseres de under hverandre tilsvarende som inne i skjemaet.
  - Radioknapper plasseres under spørsmålet (se eksempel under).

Eksempel:

![Figur 191 – Sporvalg i portalen](/docs/images/guides/tul/sporvalg-i-portalen.png "Figur 191 – Sporvalg i portalen")
