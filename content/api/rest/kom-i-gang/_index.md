---
title: Kom i gang med REST API
linktitle: Kom i gang
description: Selv om tilgang til Altinns REST API er åpent, må du registrere din applikasjon og autentisere deg. Dette for at vi skal kunne stoppe misbruk og feilbruk. 
weight: 1
aliases:
- /api/rest-api/kom-i-gang/
---

## Registrer din applikasjon

Dette gjøres litt ulikt avhengig om du representerer en tjenesteeier eller ikke.

### Er du allerede tjenesteeier i Altinn?
Da bestiller du tilgang fra [tjenesteeier sitt dashboard](https://www.altinndigital.no/oversikt/) på Altinn/digitalisering (krever innlogging).
Her velger du "Support" >> "Ny sak" >> "Bestilling" >> "Tilganger" >> "REST API".
Har du ikke tilgang til dashboard kan du be om dette ved å sende en henvendelse til [tjenesteeier@altinn.no](tjenesteeier@altinn.no).
Er du innleid konsulent må tilganger bestilles av den etaten/kommunen du jobber for.

### Er du ikke tjenesteeier i Altinn?
Da fyller du ut [denne bestillingen](https://digdir.apps.altinn.no/digdir/be-om-api-nokkel/) og sender inn (krever innlogging i Altinn)

Når vi har registrert informasjonen vil vi sende en API-nøkkel som du må benytte i din applikasjon.

## Autentisering

For at tilgang til innholdet i brukerens meldingsboks skal gis, kreves det at du autentiserer deg.

Altinn API støtter fire ulike autentiseringsmetoder.
Dersom du trenger tilgang til Altinns REST-api for tjenesteeiere må du bruke Maskinporten eller virksomhetssertifikat som autentiseringsmetode.

{{%expandlarge id="autentisering1" header="Autentisering med brukernavn og passord" %}}

## Autentisering med brukernavn og passord

Altinn API støtter autentisering med kun brukernavn (eller personnummer) og passord registrert på brukerens profil i Altinn.
Registrering av brukernavn og passord gjøres i Altinn portalen under [Profil, roller og rettigheter](https://www.altinn.no/ui/Profile/?section=3).

Autentisering med brukernavn og passord gir tilgang til å hente meldinger og sende inn skjema som krever sikkerhetsnivå 1.

### 1. Utfør autentisering

Send følgende POST-forespørsel mot APIet:

```HTTP
POST https://www.altinn.no/api/authentication/authenticatewithpassword HTTP/1.1
Content-Type: application/hal+json
ApiKey: myKey

{
    "UserName": "MyUsername",
    "UserPassword": "MyPassword"
}
```

Ved korrekt autentisering vil du få status `200 OK` som respons fra Altinn REST API

### 2. Hente ut påloggings-token

Etter vellykket pålogging oppretter Altinn et sett med tokens i form av HTTP cookies i Set-Cookie header. 

Når Altinn har opprettet disse token burde din applikasjon hente de ut

Her er eksempler på hvordan du kan hente ut token i HTTP cookie på de vanligste plattformene:

- **Android**: [CookieManager#getCookie(URL)](http://developer.android.com/reference/android/webkit/CookieManager.html#getCookie(java.lang.String))
 kan brukes til å hente ut cookien satt av Altinn. Detaljert eksempelkode på denne teknikken kan du finne
 [her](https://sites.google.com/site/oauthgoog/oauth-practices/mobile-apps-for-complex-login-systems/samplecode).
- **iOS**: Din applikasjon kan hente ut cookies satt av Altinn ved å bruke
 [NSHTTPCookieStorage](http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Classes/NSHTTPCookieStorage_Class/Reference/Reference.html).
 Dette blir ofte kalt "cookie jar."

```objectivec
NSHTTPCookie *cookie;
NSHTTPCookieStorage *cookieJar = [NSHTTPCookieStorage sharedHTTPCookieStorage];

for (cookie in [cookieJar cookies]) {
  NSLog(@"%@", cookie);
}
```

Detaljert eksempelkode på denne teknikken for iOS finner du [her](https://sites.google.com/site/oauthgoog/oauth-practices/mobile-apps-for-complex-login-systems/samplecode).

### 3. Videreføre påloggings-token i kall til Altinn API

Tokenet `.ASPXAUTH` legges i HTTP header som "Cookie" i videre på kall til Altinn API:

```HTTP
Cookie: .ASPXAUTH=2AF7F203...
```

API nøkkelen må også legges ved i HTTP header slik:

```HTTP
ApiKey: myKey
```

API nøkkel får du etter [registrering av din applikasjon](../../kom-i-gang/#registrer-din-applikasjon).


{{% /expandlarge%}}


{{%expandlarge id="autentisering2" header="Autentisering med ID-porten" %}}

## Autentisering med ID-porten

Altinn tilbyr OIDC/OAuth2-basert autentisering for sluttbrukersystemer via ID-porten for endepunkter som krever person-autentisering. 
Se [ID-portens konsument-guide](https://samarbeid.difi.no/felleslosninger/id-porten/ta-i-bruk-id-porten/1-signer-bruksvilkar) for mer
informasjon om hvordan din organisasjon kan ta dette i bruk. Autentisering gir nivå 3 eller 4.

Altinn definerer en rekke scopes som kan brukes for å begrense tilgangen en gitt klient kan få.
Se [liste over scopes](scopes#sluttbruker-api) for mer informasjon om hvordan du kan provisjonere din klient.

*Altinn vil fortsette å støtte [legacy autentisering via ID-porten og cookies](idporten-legacy/) en tid fremover, men dette mønsteret 
anbefales ikke for nye integrasjoner.*

ID-porten støtter ulike flyter avhengig av implementasjon og hvordan klienten er konfigurert. Se [integrasjonsguiden](https://difi.github.io/felleslosninger/oidc_guide_idporten.html) 
for utfyllende informasjon om hvordan du integrerer med ID-porten. 

En typisk autorisasjonskode-flyt er som følger:

### 1. Send sluttbruker til autorisasjonsendepunkt

```
GET https://oidc-ver2.difi.no/idporten-oidc-provider/authorize?
  scope=altinn:instances.meta&
  acr_values=Level3&
  client_id=min_klient_id&
  redirect_uri=https://eksempel.no/response& 
  response_type=code
```

Merk at andre felter kan være påkrevd å oppgi avhengig av din implementasjon/klient. Se [integrasjonsguiden](https://difi.github.io/felleslosninger/oidc_guide_idporten.html) 
for mer informasjon.

### 2. Motta autorisasjonskode på oppgitt endepunkt

Etter bruker har autentisert seg (hvis ikke allerede innlogget), og har gitt tilgang din klient tilgang til scopet, blir han/hun videresendt til 
endepunktet oppgitt i `redirect_uri` med en autorisasjonskode, f.eks. `https://eksempel.no/response?code=1JzjKYcPh4M....FMT0=`.

Denne autorisasjonskode benyttes for å hente ut access_token fra ID-porten i neste steg.

### 3. Hent ut access_token

Avhengig av klient type vil prosessen har noen forskjeller (se [integrasjonsguiden for mer detaljer](https://difi.github.io/felleslosninger/oidc_guide_idporten.html#utstedelse-av-token-fra-token-endepunktet)), 
men i hovedsak handler det om å sende  autorisasjonskoden mottatt i forrige trinn til ID-portens token-endepunkt, som da vil utstede et access_token. Responsen her vil se ut 
noe ala dette:

```
{
    "access_token": "eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFp...YIcXH0AaRpxffAx7vJj6xzuIJ4C0DxnPCfRRA",
    "token_type": "Bearer",
    "expires_in": 3599,
    "refresh_token": "qcCtId5...r0igT2nI",
    "scope": "altinn:instances.meta"
}
```

### 4. Hent ut informasjon fra Altinn

Tokenet mottatt i forrige trinn benyttes mot Altinns API sammen med API-nøkkel, f.eks.:

```
GET /api/my/messagebox HTTP/1.1
Host: https://tt02.altinn.no
Accept: application/hal+json
ApiKey: min-api-nøkkel
Authorization: Bearer eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFp...YIcXH0AaRpxffAx7vJj6xzuIJ4C0DxnPCfRRA
```
som da returnerer data for brukeren tokenet representerer.


{{% /expandlarge%}}

{{%expandlarge id="autentisering3" header="Autentisering med Maskinporten" %}}

## Autentisering med Maskinporten

For API-er som krever autentisering av virksomhet støtter Altinn bruk av access tokens utstedt av Maskinporten.
Se [Maskinportens konsument-guide](https://samarbeid.difi.no/felleslosninger/maskinporten/ta-i-bruk-maskinporten/konsument-0) for mer 
informasjon om hvordan din organisasjon kan ta dette i bruk. Autentiseringen gir sikkerhetsnivå 3.

{{% notice warning  %}}
Maskinporten-autentisering kan foreløpig ikke benyttes sammen med virksomhetsbrukere. 
{{% /notice %}}

Altinn definerer en rekke scopes som kan brukes for å begrense tilgangen en gitt klient kan få.
Se [liste over scopes](scopes#tjenesteeier-api) for mer informasjon om hvordan du kan provisjonere din klient.

### 1. Hent token fra Maskinporten

Token hentes fra Maskinporten via et [JWT Bearer Grant](https://difi.github.io/felleslosninger/maskinporten_protocol_jwtgrant.html), som da signeres med eget virksomhetssertifikat. 

Eksempel på payload for bearer grant mot testmiljø (TT02) som forventer tokens fra VER2-miljøet av Maskinporten:

```json
{
  "aud": "https://ver2.maskinporten.no/",
  "resource": "https://tt02.altinn.no/",
  "scope": "altinn:serviceowner",
  "iss": "806e1e80-e3a7-4a73-980e-f92ba1c2bf86",
  "exp": 1592896775,
  "iat": 1592896655,
  "jti": "bebeb0da-fef3-4b67-a0fc-b08d0b68fddd"
}
```

Eksempel på payload for bearer grant mot prodmiljø:

```json
{
  "aud": "https://maskinporten.no/",
  "resource": "https://www.altinn.no/",
  "scope": "altinn:serviceowner",
  "iss": "806e1e80-e3a7-4a73-980e-f92ba1c2bf86",
  "exp": 1592896775,
  "iat": 1592896655,
  "jti": "bebeb0da-fef3-4b67-a0fc-b08d0b68fddd"
}
```

Du kan bruke verktøyet [MaskinportenTokenGenerator](https://github.com/Altinn/MaskinportenTokenGenerator)
for å teste generering av bearer grants og for å få ut access tokens fra Maskinporten.


### 2. Legg ved tokenet i requesten

Tokenet legges i `Authorization`-headeren i requesten av type `Bearer`. Eksempel:

```http
GET /api/serviceowner/reportees?subject=... HTTP/1.1
ApiKey: din-api-nøkkel-her
Authorization: Bearer eyJraWQiO...
Accept: application/hal+json
```

{{% /expandlarge%}}

{{%expandlarge id="autentisering4" header="Autentisering med virksomhetssertifikat" %}}
## Autentisering med virksomhetssertifikat

I tillegg til Maskinporten-tokens støtter Altinns REST-api bruk av virksomhetssertifikat som TLS klientsertifikater.
Autentiseringen gir sikkerhetsnivå 3 og kan brukes mot alle API-ets ressurser på vegne av organisasjonen sertifikatet tilhører
og andre som organisasjonen har rettigheter på vegne av gjennom en virksomhetsbruker.

Noen API-er kan benyttes direkte uten først å logge inn med virksomhetsbruker, og krever kun at virksomhetssertifikatet benyttes samt at `?ForceEIAuthentication` oppgis som query-parameter.

Dersom man utvikler en ekstern portalløsning der brukerne er innlogget med f.eks. ID-porten, kan IKKE sertifikatet brukes til å sende inn på vegne av disse. Virksomhetssertifikatet er en maskin-til-maskin-integrasjon på vegne av innehaverorganisasjon og andre den har rettigheter for, og må ikke forveksles med en mulighet til backend-integrasjon mot Altinn på vegne av brukere på ekstern portal.


### 1. Sette opp virksomhetsbruker

Etter at man har installert sertifikat fra utsteder, må man knytte sertifikatet opp mot virksomheten i Altinn ved å opprette en såkalt virksomhetsbruker. Dette er nærmere beskrevet [her](https://www.altinn.no/hjelp/innlogging/alternativ-innlogging-i-altinn/virksomhetssertifikat/).

### 2. Tildele roller og rettigheter

Når man logger inn med en virksomhetsbruker første gang, har ikke denne tilstrekkelig med roller og rettigheter for en organisasjon til
å kunne verken se aktive skjema eller sende inn nye før roller/rettigheter har blitt delegert.

### 3. Autentisere seg mot Altinn API

Send følgende POST-request mot APIet med brukernavn/passord for virksomhetsbruker opprettet i 1.

```HTTP
POST https://www.altinn.no/api/authentication/authenticatewithpassword?ForceEIAuthentication HTTP/1.1
Host: www.altinn.no
Content-Type: application/hal+json
ApiKey: myKey
{
    "UserName": "MyUsername",
    "UserPassword": "MyPassword"
}
```

Dersom requesten genereres fra ekstern webside, vil brukeren få beskjed om å velge sertifikat av nettleser (trigges av parameteren `?ForceEIAuthentication`).

Ved programmatisk bruk fra f.eks. Java eller .NET legger man ved sertifikatet i `HttpRequest.ClientCertificates`.  
Eksempelkode ligger [her](https://github.com/Altinn/ec-client-dotnet).

Når man autentiserer seg mot REST-apiet ved hjelp av sertifikat, bruker man hele sertifikatet (eks .p12) - ikke .cer som man eksporterer
for å opprette virksomhetsbruker i portal.

{{% /expandlarge%}}


## Du er klar! 

Når du har fullført registrering og autentisering er du klar til å kommunisere med Altinn fra web-applikasjonen din! Finn tilgjengelige REST-APIer i venstremenyen. 
Her er en [Postman collection](https://github.com/Altinn/postman-examples) som inneholder eksempler på REST-spørringene som ligger under https://altinn.no/api/help og https://altinn.no/api/serviceowner/help.


{{% children description="true" %}}
