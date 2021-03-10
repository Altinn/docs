---
title: Gruppering av felter
description: Hvordan gruppere felter i skjema.
toc: true
weight: 90
---

{{% notice info %}}
Støtte for gruppering av felter er på plass i appene, men ikke i Altinn Studio. Oppsettet må gjøres manuelt inntil videre. Dokumentasjonen
oppdateres når støtte for oppsett er på plass i Altinn Studio.
{{% /notice %}}

## Oppsett
Felter i skjema kan settes opp til å bli del av en _gruppe_. Dette kan brukes til å f.eks. sette opp dynamikk på en enkelt gruppe av felter,
i stedet for på hvert enkelt felt. I tillegg må felter kunnne grupperes for å støtte [repeterende grupper](#repeterende-grupper) i skjema.

En gruppe settes opp i `FormLayout.json`, sammen med de andre komponentene i skjemaet. Noen punkter å notere seg:

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
  "maxCount": <Antall ganger gruppen kan repetere>,
  "children": [
    "<felt-id>",
    "<felt-id>",
    ...
  ],
  tableHeadings: [
    "<felt-id>
  ],
  "textResourceBindings: {
    add_button: "tekstressurs.felt"
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


## Repeterende grupper

Grupper i datamodellen inneholder ett eller flere felter. Grupper er definert som _repeterende_ dersom de har `maxOccurs > 1` i xsd'en. 
En gruppe som er repeterende i datamodellen må også settes opp som repeterende i skjemaet, ellers vil lagring av data feile.  


## Eksempel 

Skjema med noen enkelt-felt, og en repeterende gruppe som:

- inneholder 3 felter
- kan repeteres opp til 3 ganger
- har lagt til egen streng på "legg til" knappen

![Skjema med repeterende gruppe](repeating-groups-demo.gif "Skjema med repeterende gruppe")

Oppsett i `FormLayout.json` fra eksempelet over:

```json {linenos=inline}
{
  "data": {
    "layout": [
      {
        "id": "gruppe-1",
        "type": "Group",
        "children": [
          "ac555386-ac2b-47a0-bb1b-842f8612eddb",
          "5c079cd4-c80c-44ea-b8b8-18e323267a37"
        ],
        "maxCount": 3,
        "dataModelBindings": {
          "group": "spesifisering-grp-5836"
        },
        "textResourceBindings": {
          "header": "person"
        }
      },
      {
        "id": "ac555386-ac2b-47a0-bb1b-842f8612eddb",
        "type": "Checkboxes",
        "componentType": 5,
        "textResourceBindings": {
          "title": "Avkrysningsboks"
        },
        "dataModelBindings": {
          "simpleBinding": "klage-grp-5805.spesifisering-grp-5836.KlageSpesifisering-datadef-25457.value"
        },
        "options": [
          {
            "label": "25795.OppgavegiverNavnPreutfyltdatadef25795.Label",
            "value": "Verdi1"
          },
          {
            "label": "25796.OppgavegiverAdressePreutfyltdatadef25796.Label",
            "value": "Verdi2"
          }
        ],
        "required": true
      },
      {
        "id": "5c079cd4-c80c-44ea-b8b8-18e323267a37",
        "type": "AddressComponent",
        "componentType": 11,
        "textResourceBindings": {
          "title": "Adresse" 
        },
        "dataModelBindings": {
          "address": "klage-grp-5805.spesifisering-grp-5836.KlageSpesifiseringg-datadef-12345.value"
        },
        "simplified": true,
        "readOnly": false,
        "required": true
      }
    ]
  }
}
```
