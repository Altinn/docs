---
title: Trendrapporter
description: Datamodell og schema
weight: 4
---

### Eksempel
```json
{
  "trendrapporter": [
    {
      "tildaenhet": "974720760",
      "tilsynutfoertav": "222222222",
      "ansvarligtilsynsmyndighet": "222222222",
      "aarligeTotaler": [
        {
          "aar": 2021,
          "antallBekymringsmeldinger": 1,
          "maanederMedData": 11,
          "antallTilsyn": 2,
          "antallTilsynUtenReaksjoner": 1,
          "tilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "kontrollerUtenReaksjoner": 1,
          "kontrollerMedReaksjoner": 1,
          "anmeldtReaksjon": 1
        },
        {
          "aar": 2020,
          "antallBekymringsmeldinger": 1,
          "maanederMedData": 12,
          "antallTilsyn": 3,
          "antallTilsynUtenReaksjoner": 1,
          "tilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "kontrollerUtenReaksjoner": 1,
          "kontrollerMedReaksjoner": 1,
          "anmeldtReaksjon": 1
        },
        {
          "aar": 2019,
          "antallBekymringsmeldinger": 1,
          "maanederMedData": 12,
          "antallTilsyn": 1,
          "antallTilsynUtenReaksjoner": 1,
          "tilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "kontrollerUtenReaksjoner": 1,
          "kontrollerMedReaksjoner": 1,
          "anmeldtReaksjon": 1
        },
        {
          "aar": 2018,
          "antallBekymringsmeldinger": 1,
          "maanederMedData": 12,
          "antallTilsyn": 12,
          "antallTilsynUtenReaksjoner": 1,
          "tilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "kontrollerUtenReaksjoner": 1,
          "kontrollerMedReaksjoner": 1,
          "anmeldtReaksjon": 1
        },
        {
          "aar": 2017,
          "antallBekymringsmeldinger": 1,
          "maanederMedData": 12,
          "antallTilsyn": 21,
          "antallTilsynUtenReaksjoner": 1,
          "tilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "kontrollerUtenReaksjoner": 1,
          "kontrollerMedReaksjoner": 1,
          "anmeldtReaksjon": 1
        }
      ]
    }
  ]
}
```

### Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "TrendReportList2",
  "title": "Tilda/tilsynstrend",
  "definitions": {
    "aarligTotal": {
      "$id": "aarligTotal",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "aar": {
          "type": "integer"
        },
        "antallBekymringsmeldinger": {
          "type": "integer"
        },
        "maanederMedData": {
          "type": "integer"
        },
        "antallTilsyn": {
          "type": "integer"
        },
        "antallTilsynUtenReaksjoner": {
          "type": "integer"
        },
        "tilsynMedReaksjoner": {
          "type": "integer"
        },
        "antallKontroller": {
          "type": "integer"
        },
        "kontrollerUtenReaksjoner": {
          "type": "integer"
        },
        "kontrollerMedReaksjoner": {
          "type": "integer"
        },
        "anmeldtReaksjon": {
          "type": "integer"
        }
      },
      "required": [
        "aar"
      ]
    },
    "trendrapport": {
      "$id": "trendrapport",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "tildaenhet": {
          "type": [
            "string",
            "null"
          ]
        },
        "tilsynutfoertav": {
          "type": [
            "string",
            "null"
          ]
        },
        "ansvarligtilsynsmyndgihet": {
          "type": [
            "string",
            "null"
          ]
        },
        "aarligeTotaler": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "aarligTotal"
          }
        }
      },
      "required": [
        "tildaenhet",
        "ansvarligtilsynsmyndighet"
      ]
    }
  },
  "type": "object",
  "properties": {
    "trendrapporter": {
      "$id": "List`1",
      "type": [
        "array",
        "null"
      ],
      "items": {
        "$ref": "trendrapport"
      }
    }
  }
}
```
