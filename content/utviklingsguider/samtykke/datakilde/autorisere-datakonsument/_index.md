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
data via tjenesten må registreres i rettighetsregisteret. Dette gjøres
ved å benytte webservice `RegisterSRRAgencyExternal`

https://www.altinn.no/RegisterExternal/RegisterSRRAgencyExternalBasic.svc?wsdl

og operasjonen `AddRights`. 

En detaljert beskrivelse av dette finnes [her](../test-tjeneste/#registrere-en-datakonsument-i-tjenesteeierstyrt-rettighetsregister).
*Merk at beskrivelsen der er for testmiljø. Ovennevnte
url benyttes for produksjonsmiljøet*.  

For å bruke Altinn sine
webservices må man ha en etatsbruker og passord. Har man ikke dette kan
det bestilles gjennom selvbetjeningsportalen til Altinn eller til
[*tjenesteeier@altinn.no*](mailto:tjenesteeier@altinn.no).

Det finnes også en operasjon for å liste ut gitte rettigheter samt slette rettigheter.  