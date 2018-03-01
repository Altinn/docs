---
title: Web Service
description: Webservice operasjoner med beskrivelse
weight: 200
---

![""](webservice.png)

Her følger et uttrekk over hvilke web services som tilbys i Altinn. Tjenestene er beskrevet uavhengig av hvilken autentiseringsmetode den enkelte tjenesteeier ønsker å benytte. Se avsnitt om Autentisering og autorisering, for informasjon om metodenavn.

For ytterligere informasjon for web services henvises leser også til Tjenestekatalogen og de enkelte tekniske spesifikasjoner tilgjengelig som WSDL’er fra respektive endepunkt.

Se Vedlegg A: Feilkoder i Altinn for en liste over mulige feilkoder i Altinn.

#### ArchiveCommon

Tjenesten ArchiveCommon inneholder operasjoner for uthenting av arkivdata fra tjenesteeiers arkiv.

Påfølgende kapittel beskriver tjenesteoperasjonen for denne arkivtjenesten.

#### GetServiceOwnerArchiveReporteeElementsV2

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
|ElementType|Element type: Archive, Active, Correspondence, ArchiveCorrespondence, LookUp, Collaboration|
|IsAltinn1|Flagg som indikerer om elementet eksisterer i AltinnI|
|IsCorrespondenceConfirmationRequired|Hvorvidt meldingsbekreftelse er påkrevd eller ikke|
|ArchiveReference|Referansen fra Altinn arkivet.|
|SystemTypeName|Typenavn på sluttbrukersystem. Kan være tomt|
|ExpiryDate|Angir eventuelt når elementet er planlagt slettet|

### ServiceOwnerArchive

Tjenesten ServiceOwnerArchive inneholder operasjoner for uthenting av elementer fra tjenesteeiers arkiv (ikke tilgang til arkiverte elementer fra tidligere versjoner av Altinn).

Påfølgende kapitler beskriver operasjonen for denne tjenesten.

### GetArchivedFormTaskV2

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
|SignedByUserSSN|Fødselsnummer til bruker som har signert / organisasjonsnummer til virksomhetsbruker som har signert|
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

#### GetArchiveShipmentStatusV2

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

#### GetAttachmentDataStreamed

Denne operasjonen benyttes for å hente ut data for ett gitt vedlegg in den tilfelle vedlegg er større en 30MB. GetArchivedFormTaskV2 må kalles for å få detailene om den binær filen returnerte av denne metoden.

Tabellen under beskriver datakontrakten for operasjonen.

|Input|Beskrivelse|
|--------|--------|
|AttachmentID|Unik identifikator for et vedlegg|
|**Returverdi**|**Beskrivelse**|
|Attachment|Stream som inneholder et binært vedlegg|

### Receipt

Tjenesten Receipt inneholder operasjoner for å oppdatere og hente kvitteringer i Altinn.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.

#### GetReceiptV2

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

#### GetReceiptListV2

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

#### UpdateReceipt

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
|0|System/bruker har ikke tilgang til kvitteringen som forsøkes 
oppdatert. (Feilkode blir ikke angitt grunnet en bug)|

#### Correspondence

Det finnes to tjenestegrensesnitt relatert til meldinger:

Correspondence - Operasjonene er skreddersydd for siste versjon av Altinn. Oppdateres etter hvert som Altinn videreutvikles. Skal benyttes av alle nye tjenesteeiere.
Altut - Operasjoner fra tidligere versjon av Altinn. Tilbys kun for bakoverkompatibilitet for eksisterende tjenesteeiere, og det vil ikke bli oppdatert etter hvert som Altinn videreutvikles. Grensesnittet inneholder elementer som ikke lenger er i bruk i Altinn, og enkelte elementer har fått ny funksjonalitet som betyr at eksisterende grensesnitt må endres. Siste versjon av Altinn har funksjonalitet som ikke støttes av Altut formatet.
Tjenesten Correspondence inneholder operasjoner relatert til meldinger.
Påfølgende kapittel beskriver tjenesteoperasjonen for denne tjenesten.

#### InsertCorrespondenceV2

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
|MessageSender|Avsender som skal vises for sluttbruker, kan være forskjellig fra etat, hvis den ikke fylles ut brukes etaten som eier tjenesten. Merk: Avsender skal alltid være en offentlig virksomhet, ikke en privatperson eller privat virksomhet.|
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

### CreateSimpleCorrespondenceService

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

##### GetCorrespondenceStatusDetails

Denne metoden bør helst ikke benyttes. Benytt isteden versjon 3.

Årsaken til versjonering av denne operasjonen er endring av kontrakten. Ved innføring av Kontakt og reservasjonsregisteret til difi ble det innført en ny status på Correspondence. Dette er en status som indikerer at mottaker har reservert seg mot å motta elektronisk kommunikasjon.

##### GetCorrespondenceStatusDetailsV2

Denne metoden bør helst ikke benyttes. Benytt isteden versjon 3.

Årsaken til denne versjoneringen er ny funksjonalitet knyttet til Sikker Digital Post.

##### GetCorrespondenceStatusDetailsV3

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

##### GetCorrespondenceStatusHistory

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
|Recipient| Varselets mottaksadresse. E-postadresse eller telefonnummer|
|SentDate| Dato og klokkeslett for når varselet er sendt. Om feltet er tomt (null) betyr det at varselet ikke er sendt|
|TransportType| Typen varsling:	Email, SMS, IM (Instant Message), Both (email og SMS)|
|**StatusChange**||
|StatusDate|Dato og klokkeslett for når statusen endret|
|StatusType|Statusen meldingen endret til. Mulige verdier er: Created – meldingen ble opprettet av tjenesteeier, Read – meldingen ble lest av en bruker,Confirmed – meldingen ble bekreftet lest av en bruker, Reserved – mottaker har reservert seg mot elektronisk kommunikasjon. Meldingen er ikke synlig for mottaker|
|**SdpStatusInformation**||
|SdpStatusDetailsList|Liste over digitale brev laget gjennom Altinn og deres status historikk (SdpStatusDetails)|
|LimitReached|Dette er et flag som indikerer hvorvidt listen er komplett eller ikke. Hvis dette feltet er true så betyr det at søkekriteriene bør endres slik at det er mer begrensende|
|**SdpStatusDetails**||
|SdpId| En unik ID for elementet definert i Altinn
|CorrespondenceId| Unik ID for correpondence hvis Altinn har fått kopi eller har fungert som backup|
|CreatedDateTime|Tidspunktet for når det digitale brevet først ble registrert i Altinn|
|LastChangedDateTime|Tidspunktet for når status på elementet ble sist oppdatert|
|Reportee|Avgiver i form av personnummer eller organisasjonsnummer. (Brevets mottaker)|
|Reference| En referanseverdi som tjenesteeier kan gi alle digitale brev. Kan brukes hvis det lages mange brev samtidig for å identifisere alle som ble opprettet sammen.
|StatusHistory|Brevets status historikk. Dette er en liste med de statuser brevet har hatt (SdpStatusChange)|
|**SdpStatusChange**||
|Status| Unknown – Ukjent status, Sent_Meldingsformidler – Altinn har laget brevet og sendt det inn i SDP systemet, Delivered_EndUser – Brevet har gått gjennom systemet og blitt levert til sluttbruker, Delivery_EndUser_Failed – Brevet kunne ikke leveres, Reserved – Altinn lagde ikke noe brev fordi sluttbruker har reservert seg mot digital post, NoMailBox – Altinn lagde ikke noe brev fordi sluttbruker ikke har registrert noen postboks i kontakt og reservasjonsregisteret|
|StatusDateTime|Tidspunktet for når statusen ble satt|

##### AltUt

For bakoverkompatibilitet tilbys AltUt grensesnittet for registrering av meldinger til eksisterende tjenesteeiere. Nye tjenesteeiere skal benytte nytt tjenestegrensesnitt. AltUt grensesnittet vil ikke bli oppdatert ettersom Altinn videreutvikles.

##### SubmitAltutMessagePw

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

## Preutfylling (Prefill)

Denne tjenesten inneholder operasjoner som benyttes av tjenesteeier for å sende inn preutfylte oppgavesett for avgivere. Det finnes tre typer preutfyllingsinformasjon:

 - **Preutfylling av oppgavesett.** Hele oppgavesettet (hoved- og underskjema) sendes inn med preutfyllingsinformasjon.
   Tjenesteeier kan også velge å legge til binære vedlegg for preutfylte oppgavesett.
 - **Preutfyllingsinformasjon angitt som felt/verdi.** Feltet viser til en unik id som benyttes i skjemaer, og det angis verdi for feltet.
 - **Registerdata.** Statisk informasjon som sendes inn fra nasjonale registre.

Prefilltjenesten har kun støtte for skjemasettbasert prefill. For preutfyllingsinformasjon angitt med felt og verdi må tjenesteeier benytte batchgrensesnitt. Batchgrensesnittet kan også benyttes dersom mengden med preutfyllingsinformasjon er for stort for et tjenestekall, eller for tjenesteeiere som ikke ønsker å benytte tjenestegrensesnittet. Registerinformasjon blir overført til Altinn fra kilde registeret ved gjevne mellomrom. Det alternative batch-grensesnittet er beskrevet i avsnittet Preutfylling.

Tjenestene for skjemasettet må være definert i tjenesteutviklingsløsningen og migrert til Altinn før en tjenesteeier kan sende inn preutfyllingsinformasjon for tjenesten. Operasjon GetAvailableServices kan kalles for å sjekke om skjemasettet eksisterer i Altinn.

### Tjenesteoperasjoner
Preutfyllingskomponenten har følgende eksponerte operasjoner for bruk av tjenesteeiere.

#### SubmitAndInstantiatePrefilledFormTask
Denne operasjonen benyttes av tjenesteeiere for å preutfylle et oppgavesett for en avgiver, og umiddelbart aktivere oppgavesettet i brukers arbeidsliste. Ett oppgavesett kan preutfylles og instansieres per kall til SubmitAndInstantiatePrefilledFormTask. Kvittering til tjenesteeier vil angi om mottak, validering, lagring til prefilldatabase (dersom dette er valgt) og instansiering av skjema i portal (dersom dette er valgt) ble gjennomført.

|**Parameter**|**Beskrivelse**|
|--------|--------|
|externalBatchId|Unik id for forsendelse. Denne defineres og settes av tjenesteeier. Returneres i kvittering. Identifikatoren kan senere benyttes av tjenesteeier for å hente ut kvittering for den gitte forsendelsen|
|preFillFormTask|Parameter skal inneholde prefilldata for de ulike skjema i et oppgavesett. [Se PrefillFormTask](#prefillformtask)|
|doSaveFormTask|Angir om det preutfylte oppgavesettet skal lagres i databasen for senere bruk|
|doinstantiateFormTask|Angir om det preutfylte oppgavesettet umiddelbart skal instansieres i brukers arbeidsliste|
|caseId|Referanse til samhandlingstjeneste preutfylt skjema skal knyttes til|

|**Retur**|**Beskrivelse**|
|--------|--------|
|Receipt|Kvittering for forsendelsen. [Se ReceiptExternal](#receiptexternal)|

#### SubmitPrefilledFormTasks

SubmitPrefilledFormTasks kalles av tjenesteeier for å lagre et preutfylt oppgavesett for en avgiver i Altinn. Ett eller flere oppgavesett kan sendes inn ved et kall til tjenesten. Grensesnittet har støtte for å angi en liste med helt uavhengige preutfyllingsdetaljer. I prinsippet et online batch grensesnitt. De ulike elementene kan gjelde helt separate tjenester og avgivere.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|externalBatchId|Unik id for forsendelse. Denne defineres og settes av tjenesteeier. Returneres i kvittering. Identifikatoren kan senere benyttes av tjenesteeier for å hente ut kvittering for den gitte forsendelsen.|
|preFillFormTasksDetails|Kontainerelement med preutfyllingsdata. [Se PrefillFormTaskDetails](#prefillformtaskdetails)|

|**Retur**|**Beskrivelse**|
|--------|--------|
|Receipt|Kvittering for forsendelsen. [Se ReceiptExternal](#receiptexternal)|

### Datakontrakter
Preutfyllingskomponenten sine operasjoner benytter seg av følgende datakontrakter.

#### PrefillFormTaskDetails
Input element til operasjonen [Se SubmitPrefilledFormTasks](#SubmitPrefilledFormTasks) med støtte for å angi en liste med helt uavhengige preutfyllingsdetaljer. I prinsippet et online batch grensesnitt.

|**Property**|**Beskrivelse**|
|--------|--------|
|PreFillFormTaskList|Liste med metadata og preutfyllingsdata. [Se PrefillFormTask](#prefillformtask) |
|SystemUserCode|Kode som unikt representerer kildesystem. Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier.|

#### PrefillFormTask
Dette er hovedkontrakten hvor det kan defineres opp alle detaljer for preutfylling av et oppgavesettet.

|**Property**|**Beskrivelse**|
|--------|--------|
|ExternalServiceCode|Angir den unike tjenestekoden dataene gjelder|
|ExternalServiceEditionCode|Angir tjenesteutgavekode dataene gjelder|
|ExternalShipmentReference|Unik referanse som settes av tjenesteeier for å identifisere forsendelsen|
|*IdentityFieldHashCode*|Skal ikke fylles ut av tjenesteeier. Brukes internt i Altinn.|
|*LargeInboundReference*|Skal ikke fylles ut av tjenesteeier. Brukes internt i Altinn.|
|PreFillAttachments|Liste med binære vedlegg som skal legges ved ny instanse av oppgavesettet. [Se PrefillFormTaskAttachment](#prefillformtaskattachment) |
|PrefillForms|Liste med de faktiske skjemadata som skal benyttes i ny instanse av oppgavesettet. [Se PrefillForm](#prefillform) |
|PreFillIdentityFields|Liste med identifiserende felter for det preutfylte oppgavesettet. [Se PreFillIdentityFieldBE](#prefillidentityfieldbe) |
|PrefillNotifications|Liste med varsler som skal sendes ut ved instansiering av oppgavesettet. [Se Notification](#notification) |
|ReceiversReference|Referanse som settes av Altinn. Denne returneres i kvittering til tjenesteeier|
|Reportee|Fødselsnummer eller organisasjonsnummer organisasjonsnummer eller brukernavn på selvregistrert bruker som identifiserer hvem dataene gjelder|
|ServiceOwnerCode|Feltnavnet er misvisende. Verdien skal ikke være ServiceOwnerCode, men en kode som unikt representerer kildesystem. Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier. I andre grensesnitt heter dette som regel SystemUserName.|
|SendersReference|Referanse på preutfylt skjemasett som settes av tjenesteeier.|
|ValidFromDate|Angir fra når preutfyllingsdata er gyldig (yyyy-MM-dd)|
|ValidToDate|Angir til når preutfyllingsdata er gyldig (yyyy-MM-dd)|
|IsReservable|Dette feltet er knyttet til avgivere av typen person og hvorvidt Altinn skal respektere om en person er reservert mot elektronisk kommunikasjon med det offentlige. Hvis IsReservable er satt til `true` vil Altinn gjøre et oppslag i Kontakt- og reservasjonsregisteret, og sjekke om avgiver er reservert. Altinn vil da eventuelt gi en feilmelding om at personen er reservert i stedet for å lagre Prefillinformasjonen. IsReservable feltet er valgfritt og standard verdi er `false`. Dette vil si at tjenesteeier aktivt må sette feltet til `true` hvis de ønsker å respektere reservasjoner.|

#### PrefillForm

|**Property**|**Beskrivelse**|
|--------|--------|
|DataFormatID|Id til skjema.|
|DataFormatVersion|Versjon til skjema.|
|FormDataXML|Preutfyllingsdata for angitt skjema. Må legges i en CDATA blokk.|
|SendersReference|Unik referanse for skjemaet satt av tjenesteeier.|
|SignedByDefault|Feltet er med på å styre hva bruker skal signere under signeringssteget. Når dette er satt til `true` så vil skjema signeres hvis bruker ikke velger det bort.|
|SigningLocked|Feltet er med på å styre hva bruker skal signere under signeringssteget. Når dette er satt til `true` så blir bruker ikke gitt muligheten til å velge bort skjema under signering.|

#### PrefillFormTaskAttachment

|**Property**|**Beskrivelse**|
|--------|--------|
|AttachmentData|Data for det binære vedlegget|
|AttachmentName|Dette er navnet på vedlegget, som det vises i portalen|
|AttachmentType|Angir MIME-typen for vedlegget: application_none - ingen MIME type angitt, application_pdf - PDF format, application_msword - Microsoft Word, application_vnd_ms_excel - Microsoft Excel, application_vns_oasis_opendocument_text - Open document type Text, application_vnd_oasis_opendocument_presentation - Open docment type Presentation, application_vnd_oasis_opendocument_spreadsheet - Open docment, type Spreadsheet,	application_rtf - Rich text format type, application_vnd_ms_powerpoint - Microsoft PowerPoint, application_postscript, application_zip - Type zip, text_plain, text_html, text_xml, text_rtf - Rich text format type, text_richtext - Rich text, binary_octet_stream - Binary format, not_Applicable|
|FileName|Navn på fil for det binære vedlegget|
|SendersReference|Referanse for vedlegget. Settes av tjenesteeier|
|SignedByDefault|Feltet er med på å styre hva bruker skal signere under signeringssteget. Når dette er satt til `true` så vil vedlegget signeres hvis bruker ikke velger det bort.|
|SigningLocked|Feltet er med på å styre hva bruker skal signere under signeringssteget. Når dette er satt til `true` så blir bruker ikke gitt muligheten til å velge bort vedlegget under signering.|

#### PreFillIdentityFieldBE

|**Property**|**Beskrivelse**|
|--------|--------|
|FieldValue|Verdi for identifiserende feltet. Må settes når det skal være mer enn ett preutfylt skjemasett for samme tjeneste og avgiver. Se avsnitt Identifiserende felter for mer info.|
|Index|Index til identifiserende feltet. Må settes når det skal være mer enn ett preutfylt skjemasett for samme tjeneste og avgiver. Se avsnitt Identifiserende felter for mer info.|

#### Notification

|**Property**|**Beskrivelse**|
|--------|--------|
|FromAddress|Avsender adresse (e-post). Hvis ikke satt benyttes avsenderadresse satt i varselmalen|
|*NotificationID*|Skal ikke fylles ut av tjenesteeier. Brukes internt i Altinn.|
|*NotifyType*|Skal ikke fylles ut av tjenesteeier. Brukes internt i Altinn.|
|*ReporteeElementID*|Skal ikke fylles ut av tjenesteeier. Brukes internt i Altinn.|
|*ReporteeId*|Skal ikke fylles ut av tjenesteeier. Brukes internt i Altinn.|
|ShipmentDateTime|Når varsel skal sendes til mottaker.|
|LanguageCode|Språk kode:	1033 - English, 1044 - Bokmål, 2068 - Nynorsk|
|NotificationType|En unik streng som definerer en referanse til predefinerte varslingstekster.|
|TextTokens|Liste av tekster som skal erstatte maltekst i varselmal. [Se TextToken](#texttokens) |
|ReceiverEndPoints|Liste av mottaker addresser. [Se ReceiverEndPoint](#receiverendpoint) |

#### TextTokens

|**Property**|**Beskrivelse**|
|--------|--------|
|TokenNum|Ikke i bruk, kan utelates|
|TokenValue|Tekst som skal ersatte maltekst. Substitusajonen gjøres i samme rekkefølge som parameterene er angitt. Varselmal må bestilles og lages på forhånd|

#### ReceiverEndPoint

|**Property**|**Beskrivelse**|
|--------|--------|
|ReceiverAddress|Adressen (telefonnummer eller e-postadresse) for mottakspunktet|
|TransportType|	Type varsling: Email, SMS, Instant Message (IM), Both email & sms|

#### ReceiptExternal

|**Property**|**Beskrivelse**|
|--------|--------|
|ReceiptId|Unik identifikator kvitteringen i Altinn. Benyttes for eksempel ved senere oppdatering av kvittering.|
|ReceiptText|Tekst i kvitteringen.|
|ReceiptHistory|Når en kvittering oppdateres så vil den gamle kvitteringsteksten flyttes og legges til øverst i denne historikken|
|LastChanged|Dato og tidspunkt for når kvitteringen sist ble endret (yyyy-MM-ddThh:mm:ss)|
|ReceiptTypeName|	Angir hva kvittering gjelder. Mulige verdier: FormTask -Skjemasett, Correspondence - Melding, PINCODE - PIN-koder, Subscription - Abonnement, Outbound - Forsendelse sendt fra Altinn, PreFill - Preutfyllingsdata, Broker - Formidlingstjeneste, RegisterDLS - DLS registerdata, RegisterDSF - DSF registerdata, RegisterER - ER registerdata, RegisterDSFProperty, RegisterDSFStreet, RegisterDSFCountry, RegisterDSFUser, LookUp -Innsynstjeneste|
|ReceiptTemplate|Angir malen (XML) som skal benyttes for kvittering|
|ReceiptStatusCode|Status for forsendelse som kvitteringen gjelder: NotSet (standardverdi som brukes når status ikke er satt – skal ikke kunne mottas som verdi), OK, UnExpectedError, ValidationFailed, Rejected|
|ParentReceiptId|Dersom denne kvitteringen er en av flere kvitteringer for en forsendelse vil ParentReceiptId vise til ReceiptId som gjelder for hele forsendelsen (hovedkvittering)|
|References|Liste med referanser knyttet til kvitteringen. [Se Reference](#reference) |
|SubReceipts|Liste med underkvitteringer. Dette benyttes gjerne for å detaljere resultatet til en del av forespørselen. For eksempel hvis forespørselen hadde en liste med preutfyllingsdata for flere mottakere. |

#### Reference

|**Property**|**Beskrivelse**|
|--------|--------|
|ReferenceValue|Selve referansen (verdien) satt på kvitteringen. Typisk forsendelsesreferansen|
|ReferenceTypeName|Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Benyttes ikke, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference -Organisasjonsnummer eller personnummer til eier av kvitteringen er typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, ArchiveReference - Arkivreferanse|

##### Håndtering av Etatid attribut i skjemadefinasjon fra OR ved Prefil

Skjema definert av oppgaveregisteret har ofte en valgfri attributt kalt etatid som er en enum med gyldige etater for skjemadefinasjon.  Denne verdien er ikke i bruk i Altinn 2 og kan ikke benyttes.  Hvis verdi settes i XML som sendes inn fra etatssystem vil skjema ikke validere.

##### Subscription

Subscription inneholder operasjoner relatert til abonnement på tjenester i Altinn.

Påfølgende kapittel beskriver tjenesteoperasjonen for denne tjenesten.

##### SubmitSubscription

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
|ExpirationDate| Dato for når abonnementet opphører (yyyy-MM-dd)|
|NextScheduleDate| Dato for når abonnementet skal instansieres neste gang (yyyy-MM-dd). Første dato settes av tjenesteeier, neste kalkuleres av runtiejobb i Altinn (basert på periodetype)|
|NextDueDate| Dato for når abonnementet/innsendingstjenesten må være fylt ut av bruker i portal/sluttbrukersystem (yyyy-MM-dd). Første dato settes av tjenesteeier, neste kalkuleres av runtiejobb i Altinn (basert på periodetype)|
|VisibleDate| Dato for når abonnementet skal være synlig i portal/for sluttbrukersystemer (yyyy-MM-dd)|
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

##### AuthorizationAdministration

AuthorizationAdministration er tjenesten i Altinn for import av eksterne regler og ressurser brukt til å ta avgjørelser der Altinns autorisasjonskomponent benyttes. Er tilknyttet tjenesten AuthorizationDecisionPointExternal som benytter importert informasjon.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.

##### ImportAuthorizationPolicy

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

#### GetRoles

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

### GetReportees

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

#### GetReporteeByTempKey

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

#### AuthorizationDecisionPointExternal

AuthorizationDecisionPointExternal er en tjeneste Altinn tilbyr til tjenesteeiere som ønsker å benytte Altinns autorisasjonskomponent. Tjenesten kan benyttes til autorisasjon både for eksterne resurser og for tjenester. Autorisasjons regler settes henholdsvis ved hjelp av AuthorizationAdministration tjenesten og i TUL.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.

#### AuthorizeAccessExternalV2

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
1. Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ekstern tjenestekode og utgavekode (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalservicecode og urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:externalserviceeditioncode)
2. Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ekstern ressursdefinisjon (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:external-resource).
3. Avgivers fødselsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-ssn) eller avgivers organisasjonsnummer (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reportee-orgno), og ReporteeElementId (urn:oasis:names:tc:xacml:2.0:resource:urn:altinn:reporteeelementid).

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

##### CaseAgencySystem

Case er tjenesten i Altinn for administrering av Samhandlingstjenester for tjenesteeiere. For mer informasjon se Tjenestekatalog (Service Inventory) og WSDL tilgjengelig på endepunkt.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.

##### InstantiateCollaborationAgencySystem

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

##### GetCaseListAgencySystem

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

##### NotifyEventAgencySystem

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

##### SetNoticeAgencySystem

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

##### NotificationAgencyExternal

Notification er en tjeneste i Altinn I for sending av frittstående varsler til bruker. For mer informasjon se Tjenestekatalog (Service Inventory) og WSDL tilgjengelig på endepunkt.

Påfølgende kapitler beskriver tjenesteoperasjonene for denne tjenesten.

##### SendStandaloneNotificationV3

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

##### GetAuditTrail

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

##### ReporteeElementList

Tjenesten ReporteeElementList inneholder operasjoner for uthenting av elementer fra sluttbrukers meldingsboks. Elementer kan ligge i arbeidsliste eller i arkiv, fra nåværende eller tidligere versjoner av Altinn.

Tjenesten benyttes fra tjenesteeiers portal/selvbetjeningsløsning på vegne av en autentisert sluttbruker.

Påfølgende kapittel beskriver operasjonen for denne tjenesten.

##### GetReporteeElementListV2

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

##### Context handler

Context handler er en modul i Altinn som tilbyr metadata for elementer i Altinn. Et element kan for eksempel være en innsending fra en sluttbruker. Meta-data (eller context data som det kalles her) for elementet vil da inneholde informasjon om hvem som er avgiver, hvilke tjeneste elementet er knyttet til og hvilket prosess steg det er i.

Dette er informasjon som benyttes internt i Altinn for å avgjøre om en bruker har tilgang til å utføre en gitt operasjon på et gitt element. Tjeneste eiere kan bruke informasjonen på tilsvarende måte ved å benytte Altinn sin eksterne autorisasjonssjekk (se eget kapittel om AuthorizationDecisionPointExternal).

##### GetReporteeElementContextExternal

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

##### Online overføring til Tjenesteeier

Det er mulig for tjenesteeiere å motta online forsendelser av innsendingstjenester med vedlegg over web service. Mottaket skal ha en metode som heter ReceiveOnlineBatchExternalAttachment. Denne kalles som en "SOAP Document" metode, og kan benyttes til å motta innsendingstjenester hvor vedleggene er  pakket i en ekstern ZIP fil, ergo navnet. Denne tjenesten kan settes opp for MTOM for å støtte mer effektiv overføring av store binære vedlegg. Ved bruk av MTOM som dataoverføringsmetode kan det oppnås opptil 20-30% besparelse av båndbredde sammenliknet med vanlig dataoverføring mot web tjenesten.

Merk: Det er fullt mulig å sende uten vedlegg eksternt i ZIP fil over dette grensesnittet. Vedlegg vil da komme base64encoded i XML i batch parameteren, og det er ikke lenger mulig å sette opp tjenesten for bruk av MTOM.

##### ReceiveOnlineBatchExternalAttachment

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

##### Navnerom

For at Altinn sin webserviceklient skal kunne kommunisere med mottaket, er det viktig at følgende er satt korrekt (definisjonene vil finnes igjen i WSDL-filen). Denne informasjonen skal ligge i WSDL-filen man blir presentert for når man åpner definisjonen for mottakets web service.

|**Definisjon**|**Verdi**|**Beskrivelse**|
|--------|--------|--------|
|/wsdl:definitions/@xmlns:tns|http://AltInn.no/webservices/|Navneromsdefinisjon|
|/wsdl:definitions/@targetNamespace|http://AltInn.no/webservices/|Navneromsdefinisjon|
|/wsdl:definitions/wsdl:types/s:schema/@targetNamespace|http://AltInn.no/webservices/|Navneromsdefinisjon|
|/wsdl:definitions/wsdl:binding/wsdl:operation/soap:operation/@soapAction|http://AltInn.no/webservices/ReceiveOnlineBatchExternalAttachment|Identifikator for SOAP-metode|
|/wsdl:definitions/wsdl:service/wsdl:port/soap:address/@location|Mottaksavhengig|Dette er URLen til mottaket som Altinn skal benytte seg av|

##### DownloadQueue

DownloadQueue inneholder operasjoner for å hente ned en liste over elementer som ligger i tjeneste-eiers DownloadQueue. For å bruke DownloadQueue må tjenesteeier spesifisere dette når man utvikler tjenesten i TUL. Ved å sette tjenesteutgaven til å bruke DownloadQueue vil innleverte skjemaer på denne tjenesten oppdatere DownloadQueue og tjenesteeier vil dermed kunne hente ut disse ved å sende en forespørsel til Altinn.
For å bruke tjenesten må tjenesteeier først spesifisere at tjenesteutgaven bruker DownloadQueue. Deretter vil alle innsendinger sent inn med denne tjenesteutgaven legges til i DownloadQueue.
Når det ligger flere enn 500 elementer i DownloadQueue vil ikke nyere elementer lengre hentes når man bruker GetDownloadQueueItems operasjonen. For å få tilsendt nyere elementer må DownloadQueueItems fjernes fra DownloadQueue ved å bruke PurgeItem operasjonen.
DownloadQueue funksjonaliteten har støtte for MTOM.
Påfølgende kapitler beskriver tjenesteoperasjonenene for denne tjenesten.

##### GetDownloadQueueItems

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

##### PurgeItem

Denne operasjonen lar tjenesteeier markere et enkelt DownloadQueueItem som purged. Dette DownloadQueueItem vil deretter ikke lenger bli hentet når GetDownloadQueueItems operasjonen blir kjørt.

|**Input**|**Beskrivelse**|
|--------|--------|
|ArchiveReference|Arkiv-referanse til DownloadQueueItem som skal markeres som purged|

##### GetArchivedFormtaskDQ

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

##### GetFormSetPdf

Denne tjenesteoperasjonen gjør det mulig for tjenesteeier og laste ned en PDF versjon av et skjemasett. Operasjonen vil generere en PDF som følged PDFA standarden

|**Input**|**Beskrivelse**|
|--------|--------|
|archiveReference|Arkivreferansen til det arkiverte elementet man ønsker å ha som en PDF|
|languageId|Språket som skal benyttes i alle tekster som har oversettelser|
|dataFormatId|Utskrift av enkeltskjemaer. Id til skjema fra metadata kilde|
|dataFormatVersion|Utskrift av enkeltskjemaer. Versjon til skjema fra metadata kilde|
|**Returverdi**|**Beskrivelse**|
|Byte[]|PDF filens innhold. Data er kodet med MTOM|

##### RegisterSRRAgencyExternal

##### GetRights

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

##### AddRights

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

##### DeleteRights

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

##### BatchLoggingAgencyExternal

Denne tjenesten gir tjenesteeier tilgang til feil som har forekommet under behandling av batch jobber. Som en del av denne tjeneste-beskrivelsen vil følgende stikkord bli brukt:

 - DataBatch - referer til en batch fil levert til altinn av tjenesteeier.
 - DataItem - en Xml entitet i DataBatch. I en Correspondence fil vil for eksempel en enkel Correspondence være et DataItem.
 - Issue - en feil, warning eller informasjons melding som forekom under behandling av DataBatch og DataItem.

##### GetStatusOverview

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

##### GetDetailedStatus

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

##### GetDataItem

Denne operasjonen returnerer metadata og rå Xml data for en spesifikk DataItem (Xml-entitet) som har feilet under behandling.

|**Input**|**Beskrivelse**|
|--------|--------|
|dataItemId|Spesifikk identifikator for et DataItem|
|DataItem|Inneholder metadata og rå Xml data for et DataItem|

##### URI til alle Altinn tjenester / aliasoversikt for endepunkter

Web servicene beskrevet i dokumentet er angitt uten informasjon om endepunkt. En web service operasjon kan kalles med forskjellige endepunkter ut fra hvilken autentiseringsmetode tjenesteeier ønsker å benytte.

Det tilbys opp til tre forskjellige endepunkter for hver web service operasjon:

 - **Basic Http (SOAP 1.1).** Tradisjonell interoperabel web service hvor autentiseringsinformasjonen (brukernavn/passord) ligger i meldingen.
 - **WS Http (SOAP 1.2 med WS-Security username token).** Støtte for nye web standarder WS*, dvs. bl.a. at autentiseringsinformasjonen (brukernavn/passord) ligger i SOAP headeren.
 - **WS Http (SOAP 1.2 med WS-Security X.509 token) (markert som EC).** Støtte for ny web standarder WS*, dvs. bl.a. at
   sertifikat ligger i SOAP headeren mensbrukernavn og passord ligger i meldingen.
 - **WS Http (SOAP 1.2 med WS-Security X.509 token) (markert som AEC).** Støtte for ny web standarder WS*, dvs. bl.a. at sertifikat ligger i SOAP headeren.
   Sertifikatet må være utstedt til en organisasjon som er registrert som tjenesteeier i Altinn.

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
|SendStandaloneNotification|WS Http https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternal.svc|SendStandaloneNotification|
|SendStandaloneNotification|Basic Http https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternalBasic.svc|SendStandaloneNotificationBasic|
|SendStandaloneNotification|EC https://www.altinn.no/ServiceEngineExternal/NotificationAgencyExternalEC.svc|SendStandaloneNotificationEC|
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

##### Sammenheng mellom nye og gamle Altinn web services

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
|N/A|Receipt.SaveReceipt|Ny web service operasjon|
|N/A|Subscription.SubmitSubscription|Ny web service operasjon|
