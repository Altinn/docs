---
title: For API-bruker
description: Om hvordan du tar i bruk en tilgang til et Maskinporten-sikret API gitt via en Altinn-delegering.
aliases:
    - /utviklingsguider/sikkerhet-i-eoppslag/api-bruker/
---

## Introduksjon

Som leverandør som skal ta i bruk en tilgang delegert til deg fra en kunde (som selv har fått tilgang til et API i Maskinporten),
trenger du å opprette en Maskinporten-integrasjon knyttet til det samme organisasjonsnummeret som er blitt gitt tilgang i Altinn.

For informasjon om dette, se [integrasjonsguiden til Maskinporten](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html#bruke-delegering-som-leverand%C3%B8r).

## Tilgang til API

Tilgangene til scope gis via en delegering på en eller flere API-ressurser som omfatter det aktuelle scopet.
Hvis du logger inn med en nøkkelrolle-innehaver for virksomheten din, vil kunden være synlig i "Velg aktør"-visningen hvis kunden din allerede har gitt deg tilgang.
Ved å velge kunden din som aktør, vil du kunne verifisere at din virksomhet har fått tilgang med å se på "Skjema og tjenester du har rettighet til" på Profil-siden.
Tilganger til API-ressurser vil stå listet opp som en enkelttjeneste.

![Visning av delegert API-ressurs](/docs/images/guides/eoppslag/delegate-ds-02.png "Visning av delegert API-ressurs")

## Provisjonering av OIDC-klient for uthenting av token

For å hente ut access_token for tilgang til et scope som du har tilgang til via delegering,
gjøres gjennom en spesiell forespørsel til Maskinporten hvor det oppgis at man ønsker token på vegne av en annen virksomhet (leverandør-token). 

Denne prosessen er beskrevet i [integrasjonsguiden til Maskinporten](https://difi.github.io/felleslosninger/maskinporten_guide_apikonsument.html#bruke-delegering-som-leverand%C3%B8r).
