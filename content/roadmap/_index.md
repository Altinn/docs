---
title: Altinn roadmap
linktitle: Roadmap
description: Overordnet plan for kommende funksjonalitet i Altinn
---

Overordnet roadmap for fremtidig videreutvikling av Altinn.
!["Vei i Brønnøysund"](vei-i-brønnøysund.png)

## 2018 - Q3

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

### :x: *~~Foreslå mest delegerte rettigheter ved delegering av rettigheter~~*
*~~Det skal etableres standard jobb/prosedyre som oppdaterer konfigurasjonen månedlig.  
Dette for at brukerene skal få opp mer relevante forslag om å delegere rettigheter på de tjenestene som er mest vanlig å delegere siste måned.~~* Denne funksjonaliteten vil ikke bli levert

## 2018 - Q4

### :heavy_check_mark: Tilgang for utenlandske brukere - eIDAS
Det skal etableres støtte for [eIDAS](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_func_eidas.html) slik at brukere
fra EU-området med D-nummer i [DSF](https://www.skatteetaten.no/person/folkeregister/om/) kan foreta pålogging i Altinn via ID-Porten. 

![CEF logo](cef.png?width=600)

Denne funksjonen er etablert, men ikke gjort tilgjengelig. En avventer ferdigstilling hos våre samarbeidspartnere før denne endringen gjøres tilgjengelig i produksjonsmiljøet.

### :heavy_check_mark: Permanent sletting av elementer i organisasjoners papirkurv
Det skal etableres en løsning slik at organisasjoner kan tømme egen papirkurv.  
Dette ble [levert i release 18.10](/docs/releases/2018/18-10/#brukere-som-representerer-en-organisasjon-kan-n%C3%A5-permanent-slette-elementer-fra-slettede-i-innboksen).

### Endre avsender for SMS-varsel
Det skal etableres løsning for å kunne endre avsender på
[frittstående SMS-varsel](/docs/guides/integrasjon/tjenesteeiere/funksjonelle-scenario/#frittst%C3%A5ende-varsel) fra Altinn.

### Fjerne basisrollen ALLEA i sin helhet
Det skal etableres løsning slik at det fremgår tydeligere for bruker hvilke tilganger som deles ved en delegering.

### Oppdatering av SharePoint og .NET
SharePoint skal oppdateres til nyere CU, og .NET til siste versjon, i både sluttbrukerløsningen og i tjenesteutviklingsløsningen.  

### Tilby bruker mulighet til å definere "mine favoritt-aktører" for å lette aktørvalg i pålogging
I dag får bruker med mange aktører presentert alle aktører hvor de mest brukte aktørene står øverst. Konseptet "mest brukte aktører" skal fjernes og i stedet vil det tilbys funksjonalitet for å legge til - og fjerne favorittaktører.

### Forbedre logging av tjenesteeiers bruk av løsningen
Det skal etableres bedre logging av tjenesteeiers bruk av løsningen. Dette omfatter bedre oversikt over bruken av blant annet melding-, skjema-, innsyn-, autorisasjon/lenke-, integrasjons- og varslingstjeneste

## 2019 - Q1 

### Ny innlesing av Enhetsregisteret
Følgende skal utføres:

1. Tilpasning/utvidelse av [Enhetsregisteret](https://www.brreg.no/om-oss/oppgavene-vare/alle-registrene-vare/om-enhetsregisteret/) i Altinn
2. Full re-innlesing av Enhetsregisteret i Altinn

### Nasjonal tjeneste for dokumentasjonsbevis - NADOBE
Det skal etableres en [løsning](/docs/guides/nadobe/) for innhenting, visning og oppbevaring av dokumentasjonsbevis fra leverandør.
![NADOBE](https://www.lucidchart.com/publicSegments/view/f3ce06b1-22a8-4b29-9af4-13dbeb258c83/image.png?width=800)

### Konsolidering av brukere med D-nummer
Det skal etableres en løsning slik at bruker med [D-nummer](https://www.skatteetaten.no/person/utenlandsk/norsk-identitetsnummer/d-nummer/)
som har fått fødselsnummer skal kunne få tilgang til det som lå i innboks/arkiv på D-nummer samt kunne videreføre en skattedialog som ble startet på D-nummer.

### Erstatte /api/help med dokumentasjon på Altinndocs
/api/help i REST-APIet skal avvikles. I stedet skal dokumentasjon av REST-APIet legges ut på Altinn Docs. Dette vil blir tilrettelagt gjennom at det skal etableres en offentlig tilgjengelig OpenAPI 3.0-spesifikasjon som blir lagt til grunn for å generere dokumentasjon.

Målsetning med endringen er å oppnå enklere vedlikehold av dokumentasjon av REST-API

### Øke kapasitet på autorisasjonskomponenten
Løsnngen for autorisasjon skal optimaliseres for å til rette for forventet vekst angitt i statsningen for "Helhetlig tilgangsstyring". 

### Altinn skytjenester
Det skal etableres testmiljø i skyen for å kunne teste tjenester utviklet i Altinnstudio. Se nærmere informasjon om Altinnstudio under Q2 2019.

## 2019 - Q2

### Altinn Studio (aka Tjenester 3.0) - "minimum viable product" (MVP)
Det skal etableres en minimumsløsning slik at tjenesteutviklere kan utvikle og produksjonssette enkle tjenester.  
Altinn Studio utvikles smidig og endringer tilgjengeliggjøres fortløpende på https://altinn.studio frem mot MVP.

Både [koden](https://github.com/Altinn/altinn-studio) og [backlog for videreutvikling](https://github.com/Altinn/altinn-studio/issues) ligger åpent på GitHub,
og alle kan [opprette bugs, stille spørsmål eller komme med forslag til forbedringer](https://github.com/Altinn/altinn-studio/issues/new/choose).

Hva vi til enhver tid jobber med vises i oversikten over [milepæler](https://github.com/Altinn/altinn-studio/milestones?direction=asc&sort=due_date&state=open).


## 2019 - Q3

### "Proffversjon" av innboks
Som proffbruker av Altinn skal det kunne være mulig å tilpasse innboksen slik at den bedre ivaretar behovene, samt legger til rette
for at en skal kunne gjøre fleksible søk på tvers av aktører.

### API Management i Altinn
Etablere løsning for API-management basert på tjenesteeiernes, konsumenters og tilbyderes behov.
