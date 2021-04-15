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
          "lokalitetsreferanse": 507617,
          "lokalitetsbeskrivelse": "Enda ei rønne",
          "lokalitetsnoekkelord": "openly cloudy pig",
          "lengdegrad": "507617",
          "breddegrad": "507617",
          "bygningsnummer": "507617",
          "bruksenhetsnummer": "Enhetsnummer",
          "adressenavn": "Kirsebærgaten 43, 0419 Oslo",
          "adressenummer": "507617",
          "postnummer": "Postnummer",
          "poststedsnavn": "openly cloudy pig",
          "kommunenummer": "0301",
          "bydel": "Dal",
          "fylkesnummer": "020"
        },
        {
          "lokalitetsreferanse": 507617,
          "lokalitetsbeskrivelse": "Enda ei rønne",
          "lokalitetsnoekkelord": "openly cloudy pig",
          "lengdegrad": "507617",
          "breddegrad": "507617",
          "bygningsnummer": "507617",
          "bruksenhetsnummer": "Enhetsnummer",
          "adressenavn": "Kirsebærgaten 43, 0419 Oslo",
          "adressenummer": "507617",
          "postnummer": "Postnummer",
          "poststedsnavn": "openly cloudy pig",
          "kommunenummer": "0301",
          "bydel": "Dal",
          "fylkesnummer": "020"
        }
      ],
      "kontaktpunkt": [
        {
          "rapportansvarlig": "Ansvarligheten selv",
          "avdeling": "openly cloudy pig",
          "telefonnummer": "12345678",
          "epost": "openlycloudypig@openlycloudypigno",
          "adresse": "Kirsebærgaten 43, 0419 Oslo"
        }
      ],
      "bekymringsmeldinger": [
        {
          "tilsynsmyndighet": "12345678",
          "lokalitetsreferanse": 1,
          "melding": "VIKTIG BESKJED NR 1",
          "bekymringsdato": "2012-03-02T00:00:00"
        },
        {
          "tilsynsmyndighet": "12345678",
          "lokalitetsreferanse": 1,
          "melding": "VIKTIG BESKJED NR 2",
          "bekymringsdato": "2012-03-02T00:00:00"
        }
      ],
      "aapnetilsyn": 12,
      "planlagteKontroller": [
        {
          "planlagtkontrolldato": "2021-05-07T09:31:19.5982833+02:00",
          "varighet": 1,
          "tilsynstema": "tema",
          "aktivitet": "aktivitet",
          "aktivitetsutfoerelse": "aktivitetsutførelsestype",
          "observasjon": "observasjoner",
          "samtidigeKontroller": [
            {
              "tilsynsmyndighet": "123456788",
              "tilsynstema": "tema",
              "aktivitetsutfoerelse": "aktivitetseksekvering"
            }
          ]
        }
      ],
      "kampanjer": [
        {
          "kampanjenavn": "Laktosesjekk",
          "beskrivelse": "Tilsyn av iskremselgere",
          "startdato": "2021-05-05T09:31:19.5983766+02:00",
          "sluttdato": "2021-05-06T09:31:19.5983791+02:00"
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
        "lokalitetsreferanse": {
          "type": "integer"
        },
        "melding": {
          "type": [
            "string",
            "null"
          ]
        },
        "bekymringsdato": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
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
        "beskrivelse": {
          "type": [
            "string",
            "null"
          ]
        },
        "startdato": {
          "type": "string",
          "format": "date-time"
        },
        "sluttdato": {
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
        "rapportansvarlig": {
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
    "planlagtkontroll": {
      "$id": "planlagtkontroll",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "planlagtkontrolldato": {
          "type": "string",
          "format": "date-time"
        },
        "varighet": {
          "type": "integer"
        },
        "tilsynstema": {
          "type": [
            "string",
            "null"
          ]
        },
        "aktivitet": {
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
        "observasjon": {
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
              "tilsynsmyndighet": {
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
        "bekymringsmeldinger": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "bekymringsmelding"
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
            "$ref": "planlagtkontroll"
          }
        },
        "kampanjer": {
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