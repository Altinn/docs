---
title: Rollekrav i Altinn
linktitle: Rollekrav i Altinn
weight: 55
---

## Tjenester i Altinn
data.altinn.no bruker funksjonalitet i Altinn for å generere samtykkeforespørsler før data kan utleveres. 

Per nå er det bare én beviskode som krever samtykke - Arrears/CRITERION.EXCLUSION.CONTRIBUTIONS.PAYMENT_OF_TAXES - restanser hos Skatteetaten. 

Den som må avgi samtykke vil motta en melding i Altinns meldingsboks med lenke til samtykkesiden se [samtykkeprosessen](/docs/utviklingsguider/ebevis/samtykkeprosessen/) for mer informasjon. 

Denne meldingen krever enten rollen [*SISKD/begrenset signeringsrett*](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/begrenset-signeringsrettighet/) eller direkte delegerte rettigheter til tjenesten *Varsel om samtykkeforespørsel* med tjenestekoder 5132/1.

Selve samtykket er basert på det som i Altinn kalles en lenketjeneste, og for å kunne gi samtykke krever det rollen [*SISKD/begrenset signeringsrett*](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/begrenset-signeringsrettighet/) eller direkte delegerte rettigheter til tjenesten *Restanser hos skatteetaten* med tjenestekoder 5299/1. I tillegg må man også ha rollen [*Tilgangsstyring*](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/tilgangsstyring/).

Når man mottar melding om fullmaktsforespørsel vil det sendes varsel på epost og SMS til adresser og mottakere definert i Altinn.
