---
title: Altinn roadmap
linktitle: Roadmap
description: Overordnet plan for kommende funksjonalitet i Altinn
---

Overordnet roadmap for fremtidig videreutvikling av Altinn.
!["Vei i Brønnøysund"](vei-i-brønnøysund.png)

## 2018 - Q3

### Tjenester 3.0 - "minimum testable product" (MTP)
Det skal over sommeren etableres en test-løsning for utvikling av tjenester, slik at tjenesteutviklere og andre interesserte kan gi fortløpende feedback.  
Løsningen vil videreutvikles smidig og endringer tilgjengeliggjøres fortløpende utover høsten.

[Tjenester 3.0](/docs/altinncore/) vil på sikt erstatte hele [dagens tjenesteutviklingsløsning](/docs/guides/tul/) (TUL).

### :x: *~~Foreslå mest delegerte rettigheter ved delegering av rettigheter~~*
*~~Det skal etableres standard jobb/prosedyre som oppdaterer konfigurasjonen månedlig.  
Dette for at brukerene skal få opp mer relevante forslag om å delegere rettigheter på de tjenestene som er mest vanlig å delegere siste måned.~~* Denne funksjonaliteten vil ikke bli levert

### Endre avsender for SMS-varsel  Leveres i Q4 2018
Det skal etableres løsning for å kunne endre avsender på
[frittstående SMS-varsel](/docs/guides/integrasjon/tjenesteeiere/funksjonelle-scenario/#frittst%C3%A5ende-varsel) fra Altinn.

### Permanent sletting av elementer i organisasjoners papirkurv Leveres i Q4 2018
Det skal etableres en løsning slik at organisasjoner kan tømme egen papirkurv.

### :heavy_check_mark: ~~Lokal rolle som opprettes på juridisk enhet må arves til underenhetene~~
Etablere løsning slik at når en oppretter lokal rolle på juridisk enhet,
så vil rollen også gjelde for tilknyttede underenheter.
Dette ble [levert i release 18.8](/docs/releases/2018/18-8/#lokal-rolle-opprettet-på-juridisk-enhet-skal-også-gjelde-på-underenheter).

### :heavy_check_mark: ~~Økt sikkerhetsnivå på samtykkesiden~~  
Det skal etableres løsning for å kunne anvende [sikkerhetsnivå 4](https://www.altinn.no/hjelp/innlogging/diverse-om-innlogging/hva-er-sikkerhetsniva/)
på [samtykkesiden](/docs/guides/samtykke/sluttbruker/samtykkesiden/).
Dette ble [levert i release 18.8](/docs/releases/2018/18-8/#håndheve-tjenestekrav-til-sikkerhetsnivå-for-samtykke-delegering).

### :heavy_check_mark: ~~Maskering av fødselsnummer for aktører~~
Deler av fødselsnummer skal maskeres når det vises i portalen.
Dette ble [levert i release 18.8](/docs/releases/2018/18-8/#kan-ikke-lenger-se-fødselsnummer-i-lister-over-mine-aktører).


## 2018 - Q4

### "Proffversjon" av innboks
Som proffbruker av Altinn skal det kunne være mulig å tilpasse innboksen slik at den bedre ivaretar behovene, samt legger til rette
for at en skal kunne gjøre fleksible søk på tvers av aktører.

### Ny innlesing av Enhetsregisteret
Følgende skal utføres:

1. Tilpasning/utvidelse av [Enhetsregisteret](https://www.brreg.no/om-oss/oppgavene-vare/alle-registrene-vare/om-enhetsregisteret/) i Altinn
2. Full re-innlesing av Enhetsregisteret i Altinn

### Tilgang for utenlandske brukere - eIDAS
Det skal etableres støtte for [eIDAS](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_func_eidas.html) slik at brukere
fra EU-området med D-nummer i [DSF](https://www.skatteetaten.no/person/folkeregister/om/) kan foreta pålogging i Altinn via ID-Porten.

![CEF logo](cef.png?width=600)

### Nasjonal tjeneste for dokumentasjonsbevis - NADOBE
Det skal etableres en [løsning](/docs/guides/nadobe/) for innhenting, visning og oppbevaring av dokumentasjonsbevis fra leverandør.
![NADOBE](https://www.lucidchart.com/publicSegments/view/f3ce06b1-22a8-4b29-9af4-13dbeb258c83/image.png?width=800)

### Konsolidering av brukere med D-nummer
Det skal etableres en løsning slik at bruker med [D-nummer](https://www.skatteetaten.no/person/utenlandsk/norsk-identitetsnummer/d-nummer/)
som har fått fødselsnummer skal kunne få tilgang til det som lå i innboks/arkiv på D-nummer, og kunne videreføre en skattedialog som ble startet på D-nummer.

### Fjerne basisrollen ALLEA i sin helhet
Det skal etableres løsning slik at det fremgår tydeligere for bruker hvilke tilganger som deles ved en delegering.

### Oppdatering av SharePoint og .NET
SharePoint skal oppdateres til nyere CU, og .NET til siste versjon, i både sluttbrukerløsningen og i tjenesteutviklingsløsningen.  


