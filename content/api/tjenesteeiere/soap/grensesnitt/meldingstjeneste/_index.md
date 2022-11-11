---
title: Meldingstjeneste 
description: Denne tjenesten inneholder operasjoner som benyttes av tjenesteeiere for å opprette meldinger til avgivere samt hente ut igjen status på disse meldingene.
weight: 800
toc: true
---

## InsertCorrespondenceV2

Denne operasjonen benyttes av en tjenesteeier for å sende meldinger til avgivere i Altinn. Operasjonen er versjonert, gjeldende versjon er V2.
Tabellen under beskriver datakontrakten for operasjonen:

|**Parameter**|**Beskrivelse**|
|--------|--------|
|SystemUserCode|Kode som unikt representerer kildesystem, f.eks. "ABC-123". Format: XXX_YYYY. De tre første bokstavene er påkrevd og representerer tjenesteeier. De etter understreken representerer avdeling/system, og er valgfritt hvis det ikke finnes flere avdelinger/systemer innenfor samme tjenesteeier|
|ExternalShipmentReference|Referanse satt av tjenesteeier. Benyttes ved utsending av meldingsbekreftelser og kvittering. Setter feltet SendersReference på meldingen blant annet brukt til oppslag|
|Correspondence|Objekt av typen InsertCorrespondenceBEV2 med meldinger som skal lagres|

|**Returverdi**|**Beskrivelse**|
|--------|--------|
|Receipt|Kvittering for forsendelsen.|

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
|UseServiceOwnerShortNameAsSenderOfSms|Når denne er satt vil SMS mottas med tjenesteeiers ShortName (settes ved bestilling) satt som avsender.|
|**ReceiverEndPoint**||
|ReceiverAddress|Mobilnummeret eller epostadressen til mottaker av varsel. Dette må passe med TransportType Email eller SMS. Feltet er valgfritt og hvis feltet er tomt vil Altinn forsøke identifisere riktige mottakere basert på avgiver og TransportType. Feltet må være tomt for TransportType Both, SMSPreferred og EmailPreferred.|
|TransportType|Angir om varsel skal sendes som epost eller SMS. Lovlige verdier er: <ul><li>**SMS** - Altinn vil sende varsel som SMS hvis det er oppgitt et mobilnummer i ReceiverAddress eller avgiver har registrert et eller flere mobilnummer. Hvis avgiver er en organisasjon vil det sendes varsel til alle registrerte mobilnummer.</li><li>**Email** - Fungerer på samme måte som *SMS*, men med epost som kanal.</li><li>**Both** - Altinn vil sende varsel både som epost og SMS om mulig. Hvis avgiver kun har registrert en epostadresse vil det sendes varsel som epost. Tilsvarende for mobilnummer. En organisasjon vil få varsel på alle registrerte varslingsadresser.</li><li>**SMSPreferred** - Altinn vil sende varsel som SMS hvis avgiver har registrert et mobilnummer. Hvis avgiver ikke har registrert dette vil det isteden bli sendt varsel som epost. Forutsatt at det finnes en registrert epostadresse. En organisasjon vil bli sendt varsel på alle varslingsadresser av riktig type.</li><li>**EmailPreferred** - Fungerer på samme måte som *SMSPreferred*, men med epost som kanal.</li><li>**PriorityEmailSMSReminder** - Brukes for varslingsmaler med reminders (revarslings mal). Første varsel vil behandles som EmailPreferred, Andre varsel vil behandles som SMSPreferred.</li></ul>|
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
|NotificationText|Varselteksten som skal med i meldingen til bruker. Maks 700 tegn|
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

## CreateSimpleCorrespondenceService

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

## GetCorrespondenceStatusDetails

Denne metoden bør helst ikke benyttes. Benytt isteden versjon 3.

Årsaken til versjonering av denne operasjonen er endring av kontrakten. Ved innføring av Kontakt og reservasjonsregisteret til difi ble det innført en ny status på Correspondence. Dette er en status som indikerer at mottaker har reservert seg mot å motta elektronisk kommunikasjon.

## GetCorrespondenceStatusDetailsV2

Denne metoden bør helst ikke benyttes. Benytt isteden versjon 3.

Årsaken til denne versjoneringen er ny funksjonalitet knyttet til Sikker Digital Post.

## GetCorrespondenceStatusDetailsV3

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
|TransportType|Angir om varsel ble sendt som SMS eller epost.|
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

## GetCorrespondenceStatusHistory

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
|TransportType|Angir om varsel ble sendt som SMS eller epost.|
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
