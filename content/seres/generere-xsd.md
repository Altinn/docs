---
title: Generere SERESxsd-er
description: Ved generering av en meldingsspesifikasjon (XSD) fra en meldingsmodell i domeneklienten, er det angitt en del parametre med verdier som er tilpasset tjenesteutvikling i Altinn.
weight: 40
---

Hvis det er ønske om å bruke meldingsspesifikasjonen i andre sammenhenger enn Altinn, er det enkelt å justere XSD-parametre ut ifra de behov hver enkelt måtte ha.  I spesielle tilfeller der modellen baserer seg på OR-spesifikke typer som ønskes unike, bør typegjenbruk være avslått for å avsløre avvik.

Endring av tjenesteversjon og filnavn på meldingsspesifikasjonen kan endres av brukeren.

Det er mulig å sette status ved genereringen. Du har mulighet for å velge om denne XSD-en skal karakteriseres med statusverdien «utkast» eller «kandidat» der «utkast» er standardverdi.

**Totalt finnes følgende statusverdier:**

- utkast: De første XSD-variantene som genereres fra en modell før en har sjekket at de inneholder de elementene og har den strukturen de skal.
- kandidat: XSD-en er sjekket, validert og klar for å tas inn i en tjenesteutviklingsløsning, f. eks. Altinn TUL.
- produksjon: XSD-en er tatt i bruk i en løsning, f. eks. Altinn SBL.
- terminert: XSD-en har vært i bruk, men er tatt ut av produksjon eller den er ikke lenger aktuell for å tas inn i en løsning.
- forkastet: XSD-en er ikke noen gang tatt i bruk.

Det er også mulig å sende en meldingsspesifikasjon til andre (eller seg selv) via e-post fra XSD-genereringen.

Etter generering av XSD-en blir den automatisk lastet opp til [SERES Produktforvaltning](https://app.seres.no/forvaltning/).