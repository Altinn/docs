---
title: "19.10"
description: Endringer i autorisasjon, portal og feilrettinger.
weight: 30
type: releasenote
releasenote_info: Release 19.10, produksjonssatt 21. oktober 2019.
---

## Endringer i autorisasjon

### Delegerings-vindu prioriterer nå delegering av enkelttjeneste

Når en forsøker å gi tilgang til en tjeneste blir enkeltjeneste-delegering nå foreslått først (fremfor rolledelegering) uansett tjenestetype. Dette blir gjort for å unngå at det uforvarende blir gitt rettighet til mer enn tenkt siden en rolle inneholder flere rettigheter.

![Denne siden kommer alltid opp først](for.png "Denne siden kommer alltid opp først")

![Hvis lenken Alternativ tildeling: Velg å gi rollene som tjenesten krever velges](Etter.png "Velges lenken Alternativ tildeling: Velg å gi rollene som tjenesten krever vises denne siden")

## Endringer i portal

### Tilgangsforespørsel er nå mulig i portalen

Hvis man starter en tjeneste uten at man har nødvendig rettighet vil man nå bli spurt om man ønsker å be om rettighet for tjenesten. Den som har rettigheten kan se og behandle disse tilgangsforespørslene.

![Brukeren blir spurt om han/hun ønsker å be om rettighet](BeOmTilgang1.png "Brukeren blir spurt om han/hun ønsker å be om rettighet")

![Brukeren har valgt Be om rettighet](BeOmTilgang2.png "Brukeren har valgt Be om rettighet")

![Brukeren har valgt Be om tilgang](BeOmTilgang3.png "Brukeren har valgt Be om tilgang")

Når en person som har rollen "tilgangsstyring" logger på vises dette:

![Vedkommende ser at det foreligger ønske om tilgang](BeOmTilgang4.png "Vedkommende ser at det foreligger ønske om tilgang")

![Vedkommende velger Andre med rettighet til virksomheten](BeOmTilgang5.png "Vedkommende velger Andre med rettighet til virksomheten")

![Tilgang kan nå innvilges eller avslås](BeOmTilgang6.png "Tilgang kan nå innvilges eller avslås")

## Feilrettinger

### Feilmelding på InformationPointSI når LocalProxy var avslått

Dersom LocalProxy/WCF-bypass løsningen ble slått av fikk man tidligere feilmelding. Dette er nå rettet.

### Ikke mulig å gjenopprette slettet element fra papirkurv

Tidligere så var det krav om at man måtte ha rettigheten ArchiveDelete for å få lov til å gjenopprette et skjema som var slettet, men ikke permanent slettet. Dette er nå endret til at rettighetskravet er ArchiveRead.

### Visningsfeil ved bruk av "IPad" visning

Her var det feil visning to steder. Den første var under valg av tjenester for varsling under “Din kontaktinformasjon for virksomheten” hvor to grønne pop-up bokser var over hverandre. Den andre feilen var under “valg av tjenester for delegering under delegering av tjenesterettigheter og ved opprettelse av lokal rolle” hvor søkeresultatet går ut av skjermen på høyreside. Dette er nå rettet.
