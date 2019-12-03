---
title: Preutfylling 
description: Prefill tjenesten inneholder operasjoner som benyttes av tjenesteeier for å sende inn preutfylte oppgavesett for avgivere. 
toc: true
weight: 800
---

Det finnes tre typer preutfyllingsinformasjon:

 - **Preutfylling av oppgavesett.** Hele oppgavesettet (hoved- og underskjema) sendes inn med preutfyllingsinformasjon.
   Tjenesteeier kan også velge å legge til binære vedlegg for preutfylte oppgavesett.
 - **Preutfyllingsinformasjon angitt som felt/verdi.** Feltet viser til en unik id som benyttes i skjemaer, og det angis verdi for feltet.
 - **Registerdata.** Statisk informasjon som sendes inn fra nasjonale registre.

Prefilltjenesten har kun støtte for skjemasettbasert prefill. For preutfyllingsinformasjon angitt med felt og verdi må tjenesteeier benytte batchgrensesnitt. Batchgrensesnittet kan også benyttes dersom mengden med preutfyllingsinformasjon er for stort for et tjenestekall, eller for tjenesteeiere som ikke ønsker å benytte tjenestegrensesnittet. Registerinformasjon blir overført til Altinn fra kilde registeret ved gjevne mellomrom. Det alternative batch-grensesnittet er beskrevet i avsnittet Preutfylling.

Tjenestene for skjemasettet må være definert i tjenesteutviklingsløsningen og migrert til Altinn før en tjenesteeier kan sende inn preutfyllingsinformasjon for tjenesten. Operasjon GetAvailableServices kan kalles for å sjekke om skjemasettet eksisterer i Altinn.

## Tjenesteoperasjoner
Preutfyllingskomponenten har følgende eksponerte operasjoner for bruk av tjenesteeiere.

### SubmitAndInstantiatePrefilledFormTask
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

### SubmitPrefilledFormTasks

SubmitPrefilledFormTasks kalles av tjenesteeier for å lagre et preutfylt oppgavesett for en avgiver i Altinn. Ett eller flere oppgavesett kan sendes inn ved et kall til tjenesten. Grensesnittet har støtte for å angi en liste med helt uavhengige preutfyllingsdetaljer. I prinsippet et online batch grensesnitt. De ulike elementene kan gjelde helt separate tjenester og avgivere.

Tabellen under beskriver datakontrakten for operasjonen:

|**Input**|**Beskrivelse**|
|--------|--------|
|externalBatchId|Unik id for forsendelse. Denne defineres og settes av tjenesteeier. Returneres i kvittering. Identifikatoren kan senere benyttes av tjenesteeier for å hente ut kvittering for den gitte forsendelsen.|
|preFillFormTasksDetails|Kontainerelement med preutfyllingsdata. [Se PrefillFormTaskDetails](#prefillformtaskdetails)|

|**Retur**|**Beskrivelse**|
|--------|--------|
|Receipt|Kvittering for forsendelsen. [Se ReceiptExternal](#receiptexternal)|

## Datakontrakter
Preutfyllingskomponenten sine operasjoner benytter seg av følgende datakontrakter.

### PrefillFormTaskDetails
Input element til operasjonen [Se SubmitPrefilledFormTasks](#SubmitPrefilledFormTasks) med støtte for å angi en liste med helt uavhengige preutfyllingsdetaljer. I prinsippet et online batch grensesnitt.

|**Property**|**Beskrivelse**|
|--------|--------|
|PreFillFormTaskList|Liste med metadata og preutfyllingsdata. [Se PrefillFormTask](#prefillformtask) |
|SystemUserCode|Kode som unikt representerer kildesystem. Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier.|

### PrefillFormTask
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
|ValidateButDoNotSendNotification|Flag som kan brukes av tjenesteeiere som ønsker å sikre at Altinn har kontaktinformasjon som kan brukes ved varsling uten at det sendes varsel. [Mer informasjon](#verifisering-av-kontaktinformasjon-for-varsel) |

### Verifisering av kontaktinformasjon for varsel
Flagget `ValidateButDoNotSendNotification` kan brukes av tjenesteeiere hvis de ønsker å sjekke at Altinn har nok informasjon til å kunne sende varsel uten at det faktisk sendes varsel. Dette kan da brukes i de tilfellene hvor de også skal lage et meldingselement (correspondence) og ønsker å knytte varsel til det isteden. Skulle verifisering av kontaktinformasjon resultere i en feil så vil tjenesten returnere en feilmelding om dette. Det blir ikke laget noe skjemaelement i en slik situasjon. Tjenesteeier kan da velge å likevel opprette skjema i en forespørsel uten varselinformasjon eller velge en helt annen kommunikasjonskanal. Mekanismen er avhengig av at forespørselen inneholder informasjon om varsel utsending, men vil ikke gi noen feil om det skulle mangle.


### PrefillForm

|**Property**|**Beskrivelse**|
|--------|--------|
|DataFormatID|Id til skjema.|
|DataFormatVersion|Versjon til skjema.|
|FormDataXML|Preutfyllingsdata for angitt skjema. Må legges i en CDATA blokk. [Bruk av etatid i skjema](#håndtering-av-etatid-attributt-i-skjemadefinasjon-fra-or-ved-prefill)|
|SendersReference|Unik referanse for skjemaet satt av tjenesteeier.|
|SignedByDefault|Feltet er med på å styre hva bruker skal signere under signeringssteget. Når dette er satt til `true` så vil skjema signeres hvis bruker ikke velger det bort.|
|SigningLocked|Feltet er med på å styre hva bruker skal signere under signeringssteget. Når dette er satt til `true` så blir bruker ikke gitt muligheten til å velge bort skjema under signering.|

### Håndtering av Etatid attributt i skjemadefinasjon fra OR ved Prefill

Skjema definert av oppgaveregisteret har ofte en valgfri attributt kalt etatid som er en enum med gyldige etater for skjemadefinasjon.  Denne verdien er ikke lenger i bruk og kan ikke benyttes.  Hvis verdi settes i XML som sendes inn fra etatssystem vil skjema ikke validere.

### PrefillFormTaskAttachment

|**Property**|**Beskrivelse**|
|--------|--------|
|AttachmentData|Data for det binære vedlegget|
|AttachmentName|Dette er navnet på vedlegget, som det vises i portalen|
|AttachmentType|Angir MIME-typen for vedlegget: application_none - ingen MIME type angitt, application_pdf - PDF format, application_msword - Microsoft Word, application_vnd_ms_excel - Microsoft Excel, application_vns_oasis_opendocument_text - Open document type Text, application_vnd_oasis_opendocument_presentation - Open docment type Presentation, application_vnd_oasis_opendocument_spreadsheet - Open docment, type Spreadsheet,	application_rtf - Rich text format type, application_vnd_ms_powerpoint - Microsoft PowerPoint, application_postscript, application_zip - Type zip, text_plain, text_html, text_xml, text_rtf - Rich text format type, text_richtext - Rich text, binary_octet_stream - Binary format, not_Applicable|
|FileName|Navn på fil for det binære vedlegget|
|SendersReference|Referanse for vedlegget. Settes av tjenesteeier|
|SignedByDefault|Feltet er med på å styre hva bruker skal signere under signeringssteget. Når dette er satt til `true` så vil vedlegget signeres hvis bruker ikke velger det bort.|
|SigningLocked|Feltet er med på å styre hva bruker skal signere under signeringssteget. Når dette er satt til `true` så blir bruker ikke gitt muligheten til å velge bort vedlegget under signering.|

### PreFillIdentityFieldBE

|**Property**|**Beskrivelse**|
|--------|--------|
|FieldValue|Verdi for identifiserende feltet. Må settes når det skal være mer enn ett preutfylt skjemasett for samme tjeneste og avgiver. Se avsnitt Identifiserende felter for mer info.|
|Index|Index til identifiserende feltet. Må settes når det skal være mer enn ett preutfylt skjemasett for samme tjeneste og avgiver. Se avsnitt Identifiserende felter for mer info.|

### Notification
Dette dataelementet kan brukes til å definere hvordan en avgiver skal varsles om at det er blitt opprettet et nytt element i deres meldingsboks i Altinn. Det er viktig å merke seg at informasjonen her kun benyttes av operasjonen `SubmitAndInstantiatePrefilledFormTask` da dette er eneste operasjon som lager noe som er synlig for avgiver.

|**Property**|**Beskrivelse**|
|--------|--------|
|FromAddress|Avsender adresse (e-post). Hvis ikke satt benyttes avsenderadresse satt i varselmalen|
|*NotificationID*|Skal ikke fylles ut av tjenesteeier. Brukes internt i Altinn.|
|NotifyType|Type varsel. NotificationType.PreFill.|
|*ReporteeElementID*|Skal ikke fylles ut av tjenesteeier. Brukes internt i Altinn.|
|*ReporteeId*|Skal ikke fylles ut av tjenesteeier. Brukes internt i Altinn.|
|ShipmentDateTime|Når varsel skal sendes til mottaker.|
|LanguageCode|Språk kode:	1033 - English, 1044 - Bokmål, 2068 - Nynorsk|
|NotificationType|En unik streng som definerer en referanse til predefinerte varslingstekster.|
|TextTokens|Liste av tekster som skal erstatte maltekst i varselmal. [Se TextToken](#texttokens) |
|ReceiverEndPoints|Liste av mottaker addresser. [Se ReceiverEndPoint](#receiverendpoint) |

### TextTokens

|**Property**|**Beskrivelse**|
|--------|--------|
|TokenNum|Ikke i bruk, kan utelates|
|TokenValue|Tekst som skal ersatte maltekst. Substitusajonen gjøres i samme rekkefølge som parameterene er angitt. Varselmal må bestilles og lages på forhånd|

### ReceiverEndPoint

|**Property**|**Beskrivelse**|
|--------|--------|
|ReceiverAddress|Mobilnummeret eller epostadressen til mottaker av varsel. Dette må passe med TransportType Email eller SMS. Feltet er valgfritt og hvis feltet er tomt vil Altinn forsøke identifisere riktige mottakere basert på avgiver og TransportType. Feltet må være tomt for TransportType Both, SMSPreferred og EmailPreferred.|
|TransportType|Angir om varsel skal sendes som epost eller SMS. Lovlige verdier er: <ul><li>**SMS** - Altinn vil sende varsel som SMS hvis det er oppgitt et mobilnummer i ReceiverAddress eller avgiver har registrert et eller flere mobilnummer. Hvis avgiver er en organisasjon vil det sendes varsel til alle registrerte mobilnummer.</li><li>**Email** - Fungerer på samme måte som *SMS*, men med epost som kanal.</li><li>**Both** - Altinn vil sende varsel både som epost og SMS om mulig. Hvis avgiver kun har registrert en epostadresse vil det sendes varsel som epost. Tilsvarende for mobilnummer. En organisasjon vil få varsel på alle registrerte varslingsadresser.</li><li>**SMSPreferred** - Altinn vil sende varsel som SMS hvis avgiver har registrert et mobilnummer. Hvis avgiver ikke har registrert dette vil det isteden bli sendt varsel som epost. Forutsatt at det finnes en registrert epostadresse. En organisasjon vil bli sendt varsel på alle varslingsadresser av riktig type.</li><li>**EmailPreferred** - Fungerer på samme måte som *SMSPreferred*, men med epost som kanal.</li></ul>|

### ReceiptExternal

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

### Reference

|**Property**|**Beskrivelse**|
|--------|--------|
|ReferenceValue|Selve referansen (verdien) satt på kvitteringen. Typisk forsendelsesreferansen|
|ReferenceTypeName|Angir type referanse: ExternalShipmentReference - Referansen viser til en referanse satt av sluttbrukersystem for en forsendelse, EndUserSystemReference - Benyttes ikke, SendersReference - Referanse satt av avsender for del av en forsendelse, ParentReference - Referansen viser til et hovedskjema, WorkFlowReference - Arbeidsflytreferanse, BatchReference - Referanse til en forsendelse mottatt i eller sendt fra Altinn, OutboundShipmentReference - Referanse til en forsendelse sendt fra Altinn, ReceiversReference - Mottakers referanse hvis kvitteringen blir oppdatert av mottaker av en forsendelse, OwnerPartyReference -Organisasjonsnummer eller personnummer til eier av kvitteringen er typisk den som har sendt inn en forsendelse. Settes av Altinn og kan ikke endres, PartyReference - Organisasjonsnummer eller personnummer til en part som får rettigheter til å hente og oppdatere kvitteringen. Altinn legger automatisk til mottaker av en forsendelse som en part på kvitteringen, ArchiveReference - Arkivreferanse|

