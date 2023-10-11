---
title: AuthorizationExternal 
linktitle: Autorisasjon
description: Her beskrives migreringsløpet for SOAPtjenestene som ligger under AuthorizationExternal-endepunktet
toc: true
weight: 
tags: [plan, migration, authorizaton]
---


## /AuthorizationExternal/AdministrationExternal
Tjenesten benyttest for å hente ut informasjon om brukers roller og avgivere. 
Denne erstattes av Accessmanagement i Altinn 3.

*Funksjonalitet og API forventes levert Q1-Q4 2023 i Altinn 3.*
- Se beskrivelse av den nye tjenesten [her](authorization/modules/accessmanagement/)
- se beskrivelse av de nye APIene [her](https://docs.altinn.studio/authorization/api/)

### Operasjoner i A2
- [GetReporteeByTempKey](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/autorisasjon/#getreporteebytempkey)
  - Denne metoden fases helt ut. Aktuelle tjenesteeiere er varslet og planene avklart.
- [GetReportees](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/autorisasjon/#getreportees)
  - Denne metoden fortsetter som REST-tjeneste i Altinn 3.
- [GetRoles](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/autorisasjon/#getroles)
  - Denne metoden fortsetter som REST-tjeneste i Altinn 3.
#### Følgende API i A3 erstatter denne tjensten
Beskrivelse kommer senere.



## /AuthorizationExternal /AuthorizationDecisionPointExternal
Tjenesten tilbyr operasjon som benytter XACML standarden og regler lagret i Altinn til å returnere en autorisasjonsbeslutning.
Denne erstattes av Policy Decision Point i Altinn 3 men tjenesten vil endres en del i forhold til hvordan den fungere i dag. 

*Funksjonalitet og API forventes levert Q1-Q4 2023 i Altinn 3.*
- Se beskrivelse av den nye tjenesten [her](https://docs.altinn.studio/authorization/modules/pdp/)
- Se beskrivelse av de nye APIene [her](https://docs.altinn.studio/authorization/api/)

### Operasjoner i A2
- [AuthorizeAccessExternal](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/autorisasjon/#authorizeaccessexternalv2)
  - Denne metoden fortsetter som REST-tjeneste i Altinn 3. 

#### Følgende API i A3 erstatter denne tjensten
Beskrivelse kommer senere.


## /AuthorizationExternal /AuthorizationAdministrationSyncronExternal

Tjenesten tilbyr funksjonalitet for administrering og migrering av regler (policy) for tjenester/ressurser erstattes av Resourceregistry i Altinn 3.
Operasjonen benyttes kun av digdir 

*Funksjonalitet og API forventes levert Q1 2023 i Altinn 3.*
- Se beskrivelse av den nye tjenesten [her](/authorization/architecture/resourceregistry/)
- se beskrivelse av de nye APIene [her](https://docs.altinn.studio/authorization/api/)

### Operasjoner i A2 
- MigratePolicy
  
