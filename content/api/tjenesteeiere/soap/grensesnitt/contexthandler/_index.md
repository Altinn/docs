---
title: Context handler
description: Benyttes for å hente ut medadata for elementer.
weight: 800
---

Context handler er en modul i Altinn som tilbyr metadata for elementer i Altinn. Et element kan for eksempel være en innsending fra en sluttbruker.
Meta-data (eller context data som det kalles her) for elementet vil da inneholde informasjon om hvem som er avgiver, hvilke tjeneste elementet er knyttet til og hvilket prosess steg det er i.

Dette er informasjon som benyttes internt i Altinn for å avgjøre om en bruker har tilgang til å utføre en gitt operasjon på et gitt element.
Tjeneste eiere kan bruke informasjonen på tilsvarende måte ved å benytte Altinn sin eksterne autorisasjonssjekk (se eget kapittel om AuthorizationDecisionPointExternal).

### GetReporteeElementContextExternal

Denne operasjonen som tar som input en reporteeelementid og returnerer et objekt med en samling detaljer, meta-data, om elementet.

Tabellen under beskriver datakontrakten for operasjonen. (Merk at det finnes ulike grensesnittrelaterte variasjoner mellom Basic, WS-Security og EC grensesnittene.)

| **Input**                        | **Beskrivelse**                                                                                                                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| reporteeElementId                | Unik identifikator for et spesifikk reportee element                                                                                                                                            |
| **Returverdi**                   | **Beskrivelse**                                                                                                                                                                                 |
| ReporteeElementContextExternalBE | Entitet med meta-data om elementet det ble spurt på. (Flere detaljer under)                                                                                                                     |
|                                  | **ReporteeElementContextExternalBE**                                                                                                                                                            |
| Reportee                         | Unik id for avgiver knyttet til et element. Dette er somregel personnummer eller organisasjonsnummer                                                                                            |
| ServiceCode                      | Tjenestekoden til tjenesten som elementet er knyttet til                                                                                                                                        |
| ServiceEditionCode               | Tjenesteversjonskode til tjenesten som elementet er knyttet til                                                                                                                                 |
| ServiceType                      | Angir hva slags tjeneste elementet er knyttet til. De mest vanlige typene er Correspondence og FormTask. Henholdsvis melding fra etat og innsending fra sluttbruker                             |
| ProcessStepID                    | Dette er en ID som indikerer hva slags prosess steg elementet står i. Dette er mest aktuelt ved innsendinger hvor et element går gjennom for eksempel skrive steg, signeringssteg og innsending |
