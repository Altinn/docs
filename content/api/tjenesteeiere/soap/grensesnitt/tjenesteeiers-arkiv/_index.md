---
title: Tjenesteeiers arkiv 
description: Hente ut element fra tjenesteeiers arkiv
weight: 800
---

## ArchiveCommon

Tjenesten ArchiveCommon inneholder operasjoner for uthenting av arkivdata fra tjenesteeiers arkiv.

Påfølgende kapittel beskriver tjenesteoperasjonen for denne arkivtjenesten.

### GetServiceOwnerArchiveReporteeElementsV2

Denne operasjonen benyttes for å hente ut data for en gitt avgiver (privatperson eller foretak) fra en tjenesteeiers arkiv.
Data kan være skjemasett arkivert i nåværende eller tidligere versjoner av Altinn, eller meldinger sendt fra tjenesteeier til avgiver.
Merk at siden samhandlingstjenester og innsynstjenester ikke arkiveres til tjenesteeiers arkiv vil de ikke kunne hentes ut på denne måten.
Kun elementer som innlogget bruker har tilgang til returneres, typisk ikke elementer for tjenester tilknyttet andre tjenesteeiere.

Det er for eksempel nødvendig å kunne ha direkte tilgang til disse dataene i tilfeller hvor tjenesteeier ønsker å veilede en avgiver i sanntid basert på avgivers arkiverte data. 

Tjenesteeier får rutinemessig tilsendt alle arkiverte elementer for alle avgivere via batch-grensesnittet Innsendingstjenester.

Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen:

| Input                     | Beskrivelse                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| SearchServiceOwnerArchive | Objektet av typen ExternalSOASearchBE, som inneholder søkeparametre for uthenting av elementer fra tjenesteeiers arkiv. |
| languageID                | Språk id: 1033 Engelsk 1044 Bokmål 2068 Nynorsk. Språk angitt på arkivert element benyttes uavhengig av hva som settes. |

| Returverdi                             | Beskrivelse                                                                                                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ServiceOwnerArchiveReporteeElementList | Liste med objektet av typen ServiceOwnerArchiveReporteeElementBEV2, som inneholder elementer fra tjenesteeiers arkiv som tilfredsstiller angitte søkeparametre. |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

**ExternalSOASearchBE**

| Property       | Beskrivelse                                                   |
| -------------- | ------------------------------------------------------------- |
| SSNOrOrgNumber | Fødselsnummer eller organisasjonsnummer                       |
| ReferenceId    | Unik referanse id                                             |
| Subject        | Hvilket emne søket gjelder                                    |
| DateFrom       | Fra dato i arkivet                                            |
| DateTo         | Til dato i arkivet                                            |
| CaseID         | Identifikator for samhandlingstjeneste elementet skal tilhøre |
| UserName       | Søk basert på brukernavn                                      |

**ServiceOwnerArchiveReporteeElementBEV2**

| Property                             | Beskrivelse                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| Subject                              | Emne for elementet                                                                          |
| IsSubjectMessageTitle                | Angir om tittel er satt av MessageTitle                                                     |
| LastChangedDate                      | Dato for siste endring                                                                      |
| DatReporteeId                        | Intern id                                                                                   |
| SSNOrOrganizationNumber              | Fødselsnummer eller organisasjonsnummer tilknyttet arkivert element                         |
| ReporteeName                         | Navn på avgiver som eier arkivert element                                                   |
| ReporteeElementId                    | Intern id                                                                                   |
| Altinn1ArchiveUnitId                 | Intern id fra AltinnI arkivet. Kan være tomt                                                |
| Altinn1AMReference                   | AM referansen fra AltinnI arkivet. Kan være tomt                                            |
| Altinn1FormCode                      | Skjemanummer fra AltinnI arkivet. Kan være tomt                                             |
| EndUserSystemId                      | Id for sluttbrukersystem. Kan være tomt                                                     |
| SendComplete                         | Hvorvidt forsendelsen er komplett eller ikke for elementet. Kan være tomt                   |
| ElementType                          | Element type: Archive, Active, Correspondence, ArchiveCorrespondence, LookUp, Collaboration |
| IsAltinn1                            | Flagg som indikerer om elementet eksisterer i AltinnI                                       |
| IsCorrespondenceConfirmationRequired | Hvorvidt meldingsbekreftelse er påkrevd eller ikke                                          |
| ArchiveReference                     | Referansen fra Altinn arkivet.                                                              |
| SystemTypeName                       | Typenavn på sluttbrukersystem. Kan være tomt                                                |
| ExpiryDate                           | Angir eventuelt når elementet er planlagt slettet                                           |

### ServiceOwnerArchive

Tjenesten ServiceOwnerArchive inneholder operasjoner for uthenting av elementer fra tjenesteeiers arkiv (ikke tilgang til arkiverte elementer fra tidligere versjoner av Altinn).

Påfølgende kapitler beskriver operasjonen for denne tjenesten.

### GetArchivedFormTaskV2

Denne operasjonen benyttes for å hente ut alle skjemaer og vedlegg som tilhører et gitt skjemasett. Operasjonen er versjonert, gjeldende versjon er V2.

Tabellen under beskriver datakontrakten for operasjonen:

| Input             | Beskrivelse                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| reporteeElementId | Unik identifikator for skjemasettet som skal hentes. Identifikatoren er obligatorisk input til tjenesten |
| languageID        | Språk kode: 1033 Engelsk, 1044 Bokmål, 2068 Nynorsk                                                      |

| Returverdi       | Beskrivelse                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| ArchivedFormTask | Objektet av typen ArchivedFormTaskBEV2 som skjemasettet som tilfredsstilte det gitte søkekriteriet. |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

**ArchivedFormTaskBEV2**

| Property                      | Beskrivelse                                                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| reporteeElementId             | Unik identifikator for skjemasettet.                                                                                                                  |
| LastChanged                   | Tidspunkt for når det sist ble gjort endringer på skjemasettet                                                                                        |
| ReporteeID                    | Intern id.                                                                                                                                            |
| ArchivedDateTime              | Tidspunkt for når skjemasettet ble arkivert                                                                                                           |
| ServiceOwner                  | Unik identifikator for tjenesteeier for skjemasettet                                                                                                  |
| InvoiceInformation            | Eventuell betalingsinformasjon som er vedlagt skjemasettet                                                                                            |
| ArchivedFormList              | Liste med ArchivedFormBE-objekter (nærmere beskrevet nedenfor), som inneholder alle skjemaene i skjemasettet                                          |
| ExternalServiceCode           | Tjenestekode                                                                                                                                          |
| ExternalServiceEditionCode    | Tjenesteutgavekode                                                                                                                                    |
| ssnOrgNumber                  | Fødselsnummer eller organisasjonsnummer tilhørende skjemasettet                                                                                       |
| PasswordEncryptedSymmetricKey | Passordkryptert symmetrisk nøkkel for å dekryptere eventuell sensitive felter                                                                         |
| SOEncryptedSymmetricdKey      | Samme symmetriske nøkkel som over, men kryptert med tjenesteeiers sertifikat. Tjenesteeier kan da bruke privat nøkkel til å dekryptere denne nøkkelen |
| ArchiveTaskList               | Liste med arkiv-objekter av typen ArchiveTaskBEV2                                                                                                     |

**ArchivedFormBE**

| Property                   | Beskrivelse                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| FormID                     | Intern id                                                                                         |
| FormName                   | Navn på skjema                                                                                    |
| FormDataXML                | Innhold i skjema. Må legges i en CDATA blokk                                                      |
| ParentReference            | Referanse til hovedskjema. Denne referansen er kun satt dersom gjeldende skjema er et underskjema |
| FormPresentationFieldValue | Presentasjonsfelt for skjemaet, dersom dette finnes.                                              |
| PaymentInformationE2B      | Betalingsinformasjon på E2B-format                                                                |
| PaymentInformationHTML     | Betalingsinformasjon på XML-format                                                                |
| DataFormatId               | Id til skjema fra metadata kilde                                                                  |
| DataFormatVersion          | Betalingsinformasjon vedlagt skjema                                                               |
| FormPaymentInfo            | Skjemabeskrivelse                                                                                 |

**ArchivedAttachmentBEV2**

| Property               | Beskrivelse                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AttachmentID           | Intern Id                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| AttachmentFunctionType | Angir hvilken funksjonstype vedlegget utgjør: Invoice, Unspecified                                                                                                                                                                                                                                                                                                                                                                                |
| AttachmentName         | Navn på vedlegg                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| MimeTypeName           | Angir MIME-typen for vedlegget: application_none, application_pdf, application_msword, application_vnd_ms_excel, application_vns_oasis_opendocument_text, application_vnd_oasis_opendocument_presentation, application_vnd_oasis_opendocument_spreadsheet, application_rtf, application_vnd_ms_powerpoint, application_postscript, application_zip, text_plain, text_html, text_xml, text_rtf, text_richtext, binary_octet_stream, not_Applicable |
| CreatedByUserID        | Intern Altinn identifikator på bruker som har lagt til vedlegget                                                                                                                                                                                                                                                                                                                                                                                  |
| CreatedDateTime        | Dato for når vedlegget ble opprettet                                                                                                                                                                                                                                                                                                                                                                                                              |
| IsAddedAfterFormFillin | Angir om vedlegget ble lagt til i løpet av signeringen (etter utfylling)                                                                                                                                                                                                                                                                                                                                                                          |
| IsEncrypted            | Angir om vedlegget er kryptert                                                                                                                                                                                                                                                                                                                                                                                                                    |

**ArchivedFormTaskSigningStepBEV2**

| Property                 | Beskrivelse                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SignatureID              | Intern Id                                                                                                                                                                             |
| SignedByUser             | Intern id bruker som har signert skjemasettet                                                                                                                                         |
| SignedByUserSSN          | Fødselsnummer til bruker som har signert / organisasjonsnummer til virksomhetsbruker som har signert                                                                                  |
| SignedByUserName         | Navn på bruker som har signert skjemasettet.                                                                                                                                          |
| CreatedDateTime          | Dato og tidspunkt for når skjemasettet ble signert                                                                                                                                    |
| Signature                | Signaturen, binært format                                                                                                                                                             |
| SignatureText            | Signeringsteksten                                                                                                                                                                     |
| RequiresGroupSigning     | Angir om signatur gjelder for alle elementer i skjemasettet                                                                                                                           |
| AuthenticationLevelID    | Intern id for autentiseringsnivået for bruker når signering ble gjort                                                                                                                 |
| AuthenticationMethod     | Autentiseringsnivået for bruker når signering ble gjort                                                                                                                               |
| CertificateIssuedByName  | Navnet sertifikatet er utstedt til                                                                                                                                                    |
| CertificateIssuedForName | Navnet signaturen er utstedt til                                                                                                                                                      |
| CertificateValidFrom     | Tidspunkt (dato og klokkeslett) for når sertifikatet er gyldig                                                                                                                        |
| CertificateValidTo       | Tidspunkt (dato og klokkeslett) for når sertifikatet blir ugyldig                                                                                                                     |
| SignedAttachmentList     | Liste over signerte vedlegg.                                                                                                                                                          |
| SignedFromList           | Liste over signerte skjemaer                                                                                                                                                          |
| IsSigningAllRequired     | Angir om signering er utført for alle elementer i skjemasett: YES – signering på alle skjema, NO – valgfri signering på skjema, SET_PER_FORM – valg for signering satt på skjema nivå |
| ProcessStepID            | Den unike identifikatoren for steget signaturen gjelder for                                                                                                                           |

**ArchiveTaskBEV2**

| Property                              | Beskrivelse                                                   |
| ------------------------------------- | ------------------------------------------------------------- |
| EndUserSystemID                       | Sluttbrukersystem identifikator                               |
| LastChanged                           | Angir dato for sist endring                                   |
| NumberOfSignaturesAdded               | Antall signaturer som er lagt til                             |
| ProcessStepID_FK                      | Intern ID for prosessteg                                      |
| SentComplete                          | Angir om element ble sent som komplett fra sluttbrukersystem  |
| TaskID                                | Identifikator for elementet, samme som ReporteeElementID      |
| UserDefinedNumberOfSignaturesRequired | Antall signaturer krevd for et evt brukerstyrt signeringssteg |
| WorkflowReference                     | Intern ID forarbeidsflyt                                      |

### GetArchiveShipmentStatusV2

Denne operasjonen benyttes for å hente ut status på oversending fra Altinn til Tjenesteeier for et arkivert skjema.
Man kan hente ut status ved å bruke enten ArchiveReference eller ServiceReference. Disse kan ikke brukes samtidig. Operasjonen er versjonert, gjeldende versjon er V2.
Tabellen under beskriver datakontrakten for operasjonen:

| Input                     | Beskrivelse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ArchiveReference (string) | Tar inn en ArkivReferanse for et arkivert element. Når dette elementet er brukt skal ikke ServiceReference brukes.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ServiceReference (objekt) | Inneholder en liste med ArchiveShipmentStatusExternalV2 objekter. Hvert objekt representerer et elementen som ble funnet av tjenesten, og har en egen liste over statuser registrert på elementet.                                                                                                                                                                                                                                                                                                                                             |
|                           | **ServiceReference**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ServiceCode               | Unik identifikator. Dette er en mandatory parameter når man bruker ServiceReference til å hente ut status data.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ServiceEditionCode        | Unik identifikator. Dette er en mandatory parameter når man bruker ServiceReference til å hente ut status data. Unik identifikator. Dette er en mandatory parameter når man bruker ServiceReference til å hente ut status data.                                                                                                                                                                                                                                                                                                                |
| DateFrom                  | Definerer dato og tidspunkt tjenesten skal hente ut status data fra.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| DateTo                    | Definerer dato og tidspunkt tjenesten skal hente ut status data til                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                           | **ArchiveShipmentStatusExternalBEV2List**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| LimitReached              | Når dette flagget er satt ble det funnet flere arkiverte elementer enn det som det er returnert statuser for                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ArchiveShipmentStatusList | Liste over de returnerte arkiv elementene som en liste av ArchiveShipmentStatusExternalV2-entiteter                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                           | ArchiveShipmentStatusExternalV2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ArchiveReference          | Unik arkiv referanse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| TimeOfArchiving           | Tidspunkt for arkivering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ServiceCode               | Tjenestekode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ServiceEditionCode        | Tjeneste utgave kode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ShipmentStatusLog         | Liste over arkiv elementets status endringer som en liste av ShipmentStatusLogEntry-entiteter.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                           | **ShipmentStatusLogEntry**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ShipmentDescription       | En beskrivelse av Shipment relatert til statusen, som inneholder navnet på ShipmentDefinition og TransportSekvensNummeret for shipmentet til tjenesteeier. Disse blir adskilt med et pipe-tegn                                                                                                                                                                                                                                                                                                                                                 |
| ShipmentStatus            | En beskrivelse av Shipment relatert til statusen, som inneholder navnet på ShipmentDefinition og TransportSekvensNummeret for shipmentet til tjenesteeier. Disse blir adskilt med et pipe-tegn ShipmentStatus ShipmentStatus for arkiv elementet. Kan være: NotSet - Elementet er ikke gjort klar til oversendelse. NotSent – Elementet er ikke sendt til tjenesteeier. Sent – Element er sent til tjenesteeier. Error – Overførsel til tjenesteeier feilet. Correlated – Correspondence er opprettet som er knyttet til denne ArkivReferansen |
| ShipmentStatusDateTime    | Dato og klokkeslett for når statusen ble satt på arkiv elementet                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### GetAttachmentDataStreamed

Denne operasjonen benyttes for å hente ut data for ett gitt vedlegg in den tilfelle vedlegg er større en 30MB. GetArchivedFormTaskV2 må kalles for å få detailene om den binær filen returnerte av denne metoden.

Tabellen under beskriver datakontrakten for operasjonen.

| Input          | Beskrivelse                             |
| -------------- | --------------------------------------- |
| AttachmentID   | Unik identifikator for et vedlegg       |
| **Returverdi** | **Beskrivelse**                         |
| Attachment     | Stream som inneholder et binært vedlegg |
