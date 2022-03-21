---
title: 22.3
description: Mindre forbedringer og feilrettinger
weight: 180
type: releasenote
releasenote_info: Release 22.3. Produksjonssatt 21. mars
---

**Vi minner også om endringer i [Altinn 3.0.](https://github.com/Altinn/altinn-studio/releases)**

## Endringer i Autorisasjon

### Forbedre ytelse i reporteelist-operasjoner

Flere forskjellige lagrede prosedyrer for uthenting av reportee list er nå konsolidert til en ny prosedyre. 

Resultatet fra denne prosedyre blir cachet og blir benyttet av de forskjellige grensesnittene for å hente ut reportee list. 

I denne omgang treffes kun de “flate” listene. De hierarkiske listene kommer i neste release.

## Endringer i REST

### Utvide sletting av rettigheter i REST API i Altinn2 for å støtte Altinn3-apps

Opprettet nye endepunkter for sletting av AppRights i Altinn 3.0.

### Nytt grensesnitt for AppRights i DelegationsController

Det er laget et nytt REST endepunkt GET {who}/authorization/Delegations/{receiverId}/apprights som returnerer en liste over AppRights for en gitt who gitt til en ReceiverId.

Både rettigheter direkte delegert og gjennom roller returneres her. 

Samtidig er det gjort en oppdatering på GET /authorization/delegations/{rightholderId}. Slik at den inkluderer en lenke til Apprights for de som benytter contenttype hal+json

### Nytt grensesnitt for AppRights i RightsController

Det er laget et nytt REST endepunkt GET {who}/authorization/apprights som returnerer en liste over AppRights for en gitt who gitt til pålogget bruker


## Feilrettinger

### GET /api/serviceowner/authorization/roles returnerer nå også RoleDefintionCode

RoleDefinitionCode vil nå være inkludert i responsen forutsatt at rollen har en RoleDefinitionCode. Lokale roller har f.eks. ikke en slik RoleDefintionCode.

### Teknisk feil i tjenesteeiers arkiv

Fra tjenesteeiers arkiv skal det i utlistingen av innsendinger vises hvilken sluttbrukersystemtype en innsending ble levert inn med.

Måten dette var satt opp kunne føre til teknisk feil. Følgende er endret:

 - Endre overføring av systemid fra en konkatinert streng til en strukturert tabell type int

 - Legge på en distinct på sluttbrukersystem-id slik at man sender inn samme system kun en gang

### Endret Odata filtrering til å fungere for ParentParty

Fordi ParentParty ble lagt inn i resultatsettet etter Odata filtreringen var det ikke mulig å filtrere på denne verdien siden filteret aldri ville få treff. 

Dette ble rettet ved å endre rekkefølge på disse to kallene slik at filtreringen skjer sist og dermed kan filtrere på PArentParty.

### Høyt cpu forbruk 

Prosedyre [Authz].[Role_GetReporteeListByServiceDetails202_SELECT] er optimalisert.

### Får ikke åpnet skjemainnsending når valideringsstatus ikke stemmer med gjeldende prosessteg

Lagt inn kode som setter skjemaet tilbake til utfylling hvis det har fått feil valideringsstatus i databasen i forhold til hva som er tillatt for å gå videre med signering/innsending

### Endre Broker rest API til å gi riktig response kode og file status

Endret Broker Rest API til å returnere kode 201 for opplastet fil, og til å returnere Filestatus som tekst verdi i stedet for tall verdi.




