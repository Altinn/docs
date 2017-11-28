---
title: Innføring i xml
description: Helt grunnleggende innføring i XML. Både regelfiler og skjemadata i Altinn lagres som XML.
weight: 90
---


Xml er et format for å sette opp data på en måte som både menneske og maskin skal kunne lese. Formatet har som mål å
være enkelt, generelt og kunne brukes på tvers av plattformer og språk.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Brev>
  <Til>Tove</Til>
  <Fra>Ole</Fra>
  <Tittel>Husk møtet</Tittel>
  <Innhold>Husk møtet klokka 16!</Innhold>
</Brev>
```

Xml er basert på tekst, og bruker spesiell kode for å strukturere data. Det er viktig å merke seg at xml består av to
hoveddeler, tekst som representerer data og tekst som er brukt til å strukturere data («markup»). Tekst som blir brukt
til å strukturere data starter med tegnet `<` og blir avsluttet med tegnet `>`.

**Tag** er en markør som starter med `<` og slutter med `>`. Den finnes i tre varianter: Start-tag `<seksjon>`,
slutt-tag `</seksjon>` og tomt element `<seksjon />`.

**Element/Node** er en logisk del av xml-en som starter med en start-tag og slutter med en slutt-tag, eller bare er en
tom tag. Teksten mellom start-tagen og slutt-tagen er innholdet i elementet.

```xml
<Til>Tove</Til>
```

**Attributt** er egenskaper som kan legges til en tag. Disse kan bare legges inne i en start-tag eller en tom
element-tag. Attributt består av to deler, nemlig navn og verdi. Eksempelet under har lagt til to attributt, `sendedato`
og `mottaksdato`, til elementet `Brev`. Verdien må alltid stå inne i hermetegn (enkle eller doble).

```xml
<Brev sendedato="23.10.2013" mottaksdato="25.10.2013">
```

**Xml-deklarasjon** er et spesialelement som skal stå i starten av dokumentet. Dette er brukt til å fortelle at dette er
et xml-dokument, samt hvilken versjon og tegnkoding det bruker. I de fleste tilfeller kan du bruke den slik som det står
i eksempelet.

```xml
<?xml version="1.0" encoding="UTF-8"?>
```

**Kommentarer** kan bli markert med `<!--` i starten og `-->` i slutten. Det som står mellom disse tegnene vil ikke
bli betraktet som en del av xml-en når maskinen leser den. Disse blir brukt til å fortelle noe som et menneske som leser
xml-en kan ha nytte av, men som maskinen ikke trenger kjenne til.

```xml
<!-- En kommentar -->
```

### Regler

For å være et velformet xml-dokument må du følge et sett med regler.

  - Du må bare ha ett rotelement
  - Elementer må være avgrenset av en start-tag og slutt-tag med samme navn, f.eks.`<Til>Tove</Til>`. Tomme elementer kan
    alternativt bruke en lukket tag. f.eks. `<Til />`.
  - Alle attributtverdier må stå i anførselstegn.
  - Elementer kan inneholde andre elementer, men ikke overlappe hverandre.
  - Det er forskjell på små og store bokstaver i elementnavn. `<Til/>` er ikke det samme som `<til/>`.

### Xsd

Xsd står for «xml schema definition» og er et format som brukes til å fortelle detaljert hvilke regler en xml må følge.
Dette blir brukt for å sikre at xml-er kan bli brukt til et spesielt formål som krever et samordnet format. Xsd-en
brukes for å sette strengere regler enn det som vanligvis gjelder for xml.

### Finne mer informasjon

For å lære mer om xml finnes det masse informasjon på internett (<http://www.w3schools.com/xml/> er et eksempel).

### Verktøy

Når du skal jobbe med xml-filer (som regelfila) anbefales det å bruke verktøy som hjelper deg å følge reglene for xml.
Eksempel på slike verktøy er XML Spy og Visual Studio, men det finnes også andre alternativ. Ved å legge inn referanse
(se under) til xsd-en vil slike verktøy kunne sjekke om du følger reglene for regelfilen.

```xml
<AltinnRuleEngine name="test" version="1" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="AltinnRuleEngine.xsd">

```