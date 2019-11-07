---
title: "19.11"
description: Feilrettinger.
weight: 20
type: releasenote
releasenote_info: Release 19.11, produksjonssettes 18. november 2019.
---
{{% notice info %}}
Dette er en fremtidig versjon av Altinn. Se [19.10](../19-10) for siste versjon i produksjon.
{{% /notice %}}
***

## Feilrettinger

### Problemer oppstod når en virksomhetsbruker endret brukernavn

Når en virksomhetsbruker endret brukernavnet på profilsidene oppsto det en feil som nå er utbedret.

### Ytelsesforbedringer utført for Download Queue

[Downloadqueue](../../../../../docs/api/tjenesteeiere/soap/grensesnitt/downloadqueue) inneholder operasjoner der tjenesteeier kan hente ned elementer. Analyser viste at det tidvis var treghet og dårligere responstid enn ønsket. Det er derfor utført ytelsesforbedringer. Ytterligere optimalisering vil bli utført med neste release.

### Tjenesteeier APIet gav ut feilknytninger i organisasjonsstruktur for BEDR

Det ble avgitt feil i strukturen (enhetene ble stokket om)  når en bruker hadde tilgang til en bedrift (BEDR) som ikke hadde aktiv juridisk enhet. Dette er nå rettet.
