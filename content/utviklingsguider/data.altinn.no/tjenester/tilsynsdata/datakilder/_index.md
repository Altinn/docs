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
* tilsyn  - TildaTilsynsrapport og TildaTilsynsrapportAlle
* trend  - TildaTrendrapport og og TildaTrendrapportAlle
* koordinering - TildaTilsynskoordinering og TildaTilsynskoordineringAlle
* npdid - TildaNPDID

Responsformatene for feks TildaTilsynsrapport og TildaTilsynsrapportAlle er i praksis de samme, men "Alle" returnerer mange innslag fra én tilsynsmyndighet i stedet for mange.

Kallene som går ut fra data.altinn.no vil bygges opp vha følgende mal: 
```
{baseurl}/{datasettnavn}/{organisasjonsnummer}?{parametre}
```

Kallene som går ut fra data.altinn.no for å hente samtlige innslag i ett datasett fra ett spesifikt tilsyn (-Alle):
```
{baseurl}/{datasettnavn}?{parametre}
```

#### Definerte parametre:
* requestor - fast parameter med organisasjonsnummer til spørrende tilsynsmyndighet
* fromDate - filtrere med startdato, valgfri
* toDate - filtrere med sluttdato, valgfri
* npdid - filtrere på npdid, valgfri
* filter - filtrering på type tilsyn eller tilsynsobjekt (bare for "Alle"-datasettene)
  

Eksempel:

```
GET
https://api.bestetilsynsmyndighet.no/trend/911951657/?requestor=998997801&fromDate=2021-01-20T00:00:00.000Z&toDate=2021-01-20T00:00:00.000Z&npdid=3432&filter=kommunalt
```

### Maskinporten
Alle bakenforliggende api-er skal kreve scopet brreg:tilda for tilgang i tillegg til standard validering.
### Feilkoder
 For mer informasjon om feilkodene i data.altinn.no, se [her.](/docs/utviklingsguider/data.altinn.no/bruke-rest-api/#feil--og-statuskoder)

### Nedetid
Varsling om lengre nedetid gjøres til forvaltningsansvarlig.

