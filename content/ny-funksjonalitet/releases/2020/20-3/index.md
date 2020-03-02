---
title: 20.3
description: Mindre forbedringer og feilrettinger
weight: 110
type: releasenote
releasenote_info: Release 20.3, produksjonssettes 09. mars 2020
---

**Dette er en kommende versjon. Se [her](../20-2) for gjeldende versjon** 

## Endringer i Portal

### Visning av Samtykkeforespørsler i samtykkepanelet

Eksisterende samtykkepanelet er utvidet slik at samtykkepanelet er synlig når brukeren har innkomende forespørsler. Innkommende samtykkeforespørsler som er opprettet av datakonsument dukker nå opp som forespørsler under “Samtykker og fullmakter”-panelet. Det vil nå være mulig for den innloggede brukeren å gå inn på forespørselen, og godta eller slette denne. Dersom forespørselen ikke er gyldig lengre, vil brukeren kunne fjerne den gamle forespørselen.

## Endringer i Autorisasjon

### Opprettet rollen ‘EKTJ’ - Eksplisitt tjeneste delegering

Det er opprettet en rolle, EKTJ, som er et barn av SENS. Denne rollen er ikke delegerbar og det er ingen som arver den. Tjenester knyttet til rollen vil da bare være tilgjengelig gjennom direkte delegeringer gjort av brukere med HADM.

## Endringer i REST-API

### Hente liste over samtykkeforespørsler for en datakonsument via REST - for sluttbruker system API

## Diverse bugfix

### Det vil alltid være default melding med 30MB som grense som vises selv om vedleggstype regelen har satt annen melding

Det vil alltid være default melding med 30MB som grense som vises selv om vedleggstype regelen har satt annen melding
Det er utbedret en feil i portalkoden som gjorde at default feilmelding alltid ble vist selv om det var definert en annen grense for vedleggstypen. Nå skal riktig grense vises i feilmeldingen.

### Ytelsesproblemer i download queue

Det har vært høyt CPU forbruk ved polling mot download queue. Optimalisering er derfor utført.