---
title: Oktober
description: Sikkerhetsoppdatering, flytting til nytt Openshiftmiljø og endring av e-postadressen til support i Domeneklienten.
weight: 20
type: releasenote
releasenote_info: Produksjonssatt 20. oktober 2020
---


### Oppdatert Spring Boot på grunn av sikkerhetsfeil

Spring Boot, som brukes av Administrasjonsklienten, er oppdatert til en nyere versjon på grunn av en sikkerhetsfeil i TomCat-versjon som ble brukt. Denne feilen er nærmere beskrevet her: https://nvd.nist.gov/vuln/detail/CVE-2020-1938

### Flytte Administrasjonsklienten og Repository til nytt OpenShiftmiljø

Administrasjonsklienten og Repository er flyttet fra Openshift 3.x til Openshift 4.x.

### Endret e-postadresse i menyfeltet "Send melding til Support"

E-postadressen under menyen «Hjelp -> Send melding til Support» i Domeneklienten er endret fra support@seres.no til tjenesteeier@altinn.no. I tillegg er det rettet en skrivefeil i den forhåndsdefinerte teksten som vises i emnefeltet.

