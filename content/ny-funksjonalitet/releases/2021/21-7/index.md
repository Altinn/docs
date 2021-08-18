---
title: 21.7
description: Mindre endringer og feilrettinger
weight: 140
type: releasenote
releasenote_info: Release 21.7, produksjonssatt 01. juli 2021
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Generelt 
### Ny Altinn-logo

Logo for Altinn er endret i trå med profilen til Digitaliseringsdirektoratet. 

![Ny visning](nyLogo.PNG " ")
_Logoen kan ha ulik farge ut i fra hvor den vises_

Ny logo er nå i bruk i sluttbrukerløsningen (SBL). Logo vil bli oppdatert i tjenesteutviklingsløsningen (TUL) i release v21.8

## Endringer i Portal

### Fritekstfelt som går over flere linjer vises tidvis på en linje i nyere nettlesere

SharePoint brukte “feil” style for textarea felter (InfoPath TextBox med mulitiline) for nyere nettlesere. SharePoint legger på “white-space: pre” på textarea felter. Dette virker i IE11, men i de fleste andre nyere nettlesere medfører dette at tekst ikke brytes. Dette er løst med javascript kode i SharePoint sitt InfoPath script (Core.js) som setter riktig white-space på textarea felter etter at InfoPath viewet er lastet.

## Endringer i SBL

Det er gjort en oppdatering av Difi oppslagstjeneste for KRR. Difis oppslagstjeneste blir nå hentet direkte via NuGet pakkeforvalter.

### Utvide parties-API på SBL-Bridge 

Parties API i SBL Bridge har blitt utvidet med to nye endepunkter. Ett endepunkt for å slå opp hovedenhet for en underenhet, og ett endepunkt for å hente ut en liste med enheter hvor en bruker har nøkkelrolle.

### Ny webservice tilgjengelig fra skjema i TUL

Det er laget en ny WebService som kan brukes fra InfoPath skjemaer. Den har en metode som kan brukes for å hente tidspunktet for når en bruker fikk delegert en rolle for en gitt avgiver. WebServicen er tilgjengelig på denne urlen http://infopathservices.altinn.no:87/Authorization/AuthorizationInfoPath.svc?WSDL (kan ikke brukes direkte i nettleser). Webservicen har kun metoden GetRoleDelegatedTime.

### Varslinger til underenheter vil nå gå til hovedenhetens varslingsadresse hvis underenheten ikke har adresse registrert

Tidligere ble ikke varsler sendt hvis en underenhet ikke hadde registrert varslingsadresse. Nå vil varsler bli sendt til hovedenhetens registrerte varslingsadresse hvis underenheten mangler adresse.
Endringen ble første gang innført i v21.3. Den ble da trukket tilbake på grunn av stor pågang fra sluttbrukere som fikk sendt varsler til feil adressser og ikke hadde mulighet til å rydde opp. Det er nå sendt melding til alle virksomheter som har mer enn en underenhet og som mangler kontaktinformasjon om at endringen innføres og med informasjon om hvordan korrigere varslingsinformasjon. I tillegg har rollekrav for å endre varslingsinformasjon blitt utvidet med altinnrollene “hovedadministrator” og “signerer av Samordnet registermelding”.

## Endringer i REST

### Hindret redirect for innlogging i REST APIet dersom det ikke foreligger en autentisert bruker

Dersom man er logget på uten autentisert bruker gis det nå i stedet for redirect en 403 status og feilmelding.

### Støtte for å håndtere virksomhetsbruker-innlogging fra Altinn 3.0 i sluttbruker REST APIet

Token exchange løsningen for AltinnTokens i 3.0 er utvidet slik at en virksomhet vil kunne veksle inn ett Maskinporten token + virksomhetsbruker pålogging. Det utstedes et eget AltinnToken som inkluderer brukerautentisering av virksomhetsbruker.
Dette virksomhetsbruker-AltinnTokenet er det nå laget støtte for i operasjoner på sluttbruker API som krever autentisert bruker. Dette tokenet vil ikke kunne brukes for operasjoner på Tjenesteeier API eller andre virksomhetsautentiserte operasjoner (se oversikt over scope og operasjoner).

## Endringer i TUL

### Ny samtykkemal for eBevis

Det er lagt til ny samtykkemal som skal brukes i eBevis ved uthenting av utvidet skatteattest.

## Endringer i Infoportal

### Forbedringer for admin av tilbakemeldinger (Fant du det du lette etter?)

Tilbakemeldingene er utbedret med filtrering på dato, sletting av kommentarer og eksport til CSV-format.

## Diverse feilrettinger

### Manglende e-postvarsel ved delegering av enkelttjenester når mottaker ikke har registrert varslingsadresse

Ved innføring av to-kolonne tjenestedelegering i v21.4 ble de innført en feil for e-postvarsel når mottaker ikke har en registrert e-postadresse (KRR, KoFuVi eller “Din kontaktinformasjon for virksomheten”) og tilgangsstyrer som utfører delegering selv må spesifisere en e-postadresse for varsling. Dette er nå utbedret slik at varsel blir sendt til e-postadressen som tilgangsstyrer oppgir.

### Dobbel URL decoding av videresendings-URL i samtykkeløsningen

Det var en feil der videresendings-URL spesifisert for samtykkeløsningen (både samtykke og REST registrerte samtykkeforespørsler) ble url decoded en gang for mye. Dette er nå rettet.

### Manglende PartyId for virksomhetsbruker-autentisering i SBL-Bridge API

SBL Bridge API ble i v21.6 utvidet med nytt endepunkt for å autentisere virksomhetsbrukere. Her ble det i etterkant funnet en feil der party id ikke ble returnert korrekt. Dette er nå rettet.

### Knapp fjernet fra E-dialog konkursbehandling

Knapp for å legge til/fjerne elementer fra innboks er fjernet fra E-dialog konkursbehandlling.

### Feil ved pdf-generering

Generering av pdf feiler hvis man i skjema har betinget formatering som bruker metodene addDays eller addSeconds. Dette er nå rettet.
