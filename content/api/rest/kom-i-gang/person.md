---
title: Innlogging av person
description: Altinn API har mekanismer for å autentisere integrasjoner ("sluttbrukersystemer") som krever en personlig sluttbruker med roller rettigheter i Altinn
weight: 10
toc: true
categories: [Kom-i-gang veiledninger]
keywords: [virksomhetsbruker, autentisering, API, REST, integrasjon, ID-porten, virksomhetssertifikat]
tags: [REST, ID-porten, Autentisering]
---

## Introduksjon

De fleste av Altinns API-er som er offentlig tilgjengelige krever at systemet som integreres med Altinn autentiseres som en sluttbruker, som regel en person.
Systemet vil da kunne opptre som sluttbrukeren, og utføre tjenester på vegne av sluttbrukeren selv og andre personer eller organisasjoner som sluttbrukeren har roller og rettigheter hos - f.eks. sende inn skjemaer, hente meldinger fra det offentlig, administrere tilganger i virksomheter etc.

<!--more-->

{{% notice warning  %}}
For virksomheter som ønsker å benytte sluttbruker-API-er uten å autentisere en person, kan det brukes en virksomhetsinnlogging av en [virksomhetsbruker](../virksomhet)
{{% /notice %}}

Altinn har tradisjonelt støttet ulike mekanismer for å gjennomføre denne autentiseringen. I dag anbefales alle integrasjoner som krever en personlig sluttbruker å benytte seg av ID-porten og OIDC/OAuth2. Dette gir mulighet for sterk autentisering av brukeren med BankID, spissing av tilgangene som etterspørres gjennom [scopes](../../scopes#sluttbruker-api) og offline tilgang gjennom refresh tokens. Sluttbrukeren vil kunne adminstrere tilganger gitt til ulike sluttbrukersystemer på sin Profil-side i Altinn, og trenger ikke dele passord med sluttbrukersystemet.

## Autentisering med ID-porten

Altinn tilbyr OIDC/OAuth2-basert autentisering og autorisasjon for eksterne integrasjoner (f.eks. sluttbrukersystemer) via ID-porten for endepunkter som krever person-autentisering. For å få tilgang til [samarbeidsportalen](https://samarbeid.digdir.no/), hvor virksomheten din kan konfigurere klienter som brukes for å aksessere Altinns API-er, ta kontakt med servicedesk@digdir.no.

Altinn definerer en rekke scopes som kan brukes for å begrense tilgangen en gitt klient kan få.
Se [liste over scopes](../../scopes#sluttbruker-api) for mer informasjon om hvordan du kan provisjonere din klient.

{{% notice warning  %}}
Altinn vil fortsette å støtte [legacy autentisering via ID-porten og cookies](../idporten-legacy/) en tid fremover, men dette mønsteret anbefales ikke for nye integrasjoner.
{{% /notice %}}

ID-porten støtter ulike flyter avhengig av implementasjon og hvordan klienten er konfigurert. Se [integrasjonsguiden](https://docs.digdir.no/oidc_guide_idporten.html) for utfyllende informasjon om hvordan du integrerer med ID-porten. 

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

Merk at andre felter kan være påkrevd å oppgi avhengig av din implementasjon/klient. Se [integrasjonsguiden](https://docs.digdir.no/oidc_guide_idporten.html) 
for mer informasjon.

### 2. Motta autorisasjonskode på oppgitt endepunkt

Etter bruker har autentisert seg (hvis ikke allerede innlogget), og har gitt tilgang din klient tilgang til scopet, blir han/hun videresendt til 
endepunktet oppgitt i `redirect_uri` med en autorisasjonskode, f.eks. `https://eksempel.no/response?code=1JzjKYcPh4M....FMT0=`.

Denne autorisasjonskode benyttes for å hente ut access_token fra ID-porten i neste steg.

### 3. Hent ut access_token

Avhengig av klient-type vil prosessen har noen forskjeller (se [integrasjonsguiden for mer detaljer](https://docs.digdir.no/oidc_guide_idporten.html#3-utstedelse-av-token-fra-token-endepunktet)), 
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

```http
GET /api/my/messages HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: {min-api-nøkkel}
Authorization: Bearer eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFp...YIcXH0AaRpxffAx7vJj6xzuIJ4C0DxnPCfRRA
```
som da returnerer data for brukeren tokenet representerer.



## Autentisering med brukernavn og passord

{{% notice warning  %}}
Denne mekanismen gir tilgang på lavt sikkerhetsnivå. For alle systemer som skal autentisere sluttbrukere anbefales i stedet bruk av ID-porten.
{{% /notice %}}

Altinn API støtter autentisering med kun brukernavn og passord. Registrering av brukernavn og passord gjøres i Altinn portalen under [Profil, roller og rettigheter](https://www.altinn.no/ui/Profile/?section=3).

Autentisering med brukernavn og passord gir tilgang til meldinger og tjenester som krever sikkerhetsnivå 1.

### 1. Utføre autentisering

Send følgende POST-forespørsel mot APIet:

```HTTP
POST /api/authentication/authenticatewithpassword HTTP/1.1
Host: www.altinn.no
Content-Type: application/hal+json
ApiKey: min-api-nøkkel

{
    "UserName": "MyUsername",
    "UserPassword": "MyPassword"
}
```

Ved korrekt autentisering vil du få status `200 OK` som respons fra Altinn REST API. Responsen vil også inneholde en `Set-Cookie`-header som inneholder autentiseringscookien `.ASPXAUTH`som må benyttes i påfølgende kall. Øvrige cookies som returneres kan ignoreres.

### 2. Hent ut informasjon fra Altinn

Den mottate cookien `.ASPXAUTH` sendes som en normal `Cookie`-header i videre på kall til Altinn API. Merk at API-nøkkel også alltid må oppgis:

```HTTP
GET /api/my/messages HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: {min-api-nøkkel}
Cookie: .ASPXAUTH=2AF7F203...
```
