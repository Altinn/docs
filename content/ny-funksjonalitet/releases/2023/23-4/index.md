---
title: 23.4
description: Mindre forbedringer og feilrettinger
weight: 170
type: releasenote
releasenote_info: Release 23.4. Produksjonssatt 19. april
---
**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Portal

### Endret grensesnitt mot ID-Porten - OIDC

Endret grensesnitt mot ID-Porten - OIDC Grensesnittet mot ID-Porten er endret fra protokollen SAML til OIDC.

### Endre plasering og layout knapper API-delegering

Det er gjort noen endringer i UI for API delegering mellom release 23.3 og 23.4. Denne endringen vil ikke være synlig i portalen før den blir aktivert.

![Skjermbilde som viser tilgang API](tilgang_API_1.png " ")

![Skjermbilde som viser tilgang API2](tilgang_API_2.png " ")

### Panel ikon for stort i mobil view

Ikon i panel for API-delegering er endret slik at det er en media query som endrer på stil basert på bredden til siden.

## Endringer i REST

### Slå av DelegationRequest API for sluttbrukersystem

Sluttbruker REST API kall er Feature toglet av og API Help er oppdatert med "Removed"

![Skjermbilde som viser delegation request API](Delegation_Request_api.png " ")

## Feilrettinger

### Engelsk tekst i panel for API-administrasjon

Endring av tekst fra "API your business accesses have delegated to other businesses"

til "API accesses your business have delegated to other businesses"
