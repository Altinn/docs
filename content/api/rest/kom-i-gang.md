---
title: Kom i gang med REST API
description: Selv om tilgang til Altinns REST API er åpent, må du registrere din applikasjon og autentisere deg. Dette for at vi skal kunne stoppe misbruk og feilbruk. 
weight: 1
aliases:
- /api/rest-api/kom-i-gang/
---

## Registrer din applikasjon

Send følgende to skjemaer ferdig utfylt i en e-post til [api@altinn.no](mailto:api@altinn.no):

1. [Bestillingsskjema](https://altinnett.brreg.no/PageFiles/11047/Bestillingskjema_API_v2.doc) eller </br>
[Bestillingsskjema for tjenesteeiere](https://altinnett.brreg.no/Global/Altinn%20API/Bestillingskjema_SO_API.doc) (dersom du er tjenesteeier)
2. [Egenerklæringsskjema](https://altinnett.brreg.no/Global/Altinn%20API/Egenerkl%c3%a6ring-API_v2.doc)

Når vi har registrert informasjonen vil vi sende en API-nøkkel som du må benytte i din applikasjon.

## Autentisering

For at tilgang til innholdet i brukerens meldingsboks skal gis, kreves det at du autentiserer deg.

Altinn API støtter tre ulike autentiseringsmetoder. Dersom du trenger tilgang til Altinns REST-api for tjenesteeiere       må du bruke virksomhetssertifikat som autentiseringsmetode.

{{%expandlarge id="autentisering1" header="Autentisering med brukernavn og passord" %}}

## Autentisering med brukernavn og passord

Altinn API støtter autentisering med kun brukernavn (eller personnummer) og passord registrert på brukerens profil i Altinn. Registrering av brukernavn og passord gjøres i Altinn portalen under [Profil, roller og rettigheter](https://www.altinn.no/ui/Profile/?section=3).

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

Altinn API benytter ID-porten til autentisering av brukere. ID-porten er en felles infrastruktur for å logge inn til offentlige tjenester.
I ID-porten er det lagt til rette for at innbyggerene selv kan velge hvilken elektronisk ID de ønsker å benytte.
Det er mulig å logge inn med elektronisk ID fra MinID, BankID, Buypass og Commfides.

ID-porten sine autentiseringsløsinger bruker OpenSSO/OpenAM som fødereringsplattform. Fødereringen baserer seg på SAML2 OASIS-standarden.

### Single Sign-On (SSO)

SSO vil si at du sømløst gjenbruker autentiseringen din. Med ID-porten/MinID betyr det i praksis at dersom du har logget inn på en tjeneste hos for eksempel NAV,
vil det ikke være nødvendig å gjøre en ny pålogging for å få tilgang til Altinn, eller andre tjenester som benytter ID-porten/MinID.
I utgangspunktet er alle tjenester som benytter ID-porten/MinID en del av SSO.

Vi vil nå forklare hvordan du kan implementere støtte for autentisering ved bruk av ID-porten i din applikasjon.

#### 1. Innebygd nettleser

For at din applikasjon skal kunne benytte web-baserte autentiserings protokoller som SAML til autentisering, må du la brukerne logge inn med en innebygd nettleser.

Å bygge inn en nettleser i din applikasjon er enkelt på de vanligste plattformene:

- **Android**: bruk [WebView](http://developer.android.com/guide/webapps/webview.html).
- **iOS**: bruk [UIWebView](http://developer.apple.com/library/ios/#DOCUMENTATION/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/DisplayWebContent/DisplayWebContent.html)

Du kan peke nettleseren til starturl for Altinn API: https://www.altinn.no/api/my/messages/

Da vil brukeren automatisk bli videreført til ID-portens påloggingsside med responsivt design.
På denne siden vil brukeren få valget mellom å logge inn med MinID eller BankID.
BankID har egne applikasjoner for pålogging (iOS og Android) og disse vil automatisk åpnes og lukkes ved autentisering.

#### 2. Hente ut påloggings-token

Etter vellykket pålogging i ID-porten, vil brukeren bli ført tilbake til Altinn og Altinn oppretter et sett med tokens i form av HTTP cookies i Set-Cookie header.

Når Altinn har opprettet disse token burde din applikasjon hente de ut og deretter lukke den innebygde nettleseren.

Her er eksempler på hvordan du kan hente ut token i HTTP cookie på de vanligste plattformene:

- **Android**: [CookieManager#getCookie(URL)](http://developer.android.com/reference/android/webkit/CookieManager.html#getCookie(java.lang.String)) kan brukes
 til å hente ut cookier satt av Altinn. Detaljert eksempelkode på denne teknikken kan du finne her.
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

#### 3. Videreføre påloggings-token i kall til Altinn API

Tokenet `.ASPXAUTH` legges i HTTP header som "Cookie" i videre på kall til Altinn API:

```HTTP
Cookie: .ASPXAUTH=2AF7F203...., etc...
```

API nøkkelen må også legges ved i HTTP header slik:

```HTTP

ApiKey: myKey
```

API nøkkel får du etter [registrering av din applikasjon](../../kom-i-gang/#registrer-din-applikasjon).

#### 4. Autentisering ved integrasjon i andre portaler

Det er mulig å integrere innhold i brukernes meldingsboks i Altinn i eksterne portaler ved å bruke Altinn API.
Dette krever at den eksterne portalen også fødererer mot ID-porten og er medlem av samme Circle of Trust som Altinn.

Altinn API benytter også [CORS](http://enable-cors.org/) for ekstra sikkerhet ved kryssdomene forespørsler.
For å integrere brukerens meldingsboks i Altinn i en ekstern nettside må dermed domenet til denne nettsiden ligge i Altinns CORS whitelist.
Det er derfor nødvendig å [registrere nettsiden](../../kom-i-gang/#registrer-din-applikasjon) som skal integrere Altinns meldingsboks.
Bruk av Altinn API i eksterne nettsider er bare tilgjengelig for offentlige etater/institusjoner som er tjenesteeiere i Altinn.

For at kall mot Altinns API skal fungere fra eksterne sider må brukeren ha en sesjon både hos IDporten og hos Altinn. Ved innlogging med IDporten må man derfor benytte følgende redirect-løsning
for å sikre at brukeren også har sesjon i Altinn. Om man logger brukeren inn med IDporten og kaller Altinn uten å bruke redirect, vil IDporten fjerne CORS-headerne som følger med,
slik at Altinn ikke lenger har mulighet for å verifisere domenet mot de som er registrert hos oss.

Per nå fungerer redirect bare med IDportens mekanismer, ikke med Altinn-innlogging.

##### Flyten for redirect-løsningen for å få sesjon i Altinn:

---

**1.** Ekstern portal kontakter https://www.altinn.no/Pages/ExternalAuthentication/Redirect.aspx?returnUrl=https://www.minportal.no/portal&userToken=sha256-hash

"sha256-hash" er hash av fødselsnummer på autentisert bruker på ekstern portal.

UserToken er valgfri og brukes til å sikre at det ikke allerede eksisterer en sesjon i Altinn som tilhører en annen bruker enn den som er autentisert på ekstern portal. 

---

**2.** Brukeren blir sendt til Altinn

**2-1a. _Med_ userToken angitt:**

Dersom brukeren allerede er logget inn i ID-porten opprettes .ASPXAUTH cookie som inneholder sesjonsopplysninger nødvendige for REST-kall.
Om det finnes en sesjon i Altinn for en annen bruker, vil denne logges ut og ny sesjon opprettes for brukeren i userToken. 

**2-1b.** Dersom bruker ikke er logget inn sendes bruker til innloggingsside og må logge inn.  
**2-1c.** Dersom samme bruker er logget inn i Altinn fra før valideres sesjon.

**2-2a. _Uten_ userToken:**

Dersom bruker allerede er logget inn i ID-porten opprettes `.ASPXAUTH` cookie som inneholder sesjonsopplysninger nødvendige for REST-kall. 

**2-2b.** Dersom bruker ikke er logget inn sendes bruker til innloggingsside
**2-2c.** OBS! Dersom bruker velger Altinn-innlogging vil man bli sendt tilbake til idporten for å autentisere seg med idporten.  

---

**3**

**a.** Bruker logger inn og det opprettes .ASPXAUTH-cookie som inneholder sesjonsopplysningene man trenger for ytterligere REST-kall     
**b.** Dersom bruker ikke logger inn, blir brukeren stående på innloggingsside

---

**4.** Altinn sjekker om verdien i returnUrl (https://www.minportal.no/portal i dette eksempelet) er gyldig og ligger inne i CORS whitelist

**a.** Dersom domenet er gyldig gjennomføres redirect til den eksterne adressen  
**b.** Dersom domenet ikke er gyldig sendes bruker til «Min Meldingsboks» i Altinn Adressen eksterne portaler må bruke blir da:

```

https://www.altinn.no/Pages/ExternalAuthentication/Redirect.aspx?returnUrl=URL_SOM_BRUKER_SKAL_SENDES_TILBAKE_TIL_ETTER_INNLOGGING
```
{{% /expandlarge%}}

{{%expandlarge id="autentisering3" header="Autentisering med virksomhetssertifikat" %}}

## Autentisering med virksomhetssertifikat

For å kunne tilby en autentiseringsmekanisme uten personlig bruker/pin-koder, tilbyr Altinns REST-api støtte for bruk av virksomhetssertifikat.
Autentiseringen gir sikkerhetsnivå 3 og kan brukes mot alle API-ets ressurser på vegne av organisasjonen sertifikatet tilhører
og andre som organisasjonen har rettigheter på vegne av.

Dersom man utvikler en ekstern portalløsning der brukerne er innlogget med f.eks. ID-porten, kan IKKE sertifikatet brukes til å sende inn på vegne av disse.
Virksomhetssertifikatet er en maskin-til-maskin-integrasjon på vegne av innehaverorganisasjon og andre den har rettigheter for, og må ikke forveksles med en mulighet til backend-integrasjon mot Altinn på vegne av brukere på ekstern portal.

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
