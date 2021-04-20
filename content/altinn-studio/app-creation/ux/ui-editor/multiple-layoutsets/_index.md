---
title: Flere skjema i tjeneste
description: Hvordan sette opp tjeneste med flere skjema
toc: true
weight: 100
---

{{%notice warning%}}
Dette er helt ny funksjonalitet. Oppsett må gjøres manuelt inntil videre. Støtte for oppsett via Altinn Studio kommer snart.
{{%/notice%}}

## Oppsett

For å få funksjonalitet for flere skjema i tjeneste, **må** nuget-versjon til pakkene app'en bruker oppgraderes til versjon `3.1.4` _eller nyere_. Se instrukser for hvordan det gjøres [her](../../update).

Sentralt i løsningen er at man har flere layout-sets som består av en eller flere sider og configurasjon. Hvert layout-set består av tilsvarende filer som en skjema tjenester.



```
|- App/
  |- ui/
    | - layout-sets.json
    |- skjema-a/
      |- Settings.json
      |- RuleHandler.js
      |- RuleConfiguration.js
      |- layouts/
        |- side1.json
        |- side2.json
        |- side3.json
    |- skjema-b/
      |- Settings.json
      |- RuleHandler.js
      |- RuleConfiguration.js
      |- layouts/
        |- side1.json
        |- side2.json
        |- side3.json  
```


In layout-set.json defineres the hvilke steg i prosessen (task) hvor et gitt layout-set skulle brukes. 
Eksempel


```json
{
  "sets": [
    {
      "id": "rf0002",
      "dataType": "schema_4222_160523_forms_212_20160523",
      "tasks": [
        "Task_1"
      ]
    },

    {
      "id": "superform",
      "dataType": "schema_3161_140411_forms_1549_11554",
      "tasks": [
        "Task_2"
      ]
    }
  ]
}
```