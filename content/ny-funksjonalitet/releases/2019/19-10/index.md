---
title: "19.10"
description: Endringer i autorisasjon, feilrettinger.
weight: 30
type: releasenote
releasenote_info: Release 19.10, produksjonssettes 21. oktober 2019.
---
{{% notice info %}}
Dette er en fremtidig versjon av Altinn. Se [19.9](../19-9) for siste versjon i produksjon.
{{% /notice %}}
***

## Endringer i autorisasjon

### E-post utsending etter delegering endret

Nå vil epost først sendes ut etter at alle delegeringer er blitt gjennomført og godkjent. Når man skal delegere til flere personer sendes epost ut bare hvis alle delegeringene går igjennom.

### Delegerings-vindu prioriterer nå delegering av enkelttjeneste

Når en forsøker å gi tilgang til en tjeneste blir enkeltjeneste-delegering nå foreslått først (fremfor rolledelegering) uansett tjenestetype.

![Denne siden kommer alltid opp først](for.png "Denne siden kommer alltid opp først")

![Hvis lenken "Alternativ tildeling: Velg å gi rollene som tjenesten krever" velges](Etter.png "Hvis lenken "Alternativ tildeling: Velg å gi rollene som tjenesten krever" velges")

## Endringer i Portalen

### Tilgangsforespørsel i portalen

Man kan nå etter 19.9 og 19.10 versjonen av altinn be og behandle tilgangsforespørsler. Hvis man ikke har tilgang til en tjeneste vil man bli spurt om man ønsker å be om rettighet:

![Brukeren blir spurt om rettighet til tjenesten ønskes](BeOmTilgang1.png "Brukeren blir spurt om rettighet til tjenesten ønskes")

![Brukeren har valgt "Be om rettighet"](BeOmTilgang2.png "Brukeren har valgt "Be om rettighet"")

![Brukeren har valgt "Be om tilgang"](BeOmTilgang3.png "Brukeren har valgt "Be om tilgang"")


Når en som har rollen "tilgangsstyring" logger på vises dette:


![Vedkommende ser at det foreligger ønske om tilgang](BeOmTilgang4.png"Vedkommende ser at det foreligger ønske om tilgang")

![Vedkommende velger "Andre med rettighet til virksomneten"](BeOmTilgang5.png "Vedkommende velger "Andre med rettighet til virksomneten"")

![Tilgang kan nå invilges eller avslås](BeOmTilgang6.png "Tilgang kan nå invilges eller avslås")


## Feilrettinger

### Ikke mulig å gjenopprette slettet element fra papirkurv

Tidligere så var det krav om at man måtte ha rettigheten ArchiveDelete for å få lov til å gjenopprette et skjema som var slettet, men ikke permanent slettet. Dette er nå endret til at rettighetskravet er ArchiveRead.

### Visningsfeil ved bruk av "IPad" visning

Det var feil visning 2 steder. Den første var under valg av tjenester for varsling under “Din kontaktinformasjon for virksomheten” hvor 2 grønne pop-up bokser var over hverandre. Den andre feilen var under “valg av tjenester for delegering under delegering av tjenesterettigheter og ved opprettelse av lokal rolle” hvor søkeresultatet går ut av skjermen på høyreside. Dette er nå rettet.

