---
title: API for Tjenesteeiere
description: Som tjenesteeier får du tilgang til en ekstra del av Altinns APIer. Den generelle delen om API er også nyttig for deg som tjenesteeier.
toc: true
weight: 800
aliases:
- /guides/integrasjon/tjenesteeiere/
- /guides/integrasjon/tjenesteeiere/innledning/
- /api/api-tjenesteeiere/
---
{{% panel %}}
#### Modernisering av Altinn
Altinn skal moderniseres for å sikre brukervennlige, sikre og kostnadseffektive tjenester til innbyggere og næringsliv.

*Det betyr at mange av dagens API i Altinn 2 innen juni 2025 vil erstattes av nye tjenester.
Før du tar i bruk dagens Altinn 2 API bør du undersøke hvilke konsekvenser moderniseringsløpet har for deg.*

Les mer om dette på samarbeidsportalen under [Modernisering av Altinn](https://samarbeid.digdir.no/eformidling/modernisering-av-altinn/1799)
{{% /panel %}}

{{% panel %}}
### Seksjonen gjelder Altinn II
API-beksrivelsene i denne seksjonen handler om API-ene som er tilgjengelige i Altinn II. I Altinn 3 er det nye API-er. Disse er beskrevet i [API-beskrivelser i docs.altinn.studio](https://docs.altinn.studio/teknologi/altinnstudio/altinn-api/)
{{% /panel %}}

Alle offentlige virksomheter som har tjenester på Altinn-plattformen kalles [tjenesteeiere](https://www.altinndigital.no/kom-i-gang/). Tjenesteeiere får tilgang til en egen del av Altinns REST-API og SOAP-API, som er beskrevet på denne siden. Selv om du er tjenesteeier vil du også kunne ha behov for den [åpne delen](/docs/api/) av Altinns APIer. 

På disse sidene har vi trukket ut den viktigste dokumentasjonen for tjenesteeiere. Se menyen til venstre for fullstendig dokumentasjon.

## Tjenesteeiers valg av grensesnitt

Flere av tjenestene tilbys med både web service– og batch-grensesnitt.
Som en tommelfingerregel kan man si at skal man overføre færre enn 100 elementer (alternativt mindre enn 30 MB) kan man benytte web service grensesnitt,
men for store datamengder bør batch-grensesnitt benyttes. Tommelfingerregelen er scenarioavhengig og ingen absoluttgrense.
Enkelte ressurser er også tilgjengelig i Altinns REST API for tjenesteeiere. Overtid vil Webservice grensesnittet erstattes med REST Api.

## Like webservice operasjoner med forskjellige protokoller og endepunkter

Alle operasjonene er tilgjengelig på to protokoller (bindings).

- Operasjoner som benytter SOAP 1.1 er kjennetegnet med navnendelsen –Basic.
- Operasjoner som benytter SOAP 1.2 er kjennetegnet med navnendelsen –WS.
- Operasjoner som benytter SOAP 1.2 og sertifikat er kjennetegnet med navnendelsen –EC.

Sertifikatet er knyttet til avgiver, slik at flere brukere kan benytte samme sertifikat.
For tjenesteeiere blir EC grensesnitt autentisert ved bruk av et sertifikat og agency system brukernavn og passord.

AEC grensesnitt benytter SOAP 1.2 og sertifikat, men krever ikke bruk av agency systemer, med brukernavn og passord.
I stedet hentes Organisasjonsnummer direkte fra sertifikatet som brukes til autentisering, som så valideres opp mot registrerte tjenesteeiere.

## Versjonering av webservice operasjoner

Flere av operasjonene i dette dokumentet vil kunne eksistere i flere versjoner. Dette for å være tilbakekompatibel med eventuelt eksisterende klienter.
Når en endring blir gjort for en gitt operasjon opprettes det en ny operasjon med tilsvarende navn som ender med et versjonsnummer,
for eksempel V2. Dette gjør at gamle klienter vil kunne fortsette å benytte gammel metode og WSDL, mens nye klienter kan (og oppfordres til) benytte nyeste metode og WSDL.

Merk at ikke alle grensesnitt nødvendigvis vil benytte denne endelsen.
Dette gjelder i de tilfeller hvor operasjonen ikke tidligere er tilgjengeliggjort og dermed ikke har noen forgjenger, for eksempel gjelder dette for mange av EC grensesnittene.

Dette dokumentet vil dokumentere den nyeste versjonen av operasjonene.
For dokumentasjon av tidligere versjoner henvises det til tidligere dokumentversjoner.

## Registrering

For å kunne sende og/eller motta data til/fra Altinn må tjenesteeier registrere sitt system og motta passord som skal benyttes ved overføring(ene).
Registrering gjøres ved at tjenesteeier bestiller tilgang via skjema som finnes på
Brønnøysundregistrenes [selvbetjeningsportal](https://selvbetjening.brreg.no/src/secure/main.jsp#services/itemDetails/c206QCM8PjpzbTpAIzw+OjI0ODQ6QCM8Pjo5N2IyZTlhYQ==) (krever innlogging).
Driftsleverandør registrerer systemet basert på registrert skjema, og passord kommuniseres tilbake til tjenesteeier.
System og passord brukes da som henholdsvis systemUserName og systemPassword i kall mot Altinn.

## Autentisering og autorisering

Når tjenesteeier via egne systemer benytter tjenester mot Altinn blir det registrerte systemet autentisert og autorisert før det kan utføre operasjoner mot Altinn.
Tjenesteeiers system må være registrert i Altinn og passord mottatt før tjenestene kan benyttes.

Ved bruk av batch grensesnitt blir tjenesteeier autentisert gjennom FTP/SFTP protokollen på vanlig vis. Eller Altinn autentiserer seg ved henting på FTP/SFTP.

## Varselsmaler

Altinn har mulighet til å sende ut predefinerte varsler til sluttbrukerne når tjenesteeier sender meldinger, legger inn prefill,
 og ved sending av frittstående varsel. Disse varslene må være definert i Altinn før de kan benyttes av tjenesteeier.

For å opprette en ny varslingsmal må tjenesteeier bestille dette ved å benytte skjema som finnes på altinndigital.no. Her kan det velges hvilke språk (norsk, nynorsk og engelsk) og varslingsmetoder (e-post og SMS) varslesmalen skal støtte. Når varselsmalen skal benyttes vil kombinasjonen av navn på varslingsmalen (NotificationType), varslingsmetode (TransportType) og språk angi hvilken tekst som sendes ut.

Et varsel som skal sendes på SMS kan ha max 700 tegn.

Varselsmalen kan også opprettes med såkalte tokens/substitusjonsvariabler angitt ved {0}, {1} osv. som lar tjenesteeier sende inn egendefinerte tekststrenger.
Disse angis i rekkefølge ved å benytte parameteren TokenValue.

Varsel sendes basert på informasjon om konkret angitte adresser, mobiltelefonnummer og/eller e-post adresse, som sendes Altinn,
eller ved å oppgi enten fødselsnummer eller organisasjonsnummer. I de to siste tilfellene vil Altinn slå opp i informasjon lagret i 
Altinn for å sende varsel: for fødselsnummer i brukerens kontaktinformasjon i kontakt og reservasjonsregisteret til Difi, for organisasjonsnummer 
i organisasjonens profilside. Profilsiden til en organisasjon vil inneholde en liste over varslingsadresser lagt inn av organisasjonen selv.

## Varselsmakroer

Det er en del varslings-makroer tilgjengelig for bruk i Notification løsninger for tjenesteeier.
En makro er en kort tekst som byttes ut med data fra Altinns Register. Register data blir hentet ut basert på ReporteeNumber eller ReporteeElementId koblet til en Notification.

Makroer legges inn som en del av NotificationTemplate, men kan også leveres i en text-token. Makroer er case-sensitive.

Makro                                  | Beskrivelse
-------------------------------------- | ------------------------
$reporteeFirstName$                    | Fornavn til Reportee     
$reporteeMiddleName$                   | Mellomnavn til Reportee  
$reporteeLastName$                     | Etternavn til Reportee   
$reporteeName$                         | Fullt navn til Reportee  
$reporteeNumber$                       | Gir organisasjonsnummer for en organisasjon, gir en tom streng ikke noe for en person.
$reporteeBirthMonth$ $reporteeBirthDay$ $reporteeBirthYear$ $reporteeBirthDay(dd/mm/yy)$ $reporteeBirthDay(yyyy-mm-dd)$ $reporteeBirthDay(yy/dd/mm)$ $reporteeBirthDay(dd.mm)$ | Forskjellige utgaver av en persons fødselsdag. Dersom man bruker $reporteeBirthDay(#)$, så vil fødsels-dato avgis på formatet som er avgitt av #, med en kombinasjon av yyyy, yy, mm og dd. Så om man gir $reporteeBirthDay(yyyy-mm-dd)$ vil man for eksempel få ut 1977-11-23.
$reporteePostalCode$ $reporteePostalArea$ $reporteePostalAddress1$ $reporteePostalAddress2$ $reporteePostalAddress3$ | Post-addresse data til Reportee.
$reporteeEmail$ $reporteeMobileNumber$ | Telefonnavn eller Email til Reportee.
$servicename$                          | Tjenestenavn på ReporteeElement som er koblet til en Notification. Brukes i Prefill/Correspondence sammenheng.
$servicename\|SC:\#\|SEC:\#$             | Gir navn på en spesifisert tjeneste. \# byttes her ut med relevant ServiceCode / ServiceEditionCode.

### Tjenesteutvikling og samspill med integrasjon

Tjenester for innsendinger, meldinger, formidling, innsyn og samhandling etableres i tjenesteutviklingsløsningen (TUL), og benyttes i sluttbrukerløsningen (SBL), dvs. Altinn portalen og integrerte systemer (sluttbrukersystemer og systemer hos tjenesteeiere). Samspillet mellom en tjeneste i TUL og integrasjonspunkter er etablert gjennom å benytte:

Begrep i TUL | Begrep i AltinnII | Begrep i AltinnI | Beskrivelse
-------------| ----------------- |------------------| -----------
Tjenestekode|ServiceCode (noen steder også angitt som ExternalServiceCode|N/A|Angir tjenestekode for Altinn tjenesten, for eksempel "MT0001" (innsendingstjeneste). Alfanumerisk verdi. Oppstår i TUL. Kombinasjonen av Tjenestekode og Tjenesteutgavekode er unik i Altinn.
Tjenesteutgavekode|ServiceEdition (noen steder også angitt som ServiceEditionCode eller ExternalServiceEditionCode|N/A|Angir utgaven på tjenestekoden, for eksempel 12311 (for tjenestekode "MT0001"). Tallverd. Oppstår i TUL. Kombinasjonen av Tjenestekode og Tjenesteutgavekode er unik i Altinn.
N/A|DataFormatId|Skjemanummer|Angir id som metadatakilde har satt på dataenheten (skjema), for eksempel "268". Alfanumerisk verdi. Benyttes i Skjema elementet som omkranser faktiske skjemadata (xml). Metadatakilde kan for eksempel være Oppgaveregisteret (OR). Kombinasjonen av DataFormatId og DataFormatVersion er unik.
N/A|DataFormatVersion|Spesifikasjonsnummer|Angir versjon som metadatakilde har satt på dataenheten (skjema), for eksempel 6370. Tallverdi. Benyttes i Skjema elementet som omkranser faktiske skjemadata (xml). Metadatakilde kan for eksempel være Oppgaveregisteret (OR). Kombinasjonen av DataFormatId og DataFormatVersion er unik.
Metode for oversending| ShipmentDefinition|N/A|Angir forsendelsesoppsett, dvs. unik alfanumerisk id som peker til informasjon om hva slags data som sendes/mottas, og hvordan det skal pakkes/settes sammen før utsending. Oppstår ved etablering av grensesnitt mellom Altinn og system som vil integrere seg med Altinn.
N/A|ReporteeElementID|N/A|Angir den unike identifikatoren for en spesifikk tjeneste (innsendings-, meldings-, innsyns-, eller samhandlingstjeneste)|Angir den unike identifikatoren for en spesifikk tjeneste (innsendings-, meldings-, innsyns-, eller samhandlingstjeneste)
N/A|CaseID|N/A|Angir den unike identifikatoren for en spesifikk samhandlingstjeneste, benyttes blant annet til å knytte andre tjenester opp mot samhandlingstjenesten.

{{% children description="true" %}}
