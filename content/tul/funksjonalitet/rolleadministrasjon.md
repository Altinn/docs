---
title: Rolleadministrasjon
description: Oversikt over rolleadministrasjon i TUL, med hovedvekt på definisjon av roller med tilhørende rettigheter.
toc: true
---
{{% notice warning  %}}
Det er vanskelig å gi en god generell veiledning i valg av rolle som skal gi tilgang til tjenesten. Vi tilbyr derfor rådgiving i valg av rolle/rettighet. 
Ta kontakt med oss på tjenesteeier@altinn.no/selvbetjeningsportalen for individuell veiledning. 
{{% /notice %}}

Her gis en oversikt over rolleadministrasjon i TUL, med hovedvekt på definisjon av roller med tilhørende rettigheter. Dette
utføres av brukere med spesielle rettigheter i TUL.

## Sikkerhetspolicy – tjeneste- og utgavenivå

Sikkerhetsmodulen i TUL tillater Tjenesteeier/Systemeier/Tjenesteutvikler å definere en rettighetspolicy for å begrense tilgang for
sluttbruker i sluttbrukerløsningen. Dette gjøres i hovedsak i en egen modul – *Rolleadministrasjon* – der det defineres roller med
tilhørende rettigheter til systemressurser og til tjenesteressurser. Eksterne roller er gitt fra Enhetsregisteret, mens Altinn-roller
defineres i TUL. Alle roller migreres til SBL der roller kan delegeres, og rettighetskrav håndheves.

I *Rolle­administrasjon* defineres rettigheter på tjenestenivå. En utgave vil arve disse rettighets­kravene automatisk når den migreres til
SBL. For tjenesteressurser kan rettighetskrav i tillegg [overstyres for enkeltutgaver](../../tjenestetyper/felles-funksjonalitet/#overstyr-rettigheter)
av tjenesten. Dette gjelder imidlertid ikke roller til tjenesteeiers arkiv; disse rollene har *rollekategori* = *tjenesteeier.*

En *ressurs* er generelt noe en sluttbruker kan få tilgang til. En systemressurs kan være funksjonalitet for å delegere roller og
rettigheter, mens en tjenesteressurs vil være en bestemt tjeneste. En *rettighet* gir sluttbruker tilgang til å utføre en bestemt
*operasjon* på en bestemt ressurs for en bestemt avgiver – for eksempel å lese momsoppgavene i arkivet til virksomheten brukeren er ansatt
i.

Følgende rettigheter kan settes på en ressurs:

Ressurs         | Read           | Write | Sign | Archive Read | Archive Write | Service Owner Archive Read | Delegatable
--------------- |:--------------:|:-----:|:----:|:------------:|:-------------:|:--------------------------:|:-----------: 
Service Owner   | X              | X     | X    | X            | X             | X                          |
Service         | X              | X     | X    | X            | X             | X                          |
Service Edition | X              | X     | X    | X            | X             | X                          |
Form            | X              | X     |      |              |               |                            |
Page            | X              | X     |      |              |               |                            | 
Field           | X              | X     |      |              |               |                            |

## Arbeidsflate for rolleadministrasjon

*Rolleadministrasjon* nås fra startsiden og fra tjenesteeiers arbeidsflate. Systemeier og tjenesteeier/-utvikler vil ha ulike
tilgangsnivåer. Systemeier har mulighet å importere eksterne roller fra registerdatabasen, opprette nye Altinn-roller og endre eksisterende
roller og, når rollene er definert med rettigheter, migrere til SBL. Alle tekster knyttet til rollene kan oversettes, slik som for
tjenesteutgaver. Hvis oversettelse ikke er komplett, brukes hovedspråk for det som mangler.

Tjensteeier/-utvikler har lese-rettigheter på *Rolleadministrasjon*-siden. Hvis tjenesteutvikler trenger en rolle eller rettighet for å
utføre oppgaver knyttet til *Rolleadministrasjon*-siden, må systemeier/ASF kontaktes på <tjenesteeier@altinn.no>.

![Figur 123 – Arbeidsflate for rolleadministrasjon](/docs/images/guides/tul/arbeidsflate-rolleadmin.png?width=700 "Figur 123 – Arbeidsflate for rolleadministrasjon")

Fra arbeidsflaten for rolleadministrasjon kan du åpne én bestemt rolle for å se på/endre denne rollens rettigheter for alle ressurser, eller
du kan åpne én tjeneste og se på/endre rettigheter til denne for alle roller.

## Definisjon av roller

Systemeier kan definere hvilke rettigheter eksterne roller og Altinn-roller skal ha til systemressurser og tjenesteressurser. Øvrige
brukergrupper kan lese tilsvarende informasjon.

Når en rolle åpnes fra arbeidsflaten, kommer du til en side med rollens navn. Denne siden viser selve rolledefinisjonen inkludert hvilke
rettigheter rollen omfatter. Rettighetene listes i to matriser, en for systemressurser og en for tjenesteressurser. Ressurser listes
vertikalt, operasjoner listes horisontalt. Hvilke operasjoner som er relevante, avhenger av tjenestetype og rollekategori. Merk at matrisen
med tjenesteressurser er utvidbar; klikk på en tjenesteeier for å se alle underliggende tjenester. En hake i ruten for ressurs/operasjon
betyr at innehaver av denne rollen har tilgang til å utføre denne operasjonen på ressursen – for den avgiver rollen gjelder for.

![Figur 124 – Eksempel på rolledefinisjon](/docs/images/guides/tul/rolledefinisjon.png?width=700 "Figur 124 – Eksempel på rolledefinisjon")

Når du oppretter en ny rolle, kommer du først til en side der du angir nøkkelinformasjon om rollen, før du kan gå videre. Bruk Rollekategori
= Tjenesteeier hvis rollen gjelder tilgang til tjenesteeiers arkiv.

Det er viktig å angi en god beskrivelse for rollen, for denne vil vises i SBL. Dette gjelder spesielt i perioden fram til alle tjenester
ligger på Altinn II-plattform, fordi tjenestene i Altinn I vil ikke bli listet i rettighetsmatrisen som viser detaljer om rollen. Det betyr
at beskrivelsen er sluttbrukers eneste mulighet til å forstå hva rollen omfatter. - Rettigheter til Altinn I-tjenester vil likevel håndteres
automatisk gjennom en mapping mellom nye og gamle roller.

Eksterne roller tildeles automatisk til sluttbrukere basert på informasjon i Folkeregisteret og Enhetsregisteret. Altinn-roller kobles til
eksterne roller, slik at innehaver av en bestemt ekstern rolle også får de(n) Altinn-rolle(r) som er koblet mot denne. I TUL kobles en
Altinn-rolle til eksterne roller ved å velge en eller flere eksterne roller i en nedtrekksliste og klikke på *Legg til*-knappen.

Altinn-rollene kan som regel delegeres videre; dette kan settes som en parameter ved opprettelse av rollen. Altinn-roller er ment som en
enkel mekanisme for å delegere flere rettigheter samlet, gruppert i henhold til arbeidsdelingen i representative virksomheter.

Det finnes noen unntak på roller som ikke tildeles eksterne roller fra Enhetsregisteret og Folkeregisteret. Disse rollene er innført for å ivareta behov for tilgangsstyring til ressurser som personer i roller fra Enhetsregisteret ikke nødvendigvis skal ha tilgang til (f.eks taushetsbelagte meldinger, API-ressurser o.l.)
Rollene dette gjelder:
- "Roller for sensitive tjenester"
    - Tjenestespesifikke roller som gir tilgang til taushetsbelagte tjenester og som er lagt under "Hovedrolle for sensitive tjenester"
- "Eksplisitt tjenestedelegering"
    - Ikke-delegerbar tjenesterolle for tjenester som bare skal kunne delegeres på tjenestenivå eller instansnivå
    - Rollen eksponeres ikke i portal-grensesnittet i sluttbrukerløsningen (SBL)
    
Delegering av ressurser knyttet til disse rollene kan kun utføres av Hovedadministrator, og evt personer som har fått delegert rolle/tjenesterettighet OG rollen "Tilgangsstyring".


For tjenesteeier-roller finnes ingen slik automatikk. En tjenesteeier-rolle defineres i TUL, migreres til SBL og tildeles manuelt til
utvalgt(e) bruker(e) hos tjenesteeier. Rollen bør bare omfatte rettigheter til tjenesteeiers tjenester, siden SBL uansett gir tilgang til
kun én tjenesteeier om gangen; det er ikke mulig å hente tjenesteelementer fra flere tjenesteeiere til samme liste.

### Rollens rettigheter til tjenester

Rettigheter for tjenester kan defineres på overordnet nivå for alle tjenestene som tilhører en tjenesteeier eller for en enkelt tjeneste.
Ved å huke av en operasjon på tjenesteeiernivået vil alle undernivåer automatisk arve rettigheten; tjenestene tilhørende den aktuelle
tjenesteeier og nye tjenester som opprettes vil automatisk arve denne rettigheten.

![Figur 125 – Rettighet definert på tjenesteeiernivå](/docs/images/guides/tul/rettighet-på-tjenesteeiernivå.png?width=700 "Figur 125 – Rettighet definert på tjenesteeiernivå")

Den grønne rammen rundt sjekkboksen indikerer at du har gjort en endring. Når du sjekker inn rollen vil rammen fortsatt være der, men bli
grå. Slik vil du neste gang du editerer rettighetene til en rolle få en oversikt over hva du har endret denne gangen fordi de nye
endringene markeres med grønne rammer. Det er kun rettigheten som er markert med grønn/grå ramme som lagres i databasen.

Hvis du har gitt en rettighet på tjenesteeiernivå, men tar bort rettigheten for en eller flere tjenester tilhørende den aktuelle
tjenesteeier, vil dette markeres med en grønn sjekkboks på tjenesteeiernivået. En grønnfarget sjekkboks indikerer at rettigheten har blitt
overstyrt på et lavere nivå med en *deny*-regel (nektelse).

![Figur 126 – Grønn sjekkboks indikerer deny-regel på underordnet nivå](/docs/images/guides/tul/deny-regel-på-underordnet-nivå.png?width=700 "Figur 126 – Grønn sjekkboks indikerer deny-regel på underordnet nivå")

Hvis du gir rettigheter på tjenestenivå og tjenesteeier ikke tidligere har rettigheter satt for den aktuelle operasjonen, vil dette markeres
med en oransje sjekkboks på tjenesteeiernivået. En oransjefarget sjekkboks indikerer at rettigheten har blitt overstyrt på et lavere nivå
med en *permit*-regel (tillatelse).

![Figur 127 – Oransje sjekkboks indikerer permit-regel på underordnet nivå](/docs/images/guides/tul/permit-regel-på-underordnet-nivå.png?width=700 "Figur 127 – Oransje sjekkboks indikerer permit-regel på underordnet nivå")

Hvis du gir rettigheter enkeltvis til alle tjenestene tilknyttet en tjenesteeier vil dette markeres med en vanlig hake på
tjenesteeiernivået. Legg merke til at det kun er sjekkboksene på tjenestenivå som markeres med grønn ramme, dette indikerer at det kun er
tjenesterettighetene som lagres i databasen. Nye tjenester som opprettes vil *ikke* få denne rettigheten selv om alle tjenestene knyttet til
tjenesteeieren har rettigheten.

![Figur 128 – Rettigheter definert på tjenestenivå](/docs/images/guides/tul/rettighet-på-tjenestenivå.png?width=700 "Figur 128 – Rettigheter definert på tjenestenivå")

Rolleadministrasjon er ganske komplisert da rettigheter kan settes i flere ulike nivåer, fra et enkelt felt til tjenesteeier. Det lønner seg
å sjekke inn og deretter dobbeltsjekke at de endringene du har utført har blitt slik du ønsket for alle nivåer.

### Slette Altinn-rolle

En Altinn-rolle kan slettes dersom den ikke er koblet mot andre roller. Dersom rollen har koblinger må disse slettes før rollen kan slettes.

## Tjenesterettigheter

Det er også mulig å hente fram alle roller samtidig, for å se på eller endre rettigheter til én bestemt tjeneste. Dette kan være
hensiktsmessig når man skal sette opp rettigheter til en tjeneste for første gang.

For å gå inn på *Tjenesterettigheter*-siden fra *Rolleadministrasjon*-siden klikker du på *Tjenesterettigheter* i menylinjen i listen over
roller.

Velg tjenesteeier og tjeneste i nedtrekkslistene og trykk på *Hent*-kanppen:

![Figur 129 – Hent tjeneste](/docs/images/guides/tul/hent-tjeneste.png?width=700 "Figur 129 – Hent tjeneste")

Du kan nå se en liste over alle roller som har rettigheter til denne tjenesten. For å editere rettighetene til en tjeneste må du ha tilgang
til å administrere rettigheter og sjekke ut siden.

![Figur 130 – Liste over alle roller som har rettigheter for valgt tjeneste](/docs/images/guides/tul/roller-som-har-rettigheter-for-tjeneste.png?width=700 "Figur 130 – Liste over alle roller som har rettigheter for valgt tjeneste")

Du endrer rettighetene til valgte tjeneste ved å legge til eller fjerne markeringer for hvilke operasjoner hver enkelt rolle skal kunne
utføre.

![Figur 131 – Definere rettigheter for tjenesten](/docs/images/guides/tul/definere-rettigheter-for-tjenesten.png?width=700 "Figur 131 – Definere rettigheter for tjenesten")

Når du har sjekket ut siden, vises et valg for å liste alle roller. Dette er nødvendig for å tildele rettigheter til roller som ikke
allerede har det på tjenestenivå. Nederst til venstre under listen er det en sjekkboks, og ved å ta bort haken vil listen utvides til å vise
alle roller.

![Figur 132 – Alle roller](/docs/images/guides/tul/alle-roller.png?width=700 "Figur 132 – Alle roller")

Du har også mulighet til å se eller endre rettigheter på tjenesteeiernivå. Dette gjør du ved å velge tjenesteeier og ”Alle”. Da viser siden
de rollene som har rettigheter satt direkte på tjenesteeiernivå. For øvrig er funksjonaliteten tilsvarende som for tjenestenivå.

Du må sjekke inn for å lagre rettighetene på én tjeneste(eier), før du eventuelt henter fram roller for en annen.

### Rettigheter fra tjenestearbeidsflaten

*Tjenesterettigheter*-siden kan også nås fra arbeidsflaten for en tjeneste. Når siden åpnes, vil den liste rettigheter knyttet til den
aktuelle tjenesten.

![Figur 133 – Se rettigheter fra tjenestearbeidsflaten](/docs/images/guides/tul/rettigheter-fra-tjenestearbeidsflaten.png?width=700 "Figur 133 – Se rettigheter fra tjenestearbeidsflaten")
