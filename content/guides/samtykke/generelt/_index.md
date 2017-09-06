---
title: Generelt
description: Generelt om samtykkeløsningen i Altinn
weight: 100
---

### Om samtykkeløsningen
Gjennom samtykkeløsningen i Altinn kan brukeren gi samtykke til at en tredjepart, en datakonsument, får midlertidig innsynsrett på et spesifikt sett
med opplysninger om brukeren. Dette kan for eksempel være ligningsdata fra Skatteetaten.
Med brukerens samtykke vil datakonsumenten bli tildelt en tidsbegrenset lese-rettighet for en eller flere definerte ressurser representert ved tjenester i Altinn.

Samtykkeløsningen er etablert slik at datakilde (tjenesteier) har stor fleksibiltet i hvordan data skal tilbys til datakonsument.
Data kan gå via Altinn eller utenom Altinn slik at data kan tilbys via forskjellige formater og grensesnitt. 
Felles for flytene er at sluttbruker blir presentert samtykkesiden i Altinn hvor sluttbruker kan velge å samtykke til tilgangen. 

*Her beskrives bruk av samtykkeløsningen med dataflyt direkte mellom datakilde og datakonsument med bruk av self-contained OAuth 2.0 token utstedt av Altinn.*
Tokenet, som blir signert med Altinns sertifikat, inneholder all informasjon knyttet til de delegerte rettighetene og
benyttes av datakonsument mot datakilde slik at datakilde kan verifisere  at innholdet er pålitelig.
  

### Målgruppe
Målgruppen for denne dokumentasjonen er datakilder og datakonsumenter som skal ta i bruk samtykkeløsningen hvor selve dataflyten skal gå direkte
mellom partene og hvor Altinn benyttes til tilgangskontroll.