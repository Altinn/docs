---
title: Formidling
description: Formidlingstjenesten bruker Altinn til å overføre (store) filer fra en avsender til en eller flere mottakere.
---

Tjenesten kan brukes med [web servicer](https://altinn.github.io/docs/api/soap/grensesnitt/#brokerservice-formidlingstjenester-ws). Altinn vil ikke lagre filene lenger enn det som er nødvendig for å overføre filene, basert på
innstillinger du gjør. Overføringen er passiv, og det blir ikke gjort noe validering eller prosessering av filene som overføres.

## Spesifikasjon – formidlingstjeneste

For en formidlingstjeneste må det som for øvrige tjenestetyper registreres utgaveparametre, og det er mulig å overstyre rettigheter.

### Utgaveparametre

Enhver utgave må ha [utgaveparametre](../felles-funksjonalitet/#utgaveparametere). Unikt for en formidlingstjeneste er
innstillinger for hvor lenge filene skal lagres og hvordan tilgang til utgaven kan gis.

Det er to ulike parametre som vil avgjøre når filene skal kunne fjernes av slettejobber og dermed ikke lenger være tilgjengelige. Et valg
forteller om filene skal slettes med en gang alle mottakerne har lastet ned filene. Det andre valget forteller hvor mange dager filene skal
være tilgjengelige for nedlasting. Når denne fristen er passert vil filene slettes selv om ikke alle mottakerne har lastet de ned.

Tjenesteeierstyrt register er et sted der tjenesteeier kan styre hvilke brukere som skal ha adgang til tjenesteutgaven. Tjenesteutvikleren
kan bestemme om dette registeret skal brukes eller ikke. Dersom registeret blir brukt vil det sammen med vanlige roller og rettigheter
avgjøre hvem som har tilgang.

For sikkerhetsnivå er det bare mulig å velge nivå 1-3 for formidlingstjenester. Tjenesten vil bare være tilgjengelig via web service eller
SFTP, og vil ikke kunne brukes gjennom portalen.

### Overstyr rettigheter

Rettigheter trenger du bare å overstyre hvis den utgaven du utvikler har andre rettighetskrav enn de som allerede er satt på tjenestenivå.
Hver utgave vil arve disse rettighetene når den migreres til SBL,
og få med seg [overstyringene](../felles-funksjonalitet/#overstyr-rettigheter) i tillegg.
