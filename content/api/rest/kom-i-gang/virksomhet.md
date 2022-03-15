---
title: Innlogging av virksomhet
description: Altinns API-er kan også benyttes av virksomheter uten å autentisere en person ved hjelp av Maskinporten og virksomhetsbrukere
weight: 20
toc: true
categories: [Kom-i-gang veiledninger]
keywords: [virksomhetsbruker, autentisering, API, REST, integrasjon, Maskinporten, virksomhetssertifikat, feil]
tags: [REST, Maskinporten, Autentisering]
---

## Introduksjon

For noen typer integrasjoner er det uhensiktsmessig å kreve at en person autentiserer seg og lar systemet bruke Altinn med tilgangene personen innehar.
Fagsystemer som gjerne har sin egen innloggingsmekanisme internt i virksomheten, eller automatiserte systemer uten brukerinteraksjon kan opprette og benytte seg av en eller flere **virksomhetsbrukere** for autentisering og autorisasjon.
En virksomhetsbruker er som en vanlig sluttbruker i den forstand at den kan tildeles roller og rettigheter i organisasjonen den tilhører. 

<!--more-->

{{% notice warning  %}}
Selv om de fleste API-ene i Altinn kan benyttes av virksomhetsbrukere, er ikke alle tjenester i Altinn åpnet for bruk av virksomhetsbrukere eller sluttbrukeresystemer i det hele tatt. Dette er opp til hver etat å vurdere for hver av sine tjenester.
{{% /notice %}}

En virksomhetsbruker vil kunne bruke de fleste av Altinns REST API-er som normalt krever en autentisert person, og identifiseres med et brukernavn og passord i tillegg til at virksomheten selv autentiseres med enten et virksomhetssertifikat eller et Maskinporten-token.

Enkelte API-er har ikke krav om autentisert bruker, men kan benyttes med kun virksomhetssertifikat eller Maskinporten-token. 

## Autentisering med virksomhetsbruker og Maskinporten

{{% expiring-notice 2021-08-26 %}}
Dette er funksjonalitet som vil komme i [versjon 21.8](../../../../ny-funksjonalitet/prodsetting/) av Altinn
{{% /expiring-notice %}}

Virksomhetsbrukere gjennom Maskinporten lar deg bruke de fleste API-er i Altinn, både de som krever en bruker og de som kun krever virksomhetsautentisering. En Maskinporten-klient settes opp med ønskede scopes, og det hentes ut et token fra Maskinporten som igjen må veksles hos Altinn sammen med virksomhetsbrukerens brukernavn og passord. Dette gir ut et beriket token som kan brukes mot Altinns API-er.

### Forutsetninger for bruk

* Organisasjonen din har registrert systemet og mottatt en [API-nøkkel fra Altinn](../). 
* Det er opprettet en Maskinporten-klient som er provisjonert med [ønskede scopes](../scopes). Les mer om hvordan din organisasjon kan [ta i bruk Maskinporten](https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97).
* Det er [opprettet en virksomhetsbruker](../virksomhetsbrukere) gjennom portalen eller API som du har et brukernavn og passord for.
* Virksomhetsbrukeren er blitt gitt roller og rettigheter i virksomheten din av en tilgangsstyrer/hovedadministrator

### 1. Hent token fra Maskinporten

Token hentes fra Maskinporten via et [JWT Bearer Grant](https://docs.digdir.no/maskinporten_protocol_jwtgrant.html), som da signeres med eget virksomhetssertifikat. 

Eksempel på payload for bearer grant mot testmiljø (TT02) som forventer tokens fra VER2-miljøet av Maskinporten (merk at kommentarene er kun for veiledning og må fjernes før evt bruk):

```json
{
  /* Maskinporten-miljø som forespørsel sendes til */
  "aud": "https://ver2.maskinporten.no/",

  /* Altinn-miljø som skal benyttes */
  "resource": "https://tt02.altinn.no/",

  /* Ønskede scopes, må være provisjonert på klient */
  "scope": "altinn:instances.meta altinn:rolesandrights",

  /* Klient-ID for Maskinporten-klient opprettet i samarbeidsportalen */
  "iss": "806e1e80-e3a7-4a73-980e-f92ba1c2bf86",  

  /* Når JWT-grantet utløper. Påvirker ikke levetid på mottatt token. */
  "exp": 1592896775, 

  /* Når JWT-grantet ble lagd */
  "iat": 1592896655, 

  /* Unik identifikator for grantet */
  "jti": "bebeb0da-fef3-4b67-a0fc-b08d0b68fddd" 
}
```

Eksempel på payload for bearer grant mot prodmiljø:

```json
{
  "aud": "https://maskinporten.no/",
  "resource": "https://www.altinn.no/",
  "scope": "altinn:instances.meta altinn:rolesandrights",
  "iss": "806e1e80-e3a7-4a73-980e-f92ba1c2bf86",
  "exp": 1592896775,
  "iat": 1592896655,
  "jti": "bebeb0da-fef3-4b67-a0fc-b08d0b68fddd"
}
```

Du kan bruke verktøyet [MaskinportenTokenGenerator](https://github.com/Altinn/MaskinportenTokenGenerator)
for å teste generering av bearer grants og for å få ut access tokens fra Maskinporten.

### 2. Veksle inn token og motta beriket virksomhetsbrukertoken

Tokenet mottatt fra Maskinporten kan ikke brukes direkte mot Altinn for en virksomhetsbruker. Tokenet må veksles inn mot et nytt token som er beriket med informasjon om virksomhetsbrukeren. Dette gjøres mot Altinns tokenutvekslingspunkt, hvor samtidig virksomhetsbrukerens brukernavn og passord oppgis.

* Token utstedt fraMaskinporten legges inn som `Authorization`-header en `Bearer`-prefix. 
* Brukernavn/passord for virksomhetsbrukeren legges inn i headeren `X-Altinn-EnterpriseUser-Authentication` med verdi tilsvarende *BASE64(brukernavn + ":" + passord)* hvor *BASE64* her er en funksjon som [Base64-enkoder](https://en.wikipedia.org/wiki/Base64) brukernavnet og passordet, tilsvarende måten brukt i Basic HTTP-autentisering som beskrevet i [RFC761](https://tools.ietf.org/html/rfc7617#section-2)

Man gjør så en GET-request mot ønsket miljø og får tilbake et gyldig Altinn3-token dersom det opprinnelige tokenet er gyldig, og oppgitt brukernavn og passord er gyldig.

```http
GET /authentication/api/v1/exchange/maskinporten HTTP/1.1
Host: platform.altinn.no
Authorization: Bearer {maskinporten-token}
X-Altinn-EnterpriseUser-Authentication: {base64-enkodet brukernavn og passord}
Accept: application/hal+json
```

Response:
```http
"{altinn-beriket-token}"
```

* Endepunkt for utveksling av Maskinporten-token mot TT02-miljø:  
https://platform.tt02.altinn.no/authentication/api/v1/exchange/maskinporten

* Endepunkt for utveksling av Maskinporten-token mot prod-miljø:  
https://platform.altinn.no/authentication/api/v1/exchange/maskinporten


### 3. Hent ut informasjon fra Altinn

Tokenet mottatt i forrige trinn benyttes mot Altinns API sammen med API-nøkkel, f.eks.:

```http
GET /api/my/messagebox HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: {min-api-nøkkel}
Authorization: Bearer {altinn-beriket-token}
```

som da returnerer data for organisasjonen virksomhetsbrukeren tilhører.

## Autentisering med virksomhetsbruker og virksomhetssertifikat

Altinns REST-API støtter bruk av virksomhetssertifikat som TLS klientsertifikater for to-veis TLS-kommunikasjon kombinert med et brukernavn og passord for virksomhetsbrukeren. Dette belager seg på at man først autentiserer seg for å få en cookie som brukes i påfølgende requester.

### Forutsetninger for bruk

* Organisasjonen din har registrert systemet og mottatt en [API-nøkkel fra Altinn](../). 
* Organisasjonen din har et virksomhetssertifikat utstedt fra en gyldig norsk utsteder.
* Det er [opprettet en virksomhetsbruker](../virksomhetsbrukere) gjennom portalen eller API som du har et brukernavn og passord for.
* Virksomhetsbrukeren er blitt gitt roller og rettigheter i virksomheten din av en tilgangsstyrer/hovedadministrator

### 1. Autentisere seg mot Altinn API

Forespørselen som gjøres mot Altinn må gjøres med klientsertifikatet oppgitt i forespørselen. Hvordan dette gjøres avhenger av programmeringsspråket og rammeverk som benyttes. Se [her for eksempler for bruk ASP.NET 5](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/certauth?view=aspnetcore-5.0#implement-an-httpclient-using-a-certificate-and-the-httpclienthandler). 

```HTTP
POST https://www.altinn.no/api/authentication/authenticatewithpassword?ForceEIAuthentication HTTP/1.1
Host: www.altinn.no
Content-Type: application/hal+json
ApiKey: {min-api-nøkkel}
{
    "UserName": "{virksomhetsbrukerens brukernavn}",
    "UserPassword": "{virksomhetsbrukerens passord}"
}

```
Ved korrekt autentisering vil du få status `200 OK` som respons fra Altinn REST API. Responsen vil også inneholde en `Set-Cookie`-header som inneholder autentiseringscookien `.ASPXAUTH`som må benyttes i påfølgende kall. Øvrige cookies som returneres kan ignoreres.

### 2. Hent ut informasjon fra Altinn

Den mottate cookien `.ASPXAUTH` sendes som en normal `Cookie`-header i videre på kall til Altinn API. Merk at API-nøkkel også alltid må oppgis:

```HTTP
GET /api/my/messagebox HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: {min-api-nøkkel}
Cookie: .ASPXAUTH=2AF7F203...
```


## Autentisering med kun Maskinporten

For API-er som kun krever autentisering av virksomhet støtter Altinn bruk av access tokens utstedt av Maskinporten. 

{{% notice warning  %}}
Merk at det kun er et fåtall av API-ene som kan benyttes med Maskinporten alene - altså kun med virksomhetsautentisering uten en bruker med tilganger i Altinn. Tjenesteeier-API er ett av disse. Se [API-scopes](../scopes) for en oversikt.
{{% /notice %}}

### Forutsetninger for bruk

* Organisasjonen din har registrert systemet og mottatt en [API-nøkkel fra Altinn](../). 
* Det er opprettet en Maskinporten-klient som er provisjonert med [ønskede scopes](../scopes). Les mer om hvordan din organisasjon kan [ta i bruk Maskinporten](https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97).

### 1. Hent token fra Maskinporten

Token hentes fra Maskinporten via et [JWT Bearer Grant](https://docs.digdir.no/maskinporten_protocol_jwtgrant.html), som da signeres med eget virksomhetssertifikat. 

Eksempel på payload for bearer grant mot testmiljø (TT02) som forventer tokens fra VER2-miljøet av Maskinporten (merk at kommentarene er kun for veiledning og må fjernes før evt bruk):

```json
{
  /* Maskinporten-miljø som forespørsel sendes til */
  "aud": "https://ver2.maskinporten.no/",

  /* Altinn-miljø som skal benyttes */
  "resource": "https://tt02.altinn.no/",

  /* Ønskede scopes, må være provisjonert på klient */
  "scope": "altinn:serviceowner/reportees",

  /* Klient-ID for Maskinporten-klient opprettet i samarbeidsportalen */
  "iss": "806e1e80-e3a7-4a73-980e-f92ba1c2bf86",  

  /* Når JWT-grantet utløper. Påvirker ikke levetid på mottatt token. */
  "exp": 1592896775, 

  /* Når JWT-grantet ble lagd */
  "iat": 1592896655, 

  /* Unik identifikator for grantet */
  "jti": "bebeb0da-fef3-4b67-a0fc-b08d0b68fddd" 
}
```

Eksempel på payload for bearer grant mot prodmiljø:

```json
{
  "aud": "https://maskinporten.no/",
  "resource": "https://www.altinn.no/",
  "scope": "altinn:serviceowner/reportees",
  "iss": "806e1e80-e3a7-4a73-980e-f92ba1c2bf86",
  "exp": 1592896775,
  "iat": 1592896655,
  "jti": "bebeb0da-fef3-4b67-a0fc-b08d0b68fddd"
}
```

Du kan bruke verktøyet [MaskinportenTokenGenerator](https://github.com/Altinn/MaskinportenTokenGenerator)
for å teste generering av bearer grants og for å få ut access tokens fra Maskinporten.


### 2. Hent ut informasjon fra Altinn

Tokenet legges i `Authorization`-headeren i requesten av type `Bearer`. Eksempel:

```http
GET /api/serviceowner/reportees?subject=... HTTP/1.1
Host: www.altinn.no
ApiKey: {din-api-nøkkel-her}
Authorization: Bearer {maskinporten-token}
Accept: application/hal+json
```

## Autentisering med kun virksomhetssertifikat

Altinns REST-API støtter bruk av virksomhetssertifikat som TLS klientsertifikater for to-veis TLS-kommunikasjon. Dette belager seg på at man først autentiserer seg for å få en cookie som brukes i påfølgende requester.

{{% notice warning  %}}
Merk at det kun er et fåtall av API-ene som kan benyttes med virksomhetssertifikat alene - altså kun med virksomhetsautentisering uten en bruker med tilganger i Altinn. Tjenesteeier-API er ett av disse. Se [API-scopes](../scopes) for en oversikt.
{{% /notice %}}

### Forutsetninger

* Organisasjonen din har registrert systemet og mottatt en [API-nøkkel fra Altinn](../). 
* Organisasjonen din har et virksomhetssertifikat utstedt fra en gyldig norsk utsteder.


### 1. Hent ut informasjon fra Altinn

Forespørselen som gjøres mot Altinn må gjøres med klientsertifikatet oppgitt i forespørselen. Hvordan dette gjøres avhenger av programmeringsspråket og rammeverk som benyttes. Se [her for eksempler for bruk ASP.NET 5](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/certauth?view=aspnetcore-5.0#implement-an-httpclient-using-a-certificate-and-the-httpclienthandler). 

{{% notice warning  %}}
Alle kall mot Altinn API som skal benytte to-veis TLS krever at queryparameteret `ForceEIAuthentication` oppgis i URLen som kalles
{{% /notice %}}

Den mottate cookien `.ASPXAUTH` sendes som en normal `Cookie`-header i videre på kall til Altinn API. Merk at API-nøkkel også alltid må oppgis:

```HTTP
GET /api/serviceowner/reportees?subject=...&ForceEIAuthentication HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: {min-api-nøkkel}

```
