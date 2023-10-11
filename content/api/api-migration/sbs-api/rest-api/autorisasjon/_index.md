---
title: Migreringsstrategi for sluttbrukersystem-API
linktitle: Sluttbrukersystem-API
description: Siden er under konstruksjon - Her finner du foreløpig plan for hva som skjer med autorisasjons API for Sluttbrukersystem i overgangen mellom Altinn 2 og Altinn 3. Planen vil bli endret underveis. 
toc: true
weight: 100
tags: [plan, migration]

---

# Disse sidene er under konstruksjon

## Token
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## RoleDefinitions
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## Rights
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## Roles
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## Reportee
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## Delegations
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## Authentication
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## Metadata
[MetadataAPI](https://altinn.github.io/docs/api/rest/metadata/)
### Migreringsstrategi
Metadata apiet i Altinn 2 viser hvilke tjenester som er tilgjengelig i løsnignen og metadata om disse. 
I Altinn 3 vil teneste-begrepet byttes ut med begrepet "ressurser" og ressursene vil finnes i et [ressursregister](https://docs.altinn.studio/authorization/modules/resourceregistry/)
#### Hvilke konsekvenser har dette for konsumenter
Dette API vil være tilgjenelig hele tiden, men etterhvert som tjenester flytter fra Altinn 2 til Altinn 3 så må man ta i bruk tilsvarende men nye API i Altinn 3 
### Tidsplan
Nytt API for Ressurs
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste
Følgene API finnes i Altinn 3 for å slå opp metadata om tjenester som er migrert
- Test: https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/search
- Prod: https://platform.altinn.no/resourceregistry/api/v1/resource/search 

## Organizations
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## ConsentRequest
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## DelegationRequest
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste

## EnterpriseUsers
Lenke til dokumentasjon av eksisterende tjeneste
### Migreringsstrategi
#### Hvilke konsekvenser har dette for konsumenter
### Tidsplan
### Tjenester og API i Altinn 3 som erstatter eksisterende API-tjeneste
