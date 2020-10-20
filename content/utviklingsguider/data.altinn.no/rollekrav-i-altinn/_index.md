---
title: Rollekrav i Altinn
linktitle: Rollekrav
description: data.altinn.no bruker funksjonalitet i Altinn for å generere samtykkeforespørsler før data kan utleveres. 
weight: 55
---

## Tjenester i Altinn

Alle samtykkeforespørsler fra data.altinn.no sendes til Altinn i form av en melding med lenke til det faktiske samtykket. For å kunne lese meldingen og gi samtykke eller fullmakt kreves enten rollen [*SISKD/begrenset signeringsrett*](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/begrenset-signeringsrettighet/)
eller direkte delegerte rettigheter til tjenesten *Varsel om samtykkeforespørsel* med tjenestekoder 5132/1  (for eBevis-fullmakter til og med oktober 2020) eller *Forespørsler data-altinn-no * 5615/1 etter det.

Den som må avgi samtykke vil motta en melding i Altinns meldingsboks med lenke til samtykkesiden
se [samtykkeprosessen](/docs/utviklingsguider/data.altinn.no/samtykkeprosessen/) for mer informasjon. 

Denne meldingen krever enten rollen [*SISKD/begrenset signeringsrett*](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/begrenset-signeringsrettighet/)
eller direkte delegerte rettigheter til tjenesten *Varsel om samtykkeforespørsel* med tjenestekoder 5132/1.

Selve samtykket er basert på det som i Altinn kalles en lenketjeneste,
og for å kunne gi samtykke krever det rollen [*SISKD/begrenset signeringsrett*](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/begrenset-signeringsrettighet/)
eller direkte delegerte rettigheter til tjenesten *Restanser hos skatteetaten* med tjenestekoder 5299/1.
I tillegg må man også ha rollen [*Tilgangsstyring*](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/tilgangsstyring/).

Når man mottar melding om fullmaktsforespørsel vil det sendes varsel på epost og SMS til adresser og mottakere definert i Altinn. I tilfeller der samtykke eller fullmakt ikke gis innen rimelig tid, vil også den som ber om fullmakt eller samtykke kunne sende ut purring på sms og e-post.
