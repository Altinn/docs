---
title: Endepunkter
description: URI til alle Altinn tjenester / aliasoversikt for endepunkter. En operasjon kan kalles med forskjellige endepunkter ut fra hvilken autentiseringsmetode tjenesteeier ønsker å benytte.
toc: true
weight: 400
aliases:
- /guides/integrasjon/sluttbrukere/webservice/endepunkter-oversikt/
---

Det tilbys opp til tre forskjellige endepunkter for hver web service operasjon:

- **Basic Http (SOAP 1.1)**  
Tradisjonell interoperabel web service. System og bruker informasjon angis som parameter til operasjoner. Altså i body av SOAP requesten.
- **WS Http (SOAP 1.2 med WS-Security username token)**  
Støtte for nye web service standarder WS\*
- **WS Http (SOAP 1.2 med WS-Security X.509 token) (markert som EC2)**  
Støtte for ny web standarder WS\*, dvs. bl.a. at sertifikat ligger i SOAP headeren. I tillegg krever Altinn et brukernavn og passord som parameter til operasjoner. Dette blir med som en del av body i SOAP requesten. Klienten holder state


For eksempel:

Web service operasjonen GetReceipt kan aksesseres ved å kalle endepunktet.

Hvis man ønsker å bruke/autentisere vha. WS\* standarden, eller kalle endepunktet ”GetReceiptBasic” hvis man ønsker tradisjonell web service aksessering.

Nedenfor følger en oversikt over alle Altinn tjenester, og en aliasoversikt som viser kobling mellom endepunkter, endepunkt operasjon og basis operasjon (operasjon som kalles av endepunktoperasjon, og som er beskrevet i dette dokumentet). Den vil også angi nyeste versjon for operasjonen for endepunktet:

## SystemAuthentication

| Basis operasjon            | Endepunkt  | Endepunkt operasjon        | Endepunkt URL                                                           |
|----------------------------|------------|----------------------------|-------------------------------------------------------------------------|
| GetAuthenticationChallenge | Basic http | GetAuthenticationChallenge | <https://www.altinn.no/AuthenticationExternal/SystemAuthentication.svc> |


## ReporteeArchiveExternal

| Basis operasjon           | Endepunkt  | Endepunkt operasjon               | Endepunkt URL                                                                    |
|---------------------------|------------|-----------------------------------| ---------------------------------------------------------------------------------|
| GetArchivedFormTaskV2     | WS Http    | GetArchivedFormTaskExternalV2     | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>              |
|                           | Basic Http | GetArchivedFormTaskBasicV2        | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         |
|                           | EC2        | GetArchivedFormTaskEC             | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC2.svc>           |
| GetAttachmentDataV2       | WS Http    | GetAttachmentDataExternalV2       | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>              |
|                           | Basic Http | GetAttachmentDataBasicV2          | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         |
|                           | EC2        | GetAttachmentDataEC               | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC2.svc>           |
| GetAttachmentDataStreamed | WS Http    | GetAttachmentDataExternalStreamed | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalStreamed.svc>      |
|                           | Basic Http | GetAttachmentDataStreamedBasic    | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalStreamedBasic.svc> |
|                           | EC2        | GetAttachmentDataStreamedEC       | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalStreamedEC2.svc>   |
| GetArchivedLookup         | WS Http    | GetArchivedLookupExternal         | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>              |
|                           | Basic Http | GetArchivedLookupBasic            | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         |
|                           | EC2        | GetArchivedLookupEC               | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC2.svc>           |
| GetArchivedCorrespondence | WS Http    | GetArchivedCorrespondence         | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>              |
|                           | Basic Http | GetArchivedCorrespondenceBasic    | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         |
|                           | EC2        | GetArchivedCorrespondenceEC       | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC2.svc>           |


## IntermediaryInbound

| Basis operasjon           | Endepunkt  | Endepunkt operasjon            | Endepunkt URL                                                                   |
|---------------------------|------------|--------------------------------|---------------------------------------------------------------------------------|
| SubmitFormTask            | WS Http    | SubmitFormTask                 | <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>            |
|                           | Basic Http | SubmitFormTaskBasic            | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>       |
|                           | EC2        | SubmitFormTaskEC               | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC2.svc> |
| GetAltinnSubmissionStatus | WS Http    | GetAltinnSubmissionStatus      | <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>            |
|                           | Basic Http | GetAltinnSubmissionStatusBasic | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>       |
|                           | EC2        | GetAltinnSubmissionStatusEC    | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC2.svc> |
| CompleteAndSignShipment   | WS Http    | CompleteAndSignShipment        | <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>            |
|                           | Basic Http | CompleteAndSignShipmentBasic   | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>       |
|                           | EC2        | CompleteAndSignShipmentEC      | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC2.svc> |
| UpdateFormData            | WS Http    | UpdateFormData                 | <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>            |
|                           | Basic Http | UpdateFormDataBasic            | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>       |
|                           | EC2        | UpdateFormDataEC               | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC2.svc> |


## IntermediaryInboundStreamed

| Basis operasjon             | Endepunkt  | Endepunkt operasjon           | Endepunkt URL                                                                           |
|-----------------------------|------------|-------------------------------|-----------------------------------------------------------------------------------------|
| SubmitAttachmentStreamed    | WS Http    | SubmitAttachmentStreamed      | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundStreamed.svc>            |
|                             | Basic Http | SubmitAttachmentStreamedBasic | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasicStreamed.svc>       |
|                             | EC2        | SubmitAttachmentStreamedEC    | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC2Streamed.svc> |


## ReceiptExternal

| Basis operasjon  | Endepunkt  | Endepunkt operasjon   | Endepunkt URL                                                          |
|------------------|------------|-----------------------|------------------------------------------------------------------------|
| GetReceiptV2     | WS Http    | GetReceiptV2          | <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>       |
|                  | Basic Http | GetReceiptBasicV2     | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc>  |
|                  | EC2        | GetReceiptECV2        | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC2.svc>    |
| GetReceiptListV2 | WS Http    | GetReceiptListV2      | <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>       |
|                  | Basic Http | GetReceiptListBasicV2 | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc>  |
|                  | EC2        | GetReceiptListECV2    | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC2.svc>    |
| UpdateReceipt    | WS Http    | UpdateReceipt         | <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>       |
|                  | Basic Http | UpdateReceiptBasic    | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc>  |
|                  | EC2        | UpdateReceiptEC       | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC2.svc>    |


## CorrespondenceExternal

| Basis operasjon                     | Endepunkt   | Endepunkt operasjon                          | Endepunkt URL                                                                 |
|-------------------------------------|-------------|----------------------------------------------|-------------------------------------------------------------------------------|
| GetCorrespondenceForEndUserSystemV2 | WS Http     | GetCorrespondenceForEndUserSystemsExternalV2 | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc>      |
|                                     | Basic Http  | GetCorrespondenceForEndUserSystemBasicV2     | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> |
|                                     | EC2         | GetCorrespondenceForEndUserSystemsEC         | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalEC2.svc>   |
| DeleteCorrespondence[               | WS Http     | DeleteCorrespondenceExternal                 | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc>      |
|                                     | Basic Http  | DeleteCorrespondenceBasic                    | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> |
| SaveCorrespondenceConfirmation      | WS Http     | SaveCorrespondenceConfirmationExternal       | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc>      |
|                                     | Basic Http  | SaveCorrespondenceConfirmationBasic          | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> |
|                                     | EC2         | SaveCorrespondenceConfirmationEC             | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalEC2.svc>   |


## ReporteeElementList

| Basis operasjon                    | Endepunkt   | Endepunkt operasjon                     | Endepunkt URL                                                                       |
|------------------------------------|-------------|-----------------------------------------|-------------------------------------------------------------------------------------|
| DeleteReporteeElement              | WS Http     | DeleteReporteeElementExternal           | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | DeleteReporteeElementBasic              | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC2         | DeleteReporteeElementEC                 | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC2.svc>            |
| GetFormSetElementsV2               | WS Http     | GetFormSetElementsExternalV2            | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetFormSetElementsBasicV2               | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC2         | GetFormSetElementsEC                    | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC2.svc>            |
| GetReporteeElementListV2           | WS Http     | GetReporteeElementListExternalV2        | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetReporteeElementListBasicV2           | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC2         | GetReporteeElementListEC                | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC2.svc>            |
| GetCorrespondenceListForArchiveRef | WS Http     | GetCorrespondenceListForArchiveRef      | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetCorrespondenceListForArchiveRefBasic | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC2         | GetCorrespondenceListForArchiveRefEC    | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC2.svc>            |
| GetCorrespondenceListForReportee   | WS Http     | GetCorrespondenceListForReportee        | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetCorrespondenceListForReporteeBasic   | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC2         | GetCorrespondenceListForReporteeEC      | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC2.svc>            |
| GetFormSetData                     | WS Http     | GetFormSetData                          | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetFormSetDataBasic                     | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC2         | GetFormSetDataEC                        | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC2.svc>            |


## ServiceMetadataExternal
| Basis operasjon              | Endepunkt  | Endepunkt operasjon               | Endepunkt URL                                                                   |
|------------------------------|------------|-----------------------------------|---------------------------------------------------------------------------------|
| GetAvailableServicesV2       | WS http    | GetAvailableServicesV2            | <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternal.svc>       |
|                              | Basic Http | GetAvailableServicesBasicV2       | <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternalBasic.svc>  |
| GetFormTaskSchemaDefinitions | WS http    | GetSchemaDefinitionsForFormTask   | <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternal.svc>       |
|                              | Basic Http | GetFormTaskSchemaDefinitionsBasic | <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternalBasic.svc>  |


## Workflow

| Basis operasjon                         | Endepunkt   | Endepunkt operasjon                          | Endepunkt URL                                                                   |
|-----------------------------------------|-------------|----------------------------------------------|---------------------------------------------------------------------------------|
| DoSendingInAction                       | WS http     | DoSendingInAction                            | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | DoSendingInActionBasic                       | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  |
| DoSigning                               | WS http     | DoSigning                                    | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | DoSigningBasic                               | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  |
| GetAvailableActionsV2                   | WS http     | GetAvailableActionsV2                        | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | GetAvailableActionsBasicV2                   | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  |
| GetNextWorkflowStateTypeInProcessFlowV2 | WS http     | GetNextWorkflowStateTypeInProcessFlowV2      | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | GetNextWorkflowStateTypeInProcessFlowBasicV2 | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  |
| GetProcessDetailsV2                     | WS http     | GetProcessDetailsV2                          | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | GetProcessDetailsBasicV2                     | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
| GetProcessDetailsV3                     | WS http     | GetProcessDetailsV3                          | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | GetProcessDetailsBasicV3                     | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  |
| GetSigningText                          | WS http     | GetSigningText                               | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | GetSigningTextExternal                       | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  |
| SetBackToFormFilling                    | WS http     | SetBackToFormFilling                         | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | SetBackToFormFillingBasic                    | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  |
| PrepareUserControlledSigning            | WS http     | PrepareUserControlledSigning                 | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | PrepareUserControlledSigningBasic            | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  |
| GetProcessStepIDForParallelSigning      | WS http     | GetProcessStepIDForParallelSigning           | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternal.svc>       |
|                                         | Basic http  | GetProcessStepIDForParallelSigningBasic      | <https://www.altinn.no/ServiceEngineExternal/WorkflowServiceExternalBasic.svc>  |


## PrefillEUSExternal

| Basis operasjon    | Endepunkt  | Endepunkt operasjon   | Endepunkt URL                                                              |
|--------------------|------------|-----------------------|----------------------------------------------------------------------------|
| GetPrefillData     | WS http    | GetPrefillData        | <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternal.svc>       |
|                    | Basic http | GetPrefillDataBasicV2 | <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternalBasic.svc>  |
|                    | EC2        | GetPrefillDataEC      | <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternalEC2.svc>    |



## Case

| Basis operasjon          | Endepunkt   | Endepunkt operasjon                   | Endepunkt URL                                                        |
|--------------------------|-------------|---------------------------------------|----------------------------------------------------------------------|
| GetCaseList              | WS http     | GetCaseListExternal                   | <https://www.altinn.no/ServiceEngineExternal/CaseExternal.svc>       |
|                          | Basic http  | GetCaseListExternalBasic              | <https://www.altinn.no/ServiceEngineExternal/CaseExternalBasic.svc>  |
|                          | EC2         | GetCaseListEC                         | <https://www.altinn.no/ServiceEngineExternal/CaseEC2.svc>            |
| InstantiateCollaboration | WS http     | InstantiateCollaborationExternal      | <https://www.altinn.no/ServiceEngineExternal/CaseExternal.svc>       |
|                          | Basic http  | InstantiateCollaborationExternalBasic | <https://www.altinn.no/ServiceEngineExternal/CaseExternalBasic.svc>  |
|                          | EC2         | InstantiateCollaborationEC            | <https://www.altinn.no/ServiceEngineExternal/CaseEC2.svc>            |
| ArchiveCase              | WS http     | ArchiveCaseExternal                   | <https://www.altinn.no/ServiceEngineExternal/CaseExternal.svc>       |
|                          | Basic http  | ArchiveCaseExternalBasic              | <https://www.altinn.no/ServiceEngineExternal/CaseExternalBasic.svc>  |
|                          | EC2         | ArchiveCaseEC                         | <https://www.altinn.no/ServiceEngineExternal/CaseEC2.svc>            |


## KeyManagement

| Basis operasjon | Endepunkt   | Endepunkt operasjon     | Endepunkt URL                                                           |
|-----------------|-------------|-------------------------|-------------------------------------------------------------------------|
| GetCertificates | WS http     | GetCertificatesBasic    | <https://www.altinn.no/ArchiveExternal/KeyManagementExternal.svc>       |
|                 | Basic http  | GetCertificatesExternal | <https://www.altinn.no/ArchiveExternal/KeyManagementExternalBasic.svc>  |
|                 | EC2         | GetCertificatesEC       | <https://www.altinn.no/ArchiveExternal/KeyManagementEC2.svc>            |


## BrokerService

| Basis operasjon                | Endepunkt   | Endepunkt operasjon        | Endepunkt URL                                                                        | Endepunkt operasjon        |
|-----------------------|-------------|----------------------------|--------------------------------------------------------------------------------------|----------------------------|
| CheckIfAvailableFiles          | WS http     | CheckIfAvailableFiles      | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternal.svc>              | CheckIfAvailableFiles      |
|                                | Basic http  | CheckIfAvailableFilesBasic | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc>         | CheckIfAvailableFilesBasic |
|                                | EC2         | CheckIfAvailableFilesEC    | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC2.svc>           | CheckIfAvailableFilesEC    |
| GetAvailableFiles              | WS http     | GetAvailableFiles          | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternal.svc>              | GetAvailableFiles          |
|                                | Basic http  | GetAvailableFilesBasic     | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc>         | GetAvailableFilesBasic     |
|                                | EC2         | GetAvailableFilesEC        | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC2.svc>           | GetAvailableFilesEC        |
| InitiateBrokerService          | WS http     | InitiateBrokerService      | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternal.svc>              | InitiateBrokerService      |
|                                | Basic http  | InitiateBrokerServiceBasic | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc>         | InitiateBrokerServiceBasic |
|                                | EC2         | InitiateBrokerServiceEC    | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC2.svc>           | InitiateBrokerServiceEC    |
| UploadFileStreamed             | WS http     | UploadFileStreamed         | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | UploadFileStreamed         |
|                                | Basic http  | UploadFileStreamedBasic    | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | UploadFileStreamedBasic    |
|                                | EC2         | UploadFileStreamedEC       | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC2Streamed.svc>   | UploadFileStreamedEC       |
| DownloadFileStreamed           | WS http     | DownloadFileStreamed       | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | DownloadFileStreamed       |
|                                | Basic http  | DownloadFileStreamedBasic  | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | DownloadFileStreamedBasic  |
|                                | EC2         | DownloadFileStreamedEC     | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC2Streamed.svc>   | DownloadFileStreamedEC     |

Alle URI er angitt med produksjonsadresse. Frem til produksjonssetting må <https://www.altinn.no> erstattes med peker til testmiljø
