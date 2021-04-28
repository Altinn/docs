---
title: Innstillinger
description: Innstillinger for forskjellig visning
weight: 3
---

Det er implementert en ny (valgfri) parameter som kan legges inn på definisjonen av en repeterende gruppe i layout-filen, som gjør at man kan styre litt
rundt visningen og oppførselen til gruppen på siden. I tillegg er det lagt til støtte for flere "sider" inne i redigerings-flaten til gruppen.

- [Styre visning](#styre-visning)
- [Flere sider innad i gruppe-visning](#flere-sider-innad-i-gruppe-visning)

## Styre visning
Det er lagt til en ny parameter, `edit`, som kan settes på en gruppe-komponent (repeterende gruppe). Denne lar oss definere forskjellige innstillinger
mtp visning av et gruppe-element under redigering/utfylling. Følgende innstillinger kan settes.

- [mode](#mode)
- [filter](#filter)
- [saveButton](#savebutton)
- [deleteButton](#deletebutton)
- [multiPage](#multipage)

### mode
Definerer om tabellen (som viser alle elementene i gruppen) skal vises når et element er åpent i redigerings-modus.
Følgende verdier godtas:

| Verdi       | Beskrivelse                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| "showTable" | Standard oppførsel om ingenting er satt. Viser tabellen over flaten for redigering av gruppe-element.        |
| "hideTable" | Skjuler tabellen når et gruppe-element er åpent for redigering.                                              |
| "showAll"   | Skjuler tabellen. Viser alle elementene i gruppen i redigerings-modus, under hverandre. Lagre-knapp skjules. |

### filter
Støtte for å filtrere elementene i gruppen, slik at kun de elementene som matcher de definerte kriteriene vises.
F.eks. i en gruppe som viser arbeidserfaring, vis kun de elementene der arbeidssted var Oslo.
Liste med kriterier er basert på verdi av ett eller flere felter i gruppen, på formen

```json
"edit": {
  "filter": [
    { "key": "<felt i datamodell>", "value": "<ønsket verdi>" }
  ]
}
```

Dersom det er flere kriterier, må alle matche for at elementet skal vises. 

Om det kun er ett resultat, vises dette automatsk i redigerings-modus. Om det er flere elementer i gruppen som matcher filteret, vil disse vises. 
Andre elementer i gruppen skjules. `filter` kan kombineres med `mode`-parameter.

{{%notice warning%}}
Om man kombinerer `"mode": "showAll"` med `"filter"`, vil det ikke fungere å legge til nye elementer i gruppen. Dette er fordi man med "showAll" kun 
viser redigerings-flaten, og så lenge filteret ikke matcher, vil ikke elementet vises.
{{% /notice %}}

### saveButton
Bestemmer om "Lagre"-knappen vises når et gruppeelement er i redigeringsmodus. Standard oppførsel om parameteren ikke er satt er at "Lagre"-knapp vises.
Dersom man har satt `"mode": "showAll"` skjules Lagre-knappen alltid, da man i denne modusen ikke har mulighet til å lukke redigerings-flaten for 
gruppe-elementet. Dataene lagres uansett.

### deleteButton
Bestemmer om "Slett"-knappen vises når et gruppeelement er i redigeringsmodus. Standard oppførsel om parameteren ikke er satt er at "Slett"-knapp vises.

### multiPage
Sier at redigering/utfylling av gruppe kan gjøres over flere "sider"/visninger. Krever mer oppsett for å fungere, se under for mer informasjon.

## Flere sider innad i gruppe-visning
{{% notice info %}}
- Denne funksjonaliteten er p.t. kun tilgjengelig for repeterende grupper.
- Visning av gruppe over flere sider inne i redigerings-flaten til gruppen støttes KUN for grupper på øverste nivå, og støttes ikke for grupper i grupper.
{{% /notice %}}
Når man skal legge inn data i en gruppe, kan det være tilfeller der hvert element i gruppen inneholder mange felter, og at det dermed blir mye scrolling
og uoversiktlig for sluttbruker. For å løse dette er det innført en mulighet til å dele opp utfyllingen over flere visninger, som bruker kan navigere
frem/tilbake mellom mens de fyller ut gruppe-elementet. Navigeringen her skjer innad i en layout, og oppdaterer
kun visningen inne i redigeringsflaten for gruppen. 

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
