---
title: Meldingtilannenmyndighet
description: Datamodell og schema
weight: 100
---


{{% notice note %}}
Under arbeid!
{{% /notice %}}

### Eksempel
```json
{
  "meldingTilAnnenMyndighet": [
    {
      "meldingFraMyndighet": "222222222",
      "meldingOmTildaenhet": "123456789",
      "datoForMeldingTilAnnenMyndighet": "2013-01-30T00:00:00",
      "meldingsinnholdTilAnnenMyndighet": "elsewhere macabre grape",
      "identifikator": "6bcf1193-809a-4bf4-8b2c-f1cdce94a79e"
    },
    {
      "meldingFraMyndighet": "222222222",
      "meldingOmTildaenhet": "123456789",
      "datoForMeldingTilAnnenMyndighet": "2013-01-30T00:00:00",
      "meldingsinnholdTilAnnenMyndighet": "elsewhere macabre grape",
      "identifikator": "5c72d01a-c715-45d7-a745-ab85e43ec94f"
    },
    {
      "meldingFraMyndighet": "222222222",
      "meldingOmTildaenhet": "123456789",
      "datoForMeldingTilAnnenMyndighet": "2013-01-30T00:00:00",
      "meldingsinnholdTilAnnenMyndighet": "elsewhere macabre grape",
      "identifikator": "09ad0e96-9ef6-4046-9546-2a93a7c2d93e"
    },
    {
      "meldingFraMyndighet": "222222222",
      "meldingOmTildaenhet": "123456789",
      "datoForMeldingTilAnnenMyndighet": "2013-01-30T00:00:00",
      "meldingsinnholdTilAnnenMyndighet": "elsewhere macabre grape",
      "identifikator": "57917956-a49b-4edd-8fb5-8c210bcbf53d"
    }
  ]
}
```

### Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "AlertMessageList2",
  "title": "Tilda/bekymringsmeldinger",
  "definitions": {
    "meldingTilAnnenMyndighet": {
      "$id": "meldingTilAnnenMyndighet",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "meldingFraMyndighet": {
          "type": [
            "string",
            "null"
          ]
        },
        "meldingOmTildaenhet": {
          "type": [
            "string",
            "null"
          ]
        },
        "datoForMeldingTilAnnenMyndighet": {
          "type": "string",
          "format": "date-time"
        },
        "meldingsinnholdTilAnnenMyndighet": {
          "type": [
            "string",
            "null"
          ]
        },
        "identifikator": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "meldingFraMyndighet",
        "meldingOmTildaenhet"
      ]
    }
  },
  "type": "object",
  "properties": {
    "bekymringsmeldinger": {
      "$id": "List`1",
      "type": [
        "array",
        "null"
      ],
      "items": {
        "$ref": "meldingTilAnnenMyndighet"
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
    "meldingTilAnnenMyndighet": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "datoForMeldingTilAnnenMyndighet": {
          "format": "date-time",
          "nullable": false,
          "type": "string"
        },
        "identifikator": {
          "nullable": true,
          "type": "string"
        },
        "meldingFraMyndighet": {
          "nullable": true,
          "type": "string"
        },
        "meldingOmTildaenhet": {
          "nullable": true,
          "type": "string"
        },
        "meldingsinnholdTilAnnenMyndighet": {
          "nullable": true,
          "type": "string"
        }
      },
      "required": [
        "meldingFraMyndighet",
        "meldingOmTildaenhet"
      ],
      "type": "object"
    }
  },
  "nullable": false,
  "properties": {
    "bekymringsmeldinger": {
      "items": {
        "$ref": "meldingTilAnnenMyndighet"
      },
      "nullable": true,
      "type": "array"
    }
  },
  "title": "Tilda/bekymringsmeldinger",
  "type": "object"
}
```