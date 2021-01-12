---
title: Tilsynsrapporter
description: Datamodell og schema
weight: 3
---

### Json schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "tilsynsrapporter",
  "title": "Tilda/tilsynsrapporter",
  "definitions": {
    "bruddOgReaksjon": {
      "$id": "bruddOgReaksjon",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "lovparagraf": {
          "type": [
            "string",
            "null"
          ]
        },
        "paalegg": {
          "type": [
            "string",
            "null"
          ]
        },
        "reaksjonsdato": {
          "type": "string",
          "format": "date-time"
        },
        "etatreaksjon": {
          "type": [
            "string",
            "null"
          ]
        },
        "reaksjonsgrad": {
          "type": "string",
          "enum": [
            "groenn",
            "gul",
            "roed"
          ]
        }
      },
      "required": [
        "lovparagraf",
        "paalegg",
        "reaksjonsdato",
        "etatreaksjon",
        "reaksjonsgrad"
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
    "tilsynsmyndighet": {
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
    },
    "tilsynsrapport": {
      "$id": "tilsynsrapport",
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
        "tilsynsstatus": {
          "type": "string",
          "enum": [
            "aapen",
            "lukket"
          ]
        },
        "internTilsynsId": {
          "type": [
            "string",
            "null"
          ]
        },
        "samordnedeTilsynsmyndigheter": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "tilsynsmyndighet"
          }
        },
        "tilsynsegenskaper": {
          "$ref": "tilsynsegenskap"
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
        "bekymringsmeldinger": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "$ref": "tilsynsmyndighet"
          }
        },
        "notater": {
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
        },
        "tilsynsvurdering": {
          "type": "string",
          "enum": [
            "groenn",
            "gul",
            "roed"
          ]
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

### Eksempel
```json
{
  "tilsynsrapporter": [
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
      "tilsynsstatus": "lukket",
      "internTilsynsId": "Tilsyntesttilsyn22222222212",
      "samordnedeTilsynsmyndigheter": [
        {
          "tilsynsmyndighet": "111111111",
          "tema": "Hendelse"
        },
        {
          "tilsynsmyndighet": "222222222",
          "tema": "Utslipp til vann"
        }
      ],
      "tilsynsegenskaper": {
        "kommunalt": "ja",
        "storulykke": "nei",
        "uanmeldt": "irrelevant"
      },
      "tilsynsaktiviteter": [
        {
          "dato": "2016-09-26T01:41:42",
          "varighet": 12,
          "form": "fysisk",
          "type": "oppfoelging",
          "funksjon": "aapentTilsyn",
          "tema": "ProeveTaking"
        },
        {
          "dato": "2011-09-26T02:22:22",
          "varighet": 112,
          "form": "virtuelt",
          "type": "storulykketilsyn",
          "funksjon": "inspeksjon",
          "tema": "Hendelse"
        }
      ],
      "kontakt": [
        {
          "navn": "Navn Navnesen",
          "rolle": "Rolleansvarlig for roller og ansvar",
          "avdeling": "Avdelinga te Tor",
          "telefonnummer": "47419641",
          "epost": "epost@domain.com",
          "adresse": "Adresse adresseveien 3"
        },
        {
          "navn": "Jan Janssen",
          "rolle": "Senior ansvarsansvarlig",
          "avdeling": "Avdelinga te Knut",
          "telefonnummer": "47419641",
          "epost": "epost@domain2.com",
          "adresse": "Adresseveien 3"
        }
      ],
      "tilsynsutvelgelse": "aarlig",
      "bekymringsmeldinger": [
        {
          "tilsynsmyndighet": "2222222",
          "tema": "Bekymringsmelding"
        }
      ],
      "notater": "Notatblokka sier ingenting",
      "bruddOgReaksjoner": [
        {
          "lovparagraf": "Første mosebok",
          "paalegg": "Fortapelse",
          "reaksjonsdato": "2021-01-07T12:07:00.2151003+01:00",
          "etatreaksjon": "Lyst i bann",
          "reaksjonsgrad": "roed"
        },
        {
          "lovparagraf": "Lankeklaskeloven p1",
          "paalegg": "Smerte",
          "reaksjonsdato": "2020-12-28T12:07:00.2200369+01:00",
          "etatreaksjon": "Klask på lanken",
          "reaksjonsgrad": "gul"
        }
      ],
      "tilsynsvurdering": "gul"
    }
  ]
}
```