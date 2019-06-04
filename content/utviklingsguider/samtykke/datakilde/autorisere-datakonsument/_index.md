---
title: Autorisere datakonsument
description: Autorisere opp datakonsument ved registrering i tjenesteeierstyrt register
weight: 320
---

## Autorisere datakonsument ved registrering i tjenesteeierstyrt register

På tjenesteutgaven som er opprettet i TUL må det 
være angitt at tjenesten skal bruke tjenesteeierstyrt
rettighetsregister. Datakonsumenter (organisasjoner eller personer) som skal få hente ut
data via tjenesten må registreres i rettighetsregisteret. Registeret er tilgjengelig både gjennom Altinn sine REST og SOAP webservices. 

En detaljert beskrivelse med eksempler for å komme i gang med registeret finner du [her](../test-tjeneste/#registrere-en-datakonsument-i-tjenesteeierstyrt-rettighetsregister).
*Merk at beskrivelsen der er for testmiljø*.  

For å bruke Altinn sine webservices må man ha en etatsbruker og passord. Har man ikke dette kan
det bestilles gjennom selvbetjeningsportalen til Altinn eller til
[*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no).

For å komme i gang med REST grensesnittet for tjenesteeiere må man ha ett virksomhetssertifikat samt API-nøkkel med [nødvendig tilgang] (../../../../api/tjenesteeiere/rest/).