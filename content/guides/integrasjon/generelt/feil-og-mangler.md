---
title: Kjente feil og mangler
description: Kjente feil og funksjonalitet som ikke ennå er implementert i REST-apiet
weight: 10
---



### Kjente feil
  - Ved uthenting av delegerte roller og rettigheter, vil man ikke kunne hente roller og rettigheter samlet ved hjelp av /api/{who}/authorization/delegations/{receiverid}
 for mer enn de første 50 innslagene i /api/{who}/authorization/delegations
 - Sluttbruker-api-et gir ikke feilmelding ved innsending av mer enn ett hovedskjema per forsendelse
 - Utveksling av authorization code i jwt krever feilaktig at apikey har tilgang til autorisasjonsressursen. Dette rettes i K4 2017.

 

### Mangler
- Det er ikke mulig å slette meldinger sendt til organisasjoner (verken i portal eller api)
- Det er ikke mulig å generere lesebekreftelse på meldinger
- Det er ikke mulig å arkivere meldinger (correspondence) i REST-apiet
- Metadata-ressursen lister ikke ut tjenester som ikke lenger er aktive, så det er ikke mulig å hente metadata for utgåtte tjenester som ligger i meldingsboks eller arkiv
- Virksomhetsbruker har ikke lesetilgang på tjenester som ikke er definert til å kunne sendes inn med virksomhetsbruker, selv om roller og delegeringer er utført (gjelder både REST og webservices)
- Det mangler createddatetime på messages

{{< figure src="/docs/images/guides/api/rickroll.gif" title="Never gonna give you up!" >}}

