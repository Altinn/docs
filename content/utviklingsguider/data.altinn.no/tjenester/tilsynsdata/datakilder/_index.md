---
title: Dataprodusent-api
description: Standardisering av bakenforliggende apier
weight: 100
---


{{% notice note %}}
Under arbeid!
{{% /notice %}}


### Generelt
Siden det er potensielt ganske mange bakenforliggende datakilder må alle produsent-api-ene følge oppsett og struktur som angitt i prosjektdokumentasjonen.

### API


#### Definerte datasettnavn:
* tilsyn  - brukes for å bygge TildaTilsynsrapport
* trend  - TildaTrendrapport
* koordinering - TildaTilsynskoordinering
* npdid - TildaNPDID

Kallene som går ut fra data.altinn.no vil bygges opp vha følgende mal: 

```
{baseurl}/{datasettnavn}/{organisasjonsnummer}?{parametre}
```
#### Definerte parametre:
* requestor - fast parameter med organisasjonsnummer til spørrende tilsynsmyndighet
* fromDate - filtrere med startdato, valgfri
* toDate - filtrere med sluttdato, valgfri
* npdid - filtrere på npdid, valgfri
  

Eksempel:

```
GET
https://api.bestetilsynsmyndighet.no/trend/911951657/?requestor=998997801&fromDate=2021-01-20T00:00:00.000Z&toDate=2021-01-20T00:00:00.000Z&npdid=3432
```

### Maskinporten
Alle bakenforliggende api-er skal kreve scopet brreg:tilda for tilgang i tillegg til standard validering.
### Feilkoder
 For mer informasjon om feilkodene i data.altinn.no, se [her.](/docs/utviklingsguider/data.altinn.no/bruke-rest-api/#feil--og-statuskoder)

### Nedetid
Varsling om lengre nedetid gjøres til forvaltningsansvarlig.

