---
title: eFormidling
description: Hvordan konfigurere eFormidling integrasjon for en app
toc: true
aliases:
 - /altinn-studio/app-creation/configuration/eformidling
weight: 400
---

## Metadata konfig

## Kjøring med testmiljø lokalt 
Hent ned mockløsningen lokalt for å teste forsendelser med eFormidling:
```cmd
git clone https://github.com/difi/move-mocks.git.
```

Pr d.d. Mars 2021, så er det anbefalt å bruke development branch ettersom det foreligger feil i master branch.
For mer detaljert oppsett se README i repoet: 
https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Common/Altinn.EFormidlingClient/Altinn.EFormidlingClient/README.md

Det er 2 måter å kjøre mock løsningen med integrasjonspunktet lokalt: Integrasjonspunktet kjører seperat som en jar-fil eller så kjører hele løsningen i docker vha docker compose.

•	(Foretrukket metode) Kopier docker compose filen under src/development/EFormidlingMock i Altinn Studio repo (https://github.com/Altinn/altinn-studio/tree/master/src/development), og "integrationpoint" mappen som inneholder konfigurasjon for løsningen. 
Lim inn i roten av  mock-prosjektmappen, slik at det erstatter den gamle docker compose filen. Start docker compose filen ved å kjøre
 ```cmd
docker-compose up
```
•	Start docker compose og kjør integrasjonspunktet som en jar seperat. Integrasjonspunktet kan lastes ned her:https://docs.digdir.no/eformidling_download_ip.html.
Start integrasjonspunktet ved å kjøre:
 ```cmd
java -Dspring.profiles.active=mock -jar integrasjonspunkt-<VERSION>.jar
```
Pass på at denne kjører etter docker-compose up.


<br>
Ved å gå inn på http://localhost:8001/ så kan man se meldinger som er vellykket sent.
Ved å gå inn på  http://localhost:8002/ kan man se på meldingen fra mottaker siden, mao test fag/arkiv system. Denne kan brukes som ende til ende testing for DPO (Digital Post Offentlig) og DPE (Digital Post eInnsyn) for å verifisere forsendelsene.

For å teste at mock-løsningen og integrasjonspunktet fungerer som det skal, naviger til mappen "tests/next-move" og kjør med Node følgende kommando:
 ```cmd
node NextMove.js dpi dpiprint dpe dpf dpv dpo
``` 
Dette vil utføre en komplett test. Bekreft i dashbordet på localhost: 8001 at meldingen(e) ble sendt.
For mer informasjon, se README.md i mock-løsningen (https://github.com/felleslosninger/efm-mocks)