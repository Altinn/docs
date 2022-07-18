---
title: "REST forespørsler med ID-porten token"
linktitle: "ID-porten"
description: "Hvordan bruke Postman til å utføre REST forespørsler med ID-porten token mot Altinns Sluttbruker-API."
toc: false
aliases:
weight: 64
categories: [Kom-i-gang veiledninger]
keywords: [Postman, API, REST]
tags: [REST, Postman, ID-porten]
---
## Bakgrunn
I denne leksjonen vil vi følge stegene som er beskrevet i detalj på ID-portens dokumentasjonssider.
1. [Registrering av klienter](https://docs.digdir.no/docs/idporten/oidc/oidc_func_clientreg)
2. [Integrasjonsguide - Autentisering i ID-porten over OpenID Connect](https://docs.digdir.no/docs/idporten/oidc/oidc_guide_idporten.html)

Vi anbefaler sterkt at man bruker disse ressursene hvis man trenger mer informasjon og at man gjennomgår disse etter at leksjonen er fullført for å forankre kunnskapen i OAuth2 og OpenID Connect sammenheng.

## Introduksjon
Leksjonen er delt opp i følgende steg:
1. Registrere en API-klient i ID-portens Samarbeidsportal.
    * Denne klienten skal bare registreres en gang. Hvis man allerede har en klient (`client_id` og `client_secret`) kan man hoppe over dette steget.
2. Sette opp OAuth 2.0 autorisasjon i *Authorization* panelet i Postman for ID-porten.
    * Dette verktøyet forenkler flyten i OAuth 2.0 autentiseringsprotokollen.
3. Bruke *Authorization* verktøyet i Postman til å be om et ID-porten token.
    * Dette vil åpne en nettleser hvor man skal autentisere seg med ID-porten som en testbruker.
6. Bruke `access_token` til å utføre en forespørsel mot `https://tt02.altinn.no/api/my/profile`.

## Registrere en API-klient i Samarbeidsportalen
Logg inn på [Samarbeidsportalen - Integrasjoner VER2](https://selvbetjening-samarbeid-ver2.difi.no/integrations).
Her skal vi opprette en ny integrasjon og skrive inn følgende informasjon:

| Felt | Verdi/Beskrivelse |
| ---- | ----------------- |
| Difi-tjeneste | `API-klient` |
| Scopes | `altinn:enduser` |
| Navn på integrasjonen |
| Beskrivelse | ... |
| Tillatte grant types | `authorization_code` |
| Klientautentiseringsmetode | `client_secret_basic` |
| Applikasjonstype | `web` |
| Gyldig(e) redirect uri-er | `https://oauth.pstmn.io/v1/callback` |
| Gyldig(e) post logout redirect uri-er | `https://login.idporten.dev/logout` |
| Tilbake-uri | `https://idporten-dummy.digdir.no/authorize/response/callback` |
| Authorization levetid | 0 |
| Access token levetid | 0 |
| Refresh token levetid | 0 |
| Refresh token type | Engangs |
* Verdiene som er brukt her er tilpasset denne leksjonen. Spesielt *Scopes* og de forskjellige *URI-ene* som er oppgitt må man forvente å endre til andre verdier hvis man skal kalle andre API-endepunkt eller bruke en annen klient.
* Under Scopes må man spesifisere et eller flere scopes som avgrenser tilgangen til gitte rettighetspakker. For Altinn sine API er det definert følgende [Scopes](/docs/api/rest/kom-i-gang/scopes/).
* Levetiden til et *Access token* blir satt til 1 time som standard, når man setter verdien til 0 i klientregistreringen.

Resultatet av en vellykket registrering vil vise en kvittering:

> Opprettelse av integrasjonen var vellykket:
> 
>     client_name: Postman API-klient for Altinn 2
>     client_id: <GUID for client_id>
>     client_secret: <GUID for client_secret>
> 
> (client_secret vises kun en gang, ta godt vare på den. Ved tap av eller mistanke om misbruk av client_secret, må det genereres en ny.)

Ta godt vare på verdien for *client_secret*! Den og *client_id* skal vi bruke i neste steg hvor vi setter opp OAuth 2.0 verktøyet i Postman.

## Oppsett av OAuth 2.0 autorisasjon i Postman

1. Legg til 3 nye variabler i Postman Environment, som forklart i [en tidligere leksjon](/docs/api/rest/kom-i-gang/tutorial-postman/api-collection-environment/#legge-inn-egne-verdier-i-environments).
   | VARIALBLE | TYPE| VALUE-kolonnene |
   | ---- | ---- | ---- | ---- |
   | idporten-oidc | default | https://oidc-ver2.difi.no/idporten-oidc-provider |
   | idporten-client_id | default | \<GUID for client_id\> |
   | idporten-client_secret | secret | \<GUID for client_secret\> |
2. Velg *Get my/profile* forespørselen i *Altinn/user/Profile*. Naviger til *Authorization* panelet og velg *OAuth 2.0* som type.
![OAuth 2.0](/docs/images/guides/postman/Postman-OAuth2-select.png "Velg OAuth 2.0")
3. Sett *Add authorization data to* til *Request Headers*.
4. Under *Configure New Token* skal vi sette inn følgende *Configuration Options*:
   | Feltnavn | Verdi |
   | -------- | ----- |
   | Token Name | f.eks ID-porten VER2 token |
   | Grant Type | `Authorization Code` |
   | Callback URL | *Authorize using browser* |
   | Auth URL | `{{idporten-oidc}}/authorize` |
   | Access Token URL | `{{idporten-oidc}}/token` |
   | Client ID | `{{idporten-client_id}}` |
   | Client Secret | `{{idporten-client_secret}}` |
   | Scope | `altinn:enduser` |
   | State | |
   | Client Authentication | *Send as Basic Auth header* |

## Hente ID-porten token

1. Klikk på *Get New Access Token* nederst under *Configure New Token*.
    * Dette vil åpne en nettleser og vise påloggingssiden til ID-porten.
2. Under *Velg Elektronisk ID* velg *Testid*.
    * Testid er påloggingsmetoden som er enklest å bruke for alle syntetiske testpersoner som eksisterer i Tenor - Syntetisk Folkeregister.
3. Skriv inn Personidentifikator for en testperson og klikk på *Autentiser*
    * Hvis det er første gang en testperson blir benyttet blir man spurt om å knytte en epostadresse til brukeren.
4. Velg *Godta* på dialogen *En applikasjon ber om tilgang*.
    * Første gang man går igjennom denne dialogen så må man akseptere at Redirect-lenkene åpnes i Postman.
5. Når man blir sendt tilbake til Postman vises *Manage Access Tokens*-menyen. Klikk på *Use Token* for å aktivere tokenet som har blitt utstedt.

Nå skal tokenet vises under *Current Token*.
![OAuth 2.0 setup](/docs/images/guides/postman/Postman-OAuth2-setup.png "OAuth 2.0 oppsett")

## Bruke ID-porten token i en forespørsel

Når man valgt et token i *Authorization* panelet så vil det legges til en en ny header på forespørselen: `Authorization: Bearer <access_token>`.
Denne headeren vises ikke som standard, men hvis man klikker på *Show auto-generated headers* så vises den øverst slik det vises på bildet under.

![OAuth 2.0 headers](/docs/images/guides/postman/Postman-authorization-headers.png "Authorization headers")

1. Før man kan sende denne forespørselen må man sørge for at `{{ApiKey}}` environment variabelen inneholder en API-nøkkel som gir tilgang til `Organization.read`.
    * Se [Nødvendig forarbeid](/docs/api/rest/kom-i-gang/tutorial-postman/forarbeid).
2. Klikk *Send*

Nå skal man få tilbake et svar med status *200 OK* som inneholder profilen til testbrukeren.