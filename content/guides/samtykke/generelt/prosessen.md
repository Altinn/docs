---
title: Samtykkeprosessen
description: Beskrivelse av samtykkeprosessen ved bruk av Self-contained OAuth 2.0 token
weight: 10
---

### Beskrivelse av samtykkeprosessen ved bruk av ”Self-contained OAuth 2.0 token”

Self-contained OAuth-token betyr at tokenet i seg selv inneholder all informasjon om rettigheten(e) som er blitt delegert fra sluttbruker til datakonsumenten.

Figuren under viser prosessen med bruk av self-contained OAuth token i et lånesøknads case hvor en bank er datakonsumenten og Skatteetaten er datakilden:  

{{< figure src="/docs/images/guides/samtykke/figur1.jpg" title="Prosess" >}}


 1. Lånesøker går inn på bankens nettside for å søke om lån.
 2. Lånesøker bekrefter i søknadsprosessen at han ønsker å gi banken samtykke til å innhente ligningsopplysninger og blir sendt til Altinn for å gi samtykke.
 3. Lånesøker logger inn i Altinn og gir samtykke. Altinn registrerer samtykket og delegerer rettighet.
 4. Rettighetsdelegering er utført og det sendes en autorisasjonskode tilbake.
 5. Lånesøker sendes tilbake til siden som er angitt av banken i redirect-Url. I Url sendes autorisasjonskoden samt en status som forteller om samtykke ble gitt.
 6. Autorisasjonskoden benyttes av banken mot Altinn for å få tak i Altinn-signert self-contained OAuth token.
 7. Altinn sender signert token til banken.
 8. Banken benytter signert token mot Skatteetaten
 9. Tokenet verifiseres av Skatteetaten for å sjekke at innhold stemmer med ønsket utført operasjon og data returneres til banken.
