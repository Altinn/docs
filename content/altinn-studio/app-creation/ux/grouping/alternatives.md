---
title: Innstillinger
description: Innstillinger for forskjellig visning
weight: 3
---

Det er implementert en ny (valgfri) parameter som kan legges inn på definisjonen av en repeterende gruppe i layout-filen, som gjør at man kan styre litt
rundt visningen og oppførselen til gruppen på siden. I tillegg er det lagt til støtte for flere "sider" inne i redigerings-flaten til gruppen.

## Styre visning
Det er lagt til en ny parameter, `edit`, som kan settes på en gruppe-komponent (repeterende gruppe). Denne lar oss definere forskjellige innstillinger
mtp visning av et gruppe-element under redigering/utfylling. Følgende innstillinger kan settes.

- mode
- filter
- saveButton
- deleteButton
- multiPage

### mode
Definerer om tabellen (som viser alle elementene i gruppen) skal vises når et element er åpent i redigerings-modus.
Følgende verdier godtas:

| Verdi | Beskrivelse | 
|-------|-------------| 
| "showTable" | Standard oppførsel om ingenting er satt. Viser tabellen over flaten for redigering av gruppe-element. | 
| "hideTable" | Skjuler tabellen når et gruppe-element er åpent for redigering. | 
| "showAll" | Skjuller tabellen. Viser alle elementene i gruppen i redigerings-modus, under hverandre. |

### filter
Støtte for å filtrere elementene i gruppen, slik at kun de elementene som matcher de definerte kriteriene vises.
Dette er en liste med kriterier basert på verdi av ett eller flere felter i datamodellen, på formen

```json
"edit": {
  "filter": [
    { "key": "<felt i datamodell>", "value": "<ønsket verdi>"}
  ]
}
```

Dersom det er flere kriterier, må alle matche for at elementet skal vises. 

Om det kun er ett resultat, vises dette automatsk i redigerings-modus. Om det er flere elementer i gruppen som matcher filteret, vil disse vises. 
Andre elementer i gruppen skjules. `filter` kan kombineres med f.eks. `mode: hideTable`.

### saveButton
Bestemmer om "Lagre"-knappen vises når et gruppeelement er i redigeringsmodus. Standard oppførsel om parameteren ikke er satt er at "Lagre"-knapp vises.

### deleteButton
Bestemmer om "Slett"-knappen vises når et gruppeelement er i redigeringsmodus. Standard oppførsel om parameteren ikke er satt er at "Slett"-knapp vises.

### multiPage
Sier at redigering/utfylling av gruppe kan gjøres over flere "sider"/visninger. Krever mer oppsett, se under for mer informasjon.

## Flere sider innad i gruppe-visning
Når man skal legge inn data i en gruppe, kan det være tilfeller der hvert element i gruppen inneholder mange felter, og at det dermed blir mye scrolling
og uoversiktlig for sluttbruker. For å løse dette er det innført en mulighet til å dele opp utfyllingen over flere visninger, som bruker kan navigere
frem/tilbake mellom mens de fyller ut gruppe-elementet. Navigeringen her skjer innad i en layout, og oppdaterer
kun visningen inne i redigeringsflaten for gruppen. 

Denne funksjonaliteten er p.t. kun tilgjengelig for repeterende grupper.

For å ta i bruk denne funksjonaliteten, må man _prefikse_ komponentene i `children` listen med et tall som tilsier hvilken "side" av utfyllingen 
komponenten skal vises på, etterfulgt av `:`. Vi starter tellingen på `0`, dvs. at komponenter som skal vises på den første "siden" må prefikses med
`0:`. Komponenter som skal vises på den andre siden prefikses med `1:`. Osv. I tillegg må man sette `"multiPage": true` på den nye [`edit`-parameteren](#styre-visning) (se over).
Se eksempel under:

```json {hl_lines=["5-8", "14-16"]} {linenos=inline}
{
  "id": "Some-group-id",
  "type": "Group",
  "children": [
    "0:fnr",
    "1:fornavn",
    "1:mellomnavn",
    "1:etternavn"
  ],
  "maxCount": 10,
  "dataModelBindings": {
    "group": "familie.barn"
  },
  "edit": {
    "multiPage": true
  }
}
```

Resultatet blir som vist under.

![Utfylling i gruppe over flere "sider"](../group-multipage.gif "Utfylling i gruppe over flere sider")
