---
title: API-nøkkel oversikt
linktitle: API-nøkkel
description: "Altinns API-nøkkel ressursoversikt"
toc: false
aliases:
categories: [Referanse]
keywords: [API, REST, API-nøkkel] 
tags: [REST]
---
{{% panel %}}
* Hvis du ønsker å be om en ny API-nøkkel kan du gjøre det [her](https://digdir.apps.altinn.no/digdir/be-om-api-nokkel/).
* For endringer på eksisterende API-nøkler ber vi deg kontakte Brukerstøtte på servicedesk@altinn.no.
{{% /panel %}}

## API-nøkler og API-ressurser 
API-nøkler for Altinn 2 blir avgrenset til deler av APIet som tilsvarer bruksområdene man oppgir når man bestiller en API-nøkkel.
På et mer teknisk nivå sier vi at hver API-nøkkel gir tilgang til en eller flere *API-ressurser*.
En API-ressurs er definert som kombinasjonen av *API-endepunkt kategori* og *operasjon*.

Dette fungerer veldig likt [*Scopes* eller *Rettighetspakker*](/docs/api/rest/kom-i-gang/scopes/) som man bruker i ID-porten og Maskinporten, men for å unngå forveksling prøver vi å unngå å omtale API-ressursene for API-nøkler med disse ordene.


For API-endepunkter på Altinns *Virksomhet API* så krever man at organisasjonsnummeret til den som bestiller API-nøkkelen er det samme som den som autentiserer seg i REST-forespørselen.
Dette kravet er vist som `OrgNrMustMatch` i oversikten under.

### API-endepunkt kategorier
De forskjellige *API-endepunkt kategoriene* for API-nøkler er:
|API-endepunkt kategorier|
| --- |
| LookUp |
| Message |
| Organization |
| UserProfile |
| Authorization |
| ServiceOwner |
| Broker |

### API-nøkkel operasjoner
REST operasjonene (eller CRUD operasjonene) er fordelt på 2 operasjoner for API-nøkler.
|CRUD-operasjoner|API-nøkkel operasjon|
| --- | --- |
| POST, PUT, DELETE | .write |
| GET | .read |

### API-endepunkt-ressurs oversikt
| API-endepunkt | API-ressurs |
| --- | --- |
| **_Metadata API_** ||
| metadata | *ingen* |
| **_Sluttbruker API_** ||
| authentication/authenticatewithpassword | *ingen* |
| authorization/token | `Authorization.read` |
| authorization/RoleDefinitions | `Authorization.read` |
| authorization/Rights | `Authorization.read`, `Authorization.write` |
| authorization/apprights | `Authorization.read`, `Authorization.write` |
| authorization/roles | `Authorization.read`, `Authorization.write` | 
| reportees/ReporteeConversion | `Authorization.read` |
| reportees | `Organization.read` |
| {who}/profile | `UserProfile.read` |
| {who}/lookup | `LookUp.read` |
| organizations | `Organization.read` |
| {who}/messages/{messageId}/attachments | `Message.read`, `Message.write` |
| {who}/messages/* | `Message.read`, `Message.write` |
| {who}/authorization/* | `Authorization.read`, `Authorization.write` |
| {who}/BrokerService | `Broker.read`, `Broker.write` |
| **_Virksomhet API_** ||
| consentRequests | `OrgNrMustMatch` | `Authorization.read`, `Authorization.write` |
| delegationRequests | `Authorization.read`, `Authorization.write`, `OrgNrMustMatch`|
| enterpriseusers | `OrgNrMustMatch`|
| **_Tjenesteeier API_** ||
| serviceowner | `ServiceOwner.read`, `ServiceOwner.write` |
* *ingen* - Det er ingen krav om API-nøkkel på disse endepunktene.
