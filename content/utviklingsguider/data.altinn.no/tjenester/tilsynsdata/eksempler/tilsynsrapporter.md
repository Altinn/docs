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
      "ansvarligTilsynsmyndighet": "222222222",
      "tilsynsegenskaper": {
        "internTilsynsid": "cf05e146-e8aa-4b56-baf1-3a5c819cd412",
        "storulykketilsyn": "nei",
        "uanmeldttilsyn": "ja",
        "tilsynsutvelgelse": "Veldig suspekte folk",
        "tilsynsstatus": "aapen",
        "tilsynstema": "Fem tema om dagen gjør godt for magen",
        "tilsynsnoekkelord": "key, word",
        "nettrapport": "https://www.vg.no"
      },
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
      "utfoerteTilsynsaktiviteter": [
        {
          "tilsynsaktivitetreferanse": 1,
          "lokalitetsreferanse": 1,
          "internAktivitetsidentifikator": "5d39b0a9-b99c-4ce6-9081-cee945c0c048",
          "kontrollobjekt": "123456789",
          "startdatoForTilsynsaktivitet": "2021-04-26T11:18:02.0623582+02:00",
          "varighetForTilsynsaktivitet": 1,
          "tilsynsaktivitet": "aktivitet",
          "aktivitetsutfoerelse": "fysisk",
          "observasjonFraTilsynsaktivitet": "Vi kikket på en god stund",
          "samtidigeKontroller": [
            {
              "samtidigTilsynsmyndighet": "222222222",
              "tilsynstema": "tema",
              "aktivitetsutfoerelse": ""
            }
          ],
          "meldingTilAnnenMyndighet": [
            {
              "meldingTilmyndighet": "12345678",
              "meldingsinnholdTilAnnenMyndighet": "VIKTIG BESKJED"
            },
            {
              "meldingTilmyndighet": "12345678",
              "meldingsinnholdTilAnnenMyndighet": "VIKTIG BESKJED"
            }
          ]
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
      "tilsynsnotater": "Notater, notater, notater i lange baner",
      "anmerkninger": [
        {
          "anmerkningsreferanse": 1,
          "anmerkning": "blabla"
        }
      ],
      "bruddOgReaksjoner": [
        {
          "bruddOgReaksjonsreferanse": 1,
          "tilsynsaktivitetreferanse": 901380,
          "lokalitetsreferanse": 901380,
          "utredningAvBruddOgReaksjon": "Forklaring",
          "lovparagraf": "901380",
          "reaksjonsdato": "2013-07-14T00:00:00",
          "alvorsgrad": {
            "utmaaltReaksjonsverdi": 901380,
            "utmaaltReaksjonstype": "Spesifisert type reaksjon",
            "utmaaltReaksjonsklasse": 901380,
            "lavreaksjonsverdi": 901380,
            "hoeyreaksjonsverdi": 901380,
            "lavalvorsgradindeks": 901380,
            "hoeyalvorsgradindeks": 901380
          },
          "antallGangerVirkemiddelErTattIBruk": 901380
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
        "utmaaltReaksjonsverdi": {
          "type": "integer"
        },
        "utmaaltReaksjonstype": {
          "type": [
            "string",
            "null"
          ]
        },
        "utmaaltReaksjonsklasse": {
          "type": "integer"
        },
        "lavreaksjonsverdi": {
          "type": "integer"
        },
        "hoeyreaksjonsverdi": {
          "type": "integer"
        },
        "lavalvorsgradindeks": {
          "type": "integer"
        },
        "hoeyalvorsgradindeks": {
          "type": "integer"
        }
      }
    },
    "anmerkning": {
      "$id": "anmerkning",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "anmerkningsreferanse": {
          "type": "integer"
        },
        "anmerkning": {
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
        "bruddOgReaksjonsreferanse": {
          "type": "integer"
        },
        "tilsynsaktivitetreferanse": {
          "type": "integer"
        },
        "lokalitetsreferanse": {
          "type": "integer"
        },
        "utredningAvBruddOgReaksjon": {
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
        "antallGangerVirkemiddelErTattIBruk": {
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
        "meldingTilmyndighet": {
          "type": [
            "string",
            "null"
          ]
        },
        "meldingsinnholdTilAnnenMyndighet": {
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
        "internAktivitetsidentifikator": {
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
        "startdatoForTilsynsaktivitet": {
          "type": "string",
          "format": "date-time"
        },
        "varighetForTilsynsaktivitet": {
          "type": "integer"
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
        "observasjonFraTilsynsaktivitet": {
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
        "meldingTilAnnenMyndighet": {
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
    },
    "tilsynsegenskap": {
      "$id": "tilsynsegenskap",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "internTilsynsid": {
          "type": [
            "string",
            "null"
          ]
        },
        "storulykketilsyn": {
          "type": "string",
          "enum": [
            "ikkeAngitt",
            "nei",
            "meldepliktig",
            "rapporteringspliktig",
            "ja"
          ]
        },
        "uanmeldttilsyn": {
          "type": "string",
          "enum": [
            "ikkeAngitt",
            "ja",
            "nei"
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
            "ikkeAngitt",
            "aapen",
            "lukket",
            "avbrutt",
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
        "ansvarligTilsynsmyndighet": {
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
        "utfoerteTilsynsaktiviteter": {
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
        "anmerkninger": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "anmerkning"
          }
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
        "ansvarligTilsynsmyndighet"
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