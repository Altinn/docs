---
title: 19.4
description: Feilrettinger, mindre endringer
weight: 90
type: releasenote
releasenote_info: Release 19.4, produksjonssettes 11. april 2019
---
{{% notice info %}}
Dette er en fremtidig versjon av Altinn. Se [19.3](../19-3) for siste versjon i produksjon.
{{% /notice %}}
***

## Feilretting

### Feil på virksomheter med virksomhetssertifikat

Det var mulig å delegere rettigheter for virksomhet A til en virksomhetsbruker fra en virksomhet B. Dette var mulig fordi det ble gjort en sjekk på om det fantes et forhold mellom virksomhetene A og B som inkluderte klientadministrering og tilgangsstyring. Tilgangsstyring er fjernet fra sjekken, men det er fremdeles mulig å delegere rettigheter til en annens virksomhetsbruker hvis det er delegert klientadministrering til virksomheten.