---
title: Tilsynskoordineringer
description: Datamodell og schema
weight: 2
---

### Json schema
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
        "navn": {
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
        "navn",
        "beskrivelse",
        "startdato",
        "sluttdato"
      ]
    },
    "kontaktperson": {
      "$id": "kontaktperson",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "navn": {
          "type": [
            "string",
            "null"
          ]
        },
        "rolle": {
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
      },
      "required": [
        "navn",
        "rolle",
        "avdeling",
        "telefonnummer",
        "epost",
        "adresse"
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
    "tilsynsaktivitet": {
      "$id": "tilsynsaktivitet",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "dato": {
          "type": "string",
          "format": "date-time"
        },
        "varighet": {
          "type": "integer"
        },
        "form": {
          "type": "string",
          "enum": [
            "fysisk",
            "brev",
            "telefon",
            "virtuelt"
          ]
        },
        "type": {
          "type": "string",
          "enum": [
            "hendelsesbasert",
            "nybygg",
            "oppfoelging",
            "periodisk",
            "storulykketilsyn",
            "tilsynsaksjon"
          ]
        },
        "funksjon": {
          "type": "string",
          "enum": [
            "dokumenttilsyn",
            "inspeksjon",
            "internrevisjon",
            "markedstilsyn",
            "revisjon",
            "aapentTilsyn",
            "lukketTilsyn"
          ]
        },
        "tema": {
          "type": "string",
          "enum": [
            "Hendelse",
            "ProeveTaking",
            "UtslippTilLuft",
            "UtslippTilVann"
          ]
        }
      },
      "required": [
        "dato",
        "varighet",
        "form",
        "type",
        "funksjon",
        "tema"
      ]
    },
    "tilsynsegenskap": {
      "$id": "tilsynsegenskap",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "kommunalt": {
          "type": "string",
          "enum": [
            "ja",
            "nei",
            "irrelevant"
          ]
        },
        "storulykke": {
          "type": "string",
          "enum": [
            "ja",
            "nei",
            "irrelevant"
          ]
        },
        "uanmeldt": {
          "type": "string",
          "enum": [
            "ja",
            "nei",
            "irrelevant"
          ]
        }
      },
      "required": [
        "kommunalt",
        "storulykke",
        "uanmeldt"
      ]
    },
    "tilsynskoordinering": {
      "$id": "tilsynskoordinering",
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
        "kontakt": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "kontaktperson"
          }
        },
        "samordnedeTilsynsmyndigheter": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$id": "tilsynsmyndighet",
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
              "tema": {
                "type": [
                  "string",
                  "null"
                ]
              }
            },
            "required": [
              "tilsynsmyndighet"
            ]
          }
        },
        "tilsynsegenskaper": {
          "$ref": "tilsynsegenskap"
        },
        "tilsynsutvelgelse": {
          "type": "string",
          "enum": [
            "groveOvertredelser",
            "stikkproeve",
            "bekymringsmelding",
            "aarlig",
            "risikovurdering"
          ]
        },
        "sisteTilsynsdato": {
          "type": "string",
          "format": "date-time"
        },
        "planlagteTilsyn": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "tilsynsaktivitet"
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
        "tilsynsobjekt",
        "tilsynsmyndighet",
        "paaVegneAv",
        "tilsynsadresser",
        "kontakt",
        "samordnedeTilsynsmyndigheter",
        "tilsynsegenskaper",
        "tilsynsutvelgelse",
        "sisteTilsynsdato",
        "planlagteTilsyn",
        "tilsynskampanjer"
      ]
    },
    "tilsynsmyndighet": {
      "$ref": "tilsynsmyndighet"
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
### Eksempel
```json
{
  "tilsynskoordineringer": [
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
      "kontakt": [
        {
          "navn": "Bob Gadget",
          "rolle": "Inspektør",
          "avdeling": "Teknologiavd.",
          "telefonnummer": "44556677",
          "epost": "bob@gadgettilsynet.no",
          "adresse": "Innretningsveien 420"
        }
      ],
      "samordnedeTilsynsmyndigheter": [
        {
          "tilsynsmyndighet": "223344556",
          "tema": "tema"
        },
        {
          "tilsynsmyndighet": "223344556",
          "tema": "tema"
        }
      ],
      "tilsynsegenskaper": {
        "kommunalt": "ja",
        "storulykke": "nei",
        "uanmeldt": "irrelevant"
      },
      "tilsynsutvelgelse": "aarlig",
      "sisteTilsynsdato": "2020-12-23T12:07:00.3083979+01:00",
      "planlagteTilsyn": [
        {
          "dato": "2021-02-03T12:07:00.3084085+01:00",
          "varighet": 1,
          "form": "brev",
          "type": "periodisk",
          "funksjon": 0,
          "tema": "Hendelse"
        }
      ],
      "tilsynskampanjer": [
        {
          "navn": "Laktosesjekk",
          "beskrivelse": "Tilsyn av iskremselgere",
          "startdato": "2021-02-01T12:07:00.3086324+01:00",
          "sluttdato": "2021-02-02T12:07:00.3086367+01:00"
        }
      ]
    }
  ]
}
```