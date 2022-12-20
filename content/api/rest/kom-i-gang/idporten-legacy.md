---
title: Autentisering med ID-porten (legacy)
hidden: true
aliases:
  - /api/rest/kom-i-gang/idporten-legacy/
categories: [Kom-i-gang veiledninger]
keywords: [REST, ID-porten]
tags: [REST]
---

{{% notice warning  %}}
Denne metoden for autentisering er ikke lengre anbefalt da støtte for dette i nettlesere holder på å fases ut. For nye integrasjoner anbefales bruk av OIDC/OAuth2 via ID-porten.
Støtte for denne måten å autentisere på vil bli faset ut i forbindelse med migrering av Altinn Autorisasjon fra Altinn 2 til Altinn 3 plattformen. Dette skjer i følge planen høsten 2023. 
{{% /notice %}}

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





