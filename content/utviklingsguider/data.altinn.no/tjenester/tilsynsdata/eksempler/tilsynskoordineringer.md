---
title: Tilsynskoordineringer
description: Datamodell og schema
weight: 2
---

### Eksempel
```json
{
  "tilsynskoordineringer": [
    {
      "tildaenhet": "974720760",
      "tilsynutfoertav": "222222222",
      "ansvarligtilsynsmyndighet": "223344556",
      "kontrolladresser": [
        {
          "lokalitetsreferanse": 901380,
          "lokalitetsbeskrivelse": "Enda ei rønne",
          "lokalitetsnoekkelord": "definitely bewildered zephyr",
          "lengdegrad": "901380",
          "breddegrad": "901380",
          "bygningsnummer": "901380",
          "bruksenhetsnummer": "Enhetsnummer",
          "adressenavn": "Gåshaugen 4, 0925 Oslo",
          "adressenummer": "901380",
          "postnummer": "Postnummer",
          "poststedsnavn": "definitely bewildered zephyr",
          "kommunenummer": "0301",
          "bydel": "Dal",
          "fylkesnummer": "020"
        },
        {
          "lokalitetsreferanse": 901380,
          "lokalitetsbeskrivelse": "Enda ei rønne",
          "lokalitetsnoekkelord": "definitely bewildered zephyr",
          "lengdegrad": "901380",
          "breddegrad": "901380",
          "bygningsnummer": "901380",
          "bruksenhetsnummer": "Enhetsnummer",
          "adressenavn": "Gåshaugen 4, 0925 Oslo",
          "adressenummer": "901380",
          "postnummer": "Postnummer",
          "poststedsnavn": "definitely bewildered zephyr",
          "kommunenummer": "0301",
          "bydel": "Dal",
          "fylkesnummer": "020"
        }
      ],
      "kontaktpunkt": [
        {
          "kontaktperson": "Ansvarligheten selv",
          "avdeling": "definitely bewildered zephyr",
          "telefonnummer": "12345678",
          "epost": "definitelybewilderedzephyr@definitelybewilderedzephyrcom",
          "adresse": "Gåshaugen 4, 0925 Oslo"
        }
      ],
      "meldingTilAnnenMyndighet": [
        {
          "meldingTilMyndighet": "12345678",
          "lokalitetsreferanse": 1,
          "meldingsinnholdTilAnnenMyndighet": "VIKTIG BESKJED NR 1",
          "datoForMeldingTilAnnenMyndighet": "2013-07-14T00:00:00"
        },
        {
          "meldingTilMyndighet": "12345678",
          "lokalitetsreferanse": 1,
          "meldingsinnholdTilAnnenMyndighet": "VIKTIG BESKJED NR 2",
          "datoForMeldingTilAnnenMyndighet": "2013-07-14T00:00:00"
        }
      ],
      "aapnetilsyn": 12,
      "planlagteKontroller": [
        {
          "planlagtkontrolldato": "2021-05-18T11:18:02.16684+02:00",
          "planlagtkontrollVarighet": 1,
          "tilsynstema": "tema",
          "tilsynsaktivitet": "aktivitet",
          "aktivitetsutfoerelse": "aktivitetsutførelsestype",
          "samtidigeKontroller": [
            {
              "samtidigTilsynsmyndighet": "123456788",
              "tilsynstema": "tema",
              "aktivitetsutfoerelse": "aktivitetseksekvering"
            }
          ]
        }
      ],
      "tilsynskampanjer": [
        {
          "kampanjenavn": "Laktosesjekk",
          "kampanjebeskrivelse": "Tilsyn av iskremselgere",
          "startdatoForKampanje": "2021-05-16T11:18:02.1669522+02:00",
          "sluttdatoForKampanje": "2021-05-17T11:18:02.1669556+02:00"
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
  "$id": "AuditCoordinationList2",
  "title": "Tilda/tilsynskoordinering",
  "definitions": {
    "kampanje": {
      "$id": "kampanje",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "kampanjenavn": {
          "type": [
            "string",
            "null"
          ]
        },
        "kampanjebeskrivelse": {
          "type": [
            "string",
            "null"
          ]
        },
        "startdatoForKampanje": {
          "type": "string",
          "format": "date-time"
        },
        "sluttdatoForKampanje": {
          "type": "string",
          "format": "date-time"
        }
      },
      "required": [
        "kampanjenavn"
      ]
    },
    "kontaktpunkt": {
      "$id": "kontaktpunkt",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "kontaktperson": {
          "type": [
            "string",
            "null"
          ]
        },
        "avdeling": {
          "type": [
            "string",
            "null"
          ]
        },
        "telefonnummer": {
          "type": [
            "string",
            "null"
          ]
        },
        "epost": {
          "type": [
            "string",
            "null"
          ]
        },
        "adresse": {
          "type": [
            "string",
            "null"
          ]
        }
      }
    },
    "meldingTilAnnenMyndighet": {
      "$id": "meldingTilAnnenMyndighet",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "meldingTilMyndighet": {
          "type": [
            "string",
            "null"
          ]
        },
        "lokalitetsreferanse": {
          "type": "integer"
        },
        "meldingsinnholdTilAnnenMyndighet": {
          "type": [
            "string",
            "null"
          ]
        },
        "datoForMeldingTilAnnenMyndighet": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "planlagtekontroller": {
      "$id": "planlagtekontroller",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "planlagtkontrolldato": {
          "type": "string",
          "format": "date-time"
        },
        "planlagtkontrollVarighet": {
          "type": "integer"
        },
        "tilsynstema": {
          "type": [
            "string",
            "null"
          ]
        },
        "tilsynsaktivitet": {
          "type": [
            "string",
            "null"
          ]
        },
        "aktivitetsutfoerelse": {
          "type": [
            "string",
            "null"
          ]
        },
        "samtidigeKontroller": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$id": "samtidigKontroll",
            "type": [
              "object",
              "null"
            ],
            "properties": {
              "samtidigTilsynsmyndighet": {
                "type": [
                  "string",
                  "null"
                ]
              },
              "tilsynstema": {
                "type": [
                  "string",
                  "null"
                ]
              },
              "aktivitetsutfoerelse": {
                "type": [
                  "string",
                  "null"
                ]
              }
            }
          }
        }
      }
    },
    "samtidigKontroll": {
      "$ref": "samtidigKontroll"
    },
    "tilsynsadresse": {
      "$id": "tilsynsadresse",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "lokalitetsreferanse": {
          "type": "integer"
        },
        "lokalitetsbeskrivelse": {
          "type": [
            "string",
            "null"
          ]
        },
        "lokalitetsnoekkelord": {
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
        }
      }
    },
    "tilsynskoordinering": {
      "$id": "tilsynskoordinering",
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
        "ansvarligtilsynsmyndighet": {
          "type": [
            "string",
            "null"
          ]
        },
        "kontrolladresser": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "tilsynsadresse"
          }
        },
        "kontaktpunkt": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "kontaktpunkt"
          }
        },
        "meldingTilAnnenMyndighet": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "meldingTilAnnenMyndighet"
          }
        },
        "aapnetilsyn": {
          "type": "integer"
        },
        "planlagteKontroller": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "planlagtekontroller"
          }
        },
        "tilsynskampanjer": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "kampanje"
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
    "tilsynskoordineringer": {
      "$id": "List`1",
      "type": [
        "array",
        "null"
      ],
      "items": {
        "$ref": "tilsynskoordinering"
      }
    }
  }
}
```