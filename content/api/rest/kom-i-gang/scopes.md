---
title: OAuth2 scopes for begrensning av tilganger
linktitle: OAuth2 scopes
description: Scopes benyttes av Altinn for å begrense tilganger for OAuth2-klienter.
toc: true
---

## Scopes for begrensning av tilgang

Alle API-forespørsler til Altinn 2.0 krever en [API-nøkkel](https://digdir.apps.altinn.no/digdir/be-om-api-nokkel/) som vil være begrenset til en eller flere områder av API-et. 

I tillegg kan du velge å provisjonere klienter i ID-porten/Maskinporten med et eller flere scopes, som vil ytterligere begrense hvilke operasjoner klienten kan utføre.
Merk at scopes er kun en mekanisme for _begrensning_ av eksisterende rettigheter; hvis din organisasjon eller API-nøkkel
ikke har tilgang til et gitt API vil ikke scope på en klient gi deg tilgang.

Hvis du ikke ønsker å begrense klienten sin tilgang, men kun vil forholde deg til API-nøkkelens tilganger, kan et generelt scope som altinn:serviceowner benyttes.

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

I testmiljøet TT02 (som benytter seg av ID/Maskinportens VER2-miljø) er alle scope [åpne for alle](https://difi.github.io/felleslosninger/oidc_api_admin_maskinporten.html#whitelisting-av-tilgang) og
kan tas i bruk av alle med tilgang til å opprette klienter i ID/Maskinporten.

De fleste sluttbruker-scopes krever personautentisering gjennom ID-porten og en eksplisitt bekreftelse fra sluttbrukeren,
mens noen er virksomhetsautentiserte og krever token fra Maskinporten.

| Scope                                         | Begrenses til /api/...       
| --------------------------------------------- | ----------------------------- 
| altinn:enduser                                |Generelt scope, ingen begrensninger utover API-key
| altinn:endusernoconsent                       |Generelt scope forbeholdt tjenesteeiere som har legacy-implementasjoner. Krever ikke eksplisitt samtykke fra sluttbruker.
| altinn:consenttokens.read¹                    |Leseoperasjoner (GET) på /api/token
| altinn:consenttokens.write¹                   |Leseoperasjoner (POST, DELETE) på /api/token
| altinn:rolesandrights.read                    |Leseoperasjoner (GET) på /api/{who}/roles og /api/{who}/rights
| altinn:rolesandrights.write                   |Skriveoperasjoner (DELETE) på /api/{who}/roles og /api/{who}/rights
| altinn:reportees                              |/api/reportees. Inkluderer også POST /reportees/reporteeconversion
| altinn:profiles.read                          |Leseoperasjoner (GET) på /api/{org}/profile og /api/my/profile
| altinn:profiles.write                         |Skriveoperasjoner (POST,DELETE) på /api/{org}/profile
| altinn:lookup                                 |/api/{who}/lookup)
| altinn:instances.meta                         |Kun GET /api/{who}/messages, altså kun liste, ikke enkeltelementer
| altinn:instances.read                         |Leseoperasjoner (GET) på /api/{who}/messages/{messageId}, /api/{who}/attachments, /api/{who}/forms
| altinn:instances.write                        |Skriveoperasjoner (POST,PUT,DELETE) på /api/{who}/messages, /api/{who}/attachments, /api/{who}/forms
| altinn:delegations.read                       |Leseoperasjoner (GET) på /api/{who}/delegations
| altinn:delegations.write                      |Skriveoperasjoner (POST,DELETE) på /api/{who}/delegations
| altinn:brokerservice                          |Leseoperasjoner (GET) på /api/brokerservice
| altinn:consentrequests.read¹²                 |Leseoperasjoner (GET) på /api/consentrequest 
| altinn:consentrequests.write¹²                |Skriveoperasjoner (POST,DELETE) på /api/consentrequest
| altinn:roledefinitions.read                   |Leseoperasjoner (GET) på /api/{who}/authorization/RoleDefinitions
| altinn:roledefinitions.write                  |Skriveoperasjoner (POST,PUT,DELETE) på /api/{who}/authorization/RoleDefinitions

<p style="font-size: 74%; margin-top: -2em;">
¹ Krever Maskinporten-token.<br>
² Også tilgjengelig som altinn:enduser/consentrequest.* (deprecated)<br>
Hvis .read/.write-suffiks ikke er oppgitt, tilbys bare GET og scopet er å regne som begrenset til leseoperasjoner.
</p>

`/api/authentication` og `/api/metadata` krever ikke autentisering og dermed ikke noe spesielt scope. 

