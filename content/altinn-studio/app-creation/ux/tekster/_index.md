---
title: Tekster
description: Hvordan legge til eller endre tekster i en app.
toc: true
weight: 40
---


Tekster lagres i ressursfiler i appen (`App/config/texts`).
Tekster kan være fra felles biblioteker, datamodellen eller manuelt lagt inn av utvikler.

Tekstressursene er tilgjengelig når man redigerer UI komponenter i skjemaet via Altinn Studio, og de
vises til sluttbruker når skjemaet lastes inn i nettleser.

Tekster lagres i JSON-format og det er én fil pr språk.

Format på filnavn for tekster er `resource.[språk].json` f.eks: _resource.nb.json_.


## Formatering av tekster

Alle tekster kan formateres med markdown.
Nedenfor er de mest benyttede formateringene beskrevet.
Mer omfattende dokumentasjon og tips til hvordan markdown kan benyttes finnes her:
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

### Uthevede tekster

Det er ekstremt enkelt å gjøre ord eller setninger fet eller kursiv i markdown.

```markdown
Dette er en _kursiv tekst_ laget med understrek.
Dette er også en *kurvis tekst* laget med stjerne.
```

```markdown
Dette er __fet tekst__ laget med understrek.
Dette er også **fet tekst**, men laget med stjerner!
```

### Lenker

```markdown
Trykk [her](https://altinn.github.io/docs) for å komme til Altinn docs.
```

### Headinger

```markdown
# Dette er en stor heading (H1)
## Dette er en litt mindre heading (H2)
### Og enda litt mindre (H3)
#### Bitteliten heading (H4)
```

## Legge til og endre tekster i en app

Man har to alternativer når man skal endre tekster i en app:
enten gjøres det via Altinn Studio eller direkte i repository.

### Legge til og endre tekster i Altinn Studio Designer

I den øverste navigerings menyen i Altinn Studio, velg _Språk_ for å kunne redigere tekster.
En oversikt over tekstene som allerede er tilgjengelig for applikasjonen listes opp.

På denne siden kan man redigere eksisterende tekster samt legge til nye teksressurser.
Nye tekster legges til ved å trykke på _Ny tekst_, og fylle ut tekst og en unik nøkkel.

Lagre endringer i tekstene ved å trykke på _Lagre tekster_.

![Altinn Studio Designer](edit-texts-in-designer.png "Endre tekster i Altinn Studio Designer")

### Legge til og endre tekster i repository

Dersom det er mange tekster som skal endres på en gang kan det være praktisk å redigere tekstene
i JSON-struturen direkte i repoet. Enten via Altinn Studio Repos eller i en lokal klone i selvvalgt kodeeditor.

Tekstene ligger lagret i `App/config/texts`

![Altinn Studio Repos](edit-texts-in-repos.png "Endre tekster i Altinn Studio Repos")

## Variabler i tekster

Variabler i tekster kan inkluderes ved å følge oppsettet nedenfor.

Støttede datakilder: datamodel.

```json
{
  "id": "good.text.id",
  "value": "Hello, {0}! Here is a second variable {1}.",
  "variables": [
    {
      "key": "<datamodelField>",
      "dataSource": "dataModel.<dataModelName>"
    },
    {
      "key": "<datamodelField>",
      "dataSource": "dataModel.<dataModelName>"
    }
  ]
}
```

Rekkefølgen på variablene må matche parameterne i teksten.

```json

{
  "id": "common.submitinfo",
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
Se et eksempel på hvordan å sette et datafelt under instansiering [her](../prefill/#egendefinert-prefill).

### Variabler i tekst - repeterende grupper
For at variabler i tekst skal fungere med data som ligger i repeterende grupper, må oppsettet vist over endres litt for de aktuelle feltene,
for å spesifisere den repeterende gruppen dataene ligger i. 

Dette gjøres ved å legge til `[{0}]` _etter_ den repeterende gruppen når man spesifiserer felt i datamodellen i `key`-parameteren.
F.eks.:
```json {hl_lines=[6,10]}
{
  "id": "common.submitinfo",
  "value": "Du leverer nå skjema for: {0} med organisasjonsnummer: {1}.",
  "variables": [
      {
        "key": "skattepliktig[{0}].organisasjonsnavn",
        "dataSource": "dataModel.default"
      },
      {
        "key": "skattepliktig[{0}].organisasjonsnummer",
        "dataSource": "dataModel.default"
      }
  ]
}
```

Det er fullt mulig å kombinere variabler fra felter i repeterende gruppe med variabler fra felter _ikke_ i repeterende gruppe. 
Det anbefales ikke å kombinere variabler fra felter fra _forskjellige_ repeterende grupper, med mindre man er helt sikker på at 
rekkefølgen på innslag i gruppene vil bli helt like. 

## Legge til hjelpetekst

Hjelpetekster er små tekstsnutter som gir en kort og konsis beskrivelse av hva sluttbrukeren
er forventet å fylle ut i feltet som teksten er tilknyttet.

Språknøklene som peker på hjelpeteksten er definert i `FormLayout.json`.
I app repoet finner du filen under `App/ui/`.

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
        "id": "08d707a9-2475-4d23-bf76-f209fb434ec2",
        "type": "TextArea",
        "componentType": 7,
        "textResourceBindings": {
          "title": "tilleggsopplysninger.label",
          "description": "tilleggsopplysninger.desc",
        },
        "dataModelBindings": {
          "simpleBinding": "omsetningsoppgaverTilleggsopplysninger.value"
        }
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

1. Legge til hjelpeteksten i tekstressursfilen som beskrevet [her](#legge-til-og-endre-tekster-i-en-app).
2. Åpne  `FormLayout.json`-filen.
3. Legg til en binding til den nye hjelpeteksten med nøkkel `"help"` og verdi lik nøkkel til tekstressursen.

Slik ser hele filen ut etter å ha lagt til en hjelpetekst:

```json {linenos=false,hl_lines=[20]}
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
        "id": "08d707a9-2475-4d23-bf76-f209fb434ec2",
        "type": "TextArea",
        "componentType": 7,
        "textResourceBindings": {
          "title": "tilleggsopplysninger.label",
          "description": "tilleggsopplysninger.desc",
          "help": "tilleggsopplysninger.help"
        },
        "dataModelBindings": {
          "simpleBinding": "omsetningsoppgaverTilleggsopplysninger.value"
        }
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

## Endre applikasjonstittel

Når man oppretter en applikasjon vil man ha en tekstressurs med label `ServiceName`. 
Dette er tittelen på applikasjonen som vil gjenspeiles flere steder i løsningen vår.
Blant annet når en sluttbruker fyller ut skjema, og når elementer skal vises i meldingsboksen på altinn.no.

Tittelen på applikasjonen skal ligge to steder i applikasjonsrepoet: 
 1. I tekstressurser med nøkkelen `ServiceName`. 
 Tjenesteeiere oppfordres til å legge inn tittel på bokmål, nynorsk og engelsk. Dersom tittel mangler i tekstressursene vil lagringsnavnet (navnet på repoet) vises til sluttbrukeren.

 2. I `applicationmetadata.json` under property `title`. Denne filen ligger under `App/config/`.


Dersom man gjør endrer `ServiceName` på applikasjonen sin lokalt er det viktig at også legge til den oppdatere tittelen i 
`applicationmetadata.json` også. Dersom tittel på applikasjonen endres i Altinn Studio enten på "Om" eller "Språk"-siden bli applicationmetadata.json oppdatert automatisk.

### Eksempel på korrekt konfigurasjon for applikasjonstittel 

I `App/config/applicationmetadata.json`:

```json
"title": {
    "nb": "Automatisk deploy applikasjonen",
    "nn": "Automatisk deploy applikasjonen",
    "en": "Auto deploy application"
  },
```

I `App/config/texts/resource.nb.json`:

```json
{
  "language": "nb",
  "resources": [
    {
      "id": "ServiceName",
      "value": "Automatisk deploy applikasjonen"
    },
    .
    .
    .
  ]
}
```

I `App/config/texts/resource.nn.json`:

```json
{
  "language": "nn",
  "resources": [
    {
      "id": "ServiceName",
      "value": "Automatisk deploy applikasjonen"
    },
    .
    .
    .
    ]
}
```

I `App/config/texts/resource.en.json`:

```json
{
  "language": "en",
  "resources": [
    {
      "id": "ServiceName",
      "value": "Auto deploy application"
    },
    .
    .
    .
  ]
}
```