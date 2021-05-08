---
title: 21.5
description: Autorisasjonsending, mindre endringer og feilrettinger
weight: 160
type: releasenote
releasenote_info: Release 21.5, produksjonssettes 19. mai 2021
---
**Dette er en kommende endring. Gjeldende endring ligger [her](../21-4).**

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Visning av innbygger sine aktive autorisasjoner i ID-portens OIDC provider

I forbindelse med en innlogging i ID-porten kan tjenester/klienter be om mulighet til å hente innbyggers data fra APIer tilbudt av en tredje-part (se Brukerstyrt datadeling). For eksempel kan en konsument av Altinn sluttbruker REST API be om å få tilgang til å hente data for brukerens meldingsboks i Altinn.

![Ny visning](autorisasjon1.png " ")
_Dette bildet viser forespørsel fra klient om å få tilgang til brukers meldingsboks og arkiv i Altinn sluttbruker API_

Altinn vil nå gjennom API integrasjon med ID-porten hente ut informasjon om alle autorisasjoner som innlogget bruker har gitt i ID-porten som omfatter minst ett av scopene som er eid av Digitaliseringsdirektoratet. Disse vil bli vist i panelet “Samtykker og fullmakter” i brukerens profilside, sammen med evt. samtykkeforespørsler eller aktive samtykker brukeren har gitt i Altinn.

![Ny visning](autorisasjon2.png " ")
_Dette bildet viser klient som har mottatt ID-Porten autorisasjon i samtykkepanelet på profilsiden_

I visning av autorisasjoner gitt til en spesifikk tjeneste/klient vises informasjon om klienten, hvilke scope/data som er omfattet, samt tidspunkt og hvilken nettleser og enhetstype autorisasjonen ble gitt fra. Her vil brukeren også få mulighet til å trekke både enkelt autorisasjoner eller alle autorisasjonene gitt til denne klienten.

![Ny visning](autorisasjon3.png " ")
_Dette bildet viser ID-Porten autorisasjoner gitt en spesifikk tjeneste/klient_

## Endringer i SBL

### Lese inn postadresse fra foretrukket strukturet adressetype eller fra prioritert liste

I dag leverer Skattetaten gjennom FREG API en ferdig kontaktadresse som en liste med adresselinjer denne vil i fremtiden forsvinne og vi må selv sørge for å eventuelt lage en slik list.
Det gjør vi gjennom å parse en liste ut av de forskjellige adressetypene som en person har og så velge fra denne listen i en prioritert rekkefølge.

1. Valgt foretrukket kontaktadresse:
2. Postadresse
3. Oppholdsadresse
4. Bostedsadresse
5. PostadresseUtlandet

### Bakoverkompatibel støtte for URI #fragments i redirectUrl

Første forsøk på å håndtere URI fragments på korrekt måte i redirectUrl  bug 46129 måtte dessverre tilbakerulles siden det brakk single-page app håndteringen til Eika Gruppens banker. Målet med denne US er derfor å innføre samme støtte som sist, men med et unntak for URLer på formen http://foo.com/#/...

Dette ble lagt inn igjen sammen med håndtering av unntak for fragments som starter med “#/”, og da skal fragment-delen IKKE flyttes til etter query-delen.

### Aktivere AltinnServiceActivator i TT02
I TT02 er ny SharePoint farm etablert. AltinnServiceActivator starter på en av nye de farmserverne. Den er konfigurert til å starte på TT02-PORT03

## Endringer i Autorisasjon

### Utvidet “Finn skjema eller tjeneste”/tjenestemetadata-visninger til å inkludere 3.0-apps

GetAvailableServices støtter fra før 3.0-apps i form av DelegationSchemes, men disse ble tidligere ikke mellom privatpersoner.
Denne US handler om å endre på denne logikken slik at andre 3.0-apptyper foruten delegationSchemes også blir tilgjengelige for alle typer reportees i alle visninger som benytter GetAvailableServices.

### Mangler beskrivelse (tjenesteeier navn) når offeredby prøver å godkjenne forespørsel

Lagt på uthenting av Tjenesteeier id for Altinn 2 tjenester og for Apps basert på eier av tjenesten og legger dette inn i entiteten som bærer en tjeneste/utgave. Når modellen bygges opp brukes dette til å sette tjenesteeier navn med språkstøtte på modellen slik at eier av tjenesten presenteres ved delegering.

### Implementere advarsel på DELETE

Som API-eier ønsker jeg en enkel sikkerhetsmekanisme for å redusere risikoen for at delegeringer slettes. Det legges inn en enkel “er du sikker”-mekanisme på sletting hvis det finnes delegeringer på DS-et, og samtidig kreves det et spesifikt scope for å slette: altinn:maskinporten/delegationschemes.delete

### Oppdatere ServiceCodesWithParallelSigningForServiceProvider og ServicesWithDuplicateSignatureCheck med tjenestekoder for KFI

Konfigurasjonsendring som aktiverer utvidelsene av parallellsigneringsfunksjonaliteten som ble innført for den første korona-tjenesten (KFN) også for den andre korona-tjenesten (KFI).

## Endringer i Infoportal

### Implementert Azure AD basert innlogging til Infoportalen (EPI-server)

Innlogging til redaktørgrensesnittet i Episerver er nå styrt via brukere i Azure AD der OAuth 2.0 sammen med OpenId Connect blir nyttet som protokoller.
Den Azure AD baserte tilgangsstyringen erstatter den eldre løsningen som benyttet asp.net membership.

### Generere PDF av oppsummeringen i e-guide

Som bruker kan man nå velge å laste ned oppsummeringen på slutten av en e-guide på PDF-format. Dette skjer ved å trykke på knappen “Last ned som PDF” på siste side av guiden. Man får da også med alle lenker som er en del av oppsummeringen slik at man kan bruke PDFen som oppslag ved en senere anledning som også vil kunne sende brukeren til aktuelle sider på altinn.no og andre relaterte nettsted

## Diverse bugfix

### Får 500 error ved godkjenning av tilgangsforespørsel som krever høyere sikkerhetsnivå

Sender nå tilgangsstyrer for å logge inn på nytt med høyere sikkerhetsnivå isteden for å gi rød errorside. Etter ny innlogging vil brukeren komme tilbake til siden for å godkjenne forespørselen.

### Mangler mellomrom mellom gul boks og tjenesten

En tidligere bugfix introduserte denne bugen. Flyttet den gule tekstboksen ut av en partial html og rett inn i _DelegationRequestModalPage og _PendingDelegationRequestModalPage. For å få det til å se riktig ut trengte den ene siden margin på toppen av den gule boksen, og den andre siden på bunnen.

### Feil ved åpning av innboks i enkelte tilfeller

Det kan virke som det er noen uheldige ommstendigheter som medfører at brukeren får en feil ved åpning av innboksen har ikke klart å finne årsaken til feilen men det kan virke som om det at vi legger alle avgiverne fra nedtrekkslisten i Sharepoint portalen i cookie trigger denne feilen i tilfeller den ikke skjer når denne listen eller en kortere versjon av listen ligger i cookie.
Har derfor valgt å fjerne det at listen legges i cookie siden dette er funksjonalitet som ikke lenger er nødvendig da infoportalen ikke lenger har en slik liste og trnger å få innholdet fra SBL løsningen. Løsningen benytter aldri disse dataene.

### Fjerning av EC brukere fra listen over brukere med tilgang til elementer i meldingsboksen (“Del og gi tilgang”)
 
EC brukere for både egen virksomhet og for eksterne virksomheter, som har mottatt rolle/rettighet til som dekker element i meldingsboksen, listes i dag ut som brukere med tilgang under “Del og gi tilgang” på elementet i meldingsboksen. Det er ikke støtte for at man faktisk kan utføre element delegering til EC brukere her, og man må manuelt oppgi epost addresse for å kunne sende disse brukerne en melding på elementet.
Det er derfor bestemt at vi fjerner støtte for EC brukere helt fra “Del og gi tilgang” funksjonaltiteten.
Sender nå tilgangsstyrer for å logge inn på nytt med høyere sikkerhetsnivå isteden for å gi rød errorside. Etter ny innlogging vil brukeren komme tilbake til siden for å godkjenne forespørselen.

### Operasjon i kvittering viste feil ikon dersom man hadde tilgang fra før

Dette er nå rettet slik at hvis man har rettigheten fra før er nå ikonet grået ut både på oppsummeringssiden og kvitteringssiden.

### Formidlingstjeneste ryddet ikke vekk filer fra disk i enkelte tilfeller der opplasting feiler

I noen sjeldne tilfeller kunne det skje feil med opprettelse av kvittering under UploadFileStreamed-operasjonen etter at filen var blitt lagret på disk, dette medførte rollback av databaseendringene, men ikke fjerning av fil fra disk.
Dette er endret slik at alle aksjoner i metoden er dekket dersom det oppstår feil som medfører databaserollback, vil dette føre til opprydding av filen fra disk.

### Formidlingstjenesten sin slettejobb oppdaterte ikke alltid korrekt status for alle mottakere

I noen svært sjeldne tilfeller skjedde det feil i relasjonen i databasen som ble benyttet av slettejobben til å hente ut filer til sletting, samt oppdatere status etter sletting.
Dette førte til at enkelte filer blir forsøkt slettet flere ganger, da statusen ikke ble korrekt oppdatert. Dette er nå rettet.

### Formidlingstjeneste CheckIfAvailableFiles returnerte True i noen tilfeller selv når filer ikke er tilgjengelige for nedlastning

Dersom en mottaker tidligere hadde mottatt filer som var blitt slettet på grunn av utløpsdato før de var bekreftet (ConfirmDownload) av mottaker, førte dette til at CheckIfAvailableFiles fremdeles regnet disse som tilgjengelige da den kun vurderte status per mottaker og ikke filen som helhet. GetAvaliableFiles ville korrekt vise at det ikke var filer tilgjengelig, da denne tar hensyn til filstatus. (Denne gjør også mer eksplisitte autorisasjonskall og er mye tyngre) Som konsekvens ville Sluttbrukersystemer som pollet CheckIfAvailableFiles gå videre til GetAvaliableFiles men ikke finne filer å laste ned, noe som skapte unødvendig last.

CheckIfAvailableFiles er nå endret til å også vurdere filens status som helhet, så respons ligger mer på linje med GetAvailableFiles.

### For stort mellomrom mellom enkeltrettigheter liste og roller liste

I noen tilfeller skal det være et ekstra stort mellomrom mellom navnet på person/virksomhet og øverste liste i “se rettigheter” modalen, men dette mellomrommet hadde blitt flyttet da de to øverste listene byttet plass i en annen US. Flyttet dette tilbake til øverste liste.

### XsnUpgrade feiler for skjemaer som bruker EPPlus (aksess til Excel)

Det er gjort en fix som en workaround for en feil i assembleren ilasm. Dette er håndtert ved å manipulere koden som assembleres (og som kommer fra disassembleren ildasm).

### Operasjon i kvittering

En tidligere feilretting introduserte en ny feil der ikoner på en kvitteringsside mistet overstrek. Disse endringene er nå tilbakestilt.

### Admin-grensesnitt Infoportal: Artikkeleksport på engelsk viste norsk innhold

Parameter for språk ble tatt med i søk men ikke ved eksport, dette er nå rettet.

### Admin-grensesnitt Infoportal: Noe innhold kom ikke med ved eksport av skjemasider

Nå tas alt innhold med i alle typer eksport og på alle språk.

### Kalenderen hadde feil format i DEV-ACN-SBL62 image

Dette er rettet og kalender har nå riktig visning.
