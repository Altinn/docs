---
draft: false
title: Guide for tjenesteeier
aliases:
menu:
  main:
    identifier: implementation-guide
    name: Tjenesteeier
    parent: guides

weight: 10
---

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

### 2 [Definisjoner](../../definisjoner)

### 3 [Refererte dokumenter og linker](../referanser)

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

{{< figure src="/docs/images/guides/implGuideTjEier1.png" title="Figur 1 - Skjermbildet viser RF-1047 i portalen. Feltene i den røde firkanten har automatisk blitt preutfylt av tjenesteeier." >}}


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

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet for overføring i sanntid:**

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

#### 8.1.4	Status på sending av innsendte element
For arkiverte elementer som blir sendt til tjenesteeier i sanntid eller satsvis beskrevet i 8.1.3 kan tjenesteeier hente status på elementer ved bruk av ArchiveShipmentStatus tjenesten.
Ved å bruke ArchiveShipmentStatus webtjenesten kan tjenesteeier hente en enkel oversikt over overførsels-status på individuelle elementer eller for lister av elementer sortert på tjeneste.


**Tjenester og tjenesteoperasjoner som inngår i ArchiveShipmentStatus:**

|Tjeneste|Operasjon|Type|
|--------|--------|--------|
|ServiceOwnerArchive|GetArchiveShipmentStatus|Basic/WS/EC|

#### 8.1.5	Dekryptering av sensitive felter data i innsendingstjenesten
Altinn støtter funksjonalitet for innsending av sensitive tjenester med sensitive felter. Slike skjema kan sendes inn via portalen eller sluttbrukersystemer. For å kunne lese de sensitive feltene tjenester må tjenesteeier benytte sine egne sertifikater for å dekryptere feltene.

Krypteringen skjer ved at innsender benytter en symmetrisk nøkkel på 128 bit i en AES algoritme for å kryptere det sensitive feltene i skjemaet. Sluttbrukersystemer må selv generere denne nøkkelen og kryptere det sensitive felteneskjemaet, mens dette vil bli håndtere for bruker i portalen.

For at bruker senere skal kunne dekryptere feltene fra skjemaet sendes den symmetriske nøkkelen med forsendelsen, men denne er da kryptert ved et selvvalgt brukerpassord på minst 8 tegn. Bruker kan da hente ut data, dekryptere symmetrisk nøkkel ved hjelp av sitt selvvalgte passord, og bruke denne til å dekryptere den sensitive dataen.
 
For at tjenesteeier skal kunne dekryptere feltene må de også ha krypteringsnøkkelen. Den symmetriske nøkkelen må derfor også krypteres med tjenesteeierens offentlige sertifikat ved hjelp av algoritmen RSA, og lagt ved innsendingen. Når tjenesteeier da mottar sensitiv data vil de først bruke sin private nøkkel til å dekryptere krypteringsnøkkelen, deretter bruke denne nøkkelen til å dekryptere de sensitive feltenedata.

Innsendinger med av sensitive felt tjenester og vedlegg overføres til etat via batch eller via online oppslag til tjenesteeiers arkiv på samme måte som andre innsendinger for tjenester uten sensitiv informasjon. 

#### 8.1.5.1	Tekniske detaljer
Den symmetriske nøkkelen som er brukt til å kryptere de sensitive feltene i et skjema som skal dekrypteres hos tjenesteeier gjøres tilgjengelig i skjema ved hjelp av XML-Enc standarden (http://www.w3.org/TR/xmlenc-core/). Den krypterte symmetriske nøkkelen ligger pakket sammen med en referanse til sertifikatet som er brukt på følgende form.

```XML
<my:txtFN>
	<EncryptedData Type="http://www.w3.org/2001/04/xmlenc#Content" xmlns="http://www.w3.org/2001/04/xmlenc#">
		<EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes128-cbc" />
		<ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
			<EncryptedKey xmlns="http://www.w3.org/2001/04/xmlenc#">
				<EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-1_5" />
				<CipherData>
<CipherValue>Ahgw/pNo9fcfUtOr8aTceVkFlCsC58HY0VrQUJW1B/AxMOzYsyKhWRorUViQENqSJabEiwfin4zO2qzRuELwGXBFZ4jtkwlJpnAd+6NuCZ/P0ZsxJG5A8XnALmVCBpIcOPaPUa3Q211Bnu3eCHaMmgw9/itX3g3FPZItkwNEfGg=</CipherValue>
				</CipherData>
			</EncryptedKey>
			<ds:KeyName>CD13AEC20C0564C2B5499630BE478654D3ADD64A</ds:KeyName>
		</ds:KeyInfo>
		<CipherData>
			<CipherValue>TJ+KuQDc2ccduVlCIaM9sw==</CipherValue>
		</CipherData>
	</EncryptedData>
</my:txtFN>
```
I dette eksempelet er <my:txtFN> feltet i skjema som inneholder sensitive data. I slike felt vil man finne et EncryptedData element som inneholder følgende 3 viktige elementer
1.	Symmetrisk nøkkel kryptert med sertifikat. (EncryptedData/KeyInfo/EncryptedKey/Cipherdata)
2.	Referanse til sertifikat brukt for å kryptere symmetrisk nøkkel. Dette er en thumbprint av sertifikat for tjenesteier. Den brukes internt hos tjenesteeier til å gjøre oppslag i keystore for å få tak i privat nøkkel og dermed kunne dekryptere den symmetriske nøkkelen. (EncryptedData/KeyInfo/KeyName) 
3.	Skjemadata kryptert med symmetrisk nøkkel. (EncryptedData/CipherData/CipherValue)

Skjemadata er kryptert ved hjelp av den symmetriske AES algorithmen med en blocksize på 128 bit, ciphermode CBC (Cipher-block chaining, http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation ) og padding er PKCS7.

Den symmetriske nøkkelen er kryptert med RSA algoritmen, ECB mode og PKCS1 padding. 

For tjenester som har krypterte vedlegg og krypterte skjemaer benyttes nøkkelinformasjonen som ligger i GetArchivedFormTaskBasicV2Result eller i data fra fil

```xml
<SOEncryptedSymmetricdKey>
<EncryptedKey>u7CPRJ/ZtOoFPU4tkSqBDLW6e0V1Mr92C0oTC7bWztYuCvgl0+R2DUW/8iSSaH3+Wl1vnWTRSnuEDiKBVenfEjQ5j89WHvbA0QO1cMzIpYl53EDBt1tvoVHaJYq+4KJIo2DGNYNHyb2iFIgn39BYo4KpNLW1Yk2k8MegCgnajMnSICSuYuy5sGuBkvytottC0h2KKR7PAZtuuzJ4PRnby2AAMNmSB8VusNctDen/d8nF1Sh1DRcP9pArBvsxEH2A7SwiKS+dRC/J2QK7iM1I6Tphkalsyjmgn03LkJMm/8X9ufp+fN6n8Czg+BsZ1+rw2DD7vgTDGMyn+41gqZW1qg==</EncryptedKey>
<CertificateThumbprint>5D15D6E888632370E0223B779C4E0F0D9D45DED0</CertificateThumbprint>
</SOEncryptedSymmetricdKey>
```
Se kapittel 14 for kodeeksempler. 

FormDataXml er kryptert ved hjelp av den symmetriske AES algorithmen med en blocksize på 128 bit, ciphermode CBC (Cipher-block chaining, http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation ) og padding er ISO10126.

###8.2	Meldingstjenester
Tjenesteeiere kan sende informasjon i form av meldinger til brukere av Altinn, og meldingene støtter HTML og vedlegg. Brukere kan varsles med e-post eller SMS om at informasjon er gjort tilgjengelig, for innsyn eller behandling. Tjenesteeiere får informasjon om hvilke utsendte meldinger som er åpnet, og kan eventuelt kreve at brukeren bekrefter mottaket innen en fastsatt frist. Tjenesteeier kan enkelt sjekke status for innsendte meldinger på en meldingstjeneste ved å benytte eget web service kall med et sett av søkeparametere.

Meldingene kan oppbevares i sluttbrukers meldingsboks i Altinn i en fastsatt periode, eventuelt slettes av brukeren. Bruker kan også arkivere meldingene til sitt arkiv. Om meldingen krever bekreftelse må dette gjøres før meldingen eventuelt kan arkiveres.

Meldinger kan også eventuelt sendes til "Digital postkasse til innbygger" hvis brukeren har registrert en slik postkasse i Kontakt- og reservasjonsregisteret. (Dette gjelder kun personer, ikke organisasjoner.) Digitale brev kan opprettes istedenfor eller i tillegg til en melding i Altinn.

I sammenheng med opprettelse av digitale brev er det også mulig å bestille varsel fra DPI løsningen. DPI varsel vil bli sendt ut av postkasse leverandøren. Meldingsvarsel og DPI varsel er helt separate og bestilles hver for seg. For varsel fra DPI følger grensesnittet til Altinn i stor grad definisjonene til difi.

1.	http://begrep.difi.no/SikkerDigitalPost/1.2.0/begrep/Varsler 
8.2.1	Sende inn meldingstjenester
Tjenesteeiere kan sende en melding til en gitt person eller bedrift som tilgjengeliggjøres for lesing/henting via Altinn. Kan enten sendes i sanntid per innsending, eller satsvis (batch).

Melding kan være:
•	Ren tekst.
•	HTML basert (formatert visning i nettleser).
•	XML basert med referanse til tilhørende visningsskjema. (Skjema må defineres på tjenesten i TUL.)
•	PDF. Dette gjelder kun sikker digital post. (Altinn vil selv behandle det som vedlegg.)
•	Kombinasjon av alle over.

Annet:
•	Brukere kan reservere seg mot å motta digital korrespondence gjennom kanaler som Altinn og digital postkasse. Tjenesteeiere kan velge å respektere eller ignorere slike reservasjoner. Se IsReservable.
•	Inneholde binære vedlegg (for nedlasting), valgfri parameter DestinationType vil kunne begrense om vedleggene er tilgjengelig i portal eller sluttbrukersystem, eller begge. Om ikke sendt inn blir den satt til standard verdi ShowToAll. Ved videresending til "Digital postkasse til innbygger" er det obligatorisk med minst ett vedlegg. Dette vil da benyttes som hoveddokument i det som sendes til brukerens digitale postkasse.
•	Varsles til en eller flere brukere på forskjellige kommunikasjonskanaler:
-	SMS
-	E-post
•	Tilknyttet en eksisterende samhandlingstjeneste ved å benytte valgfri caseID parameter. Om meldingstjenesten ikke tilhører den angitte samhandlingstjenesten eller denne ikke eksisterer vil operasjonen avbrytes.
•	Mulig å videresende meldingen til en e-post adresse om angitt i valgfri parameter AllowForwarding. Er denne satt til true vil bruker kunne sende meldingen videre som en e-post fra portalen. Om ikke satt settes den til standardverdi som er True.
•	En melding kan kobles til innsending ved å oppgi ArchiveReference. Dette vil da oppfattes som et svar på en innsending.
•	Det er også mulig å gi instrukser for hvordan en bruker kan svare på en melding. 
-	I form av en enkel link brukeren kan åpne.
-	I from av et skjema som bruker må sende inn.
-	I from av en kopi av eksisterende innsending. Brukeren korrigerer og sender inn.

Digital postkasse til innbygger:
Løsningen for «Digital postkasse til innbygger» har ikke støtte for all funksjonalitet som finnes i Altinn. Funksjoner som ikke blir brukt hvis det ikke opprettes noen melding i Altinn:
•	Opprettelse av kobling mellom melding og en innsending. (Tjenesteeier svar på innsending)
•	Svar på melding. (Sluttbruker svar på melding fra tjenesteeier.)
•	Knyttning mot samhandlingstjenester.
•	Varsel for h.h.v melding og digitalt brev styres med ulike innstillinger. 

Ved overføring i sanntid sendes en og en melding av gangen. Synkron overføring.

For satsvis overføring kan data hentes fra tjenesteeiers system, eller tjenesteeier kan levere data på et definert Altinn område.

Tjenesten må være opprettet i TUL og eksportert til SBL, for at meldingene skal vises for sluttbrukerne/sluttbrukersystemer. 

Kvittering for info om status på innsending kan hentes ut vha. web service kall, se avsnitt Receipt (9.3). Referanse angitt ved innsending via web service/batch grensesnitt (xml) benyttes som nøkkel.

For flere detaljer rundt kontrakten for InsertCorrespondenceV2 vennligst se kapittel 9.4.1, Tjenestekatalog og WSDL.

Det tilbys støtte for gammelt AltUt format for eksisterende tjenesteeiere i Altinn.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

|Tjeneste|Operasjon|Type|
|--------|--------|--------|
|Correspondence|InsertCorrespondenceV2|Basic/WS/EC|
|AltUt|SubmitAltutMessagePw|Basic|
|Receipt|GetReceiptV2|Basic/WS/EC|

**Batch grensesnitt som inngår i beskrevet funksjonalitet:**

|Batch|Overføringsformat|Protokoll|
|--------|--------|--------|
|Correspondence format|XML|FTP/SFTP|
|AltUt Format|XML|FTP/SFTP|

##### 8.2.2	Motta meldingsbekreftelse
En meldingstjeneste kan defineres med at tjenesteeier ønsker:
•	Åpne bekreftelse
•	Lese bekreftelse

Meldingsbekreftelser tilgjengeliggjøres for overføring / henting:
•	Tilgjengeliggjøres i "sanntid" per innsending
•	Samles opp og tilgjengeliggjøres på gitte intervall eller spesifikt tidspunkt (batch)

Data kan leveres til en tjenesteeiers mottakssystem dersom det er etablert, eller tjenesteeier kan hente data på et definert Altinn område.

Tilgjengeliggjøres i standard Altinn format eller transformeres til tjenesteeiers eget mottaksformat.

Kvittering først opprettet ved innsending fra tjenesteeier oppdateres med informasjon om utsending, dvs. livsløpet til meldingstjenesten dokumenteres. Kvittering kan hentes ut vha. web service kall, se avsnitt Receipt (9.3). Referanse angitt ved innsending benyttes som nøkkel.

Tilbyr støtte for gammelt AltUt format for eksisterende tjenesteeiere i Altinn.

**Batch grensesnitt som inngår i beskrevet funksjonalitet:**

|Batch|Overføringsformat|Protokoll|
|--------|--------|--------|
|CorrespondenceConfirmations|XML|FTP/SFTP|
|AltUtConfirmationBatch|XML|FTP/SFTP|

Det tilbys også egen funksjonalitet for rapportering av en samlet meldingstjeneste hvor tjenesteeier vil motta informasjon om status for alle brukere etter et gitt antall dager definert for tjenesten i TUL. Status for hver bruker her vil kunne være ikke lest, lest, og bekreftet. Data leveres til tjenesteeiers mottakssystem dersom det er etablert.

|Batch|Overføringsformat|Protokoll|
|--------|--------|--------|
|CorrespondenceUsageData|XML|FTP/SFTP|

#### 8.2.3 Sjekke status på meldingstjenester
Tjenesteeier kan enkelt sjekke status på meldinger de har sendt inn på en tjeneste ved å benytte egen web service for dette. Resultatsettet fra tjenesten vil være avhengig av søkeparameterne som tjenesteeier sender inn. Tjenestekode (ServiceCode) og tjenesteutgavekode (ServiceEditionCode) er pålagte parametere i spørringen, mens det videre kan filtreres ved å sende inn SendersReference, avgiver (Reportee), til og fra dato (CreatedAfterDate og CreatedBeforeDate), konkrete meldingsstatuser (CurrentStatus), samt hvorvidt det har blitt sendt varsel (NorificationSent).

For hver enkelt melding som passer til søkekriteriene tjenesteeier angir vil man få returnert følgende informasjon:
- ID for meldingen
- Når meldingen ble opprettet
- Avgiver meldingen tilhører
- Avsenders referanse (satt av tjenesteeier)
- Liste over statusendringer med tidspunkt
- Liste med varsler knyttet til meldingen, inkludert mottaker, tidspunkt for når varselet er sendt (om sendt) og varselskanal.

Statussjekk operasjonen kan også returnere status på det som er blitt forsøkt videresendt til Digital postkasse til innbygger. Statusinformasjon for post som er videresendt inneholder:
- ID for sikkert brev slik det er registrert i Altinn
- Unik ID for brevet slik det fremkommer i sikker digital post systemet.
- Når brevet ble opprettet
- Når status for brevet ble sist endret
- Avgiver brevet tilhører
- Avsenders referanse
- List med alle statusene brevet har hatt.

I tillegg til denne informasjonen returneres også tjenestekode og tjenesteversjonskode tilbake, samt en parameteren som angir om en grense for antall returmeldinger er nådd (LimitReached). Er grensen nådd må tjenesteeier spisse søket sitt, f.eks. ved å begrense tidsrommet, for å få hentet ut status for alle meldingene.

For flere detaljer rundt kontrakten for GetCorrespondenceStatusDetails vennligst se kapittel 9.4.5.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

|Tjeneste|Operasjon|Type|
|--------|--------|--------|
|Correspondence|GetCorrespondenceStatusDetails|Basic/WS/EC|

#### 8.3 Lenketjeneste
Formålet med en lenketjeneste er å overføre en bruker i Altinn til en annen nettside og er derfor alltid assosiert med en URL. Lenketjenester blir ikke instansiert i Altinn og er derfor ikke å finne i min meldingsboks i Altinn. For å kunne identifisere hvilken avgiver brukeren valgte å starte tjenesten med, sendes det med en nøkkel som den eksterne tjenesteportalen kan benytte for å spørre Altinn om informasjon om valgt avgiver. Det er også mulig å etterspørre informasjon om hvilke avgivere en bruker kan representere ved å benytte web service metoden GetReportees.

Lenketjenester defineres i TUL som de andre tjenestetypene slik at man kan sette autentiseringsnivå og autorisasjonsregler for start av tjenesten. Ekstern portal må verifisere at bruker faktisk skal ha tilgang til tjenestene portalen tilbyr, ved å benytte seg av Altinns XACML grensesnitt for ekstern autorisasjon.

For flere detaljer rundt kontrakten for GetReporteeByTempKey og GetReportees vennligst se henholdsvis kapittel 9.8.4 og 9.8.3. For mer informasjon om ekstern autorisasjon se kapittel 8.9.2 og 9.9.1.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

|Tjeneste|Operasjon|Type|
|--------|--------|--------|
|AuthorizationAdministration|GetReporteeByTempKey|WS/EC|
|AuthorizationAdministration|GetReportees|WS/EC|
|AuthorizationDecisionPointExternal|AuthorizeAccessExternal|WS|

#### 8.4	Formidlingstjenester
Formidlingstjenester handler om å transportere data fra en eller flere avgivere til en eller flere mottakere, hvor Altinn fungerer som mellommann som sørger for transport og infrastruktur. Altinn er sådan en passiv part i prosessen, og både avsender og mottaker må benytte grensesnitt tilgjengeliggjort av Altinn.

Innholdet i en formidlingstjeneste er data som er bestemt mellom aktørene som inngår i en formidlingstjeneste, og er ikke kjent av Altinn.

Formidlingstjenesten overføres fra avsender til mottaker, og tjenesteeiere benytter derfor ikke egne grensesnitt kun for tjenesteeiere for formidlingstjenesten, men benytter i stedet de samme grensesnitt som er tilgjengelig for alle brukere av Altinn. Se derfor Implementasjonsguide for sluttbrukersystemer for mer informasjon om hvordan disse grensesnittene skal benyttes.

Transport av data i en formidlingstjeneste kan gå via web service og SFTP kanal, både for opp- og nedlasting. Ved bruk av web service vil det være en funksjonell begrensning i størrelsen på filer som kan lastes opp og ned, satt til 1GB, mens grensen for SFTP-kanalen vil ligge på i underkant av 2GB.

Data som skal overføres over SFTP kanalen pakkes i en ZIP-fil med to forhåndsdefinerte Altinn XML filer for å definere metadata (manifest.xml) og mottakere (recipients.xml). Ved bruk av web service sendes først metadata og mottaker liste, før selve dataen overføres i en egen operasjon. Utover dette kan ZIP-filen i prinsippet inneholde hva som helst av data som må overføres til en eller flere aktører. Utover viruskontroll gjør ikke Altinn noen form for validering eller prosessering av denne dataen som forsendes, men sørger for at oppgitt metadata og mottakerinformasjon er korrekt og validerer, samt holder orden på kvitteringer og sporingsinformasjon om forsendelsen.

Formidlingstjenester er tenkt brukt primært for formidlinger:
- B2B (Business-to-Business), B2G (Business-to-Government), G2B (Government-to-Business), eller G2G(Government-To-Government)

Når en avsender laster opp en formidlingstjeneste vil Altinn verifisere metadata og mottakere. Når dette er gjort vil forsendelsen gjøres tilgjengelig for mottakere for nedlasting. Samtidig vil Altinn opprette en kvitteringshierarki med en hovedkvittering tilhørende avsender, samt en underkvittering per mottaker. Hver underkvittering vil inneholde status på nedlastingen for denne mottakeren. Alle kvitteringer vil være knyttet til referanse satt av avsender. Avsender og mottaker kan også utveksle ytterligere statustekst på disse kvitteringene gjennom web service. På denne måten kan avsender følge opp status for hver enkelt mottaker.

Tiden en formidlingstjeneste vil være tilgjengelig for nedlasting i Altinn vil kunne variere fra tjeneste til tjeneste og styres av tjenesteeier. Dette betyr at filene etter en viss tidsperiode vil bli slettet selv om filene ikke er lastet ned av en eller flere av mottakerne.

Formidlingstjenesten kan av tjenesteeier også settes opp til å benytte seg av et tjenesteeierstyrt rettighetsregister. Dette registeret kan begrense hvem som har tilgang til opp- og nedlasting av spesifikke tjenester, og styres av tjenesteeier. Se kapittel 8.12 for mer informasjon om dette registeret og hvordan dette styres. For formidlingstjenesten er det tjenesteeierstyrte rettighetsregisteret definert med følgende grunnleggende regler:
- For å kunne laste opp en formidlingstjeneste må avsender inneha «write»-rettigheten for formidlingstjenesten.
- For å kunne laste ned en formidlingstjeneste må mottaker inneha «read»-rettigheten for formidlingstjenesten.
I enkelte brukstilfeller er det i tillegg ønskelig at mottaker også skal kunne sende informasjon tilbake til avsender. For å unngå at alle mottaker da også får «write»-rettigheten, og på den måten kan sende til andre mottakere, benyttes feltet «condition» (betingelse) i det tjenesteeierstyrte rettighetsregisteret. For å støtte brukstilfellet har man derfor også følgende regler:
- En mottaker som kun skal kunne sende tilbake til en avsender av tjenesten må ha rettigheten «write», men da med «condition» satt til verdien «recipient». Denne betingelsen benyttes så i Altinn til å validere mottakerlisten, og kun brukere som har rettigheten «read» med «condition» satt til «sender» vil være godkjente mottakere. Dette er vist med Org D i figuren under som kun kan sende til Org A.
- Merk her at avsender med rettigheten «write» uten «condition» kan sende til en mottaker med rettighet «read» med «condition» satt til «sender». Dette er vist med Org B i figuren under som kan sende til samtlige andre mottakere.

Ved bruk av tjenestene som tilbys av tjenesteeierstyrt rettighetsregister (9.17) kan det bemerkes at parameteren «Party» ikke benyttes for formidlingstjenesten.

{{< figure src="/docs/images/guides/implGuideTjEier2.png" title="Figur 2 - Viser de ulike mulighetene for formidlingstjenesten som er gyldige og hvilke rettigheter og betingelser som trengs." >}}


Se også Vedlegg C: Flytdiagram for formidlingstjeneste for overordnet flyt ved bruk av formidlingstjeneste mellom avsender og mottaker.

#### 8.5 Innsynstjenester
Når en tjenesteeier ønsker å tilgjengeliggjøre et register for oppslag for brukere, men uten å ha tilgjengelig presentasjon for dette så kan det realiseres ved hjelp av en innsynstjeneste i Altinn.  Konseptuelt kan man se en innsynstjeneste som en kombinasjon av en innsendingstjeneste og en meldingstjeneste der hvor det ikke foregår noen behandling av den innsendte informasjonen.

En innsynstjeneste bygger på en Web Service eksponert fra tjenesteeierens side og kan benyttes av både portalbrukere og sluttbrukersystemer via Altinn som et mellomledd.

Innsynstjenester kan i TUL settes opp slik at tjenesteeier kan motta informasjon om brukere som har aktivert en innsynstjeneste. For dette kreves det at et forsendelsesoppsett settes opp i Altinn mot tjenesteeieren (ShipmentDefinition). Denne vil angi metode og overordnet mal (ShipmentOutboundTemplate) forsendelsen skal sendes på. Hver forsendelse består av den definerte malen, samt en eller flere forsendelses-deler som hver representerer en åpnet innsynstjeneste. En forsendelses-del følger et gitt format:

**Innsynstjeneste forsendelses-del (LookupServiceUseConfirmation)**
```XML
<LookupServiceUseConfirmation>
  <ServiceCode>
    <!--Angir innsynstjenestens tjeneste kode-->
  </ServiceCode>
  <ServiceEdition>
    <!--Angir innsynstjenestens tjeneste versjon kode-->
  </ServiceEdition>
  <ReporteeNumber>
    <!--Angir aktuell avgiver som aktiverer innsynstjenesten, fødselsnummer eller organisasjonsnummer-->
  </ReporteeNumber>
    <ReadDateTime>
    <!--Angir dato og tid når innsynstjenesten ble aktivert-->
  </ReadDateTime>
</LookupServiceUseConfirmation>
```
For mer informasjon om hvordan en innsendingstjeneste tilgjengeliggjøres i portal og for sluttbrukersystemer, se TR435 Brukerdokumentasjon for tjenesteutvikling.
### 8.6	Samhandlingstjenester
En samhandlingstjeneste er ikke som andre tjenestetyper i Altinn da oppgaven til denne er å sette sammen flere andre tjenestetyper til én logisk prosess for brukeren. Dette er uavhengig av om de underliggende tjenestetypene er rettet mot én eller flere tjenesteeiere.

Et eksempel på en samhandlingstjeneste kan være Skattedialog. Her kan man ha flere underliggende innsendingstjenester, meldingstjenester og innsynstjenester ovenfor Skatteetaten som knyttes sammen til én logisk forretningsprosess. Et annet eksempel vil kunne være Navnedialog. En samhandlingstjeneste som kan knytte sammen innsendingstjenester og meldingstjenester mot flere tjenesteeiere.

Samhandlingstjenester kan være definert av sluttbrukere (brukerdefinert samhandlingstjeneste – en samleside) eller av tjenesteeiere (tjenesteeierdefinert samhandlingstjeneste – en e-dialog). Den brukerdefinerte samhandlingstjenesten er predefinert i TUL av en tjenesteutvikler. Denne kan instansieres og til en viss grad tilpasses av sluttbruker i SBL. Tjenesteeiere definerer i sin helhet egne samhandlingstjenester ved hjelp av TUL. Disse blir deretter migrert til SBL i likhet med andre tjenestetyper. I integrasjonssammenheng er det de tjenesteeierdefinert samhandlingstjenestene som er interessante.

En instans av en samhandlingstjeneste har en unik Case ID tilknyttet – en saks id. Når det da refereres til en instans av en samhandlingstjeneste, beskrives det ved bruk av Case ID.

Følgende illustrerer mulighetsrommet for Samhandlingstjenester og en typisk kronologisk rekkefølge:

TUL:
1.	Definisjon av Altinn-tjenester med tjenestetype “Samhandlingstjeneste".

2.	Definisjon av tjenestesammensetning. Tjenester som kan velges til å inngå i en samhandlingstjeneste må være av typen innsynstjeneste, meldingstjeneste eller innsendingstjeneste.

3.	Definisjon av gjenbruk av data mellom deltakende tjenester i samhandlingstjenesten. Produsent og konsument av data settes opp. Merk at kun innsendingstjenester kan settes opp som konsument.

4.	Definisjon av en tilstandsmaskin som identifiserer forretningsprosessen som et logisk sett av tilstander sammen med tilhørende presentasjon i form av dialogsider (se punkt 5).

5.	Definisjon av hendelser som kan medføre en tilstandsovergang for samhandlingstjenesten. Betingelser kan knyttes til hendelsene slik at de må oppfylles før en tilstandsovergang kan skje. Hendelsene er typisk knyttet til stadier for de underliggende tjenestene som inngår i samhandlingstjenesten. Hendelser deles inn i forhåndsdefinerte og skreddersydde hendelser. De forhåndsdefinerte hendelse trigges automatisk i Altinn og består av følgende:

| Hendelses Navn | Tjenestetype |Portal|Sluttbrukersystem|Etatssystem|
|--------|--------|--------|--------|--------|
|    Instantiated    |     Innsendingstjeneste, Innsynstjeneste   |:white_check_mark:|:white_check_mark: | |
|Instantiated|Innsendingstjeneste, Meldingstjeneste| | |:white_check_mark:|
|Submitted|Innsendingstjeneste|:white_check_mark:|:white_check_mark:||
|Archived|Alle|:white_check_mark: |:white_check_mark: | |
|Opened|Meldingstjeneste, Innsynstjeneste|:white_check_mark:|:white_check_mark:| |
|Confirmed|Meldingstjeneste|:white_check_mark:|:white_check_mark:| |

Tabellen viser de forhåndsdefinerte hendelsene, hvilken tjenestetype de er relatert til, samt om de trigges fra portal, sluttbrukersystem eller etatssystem. For eksempel kan etatssystem instansiere innsendingstjenester eller meldingstjenester, og dermed kun trigge hendelsen Instantiated for disse.
Skreddersydde hendelser er hendelser definert av etat. Navn på disse hendelsene må defineres inn i tilstandsmaskinen (se punkt 3). Etaten kan kalle web service med hendelsen, både de forhåndsdefinerte og de skreddersydde, for å trigge en tilstandsovergang (se 8.6.1.6).

6.	 Opplasting av grafikkfiler til bruk i forhåndsdefinert dialogkomponent

7.	Definisjon av dialogsider for samhandlingstjenesten basert på et sett av 6 forhåndsdefinerte maler og 10 forhåndsdefinerte dialogkomponenter.

8.	Definisjon av merknadsmaler for samhandlingstjenesten. Etaten kan ved bruk av et eksternt grensesnitt (se 8.6.1.5) sette predefinert merknad på samhandlingstjenesten eller tilhørende underliggende tjenester.

9.	Oversettelse til flere språk (engelsk, bokmål og nynorsk) for språkstøttet tekst i samhandlingstjenesten.

10.	Migrering av samhandlingstjeneste til SBL. Alle underliggende tjenesteutgaver som inngår i samhandlingstjenesten må være migrert før selve samhandlingstjenesten kan migreres.

For mer informasjon om oppsett av en samhandlingstjeneste i TUL, vennligst se Brukerveiledning for TUL.

SBL:

1. Opprettelse av en sak (instansiering av en spesifikk utgave og versjon av samhandlingstjenesten definert i TUL og migrert til SBL)

2. Presentasjon av en sak til sluttbrukeren i et arbeidsområde i SBL, modellert for å gi støtte i prosessen relatert til samhandlingstjenesten med enkel tilgang til de underliggende tjenestene.

3. Muliggjøre for sluttbruker og sluttbrukersystemer å interagere med de underliggende tjenestene gjennom henholdsvis dialogsidene for samhandlingstjenesten eller ved hjelp av de eksterne grensesnittene.

4. Starte en tjeneste fra tjenestekatalogen som inngår som underliggende tjeneste til en samhandlingstjeneste, og deretter bli presentert med valget om man i stedet skal starte en ny eller åpne en eksisterende samhandlingstjeneste.

5. Forårsake tilstandsoverganger som følge av de definerte hendelsene for tilstandsmaskinen. 

6. Muliggjøre at tjenesteeierssystemer kan sende merknader til saken og underliggende forekomster av tjenesteutgavene som inngår i sakens samhandlingstjeneste.

7. Muliggjøre at tjenesteeierssystemer kan sende hendelser til den bestemte saken, eller til alle saker for en bestemt utgave og versjon av samhandlingstjenesten, gjennom eksternt grensesnitt.

Merk at en arkivert samhandlingstjeneste ikke vil være tilgjengelig i tjenesteeiers arkiv, kun i brukers arkiv.

#### 8.6.1 Tjenester i forhold til bruk av samhandlingstjenester
Nedenfor beskrives funksjonalitet for samhandlingstjenester som kan benyttes av tjenesteeiere.

#### 8.6.1.1 Instansier en samhandlingstjeneste
I de tilfellene en tjenesteeier ønsker å instansiere en samhandlingstjeneste (typisk knyttet til abonnementsinstanseriering) så kan en velge å instansiere en samhandlingstjeneste for en bruker/kunde.

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|CaseAgencySystem|InstantiateCollaborationAgencySystem|Basic/WS/EC|

Samtlige parametere i operasjonen unntatt visibleDateTime og dueDate må sendes inn for å få opprette en sak. visibleDateTime kan benyttes for å sette når samhandlingstjenesten vil være synlig for brukeren frem i tid, om denne ikke angis vil tjenesten være synlig umiddelbart.

Funksjonelt vil InstantiateCollaborationAgencySystem returnere en referanse til instansen som ble opprettet, caseID.  Denne caseID må benyttes av tjenesteeieren på andre tjenester som ønsker å kommunisere med den opprettede instansen. Skulle en time-out oppstå vil ikke samhandlingstjenesten instansieres siden tjenesten er transaksjonshåndtert.

For flere detaljer rundt kontrakten vennligst se kapittel 9.10.1, Tjenestekatalog og WSDL.

#### 8.6.1.2 Hente ut kjørende instanser av samhandlingstjenester
Hvis en tjenesteeier har valgt å ikke lagre case ID fra et tidligere grensesnitt (mottatt innsendingstjeneste eller instansiert samhandlingstjeneste) og mottar oppgaver på papir, så kan den utføre oppslag mot Altinn for å finne eventuelle saker (samhandlingstjenesteinstanser). Andre tilfeller der dette kan være aktuelt er hvis en annen tjenesteeier, eller brukeren selv, har instansiert samhandlingstjenesten.

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|CaseAgencySystem|GetCaseListAgencySystem|Basic/WS/EC|

GetCaseListAgencySystem kan brukes til to formål:
1. Hente ut caseID, tilstand og merknad for kjørende instanser av samhandlingstjenester for bestemt fødselsnummer/organisasjonsnummer (reporteeNumber), tjeneste (externalServiceCode) og tjenesteutgave (externalServiceEditionCode).

2. Hente ut caseID, tilstand og merknad for kjørende instanser av bestemt type samhandlingstjeneste basert på tjeneste (externalServiceCode) og tjenesteutgave (externalServiceEditionCode).

3. Hente ut tilstand og merknad for bestemt sak basert på fødselsnummer/organisasjonsnummer (reporteeNumber) og CaseID (caseID)
For punkt 1 og 2 må parametrene externalServiceCode og externalServiceEditionCode angis, mens parameter caseID må benyttes for punkt 3. Om parameter languageID ikke angis, eller forespurt språk ikke støttes vil språkavhengige returverdier returneres på tjenestens satte standardspråk. Alle andre parametere er obligatoriske og må angis.

Operasjonen returnerer informasjon om samhandlingstjenestens unike identifikator, CaseID, navnet på tjenesten, CaseName, og eventuelt om det er satt noen merknader på samhandlingstjenesten ved å returnere den unike identifikatoren, NoticeTemplateID. I tillegg returneres det informasjon om samhandlingstjenestens tilstand i form av visningsvennlig navn basert på språkparameter, CurrentStateFriendlyName, unik identifikator for tilstanden, CurrentStateID, og tilstandens navn, CurrentStateName. Alle disse er definert for tjenesten i TUL.

CaseID vil kunne benyttes i andre operasjoner mot Altinn, enten alene som for eksempel ved å instansiere en innsendingstjeneste som skal knyttes til samhandlingstjenesten via operasjonen SubmitAndInstantiatePrefilledFormTask (se 8.1.1 og 9.6.1), eller sammen med informasjon om tilstand til å registrere en hendelse for samhandlingstjenesten via operasjonen NotifyEventAgencySystem (se 8.6.1.6 og 9.10.3).

Vennligst observer at hvis en bruker har instansiert flere forekomster av samme samhandlingstjeneste så vil ikke bare én forekomst returneres og derfor må tjenesteeieren basert på tilstand og merknad kunne identifisere den riktige instansen. Rent teknisk kan også tjenesteeiere ha opprettet flere instanser av samme tjenesteutgave om ønskelig.
For flere detaljer rundt kontrakten vennligst se kapittel 9.10.2, Tjenestekatalog og WSDL.

#### 8.6.1.3 Knytte innsendingstjeneste til sak
En tjenesteeier kan forhåndsinstansiere en innsendingstjeneste for en bruker og samtidig knyttet denne til en løpende sak.  Dette gjøres ved å sende med den valgfrie parameteren Case ID i operasjonskallet for operasjonen SubmitAndInstantiatePrefilledFormTask.
For mer informasjon se Innsendingstjenester (8.1) og operasjonen SubmitAndInstantiatePrefilledFormTask (9.6.1).

#### 8.6.1.4 Knytte meldingstjeneste til sak
En tjenesteeier kan velge å knytte en meldingsatjeneste til en løpende sak. Dette gjøres ved at den valgfrie parameteren Case ID benyttes i operasjonskallet for meldingstjenesten.
For mer informasjon se Meldingstjenester (8.2) og operasjonen InsertCorrespondenceV2 (9.4.1).

#### 8.6.1.5 Sett merknad på sak eller underliggende tjeneste
Ved å sette merknader på tjenester, kan tjenesteeier formidle informasjon til sluttbruker om samhandlingstjenester. 
**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|CaseAgencySystem|SetNoticeAgencySystem|Basic/WS/EC|

Obligatorisk parameter reporteeElementID angir hvilken sak (Case ID), eller tilordnet tjeneste (innsendingstjeneste, meldingstjeneste, innsynstjeneste (kun arkivert)) merknaden skal settes på. Settes merknad på en tilordnet tjeneste som er arkivert (innsendingstjeneste, meldingstjeneste eller innsynstjeneste) må identifikatoren prefikses med AR. Identifikatoren for samhandlingstjenesten kan ha blitt mottatt fra InstantiateCollaborationAgencySystem, en arkivert innsendingstjeneste, eller den kan hentes ved bruk av GetCaseListAgencySystem.

Alle maler (templates) for merknader må forhåndsdefineres av tjenesteeier på samhandlingstjenesten i tjenesteutviklingsløsningen og refereres til i kallet sammen med key-value par for variabler til merknaden. Mal defineres gjennom obligatorisk parameter NoticeTemplateID. Angis det feil mal eller nøkkel for samhandlingstjenesten vil feilmelding returneres.
For flere detaljer rundt kontrakten vennligst se kapittel 9.10.4, Tjenestekatalog og WSDL.

#### 8.6.1.6 Sende hendelse til sak
Tjenesteeier kan påvirke tilstanden for en samhandlingstjeneste ved å registrere en ny hendelse (Event). Et eksempel hvor dette er nyttig er dersom tjenesteeier har mottatt informasjon via en annen kanal enn Altinn (f.eks. ved papirbasert innrapportering), og derfor ønsker å flytte samhandlingstjenesten til neste tilstand.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|CaseAgencySystem|NotifyEventAgencySystem|Basic/WS/EC|

Denne operasjonen tar en entitet av typen StateMachineEventNotificationBE som input. Denne inneholder som de fleste andre for samhandlingstjenester CaseID parameteren som da unikt identifiserer en samhandlingsinstans hendelsen gjelder. Alternativt kan tjenesteeier velge å heller spesifisere tjeneste og tjenesteutgave, via parametrene ExternalServiceCode og ExternalServiceEditionCode. I det tilfellet vil hendelsen internt i Altinn bli kommunisert til alle kjørende instanser for kombinasjonen av nevnte tjeneste og tjenesteutgave. Til sammenligning vil hendelser som skjer innad i Altinn-løsningen kun kommuniseres til den saken som trigget hendelsen.

I de tilfellene saken er opprettet av bruker selv eller av annen tjenesteeier vil man kunne hente saks id for bestemt samhandlingstjeneste (tjeneste og tjenesteutgave) vha GetCaseListAgencySystem som beskrevet i 8.6.1.2, eller eventuelt fra en allerede innsendt innsendingstjeneste knyttet til saken.

Event er obligatorisk parameter for operasjonen som angir hendelsen, mens ReporteeElementID er valgfri og benyttes kun i loggsammenheng i Altinn for å knytte hendelsen opp mot et subelement (dette kan for eksempel være en identifikator for en arkivert innsendingstjeneste tilknyttet samhandlingstjenesten). Hendelsen som skal sendes bør sees i sammenheng med tilstandsmaskinen for den aktuelle samhandlingstjenesten, og de hendelser som er definert der. Merk at en hendelse ikke nødvendigvis vil trigge en tilstandsendring; følgende vil være avgjørende:

1. Er hendelsen aktuell for samhandlingstjenestens nåværende tilstand?

2. og, finnes betingelser knyttet til hendelsen som ikke er oppfylt?

Om 1. eller 2. blir evaluert til false vil det ikke skje en tilstandsendring. Tilstander, hendelser og eventuelle betingelser er alle definert i TUL for samhandlingstjenesten.

Operasjonen returnerer en liste av StateMachineNotificationResultBE. En liste returneres om hendelsen blir sendt til flere samhandlingsinstanser basert på parametrene ExternalServiceCode og ExternalServiceEditionCode. Om hendelsen kun sendes til en samhandlingstinstans vil kun en entitet returneres. StateMachineNotificationResultBE angir identifikator for samhandlingstjenesten resultatet gjelder for (CaseID), hvorvidt det skjedde en tilstandsendring (IsStateChanged) og dens navn (CurrentStateName). I tillegg angis evt betingelse (ConditionName) og evalueringen av betingelsen (ConditionEvaluationResult). Om det skulle oppstå en feilsituasjon i tilstandsmaskinen vil parameteren HasException være angit som true. Feilinformasjon og feilkode vil da ligge i henholdsvis ExceptionDetail og ErrorCode.

For flere detaljer rundt kontrakten vennligst se kapittel 9.10.2, Tjenestekatalog og WSDL.

#### 8.6.2 Eksempler på bruk av tjenestegrensesnitt for samhandlingstjenester
De påfølgende avsnittene viser eksempler på bruka av samhandlingstjenester.
#### 8.6.2.1 Brukerinstansiert samhandlingstjeneste med én etat
Dette eksempelet viser en enkel samhandlingstjeneste som er definert i TUL og som blir instansiert av brukeren.

Tilstandsmaskinen består av to tilstander og det er definert gjenbruk av data mellom en meldingstjeneste og siste innsendingstjeneste. Selve kopieringen av data foregår idet innsendingstjenesten instansieres.

{{< figure src="/docs/images/guides/implGuideTjEier3.png" title="Figur 3 - Brukerinstansiert samhandlingstjeneste med gjenbruk av data" >}}

#### 8.6.2.2 Etatsinstansiert samhandlingstjeneste med én etat.
Dette scenarioet beskriver en samhandlingstjeneste som Skattedialogen hvor etat tar initiativ og instansierer første innsendingstjeneste for brukeren.

{{< figure src="/docs/images/guides/implGuideTjEier4.png" title="Figur 4 - Etatsinstanisert samhandlingstjeneste" >}}

I forhold til forrige eksempel så er eneste forskjellen de to første kallene. Deretter fungerer systemdialogen på samme måte. I tillegg bør det nevnes at gjenbruk av data ikke kan benyttes når etaten instansierer innsendingstjeneste. Dette må i stedet løses på etatens side før innsendingstjeneste instansieres.

#### 8.6.2.3 Brukerinstansiert samhandlingstjeneste med to etater med kanaluavhengighet
I dette eksempelet så vil en bruker velge å sende inn på papir mens selve samhandlingstjenesten er blitt startet i Altinn.

{{< figure src="/docs/images/guides/implGuideTjEier5.png" title="Figur 5 - Brukerinstansiert samhandlingstjeneste med to etater med kanaluavhengighet" >}}

I dette eksempelet starter samhandlingstjenesten som i første scenario, men deretter velger en bruker å sende inn på papir.  Etat 2 vil da bruke oppslagstjenesten knyttet til samhandlingstjenesten og deretter finne riktig samhandlingstjeneste.  Deretter vil tilstandsmaskinen bli "oppdatert" med at oppgave er innsendt og fortsette som før.

### 8.7 Kvitteringer
For alle forsendelser inn og ut av Altinn skapes eller oppdateres en kvittering. Kvitteringer bidrar til at tjenesteeier kan får større innsikt i livsløpet fra f.eks. opprettelse av innsending til mottak av arkivert innsendingstjeneste. Kvitteringene skaper også bedre sporbarhet i Altinn løsningen.

For formidlingstjenester vil det lages en hovedkvittering for den som laster opp en fil og en underkvittering for hver mottaker av filen. Hovedkvittering med underkvittering kan på den måten brukes til å danne et komplett bilde av opplasting og nedlastinger.Dette kan også benyttes som en enkel kommunikasjonskanal ved at deltakere på forsendelsen kan oppdatere kvitteringen de har fått tildelt med en ny tekst og status.

For samhandlingstjenester vil det ikke bli generert kvitteringer da disse ikke arkiveres til tjenesteeiers arkiv. Frittstående varsel vil heller ikke generere kvitteringer. For innsynstjenester vil tjenesteeier kunne motta kvittering for bruk av tjenesten og arkivering av tjenesten. Tjenesteutvikler vil kunne velge om det skal sendes kvittering i disse to tilfellene.

For å muliggjøre dette kreves det at tjenesteeier markerer sine forsendelser inn til Altinn med referanser som lagres på kvitteringen. Samme referanse benyttes ved oppslag/kvittering. 

Eksempler

a)	Ved satsvis innsending av abonnementsdata benyttes xml elementet ServiceOwner/Subscription/ExternalShipmentReference for angivelse av referanse.

b)	Ved sanntid overføring av abonnementsdata benyttes parameteren externalBatchId i web service metoden SubmitSubscription for angivelse av referanse.

Se xsd referanse for aktuell dataoverføring i kapittelet om Grensesnitt – batch til Altinn, for detaljer om plassering av referanse ved satsvis overføring. For overføring i sanntid henvises det til den aktuelle web service i kapittelet om Grensesnitt – web services.

Mulige kvitteringsoperasjoner:
- Hente kvitteringer for innsendte data
- Kvittere for mottak av data
- Hente lister med kvitteringer

Kvitteringsinformasjon kan kun hentes i sanntid.
For å søke opp kvitteringer brukes GetReceiptList. Har mann SendersReference evt ExternalShipmentReference vil dette spisse søket. De fleste referanser vil fungere i søkefunksjonaliteten.

For flere detaljer rundt kontrakten for GetReceipt, GetReceiptList og SaveReceipt vennligst se henholdsvis kapittel 9.3.1, 9.3.2 og 9.3.3, Tjenestekatalog og WSDL.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|Receipt|GetReceipt|Basic/WS/EC|
|Receipt|GetReceiptList|Basic/WS/EC|
|Receipt|UpdateReceipt|Basic/WS/EC|

### 8.8 Frittstående varsel
Tjenesteeier kan velge å sende frittstående varsler til personbrukere og enheter i Altinn. Dette er varsler som kan sendes til fødselsnummer eller organisasjonsnummer uten at varselet trenger å være tilknyttet en meldingstjeneste, prefill, eller utsendelse av PIN.

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|NotificationAgencyExternal|SendStandaloneNotification|Basic/WS/EC|
|NotificationAgencyExternal|SendStandaloneNotificationV2|Basic/WS/EC|
|NotificationAgencyExternal|SendStandaloneNotificationV3|Basic/WS/EC|

Operasjonen SendStandaloneNotification benyttes for å sende de frittstående varslene. Denne operasjonen kan sende et konfigurerbart antall varsler til forskjellige brukere. For å gjøre dette benyttes parameteren standaloneNotifications som kan inneholde flere StandaloneNotification (en per varsel). For hvert varsel må følgende angis:

- ReporteeNumber angir fødselsnummer eller organisasjonsnummer varselet skal sendes til, den kan brukes til å slå opp mottakeradresse for varselet i brukerens kontaktprofil (privat samtykke) i tilfelle fødselsnummer, eller angitte kontaktpersoner på enhetsprofilen i tilfelle organisasjonsnummer.

- Service med parameterene ServiceCode og ServiceEdition fungerer som et filter på ReporteeNumber for organisasjonsnummer. Dersom disse er angitt vil varsel opprettes for de kontaktpersoner på enhetsprofilen som har satt opp at de vil motta varsel for den angitte tjenesten eller har satt opp at de vil motta alle varsler for organisasjonen, dersom de er autorisert mede lesetilgang for tjenesten for organisasjonen.

- ReceiverEndPoints benyttes til å angi en eller flere måter varselet skal sendes på (TransportType), SMS eller Email. Eventuelt kan også ReceiverAddress benyttes til å definere hvor det skal sendes, typisk da e-post adresse eller mobiltelefonnummer. Om ikke denne angis vil Altinn benytte ReporteeNumber og se etter kontaktinformasjon i brukerens eller enhetens profil.

- LanguageID og NotificationType vil sammen definere hvilken mal som skal benyttes for varselet. Denne må være forhåndsdefinert i databasen.

- TextTokens med parameteren TokenValue kan benyttes hvis valgt mal har substitusjoner definert. Substitusjoner blir gjort basert på rekkefølgen TokenValue blir angitt i forespørselen. Substitusjonene som varselsmalen har må begynne på 0 og fortsette oppover. Parameteren TokenNum har for tiden ingen funksjon og kan utelates.

FromAddress strengen angir fra adresse når transport type er e-post (må være på gyldig e-post format). Denne er valgfri, og hvis ikke angitt vil det for e-post varsler bli brukt en standard Altinn e-post adresse. ShipmentDateTime parameteren kan benyttes hvis varselet ønskes sendt på et senere tidspunkt, hvis ikke angis vil varselet sendes umiddelbart.

SendStandaloneNotification tjenesten fantes i to tidligere versjon i tillegg til nyeste versjon (Versjon 3), hvorav:
Versjon 1; Operasjonen returnerer ingen verdi, kun feilmeldinger.
Versjon 2; Operasjonen returnerer en streng med mottakere som var reservert mot varsel, med enten en «varsel feilet» eller «varsel feilet delvis» melding. Varsel vil ses på som feilet dersom alle mottakkere var reservert og delvis feilet dersom noen, men ikke alle, mottakkere var reservert mot varsel.
Versjon 3; Operasjonen returnerer et resultat-objekt SendStandAloneNotificationResult som inneholder samme return melding som fra Versjon 2, og en liste med resultater for de varsler som ble levert. I disse resultatene er følgende angitt:
- NotificationType inneholder NotificationType fra det originale varselet som ble levert. Brukes til å identifisere hvilket levert varsel resultatet tilhører.

- ReporteeNumber inneholder ReporteeNumber fra det originale varselet som ble levert. Brukes til å identifisere hvilket levert varsel resultatet tilhører.

- EndPoints er en liste med mottakere som mottok varsel. Hvert mottakker objekt inneholder følgende verdier:

 -  Name er navn på mottaker der dette er tilgjengelig.
 - ReceiverAddress er addressen varselet vil leveres til.
 - TransportType er hva slags transport varsel levers på.
 - RetrieveFromProfile beskriver om mottakker ble hentet fra en organisasjon eller brukers profil.

For flere detaljer rundt kontrakten vennligst se kapittel 9.11.1, Tjenestekatalog og WSDL.

### 8.9 Autorisasjonsfunksjonalitet for tjenesteeiere
Altinn 2 versjon 2 tilbyr at eksterne løsninger kan benytte Altinn som autorisasjons komponent.  Dette betyr at eksterne system kan definere eksterne ressurser og regler tilknyttet disse. Deretter kan eksterne systemer verifisere at bruker har tilgang til ressurs.  Tjenestene kan aksesseres fra tjenesteeierssystem fra gyldig ip-adresse. 

Verifiseringstjenesten kan også benyttes til å autentisere en brukers tilgang til tjenesteeiers tjenester. Denne typen verifisering benytter de autorisasjonsregler som er definert på tjenesten i TUL.

#### 8.9.1 Importere eksterne regler
Tjenesteeiere har mulighet til å importere eksterne ressurser og regler som senere kan benyttes eksternt til å avgjøre tilgang ved hjelp av tilgangsmekanismenen i Altinn.

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|AdministrationExternal|ImportAuthorizationPolicy|WS|

ImportAuthorizationPolicy er operasjonen som tjenesteeiers system kan benytte for å importere de eksterne policyene. Operasjonen tar en XML streng som input parameter. Denne XML strengen må følge det standardiserte formatet XACML
For flere detaljer rundt kontrakten vennligst se kapittel 9.8.1, Tjenestekatalog og WSDL.

#### 8.9.2 Ekstern autorisasjon
Tjenesteeierne har etter å ha importert eksterne regler muligheten for å gjøre kall mot Altinn for å benytte Altinns autorisasjonskomponent for autorisasjonsavgjørelser. Altinn vil motta forespørsel og ta en avgjørelse basert på de eksterne reglene og ressursene som er lagt inn. Regler som er satt i TUL på en tjeneste er også tilgjengelig for tilsvarende verifisering for å sjekke en brukers tilgang til tjenesten.

AuthorizationDecisionPointExternal er tjenesten i Altinn II som har ansvaret for alle avgjørelser rundt autorisasjon basert på regler og roller i Altinns autorisasjonskomponent. Operasjonen AuthorizeAccessExternal tar imot en forespørsel på XACML format.

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|AuthorizationDecisionPointExternal|AuthorizeAccessExternal|WS|

For flere detaljer rundt kontrakten vennligst se kapittel 9.9.1, Tjenestekatalog og WSDL.

#### 8.9.3 Hente roller
GetRoles er tjenesten i Altinn II som tjenesteeiere kan bruke til å hente ut roller etter angitte søkekriterier i søkeobjektet.

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|AdministrationExternal|GetRoles|WS|

For flere detaljer rundt kontrakten vennligst se kapittel 9.8.2, Tjenestekatalog og WSDL.

#### 8.10 Uthenting av tiltrodd tredjeparts logg
Tjenesteeiere vil ha muligheten til å hente ut logg over alle hendelser for innsendte innsendingstjenester.

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|TTPArchiveAgencyExternalBasic|GetAuditTrailBasic|Basic|

Operasjonen GetAuditTrailBasic benytter enten parameteren ReporteeNumber eller Username for å identifisere for hvilken bruker eller organisasjon det skal hentes ut for. Reportee parameteren kan da enten være et fødselsnummer eller et organisasjonsnummer, avhengig av hva man ønsker. Parameter Username brukes når man vil angi hente basert på brukervalgt brukernavn.

Videre må parametrene FromDate og ToDate benyttes for å begrense søket – begge er obligatoriske. For å snevre søket ytterligere kan eventuelt parametrene ExternalServiceCode og ExternalServiceEditionCode benyttes.

Operasjonen vil returnere en eller flere elementer (TTPElementBE) som angir den interne ReporteeElementID’en, resultat av integritetssjekk (IntegrirtyCheck), samt et XML element (TTPData) som vil inneholde log dataen som er registrert for den aktuelle innsendingen.

For flere detaljer rundt kontrakten vennligst se kapittel 9.12.1, Tjenestekatalog og WSDL.

### 8.11 Sluttbrukers meldingsboks 
En sluttbruker som logger inn i Altinn, vil kunne se en liste med sine tjenesteelementer på siden Min meldingsboks. Det er mange muligheter for å filtrere innholdet i listen, og hvert element kan åpnes på en separat side.

En tjenesteeier har mulighet til å presentere innholdet i sluttbrukers meldingsboks i sin egen portal/selvbetjeningsløsning. Forutsetningen er at sluttbrukeren er autentisert og føderert fra IDPorten. Uthenting av sluttbrukers meldingsboks fra Altinn kan være aktuelt for tjenesteeiere som ønsker å tilby et "min side"-konsept i sin egen løsning, uten å synliggjøre at tjenestene er implementert i Altinn.

#### 8.11.1 Presenter innhold i sluttbrukers meldingsboks – Altinn API

For detaljer om hvordan innhold i sluttbrukers meldingsboks i Altinn kan presenteres i tjenesteeieres egen selvbetjeningsløsning/portal henvises det til detaljert informasjon om Altinn API som finnes på Altinnett:https://altinnett.brreg.no/Altinn-API

### 8.12 Tjenesteeierstyrt rettighetsregister
Tjenesteeierstyrt rettighetsregister er innført som en ytterligere mulighet for tjenesteeiere å spesifisere hvem som skal ha tilgang til ulike tjenester i Altinn. Registeret vil kunne benyttes på toppen av eksisterende rolle- og rettighetsfunksjonalitet. Registeret benyttes foreløpig kun for formidlingstjenester. 

Bruk av registeret vil introdusere en ekstra sjekk på hvorvidt en konkret bruker har mottatt nødvendige rettigheter av tjenesteeieren til å benytte seg av en spesifikk tjeneste. Informasjon som legges inn i registeret er nøkkelinformasjon om brukeren, tjenestekoder, og rettighet. Konkret funksjonalitet og effekt av operasjoner i registeret vil være avhengig av tjenestetype.

Registeret i Altinn tilbyr 3 operasjoner for å hente ut, legge til og slette regler. GetRights operasjonen vil returnere hvilke regler som ligger i registeret, AddRights og DeleteRights er operasjoner for å henholdsvis legge til nye og slette eksisterende regler. Begge de to sistnevnte operasjonen vil returnere en liste med reglene som kom inn sammen med en status for resultatet av endringen for hver regel. Operasjonen er beskrevet i mer detalj i kapittel 9.17.1, 9.17.2 og 9.17.3.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|RegisterSSRAgencyExternal|GetRights|Basic/WS/EC|
|RegisterSSRAgencyExternal|AddRights|Basic/WS/EC|
|RegisterSSRAgencyExternal|DeleteRights|Basic/WS/EC|

### 8.13 BatchLogging
Tjenesteeiere som har levert inn data filer-til behandling har mulighet til å sjekke status og historikk ved å bruke BatchLogging tjenesten i Intermediary.

| Tjeneste | Operasjon |Type|
|--------|--------|--------|
|BatchLoggingAgencyExternal|GetStatusOverview|Basic/WS/EC|
|BatchLoggingAgencyExternal|GetDetailedStatus|Basic/WS/EC|
|BatchLoggingAgencyExternal|GetDataItem|Basic/WS/EC|

Status henting er delt opp i 3 nivåer.

GetStatusOverview henter ut en liste med alle DataBatcher (en levert fil er en DataBatch) som er behandlet basert på søke-kriteria som Tjenesteeier leverer. Denne listen inneholder metadata for filen, og antall feil som er opplevd under behandling av filen.

GetDetailedStatus henter ut tre lister. Listen med DataBatcher som er blitt behandlet, en liste med de DataItems (Xml objektene som filen består av) som har opplevd feil under behandling og en liste med Issues som er opplevd under behandling. Et Issue refererer til DataItem og DataBatch med en Id verdier, som kan brukes til å referere mellom listene. DataItem listen vil ikke inneholde rå Xml-data.

GetDataItem henter ut et enkelt DataItem basert på Id. DataItem inneholder metadata og rå Xml-data.

### 9 Grensesnitt – web services
Her følger et uttrekk over hvilke web services som tilbys i Altinn. Tjenestene er beskrevet uavhengig av hvilken autentiseringsmetode den enkelte tjenesteeier ønsker å benytte. Se avsnitt om Autentisering og autorisering, for informasjon om metodenavn.

For ytterligere informasjon for web services henvises leser også til Tjenestekatalogen og de enkelte tekniske spesifikasjoner tilgjengelig som WSDL’er fra respektive endepunkt.

Se Vedlegg A: Feilkoder i Altinn for en liste over mulige feilkoder i Altinn.

#### 9.1 ArchiveCommon
Tjenesten ArchiveCommon inneholder operasjoner for uthenting av arkivdata fra tjenesteeiers arkiv.

Påfølgende kapittel beskriver tjenesteoperasjonen for denne arkivtjenesten.

#### 9.1.1	GetServiceOwnerArchiveReporteeElementsV2
Denne operasjonen benyttes for å hente ut data for en gitt avgiver (privatperson eller foretak) fra en tjenesteeiers arkiv. Data kan være skjemasett arkivert i nåværende eller tidligere versjoner av Altinn, eller meldinger sendt fra tjenesteeier til avgiver. Merk at siden samhandlingstjenester og innsynstjenester ikke arkiveres til tjenesteeiers arkiv vil de ikke kunne hentes ut på denne måten. Kun elementer som innlogget bruker har tilgang til returneres, typisk ikke elementer for tjenester tilknyttet andre tjenesteeiere.

Det er for eksempel nødvendig å kunne ha direkte tilgang til disse dataene i tilfeller hvor tjenesteeier ønsker å veilede en avgiver i sanntid basert på avgivers arkiverte data. 

Tjenesteeier får rutinemessig tilsendt alle arkiverte elementer for alle avgivere via batch-grensesnittet Innsendingstjenester.

Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen:

| Input| Beskrivelse|
|--------|--------|
|SearchServiceOwnerArchive|Objektet av typen ExternalSOASearchBE, som inneholder søkeparametre for uthenting av elementer fra tjenesteeiers arkiv.|
|languageID|Språk id: 1033 Engelsk 1044 Bokmål 2068 Nynorsk. Språk angitt på arkivert element benyttes uavhengig av hva som settes.|

| Returverdi| Beskrivelse|
|--------|--------|
|ServiceOwnerArchiveReporteeElementList|Liste med objektet av typen ServiceOwnerArchiveReporteeElementBEV2, som inneholder elementer fra tjenesteeiers arkiv som tilfredsstiller angitte søkeparametre.|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.
**ExternalSOASearchBE**

| Property| Beskrivelse|
|--------|--------|
|SSNOrOrgNumber|Fødselsnummer eller organisasjonsnummer|
|ReferenceId|Unik referanse id|
|Subject|Hvilket emne søket gjelder|
|DateFrom|Fra dato i arkivet|
|DateTo|Til dato i arkivet|
|CaseID|Identifikator for samhandlingstjeneste elementet skal tilhøre|
|UserName|Søk basert på brukernavn|

**ServiceOwnerArchiveReporteeElementBEV2**

| Property| Beskrivelse|
|--------|--------|
|Subject|Emne for elementet|
|IsSubjectMessageTitle|Angir om tittel er satt av MessageTitle|
|LastChangedDate|Dato for siste endring|
|DatReporteeId|Intern id|
|SSNOrOrganizationNumber|Fødselsnummer eller organisasjonsnummer tilknyttet arkivert element|
|ReporteeName|Navn på avgiver som eier arkivert element|
|ReporteeElementId|Intern id|
|Altinn1ArchiveUnitId|Intern id fra AltinnI arkivet. Kan være tomt|
|Altinn1AMReference|AM referansen fra AltinnI arkivet. Kan være tomt|
|Altinn1FormCode|Skjemanummer fra AltinnI arkivet. Kan være tomt|
|EndUserSystemId|Id for sluttbrukersystem. Kan være tomt|
|SendComplete|Hvorvidt forsendelsen er komplett eller ikke for elementet. Kan være tomt|
|ElementType|Element type:	Archive, Active, Correspondence, ArchiveCorrespondence, LookUp, Collaboration|
|IsAltinn1|Flagg som indikerer om elementet eksisterer i AltinnI|
|IsCorrespondenceConfirmationRequired|Hvorvidt meldingsbekreftelse er påkrevd eller ikke|
|ArchiveReference|Referansen fra Altinn arkivet.|
|SystemTypeName|Typenavn på sluttbrukersystem. Kan være tomt|
|ExpiryDate|Angir eventuelt når elementet er planlagt slettet|

### 9.2 ServiceOwnerArchive
Tjenesten ServiceOwnerArchive inneholder operasjoner for uthenting av elementer fra tjenesteeiers arkiv (ikke tilgang til arkiverte elementer fra tidligere versjoner av Altinn).

Påfølgende kapitler beskriver operasjonen for denne tjenesten.

### 9.2.1 GetArchivedFormTaskV2
Denne operasjonen benyttes for å hente ut alle skjemaer og vedlegg som tilhører et gitt skjemasett. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen:

| Input| Beskrivelse|
|--------|--------|
|reporteeElementId|Unik identifikator for skjemasettet som skal hentes. Identifikatoren er obligatorisk input til tjenesten|
|languageID|Språk kode: 1033 Engelsk, 1044 Bokmål, 2068 Nynorsk|

| Returverdi| Beskrivelse|
|--------|--------|
|ArchivedFormTask|Objektet av typen ArchivedFormTaskBEV2 som skjemasettet som tilfredsstilte det gitte søkekriteriet.|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

**ArchivedFormTaskBEV2**

|Property|Beskrivelse|
|--------|--------|
|reporteeElementId|Unik identifikator for skjemasettet.|
|LastChanged|Tidspunkt for når det sist ble gjort endringer på skjemasettet|
|ReporteeID|Intern id.|
|ArchivedDateTime|Tidspunkt for når skjemasettet ble arkivert|
|ServiceOwner|Unik identifikator for tjenesteeier for skjemasettet|
|InvoiceInformation|Eventuell betalingsinformasjon som er vedlagt skjemasettet|
|ArchivedFormList|Liste med ArchivedFormBE-objekter (nærmere beskrevet nedenfor), som inneholder alle skjemaene i skjemasettet|
|ExternalServiceCode|Tjenestekode|
|ExternalServiceEditionCode|Tjenesteutgavekode|
|ssnOrgNumber|Fødselsnummer eller organisasjonsnummer tilhørende skjemasettet|
|PasswordEncryptedSymmetricKey|Passordkryptert symmetrisk nøkkel for å dekryptere eventuell sensitive felter|
|SOEncryptedSymmetricdKey|Samme symmetriske nøkkel som over, men kryptert med tjenesteeiers sertifikat. Tjenesteeier kan da bruke privat nøkkel til å dekryptere denne nøkkelen|
|ArchiveTaskList|Liste med arkiv-objekter av typen ArchiveTaskBEV2|

**ArchivedFormBE**

|Property|Beskrivelse|
|--------|--------|
|FormID|Intern id|
|FormName|Navn på skjema|
|FormDataXML|Innhold i skjema. Må legges i en CDATA blokk|
|ParentReference|Referanse til hovedskjema. Denne referansen er kun satt dersom gjeldende skjema er et underskjema|
|FormPresentationFieldValue|Presentasjonsfelt for skjemaet, dersom dette finnes.|
|PaymentInformationE2B|Betalingsinformasjon på E2B-format|
|PaymentInformationHTML|Betalingsinformasjon på XML-format|
|DataFormatId|Id til skjema fra metadata kilde|
|DataFormatVersion|Betalingsinformasjon vedlagt skjema|
|FormPaymentInfo|Skjemabeskrivelse|

**ArchivedAttachmentBEV2**

|Property|Beskrivelse|
|--------|--------|
|AttachmentID|Intern Id|
|AttachmentFunctionType|Angir hvilken funksjonstype vedlegget utgjør: Invoice, Unspecified|
|AttachmentName|Navn på vedlegg|
|MimeTypeName|Angir MIME-typen for vedlegget: application_none, application_pdf, application_msword, application_vnd_ms_excel, application_vns_oasis_opendocument_text, application_vnd_oasis_opendocument_presentation, application_vnd_oasis_opendocument_spreadsheet, application_rtf, application_vnd_ms_powerpoint, application_postscript, application_zip, text_plain, text_html, text_xml, text_rtf, text_richtext,	binary_octet_stream, not_Applicable|
|CreatedByUserID|Intern Altinn identifikator på bruker som har lagt til vedlegget|
|CreatedDateTime|Dato for når vedlegget ble opprettet|
|IsAddedAfterFormFillin|Angir om vedlegget ble lagt til i løpet av signeringen (etter utfylling)|
|IsEncrypted|Angir om vedlegget er kryptert|

**ArchivedFormTaskSigningStepBEV2**

|Property|Beskrivelse|
|--------|--------|
|SignatureID|Intern Id|
|SignedByUser|Intern id bruker som har signert skjemasettet|
|SignedByUserSSN|Fødselsnummer til bruker som har signert|
|SignedByUserName|Navn på bruker som har signert skjemasettet.|
|CreatedDateTime|Dato og tidspunkt for når skjemasettet ble signert|
|Signature|Signaturen, binært format|
|SignatureText|Signeringsteksten|
|RequiresGroupSigning|Angir om signatur gjelder for alle elementer i skjemasettet|
|AuthenticationLevelID|Intern id for autentiseringsnivået for bruker når signering ble gjort|
|AuthenticationMethod|Autentiseringsnivået for bruker når signering ble gjort|
|CertificateIssuedByName|Navnet sertifikatet er utstedt til|
|CertificateIssuedForName|Navnet signaturen er utstedt til|
|CertificateValidFrom|Tidspunkt (dato og klokkeslett) for når sertifikatet er gyldig|
|CertificateValidTo|Tidspunkt (dato og klokkeslett) for når sertifikatet blir ugyldig|
|SignedAttachmentList|Liste over signerte vedlegg.|
|SignedFromList|Liste over signerte skjemaer|
|IsSigningAllRequired|Angir om signering er utført for alle elementer i skjemasett: YES – signering på alle skjema,	NO – valgfri signering på skjema, SET_PER_FORM – valg for signering satt på skjema nivå|
|ProcessStepID|Den unike identifikatoren for steget signaturen gjelder for|

**ArchiveTaskBEV2**

|Property|Beskrivelse|
|--------|--------|
|EndUserSystemID|Sluttbrukersystem identifikator|
|LastChanged|Angir dato for sist endring|
|NumberOfSignaturesAdded|Antall signaturer som er lagt til|
|ProcessStepID_FK|Intern ID for prosessteg|
|SentComplete|Angir om element ble sent som komplett fra sluttbrukersystem|
|TaskID|Identifikator for elementet, samme som ReporteeElementID|
|UserDefinedNumberOfSignaturesRequired|Antall signaturer krevd for et evt brukerstyrt signeringssteg|
|WorkflowReference|Intern ID forarbeidsflyt|

#### 9.2.2 GetArchiveShipmentStatusV2
Denne operasjonen benyttes for å hente ut status på oversending fra Altinn til Tjenesteeier for et arkivert skjema.
Man kan hente ut status ved å bruke enten ArchiveReference eller ServiceReference. Disse kan ikke brukes samtidig. Operasjonen er versjonert, gjeldende versjon er V2.
Tabellen under beskriver datakontrakten for operasjonen:

|Input|Beskrivelse|
|--------|--------|
|ArchiveReference (string)|Tar inn en ArkivReferanse for et arkivert element. Når dette elementet er brukt skal ikke ServiceReference brukes.|
|ServiceReference (objekt)|Inneholder en liste med ArchiveShipmentStatusExternalV2 objekter. Hvert objekt representerer et elementen som ble funnet av tjenesten, og har en egen liste over statuser registrert på elementet.|
||**ServiceReference**|
|ServiceCode|Unik identifikator. Dette er en mandatory parameter når man bruker ServiceReference til å hente ut status data.|
|ServiceEditionCode|Unik identifikator. Dette er en mandatory parameter når man bruker ServiceReference til å hente ut status data. Unik identifikator. Dette er en mandatory parameter når man bruker ServiceReference til å hente ut status data.|
|DateFrom|Definerer dato og tidspunkt tjenesten skal hente ut status data fra.|
|DateTo|Definerer dato og tidspunkt tjenesten skal hente ut status data til|
| |**ArchiveShipmentStatusExternalBEV2List**|
|LimitReached|Når dette flagget er satt ble det funnet flere arkiverte elementer enn det som det er returnert statuser for|
|ArchiveShipmentStatusList|Liste over de returnerte arkiv elementene som en liste av ArchiveShipmentStatusExternalV2-entiteter|
| |ArchiveShipmentStatusExternalV2|
|ArchiveReference|Unik arkiv referanse|
|TimeOfArchiving|Tidspunkt for arkivering|
|ServiceCode|Tjenestekode|
|ServiceEditionCode|Tjeneste utgave kode|
|ShipmentStatusLog|Liste over arkiv elementets status endringer som en liste av ShipmentStatusLogEntry-entiteter.|
| | **ShipmentStatusLogEntry**|
|ShipmentDescription|En beskrivelse av Shipment relatert til statusen, som inneholder navnet på ShipmentDefinition og TransportSekvensNummeret for shipmentet til tjenesteeier. Disse blir adskilt med et pipe-tegn|
|ShipmentStatus|En beskrivelse av Shipment relatert til statusen, som inneholder navnet på ShipmentDefinition og TransportSekvensNummeret for shipmentet til tjenesteeier. Disse blir adskilt med et pipe-tegn ShipmentStatus ShipmentStatus for arkiv elementet. Kan være: NotSet - Elementet er ikke gjort klar til oversendelse. NotSent – Elementet er ikke sendt til tjenesteeier. Sent – Element er sent til tjenesteeier. Error – Overførsel til tjenesteeier feilet. Correlated – Correspondence er opprettet som er knyttet til denne ArkivReferansen|
|ShipmentStatusDateTime|Dato og klokkeslett for når statusen ble satt på arkiv elementet|

#### 9.2.3	GetAttachmentDataStreamed
Denne operasjonen benyttes for å hente ut data for ett gitt vedlegg in den tilfelle vedlegg er større en 30MB. GetArchivedFormTaskV2 må kalles for å få detailene om den binær filen returnerte av denne metoden.

Tabellen under beskriver datakontrakten for operasjonen.

|Input|Beskrivelse|
|--------|--------|
|AttachmentID|Unik identifikator for et vedlegg|
|**Returverdi**|**Beskrivelse**|
|Attachment|Stream som inneholder et binært vedlegg|

### 9.3	Receipt
Tjenesten Receipt inneholder operasjoner for å oppdatere og hente kvitteringer i Altinn.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.

#### 9.3.1	GetReceiptV2
Denne operasjonen henter en kvittering basert på enten unik identifikator for kvitteringen eller en referanse for kvitteringen. Kvitteringen kan være knyttet til et skjemasett innsendt via Altinn fra sluttbruker eller sluttbrukersystem, data sendt fra tjenesteeier til Altinn (meldinger, PIN-koder, abonnement eller prefilldata) eller data sendt fra Altinn til tjenesteeier.

Navnet på operasjonen kan variere noe fra grensesnitt til grensesnitt. Operasjonen heter for eksempel GetReceiptBasicV2 på basic (SOAP 1.1) grensesnittet. En eldre versjon av operasjonen med navn GetReceipt finnes fortsatt, men kan i fremtiden bli fjernet.

Se aliasoversikt (9.19) for informasjon om endepunkter.

Tabellen under beskriver datakontrakten for operasjonen:

|Input|Beskrivelse|
|--------|--------|
|ReceiptSearch|Objekt av typen ReceiptSearch som inneholder nødvendige søkeparametre for å hente ut en kvittering|
|**Returverdi**|**Beskrivelse**|
|Receipt|Objekt av typen Receipt som inneholder alle data for en kvittering som tilfredsstilte det gitte søkekriteriet|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|Property|Beskrivelse|
|--------|--------|
| |**ReceiptSearch**|
|ReceiptId|Unik identifikator en kvittering i Altinn|
|References|Liste med referansen som skal brukes i søket. I praksis er det kun en referanse som benyttes i søket. Følgende referansetyper kan benyttes i søk: ArchiveReference, OutboundShipmentReference, BatchReference, EndUserSystemReference, ExternalShipmentReference, SendersReference|
| | **Receipt**|
|ReceiptId|Unik identifikator kvitteringen i Altinn.|
|ReceiptText|Tekst i kvitteringen|
|ReceiptHistory|Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken|
|LastChanged|Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)|
|ReceiptType| Angir hva kvittering gjelder. Mulige verdier: *NotSet* – Brukes når type er ukjent, *FormTask* – Skjemasett innsending, *Correspondence* – Innlesning av meldinger,	*PINCODE* – bestilling av PIN-koder, *Subscription* – Innelsning av abonnementer, *Outbound* – Forsendelse sendt fra Altinn, *PreFill* – Innlesning av prefill, *RegisterDLS* – DLS registerdata, *RegisterDSF* – DSF registerdata, *RegisterER* – ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp – Innsynstjeneste, RegisterDSFStreetAdd, RegisterDSFPropertyAdd, BrokerService – Overføring av fil på en Formidlingstjeneste|
|ReceiptTemplate|Angir malen (XML) som skal benyttes for kvittering. (IKKE I BRUK)|
|ReceiptStatus|Status for forsendelse som kvitteringen gjelder: NotSet – Status er ukjent, OK, UnExpectedError, ValidationFailed, Rejected|
|ParentReceiptId|Dersom denne kvitteringen er en av flere kvitteringer i et hierarki vil ParentReceiptId vise til ReceiptId for hovedkvitteringen i hierarkiet|
|References|Liste med referanser|
|SubReceipts|Liste med tilhørende kvitteringer. Dersom denne kvitteringen er en hovedkvittering med barn. Et hierarki kan ha kun 2 nivåer. (En kvittering som selv er et barn skal ikke ha barn.)|
| |**Reference**|
|ReferenceType|Angir type referanse: *ExternalShipmentReference* - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse. *EndUserSystemReference* - Referanse satt av avsender for del av en forsendelse. For eksempel vedlegg. Brukes sjeldent da referanser fra sluttbruker ofte lagres som SendersReference. *SendersReference* - Referanse satt av avsender for del av en forsendelse. *ParentReference* - Referansen viser til et hovedskjema. *WorkFlowReference* - Arbeidsflytreferanse. *BatchReference* - Referanse til en forsendelse mottatt i eller sendt fra Altinn. *OutboundShipmentReference* - Referanse til en forsendelse sendt fra Altinn. *ReceiversReference* - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse. *OwnerPartyReference* - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres. *PartyReference* - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen. *ArchiveReference* - Arkivreferanse.|
|**Feilkode**|**Beskrivelse**|
|30008|Ingen kvittering funnet for angitt kvitterings ID eller referanse|

#### 9.3.2 GetReceiptListV2
Denne operasjonen kan kalles for å hente ut alle kvitteringer av en gitt kvitteringstype. I tillegg kan søket begrenses ved hjelp av en til og fra dato. Dette vil gi en liste med kvitteringer som ble sist endret i tidsrommet. Kvitteringstyper er obligatorisk, mens datoer er valgfritt.

Navnet på operasjonen kan variere noe fra grensesnitt til grensesnitt. Operasjonen heter for eksempel GetReceiptListBasicV2 på basic (SOAP 1.1) grensesnittet. En eldre versjon av operasjonen med navn GetReceiptList finnes fortsatt, men kan i fremtiden bli fjernet.

Tabellen under beskriver datakontrakten for operasjonen:

|Input|Beskrivelse|
|--------|--------|
|receiptTypeName|Angir hva kvittering gjelder. Mulige verdier: *FormTask* –Skjemasett innsending. *Correspondence* – Innlesning av meldinger. *PINCODE* – Bestilling av PIN-koder. *Subscription* – Innelsning av abonnementer. *Outbound* – Forsendelse sendt fra Altinn. *PreFill* – Innlesning av prefill. *RegisterDLS* – DLS registerdata. *RegisterDSF* – DSF registerdata, *RegisterER* – ER registerdata, *RegisterDSFProperty*, *RegisterDSFStreet*, *RegisterDSFCountry*, *RegisterDSFUser*, *LookUp* – Innsynstjeneste, *RegisterDSFStreetAdd*, *RegisterDSFPropertyAdd* BrokerService – Overføring av fil på en Formidlingstjeneste|
|dateFrom|Finner kvitteringer endret etter angitt dato|
|dateTo|Finner kvitteringer endret før angitt dato|
|**Returverdi**|**Beskrivelse**|
|ReceiptList|Liste med kvitteringer av typen Receipt. (Vil være en tom liste hvis ingen kvitteringer ble funnet.)|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|Property|Beskrivelse|
|--------|--------|
|*Receipt*||
|ReceiptId|Unik identifikator kvitteringen i Altinn|
|ReceiptType|Angir hva kvittering gjelder. Mulige verdier:NotSet – Brukes når type er ukjent FormTask – Skjemasett innsending Correspondence – Innlesning av meldinger PINCODE – Bestilling av PIN-koder.Subscription – Innelsning av abonnementer Outbound – Forsendelse sendt fra Altinn PreFill – Innlesning av prefill RegisterDLS – DLSregisterdata RegisterDSF – DSF registerdata RegisterER – ER registerdata RegisterDSFProperty RegisterDSFStreet RegisterDSFCountry RegisterDSFUser LookUp – Innsynstjeneste RegisterDSFStreetAdd RegisterDSFPropertyAddBrokerService – Overføring av fil på en Formidlingstjeneste|
|ReceiptTemplate|Angir malen (XML) som skal benyttes for kvittering. (IKKE I BRUK)|
|ReceiptStatus|Status for forsendelse som kvitteringen gjelder: NotSet – Status er ukjent OK UnExpectedError ValidationFailed Rejected|
|ParentReceiptId|Dersom denne kvitteringen er en av flere kvitteringer i et hierarki vil ParentReceiptId vise til ReceiptId for hovedkvitteringen i hierarkiet|
|References|Liste med referanser|
|SubReceipts|Liste med tilhørende kvitteringer. Dersom denne kvitteringen er en hovedkvittering med barn. Et hierarki kan ha kun 2 nivåer. (En kvittering som selv er et barn skal ikke ha barn)|
|**Reference**| |
|ReferenceType|Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse. EndUserSystemReference - Referanse satt av avsender for del av en forsendelse. For eksempel vedlegg. Brukes sjeldent da referanser fra sluttbruker ofte lagres som SendersReference. SendersReference - Referanse satt av avsender for del av en forsendelse. ParentReference - Referansen viser til et hovedskjema. WorkFlowReference - Arbeidsflytreferanse BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres. PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen. ArchiveReference - Arkivreferanse|
|ReferenceValue|Selve referansen (verdien). Vil variere basert på type referanse. Se over.|

Tabellen under angir mulige feilkoder for operasjonen.

|Feilkode|Beskrivelse|
|--------|--------|
|30101|Kan ikke utføre et søk etter kvitteringer av typen NotSet. (NotSet er default verdi hvis receiptTypeName parameteret ikke oppgis)|
|30102|Oppgitt fra dato er høyere en oppgitt til dato|


####9.3.3	UpdateReceipt
Operasjonen UpdateReceipt kan benyttes når tjenesteeier har behov for å oppdatere en kvittering i Altinn. Dette gjøres typisk når Altinn har sendt en batch forsendelse til tjenesteeier. Kvitteringen skal da oppdateres med at tjenesteeier har mottatt batch forsendelsen.

Altinn vil endre kvitteringsteksten til å inneholde informasjon om hvem som utførte oppdateringen. For eksempel: "Receipt updated by AgencySystem: ACN. <ny tekst.>"

Navnet på operasjonen kan variere noe fra grensesnitt til grensesnitt. Operasjonen heter for eksempel UpdateReceiptBasic på basic (SOAP 1.1) grensesnittet. En eldre versjon av operasjonen med navn SaveReceipt finnes fortsatt, men kan i fremtiden bli fjernet.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|ReceiptSave|Informasjon om hvilken kvittering som skal oppdateres samt den nye informasjonen som skal legges på kvitteringen. Objektet må minimun inneholde ny statuskode og tekst. ReceiptId eller ArchiveReference brukes til å identifisere kvitteringen.|
|**Returverdi**|**Beskrivelse**|
|Receipt|Kvitteringen slik den frermstår etter oppdateringen|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
|ReceiptSave:||
|ReceiptId|Unik identifikator for kvittering i Altinn. Kan benyttes for å spesifisere hvilken kvittering som skal oppdateres|
|ArchiveReference|Arkivreferanse i Altinn. Kan benyttes for å spesifisere hvilken kvittering som skal oppdateres. Hvis det finnes flere kvitteringer som har samme arkivreferanse, så vil den nyeste (den med høyest ReceiptId) bli valgt|
|ReceiptText|Oppdateringstekst for kvittering. Obligatorisk|
|ReceiptStatus|Status for forsendelse som kvitteringen gjelder.Obligatorisk: OK, UnExpectedError, ValidationFailed, Rejected|
|References|Liste med referanser man eventuelt ønsker å legge til på kvitteringen. Alle referansetyper utenom NotSet og OwnerPartyReference er gyldige, men det bør begrenses til følgende (Unntak kan gjøres etter avtale med forvaltning): BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn.ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse.(Det er mulig fremtidige versjoner av UpdateReceipt vil ha strengere validering/begrensninger.)|
|SubReceipts|Liste med barnekvitteringer som også ønskes oppdatert i tillegg til hovedkvitteringen. Barne kvitteringer MÅ identifiseres med ReceiptId. Dette kan ikke benyttes til å lage nye barnekvitteringer|
|SubReceipts|Liste med barnekvitteringer som også ønskes oppdatert i tillegg til hovedkvitteringen. Barne kvitteringer MÅ identifiseres med ReceiptId. Dette kan ikke benyttes til å lage nye barnekvitteringer|
|**Receipt**| |
|ReceiptId|Unik identifikator kvitteringen i Altinn|
|ReceiptText|Tekst i kvitteringen|
|ReceiptHistory|Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken|
|LastChanged|Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)|
|ReceiptType|Angir hva kvittering gjelder. Mulige verdier: NotSet – Brukes når type er ukjent, FormTask – Skjemasett innsending, Correspondence – Innlesning av meldinger, PINCODE – Bestilling av PIN-koder, Subscription – Innelsning av abonnementer, Outbound – Forsendelse sendt fra Altinn, PreFill – Innlesning av prefill, RegisterDLS – DLS registerdata, RegisterDSF – DSF registerdata, RegisterER – ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp – Innsynstjeneste, RegisterDSFStreetAdd, RegisterDSFPropertyAdd, BrokerService – Overføring av fil på en Formidlingstjeneste|
|ReceiptTemplate|Angir malen (XML) som skal benyttes for kvittering. (IKKE I BRUK)|
|ReceiptStatus|Status for forsendelse som kvitteringen gjelder: NotSet – Status er ukjent, OK, Status for forsendelse som kvitteringen gjelder: NotSet – Status er ukjent, OK, UnExpectedError, ValidationFailed, Rejected|
|ParentReceiptId|Dersom denne kvitteringen er en av flere kvitteringer i et hierarki vil ParentReceiptId vise til ReceiptId for hovedkvitteringen i hierarkiet|
|References|Liste med referanser|
|SubReceipts|Liste med tilhørende kvitteringer. Dersom denne kvitteringen er en hovedkvittering med barn. Et hierarki kan ha kun 2 nivåer. (En kvittering som selv er et barn skal ikke ha barn)|
|**Reference**||
|ReferenceType|Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse. EndUserSystemReference - Referanse satt av avsender for del av en forsendelse. For eksempel vedlegg. Brukes sjeldent da referanser fra sluttbruker ofte lagres som SendersReference.SendersReference - Referanse satt av avsender for del av en forsendelse. ParentReference - Referansen viser til et hovedskjema. WorkFlowReference - Arbeidsflytreferanse BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres. PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen. ArchiveReference - Arkivreferanse|
|ReferenceValue|Selve referansen (verdien). Vil variere basert på type referanse. Se over|
Tabellen under angir mulige feilkoder for operasjonen:

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|30008|Fant ikke noen kvittering som kunne oppdateres|
|0|Kan ikke ha både kvitterings id og arkivreferanse som input. (Feilkode blir ikke angitt grunnet en bug)|
|0|Kan ikke ha både kvitterings id og arkivreferanse som input. (Feilkode blir ikke angitt grunnet en bug)|
|0|System/bruker har ikke tilgang til kvitteringen som forsøkes oppdatert. (Feilkode blir ikke angitt grunnet en bug)|
####9.4	Correspondence
Det finnes to tjenestegrensesnitt relatert til meldinger:

Correspondence - Operasjonene er skreddersydd for siste versjon av Altinn. Oppdateres etter hvert som Altinn videreutvikles. Skal benyttes av alle nye tjenesteeiere.
Altut - Operasjoner fra tidligere versjon av Altinn. Tilbys kun for bakoverkompatibilitet for eksisterende tjenesteeiere, og det vil ikke bli oppdatert etter hvert som Altinn videreutvikles. Grensesnittet inneholder elementer som ikke lenger er i bruk i Altinn, og enkelte elementer har fått ny funksjonalitet som betyr at eksisterende grensesnitt må endres. Siste versjon av Altinn har funksjonalitet som ikke støttes av Altut formatet.
Tjenesten Correspondence inneholder operasjoner relatert til meldinger.
Påfølgende kapittel beskriver tjenesteoperasjonen for denne tjenesten.
####9.4.1	InsertCorrespondenceV2
Operasjonen InsertCorrespondenceV2 benyttes av en tjenesteeier for å sende meldinger til avgivere i Altinn. Operasjonen er versjonert, gjeldende versjon er V2.
Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|SystemUserCode|Kode som unikt representerer kildesystem, f.eks. "ABC-123". Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier|
|ExternalShipmentReference|Referanse satt av tjenesteeier. Benyttes ved utsending av meldingsbekreftelser og kvittering. Setter feltet SendersReference på meldingen blant annet brukt til oppslag|
|Correspondence|Objekt av typen InsertCorrespondenceBEV2 med meldinger som skal lagres|
|**Returverdi**|**Beskrivelse**|
|Receipt|Kvittering for forsendelsen (ReceiptBE)|
Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
|InsertCorrespondenceBEV2|
|ServiceCode|Tjenestekode, f.eks. "PSA"|
|ServiceEdition|Tjenesteutgavekode, f.eks. "2009"|
|Reportee|Fødselsnummer eller organisasjonsnummer eller brukernavn på selvregistrert bruker for den meldingen gjelder|
|Content|Objekt med meldingsdetaljer (ExternalContentBEV2)|
|VisibleDateTime|Tidspunkt for når meldinger blir synlig i portal|
|AllowSystemDeleteDateTime|Angir når Altinn kan slette meldingen|
|DueDateTime|Tidspunkt for forfall svar|
|ArchiveReference|Referanse til arkivert element. Benytt dette til å indikere at meldingen er et svar på en konkret innsending.|
|ReplyOptions|Objekt med linker til skjema/Altinn tjeneste/arkivelement (CorrespondenceInsertLinkBE). Bruk dette til å indikere hvordan avgiver kan svare på en melding|
|Notifications|Liste av objekt med varsler som skal sendes mottaker ifbm meldingen (NotificationBE)|
|AllowForwarding|Angir om meldingen skal kunne videresendes av bruker i portalen|
|Case Id|ID som identifiserer saken som meldingen skal knyttes til|
|MessageSender|Avsender som skal vises for sluttbruker, kan være forskjellig fra etat, hvis den ikke fylles ut brukes etaten som eier tjenesten|
|IsReservable|I sammenheng med KRR (Kontakt og reservasjons registeret) kan en sluttbruker reservere seg imot å motta meldinger. IsReservable verdien kan brukes til å indikere om det er mulig å reservere seg mot meldingen eller ikke. Det er valgfritt å angi en verdi og standard (default) verdi er False (0). Denne verdien må derfor aktivt settes til True (1) om tjeneste eier ønsker og respektere reservasjoner.|
|SdpOptions|Inneholder informasjon om hvordan en melding skal sendes til Digital postkasse til innbygger istedenfor eller i tillegg til at det opprettes correspondence. Hvis det ikke oppgis noe informasjon (null) så vil ikke videresending aktiveres. Har også mulighet for å bestille varsel og revarsel fra postkasseleverandør. (Klasse: SdpOptions)|
|OnBehalfOfOrgNr|Gjør det mulig å levere Correspondence på vegne av en annen organisasjon. Krever et valid Organisasjonsnummer som input.|
|ExternalContentBEV2||
|LanguageCode|1033 - English, 1044 - Bokmål, 2068 - Nynorsk|
|MessageTitle|Tittel på melding|
|MessageSummary|Tekst som beskriver meldingen|
|MessageBody|Selve meldingen|
|Attachments|Liste av vedlegg til meldingen, binære eller xml vedlegg (AttachmentBEV2)|
|CustomMessageData|Felt for angivelse av attributter spesifikke for den gitte Altinn tjeneste. For eksempel for å angi kommunenummer på selvangivelsen. Bruk av spesifikke attributter må avtales spesielt for de(n) aktuelle Altinn-tjenestene|
|**AttachmentBEV2**||
|BinaryAttachments|Liste med objekter av binære vedlegg (BinaryAttachmentBEV2)|
|XmlAttachmentList|Liste med objekt med xml vedlegg (XmlAttachmentBEV2). Benyttes hvis det er definert at i TUL at melding skal vises i Infopath skjema. Infopath-skjema må være utviklet som en del av meldingstjenesten i TUL|
|**BinaryAttachmentBEV2**||
|FileName|Filnavn for det binære vedlegget|
|Name|Dette er navnet på vedlegget, som det vises i portalen|
|Encrypted|Sier om vedlegget er kryptert. True/False|
|Data|Data for det binære vedlegget, byte array|
|SendersReference|Referanse for vedlegget, som ennå ikke er tatt i bruk. Settes av tjenesteeier. Feltet er ikke påkrevd|
|FunctionType|Hvilken funksjonstype vedlegget utgjør: Invoice - Faktura, Unspecified - Uspesifisert|
|DestinationType|Hvor vedlegget er tilgjengelig: Default/ShowToAll – tilgjengelig i portal og for sluttbrukersystem. PortalOnly – kun tilgjengelig fra portal. EndUserSystemOnly – kun tilgjengelig fra sluttbrukersystem|
|**XmlAttachmentBEV2**||
|SendersReference|Referanse for vedlegget. Settes av tjenesteeier, bør være unikt|
|FormDataXml|XML data. Må legges i en CDATA blokk|
|DataFormatId|Identifikator for XSD fra den valgte leverandøren, definert i TUL (XSD id)|
|DataFormatVersion|Versjonen av XSD'en som er brukt i dette InfoPath-skjemaet, definer i TUL (XSD versjon)|
|DataFormatVersion|Versjonen av XSD'en som er brukt i dette InfoPath-skjemaet, definer i TUL (XSD versjon).
|**CorrespondenceInsertLinkBE**||
|Service|Objekt med info om service (InsertCorrespondenceLinkServiceCodeBE)|
|URL|Objekt med info om url (InsertCorrespondenceLinkServiceURLBE)|
|ArchiveReference|Objekt med info om arkivert element (InsertCorrespondenceLinkArchiveRefBE)|
|**InsertCorrespondenceLinkServiceCodeBE**||
|ServiceCode|Angir den tjenestekoden for svarmeldingen|
|ServiceEdition|Angir tjenesteutgavekoden for svarmeldingen|
|**InsertCorrespondenceLinkServiceURLBE**||
|LinkURL|Angir en link til en webside for svarmelding|
|LinkText|Beskrivelse av link|
|**InsertCorrespondenceLinkArchiveRefBE**||
|ArchiveRef|Elementet benyttes hvis man kan svare vha. et arkivert element. Referanse til element i arkiv|
|**NotificationBE**||
|ShipmentDateTime|Når varsel skal sendes til mottaker|
|LanguageCode|Språk kode: 1033 English, 1044 Bokmål, 2068 Nynorsk|
|FromAddress|Avsender adresse (e-post). Hvis ikke satt benyttes avsenderadresse satt i varselmalen|
|NotificationType|En unik streng som definerer en referanse til predefinerte varslingstekster|
|ReceiverEndPoints|Liste av mottaker adresser (ReceiverEndPointBE)|
|TextTokens|Liste av tekster som skal erstatte maltekst i varselmal|
|**ReceiverEndPoint**||
|ReceiverAddress|Adressen (telefonnummer eller e-postadresse) for mottakspunktet|
|TransportType|Type varsling: Email, SMS, Instant Message (IM),	Both email & SMS|
|**TextTokenSubstitutionBE**||
|TokenNum|Ikke i bruk, kan utelates.|
|TokenValue|Tekst som skal ersatte maltekst. Substitusajonen gjøres i samme rekkefølge som parameterene er angitt. Varselmal må bestilles og lages på forhånd|
|**SdpOptions**||
|SdpSetting|Her styres det om Altinn skal ha en kopi eller ikke. CopyAltinn – Det opprettes en correspondence i tillegg til det digitale brevet. ForwardOnly – Det opprettes ikke noen kopi i Altinn|
|BackupAltinn|Dette styrer hva som skal skje hvis avgiver ikke har en digital postkasse. (BackupAltinn har ingen effekt hvis avgiver har en digital postkasse.). BackupAltinn = false – Det lages aldri noen correspondence. Isteden gis det en feilmelding i kvitteringen som returneres. BackupAltinn = true – Det vil alltid lages en correspondence. Kvitteringen som returneres vil ha en underkvittering med info om at det ikke kunne sendes noe digitaltbrev da postkassen er ukjent|
|PrimaryDocumentFileName|For SDP må det være med minst ett binært vedlegg under Attachments. Dette vedlegget må ha angitt et filnavn (FileName) og navnet må stemme perfekt med innholdet i dette feltet. Vedlegget vil da benyttes som hoveddokument i det digitale brevet|
|SdpNotifications|Container for varsel. Kan ha 0 eller ett epostvarsel og/eller 0 eller smsvarsel. (Klasse: SdpNotifications)|
|**SdpNotifications**||
|EmailNotification|Varseldetaljer for epostvarsel. (Klasse: SdpEmailNotification)|
|SmsNotification|Varseldetaljer for smsvarsel. (Kallse: SmsNotification)|
|**SdpEmailNotification**||
|NotificationText|Varselteksten som skal med i meldingen til bruker. Maks 500 tegn.|
|EmailAddress|Epostaddressen til mottaker. Altinn vil forsøke finne brukerens adresse fra KRR hvis etat ikke har dette. Hvis hverken etat eller Altinn finner noen noen adresse vil det gi feilmelding.|
|Repititions|Varsel repetisjoner. Flere verdier vil produsere påminnelser|
|**SdpSmsNotification**||
|NotificationText|Varselteksten som skal med i meldingen til bruker. Maks 160 tegn|
|MobileNumber|Mobilnummeret til mottaker. Altinn vil forsøke finne brukerens mobilnummer fra KRR hvis etat ikke har dette. Hvis hverken etat eller Altinn finner noen noe mobilnummer vil det gi feilmelding.|
|Repititions|Varsel repetisjoner. Flere verdier vil produsere påminnelser|
|**DaysDelayedList**||
|DaysDelayed|Et tall mellom 0 og 25 som angir antall dager relativt til dagen hvor det digitale brevet ble gjort tilgjengelig for bruker. Tallet 0 vil gi varsel samme dag|
|**ReceiptBE**||
|ReceiptId|Unik identifikator kvitteringen i Altinn. Benyttes for eksempel ved senere oppdatering av kvittering|
|ReceiptText|Tekst i kvitteringen|
|ReceiptHistory|Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken|
|LastChanged|Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)|
|ReceiptTypeName|Angir hva kvittering gjelder. Mulige verdier: FormTask - Skjemasett, Correspondence - Melding, PINCODE - PIN-koder, Subscription - Abonnement, Outbound - Forsendelse sendt fra Altinn, PreFill - Preutfyllingsdata, Broker - Formidlingstjeneste, RegisterDLS - DLS registerdata, RegisterDSF - DSF registerdata, RegisterER - ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp - Innsynstjeneste|
|ReceiptTemplate|Angir malen (XML) som skal benyttes for kvittering|
|ReceiptStatusCode|Status for forsendelse som kvitteringen gjelder:	NotSet (standardverdi som brukes når status ikke er satt – skal ikke kunne mottas som verdi), OK, UnExpectedError, ValidationFailed, Rejected|
|ParentReceiptId|Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering)|
|References|Liste med ReferenceBE-objekter for kvitteringen|
|SubReceipts|Liste med tilhørende Receipt-objekter (dersom denne kvitteringen er en hovedkvittering)|
|**ReferenceBE**||
|ReferenceValue|Selve referansen (verdien) satt på kvitteringen. Typisk forsendelsesreferansen|
|ReferenceTypeName|Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse,  EndUserSystemReference - Benyttes ikke, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, ArchiveReference -Arkivreferanse|

###9.4.2	CreateSimpleCorrespondenceService
CreateSimpleCorrespondenceService er en operasjon som vil opprette en enkel meldingstjeneste (correspondence) basert på en mal. Malen (template) er i utgangspunktet en vanlig meldingstjeneste som er definert av ASF (Altinn sentralforvaltning). Malen blir gitt en midlertidig kode og versjonsnummer og disse verdiene kan senere benyttes av en tjenesteeier slik at de kan opprette sin egen unike tjeneste basert på malen.

Operasjonen oppretter en fullverdig tjeneste, men siden malen skal kunne brukes som utgangspunkt for alle tjenesteeiere er den veldig enkel. Det er flere begrensninger. Tjenesten har ingen skjema, og det er ikke mulig å spesifisere at lesebekreftelser sendes på batch til tjenesteeier.

I returen fra operasjonen kommer informasjon om den unike tjenesten for den spesifikke tjenesteeieren. Dette er ExternalServiceCode og ExternalServiceEditionCode som tjenesteeieren senere kan benytte i kall til operasjonen InsertCorrespondenceV2.

For flere detaljer om de ulike malene må man kontakte Altinn. De har også oversikt over eksisterende maler med koder og versjonsnummer.

|**Input**|**Beskrivelse**|
|--------|--------|
|templateServiceCode|ServiceCode for malen man ønsker benytte|
|templateServiceEditionCode|ServiceEditionCode for malen man ønsker benytte|
|**Returverdi**|**Beskrivelse**|
|CorrespondenceServiceInfo|Et dataobjekt med detaljer om tjenesten som ble laget. (se under.)
Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
|**CorrespondenceServiceInfo**||
|ExternalServiceCode|Dette er koden for den nye unike tjenesten som operasjonen har laget for tjenesteeieren som kalte tjenesten|
|ExternalServiceEditionCode|Dette er "editioncode" for den nye tjenesten|

#####9.4.3	GetCorrespondenceStatusDetails
Denne metoden bør helst ikke benyttes. Benytt isteden versjon 3.

Årsaken til versjonering av denne operasjonen er endring av kontrakten. Ved innføring av Kontakt og reservasjonsregisteret til difi ble det innført en ny status på Correspondence. Dette er en status som indikerer at mottaker har reservert seg mot å motta elektronisk kommunikasjon.
#####9.4.4	GetCorrespondenceStatusDetailsV2
Denne metoden bør helst ikke benyttes. Benytt isteden versjon 3.

Årsaken til denne versjoneringen er ny funksjonalitet knyttet til Sikker Digital Post.
#####9.4.5	GetCorrespondenceStatusDetailsV3
Operasjonen GetCorrespondenceStatusDetails benyttes av en tjenesteeier for å sjekke status på et sett av meldinger knyttet til en spesifisert tjeneste.

Tabellen under beskriver datakontrakten for operasjonen:
**Request entiteter:**

|**Input**|**Beskrivelse**|
|--------|--------|
|CorrespondenceStatusFilter|Entitet for å angi filter for søket|
|**Returverdi**|**Beskrivelse**|
|CorrespondenceStatusResult|Entitet med liste over meldingstjenestene som matcher søket|
Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
|**CorrespondenceStatusFilterV3**||
|CreatedAfterDate|Dato og klokkeslett som filtrere ut meldinger opprettet før angitt dato|
|CreatedBeforeDate|Dato og klokkeslett som filtrere ut meldinger opprettet tidligere enn angitt dato|
|CurrentStatus|Filter for å hente ut meldinger i en angitt status. Mulige verdier er: Created, Read, Confirmed|
|NotificationSent|Filter for hvorvidt varsel er sendt for meldingene eller ei|
|Reportee|Filter for å returnere melding for en gitt avgiver, angitt av fødselsnummer eller organisasjonsnummer|
|SendersReference|Filter for meldinger med en gitt SendersReference fra tjenesteeier. SendersReference på meldingstjenesten settes av feltet ExternalShipmentReference ved bruk av web service InsertCorrespondenceV2 og feltet SendersReference i correspondence.2010.10.xsd for batch|
|ServiceCode|Tjenestekode for meldingene som skal returneres – pålagt parameter|
|ServiceEditionCode|Tjenesteutgavekode for meldingene som skal returneres – pålagt parameter|
|SdpSearchOptions|Tilleggsinnstillinger for Digital postkasse til innbygger. Hvis det ikke oppgis noe her så vil tjenesten ikke inkludere SDP status detaljer|
|**SdpStatusSearchOptions**||
|IncludeCorrespondence|Dette er et flag som styrer hvorvidt søkeresultatet skal inkludere correspondence status information|
|**SdpStatusSearchOptions**||
|IncludeCorrespondence|Dette er et flag som styrer hvorvidt søkeresultatet skal inkludere correspondence status information|
**Respons entiteter:**

|**Property**|**Beskrivelse**|
|--------|--------|
|**CorrespondenceStatusResultV3**||
|ServiceCode|Tjenestekode for meldingene returnert|
|ServiceEditionCode|Tjenesteutgavekode for meldingene returnert|
|CorrespondenceStatusInformation|Status informasjon om meldinger i Altinn (CorrespondenceStatusInformation)|
|SdpStatusInformation|Status informasjon om digitale brev som Altinn har videresendt til løsningen for «Digital postkasse til innbygger (SdpStatusInformation)|
|**CorrespondenceStatusInformation**||
|CorrespondenceStatusDetailsList|Liste over meldinger og deres status historikk (StatusV2)|
|LimitReached|Dette er et flag som indikerer hvorvidt listen er komplett eller ikke. Hvis dette feltet er true så betyr det at søkekriteriene bør endres slik at det er mer begrensende|
|**StatusV2 (correspondence)**||
|CorrespondenceID|Meldingens unike id|
|CreatedDate|Dato for når meldingen ble opprettet|
|Notifications|Liste over varsler knyttet til meldingen angitt som en liste med Notification-entiteter (Notification)|
|Reportee|Avgiver meldingen tilhører. Fødselsnummer eller organisasjonsnummer|
|SendersReference|Verdien av referansen SendersReference hvis angitt av tjenesteeier|
|StatusChanges|Liste over meldingens statusendringer som en liste av StatusChange-entiteter|
|**Notification**||
|Recipient|Varselets mottaksadresse. E-postadresse eller telefonnummer|
|SentDate|Dato og klokkeslett for når varselet er sendt. Om feltet er tomt (null) betyr det at varselet ikke er sendt|
|TransportType|Typer varsling:	Email, SMS,	IM (Instant Message),Both (email og SMS)|
|**StatusChange**||
|StatusDate|Dato og klokkeslett for når statusen endret|
|StatusType|Statusen meldingen endret til. Mulige verdier er: Created – meldingen ble opprettet av tjenesteeier, Read – meldingen ble lest av en bruker, Confirmed – meldingen ble bekreftet lest av en bruker, Reserved – mottaker har reservert seg mot elektronisk kommunikasjon. Meldingen er ikke synlig for mottaker|
|**SdpStatusInformation**||
|SdpStatusDetailsList|Liste over digitale brev laget gjennom Altinn og deres status historikk (SdpStatusDetails)|
|LimitReached|Dette er et flag som indikerer hvorvidt listen er komplett eller ikke. Hvis dette feltet er true så betyr det at søkekriteriene bør endres slik at det er mer begrensende|
|**SdpStatusDetails**||
|SdpId|En unik ID for elementet definert i Altinn|
|CorrespondenceId|Unik ID for correpondence hvis Altinn har fått kopi eller har fungert som backup|
|CreatedDateTime|Tidspunktet for når det digitale brevet først ble registrert i Altinn|
|LastChangedDateTime|Tidspunktet for når status på elementet ble sist oppdatert|
|Reportee|Avgiver i form av personnummer eller organisasjonsnummer (Brevets mottaker)|
|Reference|En referanseverdi som tjenesteeier kan gi alle digitale brev. Kan brukes hvis det lages mange brev samtidig for å identifisere alle som ble opprettet sammen|
|StatusHistory|Brevets status historikk. Dette er en liste med de statuser brevet har hatt(SdpStatusChange)|
|**SdpStatusChange**||
|Status|Unknown – Ukjent status, Sent_Meldingsformidler – Altinn har laget brevet og sendt det inn i SDP systemet, Delivered_EndUser – Brevet har gått gjennom systemet og blitt levert til sluttbruker, Delivery_EndUser_Failed – Brevet kunne ikke leveres, Reserved – Altinn lagde ikke noe brev fordi sluttbruker har reservert seg mot digital post, NoMailBox – Altinn lagde ikke noe brev fordi sluttbruker ikke har registrert noen postboks i kontakt og reservasjonsregisteret|
|StatusDateTime|Tidspunktet for når statusen ble satt|

#####9.4.6	GetCorrespondenceStatusHistory
Operasjonen GetCorrespondenceStatusHistory benyttes av en tjenesteeier for å sjekke status på et sett av meldinger basert på SendersReference på meldingene.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|CorrespondenceStatusHistoryRequest|Entitet for å angi filter for søket|
|**Returverdi**|**Beskrivelse**|
|CorrespondenceStatusHistoryResult|Entitet med liste over meldingstjenestene som matcher søket|
Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

**Request entiteter:**

|**Property**|**Beskrivelse**|
|--------|--------|
|**CorrespondenceStatusHistoryResult**||
|CorrespondenceStatusInformation|Status informasjon om meldinger i Altinn. (CorrespondenceStatusInformation|
|SdpStatusInformation|Status informasjon om digitale brev som Altinn har videresendt til løsningen for «Digital postkasse til innbygger (SdpStatusInformation)|
|**CorrespondenceStatusInformation**||
|CorrespondenceStatusDetailsList|Liste over meldinger og deres status historikk (StatusV2)|
|LimitReached|Dette er et flag som indikerer hvorvidt listen er komplett eller ikke. Hvis dette feltet er true så betyr det at søkekriteriene bør endres slik at det er mer begrensende|
|**StatusV2 (correspondence)**||
|CorrespondenceID|Meldingens unike id|
|CreatedDate|Dato for når meldingen ble opprettet|
|Notifications|Liste over varsler knyttet til meldingen angitt som en liste med Notification-entiteter (Notification)|
|Reportee|Avgiver meldingen tilhører. Fødselsnummer eller organisasjonsnummer.
|SendersReference|Verdien av referansen SendersReference hvis angitt av tjenesteeier|
|StatusChanges|Liste over meldingens statusendringer som en liste av StatusChange-entiteter|
|**Notification**||
|Recipient|	Varselets mottaksadresse. E-postadresse eller telefonnummer|
|SentDate|		Dato og klokkeslett for når varselet er sendt. Om feltet er tomt (null) betyr det at varselet ikke er sendt|
|TransportType|	Typen varsling:	Email, SMS, IM (Instant Message), Both (email og SMS)|
|**StatusChange**||
|StatusDate|Dato og klokkeslett for når statusen endret|
|StatusType|Statusen meldingen endret til. Mulige verdier er: Created – meldingen ble opprettet av tjenesteeier, Read – meldingen ble lest av en bruker,Confirmed – meldingen ble bekreftet lest av en bruker, Reserved – mottaker har reservert seg mot elektronisk kommunikasjon. Meldingen er ikke synlig for mottaker|
|**SdpStatusInformation**||
|SdpStatusDetailsList|Liste over digitale brev laget gjennom Altinn og deres status historikk (SdpStatusDetails)|
|LimitReached|Dette er et flag som indikerer hvorvidt listen er komplett eller ikke. Hvis dette feltet er true så betyr det at søkekriteriene bør endres slik at det er mer begrensende|
|**SdpStatusDetails**||
|SdpId|	En unik ID for elementet definert i Altinn
|CorrespondenceId|	Unik ID for correpondence hvis Altinn har fått kopi eller har fungert som backup|
|CreatedDateTime|Tidspunktet for når det digitale brevet først ble registrert i Altinn|
|LastChangedDateTime|Tidspunktet for når status på elementet ble sist oppdatert|
|Reportee|Avgiver i form av personnummer eller organisasjonsnummer. (Brevets mottaker)|
|Reference|	En referanseverdi som tjenesteeier kan gi alle digitale brev. Kan brukes hvis det lages mange brev samtidig for å identifisere alle som ble opprettet sammen.
|StatusHistory|Brevets status historikk. Dette er en liste med de statuser brevet har hatt (SdpStatusChange)|
|**SdpStatusChange**||
|Status| Unknown – Ukjent status, Sent_Meldingsformidler – Altinn har laget brevet og sendt det inn i SDP systemet, Delivered_EndUser – Brevet har gått gjennom systemet og blitt levert til sluttbruker, Delivery_EndUser_Failed – Brevet kunne ikke leveres, Reserved – Altinn lagde ikke noe brev fordi sluttbruker har reservert seg mot digital post, NoMailBox – Altinn lagde ikke noe brev fordi sluttbruker ikke har registrert noen postboks i kontakt og reservasjonsregisteret|
|StatusDateTime|Tidspunktet for når statusen ble satt|

#####9.5	AltUt
For bakoverkompatibilitet tilbys AltUt grensesnittet for registrering av meldinger til eksisterende tjenesteeiere. Nye tjenesteeiere skal benytte nytt tjenestegrensesnitt. AltUt grensesnittet vil ikke bli oppdatert ettersom Altinn videreutvikles.

#####9.5.1	SubmitAltutMessagePw
Operasjonen SubmitAltutMessagePw benyttes av eksisterende tjenesteeiere for å sende meldinger til avgivere i Altinn.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|altutMessage|Meldingen som skal sendes til Altinn. Må være i henhold til AltUt.xsd (versjon 6.0)|
|Password|Tjenesteeiers passord|
|**Returverdi**|**Beskrivelse**|
|submitAltutMessagePwResult|Kvittering for innsendingen. Er i henhold til GovOrganReceipt.xsd (versjon 6.0)|

Se avsnitt Batch grensesnitt – Altut format for bilde av xml struktur i Altut.xsd.

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten

|**Property**|**Beskrivelse**|
|--------|--------|
|**altutMessage (AltUt.xsd)**||
|Se definisjonen på xsd i avsnittet Batch grensesnitt – Altut format||

|**Element**|**Beskrivelse**|
|--------|--------|
|GovOrganReceipt|Rotnode| Kvitteringen returneres til kallende system ved kall til webmetoder i AgencyDataExchange-grensesnittet|
|schemaVersion|Versjon på kvittering|
|GovOrganReceipt.DataUnitInReceipt|Elementet inneholder status på og tidspunkt for forsendelse, samt elementer for melding til kallende system|
|receiptType|Kvitteringstype (valgfritt): PREFILL, ALTUT|
|status|Status på innsending|
|timeReceived|Tidspunkt for innsending|
|GovOrganReceipt.DataUnitInReceipt.Message|Overordnet element|
|GovOrganReceipt.DataUnitInReceipt.Message.MessageEntry|Elementet inneholder melding som beskriver resultat for forsendelse|

#####9.6	Prefill
Denne tjenesten inneholder operasjoner som benyttes av tjenesteeier for å sende inn preutfylte oppgavesett for avgivere. Det finnes tre typer preutfyllingsinformasjon:
•	Preutfylling av oppgavesett
Hele oppgavesettet (hoved- og underskjema) sendes inn med preutfyllingsinformasjon. Tjenesteeier kan også velge å legge til binære vedlegg (Base64) for preutfylte oppgavesett.
•	Preutfyllingsinformasjon angitt som felt/verdi
Feltet viser til en unik id som benyttes i skjemaer, og det angis verdi for feltet.
•	Registerdata
Statisk informasjon som sendes inn fra nasjonale registre.

Prefilltjenesten benyttes kun for preutfyllingsinformasjon som angis per skjemasett. For preutfyllingsinformasjon for felt/verdi og registerdata benyttes et batchgrensesnitt. Batch-grensesnittet kan også benyttes dersom mengden med preutfyllingsinformasjon er for stort for et tjenestekall, eller for tjenesteeiere som ikke ønsker å benytte tjenestegrensesnittet. Det alternative batch-grensesnittet er beskrevet i avsnittet Preutfylling.

Tjenestene for skjemasettet må være definert i tjenesteutviklingsløsningen og migrert til Altinn før en tjenesteeier kan sende inn preutfyllingsinformasjon for tjenesten. Operasjon GetAvailableServices kan kalles for å sjekke om skjemasettet eksisterer i Altinn.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.
#####9.6.1	SubmitAndInstantiatePrefilledFormTask
Denne operasjonen benyttes av tjenesteeiere for å preutfylle et oppgavesett for en avgiver, og umiddelbart aktivere oppgavesettet i brukers arbeidsliste. Ett oppgavesett kan preutfylles og instansieres per kall til SubmitAndInstantiatePrefilledFormTask. Kvittering til tjenesteeier vil angi om mottak, validering, lagring til prefilldatabase (dersom dette er valgt) og instansiering av skjema i portal (dersom dette er valgt) ble gjennomført.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|externalBatchId|Unik id for forsendelse. Denne defineres og settes av tjenesteeier. Returneres i kvittering. Identifikatoren kan senere benyttes av tjenesteeier for å hente ut kvittering for den gitte forsendelsen|
|preFillFormTask|Dette objektet av typen PrefillFormTaskBE inneholder prefilldata for de ulike skjema i et oppgavesett|
|doSaveFormTask|Angir om det preutfylte oppgavesettet skal lagres i databasen for senere bruk|
|doinstantiateFormTask|Angir om det preutfylte oppgavesettet umiddelbart skal instansieres i brukers arbeidsliste|
|caseId|Referanse til samhandlingstjeneste preutfylt skjema skal knyttes til|
|**Returverdi**|**Beskrivelse**|
|Receipt|ReceiptBE-objekt. Kvittering for forsendelsen|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
|**PrefillFormTaskBE**||
|ServiceOwnerCode|Feltnavnet er misvisende. Verdien skal ikke være ServiceOwnerCode, men en kode som unikt representerer kildesystem. For eksempel: "ABC-123". Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier|
|ExternalShipmentReference|Unik referanse som settes av tjenesteeier for å identifisere forsendelsen|
|Reportee|Fødselsnummer eller organisasjonsnummer organisasjonsnummer eller brukernavn på selvregistrert bruker som identifiserer hvem dataene gjelder|
|ExternalServiceCode|Angir den unike tjenestekoden dataene gjelder|
|ExternalServiceEditionCode|Angir tjenesteutgavekode dataene gjelder|
|ValidFromDate|Angir fra når preutfyllingsdata er gyldig (yyyy-MM-dd)|
|ValidToDate|Angir til når preutfyllingsdata er gyldig (yyyy-MM-dd)|
|IdentityFieldHashCode|Settes ikke av tjenesteeier. Brukes internt i Altinn|
|SendersReference|Referanse på preutfylt skjemasett som settes av tjenesteeier|
|ReceiversReference|Referanse som settes av Altinn. Denne returneres i kvittering til tjenesteeier|
|PrefillFormList|Liste (PrefillFormBE-objekter) som inneholder preutfylte skjema og metadata for et oppgavesett, ett skjema per objekt|
|PrefillAttachmentList|Liste (PrefillAttachmentBE-objekter) som inneholder binære for oppgavesettet|
|PreFillIdentityFieldList|Liste (PrefillIdentityFieldBE-objekter) som inneholder identifiserende felter for det preutfylte oppgavesettet|
|NotificationList|Liste (NotificationBE-objekter) med varsler for det preutfylte oppgavesettet|
|**PrefillFormBE**||
|DataFormatID|Id til skjema fra metadata kilde|
|DataFormatVersion|Versjon til skjema fra metadata kilde|
|SendersReference|Unik referanse for skjemaet satt av tjenesteeier|
|FormDataXML|Preutfyllingsdata for skjemaet. Må legges i en CDATA blokk|
|**PrefillAttachmentBE**||
|AttachmentName|Dette er navnet på vedlegget, som det vises i portalen|
|FileName|Navn på fil for det binære vedlegget|
|AttachmentData|Data for det binære vedlegget|
|AttachmentType|Angir MIME-typen for vedlegget: application_none - ingen MIME type angitt, application_pdf - PDF format, application_msword - Microsoft Word, application_vnd_ms_excel - Microsoft Excel, application_vns_oasis_opendocument_text - Open document type Text, application_vnd_oasis_opendocument_presentation - Open docment type Presentation, application_vnd_oasis_opendocument_spreadsheet - Open docment, type Spreadsheet,	application_rtf - Rich text format type, application_vnd_ms_powerpoint - Microsoft PowerPoint, application_postscript, application_zip - Type zip, text_plain, text_html, text_xml, text_rtf - Rich text format type, text_richtext - Rich text, binary_octet_stream - Binary format, not_Applicable|
|SendersReference|Referanse for vedlegget. Settes av tjenesteeier|
|**PrefillIdentityFieldBE**||
|FieldValue|Verdi for identifiserende feltet. Må settes når det skal være mer enn ett preutfylt skjemasett for samme tjeneste og avgiver. Se avsnitt Identifiserende felter for mer info|
|**NotificationBE**||
|ShipmentDateTime|Når varsel skal sendes til mottaker|
|LanguageCode|Språk kode:	1033 - English, 1044 - Bokmål, 2068 - Nynorsk|
|FromAddress|Avsender adresse (e-post). Hvis ikke satt benyttes avsenderadresse satt i varselmalen|
|NotificationType|En unik streng som definerer en referanse til predefinerte varslingstekster|
|ReceiverEndPoints|Liste av mottaker addresser (ReceiverEndPointBE)|
|TextTokens|Liste av tekster som skal erstatte maltekst i varselmal|
|**ReceiverEndPoint**||
|ReceiverAddress|Adressen (telefonnummer eller e-postadresse) for mottakspunktet|
|TransportType|	Type varsling: Email, SMS, Instant Message (IM), Both email & sms|
|**TextTokenSubstitutionBE**||
|TokenNum|Ikke i bruk, kan utelates|
|TokenValue|Tekst som skal ersatte maltekst. Substitusajonen gjøres i samme rekkefølge som parameterene er angitt. Varselmal må bestilles og lages på forhånd|
|**ReceiptBE**||
|ReceiptId|Unik identifikator kvitteringen i Altinn. Benyttes for eksempel ved senere oppdatering av kvittering|
|ReceiptText|Tekst i kvitteringen|
|ReceiptHistory|Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken|
|LastChanged|Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)|
|ReceiptTypeName|	Angir hva kvittering gjelder. Mulige verdier: FormTask -Skjemasett, Correspondence - Melding, PINCODE - PIN-koder, Subscription - Abonnement, Outbound - Forsendelse sendt fra Altinn, PreFill - Preutfyllingsdata, Broker - Formidlingstjeneste, RegisterDLS - DLS registerdata, RegisterDSF - DSF registerdata, RegisterER - ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp -Innsynstjeneste|
|ReceiptTemplate|Angir malen (XML) som skal benyttes for kvittering|
|ReceiptStatusCode|Status for forsendelse som kvitteringen gjelder: NotSet (standardverdi som brukes når status ikke er satt – skal ikke kunne mottas som verdi), OK, UnExpectedError, ValidationFailed, Rejected|
|ParentReceiptId|Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering)|
|References|Liste med ReferenceBE-objekter for kvitteringen|
|SubReceipts|Liste med tilhørende Receipt-objekter (dersom denne kvitteringen er en hovedkvittering)|
|**ReferenceBE**||
|ReferenceValue|Selve referansen (verdien) satt på kvitteringen. Typisk forsendelsesreferansen|
|ReferenceTypeName|Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Benyttes ikke, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference -Organisasjonsnummer eller personnummer til eier av kvitteringen er typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, ArchiveReference - Arkivreferanse|

#####9.6.2	SubmitPrefilledFormTasks
SubmitPrefilledFormTasks kalles av tjenesteeier for å lagre et preutfylt oppgavesett for en avgiver i Altinn. Ett eller flere oppgavesett kan sendes inn ved et kall til tjenesten.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|externalBatchId|Unik id for forsendelse. Denne defineres og settes av tjenesteeier. Returneres i kvittering. Identifikatoren kan senere benyttes av tjenesteeier for å hente ut kvittering for den gitte forsendelsen|
|**Returverdi**|**Beskrivelse**|
|Receipt|ReceiptBE-objekt. Kvittering for forsendelsen|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
|**PreFillFormTaskDetails**||
|SystemUserCode|Kode som unikt representerer kildesystem, f.eks. "ABC-123". Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier|
|PreFillFormTaskList|Liste med metadata og preutfyllingsdata (PreFillFormTaskBE-objekter) for skjemaene i oppgavesettet|
|**PrefillFormTaskBE**||
|ServiceOwnerCode|Unik kode på tjenesteeier som er kilde for preutfyllingsdata|
|ExternalShipmentReference|Unik referanse som settes av tjenesteeier for å identifisere skjemaet i forsendelsen|
|Reportee|Fødselsnummer eller organisasjonsnummer organisasjonsnummer eller brukernavn på selvregistrert bruker som identifiserer hvem dataene gjelder|
|ExternalServiceCode|Angir den unike tjenestekoden dataene gjelder|
|ExternalServiceEditionCode|Angir tjenesteutgavekode dataene gjelder|
|ValidFromDate|Angir fra når preutfyllingsdata er gyldig (yyyy-MM-dd)|
|ValidToDate|Angir til når preutfyllingsdata er gyldig (yyyy-MM-dd)|
|IdentityFieldHashCode|Settes ikke av tjenesteeier. Brukes internt i Altinn|
|SendersReference|Referanse på preutfylt skjemasett som settes av tjenesteeier|
|ReceiversReference|Referanse som settes av Altinn. Denne returneres i kvittering til tjenesteeier|
|PrefillFormList|Liste (PrefillFormBE-objekt) som inneholder preutfylte skjema og metadata for et oppgavesett, ett skjema per objekt|
|PrefillAttachmentList|Liste (PrefillAttachmentBE-objekt) som inneholder binære for oppgavesettet|
|PreFillIdentityFieldList|Liste (PrefillIdentityFieldBE-objekt) som inneholder identifiserende felter for det preutfylte oppgavesettet|
|NotificationList|Liste (NotificationBE -objekt) med varsler for det preutfylte oppgavesettet|
|**PrefillFormBE**||
|DataFormatID|Id til skjema fra metadata kilde|
|DataFormatVersion|Versjon til skjema fra metadata kilde|
|SendersReference|Referanse for skjemaet satt av tjenesteeier, bør være unikt|
|FormDataXML|Preutfyllingsdata for skjemaet. Må legges i en CDATA blokk|
|**PrefillAttachmentBE**||
|AttachmentName|Dette er navnet på vedlegget, som det vises i portalen| 
|FileName|Navn på fil for det binære vedlegget|
|AttachmentData|Data for det binære vedlegget|
|AttachmentType|Angir MIME-typen for vedlegget: application_none - ingen MIME type angitt, application_pdf - PDF format, application_msword - Microsoft Word, Application_vnd_ms_excel - Microsoft Excel, application_vns_oasis_opendocument_textOpen document av type Text,	application_vnd_oasis_opendocument_presentation - Open docment av type Presentation, application_vnd_oasis_opendocument_spreadsheet - Open docment av type Spreadsheet, application_rtf - Rich text format type, application_vnd_ms_powerpoint - Microsoft PowerPoint, application_postscript, application_zip - Type zip, text_plain, text_html, text_xml, text_rtf - Rich text format type, text_richtext - Rich text, binary_octet_stream - Binary format, not_Applicable|
|SendersReference|Referanse for vedlegget. Settes av tjenesteeier|
|**PrefillIdentityField**||
|FieldValue|Verdi for identifiserende feltet. Må settes når det skal være mer enn ett preutfylt skjemasett for samme tjeneste og avgiver. Se avsnitt Identifiserende felter for mer info|
|**NotificationBE**||
|ShipmentDateTime| Når varsel skal sendes til mottaker|
|LanguageCode|	Språk kode:	1033 - English, 1044 - Bokmål, 2068 - Nynorsk|
|FromAddress|Avsender adresse (e-post). Hvis ikke satt benyttes avsenderadresse satt i varselmalen|
|NotificationType|En unik streng som definerer en referanse til predefinerte varslingstekster|
|ReceiverEndPoints|Liste av mottaker addresser (ReceiverEndPointBE)|
|TextTokens|Liste av tekster som skal erstatte maltekst i varselmal|
|**ReceiverEndPoint**||
|ReceiverAddress|Adressen (telefonnummer eller e-postadresse) for mottakspunktet|
|TransportType|Type varsling: Email, SMS, Instant Message (IM), Both email & sms|
|**TextTokenSubstitution**||
|TokenNum| Ikke i bruk, kan utelates|
|TokenValue|Tekst som skal ersatte maltekst. Substitusajonen gjøres i samme rekkefølge som parameterene er angitt. Varselmal må bestilles og lages på forhånd|
|**ReceiptBE**||
|ReceiptId|Unik identifikator kvitteringen i Altinn. Benyttes for eksempel ved senere oppdatering av kvittering|
|ReceiptText|Tekst i kvitteringen|
|ReceiptHistory|Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken|
|LastChanged|Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)|
|ReceiptTypeName|Angir hva kvittering gjelder. Mulige verdier: FormTask -Skjemasett, Correspondence - Melding, PINCODE - PINkoder, Subscription - Abonnement, Outbound - Forsendelse sendt fra Altinn, PreFill - Preutfyllingsdata, Broker - Formidlingstjeneste, RegisterDLS - DLS registerdata, 	RegisterDSF - DSF registerdata, RegisterER - ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp - Innsynstjeneste|
|ReceiptTemplate|Angir malen (XML) som skal benyttes for kvittering|
|ReceiptStatusCode|Status for forsendelse som kvitteringen gjelder: NotSet (standardverdi som brukes når status ikke er satt – skal ikke kunne mottas som verdi), OK, UnExpectedError, ValidationFailed, Rejected|
|ParentReceiptId|Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering)|
|References|Liste med ReferenceBE-objekter for kvitteringen|
|SubReceipts|Liste med tilhørende Receipt-objekter (dersom denne kvitteringen er en hovedkvittering)|
|**ReferenceBE**||
|ReferenceValue|Selve referansen (verdien) satt på kvitteringen. Typisk forsendelsesreferansen|
|ReferenceTypeName|Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Benyttes ikke, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen som typisk er den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, ArchiveReference - Arkivreferanse|

#####9.6.3	Håndtering av Etatid attribut i skjemadefinasjon fra OR ved Prefil
Skjema definert av oppgaveregisteret har ofte en valgfri attributt kalt etatid som er en enum med gyldige etater for skjemadefinasjon.  Denne verdien er ikke i bruk i Altinn 2 og kan ikke benyttes.  Hvis verdi settes i XML som sendes inn fra etatssystem vil skjema ikke validere.

#####9.7	Subscription
Subscription inneholder operasjoner relatert til abonnement på tjenester i Altinn.

Påfølgende kapittel beskriver tjenesteoperasjonen for denne tjenesten.

#####9.7.1	SubmitSubscription
SubmitSubscription kalles for å lagre abonnement for ett eller flere skjemasett i Altinn. Det er mulig å sende abonnementsdata for mer enn ett oppgavesett i ett kall til SubmitSubscription. Skjemasettet må være definert som en tjeneste i tjenesteutviklingsløsningen og migrert til Altinn før en tjenesteeier kan sette opp abonnement for et skjemasett. Operasjon GetAvailableServices kan kalles for å sjekke om tjenesten for skjemasettet eksisterer i Altinn.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|externalBatchId|Unik id for forsendelse. Denne defineres og settes av tjenesteeier. Returneres i kvittering. Identifikatoren kan senere benyttes av tjenesteeier for å hente ut kvittering for den gitte forsendelsen|
|SubscriptionDetails|Liste med SubscriptionDetailsBE-objekter som inneholder metadata og abonnement|
|**Property**|**Beskrivelse**|
|**SubscriptionDetailsBE**||
|SubscriptionList|Liste med abonnement (SubscriptionBE-objekter)|
|SystemUserCode|Kode som unikt representerer kildesystem, f.eks. "ABC-123". Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier|
|**SubscriptionBE**||
|ReporteeId|Fødselsnummer eller organisasjonsnummer som identifiserer hvem dataene gjelder|
|StartDate|	Dato for når abonnementet skal aktiviseres (yyyy-MM-dd)|
|ExpirationDate|	Dato for når abonnementet opphører (yyyy-MM-dd)|
|NextScheduleDate|	Dato for når abonnementet skal instansieres neste gang (yyyy-MM-dd). Første dato settes av tjenesteeier, neste kalkuleres av runtiejobb i Altinn (basert på periodetype)|
|NextDueDate|	Dato for når abonnementet/innsendingstjenesten må være fylt ut av bruker i portal/sluttbrukersystem (yyyy-MM-dd). Første dato settes av tjenesteeier, neste kalkuleres av runtiejobb i Altinn (basert på periodetype)|
|VisibleDate|	Dato for når abonnementet skal være synlig i portal/for sluttbrukersystemer (yyyy-MM-dd)|
|SubscriptionPeriodType| Angir hvor ofte abonnementet skal instansieres (obligatorisk): Annual - årlig, Semiannual - to ganger årlig, Quarterly - tre ganger årlig, Tertiary - fire ganger årlig, Bimonthly - annenhver måned, Monthly - hver måned, Fortnightly - hver 15. dag, Weekly  - hver uke, Daily  - hver dag, Once -abonnementet instansieres én gang|
|IdentityFields|Liste (SubscriptionIdentityField-objekt) som inneholder identifiserende felter for det abonnementet. Settes kun hvis abonnementet skal kobles til et gitt preutfylt skjemasett|
|ExternalServiceEditionCode|Utgave av tjenesten det skal opprettes abonnement for|
|ExternalServiceCode|Unik identifikator for tjenesten det skal opprettes abonnement for|
|CaseId|Valgfri referanse til samhandlingstjeneste skjema skal knyttes til|
|**SubscriptionIdentityField**||
|FieldValue|Verdi for identifiserende feltet. Må angis hvis abonnement skal kobles til et preutfylt skjemasett. Se avsnitt Identifiserende felter for mer info|
|**ReceiptBE**||
|ReceiptId|Unik identifikator kvitteringen i Altinn. Benyttes for eksempel ved senere oppdatering av kvittering|
|ReceiptText|Tekst i kvitteringen|
|ReceiptHistory|Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken|
|LastChanged|Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)|
|ReceiptTypeName|Angir hva kvittering gjelder. Mulige verdier: FormTask - Skjemasett, Correspondence - Melding, PINCODE - PIN-koder, Subscription - Abonnement, Outbound - Forsendelse sendt fra Altinn, PreFill - Preutfyllingsdata, Broker - Formidlingstjeneste, RegisterDLS - DLS registerdata, RegisterDSF - DSF registerdata,	RegisterER - ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp - Innsynstjeneste|
|ReceiptTemplate|Angir malen (XML) som skal benyttes for kvittering|
|ReceiptStatusCode|Status for forsendelse som kvitteringen gjelder:	NotSet (standardverdi som brukes når status ikke er satt – skal ikke kunne mottas som verdi), OK, UnExpectedError, ValidationFailed, Rejected|
|ParentReceiptId|Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering)|
|References|Liste med ReferenceBE-objekter for kvitteringen|
|SubReceipts|Liste med tilhørende Receipt-objekter (dersom denne kvitteringen er en hovedkvittering)|
|**ReferenceBE**||
|ReferenceValue|Selve referansen (verdien) satt på kvitteringen. Typisk forsendelsesreferansen|
|ReferenceTypeName|Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Benyttes ikke, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, ArchiveReference - Arkivreferanse|

#####9.8	AuthorizationAdministration
AuthorizationAdministration er tjenesten i Altinn II for import av eksterne regler og ressurser brukt til å ta avgjørelser der Altinns autorisasjonskomponent benyttes. Er tilknyttet tjenesten AuthorizationDecisionPointExternal som benytter importert informasjon.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.

#####9.8.1	ImportAuthorizationPolicy
Operasjon for å importere XACML regler for ekstern autorisering.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|authorizationRulesXml|	XML på XACML standard som inneholder autorisasjonsreglene|
|**Returverdi**|**Beskrivelse**|
|Boolsk|Returnere status for regelimporten, true, vellykket eller false, feilet|

Altinn spesifikke elementer XACML-forespørselen:

|**Foreldrenode**|**AttributeId**|**AttributeValue verdier**|
|--------|--------|--------|
|Subject|urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:rolecode|Kode for rollen|
|Subject|urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:authenticationlevel|Autentiseringsnivå 0, 1, 2, 3, 4. Hvilke nivå som skal kreves for en resurs.|
|Subject|urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:delegatable|true / false kan rettigheten delegeres videre|
|Subject|urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:external-resource|Ekstern ressursdefinisjon|
|Subject|urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id|Read Write Sign ArchiveRead ArchiveDelete ServiceOwnerArchiveRead Delegate|
|Subject|urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:rolecode|Kode for rollen|

**Følgende er et eksempel på valid XACML for eksterne regler:**
AuthorizationPolicy
```xml
<?xml version="1.0" encoding="utf-8"?>
<xacml:Policy xmlns:xacml="urn:oasis:names:tc:xacml:2.0:policy:schema:os" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:policy:schema:os http://docs.oasis-open.org/xacml/2.0/access_control-xacml-2.0-policy-schema-os.xsd" PolicyId="#1" Version="1.0" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combiningalgorithm:deny-overrides">
  <xacml:Description>This is an example RolePolicy XACML and how it should be sent from external systems to add external rules</xacml:Description>
  <xacml:Target/>
  <xacml:Rule RuleId="#1" Effect="Permit">
    <xacml:Description>This is a rule giving a person with DAGL READ for the external resource NAVRF1030</xacml:Description>
    <xacml:Target>
      <xacml:Subjects>
        <xacml:Subject>
          <xacml:SubjectMatch MatchId="urn:oasis:names:tc:xacml:2.0:function:string-equal">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
            <xacml:SubjectAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:rolecode" DataType="http://www.w3.org/2001/XMLSchema#string"/>
          </xacml:SubjectMatch>
          <xacml:SubjectMatch MatchId="urn:oasis:names:tc:xacml:2.0:function:string-equal">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">2</xacml:AttributeValue>
            <xacml:SubjectAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:authenticationlevel" DataType="http://www.w3.org/2001/XMLSchema#string"/>
          </xacml:SubjectMatch>
          <xacml:SubjectMatch MatchId="urn:oasis:names:tc:xacml:2.0:function:string-equal">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#boolean">false</xacml:AttributeValue>
            <xacml:SubjectAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:delegatable" DataType="http://www.w3.org/2001/XMLSchema#string"/>
          </xacml:SubjectMatch>
        </xacml:Subject>
      </xacml:Subjects>
      <xacml:Resources>
        <xacml:Resource>
          <xacml:ResourceMatch MatchId="urn:oasis:names:tc:xacml:2.0:function:string-equal">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">NAVRF1030</xacml:AttributeValue>
            <xacml:ResourceAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:external-resource" DataType="http://www.w3.org/2001/XMLSchema#string"/>
          </xacml:ResourceMatch>
        </xacml:Resource>
      </xacml:Resources>
      <xacml:Actions>
        <xacml:Action>
          <xacml:ActionMatch MatchId="urn:oasis:names:tc:xacml:2.0:function:string-equal">
            <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Read</xacml:AttributeValue>
            <xacml:ActionAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id"  DataType="http://www.w3.org/2001/XMLSchema#string "/>
          </xacml:ActionMatch>
        </xacml:Action>
      </xacml:Actions>
    </xacml:Target>
  </xacml:Rule>
</xacml:Policy>
```
####9.8.2	GetRoles
Operasjon for å hente ut en liste over roller etter angitte søkekriterier

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|systemUserName|Org.nummer for enheter, fødselsnummer for enkeltpersoner|
|systemPassword|Passord|
|roleSearchBE|ExternalRoleSearchBE-objekt|
|**Returverdi**|**Beskrivelse**|
|ExternalRoleBEList|Liste med ExternalRoleBE-objekter|
|**Returverdi**|**Beskrivelse**|
|   |**ExternalRoleBE**|
|RoleTypeSource||
|RoleCode|Rollekode|
|RoleName|Navn på rolle|
|OfferedBy|Enhet/bruker som rollen gjelder for|
|Enhet/bruker som innehar rollen|Enhet/bruker som innehar rollen|
|DelegatedBy|Enhet/bruker som har delegert rollen|
||**ExternalRoleSearchBE**|
|CoveredByParty|Enhet som innehar rollen|
|CoveredByUser|Bruker som innehar rollen|
|LanguageID|Språkid (English 1033, Bokmål 1044, Nynorsk 2068)|
|OfferedByParty|Enhet som rollen gjelder for |
|RoleCodeFilter|Filtrer med spesific rollekode. Støtte for kun 1 rolle om gangen|
Dersom man sender med verdi i søket (RoleSearch-objektet) for OfferedByParty, kan man ikke samtidig sende med verdier for  både CoveredByUser og CoveredByParty, og man kan heller ikke søke på OfferedParty uten å sende med verdi for enten CoveredByUser eller CoveredByParty.

**Eksempelkall:**
```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://www.altinn.no/services/Authorization/Administration/2010/10" xmlns:ns1="http://schemas.altinn.no/services/Authorization/Administration/2009/10">
   <soap:Header/>
   <soap:Body>
      <ns:GetRoles>
         <ns:roleSearchBE>
            <ns1:CoveredByParty>orgnummer1</ns1:CoveredByParty>
            <ns1:CoveredByUser></ns1:CoveredByUser>
            <ns1:LanguageID>1044</ns1:LanguageID>
            <ns1:OfferedByParty>orgnummer2</ns1:OfferedByParty>
            <ns1:RoleCodeFilter></ns1:RoleCodeFilter>
         </ns:roleSearchBE>
      </ns:GetRoles>
   </soap:Body>
</soap:Envelope>
```
### 9.8.3 GetReportees
Operasjon for å hente ut en liste over mulige avgivere for et gitt fødselsnummer.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|userSSN|Fødselsnummeret til brukeren det skal hentes avgivere for – pålagt parameter|
|retrieveInActiveReportee|Flagg for å sette om også inaktive avgivere skal returneres, standard False – valgfri parameter|
|RetrieveSubEnitiy|Flagg for å sette om også underenheter skal returneres, standard False – valgfri parameter|
|maximumReporteeCount|Verdi for maksimum antall avgivere som skal returneres, standard satt til alle – valgfri parameter|
|**Returverdi**|**Beskrivelse**|
|ExternalReporteeBEList|Liste med ExternalReporteeBE-objekter|
|**Returverdi**|**Beskrivelse**|
|ExternalReporteeBEList|Liste med ExternalReporteeBE-objekter|
|**Returverdi**|**Beskrivelse**|
||**ExternalReporteeBE**|
|Name|Avgivers navn|
|OrganizationNumber|Organisasjonsnummer for denne avgiveren hvis dette er en organisasjon|
|SSN|Fødselsnummer for denne avgiveren hvis dette er en person|
|ReporteeType|Typebeskrivelse for hvilken type avgiver dette er: None, Person, Organization, eller SelfIdentified (ikke et praktisk mulig scenario i denne sammenhengen)|

####9.8.4	GetReporteeByTempKey
Operasjon for å hente ut informasjon om avgiver basert på nøkkel opprettet for lenketjenesten.
Nøkkelen er kun gyldig i en tidsbegrenset periode, og kan kun benyttes en gang.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|tempKey|Nøkkel som angitt i lenketjenestens request URL, vil utgå etter at informasjon er hentet ut – pålagt parameter|
|**Returverdi**|**Beskrivelse**|
|ExternalReporteeBE|ExternalReporteeBE-objekt|
|**Returverdi**|**Beskrivelse**|
||**ExternalReporteeBE**|
|Name|Avgivers navn|
|OrganizationNumber|Organisasjonsnummer for denne avgiveren hvis dette er en organisasjon.|
|SSN|Fødselsnummer for denne avgiveren hvis dette er en person|
|ReporteeType|Typebeskrivelse for hvilken type avgiver dette er: None, Person, Organization, eller SelfIdentified (ikke et praktisk mulig scenario i denne sammenhengen)|

#### 9.9	AuthorizationDecisionPointExternal
AuthorizationDecisionPointExternal er en tjeneste Altinn tilbyr til tjenesteeiere som ønsker å benytte Altinns autorisasjonskomponent. Tjenesten kan benyttes til autorisasjon både for eksterne resurser og for tjenester. Autorisasjons regler settes henholdsvis ved hjelp av AuthorizationAdministration tjenesten og i TUL.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.
#### 9.9.1	AuthorizeAccessExternalV2
Operasjon som benytter XACML standarden og regler lagret i Altinn til å returnere en autorisasjonsbeslutning.

Besluttningsgrunnlaget til autorisasjon for eksterne resurser er de regler som tjenesteeier selv setter ved hjelp av tjenesten AutorizationAdministration når resursen defineres. Besluttningsgrunnlaget til autorisasjon for tjenester er de regler som tjenesteeier har satt på tjenesten i TUL. 

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|XACMLRequest|XACML standardisert forespørsel|
|**Returverdi**|**Beskrivelse**|
|Resultat|XACML standardisert svar|
Tjenesten benytter en XSD til å validere input.

I tillegg er det en del regler relatert til utfylling som XSD ikke klarer fange opp. XACML-forespørselen skal inneholde en kombinasjon av følgende elementer:

|**Foreldrenode**|**AttributeId**|**AttributeValue verdier**|
|--------|--------|--------|
|Subject|urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn|Utførende brukers fødselsnummer|
|Subject|urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:orgno|Utførende organisasjons organisasjonsnummer|
|Subject|urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:oauth-accesstoken|Referanse token for et spesifikk samtykke utførende bruker/org skal benytte. Må hentes fra AuthorizationExternal/TokenExternalEC.svc tjenesten.|
|Resource|urn:oasis:names:tcurn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno:xacml:2.0:resource:urn:altinn:reportee-ssn|Avgivers fødselsnummer|
|Resource|urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno|Avgivers organisasjonsnummer|
|Resource|urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:external-resource|Ekstern ressursdefinisjon|
|Resource|urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode|Eksterne tjenestekode|
|Resource|urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode|Ekstern utgavekode (tilhørende overnevnte tjenestekode)|
|Resource|urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reporteeelementid|Den unike id'en til et reportee element|
|Action|urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id|Read Write Sign ArchiveRead ArchiveDelete ServiceOwnerArchiveRead Delegate|
|Environment|urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment|De ulike miljøer|

Mulige Subject kombinasjoner:
1.	Utførende brukers fødselsnummer (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn) eller utførende oranisasjons org.nummer (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:orgno)
2.	Utførende brukers fødselsnummer (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn) eller utførende oranisasjons org.nummer (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:orgno), og referanse token for relatert samtykke (urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:oauth-accesstoken).


Mulige Resource kombinasjoner:
1.	Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ekstern tjenestekode og utgavekode (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode og urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode)
2.	Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ekstern ressursdefinisjon (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:external-resource).
3.	Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ReporteeElementId (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reporteeelementid).

Signeringsrettigheter oppfører seg noe annerledes enn de andre. Signering er en rettighet som kun kan gis på konkrete prosesssteg i livsløpet til et element. For å kunne gi helt korrekt svar på om en person har lov til å signere er Altinn derfor avhengig av å få oppgitt id til et reporteeelement.

Unntaket fra dette er om en tjeneste har kun ett signeringssteg. I et slikt tilfelle kan Altinn anta at når det endelig skal signeres så vil aktivt prosesssteg være dette ene steget. På slike tjenester er det derfor trygt å oppgi tjenestekoder istedenfor reporteeelementid.

Hvis en tjeneste har flere signeringssteg vil Altinn velge det første signeringssteget i prosessen. Dette kan i enkelte tilfeller føre til feil konklusjon. Hvis for eksempel en revisor skal signere et element i signeringssteg 2 (etter regnskapsfører), så kan Altinn svare negativt på spørsmål om revisor kan signere (benytter sign steg 1) selv om revisor vil få lov når elementet endelig kommer til revisors signeringssteg i prosessen.

Altinn selv har ikke mulighet til å sjekke signeringsrettighet uten å ha id til et reporteeelement. Sjekk av signeringsrettighet basert på tjenestekoder er logikk laget spesielt for AuthorizeAccessExternalV2.

Det må også angis hvilke miljø det gjelder (urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment)

Nedenfor vises eksempler på gyldige forespørsler:

**AuthorizationRequest**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Request
    xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:context:schema:os 
      http://docs.oasis-open.org/xacml/access_control-xacml-2.0-context-schema-os.xsd">

  <!-- Altinn Sample Request.   -->
  <!-- This authorization request tries to verify if user 07037612345 is allowed to  -->
  <!-- perform read operation on external resource belonging to reportee 010203401944      -->
  <!-- there is a registered consent for the record.                  -->

  <Subject>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>07037512345</AttributeValue>
    </Attribute>
  </Subject>
  <Resource>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>010203401944</AttributeValue>
    </Attribute>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:external-resource"
            DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>RF1080NAV</AttributeValue>
    </Attribute>
  </Resource>
  <Action>
    <Attribute
          AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id"
          DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>Read</AttributeValue>
    </Attribute>
  </Action>
  <Environment>
    <Attribute 
        AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment" 
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>AT6</AttributeValue>
    </Attribute>
  </Environment>
</Request>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Request
    xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:context:schema:os 
      http://docs.oasis-open.org/xacml/access_control-xacml-2.0-context-schema-os.xsd">

  <!-- Altinn Sample Request.   -->
  <!-- This authorization request tries to verify if user  -->
  <!-- 06069460079 is allowed to perform sign operation -->
  <!-- on behalf of reportee 910453777 -->
  <!-- on service 2298, edition 60804 -->

  <Subject>
   <Attribute
       AttributeId="urn:oasis:names:tc:xacml:2.0:subject:urn:altinn:ssn"
       DataType="http://www.w3.org/2001/XMLSchema#string">
    <AttributeValue>06069460079</AttributeValue>
    </Attribute>
  </Subject>
  <Resource>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>910453777</AttributeValue>
    </Attribute>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>2298</AttributeValue>
    </Attribute>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>60804</AttributeValue>
    </Attribute>
  </Resource>
  <Action>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:action-id"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>Sign</AttributeValue>
    </Attribute>
  </Action>
  <Environment>
    <Attribute
        AttributeId="urn:oasis:names:tc:xacml:2.0:action:urn:altinn:environment"
        DataType="http://www.w3.org/2001/XMLSchema#string">
      <AttributeValue>TT02</AttributeValue>
    </Attribute>
  </Environment>
</Request>
```
Operasjonen returnerer XML som også følger XACML standarden. Under vises et eksempel på en response.

**AuthorizationResponse**
```xml
<xacml:Response xmlns:tns="urn:oasis:names:tc:xacml:2.0:policy:schema:os" xmlns:xacml="urn:oasis:names:tc:xacml:2.0:context:schema:os" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:context:schema:os http://docs.oasis-open.org/xacml/2.0/access_control-xacml-2.0-context-schema-os.xsd">
  <xacml:Result ResourceId="">
    <xacml:Decision>Permit</xacml:Decision>
    <xacml:Status>
      <xacml:StatusCode Value="urn:oasis:names:tc:xacml:2.0:response:urn:altinn:ok" />
	<xacml:StatusMessage></xacml:StatusMessage>
   </xacml:Status>
	<tns:Obligations>
		<tns:Obligation FulfillOn="Permit" ObligationId="">
			<tns:AttributeAssignment AttributeId="urn:oasis:names:tc:xacml:2.0:obligation:urn:altinn:authenticationlevel" DataType="http://www.w3.org/2001/XMLSchema#string">
				<tns:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">3</tns:AttributeValue>
        	 </tns:AttributeAssignment>
		</tns:Obligation>
	</tns:Obligations>
  </xacml:Result>
</xacml:Response>
```
##### 9.10	CaseAgencySystem
Case er tjenesten i Altinn II for administrering av Samhandlingstjenester for tjenesteeiere. For mer informasjon se Tjenestekatalog (Service Inventory) og WSDL tilgjengelig på endepunkt.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.

#####9.10.1	InstantiateCollaborationAgencySystem
Denne operasjonen brukes av tjenesteeier til å instansiere samhandlingstjenester for en gitt person eller organisasjon.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|externalServiceCode|Angir tjenestekoden for samhandlingstjeneste som skal instansieres|
|externalServiceEditionCode|Angir tjenesteutgavekoden for samhandlingstjenesten som skal instansieres|
|reporteeNumber|Fødselsnummer eller organisasjonsnummer som saken skal opprettes for|
|visibleDateTime|Angir når samhandlingstjenesten skal være synlig (yyyy-MM-dd / yyy-MM-ddThh:mm:ss)|
|dueDate|Angir når samhandlingstjenesten skal være ferdig (yyyy-MM-dd / yyy-MM-ddThh:mm:ss)|
|**Returverdi**|**Beskrivelse**|
|CaseId|Unike identifikator for samhandlingstjenesten|

Tabellen under angir mulige feilkoder for operasjonen

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|60002|Tjenestekode og tjenesteutgavekode er ikke angitt|
|60012|Angitt avgiver er ikke gyldig|
|60024|Angitt tjenesteeier er ikke autorisert for valgt tjeneste|

##### 9.10.2	GetCaseListAgencySystem
Denne operasjonen brukes av tjenesteeier til å hente informasjon om eksisterende samhandlingstjenester.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|caseID|**Enten:** Unike identifikator for samhandlingstjenesten som skal hentes|
|externalServiceCode|**Eller:** Tjenestekoden for samhandlingstjenesten det skal slås opp mot|
|externalServiceEditionCode|**Og:** Tjenesteutgavekoden for samhandlingstjenesten det skal slås opp mot|
|languageID|Språk id: 1033 - English, 1044 - Bokmål, 2068-Nynorsk|
|reporteeNumber|Fødselsnummer eller organisasjonsnummer det skal hentes for|
|**Returverdi**|**Beskrivelse**|
|CaseList|Liste med ExternalCaseBE objekter|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
||**ExternalCaseBE**|
|CaseID|Unik identifikator for samhandlingstjenesten|
|CaseName|Samhandlingstjenestens navn definert i TUL1|
|CurrentStateFriendlyName|Visningsvennlig navn for samhandlingstjenestens tilstand basert på languageID parameter, satt i TUL|
|CurrentStateID|Unik identifikator for samhandlingstjenestens tilstand, som satt i TUL|
|CurrentStateName|Navn for samhandlingstjenestens tilstand, som satt i TUL|
|NoticeTemplateID|Unik identifikator for eventuell merknad satt på samhandlingstjenesten|

Tabellen under angir mulige feilkoder for operasjonen:

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|60001|Angitt CaseID er ikke gyldig|
|60002|Tjenestekode og tjenesteutgavekode er ikke angitt, eller er ikke en gyldig tjeneste|
|60012|Angitt avgiver er ikke gyldig|
|60014|Angitt CaseID er arkivert|
|60015|Angitt CaseID er slettet|
|60024|Angitt tjenesteeier er ikke autorisert for valgt tjeneste|

##### 9.10.3	NotifyEventAgencySystem
Denne operasjonen benyttes for å registrere en hendelse på en eksisterende samhandlingstjeneste.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|notificationInfo|Objekt av typen StateMachineEventNotificationBE som angir hendelse og hva hendelsen gjelder for|
|**Returverdi**|**Beskrivelse**|
|StateMachineNotificationResultBEList|Liste av typen StateMachineNotificationResultBE som angir resultat av hendelsen|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
|CaseID|**Enten:** Unik identifikator for bestemt samhandlingstjeneste hendelsen gjelder for|
|ExternalServiceCode|**Eller:** Tjenestekoden for samhandlingstjenestene hendelsen gjelder for|
|ExternalServiceEditionCode|**Og:** Tjenesteutgavekoden for samhandlingstjenestene hendelsen gjelder for|
|Event|Hendelsen som skal registreres|
|ReporteeElementID|Eventuell id til sub-element som trigger hendelsen, benyttes kun i logg sammenheng|
||**StateMachineNotificationResultBE**|
|CaseID|Identifikator for samhandlingstjenesten hendelsen ble registrert for|
|IsStateChanged|Boolsk verdi som angir om en tilstandsendring skjedde|
|ConditionName|Navn på betingelsen som er assosiert|
|ConditionEvaluationResult|Boolsk verdi som angir resultatet for betingelsen hvis en betingelse er tilknyttet (satt til True om ingen betingelse er involvert)|
|CurrentStateName|Samhandlingens nåværende tilstand|
|HasException|Boolsk parameter som antyder om det oppstod en feil i tilstandsmaskinen|
|ExceptionDetail|Inneholder feilinformasjon for en eventuell feil i tilstandsmaskinen|
|ErrorCode|Inneholder feilkoden for en eventuell feil i tilstandsmaskinen|

Tabellen under angir mulige feilkoder for operasjonen:

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|60001|Angitt CaseID er ikke gyldig|
|60002|Tjenestekode og tjenesteutgavekode er ikke angitt, eller er ikke en gyldig tjeneste|
|60014|Angitt CaseID er arkivert|
|60015|Angitt CaseID er slettet|
|60022|Hendelsesinformasjon er ikke angitt|
|60023|Hendelse er ikke angitt|
|60032|Hendelsen kunne ikke registreres for valgt tjeneste|

##### 9.10.4	SetNoticeAgencySystem
Denne operasjonen lar tjenesteeier sette en merknad på en instans av en samhandlingstjeneste, eller en underliggende instans av meldingstjeneste, innsendingstjeneste, eller arkivert innsynstjeneste.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|reporteeElementID|Identifikator for elementet merknaden skal settes på: 1. Saks identifikator – caseId.	2. Arkivert element tilknyttet samhandlingstjenesten – reporteeElementID prefikset med AR 3. Aktivt element tilknyttet samhandlingstjenesten – reporteeElementID|
|noticeInfo|Objekt av typen NoticeBE som inneholder mal og eventuelle substitusjoner|
|**Returverdi**|**Beskrivelse**|
|N/A|N/A|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
||**NoticeBE**|
|NoticeTemplateID|Identifikator for merknadsmalen opprettet i TUL.|
|NoticeTokens|Liste av typen NoticeTokenBE objekter som inneholder key-value par for substitusjoner|
||**NoticeTokenBE**|
|TokenKey|Nøkkel for substitusjon|
|TokenValue|Verdi for substitusjonen|

Tabellen under angir mulige feilkoder for operasjonen:

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|60005|Angitt element er ikke på gyldig format|
|60014|Angitt saks identifikator er arkivert|
|60015|Angitt saks identifikator er slettet|
|60016|Angitt element eksisterer ikke|
|60017|Angitt element er ikke assosiert til en samhandlingstjeneste|
|60018|Angitt element er slettet|
|60019|Angitt element er arkivert, benytt valid arkivreferanse|
|60024|Angitt tjenesteeier er ikke autorisert for valgt tjeneste|

##### 9.11	NotificationAgencyExternal
Notification er en tjeneste i Altinn II for sending av frittstående varsler til bruker. For mer informasjon se Tjenestekatalog (Service Inventory) og WSDL tilgjengelig på endepunkt.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.
##### 9.11.1	SendStandaloneNotificationV3
Denne operasjonen benyttes til å sende frittstående varsel – varsel som ikke nødvendigvis er tilknyttet tjenester.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|standaloneNotifications|List med StandaloneNotificationBE objekter som inneholder varslene|
|**Returverdi**|**Beskrivelse**|
|sentStandaloneNotificationResult|Liste med Notification og EndPoint resultater. Det blir opprettet et Notification og EndPoint resultat per EndPoint per Notification som blir sendt|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
||**StandaloneNotificationBE**|
|FromAddress|Fra adresse brukt når melding blir sent på e-post. Må være en valid e-post adresse. Hvis utelatt vil standard Altinn adresse benyttes|
|LanguageID|Språk kode:	1033 - English, 1044 - Bokmål, 2068 - Nynorsk|
|ReceiverEndPoints|Liste med ReceiverEndPoint objekter som definerer mottaker adresse og varslingsmåte|
|ReporteeNumber|Fødselsnummer eller organisasjonsnummer det skal sendes varsel til|
|ShipmentDateTime|Dato for når varselet ønskes sent (yyyy-MM-dd / yyy-MM-ddThh:mm:ss)|
|TextTokens|Liste med TextTokens objekter som angir substitusjoner i varslingsteksten|
|NotificationType|En unik streng som definerer en referanse til predefinerte varslingstekster|
|IsReservable|I sammenheng med KRR (Kontakt og reservasjons registeret) kan en sluttbruker reservere seg imot å motta meldinger. IsReservable verdien kan brukes til å indikere om det er mulig å reservere seg mot meldingen eller ikke. Det er valgfritt å angi en verdi og standard (default) verdi er False (0). Denne verdien må derfor aktivt settes til True (1) om tjeneste eier ønsker og respektere reservasjoner|
|Roles|Liste med navn på bruker-roller. Disse verdiene blir ikke brukt av løsningen|
|Service|ServiceCode og ServiceEdition. Sett disse for å sende ut varlser til alle kontakter som er satt opp for en bedrift og som har satt seg opp for å motta for denne tjenesten|
||**ReceiverEndPoint**|
|TransportType|Angir hvordan varslingen skjer: SMS, Varsel vha. mobiltelefon, Email, Varsel vha. e-post, Both. Plukker epost-adresse og mobilnummer fra profil. Ved bruk av denne må ReceiverAddress under være null|
|ReceiverAddress|Mottakers adresse for valgt varslingsmetode (TransportType). Om denne ikke angis brukes ReceiverID til å slå opp i brukerens kontaktprofil (privat samtykke) eller organisasjonens profil|
||**TextTokens**|
|TokenNum|Ikke i bruk, kan utelates|
|TokenValue|Tekst som skal ersatte maltekst. Substitusajonen gjøres i samme rekkefølge som parameterene er angitt. Varselmal må bestilles og lages på forhånd|
||**SendStandaloneNotificationResult**|
|EndPoints|Liste med EndPoint resultater for Notification|
|NotificationType|NotificationType for notification. Brukes for å kunne se hvilken Notification resultatet gjelder|
|ReporteeNumber|Mottaker som ble brukt til å generere mottakere. Brukes for å kunne se hvilken Notification resultatet gjelder|
|Message|En melding om status på kall. Mulige verdier: 1. Varsel er sendt ut til brukeren. 2. Utsending av varsel til brukeren var mislykket. {0} Dette kan være fordi brukeren har reservert seg fra å få varsel. 3. BM_Partial success. Notification is not sent to the {0} as the user may have opted out from receiving any notification. 4. NB_No notifications received – Dette er resultatet hvis listen med Notifications var tom|
||**EndPointResult**|
|Name|Navn på person som har mottatt melding. Dette blir hentet enten fra Organisasjonens mottaker-liste, eller fra brukerens innslag i Register databasen|
|ReceiverAddress|Hvilken addresse meldingen er sendt til|
|RetrieveFromProfile|Satt til true dersom informasjonen er hentet fra en Organisasjons eller brukers profil|
|TransportType|Type endepunkt varsel er sendt til|

Tabellen under angir mulige feilkoder for operasjonen:

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|1|Elementene FromAddress og ShipmentDateTime kan ikke være tomme om definert|
|40014|Angitt antall varsler overstiger konfigurert grense|
|40015|TransportType må være enten SMS eller Email|
|40016|Angitt fødselsnummer er ikke gyldig|
|40020|Parameter FromAddress må være en gyldig e-post adresse|

##### 9.12	TTPArchiveAgencyExternal
TTPArchiveAgency er en tjeneste som muliggjør tjenesteeiere å hente ut data for elementer fra TTP Arkivet. For mer informasjon se Tjenestekatalog (Service Inventory) og WSDL tilgjengelig på endepunkt.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.
##### 9.12.1	GetAuditTrail
Denne operasjonen henter ut loggdata basert på søkeparametere.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|ReporteeNumber|**Enten:** Fødselsnummer eller organisasjonsnummer det skal søkes på|
|Username|**Eller:** Brukernavn det skal søkes på|
|FromDate|Fra dato det søkes på, angitt for å kunne begrense søket (yyyy-MM-dd / yyy-MM-ddThh:mm:ss)|
|ToDate|Til dato det skal søkes på, angitt for å kunne begrense søket (yyyy-MM-dd / yyy-MM-ddThh:mm:ss)|
|ExternalServiceCode|Angi tjenestekode for å begrense søket|
|ExternalServiceEditionCode|Angi tjenesteutgavekode for å begrense søket|
|**Returverdi**|**Beskrivelse**|
|TTPElementBEList|Resultatliste av TTPElementBE objekter som hver inneholder loggdata for et element|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
||**TTPElementBE**|
|IntegrityCheck|Angir om integritetssjekk av data var vellykket|
|ReporteeElementID|Identifikator for elementet loggdata er hentet fra|
|TTPData|Selve loggdata for elementet i XML|

##### 9.13	ReporteeElementList
Tjenesten ReporteeElementList inneholder operasjoner for uthenting av elementer fra sluttbrukers meldingsboks. Elementer kan ligge i arbeidsliste eller i arkiv, fra nåværende eller tidligere versjoner av Altinn.

Tjenesten benyttes fra tjenesteeiers portal/selvbetjeningsløsning på vegne av en autentisert sluttbruker.

Påfølgende kapittel beskriver operasjonen for denne tjenesten.
##### 9.13.1	GetReporteeElementListV2
Denne operasjonen benyttes for å hente ut data for en gitt avgiver (privatperson eller virksomhet) fra en autentisert sluttbrukers meldingsboks. Data kan være alle tjenestetyper i nåværende eller tidligere versjoner av Altinn: Innsendingstjenester, meldingstjenester, samhandlings¬tjenester og arkiverte innsynstjenester. Kun elementer som innlogget bruker har tilgang til, returneres.

Operasjonen returnerer en liste med tjenesteelementer fra arbeidsliste og arkiv. Listen inneholder detaljer for hvert element, tilstrekkelig for presentasjon i ekstern portal og dyplenking tilbake til elementet i Altinn. Utvalget bestemmes av inngitte søkekriterier, samt sluttbrukerens rettigheter i Altinn. Operasjonen er versjonert, gjeldende versjon er V2.
Tabellen under beskriver datakontrakten for operasjonen.

|**Input**|**Beskrivelse**|
|--------|--------|
|autentiseringsinfo vil defineres når tjeneste/operasjon settes opp||
|Search|Objekt av typen ExternalSearchBEV2 som inneholder søkekriterier for utvalget elementer man ønsker å hente ut|
|languageID|Språk kode:	1033 - English, 1044 - Bokmål, 2068 - Nynorsk (Hvis ikke språk er spesifisert kan 0 angis som vil returnere standard språk for denne meldingen.)|
|**Returverdi**|**Beskrivelse**|
|reporteeElementList|En liste med ReporteeElementBEV2-objekter som inneholder detaljer for ett element for en avgiver|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
||**ExternalSearchBEV2**|
|ToDate|Startdato for perioden man ønsker å hente ut elementer for (yyyy-MM-dd / yyy-MM-ddThh:mm:ss)|
|FromDate|Sluttdato for perioden man ønsker å hente ut elementer for (yyyy-MM-dd / yyy-MM-ddThh:mm:ss)|
|SearchName|Navn på søk. Benyttes kun dersom dette er et lagret søk|
|ToBeProcessed|Boolsk verdi som, hvis satt til true, angir at man ønsker å filtrere på tjenester som er ufullstendige/ikke-komplett|
|SearchString|Fritekstsøk som kan brukes for å matche hele eller deler av tjenestenavnet på elementer man ønsker å hente ut|
|ServiceCodeList|Liste med tjenester (string) som man ønsker å filtrere på|
|SentAndArchived|Boolsk verdi som, hvis satt til true, angir at man ønsker å filtrere på tjenester som er sendt og arkivert|
|ToBeProcessedByOthers|Filter for å angi at man bare ønsker å se sine elementer som i øyeblikket er til behandling hos andre aktører|
|ServiceOwnerCode|Tjenesteeier som man ønsker å filtrere utrekket på|
|Reportee|Fødselsnummer/organisasjonsnummer for avgiver som man ønsker å hente ut elementer for|
|ArchiveReference|Fritekstfelt hvor man kan angi hele eller deler av en arkivreferanse som man ønsker å filtrere på|
|CaseID|Begrenser søket mot bestemt samhandlingstjenesteinstans|
|CollectionPages|Benyttes for å begrense resultatet til samlesider (samhandlingstjeneste)|
|EDialogue|Benyttes for å begrense resultatet til e-dialoger (samhandlingstjeneste)|
||**ReporteeElementBEV2**|
|AllowDelete|En boolsk verdi som angir om bruker som hentet elementet fra arkiv har rettighet til å slette elementet|
|AllowNewCopy|Boolsk verdi som sier om man kan opprette kopi av elementet|
|Altinn1ArchiveUnitId|Unik identifikator for elementet i arkivet dersom dette er et element som er arkivert i Altinn I. Behøver ikke settes|
|Altinn1FormCode|Angir skjema id i AltinnI. Behøver ikke settes|
|Altinn1FormId|Angir skjema versjon AltinnI. Behøver ikke settes|
|Altinn1FormInstanceID|Angir element id i AltinnI. Behøver ikke settes|
|Altinn1FormORNo|Angir OR-id i AltinnI. Behøver ikke settes|
|Altinn1ParticipantID|Angir unik id for tilhørende AltinnI bruker. Behøver ikke settes|
|Altinn1ReferenceType|Angir referansetype satt i AltinnI. Behøver ikke settes|
|Altinn1WorkflowProcessId|Arbeidsflytreferanse for elementet dersom elementet er arkivert i AltinnI. Behøver ikke settes|
|ArchiveId|Unik identifikator for elementet i arkiv. ReporteeElementId, ArchiveId eller Altinn1ArchiveUnitId må settes, men bare en av gangen|
|ArchiveReference|Unik arkivreferanse som vises for elementet på avgivers hovedside|
|CaseID|Eventuelt referanse til samhandlingstjeneste elementet er knyttet opp mot|
|CorrespondenceStatus|Angir status for elementet (dersom elementet er av type meldingstjeneste). Mulige statuser er: Created - Meldingen er opprettet, Read - Meldingen er lest, Replied - Sluttbruker har svart på meldingen, ChangedByGovAgency - Tjenesteeier har gjort endringer på meldingen, ChangedByUser - Sluttbruker har gjort endringer på meldingen, Confirmed - Meldingen er bekreftet, DeletedByUser - Meldingen er slettet av sluttbruker, DeletedByAltinn - Altinn har slettet meldingen (for eksempel ved sanering), Archived - Meldingen er arkivert|
|DueDate|Frist på elementet. Ikke satt for elementer i arkiv|
|EndUserSystemID|Id som benyttes for å hente navn på sluttbrukersystem|
|ExternalServiceCode|Tjenestekode for elementet, for eksempel "PSA"|
|IsCaseArchived|Angir om samhandlingstjenesten er arkivert.|
|IsMatched|Intern parameter|
|LastChangedBy|Unik identifikator for bruker/sluttbrukersystem eller tjenesteeier som sist endret elementet|
|LastChangedByID|Unik identifikator for bruker/sluttbrukersystem eller tjenesteeier som sist endret elementet|
|LastChangedDate|Dato for når elementet sist ble endret (yyyy-MM-dd)|
|LastChangeType|Type endring som ble gjort sist elementet ble endret: Sent, Saved, Archived|
|Notice|Eventuell merknad på elementet tilhørende en samhandlingstjeneste|
|ParentCaseName|Eventuelt navn på samhandlingstjenesten elementet er knyttet mot|
|ReporteeElementCode|Angir element id hvor forkortelse for element typen er lagt til som prefiks. Mulige prefiks for element typer er:Altinn 1 - aktivt: A1E, Altinn 1 - arkivert: A1A, Altinn 2 - aktivt: A2E, Altinn 2 - arkivert: A2A|
|ReporteeElementId|Unik identifikator for elementet. ReporteeElementId, ArchiveId eller Altinn1ArchiveUnitId må settes, men bare en av gangen|
|ReporteeElementOwner|Unik identifikator for avgiver som elementet tilhører|
|ReporteeElementType|Type element: Correspondence - meldingstjeneste, FormTask - Innsendingstjeneste, Collaboration - samhandlingstjeneste, LookUp - innsynstjeneste|
|ReporteeName|Navn på avgiver som vises for elementet i avgivers hovedside|
|RoleRequirement|Rollekrav for å utføre neste steg i arbeidsflyt. Ikke satt for elementer i arkiv|
|RoleRequirementAltinn1Element|Rollekrav for å utføre neste steg i arbeidsflyt dersom elementet er instansiert i AltinnI. Ikke satt for elementer i arkiv. Behøver ikke settes for AltinnII elementer|
|SEReporteeElementID|Unik identifikator for elementet brukt før det arkiveres|
|ServiceEditionVersion|Angir versjon på tjenesten|
|ServiceOwner|Angir tjenesteeier som tilbyr tjenesten som elementet tilhører|
|ServiceOwnerCode|Tjenesteeierkode brukt for å angi tjenesteeier navn|
|ServiceOwnerDescription|Tjenesteeiers navn|
|Status|Status for elementet: NotOpenedNoConfirmationReq, NotOpenedConfirmationReq, OpenedNoConfirmedReq, OpenedNotConfirmed, Confirmed, FillIn, SignIn, Archive, SendIn, Active, Finished|
|Statusname|Navn på status (med språkstøtte)|
|TaskStatus|Angir status for elementet (dersom elementet er av type innsendingstjeneste). Elementet kan ha en av følgende statuser: FormFilling - Innsendingstjenesten er under utfylling. Signing - Innsendingstjenesten er klar for signering. SendIn - Innsendingstjenesten er klar for innsending, ParallelSigning - Innsendingstjenesten er til brukerstyrt signering, Archive - Innsendingstjenesten er arkivert|
|Title|Tittel på elementet som vises i avgivers hovedside|

##### 9.14	Context handler
Context handler er en modul i Altinn som tilbyr metadata for elementer i Altinn. Et element kan for eksempel være en innsending fra en sluttbruker. Meta-data (eller context data som det kalles her) for elementet vil da inneholde informasjon om hvem som er avgiver, hvilke tjeneste elementet er knyttet til og hvilket prosess steg det er i.

Dette er informasjon som benyttes internt i Altinn for å avgjøre om en bruker har tilgang til å utføre en gitt operasjon på et gitt element. Tjeneste eiere kan bruke informasjonen på tilsvarende måte ved å benytte Altinn sin eksterne autorisasjonssjekk (se eget kapittel om AuthorizationDecisionPointExternal).

##### 9.14.1	GetReporteeElementContextExternal
Denne operasjonen som tar som input en reporteeelementid og returnerer et objekt med en samling detaljer, meta-data, om elementet.

Tabellen under beskriver datakontrakten for operasjonen. (Merk at det finnes ulike grensesnittrelaterte variasjoner mellom Basic, WS-Security og EC grensesnittene.)

|**Input**|**Beskrivelse**|
|--------|--------|
|reporteeElementId|Unik identifikator for et spesifikk reportee element|
|**Returverdi**|**Beskrivelse**|
|ReporteeElementContextExternalBE|Entitet med meta-data om elementet det ble spurt på. (Flere detaljer under)|
||**ReporteeElementContextExternalBE**|
|Reportee|Unik id for avgiver knyttet til et element. Dette er somregel personnummer eller organisasjonsnummer|
|ServiceCode|Tjenestekoden til tjenesten som elementet er knyttet til|
|ServiceEditionCode|Tjenesteversjonskode til tjenesten som elementet er knyttet til|
|ServiceType|Angir hva slags tjeneste elementet er knyttet til. De mest vanlige typene er Correspondence og FormTask. Henholdsvis melding fra etat og innsending fra sluttbruker|
|ProcessStepID|Dette er en ID som indikerer hva slags prosess steg elementet står i. Dette er mest aktuelt ved innsendinger hvor et element går gjennom for eksempel skrive steg, signeringssteg og innsending|

##### 9.15	Online overføring til Tjenesteeier
Det er mulig for tjenesteeiere å motta online forsendelser av innsendingstjenester med vedlegg over web service. Mottaket skal ha en metode som heter ReceiveOnlineBatchExternalAttachment. Denne kalles som en "SOAP Document" metode, og kan benyttes til å motta innsendingstjenester hvor vedleggene er  pakket i en ekstern ZIP fil, ergo navnet. Denne tjenesten kan settes opp for MTOM for å støtte mer effektiv overføring av store binære vedlegg. Ved bruk av MTOM som dataoverføringsmetode kan det oppnås opptil 20-30% besparelse av båndbredde sammenliknet med vanlig dataoverføring mot web tjenesten.

Merk: Det er fullt mulig å sende uten vedlegg eksternt i ZIP fil over dette grensesnittet. Vedlegg vil da komme base64encoded i XML i batch parameteren, og det er ikke lenger mulig å sette opp tjenesten for bruk av MTOM. 

##### 9.15.1	ReceiveOnlineBatchExternalAttachment
Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|Username|Brukernavnet som Altinn skal oppgi|
|passwd|Passordet som Altinn skal oppgi|
|receiversReference||
|sequenceNumber|Sekvensnummer på forsendelsen|
|batch|Selve forsendelsen, iht.  nyeste versjon av XSD for genericbatch|
|attachments|ZIP-fil med evt. binære vedleggsfiler|
|**Returverdi**|**Beskrivelse**|
|[returverdi]|Status tilbake til Altinn for mottak av forsendelse iht. OnlineBatchReceipt.xsd|

Dersom det ikke finnes vedlegg til batchen vil parameteren “attachments" bli satt til en byte array med lengde 0.

Tabellen under beskriver elementer og attributter relevante for kvittering som skal returneres av tjenesteeier:

|**Element**|**Beskrivelse**|
|--------|--------|
|OnlineBatchReceipt|Rotnode. Denne XSDen beskriver kvitteringen som skal returneres fra et mottakssystem etter å ha mottatt en online forsendelse fra Altinn. Kvitteringen begrenser seg til å kun beskrive selve mottaket av batchen, og det er ikke lagt opp til at kvitteringen skal inneholde informasjon vedrørende prosessering av selve batchen|
|OnlineBatchReceipt.Result|Dette elementet har ett attributt resultCode som beskriver status på mottatt batch. Innholdet i Result-elementet er en valgfri streng. Denne blir ikke brukt programmatisk, men vil bli lest av driftspersonell i tilfelle feil|
|resultCode|De forskjellige resultatkodene som kan returneres fra mottaket: OK - Batch er mottatt OK, FAILED - Batch er ikke mottatt, eller det oppstod en feil i mottaket. Altinn kan forsøke forsendelse på ny, FAILED_DO_NOT_RETRY - Samme som FAILED, men Altinn skal ikke forsøke å sende batch på ny. Hvis web servicen returnerer vanlige errors vil ikke Altinn håndtere de riktig og oversendelsen vil feile. Alle feilmeldinger må derfor bygges inn under de to FAILED og FAILED_DO_NOT_RETRY.|

##### 9.15.1.1	Navnerom
For at Altinn sin webserviceklient skal kunne kommunisere med mottaket, er det viktig at følgende er satt korrekt (definisjonene vil finnes igjen i WSDL-filen). Denne informasjonen skal ligge i WSDL-filen man blir presentert for når man åpner definisjonen for mottakets web service.

|**Definisjon**|**Verdi**|**Beskrivelse**|
|--------|--------|--------|
|/wsdl:definitions/@xmlns:tns|http://AltInn.no/webservices/|Navneromsdefinisjon|
|/wsdl:definitions/@targetNamespace|http://AltInn.no/webservices/|Navneromsdefinisjon|
|/wsdl:definitions/wsdl:types/s:schema/@targetNamespace|http://AltInn.no/webservices/|Navneromsdefinisjon|
|/wsdl:definitions/wsdl:binding/wsdl:operation/soap:operation/@soapAction|http://AltInn.no/webservices/ReceiveOnlineBatchExternalAttachment|Identifikator for SOAP-metode|
|/wsdl:definitions/wsdl:service/wsdl:port/soap:address/@location|Mottaksavhengig|Dette er URLen til mottaket som Altinn skal benytte seg av|

##### 9.16 DownloadQueue
DownloadQueue inneholder operasjoner for å hente ned en liste over elementer som ligger i tjeneste-eiers DownloadQueue. For å bruke DownloadQueue må tjenesteeier spesifisere dette når man utvikler tjenesten i TUL. Ved å sette tjenesteutgaven til å bruke DownloadQueue vil innleverte skjemaer på denne tjenesten oppdatere DownloadQueue og tjenesteeier vil dermed kunne hente ut disse ved å sende en forespørsel til Altinn. 
For å bruke tjenesten må tjenesteeier først spesifisere at tjenesteutgaven bruker DownloadQueue. Deretter vil alle innsendinger sent inn med denne tjenesteutgaven legges til i DownloadQueue.
Når det ligger flere enn 500 elementer i DownloadQueue vil ikke nyere elementer lengre hentes når man bruker GetDownloadQueueItems operasjonen. For å få tilsendt nyere elementer må DownloadQueueItems fjernes fra DownloadQueue ved å bruke PurgeItem operasjonen.
DownloadQueue funksjonaliteten har støtte for MTOM.
Påfølgende kapitler beskriver tjenesteoperasjonenene for denne tjenesten.

##### 9.16.1 GetDownloadQueueItems
Denne operasjonen henter en liste over DownloadQueueItems i tjenesteeiers DownloadQueue. Den henter et maksimum av 500 meta-data objekter med arkivreferanse knyttet til den innsendte meldingen. Den henter alltid de eldste objektene først. Man kan velge å filterere hentede objekter basert på ServiceCode.

|**Input**|**Beskrivelse**|
|--------|--------|
|ServiceCode|ServiceCode som man ønsker å filtrere hentede DownloadQueueItems på. Denne inputen er valgfri|
|**Returverdi**|**Beskrivelse**|
|DownloadQueueItemList|En liste med metadata-objekter som beskriver arkiv-referanse, ServiceCode, ServiceEdition, reportee, reporteetype og arkiveringstidspunkt for aktive (non-purged) DownloadQueueItems for tjenesteeier|
|**Property**|**Beskrivelse**|
||**DownloadQueueItemExternalBEList**|
||**DownloadQueueItemExternalBEList.DownloadQueueItemExternalBE**|
|ArchiveReference|Innsendingens arkiv-referanse|
|ServiceCode|Tjenestekode|
|ServiceEditionCode|Tjenesteutgavekode|
|Reportee|Organisasjons eller fødselsnummer for Reportee|
|ReporteeType|Type reportee: Person, Organisasjon, Selvregistrert bruker|
|ArchivedDate|Arkiveringsdato|

##### 9.16.2	PurgeItem
Denne operasjonen lar tjenesteeier markere et enkelt DownloadQueueItem som purged. Dette DownloadQueueItem vil deretter ikke lenger bli hentet når GetDownloadQueueItems operasjonen blir kjørt.

|**Input**|**Beskrivelse**|
|--------|--------|
|ArchiveReference|Arkiv-referanse til DownloadQueueItem som skal markeres som purged|

##### 9.16.3	GetArchivedFormtaskDQ
Denne operasjonen henter et arkivert FormTask object med tilhørende forms, signatur og attachment.

|**Input**|**Beskrivelse**|
|--------|--------|
|ArchiveReference|Arkiv-referanse til DownloadQueueItem som skal hentes ned|
|**ReturVerdi**|**Beskrivelse**|
|ArchivedFormTaskExternalDQBE|Et ArchivedFormTask element|
||**ArchivedFormTaskExternalDQBE**|
|**Property**|**Beskrivelse**|
|ServiceCode|Tjenestekode|
|ServiceEditionCode|Tjenesteutgavekode|
|CaseId|Unik identifikator på eventuell samhandlingstjeneste skjemasettet er knyttet til|
|SOEncryptedSymmetricKey|Representer informasjon for tjenesteeier kryptering. Se **SOEncryptedSymmetricKeyDQBE**|
|Approvers|Liste med personer som har signert. Se **ApproverDQBE**|
|Forms|Liste med alle forms som følger med i formsettet til formtasken. Se **ArchivedFormExternalDQBE**|
|Attachments|Liste med alle vedlegg som er relatert til formtasken. Se **ArchivedAttachmentExternalDQBE**|
|Reportee|Personnummer, organisasjonsnummer eller brukernavn på avgiver|
|ArchiveReference|Unik id for formtasken slik den er lagret i tjenesteeierarkivet|
|ArchiveTampStamp|Dato og tid for når elementet ble arkivert|
|CorrelationReference|(Ikke i bruk)|
||**SOEncryptedSymmetricKey**|
|**Property**|**Beskrivelse**|
|EnkryptedKey| AES-nøkkel som er RSA-kryptert med tjenesteeiers sertifikat. Denne AES-nøkkelen benyttes for å dekryptere skjemainnhold|
|CertificateThumbPrint|Thumbprint av tjenesteeiers sertifikat som ble benyttet for å kryptere AES-nøkkel. Vil unikt angi sertifikatet i de tilfeller hvor tjenesteeier har flere sertifikater registrert i Altinn|
||**ApproverDQBE**|
|**Property**|**Beskrivelse**|
|ApproverID| Identifikatoren til godkjenneren av skjemaet, d.v.s. fødselsnummer|
|AppprovedTimeStamp|Tidspunktet for godkjennelsen av skjemaet|
|SecurityLevel|Sikkerhetsnivå: notSensitive - Data er godkjent av bruker som er autentisert med sikkerhetsnivå 1, lessSensitive - Data er godkjent av bruker som er autentisert med sikkerhetsnivå 2, sensitive - Data er signert av bruker med sikkerhetsnivå 3, verySensitive - Data er signert av bruker med sikkerhetsnivå 4|
||**ArchiveFormExternalDQBE**|
|**Property**|**Beskrivelse**|
|DataformatID|Id til skjema fra metadata kilde|
|DataformatVersionID|Versjon til skjema fra metadata kilde|
|Reference|Unik id per skjema, satt av altinn|
|ParentReference|Referanse til hovedskjema. Settes kun i underskjema dersom underskjema forekommer|
|FormData|Skjemadata i xml format. ’My’ og ‘altinn’ elementer og deres namespace deklarasjoner i alle elementer er fjernet fra formdata xml|
||**ArchivedAttachmentExternalDQBE**|
|**Property**|**Beskrivelse**|
|ArchiveReference|Unik id for formtask elementet vedlegget er assosiert med|
|FileName|Det orginale navnet til filen|
|AttachmentType|Vedleggets innholds type. (MimeType)|
|IsEncrypted|En verdi som indikerer om vedlegget er kryptert av innsender1
|AttachmentData|Det faktiske inholdet i filen. Tjenesten leverer dette som MTOM og vil inkludere alle filer på opp til 30 MB. Større vedlegg må lastes ned for seg selv ved hjelp av streaming operasjonen|
|AttachmentId|En unik id på vedlegget slik det er lagret i tjenesteeierarkivet|
|AttachmentTypeName|Det tekniske navnet på vedleggsregelen som ble valgt hvis tjenesten har en eller flere slike regler|
|AttachmentTypeNameLanguage|Det oversatte navnet til vedleggsregelen|

##### 9.16.4	GetFormSetPdf
Denne tjenesteoperasjonen gjør det mulig for tjenesteeier og laste ned en PDF versjon av et skjemasett. Operasjonen vil generere en PDF som følged PDFA standarden

|**Input**|**Beskrivelse**|
|--------|--------|
|archiveReference|Arkivreferansen til det arkiverte elementet man ønsker å ha som en PDF|
|languageId|Språket som skal benyttes i alle tekster som har oversettelser|
|**Returverdi**|**Beskrivelse**|
|Byte[]|PDF filens innhold. Data er kodet med MTOM|

##### 9.17 RegisterSRRAgencyExternal
##### 9.17.1 GetRights
Denne operasjonen benyttes for å hente ut gjeldende rettigheter for en tjeneste fra det tjenesteeierstyrte rettighetsregisteret.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|servicecode|Angir tjenestekoden man skal hente regler for. Feltet er påkrevd|
|serviceEditionCode|Angir tjenesteutgavekoden man skal hente regler for. Feltet er påkrevd|
|reportee|Angir hvilken avgiver regler skal hentes for. Hvis ingen verdi angis vil regler for alle avgivere returneres|
|**Returverdi**|**Beskrivelse**|
|GetRightResponseList|Liste av typen GetRightResponse som angir reglene som ligger i registeret basert på input parametere|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
||**GetRightResponse (utvidelse av RegisterSSRRight)**||
|ValidTo|Angir dato og tid regel er gyldig til, (yyyy-MM-ddThh:mm:ss)|
|Reportee|Angir avgiveren regelen gjelder for|
|Right|Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt|
|Condition|Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret|

Tabellen under angir mulige feilkoder for operasjonen:

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|450210|Angitt avgiver (reportee) er ikke et valid organisasjons- eller fødselsnummer|

##### 9.17.2	AddRights
Denne operasjonen benyttes for å legge til nye regler i det tjenesteeierstyrte rettighetsregisteret.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|servicecode|Angir tjenestekoden man skal legge til regler for. Feltet er påkrevd|
|serviceEditionCode|Angir tjenesteutgavekoden man skal legge til regler for. Feltet er påkrevd|
|insertRightList|Liste (AddRightRequestList) av objekter av typen AddRightRequest som angir reglene som skal legges til i registeret|
|**Returverdi**|**Beskrivelse**|
|AddRightResponseList|Liste av typen AddRightResponse som angir reglene som skulle legges til (insertRightList) i registeret med en status på hver regel|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
||**AddRightRequest (utvidelse av RegisterSSRRight)**|
|ValidTo|Angir dato og tid regel er gyldig til, (yyyy-MM-ddThh:mm:ss)|
|Reportee|Angir avgiveren regelen gjelder for|
|Right|Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt|
|Condition|Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret|
||**AddRightResponse (utvidelse av AddRightRequest som sendes inn)**|
|OperationResult|Angir resultatet for regelen som skulle legges til. Mulige verdier er: Ukjent – status er ukjent, OK – regel ble lagt til som forventet, RuleNotFound – regel som skulle slettes ble ikke funnet, RuleAlreadyExists – regel som skal legges til eksisterer allerede. Regel må først slettes for å kunne oppdateres, EmptyOrNotAValidSsnOrOrganisation – avgiver for regel er ikke et valid organisasjons- eller fødselsnummer, RightAlreadyExpired – regel som skal legges til er allerede gått ut på gyldighetsdato|
|Validto|Angir dato og tid regel er gyldig til, (yyyy-MM-ddThh:mm:ss)|
|Reportee|Angir avgiveren regelen gjelder for|
|Right|Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt|
|Condition|Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret|

Tabellen under angir mulige feilkoder for operasjonen:

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|450211|Angitt «condition» er ikke gyldig|

##### 9.17.3	DeleteRights
Denne operasjonen benyttes for å slette eksisterende regler i det tjenesteeierstyrte rettighetsregisteret.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|servicecode|Angir tjenestekoden man skal slette regler for. Feltet er påkrevd|
|serviceEditionCode|Angir tjenesteutgavekoden man skal slette regler for. Feltet er påkrevd|
|deleteRightList|Liste (DeleteRightRequestList) av objekter av typen DeleteRightRequest som angir reglene som skal slettes fra registeret|
|**Returverdi**|**Beskrivelse**|
|DeleteRightResponseList|Liste av typen DeleteRightResponse som angir reglene som skulle slettes (deleteRightList) fra registeret med en status på hver regel|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

|**Property**|**Beskrivelse**|
|--------|--------|
||**DeleteRightRequest (utvidelse av RegisterSSRRight)**|
|Reportee|Angir avgiveren regelen gjelder for|
|Right|Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt|
|Condition|Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret|
||**AddRightResponse (utvidelse av AddRightRequest som sendes inn)**|
|OperationResult|Angir resultatet for regelen som skulle slettes. Mulige verdier er: Ukjent – status er ukjent, OK – regel ble lagt til som forventet, RuleNotFound – regel som skulle slettes ble ikke funnet, RuleAlreadyExists – regel som skal legges til eksisterer allerede. Regel må først slettes for å kunne oppdateres, EmptyOrNotAValidSsnOrOrganisation – avgiver for regel er ikke et valid organisasjons- eller fødselsnummer, RightAlreadyExpired – regel som skal legges til er allerede gått ut på gyldighetsdato|
|Reportee|Angir avgiveren regelen gjelder for|
|Right|Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt|
|Condition|Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret|

Tabellen under angir mulige feilkoder for operasjonen:

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|N/A||

##### 9.18	BatchLoggingAgencyExternal
Denne tjenesten gir tjenesteeier tilgang til feil som har forekommet under behandling av batch jobber. Som en del av denne tjeneste-beskrivelsen vil følgende stikkord bli brukt:
•	DataBatch - referer til en batch fil levert til altinn av tjenesteeier.
•	DataItem - en Xml entitet i DataBatch. I en Correspondence fil vil for eksempel en enkel Correspondence være et DataItem.
•	Issue - en feil, warning eller informasjons melding som forekom under behandling av DataBatch og DataItem.
##### 9.18.1	GetStatusOverview
Denne operasjonen gir en oversikt over DataBatcher som er blitt behandlet, og antall Issues som er opplevd under behandling.

|**Input**|**Beskrivelse**|
|--------|--------|
|BatchLoggingRequest|Angir søke-kriterier for DataBatcher og DataItems|
|**Returverdi**|**Beskrivelse**|
|BatchLoggingResult|Resultat for søke-kriterier|
|**Property**|**Beskrivelse**|
||**BatchLoggingRequest**|
|SystemUserCode|Angir hvilken tjenesteeier requesten gjelder for. SystemUserCode er spesifikk for en gitt ShipmentDefinition, og er vanligvis angitt i filen som er blitt levert til Altinn|
|DataBatchType?|Angir hva slags type Batch som ønskes returnert. Mulige verdier er: ActivateSubscription – Aktivering av en eksisterende subscription, Notification – Utsending av varsel, Correspondence – Innlesing av correspondence, Prefill – Innlesing av prefill, RgisterDSFProperty – Innlesing av DSF property, RegisterDSFPropertyAdd – Innlesing av DSF property husnumre, RegisterDSFStreet – Innlesing av DSF gate, RegisterDSFStreetAdd – Innlesing av DSF Gate husnumre, RegisterDSFUser – Innlesing av DSF person, RegisterER – Innlesing av organisasjons-data, Subscription – Innlesing av Subscription data|
|BatchLoggingDateTimeRequest|Angir en Til og Fra dato hvor fil-innlesing blir gjort|
|FileName|Angir filnavn på DataBatch. Må være eksakt fullt filnavn. (Correspondence.xml må altså angis som «Correspondence.xml»|
|DataBatchId?|Angir en spesifikk DataBatchId å returnere data for|
|Sequence?|Angir et spesifikt sekvensnummer å returnere data for. Sequence blir satt i hver fil som leveres til Altinn|
|FromIssueId?|Begynn å returnere Issues fra denne IssueId. Det leveres aldri mer enn 10.000 issues fra et enkelt kall, så i tilfelle hvor mer enn 10.000 issues eksisterer vil resterende issues kunne returneres ved bruk av denne verdien|
||**BatchLoggingStatusOverview**|
|DataBatches (List<DataBatch>)|Liste av DataBatcher funnet med søke-kriterier|
|NumberOfIssues|Totalt antall Issues som er blitt returnert|
||**DataBatch**|
|StartDate|Når behandling av DataBatch startet|
|EndDate|Når DataBatch var ferdig behandlet|
|DataBatchId|Unik identifikator for DataBatch|
|Sequence|Sekvensnummer angitt i DataBatch|
|ShipmentId|Identifikator for Shipment opprettet for DataBatch|
|FileName|Filnavn for DataBatch|
|NumberOfIssues|Antall feil opplevd for DataBatch|

Tabellen under angir feilmeldinger.

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|31033|BatchLoggingRequest var ikke riktig angitt|

##### 9.18.2	GetDetailedStatus
Denne operasjonen gir en oversikt over DataBatcher som er blitt behandlet, med tilhørende Issue og metadata for DataItem.

|**Input**|**Beskrivelse**|
|--------|--------|
|BatchLoggingRequest|Angir søke-kriterier for DataBatcher og DataItems|
|**Returverdi**|**Beskrivelse**|
|BatchLoggingResult|Resultat for søke-kriterier|
|**Property**|**Beskrivelse**|
||**BatchLoggingDetailedStatus**|
|DataBatches (List DataBatch)|Liste av DataBatcher funnet med søke-kriterier|
|DataItems (List DataItem)|Liste med metadata for DataItems som har opplevd Issues under behandling|
|Issues (List Issue)|Liste med feil opplevt under DataBatch behandling|
|NumberOfIssues|Totalt antall Issues som er blitt returnert|
||**DataItem**|
|DataItemId|Unik identifikator for DataItem|
|DataBatchId|Unik identifikator for DataBatch som DataItem hører til.|
|Line|Linjenummer for DataItem i fil|
|Position|Posisjon for DataItem i fil|
|Data|Rå Xml data for DataItem. Returneres kun i GetDataItem (9.18.3)|
|State|Status på DataItem|
|ServiceCode|Tjenestekode for DataItem|
|ServiceEditionCode|Tjenesteversjonskode for DataItem|
||**Issue**|
|DataItemId?|DataItem for Issue|
|DataBatchId|DataBach for Issue|
|ErrorDateTime|Når Issue oppstod|
|IssueType|Typen Issue som er opplevd|
||**IssueType**|
|Code|ErrorCode for IssueType|
|Description|Feilmelding for IssueType|
|Level|Hvor alvorlig Issuet var. Verdier som kan avgis er: Other, Information, Warning, Error, Critical|

##### 9.18.3	GetDataItem
Denne operasjonen returnerer metadata og rå Xml data for en spesifikk DataItem (Xml-entitet) som har feilet under behandling.

|**Input**|**Beskrivelse**|
|--------|--------|
|dataItemId|Spesifikk identifikator for et DataItem|
|DataItem|Inneholder metadata og rå Xml data for et DataItem|

##### 9.19	URI til alle Altinn tjenester / aliasoversikt for endepunkter
Web servicene beskrevet i dokumentet er angitt uten informasjon om endepunkt. En web service operasjon kan kalles med forskjellige endepunkter ut fra hvilken autentiseringsmetode tjenesteeier ønsker å benytte.

Det tilbys opp til tre forskjellige endepunkter for hver web service operasjon:
•	Basic Http (SOAP 1.1)
o	Tradisjonell interoperabel web service hvor autentiseringsinformasjonen (brukernavn/passord) ligger i meldingen.
•	WS Http (SOAP 1.2 med WS-Security username token)
o	Støtte for nye web standarder WS*, dvs. bl.a. at autentiseringsinformasjonen (brukernavn/passord) ligger i SOAP headeren.
•	WS Http (SOAP 1.2 med WS-Security X.509 token) (markert som EC)
o	Støtte for ny web standarder WS*, dvs. bl.a. at sertifikat ligger i SOAP headeren mens brukernavn og passord ligger i meldingen.
•	WS Http (SOAP 1.2 med WS-Security X.509 token) (markert som AEC)
o	Støtte for ny web standarder WS*, dvs. bl.a. at sertifikat ligger i SOAP headeren. Sertifikatet må være utstedt til en organisasjon som er registrert som tjenesteeier i Altinn.

Eksempel:
Web service operasjonen "GetReceiptV2" kan aksesseres ved å kalle endepunktet "ReceiptAgencyExternal" hvis man ønsker å bruke/autentisere vha. WS* standarden. Samme operasjon finnes med navn "GetReceiptBasicV2" på endepunktet "ReceiptExternalBasic" hvis man ønsker tradisjonell web service aksessering. Tilslutt finnes det en tredje versjon av operasjonen med navn GetReceiptExternalECV2 på endepunktet "ReceiptExternalEC" hvis man ønsker å benytte virksomhetssertifikat i autentiseringen.


Her følger en aliasoversikt som viser kobling mellom operasjon og endepunkt(er) (Se også Tjenestekatalogen (Service Inventory) for informasjon om tjenesten og endepunkt):
 ##### ArchiveCommon
|**Basis Operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|--------|--------|--------|
|** ArchiveCommon**|||
|GetServiceOwnerArchiveReporteeElementsV2|WS Http https://www.altinn.no/ArchiveExternal/ArchiveCommonAgencyExternal.svc|GetServiceOwnerArchiveReporteeElementsV2|
|GetServiceOwnerArchiveReporteeElementsV2|Basic Http https://www.altinn.no/ArchiveExternal/ArchiveCommonAgencyExternalBasic.svc|GetServiceOwnerArchiveReporteeElementsBasicV2|
|GetServiceOwnerArchiveReporteeElementsV2|EC https://www.altinn.no/ArchiveExternal/ArchiveCommonAgencyExternalEC.svc|GetServiceOwnerArchiveReporteeElementsEC|
|** ServiceOwnerArchive**|||
|GetArchivedFormTaskV2|WS Http https://www.altinn.no/ArchiveExternal/ServiceOwnerArchiveExternal.svc|GetArchivedFormTaskV2|
|GetArchivedFormTaskV2|Basic Http https://www.altinn.no/ArchiveExternal/ServiceOwnerArchiveExternalBasic.svc|GetArchivedFormTaskBasicV2|
|GetArchivedFormTaskV2|EC https://www.altinn.no/ArchiveExternal/ServiceOwnerArchiveExternalEC.svc|GetArchivedFormTaskEC|
|GetArchivedFormTaskV2|EC https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemEC.svc|GetCaseListAgencySystemEC|
|GetAttachmentDataStreamed|WS Http  https://www.altinn.no/ArchiveExternal/ServiceOwnerArchiveExternalStreamed.svc|GetAttachmentDataExternalStreamed|
|GetAttachmentDataStreamed|Basic Http https://www.altinn.no/ArchiveExternal/ServiceOwnerArchiveExternalStreamedBasic.svc|GetAttachmentDataStreamedBasic|
|GetAttachmentDataStreamed|EC https://www.altinn.no/ArchiveExternal/ServiceOwnerArchiveStreamedEC.svc|
|GetAttachmentDataStreamedEC|
|**Receipt**|||
| **Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|GetReceiptV2|WS Http https://www.altinn.no/IntermediaryExternal/ReceiptAgencyExternal.svc|GetReceiptV2|
|GetReceiptV2|Basic Http https://www.altinn.no/IntermediaryExternal/ReceiptAgencyExternalBasic.svc|GetReceiptBasicV2|
|GetReceiptV2|EC https://www.altinn.no/IntermediaryExternal/ReceiptAgencyExternalEC.svc|GetReceiptECV2|
|GetReceiptListV2|WS Http https://www.altinn.no/IntermediaryExternal/ReceiptAgencyExternal.svc|GetReceiptListV2|
|GetReceiptListV2|Basic Http https://www.altinn.no/IntermediaryExternal/ReceiptAgencyExternalBasic.svc|GetReceiptListBasicV2|
|GetReceiptListV2|EC https://www.altinn.no/IntermediaryExternal/ReceiptAgencyExternalEC.svc|GetReceiptListECV2|
|UpdateReceipt|WS Http https://www.altinn.no/IntermediaryExternal/ReceiptAgencyExternal.svc|UpdateReceipt|
|UpdateReceipt|Basic Http https://www.altinn.no/IntermediaryExternal/ReceiptAgencyExternalBasic.svc|UpdateReceiptBasic|
|UpdateReceipt|EC https://www.altinn.no/IntermediaryExternal/ReceiptAgencyExternalEC.svc|UpdateReceiptEC|
|**CaseAgencySystem**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|InstantiateCollaborationAgencySystem|WS Http https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemExternal.svc|InstantiateCollaborationAgencySystemExternal|
|InstantiateCollaborationAgencySystem|Basic Http https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemExternalBasic.svc|InstantiateCollaborationAgencySystemExternalBasic|InstantiateCollaborationAgencySystemExternalBasic|
|InstantiateCollaborationAgencySystem|EC https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemEC.svc|InstantiateCollaborationAgencySystemEC|
|GetCaseListAgencySystem|WS Http https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemExternal.svc|GetCaseListAgencySystemExternal|
|GetCaseListAgencySystem|Basic Http https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemExternalBasic.svc|GetCaseListAgencySystemExternalBasic|
|GetCaseListAgencySystem|EC https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemEC.svc|GetCaseListAgencySystemEC|
|NotifyEventAgencySystem|WS Http https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemExternal.svc|NotifyEventAgencySystemExternal|
|NotifyEventAgencySystem|Basic Http https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemExternalBasic.svc|NotifyEventAgencySystemExternalBasic|
|NotifyEventAgencySystem|EC https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemEC.svc|NotifyEventAgencySystemEC|
|SetNoticeAgencySystem|WS Http https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemExternal.svc|SetNoticeAgencySystemExternal|
|SetNoticeAgencySystem|Basic Http https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemExternalBasic.svc|SetNoticeAgencySystemExternalBasic|
|SetNoticeAgencySystem|EC https://www.altinn.no/ServiceEngineExternal/CaseAgencySystemEC.svc|SetNoticeAgencySystemEC|
|**Correspondence**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|InsertCorrespondenceV2|WS Http https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternal.svc|InsertCorrespondenceV2|
|InsertCorrespondenceV2|Basic Http https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalBasic.svc|InsertCorrespondenceBasicV2|
|InsertCorrespondenceV2|EC https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalEC.svc|InsertCorrespondenceEC|
|InsertCorrespondenceV2|AEC https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalAEC.svc|InsertCorrespondenceAEC|
|CreateSimpleCorrespondenceService|WS Http https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternal.svc|CreateSimpleCorrespondenceService|
|CreateSimpleCorrespondenceService|Basic Http https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalBasic.svc|CreateSimpleCorrespondenceServiceBasic|
|CreateSimpleCorrespondenceService|EC Ikke tilgjengelig på dette grensesnittet||
|CreateSimpleCorrespondenceService|AEC Ikke tilgjengelig på dette grensesnittet||
|GetCorrespondenceStatusDetailsV3|WS Http https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternal.svc|GetCorrespondenceStatusDetailsV3|
|GetCorrespondenceStatusDetailsV3|Basic Http https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalBasic.svc|GetCorrespondenceStatusDetailsBasicV3|
|GetCorrespondenceStatusDetailsV3|EC https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalEC.svc|GetCorrespondenceStatusDetailsECV3|
|GetCorrespondenceStatusDetailsV3|AEC https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalAEC.svc|GetCorrespondenceStatusDetailsAECV3|
|GetCorrespondenceStatusHistory|WS Http https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternal.svc|GetCorrespondenceStatusHistory|
|GetCorrespondenceStatusHistory|Basic Http https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalBasic.svc|GetCorrespondenceStatusHistoryBasic|
|GetCorrespondenceStatusHistory|EC https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalEC.svc|GetCorrespondenceStatusHistoryEC|
|GetCorrespondenceStatusHistory|AEC https://www.altinn.no/ServiceEngineExternal/CorrespondenceAgencyExternalAEC.svc|GetCorrespondenceStatusHistoryAEC|
|**AltUt**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|SubmitAltutMessagePw|Basic Http https://www.altinn.no/webservicesAgency/AgencydataExchange.asmx?op=SubmitAltutMessagePw|SubmitAltutMessagePw|
|**Prefill**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|SubmitAndInstantiatePrefilledFormTask|WS Http https://www.altinn.no/ServiceEngineExternal/Prefill.svc|SubmitAndInstantiatePrefilledFormTask|
|SubmitAndInstantiatePrefilledFormTask|Basic Http https://www.altinn.no/ServiceEngineExternal/PrefillBasic.svc|SubmitAndInstantiatePrefilledFormTaskBasic|
|SubmitAndInstantiatePrefilledFormTask|EC https://www.altinn.no/ServiceEngineExternal/PreFillAgencyExternalEC.svc|SubmitAndInstantiatePrefilledFormTaskEC|
|SubmitPrefilledFormTasks|WS Http https://www.altinn.no/ServiceEngineExternal/Prefill.svc|SubmitPrefilledFormTasks|
|SubmitPrefilledFormTasks|Basic Http https://www.altinn.no/ServiceEngineExternal/PrefillBasic.svc|SubmitPrefilledFormTasksBasic|
|SubmitPrefilledFormTasks|EC https://www.altinn.no/ServiceEngineExternal/PreFillAgencyExternalEC.svc|SubmitPrefilledFormTasksEC|
|**Subscription**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|SubmitSubscription|WS Http https://www.altinn.no/ServiceEngineExternal/Subscription.svc|SubmitSubscription|
|SubmitSubscription|Basic Http https://www.altinn.no/ServiceEngineExternal/SubscriptionBasic.svc|SubmitSubscriptionBasic|
|SubmitSubscription|EC https://www.altinn.no/ServiceEngineExternal/SubscriptionAgencyExternalEC.svc|SubmitSubscriptionEC|
|**NotificationAgencyExternal**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|SendStandaloneNotification|WS Http https://www.altinn.noServiceEngineExternal/NotificationAgencyExternal.svc|SendStandaloneNotification|
|SendStandaloneNotification|Basic Http https://www.altinn.noServiceEngineExternal/NotificationAgencyExternalBasic.svc|SendStandaloneNotificationBasic|
|SendStandaloneNotification|EC https://www.altinn.noServiceEngineExternal/NotificationAgencyExternalEC.svc|SendStandaloneNotificationEC|
|**TTPArchiveAgencyExternal**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|GetAuditTrail|Basic Http https://www.altinn.no/ArchiveExternal/TTPArchiveAgencyExternalBasic.svc|GetAuditTrailBasic|
|**AuthorizationAdministration**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|ImportAuthorizationPolicy|WS Http https://www.altinn.no/AuthorizationExternal/AdministrationExternal.svc|ImportAuthorizationPolicy|
|GetReporteeByTempKey|WS Http https://www.altinn.no/AuthorizationExternal/AdministrationExternal.svc|GetReporteeByTempKey|
|GetReportees|WS Http https://www.altinn.no/AuthorizationExternal/AdministrationExternal.svc|GetReportees|
|GetRoles|WS Http https://www.altinn.no/AuthorizationExternal/AdministrationExternal.svc|GetRoles|
|**AuthorizationDecisionPointExternal**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|AuthorizeAccessExternal|WS Http https://www.altinn.no/AuthorizationExternal/AuthorizationDecisionPointExternal.svc|AuthorizeAccessExternal|
|**DownloadQueueExternal**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|GetDownloadQueueItems|WS Http https://www.altinn.no/ArchiveExternal/DownloadQueueExternal.svc|GetDownloadQueueItems|
|GetDownloadQueueItems|WS Http https://www.altinn.no/ArchiveExternal/DownloadQueueExternalBasic.svc|GetDownloadQueueItems|
|GetDownloadQueueItems|WS Http https://www.altinn.no/ArchiveExternal/DownloadQueueExternalEC.svc|GetDownloadQueueItems|
|PurgeItem|WS Http https://www.altinn.no/ArchiveExternal/DownloadQueueExternal.svc|PurgeItem|
|PurgeItem|WS Http https://www.altinn.no/ArchiveExternal/DownloadQueueExternalBasic.svc|PurgeItem|
|PurgeItem|WS Http https://www.altinn.no/ArchiveExternal/DownloadQueueExternalEC.svc|PurgeItem|
|GetArchivedFormTask|WS Http https://www.altinn.no/ArchiveExternal/DownloadQueueExternal.svc|GetArchivedFormTaskExternalDQ|
|GetArchivedFormTask|WS Http https://www.altinn.no/ArchiveExternal/DownloadQueueExternalBasic.svc|GetArchivedFormTaskBasicDQ|
|GetArchivedFormTask|WS Http https://www.altinn.no/ArchiveExternal/DownloadQueueExternalEC.svc|GetArchivedFormTaskECDQ|
|**ContextHandlerExternal**|||
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|GetReporteeElementContextExternal|WS Http https://www.altinn.no/ServiceEngineExternal/ContextHandlerExternal.svc|GetReporteeElementContextExternal|
|GetReporteeElementContextExternal|Basic Http https://www.altinn.no/ServiceEngineExternal/ContextHandlerExternalBasic.svc|GetReporteeElementContextExternalBasic|
|GetReporteeElementContextExternal|EC https://www.altinn.no/ServiceEngineExternal/ContextHandlerEC.svc|GetReporteeElementContextExternalEC|
|**RegisterSSRAgencyExternal**|
|**Basis operasjon**|**URI/Endepunkt**|**Endepunkt operasjon**|
|GetRights|WS Http https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternal.svc|GetRights|
|GetRights|Basic Http https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc|GetRightsBasic|
|GetRights|EC https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalEC.svc|GetRightsEC|
|AddRights|WS Http https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternal.svc|AddRights|
|AddRights|Basic Http https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc|AddRightsBasic|
|AddRights|EC https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalEC.svc|AddRightsEC|
|DeleteRights|WS Http https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternal.svc|DeleteRights|
|DeleteRights|Basic Http https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc|DeleteRightsBasic|
|DeleteRights|EC https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalEC.svc|DeleteRightsEC|
Alle URI er angitt med produksjonsadresse. Frem til produksjonssetting må https://www.altinn.no erstattes med peker til testmiljø.

##### 9.20 Sammenheng mellom nye og gamle Altinn web services
Nedenfor vises en oversikt som mapper web service grensesnitt tilgjengelige i AltinnI med de som tilbys i AltinnII versjon 1:

|**Altinn I operasjon**|**Altinn II ver.1. operasjon**|**Kommentar**|
|--------|--------|--------|
|AgencyDataExchange.SubmitAltutMessagePw()|Correspondence. InsertCorrespondence|AltinnI web service videreføres for eksisterende tjenesteeiere, kun i en begrenset periode|
|AgencyDataExchange. SubmitAndInstantiateOnlinePrefillPw|Prefill.SubmitAndInstantiatePrefilledFormTask|AltinnII er tjenesteorientert, ikke skjemaorientert|
|AgencyDataExchange. SubmitOnlinePrefillPw|Prefill.SubmitPrefilledFormTasks|AltinnII er tjenesteorientert, ikke skjemaorientert|
|AgencyDataExchange.VerifyMessage |N/A||
|N/A|ArchiveCommon.GetServiceOwnerArchiveReporteeElements||
|N/A|ServiceOwnerArchive.GetArchivedFormTask||
|MessageReceiptExchange.GetReceiptList|Receipt.GetReceiptList||
|MessageReceiptExchange.GetReceipt|Receipt.GetReceipt||
|N/A|Receipt.SaveReceipt|Ny web service operasjon i AltinnII|
|N/A|Subscription.SubmitSubscription|Ny web service operasjon i AltinnII|

##### 10	Grensesnitt – batch til Altinn
Her følger en oversikt over hvilke batch grensesnitt som tilbys i Altinn.

10.1	**Innsendingstjenester**
Ferdig utfylte skjemaer i Altinn overføres på xml fil til tjenesteeiere. Tjenesteeiere kan motta utfylte skjemaer fortløpende, eller samle opp til rutinemessig overføring. Alternative protokoller som benyttes i Altinn-løsningen i dag er FTP og SFTP. Kun arkiverte elementer for egne skjemaer overføres.
 
Tjenesteeier må etablere FTP/SFTP mottak, og se til at angitt FTP område til enhver tid er tilgjengelig for Altinn. Opplysninger om FTP adresse, pålogging og frekvens må avtales før valgt overføring kan aktiviseres.

En kvittering for forsendelsen genereres når forsendelsen er sendt til tjenesteeier fra Altinn. Tjenesteeier oppdaterer kvitteringen etter mottak ved å gjøre kall til dedikert web service (se SaveReceipt).

Innsendingsdata som sendes til tjenesteeier fra Altinn er i henhold til “genericbatch.2011.06.xsd" som ligger som et separat vedlegg til dette dokumentet. Denne versjonen av XSD er påkrevd for å bruke funksjonalitet for å overføre PDF av skjemasett.

I forbindelse med definerte vedleggstyper i Altinn, har vi «genericbatch.2013.06.xsd». Den nye versjonen av xsd-en inneholder nye elementer som vedleggstypenavn (attachmentTypeName) og sjekksum, av typen SHA256, for vedlegget (checksum). I tillegg har det blitt innført mulighet for å definere en liste med metadata, med mulighet for å f.eks. oppgi fagsystemnavn. AttachmentTypeName, Checksum og MetaDataList er alle optional og ikke obligatorisk, så xsd-en er bakoverkompatibel med tjenesteeiere som benytter seg av “genericbatch.2011.06.xsd" og “genericbatch.2010.10.xsd".


“Genericbatch.2010.10.xsd" vil eksistere videre i en periode før den fases ut. Det er ingen obligatoriske forandringer mellom “genericbatch.2011.06.xsd" og “genericbatch.2010.10.xsd", så tjenesteeiere som allerede bruker sistnevnte kan fortsette med det inntil den fases ut. 

Tjenesteeier kan opprette flere grensesnitt for overføring av utfylte skjema, og hvert enkelt grensesnitt knyttes til 1 versjon av genericbatch.

|**Element**|**Beskrivelse**|
|--------|--------|
|DataBatch|Rotnode elementet som holder hele overføringen. Alt innenfor dette elementet tilhører en batch|
|schemaVersion|Versjonen av xmlskjemaet. Brukes for fremtidig versjonering av formatet|
|batchReference|Den unike batch-sekvensen innenfor mottakssystemet. Denne blir brukt for å forsikre seg om at det er forventet batchforsendelse som blir mottatt av offentlig enhet|
|previousReference|Forrige sekvensnummer innenfor mottakssystemet (receiverReference)|
|receiverReference|Identifikatoren i Altinn på systemet som skal motta dataene, eksempelvis SLN. Brukes av mottaker for å skille på batcher til forskjellige system hos samme mottaker|
|timeStamp|Tidspunkt for når batchen er generert|
|formTasksInBatch|Antall skjemasett som er i denne databatche|
|formsInBatch|Antall skjema som er i denne databatchen|
|DataBatch .DataUnits|Inneholder en samling av alle skjemaer som sendes|
|DataBatch .DataUnits. DataUnit|Element som inneholder det enkelte skjemaet i batchen. Dette kan enten være hovedskjema eller vedleggsskjema|
|reportee|Identifikatoren til avgiver (organisasjonsnummer/fødselsnummer) som har sendt inn skjemaet|
|archiveReference|Identifikatoren til skjemaet i AltInn-arkivet. Brukes for å koble videre saksgang av skjema hos mottaker med skjemaet i Altinn, ved evt. senere henvendelse til Altinn|
|archiveTimeStamp|Tidspunkt for når skjemaet ble arkivert|
|DataBatch .DataUnits. DataUnit. MetadataList|En samling av metadata informasjon i en liste. Kan f.eks. være fagsystemnavn dersom dette er bestilt aktivert på grensesnitt|
|DataBatch .DataUnits. DataUnit. Approvers|En samling av godkjennere for det enkelte skjema, d.v.s. personer som har signert oppgavesettet|
|DataBatch .DataUnits. DataUnit. Approvers .Approver|Et element som representerer én godkjenner|
|approverId|Identifikatoren til godkjenneren av skjemaet, d.v.s. fødselsnummer|
|approverTimeStamp|Tidspunktet for godkjennelsen av skjemaet|
|securityLevel|Sikkerhetsnivå: 	notSensitive - Data er godkjent av bruker som er autentisert med sikkerhetsnivå 1, lessSensitive - Data er godkjent av bruker som er autentisert med sikkerhetsnivå 2, sensitive - Data er signert av bruker med sikkerhetsnivå 3, verySensitive - Data er signert av bruker med sikkerhetsnivå 4|
|DataBatch .DataUnits. DataUnit.FormTask|Overordnet element for ferdig utfylt skjemasett|
|DataBatch .DataUnits. DataUnit.FormTask.ServiceCode|Tjenestekode, f.eks. "PSA"|
|DataBatch .DataUnits. DataUnit.FormTask.ServiceEditionCode|Tjenesteutgavekode, f.eks. "2009"|
|DataBatch .DataUnits. DataUnit.FormTask. SOEncryptedSymmetricKey.EncryptedKey|Nøkkel som er AES-kryptert med tjenesteeiers sertifikat som benyttes for å dekryptere skjemainnhold|
|DataBatch .DataUnits. DataUnit.FormTask.SOEncryptedSymmetricKey.CertificateThumbprint|Thumbprint av tjenesteeiers sertifikat som ble benyttet for å kryptere nøkkel. Vil unikt angi sertifikatet i de tilfeller hvor tjenesteeier har flere sertifikater registrert i Altinn|
|DataBatch .DataUnits. DataUnit.FormTask.CaseID|Unik identifikator på eventuell samhandlingstjeneste skjemasettet er knyttet til|
|DataBatch .DataUnits. DataUnit.FormTask.Form|Overordnet element for hoved –eller underskjema i et skjemasett|
|DataBatch .DataUnits. DataUnit.FormTask.Form.DataFormatId|Id til skjema fra metadata kilde|
|DataBatch .DataUnits. DataUnit.FormTask.Form.DataFormatVersion|Versjon til skjema fra metadata kilde|
|DataBatch .DataUnits. DataUnit.FormTask.Form.Reference|Unik id per skjema, satt av altinn|
|DataBatch .DataUnits. DataUnit.FormTask.Form.ParentReference|Referanse til hovedskjema. Settes kun i underskjema dersom underskjema forekommer.Tilsvarer verdi i DataBatch .DataUnits. DataUnit.FormTask.Form.Reference for hovedskjema|
|DataBatch .DataUnits. DataUnit.FormTask.Form.FormData|Skjemadata i xml format|
|DataBatch .MetadataList|Overodnet element for all metadata for en batch|
|DataBatch .Metadata|Metadatainfo knyttet til batchen|
|DataBatch .Attachments|Overordnet element for alle vedlegg for en batch|
|DataBatch .Attachments.Attachment|Elementet inneholder ett binært vedlegg (Base64 kodet). Dette kan også være systemgenererte vedlegg, f.eks PDF av skjemasett|
|archiveReference|Identifikatoren til skjemaet i AltInn-arkivet. Brukes til å knytte vedlegget til skjemaet|
|fileName|Det originale filnavnet til vedlegget (gitt av den som sendte det)|
|InternalFileName|Intern filnavnreferanse som brukes hvis vedleggene skal pakkes i en ekstern fil (ZIP). Denne er unik fordi man ikke kan ha like filnavn i et ZIP-arkiv. Filnavnet består av arkivreferansenummer + en Guid|
|AttachmentType|Angir type attachment. Dette gjelder også for systemgenererte vedlegg som PDF (attachmentType=formtask_pdf). Mulige verdier for denne : not_Applicable, BASE64, binary_octet_stream, formtask_pdf, image_gif, text_html, image_bmp, image_jpeg, application_vnd_ms_excel, application_vnd_ms_powerpoint, application_msword, MTOM, application_None, application_vnd_oasis_opendocument_presentation, application_vnd_oasis_opendocument_spreadsheet, application_vnd_oasis_opendocument_text, application_pdf, text_plain, application_postscript, text_richtext, application_rtf, text_rtf, text_xml, application_zip|
|IsEncrypted|Angir om tjenesten er kryptert eller ikke|
|Checksum|Viser sjekksum av filvedlegget, som er generert av Altinn. Sjekksummen er generert av SHA256-algoritmen|
|attachmenttypename|Angir vedleggets vedleggstypenavn. Dette er i henhold til vedleggstypen som er knyttet til tjenesten, f.eks. Lønnslipp, Årsoppgave|

##### 10.2 Preutfylling
Preutfyllingsdata fra tjenesteeier vil ofte bestå av store mengder data. Batch-grensesnittet skal i så fall benyttes. Batch-grensesnittet kan også benyttes av tjenesteeiere som ikke ønsker å benytte web service-grensesnittet. Alternative protokoller som benyttes i Altinn-løsningen i dag er FTP eller SFTP. Tjeneste for oppgavesettet må være definert i tjenesteutviklingsløsningen og migrert til sluttbrukerløsningen før en tjenesteeier kan sende inn preutfyllingsdata for tjenesten via dette grensesnittet.

Ved bruk av FTP/SFTP mottar Altinn fil fra tjenesteeier. Alternativt kan Altinn kan hente hos tjenesteeier vha. de samme protokollene hvis tjenesteeier ikke ønsker å etablere egen FTP server (gjelder kun tjenesteeiere som ikke skal motta meldingsbekreftelser fra Altinn, se avsnitt 10.4.2 Meldingsbekreftelse fra Altinn til tjenesteeier). Opplysninger om FTP adresse, pålogging og frekvens må avtales før valgt kommunikasjonsmåte kan aktiviseres. Dersom Altinn skal hente hos tjenesteeier må tjenesteeier se til at angitt FTP område til enhver tid er tilgjengelig for Altinn.

En kvittering for forsendelsen, samt kvitteringer for de enkelte skjemaene i forsendelsen, genereres når forsendelsen er ferdig prosessert i Altinn. Tjenesteeier kan hente ut kvitteringene basert på ExternalShipmentReference/SendersReference som ble oppgitt i preutfyllingsformatet.

Preutfyllingsdata som sendes til Altinn fra tjenesteeier eller hentes fra Altinn må være i henhold til Prefill-elementet i serviceinitiation.2010.10.xsd. Xsd’en ligger som et separat vedlegg til dette dokumentet. Dette formatet benyttes også for abonnement. Tjenesteeier kan med andre ord sende både preutfyllingsdata og abonnementsdata i samme XML.

Tabellen under beskriver elementer og attributter relevante for preutfylling:

|**Element**|**Beskrivelse**|
|--------|--------|
|ServiceOwner|Rotnode elementet som holder hele overføringen|
|ServiceOwnerName|Forkortelsen for tjenesteeieres navn (XXX-XXX, for eksempel ABC-123), der tre første tegn representerer tjenesteeier og tre siste tegn representerer en avdeling innad hos tjenesteeier. Kun de tre første tegnene er obligatoriske dersom det ikke finnes flere systemer/avdelinger innenfor samme tjenesteeier|
|ServiceOwner.Prefill|Prefill-element og tilhørende under-elementer benyttes av tjenesteeier for å angi preutfyllingsdata til Altinn|
|SequenceNo|Sekvensnummer for preutfyllings-forsendelsen.|
|ExternalShipmentReference|Unik forsendelsesreferanse som settes av tjenesteeier for å identifisere forsendelsen|
|ServiceOwner.Prefill.Reportee|Reportee-element og tilhørende under-elementer angir avgiver og tilhørende preutfyllingsdata|
|Id|Unik identifikator for avgiver, fødselsnummer eller organisasjonsnummer|
|ServiceOwner.Prefill.Reportee.FormTask|FormTask-element og tilhørende under-elementer benyttes av tjenesteeier for å angi preutfyllingsdata for et skjemasett|
|ExternalServiceCode|Angir den tjenestekoden som preutfyllingen gjelder for|
|ExternalServiceEditionCode|Angir tjenesteutgavekoden som preutfyllingen gjelder for|
|ValidFrom|Angir dato for når preutfyllingsdataene er gyldige fra (yyyy-MM-dd)|
|ValidTo|Angir dato for når preutfyllingsdataene er gyldige til (yyyy-MM-dd)|
|IdentityFieldHashCode|Generert hash basert på alle identifiserende felter for det preutfylte oppgavesettet. Identifiserende felter benyttes for å skille mellom flere preutfyllingssett for samme oppgavesett og avgiver|
|SendersReference|Referanse på skjemasett som settes av tjenesteeier, bør være unikt|
|ReceiversReference|Unik referanse som settes av Altinn.|
|ServiceOwner.Prefill.Reportee.FormTask.IdentifyingFields|Overordnet element for identifiserende felter. IdentifyingFields-elementet kan inneholde identifiserende felter som sammen unikt vil identifisere et preutfyllingssett for en avgiver og et skjemasett. Se avsnittet PunktOmIdentifiserendeFelter for mer informasjon|
|IdentifyingField|Verdi for identifiserende felt, kan være slike felter per skjemasett|
|ServiceOwner.Prefill.Reportee.FormTask.Attachments|Inneholder Attachment-elementer for eventuelle binære vedlegg for skjemasettet|
|ServiceOwner.Prefill.Reportee.FormTask.Attachment|Attachment-elementet inneholder data for binære vedlegg|
|AttachmentName|Dette navnet er det som vises for vedlegget i portalen.|
|FileName|Navn på filen for det binære vedlegget.|
|AttachmentData|Data for det binære vedlegget (Base64 kodet)|
|SendersReference|Referanse for vedlegget som settes av tjenesteeier, bør være unikt|
|Encrypted|Flagg som sier om vedlegget er kryptert (true/false)|
|ServiceOwner.Prefill.Reportee.FormTask.Form|Dette elementet inneholder metadata og preutfyllingsdata for et skjema i det preutfylte oppgavesettet|
|DataFormatId|Id til skjema fra metadata kilde|
|DataFormatVersion|Versjon til skjema fra metadata kilde|
|SendersReference|Identifikator for skjemaet i det preutfylte oppgavesettet som settes av tjenesteeier, bør være unikt|
|ParentReference|Referanse til hovedskjema (SendersReference), dersom dette er et underskjema|
|FormData|Dataene for skjemaet. Må legges i en CDATA blokk.|
|ServiceOwner.Prefill.Reportee.Field|Field-elementet og tilhørende under-elementer benyttes av tjenesteeier for å angi preutfyllingsdata på feltnivå (felt-verdi)|
|Id|Unik identifikator for feltet i tjeneste som skal preutfylles, typisk navn på et felt i et skjema|
|ValidFrom|Angir dato for når preutfyllingsdataene er gyldige fra (yyyy-MM-dd)|
|ValidTo|Angir dato for når preutfyllingsdataene er gyldige til (yyyy-MM-dd)|
|Index|Indeks for feltet. Benyttes dersom man skal preutfylle flere felter med samme id|
|Value|Preutfyllingsverdien|

##### 10.3 Abonnement
Abonnementsdata fra tjenesteeier vil ofte bestå av store mengder data. Batch-grensesnittet skal i så fall benyttes. Batch-grensesnittet kan også benyttes av tjenesteeiere som ikke ønsker å benytte web service-grensesnittet. Alternative protokoller som benyttes i Altinn-løsningen i dag er FTP og SFTP. Tjeneste for skjemasettet må være definert i tjenesteutviklingsløsningen og migrert til sluttbrukerløsningen før en tjenesteeier kan sende inn abonnementsdata for tjenesten via dette grensesnittet.

Ved bruk av FTP/SFTP mottar Altinn fil fra tjenesteeier. Alternativt kan Altinn kan hente hos tjenesteeier vha. de samme protokollene hvis tjenesteeier ikke ønsker å etablere egen FTP server (gjelder kun tjenesteeiere som ikke skal motta meldingsbekreftelser fra Altinn, se avsnitt 10.4.2 Meldingsbekreftelse fra Altinn til tjenesteeier). Opplysninger om FTP adresse, pålogging og frekvens må avtales før valgt kommunikasjonsmåte kan aktiviseres. Dersom Altinn skal hente hos tjenesteeier må tjenesteeier se til at angitt FTP område til enhver tid er tilgjengelig for Altinn.

En kvittering for forsendelsen, samt kvitteringer for de enkelte skjemaene i forsendelsen, genereres når forsendelsen er ferdig prosessert i Altinn. Tjenesteeier kan hente ut kvitteringene basert på ExternalShipmentReference/SendersReference som ble oppgitt i abonnementsformatet.

Abonnementsdata som sendes til Altinn fra tjenesteeier eller hentes fra Altinn må være i henhold til Subscription-elementet i serviceinitiation.2010.10.xsd. Xsd’en ligger som et separat vedlegg til dette dokumentet. Dette formatet benyttes også for preutfylling. Tjenesteeier kan med andre ord sende både preutfyllingsdata og abonnementsdata i samme XML.

|**Element**|**Beskrivelse**|
|--------|--------|
|ServiceOwner|Rot-element|
|ServiceOwnerName|Forkortelsen for tjenesteeieres navn (XXX-XXX, for eksempel ABC-123), der tre første tegn representerer tjenesteeier og tre siste tegn representerer en avdeling innad hos tjenesteeier. Kun de tre første tegnene er obligatoriske dersom det ikke finnes flere systemer/avdelinger innenfor samme tjenesteeier|
|ServiceOwner.Subscription|Subscription-element og tilhørende under-elementer benyttes av tjenesteeier for å angi abonnementsdata til Altinn|
|SequenceNo|Sekvensnummer for abonnements-forsendelsen|
|ExternalShipmentReference|Unik referanse som settes av tjenesteeier for å identifisere forsendelsen|
|ServiceOwner.Subscription.Reportee|Reportee-element og tilhørende under-elementer angir avgiver og hva det skal abonneres på|
|Id|Unik identifikator for abonnent, fødselsnummer eller organisasjonsnummer|
|ServiceOwner.Subscription.Reportee.FormTask|FormTask-element og tilhørende under-elementer benyttes av tjenesteeier for å angi abonnementsdata for et skjemasett|
|ExternalServiceCode|Angir den tjenestekoden som abonnementet gjelder for|
|ExternalServiceEditionCode|Angir tjenesteutgavekoden som abonnementet gjelder for|
|StartDate|Dato for når abonnementet skal aktiveres (yyyy-MM-dd)|
|ExpirationDate|Dato for når abonnementet opphører (yyyy-MM-dd)|
|NextScheduledDate|Dato for når abonnementet skal instansieres neste gang (yyyy-MM-dd). Første dato settes av tjenesteeier, neste kalkuleres av runtiejobb i Altinn (basert på periodetype)|
|NextDueDate|Dato for når abonnementet/innsendingstjenesten må være fylt ut av bruker i portal/sluttbrukersystem (yyyy-MM-dd). Første dato settes av tjenesteeier, neste kalkuleres av runtiejobb i Altinn (basert på periodetype)|
|VisibleDate|Dato for når skjemasett som abonnementet gjelder skal være synlig i portal/for sluttbrukersystemer (yyyy-MM-dd)|
|PeriodType|Angir hvor ofte et abonnement skal instansieres. Mulige periodetyper: Annual - årlig, Semiannual - to ganger årlig, Quarterly - tre ganger årlig, Tertiary - fire ganger årlig, Bimonthly - annenhver måned, Monthly - hver måned, Fortnightly - hver 15. dag, Weekly - hver uke, Daily - hver dag, Once- abonnementet instansieres én gang|
|CaseId|Unik identifikator for samhandlingstjenesten|
|ServiceOwner.Subscription.Reportee.FormTask.IdentifyingFields|Overordnet element for identifiserende felter. IdentifyingFields-elementet kan inneholde identifiserende felter som sammen unikt identifisere et allerede innsendt preutfylte skjemasette som abonnenten skal benytte. Se avsnittet PunktOmIdentifiserendeFelter for mer informasjon|
|IdentifyingField|Verdi for identifiserende felt, kan være slike felter per abonnement og må være de(t) samme som finnes på et allerede innsendt preutfylt skjemasett for abonnenten|

##### 10.4 Melding
Meldinger som skal vises til bruker i portal/sluttbrukersystem sendes fra tjenesteeier til Altinn. Åpne– og lesebekreftelser sendes tilbake fra Altinn til tjenesteeier når bekreftelse(r) er mottatt fra portal/sluttbrukersystem.
10.4.1	Melding fra tjenesteeier til Altinn
Meldingsdata som består av store mengder data skal benytte batch-grensesnittet. Batch-grensesnittet kan også benyttes av tjenesteeiere som ikke ønsker å benytte web service-grensesnittet. Alternative protokoller som benyttes i Altinn-løsningen i dag er FTP og SFTP. En meldingstjeneste må være definert i tjenesteutviklingsløsningen og migrert til sluttbrukerløsningen før en tjenesteeier kan sende inn meldingsdata for tjenesten via dette grensesnittet.

Ved bruk av FTP/SFTP mottar Altinn fil fra tjenesteeier. Opplysninger om FTP adresse, pålogging og frekvens må avtales før valgt kommunikasjonsmåte kan aktiviseres. Dersom Altinn skal hente hos tjenesteeier må tjenesteeier se til at angitt FTP område til enhver tid er tilgjengelig for Altinn.

Det finnes to batch grensesnitt for registrering av meldinger:
•	Correspondence
Format skreddersydd for siste versjon av Altinn. Oppdateres etter hvert som Altinn videreutvikles. Skal benyttes av alle nye tjenesteeiere.
•	Altut
Format fra tidligere versjon av Altinn, tilbys kun for bakoverkompatibilitet for eksisterende tjenesteeiere, og det vil ikke bli oppdatert etter hvert som Altinn videreutvikles. Det inneholder elementer som ikke lenger er i bruk i Altinn, og enkelte elementer har fått ny funksjonalitet som betyr at eksisterende grensesnitt må endres. Siste versjon av Altinn har funksjonalitet som ikke støttes av Altut formatet.


En kvittering for forsendelsen genereres når forsendelsen er ferdig prosessert i Altinn. Tjenesteeier kan hente ut kvitteringene basert på ShipmentReference/SendersReference som ble oppgitt i meldingsformatet.
##### 10.4.1.1 Correspondence format
Meldinger som sendes til Altinn fra tjenesteeier i form av eb batch må være i henhold til schemas.altinn.no.services.intermediary.correspondence.2016.02.xsd. Xsd’en ligger som et separat vedlegg til dette dokumentet. Det er verd å merke seg at namespace til schema er "http://schemas.altinn.no/services/intermediary/correspondence/2009/10".

The data in a batch file should have the same strukture, the same element names and functionality as the latest InsertCorrespondence service, but the batch file will be validated with the XSD.

Tabellen under beskriver elementer og attributter relevante for meldinger:

|**Element**|**Beskrivelse**|
|--------|--------|
|Correspondences|Rot-element|
|SystemUserCode|Forkortelsen for tjenesteeieres navn (XXX-XXX, for eksempel ABC-123), der tre første tegn representerer tjenesteeier og tre siste tegn representerer en avdeling innad hos tjenesteeier. Kun de tre første tegnene er obligatoriske dersom det ikke finnes flere systemer/avdelinger innenfor samme tjenesteeier|
|ShipmentReference|Unik referanse som settes av tjenesteeier for å identifisere forsendelsen|
|SequenceNo|Sekvensnummer for forsendelsen. Dersom dette settes må sekvensnummeret være ett nummer høyere enn det forrige sekvensnummeret på meldingsforsendelse for denne tjenesteeieren. I motsatt fall vil forsendelsen avvises i Altinn|
|Correspondences.Correspondence|Correspondence-elementet inneholder ett Correspondence-element per melding|
|ServiceCode|Angir den tjenestekoden som meldingen gjelder for|
|ServiceEdition|Angir tjenesteutgavekoden som meldingen gjelder for|
|SendersReference|Referanse for meldingen i forsendelsen som settes av tjenesteeier, bør være unikt|
|Reportee|Unik identifikator (fødselsnummer eller organisasjonsnummer) for avgiver som skal motta meldingen|
|Correspondences.Correspondence.Content|Inneholder meldingsinnhold, samt eventuelle vedlegg, for meldingen|
|LanguageCode|Språk for melding: 1033 - English, 1044 - Bokmål, 2068 - Nynorsk|
|MessageTitle|Meldingstittel, som vil vises i portal|
|MessageSummary|En kort beskrivelse av meldingen|
|MessageBody|Meldingstekst|
|Correspondences.Correspondence.Content.Attachments|Dette elementet inneholder eventuelle vedlegg tilmeldingen|
|Correspondences.Correspondence.Content.Attachments.BinaryAttachments|Dette elementet inneholder eventuelle binære vedlegg for meldingen|
|Correspondences.Correspondence.Content.Attachments.BinaryAttachments.BinaryAttachment|Inneholder detaljer for ett binært vedlegg|
|FileName|Filnavn for det binære vedlegget|
|Name|Dette er navnet på vedlegget, som det vises i portalen|
|Encrypted|Sier om vedlegget er kryptert. "Y" (ja) eller ikke "N" (nei)|
|Data|Data for det binære vedlegget (Base64 kodet)|
|SendersReference|Referanse for vedlegget. Settes av tjenesteeier, bør være unikt|
|FunctionType|Hvilken funksjonstype vedlegget utgjør: Invoice - Faktura, Unspecified - Uspesifisert|
|AttachmentType|Angir MIME-typen for vedlegget (obligatorisk): application_none - ingen MIME type angitt, application_pdf - PDF format, application_msword, Microsoft Word, application_vnd_ms_excel - Microsoft Excel, application_vns_oasis_opendocument_text - Open document (type Text), application_vnd_oasis_opendocument_presentation - Open docment (type Presentation), application_vnd_oasis_opendocument_spreadsheet - Open docment (type Spreadsheet),application_rtf - Rich text format type, application_vnd_ms_powerpoint - Microsoft PowerPoint, application_postscript, application_zip - Type zip, text_plain, text_html, text_xml, text_rtf - Rich text format type, text_richtext - Rich text, binary_octet_stream- Binary format, not_Applicable|
|DestinationType|Hvor vedlegget er tilgjengelig: Default/ShowToAll – tilgjengelig i portal og for sluttbrukersystem, PortalOnly – kun tilgjengelig fra portal, EndUserSystemOnly – kun tilgjengelig fra sluttbrukersystem|
|Correspondences.Correspondence.Content.Attachments.XmlAttachments|Dette elementet inneholder eventuelle XML-vedlegg for meldingen|
|Correspondences.Correspondence.Content.Attachments.XmlAttachments.XmlAttachment|Inneholder detaljer for ett XML-vedlegg. Benyttes hvis det er definert at i TUL at melding skal vises i Infopath skjema. Infopath-skjema må være utviklet som en del av Meldingstjenesten i TUL|
|SendersReference|Referanse for vedlegget. Settes av tjenesteeier, bør være unikt|
|DataFormatId|Id til skjema fra metadata kilde|
|DataFormatVersion|Versjon til skjema fra metadata kilde|
|FormDataXml|Innhold i xml vedlegget. Må legges i en CDATA blokk|
|Correspondences.Correspondence|Forts.|
|VisibleDateTime|Angir når meldingen skal være synlig for sluttbruker i portalen (yyyy-MM-dd)|
|AllowSystemDeleteDate|Angir om meldingen skal kunne slettes av sletterutiner i Altinn.|
|DueDateTime|Angir frist for å bekrefte melding (dersom meldingen må bekreftes)|
|ArchiveReference|Referanse til element i arkiv (dersom en slik referanses finnes)|
|Correspondences.Correspondence.ReplyOptions|Overordnet element som inneholder svaralternativer for meldingen|
|Correspondences.Correspondence.ReplyOptions.ReplyOption|Element som inneholder ett svaralternativ|
|Correspondences.Correspondence.ReplyOptions.ReplyOption.Service|Elementet benyttes hvis man kan svare vha. en tjeneste. Inneholder tjenesteinformasjon|
|ServiceCode|Angir den tjenestekoden for svarmeldingen|
|ServiceEdition|Angir tjenesteutgavekoden for svarmeldingen|
|Correspondences.Correspondence.ReplyOptions.ReplyOption.ArchiveReference|Elementet benyttes hvis man kan svare vha. et arkivert element. Referanse til element i arkiv|
|Correspondences.Correspondence.ReplyOptions.ReplyOption.Url|Elementet benyttes hvis man kan svare vha. en svarlenke|
|LinkText|Tekst til lenken i meldingen|
|LinkUrl|URL til lenke i meldingen|
|Correspondences.Correspondence|Forts.|
|Correspondences.Correspondence.Notifications|Inneholder eventuelle varslinger for meldingen|
|Correspondences.Correspondence.Notifications.Notification|Inneholder data for ett varsel for meldingen|
|FromAddress|Denne adressen vil stå som avsender for varselet. Hvis ikke satt vil avsenderadresse satt i malen benyttes|
|ShipmentDateTime|Tidspunkt for når varselet skal sendes|
|LanguageCode|Angir språk for varselet: 1033 - English, 1044 - Bokmål, 2068 - Nynorsk|
|NotificationType|I hvilken sammenheng varselet skal sendes: Correspondence - Varsel for mottatt melding, Prefill - Varsel for mottatt preutfylt tjeneste/skjema, Pin - Varsel for mottatt pinkode, General - Generell varsel|
|Correspondences.Correspondence.Notifications.Notification.TextTokens|Liste av tekster som skal erstatte maltekster i varselmal|
|Correspondences.Correspondence.Notifications.Notification.TextTokens.TextToken|Element som inneholder tekster som skal erstatte maltekster i meldingsmaler|
|TokenNum|Ikke i bruk, kan utelates|
|TokenValue|Tekst som skal ersatte maltekst. Substitusajonen gjøres i samme rekkefølge som parameterene er angitt. Varselmal må bestilles og lages på forhånd|
|Correspondences.Correspondence.Notifications.Notification.ReceiverEndPoints|Angir mottakere av varselet|
|Correspondences.Correspondence.Notifications.Notification.ReceiverEndPoints.ReceiverEndPoint|Angir en mottaker for et varsel|
|TransportType|Angir hvordan varslingen skjer: Email - Varsel vha. epost, SMS - Varsel vha. mobiltelefon, Instant Message (IM) - Varsel vha. sanntidsmelding over internett, f.eks. på Windows Live Messenger, Both email & sms - Varsel via både sms og epost|
|ReceiverAddress|Angir mottakers adresse (for eksempel telefonnummer eller e-post adresse)|
|Correspondences.Correspondence|Forts.|
|AllowForwarding|Angir om meldingen skal kunne videresendes av bruker i portalen|
|CaseId|Unik identifikator for samhandlingstjenesten|

##### 10.4.1.2 Altut format
Meldinger som sendes til Altinn fra tjenesteeier må være i henhold til AltUt.xsd. Dette ble etablert i en tidligere versjon av Altinn.

|**Element**|**Beskrivelse**|
|--------|--------|
|GovOrgan|Rotnode i AltUt xml|
|name|Kode som unikt representerer kildesystem, f.eks. "ABC-123". Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier|
|GovOrgan.AltUt|Overordnet element|
|sequenceno|Sekvensnummer for forsendelsen. Dersom dette settes må sekvensnummeret være ett nummer høyere enn det forrige sekvensnummeret på meldingsforsendelse for denne tjenesteeieren. I motsatt fall vil forsendelsen avvises i Altinn|
|GovOrgan.AltUt .Message|Starten på en Altut melding|
|shortName|Angir hvilken tjeneste meldingen tilhører. Format: xxxxxx_yyyyyy, hvor "xxxxxx" angir tjenestekode, mens "yyyyyy" angir tjenesteutgavekode. Denne sendes tilbake i kvitteringsbatchen til den offentlige enheten. OBS! Dette feltet ble tidligere brukt som meldingsidentifikator, f.eks. "Skatteoppgjør 2007". Dette er erstattet med tjenesteinformasjon som nevnt ovenfor|
|messageReference|En unik meldingsreferanse innenfor et shortname. Må angis for at tjenesteeier skal kunne motta meldingsbekreftelser|
|viewFormat|Mappes ikke til AltinnII|
|allowDelete|Mappes ikke til AltinnII|
|persistent|Mappes ikke til AltinnII|
|GovOrgan.AltUt .Message.RoleReqRead|Informasjonen hentes fra TUL|
|GovOrgan.AltUt .Message.RoleReqDeleteConfirm|Informasjonen hentes fra TUL i AltinnII|
|GovOrgan.AltUt .Message.RoleReqGovAgency|Informasjonen hentes fra TUL i AltinnII|
|GovOrgan.AltUt .Message.Sender|Mappes ikke til AltinnII|
|GovOrgan.AltUt .Message.Sender.Name|Mappes ikke til AltinnII|
|GovOrgan.AltUt .Message.Participant|Overordnet element|
|id|Organisasjonsnummer/fødselsnummer til den som skal ha meldingen|
|GovOrgan.AltUt .Message.Participant.VisibleDate|Dato for når meldingen skal være synlig for brukeren i portalen|
|GovOrgan.AltUt .Message.Participant.DueDate|Fristen for når melding må bekreftes|
|GovOrgan.AltUt .Message.Participant.AltinnArchive|Arkivreferansen til et Altinn skjema. Denne kan for eksempel brukes hvis AltUt meldingen er et svar/oppfølging til et skjema som tidligere er sendt inn i Altinn|
|GovOrgan.AltUt .Message.Participant.LoginSecurityLevel|Mappes ikke til AltinnII. Hentes fra pålogging|
|GovOrgan.AltUt .Message.Participant.AllowUserDeleteDate|Mappes ikke til AltinnII|
|GovOrgan.AltUt .Message.Participant.AllowSystemDeleteDate|Datoen for når Altinn kan slette meldingen (sanering)|
|GovOrgan.AltUt .Message.Participant.VisibleInClientReport|Mappes ikke til AltinnII|
|GovOrgan.AltUt .Message.Participant.RequireConfirmation|Mappes ikke til AltinnII. Dette settes i TUL|
|GovOrgan.AltUt .Message.Participant.Year|Året meldingen skal assosieres med Altinn. Benyttes bl.a. for selvangivelsen|
|GovOrgan.AltUt .Message.Participant.MunicipalNumber|Kommunenummeret meldingen skal assosieres med Altinn. Benyttes bl.a. for selvangivelsen|
|GovOrgan.AltUt .Message.Participant.Content|Selv innholdet til AltUt meldingen. Må legges i en CDATA blokk|
|languageCode|Språkkoden til meldingen: 1033 - English, 1044 - Bokmål, 2068 - Nynorsk|
|GovOrgan.AltUt .Message.Participant.Content.MessageHeader|Settes i TUL|
|GovOrgan.AltUt .Message.Participant.Content.MessageSubject|Mappes ikke til AltinnII|
|GovOrgan.AltUt .Message.Participant.Content.MessageSummery|Sammendrag av meldingen(e). Denne vises i sammendragfeltet for meldingen i AltUt vinduet|
|GovOrgan.AltUt .Message.Participant.Content.Invoice|Mappes ikke til AltinnII|
|GovOrgan.AltUt .Message.Participant.Content.Attachments|Inneholder evt. vedlegg|
|GovOrgan.AltUt .Message.Participant.Content.Attachments.Attachment|Inneholder informasjon om ett vedlegg, Base64 kodet|
|id|En unik id innenfor gruppen med vedlegg. Den lagres ikke men må eksistere for bakover kompatibilitet|
|functionType|Felt for å spesifisere hvilken funksjon et vedlegg har: Invoice - Faktura, Unspecified - Uspesifisert|
|type|MIME typen til vedlegget: application_none - ingen MIME type angitt, application_pdf - PDF format, application_msword - Microsoft Word, application_vnd_ms_excel - Microsoft Excel, application_vns_oasis_opendocument_text - Open document (type Text), application_vnd_oasis_opendocument_presentation - Open docment (type Presentation), application_vnd_oasis_opendocument_spreadsheet - Open docment (type Spreadsheet), application_rtf - Rich text format type, application_vnd_ms_powerpoint - Microsoft PowerPoint, application_postscript, application_zip -Type zip, text_plain, text_html, text_xml, text_rtf - Rich text format type, text_richtext - Rich text, binary_octet_stream - Binary format, not_Applicable|
|filename|Filnavnet til vedlegget |
|name|Navnet til vedlegget. Denne brukes som navn på linken til filvedlegget i portalen|
|GovOrgan.AltUt .Message.Participant.Content.HTML|Hvis innholdet skal presenters i HTML legges det her.|
|GovOrgan.AltUt .Message.NotificationMessages|Inneholder evt. varsler|
|NotificationTypeName|En unik streng som definerer en referanse til predefinerte varslingstekster.
|GovOrgan.AltUt .Message.NotificationMessages.NotificationMessage|Inneholder informasjon om ett varsel|
|participantId|Fødselsnummer til mottaker av varselet|
|GovOrgan.AltUt .Message.NotificationMessages.NotificationMessage.SMSPhoneNumbers|Telefonnummeret det skal sendes varsler til, kan være flere|
|GovOrgan.AltUt .Message.NotificationMessages.NotificationMessage.SMSPhoneNumbers.SMSPhoneNumber|Telefonnummeret til den som skal ha varsling på SMS|
|GovOrgan.AltUt .Message.NotificationMessages.NotificationMessage.EmailAddresses|Adressen det skal sendes mailvarsler til, kan være flere|
|GovOrgan.AltUt .Message.NotificationMessages.NotificationMessage. EmailAddresses.EmailAddress|Emailadressen til den som skal ha varsling|
|GovOrgan.AltUt .Message.ReplyMessages|Overordnet element for svaralternativer|
|GovOrgan.AltUt .Message.ReplyMessages.ReplyMessage|Element for ett svaralternativ|
|GovOrgan.AltUt .Message.ReplyMessages.ReplyMessage.Form|Mappes ikke til AltinnII. Vil ikke kunne referere til AltinnI-tjenester fra AltinnII. I stedet for skjemanummer brukes ServiceCode|
|formNumber|Mappes ikke til AltinnII|
|version|Mappes ikke til AltinnII|
|GovOrgan.AltUt .Message.ReplyMessages.ReplyMessage.Form.ServiceCode|Tjenestekoden og tjenesteutgavekoden til en service som AltinnII tilbyr, underscore mellom de to verdiene. Format: Tjenestekode_tjenesteutgavekode|
|GovOrgan.AltUt .Message.ReplyMessages.ReplyMessage.Form.ServiceURL|Mappes ikke til AltinnII. Angis i stedet som lenke i meldingen (body)|
|GovOrgan.AltUt .Message.ReplyMessages.ReplyMessage.Form.ArchiveReference|Arkivreferansen til et skjema. Den offentlige enheten kan be brukeren om at et skjema fra arkiv skal kopieres, aktiviseres og sendes inn på nytt med tilleggsinformasjon.NB: Betinger at det er mulig å aktivisere skjemaet fra sluttbrukerens meldingsboks|

##### 10.4.2	Meldingsbekreftelse fra Altinn til tjenesteeier
**10.4.2.1 Correspondence**
For at tjenesteeiere skal kunne vite om meldinger er lest og evt. bekreftet av mottaker leverer Altinn regelmessig informasjon om dette til de enkelte tjenesteeiere. Tjenesteeiere som benytter nytt grensesnitt for innsending av meldinger til Altinn, vil også få bekreftelser tilsendt på nytt format. Informasjonen leveres i batcher på FTP/SFTP protokoll, og xml formatet på filen er i henhold til schemas.altinn.no.services.intermediary.correspondence.confirmations.2009.10.xml. 

Tjenesteeier må etablere FTP/SFTP område som Altinn kan aksessere vha. avtalt brukernavn og passord.

Bekreftelsene som sendes til tjenesteeier fra Altinn er i henhold til correspondence.confirmations.2010.10.xsd formatet. Xsd’en ligger som et separat vedlegg til dette dokumentet.

Når data sendes ut fra Altinn lages en kvittering i Altinn som forteller at data er sendt til tjenesteeier.

Tabellen under beskriver elementer og attributter relevante for meldingsbekreftelser:

|**Element**|**Beskrivelse**|
|--------|--------|
|CorrespondenceConfirmations|Rot element for rapport over leste og bekreftede meldinger i Altinn siden forrige batch|
|SequenceNo|Sekvensnummer for denne forsendelsen (valgfritt). Hvis satt må verdien være ett nummer høyere enn sekvensnummeret ved forrige forsendelse. Hvis ikke verdien er økt med 1vil forsendelsen feile|
|PreviousSequenceNo|Sekvensnummer for forrige forsendelse (valgfritt, men må med hvis SequenceNo er satt)|
|SystemUserCode|Kode som representerer en system bruker, f.eks. SKD-PSA, hvor de tre første tegnene angir tjenesteeier (påkrevd) og de etter understreken representerer avdeling/system hos tjenesteeieren (valgfritt)|
|ShipmentDateTime|Dato som forteller når meldingsbekreftelsen ble sendt|
|CountConfirmationsInShipment|Antall bekreftelser i forsendelsen|
|CorrespondenceConfirmations.Confirmation|En lest/godkjent melding|
|ServiceCode|Angir den unike tjenestekoden., f.eks. "PSA"|
|ServiceEdition|Tjenesteutgavekode, f.eks. "2009" (valgfritt). Hvis det ikke settes vil siste utgave benyttes|
|Reportee|Fødselsnummer  til bruker som har bekreftet melding|
|CorrespondenceReference|Tjenesteeiers referanse på meldingen|
|CorrespondenceConfirmations.Confirmation.Read|Bekreftelse på at melding er åpnet/lest|
|ReadDateTime|Tidspunkt for når melding ble bekreftet lest|
|CorrespondenceConfirmations.Confirmation.Confirmed|Beskjed om at bruker har bekreftet meldingen|
|UserSSN|Brukerens fødselsnummer|
|ConfirmedDateTime|Bekreftings tidspunkt|
|ConfirmedRoleList|Brukerens rolleliste på godkjennings tidspunktet|
|AuthenticationMethod|Brukerens login nivå ved godkjenning|

##### 10.4.2.2 AltUtConfirmationBatch
For at tjenesteeiere skal kunne vite om meldinger er lest og evt. bekreftet av mottaker leverer Altinn regelmessig informasjon om dette til de enkelte tjenesteeiere. Tjenesteeiere som benytter gammelt grensesnitt for innsending av meldinger til Altinn (AltUt.xsd), vil også få bekreftelser tilsendt på gammelt format. Informasjonen leveres i batcher på FTP/SFTP protokoll, og xml formatet på filen er i henhold til AltUtConfirmationBatch.xsd

Tjenesteeier må etablere FTP/SFTP område som Altinn kan aksessere vha. avtalt brukernavn og passord.

Når data sendes ut fra Altinn lages en kvittering i Altinn som forteller at data er sendt til tjenesteeier.

|**Element**|**Beskrivelse**|
|--------|--------|
|AltUtConfirmationBatch|Rot note. Rapport over leste og bekreftede meldinger i Altinn siden forrige batch|
|batchReference|Referansenummeret til batchen|
|previousReference|Referansenummeret til den forrige batchen som ble sendt|
|receiverReference|Tjenesteeiersystemet som mottar bekreftelsene|
|timestamp|Tidsstempelet når batchen ble generert|
|confirmationsInBatch|Antall confirmations som finnes i batchen|
|AltUtConfirmationBatch.AltUtConfirmations|Samling av lest/bekreftet elementer|
|AltUtConfirmationBatch.AltUtConfirmations.Confirmation|En lest/godkjent Altut melding|
|participantId|Organisasjonsnummer/fødselsnummer til den som meldingen ble sendt inn til|
|shortName|Som for AltUt meldingen benyttes dette feltet til tjenestekode og tjenesteutgavekode. Format xxxxxx_yyyyyy, hvor "xxxxxx" angir tjenestekode, mens "yyyyyy" angir tjenesteutgavekode.|
|messageReference|Kan benyttes til å unikt referere en melding innenfor samme  shortName|
|AltUtConfirmationBatch.AltUtConfirmations.Confirmation.Read|Informasjon om lesing av den aktuelle Altut meldingen|
|AltUtConfirmationBatch.AltUtConfirmations.Confirmation.Read .ReadDateTime|Tidsstempel for når meldingen er lest|
|AltUtConfirmationBatch.AltUtConfirmations.Confirmation.Confirmed|Informasjon om bekrefting av den aktuelle Altut meldingen|
|participantId|Fødselsnummeret til første personen som har bekreftet meldingen|
|AltUtConfirmationBatch.AltUtConfirmations.Confirmation.Confirmed ConfirmedDateTime|Tidsstempel for når meldingen er bekreftet|
|AltUtConfirmationBatch.AltUtConfirmations.Confirmation.Confirmed ConfirmationRoleList|Space-separert liste med rollene som brukeren som bekreftet meldingen har|
|AltUtConfirmationBatch.AltUtConfirmations.Confirmation.Confirmed.LoginMethod|Innloggingsnivået som en brukeren hadde da vedkommende bekreftet meldingen. Denne kan være: 1 - Innlogging med bare passord, 2 - Innlogging med pinkode, 4 - Innlogging med PKI.
|AltUtConfirmationBatch.Signature|Element som inneholder signaturinformasjon. Elementet er ikke obligatorisk, og er ikke i bruk|

##### 10.4.2.3 CorrespondenceUsageData
Tjenesteeier vil kunne definere i tjenesteutviklingen av en meldingstjeneste å motta en rapport over ikke leste, leste og bekreftede meldinger etter et gitt antall dager etter at meldingen er sendt ut. Informasjonen kan konfigureres til å overleveres via FTP/SFTP ved enten at Altinn leverer til tjenesteeier, eller at tjenesteeier henter fra Altinn.

Følgende er et eksempel på formatet informasjonen vil bli levert på:

CorrespondenceUsageData

```xml
<?xml version="1.0" encoding="utf-8" ?>
<CorrespondenceUsageData xmlns="http://schemas.altinn.no/services/intermediary/correspondence/usagedata/2009/10">
  <ShipmentDateTime>2010-08-26T08:02:11</ShipmentDateTime>
  <CorrespondenceUsage>
    <Service>
      <ServiceOwnerCode>SERVICEOWNER</ServiceOwnerCode>
      <ServiceName>Service Name</ServiceName>
      <ServiceEdition>
        <ServiceEditionID>xxxx</ServiceEditionID>
        <ServiceEditionVersion>
          <ServiceEditionVersionName>ABC</ServiceEditionVersionName>
          <Correspondence>
            <ReporteeID>[SSN/ORG]</ReporteeID>
            <CorrespondenceStatusType>[Status]</CorrespondenceStatusType>
            <SentCorrespondenceDatetime>[Time]</SentCorrespondenceDatetime>
          </Correspondence>
          <Correspondence>...</Correspondence>
        </ServiceEditionVersion>
      </ServiceEdition>
    </Service>
    <Service>...</Service>
  </CorrespondenceUsage>
</CorrespondenceUsageData>
```

##### 11 Feilhåndtering
Altinn returnerer feilkoder hvis noe går galt. For å formidle feilsituasjonen benyttes en SOAP Fault med en egen kontrakt som inneholder felter som identifiserer feilen og gir en tekstelig feilmelding.

**11.1 SOAP Fault**
Altinn benytter en SOAP fault til å returnere feilmeldinger for en web service. Denne fault meldingen er i henholdt til AltinnFault kontrakten definert i WSDL for alle tjenestene. Kontrakten vil angi en feilkode og en feilmelding, henholdsvis ErrorID og AltinnErrorMessage, for å definere feilsituasjoner.

Eksempel på en feilmelding fra Altinn:
```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <s:Fault>
         <faultcode>s:Client</faultcode>
         <faultstring xml:lang="nb-NO">An errror occurred</faultstring>
         <detail>
            <AltinnFault xmlns="http://www.altinn.no/services/common/fault/2009/10" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
               <AltinnErrorMessage>Incorrect username/password/pin given for user</AltinnErrorMessage>
               <AltinnExtendedErrorMessage>No information available</AltinnExtendedErrorMessage>
               <AltinnLocalizedErrorMessage>Incorrect username/password/pin given for user</AltinnLocalizedErrorMessage>
               <ErrorGuid>ed4c23c0-7de6-4343-a442-89bd3a6f38d8</ErrorGuid>
               <ErrorID>989</ErrorID>
               <UserGuid>-no value-</UserGuid>
               <UserId/>
            </AltinnFault>
         </detail>
      </s:Fault>
   </s:Body>
</s:Envelope>
```
##### 11.2 Feilkoder
Listen under angir de generelle feilkodene som benyttes. Disse er først og fremst benyttet i sammenheng med autentisering og autorisering og benyttes derfor av flere av tjenestene i Altinn. Feilkoder mer spesifikke for operasjonene er listet opp under de respektive operasjonene i kapittel 9 Grensesnitt – web services.

|**Feilkode**|**Beskrivelse**|
|--------|--------|
|0|Denne feilen oppstår i følgende tilfeller, se tekst i AltinnErrorMessage for mer informasjon: En nødvendig parameter for autentisering/autorisering mangler i forespørsel, Systemet er ikke autorisert for denne operasjonen på vegne av angitt avgiver, Operasjonen krever høyere autentiseringsnivå enn mulig og må derfor utføres i portalen|
|5|Denne feilen oppstår i følgende tilfeller, se tekst i AltinnErrorMessage for mer informasjon: Ikke mulig å autorisere forespørsel basert på sendte parametere – verifiser gyldigheten/format, Autentisering av systemet vha sertifikat feilet pga feil brukernavn/passord, Systemet autentisert ved sertifikat er midlertidig låst ute, Systemet er ikke autorisert til å kalle tjenesten fra innkommende IP adresse, Systemet er ikke autorisert til å kalle forespurt ressurs, feil tjenesteeier,Angitt system ID er ikke gyldig – skal være et nummer|
|989|Denne feilen oppstår i følgende tilfeller, se tekst i AltinnErrorMessage for mer informasjon: Forespørsel mangler system ID eller system passord, Autentisering av systemet (uten sertifikat) feilet pga feil brukernavn/passord, Systemet (ikke sertifikat) er midlertidig låst ute|

Hvis det ikke kommer en forståelig feilmelding, send en henvendelse til support@altinn.no. Legg med tidspunkt for innsending og systemUserName, den unike koden (ErrorGuid) samt beskrivelse av hva som har skjedd.


##### 13 Vedlegg A: Feilkoder i Altinn
|**Feilkode**||**Beskrivelse (eng)**|
|--------|--------|
|**Common Error Codes 1 – 1000**||
|    GeneralError                    |    0      |     Denotes a general error                  |
|    NullObjectReference             |    1      |     Denotes an error caused by a   null reference                   |
|    MissingRight                    |    14     |     Authorization error - Subject   does not have required right    |
|    HookActivationFailed            |    90     |     Error given when hook   activation fails                        |
|    IncorrectLevel                  |    17     |     User is not authenticated on   the correct level                |
|    RequiresLevel1                  |    18     |     Requires   level 1                                              |
|    RequiresLevel2                  |    19     |     Requires   level 2                                              |
|    RequiresLevel3                  |    20     |     Requires   level 3                                              |
|    RequiresLevel4                  |    21     |     Requires   level 4                                              |
|    ExternalSystemAuthentication    |    989    |    External system authentication failed|
|**Common Error Codes 10000 - 20000**|||
|AccessDenied|10000| Database error - Access denied|
|**Hook Error Codes 20001 - 21000**|||
|ServiceCannotBeStarted|20001| Hook error - Service cannot be started|
|ServiceCannotBeStartedForCurrentReportee	|20002	| Hook error - Service cannot be started for the current reportee|
|NoValidSubscriptionData	|20003||
|NoValidReporteeAgeAndStatus	|20004||
|**TUL Error Codes 21001 - 23000**||
|    ServiceEditionCodeAlreadyExists         |    21001     |     TUL Error - Service edition   code exists already                                   |
|    FileNotFound                            |    21002     |     TUL Error - File not found                                                          |
|    DataAreaTypeNotFound                    |    21003     |     TUL Error - Data area type not   found                                              |
|    RootNodeNotFound                        |    21004     |     TUL Error - Root node not found                                                     |
|    DoesNotExists                           |    21005     |     TUL Error - (something) does   not exist                                            |
|    NotImpersonatedOrAuthorised             |    21006     |     TUL Error - User is not   impersonated or authorized                                |
|    EntrySiteDoesNotExists                  |    21007     |     TUL Error - Entry site does not   exist                                             |
|    IDZeroORNegative                        |    21008     |     TUL Error - ID is zero or   negative                                                |
|    ServiceEditionInProduction              |    21009     |     TUL Error - Service edition is   already in production                              |
|    RequiredFieldNotSupplied                |    210010    |     TUL Error - Required field is   not supplied                                        |
|    CannotBeNull                            |    210011    |     TUL Error - (something) cannot   be null                                            |
|    UserNotAuthorized                       |    210012    |     TUL Error - User is not   authorized                                                |
|    IncorrectClientConfiguration            |    210013    |     TUL Error - Incorrect client   configuration                                        |
|    IncorrecctArguement                     |    210014    |     TUL   Error - Incorrect argument                                                    |
|    GetDeploymentPackagesFailed             |    210015    |     TUL   Error - GetDeploymentPackages failed                                          |
|    GetDeploymentPackageFailed              |    210016    |     TUL   Error - GetDeploymentPackage failed                                           |
|    ServiceEditionValidationFailed          |    210017    |     TUL Error - Service edition   validation failed                                     |
|    DeploymentPackageCreationFailed         |    210018    |     TUL Error - Deployment package   creation failed                                    |
|    ServiceEditionMigrationFailed           |    210019    |     TUL Error - Service edition   migration failed                                      |
|    UnableToReachSBLService                 |    210020    |     TUL Error - Unable to reach SBL   service                                           |
|    CallToSBLWCFOperationFailed             |    210021    |     TUL Error - Call to SBL WCF   operation failed                                      |
|    UnexpectedErrorDuringMigration          |    210022    |     TUL Error - Unexpected error   during migration                                     |
|    ValueNotDefinedInEnum                   |    210023    |     TUL Error - Value is not   defined in enum                                          |
|    BEObjectCannotBeNull                    |    210024    |     TUL Error - Business Entity   object cannot be null                                 |
|    XsdNotFoundOrXsnNotUploaded             |    22985     |     TUL Error - XSD not found or   XSN not uploaded                                     |
|    ServiceDoesNotExist                     |    22986     |     TUL Error - Service does not   exist                                                |
|    ServiceHasAlreadyBeenDeleted            |    22987     |     TUL Error - Service has already   been deleted                                      |
|    ServiceEditionHasAlreadyBeenDeleted     |    22988     |     TUL Error - Service edition has   already been deleted                              |
|    ServiceEditionHasBeenDeleted            |    22989     |     TUL Error - Service edition has   been deleted                                      |
|    ServiceHasBeenDeleted                   |    22990     |     TUL Error - Service has been   deleted                                              |
|    ServiceOwnerUrlAlreadyExists            |    22991     |     TUL Error - Service owner URL   already exists                                      |
|    UserDoesNotHaveRightsToCreateSites      |    22992     |     TUL Error - User does not have   rights to create sites                             |
|    UnexpectedErrorInRetrievingGuid         |    22993     |     TUL Error - Unexpected error in   retrieving GUID                                   |
|    DataRetrievalFailed                     |    22994     |     TUL Error - Data retrieval   failed                                                 |
|    UnexpectedErrorInSettingStatus          |    22995     |     TUL Error - Unexpected error in   setting status                                    |
|    SiteCreationFailed                      |    22996     |     TUL Error - Site creation   failed                                                  |
|    SuppliedGuidIsNullOrEmpty               |    22997     |     TUL Error - Supplied GUID is null   or empty                                        |
|    DuplicateXsdInFormSet                   |    22998     |     TUL Error - Duplicate XSD in   formset                                              |
|    ServiceShortNameExists                  |    22999     |     TUL Error - Service short name   already exists                                     |
|    ServiceEditionShortNameAlreadyExists    |    210025    |     TUL Error - Service edition   short name already exists                             |
|    ServiceCodeAlreadyExists                |    210026    |     TUL Error - Service code   already exists                                           |
|    SpecificationDataMissing                |    210027    |     TUL Error - Specification data   missing                                            |
|    NoAuthorizationRulesDefined             |    210028    |     TUL Error - No authorization   rules have been defined for this service edition.    |
|    RoleNameAreadyExists                    |    210029    |     TUL Error - No authorization   rules have been defined for this service edition.    |
|    SBLOperationTimedOut                    |    210030    |    TUL Error - Migration timed out
|**Integration Error Codes 30001 - 31000**||
|    NotAuthorizedForReportee        |    30001    |     Integration error - Not   authorized for reportee        |
|    NotAuthorizedForSignature       |    30002    |     Integration error - Not   authorized for signature       |
|    NotAValidService                |    30003    |     Integration error - Not a valid   service                |
|    ArgumentNullException           |    30004    |     Integration error - Argument is   null                   |
|    NotAValidServiceOwnerCode       |    30005    |     Integration error - Not a valid   service owner code     |
|    InValidServiceEditionVersion    |    30006    |     Integration error - Invalid   service edition version    |
|    FileNotExist                    |    30007    |     Integration error - File does not   exist                |
|**SBL External Error Codes 40001 - 41000**||
|    LanguageCodeCannotBeNull                |    40001    |     SBL External error - Language   code cannot be null                  |
|    MessageBodyCannotBeNull                 |    40002    |     SBL External error - Message   body cannot be null                   |
|    MessageTitleCannotBeNull                |    40003    |     SBL External error - Message   title cannot be null                  |
|    MessageSummaryCannotBeNull              |    40004    |     SBL External error - Message   summary cannot be null                |
|    ExternalReferenceCannotBeNull           |    40005    |     SBL External error - External   reference cannot be null             |
|    ExternalServiceCodeCannotBeNull         |    40006    |     SBL External error - External   service code cannot be null          |
|    ReporteeCannotBeNull                    |    40007    |     SBL External error - Reportee   cannot be null                       |
|    SystemUserCodeCannotBeNull              |    40008    |     SBL External error - System   user code cannot be null               |
|    CorrespondenceCanNotBeDeleted           |    40009    |     SBL External error -   Correspondence cannot be deleted              |
|    ElementCanNotBeDeleted                  |    40010    |     SBL External error - Element   cannot be deleted                     |
|    PersonHasStrictlyConfidentialAddress    |    40011    |     SBL External error - Person has   strictly confidential address      |
|    FormDataIsNotValid                      |    40012    |     SBL External error - Form data   is not valid                        |
|    ServiceIsNotValid                       |    40013    |     SBL External error - Service is   not valid                          |
|    InValidNumberOfReceipents               |    40014    |     SBL External error - Invalid   number of receipients                 |
|    InvalidFormatSmsAndEmail                |    40015    |     SBL External error - Invalid   SMS                                   |
|    InvalidSSN                              |    40016    |     SBL External error - Invalid   SSN                                   |
|    ReceiverAddressNull                     |    40017    |     No   receiver address                                                |
|    ControlWorkflowSentComplete             |    40018    |     Control   Workflow Sent Complete                                     |
|    InvalidServiceType                      |    40019    |     Invalid   Service Type                                               |
|    InvalidEmailAddressForFromAddress       |    40020    |    The From Address must be skipped or contain a valid email address.    |
|**Authorization Error Codes 50001 - 51000**||
|    DelegateRolesBEInputInvalid                |    50001    |     This error code is used when the   party a user wants to delegate a role or right to, does not exist.                                                             |
|    GeoLocationIsMandatory                     |    50002    |     This is used when geo location   has not been supplied                                                                                                            |
|    InvalidGeoLocation                         |    50003    |     This is used when geo location   format is not correct                                                                                                            |
|    CoveredByUserIDRequired                    |    50004    |     This is used when delegation   type is SSN,UserName and CoveredByUserID has not been supplied                                                                     |
|    CoveredByPartyIDRequired                   |    50005    |     This is used when delegation   type is Organization and CoveredByPartyID has not been supplied                                                                    |
|    CannotDelegateToEnterpriseCertifiedUser    |    50006    |    This is used when roles or rights of an enterprise/user not   represented by an enterprise certified user is being delegated to an   enterprise certified user.    |
|    CannotDelegateANonDelegatableRole          |    50007    |     This is used when someone is   trying to delegate a non-delegatable role                                                                                          |
|    InvalidOrgNumber                           |    50008    |     When the OrgNo is not proper or   does not exist                                                                                                                  |
|    InvalidUserDetails                         |    50009    |     When the SSN or Last Name or   UserName are not valid or a user with the combination does not exist                                                               |
|    UserDoesNotHaveProfessionalConsent         |    50010    |     When user does not have   professional consent                                                                                                                    |
|    InvalidGeoLocationFormat                   |    50011    |     Geo location is in incorrect   format                                                                                                                             |
|    CannotDelegateDenyOnOtherResources         |    50012    |     Cannot delegate Deny type right   on resources other than reporteeElement.                                                                                        |
|    RoleTypeNameNotUnique                      |    50013    |     RoleTypeName is not unique                                                                                                                                        |
|    RoleTypeBeenDelegated                      |    50014    |     RoleType   has been Delegated                                                                                                                                     |
|    RoleTypeLanguagesNotValid                  |    50015    |     RoleTypeLanguagesNotValid                                                                                                                                         |
|    DeleteRolesAndRightsFailure                |    50016    |     DeleteRolesAndRightsFailure                                                                                                                                       |
|    SelfDelegationIsNotAllowed                 |    50017    |     Delegation to self is not   allowed                                                                                                                               |
|    RoleTypeCodeNotMigrated                    |    50018    |     RoleTypeCodeNotMigrated                                                                                                                                           |
|    ResourceHasNoRule                          |    50019    |     RuleHasNoRight |
|    **Collaboration Service Error Codes 60001 - 70001**    |             |                                                                                       |
|    InvalidCaseID                                                                     |    60001    |     Invalid   Case ID                                                                 |
|    InvalidCaseIdentifier                                                             |    60002    |     Invalid Service Code and   Service Edition Code Combination and Invalid CaseID    |
|    InvalidLanguage                                                                   |    60003    |     Invalid   Language ID                                                             |
|    ExceededCharacterLimit                                                            |    60004    |     Character Limit Exceeded.                                                         |
|    InvalidReporteeElement                                                            |    60005    |     Invalid   Reportee Element                                                        |
|    UnarchivedCorrespondenceException                                                 |    60006    |     For correspondences services   which have not been archived                       |
|    UnarchivedReportingServicesException                                              |    60007    |     For Form Task services which   have not been archived                             |
|    ReporteeElementInAnotherCase                                                      |    60008    |     For Reportee element is already   associated to another case                      |
|    InvalidServiceInCollaborationServiceSet                                           |    60009    |     For A Service, not available in   Collaboration Service Set                       |
|    InvalidReporteeID                                                                 |    60010    |     Invalid   Reportee ID                                                             |
|    InvalidNoticeTemplateID                                                           |    60011    |     Invalid   NoticeTemplateID                                                        |
|    InvalidReporteeNumber                                                             |    60012    |     Mandatory ReporteeNumber                                                          |
|    ArchivedOrDeletedCaseID                                                           |    60013    |     Case is already archived or   deleted                                             |
|    ArchivedCaseID                                                                    |    60014    |    Case is archived.So no processing allowed.                                         |
|    DeletedCaseID                                                                     |    60015    |    Case is Deleted. So no processing allowed.                                         |
|    InvalidElement                                                                    |    60016    |    The element is unavailable.                                                        |
|    UnassociatedElement                                                               |    60017    |    The element is not associated with any Case.                                       |
|    DeletedElement                                                                    |    60018    |    The element is deleted.                                                            |
|    ArchivedElement                                                                   |    60019    |    The element is archived.                                                           |
|    InvalidNoticeTokenID                                                              |    60020    |    Invalid notice Token                                                               |
|    InvalidNoticeTokenValue                                                           |    60021    |    Invalid notice Token Value                                                         |
|    InvalidEventIdentifier                                                            |    60022    |    Invalid Event Identifiers                                                          |
|    InvalidEventName                                                                  |    60023    |    Invalid Event Name                                                                 |
|    UnauthorizedServiceOwner                                                          |    60024    |    Service Owner is unauthorized                                                      |
|    MissingNoticeTokens                                                               |    60025    |    Missing Notice Tokens                                                              |
|    WorkFlowValidationException                                                       |    60026    |    Received WorkFlow Exception                                                        |
|    WorkFlowInitiationException                                                       |    60027    |    Workflow Initiation Exception                                                      |
|    MissingWorkflowInstance                                                           |    60028    |    Missing Workflow Instance                                                          |
|    WorkFlowGenericException                                                          |    60029    |    WorkFlow Generic Exception                                                         |
|    EventDeliveryFailed                                                               |    60030    |    Event Delivery Failed                                                              |
|    MissingEventName                                                                  |    60031    |    Missing Event Name                                                                 |
|    UnavailableStateMachineEvents                                                     |    60032    |    Unavailable State Machine Events                                                   |
|    **SMDI Error Codes - 70001 - 80001**    |             | |
|    IncorrectService                                                 |    70001    |     Incorrect service details                                              |
|    IncorrectWorkFlow                                                |    70002    |     Incorrect process work flow   details                                  |
|    IncorrectServiceEditionVersion                                   |    70003    |     Incorrect Service Edition   Version details                            |
|    IncorrectEventHook                                               |    70004    |     Incorrect Event Hook details                                           |
|    IncorrectReportingService                                        |    70005    |     Incorrect Reporting Service details                                    |
|    IncorrectCorrespondenceService                                   |    70006    |     Incorrect Correspondence Service details                               |
|    IncorrectLookupService                                           |    70007    |     Incorrect Lookup Service details                                       |
|    IncorrectCollaborationReUse                                      |    70008    |     Incorrect Collaboration Service   - ReUseData details                  |
|    IncorrectFormset                                                 |    70009    |     Incorrect Form Set details                                             |
|    IncorrectLogicalForm                                             |    70010    |     Incorrect Form Set details                                             |
|    IncorrectSplitData                                               |    70011    |     Incorrect Split of data details                                        |
|    IncorrectTranslation                                             |    70012    |     Incorrect Translation details                                          |
|    IncorrectDeployForm                                              |    70013    |     Incorrect FormTemplate uploaded                                        |
|    IncorrectSecurity                                                |    70014    |     Incorrect Roles & Rights details                                       |
|    IncorrectCollaborationServices                                   |    70015    |     Incorrect Collaboration Service   - ServicesInCollaboration details    |
|    IncorrectCollaborationStateMachine                               |    70016    |     Incorrect Collaboration Service   - StateMachine details               |
|    IncorrectStyleSheet                                              |    70017    |     Incorrect StyleSheet details                                           |
|    IncorrectPIImages                                                |    70018    |     Incorrect StyleSheet - Images details                                  |
|    IncorrectPI                                                      |    70019    |     Incorrect PI details |

##### 14	Vedlegg B: Kodeeksempler SPI.

** 14.1	Dekryptering av kryptert symmetrisk nøkkel.**
Dette eksemplet henter ut privat nøkkel fra keystore basert på keyname og dekrypterer den symmetriske nøkkelen ved hjelp av RSA algoritmen. Kodeeksemplet er basert på C#.

```
        /// <summary>
        /// Method to retrieve certificate from KeyStore
        /// </summary>
        /// <param name="thumbprint"></param>
        /// <param name="storeName"></param>
        /// <param name="storeLocation"></param>
        /// <returns></returns>
        public static X509Certificate2 GetCert(string thumbprint, StoreName storeName, StoreLocation storeLocation)
        {  // The following code gets the cert from the keystore
            X509Store store = new X509Store(storeName, storeLocation);
            store.Open(OpenFlags.ReadOnly);
            X509Certificate2Collection certCollection = store.Certificates.Find(X509FindType.FindByThumbprint, thumbprint, false);
            X509Certificate2Enumerator enumerator = certCollection.GetEnumerator();
            X509Certificate2 cert = null;
            while (enumerator.MoveNext())
            {
                cert = enumerator.Current;
            }
            return cert;
        }



     /// <summary>
        /// Decrypt the symmetric key encrypted with certificate. This method will
        /// retrive the private key based on the thumprint given for certificate
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_Click(object sender, EventArgs e)
        {
            string thumbprint = soCertificateThumbPrint_TB.Text;
            X509Certificate2 cert =  GetCert(thumbprint, StoreName.My, StoreLocation.LocalMachine);

            byte[] symmetricKey = Convert.FromBase64String(soEncryptedSymmetricKeyWithCertTB.Text);

              ////Encrypt the symmetric key with certificate
                RSACryptoServiceProvider rsa = (RSACryptoServiceProvider)cert.PrivateKey;
                byte[] decryptedKey = rsa.Decrypt(symmetricKey, false);

                soDecryptedSymmetricKeyTB.Text = Convert.ToBase64String(decryptedKey)
        }


##### 14.2	Dekryptering av data.
Dette eksemplet viser dekryptering av data kryptert med den AES algoritmen.

    `    /// <summary>
        /// Method to Setup the AESCipher
        /// </summary>
        private void SetupAesCipher(byte[] symmetricKey, bool isXmlEncryption)
        {
            if (_aesCipher == null)
            {
                _aesCipher = new AesManaged();

                _aesCipher.KeySize = this._keyLengthInBits;
/// BlockSize: 128-bit == 16 bytes, which is what you get with the AES from IBM's JCE provider. 
                // 128-bit is the default for RijndaelManaged
                _aesCipher.BlockSize = 128;  // can also specify 256

                _aesCipher.Mode = CipherMode.CBC;

		//If the data is Xml, padding mode is ISO10126
aesCipher.Padding = isXmlEncryption ? PaddingMode.ISO10126 :      PaddingMode.PKCS7;
            }

	     byte[] key = new byte[16];
	     byte[] iv = new byte[16];
System.Buffer.BlockCopy(symmetricKey, 0, key, 0, 16);
System.Buffer.BlockCopy(symmetricKey, 16, iv, 0, 16);
            _aesCipher.IV = iv;
            _aesCipher.Key = key;
        }



/// <summary>
        /// Decrypt and message and return it as string
        /// </summary>
        /// <param name="cipherText"></param>
/// <param name=" isXmlEncryption">true if data is Xml</param>
        /// <returns></returns>
        public string DecryptMessageToString(byte[] cipherText, bool isXmlEncryption)
        {
            try
            {
                byte[] plainText = DecryptMessage(cipherText, isXmlEncryption);
                return System.Text.Encoding.ASCII.GetString(plainText);
            }
            catch
            {
                return "(garbled)";
            }
        }




        /// <summary>
        /// Decrypt message
        /// </summary>
        /// <param name="cipherText"></param>
	/// <param name=" isXmlDecryption ">true if data is Xml</param>
        /// <returns></returns>
        public byte[] DecryptMessage(byte[] cipherText, bool isXmlDecryption)
        {
            byte[] plainText;

            ICryptoTransform transform = _aesCipher.CreateDecryptor();

            if (isXmlDecryption)
            {
//create another array to copy the data to be decrypted leaving the IV (which is first 16 bytes)
                byte[] cipherBytes = new byte[cipherText.Length - _aesCipher.IV.Length];

                // copy the data to be decrypted which is from 16
  System.Buffer.BlockCopy(cipherText, _aesCipher.IV.Length, cipherBytes, 0, cipherBytes.Length);

                //decrypt the data
                plainText = transform.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);
            }
            else
            {
                plainText = transform.TransformFinalBlock(cipherText, 0, cipherText.Length);
            }

            return plainText;
        }



  /// Method that decrypts the data for Agency System based on the symmetric key that
        /// has been encrypted with RSA Algorithm
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void soDecryptData_Click(object sender, EventArgs e)
        {
            Byte[] symmetricKey = Convert.FromBase64String(soDecryptedSymmetricKeyTB.Text);
            SetupAesCipher(symmetricKey);
            soDecryptedSensitiveData_TB.Text = DecryptMessageToString(Convert.FromBase64String(soEncryptedSPIData_TB.Text));
        }
```




















