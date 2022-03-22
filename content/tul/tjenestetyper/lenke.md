---
title: Lenke
description: En lenketjeneste er en lenke fra Altinn til en tjeneste som ligger hos tjenesteeieren.
---


Bakgrunn for lenketjenesten er at tjenesteeiere ønsker å tilgjengeliggjøre sine tjenester i Altinn samtidig som de ønsker å beholde sin egen tjenestemotor.
Tjenesteeier må har satt opp føderering mot IDPorten og lenken (tjenesten hos tjenesteeier) må være en beskyttet ressurs. For å få tilgang til tjenesten må dermed
sluttbruker være logget inn hos ID-Porten gjennom Altinn. Sluttbruker foretar valg av avgiver i Altinn, og Altinn utfører
autorisasjonskontroll og tjenestekontroller. Kun sikkerhetnivåer som er tilgjengelig i IDPorten kan brukes på tjenesten. Altinn har lenken
til tjenesteeierens tjeneste i sin tjenestekatalog.

En lenketjeneste er alltid assosiert med en URL, og denne URL-en kan være enten intern eller ekstern. Lenketjenester opprettes i TUL på lik
linje med andre tjenestetyper og skal også kunne inngå i samhandlingstjenester.

Ser også egen [utviklingsguide for autorisasjon](/docs/utviklingsguider/autorisasjon/).

## Spesifikasjon – lenketjeneste

For en lenke må det som for øvrige tjenestetyper registreres utgaveparametre, og det er mulig å overstyre rettigheter.

### Utgaveparametre

Enhver utgave må ha [utgaveparametre](../felles-funksjonalitet/#utgaveparametere). Unikt for en lenketjeneste er definisjonen
av hvilken URL den er knyttet til, og oppsett av preinstansieringskontrollere.

Preinstansieringskontrollere er funksjonalitet for å angi at forhåndsdefinerte kontrollprosesser skal kjøres før sluttbruker får tilgang til
lenketjenesten. Tjenesteutvikler kan velge fra en liste av flere forhåndsdefinert preinstansieringskontroller. Man kan for eksempel
verifisere om brukeren har registrert gyldig e-postadresse i Altinn, eller validere at brukeren er over 18 år.

### Overstyr rettigheter

Rettigheter trenger du bare å [overstyre](../felles-funksjonalitet/#overstyr-rettigheter) hvis den utgaven du utvikler har andre rettighetskrav enn de som allerede er satt på tjenestenivå.
Hver utgave vil arve disse rettighetene når den migreres til SBL, og få med seg overstyringene i tillegg.

### Forenklet tjenestedelegering

Forenklet tjenestedelegering i Altinn vil fristille tjenesten fra de eksisterende operasjonene (Les, Skriv, Signer osv.), og i stedet knytte hver rolle som er satt opp for en av disse operasjonene til en generell operasjon: Access.    
Ved delegering av tjenesten i Altinn vil det da ikke være mulig å velge operasjoner, og visning av delegerte rettigheter for tjenesten vil heller ikke ha de vanlige operasjonsikonene.
Ved bruk av SRR (tjenesteeierstyrt rettighetsregister) på tjenester med forenklet tjenestedelegering, er det Access-operasjon som må registreres.

Dersom man ønsker å ta i bruk forenklet tjenestedelegering i Altinn kan man aktivere dette ved å spesifisere URL for lenketjenesten som: https://schemas.altinn.no/authorization/administration/operation/access/2020/05/.
Tjenesten er da ikke mulig å instansiere i Altinn, men vil bare fungere som en representasjon av en ekstern ressurs for Altinn autorisasjon. TUL vil fortsatt kreve at hver av de eksisterende operasjonene (Les, Skriv, Signer osv.) er dekket av minst ett rollekrav.    
