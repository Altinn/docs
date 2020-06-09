---
title: Altinn Roadmap 2021
linktitle: 2021
description: Overordnet roadmap for videreutvikling av Altinn i 2021.
weight: 10
---

![Vei i Brønnøysund](../vei-i-brønnøysund.jpg)

## Q1 - 2021
### Erstatte /api/help med dokumentasjon på Altinn docs
[altinn.no/api/help](https://www.altinn.no/api/help) for REST-APIet skal avvikles. I stedet skal dokumentasjon av REST-APIet legges ut på Altinn docs.
Dette vil blir tilrettelagt gjennom at det skal etableres en offentlig tilgjengelig [OpenAPI 3.0](https://swagger.io/docs/specification/about/)-spesifikasjon
som blir lagt til grunn for å generere dokumentasjon.

Målsetning med endringen er å oppnå bedre dokumentasjon samt enklere vedlikehold av dokumentasjon av REST-API.

### Publisering av hendelser på REST-API for tjenesteeier 
Det vil bli mulig å hente ut status på meldinger og varsler ved at det i Altinn publiseres en feed for hendelser. Denne feed vil på sikt erstatte dagens SOAP-operasjoner for meldingshistorikk. Dataene i feeden vil i første omgang ha levetid på 30 dager.

### Datakilde kan logge i Altinn at samtykke er benyttet
Det skal etableres løsning der en registrerer at et samtykke er brukt. Det skal i Altinn være mulig få informasjon om at dette er tatt i bruk samt hvilken informasjon som er utlevert.

### Slett data om meg knyttet til gitt samtykke
Det skal etableres løsning for at sluttbruker skal kunne slette data i forbindelse med at et samtykke trekkes. Dette vil registreres i Altinn og varsles datakonsument. Datakonsument er selv ansvarlig for å følge opp anmodning om at data slettes. 

## Q2 - 2021
### Tilgangsstyring i kunde-leverandør forhold
Ofte leier personer/virksomheter inn andre virksomheter til å utføre oppgaver for seg som innebærer bruk av tjenester i Altinn, f eks bistand på HR eller regnskapsføring.

I dagens Altinn delegerer en rettighet/rolle til Leverandørens organisasjonsnummer og nøkkelrolleinnehaver hos leverandør (eks daglig leder). Ofte er det andre ansatte enn daglig leder hos Leverandør som faktisk skal utføre oppgaven for kunden. Det er ingen enkel og oversiktlig måte å kunne delegere dette videre til egne ansatte for Leverandøren. I tillegg er det krevende å følge opp når ansatte hos leverandør skifter jobb.

Det skal etableres en løsning for tilgangstyring mellom Kunde og Leverandør som inkluderer en mer oversiktlig håndtering av tilganger på vegne av kunde. Løsningen vil gjøre det mulig for Leverandør å be Kunde om de tilganger de har behov for. I tillegg skal leverandør kunne administrere disse tilgangene for egne ansatte. 


## Q3 - 2021
### Bytte ut roller med brukerorienterte oppgaver og tilgangsstruktur som begrenser innsyn
Dagens roller i Altinn er forholdsvis store og gir tilgang til mange tjenester. Det skal etableres en rollesturktur hvor det vil bli mulig å gi tilgang avhengig av om mottaker skal ha vide eller mer reduserte fullmakter.


## Q4 - 2021
