---
title: Produksjonssetting av apper
linktitle: Produksjonssetting
description: Tjenesteeier kan selv produksjonssette sine applikasjoner, og gjøre vedlikehold av kode og avhengigheter.
toc: true
weight: 600
---

## Få tilgang til et produksjonsmiljø

Første gang man skal gjøre deploy av en applikasjon til produksjonsmiljøet er det behov for at det er satt opp et eget tjenesteeier-cluster.
For å få dette gjelder følgende prosess:

1. [Send en e-post til produkteier](mailto:lars.vegard.bachmann@digdir.no) med en beskjed om hvilken/hvilke apps du har klar til produksjonssetting.
2. [Bekreft at tjenesteeier godtar bruksvilkårene](https://digdir.apps.altinn.no/digdir/godkjenn-bruksvilkaar)
3. Vent på beskjed om at cluster er opprettet.

Denne rutinen trenger bare å følges en gang. Når clusteret er satt opp, er løsningen selvbetjent etterpå.

## Produksjonssette en app

Produksjonssetting av applikasjonen gjøres på [samme måte som for testmiljøer](../testing/deploy).

## Bestille Om skjema-side

Altinn vedlikeholder en [oversikt over alle tjenester i løsningen](https://www.altinn.no/skjemaoversikt/). For at Altinn brukerservice skal kunne hjelpe brukerne med en tjeneste, må informasjon legges inn her. Bestillingsskjemaet heter _"Publiser informasjon om tjeneste på Altinn PROD og TT02"_, og finnes etter innlogging på [altinndigtal.no](https://altinndigital.no).


**Merk!** Bestillingsskjemaet er inntil videre optimalisert for Altinn II-tjenester. Gjør derfor følgende:

- I feltet _"Tjenestekode"_, oppgi 9999 og i feltet _"Utgavekode"_ oppgi 9999
- I feltet _"Hvem skal bruke skjemaet"_ husk å angi hvilke roller som er satt på tjenesten i tillegg til beskrivelsen av hvem tjenesten er for.

