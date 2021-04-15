---
title: Tilsynsrapporter
description: Datamodell og schema
weight: 3
---

### Eksempel
```json
{
  "tilsynsrapporter": [
    {
      "tildaenhet": "123456789",
      "tilsynutfoertav": "222222222",
      "ansvarligtilsynsmyndighet": "222222222",
      "tilsynsegenskaper": {
        "storulykke": "nei",
        "internTilsynsid": "52126e2d-b8ba-4b36-b187-b4986d2c8536",
        "tilsynsutvelgelse": "Veldig suspekte folk",
        "tilsynsstatus": "aapen",
        "tilsynstema": "Fem tema om dagen gjør godt for magen",
        "tilsynsnoekkelord": "key, word",
        "nettrapport": "https://www.vg.no"
      },
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
      "tilsynsaktiviteter": [
        {
          "tilsynsaktivitetreferanse": 1,
          "lokalitetsreferanse": 1,
          "internKontrollid": "c287f4c6-bdf3-4d29-8232-309bcd86b3df",
          "kontrollobjekt": "123456789",
          "dato": "2021-04-15T09:31:19.4865362+02:00",
          "varighet": 1,
          "aktivitet": "aktivitet",
          "aktivitetsutfoerelse": "fysisk",
          "observasjon": "Vi kikket på en god stund",
          "samtidigeKontroller": [
            {
              "tilsynsmyndighet": "222222222",
              "tilsynstema": "tema",
              "aktivitetsutfoerelse": ""
            }
          ],
          "bekymringsmeldinger": [
            {
              "tilsynsmyndighet": "12345678",
              "melding": "VIKTIG BESKJED"
            },
            {
              "tilsynsmyndighet": "12345678",
              "melding": "VIKTIG BESKJED"
            }
          ]
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
      "tilsynsnotater": "Notater, notater, notater i lange baner",
      "bruddOgReaksjoner": [
        {
          "tilsynsaktivitetreferanse": 507617,
          "lokalitetsreferanse": 507617,
          "utredning": "Forklaring",
          "lovparagraf": "507617",
          "reaksjonsdato": "2012-03-02T00:00:00",
          "alvorsgrad": {
            "reaksjonsverdi": 507617,
            "reaksjonstype": "Spesifisert type reaksjon",
            "reaksjonsklasse": 507617,
            "lavreaksjon": 507617,
            "hoeyreaksjon": 507617,
            "lavalvorsgrad": 507617,
            "hoeyalvorsgrad": 507617
          },
          "oppfoelgingspaaminnelser": 507617
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
  "$id": "tilsynsrapporter",
  "title": "Tilda/tilsynsrapporter",
  "definitions": {
    "alvorsgrad": {
      "$id": "alvorsgrad",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "reaksjonsverdi": {
          "type": "integer"
        },
        "reaksjonstype": {
          "type": [
            "string",
            "null"
          ]
        },
        "reaksjonsklasse": {
          "type": "integer"
        },
        "lavreaksjon": {
          "type": "integer"
        },
        "hoeyreaksjon": {
          "type": "integer"
        },
        "lavalvorsgrad": {
          "type": "integer"
        },
        "hoeyalvorsgrad": {
          "type": "integer"
        }
      }
    },
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
        "melding": {
          "type": [
            "string",
            "null"
          ]
        }
      }
    },
    "bruddOgReaksjon": {
      "$id": "bruddOgReaksjon",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "tilsynsaktivitetreferanse": {
          "type": "integer"
        },
        "lokalitetsreferanse": {
          "type": "integer"
        },
        "utredning": {
          "type": [
            "string",
            "null"
          ]
        },
        "lovparagraf": {
          "type": [
            "string",
            "null"
          ]
        },
        "reaksjonsdato": {
          "type": "string",
          "format": "date-time"
        },
        "alvorsgrad": {
          "$ref": "alvorsgrad"
        },
        "oppfoelgingspaaminnelser": {
          "type": "integer"
        }
      }
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
    "samtidigKontroll": {
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
    "tilsynsaktivitet": {
      "$id": "tilsynsaktivitet",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "tilsynsaktivitetreferanse": {
          "type": "integer"
        },
        "lokalitetsreferanse": {
          "type": "integer"
        },
        "internKontrollid": {
          "type": [
            "string",
            "null"
          ]
        },
        "kontrollobjekt": {
          "type": [
            "string",
            "null"
          ]
        },
        "dato": {
          "type": "string",
          "format": "date-time"
        },
        "varighet": {
          "type": "integer"
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
            "$ref": "samtidigKontroll"
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
        }
      }
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
        },
        "internTilsynsid": {
          "type": [
            "string",
            "null"
          ]
        },
        "tilsynsutvelgelse": {
          "type": [
            "string",
            "null"
          ]
        },
        "tilsynsstatus": {
          "type": "string",
          "enum": [
            "aapen",
            "lukket",
            "planlegging"
          ]
        },
        "tilsynstema": {
          "type": [
            "string",
            "null"
          ]
        },
        "tilsynsnoekkelord": {
          "type": [
            "string",
            "null"
          ]
        },
        "nettrapport": {
          "type": [
            "string",
            "null"
          ]
        }
      }
    },
    "tilsynsrapport": {
      "$id": "tilsynsrapport",
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
        "tilsynsegenskaper": {
          "$ref": "tilsynsegenskap"
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
        "tilsynsaktiviteter": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "tilsynsaktivitet"
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
        "tilsynsnotater": {
          "type": [
            "string",
            "null"
          ]
        },
        "bruddOgReaksjoner": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "bruddOgReaksjon"
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
    "tilsynsrapporter": {
      "$id": "List`1",
      "type": [
        "array",
        "null"
      ],
      "items": {
        "$ref": "tilsynsrapport"
      }
    }
  }
}
```