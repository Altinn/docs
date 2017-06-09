---
draft: false
title: Autorisasjon
description: "Autorisasjonskomponenten i Altinn er svært funksjonsrik og gir et kraftig verktøy til tjenesteeiere for å kunne styre tilgang til tjenester."
aliases:
menu:
  main:
    identifier: authorization
    name: Autorisasjon
    parent: security

weight: 100
---

Autorisasjonskomponenten i Altinn er svært funksjonsrik og gir et kraftig verktøy til tjenesteeiere for å kunne styre tilgang til tjenester.

Tjenesteutvikler kan definere hvilke roller som kreves for å brukes en tjeneste og Altinn sikrer at brukerne tilfredsstiller kravene.
I Altinn kan også sluttbruker delegere videre rettighetene slik at for eksempel andre personer i en organisasjon kan utføre oppgaver.


### Fordeler og muligheter
Altinn har integrert Folkeregister og Enhetsregister noe som gjør at man som tjenesteeier i Altinn får god tilgangskontroll
på tjenester som skal benyttes av private eller organisasjon.

Sluttbrukere har gode muligheter til å administrere sine rettigheter videre til andre innad eller utenfor sin organisasjon,
noe som sikrer at de riktige personer får benyttet seg av tjenestene.

For tjenesteeier tilbyr også Altinn grensesnitt som gjør det mulig å hente ut autorisasjonsinformasjon som
for eksempel informasjon om hvilke roller en person har for en organisasjon. Dette kan brukes for å styre tilgang i eksterne løsninger.

Tjenesteeier kan også benytte seg av et teknisk grensesnitt for å spørre om en bruker har tilgang til å utføre operasjoner på en gitt tjeneste.


### Produkter som tilbys
 - Styring av tilgang på tjenester basert på roller i Enhetsregisteret/Altinn
 - Styring på mulige avgivere via tjenesteierstyrt register
 - Ekstern bruk av Altinns autorisasjonskomponent 


### Råd og tips
 - Knytt tjenester til roller som funksjonelt passer andre tilsvarende tjenester
 - Oppfordre til enkeltdelegering av rettigheter over det å opprette lokale roller

### Kanaler
 - REST-API
 - Sluttbrukersystem
 - Portal

### Avhengigheter
Mye av funksjonaliteten som er tilgjengelig for sluttbruker er knyttet til at man som tjenesteeier har tjenester i Altinn plattformen.

### Teknisk dokumentasjon
 - [Implementasjonsguide for tjenesteeier](/docs/guides/tjenesteeier/implementasjonsguide/)
 - Brukerveiledning TUL

