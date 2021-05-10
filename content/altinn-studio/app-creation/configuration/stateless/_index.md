---
title: Stateless applikasjon (innsynstjeneste)
linktitle: Stateless
description: Hvordan legge inn konfigurasjon for å styre oppførsel ved applikasjonens oppstart
toc: true
weight: 500
---

## Default oppførsel
Når en bruker navigerer seg til en Altinn applikasjon vil det som default opprettes en ny instans som en del av oppstarten til en applikasjon.
Dette er et metadataobjekt som beskriver en brukers instans av applikasjonen. Denne instansen vil følge med videre i applikasjonens levetid, og vil også være synlig i url'en en bruker navigerer seg mot når man skal gå inn på en tidligere opprettet instans.

Flyten fra klientsiden når brukeren navigerer til en applikasjon:
1. Brukeren klikker seg inn på den aktuelle applikasjonen, f.eks: `https://ttd.apps.altinn.no/ttd/demo-app/`
2. App-frontend gjør noen verifikasjoner på at den aktuelle brukeren har lov til å starte en ny instans
3. Visst alt er OK så kaller frontend noen apier i app backend for å opprette en ny instans av applikasjonen
4. Brukeren blir så flyttet over til den gitte instansen som nå er opprettet, f.eks: `https://ttd.apps.altinn.no/ttd/demo-app/#/instance/50110099/2a66adb1-079f-4c54-861d-9ae84e59a5c9/`.
5. Den aktuelle instansen vil også være synlig i brukerens meldingsboks, og det er denne gitte instansen man klikker seg inn på når man åpner opp appen igjen.

I et slikt applikasjonsløp vil det også lagres om den pågående instansen, som f.eks det nevnte instansobjektet, skjemadataen, events osv. Denne dataen brukes og oppdateres av applikasjonen under instansens levetid.

## Stateless applikasjon

{{%notice warning%}}

Dette er helt ny funksjonalitet. Oppsett må gjøres manuelt inntil videre.

**MERK:** for å benytte denne funksjonaliteten må man versjon >= 4.5.2 av nugetpakkene `Altinn.App.PlatformServices`, `Altinn.App.Common` og `Altinn.App.Api`.

{{%/notice%}}

I applikasjonsmetadataen er det mulig styre oppførselen en applikasjonen har under oppstart. Om man ikke ønsker at applikasjonen skal oppføre seg som en tilstandsløs applikasjon vil det nå være mulig.
For en slik applikasjon vil det ikke bli lagret noe data eller metadata, og applikasjonen vil heller ikke havne i meldingsboksen til sluttbruker. Dette tilsvarer en innsynstjeneste i Altinn 2.

Konfigurasjonen av dette gjøres i `applicationmetadata.json`. Eksempel:

```json{hl_lines=[31]}
{
  "id": "ttd/stateless-app-demo",
  "org": "ttd",
  "title": {
    "nb": "Stateless App Demo"
  },
  "dataTypes": [
    {
      "id": "ref-data-as-pdf",
      "allowedContentTypes": [
        "application/pdf"
      ],
      "maxCount": 0,
      "minCount": 0
    },
    {
      "id": "Stateless",
      "allowedContentTypes": [
        "application/xml"
      ],
      "appLogic": {
        "autoCreate": true,
        "classRef": "Altinn.App.Models.StatelessV1"
      },
      "taskId": "Task_1",
      "maxCount": 1,
      "minCount": 1
    }
  ],
  ...
  "onEntry": { "show": "stateless" } // legg til denne linjen
}

```
I feltet `onEntry.show` har man mulighet til nå å referere til et layout-set som man ønsker skal vises under oppstarten av applkasjonen. Les mer om layout-sets [her.](../../ux/ui-editor/multiple-layoutsets/#oppsett)

Layout-settet man referer til her blir så benyttet som visningen brukeren blir presentert for i det man navigerer til applikasjonen.

I `layout-sets.json` legger man så inn det aktuelle settet man referer til fra `applicationmetadata.json`, eksempel:

```json
{
    "sets": [
      {
        "id": "stateless",
        "dataType": "Stateless"
      }
    ]
  }
```

I eksempelet over så referer layout-settet `stateless` til datamodellen `Stateless`. Eksempel app-struktur på en applikasjon som har satt opp på denne måten:

```text
├───App
    ├───config
    ├───logic
    ├───models
    │       Stateless.cs
    │       Stateless.metadata.json
    │       Stateless.schema.json
    │       Stateless.xsd
    ├───ui
        │   layout-sets.json
        │
        └───stateless
            │   RuleHandler.js
            │   Settings.json
            │
            └───layouts
                  FormLayout.json
```

`FormLayout.json` vil så kunne settes opp på samme måte som en vanlig applikasjon, og vil støtte samtlige komponenter som er mulig å sette opp i en vanlig app, med unntak av:
- Filopplaster
- Knapp 

App frontend vil så skjønne ut fra konfigurasjonen i `applicationmetadata.json` at den ikke skal instansiere, og hente ned de aktuelle layout-filene og den tilkoblede datamodellen og presentere dette til sluttbrukeren.

### Datapopulering

Når man benytter en stateless datatype så vil man kunne populere datamodellen i det app-frontend spør om skjemadataen.

Datapopuleringen skjer i to steg på det initielle kallet fra frontend (POST):
1. Prefill, les mer om dette [her.](../../data/prefill/)
2. Kalkulering, ler mer om dette [her.](../../logic/calculation/)

På påfølgende oppdateringer på samme skjemadata (PUT) så vil man ikke kjøre prefill en gang til, men kalkuleringen trigges. Dette muligjør manipulering av dataen basert på brukerens input selv i en stateless tilstand.

Eksempel på en kalkulering som populerer datamodellen nevnt i eksempelet over:

```c#
public async Task<bool> Calculate(object instance)
{  
    if (instance.GetType() == typeof(StatelessV1))
    {
        StatelessV1 form = (StatelessV1) instance;
        // Her kan du gjøre det du ønsker, f.eks et API-kall 
        // om tjenesten skal oppføre seg som en innsynstjeneste.
        form.Fornavn = "Test";
        form.Etternavn = "Testesten";
        return true
    }
    return false;
}
```
