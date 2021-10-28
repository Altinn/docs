---
title: Autorisere datakonsument
description: Autorisere opp datakonsument ved registrering i tjenesteeierstyrt register
weight: 320
aliases:
 - /guides/samtykke/datakilde/autorisere-datakonsument/
---

# Autorisere datakonsument ved registrering i tjenesteeierstyrt register

På tjenesteutgaven som er opprettet i TUL kan det  være angitt at tjenesten skal bruke tjenesteeierstyrt rettighetsregister. Hvis dette er oppgitt, må datakonsumenter (organisasjoner eller personer) som skal få hente ut samtykketokens via tjenesten registreres i rettighetsregisteret. Registeret er tilgjengelig både gjennom Altinn sine REST og SOAP webservices. 

{{% notice warning  %}}
Merk at hvis tjenesteeierstyrt rettighetsregister ikke benyttes, vil alle med en API-nøkkel hos Altinn kunne be om og få innfridd samtykke for den aktuelle tjenesten og utgaven, og dermed kunne hente ut samtykketoken. Hvis da endepunktet hvor datahøsten utføres ikke har sin egen autorisasjon av konsument (f.eks. via Maskinporten) vil dette kunne medføre at urettmessige parter får tilgang til de data som tilbys på endepunktet.
{{% /notice %}}

* [Les mer om bruk av tjenesteeierstyrt rettighetsregister i samtykketjenester](../test-tjeneste/#registrere-en-datakonsument-i-tjenesteeierstyrt-rettighetsregister). 

For å bruke Altinn sine API-er som tjenesteeier må man ha en etatsbruker og passord. Har man ikke dette kan det bestilles gjennom selvbetjeningsportalen til Altinn eller til [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no).

For å komme i gang med REST grensesnittet for tjenesteeiere må man ha ett virksomhetssertifikat samt API-nøkkel med [nødvendig tilgang](../../../../api/tjenesteeiere/rest/).
