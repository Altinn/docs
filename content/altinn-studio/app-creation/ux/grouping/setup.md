---
title: Oppsett
description: Generelt oppsett for gruppering av felter i skjema
weight: 1
---

Felter i skjema kan settes opp til å bli del av en _gruppe_. Dette kan brukes til å f.eks. sette opp dynamikk på en enkelt gruppe av felter,
i stedet for på hvert enkelt felt. I tillegg må felter kunnne grupperes for å støtte [repeterende grupper](#repeterende-grupper) i skjema.

En gruppe settes opp i `FormLayout.json`, sammen med de andre komponentene i skjemaet. Dette kan enten gjøres manuelt direkte i filen,
eller via skjemaeditor i Atinn Studio ved å bruke Gruppe-komponenten.

Noen punkter å notere seg ved manuelt oppsett:

- Gruppen må ligge _før_ ev. komponenter som skal inngå i gruppen i FormLayout.json.
- En gruppe _MÅ_ ha `type: "group"` satt for at den skal registreres som en gruppe

Eksempel på en (repeterende) gruppe definert i `FormLayout.json` som inneholder 4 felter som kan repetere 3 ganger:
En gruppe defineres på følgende måte i FormLayout.json:

```json {hl_lines=[3,"8-12"]}
{
  "id": "<unik-id>",
  "type": "group",
  "dataModelBindings": {
    "group": "<gruppen i datamodellen (kun repeterende grupper)>"
  },
  "maxCount": "<Antall ganger gruppen kan repetere>",
  "children": [
    "<felt-id>",
    "<felt-id>",
    "osv..."
  ],
  "tableHeadings": [
    "<felt-id>"
  ],
  "textResourceBindings": {
    "add_button": "tekstressurs.felt"
  }
}
```

| Parameter             | Påkrevd | Beskrivelse                                                                                                                               |
| --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | Ja      | Unik ID, tilsvarer ID på andre komponenter. Må være unik i FormLayout.json-filen.                                                         |
| type                  | Ja      | MÅ være "group". Sier at dette er en gruppe.                                                                                              |
| dataModelBindings     | Nei     | MÅ være satt for repeterende grupper, med `group`-parameteren som i eksempelet over. Skal peke på den repeterende gruppen i datamodellen. |
| textResourceBindings  | Nei     | Kan være satt for repeterende grupper, med `add_button`-parameteren som i eksemepelt over. Denne bindingen til bli lagt til på knappen.   |
| maxCount              | Ja      | Antall ganger en gruppe kan repetere. Settes til `1` om gruppen ikke er repeterende.                                                      |
| children              | Ja      | Liste over de feltene som skal inngå i gruppen. Her brukes felt-id fra FormLayout.json                                                    |
| tableHeadings         | Nei     | Liste over komponentener som skal inngå som en del av tabbel header feltene. Om ikke spesifisert så vises alle komponentene.              |                                                           |

