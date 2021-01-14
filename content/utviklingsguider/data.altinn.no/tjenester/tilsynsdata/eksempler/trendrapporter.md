---
title: Trendrapporter
description: Datamodell og schema
weight: 4
---

### Json schema
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
        "maanederMedData": {
          "type": "integer"
        },
        "antallTilsyn": {
          "type": "integer"
        },
        "tilsynMedBrudd": {
          "type": "integer"
        },
        "straffeBrudd": {
          "type": "integer"
        },
        "alvorBrudd": {
          "type": "integer"
        },
        "antallReaksjoner": {
          "type": "integer"
        }
      },
      "required": [
        "aar",
        "maanederMedData",
        "antallTilsyn",
        "tilsynMedBrudd",
        "straffeBrudd",
        "alvorBrudd",
        "antallReaksjoner"
      ]
    },
    "tilsynsadresse": {
      "$id": "tilsynsadresse",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "lokalitetsreferanse": {
          "type": [
            "string",
            "null"
          ]
        },
        "bygningsnummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "bruksenhetsnummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "adressenavn": {
          "type": [
            "string",
            "null"
          ]
        },
        "adressenummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "postnummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "poststedsnavn": {
          "type": [
            "string",
            "null"
          ]
        },
        "kommunenummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "bydel": {
          "type": [
            "string",
            "null"
          ]
        },
        "fylkesnummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "lengdegrad": {
          "type": [
            "string",
            "null"
          ]
        },
        "breddegrad": {
          "type": [
            "string",
            "null"
          ]
        },
        "stedstype": {
          "type": [
            "string",
            "null"
          ]
        },
        "stedbeskrivelse": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "lokalitetsreferanse",
        "bygningsnummer",
        "bruksenhetsnummer",
        "adressenavn",
        "adressenummer",
        "postnummer",
        "poststedsnavn",
        "kommunenummer",
        "bydel",
        "fylkesnummer",
        "lengdegrad",
        "breddegrad",
        "stedstype",
        "stedbeskrivelse"
      ]
    },
    "trendrapport": {
      "$id": "trendrapport",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "tilsynsobjekt": {
          "type": [
            "string",
            "null"
          ]
        },
        "tilsynsmyndighet": {
          "type": [
            "string",
            "null"
          ]
        },
        "paaVegneAv": {
          "type": [
            "string",
            "null"
          ]
        },
        "tilsynsadresser": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "tilsynsadresse"
          }
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
        "tilsynsobjekt",
        "tilsynsmyndighet"
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

### Eksempel
```json
{
  "trendrapporter": [
    {
      "tilsynsobjekt": "974720760",
      "tilsynsmyndighet": "222222222",
      "paaVegneAv": "223344556",
      "tilsynsadresser": [
        {
          "lokalitetsreferanse": null,
          "bygningsnummer": "x",
          "bruksenhetsnummer": "Enhetsnummer",
          "adressenavn": "Objektadresseveien 2",
          "adressenummer": "2",
          "postnummer": "Postnummer",
          "poststedsnavn": "Poststedsnavn",
          "kommunenummer": "0301",
          "bydel": "Dal",
          "fylkesnummer": "020",
          "lengdegrad": "59.913868",
          "breddegrad": "10.752245",
          "stedstype": "Type lokasjon",
          "stedbeskrivelse": "Enda ei rønne"
        }
      ],
      "aarligeTotaler": [
        {
          "aar": 2021,
          "maanederMedData": 11,
          "antallTilsyn": 2,
          "tilsynMedBrudd": 2,
          "straffeBrudd": 1,
          "alvorBrudd": 1,
          "antallReaksjoner": 2
        },
        {
          "aar": 2020,
          "maanederMedData": 12,
          "antallTilsyn": 3,
          "tilsynMedBrudd": 2,
          "straffeBrudd": 1,
          "alvorBrudd": 0,
          "antallReaksjoner": 1
        },
        {
          "aar": 2019,
          "maanederMedData": 12,
          "antallTilsyn": 1,
          "tilsynMedBrudd": 1,
          "straffeBrudd": 1,
          "alvorBrudd": 1,
          "antallReaksjoner": 1
        },
        {
          "aar": 2018,
          "maanederMedData": 12,
          "antallTilsyn": 12,
          "tilsynMedBrudd": 12,
          "straffeBrudd": 11,
          "alvorBrudd": 6,
          "antallReaksjoner": 12
        },
        {
          "aar": 2017,
          "maanederMedData": 12,
          "antallTilsyn": 21,
          "tilsynMedBrudd": 1,
          "straffeBrudd": 0,
          "alvorBrudd": 0,
          "antallReaksjoner": 1
        }
      ]
    }
  ]
}
```