---
title: Autorisere datakonsument
description: Autorisere opp datakonsument ved registrering i tjenesteeierstyrt register
weight: 320
aliases:
 - /guides/samtykke/datakilde/autorisere-datakonsument/
---

## Autorisere datakonsument ved registrering i tjenesteeierstyrt register

På tjenesteutgaven som er opprettet i TUL må det 
være angitt at tjenesten skal bruke tjenesteeierstyrt
rettighetsregister. Datakonsumenter (organisasjoner eller personer) som skal få hente ut
data via tjenesten må registreres i rettighetsregisteret. Registeret er tilgjengelig både gjennom Altinn sine REST og SOAP webservices. 

* [Les mer om bruk av tjenesteeierstyrt rettighetsregister i samtykketjenester](../test-tjeneste/#registrere-en-datakonsument-i-tjenesteeierstyrt-rettighetsregister). 

For å bruke Altinn sine API-er som tjenesteeier må man ha en etatsbruker og passord. Har man ikke dette kan
det bestilles gjennom selvbetjeningsportalen til Altinn eller til
[*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no).

For å komme i gang med REST grensesnittet for tjenesteeiere må man ha ett virksomhetssertifikat samt API-nøkkel med [nødvendig tilgang](../../../../api/tjenesteeiere/rest/).