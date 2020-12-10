---
title: Innsending
description: Innendingstjenester brukes til å sende data fra Sluttbrukerløsningen eller fra sluttbrukersystemer til en etat/tjenesteeier.
toc: true
---

Innsendingstjenester kan instansieres i SBL av sluttbruker, dvs initialiseres som et element tilhørende en gitt avgiver,
eller den kan sendes til sluttbrukers meldingsboks fra en etat.

![Figur 43 – Arbeidsflaten til en nyopprettet utgave av en innsendingstjeneste](/docs/images/guides/tul/arbeidsflate-innsending.png?width=700 "Figur 43 – Arbeidsflaten til en nyopprettet utgave av en innsendingstjeneste")

## Spesifikasjon - innsendingstjeneste

For en innsendingstjeneste må det som for øvrige tjenestetyper registreres utgaveparametre, og det er mulig å overstyre rettigheter. I
tillegg må du definere en prosessflyt, og du kan definere et skjemasett eller splitting av data som oversendes tjenesteeiere.

### Utgaveparametre

Enhver utgave må ha utgaveparametre. Hvordan du registrerer disse, er [beskrevet her](../felles-funksjonalitet/#utgaveparametere).

#### DownloadQueue

Et av valgene man gjør for en innsendingstjeneste er valget av oversendingsmetode. Her kan tjenesteeier gjøre et valg mellom:

1. La Altinn overføre innsendte tjenesteutgaver til tjenesteeiers mottakersystem ved bruk av angitt metode. Dette gir flere muligheter for
overføringen men krever bestilling av grensesnitt hos drifsleverandør.
2. Mottakersystem kan hente utgavene selv ved bruk av DownloadQueue web servicen.

Dersom en metode for overføring av innsendte tjenesteutgaver skal velges må en tjenesteeier først bestille et grensesnitt (oppsett av
sendingsparametre, shipment definition) hos driftsleverandør. Dette gir stor fleksibilitet, og tjenesteeier kan da selv velge mellom
tilgjengelige overførings protokoller og hyppighet for overføring (umiddelbart eller satsvis). Dette spesifiseres i bestillingsskjema. Det
er for eksempel  også mulig å benytte webservice til umiddelbar overføring av innsendte tjenesteutgaver, hvor tjenesteier er server og
Altinn er klient. Et slikt system må kunne ta imot innkommende nettverksforbindelser, og dette medfører visse krav til sikkerhet og
tilgjengelighet som er med på å heve terskelen for å ta i mot innsendte tjeneste utgaver.

Ved bruk av DownloadQueue vil klient- og tjener-rollene byttes om, slik at tjenesteeier opptrer som klient og selv tar initiativet til å
hente innsendte tjenesteutgavedata fra Altinn. En slik løsning stiller mindre krav til tjenesteeierens system. Det er ikke mulig å bruke
begge løsningene samtidig for en utgave, og det er heller ikke mulig å motta PDF kopi av innsendt tjenesteutgave ved bruk av DownloadQueue.
DownloadQueue anbefales kun for mindre tjenesteordninger uten stort trykk ved innsendingsfrister. Dersom det er ønskelig å bruke
DownloadQueue på større tjenesteordninger, må ASF kontaktes først.

#### Delvis kopi

Valget «Tillat delvis kopiering» endrer start-tjeneste prosessen til å inkludere et steg der sluttbruker kan velge å basere skjemaet på en
tidligere kopi. Dersom sluttbruker velger et tidligere skjema, vil det oppføre seg som en «kopi fra arkiv»-instansiering (dvs. at alle
kopierbare felter hentes fra det gamle skjema over i det nye). Dersom skjemautvikler har definert feltet `PartialCopy` i my namespacet
(my:PartialCopy), vil dette være satt til true.

Skjemautvikler kan legge på logikk via regler eller kode for å gjøre spesiell håndtering dersom «delvis kopi» er valgt, f.eks blanke ut
enkelte felt eller oppdatere/beregne nye verdier basert på (det man må anta kommer fra) en tidligere kopi. Funksjonen i seg selv gjør ingen
validering eller gir en garanti for at alle felt har verdi. Skjemautvikler må derfor ta høyde for de mulighetene sluttbrukeren har for å
levere tall/tekst/blankt osv. når logikken utformes, også for utgaver som ligger tilbake i tid (som det kan kopieres fra).

Se [vedleggene](../../vedlegg/) for nærmere informasjon om hvordan man setter opp regler og kode i InfoPath.

Det er ingen restriksjoner på hva og hvordan skjemautvikler benytter denne funksjonen.

**NB: Skjemalogikken må selv sette flagget til «false», slik at ikke logikken kjøres igjen neste gang skjema åpnes\!**

Det mest hensiktsmessige er å benytte regelen «Form Load» eller metoden «FormEvents\_Loading». Hvis man skal blanke verdier i en repeterende
tabell og ikke ønsker at det skal ligge igjen tomme rader må dette gjøres i VSTA kode (se koden under), siden en regel-basert tilnærming
ikke klarer å slette tomme rader.

![Figur 44 – Eksempel på valgmulighet i Sluttbrukerløsningen](/docs/images/guides/tul/delvis-kopi-sbl.jpeg?width=700 "Figur 44 – Eksempel på valgmulighet i Sluttbrukerløsningen")

![Figur 44b – Eksempel på regelbasert håndtering av delvis kopi](/docs/images/guides/tul/delvis-kopi-regel.png?width=700 "Figur 44b – Eksempel på regelbasert håndtering av delvis kopi")

Eksempel på kodebasert (VSTA) håndtering av "delvis kopi":

```csharp
private void nullUt(string xmlRef)
{
    XPathNavigator main = MainDataSource.CreateNavigator();
    XPathNodeIterator nodesToDelete = main.Select(xmlRef, NamespaceManager);

    while (nodesToDelete.MoveNext())
    {
        //nodesToDelete.Current.SetValue(string.Empty); // Denne er ikke god nok - valgfrie felt blir tilsynelatende obligatoriske etter utnulling
        
        //Hentet fra SettVerdi
        if (nodesToDelete.Current != null)
        {
            if (nodesToDelete.Current.MoveToAttribute("nil", "http://www.w3.org/2001/XMLSchema-instance"))
            {
                nodesToDelete.Current.DeleteSelf();
            }
            nodesToDelete.Current.SetValue("");
            //hvis verdien er blank må kanskje attributt xsi:nil="true" legges til igjen.       Avhengig av datatype
            if (string.IsNullOrEmpty(""))
            {   
                // Feltet skal tømmes
                // Får man exception så skal ikke attributen legges til (feltet er obligatorisk)
                try
                {
                    //node.CreateAttribute("xsi", "nil", "http://www.w3.org/2001/XMLSchema-instance", "true"); //Denne funker bare i Infopath Preview
                    nodesToDelete.Current.ReplaceSelf(nodesToDelete.Current.OuterXml.Replace("></", " xsi:nil=\"true\"></")); // Denne funker både i Infopath Preview og i SBL 
                }
                catch (InvalidOperationException e) //gives warning "The variable 'e' is declared but never used" -> ignore
                {
                    //do nothing
                }
            }
        }
    }
}
```

#### Kvitteringstekst

Utgaveparametrene er forhåndsutfylt med standard kvitteringstekster for informasjonstekst, kvitteringstekst i portal og kvitteringstekst i
e-post. Informasjonstekst er teksten som blir vist på toppen etter signering/arkivering (øverste røde ramme på bildet under) i
Sluttbrukerløsningen og kvitteringstekst i portal er teksten i høyre marg på samme side (ramme til høyre på bildet). Kvitteringstekst i
e-post er teksten som vil stå i e-post som blir sendt som kvittering. Dersom standardtekstene ikke passer for ditt tilfelle kan du endre
teksten for utgaven til en tekst du mener passer bedre.

![Figur 45 – Kvitteringstekstenes plassering i Sluttbrukerløsningen.](/docs/images/guides/tul/kvitteringstekst-sbl.png?width=700 "Figur 45 – Kvitteringstekstenes plassering i Sluttbrukerløsningen.")


#### Betaling

Innsendingsutgaver kan ta i bruk [betalingsløsningen](betaling/) i Altinn dersom tjenesteeier har gjort denne tilgjengelig.
Dersom betaling er tilgjengelig vil du se en egen seksjon på utgaveparametersiden der du kan sette opp betaling. Seksjonen vil ikke dukke
opp dersom tjenesteeier ikke har betaling tilgjengelig.

![Betaling](/docs/images/guides/tul/betaling.png "Betaling")

For å bruke betaling på utgaven må «Bruk betaling» være valgt. Når dette er valgt vil feltene i betalingsseksjonen bli obligatoriske og må
fylles ut. Dersom betaling ikke er valgt, kan ikke disse feltene fylles ut. Eventuelle verdier som måtte stå i feltene vil da bli fjernet
ved innsjekking.

Ordrenummer kan enten bli laget av skjemaet (InfoPath) eller av Altinn. Du velger denne dersom du har et skjema som genererer et
ordrenummer. Har du valgt denne er det altså skjemaet sitt ansvar å legge inn ordrenummeret i et felt i skjemaet. Du står fritt til bruke
hvilken metode du vil for å komme fram til ordrenummeret, så lenge det blir gjort tilgjengelig i et felt. Ordrenummeret må kun inneholde
bokstaver eller tall, ingen spesialtegn.

Betalingsleverandøravtale forteller hvilken avtale som skal brukes. Alternativene du har her blir bestemt av tjenesteeier, og er basert på
de avtalene tjenesteeier har med ulike betalingsleverandører. Avtalene blir identifisert med formelen {Betalingsleverandørnavn} – {merchant
id}.

Betalingsmetoder er de ulike metodene brukeren kan bruke for å betale via betalings­leverandøren. Dette er for eksempel «Visa» eller
«MasterCard». Valg av betalingsmetoder er avhengig av hva som er definert på den betalings­leverandør­avtalen du velger. Den delen vil
derfor kunne endre seg når du velger en avtale i nedtrekkslista.

Dersom avtalen ikke tillater begrensing av betalingsmetoder vil du ikke få opp dette valget. Alle betalingsmetoder som avtalen tillater vil
i så fall automatisk bli tillatt.

For avtaler som tillater begrensing vil du få opp en avkryssingsboks for hver av de betalingsmetodene som avtalen tillater. Du må da sette
kryss for alle de betalings­metodene du vil godta for utgaven. Dersom du har fått dette valget på en avtale, må du velge minst en
betalingsmetode.

De fire XPath-parameterene brukes til å gi detaljer om det skjemaet som skal brukes på utgaven. Meningen med disse er å fortelle hvilke
felter i skjemaet som skal inneholde informasjon om betaling. Du skal fylle inn en XPath som vil gi en unik sti til feltet.

Sum-feltet i skjemaet skal inneholde den summen som skal betales. Skjemaet har ansvar for å fylle ut rett sum i dette feltet, slik at
betalingsløsningen i Altinn kan finne korrekt beløp som sluttbrukeren må betale. Dette feltet kan brukes til å ha en betinget betaling på
utgaven. For å få til dette må du ha en logikk som setter sum-feltet til «0» dersom betaling ikke skal utføres. Motsatt må sum-feltet få et
beløp større enn 0 for å sørge for at Altinn vil kreve betaling på utgaven.

Feltet for beskrivelse skal inneholde den teksten som skal vises til sluttbrukeren som forklaring for betalingen inne i løsningen til
betalingsleverandøren.

Ordrenummer-feltet er det feltet som skal ha ordrenummeret for betalingen. Avhengig av valget gjort i «Ordrenummer generes av skjema» skal
dette feltet enten fylles ut av skjema, eller så skal Altinn legge inn ordrenummer i dette feltet. Dersom du velger at skjema genererer
ordrenummer, så må du sørge for at skjema legger dette inn i feltet.

Transaksjons-id er en id som blir generert av betalingsleverandør ved betaling. Dette er et felt som skjemaet må ha for å kunne ta imot
denne id-en. Feltet skal ikke fylles ut av skjema.

For at betaling skal fungere må du også velge en [prosessflyt](#prosessflyt) som inneholder et betalingssteg.

### Overstyr rettigheter

Rettigheter trenger du bare å [overstyre](../felles-funksjonalitet/#overstyr-rettigheter) hvis den utgaven du utvikler har flere signeringssteg, eller hvis den har andre rettighetskrav enn
de som allerede er satt på tjenestenivå. Hver utgave vil arve disse rettighetene når den migreres til SBL, og få med seg overstyringene i
tillegg.

### Prosessflyt

Prossessflyt kan defineres for en innsendningstjeneste og angir hvilken flyt tjenesten skal følge i SBL. Med dette menes at man velger
hvilke steg tjenesteeier vil at utgaven skal igjennom hos utfyller. F.eks. vil en prosessflyt med signeringssteg tvinge utfyller til å måtte
signere skjemaet før den kan sendes inn og arkiveres.

#### Velge mal

På parametersiden *Prosessflyt* kan du definere en prosessflyt basert på en prosessflytmal.

Det finnes to typer prosessflytmaler du kan velge mellom:

  - **Felles maler** tilgjengeliggjør generelle maler som alle tjenesteeiere kan benytte i nedtrekkslisten. Disse er tomme.
  - **Tjenesteeiers maler** - tilgjengeliggjør maler som allerede er tilpasset tjenesteeier i nedtrekkslisten. Disse kan være delvis eller
    ferdig utfylt.

Dette velges ved hjelp av radioknappene på toppen. Valget vil påvirke hvilke maler som er tilgjengelig i nedtrekkslisten. For å benytte en
gitt mal trykker man på knappen *Bruk Mal*.

![Figur 46 – Prosessflyt; valg av mal](/docs/images/guides/tul/prosessflyt-velg-mal.png "Figur 46 – Prosessflyt; valg av mal")

Stegene en prosessflyt kan bestå av, er utfyllingssteg, signeringssteg, betalingssteg og innsendingssteg. Det finnes flere typer
signeringssteg: Enkelt, enkelt/betinget og brukerstyrt. Et betinget signeringssteg vil bare gjennomføres hvis en bestemt betingelse er
oppfylt. I et brukerstyrt signeringssteg definerer du hvor mange signaturer som skal innhentes, og så vil brukeren bli bedt om å
identifisere de aktuelle brukerne som skal signere.

Du velger hvilke steg tjenesten skal inneholde ved å velge en mal som inneholder de rette stegene. Klikk på *Bruk mal* for å velge ønsket
mal.

P.t. finnes det ni felles prosessflytmaler tilgjengelig i TUL:

  - Utfylling og innsending
  - Utfylling og signering
  - Utfylling og betinget signering
  - Utfylling og dobbel signering
  - Utfylling og betinget dobbel signering
  - Betaling
  - Utfylling og betaling
  - Utfylling, betaling og signering
  - Utfylling, signering og betaling

Nye prosessflytmaler settes opp i XML, noe som kan gjøres av tjenesteeiere. Dette er nødvendig for å ta i bruk ny versjon 2-funksjonalitet
knyttet til signering. Se [prosessflytmaler](../../diverse/administrators-oppgaver/#prosessflytmaler) for informasjon om hvordan nye maler lages og tilgjengeliggjøres i TUL.

#### Bruke mal

For hvert steg i prosessflyten kan du sette parametre som bestemmer hvordan hvert enkelt steg i flyten skal gjennomføres i
sluttbrukerløsningen. Hvilke parametre som fremkommer, avhenger av stegtypen. Noen eksempler fra signeringssteg:

  - Sikkerhetsnivå: Kan settes per steg i prosessflyten og overstyrer sikkerhetsnivået for utgaven for det enkelte steget.
  - Signeringstekst: Det er mulig å angi en signeringstekst som vises for sluttbruker på signeringssiden. Gjelder per signeringssteg.
  - Obligatorisk signering: Definerer om sluttbruker a) må signere på hovedskjema og alle skjemavedlegg, b) fritt kan velge å signere på
    enkeltskjema, eller c) kan velge innenfor de skjema som ikke er markert med obligatorisk signering på skjemasett-siden.
  - Har ikke signert tidligere: Settes til ”ja” hvis signaturen som innhentes i steget må komme fra bruker som ikke har signert tidligere i
    arbeidsflyten.
  - Antall signaturer: Gjelder brukerstyrt signering. Angir minimum antall signaturer som skal innhentes i steget; sluttbruker kan velge et
    større tall.
  - Unike signaturer: Gjelder brukerstyrt signering. Settes til ”ja” hvis innhentede signaturer i steget må komme fra forskjellige brukere.

![Figur 47 – Prosessflyt; eksempel på parametre.](/docs/images/guides/tul/prosessflyt-parametre.png "Figur 47 – Prosessflyt; eksempel på parametre.")

Hvis utvikler setter sikkerhetsnivå til 2 på en utgave av en innsendingstjeneste og setter sikkerhetsnivå til 3 på signeringssteg så vil det
i praksis bety at sluttbruker får kjørt gjennom tjenesten på nivå 2, men i det øyeblikket sluttbruker trykker på signeringsknappen så blir
han/hun tvunget til å logge inn på ny med en innloggingsmetode med sikkerhetsnivå 3.

Betinget signering betyr at man kan avgjøre under utfylling om bruker må signere på skjema eller ikke, ved å sjekke inntastet verdi i et
felt mot en gitt grenseverdi.

For prosessflytene som inneholder betinget signering, vil det på signeringssteget være noen ekstra parametere:

  - **Betinget felt**: Her angis xPath til feltet som det skal sjekkes mot.
  - **Operator:** Angir hvordan man skal sjekke grenseverdi mot felt.
  - **Grenseverdi:** Angir hvilken verdi det betingete feltet skal matche iht operatoren.

F.eks. hvis man i et skjema vil at utfyller skal slippe å signere hvis han eller hun sender inn skjema for en bedrift som har under 500.000
kr i omsetning, kan verdiene være som følger:

| Betinget felt                          | Operator | Grenseverdi |
| -------------------------------------- | -------- | ----------- |
| /skjema/grp_omsetning/AarligOmsetning | \>       | 500000      |

### Skjemasett

Et skjemasett er en hierarkisk samling av skjemaer som inngår i en innsendingstjeneste. Her bestemmer du hvilke underskjemaer som inngår i
utgaven, hvor utgaven inneholder hovedskjemaet. Et skjemasett kan bygges basert på de skjemaene som tilhører gitt tjenesteeier. Det kan ikke
velges underskjema fra samme tjeneste som utgaven du definerer tilhører.

På parametersiden *Skjemasett* er alle tjenesteeiers skjema listet med tjenestens kortnavn, utgavens kortnavn, informasjon om hvorvidt
skjemaet er definert som hovedskjema eller ikke, versjonsstatus og produksjonsstatus sammen med en lenke (*Legg til*) for å legge til
skjemaet i skjemasettet. Det er viktig å merke seg at man kun velger å benytte skjemaet og skjemaets parametre, være seg preutfylling,
sideegenskaper etc fra utgaven man velger i listen. Disse dataene vil inngå i hovedskjemaets utgave ved en migrering. I forhold til i SUM
(forgjengeren til TUL) er det derfor ikke nødvendig å migrere underskjema før hovedskjema. Underskjema vedlikeholdes derfor i sin egen
utgave.

Når et skjema blir valgt, legges det til en liste der tjenesteutvikler kan konfigurere egenskaper for valgte underskjema ved å sette
følgende parametre:

  - Parameteren *Sluttbruker kan legge til manuelt* vil gjøre det mulig for sluttbruker selv å legge dette skjema inn som underskjema. Satt
    som default valg i TUL.
  - Parameteren *Maks ett* vil gjøre det umulig å legge til mer enn én forekomst av dette skjema for sluttbruker i SBL. Satt som default
    valg i TUL.
  - Parameteren *Inkluder i felles datakilde* fører til at felter i underskjema blir tilgjengelig for hovedskjema. Satt som default valg i TUL.
    NB! Ved bruk av [regelmotor](../../vedlegg/regelmotor/) er ikke dette nødvendig
  - Parameteren *Bruk felles datakilde* betyr at underskjema vil få tilgang til felter fra andre utvalgte skjema i skjemasettet.
    NB! Ved bruk av [regelmotor](../../vedlegg/regelmotor/) er ikke dette nødvendig
  - Parameteren *Obligatorisk signering* vil gjøre det obligatorisk for sluttbruker å signere dette skjema, dersom signeringssteget i
    arbeidsflyten angir at signeringkrav settes på skjemanivå (dvs. avhengig av denne parameteren).

På skjemasett-siden ligger det også en parameter som styrer obligatorisk signering for hovedskjema, ref. ovenfor.

Et skjema kan slettes fra skjemasettet i etterkant ved å trykke på lenken *Fjern* i listen over skjemaer som lagt til.

![Figur 48 – Skjemasett](/docs/images/guides/tul/skjemasett.png?width=700 "Figur 48 – Skjemasett")


Ved åpning av skjemasettsiden vil viste utgaver være sortert alfabetisk på utgave-kortnavn.

**Felles datakilde**

Felles datakilde er en funksjon som tilgjengeliggjør ekstra datakilder i InfoPath-skjemaet. Man kan dermed benytte strukturen fra andre
skjema og få eksempelvis verdioverføringer innad i et skjemasett.

*Det vil ikke være mulig å enhetsteste verdioverføringer. Dvs, man kan ikke teste en verdioverføring fra et underskjema til hovedskjema i
InfoPath preview-modus.*

Felles datakilde genereres ved hjelp av *Generér felles datakilde*-knappen. Det er verdt å merke seg at siden et underskjema kan være del av
flere skjemasett, vil det kunne forekomme flere datakilder i skjemaet enn det som er nødvendig. Disse kan, hvis ønskelig, slettes ved å
navigere til *Datakilde* i hjelpefanen i InfoPa th, deretter velge *Behandle datatilkoblinger* og deretter markere den man vi slette og
velge *Fjern*.

En god regel vil være å fjerne datakoblinger fra en felles datakilde, før en ny opprettes. Dette er fordi at i enkelte tilfeller vil man
kunne få en ”sirkulær” datakilde, hvor felter kan referere til seg selv.

Felles datakilde vil finnes i skjemaet som en *sekundær datakilde*. Dermed kan man velge å benytte felter fra underskjemaet i kalkyler,
valideringer o.l. i hovedskjemaet. Disse feltene hentes fra InfoPath sin datakilde-meny på samme måte som for hovedkilden.

Det er også mulig å benytte egendefinerte felter og altinn-namespace felter i felles datakilde.

### Splitt av data

Ved innsending av et skjemasett sendes data registrert av sluttbruker i SBL til tjenesteeier. Splitt av data tilbyr en mer fleksibel
håndtering av disse dataene ved å angi at alle eller deler av dataene skal distribueres til en eller flere andre tjenesteeiere.

Det må defineres en splitt for hver tjenesteeier som skal motta data, og for hvert skjema i skjemasettet som skal avgi data til denne
tjenesteeieren. Du kan enten velge å sende hele skjemaet, eller bare deler av det. Velger du «Send hele skjemaet», så vil alle feltene i
skjemaet bli sendt over i denne splitten. Dersom du bare vil sende deler av skjemaet må du lage en XSLT-fil som mapper felter fra skjemaets
XSD. Denne filen må du lage, for eksempel ved bruk av Visual Studio, før splitten kan registreres i TUL. Splitten registreres i TUL ved å
laste opp XSLT-filen. Merk at dersom du har valgt å sende hele skjemaet, så vil opplastingskontrollen være deaktivert. Du må altså velge
mellom å sende hele skjema, eller å bare sende deler ved hjelp av XSLT-fil.

I tillegg må du fortelle hvilken tjenesteeier som skal motta dataene, hvilken oversendelsesmetode som skal brukes og hvilket skjema splitten
skal hente data fra. Hvis en tjenesteeier skal motta flere splitter fra samme skjemasett, må oversendelsesmetoden være den samme. Du må da
definere en ny splitt for hvert skjema som skal sendes.

![Figur 49 - Definisjon av datasplitt](/docs/images/guides/tul/datasplitt.png "Figur 49 - Definisjon av datasplitt")

Ved å trykke på knappen *Legg til* vil splittdefinisjonen legges til i en liste lengre ned på siden. Splitten kan slettes fra listen ved å
klikke på lenken *Slett.*

### Metadatafiler

En innsendingstjeneste kan benytte egne metadatafiler for å skreddersy tjenesten i SBL. På metadatasiden kan man laste opp metadatafiler som
inneholder informasjon om hvordan skjemaene skal valideres og hvordan verdier kalkuleres og overføres mellom skjemaer. Man kan for eksempel
velge om validering og kalkulering skal gjøres gjennom Infopath eller Altinns egen regelmotor ARE.

ARE regelfiler kan inneholde både valideringer og kalkuleringer. SBL har standardfunksjonalitet for å utnytte disse, såfremt filen
overholder definerte formatkrav. Ved bruk av ARE må også filen inneholde definisjonen på alle reglene som skal brukes. For hjelp til å lage
ARE-regelfiler se [vedlegg om regelmotor](../../vedlegg/regelmotor/).

Kun ARE er definert som standard metadatafiltype, men man kan også bruke andre metadatatyper om utgaven benytter tilpasset
visning/programlogikk i SBL som utnytter disse filene.

Det kan bare lastes opp én fil av hver metadatatype. Ved opplasting av ny fil av samme type, overskrives den eksisterende.

![Figur 50 - Metadatafiler](/docs/images/guides/tul/metadatafiler.png?width=700 "Figur 50 - Metadatafiler")


### Filvedlegg

![Figur 51 - Filvedlegg-siden](/docs/images/guides/tul/filvedlegg.png?width=700 "Figur 51 - Filvedlegg-siden")

På filvedleggsiden avgjør du om det skal være tillatt å laste opp filvedlegg i tjenesteutgaven eller ikke. De andre valgene på denne siden
vil ikke være tilgjengelige før du har valgt å tillate filvedlegg.

#### Filvedlegginnstillinger

Innstillinger for de binære filvedleggene. Disse tre valgene lå tidligere på utgaveparametersiden.

 - **Tillat vedlegg** - Angir om sluttbruker kan laste opp egne filer som vedlegg til innsendingstjenesten. Satt som default valg i TUL.
 - **Kryptér binære filer** - Angir om binære filvedlegg skal krypteres. Deaktiveres hvis «Tillat vedlegg» ikke er valgt. Kryptering kan ikke benyttes samtidig med vedleggstyper.
 - **Nye filvedlegg kan lastes opp under signering** - Angir om bruker i SBL kan laste opp binære vedlegg etter utfylling, under signering. Alle filvedlegg har en begrensning på 10 MB.

#### Vedleggstyper

For å bruke en eller flere vedleggstyper må tjenesteutvikleren gå inn på «Filvedlegg» fra tjenesteutgavearbeidsflaten. På denne siden kan du
bestemme om filvedlegg skal være tillatt eller ikke. Dersom du tillater filvedlegg, men ikke velger noen vedleggstype, vil det være de
globale innstillingene for filvedlegg som vil gjelde. Velger du derimot en eller flere vedleggstyper, vil det være innstillingene i de
vedleggstypene du har valgt som vil gjelde. Om tjenesteutgaven har vedleggstyper vil sluttbruker måtte velge en av de for hver fil han vil
laste opp.

For å legge en vedleggstype til en tjenesteutgave velger du rett vedleggstype fra nedtrekksmenyen «Vedleggstyper». Når du velger en
vedleggstype vil du få opp regler som er definert for denne. For å ta den i bruk trykk på «Legg til»-knappen. De vedleggstypene du har valgt
vil dukke opp i listen nederst på siden.

For å fjerne en vedleggstype fra tjenesteutgaven trykk på «Slett» bak den vedleggstypen du vil fjerne. Dette vil fjerne vedleggstypen fra
denne tjenesteutgaven.

For å lagre endringer du har gjort må du sjekke inn siden.

Se mer [informasjon om vedleggstyper](vedleggstyper/).

## Innhold – innsendingstjeneste

Innholdet i en innsendingstjeneste er informasjonen som ligger i InfoPath-skjema. For at innholdet skal vises og behandles riktig i Altinn,
er det nødvendig å registrere en del tilleggsinformasjon om hvordan det skal oppføre seg. Du må definere sideegenskaper, og du kan
registrere innholdsreferanser. Andre eksempler er preutfylling, SKD betalingsinformasjon og hjelpetekster. For at skjema og
tilleggsinformasjonen skal spille sammen, må skjema utvikles etter bestemte retningslinjer. Dette kapitlet gir en oversikt over hvordan du
gjør dette, og refererer til vedlegg for detaljert informasjon og eksempler.

### Skjema

Se [InfoPath-skjema i Altinn](../felles-funksjonalitet/#infopath-skjema-i-altinn) for beskrivelse av prinsipper rundt skjemabibliotek, skjema og visning, samt inn-/utsjekking og
publisering av skjema.

En tjenesteutgave av en innsendingstjeneste må ha ett, og bare ett, hovedskjema. Dersom tjenesten skal ha underskjemaer må underskjemaene
defineres som egne tjenester og utgaver, og deretter knyttes opp mot tjenesten gjennom et [skjemasett](#skjemasett).

I skjemaet bestemmes skjemaets layout, overskrifter/ledetekster, datafelt, kalkyler, valideringsregler og tilhørende feilmeldinger. Du kan
også legge inn *Hjelp*-knapper som gir tilgang til [hjelpeinformasjon](#hjelpetekster) under utfyllingen i SBL.

Følgende vedlegg er relevante:

  - [Vedlegg A: Skjemautvikling i InfoPath](../../vedlegg/a/) inneholder en innføring i skjemautvikling i InfoPath for bruk rettet mot TUL.
  - [Vedlegg B: Utforming av brukergrensesnitt for skjema](../../vedlegg/b/) beskriver utvikling av brukergrensesnitt i InfoPath i forhold til
    presentasjon i SBL.
  - [Vedlegg C: Utforming av brukervennlige tjenester](../../vedlegg/c/) gir veiledning i utforming av brukervennlige og tilgjengelige tjenester.

### Sideegenskaper

Du må definere sideegenskaper for at det skal være mulig i SBL å vite for eksempel hvilke InfoPath-visninger som skal vises for utfylling,
og hvilke som skal brukes for utskrift. Dette er beskrevet under fellesfunksjonaliteten [sideegenskaper](../felles-funksjonalitet/#sideegenskaper).

Informasjonen som angis under Sideegenskaper er avgjørende for at skjema skal kunne presenteres og fylles ut i SBL iht.
ELMER-retningslinjene.

### Sporvalg

Sporvalg er en funksjonalitet bestemmer hvilke sider som presenteres for sluttbrukeren avhengig av hva bruker fyller ut i skjema. Dette
muliggjør å tilpasse skjemaet til flere formål.

Et sporvalg består av flere spor. En utgave kan ha flere sporvalg, på ulike sider, det skal dog ikke være mer enn *ett* sporvalg pr side.
Skal man ha flere sporvalg på samme side, må verdier mellomlagres i uttrykksbokser.

Eksempel:  
Dersom spørsmålet «Er du gift?» ligger på side 1 i et skjema kan svaret medføre to ulike *spor* avhengig av om sluttbrukeren svarer «Ja»
eller «Nei».

  - Dersom sluttbruker svarer «Ja» skal skjemaside 2 «Informasjon om ektefelle» fylles ut før skjemaside 3 og 4.
  - Dersom sluttbruker svarer «Nei» skal *ikke* skjemaside 2 «Informasjon om ektefelle» bli vist i det hele tatt, men sluttbruker skal tas
    direkte til skjemaside 3 og 4.

For å definere sporvalget videre i TUL, velg *Sporvalg* under område *Innholdsspesifikasjon* på utgavens arbeidsflate. Definer et spor ved å
velge side og felt, og skriv inn verdi. Velg deretter hvilke sider som skal vises for denne verdien. Alle spor med felles side og felt vil
danne et sporvalg. Figuren under viser to spor i samme sporvalget.

![Figur 52 – Sporvalg](/docs/images/guides/tul/sporvalg.png?width=700 "Figur 52 – Sporvalg")

Hvis du endrer siderekkefølge under Sideegenskaper, vil dette kunne påvirke tidligere definerte sporvalg. Et sporvalg som er blitt ugyldig
på grunn av endret siderekkefølge, vises innrammet i rødt, og en tooltip forklarer hva som har skjedd. Du kan da slette sporvalget og
definere det på nytt med den nye siderekkefølgen, alternativt gå til Sideegenskaper og endre til opprinnelig siderekkefølge.

### Innholdsreferanser

[Presentasjonsfelt](../felles-funksjonalitet/#presentasjonsfelt) hjelper sluttbruker å finne skjemaet i SBL, 
[referanser til geografisk informasjon](../felles-funksjonalitet/#geografisk-tilhørighet) i skjema gjør det mulig å styre
tilgang til skjema i tjenesteeiers arkiv basert på avgivers tilhørighet, 
og [metadatafelter](../felles-funksjonalitet/#trekk-ut-data-fra-innsendelse) brukes til å definere felter som kan trekkes ut etter skjema er sendt fra Altinn.

### Preutfylling

Med preutfylling menes at felter i et skjema kan være forhåndsutfylt når skjemaet åpnes i sluttbrukerløsningen. Det er tre ulike måter å
preutfylle på:

1. Skjemaet leveres ferdig preutfylt fra tjenesteeier til Altinn. Sluttbruker vil se et utfylt skjema i sluttbrukerløsningen med data som
   tjenesteeier/etat har bestemt.
2. Tjenesteeier sender prefilldata som nøkkel/verdi-par, i kombinasjon med avgiver-ID. Nøkkelen identifiserer skjema og felt (xPath) der
   verdien skal fylles inn. Her vil felt bli preutfylt hvis de matcher xPath som tjenesteeier/etat har angitt. Dette vil tilsvare
   preutfyllingen av spesifikke orid’er i Altinn 1.
3. Preutfyllingsdata hentes fra sentrale registre og fylles ut i gitte felter. Tjenesteutvikler bestemmer hva som skal preutfylles i de
   enkelte feltene. Data til disse feltene hentes fra registeret i sluttbrukerløsningen ved instansiering av skjema.

I TUL må preutfyllingssiden fylles ut dersom dersom tjenesten skal benytte preutfyllingsmåte 2 eller 3.

#### Nøkkel/verdi-preutfylling

Huk av for *Tillat nøkkel/verdi preutfylling* dersom tjenesteeier skal kunne sende inn prefilldata som nøkkel/verdi-par for denne tjenesten.
Det er viktig at Xpath som ligger lagret i SBL må matche skjemaets felter sin xPath for at de skal forhåndsutfylles ved nøkkel/verdi
preutfylling.

#### Registerpreutfylling

Registerpreutfylling går ut på at man velger hvilke felt som skal inneholde data fra hvilke registerfelt. Dataene som vises er da basert på
hvilken avgiver som utfyller sender inn for.

Velg register, skjemaside, skjemafelt, kontekst og registerfelt for de feltene som skal hentes fra sentrale registre. Det legges til en ny
blank linje i preutfyllingsbildet for hver linje som registreres, slik at man kan registrere så mange felt man vil.

Det finnes tre registre, og hver av registrene har egne *kontekster*. Kontekster er på bakgrunn av *hva* man skal hente ut data

| Registerforkortelse | Registernavn               | Kontekst                                  |
| ------------------- | -------------------------- | ----------------------------------------- |
| DSF                 | Det sentrale folkeregister | Privatperson                              |
| ER                  | Enhetsregisteret           | Enhet, juridisk enhet og valgt org.nummer |
| DLS                 | Deltakerlignende selskap   | Ingen                                     |

*Merk: DLS har p.t. ingen prefillfelter tilgjengelig.*

**Forskjell på kontekster i enhetsregisteret**

<table>
<thead>
<tr>
<td>Bedrift</td>
<td><p>A: Om valgt organisasjonsnummer er en bedrift vil feltet bli fylt med data for bedriften.</p>
<p>B: Om valgt organisasjonsnummer er en juridisk enhet vil ikke feltet bli fylt ut.</p></td>
</tr>
</thead>
<tbody>
<tr>
<td>Juridisk enhet</td>
<td><p>A: Om valgt organisasjonsnummer er en juridisk enhet blir feltet fylt med data for den juridiske enheten</p>
<p>B: Om valgt organisasjonsnummer er en bedrift blir feltet fylt med data for bedriftens juridiske enhet</p></td>
</tr>
<tr>
<td>Valgt org.nummer</td>
<td>Blir fyllt med data for valgt organisasjonsnummer, uavhengig om organisasjonsnummer representerer juridisk enhet eller bedrift.</td>
</tr>
</tbody>
</table>

 

**Mulige preutfyllingsvalg:**

<table>
<thead>
<tr>
<th colspan="5" style="text-align:center">Enhetsregisteret</th>
</tr>
<tr>
<th colspan="3" style="text-align:center">TUL</th>
<th colspan="2" style="text-align:center">SBL</th>
</tr>
</thead>
<tbody>
<tr>
<td><em>Kontekst</em></td>
<td><em>Norsk visningsnavn</em></td>
<td><em>Engelsk visningsnavn</em></td>
<td><em>Tabell</em></td>
<td><em>Kolonne</em></td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Organisasjons­nummer</td>
<td>Organisation number</td>
<td>REG_Unit</td>
<td>OrgNumber_AK</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Navn</td>
<td>Name</td>
<td>REG_Unit</td>
<td>UnitName</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Adresse</td>
<td>Address</td>
<td>REG_Unit</td>
<td>AdressPostAddress</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Postnummer</td>
<td>Postal code</td>
<td>REG_Unit</td>
<td>PostalCodeMail_FK</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Poststed</td>
<td>Postal district</td>
<td>REG_Postal­Code</td>
<td>City</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Forretnings­adresse</td>
<td>Business address</td>
<td>REG_Unit</td>
<td>BusinessAddress</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Forretnings­postnummer</td>
<td>Postal code (business address)</td>
<td>REG_Unit</td>
<td>PostalCodeBusiness_FK</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Forretnings­poststed</td>
<td>Postal district (business address)</td>
<td>REG_Postal­Code</td>
<td>City</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Telefon­nummer</td>
<td>Phone number</td>
<td>REG_Unit</td>
<td>TelephoneNumber</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Mobiltelefon­nummer</td>
<td>Mobile phone number</td>
<td>REG_Unit</td>
<td>MobilePhone</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Faxnummer</td>
<td>Fax number</td>
<td>REG_Unit</td>
<td>Fax</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Epost</td>
<td>Email address</td>
<td>REG_Unit</td>
<td>EMailAddress</td>
</tr>
<tr>
<td>Juridisk enhet</td>
<td>Internett adresse</td>
<td>Web address</td>
<td>REG_Unit</td>
<td>InternetAddress</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Organisasjonsnummer</td>
<td>Organisation number</td>
<td>REG_Unit</td>
<td>OrgNumber_AK</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Navn</td>
<td>Name</td>
<td>REG_Unit</td>
<td>UnitName</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Adresse</td>
<td>Address</td>
<td>REG_Unit</td>
<td>AdressPostAddress</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Poststed</td>
<td>Postal district</td>
<td>REG_Postal­Code</td>
<td>City</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Postnummer</td>
<td>Postal code</td>
<td>REG_Unit</td>
<td>PostalCodeMail_FK</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Telefonnummer</td>
<td>Phone number</td>
<td>REG_Unit</td>
<td>TelephoneNumber</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Mobiltelefonnummer</td>
<td>Mobile phone number</td>
<td>REG_Unit</td>
<td>MobilePhone</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Faxnummer</td>
<td>Fax number</td>
<td>REG_Unit</td>
<td>Fax</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Epost</td>
<td>Email address</td>
<td>REG_Unit</td>
<td>EMailAddress</td>
</tr>
<tr>
<td>Bedrift (Unit)</td>
<td>Internett adresse</td>
<td>Web address</td>
<td>REG_Unit</td>
<td>InternetAddress</td>
</tr>
<tr>
<td>Valgt org. nr.</td>
<td>Organisasjons­nummer</td>
<td>Organisation number</td>
<td>REG_Unit</td>
<td>OrgNumber_AK</td>
</tr>
<tr>
<td>Valgt org. nr.</td>
<td>Organisasjonsform</td>
<td>Entity type</td>
<td>REG_Unit</td>
<td>UnitType</td>
</tr>
<tr>
<td>Valgt org. nr.</td>
<td>Navn</td>
<td>Name</td>
<td>REG_Unit</td>
<td>UnitName</td>
</tr>
<tr>
<td>Valgt org. nr.</td>
<td>Adresse</td>
<td>Address</td>
<td>REG_Unit</td>
<td>AdressPostAddress</td>
</tr>
<tr>
<td>Valgt org. nr.</td>
<td>Postnummer</td>
<td>Postal code</td>
<td>REG_Unit</td>
<td>PostalCodeMail_FK</td>
</tr>
<tr>
<td>Valgt org. nr.</td>
<td>Poststed</td>
<td>Postal district</td>
<td>REG_Postal­Code</td>
<td>City</td>
</tr>
<tr>
<td>Valgt org. nr.</td>
<td>Forretningsadresse</td>
<td>Business address</td>
<td>REG_Unit</td>
<td>BusinessAddress</td>
</tr>
<tr>
<td>Valgt org. nr.</td>
<td>Forretningspostnummer</td>
<td>Postal code (business address)</td>
<td>REG_Unit</td>
<td>PostalCodeBusiness_FK</td>
</tr>
<tr>
<td>Valgt org. nr.</td>
<td>Forretningspoststed</td>
<td>Postal district (business address)</td>
<td>REG_Postal­Code</td>
<td>City</td>
</tr>
</tbody>
</table>

**Folkeregisteret**

| Norsk visningsnavn TUL) | Engelsk visningsnavn (TUL) | Tabell (SBL)                 | Kolonne (SBL)
| ----------------------- | -------------------------- | ---------------------------- | ---------------------------
| Fødselsnummer           | Personal ID number         | REG_USER                     | FNumber_AK
| Navn                    | Name                       | REG_USER                     | Name
| Fornavn                 | First name                 | REG_USER                     | FirstName
| Etternavn               | Surname                    | REG_USER                     | LastName
| Postadresse             | Address                    | REG_Alternative­Address­Line   | AddressLine1-4*
| Postnummer              | Postal code                | REG_Alternative­Address­Line   | PostalCode_FK
| Poststed                | Postal district            | REG_PostalCode               | City
| Kommune­nummer           | Municipal Number           | REG_Municipal                | MunicipalNumber_AK
| Kommunenavn             | Municipal Name             | REG_Municipal                | MunicipalName
| Mellomnavn              | Middle Name                | REG_USER                     | MiddleName
| Gatenavn (bosted)       | Street Name                | REG_Street                   | StreetName
| Stedsnavn (bosted)      | Place Name                 | REG_Property                 | AddressName 
| Husnummer (bosted)      | House Number               | REG_AddressLine              | HouseNumber
| Husbokstav (bosted)     | House Letter               | REG_AddressLine              | HouseLetter
| Postnummer (bosted)     | Postal code                | ?                            | ?
| Poststed (bosted)       | Postal district            | ?                            | ?

*unntatt linje 3 dersom den begynner med et postnummer

![Figur 53 - Preutfylling](/docs/images/guides/tul/preutfylling.png?width=700 "Figur 53 - Preutfylling")

#### Mottaksdefinisjon

Under mottaksdefinisjon kan man angi hvilket felt i skjemaet som skal styre hvor skjemaet havner etter at det er arkivert i Altinn.

### SKD betalingsinformasjon

Betalingsinformasjonen er spesialtilpasset skjemaordningene MVA og Terminoppgaven (FLT) til Skatteetaten (SKD). Det er altså ingen generell
løsning som kan brukes av alle.

Den må ikke bli forvekslet med den [generelle betalingsløsningen](betaling/).

Dersom en innsendningstjeneste skal kunne generere betalingsinformasjon i sluttbrukerløsningen angir du her hvilke felter i innsendingen som
skal benyttes for de ulike betalingsdetaljene.

Du kan velge gjenbrukbar logikk for generering av betalingsinformasjon i et nedtrekksliste for *Betalingslogikk* øverst på siden. Hvilke
felter som er påkrevd, avhenger av hvilken betalingslogikk som er valgt. Det vil derfor ikke i TUL valideres og må kjennes av den enkelte
skjemautvikler basert på logikken som velges.

![Figur 54 – SKD betalingsinformasjon](/docs/images/guides/tul/skd-betalingsinfo.png?width=700 "Figur 54 – SKD betalingsinformasjon")


### Hjelpetekster

Til hvert felt i et skjema laget i InfoPath kan det knyttes en hjelpetekst. Hjelpteksten vises iht. ELMER-retningslinjene i høyre side i
SBL. En hjelpetekst i TUL knyttes ikke direkte til et felt, men til en bildeknapp (PictureButton) som må plasseres i nærhet av feltet den
skal tilhøre. Denne bildeknappen må ha et navn som begynner på *HelpText\_* for å kunne gjenkjennes i TUL. For hver bildeknapp i skjemaet
som har et navn som begynner på HelpText\_ vil det være mulig å definere *én* tekst.

Først oppretter du hjelpeknapper i InfoPath for enkeltfelter og overskrifter som skal ha hjelpetekster. Se *Vedlegg A: Veiledning i
skjemautvikling i InfoPath* for en beskrivelse av hvordan dette gjøres.

I TUL kan du velge å se alle hjelpeknappene i skjemaet eller velge side i nedtrekkslisten for å begrense innholdet i listen. En hjelpetekst
bør inneholde en begrenset mengde tekst for ikke å ”flyte ut” i SBL. Begrensningen er dog ca. 5000 tegn, inklusive mellomrom og spesialtegn.
Det er verdt å merke seg at dette er inkludert HTML-formatering.

![Figur 55 - Hjelpetekster](/docs/images/guides/tul/hjelpetekster.png?width=700 "Figur 55 - Hjelpetekster")

**Hjelpetekst nivå 1 og nivå 2**

Det er hensiktsmessig å begrense innholdet i hjelpeteksten som vises i sluttbrukerløsningen til så kort og konsist som mulig, men der hvor
det ikke er hensiktsmessig eller mulig bør man tilstrebe å vises informasjon fra eksterne kilder i et eget vindu. Hjelpetekst som vises i
sluttbrukerløsningen kalles *Nivå 1*, mens ekstern hjelpetekst kalles *Nivå 2*.

For å gjøre dette må man legge inn en lenke i hjelpeteksten i TUL. Dette gjøres i to steg via teksteditoren:

(tekst innenfor `$` vil variere)

1.  Plassér markøren i hjelpeteksten der du vil at lenken skal vises.
2.  Klikk på lenke-ikonet ![](/docs/images/guides/tul/lenke-ikon.png) og tast inn url’en til den eksterne
    hjelpeteksten.
3.  Bytt til kildevisning av teksten ved å klikke på kilde-ikonet ![](/docs/images/guides/tul/kilde-ikon.png)
4.  Finn HTML-koden til lenken, angitt som `<a href="http://$adresse$">$Lenke$</a>`
5.  Legg til target="_blank" slik at HTML-koden blir `<a href="http://$adresse$" target="_blank">$Lenke$</a>`

Dette vil gjøre at lenken åpnes i nytt vindu.

### Innsendingstjeneste fra SBS

#### Prinsipper

Ved innsending fra sluttbrukersystem gjelder i utgangspunktet tre prinsipper:

1. Altinn skal ikke endre på skjemasettet som ble sendt inn av SBS.
2. Altinn kan imidlertid tilføye kalkulerte felter som SBS *unnlater* å sende inn.
3. Skjemasett med feil skal i utgangspunktet stoppes av Altinn og innsending skal feile.

Det andre prinsippet åpner for at SBS kan benytte seg av kalkyler og prefill som er bygget inn i skjemasettet (ved å unnlate å sende inn de
aktuelle feltene). Altinn vil da tilføye feltene med beregnet verdi. SBS får en kvittering som indikerer alle felter som ikke ble sendt inn
fra SBS, men ble tilføyd av Altinn og sendt videre til tjenesteeier. Feltverdien (fra kalkyle eller prefill) er også angitt i kvitteringen.

Tjenesteeier har mulighet til å fravike det tredje prinsippet ved å definere *overstyrbare felter*.

#### Overstyrbare felter

Dersom det skal tillates at SBS sender inn en verdi som fraviker fra prefill eller kalkyle-verdi må feltet defineres som overstyrbart i TUL.

Når SBS sender inn en verdi som fraviker fra en slik "forventet" verdi og feltet er overstyrbart vil innsendingen gå gjennom. Tjenesteeier
mottar skjemasettet med den verdi som ble sendt inn fra SBS, men får ingen indikasjon på at feltverdien avviker fra "forventet" verdi. SBS
får på sin side en kvittering som indikerer hvert felt hvor Altinn "forventet" en annen verdi, samt hvilken verdi Altinn "forventet".

En teknisk beskrivelse av hvordan skjemasett sammenliknes, hva som menes med "ulik verdi", og kriterier for feil (stoppe innsending) og
advarsler finnes i "Implementasjonsguide for sluttbrukersystemer".

![Overstyrbare felter](/docs/images/guides/tul/overstyrbare-felter.png?width=700 "Overstyrbare felter")

Overstyrbare felter defineres på siden innholdsreferanser i arbeidsflaten for tjenesteutgave. Velg skjemaside først, deretter felt.

#### Kun XSD-validering

Kalkyler, prefill og valideringer i et skjema kan "skrus av" for innsendinger fra SBS. Dette tillater en markant ytelsesforbedring, men
medfører at alle innsendinger tillates så lenge selve meldingsformatet for oppgavesettet er fulgt.

Merk at innsendt XML alltid valideres mot XSD, uavhengig av om denne opsjonen er valgt eller ikke. Når opsjonen er valgt gjøres *kun*
XSD-validering ved innsendinger fra SBS. Opsjonen har ingen effekt for SBL-brukere.

![XSD validering](/docs/images/guides/tul/xsd-validering.png?width=700 "XSD validering")

Kun XSD-validering settes på siden XSD-egenskaper i arbeidsflaten for tjenesteutgave. Opsjonen er normalt ikke valgt, som betyr at all
funksjonalitet definert i skjemasettet er "på" - kalkyler, valideringer og prefill kjører også ved innsending fra SBS.

#### Integritetssjekk fra sluttbrukersystem 

Altinn støtter utvikling av skjemaer som kan signeres med XMLDsig standard. Foreløpig er dette begrenset til skjemaer som er signert av
sluttbruker system og sendt komplett via webservice. Funksjonen kan ikke brukes i tjenesteutgaver som bruker skjemasett med felles
datakilde.

For å nyttegjøre seg av XMLDsig må XSD oppdateres manuelt (inntil videre) med XMLDSIG deklarasjoner. Dette må gjøres i forkant av import til
Infopath. Følgende deklarasjoner må gjøres:

  - XMLDSig namespace må være definert i header `xmlns:dsig="http://www.w3.org/2000/09/xmldsig#`
  - XMLDSIG placeholder må angis direkte i sekvens etter siste element innenfor et rotelement i XSD for en innsendingstjeneste:  
    `<xs:any namespace="http://www.w3.org/2000/09/xmldsig#" processContents="lax" minOccurs="0" maxOccurs="unbounded"/>`

Eksempel:

```xml
<xs:schema  xmlns:brreg="http://www.brreg.no/or"
            xmlns:xs="http://www.w3.org/2001/XMLSchema"
            xmlns:dsig="http://www.w3.org/2000/09/xmldsig#"
            elementFormDefault="qualified"
            attributeFormDefault="unqualified">
    <xs:element name="Skjema">
        <xs:complexType>
            <xs:sequence>
                <xs:element ref="soknad-grp-5627" minOccurs="0"/>
                <xs:any namespace="http://www.w3.org/2000/09/xmldsig#" processContents="lax" minOccurs="0" maxOccurs="unbounded"/>
            </xs:sequence>
            …
        </xs:complexType>
    </xs:element>
</xs:schema>
```

Merk at bruk av `any` element med lax direktiv er obligatorisk for at skjema skal kunne brukes av InfoPath, men inneholde vil bli validert
av Altinns XSD validering.

Når XSD er oppdatert kan den importeres til InfoPath. Pass på at «Ikke tillat signering av skjema» er valgt i InfoPath, vi bruker Altinn til
å signere.

![Form Options](/docs/images/guides/tul/form-options.png "Form Options")

Når man har laget et skjema som inneholder et XMLDSig element og lastet det opp i TUL, vil et nytt valg være tilgjengelig på siden
"XSD-egenskaper".

![Integritetssjekk](/docs/images/guides/tul/integritetssjekk.png "Integritetssjekk")

Her finnes nå en nedtrekksliste som foreløpig har to valg:

  - Integritetssjekk fra sluttbrukersystem
  - Av/Ingen

Ved valget «Av/Ingen» gjøres ingen integritetssjekk, mens det ved valget «Integritetssjekk fra sluttbrukersystem» vil være mulig å legge ved
en XMLDSig signatur i XML som sendes inn. XMLDSig signaturen vil bli validert før oversendelse til tjenesteeier og tjenesteeier har så
mulighet til å validere signaturen i sine internesystemer.
