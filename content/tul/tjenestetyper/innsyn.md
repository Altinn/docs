---
title: Innsyn
description: Innsynstjenester brukes til å hente data ved å kalle en eller flere web services.
toc: true
---

Forretningslogikk og data ligger hos tjenesteeier, mens presentasjonen av dataene ligger i Altinn. Dataene kan også gjøres tilgjengelig for
sluttbrukersystem.

![Figur 57 – Arbeidsflaten til en nyopprettet utgave av en innsynstjeneste](/docs/images/guides/tul/arbeidsflate-innsyn.png?width=700 "Figur 57 – Arbeidsflaten til en nyopprettet utgave av en innsynstjeneste")


## Spesifikasjon - innsynstjeneste

For en innsynstjeneste må det som for øvrige tjenestetyper registreres utgaveparametre, og det er mulig å overstyre rettigheter.

### Utgaveparametre

Enhver utgave må ha utgaveparametre. Hvordan du registrerer disse, er [beskrevet her](../felles-funksjonalitet/#utgaveparametere).

### Overstyr rettigheter

Rettigheter trenger du bare å [overstyre](../felles-funksjonalitet/#overstyr-rettigheter) hvis den utgaven du utvikler har andre rettighetskrav enn de som allerede er satt på tjenestenivå.
Hver utgave vil arve disse rettighetene når den migreres til SBL, og få med seg overstyringene i tillegg.

## Innhold - innsynstjeneste

Innholdet i en innsynstjeneste vil på samme måte som for innsendingstjenester være alt som har med skjema, datainnholdet og selve
interaksjonen med sluttbruker i SBL å gjøre. Uthenting av data fra tjenesteeiers systemer håndteres gjennom en såkalt mapper, som er en
komponent for fleksibel integrasjon mellom Altinn og andre systemer.

Når et skjema er ferdigutviklet i InfoPath, defineres tilleggsegenskaper i TUL for å gi tjenesten ønskede egenskaper. Du må definere
sideegenskaper, og du kan registrere innholdsreferanser.

### Skjema 

Tjenesteinnholdet defineres gjennom utvikling av skjema i InfoPath. Under området for Innholdsspesifikasjon på utgavens arbeidsflate kan du
legge til et InfoPath-skjema og åpne og redigere skjemaet i Microsoft Office InfoPath.
Se [InfoPath-skjema i Altinn](../felles-funksjonalitet/#infopath-skjema-i-altinn) for
beskrivelse av prinsipper rundt skjemabibliotek, skjema og visning, samt inn-/utsjekking og publisering av skjema.

InfoPath-skjema må lages slik at det er basert på en XSD som hoveddatakilde, og alle data som skal arkiveres og være del av “datamodellen”
til en innsynstjeneste må kopieres over i hoveddatakilden. Data fra sekundære datakilder bør mao som hovedregel kopieres over i
hoveddatakilden. Dette er helt analogt med innsendingstjenester, der for eksempel data fra oppslag mot registre ikke lagres i skjema hvis
dataene ikke bindes opp mot hoveddatakilden.

Det er skjemaet som definerer utgavens ”brukergrensesnitt” og grafiske layout. Hvordan InfoPath-skjemaet ser ut og hvilken funksjonalitet
det har, bestemmes av tjenesteeier. Det er laget tre eksempelskjema som er tenkt benyttet som utgangspunkt for utforming av
brukergrensesnitt­et, basert på tre ulike interaksjonsmønstre.

Følgende vedlegg er relevante:

  - [Vedlegg A: Skjemautvikling i InfoPath](../../vedlegg/a/) inneholder en innføring i skjemautvikling i InfoPath for bruk rettet mot TUL.
  - [Vedlegg B: Utforming av brukergrensesnitt for skjema](../../vedlegg/b/) beskriver utvikling av brukergrensesnitt i InfoPath i forhold til
    presentasjon i SBL.
  - [Vedlegg C: Utforming av brukervennlige tjenester](../../vedlegg/c/) gir veiledning i utforming av brukervennlige og tilgjengelige tjenester.
    Her forklares også de tre eksempelskjemaene som kan benyttes som utgangspunkt.
  - [Vedlegg G: Web Service-oppslag fra InfoPath](../../vedlegg/g/) beskriver hvordan data kan hentes til InfoPath ved bruk av sekundære datakilder.

Når du skal utvikle denne typen tjenester, anbefales det at du benytter følgende fremgangsmåte:

  1. Vurder innhold og eventuell funksjonalitet i innsynstjenesten du skal lage, og finn ut hvilket eksempel som best dekker behovene.
  2. Ta en kopi av eksempeldokumentet og last opp i skjemabiblioteket på utgavearbeidsflaten.
  3. Legg inn datakilde og kall av webservices (se [Vedlegg G](../../vedlegg/g/)).
  4. Ferdigstill layout og eventuell funksjonalitet for navigasjon og datapresentasjon.

### Altinn webservice-mapper

InfoPath-skjemaet må designes slik at det kan hente data fra en Web Service hos en etat og presentere dette i Altinn. Kall til alle eksterne
web services fra InfoPath i Altinn skal gå gjennom en proxy, eller såkalt [mapper](../../vedlegg/mappere/).
Dette er en intern web service som kaller en ekstern web service, og som returnerer resultatet fra denne.
Hovedgrunnen til at en slik proxy må benyttes er at adressen som legges inn i InfoPath skal
være lik, uavhengig av hvor selve web servicen som returnerer data befinner seg. En mapper kan inneholde en eller flere operasjoner.

Denne proxy-tjenesten vil være ansvarlig for:

  - Kalle etatens web service(s) og returnere feltene på ønsket format for bruk i InfoPath og fasade.
  - Hvis ønsket: Hente ut nødvendig ekstra informasjon fra Altinn (eksempelvis ER-roller for en reportee)
  - Hvis ønsket: Sende bekreftelse til tjenesteeier for benyttet tjeneste hvis etatens web service returnerer uten feil
  - Sørge for at eventuelle feilsituasjoner logges og håndteres forsvarlig.

For utarbeidelse av Web Service mappere av innsynstjenester så er dette kode som tjenesteeier utvikler i Visual Studio, og som deretter
kvalitetsikres av både applikasjonsleverandør og driftsleverandør før driftsleverandør produksjonssetter dette.

Hver tjenesteeier vil ha sitt eget mapper-prosjekt.

Figuren under viser i orange (med tall) de områdene som tjenesteeier kan utvikle selv, og hvordan de henger sammen.

![Mapper-arkitektur](/docs/images/guides/tul/mapper-arkitektur.png?width=700 "Mapper-arkitektur")


1.  **Innsynstjenestens InfoPath-skjema** i TUL inneholder, i tillegg til den XSD-baserte hoveddatakilden, en sekundær datakilde (web
    service oppslag) som peker på mapperen som kjører i SBL. Dette betyr skjema kan enhetstestes mot mapperen før det migreres over i SBL.
    Et skjema kan gjøre oppslag mot flere mapper-operasjoner (inneholde flere sekundære datakilder), og rent teknisk gjøre oppslag mot flere
    mappere. Se *Vedlegg G: Web Service-oppslag fra InfoPath-skjema* for hvordan mapper (sekundær datakilde) legges inn med riktig adresse i
    InfoPath-skjema. De data som skal kunne arkiveres må kopieres over i hoveddatakilden.
2.  **Mapperen** kan benyttes både fra InfoPath i TUL, form server i SBL og fra eksterne mapper fasader som kan tilgjengeliggjøre én eller
    flere operasjoner i en mapper eksternt mot sluttbrukersystemer. I tillegg så kan også en mapper benyttes av en betingelse (condition).
    En mapper skal kodes i C\# i Visual Studio, og kan benytte interne tjenester i Altinn. Det er mao ikke en absolutt nødvendighet at
    mappere gjør eksterne kall videre. Interne tjenester er definert i tjenestekatalogen.
3.  **Web services som kjøres hos tjenesteeier** er 100% tjenesteeiers ansvar. Før en slik tas i bruk fra Altinn bør krav til SLA, estimert
    belastning, svartid, etc nøye vurderes. Det må også bestilles brannmuråpning av Driftsleverandør.
4.  **Fasade**. Hvis ønskelig så kan tjenesteeier eksponere operasjoner i mapper ekstern mot sluttbrukersystemer. Da må et ekstra fasadelag
    utvikles i Visual Studio som igjen benytter mapperen for å hente data og interne tjenester for for eksempel arkivering og signering.
    Fasade behøves ikke å utvikles hvis ekstern tilgang ikke skal tilbys. Siden ekstern tjenestekode og utgavekode vil være naturlige
    inn-parametre i en fasadeoperasjon så er det fornuftig å også inkludere disse som inn-parametre for mapperen.  
    For detaljer og retningslinjer rundt design og utvikling av Altinn mappere, se:
 - [Guide for mapperutvikling](../../vedlegg/mappere/)
 - [Vedlegg F: Bruk av Visual Studio](../../vedlegg/f/)
 - [Vedlegg G: Web Service-oppslag fra InfoPath](../../vedlegg/g/)  

### Komplekst datainnhold

Det er viktig å forstå at innsynstjenesten i Altinn, og mapperen som den benytter, er to forskjellige ting. Det er innsynstjenesten som
“eier” dataformatet (xsd) og som har ekstern tjenestekode og utgavekode. En innsynstjeneste kan benytte én eller flere mapper-operasjoner
og også flere mappere. En mapper kan benyttes som datakilde av flere innsynstjenester.

Dette blir spesielt viktig å ha i minne hvis det er ønskelig å eksponere en innsynstjeneste eksternt mot sluttbrukersystem (SBS). Som du ser
på figuren i forrige kapittel så er det *teknisk sett* mapperen som eksponeres via fasade, og ikke innsynstjenesten.

Det innebærer at eksternt eksponerte mapper-operasjoner må returnere “komplette” data som oppfyller kravene som XSD-formatet til
innsynstjenesten stiller, slik at InfoPath (innsynstjenesten) kan vise dataene etter at de er arkivert.

Det vil si at Innsynstjenester som eksempelvis benytter flere mapper-operasjoner, eller en webservice sin output som input til en annen web
service (to-stegs drilldown) ikke kan benyttes for sluttbrukersystemer uten at det tilgjengeliggjøres for eksempel en ”stor”
mapper-operasjon som kan tilgjengeliggjøre et “komplett” datasett.

Hvis innsynstjenesten omfatter mer data enn det som kan hentes og/eller presenteres i én porsjon, må du legge omtanke i hvordan dataene
struktureres, både mht. hvordan webservices kalles, og hvordan dataene lagres i skjema. Dette har betydning for funksjonalitet for utskrift
og arkivering, og for bruken fra sluttbrukersystem.

Hvis arkivering og signering skal eksponeres eksternt, så må dette kodes inn i fasaden med bruk av operasjonen *SignAndArchiveLookupService*
i den interne tjenesten Lookup.

Utviklingstiden, og kompleksitet både i mapper og InfoPath vil derfor kunne reduseres kraftig hvis etatens web service returnerer data på
XSD-formatet som benyttes i innsynstjenesten. Da vil data for alle felter kunne kopieres inn med noen få kodelinjer i InfoPath, og ekstern
fasade vil kunne returnere data uforandret.

### Innsynstjenester med støtte for direkte kall 

Du kan lage en mapper som kan fungere uten hjelp av InfoPath. Dette er funksjonalitet du normalt kan se bort fra. For å lage en slik mapper
må du implementere et spesielt grensesnitt kalt ILookUpMapper fra Altinn.SBL.ServiceEngine.LookUpMapper.PnC.dll biblioteket. I praksis betyr
det at mapper­applikasjonen har en operasjon med navn «ExecuteLookUp». I SBL er det implementert en generisk klient som kan benyttes i
direkte kall som da går utenom InfoPath. En mapper kan implementere dette alene eller i tillegg til andre operasjoner som brukes fra et
InfoPath-skjema.

#### Spesielle felter for mapper med direkte kall

Disse feltene skal bare fylles ut dersom du bruker en mapper som har støtte for direkte kall.

##### Mappernavn

Dette feltet skal inneholde en del av URI-en for mapperens endepunkt. Alle mappere har nesten nøyaktig samme URL for endepunktsadresse:
http://mapperservices.altinn.no:87/ServiceEngine/Mappers/{0}/Mapper.svc

Mappernavn skal fylles ut med den delen som her er representert med "{0}". Hvis URL-en for eksempel er
http://mapperservices.altinn.no:87/ServiceEngine/Mappers/BRG/OA/Mapper.svc så skal mappernavn inneholde "BRG/OA".

Det er viktig å merke seg at dette feltet bare skal fylles ut om mapperen har implementert ILookUpMapper. Hvis feltet er fylt ut vil SBL tro
at mapperen støtter direkte kall, og dermed fremstille tjenesten slik i ServiceMetaData-informasjon.

##### Responsskjema

Dette feltet skal inneholde en teknisk beskrivelse av innsynstjenestens svar. Det kan for eksempel være en XSD- eller et JSON-skjema som
beskriver datatypen som blir returnert av innsynstjenesten (mapperen). Innholdet i feltet vil ikke bli brukt av Altinn (SBL), men kan gi
verdifull informasjon til de som implementerer et sluttbrukersystem. Feltet er valgfritt selv for tjenester med støtte for direkte kall fra
SBL.

##### Requestskjema

Dette har samme funksjon som responsskjema-feltet, men beskriver isteden datatypen til forespørselen. Dette feltet er mindre aktuelt siden
det i dagens løsning ikke er laget støtte for å ha komplekse typer som input til en innsynstjeneste. Det er isteden laget støtte for noe som
er blitt kalt QueryData. Her anbefales det at mapper implementeres til å kunne tolke OData
(http://msdn.microsoft.com/en-us/library/hh169248(v=nav.70).aspx). OData-parameter vil sendes inn til mapper gjennom queryData-parameteren
til ExecuteLookUp. OData vil normalt sett være knyttet til tjenestens svar (responsskjema), men i dette feltet kan man altså definere en
annen type om ønskelig. Feltet er valgfritt selv for tjenester med støtte for direkte kall fra SBL.

### Sideegenskaper

Du må definere [sideegenskaper](../felles-funksjonalitet/#sideegenskaper) for at det skal være mulig i SBL å vite for eksempel hvilke InfoPath-visninger som skal vises for presentasjon
og navigasjon, og hvilke som skal brukes for utskrift og eventuelt for signering.

Det er ikke nødvendig å lage egen visning for signering, hvis den kan inneholde det samme som utskriften. Når brukeren velger å arkivere i
SBL, benyttes signeringsvisning hvis den finnes, hvis ikke brukes utskriftsvisning, hvis ikke brukes webvisningen direkte.

### Innholdsreferanser

[Presentasjonsfelt](../felles-funksjonalitet/#presentasjonsfelt) hjelper sluttbruker å finne skjemaet i SBL.
