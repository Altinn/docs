---
title: Innsending av meldinger
description: Beskrivelser av API innen BRs elektroniske mottak av meldinger
weight: 100
---

## Innledning
BRs elektroniske mottak har et REST-grensesnitt som kan benyttes av eksterne parter for innsending av meldinger til Brønnøysundregistrene. 

API'et er utviklet i java og Spring Boot, men dette skal ikke legge føringer for klienter som tar api'et i bruk.

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


| HTTP-metode    | URL                                    | Beskrivelse                                  | Sikret med jwt |
|:-------------- |:-------------------------------------- |:-------------------------------------------- |:-------------- |
| POST           | https://\<domain\>/upload              | Sender inn melding med 0 eller flere vedlegg | JA             |
| GET            | https://\<domain\>/swagger-ui.html#/   | Swagger dokumentasjon                        | NEI            |

### Upload

Endepunktet */upload* tar i mot **POST** multipart-requester med følgende deler:

|Felt               | Type           | Innhold                                                                      | Påkrevd |
|-------------------|----------------|------------------------------------------------------------------------------|---------|
| Authorization     | Header         | Jwt access token                                                             | Ja      |
| payload           | form-data      | xml i henhold til Melding (http://schema.brreg.no/postmottak/melding.xsd)    | Ja      |
| attachments       | multipart-file | fil/bytestream                                                               | Nei     |


Denne forespørselen laster opp en melding med ingen eller flere vedlegg/attachments.

#### Response
Ved 200 OK: 

```json
{
  "mottakId": "36b5516f-ecd4-4948-9586-42f4b7d3198a",
  "mottattTidspunkt": "2019-09-02T13:18:40.785",
  "antallVedlegg": 2
}
```

#### Feilmeldinger

| HTTP-kode                         | Applikasjonsfeilkode | Feilmelding                                                                                 |
|:----------------------------------|:---------------------|:------------------------------------------------------------------------------------------- |
| 500 Internal Server Error         | ERROR-00000          |  Generisk feilhåndterer. Forsøk igjen senere. Hvis vedvarende, kontakt support              |
| 400 Bad Request                   | CLIENTERROR-10001    |  Melding kunne ikke behandles, feilet i XML-validering                                      |
| 400 Bad Request                   | CLIENTERROR-10002    |  Mangler med request (f.eks. manglende payload)                                             |

Disse kommer på jsonformatet:

```json
{
  "feilId":"72577aa8-0ba1-4424-a310-fd9671547953",
  "mottakId":"fe7234ec-b51f-47d1-a414-5b17123118b3",
  "kilde":"maskinport-agent",
  "feilkode":"ERROR-00003",
  "beskrivelse":"Message invalid according to schema"}
```

**I tillegg kommer 401 - Unauthorized ved mangler på Bearer token.**

| HTTP-kode           | header           | Header-value                                                                                                                 | Forklaring                                                                                                                      |
|:--------------------|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------|
| 401 - Unauthorized  | WWW-Authenticate |Bearer realm="unspecified", error="unauthorized", error_description="Full authentication is required to access this resource" | JWT access token ikke oppgitt i Authorization header i request.                                                                 |
| 401 - Unauthorized  | WWW-Authenticate |Bearer realm="unspecified", error="invalid_token", error_description="invalid bearer token or wrong scope for bearer token"  | JWT access token er oppgitt, men det er enten ugyldig (utgått, korrupt eller gjeldende for et annet scope en tjenesten krever). |


### Eksempel på hvordan opprette httpbody og sende denne ved bruk av Spring og resttemplate
**Opprett httpEntity**
```java


        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        
        MultiValueMap<String, String> fileMap = new LinkedMultiValueMap<>();

        fileMap.add(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.builder("form-data")
                .name("attachments")
                .filename("filnavn.zip")
                .build().toString());
        HttpEntity<byte[]> fileEntity = new HttpEntity<>("filecontent".getBytes(), fileMap);
        
        body.add("attachments", fileEntity);
        body.add("payload", new HttpEntity<String>(konvolutt));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        String token = bearerTokenProvider.getToken(scope); // provides Maskinporten JWT accesstoken
        if (token != null) {
            headers.add("Authorization", "Bearer " + token);
        }

        HttpEntity<MultiValueMap<String, Object>>  requestEntity =  HttpEntity<>(body, headers);
```
**Send httpEntity**
```java
        ResponseEntity<String> objectResponseEntity = restTemplate.exchange("http://maskinportagent/mottak", HttpMethod.POST, requestEntity, String.class);
```