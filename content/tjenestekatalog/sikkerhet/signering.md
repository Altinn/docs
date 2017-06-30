---
title: Signering
description: Altinn støtter signering av data som bruker skal sende inn. Dette sikrer at brukeren bekrefter innholdet før tjenesteeier mottar data.
weight: 100
---

Altinn støtter signering av data som bruker skal sende inn. Dette sikrer at brukeren bekrefter innholdet før tjenesteeier mottar data.


### Fordeler og muligheter
Altinn støtter signeringsfunksjonalitet på innsendingstjenester.
Dette betyr at tjenesteeier kan sette opp at som del av arbeidsflyten for utfylling av en innsendingstjeneste skal det signeres en eller flere ganger.

Kravet vil typisk knyttes opp mot en gitt rolle i Altinn for at tjenesteeier skal kunne på en god må definere hvem som må signere en innsending.

Signeringen kan styres av innhold i skjema slik at man f.eks. kan tvinge at revisor signerer i tilfeller hvor et gitt beløp overstiger en grense.
Dette kalles betinget signering.

Altinn støtter også at tjenesteeier definerer deler av skjema som kilde til hvem som skal signere.
Dette kan f.eks. bety at bruker fyller ut informasjon om en person eller organisasjon i skjema og at basert på dette så må disse signere på skjema.
Dette kalles automatisk parallell signering.

Hvis du har ekstra høye krav til sikkerhet kan du kreve at signering skjer med BankID eller Buypass.


### Produkter som tilbys
 - Enkel signering
 - Betinget signering
 - Parallell signering
 - Automatisk parallell signering
 - Nivå 4 signering med BankID og Buypass.

### Hvordan komme i gang?
I utviklingshåndboken er det beskrevet hvordan man setter opp signering på innsendingstjenester.

### Råd og tips
Hvis du har behov for å kunne sende inn via sluttbrukersystem må sikkerhetsnivå settes til nivå 2 for signering.

### Kanaler
 - REST-API
 - Web Services
 - Portal

### Avhengigheter
Signering kan kun brukes sammen med innsendingstjenester.

### Teknisk dokumentasjon
 - Funksjonell spesifikasjon – Sluttbrukerløsningen