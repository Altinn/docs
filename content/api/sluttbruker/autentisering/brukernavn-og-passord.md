---
title: Brukernavn og passord
description: Altinns REST-API støtter autentisering med bruk av brukernavn og passord registrert i Altinn.
weight: 10
---


Altinn API støtter autentisering med kun brukernavn(eller personnummer) og passord registrert på brukerens profil i Altinn.
Registrering av brukernavn og passord gjøres i Altinn portalen under Profil, roller og rettigheter -> Avanserte innstillinger ([her](https://www.altinn.no/ui/Profile/?section=3)).

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

Respons fra API

Ved korrekt autentisering vil du få `STATUS 200 OK` som respons fra Altinn REST API

### 2. Hente ut påloggings-token

Etter vellykket pålogging oppretter Altinn et sett med tokens i form av HTTP cookies i Set-Cookie header. 

Når Altinn har opprettet disse token burde din applikasjon hente de ut

Her er eksempler på hvordan du kan hente ut token i HTTP cookie på de vanligste plattformene:

 - **Android**: [CookieManager#getCookie(URL)](http://developer.android.com/reference/android/webkit/CookieManager.html#getCookie(java.lang.String))
 kan brukes til å hente ut cookien satt av Altinn. Detaljert eksempelkode på denne tekikken kan du finne
 [her](https://sites.google.com/site/oauthgoog/oauth-practices/mobile-apps-for-complex-login-systems/samplecode).
 - **iOS**: Din applikasjon kan hente ut cookies satt av Altinn ved å bruke
 [NSHTTPCookieStorage](http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Classes/NSHTTPCookieStorage_Class/Reference/Reference.html).
 Dette blir ofte kalt "cookie jar."

```
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