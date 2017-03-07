

### Implementasjonsguide for tjenesteeier                            
                                                                  

### 1	Innledning
Dette dokumentet beskriver de tjenester Altinn tilbyr alle tjenesteeiere og hvordan deres systemer kan integrere seg mot disse. Det er lagt vekt på å beskrive både det funksjonelle aspektet i forhold til hva integrasjonene tilbyr rent funksjonelt, og en teknisk detaljering av grensesnittene som tilbys av Altinn.

Eventuelle tjenester/grensesnitt som er spesifikke for en tjenesteeier er ikke med her.

### 1.1	Hva er Altinn
Altinn er myndighetenes løsning for innrapportering og dialog med næringslivet. Alle tjenester fra det offentlige til næringslivet skal gjøres tilgjengelige her. Målet er at næringslivet bare skal behøve å forholde seg til én nettportal for all rapportering og kommunikasjon med forvaltningen, og at Altinn skal bli et samhandlingsnav for offentlig norsk e-forvaltning. Videre skal Altinn som et transaksjonsnav sørge for håndtering av sluttbrukertjenester som innsendings-, meldings-, samhandlings-, formidlings- og innsynstjenester.

### 1.2	Valg av grensesnitt
Flere av tjenestene tilbys med både web service– og batch-grensesnitt. Som en tommelfingerregel kan man si at skal man overføre færre enn 100 elementer (alternativt mindre enn 30 MB) kan man benytte web service grensesnitt, men for store datamengder bør batch-grensesnitt benyttes. Tommelfingerregelen er scenarioavhengig og ingen absoluttgrense. AltinnII plattformen er bygget på siste versjon av Microsoft software og teknologi, og er ikke en begrensning for transport av data. For overføring av store datamengder er det vel så viktig at eksterne systemer er optimalt konfigurert iht. ønsket grensesnitt.

### 1.3	Lesehenvisning
Dette dokumentet bør leses i sammen med dokumentene "Funksjonell spesifikasjon – Sluttbrukerløsningen", som gir en funksjonell beskrivelse av sluttbrukerløsningen, og "Implementasjonsguide for integrasjon mot Altinn", som er den overordnede guiden for alle som skal integrere seg mot Altinn.
I tillegg refereres leser til Tjenestekatalogen (Service Inventory) som en kontinuerlig oppdatert liste over tilgjengelige tjenester, med tilhørende funksjonell og tekniske informasjon, samt tjenestens WSDL tilgjengelig på endepunktet for den tekniske spesifikasjonen. Tjenestekatalogen vil gi en komplett liste over hvilke tjenester som er tilgjengelig for tjenesteeiere gjennom egen visning av listen (Tjenesteeier tjenester): https://altinn.brreg.no/sites/program/altinn%20II/Lists/Tjenestekatalog/Tjenesteeier%20tjenester.aspx

### 1.4	Like operasjoner med forskjellige protokoller og endepunkter
Alle operasjonene er tilgjengelig på to protokoller (bindings). Operasjoner som benytter SOAP 1.1 er kjennetegnet med navnendelsen –Basic. Operasjoner som benytter SOAP 1.2 er kjennetegnet med navnendelsen –WS. Operasjoner som benytter SOAP 1.2 og sertifikat er kjennetegnet med navnendelsen –EC. Sertifikatet er knyttet til avgiver, slik at flere brukere kan benytte samme sertifikat. Utfyllende beskrivelse kommer senere i dokumentet.
For tjenesteeiere blir EC grensesnitt autentisert ved bruk av et sertifikat og agency system brukernavn og passord.
AEC grensesnitt benytter SOAP 1.2 og sertifikat, men krever ikke bruk av agency systemer, med brukernavn og passord. I stedet hentes Organisasjonsnummer direkte fra sertifikatet som brukes til autentisering, som så valideres opp mot registrerte tjenesteeiere.

### 1.5	Versjonering av operasjoner
Flere av operasjonene i dette dokumentet vil kunne eksistere i flere versjoner. Dette for å være tilbakekompatibel med eventuelt eksisterende klienter. Når en endring blir gjort for en gitt operasjon opprettes det en ny operasjon med tilsvarende navn som ender med et versjonsnummer, for eksempel V2. Dette gjør at gamle klienter vil kunne fortsette å benytte gammel metode og WSDL, mens nye klienter kan (og oppfordres til) benytte nyeste metode og WSDL.

Merk at ikke alle grensesnitt nødvendigvis vil benytte denne endelsen. Dette gjelder i de tilfeller hvor operasjonen ikke tidligere er tilgjengeliggjort og dermed ikke har noen forgjenger, for eksempel gjelder dette for mange av EC grensesnittene.

Dette dokumentet vil dokumentere den nyeste versjonen av operasjonene. For dokumentasjon av tidligere versjoner henvises det til tidligere dokumentversjoner.

### 2 [Definisjoner](https://altinn.github.io/docs/no/guides/definisjoner)

### 3 [Refererte dokumenter og linker](https://altinn.github.io/docs/no/guides/refererteDokumenterOgLinker)

### 4	Registrering
For å kunne sende og/eller motta data til/fra Altinn må tjenesteeier registrere sitt system og motta passord som skal benyttes ved overføring(ene). Registrering gjøres ved at tjenesteeier bestiller tilgang via skjema som finnes på Brønnøysundregistrenes eksternnett (https://altinn.brreg.no/sites/dokument2/Bestillingsskjema/Bestilling%20-%20Ny%20tjenesteeier%20i%20SBL.doc). Driftsleverandør registrerer systemet basert på registrert skjema, og passord kommuniseres tilbake til tjenesteeier. System og passord brukes da som henholdsvis systemUserName og systemPassword i kall mot Altinn.

### 5	Autentisering og autorisering
Når tjenesteeier via egne systemer benytter tjenester mot Altinn blir det registrerte systemet autentisert og autorisert før det kan utføre operasjoner mot Altinn. Tjenesteeiers system må være registrert i Altinn og passord mottatt før tjenestene kan benyttes.

Ved bruk av batch grensesnitt blir tjenesteeier autentisert gjennom FTP/SFTP protokollen på vanlig vis. Eller Altinn autentiserer seg ved henting på FTP/SFTP.

### 6	Varselsmaler
Altinn har mulighet til å sende ut predefinerte varsler til sluttbrukerne når tjenesteeier sender meldinger (8.2.1), legger inn prefill (8.1.1), og ved sending av frittstående varsel (8.8). Disse varslene må være definert i Altinn før de kan benyttes av tjenesteeier.

Varsel sendes basert på informasjon om konkret angitte adresser, mobiltelefonnummer og/eller e-post adresse, som sendes Altinn, eller ved å oppgi enten fødselsnummer eller organisasjonsnummer. I de to siste tilfellene vil Altinn slå opp i informasjon lagret i Altinn for å sende varsel: for fødselsnummer i brukerens kontaktinformasjon i det private samtykket, for organisasjonsnummer i organisasjonens profilside. Profilsiden til en organisasjon vil inneholde både kontaktinformasjonen som er angitt i Enhetsregisteret i tillegg til informasjon lagt inn av organisasjonen selv.

For å opprette en ny varslingsmal må tjenesteeier bestille dette ved å benytte skjema som finnes på Brønnøysundregistrenes eksternnett . Her kan det velges hvilke språk (norsk, nynorsk og engelsk) og varslingsmetoder (e-post og SMS) varslesmalen skal støtte. Når varselsmalen skal benyttes i web services eller batch vil kombinasjonen av navn på varslingsmalen (NotificationType), varslingsmetode (TransportType) og språk angi hvilken tekst som sendes ut. Varselsmalen kan også opprettes med såkalte tokens/substitusjonsvariabler angitt ved {0}, {1} osv. som lar tjenesteeier sende inn egendefinerte tekststrenger. Disse angis i rekkefølge ved å benytte parameteren TokenValue.

SMS varsler kan ikke inneholder mer enn 140 tegn. Et SMS varsel kuttes automatisk på 140 tegn dersom tjenesteeier forsøker å sende et varsel på mer enn 140 tegn.

### 6.1	Varselsmakroer
Det er en del varslings-makroer tilgjengelig for bruk i Notification løsninger for tjenesteeier. En makro er en kort tekst som byttes ut med data fra Altinns Register. Register data blir hentet ut basert på ReporteeNumber eller ReporteeElementId koblet til en Notification.

Makroer legges inn som en del av NotificationTemplate, men kan også leveres i en text-token. Makroer er case-sensitive.

|Makro|Beskrivelse|
|--------|--------|
|$reporteeFirstName$|Fornavn til Reportee|
|$reporteeMiddleName$|Mellomnavn til Reportee|
|$reporteeLastName$|Etternavn til Reportee|
|$reporteeName$|Fullt navn til Reportee.|
|$reporteeNumber$|Gir organisasjonsnummer for en organisasjon, gir en tom streng ikke noe for en person.|
|$reporteeBirthMonth$ $reporteeBirthDay$ $reporteeBirthYear$ $reporteeBirthDay(dd/mm/yy)$ $reporteeBirthDay(yyyy-mm-dd)$ $reporteeBirthDay(yy/dd/mm)$ $reporteeBirthDay(dd.mm)$|Forskjellige utgaver av en persons fødselsdag. Dersom man bruker $reporteeBirthDay(#)$, så vil fødsels-dato avgis på formatet som er avgitt av #, med en kombinasjon av yyyy, yy, mm og dd. Så om man gir $reporteeBirthDay(yyyy-mm-dd)$ vil man for eksempel få ut 1977-11-23.|
|$reporteePostalCode$ $reporteePostalArea$ $reporteePostalAddress1$ $reporteePostalAddress2$ $reporteePostalAddress3$|Post-addresse data til Reportee.|
|$reporteeEmail$|Telefonnavn eller Email til Reportee.|




