---
title: Npdidtilsynsrapporter
description: Datamodell og schema
weight: 10
---

{{% notice note %}}
Under arbeid!
{{% /notice %}}

### Eksempel
```json
{
  "tilsynsrapporter": [
    {
      "npdid": "452345",
      "tildaenhet": "974720760",
      "tilsynutfoertav": "222222222",
      "ansvarligtilsynsmyndighet": "222222222",
      "tilsynsegenskaper": {
        "storulykke": "nei",
        "internTilsynsid": "8e9ca0be-3c34-426b-8149-ba15501ce8d5",
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
          "internKontrollid": "e47e7e37-eb39-443a-9997-726ba8d8b9c8",
          "kontrollobjekt": "123456789",
          "dato": "2021-04-15T09:31:19.6375688+02:00",
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
  "$id": "NPDIDAuditReportList2",
  "title": "Tilda/npdidtilsynsrapporter",
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
    "NPDID": {
      "$id": "NPDID",
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "npdid": {
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
        "kontrolladresser": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
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
          }
        },
        "tilsynsaktiviteter": {
          "$id": "List`1",
          "type": [
            "array",
            "null"
          ],
          "items": {
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
        "npdid",
        "tildaenhet",
        "tilsynutfoertav"
      ]
    },
    "samtidigKontroll": {
      "$ref": "samtidigKontroll"
    },
    "tilsynsadresse": {
      "$ref": "tilsynsadresse"
    },
    "tilsynsaktivitet": {
      "$ref": "tilsynsaktivitet"
    },
    "tilsynsegenskap": {
      "$ref": "tilsynsegenskap"
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
        "$ref": "NPDID"
      }
    }
  }
}
```