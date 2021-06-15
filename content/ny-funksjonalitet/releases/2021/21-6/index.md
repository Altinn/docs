---
title: 21.6
description: Mindre endringer og feilrettinger
weight: 150
type: releasenote
releasenote_info: Release 21.6, produksjonssatt 14. juni 2021
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Bakoverkompatibel støtte for URI #fragments i redirectUrl
Siden lansering av “Be om tilgang” opprettet av en Tjenesteeier har det eksistert en feil som gjorde at RedirectUrl-er som inneholdt #fragments i URL-en ikke ble populert korrekt. Etter en ny revisjon tilbys nå bakoverkompatibilitet med unntakshåndtering av #fragments.  

## Endringer i SBL

### Synkronisering av apps fra Altinn 3.0 inn i SBL
Det er nå etablert funksjonalitet for å hente inn alle apps fra Altinn 3.0 inn i SBL. Det tilbys også funksjonalitet for å lagre, oppdatere og slette apps. 
Rollekravene knyttet til disse apps blir også hentet og lagret inn i AuthorizationRules i SBL. Disse apps vil i første omgang bli vist under /api/metadata og i utlistingen “Hva inneholder rollen?”, men vil ennå ikke være mulig å delegere rettigheter til.

### Oppdatering av biblioteker samt fjernet kode til gammel meldingsboks
Bibliotekene AjaxControlToolkit, HtmlAgilityPack og BotDetect CAPTCHA er oppgradert og underlagt nuget
Respond.js og Ajax Minifier for Portal er fjernet
MyMainPage er fjernet og det er lagt inn redirect til meldingsboksen

###  “Bekreft samtykke” endret visuelt
Er endret fra en rød knapp til en lenke med rød understreking.

## Endringer i REST

### Endring av AppHandler til å håndtere app-type-filtrering i alle metoder for å rette MaskinportenAPI
Ved innføring av apper fra Altinn 3.0 er det oppstått et behov for å håndtere apptype-filtrering i metoder brukt av MaskinportenAPI. Det er nå lagt til filtrering slik at MaskinportenAPIet fortsetter å behandle DelegationSchemes og ser bort ifra AltinnStudio-apper og lignende.

### Utvide metadata-tjeneste på REST med informasjon om rollekrav
Metadata REST API har blitt utvidet med nye endepunkter for å slå opp rollekrav for tjenester i tillegg til delegeringsoppsett fra Maskinporten eller Altinn Apps gjennom service koder eller Altinn App identifikator. Vi gjør oppmerksom på at informasjon om Altinn Apps fra tjenester 3.0 først vil være tilgjengelig når import gjennom batch jobb er på plass.
Det er også gjort en utvidelse av Metadata API og Tjenesteeier API endepunktene for uthenting av rolledefinisjoner i Altinn. Rolledefinisjoner som har en eller flere andre roller som “barn” (altså roller en bruker automatisk får tilgang til gjennom å ha denne rollen) vil ha en liste av alle ChildRoleDefinitionIds som del av modellen. Tilsvarende vil alle rolledefinisjoner som har en eller flere rolledefinisjoner som “foreldre” ha en liste av alle ParentRoleDefinitionIds som del av modellen.

## Endringer i MaskinPorten

### Implementere API på Bridge for innlogging av virksomhetsbrukere
Det eksponeres et API på Altinn Bridge som lar 3.0 autentisere en virksomhetsbruker. Det nye endepunktet authentication/api/enterpriseuser tar imot et brukernavn, passord og organisasjonsnummer.

## Endringer i Infoportal

### Implementert videoblokk
Videoblokk som viser enten YouTube- eller Vimeo-video som kan legges inn på sidetyper og andre blokktyper er nå tilgjengelig. Blokken tar i bruk videoens URL.

## Diverse feilrettinger

### Intern Timeout for levering av store skjemaer via RestApi
Timeout for InstantiateFormTask og InstantiateFormTaskServiceEdition er endret til 15 minutter.

### HAL-lenker mangler i metadata-output
Endret text/html Accept-header i requesten til application/hal+json slik at lenkene kommer med uavhengig av Accept-header.

### Det var manglende nynorsktekster for Altinn apps i meldingsboksen
Dette er nå rettet.

### Login feltene ser ikke riktig ut
Login siden fikk ikke samme størrelse på bokstavene for alle skjermoppløsninger. I tillegg var det flere layout feil. Dette er nå rettet.

### Bestill nytt kodebrev - hvit stripe rundt grått felt
Dette er rettet.

### Scroll i portal hadde et blått felt til høyre for seg
Dette er blitt rettet.

### Visningsfeil på samtykkesiden
Det er rettet diverse layout feil på samtykkesiden som oppstod i forbindelse med en oppgradering.

### Enkeltrettigheter slettes ikke
Det er rettet en feil der tilgangsstyrer for en virksomhet ikke alltid fikk slettet rettigheter delegert til virksomheten sin fra det nye panelet “Rettigheter virksomheten har hos andre” i Profilsiden til virksomheten. 
Det viste seg å være en feil i underliggende kode som noen ganger pga. caching ikke ville se at rettighetene man forsøker å slette faktisk eksisterer og av den grunn slettes ingen ting. Bruker fikk likevel grønn kvittering, men rettighetene ble liggende igjen. Dette er nå rettet.

### Manglende e-postvarsel til registrerte adresser i KoFuVi ved enkeltrettighetsdelegering
Det er utbedret en feil innført i versjon 21.4 ved overgang til to-kolonnevisning for enkelttjeneste-delegering. Feilen medførte at det bare var privatpersoner med e-postadresse registrert i kontakt- og reservasjonsregisteret (KRR) som fikk e-postvarsel når de mottok nye tilganger for enkelttjenester. 

Delegering fra den nye to-kolonnevisningen benytter nå samme rutine for varsling som delegering av roller:
Dersom mottaker er en privatperson eller virksomhetsbruker benyttes e-post registrert under “Din kontaktinformasjon” for den avgiveren man mottar rettigheter fra. Dersom ikke e-post adresse er registrert gjøres det for privatpersoner oppslag i KRR. For virksomhetsbruker benyttes e-postadresse oppgitt ved opprettelse av brukeren.
Dersom mottaker er en virksomhet blir det sendt en felles e-post til alle registrerte e-postadresser i KoFuVi.

### Flaskehals i lagret prosedyre
Det er avdekket høyt CPU forbruk på grunn av mange kall mot /api/serviceowner/authorization/rights. Svært mange av kallene mot GetRights blir gjort for brukere der det ikke finnes roller. Man bør derfor sjekke om det finnes roller før man sjekker tilhørende rettigheter.
