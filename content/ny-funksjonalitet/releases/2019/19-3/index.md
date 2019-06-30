---
title: 19.3
description: Favorittliste over aktører, hendelse-feed for status på meldinger, mindre endringer, feilrettinger i skattemeldingen og andre feilrettinger
weight: 100
type: releasenote
releasenote_info: Release 19.3, produksjonssatt 11. mars 2019
---

## Endringer i Portal

### Søk på brukernavn i tjenesteeiers arkiv

Tidligere fikk man feilen "server error" hvis man forsøkte å søke på brukernavn.
Dette er nå rettet opp slik at søk på brukernavn i tjenesteeiers arkiv fungerer som forventet.

### Sletting av delegering på enkeltelement (rettigheter gitt til enkeltskjema og meldinger) skal vises i aktivitetsloggen for elementet

Logginnslagene vises nå som “Tilgang fjernet” i aktivitetsloggen for elementet.

![Eksempel på aktivitetslogg](delegert.png "Aktivitetslogg")

### Mulighet for opprettelse av favorittliste

Dette er en større endring i portalen der man nå kan ha en liste over favoritter (avgivere). Slik kan man enklere nå de avgiverne man er mest interessert i.
Det store aktørvalget viser nå en oversikt over alle tilgjengelige aktører sortert i alfabetisk rekkefølge hvor innlogget bruker alltid havner øverst i listen.

I listen med alle aktører er det nå lagt inn en favorittliste som lister alle aktører som er valgt som favoritt.
Ved å klikke på stjernen helt til høyre på aktørkortet vil favoritten bli lagt til i favorittlisten med en gang.

Søkefunksjonen er også oppdatert til å filtrere favorittlisten samtidig som den komplette aktørlisten.
Endringen gjelder også for det lille aktørvinduet.

![Stort aktørvalg med det nye favorittfeltet](favoritter.png "Stort aktørvalg med det nye favorittfeltet")

## Endringer i REST API

### Lagt inn hendelse-feed for status på meldinger i tjenesteeier API

Dette er en ny liste med status på meldinger som er laget for en tjenesteeier.
For hver melding som opprettes, arkiveres, leses eller slettes lagres det en hendelse.
Det lages også hendelser hvis en melding oppretter ett varsel, og når ett varsel sendes.

En tjenesteeier kan gjøre oppslag mot disse hendelsene i REST API ved å gå til altinn.no/api/serviceowner/events/feed.
For å styre uttrekket kan det angis to parametere; eventOffset og fetch. - eventOffset angir id for hvilken
hendelse uttrekket skal starte fra (utrekket vil ikke inneholde hendelsen som angis i eventOffset) - fetch angir antall hendelser som skal returneres.

Hvis ingen parametere settes starter uttrekket fra første hendelse og returnerer opp til 10000 elementer.
Det er ikke mulig å hente ut flere enn 10000 elementer i ett uttrekk.

## Feilrettinger

### Endret validering av filendelse på vedlegg til å være mer presis i API

Endringen som er utført påvirker validering av filer som lastes opp på en tjeneste med regler knyttet til vedlegg. Vedleggsregler kan ha krav til filtype og det er validering av dette som nå er blitt gjort mer presist. I praksis betyr endringen at vedlegg i større grad må ha filendelse og denne må stemme bedre med kravene til vedleggsregelen.

Eksempler på hva valideringen tillot tidligere, men nå vil avvise:
(Filtyperegel: *.pdf, *.txt")

- vedlegg.pd - Det var tidligere nok å ha deler av filendelsen.
- vedlegg - Det var mulig å laste opp filer uten filendelse.
- vedlegg.x - Annet eksempel på første punkt.

**Endringen påvirker følgende operasjoner:**

| Tjeneste                                  | Operasjon                     |
| ----------------------------------------- | ----------------------------- |
| IntermediaryInboundBasic.svc              | SubmitFormTaskBasic           |
| IntermediaryInbound.svc                   | SubmitFormTask                |
| IntermediaryInboundExternalEC.svc         | SubmitFormTaskEC              |
| IntermediaryInboundBasicStreamed.svc      | SubmitAttachmentStreamedBasic |
| IntermediaryInboundStreamed.svc           | SubmitAttachmentStreamed      |
| IntermediaryInboundExternalECStreamed.svc | SubmitAttachmentStreamedEC    |

### Slettede varslingsadresser lå som en del av responsen i REST API

Varslingsadresser merket som slettet ble ikke skjult i REST API for tjenesteeier. Dette er løst ved at koden nå filtrerer bort disse. I tillegg henter nå koden adresser fra KoFuVi data.

### Personer kunne lese personlige dokumenter for en som hadde rettighet til å representere organisasjonen i REST APIet

Det er nå lagt inn en sjekk som stopper denne muligheten.

## Feilrettinger i skattemeldingen

### Feil lenke til norge.no i hjelpetekst til skjemaet "Skattemelding for formue- og inntektsskatt – personlig næringsdrivende mv RF-1030"

Link til nynorsk versjon av Norge.no var feil i hjelpetekst på post 1.5.7 i RF-1030.
Rettet ved å endre lenke slik at den nå peker til riktig nettsted.

### Uønsket advarsel returnert av SBS for nye felter til markedsverdi boligverdi

Med komplett innsending av "Skattemelding for formue- og inntektsskatt – personlig næringsdrivende mv RF-1030" via SBS får man opp advarsel på to nye felter for markedsverdi boligverdi. Dette er nå blitt rettet opp.

### Skjema "Kontonummerendring RF-1030-A" for 2017 dukker fortsatt opp i listen over årets skattedokumenter

Meldingstjenesten dukket fortsatt opp i listen over årets skattedokumenter, selv om denne meldingstjenesten ikke lenger brukes i Altinn.
Dette er rettet ved å fjerne kode som hentet siste års instanser av RF-1030A.

### Lenke til “Endre kontonummer/utbetalingsmåte” i skattemeldingen (PSA) må åpnes i egen fane

Om man trykket på lenken «Endre kontonummer/utbetalingsmåte» i menyen ble denne feilaktig åpnet i samme vindu.
Rettet ved å åpne lenken i nytt vindu.

### Videresending til "Endre kontonummer/utbetalingsmåte" i Skattemeldingens (PSA) meny er nå på samme målform som den som er valgt i Altinn

Hvis man hadde valgt engelsk som språk i Altinn ble siden for "Endre kontonummer/betalingsmåte på bokmål" åpnet.
Rettet ved å legge inn støtte for videresending til side med samme målform som den som er valgt i Altinn.