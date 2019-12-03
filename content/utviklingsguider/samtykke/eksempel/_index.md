---
title: "Eksempel: Samtykkebasert lånesøknad"
linktitle: Eksempel
description: Samtykkebasert lånesøknad er et samarbeid mellom flere offentlige og private aktører i DSOP-samarbeidet (Digital Samhandling Offentlig Privat). Tjenesten gjør det mulig å hente skattegrunnlag og inntektsdata hos Skatteetaten med samtykkeløsningen fra Altinn. 
toc: true
weight: 1
---

## Brukerstyrt samtykke i Altinn 
{{< vimeo 230421728 >}}


## Bruk av "Self-contained OAuth 2.0 token"
Metoden som brukes i Samtykkebasert lånesøknad til å sende data er Self-contained OAuth-token. Det betyr at tokenet i seg selv inneholder all informasjon om rettigheten(e) som er blitt delegert fra sluttbruker til datakonsumenten.

Figuren under viser prosessen med bruk av self-contained OAuth token i en tjeneste hvor brukeren søker om lån i banken. Her er “bank” datakonsumenten og “Skatteetaten” er datakilden:

![Prosess](prosess.png "Prosess")

### Slik ser prosessen ut:

 1. Lånesøker går inn på bankens nettside for å søke om lån.
 2. Lånesøker bekrefter i søknadsprosessen at han ønsker å gi banken samtykke til å innhente ligningsopplysninger og [blir sendt til Altinn](datakonsument/be-om-samtykke/) for å gi samtykke.
 3. Lånesøker [logger inn](sluttbruker/innlogging/) i Altinn og [gir samtykke](sluttbruker/samtykkesiden). Altinn registrerer samtykket og delegerer rettighet.
 4. Rettighetsdelegering er utført og [det sendes en autorisasjonskode tilbake](datakonsument/be-om-samtykke/#autorisasjonskode).
 5. Lånesøker sendes tilbake til siden som er angitt av banken i redirect-Url. I Url sendes autorisasjonskoden samt en status som forteller om samtykke ble gitt.
 6. Autorisasjonskoden benyttes av banken mot Altinn for å [få tak i Altinn-signert self-contained OAuth token](datakonsument/hente-token/).
 7. Altinn sender [signert token](datakilde/bruk-av-token/#bruk-av-self-contained-oauth-token) til banken.
 8. Banken [benytter signert token](datakonsument/hente-token/#hente-data-fra-datakilden-ved-hjelp-av-altinn-signert-token) mot datakilden (f.eks. Skatteetaten).
 9. [Tokenet verifiseres](datakilde/bruk-av-token/#verifisere-jwt-token-signatur) av Skatteetaten for å sjekke at innhold stemmer med ønsket utført operasjon og data returneres til banken.


## Ta i bruk Samtykkebasert lånesøknad?
Hvis du jobber for en bank, forsikringsselskap eller lignende og ønsker å hente inn skattegrunnlag og inntektsdata hos Skatteetaten, kan du følge [BITS guide til samtykkebasert lånesøknad](https://www.bits.no/dsop-sbl/).