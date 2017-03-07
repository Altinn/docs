

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
|$reporteeEmail$ $reporteeMobileNumber$|Telefonnavn eller Email til Reportee.|
|$servicename$ | Tjenestenavn på ReporteeElement som er koblet til en Notification. Brukes i Prefill/Correspondence sammenheng. | |$servicename SC:# SEC:#$|Gir navn på en spesifisert tjeneste. # byttes her ut med relevant ServiceCode / ServiceEditionCode.|

### 7	Tjenesteutvikling og samspill med integrasjon
Tjenester for innsendinger, meldinger, formidling, innsyn og samhandling etableres i tjenesteutviklingsløsningen (TUL), og benyttes i sluttbrukerløsningen (SBL), dvs. Altinn portalen og integrerte systemer (sluttbrukersystemer og systemer hos tjenesteeiere). Samspillet mellom en tjeneste i TUL og integrasjonspunkter er etablert gjennom å benytte:

| Begrep i TUL | Begrep i AltinnII | Begrep i AltinnI| Beskrivelse|
|--------|--------|--------|--------|
|Tjenestekode|ServiceCode (noen steder også angitt som ExternalServiceCode|N/A|Angir tjenestekode for Altinn tjenesten, for eksempel "MT0001" (innsendingstjeneste). Alfanumerisk verdi. Oppstår i TUL. Kombinasjonen av Tjenestekode og Tjenesteutgavekode er unik i Altinn.|
|Tjenesteutgavekode|ServiceEdition (noen steder også angitt som ServiceEditionCode eller ExternalServiceEditionCode|N/A|Angir utgaven på tjenestekoden, for eksempel 12311 (for tjenestekode "MT0001"). Tallverd. Oppstår i TUL. Kombinasjonen av Tjenestekode og Tjenesteutgavekode er unik i Altinn.|
|N/A|DataFormatId|Skjemanummer|Angir id som metadatakilde har satt på dataenheten (skjema), for eksempel "268". Alfanumerisk verdi. Benyttes i <Skjema> elementet som omkranser faktiske skjemadata (xml). Metadatakilde kan for eksempel være Oppgaveregisteret (OR). Kombinasjonen av DataFormatId og DataFormatVersion er unik.|
|N/A|DataFormatVersion|Spesifikasjonsnummer|Angir versjon som metadatakilde har satt på dataenheten (skjema), for eksempel 6370. Tallverdi. Benyttes i <Skjema> elementet som omkranser faktiske skjemadata (xml). Metadatakilde kan for eksempel være Oppgaveregisteret (OR). Kombinasjonen av DataFormatId og DataFormatVersion er unik.|
|Metode for oversending| ShipmentDefinition|N/A|Angir forsendelsesoppsett, dvs. unik alfanumerisk id som peker til informasjon om hva slags data som sendes/mottas, og hvordan det skal pakkes/settes sammen før utsending. Oppstår ved etablering av grensesnitt mellom Altinn og system som vil integrere seg med Altinn.|
|N/A|ReporteeElementID|N/A|Angir den unike identifikatoren for en spesifikk tjeneste (innsendings-, meldings-, innsyns-, eller samhandlingstjeneste)|Angir den unike identifikatoren for en spesifikk tjeneste (innsendings-, meldings-, innsyns-, eller samhandlingstjeneste)|
|N/A|CaseID|N/A|Angir den unike identifikatoren for en spesifikk samhandlingstjeneste, benyttes blant annet til å knytte andre tjenester opp mot samhandlingstjenesten.|
### 8	Funksjonelle scenario
Altinn tilbyr flere tjenester innenfor flere funksjonelle områder for tjenesteeiere. Dette kapittelet beskriver hvilken funksjonalitet som finnes med referanser til hvilke grensesnitt som benyttes. Oversikt over den enkelte tjeneste, tjenesteoperasjon og parametere til disse er beskrevet i Tjenestekatalog og tjenestenes WSDL, samt i et eget avsnitt; kap 9 Grensesnitt – web servicesGrensesnittWebServices. Tilsvarende er det et eget avsnitt for batch beskrivelser; kap 10 Grensesnitt – batch til Altinn_Innsendingstjenester.

De funksjonelle områder som finnes er:
- Innsendingstjenester
- Meldingstjenester
- Formidlingstjenester
- Kvitteringer
- Innsynstjenester
- Lenketjeneste
- Samhandlingstjenester
- Frittstående varsel
- Autorisasjon
- Uthenting fra tiltrodd tredjepart logg
- Sluttbrukers meldingsboks (ikke tilgjengelig p.t.)
- Tjenesteeierstyrt rettighetsregister

##### 8.1	Innsendingstjenester
Innsendingstjenester utvikles i tjenesteutviklingsløsningen (TUL) i Altinn, og er en definert innsending av spesifikke skjema/skjemasett med eller uten vedlegg. Fylles ut i Altinn portalen eller i integrert sluttbrukersystem, signeres og sendes inn. Påbegynte og innsendte innsendingstjenester kan oppbevares i sluttbrukers meldingsboks i Altinn.

Svardata sendes tjenesteeier. Tjenesteeier kan også legge skjemaet klart i den enkeltes brukers arbeidsliste og varsle om frister og lignende. 

For tjenesteeiere omhandler "Innsendingstjenester" følgende:
- innsending av prefilldata
- innsending av abonnementsdata
- mottak av ferdig utfylte innsendinger fra Altinn
- uthenting av innsendte data fra tjenesteeiers eget arkiv
- uthenting av kvittering for status på innsending

##### 8.1.1	Innsending av prefilldata
Tjenesteeier kan sende inn prefilldata for en tjeneste i Altinn, og dataene benyttes ved preutfylling. Preutfylling innebærer at en gitt tjeneste (skjema/skjemasett) ved aktivisering i Altinn blir forhåndsutfylt med data mottatt fra tjenesteeiere og nasjonale registre. Prefilldata kan sendes i sanntid eller satsvis (batch).

Det finnes fem typer data ifbm. preutfylling:
1.	Sende inn preutfylte skjemasett
- Tjenesteeier kan sende inn ett eller flere preutfylte skjemasett for en gitt tjeneste versjon, eller rapporteringsplikt for lagring i database.
- Benyttes når en avgiver eller abonnementsrutine aktiviserer tilknyttet tjeneste i portalen.
- Skjemasettet kan inneholde identifiserende felter, for å kunne ha forskjellige preutfylte skjemasett ved rapportering flere ganger i året. Se eget punkt nedenfor om Identifiserende felter for mer info.
- Kan sendes i sanntid eller satsvis. Ved overføring i sanntid overføres en liste av preutfylte skjemasett asynkront, og kvittering returneres.
- Kvittering for info om status på asynkron innsending kan hentes ut vha. web service kall, se avsnitt Receipt (9.3). Referanse angitt ved innsending benyttes som nøkkel.
2.	Identifiserende felter
- Verdier som legges på et preutfylt skjemasett, for å gjøre skjemasettet unikt
- Verdiene kan være "hva som helst", men typisk noe som kan knyttes til det preutfylte skjemasettet, f.eks. "rapport X", "periode Y" (2 verdier).
- Preutfylte skjemasett uten identifiserende felter benyttes ved aktivisering av tjenester i Altinn portal, og/eller sammen med abonnement.
- Preutfylte skjemasett med identifiserende felter benyttes kun sammen med abonnement.
3.	Direkte aktivisering av ett preutfylt skjemasett
- Tjenesteeier kan sende inn ett preutfylt skjemasett som øyeblikkelig blir tilgjengeliggjort i avgivers arbeidsliste i portalen
- Med eller uten varsel etter tilgjengeliggjøring i arbeidslisten.
- Det preutfylte skjemasettet kan lagres til database for senere bruk, som beskrevet i punkt 1.
- Kan kun sendes i sanntid, synkront.
- Man vil kunne angi om det instansiert og preutfylt skjema skal knyttes til en samhandlingstjeneste ved å angi referansen i den valgfrie parameteren caseId i operasjonen.
4.	Sende inn feltbasert preutfyllingsdata
- Tjenesteeier kan sende inn feltnavn og feltverdi for felter som benyttes i skjemaer.
- Ingen direkte knytning til tjeneste eller skjema, dvs. feltet kan finnes på flere tjenester for samme avgiver.
- Benyttes når avgiver aktiviserer tjeneste som inneholder feltet i portalen. 
- Kan kun sendes inn satsvis.
- Kvittering for status på batch-innsending kan hentes ut vha. web service kall, se avsnitt Receipt (9.3). Referanse angitt i xml ved innsending benyttes som nøkkel.
5.	Preutfyllingsdata fra nasjonale registre
- Data fra nasjonale registre som f.eks. Folkeregistre og Enhetsregisteret sendes inn til Altinn.
- Register data knyttes til felter når tjeneste opprettes i Tjenesteutviklingsløsningen (TUL).
- Benyttes når avgiver aktiviserer tjeneste som inneholder feltet

[![](https://altinn.github.io/docs/no/guides/tjenesteeier/img/implGuideTjEier1.png)](https://altinn.github.io/docs/no/guides/tjenesteeier/img/implGuideTjEier1.png)
**Figur 1 - Skjermbildet viser utfylling av RF-1047 (Inntektsoppgave) i Altinn portalen. Feltene innenfor den røde firkanten har automatisk blitt utfylt vha. prefilldata sendt inn av tjenesteeier.**

Da det er flere kilder for preutfyllingsdata blir preutfyllingsdataene benyttet i følgende rekkefølge for å hindre uønskede overskrivelser:
1.	Preutfylt skjemasett
Hentes fra Altinn databasen dersom det finnes for gitt tjeneste og avgiver.
2.	Feltbasert preutfylling.
Felter som finnes for gitt avgiver og aktivisert skjema hentes fra Altinn databasen. Overskriver evt. Preutfylt skjemasett.
3.	Preutfyllingsdata fra nasjonale registre.
Data fra nasjonale registre er feltbasert og overskriver alle andre preutfyllingsdata typer.

For satsvis overføring kan data hentes fra tjenesteeiers system, eller tjenesteeier kan levere data på et definert Altinn område.

Tjenesten må være opprettet i TUL og eksportert til SBL, for at preutfyllingsdata for den gitte tjenesten skal kunne mottas.

For flere detaljer rundt kontrakten for SubmitPrefilledFormTasks og SubmitAndInstantiatePrefilledFormTask vennligst se henholdsvis kapittel 9.6.2 og 9.6.1, Tjenestekatalog og WSDL.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**
| Tjeneste | Operasjon | Type|
|--------|--------|--------|
|Prefill| SubmitPrefilledFormTasks|Basic/WS/EC|
|Prefill|SubmitAndInstantiatePrefilledFormTask|Basic/WS/EC|
|Receipt|GetReceipt|Basic/WS/EC|

**Batch grensesnitt som inngår i beskrevet funksjonalitet:**

| Batch | Operasjon | Type|
|--------|--------|--------|
|Preutfylling| XML |FTP/SFTP|


##### 8.1.2	Innsending av abonnementsdata

Tjenesteeiere kan opprette abonnement på innsendingstjenester som aktiverer og tilgjengeliggjør innsendingstjenesten i den gitte avgivers arbeidsliste. Kan sendes i sanntid eller satsvis (batch). 

Ved overføring i sanntid overføres en liste med abonnement, dvs. ett eller flere asynkron overføringer. 

For satsvis overføring kan data hentes fra tjenesteeiers system, eller tjenesteeier kan levere data på et definert Altinnområde.

Tjenesten må være opprettet i TUL og eksportert til SBL, for at et abonnement for den gitte tjenesten skal kunne mottas.

Man kan opprettet følgende abonnementstyper:
•	Engangsaktivering
•	For en gitt periode/periodisk rapporteringsplikt
•	I et gitt intervall
•	På gitte tidspunkter med gitte frister

Et abonnement kan være tilknyttet identifiserende felter for å kunne koble et abonnement til et bestemt preutfylt skjemasett for den gitte avgiver. Det preutfylte skjemasettet med de samme identifiserende feltene må finnes i Altinn databasen før abonnementet aktiviseres. Se eget punkt om Identifiserende felter for mer info.

Mottatte abonnementsdata lagres til databasen. 

Ved innsending av abonnementsdata vil man kunne angi om skjema skal knyttes til en samhandlingstjeneste ved å angi referansen i den valgfrie parameteren CaseId i SubmitSubscription.

Kvittering for info om status på innsending kan hentes ut vha. web service kall, se avsnitt Receipt (9.3). Referanse angitt ved innsending via web service/batch grensesnitt (xml) benyttes som nøkkel.

En rutinejobb i Altinn vil med jevne mellom gå igjennom abonnementsdatabasen for å finne abonnement/innsendingstjenester som er klare for instansiering, dvs. den vil aktivisere alle abonnement hvor startdato er mindre enn, eller lik, dagens dato. Startdato er satt av tjenesteeier, og neste aktiviseringsdato kalkuleres automatisk av rutinejobben i Altinn ut fra gitte parametre satt av tjenesteeier. Se parameter detaljer i avsnittet SubmitSubscription (web service) (9.7.1) eller Abonnement (batch) (10.3).

For flere detaljer rundt kontrakten for SubmitSubscription vennligst se kapittel 9.7.1, Tjenestekatalog og WSDL.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

|Tjeneste|Operasjon|Type|
|--------|--------|--------|
|Subscription|Basic/SubmitSubscription/EC|Basic/WS/EC|
|Receipt|GetReceipt|Basic/WS/EC|

**Batch grensesnitt som inngår i beskrevet funksjonalitet:**

|Batch|Overføringsformat|Protokoll|
|--------|--------|--------|
|Abonnement|XML|FTP/SFTP|

#### 8.1.3	Motta data for innsendinger
Arkiverte innsendinger i Altinn tilgjengeliggjøres til tjenesteeier for henting/overføring. Kan enten sendes i sanntid per innsending, satsvis (batch), eller ved å bruke DownloadQueue.

1.	For sanntid, dvs. ved bruk av web service, må tjenesteeier etablere dedikert web service angitt av Altinn på egen plattform, og motta innsendinger automatisk etter hvert som de arkiveres. Se eget avsnitt: 9.15 Online overføring til Tjenesteeier.

2.	For satsvis overføring kan data leveres til en tjenesteeiers mottakssystem dersom det er etablert, eller tjenesteeier kan hente data på et definert Altinn område.

3.	Tjenesteeier kan velge å bruke DownloadQueue web service, som lar tjenesteeiere hente meta-data fra en kø, som så kan brukes til å hente individuelle arkiverte innsendinger. 

Tilgjengeliggjøres i standard Altinn format eller transformeres til tjenesteeiers eget mottaksformat.

Kvittering først opprettet ved innsending fra tjenesteeier oppdateres med informasjon om utsending, dvs. livsløpet til innsendingstjenesten dokumenteres. Kvittering kan hentes ut vha. web service kall, se avsnitt Receipt (9.3). Referanse angitt ved innsending benyttes som nøkkel.

Innsendinger for tjenesteutgaver knyttet til DownloadQueue (konfigureres under utgaveparametere i TUL) vil legge til metadata for innsendinger i DownloadQueue. Tjenesteeier kan hente en liste med disse metadata ved å bruke et web service kall, se kapittel for DownloadQueue (9.16) 
Metadata kan så benyttes til å hente individuelle arkiverte innsendinger med vedlegg. I tillegg er det en tjenesteoperasjon som gir tilgang å hente ned en PDF versjon av et skjemasett. Denne vil støtte PDFA standarden.

Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet for overføring i sanntid:

|Tjeneste|Operasjon|Type|
|--------|--------|--------|
||Basic/ReceiveOnlineBatchExternalAttachment|Basic|
|Receipt|GetReceipt|Basic/WS/EC|

**Batch grensesnitt som inngår i beskrevet funksjonalitet:**

|Batch|Overføringsformat|Protokoll|
|--------|--------|--------|
|Innsendingstjenester|XML|FTP/SFTP|

**Tjenester og tjenesteoperasjoner som inngår i DownloadQueue:**

|Tjeneste|Operasjon|Type|
|--------|--------|--------|
|DownloadQueue|GetDownloadQueueItems|Basic/WS/EC|
|DownloadQueue|PurgeItem|Basic/WS/EC|
|DownloadQueue|GetArchivedFormtaskDQ|Basic/WS/EC|
|DownloadQueue|GetFormSetPdf|Basic/WS/EC|



