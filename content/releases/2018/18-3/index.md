---
title: 18.3
description: TODO
weight: 100
type: releasenote
releasenote_info: Release 18.3, produksjonssettes i perioden 9. mars kl 22:00 til 10. mars kl 11:00 2018. Produksjonssettingen vil skje med nedetid
---

{{% notice info %}}
NB: Dette er en **fremtidig** versjon av Altinn.
Funksjonaliteten som beskrives kan ikke tas i bruk ennå, og beskrivelsene er fortsatt under arbeid.
Se [18.2](../18-2) for siste versjon i prod.
{{% /notice %}}

Innholdet i versjon 18.3 er planlagt ut i fra å øke ytelse, stabilitet og robusthet. Det er ikke lagt til ny funksjonalitet i denne releasen.

Denne releasen inneholder følgende endringer:
## Databasen
Databasen oppgraderes fra MS-sql versjon 2012 til versjon 2016.      
TFS 16841  Inneholder oppdatering av tre prosedyrer for å kunne kjøre på ny versjon av MS-sql.

I tillegg er følgende forbedringer/bugfiks utført:     
TFS 16364  GetRolesForDownload timeout    
TFS 16312  ReporteeElement_GetShipmentStatusLog_SELECT ytelse    
TFS 16223  Deadlocks i ReporteeElement_FormSetElementList_171_SELECT ved ytelsestest av åpningsdag    
TFS 15518  Optimalisering av ReporteeElement_GetReporteeElement_171_SELECT    
TFS 17943  Skalering av ReporteeElement_FormSetElementList_171_SELECT    
TFS 17946  Flaskehals i Delegation_DeleteRolesAndRights161_DELETE

## Infoportal
Forbedringer/bugfiks     
TFS 17560  Tiltak og forbedringer ytelse Infoportal

## Selvangivelsen
Forbedringer/bugfiks      
TFS 17234  Overføring av prosentsats for RF-1098 fungerer kun for første skjema    
TFS 16573  WebSA history has links to old correspondence pages (rather than new MVC pages)

## Portal
Forbedringer/bigfiks      
TFS 17720  Feilhåndtering i MVC    
TFS 17679  Skjema import medfører blokkering i databasen    
TFS 14945  Implementere nytt design på vente og nedetidsplakater    
TFS 17466  Feil verdi variables.csv i yt    
TFS 17143  Flaskehals åpningsdag - autorisasjonslogg    
TFS 17224  Portal skalering åpningsdag    
TFS 17489  Link to service missing in correspondence message    
TFS 14926  Revarsel vises i aktivitetsloggen før det er sendt    
TFS 17217  Som bruker av REST-APIet ønsker jeg at den underliggende SearchBE kan få satt DateFrom / DateTo med query parametre    
TFS 17635  Inbox element is not retrieved when the dateTo value is exact time of createdDate (bugfiks for 17217)    
TFS 16166  ST03 / 18.3, ÆØÅ fungerer ikke på portal    
TFS 17451  Treg avgiverliste for EC-brukere    
TFS 17940  Flaskehals i context handler
      
## Integrasjon
Forbedringer/bugfiks      
TFS 14928  SearchReplaceDynamicPipelineComponent - unable to cast object of type ‘System.Boolean’ to type ‘System.String’
