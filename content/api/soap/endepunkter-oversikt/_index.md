---
title: Endepunkter
description: URI til alle Altinn tjenester / aliasoversikt for endepunkter. En operasjon kan kalles med forskjellige endepunkter ut fra hvilken autentiseringsmetode tjenesteeier ønsker å benytte.
weight: 400
aliases:
- /guides/integrasjon/sluttbrukere/webservice/endepunkter-oversikt/
---

Det tilbys opp til tre forskjellige endepunkter for hver web service operasjon:

- **Basic Http (SOAP 1.1)**  
Tradisjonell interoperabel web service. System og bruker informasjon angis som parameter til operasjoner. Altså i body av SOAP requesten.
- **WS Http (SOAP 1.2 med WS-Security username token)**  
Støtte for nye web service standarder WS\*
- **WS Http (SOAP 1.2 med WS-Security X.509 token) (markert som EC)**  
Støtte for ny web standarder WS\*, dvs. bl.a. at sertifikat ligger i SOAP headeren. I tillegg krever Altinn et brukernavn og passord som parameter til operasjoner. Dette blir med som en del av body i SOAP requesten.

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
|                           | EC         | GetArchivedFormTaskEC             | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC.svc>            |
| GetAttachmentDataV2       | WS Http    | GetAttachmentDataExternalV2       | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>              |
|                           | Basic Http | GetAttachmentDataBasicV2          | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         |
|                           | EC         | GetAttachmentDataEC               | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC.svc>            |
| GetAttachmentDataStreamed | WS Http    | GetAttachmentDataExternalStreamed | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalStreamed.svc>      |
|                           | Basic Http | GetAttachmentDataStreamedBasic    | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalStreamedBasic.svc> |
|                           | EC         | GetAttachmentDataStreamedEC       | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalStreamedEC.svc>    |
| GetArchivedLookup         | WS Http    | GetArchivedLookupExternal         | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>              |
|                           | Basic Http | GetArchivedLookupBasic            | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         |
|                           | EC         | GetArchivedLookupEC               | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC.svc>            |
| GetArchivedCorrespondence | WS Http    | GetArchivedCorrespondence         | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternal.svc>              |
|                           | Basic Http | GetArchivedCorrespondenceBasic    | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalBasic.svc>         |
|                           | EC         | GetArchivedCorrespondenceEC       | <https://www.altinn.no/ArchiveExternal/ReporteeArchiveExternalEC.svc>            |


## IntermediaryInbound

| Basis operasjon           | Endepunkt  | Endepunkt operasjon            | Endepunkt URL                                                                   |
|---------------------------|------------|--------------------------------|---------------------------------------------------------------------------------|
| SubmitFormTask            | WS Http    | SubmitFormTask                 | <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>            |
|                           | Basic Http | SubmitFormTaskBasic            | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>       |
|                           | EC         | SubmitFormTaskEC               | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>  |
| GetAltinnSubmissionStatus | WS Http    | GetAltinnSubmissionStatus      | <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>            |
|                           | Basic Http | GetAltinnSubmissionStatusBasic | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>       |
|                           | EC         | GetAltinnSubmissionStatusEC    | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>  |
| CompleteAndSignShipment   | WS Http    | CompleteAndSignShipment        | <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>            |
|                           | Basic Http | CompleteAndSignShipmentBasic   | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>       |
|                           | EC         | CompleteAndSignShipmentEC      | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>  |
| UpdateFormData            | WS Http    | UpdateFormData                 | <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>            |
|                           | Basic Http | UpdateFormDataBasic            | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>       |
|                           | EC         | UpdateFormDataEC               | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>  |


## IntermediaryInboundStreamed

| Basis operasjon             | Endepunkt  | Endepunkt operasjon           | Endepunkt URL                                                                           |
|-----------------------------|------------|-------------------------------|-----------------------------------------------------------------------------------------|
| SubmitAttachmentStreamed    | WS Http    | SubmitAttachmentStreamed      | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundStreamed.svc>            |
|                             | Basic Http | SubmitAttachmentStreamedBasic | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasicStreamed.svc>       |
|                             | EC         | SubmitAttachmentStreamedEC    | <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalECStreamed.svc>  |


## ReceiptExternal

| Basis operasjon  | Endepunkt  | Endepunkt operasjon   | Endepunkt URL                                                          |
|------------------|------------|-----------------------|------------------------------------------------------------------------|
| GetReceiptV2     | WS Http    | GetReceiptV2          | <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>       |
|                  | Basic Http | GetReceiptBasicV2     | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc>  |
|                  | EC         | GetReceiptECV2        | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC.svc>     |
| GetReceiptListV2 | WS Http    | GetReceiptListV2      | <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>       |
|                  | Basic Http | GetReceiptListBasicV2 | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc>  |
|                  | EC         | GetReceiptListECV2    | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC.svc>     |
| UpdateReceipt    | WS Http    | UpdateReceipt         | <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>       |
|                  | Basic Http | UpdateReceiptBasic    | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc>  |
|                  | EC         | UpdateReceiptEC       | <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC.svc>     |


## CorrespondenceExternal

| Basis operasjon                     | Endepunkt   | Endepunkt operasjon                          | Endepunkt URL                                                                 |
|-------------------------------------|-------------|----------------------------------------------|-------------------------------------------------------------------------------|
| GetCorrespondenceForEndUserSystemV2 | WS Http     | GetCorrespondenceForEndUserSystemsExternalV2 | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc>      |
|                                     | Basic Http  | GetCorrespondenceForEndUserSystemBasicV2     | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> |
|                                     | EC          | GetCorrespondenceForEndUserSystemsEC         | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalEC.svc>    |
| DeleteCorrespondence[               | WS Http     | DeleteCorrespondenceExternal                 | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc>      |
|                                     | Basic Http  | DeleteCorrespondenceBasic                    | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> |
| SaveCorrespondenceConfirmation      | WS Http     | SaveCorrespondenceConfirmationExternal       | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc>      |
|                                     | Basic Http  | SaveCorrespondenceConfirmationBasic          | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> |
|                                     | EC          | SaveCorrespondenceConfirmationEC             | <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalEC.svc>    |


## ReporteeElementList

| Basis operasjon                    | Endepunkt   | Endepunkt operasjon                     | Endepunkt URL                                                                       |
|------------------------------------|-------------|-----------------------------------------|-------------------------------------------------------------------------------------|
| DeleteReporteeElement              | WS Http     | DeleteReporteeElementExternal           | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | DeleteReporteeElementBasic              | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC          | DeleteReporteeElementEC                 | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>             |
| GetFormSetElementsV2               | WS Http     | GetFormSetElementsExternalV2            | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetFormSetElementsBasicV2               | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC          | GetFormSetElementsEC                    | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>             |
| GetReporteeElementListV2           | WS Http     | GetReporteeElementListExternalV2        | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetReporteeElementListBasicV2           | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC          | GetReporteeElementListEC                | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>             |
| GetCorrespondenceListForArchiveRef | WS Http     | GetCorrespondenceListForArchiveRef      | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetCorrespondenceListForArchiveRefBasic | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC          | GetCorrespondenceListForArchiveRefEC    | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>             |
| GetCorrespondenceListForReportee   | WS Http     | GetCorrespondenceListForReportee        | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetCorrespondenceListForReporteeBasic   | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC          | GetCorrespondenceListForReporteeEC      | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>             |
| GetFormSetData                     | WS Http     | GetFormSetData                          | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc>       |
|                                    | Basic Http  | GetFormSetDataBasic                     | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc>  |
|                                    | EC          | GetFormSetDataEC                        | <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>             |


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
|                    | EC         | GetPrefillDataEC      | <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternalEC.svc>     |


## Case

| Basis operasjon          | Endepunkt   | Endepunkt operasjon                   | Endepunkt URL                                                        |
|--------------------------|-------------|---------------------------------------|----------------------------------------------------------------------|
| GetCaseList              | WS http     | GetCaseListExternal                   | <https://www.altinn.no/ServiceEngineExternal/CaseExternal.svc>       |
|                          | Basic http  | GetCaseListExternalBasic              | <https://www.altinn.no/ServiceEngineExternal/CaseExternalBasic.svc>  |
|                          | EC          | GetCaseListEC                         | <https://www.altinn.no/ServiceEngineExternal/CaseEC.svc>             |
| InstantiateCollaboration | WS http     | InstantiateCollaborationExternal      | <https://www.altinn.no/ServiceEngineExternal/CaseExternal.svc>       |
|                          | Basic http  | InstantiateCollaborationExternalBasic | <https://www.altinn.no/ServiceEngineExternal/CaseExternalBasic.svc>  |
|                          | EC          | InstantiateCollaborationEC            | <https://www.altinn.no/ServiceEngineExternal/CaseEC.svc>             |
| ArchiveCase              | WS http     | ArchiveCaseExternal                   | <https://www.altinn.no/ServiceEngineExternal/CaseExternal.svc>       |
|                          | Basic http  | ArchiveCaseExternalBasic              | <https://www.altinn.no/ServiceEngineExternal/CaseExternalBasic.svc>  |
|                          | EC          | ArchiveCaseEC                         | <https://www.altinn.no/ServiceEngineExternal/CaseEC.svc>             |


## KeyManagement

| Basis operasjon | Endepunkt   | Endepunkt operasjon     | Endepunkt URL                                                           |
|-----------------|-------------|-------------------------|-------------------------------------------------------------------------|
| GetCertificates | WS http     | GetCertificatesBasic    | <https://www.altinn.no/ArchiveExternal/KeyManagementExternal.svc>       |
|                 | Basic http  | GetCertificatesExternal | <https://www.altinn.no/ArchiveExternal/KeyManagementExternalBasic.svc>  |
|                 | EC          | GetCertificatesEC       | <https://www.altinn.no/ArchiveExternal/KeyManagementEC.svc>             |


## BrokerService

| Basis operasjon       | Endepunkt   | Endepunkt operasjon        | Endepunkt URL                                                                        | Endepunkt operasjon        |
|-----------------------|-------------|----------------------------|--------------------------------------------------------------------------------------|----------------------------|
| GetAvailableFiles     | WS http     | GetAvailableFiles          | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternal.svc>              | GetAvailableFiles          |
|                       | Basic http  | GetAvailableFilesBasic     | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc>         | GetAvailableFilesBasic     |
|                       | EC          | GetAvailableFilesEC        | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC.svc>            | GetAvailableFilesEC        |
| InitiateBrokerService | WS http     | InitiateBrokerService      | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternal.svc>              | InitiateBrokerService      |
|                       | Basic http  | InitiateBrokerServiceBasic | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasic.svc>         | InitiateBrokerServiceBasic |
|                       | EC          | InitiateBrokerServiceEC    | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalEC.svc>            | InitiateBrokerServiceEC    |
| UploadFileStreamed    | WS http     | UploadFileStreamed         | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | UploadFileStreamed         |
|                       | Basic http  | UploadFileStreamedBasic    | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | UploadFileStreamedBasic    |
|                       | EC          | UploadFileStreamedEC       | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalECStreamed.svc>    | UploadFileStreamedEC       |
| DownloadFileStreamed  | WS http     | DownloadFileStreamed       | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | DownloadFileStreamed       |
|                       | Basic http  | DownloadFileStreamedBasic  | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalBasicStreamed.svc> | DownloadFileStreamedBasic  |
|                       | EC          | DownloadFileStreamedEC     | <https://www.altinn.no/ServiceEngineExternal/BrokerServiceExternalECStreamed.svc>    | DownloadFileStreamedEC     |

Alle URI er angitt med produksjonsadresse. Frem til produksjonssetting må <https://www.altinn.no> erstattes med peker til testmiljø
