---
title: Tekster
description: Hvordan legge til eller endre tekstressurser for en Altinn App
weight: 103
---


Tekster lagres i ressursfiler i appen (App/config/texts).
Tekster kan være fra felles biblioteker, datamodellen eller manuelt lagt inn av utvikler
Tekstressursene er tilgjengelig når man redigerer UI komponenter i skjemaet via Altinn Studio.
Tekstene vises til sluttbruker når skjemaet lastes inn i nettleser.

Tekstressurser er lagred i JSON-format og det er én fil pr språk.

Format på tekstressursfilene er `resource.[språk].json` f.eks: _resource.nb.json_.

På denne siden finner du informasjon om:

- [Formatering av tekstressurser](#formatering-av-tekstressurser)
- [Legge til og endre tekster i en app](#legge-til-og-endre-tekster-i-en-app)
- [Variabler i tekster](#variabler-i-tekster)
- [Legge til hjelpetekst](#legge-til-hjelpetekst)

## Formatering av tekstressurser

Alle tekstressurser kan formateres med markdown.
Nedenfor er de mest benyttede formateringene beskrevet.
Mer omfattende dokumentasjon og tips til hvordan markdown kan benyttes finnes her:
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

### Uthevede tekster

    _Dette er en kursiv tekst laget med understrek_
    *Dette er også en kurvis tekst laget med stjerne*

_Dette er en kursiv tekst laget med understrek_

*Dette er også en kurvis tekst laget med stjerne*

    __Dette er en fet tekst laget med understrek__
    **Dette er også en fet tekst, men laget med stjerner!**

__Dette er en fet tekst laget med understrek__

**Dette er også en fet tekst, men laget med stjerner**

### Lenker

    Trykk \[her\]\(https ://altinn.github.io/docs) for å komme til Altinn docs.

Trykk [her](https://altinn.github.io/docs) for å komme til Altinn docs.

### Headinger

    # Dette er en stor heading
    ## Dette er en litt mindre heading
    ### Og enda litt mindre
    #### Bitteliten heading

# Dette er en stor heading

## Dette er en litt mindre heading

### Og enda litt mindre

### Bitteliten heading

## Legge til og endre tekster i en app

Man har to alternativer når man skal endre tekster i en app:
enten gjøres det via Altinn Studio eller direkte i applikasjons repoet.

### Legge til og endre tekster i Altinn Studio

I den øverste navigerings menyen i Altinn Studio, velg _Språk_ for å kunne redigere tekster.
En oversikt over tekstene som allerede er tilgjengelig for applikasjonen listes opp.

På denne siden kan man redigere eksisterende tekster samt legge til nye teksressurser.
Nye tekster legges til ved å trykke på _Ny tekst_, og fylle ut tekst og en unik nøkkel.

Lagre endringer i tekstene ved å trykke på _Lagre tekster_.

![Edit texts in Designer](edit-texts-in-designer.png "Edit texts in Designer")

### Legge til og endre tekster i applikasjons repo

Dersom det er mange tekster som skal endres på en gang kan det være praktisk å redigere tekstene
i JSON-struturen direkte i repoet. Enten via Altinn Studio eller i en lokal klone i selvvalgt editor.

Teksressursene ligger lagret i 'App/config/texts'

![Edit texts in Repos](edit-texts-in-repos.png "Edit texts in Repos")

## Variabler i tekster

Variabler i tekster kan inkluderes ved å følge oppsettet nedenfor.
Støttede datakilder: datamodel.

    ```json
    {
      "id": "text.Label",
      "value": "Hello, {0}! Here is a second variable {1}.",
      "variables": [
        {
          "key": "[datamodelField]",
          "dataSource": "dataModel.[dataModelName]"
        },
        {
          "key": "[datamodelField]",
          "dataSource": "dataModel.[dataModelName]"
        }
      ]
    }
    ```

Rekkerfølgen på variablene må matche parameterne i teksten.

    ```json

    {
      "id": "Introduction.Label",
      "value": "Du leverer nå skjema for: {0} med organisasjonsnummer: {1}.",
      "variables": [
          {
            "key": "skattepliktig.organisasjonsnavn",
            "dataSource": "dataModel.default"
          },
          {
            "key": "skattepliktig.organisasjonsnummer",
              "dataSource": "dataModel.default"
          }
      ]
    }
    ```

Det er anbefalt at variablene er statiske gjennom prosessflyten til en instans.
Dette kan man oppnå ved å enten bruke prefill data eller verdier som settes under instansiering som variabler.
Se et eksempel på hvordan å sette et datafelt under instansiering [her](../prefill/#egendefinert-prefill)

## Legge til hjelpetekst

Hjelpetekster er små tekstsnutter som gir en kort og konsis beskrivelse av hva sluttbrukeren
er forventet å fylle ut i feltet som teksten er tilknyttet.

Språknøklene som peker på hjelpetesten er definert i _FormLayout.json_.
I app repoet finner du filen under `App/Resources/`.

Nedenfor ser du et eksempel på en _FormLayout.json_ uten hjelpetekster.

    ```json
    {
      "data": {
        "layout": [
          {
            "id": "616071dc-90b1-4ce5-8d18-492844828a41",
            "type": "Header",
            "componentType": 0,
            "textResourceBindings": {
              "title": "ServiceName"
            },
            "dataModelBindings": {}
          },
          {
            "id": "fac3c047-efe1-49da-8189-da7c536a4edd",
            "type": "Input",
            "componentType": 2,
            "textResourceBindings": {
              "title": "21771.RapporteringsenhetNavndatadef21771.Label",
              "description": "21771.RapporteringsenhetNavndatadef21771.Label"
            },
            "dataModelBindings": {
              "simpleBinding": "generellInformasjongrp2581.avgiftspliktiggrp50.rapporteringsenhetNavndatadef21771.value"
            },
            "required": true,
            "readOnly": false
          },
          {
            "id": "08d707a9-2475-4d23-bf76-f209fb434ec2",
            "type": "TextArea",
            "componentType": 7,
            "textResourceBindings": {
              "title": "19684.OmsetningsoppgaverTilleggsopplysningerdatadef19684.Label",
              "description": "19684.OmsetningsoppgaverTilleggsopplysningerdatadef19684.Label",
            },
            "dataModelBindings": {
              "simpleBinding": "avgiftspostergrp2577.posteneIOppgavengrp5639.tilleggsopplysningergrp197.omsetningsoppgaverTilleggsopplysningerdatadef19684.value"
            },
            "required": false,
            "readOnly": false
          },
          {
            "id": "bd6589b6-e2ab-49ba-b39a-dd3f8b63e5de",
            "type": "Button",
            "componentType": 9,
            "textResourceBindings": {
              "title": "Send inn"
            },
            "dataModelBindings": {},
            "textResourceId": "Standard.Button.Button",
            "customType": "Standard"
          }
        ]
      }
    }
    ```

Dersom du skulle ønske å legge til hjelpetekst på en av disse skjemakomponentene må du

1. Legge til hjelpeteksten i tekstressursfilen. Beskrevet [her](#legge-til-og-endre-tekster-i-en-app)
2. Åpne  `FormLayout.json`-filen
3. Legg til en binding til den nye tekstressursen med nøkkel "help" og verdi nøkkel på tekstressursen.

Slik ser filen ut etter å ha lagt til en hjelpetekst:

    ```json
    {
      "data": {
        "layout": [
          {
            "id": "616071dc-90b1-4ce5-8d18-492844828a41",
            "type": "Header",
            "componentType": 0,
            "textResourceBindings": {
              "title": "ServiceName"
            },
            "dataModelBindings": {}
          },
          {
            "id": "fac3c047-efe1-49da-8189-da7c536a4edd",
            "type": "Input",
            "componentType": 2,
            "textResourceBindings": {
              "title": "21771.RapporteringsenhetNavndatadef21771.Label",
              "description": "21771.RapporteringsenhetNavndatadef21771.Label"
            },
            "dataModelBindings": {
              "simpleBinding": "generellInformasjongrp2581.avgiftspliktiggrp50.rapporteringsenhetNavndatadef21771.value"
            },
            "required": true,
            "readOnly": false
          },
          {
            "id": "08d707a9-2475-4d23-bf76-f209fb434ec2",
            "type": "TextArea",
            "componentType": 7,
            "textResourceBindings": {
              "title": "19684.OmsetningsoppgaverTilleggsopplysningerdatadef19684.Label",
              "description": "19684.OmsetningsoppgaverTilleggsopplysningerdatadef19684.Label",
              "help": "Skjema.TilleggsOpplysninger.Hjelpetext"
            },
            "dataModelBindings": {
              "simpleBinding": "avgiftspostergrp2577.posteneIOppgavengrp5639.tilleggsopplysningergrp197.omsetningsoppgaverTilleggsopplysningerdatadef19684.value"
            },
            "required": false,
            "readOnly": false
          },
          {
            "id": "bd6589b6-e2ab-49ba-b39a-dd3f8b63e5de",
            "type": "Button",
            "componentType": 9,
            "textResourceBindings": {
              "title": "Send inn"
            },
            "dataModelBindings": {},
            "textResourceId": "Standard.Button.Button",
            "customType": "Standard"
          }
        ]
      }
    }
    ```
