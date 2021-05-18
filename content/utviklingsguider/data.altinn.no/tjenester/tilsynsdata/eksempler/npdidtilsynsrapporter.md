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
        "internTilsynsid": "74ef2936-182a-46b5-8271-c524b5967664",
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
          "lokalitetsreferanse": 900856,
          "lokalitetsbeskrivelse": "Enda ei rønne",
          "lokalitetsnoekkelord": "elsewhere macabre grape",
          "lengdegrad": "900856",
          "breddegrad": "900856",
          "bygningsnummer": "900856",
          "bruksenhetsnummer": "Enhetsnummer",
          "adressenavn": "Almesvingen 50, 0776 Oslo",
          "adressenummer": "900856",
          "postnummer": "Postnummer",
          "poststedsnavn": "elsewhere macabre grape",
          "kommunenummer": "0301",
          "bydel": "Dal",
          "fylkesnummer": "020"
        },
        {
          "lokalitetsreferanse": 900856,
          "lokalitetsbeskrivelse": "Enda ei rønne",
          "lokalitetsnoekkelord": "elsewhere macabre grape",
          "lengdegrad": "900856",
          "breddegrad": "900856",
          "bygningsnummer": "900856",
          "bruksenhetsnummer": "Enhetsnummer",
          "adressenavn": "Almesvingen 50, 0776 Oslo",
          "adressenummer": "900856",
          "postnummer": "Postnummer",
          "poststedsnavn": "elsewhere macabre grape",
          "kommunenummer": "0301",
          "bydel": "Dal",
          "fylkesnummer": "020"
        }
      ],
      "utfoerteTilsynsaktiviteter": [
        {
          "tilsynsaktivitetreferanse": 1,
          "lokalitetsreferanse": 1,
          "internAktivitetsidentifikator": "205e35b2-5977-4bd8-b87b-62181bbe8722",
          "kontrollobjekt": "123456789",
          "startdatoForTilsynsaktivitet": "2021-04-26T11:18:02.2045515+02:00",
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
          "avdeling": "elsewhere macabre grape",
          "telefonnummer": "12345678",
          "epost": "elsewheremacabregrape@elsewheremacabregrapenet",
          "adresse": "Almesvingen 50, 0776 Oslo"
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
          "tilsynsaktivitetreferanse": 900856,
          "lokalitetsreferanse": 900856,
          "utredningAvBruddOgReaksjon": "Forklaring",
          "lovparagraf": "900856",
          "reaksjonsdato": "2013-01-30T00:00:00",
          "alvorsgrad": {
            "utmaaltReaksjonsverdi": 900856,
            "utmaaltReaksjonstype": "Spesifisert type reaksjon",
            "utmaaltReaksjonsklasse": 900856,
            "lavreaksjonsverdi": 900856,
            "hoeyreaksjonsverdi": 900856,
            "lavalvorsgradindeks": 900856,
            "hoeyalvorsgradindeks": 900856
          },
          "antallGangerVirkemiddelErTattIBruk": 900856
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
        "utfoerteTilsynsaktiviteter": {
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

### OAS
```json
{
  "additionalProperties": true,
  "definitions": {
    "NPDID": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "anmerkninger": {
          "items": {
            "$ref": "anmerkning"
          },
          "nullable": true,
          "type": "array"
        },
        "ansvarligtilsynsmyndighet": {
          "nullable": true,
          "type": "string"
        },
        "bruddOgReaksjoner": {
          "items": {
            "$ref": "bruddOgReaksjon"
          },
          "nullable": true,
          "type": "array"
        },
        "kontaktpunkt": {
          "items": {
            "$ref": "kontaktpunkt"
          },
          "nullable": true,
          "type": "array"
        },
        "kontrolladresser": {
          "items": {
            "additionalProperties": true,
            "nullable": true,
            "properties": {
              "adressenavn": {
                "nullable": true,
                "type": "string"
              },
              "adressenummer": {
                "nullable": true,
                "type": "string"
              },
              "breddegrad": {
                "nullable": true,
                "type": "string"
              },
              "bruksenhetsnummer": {
                "nullable": true,
                "type": "string"
              },
              "bydel": {
                "nullable": true,
                "type": "string"
              },
              "bygningsnummer": {
                "nullable": true,
                "type": "string"
              },
              "fylkesnummer": {
                "nullable": true,
                "type": "string"
              },
              "kommunenummer": {
                "nullable": true,
                "type": "string"
              },
              "lengdegrad": {
                "nullable": true,
                "type": "string"
              },
              "lokalitetsbeskrivelse": {
                "nullable": true,
                "type": "string"
              },
              "lokalitetsnoekkelord": {
                "nullable": true,
                "type": "string"
              },
              "lokalitetsreferanse": {
                "nullable": false,
                "type": "integer"
              },
              "postnummer": {
                "nullable": true,
                "type": "string"
              },
              "poststedsnavn": {
                "nullable": true,
                "type": "string"
              }
            },
            "type": "object"
          },
          "nullable": true,
          "type": "array"
        },
        "npdid": {
          "nullable": true,
          "type": "string"
        },
        "tildaenhet": {
          "nullable": true,
          "type": "string"
        },
        "tilsynsegenskaper": {
          "additionalProperties": true,
          "nullable": true,
          "properties": {
            "internTilsynsid": {
              "nullable": true,
              "type": "string"
            },
            "nettrapport": {
              "nullable": true,
              "type": "string"
            },
            "storulykketilsyn": {
              "enum": [
                "ikkeAngitt",
                "nei",
                "meldepliktig",
                "rapporteringspliktig",
                "ja"
              ],
              "nullable": false,
              "type": "string"
            },
            "tilsynsnoekkelord": {
              "nullable": true,
              "type": "string"
            },
            "tilsynsstatus": {
              "enum": [
                "ikkeAngitt",
                "aapen",
                "lukket",
                "avbrutt",
                "planlegging"
              ],
              "nullable": false,
              "type": "string"
            },
            "tilsynstema": {
              "nullable": true,
              "type": "string"
            },
            "tilsynsutvelgelse": {
              "nullable": true,
              "type": "string"
            },
            "uanmeldttilsyn": {
              "enum": [
                "ikkeAngitt",
                "ja",
                "nei"
              ],
              "nullable": false,
              "type": "string"
            }
          },
          "type": "object"
        },
        "tilsynsnotater": {
          "nullable": true,
          "type": "string"
        },
        "tilsynutfoertav": {
          "nullable": true,
          "type": "string"
        },
        "utfoerteTilsynsaktiviteter": {
          "items": {
            "additionalProperties": true,
            "nullable": true,
            "properties": {
              "aktivitetsutfoerelse": {
                "nullable": true,
                "type": "string"
              },
              "internAktivitetsidentifikator": {
                "nullable": true,
                "type": "string"
              },
              "kontrollobjekt": {
                "nullable": true,
                "type": "string"
              },
              "lokalitetsreferanse": {
                "nullable": false,
                "type": "integer"
              },
              "meldingTilAnnenMyndighet": {
                "items": {
                  "$ref": "meldingTilAnnenMyndighet"
                },
                "nullable": true,
                "type": "array"
              },
              "observasjonFraTilsynsaktivitet": {
                "nullable": true,
                "type": "string"
              },
              "samtidigeKontroller": {
                "items": {
                  "additionalProperties": true,
                  "nullable": true,
                  "properties": {
                    "aktivitetsutfoerelse": {
                      "nullable": true,
                      "type": "string"
                    },
                    "samtidigTilsynsmyndighet": {
                      "nullable": true,
                      "type": "string"
                    },
                    "tilsynstema": {
                      "nullable": true,
                      "type": "string"
                    }
                  },
                  "type": "object"
                },
                "nullable": true,
                "type": "array"
              },
              "startdatoForTilsynsaktivitet": {
                "format": "date-time",
                "nullable": false,
                "type": "string"
              },
              "tilsynsaktivitet": {
                "nullable": true,
                "type": "string"
              },
              "tilsynsaktivitetreferanse": {
                "nullable": false,
                "type": "integer"
              },
              "varighetForTilsynsaktivitet": {
                "nullable": false,
                "type": "integer"
              }
            },
            "type": "object"
          },
          "nullable": true,
          "type": "array"
        }
      },
      "required": [
        "npdid",
        "tildaenhet",
        "tilsynutfoertav"
      ],
      "type": "object"
    },
    "alvorsgrad": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "hoeyalvorsgradindeks": {
          "nullable": false,
          "type": "integer"
        },
        "hoeyreaksjonsverdi": {
          "nullable": false,
          "type": "integer"
        },
        "lavalvorsgradindeks": {
          "nullable": false,
          "type": "integer"
        },
        "lavreaksjonsverdi": {
          "nullable": false,
          "type": "integer"
        },
        "utmaaltReaksjonsklasse": {
          "nullable": false,
          "type": "integer"
        },
        "utmaaltReaksjonstype": {
          "nullable": true,
          "type": "string"
        },
        "utmaaltReaksjonsverdi": {
          "nullable": false,
          "type": "integer"
        }
      },
      "type": "object"
    },
    "anmerkning": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "anmerkning": {
          "nullable": true,
          "type": "string"
        },
        "anmerkningsreferanse": {
          "nullable": false,
          "type": "integer"
        }
      },
      "type": "object"
    },
    "bruddOgReaksjon": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "alvorsgrad": {
          "$ref": "alvorsgrad"
        },
        "antallGangerVirkemiddelErTattIBruk": {
          "nullable": false,
          "type": "integer"
        },
        "bruddOgReaksjonsreferanse": {
          "nullable": false,
          "type": "integer"
        },
        "lokalitetsreferanse": {
          "nullable": false,
          "type": "integer"
        },
        "lovparagraf": {
          "nullable": true,
          "type": "string"
        },
        "reaksjonsdato": {
          "format": "date-time",
          "nullable": false,
          "type": "string"
        },
        "tilsynsaktivitetreferanse": {
          "nullable": false,
          "type": "integer"
        },
        "utredningAvBruddOgReaksjon": {
          "nullable": true,
          "type": "string"
        }
      },
      "type": "object"
    },
    "kontaktpunkt": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "adresse": {
          "nullable": true,
          "type": "string"
        },
        "avdeling": {
          "nullable": true,
          "type": "string"
        },
        "epost": {
          "nullable": true,
          "type": "string"
        },
        "kontaktperson": {
          "nullable": true,
          "type": "string"
        },
        "telefonnummer": {
          "nullable": true,
          "type": "string"
        }
      },
      "type": "object"
    },
    "meldingTilAnnenMyndighet": {
      "additionalProperties": true,
      "nullable": true,
      "properties": {
        "meldingTilmyndighet": {
          "nullable": true,
          "type": "string"
        },
        "meldingsinnholdTilAnnenMyndighet": {
          "nullable": true,
          "type": "string"
        }
      },
      "type": "object"
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
  "nullable": false,
  "properties": {
    "tilsynsrapporter": {
      "items": {
        "$ref": "NPDID"
      },
      "nullable": true,
      "type": "array"
    }
  },
  "title": "Tilda/npdidtilsynsrapporter",
  "type": "object"
}
```