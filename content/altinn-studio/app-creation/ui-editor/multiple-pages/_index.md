---
title: Flere sider i skjema
description: Hvordan sette opp skjema med flere sider
toc: true
weight: 100
---

{{%notice warning%}}
Dette er helt ny funksjonalitet. Oppsett må gjøres manuelt inntil videre. Støtte for oppsett via Altinn Studio kommer snart.
{{%/notice%}}

## Oppsett
For å få funksjonalitet for flere sider i skjema, **må** nuget-versjon til pakkene app'en bruker oppgraderes til versjon `1.2.0-alpha` _eller nyere_. Se instrukser for hvordan det gjøres [her](../../update).

Flere sider i skjema (innenfor samme prosess-task) støttes ved å dele opp dagens layout-fil `App/ui/FormLayout.json` i en fil per side. Filene må legges i en mappe `App/ui/layouts`. Hver layout-fil må bruke samme format som den eksisterende `FormLayout.json` filen.  F.eks.:

```
|- App/
  |- ui/
    |- layouts/
      |- side1.json
      |- side2.json
      |- side3.json
```

Anbefalt fremgangsmåte så lenge det er behov for å sette det opp manuelt, er å bruke ui-editoren i Altinn Studio for å legge inn alle komponentene inn i `FormLayout.json`, for å så kopiere de ut i sine respektive layout-filer, en for hver side man ønsker. `FormLayout.json` kan enten få nytt navn under `layouts`-mappen, eller slettes. 

_Merk: `FormLayout.json` må enten flyttes (evt med nytt navn) inn i `layouts`-mappen, eller slettes. Dersom man har den gamle `FormLayout.json`-filen under `App/ui`-mappen som tidligere, vil kun denne brukes og alle filer under `App/ui/layouts`-mappen ignoreres._ 

## Navigering mellom sider

Navigering videre til neste side skjer via en navigerings-knapp. Denne må legges til manuelt i hver layout-fil hvor man ønsker navigering fremover. Navigering tilbake til forrige side gjøres via tilbake-pil i venstre hjørnet. Denne knappen vises alltid så lenge det er en side å gå tilbake til, og er ikke en del av layout-filen. Se bilde under.

![Navigeringsknapper](nav-button-next.png "Navigeringsknapper")

### Legge til knapp for navigering
Knapp for navigering legges inn i alle layout-filer der det er behov. Om man ønsker at den skal dukke opp nederst på siden, må den legges inn nederst i layout-filen. Eksempel vises under

```
{
  "id": "nav-page2",
  "type": "NavigationButtons",
  "textResourceBindings": {
    "next": "next",
    "back": "back"
  },
  "dataModelBindings": {}
}
```

Det er også mulighet for å vise en `tilbake`-knapp sammen med `neste`-knappen, ved å legge til parameteren `"showBackButton": true` på komponenten. 

![Navigeringsknapper med tilbakeknapp](nav-button-next-prev.png "Navigeringsknapper med tilbakeknapp")

| Parameter | Beskrivelse |
| ----------- | ----------- |
| id | Unik ID, tilsvarende som for alle andre skjemakomponenter.|
| type | Må være `"NavigationButtons"` |
| textResourceBindings | Setter man parametre `next` (og evt. `back`) her, vil man kunne overstyre med egne tekster som vises på knappen(e). Se eksempel over.|
| showBackButton | Valgfri. Gjør at 2 knapper (tilbake/neste) vises i stedet for bare en (neste).|

### Rekkefølge
Standard rekkefølge for sidene er alfabetisk. Utover det kan man navngi hver side som man ønsker, det er da filnavnet som gjelder her. For å sikre at sidene kommer i ønsket rekkefølge kan man f.eks. sette en prefix med tall foran sidenavnet i filnavn. F.eks:

```
|- App/
  |- ui/
    |- layouts/
      |- 1.firstPage.json
      |- 2.secondPage.json
      |- 3.aFinalPage.json
```

_På sikt vil man kunne endre rekkefølge på sidene i Altinn Studio, og dermed slippe å forholde seg til alfabetisk rekkefølge på filnavn. Enn så lenge må dette settes opp manuelt._

{{%notice info%}}
Funksjonalitet for å kunne dynamisk bestemme hvilken side som er neste er ikke noe som støttes i denne versionen av funksjonaliteten.
{{%/notice%}}