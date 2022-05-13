---
title: Scopes for begrensning av tilganger
linktitle: API-scopes
description: Scopes benyttes av Altinn for å begrense tilganger for OAuth2-klienter benyttet ifm innlogginger i ID-porten eller Maskinporten.
toc: true
categories: [Kom-i-gang veiledninger]
keywords: [REST, Maskinporten, autentisering, autorisasjon, scope, delegation-scheme, API]
tags: [REST, Maskinporten, Autentisering, Autorisasjon]
---

## Scopes for begrensning av tilgang

Alle API-forespørsler til Altinn 2.0 krever en [API-nøkkel](https://digdir.apps.altinn.no/digdir/be-om-api-nokkel/) som vil være begrenset til en eller flere områder av API-et. 

I tillegg kan du velge å provisjonere klienter i ID-porten/Maskinporten med et eller flere scopes, som vil ytterligere begrense hvilke operasjoner klienten kan utføre. Merk at scopes er kun en mekanisme for _begrensning_ av eksisterende rettigheter; hvis din organisasjon eller API-nøkkel ikke har tilgang til et gitt API vil ikke scope på en klient gi deg tilgang.

Hvis du ikke ønsker å begrense klienten sin tilgang, men kun vil forholde deg til API-nøkkelens tilganger, kan de generelle scopene som `altinn:serviceowner` eller `altinn:enduser` benyttes, men vi anbefaler av sikkerhets- og personvernsårsaker å kun gi klienten de spesifikke scopene den trenger.

## Tjenesteeier-API

Alle disse scopene er virksomhetsautentiserte, og krever at din organisasjon er tjenesteeier i Altinn.
Du må også ha en API-nøkkel som er knyttet til serviceowner-ressursen. Kun tjenesteeiere i Altinn vil kunne provisjonere klienter med disse scopene. 

| Scope                                        | Begrenses til API-et /api/serviceowner/... |
| -------------------------------------------- | ------------------------------------------ |
| altinn:serviceowner                          | (Ingen begrensninger)                      |
| altinn:serviceowner/organizations            | organizations                              |
| altinn:serviceowner/reportees                | reportees                                  |
| altinn:serviceowner/rolesandrights           | rights, roles                              |
| altinn:serviceowner/events                   | events                                     |
| altinn:serviceowner/srr.read                 | srr (GET)                                  |
| altinn:serviceowner/srr.write                | srr (POST, PUT, DELETE)                    |
| altinn:serviceowner/consents                 | consents                                   |
| altinn:serviceowner/delegationrequests.read  | delegationrequests (GET)                   |
| altinn:serviceowner/delegationrequests.write | delegationrequests (POST, DELETE)          |
| altinn:serviceowner/notifications.read       | notifications (GET)                        |

<p style="font-size: 74%; margin-top: -2em;">
Hvis .read/.write-suffiks ikke er oppgitt, tilbys bare GET og scopet er å regne som begrenset til leseoperasjoner.

/api/serviceowner/roledefinitions krever ikke noe spesielt scope.
</p>

Ta kontakt med [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no?subject=Tilgang%20til%20tjenesteierscope%20i%20Maskinporten)
hvis din organisasjon ikke har fått tilgang til scopet du trenger i Maskinporten.

## Sluttbruker-API

For tilgang til disse scopene i produksjon må din organisasjon gis tilgang til de scopene som behøves. Dette er i tillegg til at en API-nøkkel med 
tilstrekkelige rettigheter må være utstedt din organisasjon. For tilgang til disse scopene, ta kontakt med servicedesk@altinn.no.

I testmiljøet TT02 (som benytter seg av ID/Maskinportens VER2-miljø) er alle scope [åpne for alle](https://docs.digdir.no/oidc_api_admin_maskinporten.html#whitelisting-av-tilgang) og
kan tas i bruk av alle med tilgang til å opprette klienter i ID/Maskinporten.

De fleste sluttbruker-scopes krever en autentisert bruker - altså en autentisert person gjennom en personinnlogging, eller en virksomhetsbruker gjennom en virksomhetsinnlogging. Noen kan benyttes med kun virksomhetsinnlogging, altså uten en person/bruker, se under for oversikt.

| Scope                                         | Begrenses til /api/...       
| --------------------------------------------- | ----------------------------- 
| altinn:enduser¹                               |Generelt scope, ingen begrensninger utover API-key
| altinn:endusernoconsent¹                      |Generelt scope forbeholdt tjenesteeiere som har legacy-implementasjoner. Krever ikke eksplisitt samtykke fra sluttbruker.
| altinn:consenttokens.read²                    |Leseoperasjoner (GET) på /api/authorization/token
| altinn:consenttokens.write²                   |Skriveoperasjoner (POST, DELETE) på /api/authorization/token
| altinn:rolesandrights.read                    |Leseoperasjoner (GET) på /api/{who}/roles og /api/{who}/authorization/rights
| altinn:rolesandrights.write                   |Skriveoperasjoner (DELETE) på /api/{who}/roles og /api/{who}/authorization/rights
| altinn:reportees                              |/api/reportees. Inkluderer også POST /reportees/reporteeconversion
| altinn:profiles.read                          |Leseoperasjoner (GET) på /api/{org}/profile og /api/my/profile
| altinn:profiles.write                         |Skriveoperasjoner (POST,DELETE) på /api/{org}/profile
| altinn:lookup                                 |/api/{who}/lookup)
| altinn:instances.meta                         |Kun GET /api/{who}/messages, altså kun liste, ikke enkeltelementer
| altinn:instances.read                         |Leseoperasjoner (GET) på /api/{who}/messages/{messageId}, /api/{who}/messages/attachments, /api/{who}/messages/forms
| altinn:instances.write                        |Skriveoperasjoner (POST,PUT,DELETE) på /api/{who}/messages, /api/{who}/messages/attachments, /api/{who}/messages/forms
| altinn:delegations.read                       |Leseoperasjoner (GET) på /api/{who}/authorization/delegations
| altinn:delegations.write                      |Skriveoperasjoner (POST,DELETE) på /api/{who}/authorization/delegations
| altinn:brokerservice.read                     |Leseoperasjoner (GET) på /api/{who}/brokerservice
| altinn:brokerservice.write                    |Skriveoperasjoner (POST) på /api/{who}/brokerservice
| altinn:delegationrequests.read²               |Leseoperasjoner (GET) på /api/delegationrequest 
| altinn:delegationrequests.write²              |Skriveoperasjoner (POST,DELETE) på /api/delegationrequest
| altinn:consentrequests.read²³                 |Leseoperasjoner (GET) på /api/consentrequest 
| altinn:consentrequests.write²³                |Skriveoperasjoner (POST,DELETE) på /api/consentrequest
| altinn:roledefinitions.read                   |Leseoperasjoner (GET) på /api/{who}/authorization/RoleDefinitions
| altinn:roledefinitions.write                  |Skriveoperasjoner (POST,PUT,DELETE) på /api/{who}/authorization/RoleDefinitions
| altinn:enterpriseusers.read²                  |Leseoperasjoner (GET) på /api/enterpriseusers
| altinn:enterpriseusers.write²                 |Leseoperasjoner (POST,DELETE) på /api/enterpriseusers

<p style="font-size: 74%; margin-top: -2em;">
¹ Dette scopet er kun tilgjengelig for eksisterende portalløsninger som i dag benytter legacy-autentisering (cookie-basert) og som av spesielle årsaker ikke har mulighet til OIDC/OAuth2 med brukerinteraksjon. Nye integrasjoner kan benytte altinn:enduser, som gir samme tilganger.<br>
² Krever virksomhetsinnlogging, kan brukes uten virksomhetsbruker.<br>
³ Også tilgjengelig som altinn:enduser/consentrequest.* (deprecated)<br>
Hvis .read/.write-suffiks ikke er oppgitt, tilbys bare GET og scopet er å regne som begrenset til leseoperasjoner.
</p>

`/api/authentication` og `/api/metadata` krever ikke autentisering og dermed ikke noe spesielt scope. 

