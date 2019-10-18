---
title: Uthenting av meldinger
description: Beskrivelser av API innen BRs elektroniske mottak av meldinger
weight: 100
---

## Innledning
Maskinport-integrasjonen er en maskin-til-maskin tjeneste (API) som kan benyttes av eksterne parter for innsending av meldinger til Brønnøysundregistrene. 

API'et er utviklet i java og spring boot, men dette skal ikke legge føringer for klienter som tar api'et i bruk.

## Sikkerhetsmekanismer

Siden dette er begrensede API-er så skal kallende parter autentiseres gjennom [Maskinporten](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_guide_maskinporten.html).

Maskinporten utsteder JWT tokens, dette skal følge med forespørselen. Tjenestens scope er "brreg:mottak". Access tokenet oppgis i Authorization headeren.

Husk 'Bearer ' før tokenet. 

|Header        | Verdi                                                                              |
|--------------|------------------------------------------------------------------------------------|
|Authorization | Bearer eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFpMS0pzdzhmQkFJdUZi... (forkortet) |


## Grensesnittbeskrivelse

Tjenesten benytter seg av standard HTTP GET og POST.
Følgende funksjonalitet tilbys for eksterne systemer/brukere:


| HTTP-metode    | URL                                             |Content-type                | Beskrivelse                                                                                   | Sikret med jwt |
|:-------------- |:------------------------------------------------|:---------------------------|:--------------------------------------------------------------------------------------------- |:-------------- |
| GET           | https://\<domain\>/available                     | application/json           | Lister ut tilgjengelige meldinger (med mottakId) for organisasjonsnumer oppgitt i JWT tokenet | JA             |
| GET           | https://\<domain\>/download?mottakId={mottakId}  | application/octet-stream   | Laster ned forsendelse med oppgitt mottakId                                                   | JA             |
| PUT           | https://\<domain\>/confirm?mottakId={mottakId}   | application/json           | Bekrefter at forsendelse med oppgitt mottakId er lastet ned av klient                         | JA             |
| GET           | https://\<domain\>/swagger-ui.html#/             |                            | Swagger dokumentasjon                                                                         | NEI            |


<br/><br/>
### AVAILABLE

Endepunktet */available* returnerer tilgjengelige forsendelser for organisasjonsnummer som er oppgitt i JWT tokenet.

#### Response
Ved 200 OK: 

```json
[
  {
  "mottakId":"be935814-c7a3-4a9f-8bbc-ac278cbe41d5",
  "version":0,
  "orgnr":910514350,
  "dokumentId":"be935814-c7a3-4a9f-8bbc-ac278cbe41d5",
  "status":"ready",
  "oppdatert":"2019-09-05T09:43:51.691"
  }
]
```


<br/><br/>
### DOWNLOAD

Endepunktet */download* returnerer fil med angitt mottakId. Responsen er en zipfil med melding og eventuelle vedlegg. MottakId er en UUID.

#### Response

Bytestream som APPLICATION_OCTET_STREAM


<br/><br/>
### CONFIRM

Endepunktet */confirm* bekrefter forsendelsen med angitt mottakId som nedlastet. Denne forsendelsen vil da ikke lenger fremkomme ved kall til /available. MottakId er en UUID.

#### Response
200 OK ved success. 


## Feilmeldinger

| HTTP-kode                         | Applikasjonsfeilkode | Feilmelding                                                                                                                                                                                                   |
|:----------------------------------|:---------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 500 Internal Server Error         | ERROR-00005          |  Optimistic lock exception. Hvis samme forsendelseinfo blir forsøkt confirmed nedlastet samtidig kan dette skje. <br> I utgangspunktet kan man se bort i fra denne, men å forhindre dette er klientens ansvar.     |


Disse kommer på jsonformatet:

```json
{
  "feilId":"72577aa8-0ba1-4424-a310-fd9671547953",
  "mottakId":"fe7234ec-b51f-47d1-a414-5b17123118b3",
  "kilde":"maskinport-agent",
  "feilkode":"ERROR-00005",
  "beskrivelse: "Simultaneous attempt to confirm same file"}
```

**I tillegg kommer 401 - Unauthorized ved mangler på Bearer token.**

| HTTP-kode           | header           | Header-value                                                                                                                 | Forklaring                                                                                                                      |
|:--------------------|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------|
| 401 - Unauthorized  | WWW-Authenticate |Bearer realm="unspecified", error="unauthorized", error_description="Full authentication is required to access this resource" | JWT access token ikke oppgitt i Authorization header i request.                                                                 |
| 401 - Unauthorized  | WWW-Authenticate |Bearer realm="unspecified", error="invalid_token", error_description="invalid bearer token or wrong scope for bearer token"  | JWT access token er oppgitt, men det er enten ugyldig (utgått, korrupt eller gjeldende for et annet scope en tjenesten krever). |

