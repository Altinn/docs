---
title: Veiledning for integrasjon mot Maskinporten
description: Veiledning for integrasjon mot Maskinporten
weight: 100
---


## Innledning

Tilgang til APIet krever autentisering via [Maskinporten](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html).

Kort fortalt så må API-konsument initielt opprette en Maskinport-integrasjon (oauth2-klient) og registrere scopet til APIet til denne. Når APIet skal brukes, må denne oauth2-klienten forespørre et token fra Maskinporten og inkludere dette tokenet i kall til APIet.

**_MERK:_** API-konsument må en ha et gyldig virksomhetssertifikat, enten for et syntetisk organisasjonsnummer (testmiljø), eller for et gyldig organisasjonsnummer (produksjonsmiljø).


## Opprette Maskinport-integrasjon (oauth2-klient)

API-konsument trenger en oauth2-klient (også omtalt som klient) for å hente Maskinport-token for aktuelt scope, som må inkluderes i kall til APIet. Se [overordnet arkitekturbeskrivelse](https://difi.github.io/felleslosninger/maskinporten_overordnet.html).

Integrasjonen/klienten kan opprettes manuelt i [Samarbeidsportalen](https://minside-samarbeid.difi.no/organization-home/services/service-admin) eller via Maskinporten sitt [selvbetjeningsAPI](https://difi.github.io/felleslosninger/oidc_api_admin.html). Da selvbetjeningsAPIet også er beskyttet av Maskinport-token, må API-konsument ha en egen oauth2-klient, også omtalt som selvbetjeningsklient, for å bruke denne tjenesten. Ta kontakt med [Digdir sin servicedesk](mailto:servicedesk@digdir.no) for å få en selvbetjeningsklient.

**_MERK:_** En klient for et syntetisk organisasjonsnummer (testmiljø) må opprettes via selvbetjeningsAPIet. Selvbetjeningsklienter for API-konsumenter av ITU/UTT-API er allerede opprettet med identifikator `oidc_<fiktivt organisasjonsnummer>_api`.

### Veiledning til bruk av selvbetjeningsAPI

Dette kapittelet er ment som en veiledning/eksempel på hvordan en Maskinport-integrasjon/klient kan opprettes ved hjelp av selvbetjeningsAPIet.

Ved integrasjon mot produksjonsmiljø, erstatt Maskinport-spesifikke URLer med tilsvarende for prod. Se [oversikten over endepunkter hos Maskinporten](https://difi.github.io/felleslosninger/maskinporten_func_wellknown.html).


#### Lag Keystore

En keystore av typen JKS som inneholder virksomhetssertifikatet må opprettes, se [Maskinporten](https://difi.github.io/felleslosninger/oidc_sample_jwtgrant_postman.html) for nærmere informasjon.

Dette kan gjøres i UNIX-systemer (Mac/Linux) ved å kjøre kommandoen:

```
keytool -v -importkeystore -srckeystore <filnavn> -srcstoretype PKCS12 (om virksomhetssertifikatet er av type .p12) -destkeystore <ønsket-navn-på-keystore> -deststoretype JKS
```

Etter input vil du først lage et passord for keystore, dette trenger du videre. Deretter blir en spurt om passordet til virksomhetssertifikatet. Skriv inn ønsket og gitt passord og keystore vil bli opprettet.


#### Generer JWT

Autentisering via Maskinporten foregår ved hjelp av JWT tokens. Difi har laget en egen [JWT-grant-generator](https://github.com/difi/jwt-grant-generator) som lastes ned og bygges i henhold til dokumentasjonen som finnes på lenken.

For førstegangsregistrering kreves en properties fil når du lager JWT-en med disse parametrene:

* TEST
```properties
issuer=<selvbetjeningsklient_id>
audience=https://oidc-ver2.difi.no/idporten-oidc-provider/
scope=idporten:dcr.write idporten:dcr.read
token.endpoint=https://oidc-ver2.difi.no/idporten-oidc-provider/token
```

* PROD
```properties
issuer=<selvbetjeningsklient_id>
audience=https://oidc.difi.no/idporten-oidc-provider/
scope=idporten:dcr.write idporten:dcr.read
token.endpoint=https://oidc.difi.no/idporten-oidc-provider/token
```

I tillegg kommer [keystore spesifikke properties, som er beskrevet her](https://github.com/difi/jwt-grant-generator).

Når properties filen er ferdig laget, kan en følge retningslinjene nederst i lenken over for å genere en JWT og få ut `access_token` fra Maskinporten.
Dette access tokenet blir brukt for å registrere en vedvarende klient hos Maskinporten.

#### Registrer klient

Send en POST-request til følgende URL for å registrere ny klient:

* TEST: `https://integrasjon-ver2.difi.no/clients/`
* PRODUKSJON: `https://integrasjon.difi.no/clients/`

Se [Registrere klient som bruker virksomhetssertifikat](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html#registrere-klient-som-bruker-virksomhetssertifikat) for nærmere informasjon.

Bruk access token fra forrige steg. Klienten skal registreres for aktuelt scope, f.eks. `brreg:losore/utlegg`. Se dokumentasjon av APIene for informasjon om hvilket scope som skal brukes.

Maskinporten vil svare med en `client_id`.

## Hente access token

**_MERK_** Dette steget forutsetter at en klient allerede er opprettet med aktuelt scope.

Opprett en [properties fil med felter som beskrevet her](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html#5-be-om-token).

Flere av feltene vil JWT-grant-generator skape automatisk om denne brukes. Ved bruk av JWT-grant-generator, opprett en properties fil med feltene beskrevet i seksjonen for å generere JWT, med følgende endringer:

```properties
issuer=<client_id>
scope=<scope for API>
```

Scope kan f.eks. være `brreg:losore/utlegg`. Se dokumentasjon av APIene for informasjon om hvilket scope som skal brukes.

Ved kjøring av JWT-grant-generatoren vil en få ut et access token som kan brukes mot våre APIer.
