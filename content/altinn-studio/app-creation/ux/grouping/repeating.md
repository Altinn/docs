---
title: Repeterende grupper
description: Oppsett for repeterende grupper
weight: 2
---

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
