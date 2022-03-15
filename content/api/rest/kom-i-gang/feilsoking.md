---
title: Feilsøking i Altinn REST API
linktitle: Feilsøking
description: Informasjon om hvordan man kan drive feilsøking i REST API-integrasjoner.
toc: true
categories: [Guider]
keywords: [REST]
tags: [REST]
---

## HTTP feilkoder
REST-API-et bestreber å benytte standard HTTP-koder når det oppstår feilsituasjoner, altså 400-499 ved feil på klientsiden og 500-599 ved feil på serversiden. I hovedsak returneres det ikke noen body ved feil, men kun en feilmelding samt en beskrivelse i [Reason-Phrase](https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html)-delen i HTTP-responsen.

Eksempel hvor det i stedet for en standard `400 Bad Request` returneres en tekst som indikerer hva som er feil:

```bash
$ curl -v https://www.altinn.no/api/my/messages 2>&1 | grep "^< " | head -n 1
< HTTP/1.1 400 Required header 'ApiKey' is missing.
```

{{% notice warning  %}}
Merk at noen biblioteker og rammeverk kan skjule den returnerte Reason-Phrase, og i stedet kun vise feilkoden (f.eks. 400) eller alltid vise standard Reason-Phrase for en gitt kode (f.eks. "Bad Request"). Dette bør hensyntas i forbindelse med logging, slik at de faktiske feilmeldingen returnert av Altinn blir benyttet.
{{% /notice %}}

## Error-modell

Noen nyere API-er returnerer en feilmeldingsmodell ved feil (altså når HTTP statuskode er større eller lik 400) i stedet for å benytte en custom Reason-Phrase. Denne modellen har formen:

```json
{
    "ErrorCode": 12345,
    "ErrorMessage": "En nærmere beskrivelse av feilen her"
}
```

## Vanlige feil

### 401 Authorization failed: There is no authenticated organization number set on this request.

Dette oppstår hvis en forsøker å kalle et endepunkt som krever en autentisert virksomhet, men som ikke ble utført med gyldige autentiseringsmidler. Dette kan være enten et [virksomhetssertifikat](../virksomhet/#autentisering-med-kun-virksomhetssertifikat) (klientsertifikat for to-veis TLS), eller et [Maskinporten-token](../virksomhet/#autentisering-med-kun-maskinporten). Merk spesielt at for at to-veis TLS skal fungere må det oppgis `ForceEIAuthentication` som et query-parameter i requesten.

### 403 Forbidden - The API key is not authorized for this operation

Alle kall til Altinn REST-API krever at det oppgis en API-nøkkel. I tillegg til scopes kreves det også at API-nøkkelen er gitt tilgang til å kalle de ulike API-ene; dette oppgis i bestillingsskjemaet for API-nøkler. For å utvide tilgangen til API-nøkkelen din, ta kontakt med [sluttbrukersystem@altinn.no](mailto:sluttbrukersystem@altinn.no)

### Får "302 Found" eller "200 OK" og mottar HTML

Av legacy-årsaker vil requests til API-er som krever en [brukerautentisering](../person/) (typisk alle API-er med en {who}-komponent i pathen) men som foretas uten at autentiseringsmidler oppgis (ID-porten-token eller `.ASPXAUTH`-cookie) føre til at requesten blir behandlet som om det ble foretatt av en nettleser. Sørg for at enten token eller cookie alltid oppgis.