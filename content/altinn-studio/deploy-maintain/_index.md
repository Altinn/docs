---
title: Produksjonssetting og vedlikehold av apper
linktitle: Produksjonssetting
description: Tjenesteeier kan selv produksjonssette sine applikasjoner, og gjøre vedlikehold av kode og avhengigheter.
toc: true
weight: 600
---

## Få tilgang til et produksjonsmiljø
Første gang man skal gjøre deploy av en applikasjon til produksjonsmiljøet er det behov for at det er satt opp et eget tjenesteeier-cluster.
For å få dette gjelder følgende prosess:

1. [Send en e-post til produkteier](mailto:lars.vegard.bachmann@digdir.no) med en beskjed om hvilken/hvilke apps du har klar til produksjonssetting.
2. Bekreft at bruksvilkårene (som du får som svar på e-posten) er godkjent fra tjenesteeiers side.
3. Vent på beskjed om at cluster er opprettet.

Denne rutinen trenger bare å følges en gang. Når clusteret er satt opp, er løsningen selvbetjent etterpå.

## Produksjonssette en app
Produksjonssetting av applikasjonen gjøres på [samme måte som for testmiljøer](../testing/deploy).

## Vedlikehold av app i produksjon
Når applikasjonen er satt i produksjon, vil det oppstå behov for å vedlikeholde applikasjonen.
Den vanligste vedlikeholdstypen vil være å [oppdatere avhengigheter](../app-creation/update).

For å gjøre en ny versjon av applikasjonen tilgjengelig, produksjonssetter man den på samme måte som vanlig.

Instanser av appen i brukers innboks vil automatisk oppdateres til å bruke siste versjon av applikasjonen,
så det er viktig at man ikke innfører endringer som knekker eksisterende instanser.