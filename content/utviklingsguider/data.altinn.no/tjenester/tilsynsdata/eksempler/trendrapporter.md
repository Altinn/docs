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
      "ansvarligtilsynsmyndighet": "222222222",
      "aarligeTildaenhetTotaler": [
        {
          "trenddataForKalenderAar": 2021,
          "antallMeldingerTilAnnenMyndighet": 1,
          "antallMaanederMedData": 11,
          "antallAnmerkninger": 2323,
          "antallTilsyn": 2,
          "antallTilsynUtenReaksjoner": 1,
          "antallTilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "antallKontrollerUtenReaksjoner": 1,
          "antallKontrollerMedReaksjoner": 1,
          "antallAnmeldteReaksjoner": 1
        },
        {
          "trenddataForKalenderAar": 2020,
          "antallMeldingerTilAnnenMyndighet": 1,
          "antallMaanederMedData": 12,
          "antallAnmerkninger": 23,
          "antallTilsyn": 3,
          "antallTilsynUtenReaksjoner": 1,
          "antallTilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "antallKontrollerUtenReaksjoner": 1,
          "antallKontrollerMedReaksjoner": 1,
          "antallAnmeldteReaksjoner": 1
        },
        {
          "trenddataForKalenderAar": 2019,
          "antallMeldingerTilAnnenMyndighet": 1,
          "antallMaanederMedData": 12,
          "antallAnmerkninger": 1,
          "antallTilsyn": 1,
          "antallTilsynUtenReaksjoner": 1,
          "antallTilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "antallKontrollerUtenReaksjoner": 1,
          "antallKontrollerMedReaksjoner": 1,
          "antallAnmeldteReaksjoner": 1
        },
        {
          "trenddataForKalenderAar": 2018,
          "antallMeldingerTilAnnenMyndighet": 1,
          "antallMaanederMedData": 12,
          "antallTilsyn": 12,
          "antallTilsynUtenReaksjoner": 1,
          "antallTilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "antallKontrollerUtenReaksjoner": 1,
          "antallKontrollerMedReaksjoner": 1,
          "antallAnmeldteReaksjoner": 1
        },
        {
          "trenddataForKalenderAar": 2017,
          "antallMeldingerTilAnnenMyndighet": 1,
          "antallMaanederMedData": 12,
          "antallTilsyn": 21,
          "antallTilsynUtenReaksjoner": 1,
          "antallTilsynMedReaksjoner": 1,
          "antallKontroller": 2,
          "antallKontrollerUtenReaksjoner": 1,
          "antallKontrollerMedReaksjoner": 1,
          "antallAnmeldteReaksjoner": 1
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
        "trenddataForKalenderAar": {
          "type": "integer"
        },
        "antallMeldingerTilAnnenMyndighet": {
          "type": "integer"
        },
        "antallMaanederMedData": {
          "type": "integer"
        },
        "antallAnmerkninger": {
          "type": "integer"
        },
        "antallTilsyn": {
          "type": "integer"
        },
        "antallTilsynUtenReaksjoner": {
          "type": "integer"
        },
        "antallTilsynMedReaksjoner": {
          "type": "integer"
        },
        "antallKontroller": {
          "type": "integer"
        },
        "antallKontrollerUtenReaksjoner": {
          "type": "integer"
        },
        "antallKontrollerMedReaksjoner": {
          "type": "integer"
        },
        "antallAnmeldteReaksjoner": {
          "type": "integer"
        }
      },
      "required": [
        "trenddataForKalenderAar"
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
        "ansvarligtilsynsmyndighet": {
          "type": [
            "string",
            "null"
          ]
        },
        "aarligeTildaenhetTotaler": {
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

### OAS
```json
{
  "additionalProperties": true,
  "definitions": {
    "aarligTotal": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "antallAnmeldteReaksjoner": {
          "nullable": false,
          "type": "integer"
        },
        "antallAnmerkninger": {
          "nullable": false,
          "type": "integer"
        },
        "antallKontroller": {
          "nullable": false,
          "type": "integer"
        },
        "antallKontrollerMedReaksjoner": {
          "nullable": false,
          "type": "integer"
        },
        "antallKontrollerUtenReaksjoner": {
          "nullable": false,
          "type": "integer"
        },
        "antallMaanederMedData": {
          "nullable": false,
          "type": "integer"
        },
        "antallMeldingerTilAnnenMyndighet": {
          "nullable": false,
          "type": "integer"
        },
        "antallTilsyn": {
          "nullable": false,
          "type": "integer"
        },
        "antallTilsynMedReaksjoner": {
          "nullable": false,
          "type": "integer"
        },
        "antallTilsynUtenReaksjoner": {
          "nullable": false,
          "type": "integer"
        },
        "trenddataForKalenderAar": {
          "nullable": false,
          "type": "integer"
        }
      },
      "required": [
        "trenddataForKalenderAar"
      ],
      "type": "object"
    },
    "trendrapport": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "aarligeTildaenhetTotaler": {
          "items": {
            "$ref": "aarligTotal"
          },
          "nullable": true,
          "type": "array"
        },
        "ansvarligtilsynsmyndighet": {
          "nullable": true,
          "type": "string"
        },
        "tildaenhet": {
          "nullable": true,
          "type": "string"
        }
      },
      "required": [
        "tildaenhet",
        "ansvarligtilsynsmyndighet"
      ],
      "type": "object"
    }
  },
  "nullable": false,
  "properties": {
    "trendrapporter": {
      "items": {
        "$ref": "trendrapport"
      },
      "nullable": true,
      "type": "array"
    }
  },
  "title": "Tilda/tilsynstrend",
  "type": "object"
}
```