---
title: Sluttbrukersystem
description: Implementasjonsguide for sluttbrukersystemer
---

Innledning
----------

Dette dokumentet beskriver hvordan sluttbrukersystemer kan integrere seg mot Altinn.

Det er lagt vekt på å beskrive både det funksjonelle aspektet i forhold til hva integrasjonene tilbyr rent funksjonelt og en teknisk detaljering av grensesnittene som tilbys av Altinn.

Lesehenvisning
--------------

Dette dokumentet bør leses i sammen med ”Implementasjonsguide for integrasjon mot Altinn” som er den overordnede guiden for alle som skal integrere mot Altinn.

Versjonering av operasjoner
---------------------------

Flere av operasjonene og entitetene i dette dokumentet vil kunne eksistere i flere versjoner. Dette for å være tilbakekompatibel med eventuelt eksisterende klienter. Når en endring blir gjort for en gitt operasjon opprettes det en ny operasjon med tilsvarende navn som ender med et versjonsnummer, for eksempel V2. Dette gjør at gamle klienter vil kunne fortsette å benytte gammel metode og WSDL, mens nye klienter kan (og oppfordres til) benytte nyeste metode og WSDL. Merk at ikke alle grensesnitt nødvendigvis vil benytte denne endelsen. Dette gjelder i de tilfeller hvor operasjonen ikke tidligere er tilgjengeliggjort og dermed ikke har noen forgjenger, for eksempel
gjelder dette for mange av EC grensesnittene.

Dette dokumentet vil dokumentere den nyeste versjonen av operasjonene. For dokumentasjon av tidligere versjoner henvises det til tidligere dokumentversjoner.

Refererte dokumenter og linker
------------------------------

| Dokument     | Beskrivelse   |
|-----------------------|-----------------|
|    Implementasjonsguide   for integrasjon mot Altinn    |    Implementasjonsguidene for integrasjon   består av tre deler. Dette er det overordnede dokumentet som beskriver den   overordnede arkitekturen for integrasjon mot Altinn og sikkerhetsmekanismer   som benyttes for kommunikasjon mellom Altinn og eksterne systemer    |

Funksjonelle scenario
---------------------

Altinn tilbyr flere tjenester innenfor flere funksjonelle områder for sluttbrukersystemer og dets brukere. Dette kapittelet beskriver hvilken funksjonalitet som finnes med referanser til hvilke web services som benyttes. Oversikt over den web service, operasjon og parametere til disse er beskrevet i en egen seksjon , samt at ytterligere detaljer kan finnes i Tjenestekatalogen og WSDL’en for tjenesten.

De funksjonelle områder som finnes er:

- Autentisering og autorisasjon av sluttbrukersystem og brukere
- Benytte innsendingstjeneste
- Benytte meldingstjeneste
- Benytte formidlingstjeneste
- Benytte innsynstjeneste
- Benytte samhandlingstjeneste

Autentisering og autorisasjon av sluttbrukersystem og bruker
------------------------------------------------------------

Alle tjenesteoperasjoner som kan benyttes av et sluttbrukersystem vil alltid bruke et sluttbrukersystem id eller brukernavn og tilhørende passord for å autentisere system og autorisere rettigheter til at systemet har rettigheter til å utføre handlinger på vegne av en juridisk enhet.

For å utføre tjenesteoperasjoner på vegne av bruker er det også mulig å autentisere seg ved bruk av brukerens brukerprofil brukernavn og tilhørende passord, på samme måte som man ville brukt sluttbrukersystem id og passord. For å kunne bruke denne autentiseringsmetoden må man aktivere dette på sin brukerprofil side. Tjenesteoperasjoner som autentiseres med brukernavn kan kun gi rettighet til å utføre handlinger på vegne av denne brukeren.

I de tilfeller i grensesnitt-beskrivelsene hvor det refereres til systemUserName vil man også kunne bruke brukerens brukernavn og passord for å autentisere seg, i stedet for en sluttbrukersystem ID.

Utover dette vil det for noe funksjonalitet også være et behov for å autentisere den unike brukeren som benytter sluttbrukersystemet og autorisere at vedkommende har rettigheter til å levere eller hente spesifikke data eller utføre operasjoner på vegne av en juridisk enhet. Denne sjekken utføres ved at sluttbrukersystem først kaller en web service som autentiserer en bruker og ber om en spesifikk engangskode som skal sendes inn sammen med kallet til den web servicen som krever autentisering og autorisasjon av en bruker. Denne engangskoden kan være basert på følgende typer:

- Engangskode fra brev bestilt på Altinn
- Engangskode fra selvangivelse
- Engangskode tilsendt per SMS (for registrert Altinn bruker)

Altinn vil svare på denne henvendelsen med å referere til hvilken engangskode som skal benyttes eller ved å sende en SMS til registrert mobiltelefonnummer på bruker.

Sluttbrukersystemet må håndtere skjermdialogen med brukeren og sørge for at informasjonen Altinn returnerer på forespørsel om hvilken engangskode som må sendes med web service kallet vises frem, og at engangskoden innhentes fra bruker og sendes med i neste kall til den tjenesteoperasjonen som krever autentisering / autorisasjon.

En slik autentisering / autorisasjonshandling er gyldig i 30 minutter fra første forespørsel blir gjort, og vil deretter fornyes med 30 minutters gyldighet hver gang en web service operasjon som benytter denne informasjonen blir kalt. Denne fornyingen vil gjøres inntil en maksimal grense på 8 timer.

Hvis det går for langt tid mellom hvert kall slik at gyldighetsperioden utløper må brukeren pånytt måtte autentiseres / autoriseres med ny engangskode.

Det er en fordel om sluttbrukersystemet implementerer en klokkenedtelling etter at engangskoden blir mottatt slik at brukeren til enhver tid vet hvor lenge den nåværende engangskoden kan brukes. Dette vil redusere antall SMS utsendinger og medføre at engangskodebrev vil ha lenger holdbarhet. I tilfeller der engangskoden er/blir ugyldig, er det en fordel om sluttbrukersystem enkelt gir brukeren tilgang til å hente engangskoden på nytt og deretter sende inn den signerte forsendelsen på nytt.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| **Tjeneste**         | **Operasjon**              | **Type** |
|----------------------|----------------------------|----------|
| SystemAuthentication | GetAuthenticationChallenge | Basic    |

Uthenting av tilgjengelige tjenester
------------------------------------

Sluttbrukersystemer kan alltid hente informasjon om hvilke innsendingstjenester, meldingstjenester, innsynstjenester og samhandlingstjenester (baser på parameter *ServiceType* i operasjonen GetAvailableServices) som til enhver tid er tilgjengelige og aktive i Altinn, samt hente de XML skjema som inngår i et skjemasett for en innsendingstjeneste. GetAvailableServicesV3 inkluderer mulighet for å filtrere resultatene fra de tilgjengelige tjenestene slik at man kan finne akkurat de tjenestene man leter etter.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet
funksjonalitet:**

| **Tjeneste**    | **Type**                     | **Operasjon** |
|-----------------|------------------------------|---------------|
| ServiceMetadata | GetAvailableServicesV2       | Basic/WS      |
| ServiceMetadata | GetAvailableServicesV3       | Basic/WS      |
| ServiceMetadata | GetFormTaskSchemaDefinitions | Basic/WS      |

Benytt innsendingstjeneste
--------------------------

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

Hent preutfyllingsdata
------------------------------

Preutfyllingsdata er data for et gitt skjemasett og en gitt avgiver som sendes fra tjenesteeier til Altinn, og lagres i Altinn. Preutfyllingsdata brukes for å forenkle utfylling av innsendingstjenester, ved at sluttbrukersystemer henter ut preutfyllingsdata i forkant av innsending, for så å benytte dataene ved innsending av skjemasettet.

For å hente ut prefill data benyttes parametrene *ReporteeNumber* (fødselsnummer eller organisasjonsnummer), *ExternalServiceCode* (tjenestekode), og *ExternalServiceEditionCode* (tjenesteutgavekode).

GetPrefillData
--------------

Operasjonen returnerer en status og en liste med PreFillFormTask. Statusen indikerer om input er valid, eller hvorvidt det eksisterer prefill data for tjenesten det etterspørres for. PreFillFormTask er en liste fordi det kan eksistere flere preutfyllingsdata for samme skjemasett og avgiver. Settene med preutfyllingsdata er i så fall skilt ved hjelp av identifiserende felter satt av tjenesteeier i *PreFillIdentityFieldBE. FieldValue*. Det bør verifiseres at preutfylt data som benyttes er gyldig ved å sjekke *PrefillFormTaskBE.ValidFromDate* og *PrefillFormTaskBE.ValidToDate*

Preutfylt skjemadata ligger i elementet *PrefillFormBE.FormDataXML*. Dette elementet følger tjenestens dataformat (XSD) og inneholder de preutfylte dataene. Den kan da benyttes som utgangspunkt for sluttbrukersystemet i stedet for å opprette en blank XML basert på dataformatet.

GetPrefillDataV2
----------------

Ifm versjon 13.1 Altinn, tilgjengelig i TT2 (PROD 25. februar 2013) kan SBS nå benytte en ny operasjon for å hente ned preutfylte skjema.

Default vil denne operasjonen kun returnere preutfylt hovedskjema hvis det finnes preutfylte data. Informasjon om hva slags type prefilldata returneres med et sett av true/false parametere. Man kan velge eksplisitt å få returnert prefill for spesifikke skjema innenfor et skjemasett. Det er ikke lagt inn mulighet for å skille eksakt hvilke data som kommer fra hvilken kilde, bare hvilke kilder som er benyttet. Merk også at det er kun relevante felter med prefilldata som returneres, altså må SBS selv generere det endelige SOAP-kallet og skjema-XML ihht. XSD som tidligere. I tidligere versjon (GetPrefillData) var det kun én type prefillkilde som kunne hentes ned til SBS (ferdigutfylt skjema fra Tjenesteeier). Nå vil alle typer prefillkilder samt alle prefillmetoder en tjenesteeier kan benytte gi SBS tilgang til de samme data som i portal.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
|----------------------|----------------------------|-------------|
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| Prefill              | GetPrefillData             | Basic/WS/EC |
| Prefill              | GetPrefillDataV2           | Basic/WS/EC |

Send inn skjemasett
----------------

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

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type         |
|----------------------|----------------------------|--------------|
| SystemAuthentication | GetAuthenticationChallenge | Basic        |
| ReporteeElementList  | GetReporteeElementListV2   | Basic/WS/EC  |
| Workflow             | GetSigningText             | Basic/WS     |
| IntermediaryInbound  | SubmitFormTask             | Basic/WS/ EC |

Sjekk transportkvittering for innsending
----------------------------

Når en innsending mottas fra sluttbrukersystem vil en transportkvittering returneres umiddelbart etter mottak.
Transportkvitteringen vil inneholde informasjon om hvert enkelt element i innsendingen, med detaljer på hva kvitteringen gjelder og valideringsstatus på innsendingen. Mottak og prosessering av innsendte data skjer i flere trinn, vil kvitteringen endre status etter hvert som innsendingen behandles. En innsending kan ikke regnes å være mottatt og godtatt før transportkvitteringen viser at validering og videre prosesseringen for innsendingen er fullført i Altinn.

Det vil derfor fra et sluttbrukersystem ofte være nødvendig å etterspørre kvittering flere ganger inntil en godkjent status blir returnert fra Altinn.

Ved innsending fra SBS utfører Altinn en prosess med formålet å stoppe innsendinger med feil, for eksempel i kalkyler. Denne prosessen er nærmere beskrevet i kapittel 10, Vedlegg B - Regler for sammenlikning av skjemasett, og viser blant annet hvilke kriterier som gjelder for å generere advarsler og feil i kvitteringene.

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
|----------------------|----------------------------|----------|
| SystemAuthentication | GetAuthenticationChallenge | Basic    |
| Receipt              | GetReceiptList             | Basic/WS |
| Receipt              | GetReceipt                 | Basic/WS |

Legge til vedlegg til innsendt skjemasett
----------------

Dersom man skal laste opp store vedlegg til et skjemasett, kan man bruke SubmitAttachmentStreamed-metoden for å legge til et vedlegg til en innsending som ligger til utfylling i meldingsboksen.

Dette gjøres ved å benytte arbeidsflytreferansen (WorkflowReference) man får fra kvitteringskallet etter vellykket innsending og instansiering som ReporteeElementId-parameter i SubmitAttachmentStreamed-metoden. Når
man har lagt til alle aktuelle vedlegg kan skjemasettet signeres og arkiveres ved å bruke samme arbeidsflytreferanse som inn-parameter i CompleteAndSign (alternativt tilsvarende metoder i *Workflow*).

**Tjenester og tjenesteoperasjoner som inngår i beskrevetfunksjonalitet:**

| Tjeneste                    | Operasjon                  | Type     |
|-----------------------------|----------------------------|----------|
| SystemAuthentication        | GetAuthenticationChallenge | Basic    |
| Receipt                     | GetReceipt                 | Basic/WS |
| IntermediaryInboundStreamed | SubmitAttachmentStreamed   | Basic/WS |
| IntermediaryInbound         | CompleteAndSign            | Basic/WS |

Styr arbeidsflyt for innsendingstjeneste
----------------

Altinn tillater at enkeltstående arbeidsflytsteg utføres fra sluttbrukersystem uten innlogging i portalen. Den mest vanlige typen aksjon å ta fra sluttbrukersystem vil være å utføre et enkeltstående signeringssteg, men det vil være støtte for flere andre operasjoner som er tilgjengelig i portalen. Et annet eksempel er å flytte et skjema tilbake til utfylling, eller hente ut arbeidsflythistorikk for et skjema.

Et praktisk eksempel på bruk kan være at en sluttbruker sender inn sitt skjema til Altinn, og legger ved signaturinformasjon. Skjemaet opprettes, valideres, og signeres i første steg. Dette er et skjema som krever revisorsignering, og derfor blir ikke skjema arkivert, men liggende å vente på at revisor skal signere. På dette tidspunkt kan revisor benytte ”signer skjema” funksjonaliteten fra sitt sluttbrukersystem, og signere og sende inn skjema. Dermed vil skjema kunne passere gjennom avanserte arbeidsflyter uten at man behøver å logge inn i portalen.

Operasjonen GetAvailableActionsV2 vil kunne kalles for et gitt element for å sjekke hvilken handling som skal utføres. For en tjeneste som er opprettet ikke komplett og innehar et brukerstyrt signeringssteg vil denne operasjonen kunne returnere verdien *DoSignDelegation*. Sluttbrukersystemet kan i så tilfelle benytte operasjonen *PrepareUserControlledSigning* til å delegere signering til brukere. Denne operasjonen tar inn *reporteeElementID* for å angi elementet som skal behandles. Videre må en *delegatedUserBEList* fylles med innhold, der *Name* skal angi etternavn og *SSN* er fødselsnummer for brukeren som skal signere, samt at *NumberOfSignaturesAllowed* kan settes avhengig av hvor mange signaturer denne personen kan angi avhengig av om
tjenesten tillater flere signaturer fra samme bruker. *userDefinedNumberOfSignaturesRequired* må settes for å angi det totale antallet signaturer som kreves for det parallelle steget. Videre må *parallelSigningStepLocked* settes. Denne parameteren er kun tilgjengelig for avgivere som er definert som Trusted partner, og brukes til å låse forberedingen til det parallelle signeringssteget – det vil si at bruker selv ikke kan endre hvem og hvor mange som skal signere.

Funksjonaliteten i hver enkelt av de tilgjengelige funksjonene forklares i detalj under.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                               | Type        |
|----------------------|-----------------------------------------|-------------|
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

Slett innsendingstjeneste
----------------

Et sluttbrukersystem kan velge å slette et aktivt eller arkivert element fra arbeidsliste eller fra arkivet i Altinn. Dette innebærer at elementet ikke lenger vil være synlig i portal eller tilgjengelig for
sluttbrukersystem.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
|----------------------|----------------------------|-------------|
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| ReporteeElementList  | DeleteReporteeElement      | Basic/WS/EC |

Se arkivert innsendingstjeneste
----------------

Når en innsendingstjeneste sendes inn, enten fra et sluttbrukersystem eller i portal, opprettes det en kvittering for den arkiverte innsendingstjenesten. Kvitteringen kan senere hentes opp både for portalbruker, sluttbrukersystem og fra tjenesteeiers system. I kvitteringen ligger det funksjonalitet for å sende kvitteringen på e-post, vise utskriftsversjon av det innsendte oppgavesettet samt eventuell visning av digital signatur.

Ved innsending fra sluttbrukersystem vil det genereres en kvittering som angir status for forsendelsen (nærmere beskrevet i kapittel 4.3.3, Sjekk transportkvittering for innsending).

Dette må ikke forveksles med transportkvittering som beskrives i avsnitt *Sjekk transportkvittering for innsending*.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste                | Operasjon                  | Type        |
|-------------------------|----------------------------|-------------|
| SystemAuthentication    | GetAuthenticationChallenge | Basic       |
| ReporteeArchiveExternal | GetArchivedFormTask        | Basic/WS/EC |

Finn aktive og arkiverte innsendingstjenester
----------------

Et sluttbrukersystem kan hente ut detaljer på innsendingstjenester fra Altinn, både aktive som er opprettet i arbeidsflyt, og de som er sendt inn og arkivert. For å gjøre dette kalles typisk først en søkeoperasjon
med filtrering som returnerer en liste (GetReporteeElementListV2). Deretter kan et enkelt element hentes med alle detaljer.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste                | Operasjon                  | Type        |
|-------------------------|----------------------------|-------------|
| SystemAuthentication    | GetAuthenticationChallenge | Basic       |
| ReporteeElementList     | GetReporteeElementListV2   | Basic/WS/EC |
| ReporteeElementList     | GetFormSetElementsV2       | Basic/WS/EC |
| ReporteeArchiveExternal | GetAttachmentData          | Basic/WS/EC |

Hent prosesseringsstatus
----------------

Sluttbrukersystem kan hente ut estimert tid (minutter) for hvor lang tid prosesseringen av en innsendingstjeneste vil ta.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste            | Operasjon                 | Type        |
|---------------------|---------------------------|-------------|
| IntermediaryInbound | GetAltinnSubmissionStatus | Basic/WS/EC |

Innsending av skjema med sensitive felt fra sluttbrukersystem
----------------

Altinn versjon 2 støtter innsending av tjenester med sensitive felt. Slike skjema kan også sendes inn via sluttbrukersystem. For å støtte dette må sluttbrukersystem kryptere data før den sendes inn via web tjenester.

Prinsippet som brukes er at hvert enkelt sensitivt felt krypteres med en symmetrisk nøkkel. Nøkkelen som genereres må være 128 bit lang. Algoritmen for å kryptere hvert enkelt felt skal være AES.

Sensitive felt i skjema som skal sendes inn til Altinn vil alltid være strengverdier i XSD. Dette fordi en kryptert verdi alltid vil overføres som en streng, og det vil ikke være mulig å validere den krypterte verdien.

Når skjema er kryptert må den symmetriske nøkkelen krypteres ved hjelp av det offentlige sertifikatet til tjenesteeier. Algoritmen som benyttes for denne krypteringen er RSA. Sertifikatet til tjenesteeier hentes ut ved hjelp av operasjonen GetCertificatesExternal på tjenesten KeyManagementExternal. Basert på tjeneste og tjenesteutgave returneres en liste med gyldige sertifikater og ID for hver enkelt tjenesteeier som skal motta skjemadata. I de fleste tilfeller vil dette bare være et sertifikat da de fleste innsendingstjenester bare har en mottaker av skjemadata.

Hvis sluttbruker ønsker muligheten til å dekryptere data ved et senere tidspunkt må også den symmetriske nøkkelen sendes inn kryptert med et egendefinert passord. Dette passordet må minimum være på 8 tegn. Ved uthenting fra arkiv ved hjelp av sluttbrukersystem kan man da benytte passordet for å dekryptere den symmetriske nøkkelen for deretter å dekryptere feltene som har krypterte data.

Tjenesten som benyttes for å sende inn sensitive skjema er samme som vanlige skjema, *SubmitFormTask*), se også kapittel 4.3.2. Parameteren FormData settes da som vanlig, men nodene er kryptert som beskrevet over. I tillegg må data om brukt nøkkel fylles ut:

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
|---------------|-----------------|-------------|
| KeyManagement | GetCertificates | Basic/WS/EC |

Signering ved hjelp av XMLDsig
----------------

Det er i Altinn mulig for tjenesteeier å kreve digital signering ifølge XMLDSig standarden i tillegg til Altinns vanlig sikkerhets funksjonalitet. For tjenester som krever dette må hvert skjema signeres med et *Signature* element. *Signature* element må tilpasse XMLDSig standard og er beskrevet i mer detalj i kapittel 5.3.

Benytt meldingstjeneste
-----------------------

Meldingstjenester benyttes av tjenesteeiere for å sende informasjon eller tilbakemelding på innsendte data til sluttbrukere/avgivere i Altinn. Sluttbrukersystemer har mulighet for å hente ut meldinger for avgivere, samt utføre visse handlinger på tjenestene, deriblant å arkivere en melding.

Hent melding
----------------

Det er mulig å hente ut meldinger for avgivere i Altinn, både aktive og arkiverte meldinger. Meldingene hentes først gjennom å hente en liste basert på søkeparametere, deretter kan en spesifikk melding hentes med identifikator for en ønsket melding. Denne identifikatoren vil være retur parameter for liste objektet.

Når en melding hentes vil det også sendes en lesevarsling til tjenesteeier dersom de har bedt om dette. Både når man henter listen og den spesifikke meldingen vil man basert på parameteren *CaseID* kunne se om den aktuelle meldingstjenesten er knyttet til en samhandlingstjeneste.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet: **

| Tjeneste             | Operasjon                           | Type        |
|----------------------|-------------------------------------|-------------|
| SystemAuthentication | GetAuthenticationChallenge          | Basic       |
| ReporteeElementList  | GetReporteeElementListV2            | Basic/WS/EC |
| Correspondence       | GetCorrespondenceForEndUserSystemV2 | Basic/WS/EC |

Bekreft melding
----------------

For noen meldingstjenester krever tjenesteeier at bruker bekrefter at meldingen er lest. Denne bekreftelsen kan også gjøres fra sluttbrukersystem i tillegg til portal. Meldingen i Altinn oppdateres da med lesebekreftelsen, samt hvem som har bekreftet meldingen og tidspunkt for når dette ble gjort.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                      | Type        |
|----------------------|--------------------------------|-------------|
| SystemAuthentication | GetAuthenticationChallenge     | Basic       |
| Correspondence       | SaveCorrespondenceConfirmation | Basic/WS/EC |

Slett melding
----------------

Et sluttbrukersystem kan velge å slette en melding som er mottatt. Når en meldingstjeneste er slettet vil den ikke være tilgjengelig for verken sluttbruker eller sluttbrukersystem.

Når en melding slettes vil det også sendes en lesevarsling til tjenesteeier dersom de har bedt om dette.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type     |
|----------------------|----------------------------|----------|
| SystemAuthentication | GetAuthenticationChallenge | Basic    |
| Correspondence       | DeleteCorrespondence       | Basic/WS |

Arkiver melding
----------------

Et sluttbrukersystem kan velge å arkivere en melding. Arkiveringen kan kun gjennomføres dersom meldingen er ferdig behandlet, dvs. meldingen må være lest og bekreftet (dersom bekreftelse kreves).

For å arkivere meldingen benyttes parameteren *CorrespondenceID* for å angi den unike identifikatoren for meldingstjenesten som skal arkiveres (denne identifikatoren tilsvarer ReporteeElementID). Operasjonen returnerer kvittering til sluttbrukersystemet.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                              | Type        |
|----------------------|----------------------------------------|-------------|
| SystemAuthentication | GetAuthenticationChallenge             | Basic       |
| Correspondence       | ArchiveCorrespondenceFromEndUserSystem | Basic/WS/EC |

Benytt formidlingstjeneste
--------------------------

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

Laste opp filer til mottaker(e) (WS)
----------------

Når avsender ønsker å benytte web service for å laste opp og gjøre en formidlingstjeneste tilgjengelig for mottakere gjøres dette ved først å sende nødvendig metadatainformasjon til Altinn. Dette gjøres gjennom kallet *InitiateBrokerService*. Her må avsender gi informasjon tilsvarende innholdet i manifest.xsd og receipients.xsd (som definert i kapittel 6.15), men som del av tjenestekallet. Dette er blant annet nøkkelinformasjon om tjenesten som skal benyttes, avsenders referanse, og hvem som skal være mottaker av formidlingstjenesten. Se kapittel 6.14.2 for mer informasjon om operasjonen *InitiateBrokerService*.

Som respons på denne tjenesten vil avsender motta en referanse, denne referansen benyttes så som nøkkel til å laste opp faktisk ZIP-fil gjennom operasjonen *UploadFileStreamed*. Etter at payload er lastet opp til Altinn, vil den gjøres tilgjengelig for angitte mottakere, og avsender får en kvittering på forsendelsen. Denne kvitteringen inneholder en kvitterings ID som avsender kan benytte for å hente et kvitteringshierarki som inneholder en hovedkvittering med en eller flere underkvitteringer. Hver enkelt underkvittering vil her representere forsendelsen til en mottaker, med tilhørende status på hvorvidt formidlingstjenesten er lastet ned eller ikke. Se kapittel 6.15.3 for mer informasjon om operasjonen *UploadFileStreamed*, og kapittel 6.4.1 for informasjon om *GetReceiptV2*.

**Batch grensesnitt eller tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste / Fil        | Operasjon / Format    | Type        |
|-----------------------|-----------------------|-------------|
| BrokerService         | InitiateBrokerService | Basic/WS/EC |
| BrokerServiceStreamed | UploadFileStreamed    | Basic/WS/EC |
| Receipt               | GetReceiptV2          | Basic/WS    |

Laste opp filer til mottaker(e) (SFTP)
----------------

For formidlingstjenester tilbyr Altinn også en SFTP kanal for opp- og nedlasting. Denne kan blant annet benyttes dersom informasjonen som skal deles med mottakere er av en viss størrelse (ca. 200MB eller mer), da disse ikke vil være mulig å laste opp og ned gjennom web service kanalen.

Avsender kobler seg da opp mot Altinns SFTP kanal ved hjelp av bruker opprettet i portal. Denne brukeren vil autentiseres mot SFTP serveren ved hjelp av brukernavn, passord og sertifikat. Se kapittel 8.2 Registrere SFTP-bruker for mer informasjon om hvordan slike brukere opprettes. Ved pålogging opprettes det en virtuell filstruktur basert på tilgjengelige formidlingstjenester. Se kapittel 4.5.3 for mer informasjon om formatet på denne filstrukturen.

Avhengig av hvordan SFTP-klient benyttes, vil man laste opp nye formidlingstjenester til en egne opplastningsmappe. Filene som lastes opp her må være på et ZIP-format, og inneholde en manifest.xml og recipients.xml i henhold til kapittel 6.15.1 og 6.15.2. Altinn vil etter at fil er ferdig opplastet starte prosessering av filen. Dette innebærer blant annet validering av informasjon oppgitt i manifest-filen samt validering av mottakere oppgitt i Recipients. Ved en vellykket validering av opplastet data opprettes det en kvitteringshierarki med en hovedkvittering samt underkvitteringer for hver mottaker. For å hente denne kvitteringsdataen vil avsender benytte seg av operasjonen *GetReceiptV2*. For å kunne søke opp korrekt kvittering bør SendersReference som ble oppgitt i manifestfilen benyttes som søkeparameter. Se mer om *GetReceiptV2* i kapittel 6.4.1.

Se også Figur 2: Opp- og nedlasting over SFTP i kapittel 11.

**Batch grensesnitt eller tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste / Fil            | Operasjon / Format   | Type     |
|---------------------------|----------------------|----------|
| BrokerService SFTP-server | Opplasting av ZIP-fil inneholdende payload, manifest.xml og recipients.xml iht. spesifikasjon angitt i avsnitt 6.15           | SFTP     |
| Receipt                   | GetReceiptV2    | Basic/WS |

Laste ned filer fra avsender (WS)
----------------

En mottaker av formidlingstjenester kan benytte seg av web servicer for å sjekke og eventuelt laste ned tilgjengelige filer. Ved å benytte operasjonen *GetAvilableFiles* kan mottaker enkelt få en oversikt over hvilke filer som er tilgjengelig i Altinn. Denne operasjonen gir informasjon om formidlingstjenesten, samt status – hvorvidt den allerede er lastet ned av mottaker. Se kapittel 6.14.1 for mer informasjon om *GetAvailableFiles*.

Basert på referansen som hentes i *GetAvailableFiles* kan mottaker så benytte seg av operasjonen *DownloadFileStreamed* til å laste nedformidlingstjenesten. Denne tjenesten er basert på strømming av data. Tilslutt må mottaker bekrefte at de har mottatt filen ved å utføre et kall til *ConfirmDownloaded*. Dette gjør at avsender kan se at mottaker har hentet ned filen. Se kapittel 6.14.4 for mer informasjon.

Som mottaker har man tilgang til underkvittering som gjelder for akkurat denne mottakeren. Mottaker kan da benytte *GetReceiptV2* til å hente kvittering med tilhørende status, samt *UpdateReceipt* til å legge på en
kvitteringstekst som også avsender vil ha tilgang til. Se henholdsvis kapittel 6.4.1 og 6.4.3 for mer informasjon om disse operasjonen.

**Batch grensesnitt eller tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

|**Tjeneste / Fil**    |  **Operasjon / Format** |  **Type**|
|----------------------|-------------------------|-------------|
|BrokerService         |  GetAvailableFiles       | Basic/WS/EC|
|BrokerServiceStreamed |  DownloadFileStreamed    | Basic/WS/EC|
|Receipt               |  GetReceiptV2            | Basic/WS|
|Receipt               |  UpdateReceipt           | Basic/WS|

Laste ned filer fra avsender (SFTP)
----------------

Som ved opplasting, støtter Altinn også nedlasting over SFTP. På samme måte må en egen SFTP-bruker opprettes i portalen, se kapittel 8.2.

Når bruker logger på Altinns SFTP server vil det opprettes en egen virtuell filstruktur. Denne bygges blant annet opp basert på informasjon om formidlingstjenester tilgjengelig for nedlasting som mottaker. Filstrukturen som presenteres vil være bygd opp med følgendemappestruktur:

- Upload – benyttes til å droppe filer som skal lastes opp til Altinn.
- Download – mappe som samler alle formidlingstjenester tilgjengelig for bruker.
- &lt;Avgiver&gt; - egen mappe for hver enkelt avgiver bruker kan representere.
- &lt;Tjenestekode&gt; - egen mappe for hver enkelt tjenestekode det finnes formidlingstjenester for.
- &lt;Tjenesteutgavekode&gt; - egen mappe for hver enkelt tjenesteutgave.
- &lt;Filer for formidlingstjenesten&gt; - en eller flere ZIP-filer som er tilgjengelig for nedlasting.

SFTP-klient kan navigere denne filstrukturen og laste ned ønskede filer. En implementasjon av SFTP-klient kan således også direkte basert på denne oppbyggingen sammen med informasjon hentet fra web service *GetAvailableFiles* hente ut filer basert på status. Se kapittel 6.14.1 for mer informasjon om operasjonen *GetAvailableFiles*.

Når en fil er lastet ned fra Altinns SFTP-server vil Altinn markere denne filen som nedlastet og oppdatere metadata og kvittering. Mottaker av formidlingstjenesten kan verifisere dette ved å hente underkvittering som tilhører den konkrete overføringen. Til dette benyttes operasjonen *GetReceiptV2* ved å angi kvitteringsidentifikator mottatt gjennom *GetAvilableServices*, eller ved å søke på referansen SendersReference som oppgitt i mottatt manifest fil. Se kapittel 6.4.1 for mer informasjon om *GetReceiptV2*.

Dersom avsender og mottaker ønsker, kan ytterligere informasjon om status utveksles ved å oppdatere kvittering relatert til mottakers fil. Mottaker kan da benytte operasjon *UpdateReceipt* til å legge på fritekst. Avsender kan på sin side hente denne basert på *GetReceiptV2* operasjonen. Se kapittel 6.4.3 for mer informasjon om *UpdateReceipt*.

Når man benytter nedlasting med SFTP er det ikke nødvendig å bekrefte nedlastingen med noe kall til *ConfirmDownloaded*. Det blir gjort automatisk.

**Batch grensesnitt eller tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste / Fil            | Operasjon / Format  | Type        |
|---------------------------|---------------------|-------------|
| BrokerService SFTP-server | Nedlasting av ZIP-fil inneholdende payload og manifest.xml iht. spesifikasjon angitt i avsnitt 6.15 | SFTP        |
| BrokerService             | GetAvailableFiles  | Basic/WS/EC |
| Receipt                   | GetReceiptV2       | Basic/WS    |
| Receipt                   | UpdateReceipt      | Basic/WS    |

Benytt innsynstjeneste
----------------------

Innsynstjenester er en tjenestetype i Altinn som benyttes for å presentere data fra tjenester som tilbys av tjenesteeiere, og kan sees på som et oppslag mot tjenesteeiers system. Grensesnitt for å aksessere tjenestene eksponeres til sluttbrukersystemer gjennom Altinn, og Altinn formidler responsen fra tjenestene til sluttbrukersystemet.

Sluttbrukersystemer kan velge å lagre en signert kopi av en innsynstjeneste som benyttes. Den signerte innsynstjenesten lagres da i brukers arkiv i Altinn. En innsynstjeneste som ikke er signert og arkivert vil ikke være tilgjengelig i Altinn etter at den er benyttet.

Operasjonene tilgjengelig vil variere fra innsynstjeneste til innsynstjeneste. Hver tjenesteeier vil eksponere sitt eget sett av operasjoner relatert til sine innsynstjenester, og funksjonaliteten for disse kan variere. Generelt vil operasjonene returnere data for innsynstjenesten, og enkelte vil også muliggjøre arkivering av dataen.

Finn arkiverte innsynstjenester
----------------

Et sluttbrukersystem kan hente ut detaljer på arkiverte innsynstjenester. For å gjøre dette kalles typisk først en søkeoperasjon med filtrering som returnerer en liste (GetReporteeElementListV2). Merk at operasjonen vil returnere parameter *ReporteeElementType* med type *LookUp* for innsynstjenester.

Deretter kan et enkelt element hentes med alle detaljer ved å benytte operasjonen GetArchivedLookup. Parameter *reporteeElementID* benyttes her som input for å identifisere den unike innsynstjenesten som skal hentes. Operasjonen returnerer dataen fra den arkiverte innsynstjenesten i form av binærdata som en PDF i parameteren *LookupPDF*.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste                | Operasjon                  | Type        |
|-------------------------|----------------------------|-------------|
| SystemAuthentication    | GetAuthenticationChallenge | Basic       |
| ReporteeElementList     | GetReporteeElementListV2   | Basic/WS/EC |
| ReporteeArchiveExternal | GetArchivedLookup          | Basic/WS/EC |

Gjøre oppslag på innsynstjenester
----------------

En sluttbruker eller sluttbrukersystem kan gjøre oppslag på innsynstjenester som er konfigurert med mulighet for direkte kall i Altinn. Dette gjøres ved kall til *ExecuteLookUp* operasjonen med input om hvilken innsynstjeneste man skal benytte (*ServiceCode* og *ServiceEditionCode*), hvem avgiver at oppslaget er (*Reportee)* og selve spørringen til tjenesten (*QueryData*). *QueryData* oppgis som en tekststreng og vil variere etter hvilke operasjoner innsynstjenesten tilbyr.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
|----------------------|----------------------------|-------------|
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| LookUpExternal       | ExecuteLookUp              | Basic/WS/EC |

Benytt samhandlingstjeneste
---------------------------

En samhandlingstjeneste er en tjeneste som knytter sammen andre tjenester. Samhandlingstjenester kan være definert av sluttbrukere (samleside) eller av tjenesteeiere (e-dialog). Gjennom samhandlingstjenester kan sluttbrukere og sluttbrukersystemer benytte et sett med tjenester som for bruker og/eller tjenesteeier hører naturlig sammen.

Nedenfor beskrives funksjonaliteten som kan benyttes fra sluttbrukersystemer for samhandlingstjenester. En tjeneste som er del av en samhandlingstjeneste instans kan også behandles individuelt, det vil si at all funksjonalitet som er tilgjengelig for sluttbrukersystemer for f.eks. innsendingstjenester kan også benyttes for innsendingstjenester som er del av en samhandlingstjeneste. En instans av en samhandlingstjeneste er definert som en sak, ”case”, og der hvor det skal refereres til en spesifikk instans av en samhandlingstjeneste benyttes derfor parameteren CaseID.

Finn aktive og arkiverte samhandlingstjenester
----------------

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
|----------------------|----------------------------|-------------|
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| ReporteeElementList  | GetReporteeElementListV2   | Basic/WS/EC |
| Case                 | GetCaseList                | Basic/WS/EC |

Opprett ny samhandlingstjeneste
----------------

Sluttbrukersystemer kan opprette en ny instans av en samhandlingstjeneste, og dermed starte arbeidsflyten for tjenesten. Det er kun tjenesteeierdefinerte samhandlingstjenester som kan opprettes fra sluttbrukersystemer.

Parametrene *externalServiceCode* og *externalServiceEditionCode* i operasjonen InstantiateCollaboration angir type instans av samhandlingstjeneste som skal opprettes, og *reporteeNumber* angir fødselsnummer eller organisasjonsnummer den opprettes for. Disse er obligatoriske parametre. I tillegg til disse kan *externalSystemReference, visibleDateTime og dueDate* sendes inn. *visibleDateTime* angir når tjenesten skal være synlig i portalen, om denne ikke angis vil den umiddelbart bli synlig.

Operasjonen returnerer den unike identifikatoren, CaseID, som kan benyttes videre til for eksempel å opprette instanser av innsendingstjenester knyttet til samhandlingstjenesten.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
|----------------------|----------------------------|-------------|
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| Case                 | InstantiateCollaboration   | Basic/WS/EC |

Avslutt samhandlingstjeneste
----------------

Sluttbrukersystem kan velge å avslutte en aktiv samhandlingstjeneste. Innsendings- og meldingstjenester som inngår i samhandlingstjenesten må være arkivert før samhandlingstjenesten kan arkiveres som helhet.

Alternativt kan sluttbrukersystemet benytte parameteren *forceArchive*. Settes denne til *true* vil samhandlingstjenesten bli arkivert med mindre det er aktive meldingstjenester knyttet til samhandlingstjenesten. Eventuelle aktive innsendingstjenester vil bli atskilt fra den arkiverte samhandlingstjenesten. Om *forceArchive* settes til *false* vil samhandlingstjenesten ikke bli arkivert om det fremdeles er aktive elementer tilknyttet den.

Parameter *caseID* angir samhandlingstjenesten som skal arkiveres, og operasjonen vil ved vellykket arkivering returnere en arkiv identifikator for samhandlingstjenesten.

**Tjenester og tjenesteoperasjoner som inngår i beskrevet funksjonalitet:**

| Tjeneste             | Operasjon                  | Type        |
|----------------------|----------------------------|-------------|
| SystemAuthentication | GetAuthenticationChallenge | Basic       |
| Case                 | ArchiveCase                | Basic/WS/EC |

Teknisk implementasjon
----------------

Sikkerhet på web services
-------------------------

For å tilby funksjonalitet for sikkerhet gjennom autentisering og autorisasjon benyttes 2 varianter tjenesteparametere for sluttbrukersystemer. En tredje variant for støtte av sertifikat for autentisering er også lagt til:

- Basic operasjoner med autentiseringsinformasjon (brukernavn/passord) i meldingen.
- I en web service operasjon vil dette typisk bety at de første elementene i en melding er forbeholdt autentiseringsinformasjon.

Eksempel på en SOAP melding med basic:

{{< figure src="/docs/images/guides/sluttbrukersystemer/basicEksempel.png" title="" >}}

- WS som benytter WS-Security hvor autentiseringsinformasjon (brukernavn/passord) følger SOAP meldingen på en standardisert måte gjennom definerte SOAP header elementer.

- I en web service operasjon vil dette bety at autentiseringsinformasjonen ligger i SOAP header basert på        innhold definert i WS-Security standarder.

Eksempel på en SOAP melding med bruk av WS-Security:

{{< figure src="/docs/images/guides/sluttbrukersystemer/wsSecurityEksempel.png" title="" >}}

- EC operasjoner hvor autentiseringsinformasjon i form av sertifikat blir formidlet via SOAP header, mens tilhørende brukernavn og passord blir sent som del av meldingen.

Eksempel på en SOAP melding med bruk av EC:

{{< figure src="/docs/images/guides/sluttbrukersystemer/ecEksempel.png" title="" >}}

Feilhåndtering
--------------

Altinn returnerer feilkoder hvis noe går galt. For å formidle feilsituasjonen benyttes en SOAP Fault med en egen kontrakt som inneholder felter som identifiserer feilen og gir en tekstlig feilmelding.

SOAP Fault
----------------

Altinn benytter en SOAP fault til å returnere feilmeldinger for en web service. Denne fault meldingen er i henholdt til AltinnFault kontrakten definert i WSDL for alle tjenestene. Kontrakten vil angi en feilkode og en feilmelding, henholdsvis *ErrorID* og *AltinnErrorMessage*, for å definere feilsituasjoner.

Eksempel på en feilmelding fra Altinn:

{{< figure src="/docs/images/guides/sluttbrukersystemer/soapFault.png" title="" >}}

Feilkoder
----------------

Listen under angir de generelle feilkodene som benyttes. Disse er først og fremst benyttet i sammenheng med autentisering og autorisering og benyttes derfor av flere av tjenestene i Altinn. Feilkoder mer spesifikke for operasjonene er listet opp under de respektive operasjonene i kapittel 6 Grensesnitt.

| Feilkode | Beskrivelse |
|--------|--------|
|    0    |Denne feilen oppstår i følgende tilfeller (se tekst i AltinnErrorMessage for mer informasjon): Autentisering av sluttbruker feilet pga feil brukernavn/passord/pin. Maks bruk av pinkode oppnådd, benytt ny pinkode. Sesjon for pinkode har gått ut, benytt ny pinkode. Bruker er midlertidig låst|
|5|Denne feilen oppstår i følgende tilfeller (se tekst i AltinnErrorMessage for mer informasjon):Ikke mulig å autorisere forespørsel basert på sendte parametere – verifiser gyldigheten/format. Autentisering av systemet feilet pga feil brukernavn/passord. Systemet eller virksomhetsbrukeren er midlertidig låst ute. Systemet er ikke autorisert for denne operasjonen på vegne av angitt avgiver. Angitt system ID er ikke gyldig – skal være et nummer|
|989|Denne feilen oppstår i følgende tilfeller (se tekst i AltinnErrorMessage for mer informasjon): Autentisering av sluttbruker feilet pga feil brukernavn/passord/pin. Maks bruk av pinkode oppnådd, benytt ny pinkode. Sesjon for pinkode har gått ut, benytt ny pinkode. Bruker er midlertidig låst|

Hvis det ikke kommer en forståelig feilmelding, send en henvendelse til support@altinn.no. Legg med tidspunkt for innsending, avgiver (reportee) og sluttbrukersystem id, den unike koden (ErrorGuid) samt beskrivelse av hva som har skjedd.

Benytt XMLDSig - digital signatur
---------------------------------

Noen tjenesteeiere krever *XMLDSig*-signering i tillegg til Altinns vanlige sikkerhetsfunksjoner. Altinn støtter skjema signert med *enveloped»-metoden*. Følgende XML viser hvordan signaturen skal dannes for å bli betraktet som gyldig av Altinn. Kanonisering (prosessen hvorved XML-dokumentet representeres på kanonisk form), signering og transformasjon må være samme som nedenfor; i tillegg må sertifikatet brukt for å signere dokumentet være inkludert i signaturen.

{{< figure src="/docs/images/guides/sluttbrukersystemer/digitalSignatur.png" title="" >}}

Nøyaktig ett «Signature»-element er tillatt i «XMLDSig»-elementet. Signaturen må være definert ifølge XMLDSig-navneromspesifikasjonen. Sertifikatet brukt for å signere dokumentet må være gyldig på det tidspunkt skjema leveres til Altinn. Skjemaene signerte med XMLDSig må sendes inn “komplett” og signaturen valideres av Altinn før skjemasendes videre til tjenesteeier. Tjenesteeier kan validere signaturen etter mottak fra Altinn. Merk at innhold i «XMLDSig»-elementet er definert i tjeneste-XSD-en som et *«any»-element* med *processContents=lax* og namespace lik XMLDSig-navnerommet. *Lax* prosessering betyr i praksis at ingen valideringsfeil resulterer hvis validatoren ikke er gitt et XSD-skjema som inkluderer XMLDSig-navnerommet, i.e. *XMLDSig-XSD*.

Grensesnitt
----------------

I parameter listene under finnes en del parametere som er formater med *italic*. Disse er interne for Altinn og vil bli fjernet eller endret til noe som gir mer mening for eksternt som en del av en forbedring på alle kontrakter jfr. forbedringspunkt Prod100006098 – Disse er heller
ikke kommentert

ReporteeArchiveExternal
-----------------------

| Tjenesteoperasjon   | Kort beskrivelse   |
|---------------------|------------------|
| GetArchivedFormTask | Henter alle skjema og vedlegg for et arkivert skjemasett. |
| GetAttachmentData   | Henter de binære vedleggene til et arkivert element       |
| GetArchivedLookup   | Henter en arkivert innsynstjeneste                        |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

ReporteeArchiveExternal.GetArchivedFormTaskV2
----------------

Denne operasjonen henter alle skjema og vedlegg for et skjemasett arkivert i Altinn. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen.

| Input             | Beskrivelse                      |
|-------------------|-----------------------------|
| reporteeElementId | Unik identifikator for et element i arkivet.|
| languageID        | Språk id. Benytt verdien 0 (uspesifisert) da skjemasett vil hentes med språket den ble arkivert med. Språk id: 1033-English, 1044-Bokmål, 1083-Samisk, 2068- Nynorsk|
| **Returverdi**        | **Beskrivelse**  |
| archivedFormTask  | Et arkiv objekt (ArchivedFormTaskBEV2) som inneholder alle detaljer for skjemasettet.|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i
datakontrakten.

| **Property**                      | **Beskrivelse**                   |
|-----------------------------------|-----------------------------------|
| **ArchivedFormTaskBEV2**          |                                  |
| ReporteeElementID                 | Unik identifikator for skjemasettet i Altinn|
| LastChanged                       | Dato og tidspunkt for når skjemasettet sist var endret (yyyy-MM-ddThh:mm:ss)                         |
| *ReporteeID*                      | Unik identifikator for avgiver i Altinn som skjemasettet tilhører|
| ArchivedDateTime                  | Dato og tidspunkt for når skjemasettet ble arkivert (yyyy-MM-ddThh:mm:ss)|
| ServiceOwner                      | Tjenesteeier som tilbyr tjenesten som skjemasettet tilhører |
| InvoiceInformation                | Betalingsinformasjon tilknyttet skjemasettet, desimaltall  |
| ArchivedFormList                | Liste med arkiv-objekter (ett objekt av typen ArchivedFormBE per skjema i skjemasettet), som inneholder detaljer for skjemaene i skjemasettet|
| ArchivedAttachmentList          | Liste med Arkiv-objekter (ett objekt av typen ArchivedAttachmentBE per vedlegg i skjemasettet), som inneholder detaljer for vedleggene i skjemasettet. |
| ArchivedFormTaskSigningStepList | Liste med arkiv-objekter av typen ArchivedFormTaskSigningStepBE, som inneholder signeringsinformasjon for hvert signeringssteg for skjemasettet.       |
| ExternalServiceCode             | Tjenestekode (for eksempel ”PSA”) for tjenesten som skjemasettet tilhører.                                                                             |
| ExternalServiceEditionCode      | Tjenesteutgavekode (for eksempel ”2009”) for tjenesten som skjemasettet tilhører.                                                                      |
| ssnOrgNumber                    | Inneholder enten fødselsnummer eller organisasjonsnummer tilhørende ReporteeID                                                                         |
| PasswordEncryptedSymmetricKey   | Passordkryptert symmetrisk nøkkel for å dekryptere eventuell sensitive felter.                                                                         |
| SOEncryptedSymmetricdKey        | Samme symmetriske nøkkel som over, men kryptert med tjenesteeiers sertifikat. Tjenesteeier kan da bruke privat nøkkel til å dekryptere denne nøkkelen. |
| ArchiveTaskList                 | Liste med arkiv-objekter av typen ArchiveTaskBEV2.                                                                                                     |
| **ArchivedFormBE**                | |
| FormID                     | Unik identifikator for skjemaet i Altinn|
| FormName                   | Navn på skjemaet                                                                   |
| FormDataXML                | XML som inneholder selve skjemadataene.                                                   |
| ParentReference            | Referanse til hovedskjemaets FormID (dersom skjemaet er et underskjema).                  |
| FormPresentationFieldValue | Presentasjonsfeltverdi for skjemaet.                                                      |
| PaymentInformationE2B      | E2B-formatert kvittering for skjemaet.                                                    |
| PaymentInformationHTML     | HTML-formatert kvittering for skjemaet.                                                   |
| DataFormatId               | Den unike id for et spesifikt skjema, dette er typisk gitt av metadata leverandør         |
| DataFormatVersion          | Versjonen av en gitt DataFormatID, som sammen med den gir et unikt skjema (spesifikasjon) |
| FormPaymentInfo            | Betalingsinformasjon vedlagt skjemaet.                                                    |
| FormSummary                | Beskrivelse av skjemaet                                                                   |
| **ArchivedAttachmentBEV2**        | |
| AttachmentID     | Unik identifikator for vedlegget i Altinn.                                |
| AttachmentName   | Navn på vedlegget.                                                        |
| FileName         | Navn på fil for vedlegg.                                                  |
| AttachmentData   | Innholdet/dataene i vedlegget.                                            |
| CreatedDateTime  | Dato og tidspunkt for når vedlegget ble opprettet (yyyy-MM-ddThh:mm:ss).  |
| SendersReference | Referanse satt av sluttbruker- eller etatssystem som har sendt vedlegget. |
| IsEncrypted      | Boolsk verdi som sier om vedlegget er kryptert|
| **ArchivedFormTaskSigningStepBEV2** ||
| SignatureID              | Unik identifikator for signaturen i Altinn.                                  |
| SignedByUser             | Unik Altinn id på bruker som har gjennomført signering                       |
| SignedByUserSSN          | Fødselsnummer til bruker som har gjennomført signering                       |
| SignedByUserName         | Navn på bruker som har gjennomført signering.                                |
| CreatedDateTime          | Dato og tidspunkt for når signeringen ble gjennomført (yyyy-MM-ddThh:mm:ss). |
| Signature                | Signaturen, binært formatert.                                                |
| SignatureText            | Tekst for signatur.                                                          |
| AuthenticationLevelID    | Unik Altinn id for autentiseringnivået for signaturen                        |
| AuthenticationMethod     | Unik Altinn id for autentiseringsmetoden til brukeren ved signering.         |
| CertificateIssuedByName  | Hvem som har utsted det eventuelle sertifikat som ble brukt ved signering    |
| CertificateIssuedForName | Hvem dette sertifikatet har blitt utstedt til.                               |
| CertificateValidFrom     | Når er sertifikatet gyldig fra                                               |
| CertificateValidTo       | Når er sertifikatet gyldig til                                               |
| SignedAttachmentList     | Liste med AttachmentIDs for vedlegg som er signert med denne signaturen.     |
| SignedFromList           | Liste med FormIDs for skjemaer som er signert med denne signaturen.          |
| IsSigningAllRequired              | Angir om signering er utført for alle elementer i skjemasett: YES – signering på alle skjema. NO – valgfri signering på skjema. SET_PER_FORM – valg for signering satt på skjema nivå|
| ProcessStepID                     | Den unike identifikatoren for steget signaturen gjelder for    |
| **ArchiveTaskBEV2**               ||
| EndUserSystemID                       | Sluttbrukersystem identifikator.                               |
| LastChanged                           | Angir dato for sist endring.                                   |
| NumberOfSignaturesAdded               | Antall signaturer som er lagt til.                             |
| ProcessStepID_FK                      | Intern ID for prosessteg.                                      |
| SentComplete                          | Angir om element ble sent som komplett fra sluttbrukersystem.  |
| TaskID                                | Identifikator for elementet, samme som ReporteeElementID       |
| UserDefinedNumberOfSignaturesRequired | Antall signaturer krevd for et evt brukerstyrt signeringssteg. |
| WorkflowReference                     | Intern ID forarbeidsflyt.                                      |

ReporteeArchiveExternal.GetAttachmentDataV2
----------------

Denne operasjonen benyttes for å hente ut data for ett gitt vedlegg. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen.

| Input        | Beskrivelse |
|--------------|-------------|
| AttachmentID | Unik identifikator for et vedlegg  |
| Returverdi   | Beskrivelse |
| Attachment   | Binær vedlegg objekt av typen AttachmentBEV2 som inneholder alle detaljer for et vedlegg. |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| **Property**   | **Beskrivelse**       |
|------------------|--------|
| **AttachmentBEV2**                ||
| AttachmentID     | Unik identifikator for vedlegget i Altinn                                 |
| AttachmentName   | Navn på vedlegget.                                                        |
| FileName         | Navn på fil for vedlegg.                                                  |
| AttachmentData   | Innholdet/dataene i vedlegget.                                            |
| CreatedDateTime  | Dato og tidspunkt for når vedlegget ble opprettet (yyyy-MM-ddThh:mm:ss).  |
| SendersReference | Referanse satt av sluttbruker- eller etatssystem som har sendt vedlegget. |
| IsEncrypted      | Boolsk verdi som sier om vedlegget er kryptert.                           |
| AttachmentTypeID                  | MIME-typen for vedlegget         |
| AttachmentFunctionTypeID | Angir funksjon for vedlegget: Invoice, Unspecified   |
| ReporteeElementID        | Referanse til element (skjemasett eller melding) som vedlegget tilhører. Unik id i Altinn.                                              |
| CreatedByUserID          | Bruker id for bruker som har lagt ved vedlegget.                                                                                        |
| IsAddedAfterFormFillin   | Angir om vedlegget er lagt til etter utfylling.                                                                                         |
| IsAssociatedToFormSet    | Angir om vedlegget er knyttet til skjemasett eller ikke – brukes for å slette vedlegg som er lastet opp men ikke lagt til skjemasettet. |
| DestinationType          |                                                                                                                                         |

ReporteeArchiveExternal.GetAttachmentDataStreamed
----------------

Denne operasjonen benyttes for å hente ut data for ett gitt vedlegg i det tilfelle vedlegg er større en 30MB. GetAttachmentData må kalles for å få detaljene om den binær filen returnerte av denne metoden.

Tabellen under beskriver datakontrakten for operasjonen.

| Input        | Beskrivelse                             |
|--------------|-----------------------------------------|
| AttachmentID | Unik identifikator for et vedlegg.      |
| **Returverdi**   | **Beskrivelse**                             |
| Attachment   | Stream som inneholder et binær vedlegg. |

ReporteeArchiveExternal.GetArchivedLookup
----------------

Denne operasjonen benyttes for å hente en arkivert innsynstjeneste.

Tabellen under beskriver datakontrakten for operasjonen.

|Input|Beskrivelse|
|---------------------------|----------------------------------|
| userSSN                   | Brukes fødselsnummer. Til bruk både til autentisering og evt. signering  |
| userPassword              | Brukes passord. Til bruk både til autentisering og evt. signering                                                                                |
| userPinCode               | Pinkode. Til bruk både til autentisering og evt. signering                                                                                       |
| authMethod                | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin |
| reporteeElementId         | Referanse til innsynstjenesten som skal hentes.                                                                                                  |
| languageID                | Språkkode for det språket innsynstjenesten skal hentes med. Språk id:1033-English, 1044-Bokmål, 2068-Nynorsk |                                                                                                                                                  |
| **Returverdi**                | **Beskrivelse**                 |
| archivedLookup            | Objekt av typen ArchivedLookupExternal som inneholder informasjon om innsynstjenesten|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property               | Beskrivelse     |
|------------------------|--------|
| ArchivedLookupExternal |                                                                                |
| AllowForwarding        | Angir om innsynstjenesten kan videresendes i portalen.                         |
| ArchiveDateTime        | Angir dato for når innsynstjenesten ble arkivert.                              |
| LanguageTypeId         | Språkkoden.                                                                    |
| LookupID               | Unike identifikatoren for denne innsynstjenesten, samme som ReporteeElementId. |
| LookupPDF              | Entitet av typen AttachementBEV2 som inneholder data og metadata om PDF.       |
|** AttachmentBEV2 **        |                                                                                |
| AttachmentID           | Ikke satt.                                                                     |
| AttachmentName         | Navn på vedlegget.                                                             |
| FileName               | Navn på fil for vedlegg.                                                       |
| AttachmentData         | Innholdet/dataene i vedlegget.                                                 |
| CreatedDateTime        | Ikke satt.                                                                     |
| SendersReference       | Ikke brukt i dette tilfellet.                                                  |
| IsEncrypted            | Ikke brukt i dette tilfellet.                                                  |
| AttachmentTypeID                  | MIMEMIME-typen for vedlegget, en enum men vil alltid i dette tilfellet være satt til: application_pdf-PDF|
| AttachmentFunctionTypeID | Angir funksjon for vedlegget, satt til Unspecified              |
| ReporteeElementID        | Referanse til den arkiverte innsynstjenesten. Unik id i Altinn. |
| CreatedByUserID          | Ikke satt.                                                      |
| IsAddedAfterFormFillin   | Ikke brukt i dette tilfellet.                                   |
| IsAssociatedToFormSet    | Ikke brukt i dette tilfellet.                                   |
| DestinationType          | Enum, men ikke brukt i dette tilfellet.                         |

IntermediaryInbound
-------------------

| Tjenesteoperasjon         | Kort beskrivelse                 |
|---------------------------|-----------------------------------|
| GetAltinnSubmissionStatus | Kalkulerer og returnerer estimert tid for når en oppgave sendt til Altinn vil være ferdig prosessert |
| SubmitFormTask            | Lar et sluttbrukersystem sende et skjemasett til Altinn |
| CompleteAndSign           | Lar et sluttbrukersystem komplettere og signere et skjemasett i Altinn |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for
endepunkter kapittel 8.3 for informasjon om endepunkter for
tjenesteoperasjonene.

IntermediaryInbound.GetAltinnSubmissionStatus
----------------

Denne operasjonen kalkulerer og returnerer estimert tid for når en oppgave sendt til Altinn vil være ferdig prosessert.

Tabellen under beskriver datakontrakten for operasjonen.

| Input      | Beskrivelse                                                                                                                    |
|------------|-----------------------------------|
| N/A        |                                   |
| **Returverdi** | **Beskrivelse**  |
| Minutes    | Estimert tid (antall minutter) for når man kan forvente at en innsendingstjeneste sendt til Altinn vil være ferdig prosessert. |

IntermediaryInbound.SubmitFormTask
----------------

Denne operasjonen lar et sluttbrukersystem sende et skjemasett til Altinn. Operasjonen returnerer en kvittering til sluttbrukersystemet som inneholder status for innsendingen.

Ved innsending fra sluttbrukersystem tar Altinn en kopi av innsendt skjemasett og prosesserer denne kopien på liknende måte som ved innsending i SBL (portalen). Denne kopien kan modifiseres slik at felter legges til eller skrives over. Deretter utføres en sammenlikning av den originalt innsendte XML-en med sikte på å detektere feil i innsendingen, for eksempel at kalkylene stemmer overens med det som forsøkes sendt inn.

Denne sammenlikningsprosessen er dokumentert i mer detalj i kapittel 10, Vedlegg B - Regler for sammenlikning av skjemasett.

Tabellen under beskriver datakontrakten for operasjonen.

| userSSN          | Brukers fødselsnummer. Til bruk både til autentisering og evt. signering       |
|------------------|--------------------------------------------------------------------------------|
| userPassword     | Brukers passord. Til bruk både til autentisering og evt. signering             |
| userPinCode      | Pinkode. Til bruk både til autentisering og evt. signering                     |
| authMethod       | Autentiseringsmetode. Til bruk både til autentisering og evt. signering        |
| formTaskShipment | Objekt av typen FormTaskShipmentBE som inneholder detaljer om forsendelsen    |
| **Returverdi**       | **Beskrivelse**   |
| Receipt          | Objekt av typen ReceiptExternalBE med kvitteringsinformasjon for forsendelsen. |

**Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.**

| Property                              | Beskrivelse  |
|---------------------------------------|----------|
| **FormTaskShipmentBE**                    |       |
| Reportee                              | Unik identifikator for avgiver for denne forsendelsen, fødselsnummer eller organisasjonsnummer |
| ExternalShipmentReference             | Referanse for forsendelsen. Referansen settes av sluttbrukersystem og kan dermed benyttes ved senere forespørsler mot Altinn for denne forsendelsen, bør derfor være unik. |
| FormTasks                             | Ett objekt av typen FormTask med detaljer for skjemasettet i denne forsendelsen |
| Attachments                           | Liste med vedleggs-objekter av typen Attachment som inneholder detaljer for vedlegg i forsendelsen |
| Signatures                            | Objekt av typen Signature som inneholder signeringsdetaljer for forsendelsen |
| IsUserDelegationLocked                | Setter hvorvidt et brukerstyrt signeringssteg skal være låst (true) eller ikke (false). Kun betydning hvis avsender har tilstand som ”Trusted partner”.                    |
| UserDefinedNumberOfSignaturesRequired | Setter hvor mange brukerstyrte signeringer det må være i et eventuelt brukerstyrt signeringssteg for dette skjemasettet     | | Users   | Liste med objekt av typen DelegatedUserBE som kan signere et eventuelt brukerstyrt signeringssteg  |
| EncryptedKey                          | Objekt av typen EncryptedKeyBE som inneholder informasjon brukt for dekryptering av sensitive felter.                                                                      |
| CaseID                                | ID til samhandlingstjenesten som innsendingen eventuelt skal knyttes til   |
|**FormTask**                              |    |
| ServiceCode                           | Unik tjenestekode for tjenesten. For å sende skjema inn i AltinnI må dette feltet være tomt.                                                                               |
| ServiceEdition                        | Tjenesteutgavekode. For å sende skjema inn i AltinnI må dette feltet være tomt.                                                                                            |
| Forms                                 | Liste med Form-objekter (ett for hvert skjema i oppgavesettet) |
|**Attachment**                            |    |
| Name                                  | Navn på vedlegg (som det vises i portal).                                                                                                                                  |
| EndUserSystemReference                | Referanse for vedlegg (settes av sluttbrukersystem, bør være unik).                                                                                                        |
| ParentReference                       | Angir EndUserSystemReference for skjemaet som vedlegget hører til.                                                                                                         |
| FileName                              | Filnavn for vedlegget.                                                                                                                                                     |
| Encrypted                             | Angir om vedlegget er kryptert.                                                                                                                                            |
| AttachementData                       | Selve dataene for vedlegget, byte-array.                                                                                                                                   |
| AttachmentTypeName                    | Angir type vedlegg for tjenester som har vedleggsvalidering og –regler |
|**Signature**                             |                                                                                                                                                                            |
| EndUserSystemReference                | Referanse til signaturen som ble utført i sluttbrukersystem (satt av sluttbrukersystem, bør være unik).                                                                    |
| EndUserSystemUserId                   | Identifikator for bruker som var logget på sluttbrukersystemet og gjennomførte signeringen.                                                                                |
| EndUserSystemLoginDateTime            | Dato og tidspunkt for når bruker logget inn i sluttbrukersystem (yyyy-MM-ddThh:mm:ss).                                                                                     |
| EndUserSystemSignatureDateTime        | Dato og tidspunkt for når signeringen i sluttbrukersystemet ble gjort (yyyy-MM-ddThh:mm:ss).                                                                               |
| EndUserSystemVersion                  | Versjonsnummer for sluttbrukersystemet.                                                                                                                                    |
| EndUserSystemSignatureLogId           | Unik id for logginnslag for signeringen.        |
| **Form**                                  |                                                                                                                                                                            |
| Completed                             | Dette flagget indikerer at et skjema er sendt inn komplett fra et sluttbrukersystem.                                                                                       |
| DataFormatId                          | Den unike id for et spesifikt skjema, dette er typisk gitt av metadata leverandør                                                                                          |
| DataFormatVersion                     | Versjonen av en gitt DataFormatID, som sammen med den gir et unikt skjema (spesifikasjon)                                                                                  |
| EndUserSystemReference                | Referanse for skjema, satt av sluttbrukersystemet. Kan benyttes til å spørre etter kvittering på skjema ved å benytte ReferenceTypeName.SendersReference.                  |
| FormData                              | Skjemadata. Må legges i en CDATA blokk.   |
|**DelegatedUserBE**                       |     |
| SSN                                   | Fødselsnummer for bruker som skal signere.                                                                                                                                 |
| Name                                  | Og etternavn til bruker som skal signere |
| NumberOfSignaturesAllowed             | Antall signaturer denne kan gjøre |
|**EncryptedKeyBE**                        |                                     |
| ReporteeSymmetricKey                  | Objekt av typen ReporteeSymmetricKeyBE.                                                                                                                                    |
| ServiceOwnerSymmetricKeys             | Objekt av typen ServiceOwnerSymmetricKeyBE. |
| **ReporteeSymmetricKeyBE **               |                            |
| Key                                   | Symmetrisk nøkkel brukt til å kryptere sensitive felter, kryptert med brukers passord.                                                                                     |
| ReporteeNumber                        | Fødselsnummer eller organisasjonsnummer for avgiver |
| **ServiceOwnerSymmetricKeyBE**            |         |
| ServiceOwnerCode                      | Tjenesteeierkode                                                                                                                                                           |
| CertificateId                         | Unik identifikator for sertifikatet brukt til å kryptere den symmetriske nøkkelen angitt i parameteren Key under.                                                          |
| Key                                   | Symmetrisk nøkkel brukt til å kryptere sensitive felter, kryptert med tjenesteeiers sertifikat. |
| **ReceiptExternalBE**                     |     |
| ReceiptId                             | Unik identifikator kvitteringen i Altinn. Benyttes for eksempel for senere uthenting av status/kvittering.                                                                 |
| ReceiptText                           | Tekst i kvitteringen.                                                                                                                                                      |
| ReceiptHistory                        | Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken,                                                         |
| LastChanged                           | Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss).                                                                                              |
|ReceiptTypeName|
| ReceiptTypeName | Angir hva kvittering gjelder. Mulige verdier: FormTask - Skjemasett, Correspondence - Melding, PINCODE - PIN-koder, Subscription - Abonnement, Outbound - Forsendelse sendt fra Altinn, PreFill - Preutfyllingsdata, RegisterDLS - DLS registerdata, RegisterDSF - DSF registerdata, RegisterER - ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp - Innsynstjeneste|
| ReceiptStatusCode                 | Status for forsendelse som kvitteringen gjelder: OK, UnExpectedError, ValidationFailed, Rejected        |
| ParentReceiptId | Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering). |
| References      | Liste med ReferenceBE-objekter for kvitteringen. |
| SubReceipts     | Liste med tilhørende ReceiptExternalBE-objekter (dersom denne kvitteringen er en hovedkvittering)|
|** ReferenceBE**     | |
| ReferenceValue  | Selve referansen (verdien) satt på kvitteringen. Typisk forsendelsesreferansen|
| ReferenceTypeName                 | Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Benyttes ikke, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReferenc - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, ArchiveReference - Arkivreferanse|

IntermediaryInbound.CompleteAndSign
----------------

Denne operasjonen lar et sluttbrukersystem komplettere og signere en skjemainnsending i Altinn. Operasjonen returnerer en kvittering til sluttbrukersystemet som inneholder status for innsendingen.

Operasjonen er ment å kunne brukes for å sluttføre skjemainstanser som ligger til utfylling. For eksempel kan dette være instanser som er opprettet i portal eller vha SubmitFormTask, og som har fått lagt til ytterligere vedlegg vha SubmitAttachmentStreamed.

| Input             | Beskrivelse        |
|-------------------|------------|
| userSSN           | Brukers fødselsnummer. Til bruk både til autentisering og evt. signering       |
| userPassword      | Brukers passord. Til bruk både til autentisering og evt. signering             |
| userPinCode       | Pinkode. Til bruk både til autentisering og evt. signering                     |
| authMethod        | Autentiseringsmetode. Til bruk både til autentisering og evt. signering        |
| reporteeElementId | Arbeidsflytreferanse som skal kompletteres og signeres.                        |
| signatures        | Liste med objekter av typen Signature som brukes til signering.                |
| languageId        | Språkkode:1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk                 |
| **Returverdi**        | **Beskrivelse**                                                            |
| Receipt           | Objekt av typen ReceiptExternalBE med kvitteringsinformasjon for forsendelsen. |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property          | Beskrivelse     |
|-------------------|-----------------|
| **ReceiptSearchExternalBE** | |
| ReceiptId                   | Unik identifikator kvitteringen i Altinn. Benyttes for eksempel ved senere oppdatering av kvittering|
| References                  | Liste med ReferenceBE-objekter for kvitteringen|
| **ReceiptExternalBE**     |  |
| ReceiptId                   | Unik identifikator kvitteringen i Altinn. Benyttes for eksempel ved senere oppdatering av kvittering. |
| ReceiptText                       | Tekst i kvitteringen, kan inneholde variasjoner over følgende kvitteringssvar: Deleted, Warning - "soft error", Error - "feil", Successfully Instantiated, Schema Validation OK, Not A Valid Signature, Form Validation Failed, SchemaValidationError>"feil"</SchemaValidationError>, Shipment Already Exists : ::External Shipment Reference : "extshipref", Service Edition Code is Missing  ::External Shipment Reference : "extshipref", SignAndSend Completed Successfully, Not A Valid Service :; ServiceCode : "service code", ServiceEdition : "serviceedition" ; ::External Shipment Reference : "external shipment ref", Not A Valid DataFormatId Or DataFormatVersion; DataFormatVersion : "dataformatversion", DataFormatId : "dataformatid" ; ::External Shipment Reference : "external shipment ref", Argument Null Exception - Intermediary Inbound :ExternalShipmentReference, Invalid reportee, Your request suffered from a non-functional error, There exist no valid services with given service code/ edition code :"service code"/"serviceedition" ::External Shipment Reference : "external shipment ref"|
| ReceiptHistory                    | Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken |
| LastChanged                       | Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)        |
| ReceiptTypeName                   | Angir hva kvittering gjelder. Mulige verdier: FormTask - Skjemasett, Correspondence - Melding, PINCODE - PIN-koder, Subscription - Abonnement, Outbound - Forsendelse sendt fra Altinn, PreFill - Preutfyllingsdata, RegisterDLS - DLS registerdata, RegisterDSF - DSF registerdata, RegisterER - ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp - Innsynstjeneste |
| ReceiptTemplate                   | Status for forsendelse som kvitteringen gjelder: OK, UnExpectedError, ValidationFailed, Rejected |
| ParentReceiptId                   | Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering) |
| References                        | Liste med ReferenceBE-objekter for kvitteringen    |
| SubReceipts                       | Liste med tilhørende Receipt-objekter (dersom denne kvitteringen er en hovedkvittering)      |
| **ReferenceBE**                   | |
| ReferenceValue                    | Selve referansen (verdien) satt på kvitteringen. Typisk forsendelsesreferansen  |
| ReferenceTypeName                 | Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Benyttes ikke, SendersReference - referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen (Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen), OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse (Settes av Altinn og kan ikke endres), ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, ArchiveReference - Arkivreferanse  |
| **Signature**                     ||
| EndUserSystemReference         | Referanse til signaturen som ble utført i sluttbrukersystem (satt av sluttbrukersystem, bør være unik) |
| EndUserSystemUserId            | Identifikator for bruker som var logget på sluttbrukersystemet og gjennomførte signeringen.             |
| EndUserSystemLoginDateTime     | Dato og tidspunkt for når bruker logget inn i sluttbrukersystem (yyyy-MM-ddThh:mm:ss).                  |
| EndUserSystemSignatureDateTime | Dato og tidspunkt for når signeringen i sluttbrukersystemet ble gjort (yyyy-MM-ddThh:mm:ss).            |
| EndUserSystemVersion           | Versjonsnummer for sluttbrukersystemet.                                                                 |
| EndUserSystemSignatureLogId    | Unik id for logginnslag for signeringen.                                                                |

IntermediaryInboundStreamed
---------------------------

| Tjenesteoperasjon        | Kort beskrivelse   |
|--------------------------|----------------------|
| SubmitAttachmentStreamed | Legger til vedlegg til eksisterende innsendinger som står til utfylling i Altinn. |

Operasjonen brukes til å legge til vedlegg for en aktiv skjemainstans opprettet i portal eller vha webservice (SubmitFormTask).

Tabellen under beskriver datakontrakten for operasjonen.

| Input                           | Beskrivelse     |
|---------------------------------|----|
| StreamedAttachmentBasicBE, StreamedAttachmentECBE eller StreamedAttachmentExternalBE | Objekt med vedleggsinformasjon, datastrøm for vedleggsdata og autentiseringsinformasjon (mindre forskjeller etter hvilket endepunkt man benytter). |
| **Returverdi**                      | **Beskrivelse**                                                                                                                                        |
| ReceiptExternalStreamedBE       | Objekt av typen ReceiptExternalStreamedBE som inneholder detaljer for kvitteringen.                                                                |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

 | Property                     | Beskrivelse  |
|------------------------------|---------------------|
| **ReceiptExternalStreamedBE**    |                                                                                                                                                                      |
| ReceiptId                    | Unik identifikator kvitteringen i Altinn. Benyttes for eksempel ved senere oppdatering av kvittering.                                                                |
| ReceiptText                  | Tekst i kvitteringen, kan inneholde variasjoner over følgende kvitteringssvar: Deleted                                                                                          |
| ReceiptHistory               | Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken                                                  |
| LastChanged                  | Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss).                                                                                        |
| ReceiptTypeName              | Angir hva kvittering gjelder. Mulige verdier: Angir hva kvittering gjelder. Mulige verdier: FormTask - Skjemasett, Correspondence - Melding, PINCODE - PIN-koder, Subscription - Abonnement, Outbound - Forsendelse sendt fra Altinn, PreFill - Preutfyllingsdata, RegisterDLS - DLS registerdata, RegisterDSF - DSF registerdata, RegisterER - ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp - Innsynstjeneste |
| ReceiptStatusCode            | Status for forsendelse som kvitteringen gjelder: Status for forsendelse som kvitteringen gjelder: OK, UnExpectedError, ValidationFailed, Rejected |
| ParentReceiptId              | Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering). |
| **StreamedAttachmentExternalBE** |                                                                                                                                                                      |
| userSSN                      | Brukers fødselsnummer. Til bruk både til autentisering og evt. signering                                                                                             |
| userPassword                 | Brukers passord. Til bruk både til autentisering og evt. signering                                                                                                   |
| authMethod                   | Autentiseringsmetode. Til bruk både til autentisering og evt. signering                                                                                              |
| userPinCode                  | Pinkode. Til bruk både til autentisering og evt. signering                                                                                                           |
| ReporteeElementId            | Arbeidsflytreferanse for innsendingen man ønsker å legge til vedlegg på.                                                                                             |
| EndUserSystemReference       | Referanse for vedlegg (settes av sluttbrukersystem, bør være unik).                                                                                                  |
| FileName                     | Filnavn                                                                                                                                                              |
| Name                         | Navn på vedlegg                                                                                                                                                      |
| AttachmentTypeName           | Type vedlegg                                                                                                                                                         |
| CheckSum                     | Checksum for vedleggsdata                                                                                                                                            |
| dataStream                   | Datastrøm |
| **StreamedAttachmentBasicBE**    |       |
| systemPassword               | Passord for sluttbrukersystem definert i portal                                                                                                                      |
| systemUserName               | Systemid for sluttbrukersystem definert i portal                                                                                                                     |
| userSSN                      | Brukers fødselsnummer. Til bruk både til autentisering og evt. signering                                                                                             |
| userPassword                 | Brukers passord. Til bruk både til autentisering og evt. signering                                                                                                   |
| ReporteeElementId            | Arbeidsflytreferanse for innsendingen man ønsker å legge til vedlegg på.                                                                                             |
| EndUserSystemReference       | Referanse for vedlegg (settes av sluttbrukersystem, bør være unik).                                                                                                  |
| FileName                     | Filnavn                                                                                                                                                              |
| Name                         | Navn på vedlegg                                                                                                                                                      |
| AttachmentTypeName           | Type vedlegg                                                                                                                                                         |
| CheckSum                     | Checksum for vedleggsdata                                                                                                                                            |
| dataStream                   | Datastrøm  |
| **StreamedAttachmentECBE**       |                                                                                                                                                                      |
| userName                     | Brukernavn opprettet i portal i forbindelse med virksomhetssertifikat                                                                                                |
| password                     | Passord opprettet i portal i forbindelse med virksomhetssertifikat                                                                                                   |
| ReporteeElementId            | Arbeidsflytreferanse for innsendingen man ønsker å legge til vedlegg på.                                                                                             |
| EndUserSystemReference       | Referanse for vedlegg (settes av sluttbrukersystem, bør være unik).                                                                                                  |
| FileName                     | Filnavn                                                                                                                                                              |
| Name                         | Navn på vedlegg                                                                                                                                                      |
| AttachmentTypeName           | Type vedlegg                                                                                                                                                         |
| CheckSum                     | Checksum for vedleggsdata                                                                                                                                            |
| dataStream                   | Datastrøm                                                                                                                                                            |

Receipt
-------

| Tjenesteoperasjon | Kort beskrivelse          |
|-------------------|---------------------------|
| GetReceiptListV2  | Henter ut alle kvitteringer tilhørende en kvitteringstype og/eller fra et gitt tidsrom |
| GetReceiptV2      | Henter ut en kvittering basert på enten unik identifikator eller referanse             |
| UpdateReceipt     | Kan benyttes av sluttbrukersystemer for å oppdatere en kvittering ved mottak av data.  |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

Det blir opprettet teknisk kvittering for hver forsendelse, basert på hvilke referanser sluttbrukersystemet setter. Dersom eksterne referanser gjenbrukes antar vi at det gjelder den samme forsendelsen, og oppdaterer tidligere kvittering. For at kvitteringer skal kunne hentes og oppdateres hensiktsmessig er det derfor viktig at sluttbrukersystem benytter unike referanser både på selve forsendelsen og underelementer av denne.

GetReceiptV2
----------------

Denne operasjonen henter en kvittering basert på, enten unik identifikator for kvitteringen eller en referanse for kvitteringen. Kvitteringen kan være knyttet til et skjemasett innsendt via Altinn fra sluttbruker eller sluttbrukersystem, data sendt fra tjenesteeier til Altinn (meldinger, PIN-koder, abonnement eller prefilldata) eller data sendt fra Altinn til tjenesteeier.

Navnet på operasjonen kan variere noe fra grensesnitt til grensesnitt. Operasjonen heter for eksempel GetReceiptBasicV2 på basic (SOAP 1.1) grensesnittet. En eldre versjon av operasjonen med navn GetReceipt finnes fortsatt, men kan i fremtiden bli fjernet.

Tabellen under beskriver datakontrakten for operasjonen:

| Input          | Beskrivelse                                                                                                    |
|----------------|-----------------------------------------|---|
| ReceiptSearch  | Objekt av typen ReceiptSearch som inneholder nødvendige søkeparametre for å hente ut en kvittering.            |
| **Returverdi** | **Beskrivelse**                                                                                                |
| Receipt        | Objekt av typen Receipt som inneholder alle data for en kvittering som tilfredsstilte det gitte søkekriteriet. |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property        | Beskrivelse                      |
|-----------------|----------------------------------------------|
|**ReceiptSearch**   |      |
| ReceiptId       | Unik identifikator en kvittering i Altinn.                                        |
| References      | Liste med referansen som skal brukes i søket. I praksis er det kun en referanse som benyttes i søket. Følgende referansetyper kan benyttes i søk: ArchiveReference, OutboundShipmentReference, BatchReference, EndUserSystemReference, ExternalShipmentReference, SendersReference|
| **Receipt**         |                                         |
| ReceiptId       | Unik identifikator kvitteringen i Altinn      |
| ReceiptText     | Tekst i kvitteringen        |
| ReceiptHistory  | Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken                                                                           |
| LastChanged     | Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss).                                                                                                                      |
| ReceiptType     | Angir hva kvittering gjelder.Mulige verdier: NotSet – Brukes når type er ukjent, FormTask – Skjemasett innsending, Correspondence – Innlesning av meldinger, PINCODE – Bestilling av PIN-koder, Subscription – Innelsning av abonnementer, Outbound – Forsendelse sendt fra Altinn, PreFill – Innlesning av prefill, RegisterDLS – DLS registerdata, RegisterDSF – DSF registerdata, RegisterER – ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp – Innsynstjeneste, RegisterDSFStreetAdd, RegisterDSFPropertyAdd, BrokerService – Overføring av fil på en Formidlingstjeneste |
| ReceiptTemplate | Angir malen (XML) som skal benyttes for kvittering. (IKKE I BRUK)    |
| ReceiptStatus   | Status for forsendelse som kvitteringen gjelder:NotSet – Status er ukjent, OK, UnExpectedError, ValidationFailed, Rejected |
| ParentReceiptId | Dersom denne kvitteringen er en av flere kvitteringer i et hierarki vil ParentReceiptId vise til ReceiptId for hovedkvitteringen i hierarkiet.                                                     |
| References      | Liste med referanser  |
| SubReceipts     | Liste med tilhørende kvitteringer. Dersom denne kvitteringen er en hovedkvittering med barn. Et hierarki kan ha kun 2 nivåer. (En kvittering som selv er et barn skal ikke ha barn.)               |
|**Reference**       |          |
| ReferenceType   | Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Referanse satt av avsender for del av en forsendelse. For eksempel vedlegg. Brukes sjeldent da referanser fra sluttbruker ofte lagres som SendersReference, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, ReceiversReference- Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, ArchiveReference - Arkivreferanse|
| ReferenceValue  | Selve referansen (verdien). Vil variere basert på type referanse. Se over.  |

Tabellen under angir mulige feilkoder for operasjonen:

|**Feilkode** |  **Beskrivelse**|
|-------------|-----|
| 30008       |   Ingen kvittering funnet for angitt kvitterings ID eller referanse|

GetReceiptListV2
----------------

Denne operasjonen kan kalles for å hente ut alle kvitteringer av en gitt kvitteringstype. I tillegg kan søket begrenses ved hjelp av en til og fra dato. Dette vil gi en liste med kvitteringer som ble sist endret i tidsrommet. Kvitteringstyper er obligatorisk, mens datoer er valgfritt.

Navnet på operasjonen kan variere noe fra grensesnitt til grensesnitt. Operasjonen heter for eksempel GetReceiptListBasicV2 på basic (SOAP 1.1) grensesnittet. En eldre versjon av operasjonen med navn GetReceiptList finnes fortsatt, men kan i fremtiden bli fjernet.

Tabellen under beskriver datakontrakten for operasjonen:

| Input           | Beskrivelse  |
|-----------------|-------------|
| receiptTypeName | Angir hva kvittering gjelder. Mulige verdier: NotSet – Brukes når type er ukjent,  FormTask – Skjemasett innsending,  Correspondence – Innlesning av meldinger,  PINCODE – Bestilling av PIN-koder, Subscription – Innelsning av abonnementer, Outbound – Forsendelse sendt fra Altinn,  PreFill – Innlesning av prefill,  RegisterDLS – DLS registerdata, RegisterDSF – DSF registerdata, RegisterER – ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp – Innsynstjeneste, RegisterDSFStreetAdd, RegisterDSFPropertyAdd, BrokerService – Overføring av fil på en Formidlingstjeneste |
| dateFrom        | Finner kvitteringer endret etter angitt dato |
| dateTo          | Finner kvitteringer endret før angitt dato|
|**Returverdi**      | **Beskrivelse** |
| ReceiptList     | Liste med kvitteringer av typen Receipt. (Vil være en tom liste hvis ingen kvitteringer ble funnet.) |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property        | Beskrivelse             |
|-----------------|-----------------------------------------------------------|
| Receipt         |               |
| ReceiptId       | Unik identifikator kvitteringen i Altinn         |
| ReceiptText     | Tekst i kvitteringen                       |
| ReceiptHistory  | Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken.                                                                   |
| LastChanged     | Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)    |
| ReceiptType     | Angir hva kvittering gjelder. Mulige verdier:NotSet – Brukes når type er ukjent, FormTask – Skjemasett innsending, Correspondence – Innlesning av meldinger, PINCODE – Bestilling av PIN-koder, Subscription – Innelsning av abonnementer, Outbound – Forsendelse sendt fra Altinn, PreFill – Innlesning av prefill, RegisterDLS – DLS registerdata, RegisterDSF – DSF registerdata, RegisterER – ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp – Innsynstjeneste, RegisterDSFStreetAdd, RegisterDSFPropertyAdd, BrokerService – Overføring av fil på en Formidlingstjeneste   |
| ReceiptTemplate | Angir malen (XML) som skal benyttes for kvittering. (IKKE I BRUK)    |
| ReceiptStatus   | Status for forsendelse som kvitteringen gjelder: NotSet – Status er ukjent, OK, UnExpectedError, ValidationFailed, Rejected |
| ParentReceiptId | Dersom denne kvitteringen er en av flere kvitteringer i et hierarki vil ParentReceiptId vise til ReceiptId for hovedkvitteringen i hierarkiet.                                       |
| References      | Liste med referanser.                                          |
| SubReceipts     | Liste med tilhørende kvitteringer. Dersom denne kvitteringen er en hovedkvittering med barn. Et hierarki kan ha kun 2 nivåer. (En kvittering som selv er et barn skal ikke ha barn.) |
| **Reference**   |                                          |
| ReferenceType   | Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Referanse satt av avsender for del av en forsendelse. For eksempel vedlegg. Brukes sjeldent da referanser fra sluttbruker ofte lagres som SendersReference, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, ArchiveReference - Arkivreferanse    |
| ReferenceValue  | Selve referansen (verdien). Vil variere basert på type referanse. Se over  |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse                                                                                                                        |
|----------|------------------------------------------------------------------------------------------------------------------------------------|
| 30101    | Kan ikke utføre et søk etter kvitteringer av typen NotSet. (NotSet er default verdi hvis receiptTypeName parameteret ikke oppgis.) |
| 30102    | Oppgitt fra dato er høyere en oppgitt til dato     |

UpdateReceipt
----------------

Operasjonen UpdateReceipt kan benyttes når tjenesteeier har behov for å oppdatere en kvittering i Altinn. Dette gjøres typisk når Altinn har sendt en batch forsendelse til tjenesteeier. Kvitteringen skal da oppdateres med at tjenesteeier har mottatt batch forsendelsen.

Altinn vil endre kvitteringsteksten til å inneholde informasjon om hvem som utførte oppdateringen. For eksempel: "Receipt updated by EndUserSystem: 355. &lt;ny tekst.&gt;"

Navnet på operasjonen kan variere noe fra grensesnitt til grensesnitt. Operasjonen heter for eksempel UpdateReceiptBasic på basic (SOAP 1.1) grensesnittet. En eldre versjon av operasjonen med navn SaveReceipt
finnes fortsatt, men kan i fremtiden bli fjernet.

Tabellen under beskriver datakontrakten for operasjonen:

| Input          | Beskrivelse  |
|----------------|----------------|
| ReceiptSave    | Informasjon om hvilken kvittering som skal oppdateres samt den nye informasjonen som skal legges på kvitteringen. Objektet må minimun inneholde ny statuskode og tekst. ReceiptId eller ArchiveReference brukes til å identifisere kvitteringen. |
| **Returverdi** | **Beskrivelse**   |
| Receipt        | Kvitteringen slik den frermstår etter oppdateringen|

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property           | Beskrivelse |
|------------------------|----------------------|
| **ReceiptSave**     | |
| ReceiptId                                                                                       | Unik identifikator for kvittering i Altinn. Kan benyttes for å spesifisere hvilken kvittering som skal oppdateres|
| ArchiveReference                                                                                | Arkivreferanse i Altinn. Kan benyttes for å spesifisere hvilken kvittering som skal oppdateres. Hvis det finnes flere kvitteringer som har samme arkivreferanse, så vil den nyeste (den med høyest ReceiptId) bli valgt.          |
| ReceiptText                                                                                     | Oppdateringstekst for kvittering. Obligatorisk |
| ReceiptStatus          |Status for forsendelse som kvitteringen gjelder.Obligatorisk: OK, UnExpectedError, ValidationFailed, Rejected |
| References   | Liste med referanser man eventuelt ønsker å legge til på kvitteringen. Alle referansetyper utenom NotSet og OwnerPartyReference er gyldige, men det bør begrenses til følgende (Unntak kan gjøres etter avtale med forvaltning.) |
| SubReceipts     | Liste med barnekvitteringer som også ønskes oppdatert i tillegg til hovedkvitteringen. Barne kvitteringer MÅ identifiseres med ReceiptId. Dette kan ikke benyttes til å lage nye barnekvitteringer   |
| **Receipt**             |  |
| ReceiptId      | Unik identifikator kvitteringen i Altinn.  |
| ReceiptText  | Tekst i kvitteringen |
| ReceiptHistory      | Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken|
| LastChanged  | Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)  |
| ReceiptType  | Angir hva kvittering gjelder. Mulige verdier: NotSet – Brukes når type er ukjent, FormTask – Skjemasett innsending, Correspondence – Innlesning av meldinger, PINCODE – Bestilling av PIN-koder, Subscription – Innelsning av abonnementer, Outbound – Forsendelse sendt fra Altinn, PreFill – Innlesning av prefill, RegisterDLS – DLS registerdata, RegisterDSF – DSF registerdata, RegisterER – ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp – Innsynstjeneste, RegisterDSFStreetAdd, RegisterDSFPropertyAdd, BrokerService – Overføring av fil på en Formidlingstjeneste  |
| ReceiptTemplate     | Angir malen (XML) som skal benyttes for kvittering. (IKKE I BRUK) |
| ReceiptStatus    | Status for forsendelse som kvitteringen gjelder: NotSet – Status er ukjent, OK, UnExpectedError, ValidationFailed, Rejected    |
| ParentReceiptId         | Dersom denne kvitteringen er en av flere kvitteringer i et hierarki vil ParentReceiptId vise til ReceiptId for hovedkvitteringen i hierarkiet |
| References    | Liste med referanser|
| SubReceipts             | Liste med tilhørende kvitteringer. Dersom denne kvitteringen er en hovedkvittering med barn. Et hierarki kan ha kun 2 nivåer. (En kvittering som selv er et barn skal ikke ha barn.)     |
| **Reference**         |     |
| ReferenceType     | Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Referanse satt av avsender for del av en forsendelse. For eksempel vedlegg. Brukes sjeldent da referanser fra sluttbruker ofte lagres som SendersReference, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, ReceiversReference- Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference - Organisasjonsnummer eller personnummer til eier av kvitteringen, typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, ArchiveReference - Arkivreferanse    |
| ReferenceValue       | Selve referansen (verdien). Vil variere basert på type referanse. Se over |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse    |
|----------|------------------------|
| 30008    | Fant ikke noen kvittering som kunne oppdateres        |
| 0        | Kan ikke ha både kvitterings id og arkivreferanse som input. (Feilkode blir ikke angitt grunnet en feil.)            |
| 0        | Søk må ha enten kvitterings id eller arkivreferanse som input. (Feilkode blir ikke angitt grunnet en feil.)          |
| 0        | System/bruker har ikke tilgang til kvitteringen som forsøkes oppdatert. (Feilkode blir ikke angitt grunnet en feil.) |

Correspondence
--------------

| Tjenesteoperasjon                      | Kort beskrivelse                                                |
|----------------------------------------|-----------------------------------------------------------------|
| GetCorrespondenceForEndUserSystemV2    | Benyttes for å hente detaljer for en spesifikk melding i Altinn |
| DeleteCorrespondence                   | Benyttes for å slette en melding i Altinn                       |
| SaveCorrespondenceConfirmation         | Benyttes for å bekrefte en melding i Altinn                     |
| ArchiveCorrespondenceFromEndUserSystem | Benyttes for å arkivere en melding i Altinn                     |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

Correspondence.GetCorrespondenceForEndUserSystemV2
----------------

Denne operasjonen benyttes for å hente detaljer for en spesifikk melding fra Altinn. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen.

| Input        | Beskrivelse            |
|--------------------------------------|------|
| userSSN     | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres        |
| userPassword    | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn     |
| userPinCode  | Pinkode for valgt engangskodetype (authMethod)     |
| authMethod   | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er:AltinnPin, TaxPin, SMSPin |
| correspondenceID | Unik identifikator for en melding i Altinn |
| LanguageID  | Språkkode for det språket meldingen skal hentes med. Språk id: 1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk, Hvis ikke språk er spesifikt kan 0 angis som vil returnere standard språk for denne meldingen | |
| **Returverdi** | **Beskrivelse**      |
| correspondenceForEndUserSystem   | Et objekt av typen CorrespondenceForEndUserSystemBEV2 som inneholder alle detaljer om meldingen                                                 |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                           | Beskrivelse   |
|---------------------------|----------------------------------------|
| **CorrespondenceForEndUserSystemBEV2** |   |
| Correspondence                     | Objekt av typen CorrespondenceBEV2 som inneholder alle detaljer for selve meldingen.                    |
| CorrespondenceLinkList             | Liste med objekter av typen CorrespondenceLinkBE, som inneholder eventuelle linker for meldingen.       |
| AttachmentList                     | Liste med objekter av typen AttachmentBE, som inneholder detaljer for eventuelle vedlegg for meldingen. |
| InternalNotificationList           | Liste med InternalNotification-objekter, som inneholder detaljer for eventuelle varsler for meldinger.  |
| **CorrespondenceBEV2**                 |       |
| CorrespondenceID                   | Unik identifikator for meldingen    |
| CorrespondenceStatus              | Angir status for meldingen (CorrespondenceStautsTypeV2): Created-Meldingen er opprettet, Read-Meldingen er lest, Replied-Sluttbruker har svart på meldingen, ChangedByGovAgency-Tjenesteeier har gjort endringer på meldingen, ChangedByUser-Sluttbruker har gjort endringer på meldingen, Confirmed-Meldingen er bekreftet, DeletedByUser-Meldingen er slettet av sluttbruker, DeletedByAltinn-Altinn har slettet meldingen (for eksempel ved sanering), Archived-Meldingen er arkivert |
| ArchiveReference                  | Unik referanse for melding i Altinn arkiv      |
| LanguageID                        | Språk id: 1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk |
| CorrespondenceSummary             | Meldingsingress                   |
| CorrespondenceSummary   | Meldingsingress     |
| CorrespondenceTxt       | Tekst i meldingen |
| Header                  | Meldings tittel / hode  |
| SentBy                  | Angir avsender av melding |
| CorrespondenceSubject   | Angir emne for meldingen    |
| IsConfirmationNeeded    | Angir om bruker må bekrefte melding|
| SentTo                  | Navn på mottaker av melding   |
| DateSent                | Angir dato og tidspunkt for når meldingen var sendt (yyyy-MM-ddThh:mm:ss) |
| DueDate                 | Dersom meldingen har en frist angis dato for dette her (yyyy-MM-dd)|
| Reportee                | Unik identifikator i Altinn for mottaker av melding|
| AuthenticatedUser       | Angir bruker som har bekreftet melding   |
| ConfirmationDate        | Angir dato for når meldingen ble bekreftet (yyyy-MM-ddThh:mm:ss) |
| UserID                  | Angir bruker som har bekreftet melding  |
| Description             | Navn på tjenesteeier som opprettet meldingen   |
| CorrespondenceName      | Navn på meldingstjenesten     |
| ExternalSystemReference | Angir unik referanse for meldingen (satt av tjenesteeier)  |
| CorrespondenceTitle     | Tittel på melding    |
| CustomMessageData       | Felt for attributter spesifikke for den gitte Altinn tjeneste. For eksempel informasjon om kommunenummer på selvangivelsen. Bruk av spesifikke attributter avtales spesielt for de(n) aktuelle Altinn-tjenesten(e) |
| AllowForwarding         | Angir om meldingen kan videresendes eller ikke|
| CaseID                  | Angir samhandlingstjeneste case ID om meldingen er tilknyttet en samhandlingstjeneste    |
| **CorrespondenceLinkBE**    |    |
| LinkType                          | Angir hvilken type informasjon linken gir: Form, ServiceCode, ServiceURL, ArchiveReference|
| LinkURL          | Angir URL                                                               |
| LinkText         | Angir teksten som vises for linken                                      |
| AttachmentBEV2   |                                                                         |
| AttachmentID     | Unik identifikator for vedlegget i Altinn.                              |
| AttachmentName   | Navn på vedlegget                                                       |
| FileName         | Navn på fil for vedlegg                                                 |
| AttachmentData   | Innholdet/dataene i vedlegget                                           |
| CreatedDateTime  | Dato og tidspunkt for når vedlegget ble opprettet (yyyy-MM-ddThh:mm:ss) |
| SendersReference | Unik referanse satt av etatssystem som har sendt vedlegget              |
| IsEncrypted      | Boolsk verdi som sier om vedlegget er kryptert                          |
| AttachmentTypeID                  | MIME-typen for vedlegget: |
| AttachmentFunctionTypeID          | Angir funksjon for vedlegget: Unspecified, Invoice  |
| ReporteeElementID      | Referanse til element (skjemasett eller melding) som vedlegget tilhører. Unik id i Altinn. |
| CreatedByUserID        | Bruker id for bruker som har lagt ved vedlegget.                                           |
| IsAddedAfterFormFillin | Angir om vedlegget er lagt til etter utfylling.                                            |
| IsAssociatedToFormSet  | Angir om vedlegget er knyttet til skjemasett eller ikke                      |
| DestinationType                   | Angir hvor vedlegget er tilgjengelig: Default/ShowToAll – tilgjengelig i portal og for sluttbrukersystem, PortalOnly – kun tilgjengelig fra portal, EndUserSystemOnly – kun tilgjengelig fra sluttbrukersystem |

Correspondence.DeleteCorrespondence
----------------

Denne operasjonen kan benyttes av sluttbrukersystemer for å slette en melding i Altinn. Det er kun meldinger for privatpersoner som kan slettes.

Tabellen under beskriver datakontrakten for operasjonen.

  | Input             | Beskrivelse          |
|-------------------|-----------------------------|
| userSSN           | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres   |
| userPassword      | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn  |
| userPinCode       | Pinkode for valgt engangskodetype (authMethod)   |
| authMethod        | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er:  AltinnPin, TaxPin, SMSPin |
| reporteeElementID | Unik identifikator for en melding i Altinn    |
| Returverdi        | Beskrivelse               |
| N/A               | Returnerer ingenting hvis alt er OK    |

Correspondence.SaveCorrespondenceConfirmation
----------------

Denne operasjonen kan benyttes av sluttbrukersystemer for å bekrefte en melding i Altinn.

Tabellen under beskriver datakontrakten for operasjonen.

| Input             | Beskrivelse                  |
|-------------------|------------|
| userSSN           | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres    |
| userPassword      | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn |
| userPinCode       | Pinkode for valgt engangskodetype (authMethod)      |
| authMethod        | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er:  AltinnPin, TaxPin, SMSPin |
| reporteeElementID | Unik identifikator for en melding i Altinn   |
| Returverdi        | Beskrivelse                |
| N/A               | Returnerer ingenting hvis alt er OK     |

Correspondence.ArchiveCorrespondenceFromEndUserSystem
----------------

Denne operasjonen kan benyttes av sluttbrukersystemer for å arkivere en melding i Altinn.

Tabellen under beskriver datakontrakten for operasjonen.

| Input             | Beskrivelse                  |
|-------------------|------------|
| userSSN           | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres    |
| userPassword      | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn |
| userPinCode       | Pinkode for valgt engangskodetype (authMethod)      |
| authMethod        | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er:  AltinnPin, TaxPin, SMSPin |
| reporteeElementID | Unik identifikator for en melding i Altinn   |
| Returverdi        | Beskrivelse                |
| Receipt           | Objekt av typen ReceiptBE med kvitteringsinformasjon for forsendelsen     |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property          | Beskrivelse        |
|-------------------|-----------------|
| **ReceiptBE**         |        |
| ReceiptId         | Unik identifikator kvitteringen i Altinn. Benyttes for eksempel for senere uthenting av status/kvittering.                                                           |
| ReceiptText       | Tekst i kvitteringen    |
| ReceiptHistory    | Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken,                                                   |
| LastChanged       | Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss) |
| ReceiptTypeName   | Angir hva kvittering gjelder. Mulige verdier: FormTask – Skjemasett innsending, Correspondence – Innlesning av meldinger, PINCODE – Bestilling av PIN-koder, Subscription – Innelsning av abonnementer, Outbound – Forsendelse sendt fra Altinn, PreFill – Innlesning av prefill, RegisterDLS – DLS registerdata, RegisterDSF – DSF registerdata, RegisterER – ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp – Innsynstjeneste |
| ReceiptTemplate   | Angir malen (XML) som skal benyttes for kvittering  |
| ReceiptStatusCode | Status for forsendelse som kvitteringen gjelder: OK, UnExpectedError, ValidationFailed, Rejected |
| ParentReceiptId   | Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering). |
| References        | Liste med ReferenceBE-objekter for kvitteringen |
| SubReceipts       | Liste med tilhørende Receipt-objekter (dersom denne kvitteringen er en hovedkvittering)  |
| **ReferenceBE**       |        |
| ReferenceValue    | Selve referansen (verdien) satt på kvitteringen. Typisk forsendelsesreferansen     |
| ReferenceTypeName | Angir type referanse: ExternalShipmentReference-Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference-Benyttes ikke, SendersReference-Referanse satt av avsender for del av en forsendelse, ParentReference-Referansen viser til et hovedskjema, WorkFlowReference-Arbeidsflytreferanse, BatchReference-Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference-Referanse til en forsendelse sendt fra Altinn, ReceiversReference-Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference-Referanse til eier av kvittering, fødselsnummer eller organisasjonsnummer, PartyReference-Referanse til aktør for kvittering, fødselsnummer eller organisasjonsnummer, ArchiveReference-Arkivreferanse   |

ReporteeElementList

| Tjenesteoperasjon                  | Kort beskrivelse                                           |
|------------------------------------|------------------------------------------------------------|
| GetReporteeElementListV2           | Henter en liste med elementer fra arbeidsliste og arkiv.   |
| DeleteReporteeElement              | Benyttes for å slette et element i arbeidsliste i Altinn   |
| GetFormSetElementsV2               | Henter ut et spesifikt skjemasett basert på en gitt ID     |
| GetCorrespondenceListForArchiveRef | Henter ut arkivert melding basert på bl.a. arkiv referanse |
| GetCorrespondenceListForReportee   | Henter ut meldinger for en gitt avgiver                    |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for
endepunkter kapittel 8.3 for informasjon om endepunkter for
tjenesteoperasjonene.

ReporteeElementList.DeleteReporteeElement
----------------

Denne operasjonen benyttes for å slette elementer i en avgivers arbeidsliste eller arkiv. GetReporteeReporteeElementList kalles gjerne i forkant av kall til denne tjenesten for å hente og identifisere et element og finne identifikator (reporteeElementCode) for det elementet man ønsker å slette.

Tabellen under beskriver datakontrakten for operasjonen.

  | Input               | Beskrivelse         |
|---------------------|----------------------|
| reporteeElementCode | Unik identifikator for et element i Altinn. Denne er sammensatt av et prefiks som beskriver hvilken type elementet har og elementets retporteeElementID. ulige prefiks for element typer: Altinn 1,  aktivt: A1E.  Altinn 1, arkivert: A1A. Altinn 2, aktivt:A2E.  Altinn 2, arkivert: A2A |
|**Returverdi**          |**Beskrivelse**         |
| Result              | Angir om elementet ble slettet    |

ReporteeElementList.GetFormSetElementsV2
----------------

Henter ut et spesifikt skjemasett basert på en gitt ID. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen.

| Input              | Beskrivelse     |
|--------------------|----------------------------------------------------------|
| reporteeElementID  | Identifikator for skjemasett man ønsker å hente ut    |
| languageID         | Språk id:  Språk id: 1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk|
| Returverdi         | Beskrivelse     |
| FormSetElementList | Liste med objekter av typen FormSetElementBEV2, som beskriver skjemaene i skjemasett man ønsker å hente ut. |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| **Property**                      | **Beskrivelse**                   |
|-----------------------------------|-----------------------------------|
| **FormSetElementBEV2**            |                      |
| IconFileName                      | MIME-typen           |
| ItemID                 |                                   |
| ItemName               |     |
| ItemURL                | URL for elementet.      |
| ItemType               | Angir type element: MainForm, SubForm, BinaryAttachment        |
| ValidationStatusType   | Angir valideringsstatus for elementet: NotSet, Valid, NonValid, NotValidated, NotApplicable     |
| CreatedByUserID        | Bruker id for bruker som har opprettet elementet  ||
| DestinationType        | Angir hvor vedlegget er tilgjengelig: Default/ShowToAll – tilgjengelig i portal og for sluttbrukersystem, PortalOnly – kun tilgjengelig fra portal, EndUserSystemOnly – kun tilgjengelig fra sluttbrukersystem  |
| IsAddedAfterFormFillin | Angir om vedlegget er lagt til etter utfylling  |
| IsAssociatedToFormSet  | Angir om vedlegget er knyttet til skjemasett eller ikke – brukes for å slette vedlegg som er lastet opp men ikke lagt til skjemasettet.                                            |
| IsSigningMandatory     | Angir om skjema krever signering eller ikke. Verdien her er kun gjeldende om signeringssteget sier at skjema selv bestemmer signering (IsSigningAllRequired satt til SET_PER_FORM) |

ReporteeElementList.GetReporteeElementListV2
----------------

Henter en liste med elementer fra arbeidsliste og arkiv. Listen inneholder detaljer for ett element for en avgiver. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen.

| Input               | Beskrivelse     |
|---------------------|---------------------------|
| userSSN             | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres        |
| userPassword        | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn       |
| userPinCode         | Pinkode for valgt engangskodetype (authMethod)         |
| authMethod          | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin |
| Search              | Objekt av typen ExternalSearchBEV2 som inneholder søkekriterier for utvalget elementer man ønsker å hente ut.          |
| languageID          | Språkkode på elementet som skal hentess ut. Språk id: 1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk, Hvis ikke språk er spesifikt kan 0 angis som vil returnere standard språk for denne meldingen    |
| **Returverdi**          | **Beskrivelse**         |
| reporteeElementList | En liste med ReporteeElementBEV2-objekter som inneholder detaljer for ett element for en avgiver                       |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property              | Beskrivelse     |
|-----------------------|----------------------------|
| ExternalSearchBEV2    |           |
| ToDate                | Startdato for perioden man ønsker å hente ut elementer for (yyyy-MM-dd).                                              |
| FromDate              | Sluttdato for perioden man ønsker å hente ut elementer for (yyyy-MM-dd).                                              |
| SearchName            | Navn på søk. Benyttes kun dersom dette er et lagret søk.                                                              |
| ToBeProcessed         | Boolsk verdi som, hvis satt til true, angir at man ønsker å filtrere på tjenester som er ufullstendige/ikke-komplett. |
| SearchString          | Fritekstsøk som kan brukes for å matche hele eller deler av tjenestenavnet på elementer man ønsker å hente ut.        |
| ServiceCodeList       | Liste med tjenester (string) som man ønsker å filtrere på.                                                            |
| SentAndArchived       | Boolsk verdi som, hvis satt til true, angir at man ønsker å filtrere på tjenester som er sendt og arkivert.           |
| ToBeProcessedByOthers | Filter for å angi at man bare ønsker å se sine elementer som i øyeblikket er til behandling hos andre aktører         |
| ServiceOwnerCode      | Tjenesteeier som man ønsker å filtrere utrekket på.                                                                   |
| Reportee              | Fødselsnummer/organisasjonsnummer for avgiver som man ønsker å hente ut elementer for.                                |
| ArchiveReference      | Fritekstfelt hvor man kan angi hele eller deler av en arkivreferanse som man ønsker å filtrere på.                    |
| CaseID                | Begrenser søket mot bestemt samhandlingstjenesteinstans.                                                              |
| CollectionPages       | Benyttes for å begrense resultatet til samlesider (samhandlingstjeneste)                                              |
| EDialogue             | Benyttes for å begrense resultatet til e-dialoger (samhandlingstjeneste)                                              |
| ReporteeElementBEV2   |                                                                                                                       |
| AllowDelete           | En boolsk verdi som angir om bruker som hentet elementet fra arkiv har rettighet til å slette elementet.              |
| AllowNewCopy          | Boolsk verdi som sier om man kan opprette kopi av elementet                                                           |
| Altinn1ArchiveUnitId                                                                      | Unik identifikator for elementet i arkivet dersom dette er et element som er arkivert i Altinn I. Behøver ikke settes. |
| Altinn1FormCode                                                                           | Angir skjema id i AltinnI. Behøver ikke settes                                                                         |
| Altinn1FormId                                                                             | Angir skjema versjon AltinnI. Behøver ikke settes                                                                      |
| Altinn1FormInstanceID                                                                     | Angir element id i AltinnI. Behøver ikke settes.                                                                       |
| Altinn1FormORNo                                                                           | Angir OR-id i AltinnI. Behøver ikke settes.                                                                            |
| Altinn1ParticipantID                                                                      | Angir unik id for tilhørende AltinnI bruker. Behøver ikke settes.                                                      |
| Altinn1ReferenceType                                                                      | Angir referansetype satt i AltinnI. Behøver ikke settes.                                                               |
| Altinn1WorkflowProcessId                                                                  | Arbeidsflytreferanse for elementet dersom elementet er arkivert i AltinnI. Behøver ikke settes.                        |
| ArchiveId   | Unik identifikator for elementet i arkiv.  ReporteeElementId, ArchiveId eller Altinn1ArchiveUnitId må settes, men bare en av gangen. |
| ArchiveReference                                                                          | Unik arkivreferanse som vises for elementet på avgivers hovedside.                                                     |
| CaseID         | Eventuelt referanse til samhandlingstjeneste elementet er knyttet opp mot  |
| CorrespondenceStatus    | Angir status for elementet (dersom elementet er av type meldingstjeneste). Mulige statuser er: Created - Meldingen er opprettet, Read - Meldingen er lest, Replied - Sluttbruker har svart på meldingen, ChangedByGovAgency - Tjenesteeier har gjort endringer på meldingen, ChangedByUser -Sluttbruker har gjort endringer på meldingen, Confirmed - Meldingen er bekreftet, DeletedByUser -Meldingen er slettet av sluttbruker, DeletedByAltinn - Altinn har slettet meldingen (for eksempel ved sanering), Archived - Meldingen er arkivert|
| DueDate                       | Frist på elementet. Ikke satt for elementer i arkiv.     |
| EndUserSystemID               | Id som benyttes for å hente navn på sluttbrukersystem                                                                                                                   |
| ExternalServiceCode           | Tjenestekode for elementet, for eksempel ”PSA”                                                                                                                          |
| IsCaseArchived                | Angir om samhandlingstjenesten er arkivert.                                                                                                                             |
| IsMatched                     | Intern parameter.                                                                                                                                                       |
| LastChangedBy                 | Navn på bruker/sluttbrukersystem eller tjenesteeier som sist endret elementet.                                                                                          |
| LastChangedByID               | Unik identifikator for bruker/sluttbrukersystem eller tjenesteeier som sist endret elementet.                                                                           |
| LastChangedDate               | Dato for når elementet sist ble endret (yyyy-MM-dd).                                                                                                                    |
| LastChangeType                | Type endring som ble gjort sist elementet ble endret:   Sent, Saved, Archived  |
| Notice                        | Eventuell merknad på elementet tilhørende en samhandlingstjeneste.                                                                                                      |
| ParentCaseName                | Eventuelt navn på samhandlingstjenesten elementet er knyttet mot                                                                                                        |
| ReporteeElementCode           | Angir element id hvor forkortelse for element typen er lagt til som prefiks. Mulige prefiks for element typer er: aktivt - A2E, arkivert - A2A|
| ReporteeElementId             | Unik identifikator for elementet.        |
| ReporteeElementOwner          | Unik identifikator for avgiver som elementet tilhører.   |
| ReporteeElementType           | Type element: Correspondence - meldingstjeneste, FormTask - innsendingstjeneste, Collaboration -samhandlingstjeneste, LookUp - innsynstjeneste |
| ReporteeName                  | Navn på avgiver som vises for elementet i avgivers hovedside.                                                                                                           |
| RoleRequirement               | Rollekrav for å utføre neste steg i arbeidsflyt. Ikke satt for elementer i arkiv.                                                                                       |
| RoleRequirementAltinn1Element | Rollekrav for å utføre neste steg i arbeidsflyt dersom elementet er instansiert i AltinnI. Ikke satt for elementer i arkiv. Behøver ikke settes for AltinnII elementer. |
| SEReporteeElementID           | Unik identifikator for elementet brukt før det arkiveres.    |
| ServiceEditionVersion         | Angir versjon på tjenesten.                                                                                                                                             |
| ServiceOwner                  | Angir tjenesteeier som tilbyr tjenesten som elementet tilhører.                                                                                                         |
| ServiceOwnerCode              | Tjenesteeierkode brukt for å angi tjenesteeier navn       |
| ServiceOwnerDescription       | Tjenesteeiers navn.                                  |
| Status                        | Status for elementet: NotOpenedNoConfirmationReq, NotOpenedConfirmationReq, OpenedNoConfirmedReq, OpenedNotConfirmed, Confirmed, FillIn, SignIn, Archive, SendIn, Active, Finished   |
| Statusname                    | Navn på status (med språkstøtte).                      |
| TaskStatus                    | Angir status for elementet (dersom elementet er av type innsendingstjeneste). Elementet kan ha en av følgende statuser: FormFilling - Innsendingstjenesten er under utfylling, Signing - Innsendingstjenesten er klar for signering,  SendIn - Innsendingstjenesten er klar for innsending, ParallelSigning - Innsendingstjenesten er til brukerstyrt signering, Archive - nnsendingstjenesten er arkivert            |
| Title   | Tittel på elementet som vises i avgivers hovedside    |

ReporteeElementList.GetCorrespondenceListForArchiveRef
----------------

Henter ut arkiverte melding(er) basert på arkiv ID.

Tabellen under beskriver datakontrakten for operasjonen.

| Input               | Beskrivelse      |
|---------------------|-----|
| reportee            | Fødselsnummer eller organisasjonsnummer for avgiver |
| archiveReference    | Arkivreferanse i Altinn|
| fromDate            | Hvis satt, må alle returnerte elementer ha dato større enn denne    |
| toDate              | Hvis satt, må alle returnerte elementer ha dato mindre enn denne  |
| languageID          | Filtrerer på språk:  1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk     |
| Returverdi          | Beskrivelse  |
| reporteeElementList | En liste med ReporteeElementBE-objekter som inneholder detaljer for ett element for en avgiver. |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                      | Beskrivelse     |
|-------------------------------|-------------------------------|
| ReporteeElementBE             |                                     |
| AllowDelete                   | En boolsk verdi som angir om bruker som hentet elementet fra arkiv har rettighet til å slette elementet.                                                                |
| AllowNewCopy                  | Boolsk verdi som sier om man kan opprette kopi av elementet.                                                                                                            |
| Altinn1ArchiveUnitId          | Unik identifikator for elementet i arkivet dersom dette er et element som er arkivert i Altinn I. Behøver ikke settes.                                                  |
| Altinn1FormCode               | Angir skjema id i AltinnI. Behøver ikke settes                                                                                                                          |
| Altinn1FormId                 | Angir skjema versjon AltinnI. Behøver ikke settes                                                                                                                       |
| Altinn1FormInstanceID         | Angir element id i AltinnI. Behøver ikke settes.                                                                                                                        |
| Altinn1FormORNo               | Angir OR-id i AltinnI. Behøver ikke settes.                                                                                                                             |
| Altinn1ParticipantID          | Angir unik id for tilhørende AltinnI bruker. Behøver ikke settes.                                                                                                       |
| Altinn1ReferenceType          | Angir referansetype satt i AltinnI. Behøver ikke settes.                                                                                                                |
| Altinn1WorkflowProcessId      | Arbeidsflytreferanse for elementet dersom elementet er arkivert i AltinnI. Behøver ikke settes.                                                                         |
| ArchiveId                     | Unik identifikator for elementet i arkiv. ReporteeElementId, ArchiveId eller Altinn1ArchiveUnitId må settes, men bare en av gangen |
| ArchiveReference              | Unik arkivreferanse som vises for elementet på avgivers hovedside.                                                                                                      |
| CorrespondenceStatus          | Angir status for elementet (dersom elementet er av type meldingstjeneste). Mulige statuser er: Created - Meldingen er opprettet, Read - Meldingen er lest, Replied - Sluttbruker har svart på meldingen, ChangedByGovAgency - Tjenesteeier har gjort endringer på meldingen, ChangedByUser - Sluttbruker har gjort endringer på meldingen, Confirmed - Meldingen er bekreftet, DeletedByUser -Meldingen er slettet av sluttbruker, DeletedByAltinn - Altinn har slettet meldingen (for eksempel ved sanering) |
| DueDate                       | Frist på elementet. Ikke satt for elementer i arkiv   |
| EndUserSystemID               | Id som benyttes for å hente navn på sluttbrukersystem   |
| ExternalServiceCode           | Tjenestekode for elementet, for eksempel ”PSA”         |
| LastChangedBy                 | Navn på bruker/sluttbrukersystem eller tjenesteeier som sist endret elementet.                                                                                          |
| LastChangedByID               | Unik identifikator for bruker/sluttbrukersystem eller tjenesteeier som sist endret elementet.                                                                           |
| LastChangedDate               | Dato for når elementet sist ble endret (yyyy-MM-dd).                                                                                                                    |
| LastChangeType                | Type endring som ble gjort sist elementet ble endret: Sent, Saved, Archived  |
| ReporteeElementCode           | Angir element id hvor forkortelse for element typen er lagt til som prefiks. Mulige prefiks for element typer er: aktivt - A2E, arkivert - A2A               |
| ReporteeElementId             | Unik identifikator for elementet.                     |
| ReporteeElementOwner          | Unik identifikator for avgiver som elementet tilhører.                                                                                                                  |
| ReporteeElementType           | Type element: Correspondence - meldingstjeneste, FormTask - innsendingstjeneste |
| ReporteeName                  | Navn på avgiver som vises for elementet i avgivers hovedside.                                                                                                           |
| RoleRequirement               | Rollekrav for å utføre neste steg i arbeidsflyt. Ikke satt for elementer i arkiv.                                                                                       |
| RoleRequirementAltinn1Element | Rollekrav for å utføre neste steg i arbeidsflyt dersom elementet er instansiert i AltinnI. Ikke satt for elementer i arkiv. Behøver ikke settes for AltinnII elementer. |
| ServiceOwner                  | Angir tjenesteeier som tilbyr tjenesten som elementet tilhører.                                                                                                         |
| ServiceOwnerCode              | Tjenesteeierkode brukt for å angi tjenesteeier navn                                                                                                                     |
| Status                        | Status for elementet: NotOpenedNoConfirmationReq, NotOpenedConfirmationReq, OpenedNoConfirmedReq, OpenedNotConfirmed, Confirmed, FillIn, SignIn, Archive, SendIn              |
| Statusname                    | Navn på status (med språkstøtte)                                                                                                                                       |
| TaskStatus                    | Angir status for elementet (dersom elementet er av type innsendingstjeneste). Elementet kan ha en av følgende statuser: FormFilling - Innsendingstjenesten er under utfylling, Signing - Innsendingstjenesten er klar for signering, SendIn - Innsendingstjenesten er klar for innsending         |
| Title                         | Tittel på elementet som vises i avgivers hovedside.                                                                                                                     |

ReporteeElementList.GetCorrespondenceListForReportee
--------------------------------------------------

Henter ut meldinger for en avgiver.

Tabellen under beskriver datakontrakten for operasjonen.

| Input               | Beskrivelse    |
|---------------------|---------------------------------|
| reportee            | Fødselsnummer eller organisasjonsnummer for avgiver   |
| fromDate            | Hvis satt, må alle returnerte elementer ha dato større enn denne      |
| toDate              | Hvis satt, må alle returnerte elementer ha dato mindre enn denne       |
| languageID          | Filtrerer på språk: 1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk    |
| Returverdi          | Beskrivelse     |
| reporteeElementList | En liste med ReporteeElementBE-objekter som inneholder detaljer for ett element for en avgiver. |

Tabellen under beskriver datakontrakten for operasjonen

| Property                      | Beskrivelse                                        |
|-------------------------------|----------------------------|
| **ReporteeElementBE**             |                                       |
| AllowDelete                   | En boolsk verdi som angir om bruker som hentet elementet fra arkiv har rettighet til å slette elementet.                                                                |
| AllowNewCopy                  | Boolsk verdi som sier om man kan opprette kopi av elementet.                                                                                                            |
| Altinn1ArchiveUnitId          | Unik identifikator for elementet i arkivet dersom dette er et element som er arkivert i Altinn I. Behøver ikke settes.                                                  |
| Altinn1FormCode               | Angir skjema id i AltinnI. Behøver ikke settes                                                                                                                          |
| Altinn1FormId                 | Angir skjema versjon AltinnI. Behøver ikke settes                                                                                                                       |
| Altinn1FormInstanceID         | Angir element id i AltinnI. Behøver ikke settes.                                                                                                                        |
| Altinn1FormORNo               | Angir OR-id i AltinnI. Behøver ikke settes.                                                                                                                             |
| Altinn1ParticipantID          | Angir unik id for tilhørende AltinnI bruker. Behøver ikke settes.                                                                                                       |
| Altinn1ReferenceType          | Angir referansetype satt i AltinnI. Behøver ikke settes.                                                                                                                |
| Altinn1WorkflowProcessId      | Arbeidsflytreferanse for elementet dersom elementet er arkivert i AltinnI. Behøver ikke settes.                                                                         |
| ArchiveId                     | Unik identifikator for elementet i arkiv                   |
| ArchiveReference              | Unik arkivreferanse som vises for elementet på avgivers hovedside                |
| CorrespondenceStatus          | Angir status for elementet (dersom elementet er av type meldingstjeneste). Mulige statuser er: Created - Meldingen er opprettet, Read - Meldingen er lest, Replied - Sluttbruker har svart på meldingen, ChangedByGovAgency - Tjenesteeier har gjort endringer på meldingen, ChangedByUser -Sluttbruker har gjort endringer på meldingen, Confirmed - Meldingen er bekreftet, DeletedByUser - Meldingen er slettet av sluttbruker, DeletedByAltinn - Altinn har slettet meldingen (for eksempel ved sanering)   |
| DueDate                       | Frist på elementet. Ikke satt for elementer i arkiv   |
| EndUserSystemID               | Id som benyttes for å hente navn på sluttbrukersystem       |
| ExternalServiceCode           | Tjenestekode for elementet, for eksempel ”PSA”              |
| LastChangedBy                 | Navn på bruker/sluttbrukersystem eller tjenesteeier som sist endret elementet|
| LastChangedByID               | Unik identifikator for bruker/sluttbrukersystem eller tjenesteeier som sist endret elementet    |
| LastChangedDate               | Dato for når elementet sist ble endret (yyyy-MM-dd).    |
| LastChangeType                | Type endring som ble gjort sist elementet ble endret: Sent, Saved, Archived  |
| ReporteeElementCode           | Angir element id hvor forkortelse for element typen er lagt til som prefiks. Mulige prefiks for element typer er: aktivt - A2E, arkivert - A2A |
| ReporteeElementId             | Unik identifikator for elementet.                     |
| ReporteeElementOwner          | Unik identifikator for avgiver som elementet tilhører   |
| ReporteeElementType           | Type element: Correspondence - meldingstjeneste, FormTask - innsendingstjeneste  |
| ReporteeName                  | Navn på avgiver som vises for elementet i avgivers hovedside  |
| RoleRequirement               | Rollekrav for å utføre neste steg i arbeidsflyt. Ikke satt for elementer i arkiv.                                                                                       |
| RoleRequirementAltinn1Element | Rollekrav for å utføre neste steg i arbeidsflyt dersom elementet er instansiert i AltinnI. Ikke satt for elementer i arkiv. Behøver ikke settes for AltinnII elementer. |
| ServiceOwner                  | Angir tjenesteeier som tilbyr tjenesten som elementet tilhører         |
| ServiceOwnerCode              | Tjenesteeierkode brukt for å angi tjenesteeier navn       |
| Status                        | Status for elementet: NotOpenedNoConfirmationReq, NotOpenedConfirmationReq, OpenedNoConfirmedReq, OpenedNotConfirmed, Confirmed, FillIn, SignIn, Archive, SendIn                 |
| Statusname                    | Navn på status (med språkstøtte).                  |
| TaskStatus                    | Angir status for elementet (dersom elementet er av type innsendingstjeneste). Elementet kan ha en av følgende statuser: FormFilling, - Innsendingstjenesten er under utfylling, Signing -Innsendingstjenesten er klar for signering, SendIn -Innsendingstjenesten er klar for innsending     |
| Title                         | Tittel på elementet som vises i avgivers hovedside.                                                                                                                     |

ServiceMetadata
---------------

| Tjenesteoperasjon            | Kort beskrivelse                                                              |
|------------------------------|-------------------------------------------------------------------------------|
| GetAvailableServices         | Henter en liste med gyldige tjenester i Altinn                                |
| GetFormTaskSchemaDefinitions | Henter spesifikasjoner (.xsd) for alle skjemaer i en gitt innsendingstjeneste |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

ServiceMetadata.GetAvailableServicesV2
----------------

Denne operasjonen returnerer en liste med gyldige tjenester i Altinn. Operasjonen er versjonert, og finnes i både V2 og V3 versjon som tilbyt noe ulik funksjonalitet.

Tabellen under beskriver datakontrakten for operasjonen.

| Input                | Beskrivelse      |
|----------------------|---------------------|
| languageID           | Språk kode for å filtrere tjenester. Hvis 0 angis blir verdien satt til standard språkvalg. Språkkoder:  1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk  |
| Returverdi           | Beskrivelse      |
| availableServiceList | Liste med AvailableServiceBEV2-objekter som inneholder detaljer for en gyldig innsendingstjeneste. |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property            | Beskrivelse     |
|----------------------------|---------------|
| **AvailableServiceBEV2**       |     |
| ServiceOwnerCode           | Kode for tjenesteeier som tilbyr denne tjenesten  |
| ServiceOwnerName           | Navn på tjenesteeier som tilbyr tjenesten |
| ServiceName                | Navn på tjenesten  |
| ExternalServiceCode        | Angir kode for tjenesten, for eksempel ”PSA”|
| ExternalServiceEditionCode | Angir utgave av tjenesten, for eksempel ”2009” |
| ServiceEditionVersionName  | Angir versjon på tjenesten |
| ServiceEditionVersionId    | Angir identifikator for versjonen av tjenesten|
| ValidFrom                  | Startdato for tidsrommet som tjenesten er gyldig i (yyyy-MM-ddThh:mm:ss) |
| ValidTo                    | Sluttdato for tidsrommet som tjenesten er gyldig i (yyyy-MM-ddThh:mm:ss) |
| BuildPackageVersion        | Et unikt versjonsnummer internt i Altinn |
| IsMatched                  | Intern parameter|
| ServiceType                | Angir type tjeneste:  Correspondence – meldingstjeneste, Reporting – innsendingstjeneste, Collaboration – samhandlingstjeneste, Lookup –Iinnsynstjeneste |

ServiceMetadata.GetAvailableServicesV3
----------------

Denne operasjonen returnerer en liste med gyldige tjenester i Altinn, filtrert på søkeparameterene som blir sendt inn. Operasjonen er versjonert, siste versjon er V3.

Tabellen under beskriver datakontrakten for operasjonen.

| Property                   | Beskrivelse         |
|----------------------------|---------------------|
| **AvailableServiceBEV2**       |                                                                           |
| ServiceOwnerCode           | Kode for tjenesteeier som tilbyr denne tjenesten.                         |
| ServiceOwnerName           | Navn på tjenesteeier som tilbyr tjenesten.                                |
| ServiceName                | Navn på tjenesten.                                                        |
| ExternalServiceCode        | Angir kode for tjenesten, for eksempel ”PSA”.                             |
| ExternalServiceEditionCode | Angir utgave av tjenesten, for eksempel ”2009”.                           |
| ServiceEditionVersionName  | Angir versjon på tjenesten.                                               |
| ServiceEditionVersionId    | Angir identifikator for versjonen av tjenesten.                           |
| ValidFrom                  | Startdato for tidsrommet som tjenesten er gyldig i (yyyy-MM-ddThh:mm:ss). |
| ValidTo                    | Sluttdato for tidsrommet som tjenesten er gyldig i (yyyy-MM-ddThh:mm:ss). |
| BuildPackageVersion        | Et unikt versjonsnummer internt i Altinn                                  |
| IsMatched                  | Intern parameter.                                                         |
| ServiceType                | Angir type tjeneste: Correspondence – meldingstjeneste, Reporting – innsendingstjeneste, Collaboration – samhandlingstjeneste, Lookup – innsynstjeneste   |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                     | Beskrivelse        |
|------------------------------|------------------------------|
| **ServicesSearchExternalBE** |      |
| ServiceType                  | Angir type tjeneste: Correspondence – meldingstjeneste, Reporting – innsendingstjeneste, Collaboration – samhandlingstjeneste, Lookup – innsynstjeneste  |
| ServiceOwnerCode             | Kode for tjenesteeier som tilbyr denne tjenesten.                                                                    |
| ExternalServiceCode          | Angir kode for tjenesten, for eksempel ”PSA”.                                                                        |
| ExternalServiceEditionCode   | Angir utgave av tjenesten, for eksempel ”2009”.                                                                      |
| **AvailableServiceBEV3**     |      |
| ServiceOwnerCode             | Kode for tjenesteeier som tilbyr denne tjenesten.                                                                    |
| ServiceOwnerName             | Navn på tjenesteeier som tilbyr tjenesten.                                                                           |
| ServiceName                  | Navn på tjenesten.                                                                                                   |
| ExternalServiceCode          | Angir kode for tjenesten, for eksempel ”PSA”.                                                                        |
| ExternalServiceEditionCode   | Angir utgave av tjenesten, for eksempel ”2009”.                                                                      |
| ServiceEditionVersionName    | Angir versjon på tjenesten.                                                                                          |
| ServiceEditionVersionId      | Angir identifikator for versjonen av tjenesten.                                                                      |
| ValidFrom                    | Startdato for tidsrommet som tjenesten er gyldig i (yyyy-MM-ddThh:mm:ss).                                            |
| ValidTo                      | Sluttdato for tidsrommet som tjenesten er gyldig i (yyyy-MM-ddThh:mm:ss).                                            |
| BuildPackageVersion          | Et unikt versjonsnummer internt i Altinn                                                                             |
| IsMatched                    | Intern parameter.                                                                                                    |
| ServiceType                  | Angir type tjeneste: Correspondence – meldingstjeneste, Reporting – innsendingstjeneste, Collaboration – samhandlingstjeneste, Lookup – innsynstjeneste        |
| AttachmentRuleTypeBEList     | Liste som angir hvilke vedleggstyper som er knyttet til tjenesten                                                    |
| **AttachmentRuleTypeBE**     |   |
| AttachmentTypeName           | Unikt navn for vedleggstypen, benyttes for å spesifisere vedleggstype når vedlegg sendes inn.                        |
| AttachmentTypeNameLanguage   | Visningsnavn for vedleggstypen basert på angitt språk.                                                               |
| MinAttachmentCount           | Minimum antall vedlegg av denne typen som må være med for å etterfølge kravene for vedleggstypen.                    |
| MaxAttachmentCount           | Maksimum antall vedlegg av denne typen som må være med for å etterfølge kravene for vedleggstypen.                   |
| MaxFileSize                  | Maksimum tillatt filstørrelse for vedleggstypen.                                                                     |
| AllowedFileTypes             | Kommaseparert liste over tillatte filtypeendelser for vedleggstypen.                                                 |
| IsXSDValidationRequired      | Verdi som angir om XSD validering av vedlegg vil bli gjort for denne vedleggstypen. XSD kan mottas fra tjenesteeier. |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse                                                                |
|----------|----------------------------------------------------------------------------|
| 30013    | Angitt ExternalServiceCode er på ugyldig format                            |
| 30005    | Angitt ServiceOwnerCode er på ugyldig format                               |
| 40039    | Når ExternalServiceEditionCode er angitt må også ExternalServiceCode angis |

ServiceMetadata.GetFormTaskSchemaDefinitions
----------------

Denne operasjonen returnerer spesifikasjoner (.xsd) for alle skjemaer i en gitt innsendingstjeneste.

Tabellen under beskriver datakontrakten for operasjonen.

| Input                           | Beskrivelse          |
|---------------------------------|-----------------------------------------|
| externalServiceCode             | Angir tjenestekode på innsendingstjenesten man ønsker å hente spesifikasjoner for  |
| externalServiceEditionCode      | Angir tjenesteutgavekode for innsendingstjeneste  |
| **Returverdi**                      | **Beskrivelse**    |
| logicalFormSchemaDefinitionList | Liste med LogicalFormSchemaDefinitionBE-objekter som inneholder meldingsspesifikasjon for et gitt skjema |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                      | Beskrivelse             |
|-------------------------------|--------------------------------|
| **LogicalFormSchemaDefinitionBE** |              |
| LogicalFormID                 | Unik identifikator for et gitt skjema i Altinn       |
| DataFormatXsd                 | Meldingsspesifikasjon for skjemaet    |
| DataFormatProviderTypeID      |           |
| DataFormatID                  | Den unike id for et spesifikt skjema, dette er typisk gitt av metadata leverandør         |
| DataFormatVersion             | Versjonen av en gitt DataFormatID, som sammen med den gir et unikt skjema (spesifikasjon) |

Workflow
--------

| Tjenesteoperasjon                       | Kort beskrivelse                                                                                                                                     |
|-----------------------------------------|----------------------------------------------------|
| DoSendingInAction                       | Setter arbeidsflyt til neste steg i forhold til et skjemasett hvis skjema utfylling er ferdig og dette skjema ikke har definert noen signeringssteg. |
| DoSigning                               | Utfører signering hvis en skjemasett lå klart til signering     |
| GetAvailableActionsV2                   | Returnerer hvilken handling som er mulig å utføre for en gitt innsendingstjeneste i Altinn     |
| GetNextWorkflowStateTypeInProcessFlowV2 | Denne operasjonen returnerer neste steg (steget etter gjeldende steg) i arbeidsflyt for en gitt innsendingstjeneste                                  |
| GetProcessDetailsV2                     | Denne operasjonen returnerer alle steg i arbeidsflyten for en gitt innsendingstjeneste; både steg som allerede er utført og steg som skal utføres    |
| GetSigningText                          | Henter ut signeringsteksten for et element i Altinn      |
| SetBackToFormFilling                    | Kan kalles fra et sluttbrukersystem for å sette en innsendingstjeneste i Altinn tilbake til utfyllingssteg           |
| PrepareUserControlledSigningBasic       | Benyttes til å sette opp det brukerstyrte signeringssteget       |
| GetProcessStepIDForParallelSigningBasic | Henter stegnummeret for det brukerstyrte signeringssteget  |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

Workflow.DoSendingInAction
----------------

DoSendingInAction kan kalles fra et sluttbrukersystem for å sende inn en innsendingstjeneste (uten signeringssteg) som allerede ligger ferdig utfylt i Altinn.

Tabellen under beskriver datakontrakten for operasjonen.

| Input             | Beskrivelse      |
|-------------------|---------------------|
| userSSN           | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres     |
| userPassword      | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn   |
| userPinCode       | Pinkode for valgt engangskodetype (authMethod)   |
| authMethod        | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin   |
| reporteeElementID | Angir element i Altinn som skal sendes inn    |
| Returverdi        | Beskrivelse    |
| N/A               |       |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse       |
|----------|--------|
| 60035    | Man har prøvd å arkivere et ReporteeElement som allerede er arkivert    |
| 60037    | Man har prøvd å sende inn et ReporteeElement som ikke har blitt validert, da element ikke er i en completed state |

Workflow.DoSigning
----------------

DoSigning kan kalles fra et sluttbrukersystem for å signere en innsendingstjeneste som ligger klart til signering i Altinn. Dersom dette er siste signeringssteg vil tjenesten også sendes inn.

Listen med FormID og AttachmentID som skal signeres kan hentes av sluttbrukersystemet ved å gjøre et kall til ReporteeElementList.GetFormSetElementsV2 i ReporteeElementList endepunktet.

ReporteeElementListExternalBasic.GetFormSetElementsBasicV2\[reporteeElementID\] returnerer:

```xml
*Når Vedlegg:*
&lt;b:ItemID&gt;184863&lt;/b:ItemID&gt;
&lt;b:ItemName&gt;Chrysanthemum.jpg&lt;/b:ItemName&gt;
&lt;b:ItemType&gt;BinaryAttachment&lt;/b:ItemType&gt;
*For HovedSkjema:*
&lt;b:ItemID&gt;109813&lt;/b:ItemID&gt;
&lt;b:ItemName&gt;RF-1215 Selskapsoppgave for deltakerliknet selskap
2012&lt;/b:ItemName&gt;
&lt;b:ItemType&gt;MainForm&lt;/b:ItemType&gt;
&lt;b:ItemURL&gt;PrintPDF.aspx?FormId=109813&lt;/b:ItemURL&gt;
*Når Underskjema:*
&lt;b:ItemID&gt;109814&lt;/b:ItemID&gt;
&lt;b:ItemName&gt;RF-1233 Selskapets oppgave over deltakerens formue og
inntekt i deltakerliknet selskap 2012&lt;/b:ItemName&gt;
&lt;b:ItemType&gt;SubForm&lt;/b:ItemType&gt;
&lt;b:ItemURL&gt;PrintPDF.aspx?FormId=109814&lt;/b:ItemURL&gt;
&lt;b:ValidationStatusType&gt;Valid&lt;/b:ValidationStatusType&gt;
Parameterer ItemID gir korrelert verdi som skal benyttes i
WorkflowServiceExternalBasic.DoSigningBasic for å utføre signering av
valgte skjema/vedlegg:
&lt;ns:selectedForms&gt;
&lt;arr:int&gt;\[ItemID fra WS GetFormSetElementsBasicV2
\]&lt;/arr:int&gt;
…
&lt;/ns:selectedForms&gt;
…
&lt;ns:selectedAttachments&gt;
&lt;arr:int&gt;184863&lt;/arr:int&gt;
&lt;arr:int&gt;184864&lt;/arr:int&gt;
…
&lt;/ns:selectedAttachments&gt;
```

Tabellen under beskriver datakontrakten for operasjonen.

| Input                          | Beskrivelse    |
|--------------------------------|------------------|
| userSSN                        | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres  |
| userPassword                   | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn   |
| userPinCode                    | Pinkode for valgt engangskodetype (authMethod)       |
| authMethod                     | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin                  |
| reporteeElementID              | Angir element i Altinn som skal signeres |
| selectedForms                  | Angir en liste med FormIDs for skjemaer som skal signeres           |
| selectedAttachments            | Angir en liste med AttachmentIDs for vedlegg som skal signeres (kan hentes ut vha ItemID i operasjonen GetFormSetElementsV2 når ItemType er satt til BinaryAttachment). |
| signatureText                  | Signeringstekst |
| endUserSystemLoginDateTime     | Dato og tidspunkt for når bruker logget inn i sluttbrukersystem (yyyy-MM-ddThh:mm:ss) |
| endUserSystemSignatureDateTime | ato og tidspunkt for når signeringen i sluttbrukersystemet ble gjort (yyyy-MM-ddThh:mm:ss)   |
| endUserSystemVersion           | Versjonsnummer for sluttbrukersystemet|
| endUserSystemUserId            | Identifikator for bruker som var logget på sluttbrukersystemet og gjennomførte signeringen                      |
| enduserSystemReference         | Referanse til signaturen som ble utført i sluttbrukersystemet (satt av sluttbrukersystem, bør være unik)                               |
| endUserSystemSignatureLogId    | Unik id i sluttbrukersystemet for logginnslag for signeringen          |
| **Returverdi**                 | **Beskrivelse**                                     |
| N/A                            |                                                  |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse                                                                                  |
|----------|----------------------------------------------------------------------------------------------|
| 14       | Dette er en generell autoriserings feil, og vil forekomme i et par situasjoner;  a. Man prøver å signere et ReporteeElement som man ikke har tilgang til. b. Man prøver å signere et ReporteeElement som står i feil status. (For eksempel Utfylling.)   |
| 60035    | Man har prøvd å signere og arkivere et ReporteeElement som allerede er arkivert.             |
| 60036    | Denne brukeren har allerede signert dette ReporteeElementet.                                 |

Workflow.GetAvailableActionsV2
----------------

Denne operasjonen returnerer hvilken handling som er mulig å utføre for en gitt innsendingstjeneste i Altinn. Dette er basert på hvilket steg i arbeidsflyten tjenesten befinner seg på, samt hvilke rettigheter bruker i sluttbrukersystemet har. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen.

| Input             | Beskrivelse    |
|-------------------|--------|
| userSSN           | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres     |
| userPassword      | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn  |
| userPinCode       | Pinkode for valgt engangskodetype (authMethod)  |
| authMethod        | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin    |
| reporteeElementID | Angir element i Altinn     |
| **Returverdi**    | **Beskrivelse**           |
| userCurrentAction | UserCurrentActionV2-objektet vil inneholde en av seks mulige handlinger: NoAction, Sign, FormFilling, SendIn, SignAndSendIn, DoSignDelegation, Delegering for brukerstyrt signering     |

Workflow.GetNextWorkflowStateTypeInProcessFlowV2
----------------

Denne operasjonen returnerer neste steg (steget etter gjeldende steg) i arbeidsflyt for en gitt innsendingstjeneste. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen.

| Input             | Beskrivelse                                                             |
|-------------------|-------------------------------------------------------------------------|
| reporteeElementID | Angir element i Altinn.                                                 |
| **Returverdi**        | **Beskrivelse**                                                      |
| userCurrentAction | UserCurrentActionV2-objektet vil inneholde en av seks mulige handlinger: NoAction, Sign, FormFilling, SendIn, SignAndSendIn, DoSignDelegation, Delegering for brukerstyrt signering|

Workflow.GetProcessDetailsV2
----------------

Denne operasjonen returnerer alle steg i arbeidsflyten for en gitt innsendingstjeneste; både steg som allerede er utført og steg som skal utføres. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen.

| Input              | Beskrivelse      |
|--------------------|-------------------------|
| reporteeElementID  | Angir element i Altinn       |
| Returverdi         | Beskrivelse     |
| processDetailsList | En liste med ProcessDetailsBEV2-objekter, som inneholder detaljer for alle steg for gitte innsendingstjeneste |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                       | Beskrivelse   |
|--------------------------------|-----------|
| **ProcessDetailsBEV2**             |     |
| SequenceNumber                 | Sekvensnummer i arbeidsflyt for gjeldende steg   |
| ProcessStepId                  | Unik identifikator for steget        |
| ActivityTypeId                 |Angir type steg: FormFilling, Signing, SendIn    |
| UserId                         | Identifikator for bruker som har gjennomført steget (dersom steget er gjennomført av bruker)                      |
| ServiceOwnerId                 | Identifikator for tjenesteeier som har gjennomført steget (dersom steget er gjennomført av tjenesteeier).           |
| EndUserSystemID                | Identifikator for sluttbrukersystem som har gjennomført steget (dersom steget er gjennomført av sluttbrukersystem). |
| ReporteeId                     | Identifikator for avgiver for tjenesten |
| ReporteeName                   | Navn på avgiver  |
| CreatedDateTime                | Dato og tidspunkt for når tjenesten kom til gjeldende steg (yyyy-MM-ddThh:mm:ss) |
| IsCurrentStep                  | Angir om dette steget er gjeldende steg i arbeidsflyt for innsendingstjeneste   |
| LastModifiedDate               | Dato og tidspunkt for når det sist ble gjort endringer på tjenesten for dette steget (yyyy-MM-ddThh:mm:ss)|
| IsOptionalSigningStep          | Angir om signering er valgfritt for prosessen |
| IsOptionalSigningStepIndicator | Angir om signering er valgfritt for steget      |
| ParallelSigningSeqNumber       | Angir stegnummeret et eventuelt brukerstyrt signeringssteg har i arbeidsflyten for tjenesten     |

Workflow.GetProcessDetailsBasicV3
----------------

Denne operasjonen returnerer alle steg i arbeidsflyten for en gitt innsendingstjeneste; både steg som allerede er utført og steg som skal utføres. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen.

| Input              | Beskrivelse         |
|--------------------|----------------------------|
| reporteeElementID  | Angir element i Altinn    |
| **Returverdi**         | **Beskrivelse**       |
| processDetailsList | En liste med ProcessDetailsBEV3-objekter, som inneholder detaljer for alle steg for gitte innsendingstjeneste |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                       | Beskrivelse      |
|--------------------------------|------------------|
| **ProcessDetailsBEV2**         |            |
| SequenceNumber                 | Sekvensnummer i arbeidsflyt for gjeldende steg                       |
| ProcessStepId                  | Unik identifikator for steget.                                                                                      |
| ActivityTypeId                 | Angir type steg: FormFilling, Signing, SendIn, Deleted     |
| UserId                         | Identifikator for bruker som har gjennomført steget (dersom steget er gjennomført av bruker).                       |
| ServiceOwnerId                 | Identifikator for tjenesteeier som har gjennomført steget (dersom steget er gjennomført av tjenesteeier).           |
| EndUserSystemID                | Identifikator for sluttbrukersystem som har gjennomført steget (dersom steget er gjennomført av sluttbrukersystem). |
| ReporteeId                     | Identifikator for avgiver for tjenesten.                                                                            |
| ReporteeName                   | Navn på avgiver.                                                                                                    |
| CreatedDateTime                | Dato og tidspunkt for når tjenesten kom til gjeldende steg (yyyy-MM-ddThh:mm:ss).                                   |
| IsCurrentStep                  | Angir om dette steget er gjeldende steg i arbeidsflyt for innsendingstjeneste.                                      |
| LastModifiedDate               | Dato og tidspunkt for når det sist ble gjort endringer på tjenesten for dette steget (yyyy-MM-ddThh:mm:ss).         |
| IsOptionalSigningStep          | Angir om signering er valgfritt for prosessen                                                                       |
| IsOptionalSigningStepIndicator | Angir om signering er valgfritt for steget                                                                          |
| ParallelSigningSeqNumber       | Angir stegnummeret et eventuelt brukerstyrt signeringssteg har i arbeidsflyten for tjenesten.                       |

Workflow.GetSigningText
----------------

Denne operasjonen henter ut signeringsteksten for et element i Altinn. Språkkoden angir hvilket språk man ønsker teksten på. Dersom valgt språk ikke støttes for denne tjenesten vil teksten returneres på default språk.

Tabellen under beskriver datakontrakten for operasjonen.

| Input                      | Beskrivelse         |
|----------------------------|---------------------|
| userSSN                    | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres      |
| userPassword               | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn |
| userPinCode                | Pinkode for valgt engangskodetype (authMethod)   |
| authMethod                 | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin   |
| externalServiceCode        | Tjenestekode (for eksempel ”PSA”) for tjenesten som skjemasettet tilhører. Settes bare hvis reporteeElementID er ukjent. |
| externalServiceEditionCode | Tjenesteutgavekode (for eksempel ”2009”) for tjenesten som skjemasettet tilhører. Settes sammen med externalServiceCode. |
| reporteeElementID          | Angir element i Altinn. Settes ikke hvis externalServiceCode/ externalServiceEditionCode er satt.                        |
| languageID                 | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: 1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk  |
| **Returverdi**             | **Beskrivelse**       |
| tekst                      | Signeringstekst  |

Workflow.SetBackToFormFilling
----------------

Denne operasjonen kan kalles fra et sluttbrukersystem for å sette en innsendingstjeneste i Altinn tilbake til utfyllingssteg.

Tabellen under beskriver datakontrakten for operasjonen.

| Input             | Beskrivelse       |
|-------------------|--------|
| userSSN           | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres    |
| userPassword      | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn     |
| userPinCode       | Pinkode for valgt engangskodetype (authMethod)     |
| authMethod        | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin    |
| reporteeElementID | Angir element i Altinn  |
| **Returverdi**    | **Beskrivelse**      |
| N/A               |       |

Workflow.PrepareUserControlledSigning
----------------

Denne operasjonen benyttes for å forberede det brukerstyrte signeringssteget for en innsendingstjeneste.

Tabellen under beskriver datakontrakten for operasjonen.

| Input                                 | Beskrivelse     |
|---------------------------------------|-----------------|
| userSSN                               | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres |
| userPassword                          | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn |
| userPinCode                           | Pinkode for valgt engangskodetype (authMethod) |
| authMethod                            | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin |
| reporteeElementID                     | Angir elementet i Altinn  |
| delegatedUserBEList                   | Liste med DelegatedUserBE som angir hvilke brukere som kan signere det brukerstyrte signeringssteget|
| parallelSigningStepLocked             | Angir om det brukerstyrte steget skal være låst eller ei, kan kun brukes av ”Trusted partner”  |
| userDefinedNumberOfSignaturesRequired | Angir antallet signaturer som kreves for det brukerstyrte signeringssteget           |
| **Returverdi**                        | **Beskrivelse**       |
| N/A                                   | N/A          |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                  | Beskrivelse                                |
|---------------------------|--------------------------------------------|
| **DelegatedUserBE**       |                                            |
| SSN                       | Fødselsnummer for bruker som skal signere. |
| Name                      | Og etternavn til bruker som skal signere.  |
| NumberOfSignaturesAllowed | Antall signaturer denne kan gjøre.         |

Workflow.GetProcessStepIDForParallelSigning
----------------

Denne operasjonen benyttes for å hente prosess steg ID for det brukerstyrte signeringssteget.

Tabellen under beskriver datakontrakten for operasjonen.

| userSSN           | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres             |
|-------------------|-------------------------|
| userPassword      | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn |
| userPinCode       | Pinkode for valgt engangskodetype (authMethod)   |
| authMethod        | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er:  AltinnPin, TaxPin, SMSPin  |
| reporteeElementID | Angir elementet i Altinn |
| **Returverdi**    | **Beskrivelse**        |
| Id                | ID til det brukerstyrte signeringssteget, returneres 0 betyr det at valgt element ikke har et brukerstyrt signeringssteg                          |

Workflow.GetSigningSummaryHTML
----------------

Operasjon innført av webSA for å kunne understøtte samme funksjonaliteten som man har i Altinn I, med visning av
kvitteringssammendrag på signeringssiden/signeringssteget, og ikke bare på kvitteringssiden etter arkivering.

Tabellen under beskriver datakontrakten for operasjonen.

| userSSN                          | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres      |
|----------------------------------|--------------------------|
| userPassword                     | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn   |
| userPinCode                      | Pinkode for valgt engangskodetype (authMethod)      |
| authMethod                       | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin     |
| reporteeElementID                | Angir elementet i Altinn    |
| **Returverdi**                   | **Beskrivelse**     |
| GetSigningSummaryHTMLBasicResult | Returnerer kvitteringssammendrag for en innsendingstjeneste tilsvarende som i portal                        |

PrefillEUSExternal

| Tjenesteoperasjon | Kort beskrivelse   |
|-------------------|----------|
| GetPrefillData    | Henter preutfyllingsdata for angitt avgiver og tjenesteutgave, og returnerer preutfyllingsdata |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

PrefillEUSExternal.GetPrefillData
----------------

Denne operasjonen kan kalles fra et sluttbrukersystem for å hente preutfyllingsdata for en gitt avgiver og tjenesteutgave.

| Input                      | Beskrivelse       |
|----------------------------|-------------|
| userSSN                    | Fødselsnummer til bruker i sluttbrukersystemet    |
| userPassword               | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn   |
| userPinCode                | Pinkode for valgt engangskodetype (authMethod)       |
| authMethod                 | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin      |
| ReporteeNumber             | Fødselsnummer eller organisasjonsnummer det skal hentes ut prefill for   |
| ExternalServiceCode        | Tjenestekode for tjenesten som skjemasettet tilhører  |
| ExternalServiceEditionCode | Tjenesteutgavekode for tjenesten som skjemasettet tilhører |
| **Returverdi**             | **Beskrivelse**         |
| preFillData                | Objekt av typen PreFillDataBE, som inneholder status på hvorvidt preutfyllingsdata ble funnet eller ikke, samt en liste med objekter av typen PreFillFormFieldDataBE, som inneholder selve preutfyllingsdataene og andre metadata. |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                    | Beskrivelse                     |
|-----------------------------|---------------------------------|
| **PreFillDataBE**           |                                 |
| Status                      | Status som angir om preutfyllingsdata ble funnet eller ikke. Mulige statuser er: INVALIDINPUT - Input er ikke valid, PREFILLDATAFOUND - Preutfyllingsdata ble funnet og returnert, PREFILLDATANOTFOUND - Ingen gyldige preutfyllingsdata ble funnet     |
| PreFillFormTaskBEList       | Liste med objekter av typen PrefillFormTaskBE          |
| **PrefillFormTaskBE**       |    |
| ExternalServiceCode         | Angir den unike tjenestekoden dataene gjelder               |
| ExternalServiceEditionCode  | Angir tjenesteutgavekode dataene gjelder|
| ExternalShipmentReference   | Unik referanse som settes av tjenesteeier for å identifisere forsendelsen |
| IdentityFieldHashCode       | Settes ikke av tjenesteeier. Brukes internt i Altinn |
| PreFillAttachments          | Liste (PrefillAttachmentBE-objekter) som inneholder binære vedlegg for oppgavesettet |
| PreFillForms                | Liste (PrefillFormBE-objekter) som inneholder preutfylte skjema og metadata for et oppgavesett, ett skjema per objekt |
| PreFillIdentityFields       | Liste (PrefillIdentityFieldBE-objekter) som inneholder identifiserende felter for det preutfylte oppgavesettet |
| PrefillNotifications        | Liste (NotificationBE-objekter) med varsler for det preutfylte oppgavesettet |
| ReceiversReference          | Referanse som settes av Altinn  |
| Reportee                    | Fødselsnummer eller organisasjonsnummer som identifiserer hvem dataene gjelder |
| SendersReference            | Referanse på preutfylt skjemasett som settes av tjenesteeier |
| ServiceOwnerCode            | Kode som unikt representerer kildesystem, f.eks. ”ABC-123”. Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier. |
| ValidFromDate               | Angir fra når preutfyllingsdata er gyldig (yyyy-MM-dd) |
| ValidToDate                 | Angir til når preutfyllingsdata er gyldig (yyyy-MM-dd)           |
| PrefillAttachmentBE         |                                                                  |
| AttachmentData              | Data for det binære vedlegget.                                   |
| AttachmentName              | Dette er navnet på vedlegget, som det vises i portalen.         |
| AttachmentType              | MIME-typen for vedlegget                  |
| FileName                    | Navn på fil for det binære vedlegget.                                                                                                                                                                                                                                                             |
| SendersReference            | Referanse for vedlegget. Settes av tjenesteeier   |
| PrefillFormBE               |            |
| DataFormatID                | Id til skjema fra metadata kilde  |
| DataFormatVersion           | Versjon til skjema fra metadata kilde     |
| FormDataXML                 | Preutfyllingsdata for skjemaet. En CDATA blokk  |
| SendersReference            | Referanse for skjemaet satt av tjenesteeier  |
| **PreFillIdentityFieldBE**  |                |
| FieldValue                  | Verdi for identifiserende felt, som benyttes for å skille preutfyllingsdata for samme tjenesteutgave og avgiver fra hverandre   |
| **NotificationBE**          |   |
| FromAddress                 | Avsender adresse (e-post). Hvis ikke satt benyttes avsenderadresse satt i varselmalen     |
| ShipmentDateTime            | Når varsel skal sendes til mottaker                         |
| LanguageCode                | Språk kode: 1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk   |
| NotificationType            | En unik streng som definerer en referanse til predefinerte varslingstekster       |
| TextTokens                  | Liste av tekster som skal erstatte maltekst i varselmal                 |
| ReceiverEndPoints           | Liste av mottaker adresser (ReceiverEndPointBE)                      |
| **ReceiverEndPoint**       |                                                             |
| ReceiverAddress             | Adressen (telefonnummer eller e-postadresse) for mottakspunktet |
| TransportType               | Type varsling: Email, SMS, Instant Message (IM), Both email & sms |
| **TextTokenSubstitutionBE** |                                                         |
| TokenNum                    | Id på maltekst som skal erstattes i varselmal. Varselmal må bestilles og lages på forhånd     |
| TokenValue                  | Tekst som skal ersatte maltekst               |

PrefillEUSExternal.GetPrefillDataV2
----------------

Denne operasjonen kan kalles fra et sluttbrukersystem for å hente preutfyllingsdata for en gitt avgiver og tjenesteutgave.

| Input                      | Beskrivelse  |
|----------------------------|------|
| userSSN                    | Fødselsnummer til bruker i sluttbrukersystemet       |
| userPassword               | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn.  |
| userPinCode                | Pinkode for valgt engangskodetype (authMethod)  |
| authMethod                 | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin    |
| ReporteeNumber             | Fødselsnummer eller organisasjonsnummer det skal hentes ut prefill for |
| ExternalServiceCode        | Tjenestekode for tjenesten som skjemasettet tilhører |
| ExternalServiceEditionCode | Tjenesteutgavekode for tjenesten som skjemasettet tilhører |
| PrefillList                | SBS kan be om preutfylling for spesifikke skjema/underskjema med en opsjonell liste over ønskede skjema. Listen inneholder verdi/verdier som refererer til skjema basert på dets DataFormatID. Det skal ikke være nødvendig å måtte angi DataFormatVersion siden man allerede kjenner til ExternalServiceCode, ExternalServiceEditionCode + DataFormatID, som gir nok informasjon til å finne det aktuelle (under-)skjema. Merk at dette er en liste, slik at man kan hente preutfylling for flere skjema samtidig    |
| PrefillList.DataFormatID   | Liste med en eller flere verdier. Verdien peker på hvilket skjema i et skjemasett man ønsker å hente preutfylling for |
| returnAllFormTasks         | Verdi for å bestemme om Altinn skal returnere alle gyldige skjemaset eller kun det siste. Dersom verdien ikke er definert eller er definert til ‘false’ så returneres kun siste skjemasettet som er preutfylt. Dersom verdien er definert til ‘true’ så returneres de etterspurte skjemaene i alle gyldige preutfylte skjemaset. Det er kun i tilfeller der det er prefill på skjemanivå at det kan returneres mer en ett oppgavesett. |
| Returverdi                 | Beskrivelse  |
| preFillData                | Objekt av typen PreFillDataBE, som inneholder status på hvorvidt preutfyllingsdata ble funnet eller ikke, samt en liste med objekter av typen PreFillFormFieldDataBE, som inneholder selve preutfyllingsdataene og andre metadata    |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                    | Beskrivelse       |
|-----------------------------|------------------|
| **PreFillDataBE**           |   |
| PrefillDataFound            | Samlestatus: Angir om det finnes eller ikke finnes Preutfylling (Tilsvarer: SOPrefillDataFound or RegisterPrefillDataFound)       |
| SOPrefillDataFound          | Angir om det finnes eller ikke finnes Preutfylling fra tjenesteeier    |
| RegisterPrefillDataFound    | Angir om det finnes eller ikke finnes Preutfylling fra Register    |
| PreFillFormTaskBEList       | Liste med objekter av typen PrefillFormTaskBE               |
| **PrefillFormTaskBE**       |             |
| ExternalServiceCode         | Angir den unike tjenestekoden dataene gjelder     |
| ExternalServiceEditionCode  | Angir tjenesteutgavekode dataene gjelder |
| ExternalShipmentReference   | Unik referanse som settes av tjenesteeier for å identifisere forsendelsen |
| IdentityFieldHashCode       | Settes ikke av tjenesteeier. Brukes internt i Altinn |
| PreFillAttachments          | Liste (PrefillAttachmentBE-objekter) som inneholder binære vedlegg for oppgavesettet |
| PreFillForms                | Liste (PrefillFormBE-objekter) som inneholder preutfylte skjema og metadata for et oppgavesett, ett skjema per objekt |
| PreFillIdentityFields       | Liste (PrefillIdentityFieldBE-objekter) som inneholder identifiserende felter for det preutfylte oppgavesettet |
| PrefillNotifications        | Liste (NotificationBE-objekter) med varsler for det preutfylte oppgavesettet |
| ReceiversReference          | Referanse som settes av Altinn|
| Reportee                    | Fødselsnummer eller organisasjonsnummer som identifiserer hvem dataene gjelder|
| SendersReference            | Referanse på preutfylt skjemasett som settes av tjenesteeier|
| ServiceOwnerCode            | Kode som unikt representerer kildesystem, f.eks. ”ABC-123”. Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier. |
| ValidFromDate               | Angir fra når preutfyllingsdata er gyldig (yyyy-MM-dd) |
| ValidToDate                 | Angir til når preutfyllingsdata er gyldig (yyyy-MM-dd) |
| **PrefillAttachmentBE**     |         |
| AttachmentData              | Data for det binære vedlegget  |
| AttachmentName              | Dette er navnet på vedlegget, som det vises i portalen |
| AttachmentType              | MIME-typen for vedlegget                      |
| FileName                    | Navn på fil for det binære vedlegget  |
| SendersReference            | Referanse for vedlegget. Settes av tjenesteeier|
| **PrefillFormBE**           |                   |
| DataFormatID                | Id til skjema fra metadata kilde |
| DataFormatVersion           | Versjon til skjema fra metadata kilde   |
| FormDataXML                 | Preutfyllingsdata for skjemaet. Dataene er lagret som en CDATA blokk. Preutfyllingsdata omfatter eventuell oppgavesettpreutfylling, eventuell feltpreutfylling og eventuell registerpreutfylling |
| SendersReference            | Referanse for skjemaet satt av tjenesteeier  |
| **PreFillIdentityFieldBE**  |                                                           |
| FieldValue                  | Verdi for identifiserende felt, som benyttes for å skille preutfyllingsdata for samme tjenesteutgave og avgiver fra hverandre  |
| **NotificationBE**          |          |
| FromAddress                 | Avsender adresse (e-post). Hvis ikke satt benyttes avsenderadresse satt i varselmalen   |
| ShipmentDateTime            | Når varsel skal sendes til mottaker                              |
| LanguageCode                | Språk kode: 1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk  |
| NotificationType            | En unik streng som definerer en referanse til predefinerte varslingstekster    |
| TextTokens                  | Liste av tekster som skal erstatte maltekst i varselmal       |
| ReceiverEndPoints           | Liste av mottaker adresser (ReceiverEndPointBE)                |
| **ReceiverEndPoint**        |                                |
| ReceiverAddress             | Adressen (telefonnummer eller e-postadresse) for mottakspunktet  |
| TransportType               | Type varsling: Email, SMS, Instant Message (IM), Both email & sms    |
| **TextTokenSubstitutionBE** |                                                      |
| TokenNum                    | Id på maltekst som skal erstattes i varselmal. Varselmal må bestilles og lages på forhånd  |
| TokenValue                  | Tekst som skal ersatte maltekst   |

Case

| Tjenesteoperasjon        | Kort beskrivelse             |
|--------------------------|-------------------------------|
| GetCaseList              | Henter en liste med detaljer for aktive samhandlingstjenester. Operasjonen kan også kalles for å hente ut detaljer for én spesifikk samhandlingstjeneste |
| InstantiateCollaboration | Oppretter en ny samhandlingstjeneste og starter arbeidsflyten for tjenesten    |
| ArchiveCase              | Avslutter arbeidsflyten for en samhandlingstjeneste     |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

Case.GetCaseList
----------------

Operasjonen kan benyttes for å hente ut en liste med detaljer for aktive samhandlingstjenester eller detaljer for én spesifikk samhandlingstjeneste.

| Input                      | Beskrivelse            |
|----------------------------|------------------------------------|
| userSSN                    | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres  |
| userPassword               | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn |
| userPinCode                | Pinkode for valgt engangskodetype (authMethod)    |
| authMethod                 | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin                     |
| caseID                     | Unik identifikator for en samhandlingstjeneste      |
| externalServiceCode        | Unik tjenestekode for en tjeneste             |
| externalServiceEditionCode | Unik kode for en tjenesteutgave             |
| languageID                 | Språk id. Benytt verdien 0 (uspesifisert) da skjemasett vil hentes med språket den ble arkivert med. Språk id: 1033-English, 1044-Bokmål, 1083-Samisk, 2068-Nynorsk   |
| reporteeNumber             | Fødselsnummer eller organisasjonsnummer for de tjenester man ønsker å hente ut |
| **Returverdi**             | **Beskrivelse**     |
| CaseBEList                 | En liste med objekter av typen CaseBE       |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                 | Beskrivelse                                              |
|--------------------------|----------------------------------------------------------|
| CaseBE                   |                                                          |
| CaseID                   | Identifikator for samhandlingstjenesten.                 |
| CaseName                 | Samhandlingstjenestens navn.                             |
| Comments                 | Kommentarer på samhandlingstjenesten.                    |
| CurrentStateFriendlyName | Visningsvennlig navn på samhandlingstjenestens tilstand. |
| CurrentStateID           | Identifikator for samhandlingstjenestens tilstand.       |
| CurrentStateName         | Navn på samhandlingstjenestens tilstand.                 |
| Notice                   | Merknad på samhandlingstjenesten.                        |
| NoticeTemplateID         | Identifikator for merknaden på samhandlingstjenesten     |

Tabellen under angir mulige feilkoder for operasjonen:

| 60001 | Angitt CaseID er ikke gyldig                                                                   |
|-------|------------------------------------------------------------------------------------------------|
| 60002 | Enten tjenestekode og tjenesteutgavekode eller identifikator for samhandlingstjeneste må angis |
| 60012 | Angitt avgiver er ikke gyldig                                                                  |
| 60014 | Angitt CaseID er arkivert                                                                      |
| 60015 | Angitt CaseID er slettet                                                                       |

Case.InstantiateCollaboration
----------------

Denne operasjonen kan kalles fra et sluttbrukersystem for å opprette en instans av en samhandlingstjeneste.

  | Input                      | Beskrivelse       |
|----------------------------|--------------------------|
| userSSN                    | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres                                                                             |
| userPassword               | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn.                                                                 |
| userPinCode                | Pinkode for valgt engangskodetype (authMethod)                                                                                                   |
| authMethod                 | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin |
| externalServiceCode        | Tjenestekode for type samhandlingstjenesten som skal opprettes.                                                                                  |
| externalServiceEditionCode | Tjenesteutgavekode for type samhandlingstjenesten som skal opprettes                                                                             |
| reporteeNumber             | Fødselsnummer eller organisasjonsnummer samhandlingstjeneste instansen skal opprettes for.                                                       |
| externalSystemReference    | Unik referanse for samhandlingstjenesten.                                                                                                        |
| visibleDateTime            | Dato for når samhandlingstjenesten blir synlig i portal (yyyy-MM-dd).                                                                            |
| dueDate                    | Samhandlingstjenestens frist angis her (yyyy-MM-dd).                                                                                             |
| **Returverdi**             | **Beskrivelse**        |
| CaseId                     | Identifikator for den opprettede samhandlingstjeneste instansen   |

Tabellen under angir mulige feilkoder for operasjonen:

| **Feilkode**  |**Beskrivelse**|
  |--------------|-----------------|
|-|-|

Case.ArchiveCase
----------------

Denne operasjonen kan kalles fra et sluttbrukersystem for å arkivere en samhandlingstjeneste.

Sluttbrukersystemet kan velge å angi at samhandlingstjenesten skal arkiveres uavhengig av om tjenestene som tilhører samhandlingstjenesten er arkivert. Dette vil medføre at tilhørende tjenester vil frikobles fra samhandlingstjenesten.

  | Input          | Beskrivelse    |
|----------------|--------|
| userSSN        | Fødselsnummer til bruker i sluttbrukersystemet som skal autentiseres|
| userPassword   | Passordet bruker (i sluttbrukersystemet) har registrert for sin bruker i Altinn |
| userPinCode    | Pinkode for valgt engangskodetype (authMethod) |
| authMethod     | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin |
| caseID         | Unik identifikator for samhandlingstjenesten som skal arkiveres |
| forceArchive   | Angir om elementer som ikke er klare for å arkiveres sammen med samhandlingstjenesten skal frikobles  |
| **Returverdi** | **Beskrivelse**   |
| ArchivedCaseID | Arkiv identifikator for den arkiverte samhandlingstjenesten |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse                                                                  |
|----------|------------------------------------------------------------------------------|
| 60001    | Angitt CaseID er ikke gyldig                                                 |
| 60006    | Samhandlingstjenesten har fremdeles aktive meldingstjenester                 |
| 60007    | Samhandlingstjenesten har fremdeles aktive innsendingstjenester              |
| 60013    | Angitt samhandlingstjeneste er ikke gyldig, eller har blitt arkivert/slettet |

KeyManagement
-------------

| Tjenesteoperasjon | Kort beskrivelse  |
|-------------------|----------|
| GetCertificates   | Henter offentlig sertifikat for tjenesteeiere relatert til en tjeneste som støtter kryptering av sensitiv informasjon |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

KeyManagement.GetCertificates
----------------

Operasjonen kan benyttes for å hente ut en liste med offentlige sertifikater for tjenesteeiere tilhørende tjeneste som støtter kryptering av sensitiv informasjon.

| Input                      | Beskrivelse                                  |
|----------------------------|----------------------------------------------|
| externalServiceCode        | Unik tjenestekode for en tjeneste            |
| externalServiceEditionCode | Unik kode for en tjenesteutgave              |
| Returverdi                 | Beskrivelse                                  |
| CertificateBEList          | En liste med objekter av typen CertificateBE |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property          | Beskrivelse   |
|-------------------|-------|
| **CertificateBE** |   |
| Certificate       | Det offentlige sertifikatet for tjenesteeieren som skal benyttes til å kryptere sensitiv informasjon            |
| CertificateId     | Unik identifikator for sertifikatet, benyttes til å identifisere hvilket sertifikat det er brukt ved innsending |
| ServiceOwnerId    | Unik identifikator på tjenesteeieren sertifikatet tilhører     |

SystemAuthentication
----------

| Tjenesteoperasjon          | Kort beskrivelse                                                |
|----------------------------|-----------------------------------------------------------------|
| GetAuthenticationChallenge | Autentiserer bruker, og returnerer engangskode for tjenestekall |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

SystemAuthentication.GetAuthenticationChallenge
----------------

For å sikre autentisering av en person i Altinn gjennom web service operasjonskall benyttes et tjenestekall som tar i mot informasjon om hvilken bruker som skal autentiseres. Web servicen sender tilbake en melding om hvilken engangskode basert på input om hvilke autentiseringsmetode som ønsker benyttes. Den identifiserte engangskoden operasjonen gir beskjed om i respons må da benyttes ved neste tjenestekall. (Se avsnitt om *autentisering* og hvordan benytte denne web service operasjonen)

Denne tjenesten vil gi tilbakemelding om hvilken engangskode som skal benyttes og også sende en engangskode per SMS hvis dette er valgt autentisering metode.

| Input                  | Beskrivelse     |
|------------------------|--------------------|
| challengeRequest       | Objekt av typen AuthenticationChallengeRequestBE som representerer hvem som ønsker tilgang                                 |
| **Returverdi**         | **Beskrivelse**     |
| autenticationChallenge | Objekt av typen AuthenticationChallengeBE med info om autentiseringstatus, forteller om kallet var suksess eller ikke:            |
|                        | Hvis meldingen inneholder ”OK” så er forespørsel OK og teksten i Message-feltet i denne responsen gir mer informasjon til bruker |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                             | Beskrivelse    |
|--------------------------------------|----------------|
| **AuthenticationChallengeRequestBE** |        |
| SystemUserName                       | Id eller brukernavn som unikt identifiserer sluttbrukersystemet eller brukeren i Altinn. |
| UserSSN                              | Fødselsnummer til bruker i sluttbrukersystemet eller brukernavnet som skal autentiseres  |
| UserPassword                         | Passordet person har registrert for sin bruker i Altinn     |
| AuthMethod                           | Angir hvilken engangskodetype bruker ønskes utfordret på      |
| **AuthenticationChallengeBE**        |         |
| Status                               | Status på forespørsel:    |
| Message                              | Informasjon utover status     |
| ValidFrom                            | Tidspunkt pin de gyldig fra      |
| ValidTo                              | Tidspunkt pin utløper  |

ArchiveCommonExternal

| Tjenesteoperasjon          | Kort beskrivelse                                                   |
|----------------------------|--------------------------------------------------------------------|
| GeneratePaymentInformation | Genererer betalingsinformasjon i xml-format til sluttbrukersystem. |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

ArchiveCommonExternal.GetPaymentInformation
----------------

Denne operasjonen genererer betalingsinformasjon i xml-format til sluttbrukersystem.

Tabellen under beskriver datakontrakten for operasjonen.

| Input                      | Beskrivelse      |
|----------------------------|--------------------|
| systemUserName             | Id som unikt identifiserer sluttbrukersystemet eller brukernavnet i Altinn      |
| systemPassword             | Passord til sluttbrukersystemet eller brukernavnet i Altinn   |
| userSSN                    | Brukers fødselsnummer. Til bruk til autentisering ved evt. Signering     |
| userPassword               | Brukers passord. Til bruk til autentisering ved evt. Signering      |
| userPinCode                | Pinkode. Til bruk til autentisering ved evt. signering   |
| authMethod                 | Angir hvilken engangskodetype bruker (i sluttbrukersystemet) vil autentiseres med. Gyldige typer for denne verdien er: AltinnPin, TaxPin, SMSPin       |
| dataFormatID               | Dataformat     |
| reportee                   | Fødselsnummer eller organisasjonsnummer      |
| year                       | År man ønsker å hente ut betalingsinfo fra         |
| periodeNumber              | Periode man ønsker å hente ut betalingsinfo fra. Denne verdien er avhengig av hvilken verdi parameteren periodeType har. F.eks for periodType=1 er kun 1 gyldig,da det er kun 1 periode for årlig innrapportering. For periodeType=2 er 1 og 2 som er gyldige, for periodeType=3 er det 1,2 og 3 de gyldige verdiene, osv |
| periodeType                | Type innrapporteringsperiode. Denne kan ha følgende verdier: 1 - årlig,2 - halvårlig,3 - hver 4 måned, 4 - kvartalsvis, 5 - annenhver måned, 6 - månedlig, 26 - annenhver uke, 52 - ukentlig, 365 - daglig                                  |
| municipalNumber            | Kommunenummer        |
| formType                   | Type skjema. Kan være 1 - tillegsoppgave, 2 - endringsoppgave og 3 - hovedoppgave |
| externalServiceCode        | Unik tjenestekode for en tjeneste     |
| externalServiceEditionCode | Unik kode for en tjenesteutgave   |

BrokerService – Formidlingstjenester (WS)
---------

| Tjenesteoperasjon     | Kort beskrivelse  |
|-----------------------|-------------------|
| GetAvailableFiles     | Henter en avgivers tilgjengelige formidlingstjenester med metadata og referanse for nedlasting         |
| InitiateBrokerService | Forbereder opprettelse av en formidlingstjeneste ved å sende inn nødvendig metadata, hvorpå fil kan strømmes opp. |
| UploadFileStreamed    | Strømmer opp fil for en gitt referanse basert på opprettelse av formidlingstjeneste  |
| DownloadFileStreamed  | Strømmer ned fil for formidlingstjeneste basert på referanse |

Se avsnittet URI til alle Altinn tjenester / aliasoversikt for endepunkter kapittel 8.3 for informasjon om endepunkter for tjenesteoperasjonene.

BrokerService.GetAvailableFiles
----------------

Operasjonen henter ut tilgjengelige formidlingstjenester som en mottaker kan laste ned.

Listen med filer vil bli filtrert basert på rettigheter.

- Innlogget system må ha rettighetene som kreves for å kunne lese elementer (på tjenesten) på vegne av avgiver.
- Avgiver må fortsatt ha lese rettigheter på tjenesten. (Kan ha mistet rettighetene etter at filen ble opprettet.)
- Innlogget bruker har riktig autentiseringsnivå. For eksempel vil data system innlogging gi nivå 2. Dette vil skjule filer fra tjenester som krever nivå 3.

Hvis en eller flere av disse testene ikke går ok så vil filene det gjelder bli skjult for brukeren. Metoden vil ikke gi noen feilmelding på dette.

| Input                          | Beskrivelse               |
|--------------------------------|-------------------------------------|
| searchParameters               | Objekt av typen BrokerServiceSearch som representerer søkekriteriene for oppslaget mot formidlingstjenestene                                            |
| **Returverdi**                 | **Beskrivelse**                     |
| BrokerServiceAvailableFileList | Objekt av typen BrokerServiceAvailableFileList som inneholder en liste over tilgjengelige formidlingstjenester med informasjon som passer søkekriteriene |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                       | Beskrivelse|
|--------------------------------|------------|
| **BrokerServiceSearch**        |            |
| Reportee                       | Angir for hvilken avgiver formidlingstjenestene skal sjekkes for. Påkrevd felt.                                                                        |
| FileStatus                     | Angir status for formidlingstjenesten det skal søkes for. Mulige verdier er: Uploaded – betyr at formidlingstjenesten er lastet opp av avsender og tilgjengelig for nedlasting. Downloaded – betyr at formidlingstjenesten allerede er lastet ned fra Altinn, men fremdeles tilgjengelig for nedlasting. Feltet er påkrevd      |
| ExternalServiceCode            | Angir tjenestekoden til formidlingstjenesten det skal søkes etter. Må benyttes i sammenheng med ExternalServiceEditionCode. Feltet er valgfritt.       |
| ExternalServiceEditionCode     | Angir tjenesteutgavekoden til formidlingstjenesten det skal søkes etter. Må benyttes i sammenheng med ExternalServiceCode. Feltet er valgfritt.        |
| MinSentDateTime                | Angir dato og klokkeslett for å begrense resultatsett av formidlingstjenester sent inn etter angitt tidspunkt, (yyyy-MM-ddThh:mm:ss).                  |
| MaxSentDateTime                | Angir dato og klokkeslett for å begrense resultatsett av formidlingstjenester sent inn før angitt tidspunkt, (yyyy-MM-ddThh:mm:ss).                    |
| **BrokerServiceAvailableFile** |      |
| FileReference                  | Filreferanse på GUID format som benyttes til å laste ned formidlingstjenesten ved bruk av BrokerServiceStreamed.DownloadFileStreamed (se 6.14.4)       |
| FileName                       | Filnavnet til formidlingstjenesten  |
| FileSize                       | Størrelsen på filen til formidlingstjenesten |
| ReceiptID                      | Identifikator for kvitteringen tilhørende denne forsendelsen og mottaker. Dette er en underkvittering til hoved-kvitteringen sender forholder seg til. |
| FileStatus                     | Viser status for formidlingstjenesten. Mulige verdier er: Uploaded – betyr at formidlingstjenesten er lastet opp av avsender og tilgjengelig for nedlasting. Downloaded – betyr at formidlingstjenesten allerede er lastet ned fra Altinn, men fremdeles tilgjengelig for nedlasting      |
| Reportee                       | Organisasjonsnummer eller fødselsnummer som representerer avsenderen av formidlingstjenesten   |
| SentDate                       | Viser dato og klokkeslett for når formidlingstjenesten ble sent til Altinn, (yyyy-MM-ddThh:mm:ss)       |
| ExternalServiceCode            | Angir tjenestekoden til formidlingstjenesten |
| ExternalServiceEditionCode     | Angir tjenesteutgavekoden til formidlingstjenesten |
| SendersReference               | Angir en referanse for formidlingstjenesten satt av avsender |
| IsSftpDownloadOnly             | Dette feltet angir om formidlingstjenesten kun kan lastes vha. SFTP kanalen på grunn av størrelsen     |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse                    |
|----------|----------------------------|
| 40210    | Tjenestekoder, ExternalServiceCode og/eller ExternalServiceEditionCode, mangler eller er satt til 0 |
| 40214    | Verdi for avgiver er ikke på forventet format for organisasjonsnummer eller fødselsnummer       |

BrokerService.InitiateBrokerService
----------------

Denne operasjonen starter prosessen for å laste opp en ny formidlingstjeneste. Avsender må starte med å laste opp metadata om tjenesten og hvem som skal motta. Når Altinn har verifisert dette vil mottaker få en referanse som videre benyttes for å laste opp selve payloaden.

| Input                   | Beskrivelse                          |
|-------------------------|-----------------------------------------------|
| brokerServiceInitiation | Objekt av typen BrokerServiceInitiation som representerer informasjon tilsvarende manifest.xsd (se 6.15.1) og mottakere (se 6.15.2) for formidlingstjenesten. |
| **Returverdi**          | **Beskrivelse**            |
| string                  | Referanse på GUID format som benyttes for opplasting gjennom BrokerServiceStreamed.UploadFileStreamed (se 6.14.3)               |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                    | Beskrivelse      |
|-----------------------------|---------------|
| **BrokerServiceInitiation** |         |
| Manifest                    | Objekt av typen Manifest. Feltet er påkrevd |
| RecipientList               | Liste med objekter av typen BrokerServiceRecipientExternalBE. Feltet er påkrevd   |
| **Manifest**                |    |
| ExternalServiceCode         | Angir tjenestekoden til formidlingstjenesten som skal opprettes. Feltet er påkrevd   |
| ExternalServiceEditionCode  | Angir tjenesteutgavekoden til formidlingstjenesten som skal opprettes. Feltet er påkrevd  |
| SendersReference            | Referanse som formidlingstjenesten skal knyttes til. Bør være unik. Feltet er påkrevd  |
| Reportee                    | Organisasjonsnummer eller fødselsnummer som angir avgiver for formidlingstjenesten. Feltet er påkrevd   |
| FileList                    | Liste av objekter av typen File. Ment for å kunne utveksle informasjon om innholdet i formidlingstjenesten etter avtale mellom avsender og mottaker – innhold valideres eller endres ikke av Altinn. Feltet er ikke påkrevd                      |
| PropertyList                | Liste av objekter av typen Property. Ment for å kunne utveksle ytterlige egenskaper om formidlingstjenesten med nøkkel og verdi etter avtale mellom avsender og mottaker – innhold valideres eller endres ikke av Altinn. Feltet er ikke påkrevd |
| File                        |                |
| FileName                    | Ment for å kunne angi filnavn. Feltet er påkrevd   |
| CheckSum                    | Ment for å kunne angi sjekksummen for fil |
| **Property**                |     |
| PropertyKey                 | Nøkkel for egenskap. Feltet er påkrevd  |
| PropertyValue               | Verdi for egenskapen definert. Feltet er påkrevd |
| **Recipient**               |    |
| PartyNumber                 | Organisasjonsnummer eller fødselsnummer for ønsket mottaker av formidlingstjenesten. Feltet er påkrevd |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse      |
|----------|--------------------------|
| 40201    | Den aktuelle avgiveren har ikke rettigheter til å sende formidlingstjenesten   |
| 40202    | En eller flere av mottakerne oppgitt finnes ikke, eller har ikke nok rettigheter til å motta formidlingstjenesten    |
| 40210    | Tjenestekoder, ExternalServiceCode og/eller ExternalServiceEditionCode, mangler eller er satt til 0 og angir ikke en formidlingstjeneste |
| 40211    | Bruker er ikke autorisert til å utføre aktuell handling  |
| 40216    | Brukeren er på et sikkerhetsnivå lavere enn påkrevd   |

BrokerServiceStreamed.UploadFileStreamed
----------------

Operasjonen benyttes for å strømme formidlingstjenestens innhold til Altinn basert på en referanse mottatt gjennom kallet til BrokerService.InitiateBrokerService.

| Input                        | Beskrivelse    |
|------------------------------|----------------|
| StreamedPayloadExternalBE[1] | Objekt av typen StreamedPayloadExternalBE som inneholder informasjon og selve stream av fil som opplastes |
| **Returverdi**               | **Beskrivelse**      |
| ReceiptExternalStreamedBE    | Objekt av typen ReceiptExternalStreamedBE som inneholder detaljer for kvitteringen         |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                      | Beskrivelse   |
|-------------------------------|-------------|
| **StreamedPayloadExternalBE** |     |
| Reference                     | Angir referansen payload skal knyttes til. Denne referansen mottas gjennom kallet til InitiateBrokerService, se 6.14.2. Feltet er påkrevd       |
| Reportee                      | Organisasjonsnummer eller fødselsnummer som angir avgiver for formidlingstjenesten. Feltet er påkrevd          |
| FileName                      | Navnet på filen som skal lastes opp. Feltet er påkrevd      |
| DataStream                    | Datastrømmen for fil som lastes opp    |
| **ReceiptExternalStreamedBE** |      |
| ReceiptId                     | Unik identifikator for kvitteringen i Altinn. Benyttes for eksempel ved senere oppdatering av kvittering     |
| ReceiptText                   | Tekst i kvitteringen som angir vellykket opplasting: “Upload of file {filnavn} was successful. Recipients can now download the file.” Eventuelle feil vil returneres som AltinnFaults     |
| ReceiptHistory                | Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken    |
| LastChanged                   | Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss) |
| ReceiptTypeName               | Angir hva kvittering gjelder. Vil i bruk på denne operasjonen alltid returnere BrokerService |
| ReceiptStatusCode             | Status for forsendelse som kvitteringen gjelder: OK, UnExpectedError, ValidationFailed, Rejected  |
| ParentReceiptId               | Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering). For denne operasjonen vil den alltid være 0 |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse                                                                             |
|----------|-----------------------------------------------------------------------------------------|
| 40201    | Den aktuelle avgiveren har ikke rettigheter til å sende formidlingstjenesten.           |
| 40204    | Filen som lastes opp er for stor for opplasting over web service. Bruk SFTP istedenfor. |
| 40205    | Ingen data for fil ble mottatt.                                                         |
| 40206    | Filen som er mottatt er ikke på forventet ZIP-format.                                   |
| 40208    | En fil er allerede lastet opp på den angitte referansen.                                |
| 40209    | Opplastet fil er stoppet av virussjekk.                                                 |
| 40211    | Bruker er ikke autorisert til å utføre aktuell handling.                                |
| 40212    | Oppgitt filreferanse refererer ikke til en formidlingstjeneste.                         |
| 40213    | Angitt avgiver stemmer ikke med informasjon i Altinn.                                   |
| 40216    | Brukeren er på et sikkerhetsnivå lavere enn påkrevd.                                    |

BrokerServiceStreamed.DownloadFileStreamed
----------------

Operasjonen benyttes for å strømme formidlingstjenestens innhold fra Altinn til mottaker basert på en referanse for formidlingstjenesten som kan hentes ved å benytte BrokerService.GetAvailableFiles.

| Input                | Beskrivelse      |
|----------------------|-------------------------------------|
| string fileReference | Angir referansen for formidlingstjeneste som skal strømmes ned. Denne referansen hentes gjennom kallet GetAvailableFiles, se 6.14.1. Feltet er påkrevd. |
| string reportee      | Organisasjonsnummer eller fødselsnummer som angir avgiver for formidlingstjenesten. Feltet er påkrevd                                                  |
| **Returverdi**       | **Beskrivelse**             |
| Stream               | Datastrømmen for formidlingstjenestefilen             |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse                                                                             |
|----------|-----------------------------------------------------------------------------------------|
| 40204    | Filen som lastes ned er for stor for nedlasting over web service. Bruk SFTP istedenfor. |
| 40207    | Den gitte referansen har ikke fil klar for nedlasting.                                  |
| 40211    | Bruker er ikke autorisert til å utføre aktuell handling.                                |
| 40212    | Oppgitt filreferanse refererer ikke til en formidlingstjeneste.                         |
| 40213    | Angitt avgiver stemmer ikke med informasjon i Altinn.                                   |
| 40215    | Angir at mottaker ikke har nødvendige rettigheter til å laste ned formidlingstjenesten. |
| 40216    | Brukeren er på et sikkerhetsnivå lavere enn påkrevd                                     |

BrokerService.ConfirmDownloaded
----------------

Operasjonen benyttes til å bekrefte at man har fått lastet ned en formidlingstjeneste fil i sin helhet. Operasjonen bør kalles rett etter at det er blitt gjort en nedlasting hvis dette gikk bra. Resultatet er at avsender kan se hvem av filens mottakere som har fått hentet filen.

| Input                | Beskrivelse                                                                        |
|----------------------|------------------------------------------------------------------------------------|
| string fileReference | Angir referansen til filen som skal bekreftes nedlastet. Obligatorisk.             |
| string reportee      | Organisasjonsnummer eller fødselsnummer som angir mottaker av filen. Obligatorisk  |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse                                                     |
|----------|-----------------------------------------------------------------|
| 40211    | Bruker er ikke autorisert til å utføre aktuell handling        |
| 40212    | Oppgitt filreferanse refererer ikke til en formidlingstjeneste |
| 40213    | Angitt avgiver stemmer ikke med informasjon i Altinn           |
| 40215    | Angir at mottaker ikke har nødvendige rettigheter              |
| 40216    | Brukeren er på et sikkerhetsnivå lavere enn påkrevd             |

Formidlingstjenester (SFTP)
---------------------------

Avsendere og mottakere av formidlingstjenester kan benytte seg av egen SFTP server på Altinn til å henholdsvis laste opp og ned filer. Som tidligere nevnt vil ikke Altinn forholde seg til eller validere ZIP-filen som lastes opp utover to nøkkelfiler i selve ZIP-filen.

Manifest.xml
----------------

Denne må lastes opp som del av ZIP-filen og validere mot XSD som spesifisert under. Inneholder nøkkelinformasjon om hva slags type formidlingstjeneste det er, og hvem som er avsender. Enkelte felter vil bli oppdatert av Altinn i forbindelse med tilgjengeliggjøring til mottakere. Manifest filen vil være del av ZIP-pakken som mottaker laster
ned.

| Element                    | Påkrevd | Beskrivelse               |
|----------------------------|---------|------------------------------------|
| BrokerServiceManifest      | Ja      | Rotnode                                                                                                                                                             |
| ExternalServiceCode        | Ja      | Angir tjenestekoden til formidlingstjenesten som skal benyttes                                                                                                     |
| ExternalServiceEditionCode | Ja      | Angir tjenesteutgavekoden til formidlingstjenesten som skal benyttes                                                                                               |
| SendersReference           | Ja      | Angir avsenders referanse, som kan benyttes til å søke opp kvittering                                                                                              |
| Reportee                   | Ja      | Angir organisasjonsnummer eller fødselsnummer for avgiver                                                                                                          |
| SentDate                   | Nei     | Dato for når formidlingstjenesten ble mottatt av Altinn. Settes av Altinn, (yyyy-MM-ddThh:mm:ss)                                                                   |
| FileList                   | Nei     | Liste med filer i formidlingstjenesten. Kan angis av avsender. Avsender og mottaker(e) avtaler bruk, Altinn videreformidler kun informasjonen                      |
| File                       | Nei     | Representerer en fil                 |
| FileName                   | Ja      | Angir navn på fil     |
| CheckSum                   | Nei     | Angir checksum for filen        |
| PropertyList               | Nei     | Liste med egenskaper i tilknytning til formidlingstjenesten. Kan angis av avsender. Avsender og mottaker(e) avtaler bruk, Altinn videreformidler kun informasjonen |
| Property                   | Nei     | Representerer en egenskap        |
| PropertyKey                | Ja      | Egenskapens nøkkel                   |
| PropertyValue              | Ja      | Egenskapens verdi                    |

Recipients.xml
----------------

Denne må lastes opp som del av ZIP-filen og validere mot XSD som spesifisert under. Benyttes av avsender til å angi hvem som skal være mottakere av formidlingstjenesten. Recipients filen vil av Altinn fjernes fra ZIP-pakken som mottaker kan laste ned.

| Element                    | Påkrevd | Beskrivelse        |
|----------------------------|---------|---------------|
| BrokerServiceRecipientList | Ja      | Rotnode    |
| Recipient                  | Ja      | Node for hver enkelt mottaker     |
| PartyNumber                | Ja      | Angir organisasjonsnummer eller fødselsnummer for mottaker av formidlingstjenesten |

LookUpExternal – Innsynstjenester (WS)

ExecuteLookUp
----------------

Operasjonen benyttes for å utføre oppslag mot en innsynstjeneste i Altinn.

| Input                        | Beskrivelse      |
|------------------------------|--------|
| LookUpRequest                | Objekt av typen LookUpRequestExternalBE som spesifiserer tjeneste, reportee og spørring/input til innsynstjenesten |
| **Returverdi**               | **Beskrivelse**        |
| ExecuteLookUpResult (string) | Svar fra innsynstjenesten som en tekststreng    |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property           | Beskrivelse  |
|--------------------|--------------|
| **LookUpRequest**  |           |
| QueryData          | Input/spørring til innsynstjenesten som en tekststreng  |
| Reportee           | Organisasjonsnummer eller fødselsnummer som angir avgiver for innsynstjenesten. Feltet er påkrevd |
| ServiceCode        | Angir tjenestekoden til innsynstjenesten som skal benyttes. Feltet er påkrevd  |
| ServiceEditionCide | Angir tjenesteutgavekoden til innsynstjenesten som skal opprettes. Feltet er påkrevd   |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse        |
|----------|--------------------|
| 40028    | Kombinasjonen av ServiceCode og ServiceEditionCode er ikke en gyldig innsynstjeneste     |
| 450067   | Innsynstjenesten er ikke konfigurert med en Mapper og støtter derfor ikke direkte kall gjennom LookUpExternal eller REST API |
| 450068   | Returneres dersom LookUp Mapper returnerer «Bad Request» feil kode   |
| 450069   | Returneres dersom LookUp Mapper returnerer «Forbidden» feil kode    |

AuthorizationExternal – TokenExternal (WS)

GetAccessToken
----------------

Operasjonen benyttes av for å veksle inn autorisasjonskoder, fra samtykke delegering av rettigheter, i en referanse token eller en JWT token.

| Input                            | Beskrivelse       |
|----------------------------------|---------------------|
| AuthorizationCode (Guid)         | Authorisasjonskode (Guid) som skal veksles inn i en authorisasjons token|
| SelfContained (boolean)          | Boolsk verdi for om man ønsker en Self-Contained JWT token eller, en referanse token som retur verdi    |
| **Returverdi**                   | **Beskrivelse**        |
| AuthorizationAccessTokenResponse | Objekt av typen AuthorizationAccessTokenResponseExternalBE som inneholder enten en Referanse Token eller en Self-Contained JWT Token |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| Property                             | Beskrivelse            |
|--------------------------------------|-----------------------------------------|
| **AuthorizationAccessTokenResponse** |                    |
| ReferenceToken                       | Referanse token som en Guid verdi, som kan benyttes opp mot AuthorizationDecisionPointExternal.AuthorizeAccessExternalV2 for å benytte regler knytt til ett spesifikt samtykke |
| SelfContainedToken                   | Enkodet Self-Contained JWT token som en tekststreng, som kan benyttes som autorisasjon direkte mot tjenesteeiers systemer          |

Tabellen under angir mulige feilkoder for operasjonen:

| Feilkode | Beskrivelse                                                                         |
|----------|-------------------------------------------------------------------------------------|
| 50028    | Brukes dersom authorisasjonskoden er ugyldig, eller koden ikke tilhører sluttbruker |

Sammenheng mellom nye og gamle Altinn web services
--------------------------------------------------

Nedenfor vises en oversikt som mapper web service grensesnitt tilgjengelige i AltinnI med de som tilbys i AltinnII versjon 1:

| AltinnI operasjon                                        | AltinnII ver. 1 operasjon                              | Kommentar AltinnII                                       |
|----------------------------------------------------------|--------------------------------------------------------|----------------------------------------------------------|
| DataExchange.ActiveForms                                 | ServiceMetadata.GetAvailableServices                   | AltinnII er tjenesteorientert, ikke skjemaorientert.     |
| DataExchange.AltInnStatus                                | IntermediaryInbound.GetAltinnSubmissionStatus          |                                                          |
| DataExchange.BatchReceiptPw                              | ReporteeArchiveExternal.GetArchivedFormTask            | AltinnII operasjonen henter kun skjemasett, ikke vedlegg |
| DataExchange.BatchReceiptPw                              | ReporteeArchiveExternal.GetAttachmentData              | AltinnII operasjonen henter kun vedlegg, ikke skjemasett |
| DataExchange.GetSchemaDefinition                         | ServiceMetadata.GetFormTaskSchemaDefinitions           |                                                          |
| DataExchange.RequestAuthenticationChallengePw            | SystemAuthentication. GetAuthenticationChallenge       |                                                          |
| DataExchange.RequestInfoText                             | Workflow.GetSigningText                                |                                                          |
| DataExchange.RequestPrefillData                          | Prefill.GetPrefillData                                 | AltinnII versjon 2                                       |
| DataExchange.SubmitBatchPw                               | IntermediaryInbound.SubmitFormTask                     |                                                          |
| MessageReceiptExchange.GetAltUtMessage                   | Correspondence.GetCorrespondenceForEndUserSystemV2     |                                                          |
| N/A                                                      | Correspondence.DeleteCorrespondence                    | Ny web service operasjon i AltinnII                      |
| N/A                                                      | Correspondence.SaveCorrespondenceConfirmation          | Ny web service operasjon i AltinnII                      |
| MessageReceiptExchange.GetAltUtMessageListForArchiveRef  | ReporteeElementList.GetCorrespondenceListForArchiveRef |
| MessageReceiptExchange.GetAltUtMessageListForParticipant | ReporteeElementList.GetCorrespondenceListForReportee   |
| N/A                                                      | ReporteeElementList.DeleteReporteeElement              | Ny web service operasjon i AltinnII                      |
| N/A                                                      | ReporteeElementList.GetFormSetElementsV2               | Ny web service operasjon i AltinnII                      |
| N/A                                                      | ReporteeElementList.GetReporteeElementListV2           | Ny web service operasjon i AltinnII                      |
| MessageReceiptExchange.GetReceipt                        | Receipt.GetReceipt                                     |                                                          |
| MessageReceiptExchange.GetReceiptList                    | Receipt.GetReceiptList                                 |                                                          |
| N/A                                                      | Receipt.UpdateReceipt                                  | Ny web service operasjon i AltinnII                      |
| N/A                                                      | Workflow.DoSendingInAction                             | Ny web service operasjon i AltinnII                      |
| N/A                                                      | Workflow.DoSigning                                     | Ny web service operasjon i AltinnII                      |
| N/A                                                      | Workflow.GetAvailableActionsV2                         | Ny web service operasjon i AltinnII                      |
| N/A                                                      | Workflow.GetNextWorkflowStateTypeInProcessFlowV2       | Ny web service operasjon i AltinnII                      |
| N/A                                                      | Workflow.GetProcessDetailsV2                           | Ny web service operasjon i AltinnII                      |
| N/A                                                      | Workflow.SetBackToFormFilling                          | Ny web service operasjon i AltinnII                      |

Roller og rettigheter
----------------

Hvem kan sluttbrukersystemet rapportere for
-------------------------------------------

Sluttbrukersystemet baserer seg på en ”reportee” og en systemUser.  Sluttbrukersystemet kan rapportere for en participant A (bruker eller organisasjon) eller en participant B, som participant A har rettighet
til å rapportere for.

Når en sluttbrukersystemtype er lagt inn i Altinn, står innrapportører fritt til å disponere sitt eget oppsett av systemer som skal rapportere inn til Altinn. En sluttbrukersystembruker bestemmer selv om han ønsker å opprette kun ett system (enterprisesystemid) som skal rapportere for flere avgivere, eller om han ønsker å opprette flere systemer som skal rapportere for hver enkelt avgiver. Poenget er at systemet må ha rettighet til å rapportere for avgiveren. Det er en forskjell hvordan rettighetene blir håndtert på ny og gammel plattform. På gammel plattform (tjenester som slutter på .asmx) baserer autorisasjonssjekk seg på en enkeltrolle som heter ”systeminnsendingsrettighet gamle tjenester”. Når en avgiver gir denne rollen til eier av systemet vil systemet kunne rapportere for denne avgiveren.

**Eksempel 1:**
System med enterprisesystemid=1 er registrert på regnskapsbyrå A. Klient B delegerer systeminnsendingsrettighet til regnskapsbyrå A. Klient C delegerer også systeminnsendingsrettighet til regnskapsbyrå A. System med enterprisesystem=1 kan rapportere for både B og C.

**Eksempel 2:**
Klient B oppretter et eget system med enterprisesystemid=2 i stedet for å delegere systeminnsendingsrettighet til regnskapsbyrå A. Klient C delegerer systeminnsendingsrettighet til regnskapsbyrå A. I dette tilfellet vil enterprisesystem=2 kunne rapportere for B, mens centerprisesystem=1 vil kunne rapportere for C.

**Eksempel 3:**
Klient B oppretter et eget system med enterprisesystemid=2, og klient C oppretter et eget system med enterprisesystemid=3. I dette tilfellet kan enterprisesystemid=2 rapportere for B, mens enterprisesystemid=3 kan
rapportere for C. Enteprisesystemid=1 kan ikke rapportere for verken B eller C.

For tjenester på ny plattform settes det strengere krav til hvilken rettighet systemet har. Her må det delegeres den rollen/rettigheten for den aktuelle tjenesten hvor det skal utføres innsending/uthenting eller modifisering av data.

**Eksempel 4**
Klient B ønsker at regnskapsbyrå A skal fylle ut RF-1070 som er en tjeneste på ny plattform. Tjenesten krever rollen utfyller/innsender. Klient B må da delegere rollen utfyller/innsender til regnskapsbyrå A for at enterprisesystemID=1 skal kunne rapportere for Klient B på denne tjenesten.

Hvordan delegere systeminnsendingsrett
--------------------------------------

Det er mulig å delegere sluttbrukersysteminnsendingsrett til en revisororganisasjon. Et sluttbrukersystem som er registrert på denne organisasjonen vil dermed kunne sende inn for avgiveren som delegerte rettigheten.

Du kan kun delegere de rettighetene du har selv. For å kunne delegere må du ha en

administrasjonsrettighet i Altinn. Velg Deleger roller enkeltvis i Administrasjonsmenyen, og registrer fødselsnummer og navn til den personen du vil at skal utføre rapportering på vegne av deg. Deretter krysser du av de rettighetene denne personen skal få.

Hvordan komme i gang
-------------------

Registrere sluttbrukersystem / etablere system id
-------------------------------------------------

Eieren av et sluttbrukersystem må registrere dette i Altinn slik at Altinn har mulighet til å autentisere og autorisere systemet på vegne av en avgiver. Ved registrering i portalen opprettes en unik sluttbrukersystemidentifikator, og denne identifikatoren sendes med i alle web service kall som gjøres mot Altinn. Sluttbrukersystemet har da rett til å levere data for alle avgivere eieren av sluttbrukersystemet har rett til å levere for. Eierens rettigheter hentes i utgangspunktet fra enhetsregisteret, men det er også mulig for en avgiver å legge på disse rettighetene eksplisitt i portalen. For å unngå ekstra administrasjon er det derfor meget viktig at avgivere sørger for at enhetsregisteret til enhver tid er oppdatert med korrekte opplysninger.

For at et sluttbrukersystem skal kunne gi data til skjema i Altinn, må den ansvarlige for selskapet, for eksempel daglig leder eller styreformann registrere systemet i Altinn portal. Dette gjøres fra siden
Brukeradministrasjon på følgende måte:

Alternativt kan en bruker også benytte sitt registrerte brukernavn til å bruke tjenestene beskrevet.

Det er da brukerens profil-brukernavn og passord som benyttes i stedet for sluttbrukersystem. Dette gjøres ved å gå inn på «Min Profil» og huke av under «Tillat innsending fra applikasjon eller system med dette brukernavn og passord» i Innloggingsinformasjon. Denne brukeren har kun rettighet til å levere data på vegne av seg selv.

For videre informasjon om registrering og rettighetsadministrasjon, benytt hjelpesystemet til Altinn på
[*http://www.Altinn.no*](http://www.altinn.no/).

Registrere SFTP-bruker
----------------------

For å kunne benytte seg av formidlingstjenester over SFTP-kanalen må det opprettes en virksomhetsbruker med et eget sertifikat. En slik bruker benytter seg av, i tillegg til brukernavn og passord, et sertifikat for å autentisere seg mot Altinns SFTP-server. Når bruker opprettes i Altinns profilsider lastes offentlig nøkkel opp og knyttes til virksomhetsbrukeren, og når denne brukeren så skal autentisere seg mot SFTP-serveren oppgis den private nøkkelen. Sertifikatet, eller nøkkelparet, kan genereres av bruker selv, for eksempel ved bruk av tilgjengelig verktøy slik som PuttyGen[^2]. Formatet som skal benytteser enten OpenSSH eller SSH2.

Merk at virksomhetsbrukere også kan ha et signert sertifikat, for eksempel BuyPass eller Commfides, knyttet til seg. Disse typene sertifikater gir brukeren tilgang til web service og portal, men ikke SFTP.

For at en SFTP-bruker skal kunne benytte en formidlingstjeneste må nødvendige rettigheter være delegert til virksomhetsbrukeren. Dette gjøres på normal måte.

Kovertering fra x.509 sertifikater til SSH2
----------------

For å konvertere et x.509 sertifikat til SSH2 format, som er mulig å bruke for formidlingstjenestens SFTP må man generere en public key i SSH2 format. Dette kan gjøres i verktøyet PuttyGen ved å følge punktene under.

- Eksporter private key fra x.509 sertifikatet.
- Pass på at PuttyGen her satt i SSH2 format, og ikke SSH1
- Importer private key inn i puttygen, dette genererer automatisk en public key basert på private key.
- Lagre public key fra PuttyGen, denne er nå i SSH2 format, og kan brukes i Altinn.
- Hvis ønskelig kan private key nå også lagres fra PuttyGen, og denne vil da også være i SSH2 format.

Etter at man har generert opp nøkkel i SSH2 format, og koblet denne på en bruker i Altinn, så kan man enten bruke det originale x.509 sertifikatet for oppkobling fra SFTP klient, eller benytte seg av eventuelt ny lagret private key i SSH2 format.

URI til alle Altinn tjenester / aliasoversikt for endepunkter
-------------------------------------------------------------

Web servicene beskrevet i dokumentet er angitt uten informasjon om endepunkt. En web service operasjon kan kalles med forskjellige endepunkter ut fra hvilken autentiseringsmetode tjenesteeier ønsker å benytte.

Det tilbys opp til tre forskjellige endepunkter for hver web service operasjon:

- Basic Http (SOAP 1.1) - Tradisjonell interoperabel web service
- WS Http (SOAP 1.2 med WS-Security username token) - Støtte for nye web service standarder WS\*
- WS Http (SOAP 1.2 med WS-Security X.509 token) (markert som EC) - Støtte for ny web standarder WS\*, dvs. bl.a. at sertifikat ligger i SOAP headeren mens brukernavn og passord ligger i meldingen.

For eksempel:

Web service operasjonen GetReceipt kan aksesseres ved å kalle endepunktet.

Hvis man ønsker å bruke/autentisere vha. WS\* standarden, eller kalle endepunktet ”GetReceiptBasic” hvis man ønsker tradisjonell web service aksessering.

Nedenfor følger en oversikt over alle Altinn tjenester, og en aliasoversikt som viser kobling mellom endepunkter, endepunkt operasjon og basis operasjon (operasjon som kalles av endepunktoperasjon, og som er beskrevet i dette dokumentet). Den vil også angi nyeste versjon for operasjonen for endepunktet:

| ReporteeArchiveExternal   |             |     |
|---------------------------|--------------|--------------|
| *Basis operasjon*           | *URI/Endepunkt*                                                                               | *Endepunkt operasjon*               |
| GetArchivedFormTaskV2     | WS Http  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>                 | GetArchivedFormTaskExternalV2     |
|                           | Basic Http  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         | GetArchivedFormTaskBasicV2        |
|                           | EC  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC.svc>                    | GetArchivedFormTaskEC             |
| GetAttachmentDataV2       | WS Http  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>                 | GetAttachmentDataExternalV2       |
|                           | Basic Http  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         | GetAttachmentDataBasicV2          |
|                           | EC  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC.svc>                    | GetAttachmentDataEC               |
| GetAttachmentDataStreamed | WS Http  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalStreamed.svc>         | GetAttachmentDataExternalStreamed |
|                           | Basic Http  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalStreamedBasic.svc> | GetAttachmentDataStreamedBasic    |
|                           | EC  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalStreamedEC.svc>            | GetAttachmentDataStreamedEC       |
| GetArchivedLookup         | WS Http  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>                 | GetArchivedLookupExternal         |
|                           | Basic Http <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         | GetArchivedLookupBasic            |
|                           | EC  <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC.svc>                    | GetArchivedLookupEC               |
| **IntermediaryInbound**       |          |            |
| *Basis operasjon*           | *URI/Endepunkt*                                                                        | *Endepunkt operasjon*            |
| SubmitFormTask            | WS Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>         | SubmitFormTask                 |
|                           | Basic Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc> | SubmitFormTaskBasic            |
|                           | EC  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>    | SubmitFormTaskEC               |
| GetAltinnSubmissionStatus | WS Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>    | GetAltinnSubmissionStatus      |
|                           | Basic Http <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>              |   GetAltinnSubmissionStatusBasic |
|                           | EC  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>    | GetAltinnSubmissionStatusEC    |
| CompleteAndSignShipment   | WS Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>   | CompleteAndSignShipment        |
|                           | Basic Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>| CompleteAndSignShipmentBasic   |
|                           | EC  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>    | CompleteAndSignShipmentEC      |
| **IntermediaryInboundStreamed** |                        |                               |
| *Basis operasjon*             | *URI/Endepunkt*                                                                             | *Endepunkt operasjon*           |
| SubmitAttachmentStreamed    | Basic Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundStreamed.svc>    | SubmitAttachmentStreamed      |
|                             | Basic Http <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasicStreamed.svc>   | SubmitAttachmentStreamedBasic |
|                             | EC  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalECStreamed.svc> | SubmitAttachmentStreamedEC    |
| **Receipt**          |                      |                       |
| *Basis operasjon*  | *URI/Endepunkt*                                                          | *Endepunkt* operasjon   |
| GetReceiptV2     | WS Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>       | GetReceiptV2          |
|                  | Basic Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc>  | GetReceiptBasicV2     |
|                  | EC  <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC.svc> | GetReceiptECV2        |
| GetReceiptListV2 | WS Http  <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>  | GetReceiptListV2      |
|                  | Basic Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc> | GetReceiptListBasicV2 |
|                  | EC  <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC.svc> | GetReceiptListECV2    |
| UpdateReceipt    | WS Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>  | UpdateReceipt         |
|                  | Basic Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc> | UpdateReceiptBasic    |
|                  | EC  <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC.svc> | UpdateReceiptEC       |
| **Correspondence**                      |                               |         |
| *Basis operasjon*                     | *URI/Endepunkt*                                                               | *Endepunkt operasjon*                          |
| GetCorrespondenceForEndUserSystemV2 | WS Http  <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc> | GetCorrespondenceForEndUserSystemsExternalV2 |
|                                     | Basic Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> | GetCorrespondenceForEndUserSystemBasicV2     |
|                                     | EC <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalEC.svc>  | GetCorrespondenceForEndUserSystemsEC         |
| DeleteCorrespondence[1]             | WS Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc> | DeleteCorrespondenceExternal                 |
|                                     | Basic Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc>| DeleteCorrespondenceBasic                    |
| SaveCorrespondenceConfirmation      | WS Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc>  | SaveCorrespondenceConfirmationExternal       |
|                                     | Basic Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> | SaveCorrespondenceConfirmationBasic          |
|                                     | EC  <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalEC.svc>  | SaveCorrespondenceConfirmationEC             |
| **ReporteeElementList**                |                     |                        |
| *Basis operasjon*                    | *URI/Endepunkt*                                                                    | *Endepunkt operasjon*                     |
| DeleteReporteeElement              | WS Http <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>   | DeleteReporteeElementExternal           |
|                                    | Basic Http <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  | DeleteReporteeElementBasic              |
|                                    | EC  <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc> | DeleteReporteeElementEC                 |
| GetFormSetElementsV2               | WS Http <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>   | GetFormSetElementsExternalV2            |
|                                    | Basic Http <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc> | GetFormSetElementsBasicV2               |
|                                    | EC <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>  | GetFormSetElementsEC                    |
| GetReporteeElementListV2           | WS Http   <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>  | GetReporteeElementListExternalV2        |
|                                    | Basic Http  <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  | GetReporteeElementListBasicV2           |
|                                    | EC <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>  | GetReporteeElementListEC                |
| GetCorrespondenceListForArchiveRef | WS Http <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc> | GetCorrespondenceListForArchiveRef      |
|                                    | Basic Http <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc> | GetCorrespondenceListForArchiveRefBasic |
|                                    | EC <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc> | GetCorrespondenceListForArchiveRefEC    |
| GetCorrespondenceListForReportee   | WS Http <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc> | GetCorrespondenceListForReportee        |
|                                    | Basic Http  <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc> | GetCorrespondenceListForReporteeBasic   |
|                                    | EC <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>  | GetCorrespondenceListForReporteeEC      |
| **ServiceMetadata**              |                                                                              |                                   |
| *Basis operasjon*              | *URI/Endepunkt*                                                                | *Endepunkt operasjon*               |
| GetAvailableServicesV2       | WS http  <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternal.svc>   | GetAvailableServicesV2            |
|                              | Basic Http <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternalBasic.svc>| GetAvailableServicesBasicV2       |
| GetFormTaskSchemaDefinitions | WS http  <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternal.svc> | GetSchemaDefinitionsForFormTask   |
|                              | Basic Http <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternalBasic.svc> | GetFormTaskSchemaDefinitionsBasic |
| **Workflow**                                |                               |                            |
| *Basis operasjon*                         | *URI/Endepunkt*                                                                | *Endepunkt operasjon*                          |
| DoSendingInAction                       | WS http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>   | DoSendingInAction                            |
|                                         | Basic http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc> | DoSendingInActionBasic                       |
| DoSigning                               | WS http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>  | DoSigning                                    |
|                                         | Basic http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc> | DoSigningBasic                               |
| GetAvailableActionsV2                   | WS http  <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc> | GetAvailableActionsV2                        |
|                                         | Basic http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc> | GetAvailableActionsBasicV2                   |
| GetNextWorkflowStateTypeInProcessFlowV2 | WS http  <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>  | GetNextWorkflowStateTypeInProcessFlowV2      |
|                                         | Basic http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  | GetNextWorkflowStateTypeInProcessFlowBasicV2 |
| GetProcessDetailsV2                     | WS http<https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc> | GetProcessDetailsV2                          |
|                                         | Basic http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>  | GetProcessDetailsBasicV2                     |
| GetProcessDetailsV3                     | WS http  <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc> | GetProcessDetailsV3                          |
|                                         | Basic http  <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc> |                                              |
| GetSigningText                          | Basic http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc> | GetSigningTextExternal                       |
|                                         | WS http  <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc> | GetSigningText                               |
| SetBackToFormFilling                    | WS http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc> | SetBackToFormFilling                         |
|                                         | Basic http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc> | SetBackToFormFillingBasic                    |
| PrepareUserControlledSigning            | WS http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>  | PrepareUserControlledSigning                 |
|                                         | Basic http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc> | PrepareUserControlledSigningBasic            |
| GetProcessStepIDForParallelSigning      | WS http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc> | GetProcessStepIDForParallelSigning           |
|                                         | Basic http <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc> | GetProcessStepIDForParallelSigningBasic      |
| **PrefillEUSExternal** |                          |                       |
| *Basis operasjon*    | *URI/Endepunkt*                                                            | *Endepunkt operasjon*   |
| GetPrefillData     | WS http  <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternal.svc> | GetPrefillData        |
|                    | Basic http <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternalBasic.svc>  | GetPrefillDataBasicV2 |
|                    | EC <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternalEC.svc> | GetPrefillDataEC      |
| **Case**                     |             |                                       |
| *Basis operasjon*          | *URI/Endepunkt*                                                     | *Endepunkt operasjon*                   |
| GetCaseList              | WS http <https://www.altinn.no/ServiceEngineExternal/CaseExternal.svc>   | GetCaseListExternal                   |
|                          | Basic http <https://www.altinn.no/ServiceEngineExternal/CaseExternalBasic.svc>  | GetCaseListExternalBasic      |
|                          | EC <https://www.altinn.no/ServiceEngineExternal/CaseEC.svc>   | GetCaseListEC                         |
| InstantiateCollaboration | WS http <https://www.altinn.no/ServiceEngineExternal/CaseExternal.svc>   | InstantiateCollaborationExternal      |
|                          | Basic http <https://www.altinn.no/ServiceEngineExternal/CaseExternalBasic.svc> | InstantiateCollaborationExternalBasic |
|                          | EC <https://www.altinn.no/ServiceEngineExternal/CaseEC.svc>  | InstantiateCollaborationEC            |
| ArchiveCase              | WS http <https://www.altinn.no/ServiceEngineExternal/CaseExternal.svc> | ArchiveCaseExternal                   |
|                          | Basic http <https://www.altinn.no/ServiceEngineExternal/CaseExternalBasic.svc> | ArchiveCaseExternalBasic              |
|                          | EC <https://www.altinn.no/ServiceEngineExternal/CaseEC.svc>  | ArchiveCaseEC                         |
| **KeyManagement**   |                            |                         |
| *Basis operasjon* | *URI/Endepunkt*                                                        | *Endepunkt operasjon*     |
| GetCertificates | WS http <https://www.altinn.no/ArchiveExternal/KeyManagementExternal.svc> | GetCertificatesBasic    |
|                 | Basic http  <https://www.altinn.no/ArchiveExternal/KeyManagementExternalBasic.svc> | GetCertificatesExternal |
|                 | EC <https://www.altinn.no/ArchiveExternal/KeyManagementEC.svc>  | GetCertificatesEC       |
| **SystemAuthentication**       |                     |                            |
| *Basis operasjon*            | *URI/Endepunkt*               | *Endepunkt operasjon*        |
| GetAuthenticationChallenge | Basic http <https://www.altinn.no/AuthenticationExternal/SystemAuthentication.svc> | GetAuthenticationChallenge |
| **BrokerService **        |                    |                            |
| *Basis operasjon*       | *URI/Endepunkt*                                                                      | *Endepunkt operasjon*        |
| GetAvailableFiles     | WS http   <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternal.svc>   | GetAvailableFiles          |
|                       | Basic http <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc>   | GetAvailableFilesBasic     |
|                       | EC <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC.svc> | GetAvailableFilesEC        |
| InitiateBrokerService | WS http <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternal.svc>  | InitiateBrokerService      |
|                       | Basic http  <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc>  | InitiateBrokerServiceBasic |
|                       | EC  <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC.svc>  | InitiateBrokerServiceEC    |
| UploadFileStreamed    | WS http <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | UploadFileStreamed         |
|                       | Basic http <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | UploadFileStreamedBasic    |
|                       | EC <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalECStreamed.svc> | UploadFileStreamedEC       |
| DownloadFileStreamed  | WS http  <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | DownloadFileStreamed       |
|                       | Basic http  <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc>  | DownloadFileStreamedBasic  |
|                       | EC  <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalECStreamed.svc> | DownloadFileStreamedEC     |

Alle URI er angitt med produksjonsadresse. Frem til produksjonssetting må <https://www.altinn.no> erstattes med peker til testmiljø.

Vedlegg A: Kodeeksempler for innsending av sensitiv data
----------------

Kodeeksempel på generering av nøkkel i Java ved hjelp av Bouncy Castle
----------------

```xml
private static final String SYMMETRIC\_ALGORITHM = "AES";
private static final int KEY\_SIZE = 128;
keyGenerator = KeyGenerator.getInstance(SYMMETRIC\_ALGORITHM);
keyGenerator.init(KEY\_SIZE);
byte \[\] symmetricKey =
Base64.encode(keyGenerator.generateKey().getEncoded());
```

Kodeeksempel på kryptering av symmetrisk nøkkel ved hjelp av PKI
----------------

```xml
byte \[\] SO\_Certificate = Base64.decode(certificateValue);
X509certificate= (X509Certificate)
certificateFactory.generateCertificate(new
ByteArrayInputStream(SO\_Certificate));
PublicKey rsaPublicKey= X509certificate.getPublicKey();
encryptCipher.init(Cipher.ENCRYPT\_MODE, rsaPublicKey);
bytesOIDandSymmetricKeyEncryptedWithCertificate =
encryptCipher.doFinal(symmetricKey);
byte \[\] tempCertificateValue =
Base64.encode(bytesOIDandSymmetricKeyEncryptedWithCertificate);
certificateValue= new String(tempCertificateValue);
```

Kodekesempel på kryptering av symmetrisk nøkkel ved hjelp av password
---------------------------------------------------------------------

```xml
private static final String MESSAGE\_DIGEST\_ALGORITHM = "MD5";
byte\[\] messageDigestOfPassword = new byte\[PASSWORD.length()\];
char\[\] password = PASSWORD.toCharArray();
MessageDigest messageDigest = MessageDigest.getInstance(MESSAGE\_DIGEST\_ALGORITHM);
for(int i = 0; i &lt; password.length; i++){
messageDigest.update((byte) password\[i\]);
} messageDigestOfPassword = messageDigest.digest();
symmetricPasswordKey = new SecretKeySpec(messageDigestOfPassword,
SYMMETRIC\_ALGORITHM);
Cipher encryptCipher =Cipher.getInstance(SYMMETRIC\_ALGORITHM);
encryptCipher.init(Cipher.ENCRYPT\_MODE, symmetricPasswordKey);
byte \[\] enSyKeyPwd = encryptCipher.doFinal(Base64.decode(symmetricKey));
byte \[\] tempSymmetricKeyEncryptedWithPassword = Base64.encode(enSyKeyPwd);
symmetricKeyEncryptedWithPassword = new String(tempSymmetricKeyEncryptedWithPassword);
```

Kodeeksempel på kryptering av skjemadata
----------------------------------------

```xml
Cipher encryptCipher =Cipher.getInstance(SYMMETRIC\_ALGORITHM);
encryptCipher.init(Cipher.ENCRYPT\_MODE, new
SecretKeySpec(symmetricKey,SYMMETRIC\_ALGORITHM));
byte\[\] encryptedData = null;
encryptedData=encryptCipher.doFinal(formDataOutPut.getBytes());
byte \[\] tempformDataOutPut = Base64.encode(encryptedData);
formDataOutPut= new String(tempformDataOutPut);
```

Eksempel på skjema data med sensitive felt
----------------

```xml
&lt;my:myFields xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xhtml="http://www.w3.org/1999/xhtml"
xmlns:my="http://schemas.microsoft.com/office/infopath/2003/myXSD/2010-06-01T08:11:58"
xmlns:xd="http://schemas.microsoft.com/office/infopath/2003"
xml:lang="nb-NO"&gt;
&lt;my:txtFName&gt;Rune&lt;/my:txtFName&gt;
&lt;my:txtMName&gt;Tømmerås&lt;/my:txtMName&gt;
&lt;my:txtLName&gt;Larsen&lt;/my:txtLName&gt;
&lt;my:dpDOB&gt;1975-07-03&lt;/my:dpDOB&gt;
&lt;my:dpDOJ&gt;2005-10-10&lt;/my:dpDOJ&gt;
&lt;my:txtDept&gt;1005&lt;/my:txtDept&gt;
&lt;my:txtLoc&gt;Oslo&lt;/my:txtLoc&gt;
&lt;my:txtTower /&gt;
&lt;my:txtFloor /&gt;
&lt;my:txtBay /&gt;
&lt;my:txtWorkSN /&gt;
&lt;my:txtFN&gt;8Qgnh6BPUq7OmigGSm8Vvg==&lt;/my:txtFN&gt;
&lt;my:txtDp&gt;eSJAxnzWAx2B71/YWkri8g==&lt;/my:txtDp&gt;
&lt;my:txtWN&gt;eSJAxnzWAx2B71/YWkri8g==&lt;/my:txtWN&gt;
&lt;my:txtSignView&gt;eSJAxnzWAx2B71/YWkri8g==&lt;/my:txtSignView&gt;
&lt;my:dpDJ&gt;2W6ID+y4Hr4hyYo7FpDyiw==&lt;/my:dpDJ&gt;
&lt;my:txtFirst /&gt;
&lt;my:txtMiddle /&gt;
&lt;my:txtLast /&gt;
&lt;my:dpDateOfBirth xsi:nil="true" /&gt;
&lt;my:dpDateOfJoining xsi:nil="true" /&gt;
&lt;my:txtDepartment /&gt;
&lt;my:txtLocation /&gt;
&lt;my:txtTowerPV /&gt;
&lt;my:txtFloorPV /&gt;
&lt;my:txtBayPV /&gt;
&lt;my:txtWStaPV /&gt;
&lt;my:txtPrintView /&gt;
&lt;my:dpDOJRV xsi:nil="true" /&gt;
&lt;my:txtDeptRV /&gt;
&lt;my:txtLocRV /&gt;
&lt;my:txtTowerRV /&gt;
&lt;my:txtFloorRV /&gt;
&lt;my:txtBayRV /&gt;
&lt;my:txtWSRV /&gt;
&lt;my:txtReceiptView /&gt;
&lt;my:field1 /&gt;
&lt;/my:myFields&gt;
```

Vedlegg B - Regler for sammenlikning av skjemasett
----------------

Prinsipper
----------

Ved innsending fra sluttbrukersystem skal i utgangspunktet følgende tre prinsipper gjelde etter innføring av 18550:

- Altinn skal ikke endre på skjemasettet som blir sendt inn av SBS.
- Altinn kan imidlertid tilføye kalkulerte felter som SBS *unnlater* å sende inn (eller sender inn uten verdi, se punkt XML og syntaks-konvensjoner.
- Skjemasett med feil skal i utgangspunktet stoppes av Altinn og innsending skal feile.

Det andre prinsippet åpner for at SBS kan benytte seg av kalkyler og registerprefill som er bygget inn i skjemasettet ved å unnlate å sende inn de aktuelle feltene. Altinn vil da tilføye feltene med beregnet eller forhåndsutfylt verdi. Kvitteringen til SBS vil indikere alle felter som ikke ble sendt inn fra SBS, men ble tilføyd av Altinn og sendt videre til tjenesteeier. Feltverdien (fra kalkyle eller prefill) er også angitt i kvitteringen.

Merk imidlertid at SBS kan hente prefilldata selv dersom disse skal benyttes. Denne metoden er mer robust ettersom den ikke krever kunnskap om hvilke felter som har prefilldata. Man vil da verken få advarsel eller feil på registerprefill-felter.

Tjenesteeier har mulighet til å fravike det tredje prinsippet ved å definere *overstyrbare felter*. Overstyrbare felt vil kun gi advarsel ved ulik verdi (ikke feilmelding). Tjenesteeier kan også fravike fra det tredje prinsippet ved å bruke opsjonen "Kun XSD-validering". Dersom et skjema har kun XSD-validering vil verken sammenlikningsreglene beskrevet i dette vedlegget eller eventuelle valideringer og kalkyler i skjemaet kjøres for skjemaet ved innsending fra SBS.

Sammenlikning av skjemasett
---------------------------

Når SBS sender inn et skjemasett tar Altinn en kopi av innsendingen. Kopien gjennomgår så samme behandling som innsendinger i SBL, hvilket medfører at denne kopien modifiseres; felter kan bli lagt til eller skrevet over. Det kan også resultere i advarsler eller feil fra skjemamotoren (valideringsfeil i skjemaet, for eksempel at et påkrevd felt mangler eller at organisasjonsnummer ikke er oppgitt på et gyldig format).

Altinn sammenlikner deretter den modifiserte kopien av skjemasettet med den innsendte originalen. I hovedsak består dette i å sammenlikne felt for felt de to versjonene. Når feltverdier er ulike fører det til en feil (slik at innsending feiler) eller advarsel (når feltet er flagget som overstyrbart). Hva dette betyr er mer presist definert i det påfølgende.

Funksjonaliteten
----------------

Endringen har blitt implementert som en modul som kjøres under komplett innsending fra SBS. Denne vil kjøre i tillegg til de vanlige modulene (XSD-validering, instansiering av skjema med kjøring av valideringer, kalkuleringer og dynamikk, prefill-validering). Tidspunktet 18550-modulen kjøres er etter instansiering av skjema.

- Opprinnelig XML for skjema sendes inn fra sluttbrukersystem (SBS).
- XSD validering av opprinnelig XML utføres. Dersom XSD validering feiler så gis det en god, tydelig og   informativ valideringsfeil til SBS og innsending feiler.
- XSD-valideringen er nå en fullstendig XSD-validering i motsetning til tidligere hvor tomme element alltid ble godtatt uansett type (Integer, decimal, string, osv).   b.  Dersom XSD validering er ok så fortsetter prosessen til neste validering steg.
- Altinn kjører nå kalkyler basert på innsendte data fra SBS. Deretter sammenlignes verdiene fra SBS med de       kalkulerte verdiene (registerprefill, verdioverføringer, kalkyler) fra Altinn.
- Resultatet av sammenligningen resulterer i en liste med feil og advarsler som vises i kvitteringen.
- Merk at advarsler ikke resulterer i at innsending stoppes, men er kun ment som informasjon at noe er ulikt       det som forventes. Sluttbrukersystem trenger ikke å agere på dette ved mindre de oppdager at innsendte data     faktisk er feil.
- Det er opp til tjenesteeier å bestemme hvilke felter som skal gi advarsel eller feilmelding ved ulik verdi.      Overstyrbare felter vil resultere i advarsel.

XML og syntaks-konvensjoner
---------------------------

Reglene er formulert med begrepene felt og feltverdi. Det er derfor nyttig å først relatere disse begrepene til XML-representasjonen. Noen ganger finnes det mer enn én måte å representere det samme på.

Tabellen under oppsummerer syntaks-konvensjonene.

|Beskrivelse| Eksempler| Feltverdi field1 |
|------------|-----------|----------------------|
|Felter er representert som XML-elementer. Feltverdien er elementets InnerText|`<record> <field1>Kyrre Krakk</field1><field2>Baneveien 2</field2></record>`|"Kyrre Krakk"|
|Felter som ikke er sendt inn (XML-elementet er utelatt) eller som sendes inn med xsi:nil attributtet spesifisert med verdi "true" er ekvivalente; feltverdien er nil.|`<record>  <field2>Baneveien 2</field2> </record> <record> <field1 xsi:nil="true"></field1><field2>Baneveien 2</field2></record><record><field1 xsi:nil="true"/><field2>Baneveien 2</field2></record>`|nil|
|Når XML-elementet er sendt inn, ikke spesifiserer xsi:nil attributtet med verdi "true", og enten er et tomt (selv-lukket) element eller ikke inneholder noen tekstnoder, er feltverdien tom streng.|`<record><field1></field1><field2>Baneveien2</field2></record><record> <field1/><field2>Baneveien 2</field2></record>`|"" tom streng|

Like og ulike feltverdier
-------------------------

Nedenstående tabell oppsummerer hvordan Altinn bedømmer feltverdier som like eller ulike.

  {{< figure src="/docs/images/guides/sluttbrukersystemer/likeUlikeFeltverdier.png" title="" >}}

Dette er for det meste som man ville forvente, men med et par unntak det er verdt å merke seg:

- Dersom SBS sender inn tom streng men "InfoPath-verdi" er *nil* betraktes dette som likt - men det omvendte er ikke tilfellet. (Årsaken til dette er at InfoPath endrer *alle* felter med tom streng til NIL.)
- Preutfylte felter sammenliknes alltid som strenger (case insensitivt).
- Andre felter sammenliknes med en betinget tallsammenlikning når det er mulig (oppsummert i tabell under). Betinget tallsammenlikning betyr at "4.0", "4" og "0004.00" alle betraktes som like. Merk imidlertid at XSD som regel begrenser hva slags tallrepresentasjoner som er tillatte!

Betinget tallsammenlikning kan oppsummeres som følger:

{{< figure src="/docs/images/guides/sluttbrukersystemer/betingetTallsammenlikning.png" title="" >}}

Tabellen nedenfor oppsummerer når det gis feil eller advarsel, samt hva som sendes til tjenesteeier.

| XML er i henhold til XSD | Kun XSD-validering | Ulik feltverdi | Overstyrbart felt | Resultat        | Hva sendes til tjenesteeier|
|--------------------------|--------------------|----------------|-------------------|-----------------|---------------|
| Nei                      | N/A                | N/A            | N/A               | Feil            | ingenting (innsending feiler)                                                                                    |
| Ja                       | Ja                 | N/A            | N/A               | OK              | Innsendt verdi fra SBS.                                                                                          |
| Ja                       | Nei                | Nei            | N/A               | OK              | Innsendt verdi fra SBS.                                                                                          |
| Ja                       | Nei                | Ja             | Ja                | Advarsel        | Innsendt verdi fra SBS hvis denne eksisterer (feltverdi <> nil), ellers Altinn-beregnet verdi.*)                 |
| Ja                       | Nei                | Ja             | Nei               | Feil/Advarsel*) | ingenting (innsending feiler) Altinn-beregnet Verdi hvis SBS ikke angir påstand ved å utelate XML-element/nil *) |

N/A = har ingen betydning.

- Merk at Altinn kan legge til data i kalkyler og preutfylte felt utover det SBS har sendt inn hvis følgende scenario er tilstedet:\ SBS har ikke sendt inn en påstand (XML element ikke tilstedet/NIL uavhengig om feltet er satt til overstyrbart eller ikke av Tjenesteeier. Det vil da bli gitt en Advarsel til SBS i kvittering.
- Merk at dette er i tillegg til feil og advarsler som kommer fra valideringsregler i skjemasettet (myke valideringer gir advarsel, harde valideringer gir feil).

I praksis
---------

I praksis vil 18550-endringen by på mindre til ingen endringer for sluttbrukersystemene. Det sluttbrukersystemleverandørene må ta høyde for nå er at det kan komme advarsler i kvitteringer på innsendinger som har blitt instansiert korrekt. Advarslene vil komme på samme måte som myke skjemavalideringer og må eventuelt presenteres for brukeren av systemet. Feilmeldinger som blir produsert av denne 18550-endringen vil komme på samme måte som vanlige skjemavalideringsfeil og innsendingen vil stoppes.

Sluttbrukersystem brukerne vil nok ikke merke store forskjellen fra tidligere. De vil oppleve å få tilbake mer informasjon i kvitteringen enn tidligere.

Kjente feil/mangler for SBS
---------------------------

- Det blir gitt en advarsel hvis grupper i XML er utelatt.
- Ikke språkstøtte på advarsel og feilmelding i kvittering.

Vedlegg C: Flytdiagram for formidlingstjeneste

{{< figure src="/docs/images/guides/sluttbrukersystemer/flytdiagramFormidlingstjeneste.png" title="Figur 1: Opp- og nedlasting over web service" >}}

{{< figure src="/docs/images/guides/sluttbrukersystemer/lastingOverSFTP.png" title="Figur 1:Figur 2: Opp- og nedlasting over SFTP" >}}