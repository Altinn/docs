---
title: Endepunkter
description: Beskrivelse av hvilken funksjonalitet som finnes med referanser til hvilke web services som benyttes
weight: 400
aliases:
- /guides/integrasjon/sluttbrukere/webservice/endepunkter-oversikt/
---

![""](endepunkter-oversikt.png)

URI til alle Altinn tjenester / aliasoversikt for endepunkter
-------------------------------------------------------------

Web servicene beskrevet i dokumentet er angitt uten informasjon om endepunkt. En web service operasjon kan kalles med forskjellige endepunkter ut fra hvilken autentiseringsmetode tjenesteeier ønsker å benytte.

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

|          |             |     |
|---------------------------|--------------|--------------|
| **ReporteeArchiveExternal**   |             |     |
| **Basis operasjon**           | **URI/Endepunkt**  | **Endepunkt operasjon**  |
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
| **Basis operasjon**           | **URI/Endepunkt** | **Endepunkt operasjon**            |
| SubmitFormTask            | WS Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>         | SubmitFormTask                 |
|                           | Basic Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc> | SubmitFormTaskBasic            |
|                           | EC  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>    | SubmitFormTaskEC               |
| GetAltinnSubmissionStatus | WS Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>    | GetAltinnSubmissionStatus      |
|                           | Basic Http <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>              |   GetAltinnSubmissionStatusBasic |
|                           | EC  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>    | GetAltinnSubmissionStatusEC    |
| CompleteAndSignShipment   | WS Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>   | CompleteAndSignShipment        |
|                           | Basic Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc>| CompleteAndSignShipmentBasic   |
|                           | EC  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>    | CompleteAndSignShipmentEC      |
| SubmitFormTask            | WS Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInbound.svc>         | UpdateFormData                 |
|                           | Basic Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasic.svc> | UpdateFormDataBasic            |
|                           | EC  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalEC.svc>    | UpdateFormDataEC               |
| **IntermediaryInboundStreamed** |                        |                               |
| **Basis operasjon**             | **URI/Endepunkt**  | **Endepunkt operasjon**|
| SubmitAttachmentStreamed    | Basic Http  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundStreamed.svc>    | SubmitAttachmentStreamed      |
|                             | Basic Http <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundBasicStreamed.svc>   | SubmitAttachmentStreamedBasic |
|                             | EC  <https://www.altinn.no/IntermediaryExternal/IntermediaryInboundExternalECStreamed.svc> | SubmitAttachmentStreamedEC    |
| **ReceiptExternal**       |                      |                       |
| **Basis operasjon**  | **URI/Endepunkt** | **Endepunkt operasjon**   |
| GetReceiptV2     | WS Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>       | GetReceiptV2          |
|                  | Basic Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc>  | GetReceiptBasicV2     |
|                  | EC  <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC.svc> | GetReceiptECV2        |
| GetReceiptListV2 | WS Http  <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>  | GetReceiptListV2      |
|                  | Basic Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc> | GetReceiptListBasicV2 |
|                  | EC  <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC.svc> | GetReceiptListECV2    |
| UpdateReceipt    | WS Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternal.svc>  | UpdateReceipt         |
|                  | Basic Http <https://www.altinn.no/IntermediaryExternal/ReceiptExternalBasic.svc> | UpdateReceiptBasic    |
|                  | EC  <https://www.altinn.no/IntermediaryExternal/ReceiptExternalEC.svc> | UpdateReceiptEC       |
| **CorrespondenceExternal**    |         |         |
| **Basis operasjon**         | **URI/Endepunkt**  | **Endepunkt operasjon** |
| GetCorrespondenceForEndUserSystemV2 | WS Http  <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc> | GetCorrespondenceForEndUserSystemsExternalV2 |
|                                     | Basic Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> | GetCorrespondenceForEndUserSystemBasicV2     |
|                                     | EC <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalEC.svc>  | GetCorrespondenceForEndUserSystemsEC         |
| DeleteCorrespondence[1]             | WS Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc> | DeleteCorrespondenceExternal                 |
|                                     | Basic Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc>| DeleteCorrespondenceBasic                    |
| SaveCorrespondenceConfirmation      | WS Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternal.svc>  | SaveCorrespondenceConfirmationExternal       |
|                                     | Basic Http <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalBasic.svc> | SaveCorrespondenceConfirmationBasic          |
|                                     | EC  <https://www.altinn.no/ServiceEngineExternal/CorrespondenceExternalEC.svc>  | SaveCorrespondenceConfirmationEC             |
| **ReporteeElementList**     |                |             |
| **Basis operasjon**          | **URI/Endepunkt** | **Endepunkt operasjon** |
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
| GetFormSetData   | WS Http <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternal.svc> | GetFormSetData        |
|                                    | Basic Http  <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListExternalBasic.svc> | GetFormSetDataBasic   |
|                                    | EC <https://www.altinn.no/ServiceEngineExternal/ReporteeElementListEC.svc>  | GetFormSetDataEC      |
| **ServiceMetadataExternal**              |            |
| **Basis operasjon**              | **URI/Endepunkt**  | **Endepunkt operasjon** |
| GetAvailableServicesV2       | WS http  <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternal.svc>   | GetAvailableServicesV2            |
|                              | Basic Http <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternalBasic.svc>| GetAvailableServicesBasicV2       |
| GetFormTaskSchemaDefinitions | WS http  <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternal.svc> | GetSchemaDefinitionsForFormTask   |
|                              | Basic Http <https://www.altinn.no/ServiceEngineExternal/ServiceMetaDataExternalBasic.svc> | GetFormTaskSchemaDefinitionsBasic |
| **Workflow**      |                   |                    |
| **Basis operasjon**    | **URI/Endepunkt**   | **Endepunkt operasjon**   |
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
| **Basis operasjon**    | **URI/Endepunkt** | **Endepunkt operasjon**   |
| GetPrefillData     | WS http  <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternal.svc> | GetPrefillData        |
|                    | Basic http <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternalBasic.svc>  | GetPrefillDataBasicV2 |
|                    | EC <https://www.altinn.no/ServiceEngineExternal/PreFillEUSExternalEC.svc> | GetPrefillDataEC      |
| **Case**                     |             |                              |
| **Basis operasjon**          | **URI/Endepunkt** | **Endepunkt operasjon** |
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
| **Basis operasjon** | **URI/Endepunkt**  | **Endepunkt operasjon**     |
| GetCertificates | WS http <https://www.altinn.no/ArchiveExternal/KeyManagementExternal.svc> | GetCertificatesBasic    |
|                 | Basic http  <https://www.altinn.no/ArchiveExternal/KeyManagementExternalBasic.svc> | GetCertificatesExternal |
|                 | EC <https://www.altinn.no/ArchiveExternal/KeyManagementEC.svc>  | GetCertificatesEC       |
| **SystemAuthentication**       |                     |                            |
| **Basis operasjon**   | **URI/Endepunkt**  | **Endepunkt operasjon**        |
| GetAuthenticationChallenge | Basic http <https://www.altinn.no/AuthenticationExternal/SystemAuthentication.svc> | GetAuthenticationChallenge |
| **BrokerService**        |                    |                            |
| **Basis operasjon**       | **URI/Endepunkt**  | **Endepunkt operasjon**   |
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

Alle URI er angitt med produksjonsadresse. Frem til produksjonssetting må <https://www.altinn.no> erstattes med peker til testmiljø
