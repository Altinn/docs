---
title: Test av app lokalt
linktitle: Lokalt
description: Beskrivelse av hvordan test av app lokalt på egen maskin kan gjøres
weight: 100
---

Dersom man skal skrive en del kode (f.eks. [logikk](../../app-creation/logic)), eller kjapt sjekke hvordan skjema ser ut kan det være nytting å kunne teste endringer uten å måtte deploye hele appen til testmiljø.

Når appen lages, kommer den med alle nødvendige filer og oppsett til å kunne kjøres som en frittstående applikasjon. Ved å laste ned alle filene knyttet til appen fra repoet til appen, kan man kjøre
appen lokalt på egen maskin, og på den måten enkelt teste endringer.

I testmiljø bruker appen et sett med plattform-tjenester for å kunne hente ut/lagre data osv. Det er opprettet en forenklet versjon av disse tjenestene som kan settes opp og kjøres lokalt, og dette er 
nødvendig for at appen skal kunne testes lokalt. 

## Kjøre appen lokalt

1. Naviger til app repoet i Altinn Studio. Se [her](../../app-creation/navigation) for hvordan man navigerer seg dit.
2. Last ned alle filene i repoet
  - ved å bruke `git clone` kommandoen [(les mer)](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
  - ved å trykke på nedlastingsikonet (da lastes det ned som en zip-fil)


Se [Altinn Studio på Github](https://github.com/Altinn/altinn-studio/blob/master/LOCALAPP.md) for informasjon om hvordan man laster ned
og kjører den lokale plattformen,og hvordan man kjører appen.

{{% children description="true" %}}