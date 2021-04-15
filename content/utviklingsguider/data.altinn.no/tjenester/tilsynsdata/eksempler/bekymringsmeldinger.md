---
title: Bekymringsmeldinger
description: Datamodell og schema
weight: 100
---


{{% notice note %}}
Under arbeid!
{{% /notice %}}


### Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "AlertMessageList2",
  "title": "Tilda/bekymringsmeldinger",
  "definitions": {
    "bekymringsmelding": {
      "$id": "bekymringsmelding",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "tilsynsmyndighet": {
          "type": [
            "string",
            "null"
          ]
        },
        "tildaenhet": {
          "type": [
            "string",
            "null"
          ]
        },
        "bekymringsdato": {
          "type": "string",
          "format": "date-time"
        },
        "bekymringsmelding": {
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
        "tilsynsmyndighet",
        "tildaenhet"
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
        "$ref": "bekymringsmelding"
      }
    }
  }
}
```
### Eksempel

```json
{
  "bekymringsmeldinger": [
    {
      "tilsynsmyndighet": "222222222",
      "tildaenhet": "123456789",
      "bekymringsdato": "2012-03-02T00:00:00",
      "bekymringsmelding": "openly cloudy pig",
      "identifikator": "56432817-190a-487d-973b-dcb53001ee6a"
    },
    {
      "tilsynsmyndighet": "222222222",
      "tildaenhet": "123456789",
      "bekymringsdato": "2012-03-02T00:00:00",
      "bekymringsmelding": "openly cloudy pig",
      "identifikator": "29b4c9a4-ab50-4c14-a1bf-2cf71b8452c1"
    },
    {
      "tilsynsmyndighet": "222222222",
      "tildaenhet": "123456789",
      "bekymringsdato": "2012-03-02T00:00:00",
      "bekymringsmelding": "openly cloudy pig",
      "identifikator": "6ee63189-e2c8-4ba7-a2a2-d71c97093004"
    },
    {
      "tilsynsmyndighet": "222222222",
      "tildaenhet": "123456789",
      "bekymringsdato": "2012-03-02T00:00:00",
      "bekymringsmelding": "openly cloudy pig",
      "identifikator": "854db2bf-dc2c-4444-8946-d61513e9173c"
    }
  ]
}
```