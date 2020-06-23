---
title: OAuth2 scopes
weight: 1
---

## Scopes for begrensning av tilgang av OAuth2-klienter

{{% notice warning  %}}
Merk at per release 20.7 benyttes Maskinporten utelukkende for autentisering (altså ren erstatning for virksomhetssertifikater), og scopes blir ikke hensyntatt før i en senere release (i løpet av 2020). Listen med scopes er uansett dokumentert, og vi anbefaler at alle provisjonerer korrekte scopes allerede nå.
{{% /notice %}}


Alle API-forespørsler til Altinn 2.0 krever en [API-nøkkel](https://digdir.apps.altinn.no/digdir/be-om-api-nokkel/) som vil være begrenset til en eller flere områder av API-et. 

I tillegg kan du velge å provisjonere klienter i ID-porten/Maskinporten med et eller flere scopes, som vil ytterligere begrense hvilke operasjoner klienten kan utføre. Merk at scopes er kun en mekanisme for _begrensning_ av eksisterende rettigheter; hvis din organisasjon eller API-nøkkel ikke har tilgang til et gitt API vil ikke scope på en klient gi deg tilgang. Hvis du ikke ønsker å begrense klienten sin tilgang, men kun vil forholde deg til API-nøkkelens tilganger, kan et generelt scope som `altinn:serviceowner` benyttes.

### Tjenesteeier-API

Alle disse scopene er virksomhetsautentiserte, og krever at din organisasjon er tjenesteeier i Altinn. Du må også ha en API-nøkkel som er knyttet til `serviceowner`-ressursen. Kun tjenesteeiere i Altinn vil kunne provisjonere klienter med disse scopene. Ta kontakt med tjenesteeier@altinn.no hvis din organisasjon ikke har fått tilgang til scopet du trenger i Maskinporten.

| Scope                                          | Begrenses til                                      |
|------------------------------------------------|----------------------------------------------------|
|`altinn:serviceowner`                             |Generelt scope, ingen begrensninger utover API-key
|`altinn:serviceowner/organizations`               |`/api/serviceowner/organizations`
|`altinn:serviceowner/reportees`                   |`/api/serviceowner/reportees`
|`altinn:serviceowner/rolesandrights`              |`/api/serviceowner/rights` og `/api/serviceowner/roles`
|`altinn:serviceowner/events`                      |`/api/serviceowner/events`
|`altinn:serviceowner/srr.read`                    |Leseoperasjoner `(GET)` på `/api/serviceowner/srr`
|`altinn:serviceowner/srr.write`                   |Skriveoperasjoner `(POST,PUT,DELETE)` på `/api/serviceowner/srr`
|`altinn:serviceowner/consents`                    |`/api/serviceowner/consents`
|`altinn:serviceowner/delegationrequests.read`     |Leseoperasjoner `(GET)` på `/api/serviceowner/delegationrequests`
|`altinn:serviceowner/delegationrequests.write`    |Skriveoperasjoner `(POST,DELETE)` på `/api/serviceowner/delegationrequests`

`/api/serviceowner/roledefinitions` krever ikke noe spesielt scope.

### Sluttbruker-API

{{% notice warning  %}}
Denne listen viser foreløpig kun API-er som er virksomhetsautentiserte, og krever et token utstedt av Maskinporten. Ytterligere scopes for andre deler av sluttbruker-API-et som krever personautentisering vil komme i senere release.
{{% /notice %}}

Alle disse scopene er [åpne for alle](https://difi.github.io/felleslosninger/oidc_api_admin_maskinporten.html#whitelisting-av-tilgang), og kan provisjoneres av alle integrasjoner i ID-porten/Maskinporten.

De fleste altinn:enduser-scopes krever personautentisering gjennom ID-porten og en eksplisitt bekreftelse fra sluttbrukeren, mens noen er virksomhetsautentiserte og krever token fra Maskinporten.

| Scope                                          | Begrenses til                                      |
|------------------------------------------------|----------------------------------------------------|
|`altinn:enduser/consentrequest.read`              |Leseoperasjoner `(GET)` på `/api/consentrequest.` Krever Maskinporten-token.
|`altinn:enduser/consentrequest.write`             |Leseoperasjoner `(POST)` på `/api/consentrequest.` Krever Maskinporten-token.

<!--
`/api/authentication,` `/api/roledefinitions,` `/api/metadata` krever ikke noe spesielt scope
`/api/organizations` er deprecated og krever ikke noe spesielt scope.

|`altinn:enduser`                                  |Generelt scope, ingen begrensninger utover API-key
|`altinn:enduser/tokens.read`                      |Leseoperasjoner `(GET)` på `/api/token`
|`altinn:enduser/tokens.write`                     |Leseoperasjoner `(POST, DELETE)` på `/api/token`
|`altinn:enduser/rolesandrights.read`              |Leseoperasjoner `(GET)` på `/api/{who}/roles` og `/api/{who}/rights`
|`altinn:enduser/rolesandrights.write`             |Skriveoperasjoner (DELETE) på `/api/{who}/roles` og `/api/{who}/rights`
|`altinn:enduser/reportees`                        |`/api/reportees.` Inkluderer også POST /reportees/reporteeconversion
|`altinn:enduser/profiles.read`                    |Leseoperasjoner `(GET)` på `/api/{org}/profile` og `/api/my/profile`
|`altinn:enduser/profiles.write`                   |Skriveoperasjoner `(POST,DELETE)` på `/api/{org}/profile`
|`altinn:enduser/lookup`                           |`/api/{who}/lookup)`
|`altinn:enduser/messages`                         |kun GET `/api/{who}/messages,` altså kun liste, ikke enkeltelementer
|`altinn:enduser/instances.read`                   |Leseoperasjoner `(GET)` på `/api/{who}/messages/{messageId},` `/api/{who}/attachments,` `/api/{who}/forms`
|`altinn:enduser/instances.write`                  |Skriveoperasjoner `(POST,PUT,DELETE)` på `/api/{who}/messages,` `/api/{who}/attachments,` `/api/{who}/forms`
|`altinn:enduser/delegations.read`                 |Leseoperasjoner `(GET)` på `/api/{who}/delegations`
|`altinn:enduser/delegations.write`                |Skriveoperasjoner `(POST,DELETE)` på `/api/{who}/delegations`
|`altinn:enduser/brokerservice`                    |`/api/brokerservice`
-->
