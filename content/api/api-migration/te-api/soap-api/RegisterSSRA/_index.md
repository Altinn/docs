---
title: RegisterExternal
linktitle: Register
description: Her beskrives migreringsløpet SOAPtjenestene som ligger under RegisterExternal-endepunktet
toc: true
weight: 
tags: [plan, migration, authorizaton]
---


## /RegisterExternal/RegisterSRRAgencyExternal
Brukes av TE for å oppdatere[Tjenesteeierstyrt Rettighetsregister (SRR)](https://altinn.github.io/docs/api/tjenesteeiere/soap/grensesnitt/rights/#registersrragencyexternal). 
Ny benevnelse for SRR i Altinn 3 er RRR. 

*Funksjonalitet og API forventes levert Q1 2023 i Altinn 3.*
- Se beskrivelse av den nye tjenesten [her](/authorization/modules/accessmanagement/)
- se beskrivelse av de nye APIene [her](/authorization/api/)

#### Operasjoner i A2
- AddRights
- DeleteRights
- GetRights

#### Følgende API i A3 erstatter denne tjensten
Beskrivelse kommer senere.



## /RegisterExternal/RegisterERExternal /ArchiveExternal/ServiceOwnerArchiveExternal
Brukes av BRG for hasteoverføring av data om enheter fra Enhetsregisteret. 

*Ny løsning for overføring av data fra Enhetsregisteret forventes levert i Q1 2025 i Altinn 3.*

#### Operasjoner i A2

- SubmitERDataBasic
  


