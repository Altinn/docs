---
title: Rollekrav i Altinn
linktitle: Rollekrav
description: data.altinn.no bruker funksjonalitet i Altinn for å generere samtykkeforespørsler før data kan utleveres. 
weight: 55
---

### Altinn
Alle samtykkeforespørsler fra tjenester på data.altinn.no sendes til Altinn i form av en melding med lenke til det faktiske samtykket. Man trenger derfor flere rettigheter i Altinn - både til melding og samtykke.
Se [samtykkeprosessen](/docs/utviklingsguider/data.altinn.no/samtykkeprosessen/) for mer informasjon med skjermbilder. 

For at det ikke skal bli unødvendig komplekst er både meldingstjenesten og samtykketjenestene satt opp med krav om rollen [*begrenset signeringsrettighet*](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/begrenset-signeringsrettighet/), men man kan også velge å delegere rettigheter til enkelttjenester.

Når man mottar melding om fullmaktsforespørsel vil det sendes varsel på e-post og SMS til adresser og mottakere definert i Altinn.  

I tilfeller der samtykke eller fullmakt ikke gis innen rimelig tid, vil også den som ber om fullmakt eller samtykke kunne sende ut purring på sms og e-post.

### Meldinger
*Varsel om samtykkeforespørsel* med tjenestekoder 5132/1  (for eBevis-fullmakter til og med oktober 2020) 

*Forespørsler data-altinn-no* 5615/1 etter oktober 2020.

### Samtykke/fullmakt

eBevis til og med oktober 2020: *Restanser hos skatteetaten* 5299/1.

eBevis etter oktober 2020: *Restanser hos Skatteetaten* 5616/1

Søknad om drosjeløyve: *Restanser fra Skatteetaten i søknad om drosjeløyve* 5616/6

**Merk: For å kunne gi disse rettighetene videre ved bruk av samtykke trenger man også rollen [*Tilgangsstyring*](https://www.altinn.no/hjelp/skjema/alle-altinn-roller/tilgangsstyring/).**