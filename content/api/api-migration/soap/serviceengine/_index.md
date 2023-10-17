---
title: ServiceEngineExternal
linktitle: ServiceEngine
description: Her beskrives migreringsløpet SOAPtjenestene som ligger under ServiceEngineExternal-endepunktet
toc: true
weight: 
tags: [plan, migration]
---
# Formidlingstjeneste

## /ServiceEngineExternal/BrokerServiceExternal​
**Brukes av sluttbrukersystem**

Tjenesten benyttes for å opprette/hente/sende Brokerservice. 
Denne erstattes av nye REST api for Brokerservice i Altinn 3. 

*Funksjonalitet og API forventes levert Q1 2024 i Altinn 3.*
- Se beskrivelse av den nye tjenesten her: *lenke kommer senere*
- se beskrivelse av de nye APIene her: *lenke kommer senere*

#### Operasjoner i A2
- CheckIfAvailableFiles​
- ConfirmDownloaded​
- DownloadFileStreamed​
- GetAvailableFiles​
- InitiateBrokerService​
- UploadFileStreamed​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

# Samhandlingstjeneste

## /ServiceEngineExternal/CaseAgencySystemExternal​
**Brukes av tjenesteeier**

Tjenesten benyttes av Brønnøysundregistrene i forbindelse med samhandlingstjenesten "Konkursbo". 

*Tjenesten vil bli flyttet til Altinn 3 innen juni 2025*
- Se beskrivelse av den nye tjenesten her: *lenke kommer senere*

#### Operasjoner i A2
- GetCaseListAgencySystemExternalBasic​
- InstantiateCollaborationAgencySystemExternalBasic​
- NotifyEventAgencySystemExternalBasic​
- SetNoticeAgencySystemExternalBasic​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

# Meldingstjeneste

Tjenesten benyttes for å sende, sjekke status, hente ned, arkivere og lagre meldinger som brukere mottar fra tjenesteier i Altinn. 
Denne erstattes av nye REST api for Meldingstjenester i Altinn 3. 

*Ny funksjonalitet og API blir utviklet i løpet av 2024 i Altinn 3.*
- Se beskrivelse av den nye tjenesten her: *lenke kommer senere*

## /ServiceEngineExternal/CorrespondenceAgencyExternal​
**Brukes av tjenesteeier**

#### Operasjoner i A2
- GetCorrespondenceStatusHistory​
- InsertCorrespondence​
- GetCorrespondenceStatusDetails​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

## /ServiceEngineExternal/CorrespondenceExternal​
**Brukes av sluttbrukersystem**

#### Operasjoner i A2
- ArchiveCorrespondenceForEndUserSystem​
- GetCorrespondenceForEndUserSystems​
- SaveCorrespondenceConfirmation​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

# Frittstående varsel
Tjenesten benyttes for å sende standalone notification​ til brukere via Altinn. 
Denne erstattes av ny tjeneste for å sende varsel i Altinn 3. 

*Funksjonalitet og API blir utviklet i løpet av 2024 i Altinn 3.*
- Se beskrivelse av den nye tjenesten [her](https://docs.altinn.studio/notifications/)

## /ServiceEngineExternal/NotificationAgencyExternal​
**Brukes av tjenesteeier**

#### Operasjoner i A2
- SendStandaloneNotificationBasic​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

# Service Metadata
Disse tjenstene benyttes for å hente ut eller oppdatere metadata om tjenester som tilbys på Altinn 2 plattformen. 

I Altinn 3 er det opprettet et ressursregister som skal inneholde informasjon om alle ressurser som benytter Altinn som tilgangsstyringsløsning, les mer [her](https://docs.altinn.studio/api/resourceregistry/)

For skjema som er flyttet til Altinn 3 så kan metadata om de nye tjenestene (APP) finnes [her](https://docs.altinn.studio/api/apps/metadata/). 

## /ServiceEngineExternal/ServiceMetaDataExternal​

#### Operasjoner i A2
- GetAvailableServices​
- GetSchemaDefinitionsForFormTask​
- GetCodeList​
- GetFormTaskSchemaDefinitionsBasic​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

## /ServiceEngineExternal/ServiceMetadataImportExternal​

#### Operasjoner i A2
- CodeListImport​
- GetFormActivationStatus​
- ServiceEditionImport​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

# Prefill, Abonnement og Arbeidsflyt

Skjema i Altinn 2 fases nå ut og utvikles på nytt i Altinn 3. Det er den offentlige etaten som eier skjema som er ansvarlig for dette og bestemmer når dette skjer. 
Her finner dere informasjon om [APIene](https://docs.altinn.studio/api/apps/) for APPs som er flyttet til Altinn 3.

## /ServiceEngineExternal/PreFill​
Tjenesten benyttes for å opprette og laste ned prefilldata som benyttes til forhåndsutfylling av skjema som opprettes i Altinn 2. 

**Brukes av tjenesteeiere**

#### Operasjoner i A2
- SubmitAndInstantiatePrefilledFormTask

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

## /ServiceEngineExternal/PreFillAgencyExternal​

**Brukes av DSB**
#### Operasjoner i A2
- SubmitAndInstantiatePrefilledFormTaskEC​

## /ServiceEngineExternal/PreFillEUSExternal​
Tjenesten benyttes for å hente ned prefilldata

**Brukes av sluttbrukersystem**
#### Operasjoner i A2
- GetPrefillData

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

## /ServiceEngineExternal/Subscription​
Tjenesten benyttes for å opprette instans av et skjema for bruker i Altinn 2. Skjema er ofte forhåndsutfylt med data sendt inn via prefill-endepunkt. 

**Brukes av Helsedirektoratet**

#### Operasjoner i A2
- SubmitSubscriptionBasic

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

## /ServiceEngineExternal/WorkflowServiceExternal​
**Brukes av sluttbrukersystem**

#### Operasjoner i A2
- DoSigningBasic​
- GetAvailableActionsBasic​
- GetSigningTextExternal

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*

# Elemeneter i innboks
Henter ut liste over både correspondence og formtask​ fra innboks.

Det vil bli utviklet ny arbeidsflate for meldingsboks i Altinn. Dette arbeidet er i en oppstartsfase og fremdrift kan følges [her](https://github.com/orgs/digdir/projects/8/views/28). 

I forbindelse med modernisering av Altinn 2 så blir det også utviklet en ny tjeneste foreløpig kalt [Dialogporten](https://digdir.github.io/dialogporten/)". 
Dialogporten har som hensikt å bli en felles nasjonal arbeidsflate for både API- og GUI-konsumenter av offentlige tjenester.  

*Ny funksjonalitet og API blir utviklet i 2025 i Altinn 3.*
- Se beskrivelse av den nye tjenesten her: *lenke kommer senere*
- se beskrivelse av de nye APIene: *lenke kommer senere*


## /ServiceEngineExternal/ReporteeElementListExternal​
**Brukes av sluttbrukersystem**

#### Operasjoner i A2
- DeleteReporteeElement​
- GetCorrespondenceListForReportee​
- GetFormSetData​
- GetFormSetElements​
- GetReporteeElementList​

*Alle disse operasjonene fases ut slik de nå er og erstattes av nye REST API med nytt design*
