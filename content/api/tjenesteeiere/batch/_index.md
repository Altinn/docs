---
title: Batch
description: Oversikt over hvilke batch grensesnitt som tilbys i Altinn.
weight: 500
toc: true
aliases:
- /guides/integrasjon/tjenesteeiere/batch/
---

## Innsendingstjenester
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

## Preutfylling

Preutfyllingsdata fra tjenesteeier vil ofte bestå av store mengder data. Batch-grensesnittet skal i så fall benyttes. Batch-grensesnittet kan også benyttes av tjenesteeiere som ikke ønsker å benytte web service-grensesnittet. Alternative protokoller som benyttes i Altinn-løsningen i dag er FTP eller SFTP. Tjeneste for oppgavesettet må være definert i tjenesteutviklingsløsningen og migrert til sluttbrukerløsningen før en tjenesteeier kan sende inn preutfyllingsdata for tjenesten via dette grensesnittet.

Ved bruk av FTP/SFTP mottar Altinn fil fra tjenesteeier. Alternativt kan Altinn kan hente hos tjenesteeier vha. de samme protokollene hvis tjenesteeier ikke ønsker å etablere egen FTP server (gjelder kun tjenesteeiere som ikke skal motta meldingsbekreftelser fra Altinn, se avsnitt 10.4.2 Meldingsbekreftelse fra Altinn til tjenesteeier). Opplysninger om FTP adresse, pålogging og frekvens må avtales før valgt kommunikasjonsmåte kan aktiviseres. Dersom Altinn skal hente hos tjenesteeier må tjenesteeier se til at angitt FTP område til enhver tid er tilgjengelig for Altinn.

En kvittering for forsendelsen, samt kvitteringer for de enkelte skjemaene i forsendelsen, genereres når forsendelsen er ferdig prosessert i Altinn. Tjenesteeier kan hente ut kvitteringene basert på ExternalShipmentReference/SendersReference som ble oppgitt i preutfyllingsformatet.

Preutfyllingsdata som sendes til Altinn fra tjenesteeier eller hentes fra Altinn må være i henhold til Prefill-elementet i [serviceinitiation.2010.10.xsd](skjemaer/schemas.altinn.no.services.intermediary.serviceinitiation.2009.10.xsd).

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
|ServiceOwner.Prefill.Reportee.FormTask.IdentifyingFields|Overordnet element for identifiserende felter. IdentifyingFields-elementet kan inneholde identifiserende felter som sammen unikt vil identifisere et preutfyllingssett for en avgiver og et skjemasett.|
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

## Abonnement

Abonnementsdata fra tjenesteeier vil ofte bestå av store mengder data. Batch-grensesnittet skal i så fall benyttes. Batch-grensesnittet kan også benyttes av tjenesteeiere som ikke ønsker å benytte web service-grensesnittet. Alternative protokoller som benyttes i Altinn-løsningen i dag er FTP og SFTP. Tjeneste for skjemasettet må være definert i tjenesteutviklingsløsningen og migrert til sluttbrukerløsningen før en tjenesteeier kan sende inn abonnementsdata for tjenesten via dette grensesnittet.

Ved bruk av FTP/SFTP mottar Altinn fil fra tjenesteeier. Alternativt kan Altinn kan hente hos tjenesteeier vha. de samme protokollene hvis tjenesteeier ikke ønsker å etablere egen FTP server (gjelder kun tjenesteeiere som ikke skal motta meldingsbekreftelser fra Altinn, se avsnitt 10.4.2 Meldingsbekreftelse fra Altinn til tjenesteeier). Opplysninger om FTP adresse, pålogging og frekvens må avtales før valgt kommunikasjonsmåte kan aktiviseres. Dersom Altinn skal hente hos tjenesteeier må tjenesteeier se til at angitt FTP område til enhver tid er tilgjengelig for Altinn.

En kvittering for forsendelsen, samt kvitteringer for de enkelte skjemaene i forsendelsen, genereres når forsendelsen er ferdig prosessert i Altinn. Tjenesteeier kan hente ut kvitteringene basert på ExternalShipmentReference/SendersReference som ble oppgitt i abonnementsformatet.

Abonnementsdata som sendes til Altinn fra tjenesteeier eller hentes fra Altinn må være i henhold til Subscription-elementet i [serviceinitiation.2010.10.xsd](skjemaer/schemas.altinn.no.services.intermediary.serviceinitiation.2009.10.xsd).

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
|ServiceOwner.Subscription.Reportee.FormTask.IdentifyingFields|Overordnet element for identifiserende felter. IdentifyingFields-elementet kan inneholde identifiserende felter som sammen unikt identifisere et allerede innsendt preutfylte skjemasette som abonnenten skal benytte.|
|IdentifyingField|Verdi for identifiserende felt, kan være slike felter per abonnement og må være de(t) samme som finnes på et allerede innsendt preutfylt skjemasett for abonnenten|

## Melding

Meldinger som skal vises til bruker i portal/sluttbrukersystem sendes fra tjenesteeier til Altinn. Åpne– og lesebekreftelser sendes tilbake fra Altinn til tjenesteeier når bekreftelse(r) er mottatt fra portal/sluttbrukersystem.

### Melding fra tjenesteeier til Altinn

Meldingsdata som består av store mengder data skal benytte batch-grensesnittet. Batch-grensesnittet kan også benyttes av tjenesteeiere som ikke ønsker å benytte web service-grensesnittet. Alternative protokoller som benyttes i Altinn-løsningen i dag er FTP og SFTP. En meldingstjeneste må være definert i tjenesteutviklingsløsningen og migrert til sluttbrukerløsningen før en tjenesteeier kan sende inn meldingsdata for tjenesten via dette grensesnittet.

Ved bruk av FTP/SFTP mottar Altinn fil fra tjenesteeier. Opplysninger om FTP adresse, pålogging og frekvens må avtales før valgt kommunikasjonsmåte kan aktiviseres. Dersom Altinn skal hente hos tjenesteeier må tjenesteeier se til at angitt FTP område til enhver tid er tilgjengelig for Altinn.

Det finnes to batch grensesnitt for registrering av meldinger:

 - **Correspondence** Format skreddersydd for siste versjon av Altinn. Oppdateres etter hvert som Altinn videreutvikles. Skal benyttes av alle nye tjenesteeiere.
 - **Altut** Format fra tidligere versjon av Altinn, tilbys kun for bakoverkompatibilitet for eksisterende tjenesteeiere, og det vil ikke bli oppdatert etter hvert som Altinn videreutvikles.
   Det inneholder elementer som ikke lenger er i bruk i Altinn, og enkelte elementer har fått ny funksjonalitet som betyr at eksisterende grensesnitt må endres.
   Siste versjon av Altinn har funksjonalitet som ikke støttes av Altut formatet.

En kvittering for forsendelsen genereres når forsendelsen er ferdig prosessert i Altinn. Tjenesteeier kan hente ut kvitteringene basert på ShipmentReference/SendersReference som ble oppgitt i meldingsformatet.

### Correspondence format

Meldinger som sendes til Altinn fra tjenesteeier i form av eb batch må være i henhold til [schemas.altinn.no.services.intermediary.correspondence.2020.11.xsd](../batch/skjemaer/schemas.altinn.no.services.intermediary.correspondence.2022.11.xsd). Det er verd å merke seg at namespace til schema er "http://schemas.altinn.no/services/intermediary/correspondence/2009/10".

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
|TransportType|Angir om varsel skal sendes som epost eller SMS. Lovlige verdier er: <ul><li>**SMS** - Altinn vil sende varsel som SMS hvis det er oppgitt et mobilnummer i ReceiverAddress eller avgiver har registrert et eller flere mobilnummer. Hvis avgiver er en organisasjon vil det sendes varsel til alle registrerte mobilnummer.</li><li>**Email** - Fungerer på samme måte som *SMS*, men med epost som kanal.</li><li>**Both** - Altinn vil sende varsel både som epost og SMS om mulig. Hvis avgiver kun har registrert en epostadresse vil det sendes varsel som epost. Tilsvarende for mobilnummer. En organisasjon vil få varsel på alle registrerte varslingsadresser.</li><li>**SMSPreferred** - Altinn vil sende varsel som SMS hvis avgiver har registrert et mobilnummer. Hvis avgiver ikke har registrert dette vil det isteden bli sendt varsel som epost. Forutsatt at det finnes en registrert epostadresse. En organisasjon vil bli sendt varsel på alle varslingsadresser av riktig type.</li><li>**EmailPreferred** - Fungerer på samme måte som *SMSPreferred*, men med epost som kanal.</li></ul>|
|ReceiverAddress|Mobilnummeret eller epostadressen til mottaker av varsel. Dette må passe med TransportType Email eller SMS. Feltet er valgfritt og hvis feltet er tomt vil Altinn forsøke identifisere riktige mottakere basert på avgiver og TransportType. Feltet må være tomt for TransportType Both, SMSPreferred og EmailPreferred.|
|Correspondences.Correspondence.NOtifications.Notification|Forts.|
|UseServiceOwnerShortNameAsSenderOfSms|Settes for å sette tjenesteeiers ShortName (settes per tjenesteeier ved bestilling) som avsender av SMS til mottaker.|
|Correspondences.Correspondence|Forts.|
|AllowForwarding|Angir om meldingen skal kunne videresendes av bruker i portalen|
|CaseId|Unik identifikator for samhandlingstjenesten|

### Altut format

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

### Meldingsbekreftelse fra Altinn til tjenesteeier

**Correspondence**
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

##### AltUtConfirmationBatch

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

##### CorrespondenceUsageData

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
