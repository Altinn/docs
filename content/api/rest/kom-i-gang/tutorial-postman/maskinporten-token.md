---
title: "REST-forespørsler med Maskinporten-token"
linktitle: "Maskinporten-token"
description: "Hvordan bruke Postman til å sende REST-forespørsler med Maskinporten-token mot Altinns Virksomhet-API."
toc: false
aliases:
weight: 128
categories: [Kom-i-gang veiledninger]
keywords: [Postman, API, REST, Maskinporten]
tags: [REST, Postman]
---
{{% panel %}}
I denne leksjonen vil vi følge stegene som er beskrevet i detalj på Maskinportens dokumentasjonssider.
* [Slik bruker du Maskinporten som API-konsument](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument)

Vi har også brukt oppsettet i *Google Service Account Access*-collection fra Postmans dokumentasjonssider.
* [Google Service Account Access](https://www.postman.com/postman/workspace/postman-team-collections/collection/8140651-6b3069c2-2b71-4f7b-936a-e7205767873f?ctx=documentation)
{{% /panel %}}

Leksjonen er delt opp i 3 hoveddeler:
1. Førstegangsoppsett nødvendig for å hente et Maskinporten-token.
   1. Lage et *JSON Web Key (JWK)* nøkkelpar.
   2. Registrere en Maskinporten-integrasjon i Samarbeidsportalen.
   3. Registrere den offentlige delen av nøkkelparet på Maskinporten-integrasjonen.
   4. Importere det forhåndslagde *Maskinporten VER2 collection* og legge til nye *environment*-variabler.
   5. Laste ned `jsrsasign-js` javascript via en REST-forespørsel i Postman.
2. Hente et Maskinporten-token
3. Bruke Maskinporten-token som autorisasjon på en forpørsel mot Altinns Virksomhet-API.

## 1. Førstegangsoppsett for bruk av Maskinporten-token i Postman
Førstegangsoppsettet trenger man bare utføre én gang.
Etter at stegene er utført vil man ha verdiene for følgende *environment*-variabler:
| VARIABLE | TYPE | Forklart i steg: |
| --- | --- | :---: |
| `maskinporten-jwk` | secret | [steg 1.1](#11-lage-et-json-web-key-nøkkelpar) |
| `maskinporten-client_id` | default | [steg 1.2](#12-registrere-en-maskinporten-integrasjon-i-samarbeidsportalen) |
| `maskinporten-scope` | default | [steg 1.2](#12-registrere-en-maskinporten-integrasjon-i-samarbeidsportalen) |
| `jsrsasign-js` | default | [steg 1.5](#15-laste-ned-jsrsasign-js) |

Hvis man allerede har disse verdiene, og den offentlige nøkkelen er registrert på Maskinporten-integrasjonen, så kan man hoppe til [Steg 2] av denne leksjonen.

### 1.1 Lage et JSON Web Key nøkkelpar
**TODO: Powershell-script for å lage JWK.**

Etter å ha kjørt scripetet har man 2 filer:
1. `JWK-<kid>-keypair.json` - som skal brukes til i Postman som en *environment*-variabel.
2. `JWK-<kid>-public-key.json` - som skal registreres i Samarbeidsportalen i [steg 1.3](#13-registrere-den-offentlige-nøkkelen)

### 1.2 Registrere en Maskinporten-integrasjon i Samarbeidsportalen
Logg inn på [Samarbeidsportalen - Integrasjoner VER2](https://selvbetjening-samarbeid-ver2.difi.no/integrations).
Her skal vi opprette en ny integrasjon med følgende oppsett:

| Felt | Verdi/Beskrivelse |
| ---- | ----------------- |
| Difi-tjeneste | `Maskinporten` |
| Scopes | `altinn:enduser altinn:enduser/consentrequests.read` |
| Navn på integrasjonen | f.eks. Maskinporten Postman-integrasjon for Altinn 2 |
| Beskrivelse | ... |
| Tillatte grant types | `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| Klientautentiseringsmetode | `private_key_jwt` |
| Applikasjonstype | `web` |
| Authorization levetid | 0 |
| Access token levetid | 0 |
| Refresh token levetid | 0 |
| Refresh token type | Engangs |

Etter at denne er opprettet skal vi ta vare på
* *Integrasjonens identifikator*
* *Scopes*

### 1.3 Registrere den offentlige nøkkelen
Når du er inne på siden til din Maskinporten-integrasjon i Samarbeidsportalen, så kan man legge til nye nøkler ved å klikke på *Egne public nøkler*.
I dialogen som dukker opp skal man lime inn innholdet av `JWK-<kid>-public-key.json` og trykke på *Legg til*.

Etterpå skal man se denne nøkkelen i *Nøkler* oversikten på siden.
| kid | alg | kty | use |
| --- | --- | --- | --- |
| \<kid\> | RS256 | RSA | sig |

### 1.4 Importere *Maskinporten VER2* collection og lage *environment*-variabler
Vi har laget en *Postman-collection* som inneholder 2 forespørsler vi skal bruke i denne leksjonen.
Denne kan importeres på samme måte som vi gjorde i en tidligere versjon.

* Importer *Maskinporten VER2*-collection fra lenken:
`https://raw.githubusercontent.com/Altinn/postman-examples/master/Collection/Maskinporten%20VER2.postman_collection.json`

Forespørselene skal nå være tilgjengelig slik som på bildet under:
![Maskinporten VER2 collection](/docs/images/guides/postman/Maskinporten-ver2-collection.png "Maskinporten VER2 collection")

For at disse forespørselene skal fungere må vi legge til 3 nye *environment-variabler* i *TT02*-environmentet.

* Legg til følgende variabler og verdier:
| VARIABLE | TYPE | VALUE |
| --- | --- | --- |
| `maskinporten-jwk` | secret | Innholdet fra *JWK-\<kid\>-keypair.json*-filen fra steg 1.1 |
| `maskinporten-client_id` | default | *Integrasjonens identifikator* fra steg 1.2 |
| `maskinporten-scope` | default | *Scopes* fra steg 1.2 |
* Husk å lagre disse endringene.

### 1.5 Laste ned `jsrsasign-js`
Forespørselen som henter et Maskinporten-token er avhengig av et JavaScript som ikke er del av det som er tilgjengelig som standard i Postman.
Dette løser vi ved å bruke en GET-operasjon som henter `jsrsasign-js` og legger det til det aktive *environment*.

1. Velg *Last ned jsrsasign-js til environment* forespørselen i *Maskinporten VER2*-collection.
2. Trykk på *Send*.

Etter å ha fått en respons med status *200 OK* kan man finne en ny *environment*-variabel med navn `jsrsasign-js`.
*CURRENT VALUE* skal være scriptet man mottok som svar på forespørselen.

Dette skjedde fordi forespørselen har følgende JavaScript under *Tests*-panelet:
```javascript
pm.environment.set('jsrsasign-js', responseBody);
```

## 2. Hente Maskinporten-token
Forutsatt at alle stegene i engangsoppsettet var vellykkede så trenger man bare gjøre følgende:

1. Velg *POST Maskinporten Token* forespørselen i *Maskinporten VER*-collection.
2. Klikk på *Send*.

Hvis man mottar et svar med status `200 OK` så skal man se følgende Body:
```json
{
    "access_token": "<JWT>",
    "token_type": "Bearer",
    "expires_in": 3599,
    "scope": "altinn:enduser altinn:enduser/consentrequests.read"
}
```

Det er verdien av `"access_token"` som kalles *Maskinporten-token*.
Verdien blir kopiert inn i det aktive *environment* som variabelen `maskinporten-access_token` som en del av denne forespørselen.

{{% panel %}}
For å forstå hva som skjer automatisk i denne forespørselen kan man se på:
- *Pre-requests scripts*-panelet som inneholder et JavaScriptet som blir kjørt *før* forespørselen sendes. Dette scriptet lager *JSON Web Token* (JWT) som sendes i Body på forespørselen.
- *Body*-panelet som bruker et standardisert format: *x-www-form-urlencoded*. *JWT* som ble laget er lagt i `assertion`-feltet.
- *Tests*-panelet som inneholder et script som lagrer *Maskinporten-tokenet* i *environment*.

Dette er overlatt som en oppgave til leseren.
{{% /panel %}}

## 3. Bruke Maskinporten-token som autorisasjon
For å demonstrere Maskinporten-token autorisasjon mot Altinns *Virksomhet-API* har vi valgt *ConsentRequests*-endepunktet:
1. Velg *GET consentRequests?serviceCode...*-forespørselen under *Altinn/user/ConsentRequests* i *Altinn*-collection.
2. Slå av alle *Query Params* under *Params*-panelet.
    * Disse er ikke nødvendige for forespørselen vi skal gjøre nå.

For å bruke *Maskinporten-token* som autorisasjon på forespørsler i Postman skal man gjøre følgende.
1. I *Authorization*-panelet:
   1. Velg *Type*: *Bearer Token*
   2. Fyll inn `{{maskinporten-access_token}}` i *Token*-feltet.
        * Dette vil legge til en header på forespørselen. `Authorization: Bearer <access_token>`
2. Klikk på *Send*

Hvis *Maskinporten-tokenet* man fikk i svaret på del 2 fortsatt er gyldig skal man motta et svar fra Altinn med status `200 OK`.
I Body vil det da listes ut alle *ConsentRequests* som din organisasjon har.
Det kan godt være at denne listen er tom, men så lenge man får et svar med status `200 OK` så har vi klart å bruke *Maskinporten-token* som autorisasjon.

Hvis svaret derimot har status `401 IDX10223: Lifetime validation failed. The token is expired. ...` så har det gått mer en 120 sekunder siden man hentet Maskinporten tokenet.
Dette er svært sannsynlig hvis det er første gang man følger denne guiden steg for steg, men det løses enkelt ved å:
1. Sende *POST Maskinporten Token* fra del 2 på nytt.
2. Sende *GET consentRequests?serviceCode...*-forespørselen på nytt.

Endepunktene på *Tjenesteeier-* og *Virksomhet-API* aksepterer *Maskinporten-token* direkte, mens man på *Sluttbruker-API* må hente et *Altinn-exchange-token*.
I neste leksjon vil vi vise hvordan man bruker *Maskinporten-token* for å [hente et Altinn-exchange-token](/docs/api/rest/kom-i-gang/tutorial-postman/altinn-exchange-token/).