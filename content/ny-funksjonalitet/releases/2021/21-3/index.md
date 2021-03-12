---
title: 21.3
description: Forbedringer og feilrettinger
weight: 180
type: releasenote
releasenote_info: Release 21.3, produksjonssettes 22. mars 2021
---

**Dette er en kommende endring. Gjeldende endring ligger [her](../21-2).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Man kan nå velge om samtykkeforespørsler skal vises i portalen

Det er innført en endring der samtykke forespørsler som opprettes med PortalViewMode.Show vises på profil siden under ubehandlede samtykke forespørsler. PortalViewMode.Hide er default og gjør at forespørselen ikke vises.

### Eksportere søkeresultat under søk på flere aktører til en CSV-fil

I gammel meldingsboksvisning (legacy portal) kan man eksportere resultatet av et søk på tvers av flere aktører til fil. Dette er nå også mulig i ny meldingsboks (mvc).

### Ytelsesforbedringer for søk etter tjeneste i “Be om tilgang”-visningen

I miljøer med mange tjenester ble det observert en treghet i søkefunksjonaliteten i “Be om tilgang”. Dette medførte at siden sluttet å svare i noen sekunder før søkeresultatet ble listet ut. For å unngå denne tregheten er følgende endringer gjort på søkefunksjonaliteten:

- Det er lagt til krav om at søket ikke utføres før man har skrevet inn minimum 3 tegn i søkefeltet
- Kall til to eksterne kalkulerings-metoder er cachet lokalt i javascript slik at disse kjøres før operasjonene på hvert element i resultatlisten.
- Tegningen av viewet ved lasting av modalen er også korrigert for å sikre at den er oppdatert i det den vises.

### Arkivereferanse søk

Arkivreferanse-søk er nå flyttet fra gammel meldingsboks (legacy portal) til ny meldingsboks (mvc).

### Ny beskrivelse for meldingsbokselementer i stegene "Feedback" og "Confirmation"

Denne endringen gjelder kun instanser av Altinn Apps og berører de applikasjonene som benytter stegtypene Feedback og Confirmation. Det er nå innført mer beskrivende tekster for apper i disse stegene, som vil vises til sluttbruekr i meldingsboksen.

### Scroll forsvinner når man klikker på den

Hvis man i forbindelse med rolledelegering går inn på “Alternativ tildeling: Velg å gi rollene som tjenesten krever” så kan man trykke på en hjelpeknapp for å få opp alle tjenestene en gitt rolle gir tilgang til. Når det er mye innhold på denne popupen så vises en scrollbar. Det var en feil i koden som gjorde at når man klikket på scrollbaren så lukket hele popupen seg. Dette er rettet slik at man nå kan bruke scrollbaren.

### Implementere nytt panel med liste over de aktører som har gitt virksomheten rettigheter

Siden det introduseres støtte for å kunne opprette forespørsler på vegne av en avgiver, trenger man et sted å kunne se mulige aktører.

Det introduseres derfor et nytt panel i Profil-siden “Rettigheter virksomheten har hos andre”. Denne vises sammen med de andre som har delegert noe til avgiveren, altså som en slags avgiverliste for valgt aktør.

Når man klikker på en av disse skal det vises hvilke rettigheter valgt aktør har fått, og man kan her be om flere rettigheter.

### Ny aktivitetslogg for innkommende delegeringer til virksomheten

Sammen med nytt panel med liste over de aktører som har gitt virksomheten rettigheter er det behov for en egen aktivitetslogg som viser delegeringer av roller og enkelttjenesterettigheter som blir gitt til virksomheten fra andre.
Denne er implementert på samme lest som den eksisterende aktivitetsloggen som finnes under “Andre med rettigheter for virksomheten”, som viser delegeringer gjort fra virksomheten til andre. Den nye aktivitetsloggen er å finne i topp menyen av det nye panelet, som i utgangspunktet bare er tilgjengelig for tilgangsstyrere for virksomheten som historisk har mottatt minst en rolle eller rettighet fra noen.

### Endre tekst i e-post varsel for tilgangsforespørsler

Teksten i e-posten som sendes til tilgangsstyrer når man ber om tilgang er nå oppdatert så den refererer til det nye panelet “Virksomheten sine forespørsler” i Profil.

### Ekstra tekst i Panelet for mine/virksomheten sine forespørsler

Det er lagt til en tekst i visningen av sente “be om tilgang” forespørsler både ubehandlede og behandlede, for å presisere at rettighetene som vises på forespørselen er det som orginalt ble bedt om men ikke nødvendigvis de rettighetene som faktisk blir/ble gitt av tilgangsstyrer.

## Endringer i Legacy

### Bruke favoritter / alfabetisk visning i legacy aktørvalg

Visning av favoritter har frem til nå bare vært altuelt i aktørvalget MVC-delen av altinn.no. Denne endringen viderefører favoritter-konseptet fra det store aktørvalget i MVC og muliggjør fjerning av MostUsedReportee fra Legacy-løsningen til Altinn. Nedtrekkslisten over tilgjengelige avgivere i Legacy er endret til å vise favoritter øverst, og resterende i alfabetisk rekkefølge under en skillestrek: -

Det er også gjort en maskering av fødselsnummer til privatpersoner som den innloggede brukeren kan representere i aktørvalgene i Legacy.

Lagt på logikk for alltid la valgt avgiver være med i nedtrekkslisten man kan velge dersom den er av riktig type i henhold til avgiverkravet. Dette sikrer at man kan velge avgivere under vis flere og man kommer tilbake til nedtrekkslisten med riktig valgt enhet samt at man får den forhåndsvalgte avgiveren ferdig satt på nedtrekkslisten selv om den ikke er en av favorittene eller blant de som alfabetisk kommer med på listen.

Sikret at første element i nedtrekkslisten er en placeholder slik at dersom valgt avgiver ikke tilfredstiller avgiver kravet får man ikke tilfeldigvis den første i listen når man er rask til å trykke neste. Neste knappen er ikke aktiv når man står med en placeholder som valgt element.

### Fjerne økt timeout tid for ValidateForm

Som en midlertidig løsning ble timeout tiden til ValidateForm utvidet til 1 minutt for å fjerne at A01 feilet etter en oppdatering. A01 skulle da oppdateres til å bli mer effektivt slik at denne midlertidige fiksen kunne rulles tilbake. Tilbakerulling av utvidet timeout tid er nå utført.

## Endringer i SBL

### Varslinger til underenheter vil nå gå til hovedenhetens varslingsadresse hvis underenheten ikke har adresse registrert

Tidligere har ikke varsler blitt sendt hvis en underenhet ikke har registrert varslingsadresse. Med denne oppdateringen vil varsler bli sendt til hovedenhetens registrerte varslingsadresse, hvis underenheten mangler adresse.

### Ny OED batch for grensesnitt mot Domstolene

Ny OED batch for grensesnitt mot Domstolene er lagt ut. Denne batchen skal ikke i benyttes før i 2023.

## Endringer i Autorisasjon

### Tilganger gitt på enkelt meldinger (correspondence) i meldingsboksen gjennom “Del og gi tilgang” blir nå videreført til arkiv ved arkivering

Dersom man benytter “Del og gi tilgang” funksjonen på aktive enkelt meldinger (correspondence) i meldingsboksen vil disse element tilgangene nå bli videreført til arkiv når meldingen arkiveres. Når det gis tilgang før arkivering er det Les og Skriv tilgang til elementet som blir gitt. Ved arkivering blir disse rettighetene overført til det arkiverte elementet med LesArkiv og SlettArkiv tilganger.
Eksempel er videredelegering av melding i meldingsboks

## Endringer i REST

### Implementere flagg for å kontrollere visning av consentrequests fra portal-visning

Det er innført et valgfritt flagg for å bestemme om en Samtykke forespørsel skal vises i portalen under ubehandlede forespørsler når man oppretter en slik forespørsel med REST standardverdien er Hide slik at disse skjules.

### Lagt til Atlinn3 tokens som autentiseringsmekanisme

Det har i tidligere releaser blitt implementert støtte for ID-porten- og Maskinporten-token som autentiseringsmekanisme på REST-API i Altinn. Endringen i denne releasen er en videreføring av token-autentisering på REST-API hvor vi nå også støtter Altinn-3 tokens.

### Rettet feil med nøsting av innehavere i REST reportees med tjeneste/app/rolle-filtrering

Vi har gjort endringer i REST-endepunktet slik at samme logikk som brukes av portalen også benyttes av REST reportees-endepunktet. Dette medfører at man ikke lenger opplever denne feilen med nøstingen.

### Lagt til ServiceEditionName i api/metadata

Utvidet api/metadata til å returnere ServiceEditionName i tillegg til eksisterende felter.

## Endringer i TUL

### Feil i oversettingsmodulen i TUL når tekst har betinget formatering som medfører sjekk mot function-available(‘xdXDocument:GetDOM’)

Hvis man i et InfoPath skjema hadde en betinget formatering av en ExpressionBox som medførte at xsl:value-of elementet som inneholdt teksten fikk et ekstra “nivå” så ville ikke teksten bli oversatt i InfoPath skjema selv om den lå i oversettingsmodulen. Dette er nå rettet slik at teksten blir oversatt uansett hvilket “nivå” xsl:value-of elementet ligger på innenfor ExpressionBox elementet.

## Diverse bugfix

### Artikkelrapport - utvalg matcher mot feil dato
 
Artikkelrapporten benytter nå korrekt dato-felt for når artikkelen var sist oppdatert

### 404 for infoportal gir generisk tilbakemelding i stedet for korrekt 404-side

Dette er nå rettet.

### Manglende validering av metadataparametre i oversatte tjenestebeskrivelser i ConsentRequest

Tidligere har bare metadataparametere for tjenestens hovedpråk blitt validert. Dette ledet til feilmelding for sluttbrukeren hvis metadata for sluttbrukeren språk mangler.
Denne endringen validerer at alle samtykkesforespørseler har alle nødvendige metadataparametere, også på oversatte tjenestebeskrivelser.

### Metadata for samtykke ble ikke lagret basert på det språk samtykket ble gitt

Lagring av Consent-metadata lagrer feil språk (ConsentRequest). Denne endringen gjør at vi alltid lagrer metadata knyttet til det språk samtykke er gitt.

### Skjule visning av gul melding på elementer som er videresendt uten melding

Det er valgfritt å oppgi en melding ved bruk av videresending på epost eller “Del og gi tilgang” på elementer i meldingsboks og arkiv. Selv om man ikke oppgir en melding ble det før vist en gul melding med “Fra” og “Til” spesifisert men med tom melding. Dette er nå endret slik at det ikke lenger blir vist på selve elementet når det ikke er spesifisert en melding. Det blir fortsatt logget og vises innslag i Aktivitetsloggen på elementet om at elementet er delt.

### Fragment i RedirectURL i “Be om tilgang” ble ikke hensyntatt

Siden lanseringen av “Be om tilgang” opprettet av en Tjenesteeier har det eksistert en feil som gjorde at RedirectUrl-er som inneholdt #fragments i URL-en ikke ble populert korrekt. Dette medførte at en RedirectURL som var definert på følgende måte: https://example.com/?query#fragment ble beriket til https://example.com/?query#fragment&DelegationRequestId=…&Status=OK. Dette er nå korrigert til at eventuelle #fragments kommer til slutt i URL-en slik at brukeren nå blir redirectet til https://example.com/?query&DelegationRequestId=…&Status=OK#fragment.

### Manglende støtte for Altinn Apps instanser på resultatsiden for søk på tvers av aktører

Det er nå lagt inn støtte for å kunne vise fram Altinn Apps instanser på resultatsiden til søk på tvers av aktører. Merk at det ikke vil hentes ut Altinn Apps instanser dersom man søker på flere aktører samtidig. Denne funksjonaliteten er planlagt i første halvdel av 2021.

### API respons returnerer ikke REGN/REVI’s tilgang til innehavers fnr

REST-API-et hadde en bug som gjorde at CoveredByUserId ikke ble satt på subject i søket. Koden er endret til å hente ut CoveredByUserId og sette det på søkeobjektet.

### DAGL/Nøkkelrolle for revisor eller regnskapsfører organisasjon sin tilgang til innehaver av enkeltpersonsforetak vises ikke i portal eller REST

I sammenheng med utbedring av endringen over ble det også identifisert en manglende uthenting av REVI/REGN m/barneroller for DAGL eller andre nøkkelrollehavere, når det gjøres oppslag av disse sine rettigheter for innehaver av et enkeltpersonsforetak.
Feilen ble sporet til en utdatert stored procedure i databasen som nå er skrevet om for å forsikre at man får ut korrekte roller, og at det bare er rolletilgang gjennom å ha REVI/REGN forhold (direkte eller gjennom nøkkelrolle) eller mottatt Klientdelegering (barneroller av REVI/REGN) for innehavers enkeltpersonsforetak.

### Brukere som har reservert seg i KRR fikk ikke opprettet BoT forespørsel

Det ble meldt inn sak fra en sluttbruker som fikk feilmelding ved forsøk på å sende en “be om tilgang” forespørsel i Altinn. Ved nærmere analyse ble det identifisert at brukeren hadde registrert seg med kontaktinformasjon i kontakt- og reservasjonsregisteret (KRR) men der også reservert seg mot elektronisk kommunikasjon.
Dette ble ikke godt nok behandlet av løsningen og endte med en tekniskfeilmelding. Dette er nå utbedret slik at brukere som er reservert i KRR selv må oppgi e-postadresse ved opprettelse av forespørselen, for bruk av varsel om behandling av den ene spesifikke forespørselen.

### Manglende info i vannmerke på PDFer hentet fra print ressurs

Kall mot “/api/{org_no}/messages/{message_id}/print” returnerte dato/timestamp i vannmerket på høyresiden av PDF-fil i tillegg til AR-referansen. Kall mot “/api/{org_no}/messages/{message_id}/forms/{form_id}/print” returnerte kun AR-referansen. Dette er nå endret slik at dato/timestamp returneres ved begge disse kallene.

### Unngå null exception i GetCorrespondenceListForReporteeBasic

Hvis man kaller GetCorrespondenceListForReporteeBasic med et fnr/orgnr som ikke finnes, får man en null exception. Dette er nå rettet, og man får bare tilbake en tom liste. Dermed kan man heller ikke lenger bruke denne metoden til å verifisere om personer/organisasjoner finnes i Altinn. Det er spesielt ett SBS som daglig gjør tusenvis av kall med ikke-eksisterende nøkler. Hvorvidt dette er misbruk eller mangel på kontroll vites ikke, men det har uansett fyllt opp eventloggene unødvendig.

### Feil posisjonering av modal boks for valliderings feil med svært mange feil.

Når det beregnes hvor y indexen til den modale boksen for valideringsfeil skulle plaseres så blir den ikke beregnet riktig ved første opptegning men skript som kjøres ved endring av vindus-størrelse beregner riktig. Det kalles nå til dette scriptet ved første opptegning også.

### Fjerne referanser til Modernizr

Java biblioteket Modernizr er fjernet fra hjelpesidene til Rest-API.

### Feil i "sett til ulest" dersom siden har en tilbakeknapp.

Siste oppdatering av JQuery versjon endret kallet som benyttes for å emulere klikk på tilbake lenken til et kall som ikke faktisk klikker på lenken, men trigger registrerte klikk events men tilbake knappen har ingen slike events så ingenting skjedde. Samtidig ble det oppdaget at det var to sider som har tilbake knapp til innboksen.

 - Utskrifts visning denne viser bare et element og har ingen kolaps mulighet så her er det å klikke tilbake eneste alternativ etter at meldingen er satt til ulest. 

 - Søk i innboksen her er det en eller flere elementer med kolaps mulighet så her gir det mer mening å klappe sammen meldingen som er sattt til ulest enn å ta brukeren tilbake til innboksen der han må utføre søket på nytt.

Dermed er det endret at dersom det finnes muliget for å kolapse elementet så prioriteres den over tilbake knappen. Dersom tilbake knappen benyttes må benyttes så skjer dette ikke med klikk eventet men man setter nåværende vindu til det som linken peker på som da medfører at siden tegnes opp med innholdet til tilbake lenken.

### Feil tekst for Altinn Apps instanser til utfylling på engelsk

Teksten for å identifisere instanser som er til utfylling har blitt endret fra “Completion” til “For completion”.

### Data fra Kontakt- og reservasjonsregisteret er ikke eksponert for Altinn 3.
 
Mangler i datamapping mellom Altinn II sin brukerprofil og datamodellen som sendes til Altinn 3 gjorde at epostadresse og telefonnummer fra kontakt- og reservasjonsregisteret ikke ble med i overføringen.
Dette er nå rettet.

### Be om tilgang forespørsler for utgått tjeneste feilet både for avsender og mottaker av forespørselen

Det ble meldt inn fra sluttbrukere som ikke fikk åpnet hverken “Skjema og tjenester” panelet eller “Mine forespørsler”/“Virksomheten sine forespørsler” panelet i profilsiden. Dette viste seg å være fordi det eksisterte aktive/ventende forespørsler hvor en eller flere av tjenestene det ble spurt om tilgang til var utgått i etterkant av at forespørslene var blitt sendt.

Dette er nå utbedret ved at utgåtte tjenester knytt til “Be om tilgang” forespørsler nå vises som utstreket og med dato for når de gikk ut. Dette gjelder da både i alle visninger av både aktive og behandlede forespørsler, samt ved behandling av forespørselen av tilgangsstyrer.



### Dårlig kjøreplan for Receipt_GetReceipt_SELECT

Det er nå lagt på query hint på denne prosedyren for å forhindre dårlig kjøreplan.