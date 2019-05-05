---
title: 19.5
description: Opprettelse av lokal rolle forenklet, mindre endringer, feilrettinger
weight: 80
type: Releasenote
releasenote_info: Release 19.5, produksjonssettes 13. mai 2019
---
{{% notice info %}}
Dette er en fremtidig versjon av Altinn. Se [19.4](../19-4) for siste versjon i produksjon.
{{% /notice %}}
***

## Endringer i Portal

### Forenkle prosessen med opprettelse av lokal rolle som skal inneholde mange rettigheter

Prosessen for å opprette lokal rolle har blitt forbedret. Man har ved denne endringen fjernet rettighetsvisningen hvor man delegerer rettigheter på en og en tjeneste når man oppretter en lokal rolle. Istedenfor blir tjenestene nå lagt til i oversikten under søkeresultatet, og rettighetene kan enkelt styres fra oversikten direkte. Endringen er implementert slik at alle rettighetene man har tilgang til for den gitte tjenesten, vil bli lagt til i rollen.

Steg 1: Velg opprett egendefinert rolle

![] (opprettEgendefinertRolle.png)

Steg 2: Gi rollen et navn og søk opp de tjenester du ønsker å gi tilgang til. Du kan søke på navnet til tjenesten og sortere på etat/tjenesteeier

![] (sokOpp.png)

Steg 3: De tildelte rollene vil legge seg i listen under søkefeltet. Ikonene viser hvilke tilganger som er gitt, og disse kan endres ved å klikke på ikonene.
Man kan bare gi videre tilganger man selv har.

![] (klikkPaaIkoner.png)

Steg 4: Etter delegeringen vil man få opp en kvittering. Klikk tilbake til rolleoversikten for å knytte rollen til mottakeren

![] (rolleOversikten.png)

Steg 5: Klikk på den nye rollen. Den vil nå bli lagt til.

![] (nyRolle.png)

### Implementere nytt tjenestesøkresultatvisning

Implementere nytt tjenestesøkresultatvisning i andre med rettigheter og varsling kun for enkelttjenester
Søkeresultatet for delegering av tjenester under andre med rettigheter og søk i aktive tjenester under varsling kun for enkettjenester har blitt endret. Tjenesteeier for tjenesten vises nå i en ny kolonne i tjenestesøket sammen med navnet på tjenesten. Dette er en endring som kommer som følge av endringen for søkeresultatet i prosessen for opprettelse av lokal rolle.
Under varsling for enkelttjenester er det også lagt til en tekst som sier noe om tjenesten allerede er lagt til eller ikke fra søkeresultatet.

## Diverse bugfix

### Oppretting av lokal rolle basert på direkte delegerte tjenesterettigheter ble ikke laget

En intern bug i autorisasjonskomponenten resulterte i at en bruker ikke fikk laget eller oppdatert en lokal rolle med tjenesterettigheter som var direkte delegert til brukeren. Dette er nå rettet.

### Satt språk til Engelsk for StandAloneNotification response i Soap

Språk i respons er nå Engelsk. Tidligere ble språk på siste varsel brukt.