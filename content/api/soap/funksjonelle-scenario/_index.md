---
title: Funksjonelle scenario
description: Altinn tilbyr flere tjenester innenfor flere funksjonelle områder for sluttbrukersystemer og dets brukere. Her finner du en beskrivelse av hvilken funksjonalitet som finnes med referanser til hvilke web services som benyttes. 
weight: 700
toc: true
aliases:
- /guides/integrasjon/sluttbrukere/webservice/funksjonelle-scenario/
---


## Autentisering og autorisasjon av sluttbrukersystem og bruker

Alle tjenesteoperasjoner som kan benyttes av et sluttbrukersystem vil alltid bruke et sluttbrukersystem id eller brukernavn og tilhørende passord for å autentisere system og autorisere rettigheter til at systemet har rettigheter til å utføre handlinger på vegne av en juridisk enhet.

For å utføre tjenesteoperasjoner på vegne av bruker er det også mulig å autentisere seg ved bruk av brukerens brukerprofil brukernavn og tilhørende passord, på samme måte som man ville brukt sluttbrukersystem id og passord. For å kunne bruke denne autentiseringsmetoden må man aktivere dette på sin brukerprofil side. Tjenesteoperasjoner som autentiseres med brukernavn kan kun gi rettighet til å utføre handlinger på vegne av denne brukeren.

I de tilfeller i grensesnitt-beskrivelsene hvor det refereres til systemUserName vil man også kunne bruke brukerens brukernavn og passord for å autentisere seg, i stedet for en sluttbrukersystem ID.

Utover dette vil det for noe funksjonalitet også være et behov for å autentisere den unike brukeren som benytter sluttbrukersystemet og autorisere at vedkommende har rettigheter til å levere eller hente spesifikke data eller utføre operasjoner på vegne av en juridisk enhet. Denne sjekken utføres ved at sluttbrukersystem først kaller en web service som autentiserer en bruker og ber om en spesifikk engangskode som skal sendes inn sammen med kallet til den web servicen som krever autentisering og autorisasjon av en bruker. Denne engangskoden kan være basert på følgende typer:

- Engangskode fra brev bestilt på Altinn
- Engangskode tilsendt per SMS (for registrert Altinn bruker)

Altinn vil svare på denne henvendelsen med å referere til hvilken engangskode som skal benyttes eller ved å sende en SMS til registrert mobiltelefonnummer på bruker.

Sluttbrukersystemet må håndtere skjermdialogen med brukeren og sørge for at informasjonen Altinn returnerer på forespørsel om hvilken engangskode som må sendes med web service kallet vises frem, og at engangskoden innhentes fra bruker og sendes med i neste kall til den tjenesteoperasjonen som krever autentisering / autorisasjon.

En slik autentisering / autorisasjonshandling er gyldig i 30 minutter fra første forespørsel blir gjort, og vil deretter fornyes med 30 minutters gyldighet hver gang en web service operasjon som benytter denne informasjonen blir kalt. Denne fornyingen vil gjøres inntil en maksimal grense på 8 timer.

Hvis det går for langt tid mellom hvert kall slik at gyldighetsperioden utløper må brukeren pånytt måtte autentiseres / autoriseres med ny engangskode.

Det er en fordel om sluttbrukersystemet implementerer en klokkenedtelling etter at engangskoden blir mottatt slik at brukeren til enhver tid vet hvor lenge den nåværende engangskoden kan brukes.
Dette vil redusere antall SMS utsendinger og medføre at engangskodebrev vil ha lenger holdbarhet.
I tilfeller der engangskoden er/blir ugyldig, er det en fordel om sluttbrukersystem enkelt gir brukeren tilgang til å hente engangskoden på nytt og deretter sende inn den signerte forsendelsen på nytt.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| **Tjeneste**         | **Operasjon**              | **Type** |
| -------------------- | -------------------------- | -------- |
| SystemAuthentication | GetAuthenticationChallenge | Basic    |


## Uthenting av tilgjengelige innsendingstjenester

Sluttbrukersystemer kan alltid hente informasjon om hvilke innsendingstjenester, meldingstjenester, innsynstjenester og samhandlingstjenester (baser på parameter *ServiceType* i operasjonen GetAvailableServices) som til enhver tid er tilgjengelige og aktive i Altinn, samt hente de XML skjema som inngår i et skjemasett for en innsendingstjeneste. GetAvailableServicesV3 inkluderer mulighet for å filtrere resultatene fra de tilgjengelige tjenestene slik at man kan finne akkurat de tjenestene man leter etter.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet
funksjonalitet:**

| **Tjeneste**    | **Type**                     | **Operasjon** |
| --------------- | ---------------------------- | ------------- |
| ServiceMetadata | GetAvailableServicesV2       | Basic/WS      |
| ServiceMetadata | GetAvailableServicesV3       | Basic/WS      |
| ServiceMetadata | GetFormTaskSchemaDefinitions | Basic/WS      |

## Benytt innsendingstjeneste

Å benytte en innsendingstjeneste betyr å sende skjemadata fra et sluttbrukersystem med eventuelle vedlegg og eventuelt signere disse før en innsending. Men i dette scenarioet inngår også det å behandle en innsending gjennom livssyklus fra opprettelse, gjennom arbeidsflyt til oversendelse eller sletting.

Innsendingstjenester er tilknyttet en arbeidsflyt som består av følgende steg:

- Utfylling – Alle påkrevde skjemafelter fylles med data
- Validering – data valideres funksjonelt og iht. regler som er angitt i et skjema
- Signering – En spesifikk autentisert bruker juridisk godkjenner de data som sendes inn
- Bekreft og Send inn – Data arkiveres og oversendes til tjenesteeier.

I forkant av disse fire arbeidsflytstegene kan bruker av sluttbrukersystemet også velge å hente ut preutfyllingsdata fra Altinn. Preutfyllingsdataene kan benyttes for å forenkle utfylling av innsendingstjenesten.

For noen tjenester vil man også kunne ha en såkalt brukerstyrt parallell signering. Med dette menes det at innsender selv kan velge et antall brukere som skal signere et steg i arbeidsflyten. For tjenester som har
dette steget kan dette angis som del av innsendingen, eller gjøres som et separat tjenestekall.

Fra et sluttbrukersystem kan ett eller flere av disse stegene gjøres direkte gjennom ett eller flere tjenestekall. De ulike stegene er nærmere beskrevet i påfølgende kapitler.

### Hent preutfyllingsdata

Preutfyllingsdata er data for et gitt skjemasett og en gitt avgiver som sendes fra tjenesteeier til Altinn, og lagres i Altinn. Preutfyllingsdata brukes for å forenkle utfylling av innsendingstjenester, ved at sluttbrukersystemer henter ut preutfyllingsdata i forkant av innsending, for så å benytte dataene ved innsending av skjemasettet.

For å hente ut prefill data benyttes parametrene *ReporteeNumber* (fødselsnummer eller organisasjonsnummer), *ExternalServiceCode* (tjenestekode), og *ExternalServiceEditionCode* (tjenesteutgavekode).

### GetPrefillData

Operasjonen returnerer en status og en liste med PreFillFormTask. Statusen indikerer om input er valid, eller hvorvidt det eksisterer prefill data for tjenesten det etterspørres for. PreFillFormTask er en liste fordi det kan eksistere flere preutfyllingsdata for samme skjemasett og avgiver. Settene med preutfyllingsdata er i så fall skilt ved hjelp av identifiserende felter satt av tjenesteeier i *PreFillIdentityFieldBE. FieldValue*. Det bør verifiseres at preutfylt data som benyttes er gyldig ved å sjekke *PrefillFormTaskBE.ValidFromDate* og *PrefillFormTaskBE.ValidToDate*

Preutfylt skjemadata ligger i elementet *PrefillFormBE.FormDataXML*. Dette elementet følger tjenestens dataformat (XSD) og inneholder de preutfylte dataene. Den kan da benyttes som utgangspunkt for sluttbrukersystemet i stedet for å opprette en blank XML basert på dataformatet.

### GetPrefillDataV2

Ifm versjon 13.1 Altinn, tilgjengelig i TT2 (PROD 25. februar 2013) kan SBS nå benytte en ny operasjon for å hente ned preutfylte skjema.

Default vil denne operasjonen kun returnere preutfylt hovedskjema hvis det finnes preutfylte data. Informasjon om hva slags type prefilldata returneres med et sett av true/false parametere. Man kan velge eksplisitt å få returnert prefill for spesifikke skjema innenfor et skjemasett. Det er ikke lagt inn mulighet for å skille eksakt hvilke data som kommer fra hvilken kilde, bare hvilke kilder som er benyttet. Merk også at det er kun relevante felter med prefilldata som returneres, altså må SBS selv generere det endelige SOAP-kallet og skjema-XML ihht. XSD som tidligere. I tidligere versjon (GetPrefillData) var det kun én type prefillkilde som kunne hentes ned til SBS (ferdigutfylt skjema fra Tjenesteeier). Nå vil alle typer prefillkilder samt alle prefillmetoder en tjenesteeier kan benytte gi SBS tilgang til de samme data som i portal.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
| -------------------- | -------------------------- | ----------- |
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| Prefill              | GetPrefillData             | Basic/WS/EC |
| Prefill              | GetPrefillDataV2           | Basic/WS/EC |

### Send inn skjemasett

Dette steget innebærer å oversende data i henhold til XML-spesifikasjoner som utgjør tjenesten. Sluttbrukersystem kan selv velge om skjemasettet skal sendes komplett og/eller signert:

- Komplett / Ikke komplett
- Komplett betyr at alle påkrevde data leveres fra sluttbrukersystem
- Ikke komplett betyr at ikke alle felter kunne fylles ut i sluttbrukersystem og at utfylling må ferdigstilles på Altinn portal.
- Signert / usignert
- Hvis en innsending sendes komplett er det også mulig å signere (ett signeringssteg) disse fra sluttbrukersystemet gjennom samme innsending.

Inneholder skjemaet som skal sendes inn et brukerstyrt signeringssteg, kan informasjon for delegering for dette steget sendes sammen med skjemadata. For det første må parameter *UserDefinedNumberOfSignaturesRequired* angi det totale antallet av signaturer som skal til for å gå videre til neste steg etter det brukerstyrte signeringssteget. Hvilke brukere som så skal delegeres rettighet til å signere angis så i listen over *DelegatedUserBE* der brukerens fødselsnummer (*SSN*) og etternavn (*Name*) må angis. Hvis tjenesten tillater, kan en bruker signere mer enn en gang, i så tilfelle settes *NumberOfSignaturesAllowed* til antallet signaturer som er ønsket fra denne brukeren. Om bruker kun skal signere en gang må parameteren settes til 1.

Sendes innsendingstjenesten fra en juridisk enhet som regnes som en Trusted partner, det vil si at den har rettigheter til å opprette instanser av innsendingstjenester for andre brukere, kan denne velge å fylle ut informasjon om brukerstyrt signering og låse steget slik at dette ikke kan editeres av bruker selv. For å gjøre dette settes parameter *IsUserDelegationLocked* til *true*.

Hvis deler av skjemasettet inneholder sensitive felter må disse krypteres. Se 4.3.10 for utdypende beskrivelse av hvordan dette skal gjøres.

Skjemaet som sendes inn kan knyttes til en samhandlingstjeneste. For å gjøre dette settes parameter *CaseID* til samhandlingstjenestens unike identifikator (se 4.7.1 for hvordan denne identifikatoren kan hentes).

Dersom skjemasettet skal signeres må sluttbrukersystem i forkant av innsending hente ut signeringsteksten for tjenesten, slik at denne kan presenteres for bruker som skal utføre signeringen.

Hvis alle krav til en komplett innsendingstjeneste er ivaretatt i forhold til validering av data og nødvendig signering så vil innsendingen blir arkivert og oversendt tjenesteeier.

Enkelte tjenester i Altinn har definert regler for vedleggene som kan legges ved skjemasettet. Nærmere informasjon om disse reglene kan hentes ut med GetAvailableServicesV3. For å angi hvilken type vedlegg man
sender med, benytter man AttachmentTypeName-feltet i vedleggsentiteten. Man kan sende inn vedlegg til skjemasett på tjenester med vedleggsregler både med SubmitFormTask *IntermediaryInbound.SubmitFormTask*,  *SubmitAttachmentStreamed*  og *IntermediaryInboundStreamed.SubmitAttachmentStreamed*.

Merk at maksimal sammenlagt størrelse på vedleggene ikke kan overskride 30 MB. Hvis man har større vedlegg, se [Legge til vedlegg til innsendt skjemasett](#Legge-til-vedlegg-til-innsendt-skjemasett)


**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type         |
| -------------------- | -------------------------- | ------------ |
| SystemAuthentication | GetAuthenticationChallenge | Basic        |
| ReporteeElementList  | GetReporteeElementListV2   | Basic/WS/EC  |
| Workflow             | GetSigningText             | Basic/WS     |
| IntermediaryInbound  | SubmitFormTask             | Basic/WS/ EC |

### Sjekk transportkvittering for innsending

{{% notice note %}}
Merk:  release 20.11 ble SubmitFormtask gjort synkron, og det vil ikke lenger returneres en transportkvittering. 

Kvitteringen som returneres er oppdatert og man trenger ikke å spørre på flere ganger.
{{% /notice %}}



Når en innsending mottas fra sluttbrukersystem vil en transportkvittering returneres umiddelbart etter mottak.
Transportkvitteringen vil inneholde informasjon om hvert enkelt element i innsendingen, med detaljer på hva kvitteringen gjelder og valideringsstatus på innsendingen. Mottak og prosessering av innsendte data skjer i flere trinn, vil kvitteringen endre status etter hvert som innsendingen behandles. En innsending kan ikke regnes å være mottatt og godtatt før transportkvitteringen viser at validering og videre prosesseringen for innsendingen er fullført i Altinn.

Det vil derfor fra et sluttbrukersystem ofte være nødvendig å etterspørre kvittering flere ganger inntil en godkjent status blir returnert fra Altinn.

Ved innsending fra SBS utfører Altinn en prosess med formålet å stoppe innsendinger med feil, for eksempel i kalkyler. Denne prosessen er nærmere beskrevet [her](../skjemasett-sammenlikning).

De statuser en transportkvittering typisk vil kunne vise under mottak og prosessering og videresending til etat er:

- Mottatt – Innsendingen er teknisk mottatt i Altinn og avsender er autentisert og autorisert
- Godtatt – Innsendingen er teknisk validert og videresendt til prosessering
- Prosessert – Innsendingen er prosessert og godtatt i Altinn.
- Sendt tjenesteeier – Innsendingen er sendt til tjenesteeier
- Mottatt tjenesteeier – Meldingen er mottatt av tjenesteeier.

Det er ikke alle tjenesteeiere som har mulighet til å bekrefte et mottak på en spesifikk innsending så Sendt tjenesteeier vil i mange tilfellervære endelig status.

Eventuelt kan status være:

- Avvist – Innsendingen er avvist

Hvis innsending feiler i et av stegene vil også dette beskrives i transportkvitteringen. Slike feil vil oftest være pga. feil i format, valideringsfeil på funksjonelle data, duplikat innsending eller ikke tilstrekkelige rettigheter i forhold til avgiver for et sluttbrukersystem eller en signerer.

Det er ingen begrensning på hvor mange ganger en kvittering kan etterspørres, og disse vil være tilgjengelig i en lengre periode etter innsending.

Det henstilles allikevel sluttbrukersystemene om ikke å overdrive hvor ofte en transportkvittering etterspørres da dette potensielt kan medføre ekstra treghet i systemet og prosessering av data vil forsinkes.

En tommelfingerregel på å vente minimum 5 sekunder mellom innsending og hver enkelt kvitteringsforespørsel kan legges til grunn, eller la brukeren av sluttbrukersystemet selv be om oppdatert transportkvittering.

En kvittering kan etterspørres med alle kjente referanser for innsendingen:

- Sluttbrukersystem referanse på innsending eller enkeltskjema
- Altinn transportkvittering returnert som respons på innsending
- Altinn innsendingsreferanse
- Tjenesteeier referanse

Det vil også finnes kvitteringshistorikk som viser de forskjellige kvitteringstekster / statuser en innsending historisk har hatt og tidspunkt for når disse ble satt.

Merk at ReferenceTypeName av typen WorkFlowReference representerer ReporteeElementID, altså den unike identifikatoren for det detaktive elementet.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type     |
| -------------------- | -------------------------- | -------- |
| SystemAuthentication | GetAuthenticationChallenge | Basic    |
| Receipt              | GetReceiptList             | Basic/WS |
| Receipt              | GetReceipt                 | Basic/WS |

### Legge til vedlegg til innsendt skjemasett

Når man sender inn skjema og vedlegg med submitformtask-operasjonen kan ikke samlet vedleggsstørrelse overskride 30 MB. 
Dersom man skal laste opp store vedlegg til et skjemasett, kan man bruke SubmitAttachmentStreamed-metoden for å legge til et vedlegg til en innsending som ligger til utfylling i meldingsboksen.
Maksstørrelse for vedlegg lastet opp med SubmitAttachmentStreamed er definert i den aktuelle tjenestens vedleggsregler (0-500 MB per vedlegg). For tjenester uten regler er maksstørrelsen 30 MB (per vedlegg).

Dette gjøres ved å benytte arbeidsflytreferansen (WorkflowReference) man får fra kvitteringskallet etter vellykket innsending og instansiering som ReporteeElementId-parameter i SubmitAttachmentStreamed-metoden. Når
man har lagt til alle aktuelle vedlegg kan skjemasettet signeres og arkiveres ved å bruke samme arbeidsflytreferanse som inn-parameter i CompleteAndSign (alternativt tilsvarende metoder i *Workflow*).

**Tjenester og tjenesteoperasjoner som inngår i beskrevetfunksjonalitet:**

| Tjeneste                    | Operasjon                  | Type     |
| --------------------------- | -------------------------- | -------- |
| SystemAuthentication        | GetAuthenticationChallenge | Basic    |
| Receipt                     | GetReceipt                 | Basic/WS |
| IntermediaryInboundStreamed | SubmitAttachmentStreamed   | Basic/WS |
| IntermediaryInbound         | CompleteAndSign            | Basic/WS |

### Styr arbeidsflyt for innsendingstjeneste

Altinn tillater at enkeltstående arbeidsflytsteg utføres fra sluttbrukersystem uten innlogging i portalen. Den mest vanlige typen aksjon å ta fra sluttbrukersystem vil være å utføre et enkeltstående signeringssteg, men det vil være støtte for flere andre operasjoner som er tilgjengelig i portalen. Et annet eksempel er å flytte et skjema tilbake til utfylling, eller hente ut arbeidsflythistorikk for et skjema.

Et praktisk eksempel på bruk kan være at en sluttbruker sender inn sitt skjema til Altinn, og legger ved signaturinformasjon. Skjemaet opprettes, valideres, og signeres i første steg. Dette er et skjema som krever revisorsignering, og derfor blir ikke skjema arkivert, men liggende å vente på at revisor skal signere. På dette tidspunkt kan revisor benytte ”signer skjema” funksjonaliteten fra sitt sluttbrukersystem, og signere og sende inn skjema. Dermed vil skjema kunne passere gjennom avanserte arbeidsflyter uten at man behøver å logge inn i portalen.

Operasjonen GetAvailableActionsV2 vil kunne kalles for et gitt element for å sjekke hvilken handling som skal utføres. For en tjeneste som er opprettet ikke komplett og innehar et brukerstyrt signeringssteg vil denne operasjonen kunne returnere verdien *DoSignDelegation*. Sluttbrukersystemet kan i så tilfelle benytte operasjonen *PrepareUserControlledSigning* til å delegere signering til brukere. Denne operasjonen tar inn *reporteeElementID* for å angi elementet som skal behandles. Videre må en *delegatedUserBEList* fylles med innhold, der *Name* skal angi etternavn og *SSN* er fødselsnummer for brukeren som skal signere, samt at *NumberOfSignaturesAllowed* kan settes avhengig av hvor mange signaturer denne personen kan angi avhengig av om
tjenesten tillater flere signaturer fra samme bruker. *userDefinedNumberOfSignaturesRequired* må settes for å angi det totale antallet signaturer som kreves for det parallelle steget. Videre må *parallelSigningStepLocked* settes. Denne parameteren er kun tilgjengelig for avgivere som er definert som Trusted partner, og brukes til å låse forberedingen til det parallelle signeringssteget – det vil si at bruker selv ikke kan endre hvem og hvor mange som skal signere.

Funksjonaliteten i hver enkelt av de tilgjengelige funksjonene forklares i detalj under.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                               | Type        |
| -------------------- | --------------------------------------- | ----------- |
| SystemAuthentication | GetAuthenticationChallenge              | Basic       |
| ReporteeElementList  | GetReporteeElementListV2                | Basic/WS/EC |
| Workflow             | GetAvailableActionsV2                   | Basic/WS    |
| Workflow             | GetProcessDetailsV2                     | Basic/WS    |
| Workflow             | GetNextWorkflowStateTypeInProcessFlowV2 | Basic/WS    |
| Workflow             | DoSendingInAction                       | Basic/WS    |
| Workflow             | DoSigning                               | Basic/WS    |
| Workflow             | SetBackToFormFilling                    | Basic/WS    |
| Workflow             | PrepareUserControlledSigning            | Basic/WS    |
| Workflow             | GetProcessStepIDForParallelSigning      | Basic/WS    |

### Slett innsendingstjeneste

Et sluttbrukersystem kan velge å slette et aktivt eller arkivert element fra arbeidsliste eller fra arkivet i Altinn. Dette innebærer at elementet ikke lenger vil være synlig i portal eller tilgjengelig for
sluttbrukersystem.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
| -------------------- | -------------------------- | ----------- |
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| ReporteeElementList  | DeleteReporteeElement      | Basic/WS/EC |

### Se arkivert innsendingstjeneste

Når en innsendingstjeneste sendes inn, enten fra et sluttbrukersystem eller i portal, opprettes det en kvittering for den arkiverte innsendingstjenesten. Kvitteringen kan senere hentes opp både for portalbruker, sluttbrukersystem og fra tjenesteeiers system. I kvitteringen ligger det funksjonalitet for å sende kvitteringen på e-post, vise utskriftsversjon av det innsendte oppgavesettet samt eventuell visning av digital signatur.

Ved innsending fra sluttbrukersystem vil det genereres en kvittering som angir status for forsendelsen (nærmere beskrevet i [Sjekk transportkvittering for innsending](#sjekk-transportkvittering-for-innsending)).

Dette må ikke forveksles med transportkvittering som beskrives i avsnitt *Sjekk transportkvittering for innsending*.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste                | Operasjon                  | Type        |
| ----------------------- | -------------------------- | ----------- |
| SystemAuthentication    | GetAuthenticationChallenge | Basic       |
| ReporteeArchiveExternal | GetArchivedFormTask        | Basic/WS/EC |

### Finn aktive og arkiverte innsendingstjenester

Et sluttbrukersystem kan hente ut detaljer på innsendingstjenester fra Altinn, både aktive som er opprettet i arbeidsflyt, og de som er sendt inn og arkivert. For å gjøre dette kalles typisk først en søkeoperasjon
med filtrering som returnerer en liste (GetReporteeElementListV2). Deretter kan et enkelt element hentes med alle detaljer.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste                | Operasjon                  | Type        |
| ----------------------- | -------------------------- | ----------- |
| SystemAuthentication    | GetAuthenticationChallenge | Basic       |
| ReporteeElementList     | GetReporteeElementListV2   | Basic/WS/EC |
| ReporteeElementList     | GetFormSetElementsV2       | Basic/WS/EC |
| ReporteeArchiveExternal | GetAttachmentData          | Basic/WS/EC |

### Hent prosesseringsstatus

Sluttbrukersystem kan hente ut estimert tid (minutter) for hvor lang tid prosesseringen av en innsendingstjeneste vil ta.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste            | Operasjon                 | Type        |
| ------------------- | ------------------------- | ----------- |
| IntermediaryInbound | GetAltinnSubmissionStatus | Basic/WS/EC |

### Innsending av skjema med sensitive felt fra sluttbrukersystem

Altinn versjon 2 støtter innsending av tjenester med sensitive felt. Slike skjema kan også sendes inn via sluttbrukersystem. For å støtte dette må sluttbrukersystem kryptere data før den sendes inn via web tjenester.

Prinsippet som brukes er at hvert enkelt sensitivt felt krypteres med en symmetrisk nøkkel. Nøkkelen som genereres må være 128 bit lang. Algoritmen for å kryptere hvert enkelt felt skal være AES.

Sensitive felt i skjema som skal sendes inn til Altinn vil alltid være strengverdier i XSD. Dette fordi en kryptert verdi alltid vil overføres som en streng, og det vil ikke være mulig å validere den krypterte verdien.

Når skjema er kryptert må den symmetriske nøkkelen krypteres ved hjelp av det offentlige sertifikatet til tjenesteeier. Algoritmen som benyttes for denne krypteringen er RSA. Sertifikatet til tjenesteeier hentes ut ved hjelp av operasjonen GetCertificatesExternal på tjenesten KeyManagementExternal. Basert på tjeneste og tjenesteutgave returneres en liste med gyldige sertifikater og ID for hver enkelt tjenesteeier som skal motta skjemadata. I de fleste tilfeller vil dette bare være et sertifikat da de fleste innsendingstjenester bare har en mottaker av skjemadata.

Hvis sluttbruker ønsker muligheten til å dekryptere data ved et senere tidspunkt må også den symmetriske nøkkelen sendes inn kryptert med et egendefinert passord. Dette passordet må minimum være på 8 tegn. Ved uthenting fra arkiv ved hjelp av sluttbrukersystem kan man da benytte passordet for å dekryptere den symmetriske nøkkelen for deretter å dekryptere feltene som har krypterte data.

Tjenesten som benyttes for å sende inn sensitive skjema er samme som vanlige skjema, *SubmitFormTask*), se også [send inn skjemasett](#send-inn-skjemasett). Parameteren FormData settes da som vanlig, men nodene er kryptert som beskrevet over. I tillegg må data om brukt nøkkel fylles ut:

```xml
&lt;ns:EncryptedKey&gt;
&lt;!--Optional:--&gt;
&lt;ns:ReporteeSymmetricKey&gt;
&lt;!--Dette den symmetriske nøkkelen kryptert med selvvalgt
passord--&gt;
&lt;ns:Key&gt;&lt;/ns:Key&gt;
&lt;/ns:ReporteeSymmetricKey&gt;
&lt;ns:ServiceOwnerSymmetricKeys&gt;
&lt;!--Zero or more repetitions:--&gt;
&lt;ns:ServiceOwnerSymmetricKeyBE&gt;
&lt;!--Dette er ID til sertifikat brukt til å kryptere nøkkel for
tjenesteier. Id ble mottatt i kallet GetCertificatesExternal sammen med
sertifikat--&gt;
&lt;ns:CertificateId&gt;&lt;/ns:CertificateId&gt;
&lt;!--Dette er den symmetriske nøkkelen kryptert med tjenesteeiers
sertifikat angitt av id over--&gt;
&lt;ns:Key&gt;&lt;/ns:Key&gt;
&lt;/ns:ServiceOwnerSymmetricKeyBE&gt;
&lt;/ns:ServiceOwnerSymmetricKeys&gt;
&lt;/ns:EncryptedKey&gt;
```

For å hente etaten (eller etatenes) offentlige sertifikat benyttes tjenesten KeyManagement og operasjonen GetCertificates. Denne tar som input de to påkrevde parameterne *externalServiceCode* og *externalServiceEditionCode*, og returnerer basert på disse hvilket hvilke) sertifikat (returparameter *Certificate*) som skal benyttes til å kryptere data. Når data sendes inn til Altinn må den unike identifikatoren for sertifikatet også sendes med (returparameter *CertificateId*). En tom liste returneres om ikke kombinasjonen av *externalServiceCode* og *externalServiceEditionCode* er definert for sensitive personopplysninger i TUL, eller ikke eksisterer.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet**:

| Tjeneste      | Operasjon       | Type        |
| ------------- | --------------- | ----------- |
| KeyManagement | GetCertificates | Basic/WS/EC |

### Signering ved hjelp av XMLDsig

Det er i Altinn mulig for tjenesteeier å kreve digital signering ifølge XMLDSig standarden i tillegg til Altinns vanlig sikkerhets funksjonalitet. For tjenester som krever dette må hvert skjema signeres med et *Signature* element. *Signature* element må tilpasse XMLDSig standard og er beskrevet i mer detalj i [Benytt XMLDSig - digital signatur](/docs/api/soap/teknisk-implementasjon/#benytt-xmldsig---digital-signatur).

## Benytt meldingstjeneste

Meldingstjenester benyttes av tjenesteeiere for å sende informasjon eller tilbakemelding på innsendte data til sluttbrukere/avgivere i Altinn. Sluttbrukersystemer har mulighet for å hente ut meldinger for avgivere, samt utføre visse handlinger på tjenestene, deriblant å arkivere en melding.

### Hent melding

Det er mulig å hente ut meldinger for avgivere i Altinn, både aktive og arkiverte meldinger. Meldingene hentes først gjennom å hente en liste basert på søkeparametere, deretter kan en spesifikk melding hentes med identifikator for en ønsket melding. Denne identifikatoren vil være retur parameter for liste objektet.

Når en melding hentes vil det også sendes en lesevarsling til tjenesteeier dersom de har bedt om dette. Både når man henter listen og den spesifikke meldingen vil man basert på parameteren *CaseID* kunne se om den aktuelle meldingstjenesten er knyttet til en samhandlingstjeneste.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                           | Type        |
| -------------------- | ----------------------------------- | ----------- |
| SystemAuthentication | GetAuthenticationChallenge          | Basic       |
| ReporteeElementList  | GetReporteeElementListV2            | Basic/WS/EC |
| Correspondence       | GetCorrespondenceForEndUserSystemV2 | Basic/WS/EC |

### Bekreft melding

For noen meldingstjenester krever tjenesteeier at bruker bekrefter at meldingen er lest. Denne bekreftelsen kan også gjøres fra sluttbrukersystem i tillegg til portal. Meldingen i Altinn oppdateres da med lesebekreftelsen, samt hvem som har bekreftet meldingen og tidspunkt for når dette ble gjort.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                      | Type        |
| -------------------- | ------------------------------ | ----------- |
| SystemAuthentication | GetAuthenticationChallenge     | Basic       |
| Correspondence       | SaveCorrespondenceConfirmation | Basic/WS/EC |

### Slett melding

Grensesnittet for meldingstjenester har støtte for å slette aktive (ikke arkiverte) meldinger. Den autentiserte brukeren må ha skrivetilgang til elementet som ønskes slettet. Det er to former for sletting i Altinn. Det er permanent sletting og flytting av element til papirkurv. Sletteoperasjonen vil utføre permanent sletting hvis avgiver er en person. Hvis avgiver er en organisasjon vil elementet bli flyttet til papirkurv.

Permanent slettede elementer vil ikke kunne gjennopprettes. Elementet blir helt borte. Elementer som flyttes til papirkurv vil kunne gjennopprettes i sluttbrukerportalen. Det er foreløpig ikke laget noe funksjonalitet for gjennoppretting over SOAP grensesnittet.

Hvis meldingen ikke har vært lest ved slettetidspunktet vil det likevel kunne sendes en lesevarsling til tjenesteeier. Tjenesteeier får på denne måten en indikasjon på at sluttbruker har tatt stilling til meldingen. Er det ønskelig å hindre bruker i å slette uleste meldinger må dette implementeres i sluttbrukerapplikasjonen.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type     |
| -------------------- | -------------------------- | -------- |
| SystemAuthentication | GetAuthenticationChallenge | Basic    |
| Correspondence       | DeleteCorrespondence       | Basic/WS |

### Arkiver melding

Et sluttbrukersystem kan velge å arkivere en melding. Arkiveringen kan kun gjennomføres dersom meldingen er ferdig behandlet, dvs. meldingen må være lest og bekreftet (dersom bekreftelse kreves).

For å arkivere meldingen benyttes parameteren *CorrespondenceID* for å angi den unike identifikatoren for meldingstjenesten som skal arkiveres (denne identifikatoren tilsvarer ReporteeElementID). Operasjonen returnerer kvittering til sluttbrukersystemet.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                              | Type        |
| -------------------- | -------------------------------------- | ----------- |
| SystemAuthentication | GetAuthenticationChallenge             | Basic       |
| Correspondence       | ArchiveCorrespondenceFromEndUserSystem | Basic/WS/EC |

### Hent arkivert melding

Meldinger som er blitt arkivert må hentes fra avgiver arkivet. Slike meldinger er med i liten over elementer fra ReporteeElementList tjenesten, men for å kunne hente ned elementet i sin helhet med vedlegg og lignende må man benytte tjenesten for avgiverarkivet.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste                | Operasjon                  | Type        |
| ----------------------- | -------------------------- | ----------- |
| SystemAuthentication    | GetAuthenticationChallenge | Basic       |
| ReporteeElementList     | GetReporteeElementListV2   | Basic/WS/EC |
| ReporteeArchiveExternal | GetArchivedCorrespondence  | Basic/WS/EC |


## Benytt formidlingstjeneste

Formidlingstjenester handler om å transportere data fra en eller flere avgivere til en eller flere mottakere, hvor Altinn fungerer som mellommann som sørger for transport og infrastruktur. Altinn er sådan en passiv part i prosessen, og både avsender og mottaker må benytte grensesnitt tilgjengeliggjort av Altinn.

Innholdet i en formidlingstjeneste er data som er bestemt mellom aktørene som inngår i en formidlingstjeneste, og er ikke kjent av Altinn.

Data som skal overføres må pakkes i en ZIP-fil. For SFTP kanalen må den inneholde to forhåndsdefinerte Altinn XML filer for å definere metadata (manifest.xml) og mottakere (recipients.xml). Ved bruk av web service sendes først metadata og mottaker liste, før ZIP-arkivet overføres i en egen operasjon.

Det er viktig at ZIP-arkivet sin interne liste med filnavn blir enkodet med UTF-8. Dette vil gi best støtte for filnavn med tegn utenfor ASCII tabellen. Det kan for eksempel bli feil med bokstavene æ, ø og å hvis man ikke angir UTF-8. Utover dette kan ZIP-filen i prinsippet inneholde hva som helst av data. Utover viruskontroll gjør ikke Altinn noen form for validering eller prosessering av dataene, men sørger for at oppgitt metadata og mottakerinformasjon er korrekt og validerer, samt holder orden på kvitteringer og sporingsinformasjon om forsendelsen.

I tillegg til innhold i ZIP-fil kan avsender og mottaker også avtale bruk av FileList og PropertyList som er en del av manifestet. FileList kan benyttes til å oversende informasjon om innhold i formidlingstjenesten samt checksum for verifikasjon. PropertyList er en liste med nøkkel og verdi par som kan settes fritt for å overføre ytterligere informasjon i formidlingstjenesten.

Formidlingstjenester er tenkt brukt primært for formidlinger:

- B2B (Business-to-Business), B2G (Business-to-Government), G2B
    (Government-to-Business), eller G2G(Government-To-Government)

Når en avsender laster opp en formidlingstjeneste vil Altinn verifisere metadata og mottakere. Når dette er gjort vil forsendelsen gjøres tilgjengelig for mottakere for nedlasting. Samtidig vil Altinn opprette et kvitteringshierarki med en hovedkvittering tilhørende avsender, samt en underkvittering per mottaker. Hver underkvittering vil inneholde status på nedlastingen for denne mottakeren. Alle kvitteringer vil være knyttet til referanse satt av avsender. Avsender og mottaker kan også utveksle ytterligere statustekst på disse kvitteringene gjennom web service. På denne måten kan avsender følge opp status for hver enkelt mottaker.

Tiden en formidlingstjeneste vil være tilgjengelig for nedlasting i Altinn vil kunne variere fra tjeneste til tjeneste og styres av tjenesteeier. Dette betyr at filene etter en viss tidsperiode vil bli slettet selv om filene ikke er lastet ned av en eller flere av mottakerne.

Formidlingstjenesten kan av tjenesteeier også settes opp til å benytte seg av et tjenesteeier styrt rettighetsregister. Dette registeret kan begrense hvem som har tilgang til spesifikke tjenester på avgiver nivå, og styres av tjenesteeier.

Formidlingstjenesten beskrives nedenfor i fire scenarioer ift. avsender og opplasting av filer vs. mottaker og nedlasting av filer, samt hvilken kanal opp- og nedlaster kan benytte. Se også Vedlegg C: Flytdiagram for formidlingstjeneste for overordnet flyt.

### Laste opp filer til mottaker(e) (WS)

Når avsender ønsker å benytte web service for å laste opp og gjøre en formidlingstjeneste tilgjengelig for mottakere gjøres dette ved først å sende nødvendig metadatainformasjon til Altinn. Dette gjøres gjennom kallet *InitiateBrokerService*. Her må avsender gi informasjon tilsvarende innholdet i manifest.xsd og receipients.xsd (som definert i [Formidlingstjenester (SFTP)](/docs/api/soap/grensesnitt/#formidlingstjenester-sftp)), men som del av tjenestekallet. Dette er blant annet nøkkelinformasjon om tjenesten som skal benyttes, avsenders referanse, og hvem som skal være mottaker av formidlingstjenesten. Se [BrokerService.InitiateBrokerService](/docs/api/soap/grensesnitt/#brokerserviceinitiatebrokerservice) for mer informasjon om operasjonen *InitiateBrokerService*.

Som respons på denne tjenesten vil avsender motta en referanse, denne referansen benyttes så som nøkkel til å laste opp faktisk ZIP-fil gjennom operasjonen *UploadFileStreamed*. Etter at payload er lastet opp til Altinn, vil den gjøres tilgjengelig for angitte mottakere, og avsender får en kvittering på forsendelsen. Denne kvitteringen inneholder en kvitterings ID som avsender kan benytte for å hente et kvitteringshierarki som inneholder en hovedkvittering med en eller flere underkvitteringer. Hver enkelt underkvittering vil her representere forsendelsen til en mottaker, med tilhørende status på hvorvidt formidlingstjenesten er lastet ned eller ikke. Se [BrokerServiceStreamed.UploadFileStreamed](/docs/api/soap/grensesnitt/#brokerservicestreameduploadfilestreamed) for mer informasjon om operasjonen *UploadFileStreamed*, og [GetReceiptV2](/docs/api/soap/grensesnitt/#getreceiptv2) for informasjon om *GetReceiptV2*.

**Batch grensesnitt eller tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste / Fil        | Operasjon / Format    | Type        |
| --------------------- | --------------------- | ----------- |
| BrokerService         | InitiateBrokerService | Basic/WS/EC |
| BrokerServiceStreamed | UploadFileStreamed    | Basic/WS/EC |
| Receipt               | GetReceiptV2          | Basic/WS    |


### Laste ned filer fra avsender (WS)

En mottaker av formidlingstjenester kan benytte seg av web servicer for å sjekke og eventuelt laste ned tilgjengelige filer. 

**Hvis man har behov for å sjekke forholdsvis ofte om det er nye filer tilgjengelig skal operasjonen *CheckIfAvailableFiles* benyttes**. Denne operasjonen er et lettvekstkall som sjekker "om" det finnes filer og returnere true/false. Mottaker må vurdere det tjenstlige behovet for hvor ofte trenger oppdater informasjon i valg av frekvens på kall. Ta kontakt med Altinn for å avklare ytelsesutfordringer hvis ønsket frekvens er svært høy. Pr i dag er max grense hvert 5. sekund. 

Ved å benytte operasjonen *GetAvilableFiles* kan mottaker enkelt få en oversikt over hvilke filer som er tilgjengelig i Altinn. Denne operasjonen gir informasjon om formidlingstjenesten, samt status – hvorvidt den allerede er lastet ned av mottaker. Se [BrokerService](/docs/api/soap/grensesnitt/#brokerservicegetavailablefiles) for mer informasjon om *GetAvailableFiles*.

Basert på referansen som hentes i *GetAvailableFiles* kan mottaker så benytte seg av operasjonen *DownloadFileStreamed* til å laste nedformidlingstjenesten. Denne tjenesten er basert på strømming av data. Tilslutt må mottaker bekrefte at de har mottatt filen ved å utføre et kall til *ConfirmDownloaded*. Dette gjør at avsender kan se at mottaker har hentet ned filen. Se [BrokerService](/docs/api/soap/grensesnitt/#brokerservicestreameddownloadfilestreamed) for mer informasjon.

Som mottaker har man tilgang til underkvittering som gjelder for akkurat denne mottakeren. Mottaker kan da benytte *GetReceiptV2* til å hente kvittering med tilhørende status, samt *UpdateReceipt* til å legge på en
kvitteringstekst som også avsender vil ha tilgang til. Se [Receipt](/docs/api/soap/grensesnitt/#receipt) for mer informasjon om disse operasjonene.

**Batch grensesnitt eller tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| **Tjeneste / Fil**    | **Operasjon / Format** | **Type**    |
| --------------------- | ---------------------- | ----------- |
| BrokerService         | CheckIfAvailableFiles  | Basic/WS/EC |
| BrokerService         | GetAvailableFiles      | Basic/WS/EC |
| BrokerServiceStreamed | DownloadFileStreamed   | Basic/WS/EC |
| Receipt               | GetReceiptV2           | Basic/WS    |
| Receipt               | UpdateReceipt          | Basic/WS    |


## Benytt innsynstjeneste

Innsynstjenester er en tjenestetype i Altinn som benyttes for å presentere data fra tjenester som tilbys av tjenesteeiere, og kan sees på som et oppslag mot tjenesteeiers system. Grensesnitt for å aksessere tjenestene eksponeres til sluttbrukersystemer gjennom Altinn, og Altinn formidler responsen fra tjenestene til sluttbrukersystemet.

Sluttbrukersystemer kan velge å lagre en signert kopi av en innsynstjeneste som benyttes. Den signerte innsynstjenesten lagres da i brukers arkiv i Altinn. En innsynstjeneste som ikke er signert og arkivert vil ikke være tilgjengelig i Altinn etter at den er benyttet.

Operasjonene tilgjengelig vil variere fra innsynstjeneste til innsynstjeneste. Hver tjenesteeier vil eksponere sitt eget sett av operasjoner relatert til sine innsynstjenester, og funksjonaliteten for disse kan variere. Generelt vil operasjonene returnere data for innsynstjenesten, og enkelte vil også muliggjøre arkivering av dataen.

### Finn arkiverte innsynstjenester

Et sluttbrukersystem kan hente ut detaljer på arkiverte innsynstjenester. For å gjøre dette kalles typisk først en søkeoperasjon med filtrering som returnerer en liste (GetReporteeElementListV2). Merk at operasjonen vil returnere parameter *ReporteeElementType* med type *LookUp* for innsynstjenester.

Deretter kan et enkelt element hentes med alle detaljer ved å benytte operasjonen GetArchivedLookup. Parameter *reporteeElementID* benyttes her som input for å identifisere den unike innsynstjenesten som skal hentes. Operasjonen returnerer dataen fra den arkiverte innsynstjenesten i form av binærdata som en PDF i parameteren *LookupPDF*.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste                | Operasjon                  | Type        |
| ----------------------- | -------------------------- | ----------- |
| SystemAuthentication    | GetAuthenticationChallenge | Basic       |
| ReporteeElementList     | GetReporteeElementListV2   | Basic/WS/EC |
| ReporteeArchiveExternal | GetArchivedLookup          | Basic/WS/EC |

### Gjøre oppslag på innsynstjenester

En sluttbruker eller sluttbrukersystem kan gjøre oppslag på innsynstjenester som er konfigurert med mulighet for direkte kall i Altinn. Dette gjøres ved kall til *ExecuteLookUp* operasjonen med input om hvilken innsynstjeneste man skal benytte (*ServiceCode* og *ServiceEditionCode*), hvem avgiver at oppslaget er (*Reportee)* og selve spørringen til tjenesten (*QueryData*). *QueryData* oppgis som en tekststreng og vil variere etter hvilke operasjoner innsynstjenesten tilbyr.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
| -------------------- | -------------------------- | ----------- |
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| LookUpExternal       | ExecuteLookUp              | Basic/WS/EC |

## Benytt samhandlingstjeneste

En samhandlingstjeneste er en tjeneste som knytter sammen andre tjenester. Samhandlingstjenester kan være definert av sluttbrukere (samleside) eller av tjenesteeiere (e-dialog). Gjennom samhandlingstjenester kan sluttbrukere og sluttbrukersystemer benytte et sett med tjenester som for bruker og/eller tjenesteeier hører naturlig sammen.

Nedenfor beskrives funksjonaliteten som kan benyttes fra sluttbrukersystemer for samhandlingstjenester. En tjeneste som er del av en samhandlingstjeneste instans kan også behandles individuelt, det vil si at all funksjonalitet som er tilgjengelig for sluttbrukersystemer for f.eks. innsendingstjenester kan også benyttes for innsendingstjenester som er del av en samhandlingstjeneste. En instans av en samhandlingstjeneste er definert som en sak, ”case”, og der hvor det skal refereres til en spesifikk instans av en samhandlingstjeneste benyttes derfor parameteren CaseID.

### Finn aktive og arkiverte samhandlingstjenester

En liste over samhandlingstjenester kan hentes ut ved å kalle GetReporteeElementListV2 med søkeparametre som begrenser søket til samhandlingstjenester. For å søke etter kun samhandlingstjenester kan man benytte parameteren *CollectionPages* eller *EDialogue*, for å henholdsvis begrense søk til samlesider eller e-dialoger. Eventuelt kan også parameteren *CaseID* angis med den unike identifikatoren for en spesifikk samhandlingstjeneste, operasjonen vil i så fall kun returnere informasjon om denne. Merk at operasjonen vil returnere parameter *ReporteeElementType* med type *Collaboration* for samhandlingstjenester.

Informasjon som vil bli returnert vil variere etter hva slags tjeneste informasjonen gjelder. For samhandlingstjenester vil blant annet følgende parametre returneres:

- *CaseID* - unik identifikator for samhandlingstjenesten
- *IsCaseArchved* - angir om samhandlingstjenesten er arkivert
- *Notice* – eventuell merknad på samhandlingstjenesten

For tjenester som er tilknyttet en samhandlingstjeneste vil parameteren *ParentCaseName* angi den unike referansen til samhandlingstjenesten den tilhører.

Sluttbrukersystemer kan også hente en liste med detaljer for aktive samhandlingstjenester, det vil si samhandlingstjenester som ikke har blitt arkivert, ved hjelp av operasjonen GetCaseList. Denne operasjonen vil kunne hente ut detaljer over alle samhandlingstjenester

- av en bestemt tjeneste og utgave ved å benyttes parametrene *externalServiceCode* og   *externalServiceEditionCode*
- eller for én bestemt samhandlingstjeneste ved å bruke parameteren *caseID*

Sammen med disse parametrene kan også *languageID* og *reporteeNumber* sendes inn for å begrense resultatet.

Denne operasjonen returnerer:

- *CaseID* – informasjon om samhandlingstjenestens unike identifikator
- *CaseName* – navnet på tjenesten
- *Comments* – eventuelle kommentarer satt av bruker på samhandlingstjenesten
- *CurrentStateFriendlyName* – visningsvennlig navn basert på språkparameter
- *CurrentStateID* – unik identifikator for tilstanden
- *CurrentStateName* – tilstandens navn
- *Notice* – eventuelle merknader fra etat satt på samhandlingstjenesten

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
| -------------------- | -------------------------- | ----------- |
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| ReporteeElementList  | GetReporteeElementListV2   | Basic/WS/EC |
| Case                 | GetCaseList                | Basic/WS/EC |

### Opprett ny samhandlingstjeneste

Sluttbrukersystemer kan opprette en ny instans av en samhandlingstjeneste, og dermed starte arbeidsflyten for tjenesten. Det er kun tjenesteeierdefinerte samhandlingstjenester som kan opprettes fra sluttbrukersystemer.

Parametrene *externalServiceCode* og *externalServiceEditionCode* i operasjonen InstantiateCollaboration angir type instans av samhandlingstjeneste som skal opprettes, og *reporteeNumber* angir fødselsnummer eller organisasjonsnummer den opprettes for. Disse er obligatoriske parametre. I tillegg til disse kan *externalSystemReference, visibleDateTime og dueDate* sendes inn. *visibleDateTime* angir når tjenesten skal være synlig i portalen, om denne ikke angis vil den umiddelbart bli synlig.

Operasjonen returnerer den unike identifikatoren, CaseID, som kan benyttes videre til for eksempel å opprette instanser av innsendingstjenester knyttet til samhandlingstjenesten.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
| -------------------- | -------------------------- | ----------- |
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| Case                 | InstantiateCollaboration   | Basic/WS/EC |

### Avslutt samhandlingstjeneste

Sluttbrukersystem kan velge å avslutte en aktiv samhandlingstjeneste. Innsendings- og meldingstjenester som inngår i samhandlingstjenesten må være arkivert før samhandlingstjenesten kan arkiveres som helhet.

Alternativt kan sluttbrukersystemet benytte parameteren *forceArchive*. Settes denne til *true* vil samhandlingstjenesten bli arkivert med mindre det er aktive meldingstjenester knyttet til samhandlingstjenesten. Eventuelle aktive innsendingstjenester vil bli atskilt fra den arkiverte samhandlingstjenesten. Om *forceArchive* settes til *false* vil samhandlingstjenesten ikke bli arkivert om det fremdeles er aktive elementer tilknyttet den.

Parameter *caseID* angir samhandlingstjenesten som skal arkiveres, og operasjonen vil ved vellykket arkivering returnere en arkiv identifikator for samhandlingstjenesten

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
| -------------------- | -------------------------- | ----------- |
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| Case                 | ArchiveCase                | Basic/WS/EC |
