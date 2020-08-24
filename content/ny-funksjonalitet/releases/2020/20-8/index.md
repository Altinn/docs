---
title: 20.8
description: Forberedelse til FREG, mindre endringer og feilrettinger
weight: 60
type: releasenote
releasenote_info: Versjon 20.8, produksjonssatt 24. august 2020
--- 

## Endringer i portal

### Tilgangsstyrer kan tilpasse operasjoner før en tilgangsforespørsel blir godkjent

Endringen er en videreutvikling av funksjonaliteten på "Be om tilgang" som ble lansert i [forrige versjon](../20-7). I denne versjonen vil det nå bli mulig for  tilgangsstyrer å endre på operasjoner i en tilgangsforespørsel. Ved å skru av og på operasjoner vil tilgangsstyrer nå kunne endre på en forespørsel som kommer inn dersom dette er hensiktsmessig. Dersom tilgangsstyrer velger å endre på forespørselen, vil det komme en gul advarsel om at noen av operasjonene på forespørselen er endret. Selve forespørselen som ligger i databasen vil ikke bli endret, men selve delegeringen vil bli en annen.

### Buypass-bibliotek oppgradert

Bibliotek som anvendes i forbindelse med signering på nivå 4 ved bruk av Buypass er oppgradert til nyere versjon.

### Endring av tekst som sendes ut til valg tilgangsstyrer i “Be om tilgang”

Teksten som sendes per e-post til tilgangsstyrer ved en nyopprettet tilgangssforespørsel er nå utbedret. Den nye teksten presiserer hvor den nye forespørselen kan behandles fra.

### Navneendring på tjenesteeier

Navn for tjenesteeier "Statens havarikommisjon for transport" er endret til "Statens havarikommisjon"

## Endringer i REST-API

### Autoriserings-filter som åpner opp for å begrense tilganger for bedrifter via Maskinporten er nå lagt til

Man kan få visse scopes fra bedriften man representerer for å få tilgang til ulike endepunkter eller man kan få et generelt scope som gir tilgang til alle endepunktene i tjenesteeier-delen av apiet. Hvis man isteden for å bruke token autentiserer seg med virksomhetsertifikat blir det også lagt til et scope.

## Endringer i Integrasjon

### Forberedelse til oppdatert integrasjon med Folkeregisteret (FREG)

I dag er kilden for Altinns personregister datafiler overlevert fra Det Sentrale Folkeregister (DSF). Dette vil fases ut til fordel for en direkte integrasjon med FREGs hendelsesliste og personopplysninger. I denne endringen vil vi legge til rette for de nye datamodellene som FREG tilbyr og implementere systemet som kan motta hendelser og personopplysninger. Merk at det det er først i etterkant av endringen vi etterhvert vil koble oss på FREG og motta løpende oppdateringer. Det betyr at vi fortsetter å ha DSF som kilde frem til vi slår på integrasjonen.

Til informasjon henter Altinn alltid siste person dokument for hver endring og lagrer alle data i denne oppdateringen over eventuelle tidlige data.

- Datamodellen for å lagre familie relasjoner er utvidet med en mange til mange knytting mellom REG_User og Freg.FamilyRelatonship som kan knytte to personer sammen med en familerelasjon. Det er også utvidet med mulighet for å lagre mange linjer i fritekst for postadresse. Hvilket forhold de har til hverandre er bestemt av en kodetabell Freg.FamilyRelationshipType.

- Det er laget en egen RegisterFregSI med tilhørende DAL og entiteter for å lagre data fra FREG på den eksisterende register strukturen med noen små endringer.

- Det er laget en egen mapper som konverterer fra Json Modellen FReg har til en modell som ligger nær registermodellen slik at dette kan smeltes sammen rett inn i databasen. Her blir alle felter som ikke allerede eksisterer i Altinn lagt inn bortsett fra familie relasjoner og vergemål.

- Siden Freg benytter både to bokstavs og tre bokstavs landkoder i henholdsvis Statsborgerskap og Postadresse utland så måtte Altinn legge inn tre bokstavs landkoder i tabellen for land for å kunne knytte Statsborgerskap riktig. Det er også lagt på en tjeneste for å hente alle landkoder slik at disse kan benyttes i konverteringen.

- Webtjenester for å hente ut personer både interne og eksterne er oppdatert til å hente ut flere linjer med adresse for Postadresse (fritekst). GetFamily og GetCompleteFamily er også oppdatert til å forholde seg til familierelasjons strukturen fra FReg.

- Ny jobb (batch) for å hente FReg Eventer og PersonDokumenter lagre data i Altinn ved hjelp av tjenestene beskrevet over og logge feilsituasjoner, fremdrift og status.

- Enkelte felter har mer data i Freg en tilsvarende felter i Altinn Derfor har følgende felter fått utvidet kapasitet:

- Gatenavn utvidet fra 22 tegn til 840
- Postadresse linje 1-3 fra 50 tegn til 1024. Adresselinje 4..n deler på 1 000 000 tegn
- Fornavn, Mellomnavn, Etternavn fra 50 tegn til 1024
- Stedsnavn for matrikkeladresser utvides fra 25 tegn til 1024.

Ingen eksterne grensesnitt er endret for å forholde seg til at det nå kan være flere adresse-linjer i postadressene. Dette er løst med å slå sammen linje 2 og 3 til en linje for de eksterne grensesnittene med norske adresser. 
Det er lagt på tre nye varslingsmaler for å hente mer adresseinformasjon:

1. Adresseline4
2. Hele adressen som komma separert liste.
3. Hele adressen med html linjeskift.

Steder som tidligere måtte settes sammen med mellomrom eller komma er utvidet med flere linjer.

## Feilrettinger

### Varslingslisten i "Be om tilgang"

Det ble oppdaget en bug på nedtrekkslisten for valg av tilgangsstyrer som varsel om ny tilgangsforespørsel skulle sendes til. Dersom en bruker hadde to topproller i Enhetsregisteret hvor begge hadde tilgangsstyring som barnerolle, ble denne personen listet ut to ganger i listen. Dette er nå rettet. Hver person vil nå bli listet en gang.

### Vedlegg med escapet XML i filnavn feiler ved konvertering til Flatfil-format

I noen tilfeller oppsto det feil ved konvertering. Tekst har blitt forskjøvet og resultert i feil på flatfilformatet siden dette er posisjonsavhengig.

### Feil oppsto dersom det ikke fantes noen tilgangsstyrere for hovedenheten

Det ble var en feil på "Be om tilgang" som førte til at brukeren ble møtt med misvisende feilmelding. Feilen oppsto da man forsøkte å hente ut tilgangsstyrere for en hovedenhet som ikke hadde noen tilgangsstyrere. 

### FormtaskProcessor bruker opp alt minne i på integrasjonsserver ved veldig store skjemasett

FormtaskProcessor er nå endret til å rydde bort skjema-data den ikke bruker under behandling av formsett for å holde minnebruken nede.
