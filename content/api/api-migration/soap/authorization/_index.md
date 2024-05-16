---
title: AuthorizationExternal 
linktitle: Authorization
description: Her beskrives migreringsløpet for SOAPtjenestene som ligger under AuthorizationExternal-endepunktet
toc: true
weight: 
tags: [plan, migration, authorizaton]
---

# Tilgangsstyring


## /AuthorizationExternal/AdministrationExternal
**Brukes av sluttbrukersystem og Tjenesteeiere**

Tjenesten benyttest for å hente ut informasjon om brukers roller og avgivere. 
Denne erstattes av Accessmanagement i Altinn 3.

*Funksjonalitet og API forventes levert fortløpende i løpet av 2024 i Altinn 3.*
- Se beskrivelse av den nye tjenesten [her](authorization/modules/accessmanagement/)
- se beskrivelse av de nye APIene [her](https://docs.altinn.studio/authorization/api/)

### Operasjoner i A2
- [GetReporteeByTempKey](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/autorisasjon/#getreporteebytempkey)
  - Denne metoden fases helt ut. Aktuelle tjenesteeiere er varslet og planene avklart.
- [GetReportees](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/autorisasjon/#getreportees)
  - Denne metoden fortsetter som REST-tjeneste i Altinn 3,  men tjenestene vil sannsynlig endres noe. 
- [GetRoles](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/autorisasjon/#getroles)
  - Denne metoden fortsetter som REST-tjeneste i Altinn 3,  men tjenestene vil sannsynlig endres noe. 
#### Følgende API i A3 erstatter denne tjenesten
Beskrivelse kommer senere.

# Tilgangskontroll
Tjenesten tilbyr operasjon som benytter XACML standarden og regler lagret i Altinn til å returnere en autorisasjonsbeslutning.
Denne erstattes av Policy Decision Point i Altinn 3 men tjenesten vil endres en del i forhold til hvordan den fungere i dag. 

*Funksjonalitet og API forventes levert fortløpende i løpet av 2024 i Altinn 3.*
- Se beskrivelse av den nye tjenesten [her](https://docs.altinn.studio/authorization/modules/pdp/)
- Se beskrivelse av de nye APIene [her](https://docs.altinn.studio/authorization/api/)

## /AuthorizationExternal /AuthorizationDecisionPointExternal
**Brukes av tjenesteeiere**

### Operasjoner i A2
- [AuthorizeAccessExternal](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/autorisasjon/#authorizeaccessexternalv2)
  - Denne metoden fortsetter som REST-tjeneste i Altinn 3, men tjenestene vil sannsynlig endres noe. 

#### Følgende API i A3 erstatter denne tjenesten
Beskrivelse kommer senere.

# Autorisasjonsregler
**Brukes av Digdir**

Tjenesten tilbyr funksjonalitet for administrering og migrering av regler (policy) for tjenester/ressurser erstattes av Resourceregistry i Altinn 3.

*Funksjonalitet og API forventes levert Q1 2024 i Altinn 3.*
- Se beskrivelse av den nye tjenesten [her](/authorization/architecture/resourceregistry/)
- se beskrivelse av de nye APIene [her](https://docs.altinn.studio/authorization/api/)

## /AuthorizationExternal /AuthorizationAdministrationSyncronExternal

### Operasjoner i A2 
- MigratePolicy
  -  Denne metoden fases ut. Tjenesteeier vil kunne oppdatere og publidere regler (policies) for tjenester i Studio, les mer [her]()
  
