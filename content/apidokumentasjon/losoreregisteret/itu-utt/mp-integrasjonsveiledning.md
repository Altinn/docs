---
title: Veiledning for integrasjon mot Maskinporten
description: Veiledning for integrasjon mot Maskinporten
weight: 100
---


## Innledning

For å kunne få tilgang kreves autentisering via [Maskinporten](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_guide_maskinporten.html).
Denne siden er ment til å være en veiledning som gir et eksempel på hvordan gå frem for å integrere gjennom bruk av Maskinporten.

Veiledningen er laget for integrasjon mot Brønnøysundregistrene og Maskinporten sine testmiljø. Ved integrasjon mot produksjonsmiljø, erstatt Maskinport-spesifikke URLer med tilsvarende for prod.
Se [oversikten over endepunkter hos Maskinporten](https://difi.github.io/felleslosninger/maskinporten_func_wellknown.html).

I produksjonsmiljø vil en også kunne registrere klienter manuelt i selvbetjeningsportalen til Maskinporten.

## Registrering av klient

**_INFO_** Før en begynner å opprette integrasjonen må en ha et gyldig virksomhetssertifikat, enten for et syntetisk organisasjonsnummer (testmiljø), eller for et gyldig organisasjonsnummer (produksjonsmiljø).

### Lag Keystore

En keystore av typen JKS som inneholder virksomhetssertifikatet må opprettes, se [Maskinporten](https://difi.github.io/felleslosninger/oidc_sample_jwtgrant_postman.html) for nærmere informasjon.

Dette kan gjøres i UNIX-systemer (Mac/Linux) ved å kjøre kommandoen:

```
keytool -v -importkeystore -srckeystore <filnavn> -srcstoretype PKCS12 (om virksomhetssertifikatet er av type .p12) -destkeystore <ønsket-navn-på-keystore> -deststoretype JKS
```

Etter input vil du først lage et passord for keystore, dette trenger du videre. Deretter blir en spurt om passordet til virksomhetssertifikatet. Skriv inn ønsket og gitt passord og keystore vil bli opprettet.

### JWT-grant-generator

Autentisering via Maskinporten foregår ved hjelp av JWT tokens. Difi har laget en egen [JWT-grant-generator](https://github.com/difi/jwt-grant-generator) som lastes ned og bygges i henhold til dokumentasjonen som finnes på lenken.

### Generere JWT

For førstegangsregistrering kreves en properties fil når du lager JWT-en med disse parametrene:

```json
issuer=oidc_(orgnr)_api
audience=https://oidc-ver2.difi.no/idporten-oidc-provider/
scope=idporten:dcr.write idporten:dcr.read
token.endpoint=https://oidc-ver2.difi.no/idporten-oidc-provider/token
```

I tillegg kommer [keystore spesifikke properties, som er beskrevet her](https://github.com/difi/jwt-grant-generator)

Når properties filen er ferdig laget, kan en følge retningslinjene nederst i lenken over for å genere en JWT og få ut `access_token` fra Maskinporten.
Dette access tokenet blir brukt for å registrere en vedvarende klient hos Maskinporten.

### Registrer klient

Send en POST-request til https://integrasjon-ver2.difi.no/clients/ for å registrere ny klient,
se [maskinporten](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html#registrere-klient-som-bruker-virksomhetssertifikat).
Bruk access token fra forrige steg. Klienten skal registreres for scope `brreg:losore/utlegg`. Maskinporten vil svare med en `client_id`.

## Uthenting av token

**_INFO_** Dette steget forutsetter at en klient allerede er opprettet

Opprett en [properties fil med felter som beskrevet her](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html#5-be-om-token).

Flere av feltene vil JWT-grant-generator skape automatisk om denne brukes. Ved bruk av JWT-grant-generator, opprett en properties fil med feltene beskrevet i seksjonen for å generere JWT,
med følgende endringer:

```json
issuer=klient_id  
scope=brreg:losore/utlegg
```

Ved kjøring av JWT-grant-generatoren vil en få ut et access token som kan brukes mot våre APIer.
