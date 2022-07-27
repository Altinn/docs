---
title: "REST-forespørsler med Altinn-exchange-token"
linktitle: "Altinn-exchange-token"
description: "Hvordan bruke Postman til å sende REST-forespørsler med Altinn-Exchange-token mot Altinns Sluttbruker-API."
toc: false
aliases:
weight: 256
categories: [Kom-i-gang veiledninger]
keywords: [Postman, API, REST, Maskinporten]
tags: [REST, Postman]
---

## Forarbeid
Denne leksjonen bygger på forrige leksjon om hvordan bruke [Maskinporten-token](/docs/api/rest/kom-i-gang/tutorial-postman/maskinporten-token/).
Det er nødvendig å kalle [Maskinporten-token-endepunktet](/docs/api/rest/kom-i-gang/tutorial-postman/maskinporten-token/#2-hente-maskinporten-token) siden dette skal brukes som autorisasjon på Altinn-exchange-token-endepunktet.
Oppsettet på denne siden forventer å finne et Maskinporten-token i det aktive *environment* på variabelen `maskinporten-access_token`.

Man må også ha brukernavn og passord til en virksomhetsbruker for den organisasjonen man representerer.
Etter å ha [opprettet virksomhetsbrukeren](/docs/api/rest/kom-i-gang/virksomhetsbrukere) så må man legge til to nye *environment*-variabler, `altinn-username` og `altinn-password`, med verdiene for denne brukeren.

## Bytte inn Maskinporten-token med Altinn-exchange-token
Et *Altinn-exchange-token* er en Maskinporten-token JWT som har blitt beriket med informasjon om en Altinn-bruker.
For å få utlevert et gyldig *Altinn-exchange-token* må man derfor sende inn et gyldig *Maskinporten-token* og en header med brukernavn og passord for en virksomhetsbruker.

### Lag en ny forespørsel
Exchange-endepunktet er ikke inkludert i Collection for Altinn 2, siden dette er en del av API for Altinn 3. Vi skal derfor lage en ny forespørsel i Postman.

1. Klikk på *New*
2. Velg *HTTP Request*
3. Fyll inn følgende URL i feltet *Enter request URL*: `https://platform.tt02.altinn.no/authentication/api/v1/exchange/maskinporten`
4. Klikk på *Save*. Dette vil åpne en *SAVE REQUEST*-dialog.
   1. Du kan velge å gi denne forespørselen et kortere navn som f.eks. `Altinn Exchange Token`
   2. Velg en *Collection* for å lagre forespørselen i.
   3. Klikk på *Save*.

Denne forespørselen krever 2 autorisasjons-headere:
1. `Authorization:` `Bearer <Maskinporten-token>`
2. `X-Altinn-EnterpriseUser-Authentication:` `<base64-enkodet brukernavn:passord>`

### Maskinporten-token
* `Authorization: Bearer ...` blir automatisk satt hvis man setter opp *Authorization*-panelet for en Postman Request med følgende:
| Authorization | |
| --- | --- |
| **Type** *Bearer-token* | Token `{{maskinporten-access_token}}` |

Dette er samme oppsett som i forrige leksjon.

### X-Altinn-EnterpriseUser-Authentication
* For å konvertere brukernavnet og passordet til riktig format kan man lage et *Pre-request Script*:
```js
var basicAuth = pm.environment.get("altinn-username") + ':' + pm.environment.get("altinn-password");
var base64Encoded = btoa(basicAuth);
pm.environment.set('altinn-enterprise_user_authentication', base64Encoded);
```
Dette vil sørge for at *environment*-variabelen `altinn-enterprise_user_authentication` kan brukes i *Headers*-panelet.

* Sett opp *Headers* som følgende:
| **KEY** | **VALUE** |
| --- | --- |
| X-Altinn-EnterpriseUser-Authentication | `{{altinn-enterprise_user_authentication}}` |
| Accept | `application/json` |

### Kopiere Altinn-exchange-token til en *environment*-variabel
For at *Altinn-exchange-token* skal kunne brukes av senere forespørsler, på samme måte som vi gjorde med *Maskinporten-token*, kan vi sette opp et JavaScript i *Tests*-panelet.
Dette lager en *environment*-variabel med navn `altinn-token`.

* Legg inn følgende linje med JavaScript i *Tests*-panelet:
```js
pm.environment.set('altinn-token', pm.response.json());
```

### Send forespørselen
* Klikk på *Send* for å sende forespørselen.
 
Et svar med status `200 OK` vil ha en body som inneholder en JWT som er beriket med informasjon om virksomhetsbrukeren.
Tokenet vil kunne brukes på samme måte som Maskinporten-token, men kan autorisere kall mot Sluttbruker-API.

## Bruke Altinn-exchange-token som autorisasjon
For å demonstrere *Altinn-exchange-token* mot et endepunkt på Sluttbruker-API, skal vi bruke samme forespørsel som i [ID-porten-token leksjonen](/docs/api/kom-i-gang/tutorial-postman/idporten-requests) - `GET /api/my/profile`.

1. Velg `GET my/profile`-forespørselen fra *Altinn/user/Profile*-mappen i *Altinn*-collection.
2. I *Authorization*-panelet:
   1. Velg *Type*: *Bearer Token*
   2. Fyll inn *Token*: `{{altinn-token}}`
3. Sjekk at følgende er satt i *Headers*-panelet:
   1. *ApiKey*: `{{ApiKey}}`
   2. *Accept*: `application/hal+json`
4. Klikk på *Send*

Hvis alt har gått bra skal man motta et svar med status `200 OK` som inneholder profilinformasjon til virksomhetsbrukeren.