---
title: Altinn Roadmap 2018
linktitle: 2018
description: Overordnet roadmap for videreutvikling av Altinn i 2018.
weight: 40
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q3 - 2018

### :heavy_check_mark: Tjenester 3.0 - "minimum testable product" (MTP)
Det skal over sommeren etableres en test-løsning for utvikling av tjenester, slik at tjenesteutviklere og andre interesserte kan gi fortløpende feedback og komme med ønsker.  
Løsningen vil videreutvikles smidig og endringer tilgjengeliggjøres fortløpende utover høsten.

[Tjenester 3.0](/docs/altinncore/) vil på sikt erstatte hele [dagens tjenesteutviklingsløsning](/docs/guides/tul/) (TUL).

MTP ble levert 20. september 2018: https://altinn.studio

### :heavy_check_mark: Lokal rolle som opprettes på juridisk enhet må arves til underenhetene
Etablere løsning slik at når en oppretter lokal rolle på juridisk enhet,
så vil rollen også gjelde for tilknyttede underenheter.
Dette ble [levert i release 18.8](/docs/releases/2018/18-8/#lokal-rolle-opprettet-på-juridisk-enhet-skal-også-gjelde-på-underenheter).

### :heavy_check_mark: Økt sikkerhetsnivå på samtykkesiden  
Det skal etableres løsning for å kunne anvende [sikkerhetsnivå 4](https://www.altinn.no/hjelp/innlogging/diverse-om-innlogging/hva-er-sikkerhetsniva/)
på [samtykkesiden](/docs/guides/samtykke/sluttbruker/samtykkesiden/).
Dette ble [levert i release 18.8](/docs/releases/2018/18-8/#håndheve-tjenestekrav-til-sikkerhetsnivå-for-samtykke-delegering).

### :heavy_check_mark: Maskering av fødselsnummer for aktører
Deler av fødselsnummer skal maskeres når det vises i portalen.
Dette ble [levert i release 18.8](/docs/releases/2018/18-8/#kan-ikke-lenger-se-fødselsnummer-i-lister-over-mine-aktører).

### :x: ~~Foreslå mest delegerte rettigheter ved delegering av rettigheter~~
~~Det skal etableres standard jobb/prosedyre som oppdaterer konfigurasjonen månedlig.~~
~~Dette for at brukerene skal få opp mer relevante forslag om å delegere rettigheter på de tjenestene som er mest vanlig å delegere siste måned.~~*  
Denne funksjonaliteten vil ikke bli levert.


## Q4 - 2018

### :heavy_check_mark: Tilgang for utenlandske brukere - eIDAS
Det skal etableres støtte for [eIDAS](https://docs.digdir.no/oidc_func_eidas.html) slik at brukere
fra EU-området med D-nummer i [DSF](https://www.skatteetaten.no/person/folkeregister/om/) kan foreta pålogging i Altinn via ID-Porten. 

![CEF logo](cef.png?width=600)

Denne funksjonen er etablert, men ikke gjort tilgjengelig. En avventer ferdigstilling hos våre samarbeidspartnere før denne endringen gjøres tilgjengelig i produksjonsmiljøet.

### :heavy_check_mark: Permanent sletting av elementer i organisasjoners papirkurv
Det skal etableres en løsning slik at organisasjoner kan tømme egen papirkurv.  
Dette ble [levert i release 18.10](/docs/releases/2018/18-10/#brukere-som-representerer-en-organisasjon-kan-n%C3%A5-permanent-slette-elementer-fra-slettede-i-innboksen).

### :heavy_check_mark: Endre avsender for SMS-varsel
Det skal etableres løsning for å kunne endre avsender på
[frittstående SMS-varsel](/docs/guides/integrasjon/tjenesteeiere/funksjonelle-scenario/#frittst%C3%A5ende-varsel) fra Altinn.
Dette ble [levert i release 18.11](/docs/releases/2018/18-11/#mulighet-for-tjenesteeier-%C3%A5-st%C3%A5-som-avsender-av-sms-standalone-varslinger).

### :heavy_check_mark: Fjerne basisrollen ALLEA i sin helhet
Det skal etableres løsning slik at det fremgår tydeligere for bruker hvilke tilganger som deles ved en delegering.
Dette ble [levert i release 18.11](/docs/releases/2018/18-11/#rydde-opp-i-databasen-rundt-allea).

### :heavy_check_mark: Oppdatering av SharePoint og .NET
SharePoint skal oppdateres til nyere CU, og .NET til siste versjon i både sluttbrukerløsningen og i tjenesteutviklingsløsningen. 
Oppdateringene er utført i produksjon: i tjenesteutviklingsløsningen hhv 31. oktober og 6. november og i sluttbrukerløsningen hhv 21. og 22. november 2018

